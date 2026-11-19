/* Little reasons to come back: daily surprise, this-or-that + "All about me", flower garden,
   letter to future me, unlockable themes, morning/night mood, petals. No streaks, no guilt. */

const SURPRISES = [
 ['💗','A little compliment','You have a way of making people feel seen.'],
 ['🌍','Fun fact','Sea otters hold hands while they sleep so they don\'t drift apart.'],
 ['✨','Tiny dare','Send a voice note to someone you love, just to say hi.'],
 ['🎵','Song for today','Here Comes the Sun · The Beatles'],
 ['💗','A little compliment','Your laugh is someone\'s favourite sound.'],
 ['🌍','Fun fact','Cows have best friends and get stressed when they are apart.'],
 ['✨','Tiny dare','Wear your favourite perfume today, for no reason at all.'],
 ['🎵','Song for today','Lovely Day · Bill Withers'],
 ['💗','A little compliment','You are braver than you give yourself credit for.'],
 ['🌍','Fun fact','Coffee was first discovered in Ethiopia. Legend says a goat herder named Kaldi noticed his goats dancing.'],
 ['✨','Tiny dare','Dance to one whole song in your room.'],
 ['🎵','Song for today','Tizita · Mulatu Astatke'],
 ['💗','A little compliment','The world is a little softer with you in it.'],
 ['🌍','Fun fact','Honey never spoils. Archaeologists found 3,000-year-old honey that was still good to eat.'],
 ['✨','Tiny dare','Write one thing you love about yourself on a sticky note and put it on your mirror.'],
 ['🎵','Song for today','Unwritten · Natasha Bedingfield'],
 ['💗','A little compliment','You notice things other people miss. That is a gift.'],
 ['🌍','Fun fact','A group of flamingos is called a "flamboyance".'],
 ['✨','Tiny dare','Take a photo of something beautiful today.'],
 ['🎵','Song for today','Rise Up · Andra Day'],
 ['💗','A little compliment','Your kindness is not weakness. It is strength.'],
 ['🌍','Fun fact','Butterflies taste with their feet.'],
 ['✨','Tiny dare','Go outside and look at the sky for one full minute.'],
 ['🎵','Song for today','Count on Me · Bruno Mars'],
 ['💗','A little compliment','Look how far you have come. Be proud of yourself today.'],
 ['🌍','Fun fact','A 20-second hug releases oxytocin, the "cuddle hormone".'],
 ['✨','Tiny dare','Compliment someone today, even a stranger.'],
 ['🎵','Song for today','Golden Hour · JVKE'],
 ['💗','A little compliment','Someone smiled today because of you.'],
 ['🌍','Fun fact','Bananas are berries, but strawberries are not.'],
 ['✨','Tiny dare','Make your favourite drink and enjoy it slowly, phone down.'],
 ['🎵','Song for today','Good as Hell · Lizzo']
];
const THIS_OR_THAT = [
 ['☕ Tea','☕ Coffee'],['🌅 Sunrise','🌇 Sunset'],['🏖️ Beach','⛰️ Mountains'],['📚 Books','🎬 Movies'],['🌧️ Rain','☀️ Sunshine'],
 ['🍫 Sweet','🥨 Salty'],['🐶 Dogs','🐱 Cats'],['🌞 Morning person','🌙 Night owl'],['🏠 Stay in','🎉 Go out'],['💬 Text','📞 Call'],
 ['🌸 Spring','❄️ Winter'],['🍕 Pizza','🫓 Injera'],['💐 Flowers','🍫 Chocolate'],['💃 Dancing','🎤 Singing'],['🏙️ City','🌾 Countryside'],
 ['💗 Pink','💜 Purple'],['🎨 Painting','✍️ Writing'],['📋 Plan everything','🌊 Go with the flow'],['🧥 Hoodie','👗 Dress'],['🪟 Window seat','🚶 Aisle seat'],
 ['🍦 Ice cream','🎂 Cake'],['🎧 Music','🎙️ Podcasts'],['🥳 Big party','🍽️ Small dinner'],['👟 Sneakers','👠 Heels'],['😂 Comedy','💕 Romance'],
 ['⭐ Stars','🌙 Moon'],['☕ Coffee shop','📖 Bookstore'],['🛁 Bath','🚿 Shower'],['📸 Taking photos','🖼️ Being in them'],['🗺️ Travel far','🏡 Explore nearby']
];
const THEMES = [
 {id:'plum', name:'Plum', need:0, sw:'#76536d'},
 {id:'lavender', name:'Lavender', need:5, sw:'#7b62a8'},
 {id:'peach', name:'Peach', need:10, sw:'#c0664a'},
 {id:'sage', name:'Sage', need:20, sw:'#5f7f63'}
];
const FLOWERS = {1:'🌾',2:'🪻',3:'🌼',4:'🌷',5:'🌸'};

