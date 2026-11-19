/* Extras: first-time welcome, "Things I want to try", and an optional cycle tracker with mood-by-phase. */
const X = {
 en:{
  wTitle:'Hi Noviye 🌸', wIntro:'This is your little room, a quiet place to check in with yourself.',
  wPoints:['💗 One tap is enough. Pick how you feel, save, done.',
           '🔒 Only you can see it. Everything stays on this phone.',
           '📲 First, add it to your home screen so it opens like an app and your entries stay safe in one place. iPhone: Share → Add to Home Screen. Android: ⋮ menu → Add to Home screen.',
           '💾 Once in a while, save a backup from ⚙️ so nothing gets lost.'],
  wBtn:"Let's begin", wAgain:'How this works',
  triesTitle:'Things I want to try ✨', triesHint:'Little experiments to find what you love. No pressure.',
  triesPh:'A new recipe, a class, a place…', triesEmpty:'Add one small thing you are curious about, or tap an idea:',
  ideas:['A new café','Painting','A morning walk','Learning a new song','A new recipe'],
  howFelt:'How did it feel?', feels:['Loved it 💖','It was okay 🙂','Not for me'], tried:'Tried', loved:n=>`You've found ${n} ${n===1?'thing':'things'} you love 💖`,
  cycleTitle:'🌙 My cycle', optional:'optional', onToday:'On my period today', onDay:'On my period this day',
  cycleEmpty:'Tick the box on days you have your period. After a cycle, you will see your cycle day and a gentle guess for the next one.',
  cycleDay:n=>`Cycle day ${n}`, nextIn:n=>`next period in about ${n} ${n===1?'day':'days'}`, nextSoon:'next period could come any day now',
  tipPeriod:'Be gentle with your body today. Warmth, rest and water help.',
  tipPre:'Your period may be close. Feeling more tired or sensitive is normal. Extra rest and kindness are okay.',
  phaseTitle:'Mood through your cycle', phaseHint:'Average mood on days you checked in.',
  phases:{period:'During period', pre:'Week before', other:'Other days'},
  dipPre:'Your mood often dips in the week before your period. That is common. Plan a little extra care for those days.',
  dipPeriod:'Your mood is often lower during your period. Be extra gentle with yourself then.',
  notEnough:'Keep checking in. This fills in after a cycle or two.', periodLegend:'Period day', showCycle:'Show my cycle tracker'
 },
 am:{
  wTitle:'ሰላም ኖቪዬ 🌸', wIntro:'ይህ የአንቺ ትንሽ ክፍል ነው፤ ከራስሽ ጋር የምትቆዪበት ጸጥ ያለ ቦታ።',
  wPoints:['💗 አንድ ንክኪ በቂ ነው። ስሜትሽን ምረጪ፣ አስቀምጪ፣ ጨርሰሻል።',
           '🔒 አንቺ ብቻ ነው የምታዪው። ሁሉም በዚህ ስልክ ላይ ይቀመጣል።',
           '📲 እንደ አፕ እንዲከፈትና እንዲጠበቅ ወደ ስልክሽ መነሻ ገጽ ጨምሪው። iPhone፦ Share → Add to Home Screen። Android፦ ⋮ → Add to Home screen።',
           '💾 አልፎ አልፎ ምንም እንዳይጠፋ ከ⚙️ ምትኬ አስቀምጪ።'],
  wBtn:'እንጀምር', wAgain:'እንዴት እንደሚሰራ',
  triesTitle:'መሞከር የምፈልጋቸው ነገሮች ✨', triesHint:'የምትወጂውን ለማግኘት ትንንሽ ሙከራዎች። ጫና የለም።',
  triesPh:'አዲስ ምግብ፣ ትምህርት፣ ቦታ…', triesEmpty:'የሚያጓጓሽን አንድ ትንሽ ነገር ጨምሪ፣ ወይም ሀሳብ ምረጪ፦',
  ideas:['አዲስ ካፌ','ስዕል መሳል','የጠዋት የእግር ጉዞ','አዲስ መዝሙር መማር','አዲስ ምግብ መስራት'],
  howFelt:'እንዴት ነበር?', feels:['ወደድኩት 💖','ደህና ነበር 🙂','ለእኔ አይደለም'], tried:'ሞከርኩት', loved:n=>`የምትወጂያቸውን ${n} ነገሮች አግኝተሻል 💖`,
  cycleTitle:'🌙 የወር አበባ ዑደቴ', optional:'ከፈለግሽ', onToday:'ዛሬ የወር አበባዬ ላይ ነኝ', onDay:'በዚህ ቀን የወር አበባዬ ላይ ነበርኩ',
  cycleEmpty:'የወር አበባሽ ባለበት ቀን ሳጥኑን ምልክት አድርጊ። ከአንድ ዑደት በኋላ የዑደት ቀንሽንና የሚቀጥለውን ግምት ታያለሽ።',
  cycleDay:n=>`የዑደት ቀን ${n}`, nextIn:n=>`የሚቀጥለው በግምት በ${n} ቀናት ውስጥ`, nextSoon:'የሚቀጥለው በማንኛውም ቀን ሊመጣ ይችላል',
  tipPeriod:'ዛሬ ለሰውነትሽ ገር ሁኚ። ሙቀት፣ እረፍትና ውሃ ይረዳሉ።',
  tipPre:'የወር አበባሽ ቀርቦ ሊሆን ይችላል። ድካም ወይም ስሜታዊነት መሰማት የተለመደ ነው፤ ተጨማሪ እረፍትና ደግነት ይገባሻል።',
  phaseTitle:'ስሜትሽ በዑደትሽ ውስጥ', phaseHint:'በተመዘገብሽባቸው ቀናት አማካይ ስሜት።',
  phases:{period:'በወር አበባ ጊዜ', pre:'ከመምጣቱ በፊት ያለው ሳምንት', other:'ሌሎች ቀናት'},
  dipPre:'የወር አበባሽ ከመምጣቱ በፊት ባለው ሳምንት ስሜትሽ ብዙ ጊዜ ዝቅ ይላል። ይህ የተለመደ ነው፤ ለእነዚያ ቀናት ተጨማሪ እንክብካቤ አቅጂ።',
  dipPeriod:'በወር አበባሽ ጊዜ ስሜትሽ ብዙ ጊዜ ዝቅ ይላል። ያኔ ለራስሽ የበለጠ ገር ሁኚ።',
  notEnough:'መመዝገብሽን ቀጥዪ፤ ከአንድ ወይም ሁለት ዑደት በኋላ ይሞላል።', periodLegend:'የወር አበባ ቀን', showCycle:'የዑደት መከታተያውን አሳይ'
 }
};
const x_ = k => X[lang==='am'?'am':'en'][k];
const addDays = (k,n) => { const d = fromKey(k); d.setDate(d.getDate()+n); return keyOf(d); };
const daysBetween = (a,b) => Math.round((fromKey(b)-fromKey(a))/864e5);

