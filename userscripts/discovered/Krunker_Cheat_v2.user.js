// ==UserScript==
// @name        Krunker Cheat v2
// @name:en     Krunker Cheat v2
// @description:en  A lot of features for Krunker.io - Aimbot, ESP, Wallhack and more!
// @namespace    http://tampermonkey.net/
// @version      2.0
// @author       xenona
// @match        *://krunker.io/*
// @match        *://browserfps.com/*
// @exclude      *://krunker.io/social*
// @exclude      *://krunker.io/editor*
// @icon         https://krunkergame.com/wp-content/uploads/thumbs/custom/K/krunker.webp
// @run-at       document-start
// @require      https://unpkg.com/three@0.150.0/build/three.min.js
// @grant        unsafeWindow
// @grant        GM_info
// @description Aimbot, ESP, Recoil Comp, ESP Lines, and Hardcore Mode. Original script by wi1lliott8411; also marked under "downloadURL"
// @downloadURL https://update.greasyfork.org/scripts/551530/Krunker%20Cheat%20v2.user.js
// @updateURL https://update.greasyfork.org/scripts/551530/Krunker%20Cheat%20v2.meta.js
// ==/UserScript==


const latestVersion = '2.0';
if (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version !== latestVersion) {
    alert('⚠️ Your script is outdated!\n\nPlease update to the latest version from https://greasyfork.org/en/scripts/551530-krunker-cheat-v2');
}

const THREE = window.THREE;
delete window.THREE;

const CheatSettings = {
	aimbotEnabled: false,
	espEnabled: false,
	wireframe: false
};

const keyToSetting = {
	KeyV: 'aimbotEnabled',
	KeyN: 'espEnabled',
	KeyL: 'wireframe'
};

let scene;

const x = {
	window: window,
	document: document,
	querySelector: document.querySelector,
	consoleLog: console.log,
	ReflectApply: Reflect.apply,
	ArrayPrototype: Array.prototype,
	ArrayPush: Array.prototype.push,
	ObjectPrototype: Object.prototype,
	clearInterval: window.clearInterval,
	setTimeout: window.setTimeout,
	reToString: RegExp.prototype.toString,
	indexOf: String.prototype.indexOf,
	requestAnimationFrame: window.requestAnimationFrame
};

x.consoleLog( 'Waiting for access...' );

const proxied = function ( object ) {

	try {

		if ( typeof object === 'object' &&
			typeof object.parent === 'object' &&
			object.parent.type === 'Scene' &&
			object.parent.name === 'Main' ) {

			x.consoleLog( 'Found Scene!' )
			scene = object.parent;
			x.ArrayPrototype.push = x.ArrayPush;

		}

	} catch ( error ) {}

	return x.ArrayPush.apply( this, arguments );

}

const gui = createGUI();

const tempVector = new THREE.Vector3();

const tempObject = new THREE.Object3D();
tempObject.rotation.order = 'YXZ';

const geometry = new THREE.EdgesGeometry( new THREE.BoxGeometry( 5, 15, 5 ).translate( 0, 7.5, 0 ) );

const material = new THREE.RawShaderMaterial( {
	vertexShader: `

	attribute vec3 position;

	uniform mat4 projectionMatrix;
	uniform mat4 modelViewMatrix;

	void main() {

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		gl_Position.z = 1.0;

	}

	`,
	fragmentShader: `

	void main() {

		gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

	}

	`
} );

const line = new THREE.LineSegments( new THREE.BufferGeometry(), material );

line.frustumCulled = false;

const linePositions = new THREE.BufferAttribute( new Float32Array( 100 * 2 * 3 ), 3 );
line.geometry.setAttribute( 'position', linePositions );

let injectTimer = null;

function animate() {

	x.requestAnimationFrame.call( x.window, animate );

	if ( ! scene && ! injectTimer ) {

		const el = x.querySelector.call( x.document, '#loadingBg' );

		if ( el && el.style.display === 'none' ) {

			x.consoleLog( 'Inject timer started!' );

			injectTimer = x.setTimeout.call( x.window, () => {

				x.consoleLog( 'Injected!' );
				x.ArrayPrototype.push = proxied;

			}, 2e3 );

		}

	}


	const players = [];

	let myPlayer;

    if (!scene) return;

	for ( let i = 0; i < scene.children.length; i ++ ) {

		const child = scene.children[ i ];

		if ( child.type === 'Object3D' ) {

			try {

				if ( child.children[ 0 ].children[ 0 ].type === 'PerspectiveCamera' ) {

					myPlayer = child;

				} else {

					players.push( child );

				}

			} catch ( err ) {}

		} else if ( child.material ) {

			child.material.wireframe = CheatSettings.wireframe;

		}

	}

	if ( ! myPlayer ) {

		x.consoleLog( 'Player not found, finding new scene.' );
		x.ArrayPrototype.push = proxied;
		return;

	}

	let counter = 0;

	let targetPlayer;
	let minDistance = Infinity;

	tempObject.matrix.copy( myPlayer.matrix ).invert();

	for ( let i = 0; i < players.length; i ++ ) {

		const player = players[ i ];

		if ( ! player.box ) {

			const box = new THREE.LineSegments( geometry, material );
			box.frustumCulled = false;

			player.add( box );

			player.box = box;

		}

		if ( player.position.x === myPlayer.position.x && player.position.z === myPlayer.position.z ) {

			player.box.visible = false;

			continue;

		}

		player.visible = CheatSettings.espEnabled || player.visible;
		player.box.visible = CheatSettings.espEnabled;

		const distance = player.position.distanceTo( myPlayer.position );

		if ( distance < minDistance ) {

			targetPlayer = player;
			minDistance = distance;

		}

	}

	if ( CheatSettings.aimbotEnabled === false || targetPlayer === undefined ) {

		return;


	}

	tempVector.setScalar( 0 );

	if (targetPlayer?.children?.[0]?.children?.[0]) {
    targetPlayer.children[0].children[0].localToWorld(tempVector);
} else {
    return;
}


	if (!myPlayer || !myPlayer.position) return;
    tempObject.position.copy(myPlayer.position);

	tempObject.lookAt( tempVector );

	if (myPlayer.children?.[0]?.rotation) {
    myPlayer.children[0].rotation.x = -tempObject.rotation.x;
    myPlayer.rotation.y = tempObject.rotation.y + Math.PI;
}

}

