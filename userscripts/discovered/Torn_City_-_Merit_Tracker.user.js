// ==UserScript==
// @name         Torn City - Merit Tracker
// @namespace    Merit Tracker
// @version      2.4
// @description  See your easiest missing honors first, learn how to get them, browse by category
// @author       _Solenya_ [4053619]
// @match        https://www.torn.com/*
// @grant        none
// License       MIT
// @downloadURL https://update.greasyfork.org/scripts/579300/Torn%20City%20-%20Merit%20Tracker.user.js
// @updateURL https://update.greasyfork.org/scripts/579300/Torn%20City%20-%20Merit%20Tracker.meta.js
// ==/UserScript==

(function () {
  'use strict';
  const VERSION = '2.0';
  const GF_URL  = 'https://greasyfork.org/en/scripts/579300-torn-city-merit-tracker';
  const GF_API  = 'https://greasyfork.org/scripts/579300.json';

  const DIFF_META = {
    1: { label: 'Instant',     color: '#f87171', bg: '#2d0a0a', desc: 'Do it right now with little or no cost' },
    2: { label: 'Easy',        color: '#fb923c', bg: '#2d1500', desc: 'Might need a friend or quick coordination to get it quickly' },
    3: { label: 'Costs Money', color: '#facc15', bg: '#292100', desc: 'Can do it now but requires spending' },
    4: { label: 'Grind',       color: '#60a5fa', bg: '#0a1628', desc: 'Simple but needs time or repetition' },
    5: { label: 'Complex',     color: '#c084fc', bg: '#1a0a28', desc: 'Multi-step, RNG-heavy, or tricky' },
    6: { label: 'Unknown',     color: '#4b5563', bg: '#111827', desc: 'No guide yet — check Torn forums' },
  };

  const DB = {
    // ═══════════════ INSTANT (Red) ═══════════════
    838:  { d:1, g:"Defeat two players who are married to each other (in any order). The well-known pair monkey_D and Left4Dead12 are a reliable target — defeat one, then the other." },
    367:  { d:1, g:"Buy Ipecac Syrup from the City (~$80k) and use it from your inventory — it instantly hospitalizes you. Alternatively, use a blood bag of the wrong type (requires Intravenous Therapy education course)." },
    902:  { d:1, g:"Attack pops333 using ONLY your fists so you lose — he beats you with a trout. Unequip all weapons first or use fists only. You want to lose this fight deliberately." },
    230:  { d:1, g:"Defeat any player who currently has the Domino Effect honor equipped on their profile. L3Milk is a well-known low-stat player who displays it and is an easy kill." },
    639:  { d:1, g:"Join an attack as an assist — you must NOT deliver the killing blow. Best method: during Loot Rangers NPC events, join the attack. Or have a friend start an attack on a target and you click Assist without finishing them." },
    254:  { d:1, g:"Kill any player from full health in a single attack (one-hit-kill). Target low-level inactive players who have 100% life. Just keep attacking them until it procs." },
    12:   { d:1, g:"Make any deposit in the City Bank. Even $1 for 1 week counts. Go to City → Bank and put any amount in for any duration." },
    371:  { d:1, g:"Complete the intro mission 'Introduction: Duke'. This is given automatically to new players. Check your Missions tab — it's essentially free XP." },
    39:   { d:1, g:"Win any 5 attacks. Attack low-level inactive players to get this fast." },
    40:   { d:1, g:"Win 20 attacks. Keep attacking low-level inactives." },
    41:   { d:1, g:"Win 50 attacks total." },
    42:   { d:1, g:"Win 100 attacks total." },
    43:   { d:1, g:"Win 250 attacks total." },
    18:   { d:1, g:"Reach level 10. Just keep playing — this comes naturally." },
    20:   { d:1, g:"Achieve 25 critical hits. These accumulate naturally as you attack anyone." },
    253:  { d:1, g:"Participate in a faction chain of at least 10 hits. Just join during any chain your faction runs." },
    255:  { d:1, g:"Participate in a faction chain of at least 100 hits. Join during a planned chain event." },
    687:  { d:1, g:"Reach 100 total battle stats combined (Str+Spd+Dex+Def). Happens naturally after a few gym sessions." },
    720:  { d:1, g:"Reach 1,000 total battle stats. A few days of regular gym training." },
    686:  { d:1, g:"Reach 10,000 total battle stats. Regular gym use over a couple of weeks." },
    520:  { d:1, g:"Donate a cumulative $100,000 to the Church (City → Church → Donate). Donations stack over time, doesn't need to be all at once." },
    521:  { d:1, g:"Donate a cumulative $1,000,000 to the Church (City → Church → Donate). Stacks over time." },
    1326: { d:1, g:"Go to Crimes → Search for Cash → Beach. Search repeatedly — you'll randomly dig up sand. Doesn't take long." },
    1349: { d:1, g:"Go to Crimes → Burglary, click the area dropdown (shows 'Any Residential' etc.) and pick a specific target like 'Beach Hut', then click Locate. Done — costs 9 nerve." },
    665:  { d:1, g:"Participate in defeating a lootable NPC (Duke, Jimmy, Leslie). Check yata.yt for the Loot Rangers schedule and just hit the NPC at least once — you don't need top damage." },
    288:  { d:1, g:"Reset your merits from the Merits page. The first reset may be free; after that it costs 500 points (~$19M). This wipes your current merit allocations — plan accordingly." },
    606:  { d:1, g:"Achieve 100 total awards (honors + medals combined). Just keep playing and collecting awards naturally." },
    653:  { d:4, g:"Complete 10 education courses total. Each course takes anywhere from 3 days to over a month — just keep one queued at all times in the Education section." },
    659:  { d:4, g:"Complete 25 education courses total. Courses range from 3 days to 30+ days each. Keep one queued constantly and this comes naturally over time." },
    845:  { d:1, g:"Go to Newspaper → Chronicles, open any chronicle, and stay on the page for about 15 minutes without closing or navigating away." },
    1014: { d:4, g:"Achieve skill level 100 in Crimes → Search for Cash. Requires hundreds of attempts over many days. Do it passively as a daily crime alongside other activities." },

    // ═══════════════ WEAPONS & FINISHING HITS ═══════════════
    140:  { d:4, g:"Fire 1,000 rounds total. Equip a minigun for fastest accumulation." },
    141:  { d:4, g:"Achieve 100 finishing hits with heavy artillery (RPG, M72 LAW, etc.). Set attack preference to 100% primary, equip heavy artillery, attack low-level inactives." },
    142:  { d:4, g:"Achieve 100 finishing hits with clubbing weapons (baseball bat, nunchaku). Set preference to 100% melee, equip clubbing weapon, attack inactives." },
    143:  { d:4, g:"Achieve 100 finishing hits with temporary weapons (grenades, HEG). Set preference to 100% temporary and use on inactives — these are one-use items." },
    144:  { d:4, g:"Achieve 100 finishing hits with machine guns (Para, Minigun). Set preference to 100% primary, equip machine gun, attack inactives." },
    145:  { d:4, g:"Achieve 100 finishing hits with pistols. Set preference to 100% secondary, equip pistol (QSZ-92, Desert Eagle), attack low-level inactives." },
    146:  { d:4, g:"Achieve 100 finishing hits with rifles (Armalite, SA80). Set preference to 100% primary, equip rifle, attack inactives." },
    147:  { d:4, g:"Achieve 100 finishing hits with shotguns. Jackhammer works well. Set preference to 100% primary, equip shotgun, attack inactives." },
    148:  { d:4, g:"Achieve 100 finishing hits with SMGs (BT MP9, Uzi). Set preference to 100% primary, equip SMG, attack inactives." },
    149:  { d:4, g:"Achieve 100 finishing hits with piercing weapons (daggers, spears). Always keep a dagger equipped — accumulates passively over time." },
    150:  { d:4, g:"Achieve 100 finishing hits with slashing weapons (swords, kodachi). Equip a slashing weapon and attack low-level inactives." },
    151:  { d:4, g:"Fire 10,000 rounds total. Use a minigun — comes naturally with regular attacking over time." },
    515:  { d:4, g:"Achieve 100 finishing hits with fists or Kick. Fists are always available — use them for the killing blow on low-threat targets. Kick requires completing Introduction to Self-Defense + Kick-boxing education." },
    740:  { d:5, g:"Deal at least 5,000 damage in a single hit. Requires high Strength, LSD (+35% stats), Hollow Point ammo, high-damage weapon with max merits, and a fully unarmored target." },
    741:  { d:5, g:"Deal at least 10,000 damage in one hit. Stack LSD + Epinephrine + Hollow Point ammo + max weapon merits against a completely unarmored low-defense target." },
    786:  { d:5, g:"Deal at least 15,000 damage in one hit. Everything from Obliteration but even harder — requires very high Strength and near-perfect conditions." },
    834:  { d:4, g:"Fire 100,000 rounds total. Long-term grind — use a minigun. Takes many months of regular attacking." },
    836:  { d:5, g:"Fire 1,000,000 rounds total. Extremely long-term — years of regular heavy attacking with a minigun or egg launcher." },
    793:  { d:3, g:"Use 1,000 rounds of special ammo total. Buy from the Mission credit shop (cheapest source). All types of special ammo count cumulatively." },
    791:  { d:3, g:"Use 10,000 rounds of special ammo total. Keep buying mission ammo and using it in attacks — long-term grind." },
    851:  { d:3, g:"Own at least 20 weapon mods simultaneously. Buy from item market — Tier 1 mods are cheap, Tier 3-4 are very expensive. Budget $5M-20M+ depending on tiers." },
    491:  { d:3, g:"Equip two Tier 3 or Tier 4 weapon mods on a single weapon simultaneously. High-tier mods are rare and expensive on the item market." },
    942:  { d:4, g:"Use 2,500 Hollow Point rounds total. Buy from the Mission credit shop — budget your credits since Hollow Points are the most popular ammo type." },
    943:  { d:4, g:"Use 2,500 Piercing rounds total. Buy from the Mission credit shop." },
    944:  { d:4, g:"Use 2,500 Incendiary rounds total. Buy from the Mission credit shop." },
    945:  { d:4, g:"Use 2,500 Tracer rounds total. Buy from the Mission credit shop." },
    951:  { d:5, g:"Use a 12 Gauge Incendiary round in an attack. These only spawn as mission rewards when you have a shotgun equipped as primary or secondary. Equip a shotgun and keep doing missions — completely RNG." },
    778:  { d:5, g:"Achieve 100% weapon experience on 25 different weapons. Requires enormous amounts of attacking across many weapon types — very long-term goal." },

    // ═══════════════ ATTACKING ═══════════════
    228:  { d:4, g:"Achieve 1,000 attacks AND 1,000 defends. Attacks come from regular play. Defends happen when others attack you and lose — buy losses from the Attack forum (~$250k each) to speed it up." },
    232:  { d:4, g:"Collect 250 bounties total. Hunt the bounty board regularly, or ask friends to place $50 bounties on your mission targets so you can claim them after." },
    236:  { d:3, g:"Earn $10,000,000 total from bounty hunting. Ask a friend to bounty a third player for $10M (costs ~$5M in fees), then attack and collect. Or hunt real bounties slowly over time." },
    270:  { d:4, g:"Stalemate 100 times total. A stalemate happens after 25 turns with no winner. Equip a Pillow and attack a similarly-weak target — just hit 25 turns and neither of you should die." },
    414:  { d:4, g:"Achieve 3 consecutive headshots in a single attack. Headshots are random — comes naturally with heavy regular play." },
    490:  { d:4, g:"Assist in 250 attacks total. Join NPC attacks (Loot Rangers events) or assist faction members during wars. You must NOT deliver the killing blow." },
    517:  { d:4, g:"Achieve 100 one-hit kills total. Attack low-level inactive players repeatedly — every kill from full health in one hit counts. Comes naturally with decent stats over time." },
    601:  { d:4, g:"Achieve 10,000 total hits (individual attack rounds). Very long-term — comes from years of heavy attacking." },
    608:  { d:5, g:"Deal exactly 1,337 damage in a single hit. Completely random — no way to force it. Just keep attacking with a mid-damage weapon and it will eventually occur." },
    763:  { d:4, g:"Win 250 fights without any armor equipped. Remove all armor from your equipped items — you can still use weapons. You'll temporarily get the title 'Nudist'." },
    843:  { d:2, g:"On May 4th, defeat someone using ONLY fists (unequip all weapons). Attack a low-stat inactive and win. Only works on May 4th each year." },
    863:  { d:4, g:"Defeat someone you just revived. Revive a player from hospital, then immediately attack and beat them. Coordinate with a willing player who agrees to lose." },
    870:  { d:4, g:"Revive someone you just defeated. After winning an attack and hospitalizing someone, immediately use a revive on them. Requires revive capability (education)." },
    846:  { d:4, g:"Defeat 100 players while physically abroad (at a destination, not in transit). Stack energy before flying, then attack inactives at your destination country." },
    916:  { d:5, g:"Save a chain of 100+ hits by attacking within the last 10 seconds before the timer expires. Requires your faction to deliberately let the chain timer run near-zero — risks the entire chain. Only feasible with full faction coordination." },
    1001: { d:4, g:"Deal over 10,000,000 total damage across all attacks. Can be rushed by attacking NPCs (Duke, Leslie, Jimmy) at loot events." },
    1002: { d:4, g:"Deal over 1,000,000 total damage. Should come within weeks or months of active attacking." },
    1003: { d:5, g:"Deal over 100,000,000 total damage. Very long-term — requires sustained heavy attacking over many months." },
    1004: { d:1, g:"Deal over 100,000 total damage. Should trigger within a few days of active attacking for most players." },

    // ═══════════════ GYM ═══════════════
    234:  { d:4, g:"Own all middleweight gym memberships. Join a 3 stars music store to gain gym exp quickly." },
    235:  { d:4, g:"Own all heavyweight gym memberships. Join a 3 stars music store to gain gym exp quickly." },
    240:  { d:4, g:"Gain 1,000,000 Defense. Train Defense daily at the gym. Takes consistent training over months." },
    241:  { d:4, g:"Gain 1,000,000 Dexterity. Train Dexterity daily." },
    242:  { d:4, g:"Gain 1,000,000 Speed. Train Speed daily." },
    243:  { d:4, g:"Gain 1,000,000 Strength. Train Strength daily." },
    497:  { d:4, g:"Gain 10,000,000 Defense. Long-term gym training — gym memberships and a director who trains you significantly accelerate this." },
    498:  { d:4, g:"Gain 1,000,000,000 Defense. Very long-term — requires years of consistent training." },
    505:  { d:4, g:"Gain 10,000,000 Speed. Long-term gym training." },
    506:  { d:4, g:"Gain 100,000,000 Speed. Long-term gym training." },
    550:  { d:4, g:"Gain 1,000,000,000 Speed. Extremely long-term goal." },
    629:  { d:4, g:"Gain 100,000,000 Dexterity. Long-term gym training." },
    635:  { d:4, g:"Gain 10,000,000 Dexterity. Long-term gym training." },
    638:  { d:4, g:"Gain 1,000,000,000 Dexterity. Very long-term goal." },
    640:  { d:4, g:"Gain 100,000,000 Defense. Long-term gym training." },
    643:  { d:4, g:"Gain 10,000,000 Strength. Long-term gym training." },
    646:  { d:4, g:"Gain 100,000,000 Strength. Long-term gym training." },
    647:  { d:4, g:"Gain 1,000,000,000 Strength. Very long-term goal." },
    679:  { d:4, g:"Attain 100,000,000 total stats. Long-term consistent training across all four stats." },
    694:  { d:4, g:"Attain 1,000,000 total stats. Several weeks to months of consistent gym training." },
    708:  { d:4, g:"Attain 10,000,000 total stats. Months of dedicated gym training." },
    721:  { d:4, g:"Attain 1,000,000,000 total stats. Very long-term — requires years of training." },
    723:  { d:4, g:"Attain 100,000 total stats. A few weeks of consistent training." },
    690:  { d:4, g:"Attain 10,000,000,000 total stats. Reserved for veteran players — extremely long-term." },
    704:  { d:4, g:"Attain 100,000,000,000 total stats. One of the rarest gym milestones in the game." },
    888:  { d:5, g:"Have the numbers 69 and 420 appear 5 times total across your four battle stats (at least one of each). Example: Str=420,123 / Spd=52,069 / Dex=345,420 / Def=42,069. Use a Torn stat calculator to track — requires precise stat management near each milestone." },

    // ═══════════════ WORKING STATS ═══════════════
    525:  { d:4, g:"Attain 100,000 Endurance. Work at a company with Endurance training and ask your director to train you. Takes many months of daily training." },
    530:  { d:4, g:"Attain 100,000 Intelligence. Same approach as Tireless but for Intelligence stat." },
    533:  { d:4, g:"Attain 100,000 Manual Labor. Requires a company that offers Manual Labor training." },

    // ═══════════════ EDUCATION DEGREES ═══════════════
    53:   { d:4, g:"Complete all courses in the Biology degree. Focus your education queue on Biology. Each Bachelor takes ~200 days with education reduction merits." },
    54:   { d:4, g:"Complete all courses in the Business degree. Queue Business courses and keep one running at all times." },
    55:   { d:4, g:"Complete all courses in the Combat degree." },
    56:   { d:4, g:"Complete all courses in the ICT degree. Also unlocks the online Bootlegging store as a side benefit." },
    57:   { d:4, g:"Complete all courses in the Defense degree." },
    58:   { d:4, g:"Complete all courses in General Studies." },
    59:   { d:4, g:"Complete all courses in Health & Fitness." },
    60:   { d:4, g:"Complete all courses in History." },
    61:   { d:4, g:"Complete all courses in Law. Strongly recommended — gives +50% jail bust success." },
    62:   { d:4, g:"Complete all courses in Mathematics." },
    63:   { d:4, g:"Complete all courses in Psychology. Gives +10% crime success — very valuable." },
    64:   { d:4, g:"Complete all courses in Sports Science." },

    // ═══════════════ DRUGS ═══════════════
    30:   { d:4, g:"Use 50 Ecstasy total. Gives a happiness boost. Buy from item market. ~24-hour drug cooldown." },
    31:   { d:4, g:"Use 50 Ketamine total. Reduces enemy stats in combat. Buy from item market. Drug cooldown applies." },
    32:   { d:4, g:"Use 50 LSD total. Gives +35% to all battle stats — very useful before important fights. Buy from item market." },
    33:   { d:4, g:"Use 50 Opium total. Gives energy and nerve boost. Buy from item market. Drug cooldown applies." },
    34:   { d:4, g:"Use 50 Shrooms total. Gives a happiness boost. Buy from item market." },
    35:   { d:4, g:"Use 50 Speed total. Gives +35% to Speed stat. Drug cooldown applies." },
    36:   { d:4, g:"Use 50 PCP total. Gives a stat boost. Drug cooldown applies." },
    37:   { d:4, g:"Use 50 Xanax total. Gives +250 energy — use before big chains or attacks. Already the most useful drug in the game. Buy from item market or faction stock." },
    38:   { d:4, g:"Use 50 Vicodin total. Restores life points. Buy from item market. Drug cooldown applies." },

    // ═══════════════ HUNTING ═══════════════
    50:   { d:4, g:"Achieve 50 Hunting skill. World Tiger Day (August 29th) gives 500% bonus hunting XP — stack 1,000 energy and hunt all day on that date. Hunting any other time wastes energy." },
    51:   { d:4, g:"Achieve 75 Hunting skill. Same approach as Zebra Skin — maximize World Tiger Day trips each year." },
    52:   { d:5, g:"Achieve 100 Hunting skill (maximum). Requires multiple World Tiger Day events worth of grinding." },

    // ═══════════════ TRAVEL DESTINATIONS ═══════════════
    130:  { d:4, g:"Travel to Argentina 50 times. Combine with importing items each trip for efficiency. Use a Large Suitcase." },
    131:  { d:4, g:"Travel to Mexico 50 times. Short flight — one of the easier destination honors. Always import items." },
    132:  { d:4, g:"Travel to UAE 50 times. Longest flight — only prioritize if combining with heavy item importing as it drains energy fast." },
    133:  { d:4, g:"Travel to Hawaii 50 times. Medium flight. Always bring a suitcase for imports." },
    134:  { d:4, g:"Travel to Japan 50 times. Long flight — only worth it if combining with item importing." },
    135:  { d:4, g:"Travel to UK 50 times. Medium flight. Combine with imports." },
    136:  { d:4, g:"Travel to South Africa 50 times. Long flight — combine with heavy importing." },
    137:  { d:4, g:"Travel to Switzerland 50 times. Medium flight. Combine with imports." },
    138:  { d:4, g:"Travel to China 50 times. Long flight — combine with heavy importing." },
    139:  { d:4, g:"Travel to Canada 50 times. Short flight — one of the easier travel honors." },
    272:  { d:4, g:"Travel to Cayman Islands 50 times. Short flight — combine with item imports each trip." },
    543:  { d:4, g:"Import 10,000 items from abroad total. Very long-term — always use a Large Suitcase on every flight. Stacks across all trips." },
    567:  { d:4, g:"Spend 31 cumulative days in the air (flight time only — time spent at destination doesn't count)." },
    557:  { d:4, g:"Spend 365 cumulative days in the air. Extremely long-term — achievable only after years of heavy traveling." },
    853:  { d:3, g:"Purchase the 'perfect souvenir' abroad. Which item depends on the last 2 digits of your Torn ID — check the Torn forum souvenir guide for your specific item, then travel to that country and buy it." },

    // ═══════════════ CASINO ═══════════════
    269:  { d:4, g:"Spin the roulette wheel 1,000 times. At ~75 spins per day it takes about 14 days. Open multiple tabs to speed it up." },
    327:  { d:4, g:"Win 50 games of Russian Roulette in the Casino. Play at minimum bet ($1) — you win roughly 1 in 6 games, so expect ~300 games total." },
    275:  { d:5, g:"Win the jackpot on the slot machine. Pure RNG — no known strategy to increase odds. Just keep playing slots over time." },
    276:  { d:5, g:"Win one of the Torn City lotteries. Buy tickets regularly from the City and wait." },

    // ═══════════════ MONEY ═══════════════
    3:    { d:3, g:"Invest $100,000,000 in the stock market. Buy any stock totaling $100M+ and hold or sell for profit." },
    8:    { d:4, g:"Achieve a high credit score with Duke (City → Duke → Loan). Take a loan and pay it back when requested. A $160k loan works — somewhat random and may take a few months." },
    9:    { d:3, g:"Own a Private Island with an Airstrip upgrade. You need to own it, not rent it. You can ask a rich friend to give you one, own it for two mintues and then give it back." },
    10:   { d:3, g:"Make a $1,000,000,000 city bank investment. Save up $1B and deposit it for any duration (minimum 1 week)." },
    544:  { d:3, g:"Make a $10,000,000 profit in a single stock market sale. Invest in a stock and wait until you're up $10M, then sell. More invested = faster." },
    548:  { d:3, g:"Make a $100,000,000 profit in a single stock sale. Requires large stock holdings or significant patience." },
    545:  { d:5, g:"Make a $1,000,000,000 profit in a single stock sale. Requires enormous investment — end-game wealth goal." },
    546:  { d:4, g:"Receive 100 stock payouts. Dividends are paid weekly (Tuesdays). Hold any dividend-paying stock for ~2 years." },
    523:  { d:3, g:"Donate $100,000,000 cumulative to the Church (City → Church → Donate). Stacks over time — doesn't need to be all at once." },
    522:  { d:5, g:"Donate $1,000,000,000 cumulative to the Church. Enormous total cost — very long-term." },
    273:  { d:3, g:"Win 10 auctions. Bid a fixed amount (e.g. $250k) on many cheap auctions until 10 are won. Sell the items back to break even." },
    258:  { d:3, g:"Own a yacht. Buy a property with a Yacht upgrade, or ask a friend who has one to loan/lease it for 2 minutes to trigger the honor." },
    869:  { d:5, g:"Own every stock benefit AND dividend simultaneously. Requires massive investment across all available stocks at once — extreme end-game goal." },
    1005: { d:4, g:"Achieve $1,000,000,000 in cumulative stock market profits. Long-term investing milestone." },
    1006: { d:4, g:"Achieve $1,000,000,000 in cumulative stock market losses. Comes from aggressive trading over time." },
    1007: { d:3, g:"Lose $100,000,000 in a single stock sale. Invest in a stock and deliberately sell at a $100M loss." },

    // ═══════════════ HOSPITAL ═══════════════
    7:    { d:4, g:"Use 5,000 medical items total. Use blood bags, first aid kits, and other medicals in combat regularly. Very long-term grind." },
    23:   { d:4, g:"Revive 500 players total. Requires revive skill (education). Revive actively whenever possible." },
    267:  { d:4, g:"Revive 1,000 players total. Same as Florence Nightingale — keep reviving consistently. Very long-term." },
    322:  { d:5, g:"Revive 10 different players within 10 minutes. Requires revive skill and a very active hospital. Best during major wars when many players are hospitalized simultaneously — coordinate with faction." },
    398:  { d:4, g:"Fill 1,000 empty blood bags. Complete Intro to Biochemistry + Intravenous Therapy education first. Always keep a medical cooldown active by filling bags daily." },
    406:  { d:4, g:"Random chance when using (not filling) a blood bag. Just keep using blood bags for healing and it will eventually trigger." },
    418:  { d:4, g:"Fill 250 empty blood bags. Complete Intravenous Therapy education. Fill bags as part of your daily routine." },

    // ═══════════════ ITEMS ═══════════════
    1:    { d:4, g:"Find 50 items in the City (City → Look Around). Items spawn randomly — use the Torntools browser extension to help locate them faster." },
    4:    { d:4, g:"Use 100 job points. Works at both player-owned companies and city jobs (companies give more points per day). Minimum ~10 days." },
    164:  { d:4, g:"Use 1,000 job points. Takes a minimum of 100 days of consistent working." },
    238:  { d:4, g:"Find 1,000 items in the City Dump (Crimes → Search for Cash → Dump). Costs 5 energy per search — 5,000 energy total. Do passively during daily crime activities." },
    527:  { d:3, g:"Use a Stat Enhancer item. The four Stat Enhancers are: Boxing Gloves, Skateboard, Parachute, and Dumbbells — sold at Nikeh Sports city shop for ~$450M each. NOTE: Snowboard is NOT an enhancer — don't get scammed." },
    538:  { d:4, g:"Drink 500 cans of energy drink total. Buy in bulk from item market. Limited by booster cooldown — ~24 per day max." },
    539:  { d:4, g:"Read 10 books. Books come from mission rewards and faction subscription rewards — use them from inventory when received." },
    699:  { d:3, g:"Maintain an impressive display case. Fill it with 5+ rare collectible items and keep them there for 30 days. Check Torn wiki for which items qualify as collectibles." },
    882:  { d:3, g:"Use a Neumune Tablet to reduce radiation poisoning. First get irradiated: use a Blood Bag: Irradiated (item market, ~$2-3M). Then use a Neumune Tablet. You must be actively irradiated before the tablet works." },

    // ═══════════════ MISC ═══════════════
    229:  { d:4, g:"Achieve 250 total awards (honors + medals combined). Comes naturally from active playing and collecting honors over time." },
    244:  { d:4, g:"Achieve 100 personal perks. Perks come from education courses, faction perks, stock benefits, crime enhancers, and merits. Check your profile → Perks section." },
    245:  { d:4, g:"Achieve 1,000 hours of activity on Torn. Accumulates passively just from logging in and playing regularly." },
    216:  { d:4, g:"Code 100 computer viruses (Crimes → Computer Crimes). Each attempt uses nerve. Just keep coding viruses as part of regular crime activities." },
    259:  { d:4, g:"Reach level 50. Comes naturally from regular play — gain XP from attacking, missions, and activities." },
    264:  { d:4, g:"Reach level 100. Long-term level goal. Gain XP from attacking high-stat players and completing missions." },
    265:  { d:4, g:"Reach level 100. You earn both this and The Whole Nine Yards simultaneously upon hitting level 100." },
    266:  { d:3, g:"Refill your energy bar 250 times using points. Each refill costs 25 points (6,250 total). Only do this if you have excess points." },
    312:  { d:5, g:"Survive a Torn City server rollback. This is an extremely rare event that cannot be forced — just log in regularly and hope one happens." },
    334:  { d:3, g:"Refill your Casino tokens 250 times using points. Each refill costs 25 points (6,250 total). Only if you have spare points." },
    380:  { d:4, g:"Achieve 99,999 happiness (maximum). Gained from working — especially a Toy Shop which gives massive boosts. Keep working and using happiness items." },
    566:  { d:3, g:"Refill your nerve bar 250 times using points. Each refill costs 25 points (6,250 total). Only if you have spare points." },
    571:  { d:4, g:"Win 100 races. Set up custom 1-lap Speedway races with a friend — about 20 races per hour. Or just race normally over time." },
    572:  { d:4, g:"Reach racing skill level 10. Comes naturally from regular racing participation." },
    607:  { d:4, g:"Achieve 50 personal perks. Perks from education, faction, stocks, crime enhancers, and merits all count." },
    614:  { d:4, g:"Achieve 500 total awards. Long-term milestone — keep collecting honors and medals." },
    620:  { d:4, g:"Achieve 150 personal perks. Long-term goal — requires extensive education, stock holdings, and merit investment." },
    700:  { d:5, g:"Achieve top 250 in one of the personal Hall of Fame leaderboards. Extremely competitive — requires being among the top Torn players in a specific stat category." },
    729:  { d:3, g:"Unlock a hairstyle from the Token Shop or Points Building. Earn competition tokens from seasonal events and spend them in the Token Shop." },
    730:  { d:3, g:"Unlock a backdrop from the Token Shop or Points Building. Earn competition tokens from seasonal events." },
    734:  { d:4, g:"Crash a car during a race. Random event that occurs occasionally while racing — just keep racing and it will happen eventually." },
    742:  { d:4, g:"Use 10,000 job points total. Takes a minimum of ~1,000 days of working. Work at a player-owned company for more points per day." },
    217:  { d:4, g:"Refer one friend to Torn who reaches level 10. Share your referral link from your profile. Help them get started to ensure they stick around." },
    218:  { d:4, g:"Refer two friends to Torn who both reach level 10." },
    219:  { d:4, g:"Refer three friends to Torn who all reach level 10." },
    246:  { d:5, g:"Have one of your referrals go on to refer another player who reaches level 10. Cannot be forced — requires luck and patience." },
    839:  { d:5, g:"This is a secret honor — the unlock condition has never been officially confirmed. Just keep playing normally." },

    // ═══════════════ JAIL ═══════════════
    248:  { d:4, g:"Bust 1,000 players from jail total. Bust people from the Jail page regularly. Get your Law Bachelor first for +50% success rate." },
    249:  { d:4, g:"Bust 2,500 players from jail. Long-term jail busting — Law Bachelor is essential." },
    250:  { d:4, g:"Bust 10,000 players from jail. Very long-term — requires consistent daily busting for years." },
    252:  { d:4, g:"Make 500 bail payments from jail. Bail yourself or others out of jail 500 times total." },
    906:  { d:4, g:"Go to jail 250 times total. Comes naturally from failing crimes over time — don't stress about farming this specifically." },

    // ═══════════════ COMPETITIONS ═══════════════
    212:  { d:5, g:"Finish the Elimination competition with your team in 1st, 2nd, or 3rd place. Participate actively when Elimination runs and coordinate with teammates." },
    213:  { d:5, g:"Participate in the Mr & Ms Torn competition. An official Torn event — watch the announcements for when it runs." },
    214:  { d:5, g:"Complete the 4th stage of the TC Endurance challenge. Participate in the Endurance competition when it runs." },
    221:  { d:5, g:"Earn 50 or more Dog Tags in the Dog Tag competition. Stack 1,000 energy before the event, prepare a list of inactive targets, and hit them continuously." },
    222:  { d:4, g:"Find and collect 10 Easter eggs during the Easter seasonal event. Log in during Easter and click the egg hunt button — 10 eggs are easily found in one session." },
    224:  { d:5, g:"Complete the 5th stage of the TC Endurance challenge." },
    225:  { d:5, g:"Complete the bonus task of the TC Endurance challenge." },
    226:  { d:4, g:"Achieve 50 attacks against enemy team members in the Elimination competition. Participate actively when Elimination runs." },
    263:  { d:5, g:"Finish Torn of the Dead as a surviving civilian (not infected). Avoid getting infected throughout the event — requires luck and active avoidance of zombie players." },
    277:  { d:5, g:"Earn 250+ Dog Tags in the Dog Tag competition. Far more intensive than KIA — very competitive." },
    279:  { d:5, g:"Finish the Elimination competition with your team in 1st place. Very competitive." },
    280:  { d:5, g:"Finish the Elimination competition within the top 5% of attackers on your team." },
    306:  { d:4, g:"Attack 50 zombies in the Torn of the Dead event. Participate when it runs and attack infected players." },
    311:  { d:4, g:"Infect 50 civilians in the Torn of the Dead event. Become a zombie and attack uninfected players." },
    964:  { d:4, g:"Upgrade your Halloween Basket to 'Terrifying' during Halloween. Buy a basket when the event starts and attack players to fill it. Requires heavy Xanax use — may take two Halloween events at normal pace." },
    966:  { d:5, g:"Upgrade your Halloween Basket to 'Nightmarish'. Higher tier than Terrifying — requires extremely active participation." },
    969:  { d:4, g:"Upgrade your Halloween Basket to 'Frightful' (first tier). Achievable within 3 days of the event with consistent attacking." },

    // ═══════════════ CRIMES V2 ═══════════════
    328:  { d:5, g:"Steal a Cluster Ring from the Jewelry Store in Shoplifting. Requires high Shoplifting skill to access the Jewelry Store. The Cluster Ring is a rare steal — keep targeting the Jewelry Store." },
    676:  { d:4, g:"Successfully burgle all 34 Burglary areas. The final 3 unlock at level 100 (one per district). Work through all areas systematically — each only needs to be burglarized once." },
    1012: { d:4, g:"Find all 7 rotten food and drink items from the City Dump. Requires Trash skill level 45 to unlock all 7 items. Keep searching the Dump regularly." },
    1025: { d:4, g:"Achieve skill level 100 in Bootlegging. Just keep creating DVDs — you don't need to manually sell them for XP." },
    1028: { d:4, g:"Sell 10,000 DVDs of each movie genre in Bootlegging. Complete ICT Computer Science education to unlock your online store. Set it up and let it run for ~2 weeks." },
    1029: { d:4, g:"Achieve skill level 100 in Shoplifting. Grind daily across all Shoplifting areas. Slightly time-gated at first due to notoriety mechanics." },
    1031: { d:4, g:"Acquire 10,000 customers on your Bootlegging online DVD store. Unlock via ICT Computer Science education, set up the store, and leave it running ~2 weeks." },
    1032: { d:4, g:"Become initiated into one of Torn's 5 Graffiti crews. Reach Graffiti skill 70 and 500 reputation with the East Side crew, then complete the Unique crime at East Side." },
    1034: { d:4, g:"Achieve skill level 100 in Graffiti. Grind Graffiti crimes daily across all 7 locations." },
    1038: { d:1, g:"Achieve 100% notoriety at all Shoplifting stores simultaneously. Best done EARLY before your skill is too high. Have 200+ nerve available, then spam all areas until each hits 100%." },
    1053: { d:4, g:"Achieve skill level 100 in Card Skimming. Place 20 skimmers at Bus Station and leave for 2-3 weeks at a time. Very low nerve cost per XP — set and forget." },
    1064: { d:4, g:"Achieve skill level 100 in Burglary. Grind daily. Residential areas generally give better XP. Always case to maximum to avoid critical failures." },
    1076: { d:5, g:"Pickpocket a police officer's badge. Officers appear as 'running' targets and are rare. Very high critical fail chance — attempt at skill level 0 (no skill to lose) or wait until level 100." },
    1078: { d:4, g:"Achieve skill level 100 in Pickpocketing. Follow a Pickpocketing guide for safe target selection — avoid running targets to prevent critical fails." },
    1083: { d:4, g:"Achieve skill level 100 in Hustling. Follow the Hustling compact guide for the most efficient method." },
    1097: { d:4, g:"Achieve maximum technique in all 4 Hustling confidence tricks. Use each trick type repeatedly until each maxes out." },
    1104: { d:4, g:"Achieve skill level 100 in Disposal. Use a disposal guide/table to pick safest jobs with best XP per nerve. Daily tasks respawn at midnight TCT." },
    1106: { d:4, g:"Dissolve a Dead Body in Acid (Crimes → Disposal). Dead Body jobs appear around skill level 85 and spawn 1-2 times per week. Keep grinding Disposal skill." },
    1118: { d:5, g:"Achieve skill level 100 in Cracking. Brute-force to identify characters, then guess when you have enough info. A Cracking helper script significantly speeds this up. Build an efficient rig using MIPS optimization guides." },
    1129: { d:4, g:"Successfully guess 250 password characters in Cracking. Use a Cracking guessing tool to accelerate identification. Comes naturally while grinding toward level 100." },
    1130: { d:5, g:"Achieve skill level 100 in Forgery. Driver's License forgery is most accessible — materials for higher-tier forgeries can be very expensive." },
    1136: { d:4, g:"Have 10 of the same Forgery project in cooldown simultaneously. License Plates have a 1-hour cooldown. Requires at least 25 Forgery skill — create 10 License Plates at once." },
    1166: { d:5, g:"In a single successful scam, respond to all four of your target's prompt types: Temptation (blue arrow), Sensitivity (red arrow), Concern (yellow tile), and Hesitation (purple tile). Learn the Scamming tile navigation system." },
    1218: { d:4, g:"Earn $1,000,000 from a single scam. Target high-value marks and navigate tiles carefully to maximize payout." },
    1229: { d:4, g:"Sell at least 10,000 card details at once in Card Skimming. With 20 skimmers running, accumulating 10,000 takes several weeks." },
    1241: { d:4, g:"Run a Cracking rig at 2,500,000 MIPS. Build an optimized rig using a Cracking rig-building guide for best component selection." },
    1243: { d:4, g:"Create a passport in Forgery. Passports unlock at higher Forgery skill — gather required materials from the market and forge one." },
    1271: { d:4, g:"Achieve 5/5 reputation in all 7 Graffiti locations simultaneously. Tag consistently across all locations — your rep decays if you neglect any one location." },
    1277: { d:4, g:"Achieve skill level 100 in Scamming. Follow a Scamming guide to learn efficient tile navigation." },
    1284: { d:4, g:"Win $100,000 from a single bet in Hustling. Target high-value marks and use optimal technique." },
    1328: { d:4, g:"In Pickpocketing, steal exclusively from 'skinny' (running) targets for enough successes. Follow the Pickpocketing safe target guide." },
    1360: { d:4, g:"Clear ALL available Disposal jobs in a single day. Complete every job before midnight TCT when they respawn." },
    1371: { d:5, g:"Destroy the largest building size in Arson in under 30 seconds. Requires high Arson skill and the optimal ignitor/accelerant combination — check an Arson combo guide." },
    1374: { d:4, g:"Achieve skill level 100 in Arson. Warehouse Arson (11 nerve, ~95% success) is the most nerve-efficient method. Grind daily." },
    1387: { d:4, g:"Use all 15 Arson ignitors, accelerants, and dampeners at least once each. These unlock progressively as Arson skill increases — just keep grinding." },

    // ═══════════════ EASY / COORDINATE (Orange) ═══════════════
    896:  { d:2, g:"Defeat any co-worker from your current company. Find the weakest player in your company's employee list and attack them." },
    605:  { d:2, g:"Defeat a fellow faction member. Coordinate with a willing, weaker factionmate — they agree to let you win." },
    860:  { d:2, g:"Buy a Trailer from Properties (~$1.5M from the city), go to Properties → Trailer → Rent Out, set rent to $0, then ask anyone to rent it. Post in a Torn chat if needed." },
    739:  { d:2, g:"Get mugged for exactly $1. You need to carry exactly $10 in cash (the mug gives ~10% of what you hold, so $10 → $1 mugged). Have a trusted friend mug you while you hold $10. Put everything else in the bank first." },
    317:  { d:2, g:"Be defeated by someone, then defeat them within 10 minutes. Coordinate with a friend: they beat you first, you immediately med out and counter-attack. You may need to hospitalize them to win." },
    519:  { d:2, g:"Beat 10 different unique opponents in Russian Roulette. Set $10 minimum bets in the Casino — lots of players join low-stake games. You need 10 different people defeated, not just 10 wins." },
    827:  { d:2, g:"You and your spouse must both participate in the same attack. One of you starts the attack, the other clicks Assist. Pick a weak inactive target. Both need to be online at the same time." },
    955:  { d:2, g:"Mug someone who has just mugged someone else. Have a friend mug any player, then you immediately mug your friend right after their mug resolves." },
    615:  { d:2, g:"Defeat someone while they are mid-attack on another player. Have a friend start an attack on someone but not finish it — you then attack and defeat your friend before they finish that fight." },
    247:  { d:2, g:"Make $1,000,000 from a single mugging. Have a trusted friend hold $15M+ in cash (you steal ~10%), then mug them. Use a ghost trade immediately after to protect the cash. Or post in forums to buy a mug." },
    488:  { d:2, g:"Perform a faction retaliation. When someone attacks a factionmate, you hospitalize the attacker within ~5 minutes. You must be in the same faction as the attacked player." },
871:  { d:4, g:"Get a finishing kill using only a Kick. First complete Introduction to Self-Defense → Kick-boxing in Education. Then equip no weapon and kill a low-level inactive using only Kick." },
    670:  { d:2, g:"Receive actual loot from a defeated NPC. You need to be in the top damage dealers when the NPC dies. Check yata.yt for schedules, show up with full energy, and hit hard." },
    481:  { d:2, g:"Defeat someone with higher total battle stats than you in a solo attack. Ask a stronger friend to fight you with their armor unequipped and a weak weapon — they intentionally let you win." },
    627:  { d:2, g:"Defeat someone with at least double your total stats. Ask a friend with 2× your stats to go fully naked (no armor, weak weapon) and deliberately lose. Penguinbob is a known community candidate for lower-stat players." },
    631:  { d:2, g:"Defeat someone with 5× your stats. Use stat boosters (Epinephrine, etc...). Ask the target to strip all armor and use only a weak weapon. For lower-stat players, penguinbob is commonly recommended." },
    719:  { d:2, g:"Win a defense against someone who has double your stats. Coordinate with a stronger friend: they attack you while naked with a weak weapon, intentionally losing the attack." },
    500:  { d:2, g:"Win an attack while at 1% or less life. Drop your health with blood bags to very low, attack a weak target using a Pillow (no damage), and kill them before you die. Have med items ready to recover." },
    781:  { d:2, g:"Hit 10 different body parts in one attack and then win. Equip a Pillow (~$6k, no damage) to spread many hits around all body parts, then switch to your real weapon to finish. Pick a target that can survive a while." },
    828:  { d:2, g:"Defeat someone on exactly turn 25 (the final possible turn). Equip a Pillow (~$6k) and keep hitting until turn 24, then switch to your main weapon and finish on turn 25." },
    800:  { d:2, g:"Use 100 rounds of special ammo total. Buy special ammo from the Mission shop for credits, or steal some from Big Al's. Check your inventory under 'Ammo' to see what you have." },
    256:  { d:2, g:"Get a single chain hit worth 10+ faction respect. You need decent stats and a good chain target. Pop Xanax before the attack for a stat boost. Only triggers during an active faction chain." },
    15:   { d:2, g:"Achieve a kill streak of 10 consecutive wins with zero losses (including defends). Best attempted during new player protection (first 14 days). Stay out of forums/chat, close your bazaar, attack only low-stat inactives." },
    477:  { d:2, g:"Get a single chain hit worth 100+ faction respect. Requires high stats and a high-ranked enemy faction target during war. Ask your faction leader for the right target." },

    // ═══════════════ COSTS MONEY (Yellow/Green) ═══════════════
    395:  { d:3, g:"Reach 1,000 energy. Start from 0 energy and take 4 Xanax in sequence (each gives +250 energy with a 6-8hr drug cooldown between uses). Each Xanax costs ~$850k — total ~$3.4M." },
    268:  { d:3, g:"Sell 1,000 points on the market total. Buy 25-50 points at a time and relist them. Repeat until you hit 1,000 total sold. You'll take a small loss per cycle but it's fast. Costs ~$100-200k net." },
    678:  { d:3, g:"Use Stink Bombs on a player weaker than you (if you target someone stronger, you get hospitalized). Buy Stink Bombs from Item Market → Specials (~$800k). Use from inventory → Use → enter a weaker player's name." },
    717:  { d:3, g:"Use Dog Poop on a weaker player. Buy from Item Market → Specials (~$800k). Same process as Stink Bombs — target must be weaker or you get hosp'd." },
    716:  { d:3, g:"Use Toilet Paper on a weaker player. Buy from Item Market → Specials (~$800k). Same process as the other prank items." },
    437:  { d:3, g:"Spin the Wheel of Mediocrity in the Casino ($50,000 per spin) and win at least once. Keep spinning until you win. Budget a few million for attempts." },
    427:  { d:3, g:"Spin the Wheel of Awesome in the Casino ($1,000,000 per spin) and win at least once. Budget several million for attempts — RNG." },
    431:  { d:3, g:"Spin the Wheel of Lame in the Casino ($1,000 per spin) and win at least once. Cheapest of the three wheels. Just keep spinning." },
    743:  { d:3, g:"Trash an item with a current market value of at least $1,000,000. Buy any item just over $1M in market value (e.g. a small suitcase), then dump it from your inventory." },
    513:  { d:3, g:"Win $100,000,000 from a single Russian Roulette game (requires a $50M+ bet per round). Use a password-protected room with a trusted friend only. Move winnings into a ghost trade immediately after winning to avoid mugging." },
    233:  { d:3, g:"Own all lightweight gym memberships: Bucks Fitness, Frontline Fitness, City Gym, and Anabolic Supplements. Buy all four from their respective city locations." },
    239:  { d:3, g:"Have 100 different unique customers buy from your Bazaar. You need to buy a Bazaar (~250 points). Sell cheap popular items like Lollipops at low prices to attract buyers fast." },

    // ═══════════════ GRIND / TAKES TIME (Blue) ═══════════════
    316:  { d:4, g:"Pray at the Church twice daily (with ~8-10hr gap between prayers) for 7-14 days straight without missing. If you skip a full prayer cycle, the timer resets to zero. Set phone reminders. City → Church → Pray." },
    534:  { d:4, g:"Drink 500 bottles of alcohol total. Limited by booster cooldown (~24 per day max). Budget ~21 days and ~$350k. Buy cheap beer in bulk from the Item Market." },
    537:  { d:4, g:"Eat 500 bags of candy total. Buy Lollipops cheaply from the City Shop. Eat as many per day as your booster cooldown allows." },
    29:   { d:4, g:"Use 50 Cannabis total. Each use triggers a ~1.5hr cooldown. Total time: up to 75 hours spread over days. Each Cannabis costs ~$6,000, so about $300k total." },
    541:  { d:4, g:"Import 100 items while returning from abroad. Use a Large Suitcase to bring back multiple items per trip. Stacks across all trips over time." },
    542:  { d:4, g:"Import 1,000 items from abroad total. Same as Mule but more. Keep bringing back suitcases full each trip." },
    549:  { d:4, g:"Spend 7 cumulative days in the air (travel time only — time spent at a destination doesn't count). Longer flights help. Stacks across all journeys." },
    873:  { d:4, g:"Log in every single day for 100 consecutive days without missing one. Set a daily alarm — missing even one day resets the counter." },
    1054: { d:4, g:"Go to Crimes → Card Skimming → Bus Station. Install a skimmer there and leave it for ~3 weeks to accumulate 250+ card details. Then recover it to trigger the honor." },
    163:  { d:4, g:"Stay married to the same person for 250 consecutive days. Get married via the Chapel (City) and don't divorce." },
    162:  { d:4, g:"Stay married to the same person for 750 consecutive days." },
    257:  { d:4, g:"Participate in a faction chain of at least 1,000 hits. Join during a major planned chain event — ask your faction leadership when the next big chain is." },
    475:  { d:4, g:"Participate in a faction chain of at least 10,000 hits. Requires a very active faction with regular large chains." },
    844:  { d:4, g:"Reach 10,000 in any one working stat (Manual Labor, Intelligence, or Endurance). Ask your company director to train you — directors can boost stats much faster than self-training." },
    11:   { d:4, g:"Travel abroad 100 times total. Stacks across all trips. Just keep traveling regularly." },
    165:  { d:4, g:"Travel abroad 1,000 times total. Long-term goal — just keep traveling consistently." },
    309:  { d:4, g:"Log in on December 25th (Christmas Day). Just be online — even briefly — that day." },
    731:  { d:4, g:"Log in on February 14th (Valentine's Day). Just be online that day." },
    443:  { d:4, g:"Log in on October 31st (Halloween). Just be online that day." },
    459:  { d:4, g:"Log in on November 15th (Torn's anniversary). Just be online that day." },
    375:  { d:4, g:"Log in on January 1st (New Year's Day). Just be online that day." },
    271:  { d:4, g:"Trash (dump) 5,000 items total. Buy the cheapest items in bulk from the market (flowers, lollipops, etc.) and dump them in batches." },
    903:  { d:4, g:"Go to hospital 250 times total (cumulative). Comes naturally over time — don't stress about farming this one." },
    651:  { d:4, g:"Complete 50 education courses total. Keep taking any courses in Education." },
    656:  { d:4, g:"Complete 100 education courses total." },
    552:  { d:4, g:"Participate in 100 organized crimes with your faction. Join your faction's organized crime runs regularly." },
    251:  { d:4, g:"Commit 10,000 criminal offenses total (Crimes v2 — any crime type counts toward this)." },
    617:  { d:4, g:"Max out any merit upgrade to its full 10/10. Requires 55 total merits spent — keep collecting merits and focus them into one upgrade to completion." },

    // ═══════════════ COMPLEX / RNG (Purple) ═══════════════
    338:  { d:5, g:"Achieve all four Blackjack milestones in any order (separate sessions are fine): 1) Natural — 21 with only your first 2 cards. 2) Double Down — press the Double button on a strong starting hand. 3) Insurance — place the insurance side bet when the dealer shows an Ace. 4) Six Card Charlie — receive 6 cards without going over 21. Bet $10 minimum to minimize losses. Be patient." },
    326:  { d:5, g:"Get a win streak of 25 consecutive rounds in High-Low (Casino). Bet the minimum each time. Any loss resets the streak. Pure RNG — just keep playing consistently." },
    220:  { d:5, g:"Irritate ALL job interviewers simultaneously. You must have minimum stats to qualify for all starter jobs. Each interviewer has a specific way to annoy them — check the dedicated guide thread on Torn forums (search 'Affronted guide'). You must fail every interview in the same session." },
    22:   { d:5, g:"Win 50 defends (people must attack you and lose). Post in the Attacking Forum offering ~$250k per bought loss. Pay each person immediately after they lose to avoid bounties and hate mail. Delete your post when done. Total cost ~$12-15M." },
    16:   { d:5, g:"Achieve a kill streak of 100 consecutive wins with absolutely zero losses (attacking or defending). Best attempted during new player protection. Avoid ALL forums and chat. Keep bazaar closed. Use stealth. Target 60+ attacks per day. Buy defends if necessary to avoid random attackers." },
    478:  { d:5, g:"Get a single chain hit worth 1,000+ faction respect. Requires elite stats and an extremely high-ranked enemy faction target during war. Consult your faction's top fighters and leadership." },
    513:  { d:5, g:"Win $100M from a single Russian Roulette game. You and a trusted friend both bring $50M+, play password-protected games, and take turns winning. Move winnings to a ghost trade instantly — mugging snipers patrol the RR page." },
  };

  /* ─────────────────────────────────────────────────────────────
     CATEGORIES
  ───────────────────────────────────────────────────────────── */
  const CATS = {
    0:  { name:'Misc',         icon:'⚙️',  color:'#94a3b8' },
    1:  { name:'Default',      icon:'🏳️',  color:'#475569' },
    2:  { name:'Weapons',      icon:'🔫',  color:'#ef4444' },
    3:  { name:'Camo',         icon:'🎖️',  color:'#84cc16' },
    4:  { name:'Education',    icon:'🎓',  color:'#3b82f6' },
    5:  { name:'Crimes',       icon:'🔪',  color:'#f97316' },
    6:  { name:'Drugs',        icon:'💊',  color:'#a855f7' },
    7:  { name:'Travel',       icon:'✈️',  color:'#06b6d4' },
    8:  { name:'Attacking',    icon:'⚔️',  color:'#dc2626' },
    9:  { name:'Casino',       icon:'🎲',  color:'#eab308' },
    10: { name:'Gym',          icon:'💪',  color:'#22c55e' },
    11: { name:'Commitment',   icon:'❤️',  color:'#ec4899' },
    12: { name:'Level',        icon:'📈',  color:'#8b5cf6' },
    13: { name:'Competitions', icon:'🏆',  color:'#f59e0b' },
    14: { name:'Money',        icon:'💰',  color:'#10b981' },
    15: { name:'Jail',         icon:'🔒',  color:'#64748b' },
    16: { name:'Items',        icon:'🎒',  color:'#0ea5e9' },
    17: { name:'Missions',     icon:'📋',  color:'#d97706' },
    18: { name:'Hospital',     icon:'🏥',  color:'#f43f5e' },
  };

  const RARITY_RANK = {
    'Very Common':1,'Common':2,'Uncommon':3,
    'Limited':4,'Rare':5,'Very Rare':6,'Extremely Rare':7,
  };
  const RARITY_COLOR = {
    'Very Common':'#4b5563','Common':'#6b7280','Uncommon':'#3b82f6',
    'Limited':'#a855f7','Rare':'#f97316','Very Rare':'#ef4444','Extremely Rare':'#fbbf24',
  };

  /* ─────────────────────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────────────────────── */
  const LS_KEYS = { KEY:'tht_key',UH:'tht_uh',AH:'tht_ah',HID:'tht_hid',MAN:'tht_man',REF:'tht_ref',OPEN:'tht_open' };
  const REFRESH_MS = 5 * 60 * 1000;

  let S = {
    apiKey:'', userHonors:new Set(), allHonors:[],
    hidden:new Set(), manual:new Set(),
    mode:'easy',           // 'easy' | 'category' | 'all'
    activeCat:-1,          // category type.id; -1 = all
    easyFilter:0,          // 0 = all tiers, 1-5 = specific tier
    easyShowEarned:false,  // show already-earned honors in easy mode
    browseFilter:'missing',// 'all'|'earned'|'missing'
    search:'', sortBy:'diff',
    loading:false, error:'', lastRefresh:0,
    panelOpen:false, showHidden:false,
    hasUpdate:false, latestVersion:'',
  };

  function loadState() {
    S.apiKey      = localStorage.getItem(LS_KEYS.KEY) || '';
    S.userHonors  = new Set(JSON.parse(localStorage.getItem(LS_KEYS.UH)  || '[]'));
    S.allHonors   = JSON.parse(localStorage.getItem(LS_KEYS.AH)  || '[]');
    S.hidden      = new Set(JSON.parse(localStorage.getItem(LS_KEYS.HID) || '[]'));
    S.manual      = new Set(JSON.parse(localStorage.getItem(LS_KEYS.MAN) || '[]'));
    S.lastRefresh = +(localStorage.getItem(LS_KEYS.REF) || 0);
    S.panelOpen   = localStorage.getItem(LS_KEYS.OPEN) === '1';
  }

  function saveState() {
    localStorage.setItem(LS_KEYS.KEY,  S.apiKey);
    localStorage.setItem(LS_KEYS.UH,   JSON.stringify([...S.userHonors]));
    localStorage.setItem(LS_KEYS.AH,   JSON.stringify(S.allHonors));
    localStorage.setItem(LS_KEYS.HID,  JSON.stringify([...S.hidden]));
    localStorage.setItem(LS_KEYS.MAN,  JSON.stringify([...S.manual]));
    localStorage.setItem(LS_KEYS.REF,  S.lastRefresh);
    localStorage.setItem(LS_KEYS.OPEN, S.panelOpen ? '1' : '0');
  }

  /* ─────────────────────────────────────────────────────────────
     API
  ───────────────────────────────────────────────────────────── */
  async function fetchJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (d.error) throw new Error(d.error.error || 'API error');
    return d;
  }

  async function doRefresh(force = false) {
    if (!S.apiKey) { S.error = 'No API key set.'; render(); return; }
    if (!force && (Date.now() - S.lastRefresh) < REFRESH_MS) return;
    S.loading = true; S.error = ''; render();
    try {
      if (force || !S.allHonors.length) {
        const all = await fetchJSON(`https://api.torn.com/v2/torn/honors?limit=1000&offset=0&key=${S.apiKey}`);
        S.allHonors = (all.honors || []).filter(h =>
          h.type?.id !== 1 &&
          h.description !== 'A default honor bar available to everyone'
        );
      }
      const user = await fetchJSON(`https://api.torn.com/v2/user/honors?key=${S.apiKey}`);
      S.userHonors = new Set((user.honors || []).map(h => h.id));
      S.lastRefresh = Date.now();
      S.error = '';
      saveState();
    } catch(e) { S.error = e.message; }
    S.loading = false; render();
  }

  /* ─────────────────────────────────────────────────────────────
     UPDATE CHECK
  ───────────────────────────────────────────────────────────── */
  function versionNewer(remote, local) {
    const r = remote.split('.').map(Number);
    const l = local.split('.').map(Number);
    for (let i = 0; i < Math.max(r.length, l.length); i++) {
      if ((r[i]||0) > (l[i]||0)) return true;
      if ((r[i]||0) < (l[i]||0)) return false;
    }
    return false;
  }

  async function checkForUpdate() {
    try {
      const res = await fetch(GF_API);
      if (!res.ok) return;
      const d = await res.json();
      const remote = d.version || '';
      if (remote && versionNewer(remote, VERSION)) {
        S.hasUpdate = true;
        S.latestVersion = remote;
        renderUpdateUI();
      }
    } catch(e) { /* silent — no CORS or network, just skip */ }
  }

  function renderUpdateUI() {
    const btn = document.getElementById('tht-btn');
    if (btn) btn.classList.toggle('has-update', S.hasUpdate);
    const banner = document.getElementById('tht-update-banner');
    if (!banner) return;
    if (S.hasUpdate) {
      banner.innerHTML = `<a href="${GF_URL}" target="_blank" class="tht-update-link">
        ⬆ v${S.latestVersion} available — click to update on GreasyFork
      </a>`;
      banner.style.display = '';
    } else {
      banner.style.display = 'none';
    }
  }

  /* ─────────────────────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────────────────────── */
  function isEarned(id)  { return S.userHonors.has(id) || S.manual.has(id); }
  function getDiff(h)    { return DB[h.id] ? DB[h.id].d : Math.min(6, RARITY_RANK[h.rarity] || 6); }

  function getList() {
    let list = [...S.allHonors];

    if (S.mode === 'easy') {
      list = list.filter(h => DB[h.id]);
      if (!S.easyShowEarned) list = list.filter(h => !isEarned(h.id));
      if (S.easyFilter > 0) list = list.filter(h => getDiff(h) === S.easyFilter);
    } else {
      if (S.mode === 'category' && S.activeCat >= 0)
        list = list.filter(h => h.type?.id === S.activeCat);
      if (S.browseFilter === 'earned')  list = list.filter(h => isEarned(h.id));
      if (S.browseFilter === 'missing') list = list.filter(h => !isEarned(h.id));
    }

    if (!S.showHidden) list = list.filter(h => !S.hidden.has(h.id));

    if (S.search) {
      const q = S.search.toLowerCase();
      list = list.filter(h =>
        h.name?.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q) ||
        (DB[h.id]?.g || '').toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (S.mode === 'easy' && S.easyShowEarned) {
        const ae = isEarned(a.id), be = isEarned(b.id);
        if (ae !== be) return ae ? 1 : -1;
      }
      if (S.sortBy === 'name')   return (a.name||'').localeCompare(b.name||'');
      if (S.sortBy === 'rarity') return (RARITY_RANK[b.rarity]||0)-(RARITY_RANK[a.rarity]||0);
      const da = getDiff(a), db = getDiff(b);
      if (da !== db) return da - db;
      return (RARITY_RANK[a.rarity]||0)-(RARITY_RANK[b.rarity]||0);
    });

    return list;
  }

  function catCounts() {
    const m = {};
    S.allHonors.forEach(h => {
      const id = h.type?.id;
      if (id === undefined) return;
      if (!m[id]) m[id] = { total:0, earned:0 };
      m[id].total++;
      if (isEarned(h.id)) m[id].earned++;
    });
    return m;
  }

  function stats() {
    const total  = S.allHonors.length;
    const earned = S.allHonors.filter(h => isEarned(h.id)).length;
    return { total, earned, missing: total - earned };
  }

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function timeAgo(ts) {
    const s = Math.floor((Date.now()-ts)/1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    return `${Math.floor(s/3600)}h ago`;
  }

  /* ─────────────────────────────────────────────────────────────
     STYLES
  ───────────────────────────────────────────────────────────── */
function injectStyles() {
    if (document.getElementById('tht-css')) return;
    if (!document.getElementById('tht-font')) {
      const lnk = document.createElement('link');
      lnk.id = 'tht-font'; lnk.rel = 'stylesheet';
      lnk.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(lnk);
    }
    document.head.insertAdjacentHTML('beforeend', `<style id="tht-css">
    #tht-panel * { box-sizing:border-box; }
    #tht-panel input,#tht-panel button,#tht-panel select {
      font-family:'Outfit',system-ui,sans-serif;line-height:normal;
    }

    @keyframes tht-spin    { to { transform:rotate(360deg); } }
    @keyframes tht-fade-up { from { opacity:0; } to { opacity:1; } }
    @keyframes tht-fade-in { from { opacity:0; } to { opacity:1; } }

   #tht-btn {
      position:fixed;bottom:80px;right:0;z-index:2147483646;
      background:#0c0c14;border:2px solid #d97706;border-right:none;
      color:#d97706;font-size:11px;font-weight:800;letter-spacing:-.5px;
      font-family:'Outfit',system-ui,sans-serif;
      width:40px;height:40px;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;border-radius:8px 0 0 8px;user-select:none;
      box-shadow:-2px 0 14px rgba(217,119,6,.2);transition:background .2s,box-shadow .4s,border-color .4s,color .4s;
    }
    #tht-btn:hover { background:#130f00; }
    @keyframes tht-glow-pulse {
      0%,100% { box-shadow:-2px 0 14px rgba(74,222,128,.2),-4px 0 28px rgba(74,222,128,.12); }
      50%      { box-shadow:-2px 0 24px rgba(74,222,128,.6),-6px 0 40px rgba(74,222,128,.35); }
    }
    #tht-btn.has-update {
      border-color:#4ade80;color:#4ade80;
      animation:tht-glow-pulse 2.2s ease-in-out infinite;
    }
    .tht-update-banner { margin-bottom:8px; }
    .tht-update-link {
      display:flex;align-items:center;gap:8px;padding:7px 12px;
      background:linear-gradient(90deg,rgba(74,222,128,.07),rgba(74,222,128,.03));
      border:1px solid rgba(74,222,128,.22);border-radius:8px;
      color:#4ade80;font-size:11.5px;font-weight:600;text-decoration:none;
      transition:background .2s;
    }
    .tht-update-link:hover {
      background:linear-gradient(90deg,rgba(74,222,128,.13),rgba(74,222,128,.06));
    }

    #tht-panel {
      position:fixed;top:0;right:0;height:100vh;width:420px;max-width:99vw;
      z-index:2147483647;background:#0c0c14;border-left:1px solid #181825;
      display:flex;flex-direction:column;
      font-family:'Outfit',system-ui,sans-serif;color:#e2e8f0;
      box-shadow:-6px 0 36px rgba(0,0,0,.9);
      transform:translateX(100%);transition:transform .32s cubic-bezier(.4,0,.2,1);
      isolation:isolate;overscroll-behavior:contain;
    }
    #tht-panel.open { transform:translateX(0); }

    #tht-hd {
      background:#09090f;border-bottom:1px solid #131320;
      padding:12px 14px 10px;flex-shrink:0;
    }

    .tht-title-row { display:flex;align-items:center;gap:9px;margin-bottom:11px; }
    .tht-title-icon {
      width:28px;height:28px;border-radius:7px;flex-shrink:0;
      background:linear-gradient(135deg,#d97706,#92400e);
      display:flex;align-items:center;justify-content:center;
    }
    .tht-title-icon svg {
      width:14px;height:14px;stroke:#fff;fill:none;
      stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;
    }
    .tht-title-block { display:flex;flex-direction:column;flex:1; }
    .tht-title { font-size:14px;font-weight:700;color:#f5f5f5;letter-spacing:.1px; }
    .tht-title-sub { font-size:10px;color:#303048;font-weight:400;margin-top:1px; }
    .tht-close {
      background:none;border:none;color:#252538;font-size:14px;
      cursor:pointer;padding:3px;line-height:1;
      border-radius:6px;transition:all .15s;width:24px;height:24px;
      display:flex;align-items:center;justify-content:center;
    }
    .tht-close:hover { background:rgba(255,255,255,.07);color:#888; }

    #tht-modes {
      display:flex;background:rgba(255,255,255,.04);border-radius:8px;
      padding:3px;gap:2px;margin-bottom:10px;
    }
    .tht-mode-tab {
      flex:1;padding:6px 4px;text-align:center;font-size:11px;font-weight:600;
      cursor:pointer;border:none;background:transparent;color:#8892a4;
      border-radius:6px;transition:all .18s;font-family:'Outfit',system-ui,sans-serif;
      letter-spacing:.2px;touch-action:manipulation;
    }
    .tht-mode-tab:hover:not(.active) { color:#c4cdd8; }
    .tht-mode-tab.active {
      background:#16161f;color:#f5a623;
      box-shadow:0 1px 4px rgba(0,0,0,.5);
    }

    .tht-api-row { display:flex;gap:6px;align-items:center;margin-bottom:8px; }
    .tht-api-input {
      flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
      border-radius:8px;padding:7px 10px;color:#606080;
      font-family:'Outfit',system-ui,sans-serif;font-size:12px;outline:none;
      transition:all .2s;
    }
    .tht-api-input:focus { border-color:rgba(217,119,6,.4);color:#bbb; }
    .tht-api-input::placeholder { color:#252538; }

    .tht-btn-gold {
      background:#d97706;color:#fff;border:none;border-radius:8px;
      padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;
      white-space:nowrap;transition:background .15s;
      font-family:'Outfit',system-ui,sans-serif;
      touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    }
    .tht-btn-gold:hover { background:#b45309; }
    .tht-btn-grey {
      background:rgba(255,255,255,.04);color:#303048;
      border:1px solid rgba(255,255,255,.07);border-radius:6px;
      padding:5px 10px;font-size:11px;cursor:pointer;white-space:nowrap;
      transition:all .15s;font-family:'Outfit',system-ui,sans-serif;
      touch-action:manipulation;
    }
    .tht-btn-grey:hover { background:rgba(255,255,255,.07);color:#777; }

    .tht-ctrl-row { display:flex;gap:6px;align-items:center;margin-bottom:8px; }
    .tht-search {
      flex:1;min-width:0;background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.07);border-radius:8px;
      padding:7px 10px;color:#e2e8f0;font-size:12.5px;outline:none;
      transition:border-color .2s;font-family:'Outfit',system-ui,sans-serif;
    }
    .tht-search:focus { border-color:rgba(255,255,255,.14); }
    .tht-search::placeholder { color:#252538; }
    .tht-sort-sel {
      background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
      border-radius:8px;padding:7px 8px;color:#8892a4;font-size:11.5px;
      outline:none;cursor:pointer;font-family:'Outfit',system-ui,sans-serif;
    }

    #tht-diff-pills { display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px; }
    .tht-dpill {
      font-size:10.5px;font-weight:600;padding:3px 10px;border-radius:20px;
      border:1px solid rgba(255,255,255,.07);background:transparent;
      cursor:pointer;transition:all .15s;font-family:'Outfit',system-ui,sans-serif;
      touch-action:manipulation;
    }
    .tht-dpill:hover { filter:brightness(1.4); }
    .tht-dpill.active { background:rgba(255,255,255,.06); }

    #tht-browse-pills { display:flex;gap:5px;margin-bottom:8px; }
    .tht-bpill {
      font-size:11px;padding:3px 12px;border-radius:20px;
      border:1px solid rgba(255,255,255,.07);background:transparent;color:#6b7280;
      cursor:pointer;transition:all .15s;font-family:'Outfit',system-ui,sans-serif;
      font-weight:600;touch-action:manipulation;
    }
    .tht-bpill:hover { border-color:#3a3a58;color:#666; }
    .tht-bpill.active {
      background:rgba(217,119,6,.09);border-color:rgba(217,119,6,.28);color:#f5a623;
    }

    #tht-easy-earned-row { margin-bottom:8px; }

    #tht-status { font-size:11px;display:flex;gap:10px;align-items:center;flex-wrap:wrap; }
.tht-sg { display:inline-flex;align-items:center;gap:5px;color:#6b7280; }
    .tht-sg::before {
      content:'';width:6px;height:6px;border-radius:50%;
      background:#22c55e;flex-shrink:0;display:inline-block;
    }
    .tht-sg strong { color:#22c55e;font-weight:600; }
.tht-sr { display:inline-flex;align-items:center;gap:5px;color:#6b7280; }
    .tht-sr::before {
      content:'';width:6px;height:6px;border-radius:50%;
      background:#ef4444;flex-shrink:0;display:inline-block;
    }
    .tht-sr strong { color:#ef4444;font-weight:600; }
    .tht-se { color:#ef4444;font-size:11px; }
.tht-sdim { color:#6b7280;font-size:11px; }
    .tht-spin {
      display:inline-block;width:11px;height:11px;
      border:2px solid #1e1e2e;border-top-color:#f5a623;border-radius:50%;
      animation:tht-spin .7s linear infinite;
    }

    #tht-body { display:flex;flex:1;overflow:hidden; }

    #tht-sidebar {
      width:148px;flex-shrink:0;background:#07070e;
      border-right:1px solid #10101a;overflow-y:auto;padding:5px 0;
    }
    #tht-sidebar::-webkit-scrollbar { width:3px; }
    #tht-sidebar::-webkit-scrollbar-thumb { background:#14141e;border-radius:2px; }
    .tht-cat {
      display:flex;align-items:center;gap:6px;padding:6px 10px;
      cursor:pointer;border-left:2px solid transparent;
      font-size:11.5px;color:#6b7280;transition:all .12s;
    }
    .tht-cat:hover { background:rgba(255,255,255,.025);color:#555; }
    .tht-cat.active {
      background:rgba(217,119,6,.05);color:#f5a623;border-left-color:#f5a623;
    }
    .tht-cat .ci { font-size:12px;min-width:16px;text-align:center; }
    .tht-cat .cl { flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
    .tht-cat .cc {
      font-size:9.5px;background:rgba(255,255,255,.04);border-radius:20px;
      padding:1px 5px;color:#5a6070;
    }
    .tht-cat.active .cc { background:rgba(217,119,6,.1);color:#d97706; }

#tht-main {
      flex:1;overflow-y:auto;padding:8px;
      display:flex;flex-direction:column;gap:9px;
    }
    #tht-main::-webkit-scrollbar { width:3px; }
    #tht-main::-webkit-scrollbar-thumb { background:#14141e;border-radius:2px; }

    .tht-empty { color:#252538;text-align:center;margin-top:70px;font-size:13px;line-height:2.2; }

    .tht-tier-header {
      display:flex;align-items:center;gap:7px;padding:6px 9px;
      border-radius:6px;font-size:10px;font-weight:700;
      margin-top:0;margin-bottom:0;letter-spacing:1px;text-transform:uppercase;
      flex-shrink:0;
    }
    .tht-tier-line  { flex:1;height:1px;opacity:.18; }
    .tht-tier-desc  { font-size:9.5px;font-weight:400;letter-spacing:.3px;text-transform:none;opacity:.55; }
    .tht-tier-count { font-size:9.5px;font-weight:400;opacity:.45; }

    /* ── Honor card ── */
    .tht-card {
      background:rgba(255,255,255,.024);border:1px solid rgba(255,255,255,.05);
      border-radius:10px;padding:10px 12px;
      display:flex;flex-direction:column;gap:6px;
      position:relative;overflow:hidden;
      transition:background .15s;
      flex-shrink:0;width:100%;
    }
    .tht-card:hover  { background:rgba(255,255,255,.038); }
    .tht-card.earned { border-color:rgba(34,197,94,.12); }
    .tht-card.dim    { opacity:.32; }

    /* Left fade glow */
    .tht-card::before {
      content:'';position:absolute;left:0;top:0;bottom:0;
      width:130px;pointer-events:none;
    }
    /* Left edge line */
    .tht-card::after {
      content:'';position:absolute;left:0;top:8%;bottom:8%;
      width:2px;border-radius:1px;
    }

    .tht-d1::before { background:linear-gradient(to right,rgba(220,60,35,.19),transparent); }
    .tht-d1::after  { background:#c8381c; }
    .tht-d2::before { background:linear-gradient(to right,rgba(215,140,25,.16),transparent); }
    .tht-d2::after  { background:#c88818; }
    .tht-d3::before { background:linear-gradient(to right,rgba(185,185,18,.13),transparent); }
    .tht-d3::after  { background:#aaaa0e; }
    .tht-d4::before { background:linear-gradient(to right,rgba(40,120,210,.15),transparent); }
    .tht-d4::after  { background:#2878d2; }
    .tht-d5::before { background:linear-gradient(to right,rgba(148,68,220,.15),transparent); }
    .tht-d5::after  { background:#9444dc; }
    .tht-d6::before { background:linear-gradient(to right,rgba(65,65,65,.11),transparent); }
    .tht-d6::after  { background:#454545; }
    .tht-de::before { background:linear-gradient(to right,rgba(28,180,75,.13),transparent); }
    .tht-de::after  { background:#1cb44b; }

    .tht-card-top {
      display:flex;align-items:flex-start;gap:10px;
      position:relative;z-index:1;
    }
    .tht-img {
      width:30px;height:30px;border-radius:6px;flex-shrink:0;
      background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);
      object-fit:contain;
    }
    .tht-img-fb {
      width:32px;height:32px;border-radius:7px;flex-shrink:0;
      background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
      display:flex;align-items:center;justify-content:center;
      font-size:15px;
    }
    .tht-card-info { flex:1;min-width:0; }
    .tht-hname { font-size:13px;font-weight:700;color:#efefef;line-height:1.3; }
    .tht-card.earned .tht-hname { color:#4ade80; }
    .tht-hdesc { font-size:11.5px;color:#7a8499;margin-top:2px;line-height:1.5; }

    .tht-card-actions { display:flex;flex-direction:column;gap:3px;flex-shrink:0; }
    .tht-action {
      background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
      border-radius:6px;color:#6b7280;font-size:10.5px;padding:4px 9px;
      cursor:pointer;white-space:nowrap;transition:all .15s;
      font-family:'Outfit',system-ui,sans-serif;touch-action:manipulation;
    }
    .tht-action:hover { background:rgba(255,255,255,.07);color:#777; }
    .tht-action.danger:hover {
      background:rgba(239,68,68,.09);color:#f87171;
      border-color:rgba(239,68,68,.25);
    }

    .tht-badges { display:flex;flex-wrap:wrap;gap:4px;position:relative;z-index:1; }
    .tht-badge {
      font-size:9.5px;font-weight:600;padding:2px 8px;
      border-radius:20px;white-space:nowrap;
    }
    .b-earned { background:rgba(34,197,94,.1);color:#4ade80; }
    .b-manual { background:rgba(96,165,250,.1);color:#60a5fa; }

    /* Guide */
    .tht-guide-btn {
      font-size:11px;font-weight:500;color:#6b7280;cursor:pointer;
      background:none;border:none;font-family:'Outfit',system-ui,sans-serif;
      display:inline-flex;align-items:center;gap:5px;
      padding:2px 0 0;transition:color .15s;
      position:relative;z-index:1;touch-action:manipulation;
    }
    .tht-guide-btn:hover { color:#d97706; }

    /* Smooth expand animation (replaces display:none) */
    .tht-guide-body {
      max-height:0;overflow:hidden;opacity:0;
      transition:max-height .3s ease, opacity .25s ease;
      position:relative;z-index:1;
    }
    .tht-guide-body.open { max-height:800px;opacity:1; }

    .tht-guide-inner {
      background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.05);
      border-left:2px solid #d97706;border-radius:0 6px 6px 0;
      padding:9px 11px;font-size:11.5px;color:#555;line-height:1.7;margin-top:7px;
    }
    .tht-diff-tag {
      display:inline-flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700;
      padding:2px 9px;border-radius:20px;margin-bottom:7px;letter-spacing:.3px;
    }

    @media (max-width:768px) {
      #tht-panel { width:100vw !important;max-width:100vw !important; }
      #tht-btn { bottom:160px;width:44px;height:44px;font-size:10px; }
      #tht-sidebar { width:114px; }
      .tht-mode-tab { font-size:10px;padding:6px 2px;touch-action:manipulation; }
      .tht-hname { font-size:12px; }
      .tht-hdesc { font-size:11px; }
      .tht-card { padding:8px 10px; }
      .tht-action { padding:4px 7px;min-height:32px;touch-action:manipulation; }
      #tht-main { padding-bottom:80px; }
    }
    .tht-hdesc{color:#7a8499!important}.tht-action{color:#6b7280!important}.tht-bpill{color:#6b7280!important}.tht-cat{color:#6b7280!important}.tht-cat .cc{color:#5a6070!important}.tht-sort-sel{color:#8892a4!important}.tht-sdim,.tht-sg,.tht-sr{color:#6b7280!important}
    </style>`);
  }

  /* ─────────────────────────────────────────────────────────────
     BUILD UI
  ───────────────────────────────────────────────────────────── */
  function buildUI() {
    const toggleBtn = document.createElement('div');
    toggleBtn.id = 'tht-btn';
    toggleBtn.title = 'Honor Tracker';
    toggleBtn.innerHTML = '<span style="font-weight:800;font-size:11px;letter-spacing:-.5px;">HT</span>';
    toggleBtn.onclick = () => {
      S.panelOpen = !S.panelOpen;
      document.getElementById('tht-panel').classList.toggle('open', S.panelOpen);
      saveState();
      if (S.panelOpen) doRefresh();
    };
    document.body.appendChild(toggleBtn);

    const panel = document.createElement('div');
    panel.id = 'tht-panel';
    panel.innerHTML = `
      <div id="tht-hd">
        <div class="tht-title-row">
          <div class="tht-title-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <div class="tht-title-block">
            <span class="tht-title">Honor Tracker</span>
            <span class="tht-title-sub">Torn City</span>
          </div>
          <button class="tht-btn-grey" id="tht-toggle-hidden" style="font-size:10px;padding:3px 9px;"></button>
          <button class="tht-close" id="tht-close-btn">✕</button>
        </div>

        <div id="tht-modes">
          <button class="tht-mode-tab" data-mode="easy">Easy Wins</button>
          <button class="tht-mode-tab" data-mode="category">Category</button>
          <button class="tht-mode-tab" data-mode="all">All Honors</button>
        </div>

        <div class="tht-api-row">
          <input class="tht-api-input" id="tht-api-key" type="password"
            placeholder="API key (any access level)…" autocomplete="off" />
          <button class="tht-btn-gold" id="tht-refresh-btn">Sync</button>
        </div>

        <div class="tht-ctrl-row">
          <input class="tht-search" id="tht-search-input" placeholder="Search honors…" />
          <select class="tht-sort-sel" id="tht-sort-sel">
            <option value="diff">Easiest first</option>
            <option value="rarity">Hardest first</option>
            <option value="name">A → Z</option>
          </select>
        </div>

        <div id="tht-update-banner" class="tht-update-banner" style="display:none;"></div>
        <div id="tht-diff-pills"></div>
        <div id="tht-easy-earned-row" style="display:none;margin-bottom:8px;">
          <button class="tht-btn-grey" id="tht-easy-earned-toggle" style="font-size:10px;padding:3px 10px;"></button>
        </div>
        <div id="tht-browse-pills"></div>
        <div id="tht-status"></div>
      </div>

      <div id="tht-body">
        <div id="tht-sidebar"></div>
        <div id="tht-main"></div>
      </div>
    `;
    document.body.appendChild(panel);
    if (S.panelOpen) panel.classList.add('open');

    document.getElementById('tht-close-btn').onclick = () => {
      S.panelOpen = false; panel.classList.remove('open'); saveState();
    };
    const apiInput = document.getElementById('tht-api-key');
    apiInput.value = S.apiKey;
    apiInput.addEventListener('change', () => { S.apiKey = apiInput.value.trim(); saveState(); });
    document.getElementById('tht-refresh-btn').onclick = () => doRefresh(true);
    document.getElementById('tht-search-input').addEventListener('input', e => {
      S.search = e.target.value; renderMain();
    });
    document.getElementById('tht-sort-sel').addEventListener('change', e => {
      S.sortBy = e.target.value; renderMain();
    });
    document.getElementById('tht-toggle-hidden').onclick = () => {
      S.showHidden = !S.showHidden; saveState(); render();
    };
    document.getElementById('tht-easy-earned-toggle').onclick = () => {
      S.easyShowEarned = !S.easyShowEarned; saveState(); render();
    };
    document.getElementById('tht-modes').addEventListener('click', e => {
      const t = e.target.closest('[data-mode]');
      if (!t) return;
      S.mode = t.dataset.mode;
      S.browseFilter = 'missing';
      render();
    });
    document.getElementById('tht-diff-pills').addEventListener('click', e => {
      const t = e.target.closest('[data-d]');
      if (!t) return;
      const d = +t.dataset.d;
      S.easyFilter = (S.easyFilter === d) ? 0 : d;
      renderDiffPills(); renderMain();
    });
    document.getElementById('tht-browse-pills').addEventListener('click', e => {
      const t = e.target.closest('[data-f]');
      if (!t) return;
      S.browseFilter = t.dataset.f;
      renderBrowsePills(); renderMain();
    });
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────── */
  function render() {
    renderModeTabs();
    renderDiffPills();
    renderBrowsePills();
    renderSidebar();
    renderStatus();
    renderMain();

    const hBtn = document.getElementById('tht-toggle-hidden');
    if (hBtn) hBtn.textContent = S.showHidden ? 'Hide Hidden' : 'Show Hidden';

    const eeRow = document.getElementById('tht-easy-earned-row');
    const eeBtn = document.getElementById('tht-easy-earned-toggle');
    if (eeRow) eeRow.style.display = S.mode === 'easy' ? '' : 'none';
    if (eeBtn) eeBtn.textContent = S.easyShowEarned ? 'Hide Earned' : 'Show Earned';

    const sortSel = document.getElementById('tht-sort-sel');
    if (sortSel) sortSel.value = S.sortBy;
  }

  function renderModeTabs() {
    document.querySelectorAll('.tht-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === S.mode);
    });
    document.getElementById('tht-sidebar').style.display =
      S.mode === 'category' ? 'block' : 'none';
  }

  function renderDiffPills() {
    const container = document.getElementById('tht-diff-pills');
    if (!container) return;
    if (S.mode !== 'easy') { container.innerHTML = ''; return; }

    const easyCount = S.allHonors.filter(h => !isEarned(h.id) && DB[h.id]).length;
    let html = `<button class="tht-dpill${S.easyFilter===0?' active':''}" data-d="0"
      style="color:#888;border-color:${S.easyFilter===0?'#666':'rgba(255,255,255,.07)'};">
      Guided (${easyCount})
    </button>`;
    for (let d = 1; d <= 5; d++) {
      const m = DIFF_META[d];
      const count = S.allHonors.filter(h => !isEarned(h.id) && getDiff(h) === d && DB[h.id]).length;
      if (!count) continue;
      html += `<button class="tht-dpill${S.easyFilter===d?' active':''}" data-d="${d}"
        style="color:${m.color};border-color:${S.easyFilter===d?m.color:'rgba(255,255,255,.07)'};">
        ${m.label} (${count})
      </button>`;
    }
    container.innerHTML = html;
  }

  function renderBrowsePills() {
    const container = document.getElementById('tht-browse-pills');
    if (!container) return;
    if (S.mode === 'easy') { container.innerHTML = ''; return; }
    const pills = [['all','All'],['earned','Earned'],['missing','Missing']];
    container.innerHTML = pills.map(([v,l]) =>
      `<button class="tht-bpill${S.browseFilter===v?' active':''}" data-f="${v}">${l}</button>`
    ).join('');
  }

  function renderSidebar() {
    const sb = document.getElementById('tht-sidebar');
    if (!sb || S.mode !== 'category') return;
    const cc = catCounts();
    const totE = S.allHonors.filter(h => isEarned(h.id)).length;
    let html = catRowHTML(-1, { name:'All', icon:'·' }, totE, S.allHonors.length);
    Object.keys(CATS)
      .sort((a,b) => CATS[a].name.localeCompare(CATS[b].name))
      .forEach(id => {
        const c = cc[id] || { earned:0, total:0 };
        if (!c.total) return;
        html += catRowHTML(+id, CATS[id], c.earned, c.total);
      });
    sb.innerHTML = html;
    sb.querySelectorAll('.tht-cat').forEach(row => {
      row.onclick = () => { S.activeCat = +row.dataset.c; renderSidebar(); renderMain(); };
    });
  }

  function catRowHTML(id, cat, earned, total) {
    const active = S.activeCat === id ? 'active' : '';
    return `<div class="tht-cat ${active}" data-c="${id}">
      <span class="ci">${cat.icon}</span>
      <span class="cl">${cat.name}</span>
      <span class="cc">${earned}/${total}</span>
    </div>`;
  }

  function renderStatus() {
    const el = document.getElementById('tht-status');
    if (!el) return;
    if (S.loading) {
      el.innerHTML = `<span class="tht-spin"></span><span class="tht-sdim" style="margin-left:6px;">Fetching…</span>`;
      return;
    }
    if (S.error) { el.innerHTML = `<span class="tht-se">${esc(S.error)}</span>`; return; }
    const {total, earned, missing} = stats();
    const pct = total ? Math.round(earned/total*100) : 0;
    const ago = S.lastRefresh ? `· ${timeAgo(S.lastRefresh)}` : '';
    el.innerHTML = `
      <span class="tht-sg"><strong>${earned} earned</strong></span>
      <span class="tht-sr"><strong>${missing} missing</strong></span>
      <span class="tht-sdim">${pct}% ${ago}</span>
    `;
  }

  function renderMain() {
    const main = document.getElementById('tht-main');
    if (!main) return;
    if (S.loading) { main.innerHTML = `<div class="tht-empty">Loading…</div>`; return; }
    if (!S.apiKey) {
      main.innerHTML = `<div class="tht-empty">
        Enter your Public API key above<br>and click <strong style="color:#f5a623">Sync</strong>.
      </div>`;
      return;
    }
    if (!S.allHonors.length) {
      main.innerHTML = `<div class="tht-empty">No data yet.<br>Click Sync to load your honors.</div>`;
      return;
    }
    const list = getList();
    if (!list.length) {
      main.innerHTML = `<div class="tht-empty">Nothing matches your filters.</div>`;
      return;
    }
    if (S.mode === 'easy') {
      renderEasyMode(main, list);
    } else {
      main.innerHTML = list.map((h, i) => cardHTML(h, Math.min(i, 10) * 30)).join('');
      wireCards(main);
    }
  }

  function renderEasyMode(main, list) {
    // Cards to actually display (already filtered)
    const groups = {};
    list.forEach(h => {
      const d = getDiff(h);
      if (!groups[d]) groups[d] = [];
      groups[d].push(h);
    });

    // Full counts per tier regardless of earned/hidden state
    const tierTotal  = {};
    const tierEarned = {};
    S.allHonors.filter(h => DB[h.id]).forEach(h => {
      const d = getDiff(h);
      tierTotal[d]  = (tierTotal[d]  || 0) + 1;
      tierEarned[d] = (tierEarned[d] || 0) + (isEarned(h.id) ? 1 : 0);
    });

    let html = '';
    let cardIdx = 0;
    Object.keys(tierTotal).sort((a,b) => +a - +b).forEach(d => {
      if (S.easyFilter > 0 && +d !== S.easyFilter) return;
      const m       = DIFF_META[+d];
      const total   = tierTotal[d]  || 0;
      const earned  = tierEarned[d] || 0;
      const toGet   = (tierTotal[+d] || 0) - (tierEarned[+d] || 0);
      const allDone = earned === total;
      const countLabel = allDone
        ? `✓ ${earned}/${total} complete`
        : `${toGet} to get`;
      html += `
        <div class="tht-tier-header" style="background:${m.bg};color:${m.color};${allDone ? 'opacity:.55;' : ''}">
          <span style="letter-spacing:1px;">${m.label}</span>
          <div class="tht-tier-line" style="background:${m.color};"></div>
          <span class="tht-tier-desc">${m.desc}</span>
          <span class="tht-tier-count">${countLabel}</span>
        </div>
      `;
      if (groups[d]) {
        html += groups[d].map(h => cardHTML(h, Math.min(cardIdx++, 10) * 30)).join('');
      }
    });
    main.innerHTML = html;
    wireCards(main);
  }

  /* ─────────────────────────────────────────────────────────────
     CARD HTML
  ───────────────────────────────────────────────────────────── */
  function cardHTML(h, animDelay = 0) {
    const earned  = isEarned(h.id);
    const isMan   = S.manual.has(h.id);
    const isHid   = S.hidden.has(h.id);
    const dbEntry = DB[h.id];
    const diff    = getDiff(h);
    const dm      = DIFF_META[diff] || DIFF_META[6];
    const rCol    = RARITY_COLOR[h.rarity] || '#374151';

    const diffCls = earned ? 'tht-de' : `tht-d${diff}`;
    const cls = `tht-card ${diffCls}${earned?' earned':''}${isHid?' dim':''}`;
    const delayStyle = '';
    const initial = (h.name || '?')[0].toUpperCase();

    let badges = '';
    if (earned && !isMan) badges += `<span class="tht-badge b-earned">Earned</span>`;
    if (isMan)            badges += `<span class="tht-badge b-manual">Marked Done</span>`;
    if (h.rarity)         badges += `<span class="tht-badge" style="background:rgba(255,255,255,.05);color:${rCol};">${h.rarity}</span>`;

    let acts = '';
    acts += isHid
      ? `<button class="tht-action" data-a="unhide" data-id="${h.id}">Show</button>`
      : `<button class="tht-action" data-a="hide"   data-id="${h.id}">Hide</button>`;
    if (!S.userHonors.has(h.id) && !isMan)
      acts += `<button class="tht-action" data-a="mark" data-id="${h.id}">Done</button>`;
    if (isMan)
      acts += `<button class="tht-action danger" data-a="unmark" data-id="${h.id}">Unmark</button>`;

    let guide = '';
    if (!earned && dbEntry?.g) {
      guide = `
        <button class="tht-guide-btn">▼ How to get this</button>
        <div class="tht-guide-body">
          <div class="tht-guide-inner">
            <span class="tht-diff-tag" style="background:${dm.bg};color:${dm.color};">
              ${dm.label} &nbsp;·&nbsp; ${dm.desc}
            </span>
            <div style="color:#555;">${esc(dbEntry.g)}</div>
          </div>
        </div>
      `;
    } else if (!earned) {
      guide = `<span style="font-size:10.5px;color:#252538;">No guide yet — check Torn forums.</span>`;
    }

    return `
      <div class="${cls}"${delayStyle}>
        <div class="tht-card-top">
          <img class="tht-img" data-src="https://www.torn.com/images/honors/small/${h.id}.png"
               data-initial="${initial}" data-cat="${h.type?.id ?? 0}" alt="" />
          <div class="tht-card-info">
            <div class="tht-hname">${esc(h.name || '?')}</div>
            <div class="tht-hdesc">${esc(h.description || '')}</div>
          </div>
          <div class="tht-card-actions">${acts}</div>
        </div>
        ${badges ? `<div class="tht-badges">${badges}</div>` : ''}
        ${guide}
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────────
     WIRE CARDS
  ───────────────────────────────────────────────────────────── */
  function wireCards(container) {
    container.querySelectorAll('[data-a]').forEach(btn => {
      btn.onclick = () => {
        const id = +btn.dataset.id;
        const a  = btn.dataset.a;
        if (a === 'hide')   { S.hidden.add(id);    saveState(); render(); }
        if (a === 'unhide') { S.hidden.delete(id); saveState(); render(); }
        if (a === 'mark')   { S.manual.add(id);    saveState(); render(); }
        if (a === 'unmark') { S.manual.delete(id); saveState(); render(); }
      };
    });

    container.querySelectorAll('.tht-guide-btn').forEach(btn => {
      btn.onclick = () => {
        const box = btn.nextElementSibling;
        if (!box) return;
        const open = box.classList.toggle('open');
        btn.textContent = open ? '▲ Close guide' : '▼ How to get this';
      };
    });

    container.querySelectorAll('.tht-img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.onerror = () => {
        const cat = CATS[+(img.dataset.cat || 0)];
        const fb = document.createElement('div');
        fb.className = 'tht-img-fb';
        fb.style.fontSize = '15px';
        fb.textContent = cat ? cat.icon : '🎖️';
        img.replaceWith(fb);
      };
    });
  }

  /* ─────────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────────── */
  function init() {
    loadState();
    injectStyles();
    buildUI();
    render();
    // Auto-refresh every 5 min while panel is open
    setInterval(() => { if (S.panelOpen && S.apiKey) doRefresh(); }, REFRESH_MS);
    if (S.panelOpen && S.apiKey) doRefresh();
    checkForUpdate();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();