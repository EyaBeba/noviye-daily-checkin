/* Fitted to Noviye: she prays and works rotating 6-hour shifts (6 on, 6 off), with no fixed day off.
   A short welcome quiz sets her colour, music taste and how she likes to unwind after a shift. */

/* prayer is part of her day */
const CARE = ['restBreak','properMeal','sunlight','called','metime'];
if(!lsGet('gentle-routines')){
 selectedRoutines = ['prayAM','prayPM',...CARE];
 lsSet('gentle-routines', JSON.stringify(selectedRoutines)); lsSet('care-added','1');
} else if(!lsGet('care-added')){
 selectedRoutines = [...new Set([...selectedRoutines, ...CARE])];
 lsSet('gentle-routines', JSON.stringify(selectedRoutines)); lsSet('care-added','1');
}

/* ---------- her answers ---------- */
const QUIZ = [
 {key:'colour', q:'Pick your favourite colours 🎨', hint:'Choose as many as you like.', multi:true, opts:['💗 Pink','💜 Purple','🍑 Peach','🌿 Green','💙 Blue','❤️ Red','💛 Yellow','🖤 Black & white']},
 {key:'music', q:'What music do you love? 🎵', hint:'Choose as many as you like.', multi:true, opts:['🎤 English songs','🇪🇹 Ethiopian songs','🌍 Afrobeats']},
 {key:'unwind', q:'After a long shift, what helps you most? 🌙', opts:['🍵 A warm cup of tea','🎧 Music','📞 Talking to someone','😴 Just sleep']}
];
const COLOUR_THEME = ['rose','lavender','peach','sage','ocean','berry','honey','mono'];
const COLOUR_NAME = ['pink','purple','peach','green','blue','red','yellow','black & white'];
const colours = () => { const c = answers().colour; return c==null ? [] : Array.isArray(c) ? c : [c]; };
const answers = () => { try{ return JSON.parse(lsGet('quiz')||'{}'); }catch(e){ return {}; } };

/* a pinker theme, so "Pink" has its own */
THEMES.push({id:'rose', name:'Rose', need:15, sw:'#c25d84'},{id:'ocean', name:'Ocean', need:12, sw:'#3f6f96'},{id:'berry', name:'Berry', need:18, sw:'#a33a4f'},{id:'honey', name:'Honey', need:25, sw:'#a8741a'},{id:'mono', name:'Mono', need:30, sw:'#2f2b30'});
const themeOpenBase = themeOpen;
themeOpen = t => themeOpenBase(t) || colours().some(i=>COLOUR_THEME[i]===t.id);

function showQuiz(done){
 let i = 0; const picked = answers();
 const step = () => {
  welcome.replaceChildren();
  const box = mk('div','wbox quiz'), q = QUIZ[i];
  box.append(mk('small','qstep',`${i+1} of ${QUIZ.length} · so this space feels like yours`), mk('h2',null,q.q));
  if(q.hint) box.append(mk('p','hint',q.hint));
  const opts = mk('div','qopts'+(q.multi?' multi':''));
  const next = () => { i++; i<QUIZ.length ? step() : finish(); };
  let chosen = q.multi ? (Array.isArray(picked[q.key]) ? [...picked[q.key]] : picked[q.key]!=null ? [picked[q.key]] : []) : null;
  q.opts.forEach((o,j)=>{
   const on = q.multi ? chosen.includes(j) : picked[q.key]===j;
   const b = mk('button', on?'on':'', o); b.type = 'button';
   b.onclick = () => {
    if(q.multi){ chosen = chosen.includes(j) ? chosen.filter(x=>x!==j) : [...chosen, j]; b.classList.toggle('on'); go.disabled = !chosen.length; return; }
    picked[q.key] = j; lsSet('quiz', JSON.stringify(picked)); next();
   };
   opts.append(b); });
  const go = mk('button','btn','Next'); go.type = 'button';
  if(q.multi){ go.disabled = !chosen.length; go.onclick = () => { picked[q.key] = chosen; lsSet('quiz', JSON.stringify(picked)); next(); }; }
  const skip = mk('button','link','Skip'); skip.type = 'button'; skip.onclick = next;
  box.append(opts); if(q.multi) box.append(go); box.append(skip); welcome.append(box);
 };
 const finish = () => {
  lsSet('quiz-done','1');
  const a = answers();
  const cs = colours();
  if(cs.length){ const th = COLOUR_THEME[cs[0]]; lsSet('palette', th);
   const seen = (lsGet('themes-seen')||'plum').split(','); cs.forEach(i=>{ if(!seen.includes(COLOUR_THEME[i])) seen.push(COLOUR_THEME[i]); }); lsSet('themes-seen', seen.join(','));
   applyPalette(); renderThemes(); }
  done(); petals(); renderLittle(); applyTimeOfDay();
 };
 step();
}
/* run the quiz right after "Let's begin" the first time */
const renderWelcomeBase = renderWelcome;
renderWelcome = function(){
 renderWelcomeBase();
 const go = welcome.querySelector('.btn'); if(!go) return;
 const close = go.onclick;
 go.onclick = () => { if(lsGet('quiz-done')) return close(); showQuiz(close); };
};
if(!welcome.hidden) renderWelcome();