/* ---------- first-time welcome ---------- */
const welcome = mk('div','sheet welcome'); welcome.hidden = true;
welcome.setAttribute('role','dialog'); welcome.setAttribute('aria-modal','true');
document.body.append(welcome);
function renderWelcome(){
 welcome.replaceChildren();
 const box = mk('div','wbox');
 const lb = mk('button','wlang','🌐'); lb.type = 'button'; lb.setAttribute('aria-label','Language'); lb.onclick = () => document.getElementById('langBtn').click();
 box.append(lb, mk('div','wmark','✳'), mk('h2',null,x_('wTitle')), mk('p','wintro',x_('wIntro')));
 const ul = mk('ul'); x_('wPoints').forEach(t=>ul.append(mk('li',null,t))); box.append(ul);
 const go = mk('button','btn',x_('wBtn')); go.type = 'button';
 go.onclick = () => { lsSet('welcomed','1'); welcome.hidden = true; document.body.style.overflow = ''; };
 box.append(go); welcome.append(box);
}
function openWelcome(){ renderWelcome(); welcome.hidden = false; document.body.style.overflow = 'hidden'; }
if(!lsGet('welcomed')) openWelcome();

/* ---------- things I want to try ---------- */
S.tries = null;
const triesCard = mk('div','card tries');
document.getElementById('tasks').prepend(triesCard);
function newId(){ return Date.now()+'-'+Math.random().toString(36).slice(2,6); }
async function addTry(title){
 title = title.trim(); if(!title) return;
 const it = {id:newId(), title, created:Date.now(), done:false, feel:null};
 if(await put('tries',it)){ S.tries.push(it); toast(); renderTries(); }
}
function renderTries(){
 triesCard.replaceChildren();
 triesCard.append(mk('h2',null,x_('triesTitle')), mk('p','hint',x_('triesHint')));
 const list = S.tries || [];
 const loved = list.filter(t=>t.feel===0).length;
 if(loved) triesCard.append(mk('p','tlove',x_('loved')(loved)));
 if(!list.length){
  triesCard.append(mk('p','hint',x_('triesEmpty')));
  const ideas = mk('div','chips'); x_('ideas').forEach(i=>{ const b = mk('button',null,'+ '+i); b.type='button'; b.onclick = () => addTry(i); ideas.append(b); });
  triesCard.append(ideas);
 }
 [...list].sort((a,b)=>(a.done-b.done)||(a.created-b.created)).forEach(it=>{
  const row = mk('div','trow');
  const label = mk('label','check'); const cb = mk('input'); cb.type = 'checkbox'; cb.checked = it.done;
  const span = mk('span',null,it.title); label.append(cb, span);
  const delBtn = mk('button','link',t('del')); delBtn.type = 'button';
  delBtn.onclick = async () => { if(await del('tries',it.id)){ S.tries = S.tries.filter(x=>x.id!==it.id); renderTries(); } };
  cb.onchange = async () => { const next = {...it, done:cb.checked, feel:cb.checked?it.feel:null, doneDate:cb.checked?TODAY:null};
   if(await put('tries',next)){ Object.assign(it,next); toast(); renderTries(); } else cb.checked = it.done; };
  row.append(label, delBtn);
  if(it.done){
   const f = mk('div','tfeel'); f.append(mk('small',null,x_('howFelt')));
   const chips = mk('div','chips');
   x_('feels').forEach((txt,i)=>{ const b = mk('button',it.feel===i?'on':'',txt); b.type='button';
    b.onclick = async () => { const next = {...it, feel:it.feel===i?null:i}; if(await put('tries',next)){ Object.assign(it,next); renderTries(); } };
    chips.append(b); });
   f.append(chips); row.append(f);
  }
  triesCard.append(row);
 });
 const form = mk('form','addrow'); const inp = mk('input'); inp.maxLength = 80; inp.placeholder = x_('triesPh'); inp.setAttribute('aria-label',x_('triesTitle'));
 const add = mk('button',null,'+'); add.setAttribute('aria-label','+');
 form.append(inp, add); form.onsubmit = e => { e.preventDefault(); addTry(inp.value); };
 triesCard.append(form);
}
const tasksBase = renderTasks;
renderTasks = function(){
 tasksBase();
 if(S.tries===null){ if(db){ S.tries = []; getAll('tries').then(r=>{ S.tries = r; renderTries(); }).catch(()=>{}); } else S.tries = []; }
 renderTries();
};