const dayIdx = k => numOf(k);
const checkins = () => Object.values(S.days).filter(d=>d.checkin);
const fmtDay = (k,o={weekday:'short',day:'numeric',month:'short'}) => fromKey(k).toLocaleDateString(LOC(),o);

function pickSurprise(k){ return SURPRISES[(dayIdx(k)*7) % SURPRISES.length]; }
function themeOpen(t){ return checkins().length>=t.need; }

/* ---------- petals ---------- */
function petals(){
 if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const box = mk('div','petals'); box.setAttribute('aria-hidden','true');
 for(let i=0;i<16;i++){
  const p = mk('span',null,['🌸','🌷','✿','💗'][i%4]);
  p.style.left = Math.random()*100+'vw'; p.style.animationDuration = (2.2+Math.random()*1.6)+'s';
  p.style.animationDelay = (Math.random()*0.6)+'s'; p.style.fontSize = (14+Math.random()*14)+'px';
  box.append(p);
 }
 document.body.append(box); setTimeout(()=>box.remove(), 4500);
}

/* ---------- themes ---------- */
function applyPalette(){ document.documentElement.dataset.palette = lsGet('palette') || 'plum'; }
applyPalette();
function unlockedThemes(){ return THEMES.filter(t=>themeOpen(t)).map(t=>t.id); }
function checkNewThemes(announce){
 const seen = (lsGet('themes-seen')||'plum').split(',');
 const fresh = unlockedThemes().filter(id=>!seen.includes(id));
 if(!fresh.length){ renderThemes(); return; }
 lsSet('themes-seen', [...seen, ...fresh].join(','));
 if(announce){ const t = THEMES.find(x=>x.id===fresh[fresh.length-1]); setTimeout(()=>{ toast(`New theme unlocked: ${t.name} 🎨 (in ⚙️)`); }, 1600); }
 renderThemes();
}
const themeBox = mk('div','xsettings themes');
function renderThemes(){
 themeBox.replaceChildren(mk('h3',null,'🎨 Themes'));
 const n = checkins().length, row = mk('div','swatches'), cur = lsGet('palette') || 'plum';
 THEMES.forEach(t=>{
  const open = themeOpen(t), b = mk('button','swatch'+(cur===t.id?' on':'')+(open?'':' locked')); b.type = 'button';
  const dot = mk('i'); dot.style.background = t.sw; b.append(dot, mk('span',null,t.name), mk('small',null, open ? (cur===t.id?'In use':'') : `🔒 ${t.need} check-ins`));
  b.disabled = !open; b.onclick = () => { lsSet('palette', t.id); applyPalette(); renderThemes(); };
  row.append(b);
 });
 themeBox.append(row);
}

/* ---------- morning / day / evening / night ---------- */
function partOfDay(){ const h = new Date().getHours(); return h>=5&&h<12 ? 'morning' : h<17 ? 'day' : h<22 ? 'evening' : 'night'; }
const TOD = {
 morning:{eyebrow:'Good morning, sunshine ☀️', title:'A fresh page.', intro:'Start soft today. One tap is enough.'},
 night:{eyebrow:'Late night 🌙', title:'Rest your mind.', intro:'Put the day down here, then let it go until tomorrow.'}
};
function applyTimeOfDay(){
 const p = partOfDay(); document.body.dataset.tod = p;
 const a = document.querySelector('.arrival'); if(!a || !TOD[p]) return;
 const [eb, h2, intro] = [a.querySelector('.eyebrow'), a.querySelector('h2'), a.querySelector('p:last-child')];
 if(eb) eb.textContent = TOD[p].eyebrow; if(h2) h2.textContent = TOD[p].title; if(intro) intro.textContent = TOD[p].intro;
 const mark = a.querySelector('.arrival-mark'); if(mark) mark.textContent = p==='morning' ? '☀︎' : p==='night' ? '☾' : '✳';
}

