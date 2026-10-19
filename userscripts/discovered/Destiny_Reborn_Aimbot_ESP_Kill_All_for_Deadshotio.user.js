// ==UserScript==
// @name         Destiny Reborn (Aimbot, ESP, Kill All for Deadshot.io)
// @namespace    http://tampermonkey.net/
// @version      5.4.0
// @description  Destiny Reborn (Aimbot, ESP, Kill All)
// @match        https://deadshot.io/
// @run-at       document-start
// @sandbox      raw
// @grant        none
// @noframes
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/596418/Destiny%20Reborn%20%28Aimbot%2C%20ESP%2C%20Kill%20All%20for%20Deadshotio%29.user.js
// @updateURL https://update.greasyfork.org/scripts/596418/Destiny%20Reborn%20%28Aimbot%2C%20ESP%2C%20Kill%20All%20for%20Deadshotio%29.meta.js
// ==/UserScript==

(() => {
  'use strict';
  if (window.__DestinyV5) { console.warn('destiny already loaded bro'); return; }
  window.__DestinyV5=true;
  const apply = Reflect.apply, define = Object.defineProperty;
  const records = new Map(), hooks = [], errors = [];
  const now = () => performance.now();
  let nextRenderer = 1, nextCandidate = 1, enabled = false, attached = false;
  let selected = null, width = 2, maskFPS = 0, label = null;
  let collector = null, suspended = false;



  const bootInjectionAt = now();
  let collectorEvents = 0, collectorPropertyMode = 'uninitialized', collectorLastAttach = null;
  let collectorCreatedHere = false;



  const recoveryRoots = new Set(), recoveryRootHooks = [];
  let recoveryWeakMap = null, recoveryTimer = 0, recoveryActive = false;
  let recoveryAttempts = 0, recoveryRootHits = 0, recoveryRendererHits = 0, recoveryWeakMapHits = 0;
  const recoveryEventSamples = [];



  const liveRoots = new Map(), liveObjects = new Map(), immutableCallbacks = new WeakSet();
  const callbackStats = {rootCallbacks:0,objectCallbacks:0,forwarded:0,scans:0,
    nodes:0,installed:0,restored:0,failures:0,replacements:0,scanMs:0,maxScanMs:0,
    missingArguments:0,nestedSkipped:0,capacityHits:0,pruned:0};
  const callbackSamples=[];
  let callbackPump=0, callbackInside=false, recoveryStopQueued=false;
  const CALLBACK_MAX_ROOTS=64, CALLBACK_MAX_OBJECTS=6000, CALLBACK_SCAN_NODES=256;

  function describeMethod(owner,name){
    try {for(let o=owner,level=0;o&&level<8;o=Object.getPrototypeOf(o),level++){
      const d=Object.getOwnPropertyDescriptor(o,name);if(!d)continue;
      return {level,kind:'value'in d?'data':'accessor',callable:typeof d.value==='function',
        writable:'value'in d?!!d.writable:null,configurable:!!d.configurable};
    }}catch(e){return {error:String(e?.message||e)};}return null;
  }
  function callbackFailure(owner,name,reason){
    callbackStats.failures++;
    if(callbackSamples.length<16)callbackSamples.push({name,reason,
      type:String(inheritedDataValue(owner,'type')||''),descriptor:describeMethod(owner,name)});
  }
  function putCallback(owner,name,body){
    let d,raw;
    try {
      d=Object.getOwnPropertyDescriptor(owner,name);

      if(d&&!('value'in d)){callbackFailure(owner,name,'accessor-not-replaced');return null;}
      raw=inheritedDataValue(owner,name);
      if(typeof raw!=='function'){callbackFailure(owner,name,'callback-not-exposed');return null;}
      if(d&&!d.configurable&&!d.writable){callbackFailure(owner,name,'callback-frozen');return null;}
      if(!d&&!Object.isExtensible(owner)){callbackFailure(owner,name,'object-not-extensible');return null;}
      const h={owner,name,descriptor:d,raw,active:true,wrapper:null};
      h.wrapper=function(){
        if(h.active&&!suspended&&attached&&!callbackInside){
          callbackInside=true;
          try {body(this,arguments);}catch(e){error('object-callback-bridge',e);}
          finally {callbackInside=false;}
        }

        return apply(raw,this,arguments);
      };
      define(owner,name,d?{...d,value:h.wrapper}:{value:h.wrapper,writable:true,configurable:true});
      if(ownDataValue(owner,name)!==h.wrapper){callbackFailure(owner,name,'write-not-retained');return null;}
      callbackStats.installed++;return h;
    }catch(e){callbackFailure(owner,name,String(e?.message||e).slice(0,120));return null;}
  }
  function restoreCallback(h){
    if(!h)return;h.active=false;
    try{if(ownDataValue(h.owner,h.name)===h.wrapper){
      if(h.descriptor)define(h.owner,h.name,h.descriptor);else delete h.owner[h.name];
      callbackStats.restored++;
    }}catch(e){error('restore-object-callback',e);}
  }
  function detachTemporaryRoot(root){
    for(let i=recoveryRootHooks.length-1;i>=0;i--){
      const h=recoveryRootHooks[i];if(h.root!==root)continue;recoveryRootHooks.splice(i,1);
      try{if(ownDataValue(root,h.name)===h.wrapper){if(h.descriptor)define(root,h.name,h.descriptor);else delete root[h.name];}}
      catch(e){error('restore-temporary-root',e);}
    }
  }
  function callbackRec(r){
    if(!isRenderer(r))return null;
    let rec=records.get(r);if(!rec){observe(r);rec=records.get(r);}
    if(rec&&!rec.gl&&attached&&!suspended&&visibleGameCanvas(rec.canvas))hookRenderer(rec);
    return rec;
  }
  function forwardObjectDraw(object,args){
    const rec=callbackRec(args[0]);
    if(!rec)return;
    rec.objectCallbackCalls=(rec.objectCallbackCalls||0)+1;
    callbackStats.objectCallbacks++;
    if(rec.drawSource!=='object-onAfterRender'||!enabled||rec.lost||rec.failed||dispatchingAim)return;
    if(!args[2]||!args[3]||!args[4]){callbackStats.missingArguments++;return;}
    rec.lastObjectCallbackAt=now();


    try{afterDraw(rec,args[3],args[4],object,args[5],args[2]);callbackStats.forwarded++;}
    catch(e){rec.skipped++;error('object-after-draw',e);}
    if(recoveryActive&&!recoveryStopQueued&&candidateRows().some(r=>!r.viewmodelLike)){
      recoveryStopQueued=true;queueMicrotask(()=>{recoveryStopQueued=false;if(recoveryActive)stopRendererRecovery('live-candidate-observed');});
    }
  }
  function installObjectCallback(object,t){
    if(!object||typeof object!=='object'||immutableCallbacks.has(object))return;
    const old=liveObjects.get(object);
    if(old){old.touched=t;
      if(ownDataValue(object,'onAfterRender')===old.hook?.wrapper)return;


      if(old.hook)old.hook.active=false;liveObjects.delete(object);callbackStats.replacements++;
    }
    if(liveObjects.size>=CALLBACK_MAX_OBJECTS){callbackStats.capacityHits++;return;}
    if(typeof inheritedDataValue(object,'onAfterRender')!=='function')return;
    if(inheritedDataValue(object,'isCamera')===true||inheritedDataValue(object,'isBone')===true)return;


    detachTemporaryRoot(object);
    const h=putCallback(object,'onAfterRender',(self,args)=>forwardObjectDraw(self,args));
    if(h)liveObjects.set(object,{hook:h,touched:t});
    else {const d=Object.getOwnPropertyDescriptor(object,'onAfterRender');
      if(d&&!d.configurable&&(!('value'in d)||!d.writable)||!d&&!Object.isExtensible(object))immutableCallbacks.add(object);
    }
  }
  function scanCallbackRoot(entry,force=false){
    if(suspended||!attached||!entry.rec||entry.rec.drawSource!=='object-onAfterRender')return;
    if(!visibleGameCanvas(entry.rec.canvas))return;
    const t=now();
    if(!entry.queue){if(!force&&t<entry.scanAt)return;
      entry.queue=[entry.root];entry.index=0;entry.seen=new WeakSet();entry.scanAt=t+300;entry.scanCount=0;callbackStats.scans++;
    }
    const began=now();let processed=0;
    while(entry.index<entry.queue.length&&processed<CALLBACK_SCAN_NODES&&now()-began<2.5){
      const o=entry.queue[entry.index++];if(!o||typeof o!=='object'||entry.seen.has(o))continue;
      entry.seen.add(o);processed++;entry.scanCount++;callbackStats.nodes++;


      const children=inheritedDataValue(o,'children');
      if(Array.isArray(children))for(const child of children){
        if(entry.queue.length>=12000){entry.truncated=true;break;}entry.queue.push(child);
      }
      if(o!==entry.root && Array.isArray(children))installObjectCallback(o,t);
    }
    const elapsed=now()-began;callbackStats.scanMs+=elapsed;callbackStats.maxScanMs=Math.max(callbackStats.maxScanMs,elapsed);
    if(entry.index>=entry.queue.length){entry.queue=null;entry.seen=null;entry.lastNodes=entry.scanCount;}
  }
  function installSceneCallbacks(root,rec,source='scene-callback'){
    if(!root||!rec||!attached||suspended)return false;
    let entry=liveRoots.get(root);
    if(!entry){
      if(liveRoots.size>=CALLBACK_MAX_ROOTS)return false;
      detachTemporaryRoot(root);
      const objectHook=liveObjects.get(root);if(objectHook){restoreCallback(objectHook.hook);liveObjects.delete(root);}
      entry={root,rec,source,before:null,after:null,scanAt:-Infinity,queue:null,
        lastEvent:now(),lastNodes:0,truncated:false};liveRoots.set(root,entry);
    }else{entry.rec=rec;entry.lastEvent=now();}
    const rootEvent=(self,args,when)=>{
      const liveRec=callbackRec(args[0]);if(!liveRec)return;
      entry.rec=liveRec;entry.lastEvent=now();callbackStats.rootCallbacks++;
      liveRec.sceneCallbackCalls=(liveRec.sceneCallbackCalls||0)+1;
      if(liveRec.drawSource==='object-onAfterRender')scanCallbackRoot(entry);

      if(when==='after'&&args[3]&&args[4])forwardObjectDraw(self,args);


      if(when==='after'&&enabled)schedule(liveRec);
    };
    if(!entry.before)entry.before=putCallback(root,'onBeforeRender',(self,args)=>rootEvent(self,args,'before'));
    if(!entry.after)entry.after=putCallback(root,'onAfterRender',(self,args)=>rootEvent(self,args,'after'));
    scanCallbackRoot(entry,true);
    if(!callbackPump)callbackPump=setInterval(()=>{
      if(!attached||suspended||!enabled)return;
      let budget=now();
      for(const e of liveRoots.values()){
        if(now()-budget>6)break;
        if(now()-e.lastEvent<5000)scanCallbackRoot(e);
      }

      for(const [o,h]of liveObjects)if(now()-h.touched>12000){restoreCallback(h.hook);liveObjects.delete(o);callbackStats.pruned++;}
    },100);
    return !!(entry.before||entry.after);
  }
  function ensureObjectBridge(rec,reason='renderer-method-unavailable'){
    if(!rec||!rec.gl||!attached||suspended)return false;
    rec.drawSource='object-onAfterRender';rec.bridgeReason=reason;
    rec.bridgeSince=rec.bridgeSince||now();
    for(const [root,e]of liveRoots)if(e.rec===rec)scanCallbackRoot(e,true);


    for(const root of recoveryRoots)if(!liveRoots.has(root))hookRecoveryRoot(root);
    return true;
  }
  function disposeObjectBridge(){
    if(callbackPump)clearInterval(callbackPump);callbackPump=0;
    for(const h of liveObjects.values())restoreCallback(h.hook);liveObjects.clear();
    for(const e of liveRoots.values()){restoreCallback(e.after);restoreCallback(e.before);}liveRoots.clear();
  }
  function streamStatus(){
    const visible=[...records.values()].filter(r=>visibleGameCanvas(r.canvas));
    const calls=visible.reduce((n,r)=>n+r.calls,0);
    const roots=[...liveRoots.values()].filter(e=>visible.includes(e.rec));
    if(!records.size)return {phase:recoveryActive?'recovering-renderer':'renderer-not-found',
      message:recoveryActive?'Recovering live scene callbacks':'No renderer observed · ←/→ retries',label:recoveryActive?'RECOVERING RENDERER':'NO RENDERER · ←/→ RETRY'};
    if(!visible.length)return {phase:'waiting-game-canvas',message:'Renderer retained; waiting for the visible game canvas',label:'WAITING FOR GAME CANVAS'};
    if(!calls){
      const objectRoute=visible.some(r=>r.drawSource==='object-onAfterRender');
      const waiting=recoveryActive||visible.some(r=>now()-(r.bridgeSince||now())<6500);
      return {phase:objectRoute?(waiting?'waiting-object-callback':'object-callback-unavailable'):'draw-stream-unavailable',
        message:objectRoute?`Frozen/cached renderer methods · ${roots.length} live roots · ${liveObjects.size} object callbacks installed · ${waiting?'waiting for draw':'F9 reports callback availability'}`:'Renderer reference found but no draw callback has executed',
        label:objectRoute?(waiting?'WAITING FOR OBJECT DRAWS':'NO OBJECT DRAWS · F9 REPORT'):'NO DRAW CALLBACK · F9 REPORT'};
    }
    return {phase:'waiting-skinned-draw',message:`${calls} draw callbacks received · no eligible skinned shader observed`,label:`DRAWS ${calls} · NO SKINNED IDS`};
  }
  function callbackDiagnostics(){return {strategy:'renderer-method-or-instance-object-onAfterRender',
    ...callbackStats,activeObjects:liveObjects.size,activeRoots:liveRoots.size,
    roots:[...liveRoots.values()].slice(0,64).map(e=>({renderer:e.rec.id,source:e.source,
      before:!!e.before,after:!!e.after,nodes:e.lastNodes,pendingNodes:e.queue?e.queue.length-e.index:0,
      truncated:e.truncated,lastEventAgeMs:Math.round(now()-e.lastEvent)})),failures:callbackSamples.slice(),
    limitation:'Only exposed instance callbacks on discovered live scene trees; frozen/non-exposed object callbacks are not overwritten.'};}



  let splitSessionArmed = false, splitSessionAt = 0, splitSessionReason = 'not-armed';
  let phase = 'waiting-for-first-arrow', message = 'Enter a match, then use ← / →';
  let refreshTimer = 0, uiTime = 0, pendingDirection = 0;
  function errorScreenPresent() {
    try { return /(?:^|\n)\s*couldn['’]t\s+load\s+the\s+game\s*(?:\n|$)/i.test(document.body?.innerText || ''); }
    catch (_) { return false; }
  }
  function rendererBootWasMissed(){
    // performance.now() is navigation-relative. If document-start code itself first
    // executes many seconds into an already-running page and no renderer was observed,
    // the constructor's one-shot Three devtools event has already gone by.
    return records.size===0 && bootInjectionAt>10000;
  }
  const MAX_CANDIDATES = 256, MAX_DRAWS = 80, MAX_TRIANGLES = 400000;

  const VERSION='5.4.0';
  const SETTINGS_KEY='destiny-v5-premium-settings-5.1';
  const LEGACY_SETTINGS_KEY='destiny-v5-premium-settings';
  const PROFILES_KEY='destiny-v5-premium-profiles-5.1';
  const DEFAULTS=Object.freeze({outline:true,width:2,fps:0,color:'#ff356d',opacity:.42,resolution:.75,maxPixels:2500000,showStatus:true,
    visibilityMode:'unified',visibleStyle:'outline',hiddenStyle:'filled',visibleColor:'#49e3b6',visibleOpacity:.22,visibleEdgeColor:'#84ffcf',visibleEdgeOpacity:1,visibleWidth:2,hiddenColor:'#ff356d',hiddenOpacity:.42,hiddenEdgeColor:'#ff80cb',hiddenEdgeOpacity:.9,hiddenWidth:2,occlusionSeam:false,depthBias:4,depthFallback:'hide',
    visualStyle:'hybrid',edgeColor:'#ff80cb',edgeOpacity:.87,linkEdgeColor:true,hideDowned:true,menuScale:1,accent:'#8b7cff',autoArmAim:true,autoScan:true,
    aim:Object.freeze({enabled:false,silentAim:false,mode:'camera-direct',hold:'Either',activation:'hold',response:'stabilized',
      fov:300,smoothing:28,yaw:.002,pitch:.002,invertX:false,invertY:false,offsetYaw:0,offsetPitch:0,
      point:.52,localX:0,localY:0,localZ:0,maxStep:46,deadzone:1,sticky:true,showGuide:true,
      priority:'crosshair',lockPolicy:'balanced',switchBias:1,retainFov:1.35,graceMs:150,predictionMs:14,
      ignoreDowned:true,downedConfirmMs:140,downedRecoverMs:180,downedRatio:.48,lyingTilt:.8,filterLying:1,occlusionCheck:false,
      nearDamping:1,settlePx:1.6,anchor:'pose',targetZone:'top',topOffset:.03,recoilComp:0,adaptiveTargeting:true,dynamicFov:true,dynamicFovMin:.58,switchCooldownMs:120,verticalPrediction:1,confidenceMin:.22,maxDistance:0,distanceAware:true,distancePrecision:.9,distanceReferencePx:220,axes:'both',yawStrength:1,pitchStrength:1,
      marker:true,markerStyle:'cross',markerSize:7,markerColor:'#ff4f7f',markerOpacity:.9,
      guideColor:'#8b7cff',guideOpacity:.26,showLink:false}),
    fire:Object.freeze({enabled:false,mode:'trigger',hold:'RMB',route:'pointer-lock',triggerPx:7,rate:8,minConfidence:.35,maxTargetAgeMs:80,
      burstShots:3,burstGapMs:85,restoreDelayMs:0,autoHandoff:true,onlyCurrentDraw:true})});
  const isRecord=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const isColor=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
  function finite(value,fallback,min,max){
    if((typeof value!=='number'&&typeof value!=='string')||(typeof value==='string'&&!value.trim()))return fallback;
    const n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;
  }
  function validatedConfig(input={},previous=DEFAULTS){
    if(!isRecord(input))input={};
    const c={...previous,aim:{...previous.aim},fire:{...(previous.fire||DEFAULTS.fire)}},a=isRecord(input.aim)?input.aim:{},f=isRecord(input.fire)?input.fire:{};
    for(const k of ['outline','showStatus','linkEdgeColor','hideDowned','autoArmAim','autoScan','occlusionSeam'])if(typeof input[k]==='boolean')c[k]=input[k];
    for(const k of ['color','edgeColor','accent','visibleColor','visibleEdgeColor','hiddenColor','hiddenEdgeColor'])if(isColor(input[k]))c[k]=input[k].toLowerCase();
    const top={visibleWidth:[1,5],hiddenWidth:[1,5],visibleOpacity:[0,1],hiddenOpacity:[0,1],visibleEdgeOpacity:[0,1],hiddenEdgeOpacity:[0,1],depthBias:[0,16],width:[1,5],opacity:[0,1],edgeOpacity:[0,1],resolution:[.5,1],maxPixels:[250000,8300000],menuScale:[.8,1.2]};
    for(const [k,[min,max]]of Object.entries(top))if(input[k]!==undefined)c[k]=finite(input[k],c[k],min,max);
    c.width=Math.round(c.width);c.visibleWidth=Math.round(c.visibleWidth);c.hiddenWidth=Math.round(c.hiddenWidth);c.maxPixels=Math.round(c.maxPixels);
    if([0,20,30,60,90,120,144,165,240].includes(input.fps)||typeof input.fps==='string'&&/^(0|20|30|60|90|120|144|165|240)$/.test(input.fps))c.fps=Number(input.fps);
    if(['hybrid','outline','filled'].includes(input.visualStyle))c.visualStyle=input.visualStyle;
    if(['unified','split'].includes(input.visibilityMode))c.visibilityMode=input.visibilityMode;
    if(['hide','unified'].includes(input.depthFallback))c.depthFallback=input.depthFallback;
    for(const k of ['visibleStyle','hiddenStyle'])if(['off','hybrid','outline','filled'].includes(input[k]))c[k]=input[k];
    for(const k of ['enabled','silentAim','invertX','invertY','sticky','showGuide','marker','showLink','ignoreDowned','distanceAware','adaptiveTargeting','dynamicFov','filterLying','occlusionCheck'])if(typeof a[k]==='boolean')c.aim[k]=a[k];
    const enums={mode:['camera-direct','delta-hook','relative','mouse-assist'],activation:['hold','toggle'],response:['stabilized','smooth','precision','responsive','snap'],priority:['crosshair','distance'],lockPolicy:['balanced','hold-target'],anchor:['pose','geometry'],targetZone:['top','adaptive','torso','upper','head','custom'],axes:['both','yaw','pitch'],markerStyle:['cross','ring','brackets']};
    for(const [k,values]of Object.entries(enums))if(values.includes(a[k]))c.aim[k]=a[k];
    if(['RMB','LMB','Either','always'].includes(a.hold)||typeof a.hold==='string'&&/^(Key[A-Z]|Digit[0-9]|AltLeft|AltRight|ShiftLeft|ShiftRight)$/.test(a.hold))c.aim.hold=a.hold;
    const limits={downedConfirmMs:[60,500],downedRecoverMs:[60,700],downedRatio:[.25,.60],lyingTilt:[0,1],fov:[60,800],smoothing:[0,160],yaw:[.00005,.03],pitch:[.00005,.03],offsetYaw:[-20,20],offsetPitch:[-20,20],point:[.30,.80],topOffset:[0,.30],recoilComp:[0,.5],localX:[-10,10],localY:[-10,10],localZ:[-10,10],maxStep:[8,80],deadzone:[0,12],switchBias:[.25,3],retainFov:[1,1.6],graceMs:[0,200],predictionMs:[0,24],nearDamping:[.6,1.8],settlePx:[1,5],maxDistance:[0,10000],distancePrecision:[0,1],distanceReferencePx:[60,400],dynamicFovMin:[.3,1],switchCooldownMs:[0,500],verticalPrediction:[0,2],confidenceMin:[0,1],yawStrength:[0,1.5],pitchStrength:[0,1.5],markerSize:[3,18],markerOpacity:[0,1],guideOpacity:[0,1],filterLying:[0,1]};
    for(const [k,[min,max]]of Object.entries(limits))if(a[k]!==undefined)c.aim[k]=finite(a[k],c.aim[k],min,max);
    for(const k of ['markerColor','guideColor'])if(isColor(a[k]))c.aim[k]=a[k].toLowerCase();
    for(const k of ['enabled','autoHandoff','onlyCurrentDraw'])if(typeof f[k]==='boolean')c.fire[k]=f[k];
    if(['trigger','tracked','quickshot','burst','tap','manual-redirect'].includes(f.mode))c.fire.mode=f.mode;
    if(['pointer-lock','window'].includes(f.route))c.fire.route=f.route;
    if(['RMB','LMB','Either','always','aim'].includes(f.hold)||typeof f.hold==='string'&&/^(Key[A-Z]|Digit[0-9]|AltLeft|AltRight|ShiftLeft|ShiftRight)$/.test(f.hold))c.fire.hold=f.hold;
    const fireLimits={triggerPx:[1,48],rate:[1,20],minConfidence:[0,1],maxTargetAgeMs:[20,180],burstShots:[1,8],burstGapMs:[35,350],restoreDelayMs:[0,50]};
    for(const [k,[min,max]]of Object.entries(fireLimits))if(f[k]!==undefined)c.fire[k]=finite(f[k],c.fire[k],min,max);
    c.fire.burstShots=Math.round(c.fire.burstShots);
    return c;
  }
  let storageMessage='',migrationSource='defaults',saveTimer=0,activationLatched=false;
  let config=validatedConfig({});
  try{
    const current=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'null');
    if(current?.schema===5&&isRecord(current.settings)){config=validatedConfig(current.settings);migrationSource='5.1';if(current.version==='5.1.2'&&config.visibilityMode==='split'&&config.depthFallback==='hide'){config={...config,depthFallback:'unified'};migrationSource='5.1.2 safe visibility migration';}}
    else{
      const old=JSON.parse(localStorage.getItem(LEGACY_SETTINGS_KEY)||'null');
      if(old&&[1,2,3,4].includes(old.schema)&&isRecord(old.settings)){
        const patch={...old.settings,aim:{...old.settings.aim}};

        if(patch.aim.hold==='RMB')patch.aim.hold='Either';
        patch.edgeOpacity=Math.min(1,finite(patch.opacity,.42,0,1)+.45);
        config=validatedConfig(patch);migrationSource='5.0.x (original kept for rollback)';
      }
    }
  }catch(_){storageMessage='Saved settings unavailable; using defaults for this session.';}

  config.aim.enabled=false;config.fire.enabled=false;
  width=config.width;maskFPS=config.fps;

  let dispatchingAim=false;
  let menuOpen=false,menuHost=null,menuRoot=null,guide=null,menuTab='aim';
  const inputListeners=[];
  function listen(owner,type,fn,opts){owner.addEventListener(type,fn,opts);inputListeners.push([owner,type,fn,opts]);}
  function colorRGB(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);}

  function portableSettings(){return {...config,aim:{...config.aim,enabled:false},fire:{...config.fire,enabled:false}};}
  function saveSettings(){
    clearTimeout(saveTimer);saveTimer=0;
    try{localStorage.setItem(SETTINGS_KEY,JSON.stringify({schema:5,version:VERSION,settings:portableSettings()}));storageMessage='Saved on this browser';return true;}
    catch(_){storageMessage='Storage is unavailable. Settings apply for this session only.';return false;}
  }
  function queueSave(){clearTimeout(saveTimer);saveTimer=setTimeout(saveSettings,180);}
  function resetSettings(){disarmAimForSelection('defaults-restored');return settings({...DEFAULTS,aim:{...DEFAULTS.aim,enabled:false},fire:{...DEFAULTS.fire,enabled:false}});}
  const AIM_PRESETS=Object.freeze({
    balanced:{response:'stabilized',smoothing:28,maxStep:46,deadzone:1,settlePx:1.6,predictionMs:14,nearDamping:1},
    gentle:{response:'smooth',smoothing:85,maxStep:24,deadzone:1.2,settlePx:2,predictionMs:6,nearDamping:1.2},
    precise:{response:'precision',smoothing:42,maxStep:32,deadzone:1,settlePx:1.6,predictionMs:6,nearDamping:1.3},
    responsive:{response:'responsive',smoothing:24,maxStep:46,deadzone:1,settlePx:1.6,predictionMs:10,nearDamping:1.1},
    snap:{response:'snap',smoothing:0,maxStep:80,deadzone:0,settlePx:1,predictionMs:0,nearDamping:1,filterLying:1,graceMs:0,switchCooldownMs:0,confidenceMin:0}
  });
  function applyAimPreset(name){const p=AIM_PRESETS[name];if(!p)throw Error('Unknown aim preset');return settings({aim:{...p,enabled:false}});}
  function applyQuality(name){const p={performance:{resolution:.5,maxPixels:1000000,fps:0},balanced:{resolution:.75,maxPixels:2500000,fps:0},quality:{resolution:1,maxPixels:4150000,fps:0}}[name];if(!p)throw Error('Unknown quality preset');return settings(p);}
  function splitRuntimeActive(){return config.visibilityMode==='split'&&splitSessionArmed&&attached&&enabled&&!suspended&&!errorScreenPresent();}
  function disarmSplitSession(reason='disabled'){splitSessionArmed=false;splitSessionReason=reason;for(const r of records.values()){r.splitFrame=false;r.visibilityRetryAt=0;if(r.visibility)r.visibility.resetBatch();}return true;}
  function armSplitSession(){
    if(config.visibilityMode!=='split')return {ok:false,error:'Choose a split highlight mode first.'};
    if(!attached||document.readyState!=='complete'||errorScreenPresent())return {ok:false,error:'Enter a live match and select an ID before enabling split visibility.'};
    splitSessionArmed=true;splitSessionAt=now();splitSessionReason='explicit-session-enable';invalidate();paint(true);return {ok:true};
  }
  function applyHighlightPreset(name){
    const presets={
      outline:{visibilityMode:'unified',visualStyle:'outline'},
      filled:{visibilityMode:'unified',visualStyle:'filled'},
      hybrid:{visibilityMode:'unified',visualStyle:'hybrid'},
      'visible-outline-hidden-fill':{visibilityMode:'split',visibleStyle:'outline',hiddenStyle:'filled'},
      'visible-fill-hidden-outline':{visibilityMode:'split',visibleStyle:'filled',hiddenStyle:'outline'},
      'two-tone':{visibilityMode:'split',visibleStyle:'hybrid',hiddenStyle:'hybrid'},
      'visible-only':{visibilityMode:'split',visibleStyle:'outline',hiddenStyle:'off'},
      'hidden-only':{visibilityMode:'split',visibleStyle:'off',hiddenStyle:'filled'}
    };
    if(!presets[name])throw Error('Unknown highlight preset');
    return settings(presets[name]);
  }
  function downloadJSON(value,filename){
    const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download=filename;a.style.display='none';
    (document.body||document.documentElement).append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  }
  function exportSettings(){const out={product:'Destiny V5',schema:5,version:VERSION,settings:portableSettings()};downloadJSON(out,'destiny-v5-settings.json');return out;}
  function parseSettings(text){
    if(typeof text!=='string'||text.length>65536)throw Error('Choose a settings JSON file smaller than 64 KB.');
    const data=JSON.parse(text);
    if(!isRecord(data)||![1,2,3,4,5].includes(data.schema)||!isRecord(data.settings))throw Error('This is not a supported Destiny settings export.');
    const source={...data.settings,aim:isRecord(data.settings.aim)?{...data.settings.aim}:{},fire:isRecord(data.settings.fire)?{...data.settings.fire}:{}};
    if(data.schema<5&&source.aim.hold==='RMB')source.aim.hold='Either';
    if(data.schema<5)source.edgeOpacity=Math.min(1,finite(source.opacity,.42,0,1)+.45);
    const out=validatedConfig(source);out.aim.enabled=false;out.fire.enabled=false;return out;
  }
  function importSettings(text){const parsed=parseSettings(text);resetInput();clearTracking();return settings(parsed);}
  function loadProfiles(){
    try{const x=JSON.parse(localStorage.getItem(PROFILES_KEY)||'[]');
      return Array.isArray(x)?x.filter(p=>isRecord(p)&&typeof p.name==='string'&&p.name.trim()&&p.name.length<=32&&isRecord(p.settings)).slice(0,8).map(p=>{const v=validatedConfig(p.settings);return {name:p.name,settings:{...v,aim:{...v.aim,enabled:false},fire:{...v.fire,enabled:false}}};}):[];
    }catch(_){return [];}
  }
  function profileName(name){if(typeof name!=='string'||!name.trim()||name.trim().length>32)throw Error('Use a profile name with 1–32 characters.');return name.trim();}
  function saveProfile(name){name=profileName(name);const list=loadProfiles(),i=list.findIndex(p=>p.name===name);
    if(i<0&&list.length>=8)throw Error('Eight profiles are saved. Replace or remove one first.');
    const p={name,settings:portableSettings()};if(i<0)list.push(p);else list[i]=p;
    localStorage.setItem(PROFILES_KEY,JSON.stringify(list));return name;
  }
  function restoreProfile(name){const p=loadProfiles().find(p=>p.name===name);if(!p)throw Error('Profile not found');resetInput();clearTracking();return settings({...p.settings,aim:{...p.settings.aim,enabled:false},fire:{...p.settings.fire,enabled:false}});}
  function deleteProfile(name){const list=loadProfiles().filter(p=>p.name!==name);localStorage.setItem(PROFILES_KEY,JSON.stringify(list));return true;}
  function chooseID(id){const row=candidateRows().find(r=>r.id===Number(id)&&!r.viewmodelLike);if(!row)throw Error('This ID is no longer available');selected=row.id;pendingDirection=0;enabled=true;retryRow(row);onSelection();invalidate();syncMenu();paint(true);return row.id;}
  function onSelection(){clearTracking();resetFireState('selection-changed');config={...config,aim:{...config.aim,enabled:config.autoArmAim}};if(config.aim.enabled)armAimForCurrentSelection();else{aimSessionArmed=false;aimArmedSelection=null;}clearAim(config.aim.enabled?'aim-armed-for-current-id':'aim-disabled');saveSettings();syncMenu();}

  function error(stage, e, row = null) {
    const text = String(e?.message || e).slice(0, 900);
    if (!errors.some(x => x.stage === stage && x.message === text && x.id === row?.id)) {
      errors.push({stage, message: text, id: row?.id ?? null, time: Math.round(now())});
      if (errors.length > 32) errors.shift();
      console.warn('[Destiny V5]', stage, text);
    }
  }
  function canvasInfo(c) {
    try { const q = c.getBoundingClientRect(); return {width:c.width, height:c.height,
      cssWidth:Math.round(q.width), cssHeight:Math.round(q.height), connected:!!c.isConnected}; }
    catch (_) { return null; }
  }
  function ownDataValue(o,key){
    try { const d=Object.getOwnPropertyDescriptor(o,key); return d && 'value' in d ? d.value : undefined; }
    catch (_) { return undefined; }
  }
  function inheritedDataValue(o,key){
    try { for(let p=o,n=0;p&&n<7;p=Object.getPrototypeOf(p),n++){const d=Object.getOwnPropertyDescriptor(p,key);if(d)return 'value' in d?d.value:undefined;} }
    catch (_) {} return undefined;
  }
  function isSceneRoot(o){
    if(!o||typeof o!=='object') return false;
    const children=inheritedDataValue(o,'children');
    return Array.isArray(children) && (inheritedDataValue(o,'isScene')===true || inheritedDataValue(o,'isObject3D')===true || !!inheritedDataValue(o,'matrixWorld'));
  }
  function isRenderer(r) {
    try { return !!r && typeof r.render === 'function' && typeof r.getContext === 'function' && r.domElement?.tagName === 'CANVAS'; }
    catch (_) { return false; }
  }
  function visibleGameCanvas(c) {
    const i = canvasInfo(c);
    if (!i || !i.connected || i.cssWidth < 240 || i.cssHeight < 140) return false;
    const lock = document.pointerLockElement;
    if (lock?.tagName === 'CANVAS') return lock === c;
    let biggest = 0;
    for (const r of records.values()) {
      const j = canvasInfo(r.canvas);
      if (j?.connected) biggest = Math.max(biggest, j.cssWidth * j.cssHeight);
    }
    return i.cssWidth * i.cssHeight >= biggest * .8;
  }
  function observe(r) {
    if (!isRenderer(r) || records.has(r) || records.size >= 16) return;
    const rec = {id:nextRenderer++, renderer:r, canvas:r.domElement, gl:null,
      programs:new Map(), materials:new WeakMap(), pass:null, hooks:{}, calls:0,
      drawSource:'not-attached',bridgeReason:null,bridgeSince:0,methodAttachDone:false,methodCalls:0,
      objectCallbackCalls:0,sceneCallbackCalls:0,lastObjectCallbackAt:0,methodDescriptors:null,
      selectedDraws:0, replays:0, composites:0, skipped:0, pending:false,
      scope:false, scopeAt:-Infinity, lastSeen:0, lastMask:-Infinity, fresh:false,
      frameDraws:0, frameTriangles:0, resources:null, failed:false,
      unsupportedGeometries:[], lost:false, cloneAttempts:0, clones:0,
      frameTargets:new Map(), frameCaptureAt:0, latestCaptureAt:0, lastCompositeAge:0, maxCompositeAge:0,
      frameSerial:0, maskUpdates:0, staleComposites:0, throttledDraws:0, getterRoutes:null, passTargets:0,visibility:null,visibilityError:null,visibilityRetryAt:0,splitFrame:false,splitFallbacks:0};
    records.set(r, rec);
    recoveryRendererHits++;

    const lost = () => {rec.lost = true; rec.fresh = false; rec.resources = null;rec.visibility=null;
      for (const row of rec.programs.values()) {row.clone = null;row.depthClone=null;}};
    const restored = () => {rec.lost = false; rec.failed = false; rec.programs.clear();
      rec.materials = new WeakMap(); rec.lastMask = -Infinity;};
    rec.canvas.addEventListener('webglcontextlost', lost);
    rec.canvas.addEventListener('webglcontextrestored', restored);
    rec.listeners = {lost, restored};


    if (attached) queueMicrotask(() => {
      if (attached && !suspended && visibleGameCanvas(rec.canvas)) hookRenderer(rec);
    });
  }
  function rememberRecoveryRoot(root,source='unknown'){
    if(!isSceneRoot(root) || recoveryRoots.has(root) || recoveryRoots.size>=64) return false;
    recoveryRoots.add(root); recoveryRootHits++;
    if(recoveryEventSamples.length<12) recoveryEventSamples.push({kind:'root',source,type:String(root.type||''),children:Array.isArray(root.children)?root.children.length:null,time:Math.round(now())});
    if(attached && !liveRoots.has(root)) hookRecoveryRoot(root);
    return true;
  }
  function onObserve(e) {
    collectorEvents++;
    try {
      const d=e?.detail;
      if(recoveryEventSamples.length<12) recoveryEventSamples.push({kind:isRenderer(d)?'renderer':isSceneRoot(d)?'root':'other',source:'devtools-event',type:String(d?.type||d?.constructor?.name||''),hasRender:typeof d?.render==='function',hasContext:typeof d?.getContext==='function',hasCanvas:d?.domElement?.tagName==='CANVAS',time:Math.round(now())});
      if(isRenderer(d)) observe(d); else rememberRecoveryRoot(d,'devtools-event');
    } catch (err) { error('renderer-event', err); }
  }
  function installStableCollector() {
    try {
      collector = window.__THREE_DEVTOOLS__;
      if (collector === undefined) {
        collector = new EventTarget();
        collectorCreatedHere = true;
        define(window, '__THREE_DEVTOOLS__', {value:collector, configurable:true, writable:true});
        collectorPropertyMode = 'stable-data-property-created';
      } else {
        collectorPropertyMode = 'stable-existing-property';
      }
      if (typeof collector?.addEventListener === 'function') {
        collector.addEventListener('observe', onObserve);
        collectorLastAttach = {source:collectorCreatedHere?'created-document-start':'existing-document-start',time:Math.round(now())};
      }
    } catch (e) { error('optional-renderer-observer', e); }
  }
  installStableCollector();

  function restoreRecoveryRootHooks(){
    for(const h of recoveryRootHooks.splice(0).reverse()) try {
      if(h.root[h.name]!==h.wrapper) continue;
      if(h.descriptor) define(h.root,h.name,h.descriptor); else delete h.root[h.name];
    } catch(e){ error('restore-renderer-recovery-root',e); }
  }
  function stopRendererRecovery(reason='finished'){
    recoveryActive=false;
    if(recoveryTimer){clearTimeout(recoveryTimer);recoveryTimer=0;}
    if(recoveryWeakMap){
      const h=recoveryWeakMap; recoveryWeakMap=null; h.active=false;
      try { if(Object.getOwnPropertyDescriptor(h.proto,'get')?.value===h.wrapper) define(h.proto,'get',h.descriptor); }
      catch(e){error('restore-renderer-recovery-weakmap',e);}
    }
    restoreRecoveryRootHooks();
    if(attached && !suspended){const state=streamStatus();phase=state.phase;message=state.message;paint(true);}
  }
  function captureRendererFromCallback(args,source){
    try{
      const r=args?.[0];
      if(!isRenderer(r)) return false;
      if(recoveryEventSamples.length<12) recoveryEventSamples.push({kind:'renderer',source,type:String(r?.constructor?.name||''),hasRender:true,hasContext:true,hasCanvas:r?.domElement?.tagName==='CANVAS',time:Math.round(now())});
      observe(r);
      const rec=records.get(r);
      if(rec && attached && !suspended && visibleGameCanvas(rec.canvas)) {
        hookRenderer(rec);
        const root=args?.[1];
        if(isSceneRoot(root))installSceneCallbacks(root,rec,source);
      }
      return true;
    }catch(e){error('scene-renderer-recovery',e);return false;}
  }
  function hookRecoveryRoot(root){
    if(!attached || !isSceneRoot(root) || liveRoots.has(root)) return false;
    if(recoveryRootHooks.some(h=>h.root===root)) return true;
    for(const name of ['onAfterRender','onBeforeRender']){
      let raw; try{raw=root[name];}catch(_){continue;}
      if(typeof raw!=='function') continue;
      const d=Object.getOwnPropertyDescriptor(root,name);
      if(d && !d.configurable && (!('value'in d)||!d.writable)) continue;
      const wrapper=function(){
        const result=apply(raw,this,arguments);
        if(attached && !suspended) captureRendererFromCallback(arguments,'scene.'+name);
        return result;
      };
      try{define(root,name,d&&'value'in d?{...d,value:wrapper}:{value:wrapper,writable:true,configurable:true});recoveryRootHooks.push({root,name,descriptor:d,wrapper});return true;}
      catch(e){error('install-renderer-recovery-'+name,e);}
    }
    return false;
  }
  function startWeakMapRecovery(){
    if(recoveryWeakMap || !attached || suspended) return false;
    const proto=WeakMap.prototype,d=Object.getOwnPropertyDescriptor(proto,'get');
    if(!d||typeof d.value!=='function'||(!d.configurable&&!d.writable)) return false;
    const h={proto,descriptor:d,active:true,inside:false,wrapper:null};
    h.wrapper=function(key){
      const result=apply(d.value,this,arguments);
      if(h.active&&attached&&!h.inside&&key&&typeof key==='object'){
        h.inside=true;
        try{if(isSceneRoot(key)&&inheritedDataValue(key,'isCamera')!==true&&(inheritedDataValue(key,'isScene')===true||inheritedDataValue(key,'parent')==null)){recoveryWeakMapHits++;rememberRecoveryRoot(key,'bounded-weakmap');hookRecoveryRoot(key);}}
        catch(e){error('renderer-recovery-weakmap',e);}finally{h.inside=false;}
      }
      return result;
    };
    try{define(proto,'get',{...d,value:h.wrapper});recoveryWeakMap=h;return true;}catch(e){error('install-renderer-recovery-weakmap',e);return false;}
  }
  function boundedRendererScan(){
    const queue=[],seen=new WeakSet(),common=/render|scene|game|engine|world|app|three/i;
    try{
      for(const key of Object.getOwnPropertyNames(window)) if(common.test(key) && key!=='__THREE_DEVTOOLS__'){
        const v=ownDataValue(window,key); if(v&&typeof v==='object') queue.push([v,0]);
      }
      for(const c of document.querySelectorAll('canvas')) for(const key of Object.getOwnPropertyNames(c)){
        const v=ownDataValue(c,key); if(v&&typeof v==='object') queue.push([v,0]);
      }
    }catch(_){}
    let visited=0;
    for(let i=0;i<queue.length&&visited<1200&&!records.size;i++){
      const [o,depth]=queue[i]; if(!o||typeof o!=='object'||seen.has(o)||o===window||o===document||ArrayBuffer.isView(o)||o instanceof Node) continue;
      seen.add(o);visited++;
      if(isRenderer(o)){observe(o);break;}
      if(isSceneRoot(o)){rememberRecoveryRoot(o,'bounded-global-scan');hookRecoveryRoot(o);}
      if(depth>=3) continue;
      let keys=[];try{keys=Object.getOwnPropertyNames(o);}catch(_){continue;}
      keys.sort((a,b)=>Number(common.test(b))-Number(common.test(a)));
      for(const key of keys.slice(0,50)){
        if(['parent','window','document','ownerDocument','globalThis'].includes(key))continue;
        const v=ownDataValue(o,key); if(v&&typeof v==='object'&&!ArrayBuffer.isView(v)) queue.push([v,depth+1]);
      }
    }
    return visited;
  }
  function startRendererRecovery(reason='manual-retry'){
    if(!attached||suspended||recoveryActive) return false;
    if(candidateRows().some(r=>!r.viewmodelLike))return false;
    recoveryAttempts++; recoveryActive=true;
    phase='recovering-renderer'; message='Recovering renderer from live scene · '+recoveryRoots.size+' roots known';
    for(const root of recoveryRoots) hookRecoveryRoot(root);
    boundedRendererScan();


    startWeakMapRecovery();
    recoveryTimer=setTimeout(()=>stopRendererRecovery('6-second-budget'),6000);
    paint(true); return true;
  }
  function replace(rec, name, factory) {
    const r = rec.renderer, previous = hooks.slice().reverse().find(h => h.owner === r && h.name === name);
    if (previous && r[name] === previous.wrapper) return 'installed';
    const desc = Object.getOwnPropertyDescriptor(r, name), raw = r[name];
    if (typeof raw !== 'function') return 'not-exposed';
    if (desc && !desc.configurable && (!('value' in desc) || !desc.writable)) return 'frozen';
    const wrapper = factory(raw);
    try {
      define(r, name, desc && 'value' in desc ? {...desc, value:wrapper} : {value:wrapper, writable:true, configurable:true});
      hooks.push({owner:r, name, descriptor:desc, wrapper}); return 'installed';
    } catch (e) { error('attach-' + name, e); return 'failed'; }
  }
  function hookRenderer(rec) {
    if(rec.methodAttachDone)return;
    rec.methodAttachDone=true;
    rec.bridgeSince=now();
    rec.methodDescriptors={render:describeMethod(rec.renderer,'render'),renderBufferDirect:describeMethod(rec.renderer,'renderBufferDirect')};
    try {
      rec.gl = rec.renderer.getContext();
      if (!rec.gl || typeof rec.gl.createVertexArray !== 'function') {
        rec.hooks.renderBufferDirect = 'WebGL2-required'; return;
      }
      rec.hooks.renderBufferDirect = replace(rec, 'renderBufferDirect', raw => function(camera, scene, geometry, material, object, group) {
         rec.aimScene = scene;
         const result = apply(raw, this, arguments);
        rec.methodCalls++;
        if (attached && !suspended && !dispatchingAim && rec.drawSource==='renderer-method') {
          try { afterDraw(rec, geometry, material, object, group, camera); }
          catch (e) { rec.skipped++; error('after-draw', e); }
        }
        return result;
      });
      rec.drawSource=rec.hooks.renderBufferDirect==='installed'?'renderer-method':'object-onAfterRender';
      if(rec.drawSource==='object-onAfterRender')ensureObjectBridge(rec,'renderBufferDirect-'+rec.hooks.renderBufferDirect);

      rec.hooks.render = replace(rec, 'render', raw => function() {
        const result = apply(raw, this, arguments);


        if (attached && !suspended && !dispatchingAim) {if(splitRuntimeActive())resolveVisibility(rec,'scene-render-end');schedule(rec);}
        return result;
      });
    } catch (e) { error('attach-renderer', e); }
  }
  function start(reason = 'explicit-control') {
    if (suspended) return false;
    if (attached) {
      for(const rec of records.values())if(visibleGameCanvas(rec.canvas)&&!rec.calls)ensureObjectBridge(rec,'explicit-no-draw-retry');
      if(!candidateRows().some(r=>!r.viewmodelLike))startRendererRecovery('retry-control'); return true;
    }


    if (document.readyState !== 'complete' || errorScreenPresent()) {
      phase = 'activation-refused';
      message = 'Game is still loading or displaying an error · no hooks installed';
      return false;
    }
    attached = true;
    for (const rec of records.values()) if (visibleGameCanvas(rec.canvas)) hookRenderer(rec);
    if(!records.size||[...records.values()].some(r=>r.drawSource==='object-onAfterRender')){
      startRendererRecovery(rendererBootWasMissed()?'late-first-control':'first-control-no-draw-stream');
    }else{
      phase = 'listening';
      message = 'Waiting for live model draws · ← → select · ↓ off';
    }
    if (!refreshTimer) refreshTimer = setInterval(() => {
      if (suspended || !attached) return;
      if (errorScreenPresent()) { disarm('game-error-screen'); return; }
      if (!enabled) return;
      for (const rec of records.values()) {
        if (!visibleGameCanvas(rec.canvas)) continue;
        if(!rec.methodAttachDone)hookRenderer(rec);

        if(rec.drawSource==='renderer-method'&&!rec.calls&&now()-rec.bridgeSince>1800){
          ensureObjectBridge(rec,'cached-renderer-method-no-callback');startRendererRecovery('cached-method-fallback');
        }
        for (const [p, row] of rec.programs) {
          if (!rec.lost && row.candidate && now() - row.checkedAt > 2000) {
            row.checkedAt = now(); row.alive = rec.gl.isProgram(p);
          }
        }
      }

      if (selected !== null && !candidateRows().some(r => r.id === selected)) {
        selected = null; enabled = false; pendingDirection = 0; invalidate();
        phase = 'selection-expired'; message = 'Selected ID expired · ← → select again';
      }
      paint();
    }, 1200);
    paint(true); return true;
  }




  function enumerate(rec, p) {
    const g = rec.gl;
    if (!p) return null;
    let row = rec.programs.get(p);
    if (row) return row;
    if (!g.isProgram(p)) return null;
    if (rec.programs.size >= 768) return null;
    const attributes = [], uniforms = [];
    const na = Math.min(64, g.getProgramParameter(p, g.ACTIVE_ATTRIBUTES) || 0);
    for (let i=0; i<na; i++) { const a=g.getActiveAttrib(p,i); if(a) attributes.push({name:a.name, type:a.type, size:a.size, location:g.getAttribLocation(p,a.name)}); }

    const names = attributes.map(a => a.name);
    const candidate = names.includes('skinIndex') && names.includes('skinWeight');
    const nu = candidate ? Math.min(256,g.getProgramParameter(p,g.ACTIVE_UNIFORMS)||0) : 0;
    for (let i=0; i<nu; i++) { const u=g.getActiveUniform(p,i); if(u) uniforms.push({name:u.name, type:u.type, size:u.size}); }



    const uniformNames = new Set(uniforms.map(u=>u.name));
    const viewmodelScore = (uniformNames.has('projectionMatrix2')?2:0) + (uniformNames.has('squeeze')?2:0) +
      (uniformNames.has('xyMult')?1:0) + (uniformNames.has('fpLightPos[0]')?1:0);
    const viewmodelLike = viewmodelScore >= 2;
    row = {program:p, id:candidate ? nextCandidate++ : null, candidate, viewmodelLike,
      attributes, uniforms, clone:null, depthClone:null, depthCompatibility:null, failure:null, draws:0, replayed:0,
      lastSeen:0, checkedAt:now(), alive:true, renderer:rec.id,
      engineProgram:null, engineUniformRoot:null, engineLookup:{checked:false,programMatched:false,mapAvailable:false},
      uniformStats:{snapshots:0,reads:0,cacheReads:0,sourceRefreshes:0,failures:0},
      failureStage:null, failedUniform:null, retryAt:0, retryPaused:false, consecutiveFailures:0, recoveries:0};
    rec.programs.set(p, row); return row;
  }
  function programFor(rec, material) {


    let p = null;
    try {
      const v = rec.renderer.properties?.get(material);
      const item = v?.currentProgram || v?.program || material?.program;
      p = item?.program || null;
    } catch (_) {}
    if (!p) p = rec.gl.getParameter(rec.gl.CURRENT_PROGRAM);
    return p;
  }
  function rowFor(rec,material){
    if(material&&typeof material==='object'){
      const cached=rec.materials.get(material);if(cached?.alive)return cached;
      const row=enumerate(rec,programFor(rec,material));if(row)rec.materials.set(material,row);return row;
    }
    return enumerate(rec,programFor(rec,material));
  }
  function candidateRows() {
    const out=[];
    for (const rec of records.values()) for (const row of rec.programs.values())
      if (row.candidate && row.alive && row.draws > 0 && visibleGameCanvas(rec.canvas)) out.push(row);
    return out.sort((a,b) => a.id-b.id).slice(0,MAX_CANDIDATES);
  }
  function wants(row) { return enabled && !pendingDirection && (selected === null ? !row.viewmodelLike : selected === row.id); }

  function numericArray(a) { return ArrayBuffer.isView(a) && !(a instanceof DataView); }
  function attributeArray(a) {
    if (numericArray(a)) return a;
    if (numericArray(a?.array)) return a.array;
    if (numericArray(a?.data?.array)) return a.data.array;


    if (a && typeof a === 'object') for (const d of Object.values(Object.getOwnPropertyDescriptors(a)))
      if ('value' in d && numericArray(d.value)) return d.value;
    return null;
  }
  function drawRange(g, geometry, material, object, group) {
    if (!geometry || material?.wireframe) throw new Error('Unsupported or wireframe geometry; not replayed');
    const index = geometry.index ?? (typeof geometry.getIndex === 'function' ? geometry.getIndex() : null);
    const pos = geometry.attributes?.position ?? (typeof geometry.getAttribute === 'function' ? geometry.getAttribute('position') : null);
    const array = index ? attributeArray(index) : attributeArray(pos);
    let total = Number(index ? index.count : pos?.count);
    if (!Number.isFinite(total) && array) total = index ? array.length : array.length/(pos.itemSize || 3);
    if (!Number.isFinite(total) || total < 1) throw new Error('Draw-range metadata unavailable (index/position count)');
    const range = geometry.drawRange || {start:0,count:Infinity};
    const rs = Number.isFinite(Number(range.start)) ? Math.max(0,Number(range.start)) : 0;
    const rc = range.count === undefined ? Infinity : Number(range.count);
    const gs = group && Number.isFinite(Number(group.start)) ? Math.max(0,Number(group.start)) : 0;
    const gc = !group || group.count === undefined ? Infinity : Number(group.count);
    const start = Math.max(rs,gs), end = Math.min(total,rs+rc,gs+gc);
    const count = Math.max(0,Math.floor(end-start));
    if (!Number.isFinite(count) || count > MAX_TRIANGLES*3) throw new Error('Draw-range exceeds mask budget');
    let type = null, bytes = 0;
    if (index) {
      const tag=Object.prototype.toString.call(array);
      if(tag==='[object Uint32Array]'){type=g.UNSIGNED_INT;bytes=4;}
      else if(tag==='[object Uint16Array]'){type=g.UNSIGNED_SHORT;bytes=2;}
      else if(tag==='[object Uint8Array]'){type=g.UNSIGNED_BYTE;bytes=1;}
      else throw new Error('Index data type unavailable; refusing guessed index replay');
    }
    let instances = 1;
    if (object?.isInstancedMesh) instances = Number(object.count);
    else if (geometry.isInstancedBufferGeometry) instances = Math.min(Number(geometry.instanceCount),Number(geometry._maxInstanceCount ?? Infinity));
    if (!Number.isFinite(instances) || instances < 1 || instances > 4096) throw new Error('Invalid instance count');
    return {count, start:Math.floor(start), type, bytes, instances:Math.floor(instances), indexed:!!index};
  }

  function afterDraw(rec, geometry, material, object, group, camera) {
    rec.calls++;
    const t=now();
    if (t-rec.scopeAt > 500) {rec.scope=visibleGameCanvas(rec.canvas);rec.scopeAt=t;}
    if (!enabled || !rec.scope || rec.lost || rec.failed) return;
    const g=rec.gl, row=rowFor(rec,material);
    if (!row?.candidate) { schedule(rec); return; }
    row.draws++;row.lastSeen=t;
    if(recoveryActive&&!recoveryStopQueued&&!row.viewmodelLike){recoveryStopQueued=true;queueMicrotask(()=>{recoveryStopQueued=false;if(recoveryActive)stopRendererRecovery('live-candidate-observed');});}
    if (!wants(row) || row.retryPaused || t < row.retryAt) { schedule(rec); paint(); return; }
    rec.selectedDraws++;rec.lastSeen=t;
    const drawOutline = config.outline && (maskFPS === 0 || rec.fresh || t-rec.lastMask >= 1000/maskFPS);
    const collectAim = (config.aim.enabled||config.fire.enabled) && !row.viewmodelLike && !menuOpen;
    if (!drawOutline && !collectAim) {rec.throttledDraws++;schedule(rec);return;}
    if (rec.frameDraws >= MAX_DRAWS) {rec.skipped++;schedule(rec);return;}


    const current = g.getParameter(g.CURRENT_PROGRAM);
    if (current !== row.program) {rec.skipped++;error('material-program-mismatch','Cached material program was not the just-bound program',row);schedule(rec);return;}
    if (g.getParameter(g.TRANSFORM_FEEDBACK_ACTIVE) || g.getQuery(g.ANY_SAMPLES_PASSED,g.CURRENT_QUERY) || g.getQuery(g.ANY_SAMPLES_PASSED_CONSERVATIVE,g.CURRENT_QUERY)) {
      rec.skipped++;schedule(rec);return;
    }
    let range;
    try { range=drawRange(g,geometry,material,object,group); }
    catch(e) {rec.skipped++;error('draw-metadata',e,row);
      if(rec.unsupportedGeometries.length<4)rec.unsupportedGeometries.push({keys:Object.keys(geometry||{}).slice(0,50),hasIndex:!!geometry?.index,attributeKeys:Object.keys(geometry?.attributes||{}),message:String(e.message)});
      schedule(rec);return;}
    if(!range.count){schedule(rec);return;}
    if(rec.frameTriangles+range.count*range.instances/3>MAX_TRIANGLES){rec.skipped++;schedule(rec);return;}
    if(g.getProgramParameter(row.program,g.DELETE_STATUS)){rec.skipped++;invalidateFailedMask(rec);failRow(row,'source-program',new Error('Source program is pending deletion; no program swap attempted'));schedule(rec);paint();return;}
    if(!row.clone) {
      try { rec.cloneAttempts++;row.clone=cloneVertexProgram(g,row);rec.clones++; }
      catch(e) {invalidateFailedMask(rec);failRow(row,'mask-clone',e);schedule(rec);paint();return;}
    }



    let uniformSnapshot;
    try { uniformSnapshot=readUniformSnapshot(rec,row,material); }
    catch(e) {rec.skipped++;invalidateFailedMask(rec);failRow(row,'uniform-snapshot',e);schedule(rec);paint();return;}
    let life=null;
    try{life=observeDowned(rec,row,geometry,object,uniformSnapshot,camera,t);}
    catch(e){downedStats.lastError=String(e?.message||e).slice(0,180);}
    const downed=!!life?.blocked;
    if(collectAim&&!downed) {
      try { collectAimTarget(rec,row,geometry,object,uniformSnapshot,camera); }
      catch(e) {aimState.targetReadFailures++;aimState.lastError=String(e?.message||e).slice(0,240);}
    }
    if(!drawOutline||downed&&config.hideDowned){if(downed&&drawOutline)downedStats.hiddenDraws++;schedule(rec);paint();return;}
    if(splitRuntimeActive()){
      let splitResult='fallback';
      try{if(t>=rec.visibilityRetryAt)splitResult=captureVisibilityTarget(rec,row,range,uniformSnapshot,camera,t);}
      catch(e){failVisibility(rec,e);splitResult='fallback';}
      if(splitResult==='captured'){rec.splitFrame=true;schedule(rec);paint();return;}
      rec.splitFallbacks++;rec.splitFrame=false;



      if(config.depthFallback==='hide'){schedule(rec);paint();return;}
    }
    const state=capture(g,false);
    try {
      if (!rec.resources) rec.resources = new MaskResources(g);
      const gpu=rec.resources;

      g.bindBuffer(g.PIXEL_UNPACK_BUFFER,null);
      gpu.resize(g.drawingBufferWidth,g.drawingBufferHeight);
      g.bindBuffer(g.PIXEL_UNPACK_BUFFER,state.unpackBuffer);


      state.restoreTextures();
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,gpu.maskFBO);
      g.viewport(0,0,gpu.w,gpu.h);g.colorMask(true,true,true,true);
      neutral(g);
      if(!rec.fresh){g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);rec.frameDraws=0;rec.frameTriangles=0;}

      const target=typeof rec.renderer.getRenderTarget==='function'?rec.renderer.getRenderTarget():null;
      const tw=Number(target?.width)||g.drawingBufferWidth,th=Number(target?.height)||g.drawingBufferHeight;
      const v=state.viewport;
      g.viewport(Math.round(v[0]*gpu.w/tw),Math.round(v[1]*gpu.h/th),Math.max(1,Math.round(v[2]*gpu.w/tw)),Math.max(1,Math.round(v[3]*gpu.h/th)));
      g.useProgram(row.clone.program);
      uploadUniformSnapshot(g,row.clone,uniformSnapshot);

      if(range.indexed) {
        if(range.instances>1)g.drawElementsInstanced(g.TRIANGLES,range.count,range.type,range.start*range.bytes,range.instances);
        else g.drawElements(g.TRIANGLES,range.count,range.type,range.start*range.bytes);
      } else {
        if(range.instances>1)g.drawArraysInstanced(g.TRIANGLES,range.start,range.count,range.instances);
        else g.drawArrays(g.TRIANGLES,range.start,range.count);
      }
      if(!rec.fresh)rec.frameCaptureAt=t;
      rec.latestCaptureAt=t;
      rec.fresh=true;rec.replays++;row.replayed++;rec.frameDraws++;
      if(row.failure)row.recoveries++;
      row.failure=null;row.failureStage=null;row.failedUniform=null;row.retryAt=0;row.retryPaused=false;row.consecutiveFailures=0;
      rec.frameTriangles+=range.count*range.instances/3;
      phase='chams';message='Live filled chams';
    } catch(e) {rec.skipped++;invalidateFailedMask(rec);failRow(row,'mask-replay',e);}
    finally {state.restore();schedule(rec);paint();}
  }

  function compile(g, vertex, fragment, bindings=[]) {
    const shaders=[];let p=null;
    try {
      for(const [type,source]of[[g.VERTEX_SHADER,vertex],[g.FRAGMENT_SHADER,fragment]]){
        const sh=g.createShader(type);if(!sh)throw new Error('Shader allocation failed');shaders.push(sh);
        g.shaderSource(sh,source);g.compileShader(sh);
        if(!g.getShaderParameter(sh,g.COMPILE_STATUS))throw new Error(g.getShaderInfoLog(sh)||'Mask compile failed');
      }
      p=g.createProgram();if(!p)throw new Error('Program allocation failed');
      for(const sh of shaders)g.attachShader(p,sh);
      for(const b of bindings)if(b.location>=0)g.bindAttribLocation(p,b.location,b.name);
      g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw new Error(g.getProgramInfoLog(p)||'Mask link failed');
      return p;
    } catch(e) {if(p)g.deleteProgram(p);throw e;}
    finally {for(const sh of shaders)g.deleteShader(sh);}
  }
  const SAMPLERS=new Set([0x8B5E,0x8B5F,0x8B60,0x8B62,0x8DC1,0x8DC4,0x8DC5,0x8DCA,0x8DCB,0x8DCC,0x8DCF,0x8DD2,0x8DD3,0x8DD4,0x8DD7]);
  const SETTERS=new Map([[0x1406,'uniform1f'],[0x8B50,'uniform2fv'],[0x8B51,'uniform3fv'],[0x8B52,'uniform4fv'],
    [0x1404,'uniform1i'],[0x8B53,'uniform2iv'],[0x8B54,'uniform3iv'],[0x8B55,'uniform4iv'],
    [0x8B56,'uniform1i'],[0x8B57,'uniform2iv'],[0x8B58,'uniform3iv'],[0x8B59,'uniform4iv'],
    [0x1405,'uniform1ui'],[0x8DC6,'uniform2uiv'],[0x8DC7,'uniform3uiv'],[0x8DC8,'uniform4uiv'],
    [0x8B5A,'uniformMatrix2fv'],[0x8B5B,'uniformMatrix3fv'],[0x8B5C,'uniformMatrix4fv'],
    [0x8B65,'uniformMatrix2x3fv'],[0x8B66,'uniformMatrix2x4fv'],[0x8B67,'uniformMatrix3x2fv'],[0x8B68,'uniformMatrix3x4fv'],[0x8B69,'uniformMatrix4x2fv'],[0x8B6A,'uniformMatrix4x3fv']]);
  function cloneVertexProgram(g,row,depthPass=false) {
    const original=row.program;
    const shaders=g.getAttachedShaders(original)||[];
    const vertex=shaders.find(s=>g.getShaderParameter(s,g.SHADER_TYPE)===g.VERTEX_SHADER);
    const source=vertex && g.getShaderSource(vertex);
    if(!source)throw new Error('Live vertex shader source unavailable');


    const modern=/^\s*#version\s+300\s+es\b/m.test(source);
    const encode='vec4 destinyPackedDepth(){float d=floor(clamp(gl_FragCoord.z,0.0,1.0)*16777215.0+0.5);return vec4(floor(d/65536.0),floor(mod(d,65536.0)/256.0),mod(d,256.0),255.0)/255.0;}';
    const frag=modern?'#version 300 es\nprecision highp float;out vec4 destinyMaskColor;'+(depthPass?encode:'')+'void main(){destinyMaskColor='+(depthPass?'destinyPackedDepth()':'vec4(1.0)')+';}'
      :'precision highp float;'+(depthPass?encode:'')+'void main(){gl_FragColor='+(depthPass?'destinyPackedDepth()':'vec4(1.0)')+';}';
    const p=compile(g,source,frag,row.attributes), uniforms=[],blocks=[];
    try {
      const n=g.getProgramParameter(p,g.ACTIVE_UNIFORMS)||0;
      for(let i=0;i<n;i++){
        const u=g.getActiveUniform(p,i);if(!u)continue;
        const setter=SAMPLERS.has(u.type)?'uniform1i':SETTERS.get(u.type);

        const baseLoc=g.getUniformLocation(p,u.name);
        if(baseLoc===null)continue;
        if(!setter||typeof g[setter]!=='function')throw new Error('Unsupported mask uniform type '+u.type+' ('+u.name+')');
        for(let k=0;k<u.size;k++){

          const name=u.size>1?u.name.replace('[0]','['+k+']'):u.name;
          const from=g.getUniformLocation(original,name),to=g.getUniformLocation(p,name);
          if(from===null||to===null)throw new Error('Original uniform not available: '+name);
          uniforms.push({name,from,to,setter,type:u.type,size:u.size,element:k,
            readFn:null,readRoute:null,engineNode:null,engineOffset:0,attempts:0,nulls:0,exceptions:0,lastError:null});
        }
      }
      for(let i=0,n=g.getProgramParameter(p,g.ACTIVE_UNIFORM_BLOCKS)||0;i<n;i++){
        const name=g.getActiveUniformBlockName(p,i),sourceIndex=g.getUniformBlockIndex(original,name);
        if(sourceIndex===g.INVALID_INDEX)throw new Error('Original UBO missing: '+name);
        blocks.push({destination:i,source:sourceIndex,name});
      }

      for(let i=0,n=g.getProgramParameter(p,g.ACTIVE_ATTRIBUTES)||0;i<n;i++){
        const a=g.getActiveAttrib(p,i);
        if(g.getAttribLocation(p,a.name)!==g.getAttribLocation(original,a.name))throw new Error('Attribute binding mismatch: '+a.name);
      }
      return {program:p,uniforms,blocks,uniformIndex:new Map(uniforms.map((u,i)=>[u.name,i])),sourceLength:source.length};
    } catch(e){g.deleteProgram(p);throw e;}
  }


  function invalidateFailedMask(rec) {
    if(!rec.fresh&&rec.resources)rec.resources.ready=false;
  }
  function failRow(row,stage,e) {
    row.failure=String(e?.message||e);row.failureStage=stage;
    row.failedUniform=e?.uniformName||null;
    row.consecutiveFailures++;
    row.retryPaused=row.consecutiveFailures>=5;
    row.retryAt=now()+Math.min(8000,500*Math.pow(2,row.consecutiveFailures-1));
    error(stage,e,row);
  }
  function retryRow(row) {
    if(!row)return;
    row.retryAt=0;row.retryPaused=false;row.consecutiveFailures=0;
    row.engineUniformRoot=null;
    if(row.clone)for(const u of row.clone.uniforms){u.readFn=null;u.readRoute=null;u.engineNode=null;}
  }
  const UNIFORM_COMPONENTS=new Map([
    [0x8B50,2],[0x8B51,3],[0x8B52,4],[0x8B53,2],[0x8B54,3],[0x8B55,4],
    [0x8B57,2],[0x8B58,3],[0x8B59,4],[0x8DC6,2],[0x8DC7,3],[0x8DC8,4],
    [0x8B5A,4],[0x8B5B,9],[0x8B5C,16],[0x8B65,6],[0x8B66,8],
    [0x8B67,6],[0x8B68,12],[0x8B69,8],[0x8B6A,12]
  ]);
  function checkedValue(value,u) {
    if(value===null||value===undefined)return null;
    const count=UNIFORM_COMPONENTS.get(u.type)||1;
    const values=Array.isArray(value)||numericArray(value)?value:[value];
    if(values.length!==count)return null;
    const out=[];
    for(let i=0;i<count;i++){
      const v=typeof values[i]==='boolean'?Number(values[i]):values[i];
      if(typeof v!=='number'||!Number.isFinite(v))return null;
      if(!u.setter.endsWith('f')&&!u.setter.endsWith('fv')&&!Number.isInteger(v))return null;
      if(u.setter.includes('ui')&&(v<0||v>4294967295))return null;
      out.push(v);
    }
    if(count===1)return out[0];

    if(u.setter.includes('ui'))return new Uint32Array(out);
    if(u.setter.endsWith('iv'))return new Int32Array(out);
    return new Float32Array(out);
  }
  function methodRoutes(g,name) {


    const out=[],seen=new Set();
    function add(fn,label){if(typeof fn==='function'&&!seen.has(fn)){seen.add(fn);out.push({fn,label});}}
    try{add(g[name],'context.'+name);}catch(_){}
    let o=Object.getPrototypeOf(g);
    for(let level=1;o&&level<=4;level++,o=Object.getPrototypeOf(o)){
      const d=Object.getOwnPropertyDescriptor(o,name);
      if(d&&'value'in d)add(d.value,'prototype'+level+'.'+name);
    }
    return out;
  }
  function engineUniformRoot(rec,row,material) {
    let wrapper=null;
    row.engineLookup={checked:true,programMatched:false,mapAvailable:false,reason:'no-matching-program-with-getUniforms'};
    try {
      const props=rec.renderer.properties?.get(material);
      for(const item of [props?.currentProgram,props?.program,material?.program,row.engineProgram])
        if(item?.program===row.program&&typeof item.getUniforms==='function'){wrapper=item;break;}
      if(!wrapper){
        const list=rec.renderer.info?.programs;
        if(Array.isArray(list))for(let i=0;i<Math.min(list.length,768);i++){
          const item=list[i];
          if(item?.program===row.program&&typeof item.getUniforms==='function'){wrapper=item;break;}
        }
      }
      if(wrapper){
        row.engineProgram=wrapper;row.engineLookup.programMatched=true;
        const root=wrapper.getUniforms();
        row.engineLookup.rootKeys=root&&typeof root==='object'?Object.keys(root).slice(0,16):[];
        if(root&&typeof root==='object'&&root.map&&typeof root.map==='object'){row.engineLookup.mapAvailable=true;row.engineLookup.reason='uniform-map-available';return root;}
        row.engineLookup.reason='uniform-map-not-exposed';
      }
    }catch(e){error('engine-uniform-interface',e,row);}
    return null;
  }
  function engineLeaf(root,name) {


    const tokens=name.match(/[A-Za-z_]\w*|\d+/g)||[];
    let node=root;
    for(let i=0;i<tokens.length;i++){
      if(!node?.map||!Object.prototype.hasOwnProperty.call(node.map,tokens[i]))return null;
      node=node.map[tokens[i]];
      if(node&&!node.map){
        if(i===tokens.length-1)return {node,element:0};
        if(i===tokens.length-2&&/^\d+$/.test(tokens[i+1])&&Number.isInteger(node.size))
          return {node,element:Number(tokens[i+1])};
        return null;
      }
    }
    return null;
  }
  function valueFromEngine(u) {
    const node=u.engineNode,cache=node?.cache;
    if(!Array.isArray(cache)&&!numericArray(cache))return null;
    const count=UNIFORM_COMPONENTS.get(u.type)||1;
    const size=Number.isInteger(node.size)?node.size:1;
    if(size<1||u.engineOffset>=size||cache.length!==count*size)return null;
    const values=Array.prototype.slice.call(cache,u.engineOffset*count,(u.engineOffset+1)*count);
    return checkedValue(values,u);
  }
  function tryUniformRead(g,row,u,fn,loc) {
    if(!loc||typeof fn!=='function')return null;
    u.attempts++;row.uniformStats.reads++;
    try{
      const raw=apply(fn,g,[row.program,loc]);
      const value=checkedValue(raw,u);
      if(value===null){u.nulls++;u.lastError=raw==null?'null-result':'unexpected-value-shape';}
      return value;
    }catch(e){u.exceptions++;u.lastError=String(e?.message||e).slice(0,200);return null;}
  }
  function readUniformValue(rec,row,u,material,routes) {
    const g=rec.gl;
    if(u.readRoute==='engine-cache'){
      const value=valueFromEngine(u);
      if(value!==null){row.uniformStats.cacheReads++;return value;}
      u.readRoute=null;u.engineNode=null;
    }
    if(u.readFn){
      const value=tryUniformRead(g,row,u,u.readFn,u.from);
      if(value!==null)return value;
      u.readFn=null;
    }


    const locations=[{value:u.from,label:'cached-location'}];
    const attempted=new Map();
    function readLocation(loc){
      for(const route of routes){
        let tried=attempted.get(route.fn);if(!tried){tried=new Set();attempted.set(route.fn,tried);}
        if(!loc.value||tried.has(loc.value))continue;tried.add(loc.value);
        const value=tryUniformRead(g,row,u,route.fn,loc.value);
        if(value!==null){u.from=loc.value;u.readFn=route.fn;u.readRoute=route.label+'/'+loc.label;return value;}
      }
      return null;
    }
    let value=readLocation(locations[0]);if(value!==null)return value;
    for(const route of methodRoutes(g,'getUniformLocation')){
      let loc=null;
      try{loc=apply(route.fn,g,[row.program,u.name]);}catch(e){u.lastError=String(e?.message||e).slice(0,200);}
      if(!loc)continue;
      row.uniformStats.sourceRefreshes++;
      value=readLocation({value:loc,label:'fresh-'+route.label});if(value!==null)return value;
    }



    row.engineUniformRoot=engineUniformRoot(rec,row,material);
    const leaf=engineLeaf(row.engineUniformRoot,u.name);
    if(leaf){
      u.engineNode=leaf.node;u.engineOffset=leaf.element;
      if(leaf.element===0&&leaf.node.addr){
        value=readLocation({value:leaf.node.addr,label:'engine-upload-location'});
        if(value!==null)return value;
      }
      value=valueFromEngine(u);
      if(value!==null){u.readFn=null;u.readRoute='engine-cache';row.uniformStats.cacheReads++;return value;}
    }
    row.uniformStats.failures++;
    const e=new Error('Uniform snapshot unavailable: '+u.name+' ('+(u.lastError||'no-usable-location-or-cache')+')');
    e.uniformName=u.name;throw e;
  }
  function readUniformSnapshot(rec,row,material) {
    const g=rec.gl;
    if(g.getParameter(g.CURRENT_PROGRAM)!==row.program)throw new Error('Source program changed before uniform snapshot');
    const routes=rec.getterRoutes || (rec.getterRoutes=methodRoutes(g,'getUniform'));
    const values=row.clone.uniforms.map(u=>readUniformValue(rec,row,u,material,routes));
    const blocks=row.clone.blocks.map(b=>{
      const value=g.getActiveUniformBlockParameter(row.program,b.source,g.UNIFORM_BLOCK_BINDING);
      if(!Number.isInteger(value)||value<0)throw new Error('Uniform block binding unavailable: '+b.name);
      return value;
    });
    row.uniformStats.snapshots++;
    return {values,blocks};
  }
  function uploadUniformSnapshot(g,clone,snapshot) {
    for(let i=0;i<clone.uniforms.length;i++){
      const u=clone.uniforms[i],value=snapshot.values[i];
      if(u.setter.startsWith('uniformMatrix'))g[u.setter](u.to,false,value);
      else g[u.setter](u.to,value);
    }
    for(let i=0;i<clone.blocks.length;i++)g.uniformBlockBinding(clone.program,clone.blocks[i].destination,snapshot.blocks[i]);
  }
  function caps(g){return [g.BLEND,g.DEPTH_TEST,g.STENCIL_TEST,g.SCISSOR_TEST,g.CULL_FACE,g.RASTERIZER_DISCARD,g.SAMPLE_ALPHA_TO_COVERAGE,g.SAMPLE_COVERAGE];}
  function neutral(g){for(const c of caps(g))g.disable(c);}
  function capture(g,composite) {
    const s={program:g.getParameter(g.CURRENT_PROGRAM),fbo:g.getParameter(g.DRAW_FRAMEBUFFER_BINDING),
      viewport:g.getParameter(g.VIEWPORT),color:g.getParameter(g.COLOR_WRITEMASK),clear:g.getParameter(g.COLOR_CLEAR_VALUE),
      flags:caps(g).map(c=>[c,g.isEnabled(c)]),active:g.getParameter(g.ACTIVE_TEXTURE),textures:[],
      unpackBuffer:g.getParameter(g.PIXEL_UNPACK_BUFFER_BINDING),
      vao:composite?g.getParameter(g.VERTEX_ARRAY_BINDING):null,
      blend:composite?[g.getParameter(g.BLEND_SRC_RGB),g.getParameter(g.BLEND_DST_RGB),g.getParameter(g.BLEND_SRC_ALPHA),g.getParameter(g.BLEND_DST_ALPHA),g.getParameter(g.BLEND_EQUATION_RGB),g.getParameter(g.BLEND_EQUATION_ALPHA)]:null};

    const units=composite?[...new Set([s.active,g.TEXTURE0,g.TEXTURE1])]:[s.active];
    for(const unit of units){g.activeTexture(unit);s.textures.push({unit,texture:g.getParameter(g.TEXTURE_BINDING_2D),sampler:g.getParameter(g.SAMPLER_BINDING)});}
    g.activeTexture(s.active);
    s.restoreTextures=()=>{for(const t of s.textures){g.activeTexture(t.unit);g.bindTexture(g.TEXTURE_2D,t.texture);g.bindSampler(t.unit-g.TEXTURE0,t.sampler);}g.activeTexture(s.active);};
    s.restore=()=>{
      if(g.isContextLost())return;
      s.restoreTextures();g.bindBuffer(g.PIXEL_UNPACK_BUFFER,s.unpackBuffer);g.bindFramebuffer(g.DRAW_FRAMEBUFFER,s.fbo);g.viewport(...s.viewport);
      if(composite){g.bindVertexArray(s.vao);g.blendFuncSeparate(...s.blend.slice(0,4));g.blendEquationSeparate(...s.blend.slice(4));}
      for(const [c,on]of s.flags)on?g.enable(c):g.disable(c);
      g.colorMask(...s.color);g.clearColor(...s.clear);g.useProgram(s.program);
    };
    return s;
  }



  const VISIBILITY_PIXEL_LIMIT=8300000;
  const VISIBILITY_VS='#version 300 es\nprecision highp float;out vec2 uv;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);uv=p;gl_Position=vec4(p*2.0-1.0,0.0,1.0);}';
  function visibilityState(g){
    const base=capture(g,true),read=g.getParameter(g.READ_FRAMEBUFFER_BINDING),rb=g.getParameter(g.RENDERBUFFER_BINDING);
    const depth=[g.getParameter(g.DEPTH_FUNC),g.getParameter(g.DEPTH_WRITEMASK),g.getParameter(g.DEPTH_CLEAR_VALUE)];
    const flags=[g.DITHER,g.POLYGON_OFFSET_FILL].map(k=>[k,g.isEnabled(k)]);
    return {...base,depth,restore(){base.restore();if(g.isContextLost())return;
      g.bindFramebuffer(g.READ_FRAMEBUFFER,read);g.bindRenderbuffer(g.RENDERBUFFER,rb);
      g.depthFunc(depth[0]);g.depthMask(depth[1]);g.clearDepth(depth[2]);
      for(const[k,v]of flags)v?g.enable(k):g.disable(k);
    }};
  }
  function depthFormat(g,bits,stencil,floating){
    if(stencil===8&&bits===24&&!floating)return {internal:g.DEPTH24_STENCIL8,format:g.DEPTH_STENCIL,type:g.UNSIGNED_INT_24_8,attachment:g.DEPTH_STENCIL_ATTACHMENT};
    if(stencil===8&&bits===32&&floating)return {internal:g.DEPTH32F_STENCIL8,format:g.DEPTH_STENCIL,type:g.FLOAT_32_UNSIGNED_INT_24_8_REV,attachment:g.DEPTH_STENCIL_ATTACHMENT};
    if(stencil)return null;
    if(bits===16&&!floating)return {internal:g.DEPTH_COMPONENT16,format:g.DEPTH_COMPONENT,type:g.UNSIGNED_SHORT,attachment:g.DEPTH_ATTACHMENT};
    if(bits===24&&!floating)return {internal:g.DEPTH_COMPONENT24,format:g.DEPTH_COMPONENT,type:g.UNSIGNED_INT,attachment:g.DEPTH_ATTACHMENT};
    if(bits===32&&floating)return {internal:g.DEPTH_COMPONENT32F,format:g.DEPTH_COMPONENT,type:g.FLOAT,attachment:g.DEPTH_ATTACHMENT};
    return null;
  }
  function visibilitySource(rec,camera){
    const g=rec.gl,fbo=g.getParameter(g.DRAW_FRAMEBUFFER_BINDING),viewport=Array.from(g.getParameter(g.VIEWPORT));
    const target=rec.renderer.getRenderTarget?.();
    const d={fbo,camera,viewport,w:fbo?Number(target?.width):g.drawingBufferWidth,h:fbo?Number(target?.height):g.drawingBufferHeight,
      func:g.getParameter(g.DEPTH_FUNC),range:Array.from(g.getParameter(g.DEPTH_RANGE)),samples:g.getParameter(g.SAMPLES),depthBits:0,stencilBits:0,object:null,format:null,reason:null};
    d.reverse=d.func===g.GREATER||d.func===g.GEQUAL;
    if(!g.isEnabled(g.DEPTH_TEST))d.reason='model-depth-test-disabled';
    if(![g.LESS,g.LEQUAL,g.GREATER,g.GEQUAL].includes(d.func))d.reason='nonstandard-depth-comparison';
    if(g.isEnabled(g.STENCIL_TEST))d.reason='stencil-constrained-model-pass';
    if(g.isEnabled(g.POLYGON_OFFSET_FILL))d.reason='polygon-offset-model-pass';
    if(fbo){
      if(g.checkFramebufferStatus(g.DRAW_FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE){d.reason='source-framebuffer-incomplete';return d;}
      const kind=g.getFramebufferAttachmentParameter(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE);
      if(kind===g.NONE){d.reason='source-has-no-depth';return d;}
      d.object=g.getFramebufferAttachmentParameter(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);
      d.depthBits=Number(g.getFramebufferAttachmentParameter(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE));
      d.stencilBits=Number(g.getFramebufferAttachmentParameter(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE));
      const floating=g.getFramebufferAttachmentParameter(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE)===g.FLOAT;
      d.format=depthFormat(g,d.depthBits,d.stencilBits,floating);
      d.kind=kind===g.RENDERBUFFER?'renderbuffer':'texture';
      if(kind===g.RENDERBUFFER){
        const old=g.getParameter(g.RENDERBUFFER_BINDING);g.bindRenderbuffer(g.RENDERBUFFER,d.object);
        try{d.w=g.getRenderbufferParameter(g.RENDERBUFFER,g.RENDERBUFFER_WIDTH);d.h=g.getRenderbufferParameter(g.RENDERBUFFER,g.RENDERBUFFER_HEIGHT);
          if(d.format&&g.getRenderbufferParameter(g.RENDERBUFFER,g.RENDERBUFFER_INTERNAL_FORMAT)!==d.format.internal)d.format=null;
        }finally{g.bindRenderbuffer(g.RENDERBUFFER,old);}
      }
    }else{
      d.kind='default-framebuffer';d.depthBits=g.getParameter(g.DEPTH_BITS);d.stencilBits=g.getParameter(g.STENCIL_BITS);



      if(d.depthBits&&d.stencilBits===8)d.format=depthFormat(g,d.depthBits,8,d.depthBits===32);
      else d.reason=d.depthBits?'default-depth-format-not-exposed':'source-has-no-depth';
    }
    if(!d.format&&!d.reason)d.reason='unsupported-depth-format';
    if(!Number.isInteger(d.w)||!Number.isInteger(d.h)||d.w<1||d.h<1)d.reason='source-size-not-exposed';
    return d;
  }
  function depthProgramCompatible(rec,row){
    if(row.depthCompatibility!==null)return row.depthCompatibility;
    const g=rec.gl,shaders=g.getAttachedShaders(row.program)||[];
    const fs=shaders.find(s=>g.getShaderParameter(s,g.SHADER_TYPE)===g.FRAGMENT_SHADER);
    const src=fs?g.getShaderSource(fs)||'':'';


    const log=/^\s*#\s*define\s+USE_LOGDEPTHBUF(?:_EXT)?\b/m.test(src);
    const custom=/\bgl_FragDepth\s*=/.test(src)||(/\bgl_FragDepthEXT\s*=/.test(src)&&!/#\s*ifdef\s+USE_LOGDEPTHBUF_EXT\b/.test(src));
    row.depthCompatibility=log||custom?'custom-fragment-depth':true;return row.depthCompatibility;
  }
  function sameDepthGroup(a,b){return a&&a.fbo===b.fbo&&a.camera===b.camera&&a.object===b.object&&a.w===b.w&&a.h===b.h&&a.reverse===b.reverse&&a.range[0]===b.range[0]&&a.range[1]===b.range[1]&&a.reason===b.reason;}
  function replayRange(g,range){
    if(range.indexed){if(range.instances>1)g.drawElementsInstanced(g.TRIANGLES,range.count,range.type,range.start*range.bytes,range.instances);else g.drawElements(g.TRIANGLES,range.count,range.type,range.start*range.bytes);}
    else if(range.instances>1)g.drawArraysInstanced(g.TRIANGLES,range.start,range.count,range.instances);else g.drawArrays(g.TRIANGLES,range.start,range.count);
  }
  function captureVisibilityTarget(rec,row,range,snapshot,camera,t){
    if(!splitRuntimeActive())return 'inactive';
    const g=rec.gl,source=visibilitySource(rec,camera);



    if(source.reason||!source.fbo||!source.format){
      rec.visibilityError=source.reason||(!source.fbo?'default-framebuffer-depth-unsafe':'depth-format-unavailable');
      rec.visibilityRetryAt=t+1000;return 'fallback';
    }
    if(!Number.isInteger(source.w)||!Number.isInteger(source.h)||source.w<1||source.h<1){rec.visibilityError='Source dimensions unavailable';rec.visibilityRetryAt=t+1000;return 'fallback';}
    if(source.w*source.h>VISIBILITY_PIXEL_LIMIT){rec.visibilityError='Depth surface exceeds the 8.3M-pixel safety budget';rec.visibilityRetryAt=t+1000;return 'fallback';}
    const compatible=depthProgramCompatible(rec,row);if(compatible!==true){rec.visibilityError=String(compatible);rec.visibilityRetryAt=t+1000;return 'fallback';}
    if(rec.visibility?.pending&&!sameDepthGroup(rec.visibility.pending,source)){
      const pending=rec.visibility.pending;


      if(pending.camera!==source.camera&&(pending.fbo===source.fbo||(pending.object&&pending.object===source.object)))pending.reason='depth-reused-by-another-camera';
      resolveVisibility(rec,'source-or-camera-changed');
    }
    const saved=visibilityState(g);
    try{
      if(!rec.resources)rec.resources=new MaskResources(g);
      if(!rec.visibility)rec.visibility=new VisibilityResources(g);
      const v=rec.visibility;g.bindBuffer(g.PIXEL_UNPACK_BUFFER,null);rec.resources.resize(g.drawingBufferWidth,g.drawingBufferHeight);v.resize(source.w,source.h);
      if(!row.depthClone){
        const clone=cloneVertexProgram(g,row,true);
        try{
          clone.sourceIndices=clone.uniforms.map(u=>{const i=row.clone.uniformIndex.get(u.name);if(i===undefined)throw Error('Depth uniform map mismatch: '+u.name);return i;});
          clone.sourceBlocks=clone.blocks.map(b=>{const i=row.clone.blocks.findIndex(x=>x.name===b.name);if(i<0)throw Error('Depth UBO map mismatch');return i;});
          row.depthClone=clone;
        }catch(e){g.deleteProgram(clone.program);throw e;}
      }
      saved.restoreTextures();g.bindBuffer(g.PIXEL_UNPACK_BUFFER,saved.unpackBuffer);
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,v.targetFBO);neutral(g);g.disable(g.DITHER);g.disable(g.POLYGON_OFFSET_FILL);
      g.colorMask(true,true,true,true);g.depthMask(true);g.enable(g.DEPTH_TEST);g.depthFunc(source.reverse?g.GEQUAL:g.LEQUAL);
      if(!v.pending){g.clearColor(0,0,0,0);g.clearDepth(source.reverse?0:1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);v.pending=source;v.drawsInGroup=0;}


      g.viewport(...source.viewport);
      if(saved.flags.some(([k,on])=>k===g.SCISSOR_TEST&&on))g.enable(g.SCISSOR_TEST);
      if(saved.flags.some(([k,on])=>k===g.CULL_FACE&&on))g.enable(g.CULL_FACE);
      g.useProgram(row.depthClone.program);
      uploadUniformSnapshot(g,row.depthClone,{values:row.depthClone.sourceIndices.map(i=>snapshot.values[i]),blocks:row.depthClone.sourceBlocks.map(i=>snapshot.blocks[i])});
      replayRange(g,range);v.drawsInGroup++;v.targetDraws++;
      if(!rec.fresh)rec.frameCaptureAt=t;rec.latestCaptureAt=t;rec.fresh=true;rec.replays++;row.replayed++;rec.frameDraws++;rec.frameTriangles+=range.count*range.instances/3;
      if(row.failure)row.recoveries++;row.failure=null;row.failureStage=null;row.failedUniform=null;row.retryAt=0;row.retryPaused=false;row.consecutiveFailures=0;
      rec.visibilityError=null;
      return 'captured';
    }finally{saved.restore();}
  }
  function failVisibility(rec,e){
    rec.visibilityError=String(e?.message||e).slice(0,180);rec.visibilityRetryAt=now()+750;
    rec.visibility?.reject(rec.visibilityError);rec.visibility?.resetBatch();rec.fresh=false;
    if(rec.resources)rec.resources.ready=false;
  }
  function resolveVisibility(rec,timing){
    if(!rec.visibility?.pending||!rec.gl||rec.lost)return;
    if(!splitRuntimeActive()){rec.visibility.resetBatch();return;}
    const g=rec.gl,v=rec.visibility;let saved=null;
    try{
      if(g.getParameter(g.TRANSFORM_FEEDBACK_ACTIVE)||g.getQuery(g.ANY_SAMPLES_PASSED,g.CURRENT_QUERY)||g.getQuery(g.ANY_SAMPLES_PASSED_CONSERVATIVE,g.CURRENT_QUERY)){
        v.reject('game-query-active-at-depth-resolve');v.resetBatch();rec.fresh=false;return;
      }
      saved=visibilityState(g);v.resolve(rec.resources,timing);rec.visibilityError=null;
    }catch(e){failVisibility(rec,e);}
    finally{saved?.restore();}
  }
  class VisibilityResources{
    constructor(g){
      this.g=g;this.textures=[];this.fbos=[];this.programs=[];this.rbs=[];this.pending=null;this.aggregateFresh=false;
      this.w=0;this.h=0;this.copyFormat=0;this.drawsInGroup=0;this.targetDraws=0;this.resolves=0;this.unknownGroups=0;this.lastSource=null;this.phase='waiting';this.lastReason=null;this.timings={};this.issues=[];
      try{
        this.combine=compile(g,VISIBILITY_VS,'#version 300 es\nprecision highp float;in vec2 uv;out vec4 color;uniform sampler2D targetDepth;uniform sampler2D sceneDepth;uniform int known;uniform int reverseDepth;uniform float bias;void main(){vec4 p=texture(targetDepth,uv);float a=step(0.5,p.a);if(a<0.5){color=vec4(0.0);return;}if(known==0){color=vec4(1.0,0.0,0.0,1.0);return;}float z=dot(floor(p.rgb*255.0+0.5),vec3(65536.0,256.0,1.0))/16777215.0;float scene=texture(sceneDepth,uv).r;float visible=reverseDepth==1?step(scene-bias,z):step(z,scene+bias);color=vec4(a,a*visible,a*(1.0-visible),0.0);}');this.programs.push(this.combine);
        this.loc=Object.fromEntries(['targetDepth','sceneDepth','known','reverseDepth','bias'].map(n=>[n,g.getUniformLocation(this.combine,n)]));
        this.target=this.texture();this.copy=this.texture();this.targetFBO=this.framebuffer();this.copyFBO=this.framebuffer();
        this.depth=g.createRenderbuffer();if(!this.depth)throw Error('Target depth allocation failed');this.rbs.push(this.depth);this.vao=g.createVertexArray();
      }catch(e){this.dispose();throw e;}
    }
    texture(){const g=this.g,t=g.createTexture();if(!t)throw Error('Depth texture allocation failed');this.textures.push(t);g.bindTexture(g.TEXTURE_2D,t);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.NEAREST);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.NEAREST);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);return t;}
    framebuffer(){const f=this.g.createFramebuffer();if(!f)throw Error('Depth framebuffer allocation failed');this.fbos.push(f);return f;}
    resize(w,h){
      if(this.w===w&&this.h===h)return;this.w=w;this.h=h;this.copyFormat=0;const g=this.g;
      g.bindTexture(g.TEXTURE_2D,this.target);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
      g.bindRenderbuffer(g.RENDERBUFFER,this.depth);g.renderbufferStorage(g.RENDERBUFFER,g.DEPTH_COMPONENT24,w,h);
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,this.targetFBO);g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,this.target,0);g.framebufferRenderbuffer(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.RENDERBUFFER,this.depth);
      if(g.checkFramebufferStatus(g.DRAW_FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Target depth framebuffer incomplete');
    }
    setupCopy(format){
      if(this.copyFormat===format.internal)return;const g=this.g;g.bindBuffer(g.PIXEL_UNPACK_BUFFER,null);
      g.bindTexture(g.TEXTURE_2D,this.copy);g.texImage2D(g.TEXTURE_2D,0,format.internal,this.w,this.h,0,format.format,format.type,null);
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,this.copyFBO);
      g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.TEXTURE_2D,null,0);g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.STENCIL_ATTACHMENT,g.TEXTURE_2D,null,0);
      g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,format.attachment,g.TEXTURE_2D,this.copy,0);g.drawBuffers([g.NONE]);
      if(g.checkFramebufferStatus(g.DRAW_FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw Error('Scene-depth copy framebuffer incomplete');
      this.copyFormat=format.internal;
    }
    resolve(gpu,timing){
      const d=this.pending;if(!d)return;const g=this.g;this.timings[timing]=(this.timings[timing]||0)+1;let reason=d.reason;
      neutral(g);g.disable(g.DITHER);g.disable(g.POLYGON_OFFSET_FILL);g.colorMask(true,true,true,true);
      if(!reason&&d.fbo&&!g.isFramebuffer(d.fbo))reason='source-framebuffer-expired';
      if(!reason){
        this.setupCopy(d.format);g.bindFramebuffer(g.READ_FRAMEBUFFER,d.fbo);
        if(g.checkFramebufferStatus(g.READ_FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)reason='source-framebuffer-incomplete';
        else if(d.fbo&&g.getFramebufferAttachmentParameter(g.READ_FRAMEBUFFER,g.DEPTH_ATTACHMENT,g.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME)!==d.object)reason='source-depth-attachment-replaced';
        if(!reason&&d.kind==='renderbuffer'){
          g.bindRenderbuffer(g.RENDERBUFFER,d.object);
          if(g.getRenderbufferParameter(g.RENDERBUFFER,g.RENDERBUFFER_WIDTH)!==d.w||g.getRenderbufferParameter(g.RENDERBUFFER,g.RENDERBUFFER_HEIGHT)!==d.h)reason='source-depth-resized';
        }
        if(!reason&&!d.fbo&&(g.drawingBufferWidth!==d.w||g.drawingBufferHeight!==d.h))reason='default-depth-resized';
        if(!reason){
          g.bindFramebuffer(g.DRAW_FRAMEBUFFER,this.copyFBO);


          g.blitFramebuffer(0,0,this.w,this.h,0,0,this.w,this.h,g.DEPTH_BUFFER_BIT,g.NEAREST);
        }
      }
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,gpu.maskFBO);g.viewport(0,0,gpu.w,gpu.h);g.bindVertexArray(this.vao);g.depthMask(false);
      if(!this.aggregateFresh){g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);}
      g.enable(g.BLEND);g.blendEquationSeparate(g.MAX,g.MAX);g.blendFuncSeparate(g.ONE,g.ONE,g.ONE,g.ONE);
      g.activeTexture(g.TEXTURE0);g.bindSampler(0,null);g.bindTexture(g.TEXTURE_2D,this.target);
      g.activeTexture(g.TEXTURE1);g.bindSampler(1,null);g.bindTexture(g.TEXTURE_2D,reason?this.target:this.copy);
      g.useProgram(this.combine);g.uniform1i(this.loc.targetDepth,0);g.uniform1i(this.loc.sceneDepth,1);g.uniform1i(this.loc.known,reason?0:1);g.uniform1i(this.loc.reverseDepth,d.reverse?1:0);
      g.uniform1f(this.loc.bias,Math.max(config.depthBias/16777215,d.depthBits===16?1.5/65535:0));g.drawArrays(g.TRIANGLES,0,3);
      this.aggregateFresh=true;this.pending=null;this.resolves++;if(reason)this.unknownGroups++;
      this.lastReason=reason;this.phase=reason?'depth-unavailable':'depth-split-submitted';
      this.lastSource={kind:d.kind,width:d.w,height:d.h,depthBits:d.depthBits,stencilBits:d.stencilBits,samples:d.samples,reverse:d.reverse,viewport:d.viewport,format:d.format?.internal||null,timing};
    }
    resetBatch(){this.pending=null;this.aggregateFresh=false;}
    reject(reason){this.phase='depth-unavailable';this.lastReason=reason;if(this.issues.length<10&&!this.issues.includes(reason))this.issues.push(reason);}
    diagnostics(){return {mode:config.visibilityMode,phase:this.phase,reason:this.lastReason,fallback:config.depthFallback,targetDraws:this.targetDraws,resolves:this.resolves,unknownGroups:this.unknownGroups,source:this.lastSource,timings:{...this.timings},issues:this.issues.slice(),evidence:'GPU depth comparison submissions; no independent live-game pixel verification'};}
    dispose(){const g=this.g;for(const t of this.textures)g.deleteTexture(t);for(const f of this.fbos)g.deleteFramebuffer(f);for(const p of this.programs)g.deleteProgram(p);for(const r of this.rbs)g.deleteRenderbuffer(r);if(this.vao)g.deleteVertexArray(this.vao);this.resetBatch();}
  }
  class MaskResources {
    constructor(g){
      this.g=g;this.w=0;this.h=0;this.ready=false;this.textures=[];this.fbos=[];this.programs=[];
      try{
        const vs='#version 300 es\nout vec2 uv;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);uv=p;gl_Position=vec4(p*2.0-1.0,0.0,1.0);}';
        this.horizontal=compile(g,vs,'#version 300 es\nprecision highp float;in vec2 uv;out vec4 color;uniform sampler2D mask;uniform vec2 texel;uniform int radius;void main(){float a=0.0;for(int i=-8;i<=8;i++){if(abs(i)<=radius)a=max(a,texture(mask,uv+vec2(float(i)*texel.x,0.0)).r);}color=vec4(a);}');this.programs.push(this.horizontal);
        this.edge=compile(g,vs,'#version 300 es\nprecision highp float;in vec2 uv;out vec4 color;uniform sampler2D mask;uniform sampler2D expanded;uniform vec2 texel;uniform int radius;uniform vec3 tint;uniform vec3 edgeTint;uniform float opacity;uniform float edgeOpacity;uniform int style;void main(){float body=clamp(texture(mask,uv).r,0.0,1.0);if(style==2){color=vec4(tint*body*opacity,body*opacity);return;}float halo=0.0;for(int i=-8;i<=8;i++){if(abs(i)<=radius)halo=max(halo,texture(expanded,uv+vec2(0.0,float(i)*texel.y)).r);}float edge=clamp(halo-body,0.0,1.0);float fa=style==1?0.0:body*opacity;float ea=style==2?0.0:edge*edgeOpacity;float a=fa+ea*(1.0-fa);color=vec4(tint*fa+edgeTint*ea*(1.0-fa),a);}');this.programs.push(this.edge);
        this.hloc=Object.fromEntries(['mask','texel','radius'].map(n=>[n,g.getUniformLocation(this.horizontal,n)]));
        this.eloc=Object.fromEntries(['mask','expanded','texel','radius','tint','opacity','edgeTint','edgeOpacity','style'].map(n=>[n,g.getUniformLocation(this.edge,n)]));
        this.splitHorizontal=null;this.splitEdge=null;
        this.mask=this.texture();this.ping=this.texture();
        this.maskFBO=g.createFramebuffer();this.fbos.push(this.maskFBO);
        this.pingFBO=g.createFramebuffer();this.fbos.push(this.pingFBO);
        this.vao=g.createVertexArray();
      }catch(e){this.dispose();throw e;}
    }
    texture(){const g=this.g,t=g.createTexture();if(!t)throw new Error('Mask texture allocation failed');this.textures.push(t);g.bindTexture(g.TEXTURE_2D,t);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.NEAREST);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.NEAREST);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);return t;}
    resize(w,h){
      const scale=Math.min(config.resolution,Math.sqrt(config.maxPixels/Math.max(1,w*h)));
      w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));
      if(w===this.w&&h===this.h)return;
      this.w=w;this.h=h;this.ready=false;const g=this.g;
      for(const [t,f]of[[this.mask,this.maskFBO],[this.ping,this.pingFBO]]){
        g.bindTexture(g.TEXTURE_2D,t);g.texImage2D(g.TEXTURE_2D,0,g.RGBA8,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);
        g.bindFramebuffer(g.DRAW_FRAMEBUFFER,f);g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,t,0);
        if(g.checkFramebufferStatus(g.DRAW_FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw new Error('Mask framebuffer incomplete');
      }
    }
    finish(canvas,update,splitFrame=false){
      if(splitFrame&&splitRuntimeActive())return this.finishSplit(canvas,update);
      const g=this.g,rect=canvas.getBoundingClientRect(),radius=Math.max(1,Math.min(8,Math.round(width*this.w/Math.max(1,rect.width))));
      neutral(g);g.colorMask(true,true,true,true);g.bindVertexArray(this.vao);
      g.activeTexture(g.TEXTURE0);g.bindSampler(0,null);g.bindTexture(g.TEXTURE_2D,this.mask);
      g.activeTexture(g.TEXTURE1);g.bindSampler(1,null);g.bindTexture(g.TEXTURE_2D,this.ping);
      if(update&&config.visualStyle==='filled')this.ready=true;
      if(update&&config.visualStyle!=='filled'){
        g.bindFramebuffer(g.DRAW_FRAMEBUFFER,this.pingFBO);g.viewport(0,0,this.w,this.h);g.useProgram(this.horizontal);
        g.uniform1i(this.hloc.mask,0);g.uniform2f(this.hloc.texel,1/this.w,1/this.h);g.uniform1i(this.hloc.radius,radius);g.drawArrays(g.TRIANGLES,0,3);this.ready=true;
      }
      if(!this.ready)return false;
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,null);g.viewport(0,0,g.drawingBufferWidth,g.drawingBufferHeight);
      g.useProgram(this.edge);g.uniform1i(this.eloc.mask,0);g.uniform1i(this.eloc.expanded,1);g.uniform2f(this.eloc.texel,1/this.w,1/this.h);g.uniform1i(this.eloc.radius,radius);
      g.uniform3fv(this.eloc.tint,colorRGB(config.color));g.uniform1f(this.eloc.opacity,config.opacity);
      const edgeRGB=config.linkEdgeColor?colorRGB(config.color).map(v=>Math.min(1,v*1.35+.22)):colorRGB(config.edgeColor);
      g.uniform3fv(this.eloc.edgeTint,edgeRGB);g.uniform1f(this.eloc.edgeOpacity,config.edgeOpacity);g.uniform1i(this.eloc.style,{hybrid:0,outline:1,filled:2}[config.visualStyle]);
      g.enable(g.BLEND);g.blendEquationSeparate(g.FUNC_ADD,g.FUNC_ADD);g.blendFuncSeparate(g.ONE,g.ONE_MINUS_SRC_ALPHA,g.ZERO,g.ONE);
      g.drawArrays(g.TRIANGLES,0,3);return true;
    }
    ensureSplitPrograms(){
      if(this.splitEdge)return;const g=this.g;
      const regions='vec3 regions(vec4 m){float v=min(m.r,m.g);float h=min(m.r,m.b)*(1.0-v);float u=min(m.r,m.a)*(1.0-max(v,h));return vec3(v,h,u);}';
      try{
        this.splitHorizontal=compile(g,VISIBILITY_VS,'#version 300 es\nprecision highp float;in vec2 uv;out vec4 color;uniform sampler2D mask;uniform vec2 texel;uniform ivec3 radius;'+regions+'void main(){vec3 a=vec3(0.0);for(int i=-8;i<=8;i++){vec3 r=regions(texture(mask,uv+vec2(float(i)*texel.x,0.0)));if(abs(i)<=radius.x)a.x=max(a.x,r.x);if(abs(i)<=radius.y)a.y=max(a.y,r.y);if(abs(i)<=radius.z)a.z=max(a.z,r.z);}color=vec4(a,0.0);}');this.programs.push(this.splitHorizontal);
        this.splitEdge=compile(g,VISIBILITY_VS,'#version 300 es\nprecision highp float;in vec2 uv;out vec4 color;uniform sampler2D mask;uniform sampler2D expanded;uniform vec2 texel;uniform ivec3 radius;uniform ivec3 styles;uniform vec3 fillOpacity;uniform vec3 lineOpacity;uniform vec3 visibleTint;uniform vec3 visibleLine;uniform vec3 hiddenTint;uniform vec3 hiddenLine;uniform vec3 unknownTint;uniform vec3 unknownLine;uniform int seam;'+regions+'vec4 over(vec4 a,vec4 b){return a+b*(1.0-a.a);}vec4 layer(float body,float edge,int style,vec3 fill,vec3 line,float fo,float eo){if(style==3)return vec4(0.0);float fa=style==1?0.0:body*fo;float ea=style==2?0.0:edge*eo;return over(vec4(line*ea,ea),vec4(fill*fa,fa));}void main(){vec4 m=texture(mask,uv);vec3 r=regions(m),halo=vec3(0.0);for(int i=-8;i<=8;i++){vec3 h=texture(expanded,uv+vec2(0.0,float(i)*texel.y)).rgb;if(abs(i)<=radius.x)halo.x=max(halo.x,h.x);if(abs(i)<=radius.y)halo.y=max(halo.y,h.y);if(abs(i)<=radius.z)halo.z=max(halo.z,h.z);}vec3 edge=clamp(halo-(seam==1?r:vec3(m.r)),0.0,1.0);vec4 v=layer(r.x,edge.x,styles.x,visibleTint,visibleLine,fillOpacity.x,lineOpacity.x);vec4 h=layer(r.y,edge.y,styles.y,hiddenTint,hiddenLine,fillOpacity.y,lineOpacity.y);vec4 u=layer(r.z,edge.z,styles.z,unknownTint,unknownLine,fillOpacity.z,lineOpacity.z);color=over(v,over(h,u));}');this.programs.push(this.splitEdge);
        this.shloc=Object.fromEntries(['mask','texel','radius'].map(n=>[n,g.getUniformLocation(this.splitHorizontal,n)]));
        this.seloc=Object.fromEntries(['mask','expanded','texel','radius','styles','fillOpacity','lineOpacity','visibleTint','visibleLine','hiddenTint','hiddenLine','unknownTint','unknownLine','seam'].map(n=>[n,g.getUniformLocation(this.splitEdge,n)]));
      }catch(e){if(this.splitHorizontal){g.deleteProgram(this.splitHorizontal);this.programs=this.programs.filter(p=>p!==this.splitHorizontal);}this.splitHorizontal=null;this.splitEdge=null;throw e;}
    }
    finishSplit(canvas,update){
      this.ensureSplitPrograms();const g=this.g,rect=canvas.getBoundingClientRect();
      const radius=[config.visibleWidth,config.hiddenWidth,width].map(w=>Math.max(1,Math.min(8,Math.round(w*this.w/Math.max(1,rect.width)))));
      const codes={hybrid:0,outline:1,filled:2,off:3},styles=[codes[config.visibleStyle],codes[config.hiddenStyle],config.depthFallback==='hide'?3:codes[config.visualStyle]];
      neutral(g);g.colorMask(true,true,true,true);g.bindVertexArray(this.vao);
      g.activeTexture(g.TEXTURE0);g.bindSampler(0,null);g.bindTexture(g.TEXTURE_2D,this.mask);
      g.activeTexture(g.TEXTURE1);g.bindSampler(1,null);g.bindTexture(g.TEXTURE_2D,this.ping);
      if(update){
        if(styles.some(v=>v===0||v===1)){
          g.bindFramebuffer(g.DRAW_FRAMEBUFFER,this.pingFBO);g.viewport(0,0,this.w,this.h);g.useProgram(this.splitHorizontal);
          g.uniform1i(this.shloc.mask,0);g.uniform2f(this.shloc.texel,1/this.w,1/this.h);g.uniform3iv(this.shloc.radius,radius);g.drawArrays(g.TRIANGLES,0,3);
        }
        this.ready=true;
      }
      if(!this.ready)return false;
      g.bindFramebuffer(g.DRAW_FRAMEBUFFER,null);g.viewport(0,0,g.drawingBufferWidth,g.drawingBufferHeight);g.useProgram(this.splitEdge);
      const l=this.seloc;g.uniform1i(l.mask,0);g.uniform1i(l.expanded,1);g.uniform2f(l.texel,1/this.w,1/this.h);g.uniform3iv(l.radius,radius);g.uniform3iv(l.styles,styles);
      g.uniform3fv(l.fillOpacity,[config.visibleOpacity,config.hiddenOpacity,config.opacity]);g.uniform3fv(l.lineOpacity,[config.visibleEdgeOpacity,config.hiddenEdgeOpacity,config.edgeOpacity]);
      g.uniform3fv(l.visibleTint,colorRGB(config.visibleColor));g.uniform3fv(l.visibleLine,colorRGB(config.visibleEdgeColor));
      g.uniform3fv(l.hiddenTint,colorRGB(config.hiddenColor));g.uniform3fv(l.hiddenLine,colorRGB(config.hiddenEdgeColor));
      g.uniform3fv(l.unknownTint,colorRGB(config.color));g.uniform3fv(l.unknownLine,config.linkEdgeColor?colorRGB(config.color).map(v=>Math.min(1,v*1.35+.22)):colorRGB(config.edgeColor));g.uniform1i(l.seam,config.occlusionSeam?1:0);
      g.enable(g.BLEND);g.blendEquationSeparate(g.FUNC_ADD,g.FUNC_ADD);g.blendFuncSeparate(g.ONE,g.ONE_MINUS_SRC_ALPHA,g.ZERO,g.ONE);g.drawArrays(g.TRIANGLES,0,3);return true;
    }
    dispose(){const g=this.g;for(const t of this.textures)g.deleteTexture(t);for(const f of this.fbos)if(f)g.deleteFramebuffer(f);for(const p of this.programs)g.deleteProgram(p);if(this.vao)g.deleteVertexArray(this.vao);}
  }
  function schedule(rec){
    if(rec.pending||suspended||!attached||!enabled)return;
    rec.pending=true;
    queueMicrotask(()=>{try{flush(rec);}catch(e){rec.pending=false;rec.failed=true;error('flush',e);}});
  }
  function resolvePendingSelection() {
    if (!pendingDirection) return false;
    const rows=candidateRows().filter(r=>!r.viewmodelLike);
    if(!rows.length) return false;
    selected=(pendingDirection<0?rows[rows.length-1]:(rows.find(r=>!r.viewmodelLike)||rows[0])).id;
    pendingDirection=0;retryRow(rows.find(r=>r.id===selected));onSelection();invalidate();phase='candidate-selected';message='Model shader selected · '+(config.aim.enabled?'aim armed':'aim off');paint(true);
    return true;
  }
  function flush(rec){
    rec.pending=false;
    if(attached && enabled && resolvePendingSelection()){rec.frameTargets.clear();return;}
    if(!attached||suspended||!enabled||rec.lost||!visibleGameCanvas(rec.canvas)){rec.frameTargets.clear();return;}
    if(splitRuntimeActive())resolveVisibility(rec,'render-batch-end');
    const t=now();
    const inputAfterGraphics=()=>{try{finishAimFrame(rec,t);}catch(e){error('aim-update',e);}};


    if(!config.outline||!rec.resources){inputAfterGraphics();paint();return;}
    if(maskFPS===0 && !rec.fresh){rec.resources.ready=false;rec.frameDraws=0;rec.frameTriangles=0;inputAfterGraphics();paint();return;}
    if(!rec.fresh&&t-rec.lastSeen>120){rec.resources.ready=false;inputAfterGraphics();return;}
    if(!rec.fresh&&!rec.resources.ready){inputAfterGraphics();return;}
    const g=rec.gl;
    if(g.getParameter(g.TRANSFORM_FEEDBACK_ACTIVE)||g.getQuery(g.ANY_SAMPLES_PASSED,g.CURRENT_QUERY)||g.getQuery(g.ANY_SAMPLES_PASSED_CONSERVATIVE,g.CURRENT_QUERY)){rec.fresh=false;rec.resources.ready=false;rec.frameTargets.clear();clearAim('game-query-active');return;}
    const state=capture(g,true);
    try{
      if(rec.resources.finish(rec.canvas,rec.fresh,rec.splitFrame))rec.composites++;
      if(rec.fresh){rec.lastMask=t;rec.maskUpdates++;rec.frameSerial++;}
      else rec.staleComposites++;
      rec.lastCompositeAge=Math.max(0,t-rec.latestCaptureAt);
      rec.maxCompositeAge=Math.max(rec.maxCompositeAge,rec.lastCompositeAge);
    }
    catch(e){if(rec.splitFrame&&splitRuntimeActive())failVisibility(rec,e);else{error('outline-composite',e);rec.failed=true;}}
    finally{rec.fresh=false;rec.splitFrame=false;rec.frameDraws=0;rec.frameTriangles=0;if(rec.visibility)rec.visibility.resetBatch();state.restore();inputAfterGraphics();paint();}
  }
  function invalidate(){for(const r of records.values()){r.lastMask=-Infinity;r.fresh=false;r.splitFrame=false;r.frameDraws=0;r.frameTriangles=0;r.frameTargets.clear();r.visibilityRetryAt=0;if(r.visibility)r.visibility.resetBatch();if(r.resources)r.resources.ready=false;}}
  function cycle(direction){
    if(!start('first-arrow'))return {ok:false,error:message};
    enabled=true;
    const rows=candidateRows().filter(r=>!r.viewmodelLike);
    if(!rows.length){
      pendingDirection=direction<0?-1:1;
      if(!records.size){startRendererRecovery('arrow-no-renderer');phase='recovering-renderer';message='Recovering renderer from scene/root callbacks · selection queued';}
      else{phase='waiting-for-live-candidate';message='Renderer found · waiting for model draw · first selection queued';}
      paint(true);return {ok:false,pending:true,error:records.size?'no-live-candidate-yet':'renderer-recovery-active'};
    }
    pendingDirection=0;
    const at=rows.findIndex(r=>r.id===selected),n=rows.length;
    selected=rows[direction<0?(at<0?n-1:(at+n-1)%n):(at<0?0:(at+1)%n)].id;
    retryRow(rows.find(r=>r.id===selected));onSelection();invalidate();phase='candidate-selected';message='Model shader selected · '+(config.aim.enabled?'aim armed':'aim off');paint(true);return {ok:true,id:selected,count:n,aimArmed:config.aim.enabled};
  }
  function auto(){
    if(!start('up-key-or-explicit-auto'))return {ok:false,error:message};
    pendingDirection=0;selected=null;enabled=true;onSelection();for(const row of candidateRows())retryRow(row);invalidate();phase='auto-candidates';message='Automatic model scan · '+(config.aim.enabled?'aim armed':'aim off');paint(true);
    return {ok:true,mode:'automatic-skinned-candidates'};
  }
  function off(){enabled=false;pendingDirection=0;resetFireState('effects-paused');disarmSplitSession('effects-paused');disarmAimForSelection('paused');phase='off';message='Effects paused';invalidate();paint(true);return {ok:true};}
  function settings(o={}){
    const previous=config;
    const requestedAim=isRecord(o.aim)&&typeof o.aim.enabled==='boolean'?o.aim.enabled:null;
    const requestedFire=isRecord(o.fire)&&typeof o.fire.enabled==='boolean'?o.fire.enabled:null;
    config=validatedConfig(o,config);width=config.width;maskFPS=config.fps;
    if(config.visibilityMode!=='split')disarmSplitSession('unified-settings');
    const trackingKeys=['hold','activation','response','anchor','point','localX','localY','localZ','priority','predictionMs','axes','yaw','pitch','invertX','invertY','offsetYaw','offsetPitch','distanceAware','distancePrecision','distanceReferencePx','targetZone','adaptiveTargeting','dynamicFov','dynamicFovMin','switchCooldownMs','verticalPrediction','confidenceMin'];
    if(trackingKeys.some(k=>previous.aim[k]!==config.aim[k])){activationLatched=false;clearTracking();clearAim('settings-changed');}
    if(requestedAim===true){armAimForCurrentSelection();clearAim('aim-armed-for-current-id');}
    else if(requestedAim===false){aimSessionArmed=false;aimArmedSelection=null;aimArmedAt=0;activationLatched=false;clearTracking();clearAim('aim-disabled');}
    const fireChanged=Object.keys(config.fire).some(k=>previous.fire?.[k]!==config.fire[k]);
    if(requestedFire===false)resetFireState('fire-disabled');else if(requestedFire===true)resetFireState('fire-enabled');else if(fireChanged)resetFireState('fire-settings-changed');
    const visualChanged=['outline','width','fps','resolution','maxPixels','visualStyle','visibilityMode','visibleStyle','hiddenStyle','visibleWidth','hiddenWidth','occlusionSeam','depthBias','depthFallback'].some(k=>previous[k]!==config[k]);
    if(visualChanged)invalidate();saveSettings();syncMenu();paint(true);
    return {...config,aim:{...config.aim},fire:{...config.fire}};
  }

  function updateStatus() {
    if(!attached||!enabled)return;
    const rows=candidateRows();
    const active=rows.filter(r=>selected===null?!r.viewmodelLike:r.id===selected);
    if(!rows.length){const state=streamStatus();phase=state.phase;message=state.message;return;}
    if(!active.length){phase='waiting-for-model-candidate';message='Only weapon-like candidates observed so far';return;}
    const failed=active.find(r=>r.failure);
    if(failed&&active.every(r=>r.failure)){
      phase=failed.retryPaused?'uniform-retry-paused':'uniform-retry-wait';
      message='ID '+failed.id+' · '+(failed.failedUniform||failed.failureStage)+' unavailable · '+(failed.retryPaused?'arrow/up retries':'retry '+failed.consecutiveFailures+'/5');
    }else if(active.some(r=>r.replayed>0)){
      phase='rendering';message=config.visibilityMode==='split'?'Visible / occluded highlight layers':config.visualStyle+' mask submitted';
    }else{phase='candidate-selected';message='Model shader found · waiting for replay';}
  }
  function paint(force=false){
    if(!force&&now()-uiTime<400)return;uiTime=now();
    updateStatus();
    updateMenuLive();drawAimGuide();
    if(!attached)return;
    if(!config.showStatus){if(label)label.style.display='none';return;}
    if(!label){label=document.createElement('div');label.id='destiny-v5-status';label.style.cssText='position:fixed;left:18px;bottom:18px;z-index:2147483647;pointer-events:none;padding:8px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(8,10,15,.84);backdrop-filter:blur(14px);box-shadow:0 8px 28px rgba(0,0,0,.35);color:#f4f6fb;font:600 11px/1.2 Inter,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase';(document.body||document.documentElement).append(label);}
    label.style.display='block';
    const allCandidates=candidateRows(), ready=enabled&&allCandidates.some(r=>!r.viewmodelLike);
    const rawCount=allCandidates.length, usableCount=allCandidates.filter(r=>!r.viewmodelLike).length;
    const stream=streamStatus();
    label.textContent=!enabled?'●  DESTINY V5   ·   PAUSED':ready?'●  DESTINY V5   ·   AIM '+(config.aim.enabled?'ON':'OFF')+'   ·   FIRE '+(config.fire.enabled?config.fire.mode.toUpperCase():'OFF')+'   ·   VISUALS '+(config.outline?'ON':'OFF'):
      '●  DESTINY V5   ·   '+(rawCount?'MODEL FILTER · '+usableCount+'/'+rawCount+' IDS':stream.label);
    label.style.color=ready?'#dfffe8':'#ffd28a';
  }
  function disarm(reason='explicit-disarm'){
    disposeObjectBridge();stopRendererRecovery('disarm');
    enabled=false;attached=false;suspended=true;pendingDirection=0;resetFireState('suspended');disarmSplitSession(reason);clearAim('suspended');disposeMenu();phase='suspended';message=reason;invalidate();clearInterval(refreshTimer);refreshTimer=0;
    const restoreErrors=[];
    for(const h of hooks.splice(0).reverse())try{if(h.owner[h.name]===h.wrapper){if(h.descriptor)define(h.owner,h.name,h.descriptor);else delete h.owner[h.name];}}catch(e){restoreErrors.push(String(e));}
    for(const r of records.values())try{for(const row of r.programs.values())if(row.clone){r.gl.deleteProgram(row.clone.program);row.clone=null;}for(const row of r.programs.values())if(row.depthClone)r.gl.deleteProgram(row.depthClone.program);r.visibility?.dispose();r.visibility=null;r.resources?.dispose();r.resources=null;r.canvas.removeEventListener('webglcontextlost',r.listeners.lost);r.canvas.removeEventListener('webglcontextrestored',r.listeners.restored);}catch(e){restoreErrors.push(String(e));}
    collector?.removeEventListener?.('observe',onObserve);
    for(const [owner,type,fn,opts]of inputListeners)owner.removeEventListener(type,fn,opts);
    label?.remove();label=null;return {ok:!restoreErrors.length,errors:restoreErrors};
  }


  const geometryBounds=new WeakMap(), objectIds=new WeakMap(), syntheticEvents=new WeakSet();
  let nextObject=1, buttons=0, lastAimFrame=0, remainderX=0, remainderY=0;
  const heldKeys=new Set();