/* ---------- her days: no fixed day off, so she marks it herself ---------- */
const isOff = k => !!(S.days[k]||{}).off;

/* bigger dares on days off; songs by taste */
const BIG_DARES = [
 'Visit a place you have never been, even just a new café.',
 'Cook something you have never cooked before.',
 'Spend one hour with no phone and notice how it feels.',
 'Take yourself on a little date: a walk and a treat.',
 'Call someone you have not talked to in a while.',
 'Rearrange one corner of your room so it feels new.',
 'Pick one thing from your "want to try" list and do it today.'
];
const SONGS = {
 en:[['Here Comes the Sun · The Beatles'],['Lovely Day · Bill Withers'],['Unwritten · Natasha Bedingfield'],['Rise Up · Andra Day'],['Count on Me · Bruno Mars'],['Golden Hour · JVKE'],['Three Little Birds · Bob Marley']],
 et:[ // well-loved Ethiopian artists; the link searches the artist so she picks the song
  ['Listen to Teddy Afro today 🎶','Teddy Afro'],
  ['Listen to Aster Aweke today 🎶','Aster Aweke'],
  ['Listen to Mahmoud Ahmed today 🎶','Mahmoud Ahmed'],
  ['Listen to Mulatu Astatke today 🎶','Mulatu Astatke']
 ],
 af:[ // Afrobeats
  ['Listen to Burna Boy today 🎶','Burna Boy'],['Listen to Wizkid today 🎶','Wizkid'],['Listen to Tems today 🎶','Tems'],
  ['Listen to Rema today 🎶','Rema'],['Listen to Davido today 🎶','Davido'],['Listen to Ayra Starr today 🎶','Ayra Starr']
 ]
};
// older answers were a single choice (2 meant "both English & Ethiopian")
const musicPicks = () => { const m = answers().music; if(m==null) return []; if(Array.isArray(m)) return m; return m===2 ? [0,1] : [m]; };
const surpriseBase = pickSurprise;
pickSurprise = function(k){
 const sp = surpriseBase(k), n = dayIdx(k);
 if(sp[1]==='Tiny dare' && isOff(k)) return ['🌸','Day-off dare', BIG_DARES[n % BIG_DARES.length]];
 if(sp[1]==='Song for today'){
  const picks = musicPicks().length ? musicPicks() : [0,1,2], lists = picks.map(i=>[SONGS.en,SONGS.et,SONGS.af][i]).filter(Boolean);
  const k = Math.floor(n/4), list = lists[k % lists.length];   // take turns between her styles
  const song = list[Math.floor(k/lists.length) % list.length]; return ['🎵','Song for today', song[0], song[1]];
 }
 return sp;
};

/* ---------- greetings that follow her shift ----------
   Her shifts move around, so she taps "On shift" or "Resting". It lasts 6 hours;
   after an "On shift" tap runs out, the next 6 hours are treated as rest. */