/* ---------- daily surprise + this or that (one small card on Today) ---------- */
const little = mk('div','card little');
(document.querySelector('.lookrow') || document.querySelector('.quick-card')).after(little);
function renderLittle(){
 little.replaceChildren();
 const d = S.days[VIEW] || {}, i = dayIdx(VIEW);
 const sp = pickSurprise(VIEW);
 const gift = mk('div','gift');
 if(d.surprise){
  const lab = mk('small',null,`${sp[0]} ${sp[1]}`), txt = mk('p','serif',sp[2]);
  gift.append(lab, txt);
  if(sp[1]==='Song for today'){ const a = mk('a','link','Listen on YouTube ↗'); a.href = 'https://www.youtube.com/results?search_query='+encodeURIComponent(sp[3] || sp[2].replace(' · ',' ')); a.target = '_blank'; a.rel = 'noopener'; gift.append(a); }
 } else {
  const b = mk('button','giftbtn'); b.type = 'button';
  b.append(mk('span','gbox','🎁'), mk('span',null, VIEW===TODAY ? "Open today's surprise" : 'Open this day\'s surprise'));
  b.onclick = async () => { const dd = day(); dd.surprise = true; await saveDay(dd, true); b.classList.add('pop'); setTimeout(renderLittle, 280); };
  gift.append(b);
 }
 const pair = THIS_OR_THAT[i % THIS_OR_THAT.length];
 const tot = mk('div','tot'); tot.append(mk('small',null,'This or that?'));
 const row = mk('div','totrow');
 pair.forEach((opt,j)=>{
  const b = mk('button', d.tot && d.tot.q===i%THIS_OR_THAT.length && d.tot.a===j ? 'on' : '', opt); b.type = 'button';
  b.onclick = async () => { const dd = day(); dd.tot = {q:i%THIS_OR_THAT.length, a:j}; await saveDay(dd, true); renderLittle(); };
  row.append(b); if(j===0) row.append(mk('span','or','or'));
 });
 tot.append(row);
 little.append(gift, tot);
}

/* ---------- letter to future me ---------- */
const futureCard = mk('div','card future');
function sealedLetters(){ return (S.notes||[]).filter(n=>n.future).sort((a,b)=>a.unlock.localeCompare(b.unlock)); }
function renderFuture(){
 futureCard.replaceChildren(mk('h2',null,'💌 Letter to future me'), mk('p','hint','Write to yourself. It stays sealed until the day you choose.'));
 const ta = mk('textarea'); ta.placeholder = 'Dear future me…'; ta.maxLength = 3000; ta.setAttribute('aria-label','Letter to future me');
 let when = 30;
 const chips = mk('div','chips'); const opts = [[7,'In 1 week'],[30,'In 1 month'],[90,'In 3 months'],[182,'In 6 months']];
 opts.forEach(([n,l])=>{ const b = mk('button', n===when?'on':'', l); b.type='button'; b.onclick = () => { when = n; chips.querySelectorAll('button').forEach(x=>x.classList.toggle('on', x===b)); }; chips.append(b); });
 const seal = mk('button','btn','Seal my letter 🔒'); seal.type = 'button';
 seal.onclick = async () => {
  const text = ta.value.trim(); if(!text) return;
  const unlock = addDays(TODAY, when);
  const n = {id:Date.now()+'-'+Math.random().toString(36).slice(2,6), date:TODAY, created:Date.now(), title:'💌 From past you · written '+fmtDay(TODAY,{day:'numeric',month:'long',year:'numeric'}), text, audio:null, future:true, unlock, read:false};
  if(await put('notes', n)){ S.notes.push(n); toast('Sealed until '+fmtDay(unlock,{day:'numeric',month:'long'})+' 💌'); petals(); renderFuture(); }
 };
 futureCard.append(ta, chips, seal);
 const locked = sealedLetters().filter(n=>n.unlock>TODAY);
 if(locked.length){
  const ul = mk('div','sealed');
  locked.forEach(n=>{ const left = daysBetween(TODAY, n.unlock); ul.append(mk('p',null,`🔒 Sealed · opens ${fmtDay(n.unlock,{day:'numeric',month:'long'})} (in ${left} ${left===1?'day':'days'})`)); });
  futureCard.append(ul);
 }
}
// Locked letters never appear in the journal list; opened ones do.
const journalBase = renderJournal;
renderJournal = function(){
 const all = S.notes; S.notes = all.filter(n=>!n.future || n.unlock<=TODAY);
 try{ journalBase(); } finally { S.notes = all; }
 const composer = document.getElementById('nSave') && document.getElementById('nSave').closest('.card');
 if(composer && futureCard.previousElementSibling!==composer) composer.after(futureCard);
 renderFuture();
 // opening the journal counts as reading any letters that have arrived
 sealedLetters().filter(n=>n.unlock<=TODAY && !n.read).forEach(n=>{ n.read = true; put('notes', n); });
 renderBanner();
};
const banner = mk('button','card lbanner'); banner.type = 'button'; banner.hidden = true;
document.getElementById('today').prepend(banner);
function renderBanner(){
 const ready = sealedLetters().filter(n=>n.unlock<=TODAY && !n.read);
 banner.hidden = !ready.length; if(!ready.length) return;
 banner.replaceChildren(mk('span','lbicon','💌'), mk('span',null, ready.length===1 ? 'You have a letter from past you. Tap to open it.' : `You have ${ready.length} letters from past you. Tap to open them.`));
}
banner.onclick = () => { petals(); document.querySelector('[data-tab="journal"]').click(); setTimeout(()=>{ const e = [...document.querySelectorAll('#entries .card')].find(c=>c.textContent.includes('From past you')); if(e) e.scrollIntoView({behavior:'smooth', block:'center'}); }, 150); };