/* ---------- cycle tracker ---------- */
const cycleOn = () => lsGet('cycle-on') !== '0';
function periodStarts(){
 const ks = Object.keys(S.days).filter(k=>S.days[k].period).sort();
 return ks.filter(k=>!(S.days[addDays(k,-1)]||{}).period);
}
function cycleInfo(){
 const starts = periodStarts();
 const gaps = starts.slice(1).map((s,i)=>daysBetween(starts[i],s)).filter(g=>g>=21&&g<=45);
 const avg = gaps.length ? Math.round(gaps.reduce((a,b)=>a+b,0)/gaps.length) : 28;
 return {starts, avg};
}
function phaseOf(k, info){
 const {starts, avg} = info;
 if((S.days[k]||{}).period) return 'period';
 const prev = [...starts].reverse().find(s=>s<=k);
 const nextActual = starts.find(s=>s>k);
 const next = nextActual || (prev ? addDays(prev, avg) : null);
 if(next){ const d = daysBetween(k,next); if(d>0 && d<=7) return 'pre'; }
 return prev ? 'other' : null;
}
const cycleCard = mk('div','card cycle');
document.querySelector('.calm-card').after(cycleCard);
function renderCycle(){
 cycleCard.hidden = !cycleOn(); if(!cycleOn()) return;
 cycleCard.replaceChildren();
 const top = mk('div','cy-top'); top.append(mk('b',null,x_('cycleTitle')), mk('small',null,x_('optional')));
 const label = mk('label','check'); const cb = mk('input'); cb.type = 'checkbox'; cb.checked = !!day().period;
 label.append(cb, mk('span',null, VIEW===TODAY ? x_('onToday') : x_('onDay')));
 cb.onchange = async () => { const d = day(); d.period = cb.checked; if(!(await saveDay(d))) cb.checked = !cb.checked; renderCycle(); };
 cycleCard.append(top);
 const info = cycleInfo();
 const last = [...info.starts].reverse().find(s=>s<=VIEW);
 if(!last || daysBetween(last,VIEW)>60){ cycleCard.append(mk('p','hint',x_('cycleEmpty'))); }
 else{
  const cd = daysBetween(last,VIEW)+1, toNext = daysBetween(VIEW, addDays(last, info.avg));
  const line = x_('cycleDay')(cd) + (info.starts.length>=1 && !day().period ? ' · ' + (toNext>0 ? x_('nextIn')(toNext) : x_('nextSoon')) : '');
  cycleCard.append(mk('p','cy-status',line));
  const ph = phaseOf(VIEW, info);
  if(ph==='period') cycleCard.append(mk('p','hint',x_('tipPeriod')));
  if(ph==='pre') cycleCard.append(mk('p','hint',x_('tipPre')));
 }
 cycleCard.append(label);
}
const viewBase = renderView;
renderView = function(){ viewBase(); renderCycle(); };