const aimState={status:'disabled',target:null,command:null,pending:null,sent:0,assisted:0,
      targetReadFailures:0,lastError:null,lastInputTrusted:null,method:'none',pointMethod:'pose-following-bone-anchor-or-bind-bounds',
      acceptance:'not-verified-by-game',lastSentAt:null,directApplied:0,directFailures:0,cameraRoute:'none'};
  const fireState={status:'disabled',mode:'none',targetId:null,target:null,attempts:0,pulses:0,alignments:0,restores:0,
    rejected:0,lastAt:0,lastTargetAt:0,lastError:null,lastRoute:'none',lastAcceptance:'not-tested',burstRemaining:0,nextBurstAt:0,tapTargetId:null};
  let fireRestoreTimer=0;
  function resetFireState(reason='idle',clearCounters=false){
    clearTimeout(fireRestoreTimer);fireRestoreTimer=0;fireState.status=reason;fireState.mode=config.fire?.mode||'none';fireState.targetId=null;fireState.target=null;fireState.burstRemaining=0;fireState.nextBurstAt=0;fireState.tapTargetId=null;
    if(clearCounters){fireState.attempts=0;fireState.pulses=0;fireState.alignments=0;fireState.restores=0;fireState.rejected=0;fireState.lastAt=0;fireState.lastTargetAt=0;fireState.lastError=null;fireState.lastRoute='none';fireState.lastAcceptance='not-tested';}
  }





  const aimTrackHistory=new Map();
  let aimBoneLocks=new WeakMap();


  const AIM_NEAR_NO_LEAD_PX=24;
  const AIM_TRACK_FILTER_NEAR_PX=34;
  let aimSessionArmed=false, aimArmedSelection=null, aimArmedAt=0;
  function clearTracking(){aimTrackHistory.clear();aimBoneLocks=new WeakMap();}
  function disarmAimForSelection(reason='selection-changed'){
    activationLatched=false;clearTracking();
    aimSessionArmed=false;aimArmedSelection=null;aimArmedAt=0;
    if(config.aim.enabled)config={...config,aim:{...config.aim,enabled:false}};
    clearAim(reason);saveSettings();syncMenu();
  }
  function armAimForCurrentSelection(){
    if(selected===null){aimSessionArmed=true;aimArmedSelection=null;}
    else{aimSessionArmed=true;aimArmedSelection=selected;}
    aimArmedAt=now();
  }
  function clearAim(reason='disabled'){
    aimState.status=reason;aimState.target=null;aimState.command=null;aimState.pending=null;
    remainderX=0;remainderY=0;lastAimFrame=0;drawAimGuide();
  }
  function isMenuEvent(e){return !!menuHost && e.composedPath().includes(menuHost);}
  function boundsOf(geometry){
    const a=geometry?.attributes?.position ?? geometry?.getAttribute?.('position');
    const values=attributeArray(a);if(!a||!values)return null;
    const stride=Number(a.data?.stride)||Number(a.itemSize)||3,offset=Number(a.offset)||0;
    const count=Math.min(Number(a.count)||Math.floor((values.length-offset)/stride),1000000);
    if(stride<3||count<1||!Number.isFinite(count))return null;
    const version=Number(a.version)||Number(a.data?.version)||0;
    const old=geometryBounds.get(a);
    if(old&&old.array===values&&old.count===count&&old.version===version)return old.bounds;
    const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
    const step=Math.max(1,Math.ceil(count/4096));
    for(let i=0;i<count;i+=step)for(let j=0;j<3;j++){
      const v=Number(values[offset+i*stride+j]);
      if(!Number.isFinite(v))return null;lo[j]=Math.min(lo[j],v);hi[j]=Math.max(hi[j],v);
    }
    if(!lo.every(Number.isFinite)||!hi.every(Number.isFinite))return null;
    const bounds={lo,hi,sampled:Math.ceil(count/step),approximate:step>1};
    geometryBounds.set(a,{array:values,count,version,bounds});return bounds;
  }
  function matrixVector(m,v){return [0,1,2,3].map(i=>m[i]*v[0]+m[4+i]*v[1]+m[8+i]*v[2]+m[12+i]*v[3]);}
  function matrixElements(value){
    const e=value?.elements??value;
    if(!e||typeof e.length!=='number'||e.length<16)return null;
    const out=Array.from(e).slice(0,16).map(Number);
    return out.every(Number.isFinite)?out:null;
  }
  function median(values){
    if(!values.length)return 0;const a=[...values].sort((x,y)=>x-y),m=a.length>>1;
    return a.length&1?a[m]:(a[m-1]+a[m])*.5;
  }
  function snapshotUniform(row,snapshot,name){
    const index=row.clone.uniformIndex.get(name);
    if(index===undefined)return null;
    const v=snapshot.values[index];return v&&v.length===16?v:null;
  }
  function zonePoint(zone,customPoint,screenHeightPx){
    if(zone==='top')return 1;
    if(zone==='torso')return .38;
    if(zone==='upper')return .54;
    if(zone==='head')return .72;
    if(zone==='custom')return customPoint;
    if(Number.isFinite(screenHeightPx)&&screenHeightPx>0){
      const far=Math.max(0,Math.min(1,1-screenHeightPx/Math.max(80,config.aim.distanceReferencePx)));
      return .52+.20*far;
    }
    return customPoint;
  }
  function targetConfidence(target){
    if(!target)return 0;
    let c=.35;
    if(/named-|stable-bone|height-matched-bone/.test(target.pose||''))c+=.28;
    else if(/geometry/.test(target.pose||''))c+=.10;
    if(Number.isFinite(target.screenHeightPx))c+=Math.min(.18,target.screenHeightPx/700);
    const centerFactor=1-Math.min(1,target.distance/Math.max(1,config.aim.fov));c+=centerFactor*.14;
    if(target.predicted)c-=.22;
    return Math.max(0,Math.min(1,c));
  }
  function boneWorldAnchor(object,point=.52){
    const bones=object?.skeleton?.bones;
    if(!Array.isArray(bones)||bones.length<2)return null;
    const points=[];
    for(const bone of bones){
      const m=matrixElements(bone?.matrixWorld);if(!m)continue;
      const p=[m[12],m[13],m[14]];if(p.every(Number.isFinite))points.push({bone,p,name:String(bone?.name||'').toLowerCase()});
    }
    if(points.length<2)return null;
    const namedHead=points.find(q=>/(^|[^a-z])(head|head_end|headtop)([^a-z]|$)/i.test(q.name));
    const namedUpper=points.find(q=>/(neck|upper.?spine|spine.?2|chest)/i.test(q.name));
    const namedMid=points.find(q=>/(spine|torso|hips|pelvis)/i.test(q.name));
    let named=null,method='';
    if(point>=.68&&namedHead){named=namedHead;method='named-head-bone';}
    else if(point>=.48&&namedUpper){named=namedUpper;method='named-upper-body-bone';}
    else if(namedMid){named=namedMid;method='named-torso-bone';}
    else if(namedUpper){named=namedUpper;method='named-upper-body-bone';}
    else if(namedHead){named=namedHead;method='named-head-bone';}
    if(named){aimBoneLocks.set(object,named.bone);return {point:named.p,method};}




    const xs=points.map(q=>q.p[0]),ys=points.map(q=>q.p[1]),zs=points.map(q=>q.p[2]);
    const cx=median(xs),cz=median(zs),minY=Math.min(...ys),maxY=Math.max(...ys);
    const targetY=minY+(maxY-minY)*Math.max(.20,Math.min(.90,point));
    const scoreOf=q=>Math.abs(q.p[1]-targetY)+Math.hypot(q.p[0]-cx,q.p[2]-cz)*.30;
    let best=null,bestScore=Infinity;
    for(const q of points){const score=scoreOf(q);if(score<bestScore){bestScore=score;best=q;}}
    const lockedBone=aimBoneLocks.get(object),locked=lockedBone&&points.find(q=>q.bone===lockedBone);
    if(locked){
      const span=Math.max(.001,maxY-minY),lockedScore=scoreOf(locked);
      if(lockedScore<=bestScore+span*.055)best=locked;
    }
    if(best)aimBoneLocks.set(object,best.bone);
    return best?{point:best.p,method:best===locked?'animated-stable-bone-lock':'animated-height-matched-bone'}:null;
  }
  function projectedModelHeightPx(rec,projection,row,snapshot,geometry){
    const b=boundsOf(geometry);if(!b)return null;
    const cx=(b.lo[0]+b.hi[0])*.5,cz=(b.lo[2]+b.hi[2])*.5;
    let low=null,high=null,mv=snapshotUniform(row,snapshot,'modelViewMatrix');
    if(mv){low=matrixVector(mv,[cx,b.lo[1],cz,1]);high=matrixVector(mv,[cx,b.hi[1],cz,1]);}
    else{const model=snapshotUniform(row,snapshot,'modelMatrix'),view=snapshotUniform(row,snapshot,'viewMatrix');if(!model||!view)return null;low=matrixVector(view,matrixVector(model,[cx,b.lo[1],cz,1]));high=matrixVector(view,matrixVector(model,[cx,b.hi[1],cz,1]));}
    const a=matrixVector(projection,low),z=matrixVector(projection,high);if(!a.every(Number.isFinite)||!z.every(Number.isFinite)||Math.abs(a[3])<1e-6||Math.abs(z[3])<1e-6)return null;
    const rect=rec.canvas.getBoundingClientRect(),vp=rec.gl.getParameter(rec.gl.VIEWPORT),target=rec.renderer.getRenderTarget?.();
    const th=Number(target?.height)||rec.gl.drawingBufferHeight,sy=rect.height/Math.max(1,th);
    const px=Math.abs(a[1]/a[3]-z[1]/z[3])*vp[3]*sy*.5;return Number.isFinite(px)&&px>0?px:null;
  }
  function projectViewTarget(rec,projection,view,id,row,poseMethod,screenHeightPx=null,downPx=0){
    const a=config.aim;
    const clip=matrixVector(projection,view);
    if(!clip.every(Number.isFinite)||clip[3]<=.000001)return null;
    let nx=clip[0]/clip[3],ny=clip[1]/clip[3];
    if(Math.abs(nx)>1.35||Math.abs(ny)>1.35)return null;
    const rect=rec.canvas.getBoundingClientRect(),g=rec.gl,vp=g.getParameter(g.VIEWPORT);
    const target=rec.renderer.getRenderTarget?.();
    const tw=Number(target?.width)||g.drawingBufferWidth,th=Number(target?.height)||g.drawingBufferHeight;
    const sx=rect.width/tw,sy=rect.height/th;


    if(downPx>0){const half=Math.max(1,vp[3]*sy/2);ny=Math.max(-1.35,ny-downPx/half);}
    const centerX=rect.left+(vp[0]+vp[2]/2)*sx;
    const centerY=rect.top+(th-vp[1]-vp[3]/2)*sy;
    const x=centerX+nx*vp[2]*sx/2,y=centerY-ny*vp[3]*sy/2;
    const distance=Math.hypot(x-centerX,y-centerY);
    const locked=!!(config.aim.sticky&&aimState.target?.id===id);
    let acquisitionFov=a.fov;
    if(a.dynamicFov&&Number.isFinite(screenHeightPx)&&screenHeightPx>0){
      const sizeRatio=Math.max(a.dynamicFovMin,Math.min(1,screenHeightPx/Math.max(80,a.distanceReferencePx)));
      acquisitionFov*=sizeRatio;
    }
    const allowedFov=locked?Math.min(1200,acquisitionFov*a.retainFov+40):acquisitionFov;
    if(!Number.isFinite(distance)||distance>allowedFov)return null;
    if(a.maxDistance>0&&Math.hypot(view[0],view[1],view[2])>a.maxDistance)return null;
    const t=now();
    const yaw=Math.atan2(nx,Math.abs(projection[0])||1),pitch=Math.atan2(-ny,Math.abs(projection[5])||1);
    const previous=aimTrackHistory.get(id);
    let fx=x,fy=y,fyaw=yaw,fpitch=pitch,vx=0,vy=0,yawVelocity=0,pitchVelocity=0;


    if(a.response!=='snap'&&previous&&t-previous.time>0&&t-previous.time<220){
      const dt=t-previous.time;
      const rawDistance=Math.hypot(x-centerX,y-centerY);


      const alpha=rawDistance<AIM_TRACK_FILTER_NEAR_PX?Math.min(.34,.20/a.nearDamping):Math.min(.58,.30+rawDistance/420);
      fx=previous.x+(x-previous.x)*alpha;fy=previous.y+(y-previous.y)*alpha;
      fyaw=previous.yaw+(yaw-previous.yaw)*alpha;fpitch=previous.pitch+(pitch-previous.pitch)*alpha;
      const cvx=(fx-previous.x)/dt,cvy=(fy-previous.y)/dt;
      const cyv=(fyaw-previous.yaw)/dt,cpv=(fpitch-previous.pitch)/dt;
      const vBlend=rawDistance<AIM_NEAR_NO_LEAD_PX?.12:.34;
      vx=(previous.vx||0)*(1-vBlend)+cvx*vBlend;vy=(previous.vy||0)*(1-vBlend)+cvy*vBlend;
      yawVelocity=(previous.yawVelocity||0)*(1-vBlend)+cyv*vBlend;pitchVelocity=(previous.pitchVelocity||0)*(1-vBlend)+cpv*vBlend;


      if(rawDistance<AIM_NEAR_NO_LEAD_PX){vx*=.18;vy*=.18;yawVelocity*=.12;pitchVelocity*=.12;}
      const maxScreenSpeed=3.2,maxAngularSpeed=.008;
      vx=Math.max(-maxScreenSpeed,Math.min(maxScreenSpeed,vx));vy=Math.max(-maxScreenSpeed,Math.min(maxScreenSpeed,vy));
      yawVelocity=Math.max(-maxAngularSpeed,Math.min(maxAngularSpeed,yawVelocity));pitchVelocity=Math.max(-maxAngularSpeed,Math.min(maxAngularSpeed,pitchVelocity));
    }
    const filteredDistance=Math.hypot(fx-centerX,fy-centerY);
    const out={id,rendererId:rec.id,programId:row.id,x:fx,y:fy,centerX,centerY,distance:filteredDistance,nx,ny,yaw:fyaw,pitch:fpitch,
      vx,vy,yawVelocity,pitchVelocity,viewDistance:Math.hypot(view[0],view[1],view[2]),screenHeightPx:Number.isFinite(screenHeightPx)?screenHeightPx:null,acquisitionFov,time:t,observedAt:t,point:a.point,pose:poseMethod};
    aimTrackHistory.set(id,out);
    if(aimTrackHistory.size>96){for(const [key,value] of aimTrackHistory)if(t-value.time>1000)aimTrackHistory.delete(key);}
    return out;
  }
  function findTHREE(){
    try { if (typeof window!=='undefined' && window.THREE) return window.THREE; } catch(_){}
    return null;
  }

  function isOccluded(camera, targetWorldPos, targetObject, scene) {
    if (!camera || !scene || !targetObject || !targetWorldPos) return false;
    const camPos = camera.position;
    if (!camPos || !Number.isFinite(camPos.x)) return false;
    const dx = targetWorldPos[0]-camPos.x, dy = targetWorldPos[1]-camPos.y, dz = targetWorldPos[2]-camPos.z;
    const dist = Math.hypot(dx,dy,dz);
    if (!Number.isFinite(dist) || dist < 0.01) return false;
    const THREE = findTHREE();
    if (THREE && THREE.Raycaster) {
      try {
        const raycaster = new THREE.Raycaster(camPos, new THREE.Vector3(dx,dy,dz).normalize());
        raycaster.far = dist;
        const hits = raycaster.intersectObjects(scene.children, true);
        for (const hit of hits) {
          const hitObj = hit.object;
          if (!hitObj || hitObj === targetObject) continue;
          let parent = hitObj.parent;
          let isDescendant = false;
          while (parent && parent !== scene) { if (parent === targetObject) { isDescendant = true; break; } parent = parent.parent; }
          if (isDescendant) continue;
          if (hit.distance < dist - 0.05) return true;
        }
        return false;
      } catch(_){}
    }
    const invDist = 1 / dist;
    const dir = [dx*invDist, dy*invDist, dz*invDist];
    function walkScene(obj) {
      if (!obj || typeof obj !== 'object') return false;
      if (obj === targetObject) return false;
      let parent = obj.parent;
      while (parent && parent !== scene) { if (parent === targetObject) return false; parent = parent.parent; }
      const pos = obj.position;
      if (pos && Number.isFinite(pos.x)) {
        const ox = pos.x - camPos.x, oy = pos.y - camPos.y, oz = pos.z - camPos.z;
        const proj = ox*dir[0] + oy*dir[1] + oz*dir[2];
        if (proj > 0.05 && proj < dist - 0.05) {
          const radius = obj.geometry?.boundingSphere?.radius ?? obj.geometry?.boundingBox
            ? Math.max(Math.abs(obj.geometry.boundingBox.max.x-obj.geometry.boundingBox.min.x),
                       Math.abs(obj.geometry.boundingBox.max.y-obj.geometry.boundingBox.min.y),
                       Math.abs(obj.geometry.boundingBox.max.z-obj.geometry.boundingBox.min.z)) * 0.5
            : 0;
          if (radius > 0) {
            const perpSq = ox*ox+oy*oy+oz*oz - proj*proj;
            if (perpSq < radius * radius) {
              const closestDist = Math.sqrt(Math.max(0, proj*proj + perpSq - radius*radius));
              if (closestDist < dist - 0.05) return true;
            }
          }
        }
      }
      const kids = obj.children;
      if (Array.isArray(kids)) {
        for (let i = 0; i < kids.length; i++) { if (walkScene(kids[i])) return true; }
      }
      return false;
    }
    return walkScene(scene);
  }

  function collectAimTarget(rec,row,geometry,object,snapshot,camera){
    if(camera&&typeof camera==='object')rec.aimCamera=camera;
    if(row.viewmodelLike||!object||typeof object!=='object')return;
    if(object.isInstancedMesh&&Number(object.count)>1||geometry?.isInstancedBufferGeometry){aimState.lastError='Per-instance aim point unavailable; no guessed point';return;}
    const a=config.aim;
    if(a.filterLying&&!row.viewmodelLike){
      try{const tilt=modelTiltUp(object,row,snapshot);
        if(tilt!==null&&tilt<=(Number(a.lyingTilt)||.8))return;
      }catch(_){}
    }
    const projection=snapshotUniform(row,snapshot,'projectionMatrix');
    if(!projection){aimState.lastError='Aim needs a projectionMatrix';return;}
    let id=objectIds.get(object);if(!id){id=nextObject++;objectIds.set(object,id);}
    const screenHeightPx=projectedModelHeightPx(rec,projection,row,snapshot,geometry);
    const topAim=a.targetZone==='top';
    const effectivePoint=a.adaptiveTargeting||topAim?zonePoint(a.targetZone,a.point,screenHeightPx):a.point;


    const topPx=topAim&&Number.isFinite(screenHeightPx)?Math.max(0,Math.min(.30,Number(a.topOffset)||.03))*screenHeightPx:0;


    const firing=!!(buttons&1)||!!(config.fire?.enabled&&fireActivationActive());
    const recoilPx=(Number(a.recoilComp)>0&&firing&&Number.isFinite(screenHeightPx))?Math.max(0,Math.min(.5,Number(a.recoilComp)))*screenHeightPx:0;
    const downPx=topPx+recoilPx;
    let view=null,poseMethod='projected-bind-geometry-point';
    const boneAnchor=(a.anchor==='pose')?boneWorldAnchor(object,effectivePoint):null;
    if(boneAnchor){
      const viewMatrix=matrixElements(camera?.matrixWorldInverse)||snapshotUniform(row,snapshot,'viewMatrix');
      if(viewMatrix){
        const p=boneAnchor.point;
        view=matrixVector(viewMatrix,[p[0]+a.localX,p[1]+a.localY,p[2]+a.localZ,1]);
        poseMethod=boneAnchor.method;
      }
    }
    if(!view){
      const bounds=boundsOf(geometry);
      if(!bounds){aimState.lastError='Aim needs position bounds';return;}
      const lo=bounds.lo,hi=bounds.hi;
      const local=[(lo[0]+hi[0])*.5+a.localX,lo[1]+(hi[1]-lo[1])*effectivePoint+a.localY,(lo[2]+hi[2])*.5+a.localZ,1];
      const mv=snapshotUniform(row,snapshot,'modelViewMatrix');
      if(mv)view=matrixVector(mv,local);
      else{
        const model=snapshotUniform(row,snapshot,'modelMatrix'),vm=snapshotUniform(row,snapshot,'viewMatrix');
        if(!model||!vm){aimState.lastError='Aim matrices unavailable; no guessed transform';return;}
        view=matrixVector(vm,matrixVector(model,local));
      }
      if(topAim)poseMethod='model-top-bounds';
    }
    if (a.occlusionCheck) {
      const scene = rec.aimScene;
      if (scene) {
        try {
          if (isOccluded(camera, view, object, scene)) return;
        } catch(_){}
      }
    }
    const candidate=projectViewTarget(rec,projection,view,id,row,poseMethod,screenHeightPx,downPx);
    if(candidate){candidate.effectivePoint=effectivePoint;candidate.targetZone=a.targetZone;candidate.confidence=targetConfidence(candidate);}
    if(!candidate)return;
    rec.frameTargets.set(id,candidate);rec.passTargets++;
  }



  let downedObjects=new WeakMap();
  const downedStates=new Map();
  const downedStats={samples:0,unknown:0,exclusions:0,recoveries:0,lockReleases:0,handoffs:0,
    hiddenDraws:0,pendingHandoff:null,lastHandoff:null,lastError:null};
  const DOWNED_SAMPLE_MS=60,DOWNED_MAX_OBJECTS=512;
  function downedObjectId(object){let id=objectIds.get(object);if(!id){id=nextObject++;objectIds.set(object,id);}return id;}
  function unit3(v){const n=Math.hypot(...v);return Number.isFinite(n)&&n>1e-8?v.map(x=>x/n):null;}
  function dot3(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function cross3(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  function affineMatrix(value){const m=matrixElements(value);return m&&Math.abs(m[3])+Math.abs(m[7])+Math.abs(m[11])<1e-5&&Math.abs(m[15]-1)<1e-4?m:null;}
  function ownValue(object,name){
    if(!object||typeof object!=='object')return undefined;
    try{const d=Object.getOwnPropertyDescriptor(object,name);return d&&'value'in d?d.value:undefined;}catch(_){return undefined;}
  }
  function explicitLifeEvidence(object,state){


    let alive=false,dead=false,reason=null;
    for(const [ownerIndex,owner] of [object,ownValue(object,'userData')].entries()){
      if(!owner||typeof owner!=='object')continue;
      for(const k of ['dead','isDead','downed','isDowned'])if(ownValue(owner,k)===true){dead=true;reason='exposed-'+k;}
      for(const k of ['alive','isAlive']){const v=ownValue(owner,k);if(v===false){dead=true;reason='exposed-'+k+'-false';}else if(v===true)alive=true;}
      for(const [key,maxKey]of [['health','maxHealth'],['hp','maxHp']]){
        const v=ownValue(owner,key),max=ownValue(owner,maxKey);
        if(typeof v!=='number'||!Number.isFinite(v))continue;
        const historyKey=ownerIndex+':'+key;
        if(v>0){if(!state.positiveHealth)state.positiveHealth=new Set();state.positiveHealth.add(historyKey);alive=true;}

        else if(state.positiveHealth?.has(historyKey)||typeof max==='number'&&Number.isFinite(max)&&max>0){dead=true;reason='exposed-'+key+'-empty';}
      }
    }
    return {dead,alive,reason};
  }
  function multiplyQuaternion(a,b){const[x,y,z,w]=a,[X,Y,Z,W]=b;return [w*X+x*W+y*Z-z*Y,w*Y-x*Z+y*W+z*X,w*Z+x*Y-y*X+z*W,w*W-x*X-y*Y-z*Z];}
  function localQuaternion(node){
    const q=node?.quaternion;
    if(q){const a=[q.x,q.y,q.z,q.w];if(a.every(x=>typeof x==='number'&&Number.isFinite(x))){const n=Math.hypot(...a);if(n>.9&&n<1.1)return a.map(v=>v/n);}}
    const r=node?.rotation;if(!r||![r.x,r.y,r.z].every(x=>typeof x==='number'&&Number.isFinite(x)))return null;
    const order=r.order||'XYZ';if(!['XYZ','YXZ','ZXY','ZYX','YZX','XZY'].includes(order))return null;
    const axis={X:[Math.sin(r.x/2),0,0,Math.cos(r.x/2)],Y:[0,Math.sin(r.y/2),0,Math.cos(r.y/2)],Z:[0,0,Math.sin(r.z/2),Math.cos(r.z/2)]};
    return [...order].reduce((p,k)=>multiplyQuaternion(p,axis[k]),[0,0,0,1]);
  }
  function upInCamera(camera,row,snapshot){
    const vm=affineMatrix(camera?.matrixWorldInverse)||affineMatrix(snapshotUniform(row,snapshot,'viewMatrix'));
    if(vm)return unit3([vm[4],vm[5],vm[6]]);
    const mw=affineMatrix(camera?.matrixWorld);
    if(mw){const x=unit3([mw[0],mw[1],mw[2]]),y=unit3([mw[4],mw[5],mw[6]]),z=unit3([mw[8],mw[9],mw[10]]);
      if(x&&y&&z&&Math.abs(dot3(x,y))+Math.abs(dot3(y,z))+Math.abs(dot3(z,x))<1e-3)return unit3([x[1],y[1],z[1]]);}

    const chain=[],seen=new Set();let node=camera;
    while(node&&chain.length<16&&!seen.has(node)){
      seen.add(node);const q=localQuaternion(node);if(!q)return null;chain.push(q);node=node.parent;
    }
    if(node||!chain.length)return null;
    let q=[0,0,0,1];for(let i=chain.length-1;i>=0;i--)q=multiplyQuaternion(q,chain[i]);
    const[x,y,z,w]=q;return unit3([2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)]);
  }
  function poseFrame(object,camera,row,snapshot){
    const world=affineMatrix(snapshotUniform(row,snapshot,'modelMatrix'))||affineMatrix(object?.matrixWorld);
    if(world)return {matrix:world,up:[0,1,0],space:'world'};
    const mv=affineMatrix(snapshotUniform(row,snapshot,'modelViewMatrix')),up=upInCamera(camera,row,snapshot);
    return mv&&up?{matrix:mv,up,space:'view-gravity-corrected'}:null;
  }
  function poseMetrics(points,up,torso=null){
    if(points.length<4)return null;
    const normal=unit3(up);if(!normal)return null;
    const horizontal=unit3(cross3(normal,Math.abs(normal[0])<.8?[1,0,0]:[0,0,1]));
    if(!horizontal)return null;const across=cross3(normal,horizontal);
    const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
    for(const p of points){if(!p||p.length<3||!p.slice(0,3).every(Number.isFinite))return null;
      const v=[dot3(p,normal),dot3(p,horizontal),dot3(p,across)];for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],v[j]);hi[j]=Math.max(hi[j],v[j]);}}
    const height=hi[0]-lo[0],span=Math.hypot(hi[1]-lo[1],hi[2]-lo[2]);
    if(!Number.isFinite(height+span)||Math.max(height,span)<1e-6)return null;
    const axis=torso&&unit3(torso),uprightness=axis?Math.abs(dot3(axis,normal)):null;
    return {height,horizontal:span,ratio:height/Math.max(span,1e-8),uprightness};
  }
  function skeletonPoseEvidence(object){
    const bones=object?.skeleton?.bones;
    if(!Array.isArray(bones)||bones.length<4)return null;
    const points=[],named=[];
    const step=Math.max(1,Math.ceil(bones.length/96));
    for(let i=0;i<bones.length;i+=step){const b=bones[i],m=affineMatrix(b?.matrixWorld);if(!m)continue;
      const p=[m[12],m[13],m[14]];points.push(p);named.push({p,name:String(b?.name||'').toLowerCase()});}
    if(points.length<4)return null;
    const hips=named.find(q=>/(hips|pelvis)/.test(q.name)),upper=named.find(q=>/(neck|chest|upper.?spine|spine.?2)/.test(q.name))||named.find(q=>/head/.test(q.name));
    const torso=hips&&upper?upper.p.map((v,i)=>v-hips.p[i]):null;
    const metrics=poseMetrics(points,[0,1,0],torso);
    return metrics?{...metrics,source:'animated-world-bones',count:points.length}:null;
  }
  function attrSpec(geometry,name){
    const a=geometry?.attributes?.[name]??geometry?.getAttribute?.(name),data=attributeArray(a);
    if(!a||!data||a.normalized)return null;
    const stride=Number(a.data?.stride)||Number(a.itemSize),offset=Number(a.offset)||0;
    const count=Number(a.count)||Math.floor((data.length-offset)/stride);
    return stride>0&&Number.isFinite(count)&&count>0?{data,stride,offset,count}:null;
  }
  function skinnedPoseEvidence(object,geometry,frame,row,snapshot){
    const sk=object?.skeleton,mats=sk?.boneMatrices??sk?.boneTexture?.image?.data;
    if(!frame||!mats||typeof mats.length!=='number'||mats.length<16)return null;
    const pos=attrSpec(geometry,'position'),idx=attrSpec(geometry,'skinIndex'),weight=attrSpec(geometry,'skinWeight');
    const bind=affineMatrix(snapshotUniform(row,snapshot,'bindMatrix'))||affineMatrix(object.bindMatrix);
    const inverse=affineMatrix(snapshotUniform(row,snapshot,'bindMatrixInverse'))||affineMatrix(object.bindMatrixInverse);
    if(!pos||!idx||!weight||pos.stride<3||idx.stride<4||weight.stride<4||!bind||!inverse)return null;
    const count=Math.min(pos.count,idx.count,weight.count),step=Math.max(1,Math.ceil(count/64)),points=[];
    for(let i=0;i<count;i+=step){
      const po=pos.offset+i*pos.stride,io=idx.offset+i*idx.stride,wo=weight.offset+i*weight.stride;
      const base=matrixVector(bind,[pos.data[po],pos.data[po+1],pos.data[po+2],1]),sum=[0,0,0,0];let total=0;
      if(!base.every(Number.isFinite))return null;
      for(let j=0;j<4;j++){const w=Number(weight.data[wo+j]),index=Number(idx.data[io+j]);if(w===0)continue;
        if(!Number.isFinite(w)||w<0||!Number.isInteger(index)||index<0||index*16+15>=mats.length)return null;
        const off=index*16;total+=w;
        for(let k=0;k<4;k++)sum[k]+=w*(mats[off+k]*base[0]+mats[off+4+k]*base[1]+mats[off+8+k]*base[2]+mats[off+12+k]*base[3]);
      }
      if(Math.abs(total-1)>.05)return null;
      const p=matrixVector(frame.matrix,matrixVector(inverse,sum));if(!p.every(Number.isFinite)||Math.abs(p[3])<1e-8)return null;
      points.push([p[0]/p[3],p[1]/p[3],p[2]/p[3]]);
    }
    const metrics=poseMetrics(points,frame.up);
    return metrics?{...metrics,source:'animated-cpu-skin-'+frame.space,count:points.length}:null;
  }
  function rootPoseEvidence(geometry,frame){
    if(!frame)return null;const b=boundsOf(geometry);if(!b)return null;
    const size=b.hi.map((x,i)=>x-b.lo[i]);

    if(size[1]<Math.max(size[0],size[2])*.85||size[1]<1e-7)return null;
    const points=[];
    for(const x of[b.lo[0],b.hi[0]])for(const y of[b.lo[1],b.hi[1]])for(const z of[b.lo[2],b.hi[2]])points.push(matrixVector(frame.matrix,[x,y,z,1]).slice(0,3));
    const m=frame.matrix,metrics=poseMetrics(points,frame.up,[m[4],m[5],m[6]]);
    return metrics?{...metrics,source:'root-bounds-'+frame.space,count:8}:null;
  }
  function measureDownedPose(object,geometry,camera,row,snapshot){
    const frame=poseFrame(object,camera,row,snapshot);



    const skinned=skinnedPoseEvidence(object,geometry,frame,row,snapshot);if(skinned)return skinned;
    const bones=skeletonPoseEvidence(object);if(bones)return bones;
    return rootPoseEvidence(geometry,frame);
  }



  function modelTiltUp(object,row,snapshot){
    const m=affineMatrix(snapshotUniform(row,snapshot,'modelMatrix'))||affineMatrix(object?.matrixWorld);
    if(!m)return null;
    const ux=m[4],uy=m[5],uz=m[6],len=Math.hypot(ux,uy,uz);
    if(!(len>1e-8))return null;
    const up=Math.abs(uy)/len;
    return Number.isFinite(up)?up:null;
  }
  function poseLabel(evidence){
    if(!evidence)return 'unknown';
    const threshold=config.aim.downedRatio,axis=evidence.uprightness;


    if(evidence.ratio<=threshold&&(axis===null||axis<=.45))return 'horizontal';
    if(evidence.ratio>=Math.max(.78,threshold+.25)&&(axis===null||axis>=.65))return 'upright';
    return 'uncertain';
  }
  function downedBlocked(id){return !!(config.aim.ignoreDowned&&downedStates.get(id)?.blocked);}
  function excludeDowned(state,reason){
    if(state.blocked)return;
    state.blocked=true;state.reason=reason;state.upSince=null;downedStats.exclusions++;
    aimTrackHistory.delete(state.id);
    for(const r of records.values())r.frameTargets.delete(state.id);
    if(aimState.target?.id===state.id){
      downedStats.lockReleases++;downedStats.pendingHandoff=state.id;
      clearAim('downed-target-released');
    }
  }
  function reviveDowned(state){
    if(!state.blocked)return;
    state.blocked=false;state.reason=null;state.explicitBlock=false;state.flatSince=null;state.upSince=null;
    state.flatVotes=0;state.upVotes=0;aimTrackHistory.delete(state.id);downedStats.recoveries++;
  }
  function observeDowned(rec,row,geometry,object,snapshot,camera,t=now()){
    if(!config.aim.ignoreDowned||row.viewmodelLike||!object||typeof object!=='object')return null;

    if(object.isInstancedMesh&&Number(object.count)>1||geometry?.isInstancedBufferGeometry)return null;
    let state=downedObjects.get(object);
    if(!state){state={id:downedObjectId(object),programId:row.id,rendererId:rec.id,blocked:false,reason:null,
      lastSeen:t,lastSample:-Infinity,flatSince:null,upSince:null,flatVotes:0,upVotes:0,positiveHealth:null,explicitBlock:false,evidence:null,label:'unknown'};downedObjects.set(object,state);}
    state.lastSeen=t;state.programId=row.id;downedStates.delete(state.id);downedStates.set(state.id,state);
    if(downedStates.size>DOWNED_MAX_OBJECTS)downedStates.delete(downedStates.keys().next().value);
    const explicit=explicitLifeEvidence(object,state);
    if(explicit.dead){state.explicitBlock=true;state.label='exposed-dead';excludeDowned(state,explicit.reason);return state;}
    if(state.explicitBlock&&explicit.alive){reviveDowned(state);state.lastSample=-Infinity;}
    if(t-state.lastSample<DOWNED_SAMPLE_MS)return state;
    const gap=t-state.lastSample;state.lastSample=t;downedStats.samples++;
    if(gap>300){state.flatSince=null;state.upSince=null;state.flatVotes=0;state.upVotes=0;}
    const tilt=modelTiltUp(object,row,snapshot);
    if(tilt!==null&&tilt<=(Number(config.aim.lyingTilt)||.8)){
      state.evidence={source:'model-tilt',uprightness:tilt,ratio:tilt,height:0,horizontal:1};state.label='horizontal';
    }else{
      try{state.evidence=measureDownedPose(object,geometry,camera,row,snapshot);state.label=poseLabel(state.evidence);}
      catch(e){state.evidence=null;state.label='unknown';downedStats.lastError=String(e?.message||e).slice(0,180);}
    }
    if(state.label==='horizontal'){
      state.upSince=null;state.upVotes=0;
      if(state.flatSince===null)state.flatSince=t;state.flatVotes++;


      const ev=state.evidence;
      const strong=!!ev&&((ev.source==='model-tilt'&&Number.isFinite(ev.uprightness)&&ev.uprightness<=.55)||(Number.isFinite(ev.ratio)&&ev.ratio<=.32));
      if(strong||(state.flatVotes>=2&&t-state.flatSince>=config.aim.downedConfirmMs))excludeDowned(state,'sustained-horizontal-pose');
    }else if(state.label==='upright'){
      state.flatSince=null;state.flatVotes=0;
      if(state.upSince===null)state.upSince=t;state.upVotes++;
      if(state.blocked&&state.upVotes>=2&&t-state.upSince>=config.aim.downedRecoverMs)reviveDowned(state);
    }else{
      state.flatSince=null;state.upSince=null;state.flatVotes=0;state.upVotes=0;
      if(state.label==='unknown')downedStats.unknown++;


    }
    return state;
  }
  function downedDiagnostics(){const t=now();return {enabled:config.aim.ignoreDowned,hide:config.hideDowned,
    confirmationMs:config.aim.downedConfirmMs,recoveryMs:config.aim.downedRecoverMs,
    stats:{...downedStats},objects:[...downedStates.values()].filter(s=>t-s.lastSeen<15000).slice(-80).map(s=>({
      id:s.id,programId:s.programId,blocked:s.blocked,label:s.label,reason:s.reason,ageMs:t-s.lastSeen,
      source:s.evidence?.source||null,ratio:s.evidence?.ratio??null,uprightness:s.evidence?.uprightness??null,
      samples:s.evidence?.count||0})),
    limitation:'Horizontal-pose heuristic, not verified health or ground contact. Alive prone poses may be excluded; opaque animated poses may be unknown.'};}

  function activationMatches(code){const h=config.aim.hold;return h===code||h==='Either'&&(code==='LMB'||code==='RMB');}
  function activationPress(code){if(config.aim.activation==='toggle'&&config.aim.hold!=='always'&&activationMatches(code)&&inputAllowed())activationLatched=!activationLatched;}
  function activeHold(){
    const h=config.aim.hold;
    if(h==='always')return true;
    if(config.aim.activation==='toggle')return activationLatched;
    return h==='RMB'&&!!(buttons&2)||h==='LMB'&&!!(buttons&1)||h==='Either'&&!!(buttons&3)||heldKeys.has(h);
  }

  function focusedEditable(){
    let node=document.activeElement;
    for(let i=0;node?.shadowRoot?.activeElement&&i<8;i++)node=node.shadowRoot.activeElement;
    return !!node&&(node.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName||''));
  }
  function inputAllowed(){
    return config.aim.enabled && aimSessionArmed && aimArmedSelection===selected && enabled && attached && !suspended && !menuOpen && !focusedEditable() && !document.hidden && document.hasFocus() && !!document.pointerLockElement;
  }
  function applyDirectAim(rec,yaw,pitch,gain,shotSync=false){
    const camera=rec?.aimCamera;
    if(!camera||typeof camera!=='object'){aimState.directFailures++;aimState.lastError='No live render camera available';return false;}
    const a=config.aim;
    const yawScale=.002/Math.max(.00005,a.yaw),pitchScale=.002/Math.max(.00005,a.pitch);
    let yawStep=-yaw*gain*yawScale*a.yawStrength*(a.invertX?-1:1);
    let pitchStep=-pitch*gain*pitchScale*a.pitchStrength*(a.invertY?-1:1);
    if(!shotSync&&a.response!=='snap'){
      const yawCap=Math.max(.0001,a.maxStep*a.yaw);
      const pitchCap=Math.max(.0001,a.maxStep*a.pitch);
      yawStep=Math.max(-yawCap,Math.min(yawCap,yawStep));
      pitchStep=Math.max(-pitchCap,Math.min(pitchCap,pitchStep));
    }

    yawStep=Math.sign(yawStep)*Math.min(Math.abs(yawStep),Math.abs(yaw));pitchStep=Math.sign(pitchStep)*Math.min(Math.abs(pitchStep),Math.abs(pitch));
    if(a.axes==='pitch')yawStep=0;if(a.axes==='yaw')pitchStep=0;
    const parent=camera.parent&&!camera.parent.isScene?camera.parent:null;
    const grand=parent?.parent&&!parent.parent.isScene?parent.parent:null;
    const pitchNode=parent?.rotation?parent:camera;
    const yawNode=grand?.rotation?grand:(parent?.rotation?parent:camera);
    const pr=pitchNode?.rotation,yr=yawNode?.rotation;
    if(!pr||!yr||!Number.isFinite(Number(pr.x))||!Number.isFinite(Number(yr.y))){aimState.directFailures++;aimState.lastError='Camera rig yaw/pitch are not writable';return false;}
    try{
      yr.y=Number(yr.y)+yawStep;pr.x=Math.max(-1.553,Math.min(1.553,Number(pr.x)+pitchStep));
      for(const node of new Set([yawNode,pitchNode,camera])){if(typeof node.updateMatrix==='function')node.updateMatrix();if(typeof node.updateMatrixWorld==='function')node.updateMatrixWorld(true);}
      aimState.directApplied++;aimState.cameraRoute=(yawNode===pitchNode?'combined-rig':'split-yaw-pitch-rig');aimState.method=shotSync?'silent-shot-sync':'direct-camera-rig';aimState.status=shotSync?'silent-shot-synced':'direct-camera-applied';aimState.acceptance='controller-rig-transform-write';aimState.lastSentAt=now();return true;
    }catch(e){aimState.directFailures++;aimState.lastError='Direct rig write failed: '+String(e?.message||e).slice(0,180);return false;}
  }
  function syncSilentAimForShot(){
    const target=aimState.target,a=config.aim;
    if(!a.silentAim||!inputAllowed()||!activeHold()||!target||downedBlocked(target.id)||target.predicted||now()-(target.observedAt??target.time)>80)return false;
    const rec=[...records.values()].find(r=>r.id===target.rendererId);if(!rec)return false;
    const rad=Math.PI/180;return applyDirectAim(rec,target.yaw+a.offsetYaw*rad,target.pitch+a.offsetPitch*rad,1,true);
  }

  function fireInputAllowed(){
    return !!(config.fire?.enabled&&enabled&&attached&&!suspended&&!menuOpen&&!focusedEditable()&&!document.hidden&&document.hasFocus()&&document.pointerLockElement);
  }
  function fireActivationActive(){
    const h=config.fire?.hold||'RMB';
    if(h==='always')return true;
    if(h==='aim')return activeHold();
    return h==='RMB'&&!!(buttons&2)||h==='LMB'&&!!(buttons&1)||h==='Either'&&!!(buttons&3)||heldKeys.has(h);
  }
  function fireTargetEligible(target,t=now()){
    if(!target||downedBlocked(target.id)||config.fire.onlyCurrentDraw&&target.predicted)return false;
    const observed=target.observedAt??target.time,age=t-observed;
    if(!Number.isFinite(observed)||age<0||age>config.fire.maxTargetAgeMs)return false;
    const confidence=Number.isFinite(target.confidence)?target.confidence:targetConfidence(target);
    return confidence>=config.fire.minConfidence;
  }
  function chooseFireTarget(targets,t=now()){
    const source=[...targets];
    if(!config.fire.onlyCurrentDraw&&aimState.target&&!source.some(x=>x.id===aimState.target.id))source.push(aimState.target);
    const eligible=source.filter(x=>fireTargetEligible(x,t));
    if(!eligible.length)return null;
    eligible.sort((a,b)=>config.aim.priority==='distance'?(a.viewDistance-b.viewDistance||a.distance-b.distance):(a.distance-b.distance));
    const current=aimState.target&&eligible.find(x=>x.id===aimState.target.id);
    if(current)return current;
    if(config.fire.autoHandoff)return eligible[0];
    if(fireState.targetId!==null)return eligible.find(x=>x.id===fireState.targetId)||null;
    return eligible[0];
  }
  function shotRigSnapshot(rec){
    const camera=rec?.aimCamera;
    if(!camera||typeof camera!=='object')return null;
    const parent=camera.parent&&!camera.parent.isScene?camera.parent:null;
    const grand=parent?.parent&&!parent.parent.isScene?parent.parent:null;
    const pitchNode=parent?.rotation?parent:camera;
    const yawNode=grand?.rotation?grand:(parent?.rotation?parent:camera);
    const pr=pitchNode?.rotation,yr=yawNode?.rotation;
    if(!pr||!yr||!Number.isFinite(Number(pr.x))||!Number.isFinite(Number(yr.y)))return null;
    return {camera,pitchNode,yawNode,pitch:Number(pr.x),yaw:Number(yr.y)};
  }
  function refreshRig(snapshot){
    if(!snapshot)return;
    for(const node of new Set([snapshot.yawNode,snapshot.pitchNode,snapshot.camera])){
      try{if(typeof node.updateMatrix==='function')node.updateMatrix();if(typeof node.updateMatrixWorld==='function')node.updateMatrixWorld(true);}catch(_){}
    }
  }
  function restoreShotRig(snapshot){
    if(!snapshot)return false;
    try{snapshot.yawNode.rotation.y=snapshot.yaw;snapshot.pitchNode.rotation.x=snapshot.pitch;refreshRig(snapshot);fireState.restores++;return true;}
    catch(e){fireState.lastError='Camera restore failed: '+String(e?.message||e).slice(0,180);return false;}
  }
  function alignShotRig(rec,target){
    const snapshot=shotRigSnapshot(rec);if(!snapshot){fireState.lastError='No writable camera rig for shot alignment';return null;}
    const a=config.aim,rad=Math.PI/180;
    const yaw=target.yaw+(target.yawVelocity||0)*Math.min(12,Math.max(0,a.predictionMs*.45))+a.offsetYaw*rad;
    const pitch=target.pitch+(target.pitchVelocity||0)*Math.min(12,Math.max(0,a.predictionMs*.45*a.verticalPrediction))+a.offsetPitch*rad;
    const yawScale=.002/Math.max(.00005,a.yaw),pitchScale=.002/Math.max(.00005,a.pitch);
    let yawStep=-yaw*yawScale*a.yawStrength*(a.invertX?-1:1),pitchStep=-pitch*pitchScale*a.pitchStrength*(a.invertY?-1:1);
    yawStep=Math.sign(yawStep)*Math.min(Math.abs(yawStep),Math.abs(yaw));pitchStep=Math.sign(pitchStep)*Math.min(Math.abs(pitchStep),Math.abs(pitch));
    if(a.axes==='pitch')yawStep=0;if(a.axes==='yaw')pitchStep=0;
    try{
      snapshot.yawNode.rotation.y=Number(snapshot.yawNode.rotation.y)+yawStep;
      snapshot.pitchNode.rotation.x=Math.max(-1.553,Math.min(1.553,Number(snapshot.pitchNode.rotation.x)+pitchStep));
      refreshRig(snapshot);fireState.alignments++;return snapshot;
    }catch(e){fireState.lastError='Shot alignment failed: '+String(e?.message||e).slice(0,180);return null;}
  }
  function fireEventTarget(rec){return config.fire.route==='window'?window:(document.pointerLockElement||rec?.canvas||window);}
  function dispatchFirePulse(rec,target){
    const owner=fireEventTarget(rec),opts={bubbles:true,cancelable:true,view:window,button:0,buttons:1};
    fireState.attempts++;fireState.lastRoute=config.fire.route;
    try{
      const down=new MouseEvent('mousedown',opts),up=new MouseEvent('mouseup',{...opts,buttons:0});
      owner.dispatchEvent(down);owner.dispatchEvent(up);
      fireState.pulses++;fireState.lastAt=now();fireState.lastTargetAt=fireState.lastAt;fireState.targetId=target?.id??null;
      fireState.lastAcceptance='synthetic-mouse-events-untrusted';return true;
    }catch(e){fireState.rejected++;fireState.lastError=String(e?.message||e).slice(0,220);fireState.lastAcceptance='dispatch-error';return false;}
  }
  function quickshotPulse(rec,target){
    const snapshot=alignShotRig(rec,target);if(!snapshot){fireState.rejected++;return false;}
    let ok=false;
    try{ok=dispatchFirePulse(rec,target);return ok;}
    finally{
      const delay=config.fire.restoreDelayMs;
      if(delay>0){clearTimeout(fireRestoreTimer);fireRestoreTimer=setTimeout(()=>{fireRestoreTimer=0;restoreShotRig(snapshot);},delay);}
      else restoreShotRig(snapshot);
    }
  }
  function fireCooldownReady(t,rate=config.fire.rate){return t-fireState.lastAt>=1000/Math.max(1,rate);}
  function finishFireFrame(rec,t,targets){
    const f=config.fire;fireState.mode=f.mode;
    if(!f.enabled){if(fireState.status!=='disabled')resetFireState('disabled');return;}
    if(!fireInputAllowed()){fireState.status=document.pointerLockElement?'paused-focus-or-menu':'waiting-for-pointer-lock';return;}
    const target=chooseFireTarget(targets,t);
    if(!target){fireState.status='waiting-for-target';fireState.targetId=null;fireState.target=null;fireState.burstRemaining=0;return;}
    fireState.targetId=target.id;fireState.target=target;
    if(f.mode==='manual-redirect'){fireState.status='manual-click-redirect-ready';return;}
    if(!fireActivationActive()){fireState.status='waiting-for-fire-hold';fireState.burstRemaining=0;if(f.mode==='tap')fireState.tapTargetId=null;return;}
    const within=target.distance<=f.triggerPx;
    if(f.mode==='trigger'){
      if(!within){fireState.status='trigger-wait';return;}
      if(fireCooldownReady(t)){dispatchFirePulse(rec,target);fireState.status='trigger-fired';}else fireState.status='trigger-cooldown';return;
    }
    if(f.mode==='tracked'){
      if(!config.aim.enabled||!inputAllowed()||!activeHold()){fireState.status='tracked-waiting-for-aim';return;}
      if(!within){fireState.status='tracked-not-settled';return;}
      if(fireCooldownReady(t)){dispatchFirePulse(rec,target);fireState.status='tracked-fired';}else fireState.status='tracked-cooldown';return;
    }
    if(f.mode==='tap'){
      if(fireState.tapTargetId===target.id){fireState.status='tap-complete';return;}
      if(fireCooldownReady(t)&&quickshotPulse(rec,target)){fireState.tapTargetId=target.id;fireState.status='tap-fired';}return;
    }
    if(f.mode==='burst'){
      if(!fireState.burstRemaining){fireState.burstRemaining=f.burstShots;fireState.nextBurstAt=t;}
      if(t>=fireState.nextBurstAt&&fireCooldownReady(t,Math.min(f.rate,1000/Math.max(35,f.burstGapMs)))){
        if(quickshotPulse(rec,target)){fireState.burstRemaining--;fireState.nextBurstAt=t+f.burstGapMs;fireState.status=fireState.burstRemaining?'burst-firing':'burst-complete';}
      }else fireState.status='burst-cooldown';
      return;
    }
    if(f.mode==='quickshot'){
      if(fireCooldownReady(t)){quickshotPulse(rec,target);fireState.status='quickshot-fired';}else fireState.status='quickshot-cooldown';return;
    }
  }
  function manualRedirectForTrustedShot(){
    if(!config.fire.enabled||config.fire.mode!=='manual-redirect'||!fireInputAllowed())return false;
    const target=fireState.target||aimState.target;if(!fireTargetEligible(target))return false;
    const rec=[...records.values()].find(r=>r.id===target.rendererId);if(!rec)return false;
    const snapshot=alignShotRig(rec,target);if(!snapshot)return false;
    fireState.status='manual-shot-aligned';fireState.targetId=target.id;fireState.lastAcceptance='trusted-user-mousedown-with-camera-alignment';
    setTimeout(()=>restoreShotRig(snapshot),0);return true;
  }

  let lastTargetSwitchAt=0,lastTargetId=null;
  function selectCrosshairLock(targets){
  const a=config.aim;
  const t=now();
  const currentId=aimState.target?.id??null;
  const isSnap=a.response==='snap';

  function eligible(x){
    if(!x||downedBlocked(x.id)||x.predicted)return false;

    if(![
      x.distance,x.viewDistance,x.yaw,x.pitch,
      x.x,x.y,x.centerX,x.centerY
    ].every(Number.isFinite))return false;

    const observed=x.observedAt??x.time;
    const age=t-observed;

    if(!Number.isFinite(observed)||age<0||(isSnap?age>200:age>80))return false;
    if(x.distance<0||x.viewDistance<=0)return false;
    if(a.maxDistance>0&&x.viewDistance>a.maxDistance)return false;

    if(!isSnap){
      const confidence=Number.isFinite(x.confidence)
        ?x.confidence
        :targetConfidence(x);
      if(confidence<a.confidenceMin)return false;
    }

    const acquisition=Number.isFinite(x.acquisitionFov)
      ?x.acquisitionFov
      :a.fov;

    return x.distance<=acquisition;
  }

  function compare(x,y){
    const primary=a.priority==='distance'
      ?x.viewDistance-y.viewDistance
      :x.distance-y.distance;

    if(primary!==0)return primary;

    const secondary=a.priority==='distance'
      ?x.distance-y.distance
      :x.viewDistance-y.viewDistance;

    return secondary||x.id-y.id;
  }

  const candidates=targets.filter(eligible).sort(compare);
  const best=candidates[0]||null;

  if(!best)return null;
  if(isSnap)return best;
  if(!a.sticky||currentId===null)return best;

  const locked=candidates.find(x=>x.id===currentId);
  if(!locked)return best;
  if(best.id===locked.id)return locked;

  if(a.lockPolicy==='hold-target')return locked;

  if(t-lastTargetSwitchAt<a.switchCooldownMs)return locked;

  const margin=a.priority==='distance'
    ?Math.max(.1,locked.viewDistance*.18)*a.switchBias
    :Math.max(12,Math.min(72,locked.distance*.25+12))*a.switchBias;

  const bestMetric=a.priority==='distance'
    ?best.viewDistance
    :best.distance;

  const lockedMetric=a.priority==='distance'
    ?locked.viewDistance
    :locked.distance;

  return bestMetric+margin<lockedMetric?best:locked;
}
  function predictedStickyTarget(t){
    const old=aimState.target,a=config.aim;
    if(a.response==='snap')return null;
    if(!a.sticky||!old||downedBlocked(old.id))return null;
    const observedAt=old.observedAt??old.time,age=t-observedAt;
    if(!Number.isFinite(observedAt)||age<0||age>a.graceMs||a.graceMs<=0)return null;
    const base=aimTrackHistory.get(old.id)||old;

    const dt=Math.min(age,24)*(base.distance<=AIM_NEAR_NO_LEAD_PX?0:1);
    const x=base.x+(base.vx||0)*dt,y=base.y+(base.vy||0)*dt;
    const distance=Math.hypot(x-base.centerX,y-base.centerY);
    if(distance>Math.min(1200,a.fov*a.retainFov+40))return null;
    return {...base,x,y,distance,yaw:base.yaw+(base.yawVelocity||0)*dt,pitch:base.pitch+(base.pitchVelocity||0)*dt,
      time:observedAt,observedAt,ageMs:age,pose:String(base.pose||'').replace(/\+sticky-grace$/,'')+'+sticky-grace',predicted:true};
  }
  function responseGain(a,distance,dt){
    if(a.response==='snap'){
      return {
        gain: 1,
        effective: 0,
        distanceFactor: Math.min(1,distance/Math.max(1,a.fov))
      };
    }
    const d=Math.min(1,distance/Math.max(1,a.fov)),near=distance<28;
    let ms=a.smoothing*(1-.5*d)*(near?1.35:1);
    if(a.response==='smooth')ms=a.smoothing;
    else if(a.response==='precision')ms=a.smoothing*(near?2:1.15);
    else if(a.response==='responsive')ms=a.smoothing*(near?1.5:.65);
    const effective=Math.max(10,ms);
    return {gain:a.smoothing<=0?1:-Math.expm1(-Math.max(0,dt)/effective),effective,distanceFactor:d};
  }

  function finishAimFrame(rec,t){
    const targets=[...rec.frameTargets.values()].filter(x=>!downedBlocked(x.id));rec.frameTargets.clear();
    try{finishFireFrame(rec,t,targets);}catch(e){fireState.lastError=String(e?.message||e).slice(0,220);fireState.status='fire-error';}
    if(aimState.target&&downedBlocked(aimState.target.id))clearAim('downed-target-released');
    if(!config.aim.enabled){if(aimState.target||aimState.pending)clearAim('disabled');return;}
    if(!aimSessionArmed||aimArmedSelection!==selected){clearAim('re-enable-aim-after-id-selection');return;}
    if(menuOpen){clearAim('menu-open');return;}
    targets.sort((a,b)=>config.aim.priority==='distance'?(a.viewDistance-b.viewDistance||a.distance-b.distance):(a.distance-b.distance));
    const isSnap=config.aim.response==='snap';
    const holdMissing=config.aim.sticky&&config.aim.lockPolicy==='hold-target'&&aimState.target&&!targets.some(x=>x.id===aimState.target.id);
    let target=holdMissing?(isSnap?selectCrosshairLock(targets):(predictedStickyTarget(t)||selectCrosshairLock(targets))):selectCrosshairLock(targets);
    if(!target)target=predictedStickyTarget(t);
    if(!target){clearAim('no-current-target');return;}
    target.confidence=Number.isFinite(target.confidence)?target.confidence:targetConfidence(target);
    if(!target.predicted&&target.confidence<config.aim.confidenceMin){clearAim('target-confidence-low');return;}
    const dt=lastAimFrame?Math.max(1,Math.min(50,t-lastAimFrame)):1000/60;lastAimFrame=t;
    if(lastTargetId!==null&&target.id!==lastTargetId)lastTargetSwitchAt=t;
    lastTargetId=target.id;aimState.target=target;
    if(!target.predicted&&downedStats.pendingHandoff!==null&&target.id!==downedStats.pendingHandoff){
      downedStats.handoffs++;downedStats.lastHandoff={from:downedStats.pendingHandoff,to:target.id,time:t};downedStats.pendingHandoff=null;
    }
    if(target.predicted&&(target.ageMs||0)>24){
      aimState.pending=null;aimState.command={dx:0,dy:0,predicted:true,ageMs:target.ageMs};
      aimState.status='holding-lock-awaiting-current-draw';drawAimGuide();return;
    }
    const a=config.aim,rad=Math.PI/180;
    const leadScale=target.distance<=AIM_NEAR_NO_LEAD_PX?0:Math.min(1,(target.distance-AIM_NEAR_NO_LEAD_PX)/70);
    const leadMs=target.predicted||a.predictionMs===0?0:Math.min(24,Math.max(0,(a.predictionMs+dt*.20)*leadScale));
    const yaw=target.yaw+(target.yawVelocity||0)*leadMs+a.offsetYaw*rad;
    const verticalLeadMs=leadMs*a.verticalPrediction;
    const pitch=target.pitch+(target.pitchVelocity||0)*verticalLeadMs+a.offsetPitch*rad;


    const response=responseGain(a,target.distance,dt),gain=response.gain,effectiveSmoothing=response.effective,distanceFactor=response.distanceFactor;
    let dx=yaw/a.yaw*gain*a.yawStrength*(a.invertX?-1:1),dy=pitch/a.pitch*gain*a.pitchStrength*(a.invertY?-1:1);
    if(a.axes==='pitch')dx=0;if(a.axes==='yaw')dy=0;

    const mag=Math.hypot(dx,dy);
    const dynamicMaxStep=Math.min(80,a.maxStep*(1+.70*distanceFactor));
    if(mag>dynamicMaxStep){dx*=dynamicMaxStep/mag;dy*=dynamicMaxStep/mag;}
    const baseSettle=Math.max(a.deadzone,a.settlePx);
    let distancePrecisionScale=1;
    if(a.distanceAware&&Number.isFinite(target.screenHeightPx)&&target.screenHeightPx>0){
      const sizeRatio=Math.max(.12,Math.min(1,target.screenHeightPx/Math.max(60,a.distanceReferencePx)));
      distancePrecisionScale=1-a.distancePrecision*(1-sizeRatio);
    }


    const settleDeadzone=Math.max(.28,baseSettle*distancePrecisionScale);
    if(target.distance<=settleDeadzone&&a.offsetYaw===0&&a.offsetPitch===0){dx=0;dy=0;}
    aimState.command={dx,dy,yawErrorDegrees:yaw/rad,pitchErrorDegrees:pitch/rad,dtMs:dt,response:a.response,programId:target.programId,dynamicMaxStep,effectiveSmoothing,pose:target.pose,predicted:!!target.predicted,leadMs,screenHeightPx:target.screenHeightPx,distancePrecisionScale,settleDeadzone,effectivePoint:target.effectivePoint,targetZone:target.targetZone,confidence:target.confidence,acquisitionFov:target.acquisitionFov,verticalLeadMs};
    aimState.pending=null;
    if(!inputAllowed())aimState.status=document.pointerLockElement?'paused-focus-or-menu':'waiting-for-pointer-lock';
    else if(!activeHold())aimState.status='waiting-for-hold';
    else if(dx===0&&dy===0)aimState.status='inside-deadzone';
    else if(a.mode==='camera-direct')applyDirectAim(rec,yaw,pitch,gain);
    else if(a.mode==='mouse-assist'){
      aimState.pending={dx,dy,at:t};aimState.status='waiting-for-physical-mouse';aimState.method='real-mouse-delta-assist';
    }else sendRelative(dx,dy,rec.canvas);
    drawAimGuide();
  }
  function integerDeltas(dx,dy){
    remainderX+=dx;remainderY+=dy;
    const x=Math.trunc(remainderX),y=Math.trunc(remainderY);
    remainderX-=x;remainderY-=y;return [x,y];
  }
  function sendRelative(dx,dy,canvas){
    if(!inputAllowed()||!activeHold())return false;
    const [x,y]=integerDeltas(dx,dy);
    if(!x&&!y){aimState.status='subpixel-correction';return false;}
    const target=document.pointerLockElement||canvas;
    try{
      const mode=config.aim.mode;
      let e;
      if(mode==='delta-hook'){
        e=new MouseEvent('mousemove',{bubbles:true,cancelable:true,view:window,buttons});
        let localOK=false;
        try{define(e,'movementX',{value:x,configurable:true});define(e,'movementY',{value:y,configurable:true});localOK=(Number(e.movementX)===x&&Number(e.movementY)===y);}catch(_){}
        if(!localOK){aimState.status='delta-event-unsupported';aimState.lastError='Per-event movementX/Y unavailable; use Direct camera';return false;}
        syntheticEvents.add(e);dispatchingAim=true;try{target.dispatchEvent(e);}finally{dispatchingAim=false;}
        aimState.sent++;aimState.lastSentAt=now();aimState.lastInputTrusted=e.isTrusted;aimState.method='event-local-delta';aimState.status='delta-dispatched';aimState.acceptance='untrusted-event-local';return true;
      }
      if(mode==='relative'){
        e=new MouseEvent('mousemove',{bubbles:true,cancelable:true,view:window,clientX:Math.round(aimState.target.centerX),clientY:Math.round(aimState.target.centerY),movementX:x,movementY:y,buttons});
        syntheticEvents.add(e);
        if(e.movementX!==x||e.movementY!==y){aimState.status='relative-event-unsupported';aimState.lastError='MouseEvent constructor ignored movementX/Y; use Direct camera';return false;}
        dispatchingAim=true;try{target.dispatchEvent(e);}finally{dispatchingAim=false;}
        aimState.sent++;aimState.lastSentAt=now();aimState.lastInputTrusted=e.isTrusted;aimState.method='legacy-relative-event';aimState.status='relative-input-dispatched';return true;
      }
      return false;
    }catch(e){aimState.lastError=String(e?.message||e).slice(0,240);aimState.status='input-error';return false;}
  }

  function resetInput(){buttons=0;heldKeys.clear();activationLatched=false;clearTracking();clearAim(menuOpen?'menu-open':'input-reset');resetFireState(menuOpen?'menu-open':'input-reset');}
  listen(window,'blur',resetInput);
  listen(document,'visibilitychange',()=>{if(document.hidden)resetInput();});
  listen(document,'pointerlockchange',()=>{if(!document.pointerLockElement)resetInput();});
  listen(window,'keydown',e=>{if(!typing(e)&&!isMenuEvent(e)&&e.isTrusted){heldKeys.add(e.code);if(!e.repeat)activationPress(e.code);}},true);
  listen(window,'keyup',e=>{heldKeys.delete(e.code);aimState.pending=null;},true);
  listen(window,'mousedown',e=>{if(!isMenuEvent(e)&&e.isTrusted){buttons=e.buttons;activationPress(e.button===0?'LMB':e.button===2?'RMB':'');if(e.button===0){if(!manualRedirectForTrustedShot())syncSilentAimForShot();}}},true);
  listen(window,'mouseup',e=>{if(e.isTrusted)buttons=e.buttons;aimState.pending=null;},true);
  listen(window,'mousemove',e=>{
    if(syntheticEvents.has(e)||!e.isTrusted||isMenuEvent(e))return;
    buttons=e.buttons;
    const pending=aimState.pending;
    if(config.aim.mode!=='mouse-assist'||!pending||!inputAllowed()||!activeHold()||now()-pending.at>50)return;
    const [dx,dy]=integerDeltas(pending.dx,pending.dy);aimState.pending=null;
    if(!dx&&!dy)return;
    try{
      const baseX=Number(e.movementX)||0,baseY=Number(e.movementY)||0;
      define(e,'movementX',{value:baseX+dx,configurable:true});define(e,'movementY',{value:baseY+dy,configurable:true});
      aimState.assisted++;aimState.lastSentAt=now();aimState.lastInputTrusted=e.isTrusted;aimState.status='physical-mouse-assisted';aimState.method='trusted-physical-mouse-assist';
    }catch(err){aimState.lastError=String(err?.message||err).slice(0,240);aimState.status='mouse-assist-unavailable';}
  },true);
  let bindingKey=false, searchText='',toastTimer=0,panelDrag=null,panelResizeObserver=null,panelUserPositioned=false,advancedOpen=false;
  let cliHistory=[],cliHistoryIndex=0;
  function control(label,name,type,value,extra='',hint=''){
    const copy=`<span class="copy"><b>${label}</b>${hint?`<small>${hint}</small>`:''}</span>`;
    if(type==='checkbox')return `<label class="setting toggleRow" data-label="${label}">${copy}<input type="checkbox" name="${name}"><i aria-hidden="true"></i></label>`;
    if(type==='range')return `<label class="setting rangeRow" data-label="${label}"><span>${copy}<input aria-label="${label} exact value" class="exact" type="number" data-mirror="${name}" ${extra}></span><input aria-label="${label}" type="range" name="${name}" ${extra}><output data-output="${name}"></output></label>`;
    return `<label class="setting fieldRow" data-label="${label}">${copy}<input aria-label="${label}" type="${type}" name="${name}" ${extra}></label>`;
  }
  function choice(label,name,options,hint=''){
    return `<label class="setting fieldRow" data-label="${label}"><span class="copy"><b>${label}</b>${hint?`<small>${hint}</small>`:''}</span><select aria-label="${label}" name="${name}">${options.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></label>`;
  }
  function card(title,body,desc='',wide=false){return `<div class="card${wide?' wide':''}" data-card><h3>${title}</h3>${desc?`<p class="description">${desc}</p>`:''}${body}</div>`;}
  const CLI_SECTIONS=Object.freeze(['aim','targets','fire','visuals','profiles','system']);
  const CLI_BASE_COMMANDS=Object.freeze(['help','status','set','get','toggle','preset','quality','target','fire','section','search','profile','diagnostics','watch','pause','resume','clear']);
  function cliConfigPaths(){return [...Object.keys(config).filter(k=>!['aim','fire'].includes(k)).map(String),...Object.keys(config.aim||{}).map(k=>'aim.'+k),...Object.keys(config.fire||{}).map(k=>'fire.'+k)].sort();}
  function cliGet(path){if(path.startsWith('aim.'))return config.aim?.[path.slice(4)];if(path.startsWith('fire.'))return config.fire?.[path.slice(5)];return config[path];}
  function cliHas(path){if(path.startsWith('aim.'))return Object.prototype.hasOwnProperty.call(config.aim||{},path.slice(4));if(path.startsWith('fire.'))return Object.prototype.hasOwnProperty.call(config.fire||{},path.slice(5));return Object.prototype.hasOwnProperty.call(config,path);}
  function cliParseValue(path,raw){
    const current=cliGet(path),s=String(raw??'').trim();
    if(typeof current==='boolean'){
      if(/^(?:true|on|yes|1)$/i.test(s))return true;if(/^(?:false|off|no|0)$/i.test(s))return false;
      throw Error('Expected on/off for '+path);
    }
    if(typeof current==='number'){const n=Number(s);if(!Number.isFinite(n))throw Error('Expected a number for '+path);return n;}
    return s;
  }
  function cliSet(path,raw){
    if(!cliHas(path))throw Error('Unknown setting: '+path);
    const value=cliParseValue(path,raw),before=cliGet(path);
    if(path.startsWith('aim.'))settings({aim:{[path.slice(4)]:value}});else if(path.startsWith('fire.'))settings({fire:{[path.slice(5)]:value}});else settings({[path]:value});
    const after=cliGet(path);return `${path}: ${String(before)} -> ${String(after)}`;
  }
  function cliPrint(text,kind='info'){
    if(!menuRoot)return;const line=menuRoot.getElementById('cli-last');if(line){line.textContent=String(text);line.dataset.kind=kind;line.scrollTop=line.scrollHeight;}
  }
  function cliTokens(raw){return [...String(raw).matchAll(/\"([^\"]*)\"|'([^']*)'|(\S+)/g)].map(m=>m[1]??m[2]??m[3]);}
  function cliHelp(topic=''){
    const t=String(topic).toLowerCase();
    if(t==='aim')return 'aim: set/toggle aim.* · preset balanced|gentle|precise|responsive · get aim.fov';
    if(t==='targets')return 'targets: target next|prev|auto|off · set aim.priority crosshair|distance · set aim.ignoreDowned on';
    if(t==='fire')return 'fire: set fire.enabled on · set fire.mode trigger|tracked|quickshot|burst|tap|manual-redirect · set fire.rate 8';
    if(t==='visuals')return 'visuals: set visualStyle outline|filled|hybrid · set color #ff356d · quality performance|balanced|quality';
    if(t==='profiles')return 'profiles: profile save "name" · profile load "name" · profile delete "name"';
    return 'commands: help [aim|targets|fire|visuals|profiles] · status · get <setting> · set <setting> <value> · toggle <setting> · preset <name> · quality <name> · target next|prev|auto|off · fire on|off|<mode> · section <name> · search <text> · profile save|load|delete <name> · diagnostics · watch target|aim|fire · pause · resume · clear';
  }
  function cliRun(raw){
    const source=String(raw||'').trim();if(!source)return '';
    const parts=cliTokens(source),cmd=(parts.shift()||'').toLowerCase();
    try{
      let out='';
      if(cmd==='help'||cmd==='?')out=cliHelp(parts[0]||'');
      else if(cmd==='status')out=`${enabled?'active':'paused'} | ${selected===null?'target:auto':'target:'+selected} | aim:${config.aim.enabled?'on':'off'} | fire:${config.fire.enabled?config.fire.mode:'off'} | candidates:${candidateRows().filter(r=>!r.viewmodelLike).length} | ${aimState.status}`;
      else if(cmd==='get'){const path=parts[0];if(!path||!cliHas(path))throw Error('Usage: get <setting>');out=`${path} = ${JSON.stringify(cliGet(path))}`;}
      else if(cmd==='set'){const path=parts.shift();if(!path||!parts.length)throw Error('Usage: set <setting> <value>');out=cliSet(path,parts.join(' '));}
      else if(cmd==='toggle'){const path=parts[0];if(!path||!cliHas(path)||typeof cliGet(path)!=='boolean')throw Error('Usage: toggle <boolean-setting>');out=cliSet(path,!cliGet(path));}
      else if(cmd==='preset'){const name=(parts[0]||'').toLowerCase();applyAimPreset(name);out=`aim preset: ${name} (aim disabled until re-enabled)`;}
      else if(cmd==='quality'){const name=(parts[0]||'').toLowerCase();applyQuality(name);out=`render quality: ${name}`;}
      else if(cmd==='target'){
        const action=(parts[0]||'').toLowerCase();if(action==='next')out=`target: ${cycle(1).id??'waiting'}`;else if(action==='prev'||action==='previous')out=`target: ${cycle(-1).id??'waiting'}`;else if(action==='auto'){auto();out='target: automatic';}else if(action==='off'){off();out='effects paused';}else throw Error('Usage: target next|prev|auto|off');
      }
      else if(cmd==='fire'){
        const action=(parts.shift()||'status').toLowerCase();
        if(action==='on'){settings({fire:{enabled:true}});out=`fire: on · ${config.fire.mode}`;}
        else if(action==='off'){settings({fire:{enabled:false}});out='fire: off';}
        else if(action==='status')out=`fire:${config.fire.enabled?'on':'off'} mode=${config.fire.mode} state=${fireState.status} target=${fireState.targetId??'—'} pulses=${fireState.pulses}`;
        else if(['trigger','tracked','quickshot','burst','tap','manual-redirect'].includes(action)){settings({fire:{mode:action,enabled:true}});out=`fire mode: ${action}`;}
        else throw Error('Usage: fire on|off|status|trigger|tracked|quickshot|burst|tap|manual-redirect');
      }
      else if(cmd==='section'){
        const name=(parts[0]||'').toLowerCase();if(!CLI_SECTIONS.includes(name))throw Error('section: aim|targets|fire|visuals|profiles|system');menuTab=name;searchText='';const q=menuRoot?.getElementById('search');if(q)q.value='';syncMenu();out=`section: ${name}`;
      }
      else if(cmd==='search'){
        const q=parts.join(' ').trim();searchText=q.toLowerCase();const el=menuRoot?.getElementById('search');if(el)el.value=q;filterMenu();out=q?`filter: ${q}`:'filter cleared';
      }
      else if(cmd==='profile'){
        const action=(parts.shift()||'').toLowerCase(),name=parts.join(' ').trim();if(!name)throw Error('Usage: profile save|load|delete <name>');
        if(action==='save'){saveProfile(name);refreshProfiles(name);out=`profile saved: ${name}`;}else if(action==='load'){restoreProfile(name);syncMenu();out=`profile loaded: ${name} (aim disabled)`;}else if(action==='delete'){deleteProfile(name);refreshProfiles();out=`profile deleted: ${name}`;}else throw Error('Usage: profile save|load|delete <name>');
      }
      else if(cmd==='watch'){
        const what=(parts[0]||'target').toLowerCase();
        if(!['target','aim','fire'].includes(what))throw Error('watch: target|aim|fire');
        const t=aimState.target,c=aimState.command;
        out=what==='target'?(t?`id=${t.id} pose=${t.pose||'—'} zone=${t.targetZone||'custom'} point=${Number(t.effectivePoint??t.point).toFixed(3)} dist=${Number(t.viewDistance||0).toFixed(1)} screen=${Number(t.screenHeightPx||0).toFixed(1)}px confidence=${Math.round((t.confidence||0)*100)}%`:'no current target'):what==='fire'?`mode=${fireState.mode} state=${fireState.status} target=${fireState.targetId??'—'} pulses=${fireState.pulses} alignments=${fireState.alignments} acceptance=${fireState.lastAcceptance}`:(c?`dx=${Number(c.dx||0).toFixed(2)} dy=${Number(c.dy||0).toFixed(2)} zone=${c.targetZone||'—'} point=${Number(c.effectivePoint||0).toFixed(3)} confidence=${Math.round((c.confidence||0)*100)}% leadY=${Number(c.verticalLeadMs||0).toFixed(1)}ms`:'no aim command');
      }
      else if(cmd==='diagnostics'){exportDiagnostics();out='diagnostic export requested';}
      else if(cmd==='pause'){off();out='effects paused';}
      else if(cmd==='resume'){auto();out='effects resumed in automatic target mode';}
      else if(cmd==='clear'){out='';}
      else throw Error('Unknown command. Type help.');
      cliPrint(out,'ok');updateMenuLive();return out;
    }catch(e){const msg=String(e?.message||e);cliPrint(msg,'error');return msg;}
  }
  function cliSuggestions(value){
    const raw=String(value||''),parts=raw.trimStart().split(/\s+/),head=(parts[0]||'').toLowerCase();
    let pool=[];
    if(parts.length<=1)pool=[...CLI_BASE_COMMANDS];
    else if(['set','get','toggle'].includes(head))pool=cliConfigPaths().map(p=>head+' '+p);
    else if(head==='section')pool=CLI_SECTIONS.map(s=>'section '+s);
    else if(head==='preset')pool=['preset balanced','preset gentle','preset precise','preset responsive'];
    else if(head==='quality')pool=['quality performance','quality balanced','quality quality'];
    else if(head==='target')pool=['target next','target prev','target auto','target off'];
    else if(head==='fire')pool=['fire on','fire off','fire status','fire trigger','fire tracked','fire quickshot','fire burst','fire tap','fire manual-redirect'];
    else if(head==='watch')pool=['watch target','watch aim','watch fire'];
    const query=raw.toLowerCase();return pool.filter(x=>x.toLowerCase().startsWith(query)).slice(0,6);
  }
  function updateCliHint(){if(!menuRoot)return;const input=menuRoot.getElementById('cli-command'),hint=menuRoot.getElementById('cli-suggest');if(!input||!hint)return;const list=cliSuggestions(input.value);hint.textContent=list.length?list.join('   '):'Tab = complete · ↑/↓ = history · help = commands';}
  function ensureMenu(){
    if(menuHost)return;
    menuHost=document.createElement('div');menuHost.id='destiny-v5-panel';
    menuHost.style.cssText='position:fixed;right:24px;top:12px;z-index:2147483647;width:min(790px,calc(100vw - 24px));max-width:calc(100vw - 24px);display:none;pointer-events:auto;color-scheme:dark';
    menuRoot=menuHost.attachShadow({mode:'open'});
    const css=`
:host{all:initial;font:12px/1.45 ui-monospace,SFMono-Regular,Cascadia Code,Consolas,Liberation Mono,monospace;color:#d8dbe2;color-scheme:dark;--accent:#8b7cff;--bg:#0b0d10;--bg2:#101318;--line:#282d35;--line2:#1a1f26;--muted:#7f8793;--text:#d8dbe2;--dim:#9aa2ad}
*{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}[hidden]{display:none!important}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:1px solid var(--accent);outline-offset:1px}
.panel{border:1px solid #363c46;border-radius:6px;overflow:hidden;background:var(--bg);box-shadow:0 22px 70px #000b;color:var(--text)}
header{height:38px;display:flex;align-items:center;gap:10px;padding:0 11px;background:#111419;border-bottom:1px solid var(--line);touch-action:none;cursor:move;user-select:none}.mark{display:none}.brand{display:flex;align-items:center;gap:8px;flex:1;min-width:0}.brand h1{font-size:12px;letter-spacing:.02em;margin:0;text-transform:lowercase;font-weight:650}.brand h1:before{content:'>';color:var(--accent);margin-right:8px}.brand p{margin:0;color:var(--muted);font-size:10px}.version{color:#aeb5c0;border-left:1px solid var(--line);padding-left:10px;font-size:10px}.close{background:transparent;border:0;color:#828a95;width:24px;height:24px;padding:0;font-size:16px}.close:hover{color:#fff}
.topbar{height:37px;display:flex;align-items:center;gap:12px;padding:0 11px;background:#0d1014;border-bottom:1px solid var(--line2)}.connection{min-width:0;flex:1;display:flex;align-items:center;gap:7px;font-size:10px;color:var(--dim)}.connection span{width:6px;height:6px;border-radius:1px;background:#b18c5a}.connection[data-state=ready] span{background:#77b894}.connection[data-state=paused] span{background:#6c737e}.connection strong{font-weight:450;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.search{width:210px;max-width:40%;height:24px;background:transparent;border:0;border-left:1px solid var(--line);padding:0 0 0 10px;color:#dfe2e7}.search::placeholder{color:#59616d}.search:focus{outline:0;border-left-color:var(--accent)}
.layout{display:grid;grid-template-columns:125px 1fr;min-height:430px}.sidebar{padding:8px 0;border-right:1px solid var(--line);background:#0c0f13;display:flex;flex-direction:column}.miniTitle{padding:4px 10px 8px;font-size:9px;color:#555d68;letter-spacing:.12em}.sidebar button{position:relative;border:0;border-left:2px solid transparent;text-align:left;background:transparent;color:#7f8792;padding:7px 9px;font-size:10px;letter-spacing:.02em}.sidebar button:hover{color:#d9dce2;background:#10141a}.sidebar button[aria-selected=true]{border-left-color:var(--accent);background:#12161c;color:#eef0f3}.sidebar button[aria-selected=true]:before{content:'$ ';color:var(--accent)}.sideNote{margin-top:auto;border-top:1px solid var(--line2);padding:10px;color:#555e69;font-size:9px;line-height:1.55}.sideNote kbd{color:#9ba3ad}
.body{max-height:min(610px,calc(100vh - 205px));min-height:min(430px,calc(100vh - 205px));overflow:auto;overscroll-behavior:contain;padding:12px 14px;background:var(--bg);scrollbar-width:thin;scrollbar-color:#313842 transparent}.pageTitle{display:flex;justify-content:space-between;align-items:flex-end;padding:2px 0 10px;border-bottom:1px solid var(--line);margin-bottom:3px}.pageTitle h2{font-size:12px;margin:0;font-weight:600;text-transform:lowercase}.pageTitle h2:before{content:'config/';color:#606976}.pageTitle p{font-size:9px;color:#656e79;margin:2px 0 0}.pageTitle .chip{font-size:8px;color:#646c77}
.grid{display:block}.card{background:transparent;border:0;border-bottom:1px solid var(--line2);border-radius:0;padding:11px 0;min-width:0}.card.wide{width:100%}.card h3{margin:0 0 5px;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#747d89;font-weight:600}.card h3:before{content:'[';color:#4f5660}.card h3:after{content:']';color:#4f5660}.card .description{margin:0 0 7px;font-size:9px;color:#59626e}.setting{display:grid;grid-template-columns:minmax(190px,1fr) minmax(145px,220px);gap:14px;align-items:center;min-height:30px;margin:0;padding:4px 3px;border-top:1px dotted #171b21}.setting:first-of-type{border-top:0}.copy{min-width:0}.copy b{display:block;font-size:10px;font-weight:500;color:#b9c0c9}.copy b:before{content:'· ';color:#4e5661}.copy small{display:block;color:#59626d;font-size:8.5px;margin:1px 0 0;line-height:1.35}.fieldRow{align-items:center}.fieldRow select,.fieldRow input[type=number],.fieldRow input[type=text]{width:100%;height:24px;background:#0c0f13;color:#cfd4da;border:1px solid #272d35;border-radius:2px;padding:2px 6px}.fieldRow input[type=color]{justify-self:end;width:54px;height:22px;background:#0c0f13;border:1px solid #272d35;border-radius:2px;padding:1px}.toggleRow{position:relative}.toggleRow input{position:absolute;right:3px;width:46px;height:22px;opacity:0;cursor:pointer;z-index:1}.toggleRow i{justify-self:end;width:46px;height:20px;border:1px solid #303640;background:#0b0e12;border-radius:2px;position:relative}.toggleRow i:after{content:'false';position:absolute;inset:0;display:grid;place-items:center;color:#737b86;font:8px ui-monospace,monospace}.toggleRow input:checked+i{border-color:color-mix(in srgb,var(--accent) 60%,#303640)}.toggleRow input:checked+i:after{content:'true';color:#d8d4ff}.rangeRow{display:grid;grid-template-columns:minmax(190px,1fr) minmax(145px,220px);gap:14px;align-items:center}.rangeRow>span{display:block}.rangeRow>span .exact{display:none}.rangeRow input[type=range]{accent-color:var(--accent);height:14px;width:100%;margin:0;cursor:pointer}.rangeRow output{display:block;color:#6f7883;font-size:8px;text-align:right;margin-top:-2px}.exact{width:75px!important;text-align:right}.rowButtons{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}.rowButtons button,.action{background:#0d1116;border:1px solid #2a3038;border-radius:2px;color:#aeb5be;padding:5px 8px;font-size:9px}.rowButtons button:hover,.action:hover{border-color:#555e6a;color:#fff}.rowButtons .primary,.action.primary{border-color:color-mix(in srgb,var(--accent) 60%,#2a3038);color:#d8d4ff;background:#11131a}.rowButtons .danger{color:#c98e94;border-color:#51383c}.note,.scope,.targetHint{font-size:8.5px;line-height:1.5;color:#606976;margin:6px 0 0}.note strong{color:#8d95a0}.presetGrid{display:flex;gap:5px;flex-wrap:wrap}.presetGrid button{padding:5px 8px;background:#0d1116;color:#929aa5;border:1px solid #272d35;border-radius:2px;font-size:9px}.presetGrid button:hover{border-color:var(--accent);color:#e3e5e8}details{margin:8px 0}summary{cursor:pointer;color:#7d8590;font-size:9px;user-select:none;padding:4px 0}details .grid{margin-top:3px}.profileList,.profileName{width:100%;background:#0c0f13;color:#cfd4da;border:1px solid #272d35;border-radius:2px;padding:5px;min-height:27px}.profileName{margin-top:6px}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#20252c;border:1px solid #20252c}.metric{padding:7px;background:#0d1014}.metric small{display:block;font-size:7px;color:#59616b}.metric b{display:block;overflow-wrap:anywhere;font-size:9px;font-weight:500;margin-top:2px;color:#aeb5bd}.diagnosticDetail{margin:7px 0 0;white-space:pre-wrap;word-break:break-word;font:8.5px/1.45 ui-monospace,monospace;color:#6f7883}.keys{display:grid;grid-template-columns:110px 1fr;gap:4px;font-size:9px;color:#747c87}.keys kbd,.sideNote kbd{border:0;color:#9aa2ad;background:transparent;font:8px ui-monospace,monospace}.swatch{height:34px;border:1px solid #ff80cb;border-radius:2px;background:#ff356d66;display:grid;place-items:center;color:#fff;font-size:8px;margin-bottom:6px}.importPreview{margin-top:7px;border:1px solid #343b45;border-radius:2px;padding:7px;color:#89919d;font-size:9px}.noResults{font-size:10px;color:#6e7681;padding:18px 0}
footer{border-top:1px solid var(--line);background:#0a0c0f}.cliLine{height:34px;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid var(--line2)}.cliPS1{color:var(--accent);font-size:10px}.cliLine input{height:30px;width:100%;border:0;background:transparent;color:#e1e4e8;outline:0;padding:0}.cliLine input::placeholder{color:#4f5762}.cliSuggest{min-height:18px;padding:3px 10px;color:#4f5864;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cliLast{max-height:46px;overflow:auto;padding:4px 10px;border-top:1px solid #11151a;color:#77808c;font-size:8.5px;white-space:pre-wrap}.cliLast[data-kind=error]{color:#c98e94}.cliLast[data-kind=ok]{color:#8fa89b}.footStatus{display:flex;gap:10px;justify-content:space-between;align-items:center;padding:4px 10px 6px;color:#555e69;font-size:8px}.toast{color:#747d88;min-height:11px;flex:1;overflow-wrap:anywhere}.footStatus strong{font-weight:500;white-space:nowrap;color:#666f7b}
@media(max-width:690px){.layout{grid-template-columns:92px 1fr}.sidebar button{padding:7px 6px}.setting,.rangeRow{grid-template-columns:1fr}.metrics{grid-template-columns:1fr 1fr}.body{padding:9px}.search{max-width:150px}}@media(max-height:560px){.body{max-height:calc(100vh - 190px);min-height:170px}.sideNote{display:none}}

.quick{padding:11px 12px;display:flex;flex-direction:column;gap:9px}
.quick .hero{display:block;padding:9px 10px;border:1px solid var(--line);border-radius:6px;background:#0e1116}
.quick .hero .setting{border-top:0;min-height:0;padding:0;grid-template-columns:1fr 56px;gap:8px}
.quick .hero .copy b{font-size:12px;color:#e6e9ee}
.quick .hero .copy small{display:block}
.idRow{display:grid;grid-template-columns:36px 1fr 36px auto;gap:6px;align-items:center}
.idRow button{height:30px;border:1px solid var(--line);background:#0e1116;color:#cfd4da;border-radius:4px;font-size:12px}
.idRow button:hover{border-color:var(--accent);color:#fff}
.idRow select{height:30px;width:100%;background:#0c0f13;color:#cfd4da;border:1px solid var(--line);border-radius:4px;padding:2px 6px}
.quick .setting{border-top:0;padding:2px 0;min-height:26px;grid-template-columns:1fr 118px;gap:10px}
.quick .setting .copy b{font-size:11px}
.quick .setting .copy small{display:none}
.quick .rangeRow{grid-template-columns:1fr 118px}
.quick .rowButtons{margin-top:2px}
.quick .rowButtons button{flex:1}
.quickToast .toast{display:block;color:#6f7883;font-size:9px;min-height:12px;padding:2px 0 0}
.advanced{border-top:1px solid var(--line)}`
    try{const sheet=new CSSStyleSheet();sheet.replaceSync(css);menuRoot.adoptedStyleSheets=[sheet];}catch(_){const style=document.createElement('style');style.textContent=css;menuRoot.append(style);}
    const wrap=document.createElement('div');wrap.className='panel';wrap.setAttribute('role','dialog');wrap.setAttribute('aria-label','Destiny V5 configuration');
    const C=control,S=choice;
    wrap.innerHTML=`<header id="drag-handle"><div class="mark">D</div><div class="brand"><h1>destiny</h1><p>control session / local</p></div><span class="version">v5.4.0</span><button class="close" data-action="close" aria-label="Close menu">×</button></header>
<div class="topbar"><div class="connection" id="connection" data-state="paused"><span></span><strong id="live-status">idle / enter match / select model id</strong></div></div>
<div class="quick">
  <div class="hero">${C('Enable aim','aim.enabled','checkbox',false,'','Turn this on and you are ready. Auto-arms when you pick an ID.')}</div>
  <div class="idRow"><button data-action="previous" title="Previous ID" aria-label="Previous ID">&#9664;</button><select id="candidate-select" aria-label="Model shader ID"><option value="auto">Automatic</option></select><button data-action="next" title="Next ID" aria-label="Next ID">&#9654;</button><button data-action="auto" title="Auto candidates">Auto</button></div>
  ${C('Visuals','outline','checkbox',true)}
  ${S('Response','aim.response',[['stabilized','Stabilized'],['snap','Snap'],['smooth','Smooth'],['precision','Precision'],['responsive','Responsive']])}
  ${C('Target radius','aim.fov','range',300,'min="60" max="800" step="10"')}
  ${C('Filter dead bodies','aim.filterLying','checkbox',true)}
  ${C('Auto scan IDs','autoScan','checkbox',true,'','Attach and select model IDs automatically when the game is ready. Turn off to pick IDs with the arrow keys.')}
  <div class="rowButtons"><button data-action="pause">Pause effects</button><button data-action="advanced" id="advanced-button">Advanced settings</button></div>
  <div class="quickToast"><span id="toast" class="toast" role="status" aria-live="polite">settings persist locally</span></div>
</div>
<div class="advanced" id="menu-advanced" hidden>
<div class="topbar"><input class="search" type="search" id="search" aria-label="Filter settings" placeholder="/ filter settings"></div>
<div class="layout"><nav class="sidebar" role="tablist" aria-label="Configuration sections"><div class="miniTitle">SECTIONS</div><button data-tab="aim" role="tab">[01] aim</button><button data-tab="targets" role="tab">[02] targets</button><button data-tab="fire" role="tab">[03] fire</button><button data-tab="visuals" role="tab">[04] visuals</button><button data-tab="profiles" role="tab">[05] profiles</button><button data-tab="system" role="tab">[06] system</button><div class="sideNote"><kbd>←/→</kbd> model id<br><kbd>↑</kbd> auto<br><kbd>↓</kbd> pause<br><kbd>/</kbd> command<br><br>type <b>help</b></div></nav>
<div class="body" id="menu-body"><p id="no-results" class="noResults" hidden>No settings match that search.</p>
<section data-section="aim"><div class="pageTitle"><div><h2>Aim control</h2><p>Response styles built on the stabilized tracking path.</p></div><span class="chip">5.0.3 CORE</span></div><div class="grid">
${card('Activation',C('Enable aim','aim.enabled','checkbox',false,'','Uses the current model-shader selection.')+S('Activation input','aim.hold',[['Either','Either mouse button'],['RMB','Right mouse only'],['LMB','Left mouse only'],['AltLeft','Left Alt'],['ShiftLeft','Left Shift'],['KeyC','C key'],['always','Always while in game']])+S('Activation behavior','aim.activation',[['hold','Hold input'],['toggle','Press input to toggle']],'Always ignores this choice. Menus, focus loss and pause reset the toggle.')+'<div class="rowButtons"><button data-action="bind" id="bind-button">Bind a keyboard key</button></div>'+C('Arm aim when selecting an ID','autoArmAim','checkbox',true,'','Turn off to keep manual aim control separate from arrows.'))}
${card('Response',S('Aim response','aim.response',[['snap','Snap · immediate current-observation correction'],['stabilized','Stabilized · current behavior'],['smooth','Smooth · consistent response'],['precision','Precision · gentler near center'],['responsive','Responsive · faster acquisition']])+C('Smoothing','aim.smoothing','range',28,'min="0" max="160" step="1"','0 is immediate. Higher values respond more slowly.')+C('Maximum correction','aim.maxStep','range',46,'min="8" max="80" step="1"')+C('Settle radius','aim.settlePx','range',1.6,'min="1" max="5" step="0.1"','Stops corrections very close to the aim point.')+C('Filter lying bodies','aim.filterLying','checkbox',true,'','On by default. Targets with a horizontal/grounded pose are excluded from selection.','')+C('Minimum confidence','aim.confidenceMin','range',.22,'min="0" max="1" step="0.01"','Ignored for Snap mode.','0 means target everything visible.')+C('Switch cooldown','aim.switchCooldownMs','range',120,'min="0" max="500" step="5"','Ignored for Snap mode.','0 means instant switching to the best target.')+C('Target grace period','aim.graceMs','range',150,'min="0" max="200" step="5"','Ignored for Snap mode.','0 means no grace period for missing frames.'))}
${card('Quick tuning','<div class="presetGrid"><button data-preset="balanced">Balanced</button><button data-preset="gentle">Gentle</button><button data-preset="precise">Precise</button><button data-preset="responsive">Responsive</button></div><p class="scope">Changes response parameters only. Keeps your yaw/pitch calibration, FOV, target point and visual settings. Aim is disabled until re-enabled.</p>','',true)}
</div><details><summary>Advanced · input route, axes & calibration</summary><div class="grid">
${card('Input route',S('Output method','aim.mode',[['camera-direct','Direct camera rig · current route'],['mouse-assist','Assist physical mouse movement'],['delta-hook','Event-local delta · compatibility'],['relative','Relative event · legacy compatibility']],'Compatibility events can be ignored by the game; dispatch is not proof of accepted aim.')+S('Controlled axes','aim.axes',[['both','Yaw + pitch'],['yaw','Yaw only'],['pitch','Pitch only']])+C('On-fire alignment','aim.silentAim','checkbox',false,'','Legacy extra camera correction at fire time. Not silent aim or a verified shot-vector change.'))}
${card('Calibration',C('Yaw sensitivity','aim.yaw','number',.002,'min="0.00005" max="0.03" step="0.00005"')+C('Pitch sensitivity','aim.pitch','number',.002,'min="0.00005" max="0.03" step="0.00005"')+C('Invert horizontal','aim.invertX','checkbox',false)+C('Invert vertical','aim.invertY','checkbox',false)+C('Yaw strength','aim.yawStrength','range',1,'min="0" max="1.5" step="0.05"')+C('Pitch strength','aim.pitchStrength','range',1,'min="0" max="1.5" step="0.05"'))}
${card('Offsets & deadzone',C('Yaw offset','aim.offsetYaw','number',0,'min="-20" max="20" step="0.1"')+C('Pitch offset','aim.offsetPitch','number',0,'min="-20" max="20" step="0.1"')+C('Additional deadzone','aim.deadzone','range',1,'min="0" max="12" step="0.1"','The larger of this and the settle radius is used.'))}
</div></details></section>
<section data-section="targets" hidden><div class="pageTitle"><div><h2>Target tracking</h2><p>Acquisition, retention and pose-following controls.</p></div><span class="chip">NO TEAM INFERENCE</span></div><div class="grid">
${card('Acquisition',C('Acquisition radius','aim.fov','range',300,'min="60" max="800" step="10"','Radius in CSS screen pixels, not a field-of-view angle. Snap mode auto-broadens for quick acquisition.')+S('Target priority','aim.priority',[['crosshair','Closest to crosshair'],['distance','Closest in view-space distance']])+C('Maximum target distance','aim.maxDistance','number',0,'min="0" max="10000" step="1"','0 means unlimited. Units come from the game, not verified meters.')+C('Require line of sight','aim.occlusionCheck','checkbox',false,'','Off by default. When enabled, a full-scene raycast skips targets behind walls. This is expensive and can stutter or freeze the page on busy scenes; only enable it in a live match.') )}
${card('Retention',C('Sticky target','aim.sticky','checkbox',true)+S('Lock policy','aim.lockPolicy',[['balanced','Balanced · switch only if clearly better'],['hold-target','Keep current target while eligible']])+C('Switch resistance','aim.switchBias','range',1,'min="0.25" max="3" step="0.05"','Used by Balanced. Higher values resist target changes.')+C('Retention radius multiplier','aim.retainFov','range',1.35,'min="1" max="1.6" step="0.05"')+C('Missing-frame grace','aim.graceMs','range',150,'min="0" max="200" step="10"','Measured from the last real observation; never extends itself.'))}
${card('Aim point',C('Adaptive targeting 2.0','aim.adaptiveTargeting','checkbox',true,'','Uses pose, projected model size and a stable bone to choose the final target point.')+S('Target zone','aim.targetZone',[['top','Model top · reads the mesh top, nudged down (recommended)'],['adaptive','Adaptive · torso near, higher at range'],['torso','Torso'],['upper','Upper chest'],['head','Head bias'],['custom','Custom height below']])+C('Top offset','aim.topOffset','range',.03,'min="0" max="0.3" step="0.01"','Used by Model top. How far below the head bone to aim. 0 = exactly the head bone; higher is safer against overshoot.')+C('Recoil compensation','aim.recoilComp','range',0,'min="0" max="0.5" step="0.01"','Extra downward aim while the fire input is held, as a fraction of model height. 0 = off. Raise until sustained fire stays on target.')+S('Anchor source','aim.anchor',[['pose','Animated pose, geometry fallback'],['geometry','Geometry point only']])+C('Custom target height','aim.point','range',.52,'min="0.3" max="0.8" step="0.01"')+'<p class="note">Model top reads the model bounds directly and aims just below the top of the head. Adaptive raises the target point as the projected model gets smaller, then keeps the same viable bone where possible.</p>')}
${card('Distance intelligence',C('Distance-aware precision','aim.distanceAware','checkbox',true,'','Shrinks settle/deadzone as the model gets smaller.')+C('Dynamic acquisition FOV','aim.dynamicFov','checkbox',true,'','Narrows acquisition for distant/small targets while retention remains wider for the current lock.')+C('Far FOV floor','aim.dynamicFovMin','range',.58,'min="0.3" max="1" step="0.02"')+C('Far-target precision strength','aim.distancePrecision','range',.9,'min="0" max="1" step="0.05"')+C('Reference model height','aim.distanceReferencePx','range',220,'min="60" max="400" step="10"'))}
${card('Motion & lock stability',C('Prediction horizon','aim.predictionMs','range',14,'min="0" max="24" step="1"','0 disables motion lead. Lead still fades near the crosshair.')+C('Vertical motion prediction','aim.verticalPrediction','range',1,'min="0" max="2" step="0.05"','Separate multiplier for crouch, jump and fall tracking. 1 = normal; 0 = no vertical lead.')+C('Near-center damping','aim.nearDamping','range',1,'min="0.6" max="1.8" step="0.05"')+C('Target switch cooldown','aim.switchCooldownMs','range',120,'min="0" max="500" step="10"','Prevents rapid ping-pong between similarly ranked targets.')+C('Minimum lock confidence','aim.confidenceMin','range',.22,'min="0" max="1" step="0.02"','Confidence uses anchor quality, projected size and crosshair proximity. Keep low unless tuning.')+'<p class="note">Use CLI command <b>watch target</b> or <b>watch aim</b> to inspect the live zone, point, confidence and vertical lead.</p>')}
${card('Downed-target handoff',C('Skip downed poses','aim.ignoreDowned','checkbox',true,'','Per model, never the entire shader ID. Confirm a sustained horizontal pose before releasing the lock.')+C('Hide excluded bodies','hideDowned','checkbox',true,'','Remove their fill and outline while excluded. The selected-target marker is always cleared on release.')+C('Model tilt threshold','aim.lyingTilt','range',.8,'min="0" max="1" step="0.02"','Reads the model up-axis. Below this vertical fraction the model is treated as fallen and skipped. 1 = only perfectly flat counts; lower catches the fall sooner.')+C('Horizontal confirmation','aim.downedConfirmMs','range',140,'min="60" max="500" step="10"','Lower is faster; higher is more cautious around unusual animation tilts.')+C('Upright recovery','aim.downedRecoverMs','range',180,'min="60" max="700" step="10"','Allow a reused or respawned model again after a stable upright pose.')+C('Flatness threshold','aim.downedRatio','range',.48,'min="0.25" max="0.60" step="0.01"','Height / horizontal span in gravity-corrected 3D space. Higher filters more aggressively.')+'<p class="note">Model tilt reads the character rotation directly: a normal controller only tips the model onto the floor when it dies. Pose/flatness is a secondary heuristic, not verified health or ground contact. Crouches and jumps are not excluded merely for changing height. Missing pose data does not create a new death decision.</p>','',true)}
</div><details><summary>Advanced · target-point offsets</summary><div class="grid">${card('Point offsets',C('X offset','aim.localX','number',0,'min="-10" max="10" step="0.01"')+C('Y offset','aim.localY','number',0,'min="-10" max="10" step="0.01"')+C('Z offset','aim.localZ','number',0,'min="-10" max="10" step="0.01"')+'<p class="note">Applied in world axes for a bone anchor, model-local axes for the geometry fallback. Defaults are zero.</p>','',true)}</div></details></section>
<section data-section="fire" hidden><div class="pageTitle"><div><h2>Fire control</h2><p>Optional firing assistance built on the current target stream.</p></div><span class="chip">EXPERIMENTAL INPUT</span></div><div class="grid">
${card('Master',C('Enable fire assist','fire.enabled','checkbox',false,'','Never persists as active after reload or profile load.')+S('Fire mode','fire.mode',[['trigger','Trigger · fire only when crosshair is already on target'],['tracked','Tracked fire · normal aim settles first'],['quickshot','Quickshot · momentary shot alignment + auto fire'],['burst','Burst quickshot · configurable burst'],['tap','Target tap · one quickshot per acquired target'],['manual-redirect','Manual redirect · your real LMB shot is aligned then restored']])+S('Fire activation','fire.hold',[['RMB','Hold right mouse'],['LMB','Hold left mouse'],['Either','Either mouse button'],['aim','Use the current aim activation'],['KeyF','F key'],['KeyX','X key'],['always','Always while focused in game']]))}
${card('Target gate',C('Trigger radius','fire.triggerPx','range',7,'min="1" max="48" step="1"','Used by Trigger and Tracked modes. CSS screen pixels from the selected target point.')+C('Minimum target confidence','fire.minConfidence','range',.35,'min="0" max="1" step="0.01"')+C('Maximum target age','fire.maxTargetAgeMs','range',80,'min="20" max="180" step="5"','Reject stale target observations before firing.')+C('Automatic handoff','fire.autoHandoff','checkbox',true,'','Move to the next eligible model after the current one is excluded/downed.')+C('Current draw only','fire.onlyCurrentDraw','checkbox',true,'','Recommended. Prevent firing from sticky/predicted-only target data.'))}
${card('Cadence',C('Maximum shots / second','fire.rate','range',8,'min="1" max="20" step="1"')+C('Burst shots','fire.burstShots','range',3,'min="1" max="8" step="1"')+C('Burst spacing','fire.burstGapMs','range',85,'min="35" max="350" step="5"'))}
${card('Quickshot alignment',C('Restore delay','fire.restoreDelayMs','range',0,'min="0" max="50" step="1"','0 restores the camera immediately after the synthetic shot event. A longer delay can be more compatible but may become visible.')+S('Synthetic event target','fire.route',[['pointer-lock','Pointer-lock element · recommended'],['window','Window · compatibility']])+'<p class="note"><strong>Quickshot is not verified silent aim.</strong> It briefly aligns the existing camera rig, dispatches an untrusted browser mouse event, then restores the rig. A game may ignore synthetic events. Manual Redirect uses your real trusted LMB event and is therefore the compatibility fallback.</p>','',true)}
${card('Mode behavior','<div class="keys"><kbd>TRIGGER</kbd><span>No camera change; fires only inside the trigger radius.</span><kbd>TRACKED</kbd><span>Requires the normal aim controller to be active and settled.</span><kbd>QUICKSHOT</kbd><span>Momentary target alignment, synthetic shot, immediate restore.</span><kbd>BURST</kbd><span>Repeated quickshots using the burst count and spacing.</span><kbd>TAP</kbd><span>One quickshot per newly acquired target.</span><kbd>MANUAL</kbd><span>You click LMB; Destiny aligns that trusted shot and restores immediately after the event.</span></div>','',true)}
</div></section>
<section data-section="visuals" hidden><div class="pageTitle"><div><h2>Rendering & guides</h2><p>Customize the existing mask, contour and target indicator.</p></div><span class="chip">FRAME-SYNC DEFAULT</span></div><div class="grid">
${card('Highlight modes',S('Visibility styling','visibilityMode',[['unified','Unified · one style for the whole silhouette'],['split','Split · separate visible and occluded pixels']])+ '<div class="rowButtons"><button data-highlight="outline">Outline</button><button data-highlight="filled">Full color</button><button data-highlight="hybrid">Fill + outline</button></div><div class="rowButtons"><button class="primary" data-highlight="visible-outline-hidden-fill">Visible outline / hidden fill</button><button data-highlight="visible-fill-hidden-outline">Visible fill / hidden outline</button><button data-highlight="two-tone">Two-tone hybrid</button><button data-highlight="visible-only">Visible only</button><button data-highlight="hidden-only">Hidden only</button></div><div class="rowButtons"><button class="primary" data-action="arm-split">Enable split for this session</button></div><p class="note" id="visibility-live">Unified style · no visibility pass needed.</p><p class="note">5.1.3 safety: a saved split preset never performs depth work on page load or first ID selection. Enable it explicitly after entering a match. Unsafe/default depth sources fall back without touching the game depth buffer.</p>','',true)}
${card('Visible pixels · split mode',S('Visible style','visibleStyle',[['off','Off'],['outline','Outline only'],['filled','Full color'],['hybrid','Fill + outline']])+C('Visible fill color','visibleColor','color','#49e3b6')+C('Visible fill opacity','visibleOpacity','range',.22,'min="0" max="1" step="0.01"')+C('Visible outline color','visibleEdgeColor','color','#84ffcf')+C('Visible outline opacity','visibleEdgeOpacity','range',1,'min="0" max="1" step="0.01"')+C('Visible outline width','visibleWidth','range',2,'min="1" max="5" step="1"'))}
${card('Occluded pixels · split mode',S('Occluded style','hiddenStyle',[['off','Off'],['outline','Outline only'],['filled','Full color'],['hybrid','Fill + outline']])+C('Occluded fill color','hiddenColor','color','#ff356d')+C('Occluded fill opacity','hiddenOpacity','range',.42,'min="0" max="1" step="0.01"')+C('Occluded outline color','hiddenEdgeColor','color','#ff80cb')+C('Occluded outline opacity','hiddenEdgeOpacity','range',.9,'min="0" max="1" step="0.01"')+C('Occluded outline width','hiddenWidth','range',2,'min="1" max="5" step="1"'))}
${card('Depth split options',C('Outline the occlusion boundary','occlusionSeam','checkbox',false,'','Off: exterior silhouette only. On: also draw the border where a wall cuts across the model.')+C('Depth tolerance','depthBias','range',4,'min="0" max="16" step="1"','Small depth-buffer tolerance for matching surfaces. Increase only for self-occlusion speckle; too high can misclassify very close surfaces.')+S('When scene depth is unavailable','depthFallback',[['hide','Hide unclassified split pixels'],['unified','Use the unified highlight style instead']])+'<p class="note">Unknown visibility is not called visible or hidden. System/F9 reports unsupported depth formats or render passes. Transparent surfaces that do not write depth do not count as occluders. Split mode uses additional full-size GPU depth buffers; frame synchronization is unchanged.</p>','',true)}
${card('Model enhancement','<div id="visual-swatch" class="swatch">STYLE PREVIEW · NOT GAME OUTPUT</div>'+C('Enable model visuals','outline','checkbox',true)+S('Visual style','visualStyle',[['hybrid','Hybrid · fill + contour'],['outline','Outline only · transparent interior'],['filled','Fill only · no contour']])+C('Body color','color','color','#ff356d')+C('Body opacity','opacity','range',.42,'min="0" max="1" step="0.01"'))}
${card('Contour',C('Contour width','width','range',2,'min="1" max="5" step="1"')+C('Contour opacity','edgeOpacity','range',.87,'min="0" max="1" step="0.01"')+C('Derive contour color from body','linkEdgeColor','checkbox',true)+C('Custom contour color','edgeColor','color','#ff80cb')+'<p class="note">Outline-only leaves the body unchanged. Fill-only disables the contour. The two opacity controls are independent.</p>')}
${card('Target marker',C('Show selected target marker','aim.marker','checkbox',true)+S('Marker style','aim.markerStyle',[['cross','Crosshair'],['ring','Ring'],['brackets','Brackets']])+C('Marker color','aim.markerColor','color','#ff4f7f')+C('Marker size','aim.markerSize','range',7,'min="3" max="18" step="1"')+C('Marker opacity','aim.markerOpacity','range',.9,'min="0" max="1" step="0.05"')+C('Connect marker to crosshair','aim.showLink','checkbox',false))}
${card('Acquisition guide',C('Show acquisition circle','aim.showGuide','checkbox',true)+C('Guide color','aim.guideColor','color','#8b7cff')+C('Guide opacity','aim.guideOpacity','range',.26,'min="0" max="1" step="0.01"')+'<p class="note">Guides appear only after activation with aim enabled. They hide while the menu is open, the tab is hidden, or focus is lost.</p>')}
${card('Quality & frame pacing','<div class="rowButtons"><button data-quality="performance">Performance</button><button data-quality="balanced">Balanced</button><button data-quality="quality">Quality</button></div>'+S('Mask resolution','resolution',[[.5,'50% · lower GPU cost'],[.75,'75% · balanced'],[1,'100% · native render size']])+S('Mask update rate','fps',[[0,'Every render batch · no intentional lag'],[20,'20 FPS'],[30,'30 FPS'],[60,'60 FPS'],[90,'90 FPS'],[120,'120 FPS'],[144,'144 FPS'],[165,'165 FPS'],[240,'240 FPS']])+C('Mask pixel budget','maxPixels','number',2500000,'min="250000" max="8300000" step="250000"','Budget can lower resolution further on large displays.')+'<p class="note"><strong>Capped rates may trail moving models.</strong> Quality presets keep full-rate updates. Lower resolution first when reducing GPU cost.</p>','',true)}
</div></section>
<section data-section="profiles" hidden><div class="pageTitle"><div><h2>Profiles</h2><p>Save, switch and share configuration—not runtime state.</p></div><span class="chip">LOCAL ONLY</span></div><div class="grid">
${card('Saved configurations','<select id="profile-select" class="profileList" aria-label="Saved profile"></select><input type="text" id="profile-name" class="profileName" maxlength="32" aria-label="Profile name" placeholder="Name this setup…"><div class="rowButtons"><button class="primary" data-action="save-profile">Save current</button><button data-action="load-profile">Load selected</button><button class="danger" data-action="delete-profile">Delete</button></div><p class="note">Up to 8 profiles. Loading one turns aim off. Nothing auto-starts, and no model IDs are stored.</p>')}
${card('Import & export','<div class="rowButtons"><button class="primary" data-action="export-settings">Export settings JSON</button><button data-action="import-settings">Import JSON…</button></div><input type="file" id="import-file" accept=".json,application/json" hidden><div id="import-preview" class="importPreview" hidden><span id="import-summary"></span><div class="rowButtons"><button class="primary" data-action="confirm-import">Apply imported settings</button><button data-action="cancel-import">Cancel</button></div></div><p class="note">Imports are validated and previewed before applying. Unknown fields are ignored. Exports omit game objects, shader IDs and held inputs.</p>')}
${card('Scoped resets','<div class="rowButtons"><button data-action="reset-aim">Reset aim only</button><button data-action="reset-fire">Reset fire only</button><button data-action="reset-visuals">Reset visuals only</button><button class="danger" data-action="reset-all">Reset all settings</button></div><p class="note">Resets ask for confirmation. Your saved profiles are not deleted.</p>','',true)}
</div></section>
<section data-section="system" hidden><div class="pageTitle"><div><h2>Session & diagnostics</h2><p>Visible state, local configuration and reversible controls.</p></div><span class="chip">V5.4.0</span></div><div class="grid">
${card('Interface',C('Show status indicator','showStatus','checkbox',true)+C('Menu accent','accent','color','#8b7cff')+S('Panel width','menuScale',[[.8,'Compact · 80%'],[1,'Default · 100%'],[1.2,'Wide · 120%']])+'<p class="note">Drag the header to reposition. The panel is kept inside the viewport.</p>')}
${card('Session actions','<div class="rowButtons"><button class="primary" data-action="next">Attach / next model ID</button><button data-action="pause">Pause all effects</button><button data-action="diagnostics">Export diagnostics · F9</button></div><p class="note">Nothing attaches until an explicit scan or arrow press. Escape only closes this menu; ↓ pauses effects.</p>')}
${card('Live state','<div class="metrics"><div class="metric"><small>MODEL SHADERS</small><b id="metric-models">0</b></div><div class="metric"><small>AIM STATE</small><b id="metric-aim">Disabled</b></div><div class="metric"><small>ANCHOR SOURCE</small><b id="metric-pose">—</b></div><div class="metric"><small>OUTPUT ROUTE</small><b id="metric-route">—</b></div></div><pre class="diagnosticDetail" id="diagnostic-detail"></pre>','',true)}
${card('Keys','<div class="keys"><kbd>INSERT / F6</kbd><span>Menu</span><kbd>← / →</kbd><span>Previous / next model-shader ID</span><kbd>↑</kbd><span>Automatic model candidates</span><kbd>↓</kbd><span>Pause all effects</span><kbd>F9</kbd><span>Export local diagnostic report</span></div>','',true)}
</div></section></div></div>
<footer><div class="cliLine"><span class="cliPS1">destiny&gt;</span><input id="cli-command" autocomplete="off" spellcheck="false" aria-label="Destiny command line" placeholder="help · set aim.fov 420 · target next"></div><div id="cli-suggest" class="cliSuggest">Tab = complete · ↑/↓ = history · help = commands</div><div id="cli-last" class="cliLast" data-kind="info">ready. Instance object-callback draw bridge available; all graphics activation remains first-arrow only.</div><div class="footStatus"><strong>INS/F6 menu · F9 diag</strong></div></footer>
</div>`;
    menuRoot.append(wrap);(document.body||document.documentElement).append(menuHost);
    if(typeof ResizeObserver==='function'){try{panelResizeObserver=new ResizeObserver(()=>{if(menuOpen)clampPanel();});panelResizeObserver.observe(document.documentElement);}catch(_){panelResizeObserver=null;}}
    for(const type of ['pointerdown','pointerup','mousedown','mouseup','click','dblclick','wheel','keydown','keyup'])menuRoot.addEventListener(type,e=>e.stopPropagation());
    menuRoot.addEventListener('input',fieldChanged);menuRoot.addEventListener('change',fieldChanged);
    menuRoot.addEventListener('keydown',e=>{
      const tab=e.target.closest('[role="tab"]');if(!tab||!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
      e.preventDefault();const tabs=[...menuRoot.querySelectorAll('[role="tab"]')],at=tabs.indexOf(tab);
      const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(at+(e.key==='ArrowDown'?1:tabs.length-1))%tabs.length;
      menuTab=tabs[next].dataset.tab;searchText='';menuRoot.getElementById('search').value='';syncMenu();tabs[next].focus();
    });
    menuRoot.getElementById('search').addEventListener('input',e=>{searchText=e.target.value.trim().toLowerCase();filterMenu();});
    const cliInput=menuRoot.getElementById('cli-command');
    cliInput.addEventListener('input',updateCliHint);
    cliInput.addEventListener('keydown',e=>{
      if(e.key==='Enter'){
        e.preventDefault();e.stopPropagation();const raw=cliInput.value.trim();if(!raw)return;
        if(!cliHistory.length||cliHistory[cliHistory.length-1]!==raw)cliHistory.push(raw);if(cliHistory.length>80)cliHistory.shift();cliHistoryIndex=cliHistory.length;cliInput.value='';cliRun(raw);updateCliHint();return;
      }
      if(e.key==='ArrowUp'||e.key==='ArrowDown'){
        e.preventDefault();if(!cliHistory.length)return;cliHistoryIndex=Math.max(0,Math.min(cliHistory.length,e.key==='ArrowUp'?cliHistoryIndex-1:cliHistoryIndex+1));cliInput.value=cliHistoryIndex===cliHistory.length?'':cliHistory[cliHistoryIndex];cliInput.setSelectionRange(cliInput.value.length,cliInput.value.length);updateCliHint();return;
      }
      if(e.key==='Tab'){
        const list=cliSuggestions(cliInput.value);if(list.length){e.preventDefault();cliInput.value=list[0]+(list[0].split(/\s+/).length===1?' ':'');cliInput.setSelectionRange(cliInput.value.length,cliInput.value.length);updateCliHint();}return;
      }
      if(e.key==='Escape'){e.preventDefault();cliInput.value='';updateCliHint();cliInput.blur();}
    });
    menuRoot.addEventListener('keydown',e=>{
      if(e.key==='/'&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.target!==cliInput&&!/^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName||'')){e.preventDefault();cliInput.focus();}
    });
    menuRoot.getElementById('candidate-select').addEventListener('change',e=>{if(e.target.value==='auto')auto();else if(e.target.value)chooseID(e.target.value);});
    menuRoot.getElementById('profile-select').addEventListener('change',e=>{menuRoot.getElementById('profile-name').value=e.target.value;});
    let pendingImport=null;
    menuRoot.getElementById('import-file').addEventListener('change',async e=>{
      const f=e.target.files?.[0];e.target.value='';if(!f)return;
      try{if(f.size>65536)throw Error('Settings file must be smaller than 64 KB.');const text=await f.text();const parsed=parseSettings(text);pendingImport=text;
        menuRoot.getElementById('import-summary').textContent=`Ready: ${parsed.aim.response} aim, ${parsed.visualStyle} visuals, radius ${parsed.aim.fov}px. Applying replaces current settings and disables aim.`;
        menuRoot.getElementById('import-preview').hidden=false;
      }catch(err){pendingImport=null;menuRoot.getElementById('import-preview').hidden=true;notify(err.message);}
    });
    menuRoot.addEventListener('click',e=>{
      const tab=e.target.closest('[data-tab]');if(tab){menuTab=tab.dataset.tab;searchText='';menuRoot.getElementById('search').value='';syncMenu();return;}
      const highlight=e.target.closest('[data-highlight]');if(highlight){applyHighlightPreset(highlight.dataset.highlight);if(config.visibilityMode!=='split')disarmSplitSession('unified-preset');notify(config.visibilityMode==='split'?'Split preset saved. Enter a live match, then click Enable split for this session.':'Highlight preset applied. Aim and calibration unchanged.');return;}
      const preset=e.target.closest('[data-preset]'),quality=e.target.closest('[data-quality]'),point=e.target.closest('[data-point]');
      if(preset){applyAimPreset(preset.dataset.preset);notify('Response preset applied; calibration kept. Re-enable aim to test.');return;}
      if(quality){applyQuality(quality.dataset.quality);notify('Render quality changed; full-rate updates retained.');return;}
      if(point){settings({aim:{point:Number(point.dataset.point)}});return;}
      const button=e.target.closest('[data-action]');if(!button)return;
      const profile=()=>menuRoot.getElementById('profile-select').value;
      const actions={close:()=>toggleMenu(false),previous:()=>cycle(-1),next:()=>cycle(1),auto,pause:off,'arm-split':()=>{const r=armSplitSession();notify(r.ok?'Split visibility enabled for this session.':r.error);},
        bind:()=>{bindingKey=true;notify('Press a letter, number, Alt or Shift. Escape cancels.');menuRoot.getElementById('bind-button').textContent='Waiting for key…';},
        'export-settings':()=>{exportSettings();notify('Settings export requested.');},'import-settings':()=>menuRoot.getElementById('import-file').click(),
        'confirm-import':()=>{if(!pendingImport)return;importSettings(pendingImport);pendingImport=null;menuRoot.getElementById('import-preview').hidden=true;notify('Imported settings applied; aim disabled.');},
        'cancel-import':()=>{pendingImport=null;menuRoot.getElementById('import-preview').hidden=true;},
        'save-profile':()=>{const name=profileName(menuRoot.getElementById('profile-name').value);if(loadProfiles().some(p=>p.name===name)&&!window.confirm('Replace profile “'+name+'”?'))return;saveProfile(name);refreshProfiles(name);notify('Profile saved: '+name);},
        'load-profile':()=>{restoreProfile(profile());syncMenu();notify('Profile loaded; aim disabled.');},
        'delete-profile':()=>{const name=profile();if(name&&window.confirm('Delete profile “'+name+'”?')){deleteProfile(name);refreshProfiles();notify('Profile deleted.');}},
        'reset-aim':()=>{if(window.confirm('Reset all aim settings, including calibration?')){settings({aim:{...DEFAULTS.aim,enabled:false}});notify('Aim defaults restored.');}},
        'reset-fire':()=>{if(window.confirm('Reset fire-assist settings?')){settings({fire:{...DEFAULTS.fire,enabled:false}});notify('Fire defaults restored.');}},
        'reset-visuals':()=>{if(window.confirm('Reset visual style, colors and quality?')){const p={};for(const k of ['outline','visualStyle','width','opacity','color','edgeColor','edgeOpacity','linkEdgeColor','hideDowned','resolution','maxPixels','fps','visibilityMode','visibleStyle','hiddenStyle','visibleColor','visibleOpacity','visibleEdgeColor','visibleEdgeOpacity','visibleWidth','hiddenColor','hiddenOpacity','hiddenEdgeColor','hiddenEdgeOpacity','hiddenWidth','occlusionSeam','depthBias','depthFallback'])p[k]=DEFAULTS[k];settings(p);notify('Visual defaults restored.');}},
        'reset-all':()=>{if(window.confirm('Reset all current settings? Saved profiles and your old 5.0.x settings are kept.')){resetSettings();notify('Defaults restored; aim disabled.');}},
        diagnostics:()=>{exportDiagnostics();notify('Diagnostic download requested.');},
        advanced:()=>{advancedOpen=!advancedOpen;const box=menuRoot.getElementById('menu-advanced');if(box)box.hidden=!advancedOpen;const b=menuRoot.getElementById('advanced-button');if(b)b.textContent=advancedOpen?'Hide advanced':'Advanced settings';syncMenu();}
      };
      try{actions[button.dataset.action]?.();updateMenuLive();}catch(err){notify(String(err?.message||err));}
    });
    const header=menuRoot.getElementById('drag-handle');
    header.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;panelUserPositioned=true;const r=menuHost.getBoundingClientRect();panelDrag={x:e.clientX-r.left,y:e.clientY-r.top};header.setPointerCapture(e.pointerId);});
    header.addEventListener('pointermove',e=>{if(!panelDrag)return;positionPanel(e.clientX-panelDrag.x,e.clientY-panelDrag.y);});
    for(const t of ['pointerup','pointercancel','lostpointercapture'])header.addEventListener(t,()=>{panelDrag=null;});
    refreshProfiles();syncMenu();
  }
  function positionPanel(x,y){if(!menuHost)return;const r=menuHost.getBoundingClientRect();menuHost.style.right='auto';menuHost.style.left=Math.max(8,Math.min(window.innerWidth-r.width-8,x))+'px';menuHost.style.top=Math.max(8,Math.min(window.innerHeight-r.height-8,y))+'px';}
  function clampPanel(){if(!menuHost||!menuOpen)return;const base=advancedOpen?790:360;menuHost.style.width=Math.max(280,Math.min(base*config.menuScale,window.innerWidth-24))+'px';const r=menuHost.getBoundingClientRect();if(!panelUserPositioned){menuHost.style.left='auto';menuHost.style.right='24px';menuHost.style.top=Math.max(8,Math.min(window.innerHeight-r.height-8,r.top))+'px';return;}positionPanel(r.left,r.top);}
  function notify(text){if(!menuRoot)return;clearTimeout(toastTimer);menuRoot.getElementById('toast').textContent=text;toastTimer=setTimeout(()=>{if(menuRoot)menuRoot.getElementById('toast').textContent=storageMessage||'settings persist locally';},5500);}
  function refreshProfiles(selectedName=''){if(!menuRoot)return;const box=menuRoot.getElementById('profile-select');const current=selectedName||box.value;box.replaceChildren();const list=loadProfiles();for(const p of list){const o=document.createElement('option');o.value=p.name;o.textContent=p.name;box.append(o);}if(!list.length){const o=document.createElement('option');o.value='';o.textContent='No saved profiles yet';box.append(o);}if(list.some(p=>p.name===current))box.value=current;}
  function fieldChanged(e){
    const input=e.target,name=input.name||input.dataset.mirror;if(!name)return;
    if(input.type==='number'&&(!input.value.trim()||!Number.isFinite(input.valueAsNumber)))return;
    const value=input.type==='checkbox'?input.checked:input.type==='range'||input.type==='number'?input.valueAsNumber:input.value;
    const patch=name.startsWith('aim.')?{aim:{[name.slice(4)]:value}}:name.startsWith('fire.')?{fire:{[name.slice(5)]:value}}:{[name]:value};
    if(e.type==='input'&&['range','color','number'].includes(input.type)){
      const before=config;config=validatedConfig(patch,config);width=config.width;maskFPS=config.fps;
      if(['width','resolution','fps','maxPixels'].includes(name)&&before[name]!==config[name])invalidate();
      if(['aim.point','aim.localX','aim.localY','aim.localZ'].includes(name))clearTracking();
      queueSave();syncMenu();paint();
    }else if(e.type==='change'){
      settings(patch);
      if(name==='visibilityMode'&&value!=='split')disarmSplitSession('unified-selected');
      if(name==='visibilityMode'&&value==='split')notify('Split style saved. Enable it explicitly for this session after entering a match.');
      if(input.type==='number'||input.type==='range'){const stored=name.startsWith('aim.')?config.aim[name.slice(4)]:name.startsWith('fire.')?config.fire[name.slice(5)]:config[name];input.value=String(stored);}
    }else return;
    updateControlOutputs();
  }
  function toggleMenu(force){
    if(suspended)return false;ensureMenu();menuOpen=typeof force==='boolean'?force:!menuOpen;menuHost.style.display=menuOpen?'block':'none';
    bindingKey=false;menuRoot.getElementById('bind-button').textContent='Bind a keyboard key';
    if(menuOpen){try{document.exitPointerLock?.();}catch(_){}resetInput();syncMenu();clampPanel();const cli=menuRoot.getElementById('cli-command');if(cli){cli.focus();updateCliHint();}}
    else{try{menuRoot.activeElement?.blur?.();}catch(_){}resetInput();saveSettings();}
    drawAimGuide();return menuOpen;
  }
  function filterMenu(){
    if(!menuRoot)return;let total=0;
    for(const section of menuRoot.querySelectorAll('[data-section]')){
      if(!searchText){section.hidden=section.dataset.section!==menuTab;for(const el of section.querySelectorAll('.setting,[data-card]'))el.hidden=false;continue;}
      let count=0;
      for(const c of section.querySelectorAll('[data-card]')){let matches=0;
        const rows=[...c.querySelectorAll('.setting')];for(const row of rows){const yes=row.textContent.toLowerCase().includes(searchText);row.hidden=!yes;if(yes)matches++;}
        if(!rows.length&&c.textContent.toLowerCase().includes(searchText))matches++;
        c.hidden=!matches;count+=matches;
      }
      section.hidden=!count;total+=count;if(count)for(const d of section.querySelectorAll('details'))d.open=true;
    }
    menuRoot.getElementById('no-results').hidden=!searchText||total>0;
  }
  function syncMenu(){
    if(!menuRoot)return;menuHost.style.setProperty('--accent',config.accent);
    for(const input of menuRoot.querySelectorAll('[name],[data-mirror]')){
      const name=input.name||input.dataset.mirror,value=name.startsWith('aim.')?config.aim[name.slice(4)]:name.startsWith('fire.')?config.fire[name.slice(5)]:config[name];if(value===undefined)continue;
      if(input.type==='checkbox')input.checked=!!value;
      else if(menuRoot.activeElement!==input){if(input.tagName==='SELECT'&&![...input.options].some(o=>o.value===String(value))){const option=document.createElement('option');option.value=String(value);option.textContent='Custom: '+String(value);input.append(option);}input.value=String(value);}
    }
    menuRoot.querySelector('[name="edgeColor"]').disabled=config.linkEdgeColor;
    menuRoot.querySelector('[name="aim.activation"]').disabled=config.aim.hold==='always';
    for(const t of menuRoot.querySelectorAll('[data-tab]')){t.setAttribute('aria-selected',String(t.dataset.tab===menuTab));t.tabIndex=t.dataset.tab===menuTab?0:-1;}
    filterMenu();updateControlOutputs();updateMenuLive();updateSwatch();clampPanel();
  }
  function updateSwatch(){if(!menuRoot)return;const s=menuRoot.getElementById('visual-swatch');
    if(config.visibilityMode==='split'){s.style.cssText='height:auto;min-height:54px;background:transparent;border:0;display:flex;gap:10px;';s.replaceChildren();for(const[prefix,labelText]of [['visible','VISIBLE'],['hidden','OCCLUDED']]){const el=document.createElement('span'),style=config[prefix+'Style'],rgb=colorRGB(config[prefix+'Color']).map(x=>Math.round(x*255)),edge=colorRGB(config[prefix+'EdgeColor']).map(x=>Math.round(x*255));el.textContent=labelText+(style==='off'?' · OFF':'');el.style.cssText='flex:1;text-align:center;padding:13px 4px;border-radius:7px;font-size:9px;';el.style.background=['off','outline'].includes(style)?'transparent':`rgba(${rgb},${config[prefix+'Opacity']})`;el.style.border=`${config[prefix+'Width']}px solid `+(['off','filled'].includes(style)?'transparent':`rgba(${edge},${config[prefix+'EdgeOpacity']})`);s.append(el);}return;}
    s.style.cssText='';s.textContent='UNIFIED STYLE PREVIEW · NOT GAME OUTPUT';const edge=config.linkEdgeColor?colorRGB(config.color).map(x=>Math.round(Math.min(1,x*1.35+.22)*255)):colorRGB(config.edgeColor).map(x=>Math.round(x*255));const fill=colorRGB(config.color).map(x=>Math.round(x*255));s.style.background=config.visualStyle==='outline'?'transparent':`rgba(${fill},${config.opacity})`;s.style.border=config.visualStyle==='filled'?'2px solid transparent':`${config.width}px solid rgba(${edge},${config.edgeOpacity})`;}
  function updateControlOutputs(){
    if(!menuRoot)return;const format={'aim.downedConfirmMs':v=>Math.round(v)+' ms','aim.downedRecoverMs':v=>Math.round(v)+' ms','aim.downedRatio':v=>v.toFixed(2)+' height / horizontal span','aim.lyingTilt':v=>v.toFixed(2)+' up-axis','aim.fov':v=>Math.round(v)+' px radius','aim.smoothing':v=>Math.round(v)+' ms','aim.point':v=>Math.round(v*100)+'% height hint','aim.topOffset':v=>Math.round(v*100)+'% below top','aim.recoilComp':v=>Math.round(v*100)+'% while firing','aim.graceMs':v=>Math.round(v)+' ms','aim.predictionMs':v=>Math.round(v)+' ms maximum base lead','aim.settlePx':v=>v.toFixed(1)+' px','aim.deadzone':v=>v.toFixed(1)+' px','aim.markerSize':v=>Math.round(v)+' px','aim.distancePrecision':v=>Math.round(v*100)+'%','aim.distanceReferencePx':v=>Math.round(v)+' px','fire.triggerPx':v=>Math.round(v)+' px','fire.rate':v=>Math.round(v)+' / sec','fire.minConfidence':v=>Math.round(v*100)+'%','fire.maxTargetAgeMs':v=>Math.round(v)+' ms','fire.burstShots':v=>Math.round(v)+' shots','fire.burstGapMs':v=>Math.round(v)+' ms','fire.restoreDelayMs':v=>Math.round(v)+' ms','opacity':v=>Math.round(v*100)+'%','edgeOpacity':v=>Math.round(v*100)+'%','width':v=>Math.round(v)+' CSS px'};
    for(const output of menuRoot.querySelectorAll('[data-output]')){const n=output.dataset.output,v=n.startsWith('aim.')?config.aim[n.slice(4)]:n.startsWith('fire.')?config.fire[n.slice(5)]:config[n];output.textContent=(format[n]||String)(v);}
  }
  function updateMenuLive(){
    if(!menuRoot||!menuOpen)return;
    const visibilityNode=menuRoot.getElementById('visibility-live');if(visibilityNode){const rec=[...records.values()].find(r=>visibleGameCanvas(r.canvas)),v=rec?.visibility;visibilityNode.textContent=config.visibilityMode!=='split'?'Unified style · no depth pass needed.':!splitSessionArmed?'Split preset saved · SAFE / NOT ARMED this session.':rec?.visibilityError?'Depth unavailable: '+rec.visibilityError+' · fallback: '+config.depthFallback:!v?'Split armed · waiting for a compatible offscreen depth source.':v.lastReason?'Depth unavailable: '+v.lastReason+' · fallback: '+config.depthFallback:'Depth split submitted · '+(v.lastSource?.kind||'waiting')+' · '+(v.lastSource?.timing||'no completed pass');}
const rows=candidateRows().filter(r=>!r.viewmodelLike),ready=attached&&enabled&&rows.length;
    const connection=menuRoot.getElementById('connection');connection.dataset.state=!enabled?'paused':ready?'ready':'scanning';
    const rawRows=candidateRows();
    menuRoot.getElementById('live-status').textContent=!attached?'Enter a match, then select an ID':!enabled?'Effects paused':ready?`${rows.length} model shader${rows.length===1?'':'s'} · ${selected===null?'Auto':'ID '+selected} · aim ${config.aim.enabled?'on':'off'} · fire ${config.fire.enabled?config.fire.mode:'off'}`:streamStatus().message;
    const select=menuRoot.getElementById('candidate-select'),signature=rows.map(r=>r.id).join(',');
    if(select.dataset.signature!==signature){select.dataset.signature=signature;select.replaceChildren();const autoOption=document.createElement('option');autoOption.value='auto';autoOption.textContent='Automatic · all non-viewmodel candidates';select.append(autoOption);for(const r of rows){const o=document.createElement('option');o.value=String(r.id);o.textContent='Model shader ID '+r.id;select.append(o);}}
    if(menuRoot.activeElement!==select)select.value=selected===null?'auto':String(selected);
    menuRoot.getElementById('metric-models').textContent=String(rows.length);menuRoot.getElementById('metric-aim').textContent=aimState.status;
    menuRoot.getElementById('metric-pose').textContent=aimState.target?.pose||aimState.pointMethod||'—';menuRoot.getElementById('metric-route').textContent=aimState.method;
    menuRoot.getElementById('diagnostic-detail').textContent='Settings: '+migrationSource+'\n'+(storageMessage||'Local persistence available')+'\nDowned filter: '+(config.aim.ignoreDowned?'on':'off')+'; exclusions '+downedStats.exclusions+'; handoffs '+downedStats.handoffs+'; unknown samples '+downedStats.unknown+'\nHighlight depth: '+([ ...records.values()].find(r=>r.visibility)?.visibility?.phase||config.visibilityMode)+'\nInput acceptance: '+aimState.acceptance+'\nFire: '+(config.fire.enabled?config.fire.mode:'off')+' · '+fireState.status+' · pulses '+fireState.pulses+(fireState.lastError?'\nLast fire issue: '+fireState.lastError:'')+(aimState.lastError?'\nLast aim issue: '+aimState.lastError:'');
  }
  function drawAimGuide(){
    const a=config.aim;if(!a.enabled||(!a.showGuide&&!a.marker&&!a.showLink)||menuOpen||!attached||!enabled||document.hidden||!document.hasFocus()){if(guide)guide.style.display='none';return;}
    const rec=[...records.values()].find(r=>r.gl&&visibleGameCanvas(r.canvas));if(!rec){if(guide)guide.style.display='none';return;}
    if(!guide){guide=document.createElement('canvas');guide.id='destiny-v5-aim-guide';guide.style.cssText='position:fixed;pointer-events:none;z-index:2147483645';(document.body||document.documentElement).append(guide);}
    const rect=rec.canvas.getBoundingClientRect(),ratio=Math.min(1.5,window.devicePixelRatio||1),w=Math.max(1,Math.round(rect.width*ratio)),h=Math.max(1,Math.round(rect.height*ratio));
    if(guide.width!==w)guide.width=w;if(guide.height!==h)guide.height=h;guide.style.display='block';guide.style.left=rect.left+'px';guide.style.top=rect.top+'px';guide.style.width=rect.width+'px';guide.style.height=rect.height+'px';
    const c=guide.getContext('2d');if(!c)return;c.setTransform(ratio,0,0,ratio,0,0);c.clearRect(0,0,rect.width,rect.height);
    const target=aimState.target,cx=target?target.centerX-rect.left:rect.width/2,cy=target?target.centerY-rect.top:rect.height/2;
    if(a.showGuide){c.globalAlpha=a.guideOpacity;c.strokeStyle=a.guideColor;c.lineWidth=1;c.beginPath();c.arc(cx,cy,a.fov,0,Math.PI*2);c.stroke();}
    if(target&&(a.marker||a.showLink)){const x=target.x-rect.left,y=target.y-rect.top,r=a.markerSize;c.strokeStyle=a.markerColor;c.lineWidth=1.5;c.globalAlpha=a.markerOpacity;
      if(a.showLink){c.globalAlpha=a.markerOpacity*.4;c.beginPath();c.moveTo(cx,cy);c.lineTo(x,y);c.stroke();c.globalAlpha=a.markerOpacity;}
      if(a.marker){c.beginPath();if(a.markerStyle==='ring')c.arc(x,y,r,0,Math.PI*2);
        else if(a.markerStyle==='brackets'){for(const [sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){c.moveTo(x+sx*r,y+sy*r*.45);c.lineTo(x+sx*r,y+sy*r);c.lineTo(x+sx*r*.45,y+sy*r);}}
        else{c.arc(x,y,r*.55,0,Math.PI*2);c.moveTo(x-r,y);c.lineTo(x+r,y);c.moveTo(x,y-r);c.lineTo(x,y+r);}c.stroke();}
    }c.globalAlpha=1;
  }
  function disposeMenu(){clearTimeout(toastTimer);menuOpen=false;bindingKey=false;try{panelResizeObserver?.disconnect();}catch(_){}panelResizeObserver=null;menuHost?.remove();menuHost=null;menuRoot=null;guide?.remove();guide=null;}

  function typing(e){return e.isComposing||e.composedPath().some(o=>o?.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(o?.tagName||''));}
  function diagnostics(){
    return {version:VERSION,generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,
      attached,enabled,suspended,selected,phase,message,settings:portableSettings(),settingsSource:migrationSource,storageMessage,
      rendererDiscovery:{propertyMode:collectorPropertyMode,events:collectorEvents,targetsObserved:records.size,lastAttach:collectorLastAttach,currentCollectorMatches:collector===window.__THREE_DEVTOOLS__,bootInjectionAt:Math.round(bootInjectionAt),lateInjection:rendererBootWasMissed(),collectorCreatedHere,eventSamples:recoveryEventSamples.slice(),recovery:{active:recoveryActive,attempts:recoveryAttempts,roots:recoveryRoots.size,rootHits:recoveryRootHits,rendererHits:recoveryRendererHits,weakMapHits:recoveryWeakMapHits,rootHooks:recoveryRootHooks.length,weakMapInstalled:!!recoveryWeakMap}},
      callbackBridge:callbackDiagnostics(),
      downedFilter:downedDiagnostics(),
      activation:{armed:aimSessionArmed,selection:aimArmedSelection,latched:activationLatched,hold:config.aim.hold,behavior:config.aim.activation},
      aim:{...aimState,enabled:config.aim.enabled,pending:aimState.pending?{...aimState.pending}:null,
        target:aimState.target?{...aimState.target,observedAgeMs:Math.max(0,now()-(aimState.target.observedAt??aimState.target.time))}:null},
      fire:{...fireState,enabled:config.fire.enabled,target:fireState.target?{id:fireState.target.id,programId:fireState.target.programId,distance:fireState.target.distance,confidence:fireState.target.confidence,ageMs:Math.max(0,now()-(fireState.target.observedAt??fireState.target.time))}:null},
      renderers:[...records.values()].map(r=>({id:r.id,canvas:canvasInfo(r.canvas),hooks:{...r.hooks},lost:r.lost,failed:r.failed,
        drawSource:r.drawSource,bridgeReason:r.bridgeReason,methodDescriptors:r.methodDescriptors,
        rendererMethodCalls:r.methodCalls,objectCallbackCalls:r.objectCallbackCalls,sceneCallbackCalls:r.sceneCallbackCalls,observedProgramCount:r.programs.size,unsupportedGeometries:r.unsupportedGeometries.slice(),
        drawCallbacks:r.calls,replays:r.replays,composites:r.composites,skipped:r.skipped,maskUpdates:r.maskUpdates,
        staleComposites:r.staleComposites,lastCompositeAgeMs:r.lastCompositeAge,maxCompositeAgeMs:r.maxCompositeAge,
        mask:r.resources?{width:r.resources.w,height:r.resources.h,ready:r.resources.ready}:null,
        visibility:r.visibility?r.visibility.diagnostics():{mode:config.visibilityMode,phase:splitSessionArmed?'armed-not-created':'not-armed',error:r.visibilityError},splitSession:{armed:splitSessionArmed,armedAt:splitSessionAt,reason:splitSessionReason,fallbacks:r.splitFallbacks},
        candidates:[...r.programs.values()].filter(p=>p.candidate).map(p=>({id:p.id,viewmodelLike:p.viewmodelLike,draws:p.draws,replayed:p.replayed,
          alive:p.alive,failure:p.failure,failedUniform:p.failedUniform,retryPaused:p.retryPaused,uniformStats:{...p.uniformStats}}))})),
      errors:errors.slice(),limitations:[
        'Object-callback fallback requires writable instance onAfterRender callbacks in a discoverable live scene. Renderer identity alone is not capture success. Non-exposed/frozen callbacks are left untouched.',
        'Skinned candidates are not verified enemies. The downed-pose filter is heuristic; alive prone poses may be excluded. No verified health/team classification is available. Visual visibility is a per-pixel scene-depth comparison, not an aim visibility filter.',
        'On-fire alignment writes the same local camera rig; it is not silent aim or proof of server-accepted shots.',
        'Model masks do not reproduce custom fragment cutouts. Objects not submitted by the game cannot be recovered.',
        'Split highlights require compatible scene depth and the same render projection. Depth-only default buffers with opaque internal formats, custom fragment depth, portals/stencil and mixed projection passes can be unsupported. Unknown pixels use the chosen explicit fallback.',
        'Depth-writing surfaces define occlusion, not glass opacity or semantic line of sight. A cached render method can limit depth capture to batch end; visibility diagnostics record timing.',
        'Target-point offsets use world axes for bone anchors and local axes for geometry fallback.',
        'A dispatch count or camera write is not live-game aim verification.',
        "Automatic fire modes use untrusted browser mouse events and can be ignored by the game. Manual Redirect keeps the user's trusted LMB event and only aligns/restores the local camera rig around that event.",
        'Full-rate updates avoid intentional stale-mask reuse; lower FPS caps can trail motion.'
      ]};
  }
  function exportDiagnostics(){const out=diagnostics();downloadJSON(out,'destiny_v540_diagnostic.json');return out;}
  listen(window,'resize',()=>{clampPanel();drawAimGuide();});


  let autoScanTimer=0;
  function autoScanReady(){
    if(suspended||attached||!config.autoScan)return false;
    if(document.readyState!=='complete'||errorScreenPresent())return false;
    for(const rec of records.values())if(visibleGameCanvas(rec.canvas))return true;
    return false;
  }
  function runAutoScan(){
    if(!autoScanReady())return;
    try{ if(start('auto-scan')) auto(); }catch(e){error('auto-scan',e);}
  }
  autoScanTimer=setInterval(runAutoScan,700);

  define(window,'__DestinyV5Control',{configurable:true,value:Object.freeze({version:VERSION,
    settings:(patch)=>patch===undefined?{...config,aim:{...config.aim},fire:{...config.fire}}:settings(patch),menu:toggleMenu,
    previous:()=>cycle(-1),next:()=>cycle(1),auto,pause:off,select:chooseID,
    applyAimPreset,applyQuality,applyHighlightPreset,armSplitSession,disarmSplitSession,exportSettings,importSettings,parseSettings,profiles:loadProfiles,saveProfile,loadProfile:restoreProfile,deleteProfile,
    diagnostics,exportDiagnostics,dispose:disarm})});
  let lastArrowAt=-Infinity;
  listen(window,'keydown',e=>{
    if(bindingKey&&menuOpen){
      if(e.repeat)return;e.preventDefault();e.stopImmediatePropagation();
      if(e.key==='Escape'){bindingKey=false;notify('Key binding cancelled.');}
      else if(/^(Key[A-Z]|Digit[0-9]|AltLeft|AltRight|ShiftLeft|ShiftRight)$/.test(e.code)){bindingKey=false;settings({aim:{hold:e.code}});notify('Activation key: '+e.code);}
      else{notify('Choose a letter, digit, Alt or Shift; Escape cancels.');return;}
      menuRoot.getElementById('bind-button').textContent='Bind a keyboard key';return;
    }
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    if((e.key==='Insert'||e.key==='F6')&&(menuOpen||!typing(e))){if(!suspended){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)toggleMenu();}return;}
    if(e.key==='F9'&&!typing(e)&&!suspended){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)exportDiagnostics();return;}
    if(menuOpen&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();toggleMenu(false);return;}
    if(suspended||typing(e)||isMenuEvent(e))return;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
    e.preventDefault();e.stopImmediatePropagation();
    if(e.repeat&&(!['ArrowLeft','ArrowRight'].includes(e.key)||now()-lastArrowAt<180))return;
    if(['ArrowLeft','ArrowRight'].includes(e.key))lastArrowAt=now();
    try{if(e.key==='ArrowLeft')cycle(-1);else if(e.key==='ArrowRight')cycle(1);else if(e.key==='ArrowUp')auto();else off();}catch(err){error('controls',err);}
  },true);


})();