/* ---------- garden + all about me (My month) ---------- */
function gardenCard(){
 const list = checkins().sort((a,b)=>a.date.localeCompare(b.date));
 const card = mk('div','card garden');
 card.append(mk('h2',null,'Your garden 🌷'));
 card.append(mk('p','hint', list.length ? `${list.length} ${list.length===1?'flower':'flowers'} so far. Every check-in plants one, and nothing here ever wilts.` : 'Every check-in plants a flower here. Nothing ever wilts.'));
 const bed = mk('div','bed');
 list.forEach((d,i)=>{
  const f = mk('span','flower', (i+1)%10===0 ? '🌹' : (FLOWERS[d.mood]||'🌼'));
  f.title = fmtDay(d.date); f.style.animationDelay = (i%7)*0.4+'s';
  bed.append(f);
 });
 if(!list.length) bed.append(mk('span','flower seed','🌱'));
 card.append(bed);
 return card;
}
function aboutCard(){
 const card = mk('div','card about'); card.append(mk('h2',null,'All about me 💗'));
 const answers = {};
 Object.values(S.days).filter(d=>d.tot).sort((a,b)=>a.date.localeCompare(b.date)).forEach(d=>{ answers[d.tot.q] = d.tot.a; });
 const plain = t => t.replace(/^\S+\s/,'').toLowerCase();
 const picks = Object.entries(answers).map(([q,a])=>THIS_OR_THAT[q] ? `${THIS_OR_THAT[q][a]} over ${plain(THIS_OR_THAT[q][1-a])}` : null).filter(Boolean);
 if(!picks.length){ card.append(mk('p','hint','Answer the daily "this or that" on Today, and your answers collect here.')); return card; }
 card.append(mk('p','hint',`${picks.length} little things about you, chosen by you.`));
 const chips = mk('div','aboutchips'); picks.forEach(p=>chips.append(mk('span',null,p))); card.append(chips);
 return card;
}
const monthBase = renderProgress;
renderProgress = function(){
 monthBase();
 const sec = document.getElementById('progress');
 sec.prepend(gardenCard());
 const jar = sec.querySelector('.jar'); const ab = aboutCard(); jar ? jar.after(ab) : sec.append(ab);
};

/* ---------- wiring ---------- */
document.getElementById('save').addEventListener('click', () => {
 setTimeout(() => { if(!document.getElementById('done').classList.contains('hidden') && (S.days[VIEW]||{}).checkin){ petals(); checkNewThemes(true); } }, 700);
});
const viewBase2 = renderView; renderView = function(){ viewBase2(); renderLittle(); renderBanner(); };
const langBase2 = applyLang; applyLang = function(){ langBase2(); applyTimeOfDay(); renderLittle(); renderBanner(); };
(function(){ const s = document.getElementById('settings'); if(!s) return; document.getElementById('settingsBtn').addEventListener('click', renderThemes); const pin = s.querySelector('.pinset'); pin ? pin.before(themeBox) : s.append(themeBox); renderThemes(); })();
setInterval(()=>applyTimeOfDay(), 5*60*1000);
// existing unlocks shouldn't announce themselves on first load
setTimeout(()=>checkNewThemes(false), 1500);