const el = document.createElement( 'div' );

el.innerHTML = `<style>
:root {
    --neon-color: #00ffff;
    --on-color: #00ffff;
    --off-color: #ff4757;
    --bg-dark: rgba(18, 18, 18, 0.9);
    --bg-item: rgba(0, 0, 0, 0.4);
}

.msg {
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #fff;
    background: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
    animation: msg-in 0.3s forwards cubic-bezier(0.25, 0.8, 0.25, 1),
               msg-out 0.3s forwards 3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 999999;
    pointer-events: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

@keyframes msg-in {
    from { transform: translateX(-120%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes msg-out {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-120%); opacity: 0; }
}

.zui {
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: #fff;
    width: 280px;
    user-select: none;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-dark);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.zui-header {
    background: rgba(30, 30, 30, 0.95);
    padding: 12px;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
    position: relative;
    color: #ffffff;
    border-bottom: 2px solid var(--neon-color);
}

.zui-header span {
    color: #ffffff;
}

.zui-item {
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-item);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
    color: #fff;
}

.zui-item:last-child {
    border-bottom: none;
}

.zui-item:hover {
    background: rgba(0, 255, 255, 0.15);
    color: var(--neon-color);
}

.zui-item.text {
    justify-content: center;
    cursor: unset;
    text-align: center;
    background: none;
    border-bottom: none;
    padding: 8px 15px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.zui-item-value {
    font-weight: bold;
    transition: color 0.2s;
}

.zui-content {
    color: #fff;
    display: block;
}
</style>`

const msgEl = el.querySelector( '.msg' );
const dialogEl = el.querySelector( '.dialog' );

window.addEventListener( 'DOMContentLoaded', function () {

	while ( el.children.length > 0 ) {

		document.body.appendChild( el.children[ 0 ] );

	}

	document.body.appendChild( gui );

} );


window.addEventListener( 'keyup', function ( event ) {

	if ( x.document.activeElement && x.document.activeElement.value !== undefined ) return;

	if ( keyToSetting[ event.code ] ) {

		toggleSetting( keyToSetting[ event.code ] );

	}

	switch ( event.code ) {

		case 'Slash' :
			toggleElementVisibility( gui );
			break;

		case 'KeyH' :
			toggleElementVisibility( dialogEl );
			break;

	}

} );

function toggleElementVisibility( el ) {

	el.style.display = el.style.display === '' ? 'none' : '';

}

function showMsg( name, bool ) {

	msgEl.innerText = name + ': ' + ( bool ? 'ON' : 'OFF' );

	msgEl.style.display = 'none';
	void msgEl.offsetWidth;
	msgEl.style.display = '';

}

animate();

function createGUI() {

	const guiEl = fromHtml( `<div class="zui">
		<div class="zui-header">
			<span>Krunker Cheat v2</span>
		</div>
		<div class="zui-content"></div>
	</div>` );

	const contentEl = guiEl.querySelector( '.zui-content' );

	const settingToKey = {};
	for ( const key in keyToSetting ) {

		settingToKey[ keyToSetting[ key ] ] = key;

	}

	for ( const prop in CheatSettings ) {

		let name = fromCamel( prop );
		let shortKey = settingToKey[ prop ];

		if ( shortKey ) {

			if ( shortKey.startsWith( 'Key' ) ) shortKey = shortKey.slice( 3 );
			name = `[${shortKey}] ${name}`;

		}

		const itemEl = fromHtml( `<div class="zui-item">
			<span>${name}</span>
			<span class="zui-item-value"></span>
		</div>` );
		const valueEl = itemEl.querySelector( '.zui-item-value' );

		function updateValueEl() {

			const value = CheatSettings[ prop ];
			valueEl.innerText = value ? 'ON' : 'OFF';
			valueEl.style.color = value ? 'var(--on-color)' : 'var(--off-color)';

		}
		itemEl.onclick = function() {

			CheatSettings[ prop ] = ! CheatSettings[ prop ];

		}
		updateValueEl();

		contentEl.appendChild( itemEl );

		const p = `__${prop}`;
		CheatSettings[ p ] = CheatSettings[ prop ];
		Object.defineProperty( CheatSettings, prop, {
			get() {

				return this[ p ];

			},
			set( value ) {

				this[ p ] = value;
				updateValueEl();

			}
		} );

	}

	contentEl.appendChild( fromHtml( `<div class="zui-item text">
		<span>Created by xenona</span>
	</div>` ) );

	return guiEl;

}

function fromCamel( text ) {

	const result = text.replace( /([A-Z])/g, ' $1' );
	return result.charAt( 0 ).toUpperCase() + result.slice( 1 );

}

function fromHtml( html ) {

	const div = document.createElement( 'div' );
	div.innerHTML = html;
	return div.children[ 0 ];

}

function toggleSetting( key ) {

	CheatSettings[ key ] = ! CheatSettings[ key ];
	showMsg( fromCamel( key ), CheatSettings[ key ] );

}