const UNWIND = ['Maybe a warm cup of tea first? 🍵','Maybe put on a song you love 🎧','Maybe call someone you love 📞','Then straight to sleep. You deserve the rest 😴'];
const SIX_H = 6*3600*1000;
function shiftState(){
 let st; try{ st = JSON.parse(lsGet('shift')||'null'); }catch(e){ st = null; }
 if(!st) return null;
 const age = Date.now() - st.at;
 if(st.state==='work') return age < SIX_H ? 'work' : age < 2*SIX_H ? 'rest' : null;
 if(st.state==='rest') return age < SIX_H ? 'rest' : null;
 return null;
}
function herMode(){
 if(isOff(TODAY)) return 'off';
 const sh = shiftState(); if(sh) return sh;
 const h = new Date().getHours();
 return h>=5&&h<12 ? 'morning' : h<18 ? 'day' : 'evening';
}
const HER_TOD = {
 work:{eyebrow:'On shift 💼', title:'One tap is enough.', intro:'Check in quickly now, or come back when you rest.', tint:''},
 rest:{eyebrow:'Rest time 🌙', title:'Rest your mind.', intro:'Your shift is done. Put it down here and let it go for now.', tint:'night'},
 off:{eyebrow:"It's your day off 🌸", title:'Today is yours.', intro:'Rest, wander, try something new. Nothing is required.', tint:'off'},
 morning:{eyebrow:'Good morning ☀️', title:'A fresh page.', intro:'Start soft. One tap is enough.', tint:'morning'},
 day:{eyebrow:'Hello 🌸', title:'Come as you are.', intro:'One tap is enough. Everything else is optional.', tint:''},
 evening:{eyebrow:'Good evening 🌙', title:'Rest your mind.', intro:'Put the day down here, then let it go until tomorrow.', tint:'night'}
};
const chips = mk('div','shiftchips');
const chipWork = mk('button','offchip'), chipRest = mk('button','offchip'), chipOff = mk('button','offchip');
[chipWork,chipRest,chipOff].forEach(b=>{ b.type = 'button'; chips.append(b); });
const nudge = mk('p','nudge');
applyTimeOfDay = function(){
 const m = herMode(), c = HER_TOD[m]; document.body.dataset.tod = c.tint;
 const a = document.querySelector('.arrival'); if(!a) return;
 const eb = a.querySelector('.eyebrow'), h2 = a.querySelector('h2'), intro = a.querySelector('h2 + p');
 if(eb) eb.textContent = c.eyebrow; if(h2) h2.textContent = c.title;
 if(intro) intro.textContent = c.intro + ((m==='rest'||m==='evening') && answers().unwind!=null ? ' ' + UNWIND[answers().unwind] : '');
 const mark = a.querySelector('.arrival-mark'); if(mark) mark.textContent = m==='morning' ? '☀︎' : (m==='rest'||m==='evening') ? '☾' : m==='off' ? '✿' : '✳';
 const sh = shiftState(), off = isOff(TODAY);
 chips.hidden = VIEW!==TODAY;
 chipWork.textContent = sh==='work' && !off ? '💼 On shift ✓' : '💼 On shift'; chipWork.classList.toggle('on', sh==='work' && !off);
 chipRest.textContent = sh==='rest' && !off ? '🌙 Resting ✓' : '🌙 Resting'; chipRest.classList.toggle('on', sh==='rest' && !off);
 chipOff.textContent = off ? '🌸 Day off ✓' : '🌸 Day off'; chipOff.classList.toggle('on', off);
 if(!chips.isConnected) a.append(chips);
 nudge.hidden = m!=='off';
 if(m==='off'){
  const open = (S.tries||[]).filter(t=>!t.done);
  nudge.textContent = open.length ? `✨ From your want-to-try list: ${open[dayIdx(TODAY)%open.length].title}` : '✨ Something new to try today? Add ideas in Tasks.';
  if(!nudge.isConnected) a.append(nudge);
 }
};
const setShift = async state => {
 const cur = shiftState();
 lsSet('shift', cur===state ? 'null' : JSON.stringify({state, at:Date.now()}));
 const d = day(TODAY); if(d.off){ d.off = false; await saveDay(d, true); }
 applyTimeOfDay(); renderLittle();
};
chipWork.onclick = () => setShift('work');
chipRest.onclick = () => setShift('rest');
chipOff.onclick = async () => { const d = day(TODAY); d.off = !d.off; await saveDay(d, true); applyTimeOfDay(); renderLittle(); };
setInterval(()=>applyTimeOfDay(), 60*1000);

/* ---------- her answers in "All about me" + change them in settings ---------- */
const aboutBase = aboutCard;
aboutCard = function(){
 const card = aboutBase(), a = answers();
 const ABOUT = {
  unwind:['🍵 Unwinds with a warm cup of tea','🎧 Unwinds with music after a shift','📞 Unwinds by talking to someone','😴 Unwinds with a good sleep']
 };
 const cs = colours();
 const colourChip = cs.length ? `${QUIZ[0].opts[cs[0]].split(' ')[0]} Favourite ${cs.length>1?'colours':'colour'}: ${cs.length>1 ? cs.slice(0,-1).map(i=>COLOUR_NAME[i]).join(', ')+' & '+COLOUR_NAME[cs[cs.length-1]] : COLOUR_NAME[cs[0]]}` : null;
 const MUSIC = ['English songs','Ethiopian music','Afrobeats'], mp = musicPicks();
 const musicChip = mp.length ? `🎶 Loves ${mp.length>1 ? mp.slice(0,-1).map(i=>MUSIC[i]).join(', ')+' & '+MUSIC[mp[mp.length-1]] : MUSIC[mp[0]]}` : null;
 const mine = [colourChip, musicChip, a.unwind!=null ? ABOUT.unwind[a.unwind] : null].filter(Boolean);
 if(!mine.length) return card;
 let chips = card.querySelector('.aboutchips');
 if(!chips){ card.querySelector('.hint')?.remove(); chips = mk('div','aboutchips'); card.append(chips); }
 mine.reverse().forEach(t=>chips.prepend(mk('span','mine',t)));
 return card;
};
(function(){
 const s = document.getElementById('settings'); if(!s) return;
 const b = mk('button','link','✏️ Change my colours, music and unwind answers'); b.type = 'button';
 b.onclick = () => { document.getElementById('settingsPanel').hidden = true; welcome.hidden = false; document.body.style.overflow = 'hidden'; showQuiz(()=>{ welcome.hidden = true; document.body.style.overflow = ''; }); };
 const holder = s.querySelector('.xsettings'); holder ? holder.append(b) : s.append(b);
})();