/* mood by phase + period marks in the 4-week calendar */
function phaseCard(){
 const card = mk('div','card phasecard'); card.append(mk('h2',null,x_('phaseTitle')));
 const info = cycleInfo();
 const groups = {period:[], pre:[], other:[]};
 Object.values(S.days).filter(d=>d.checkin && d.mood).forEach(d=>{ const ph = phaseOf(d.date, info); if(ph) groups[ph].push(Number(d.mood)); });
 const avg = a => a.length ? a.reduce((s,v)=>s+v,0)/a.length : null;
 const filled = Object.values(groups).filter(a=>a.length>=2).length;
 if(!info.starts.length || filled<2){ card.append(mk('p','hint',x_('notEnough'))); return card; }
 card.append(mk('p','hint',x_('phaseHint')));
 ['period','pre','other'].forEach(ph=>{
  const a = avg(groups[ph]); const row = mk('div','aspect');
  const r = mk('div','row'); r.append(mk('b',null,x_('phases')[ph]), mk('span',null, a ? `${MOODS[Math.round(a)]} ${moodName(Math.round(a))}` : '–'));
  const bar = mk('div','bar'); const fill = mk('i'); fill.style.width = a ? (a/5*100)+'%' : '0'; fill.style.background = a ? MOOD_COLORS[Math.round(a)-1] : 'transparent';
  bar.append(fill); row.append(r, bar); card.append(row);
 });
 const aPre = avg(groups.pre), aPer = avg(groups.period), aOther = avg(groups.other);
 if(aPre!=null && aOther!=null && groups.pre.length>=2 && aOther-aPre>=0.5) card.append(mk('p','cy-insight',x_('dipPre')));
 else if(aPer!=null && aOther!=null && groups.period.length>=2 && aOther-aPer>=0.5) card.append(mk('p','cy-insight',x_('dipPeriod')));
 return card;
}
const progBase = renderProgress;
renderProgress = function(){
 progBase();
 if(!cycleOn()) return;
 const section = document.getElementById('progress');
 section.querySelectorAll('.mdot').forEach(b=>{ if((S.days[b.dataset.date]||{}).period){ b.classList.add('per'); b.setAttribute('aria-label', b.getAttribute('aria-label')+' · '+x_('periodLegend')); } });
 const legend = section.querySelector('.mlegend');
 if(legend && periodStarts().length){ const s = mk('span'); s.append(mk('i','perkey'), document.createTextNode(x_('periodLegend'))); legend.append(s); }
 const cal = section.querySelector('.month');
 const pc = phaseCard(); cal ? cal.after(pc) : section.append(pc);
};

/* settings: cycle toggle + show welcome again */
(function(){
 const settings = document.getElementById('settings'); if(!settings) return;
 const holder = mk('div','xsettings');
 const lab = mk('label','choice'); const cb = mk('input'); cb.type = 'checkbox'; cb.checked = cycleOn();
 const txt = mk('span'); lab.append(cb, txt);
 cb.onchange = () => { lsSet('cycle-on', cb.checked?'1':'0'); renderCycle(); };
 const again = mk('button','link'); again.type = 'button'; again.onclick = () => { document.getElementById('settingsPanel').hidden = true; openWelcome(); };
 holder.append(lab, again);
 const choices = document.getElementById('routineChoices'); choices.after(holder);
 const label = () => { txt.textContent = '🌙 ' + x_('showCycle'); again.textContent = x_('wAgain'); };
 label();
 const lb = applyLang; applyLang = function(){ lb(); label(); renderCycle(); if(!welcome.hidden) renderWelcome(); if(S.tries) renderTries(); };
})();
