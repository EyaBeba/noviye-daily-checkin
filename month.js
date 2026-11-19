/* Four-week look back: mood calendar, what helps, good-things jar, monthly letter.
   Reads the same saved entries; adds nothing new to storage. */
const M = {
 en:{
  calTitle:'Your last 4 weeks', calHint:'Each dot is a day you checked in. Tap one to see it.',
  calEmpty:'Check in a few times and your month will start to show here.', noEntry:'No entry',
  mostFelt:m=>`Most often you felt: ${m}`, helps:l=>`Your lighter days often had: ${l}`, neededMost:n=>`What you needed most: ${n}`,
  jarTitle:'Good-things jar ✨', jarHint:'Little good moments you wrote down.', jarBtn:'Pick one for me',
  jarEmpty:'When you write a small good thing in your check-in, it lands here.', jarCount:n=>`${n} good ${n===1?'thing':'things'} saved`,
  letterTitle:'A letter for your month 💌', letterSoon:n=>`Your first monthly letter arrives in ${n} ${n===1?'day':'days'}.`,
  dear:'Dear Noviye,', lDays:n=>`In the last 4 weeks you made space for yourself on ${n} ${n===1?'day':'days'}.`,
  lMood:m=>`The feeling that showed up most was “${m}”.`, lNeed:n=>`When you needed something, it was most often: ${n}.`,
  lHelps:l=>`Your lighter days often had ${l}. Maybe keep a little more of that.`, lGood:'A few good things you noticed:',
  lClose:'Every day you showed up counts, and so do the days you rested. Be gentle with yourself next month too. 💕', and:' and '
 },
 am:{
  calTitle:'ያለፉት 4 ሳምንታት', calHint:'እያንዳንዱ ነጥብ የተመዘገብሽበት ቀን ነው። ለማየት ንኪው።',
  calEmpty:'ጥቂት ጊዜ ስትመዘገቢ ወርሽ እዚህ መታየት ይጀምራል።', noEntry:'አልተመዘገበም',
  mostFelt:m=>`ብዙ ጊዜ የተሰማሽ፦ ${m}`, helps:l=>`ቀለል ያሉ ቀኖችሽ ብዙ ጊዜ የነበራቸው፦ ${l}`, neededMost:n=>`በብዛት ያስፈለገሽ፦ ${n}`,
  jarTitle:'የመልካም ነገሮች ማሰሮ ✨', jarHint:'የጻፍሻቸው ትንንሽ መልካም ጊዜያት።', jarBtn:'አንዱን አውጪልኝ',
  jarEmpty:'በቆይታሽ ትንሽ መልካም ነገር ስትጽፊ እዚህ ይቀመጣል።', jarCount:n=>`${n} መልካም ነገሮች ተቀምጠዋል`,
  letterTitle:'የወሩ ደብዳቤሽ 💌', letterSoon:n=>`የመጀመሪያው የወር ደብዳቤሽ በ${n} ቀናት ውስጥ ይደርሳል።`,
  dear:'ውድ ኖቪዬ፣', lDays:n=>`ባለፉት 4 ሳምንታት ለራስሽ ${n} ቀናት ጊዜ ሰጥተሻል።`,
  lMood:m=>`ብዙ ጊዜ የተሰማሽ “${m}” ነበር።`, lNeed:n=>`አንድ ነገር ሲያስፈልግሽ ብዙ ጊዜ፦ ${n}።`,
  lHelps:l=>`ቀለል ያሉ ቀኖችሽ ብዙ ጊዜ ${l} ነበራቸው። ምናልባት ትንሽ ተጨማሪ አድርጊው።`, lGood:'ያስተዋልሻቸው ጥቂት መልካም ነገሮች፦',
  lClose:'የመጣሽባቸው ቀናት ሁሉ ዋጋ አላቸው፤ ያረፍሽባቸውም እንዲሁ። በሚቀጥለው ወርም ለራስሽ ገር ሁኚ። 💕', and:' እና '
 }
};
const m_ = k => M[lang==='am'?'am':'en'][k];
const MOOD_COLORS = ['#8f9bb3','#ad9cc6','#d6c39d','#e4a6be','#c25e8a'];

function monthStats(){
 const keys = lastDays(28), entries = keys.map(k=>S.days[k]).filter(d=>d && d.checkin && d.mood);
 const count = {}; entries.forEach(d=>count[d.mood]=(count[d.mood]||0)+1);
 const topMood = Object.keys(count).sort((a,b)=>count[b]-count[a])[0];
 const needCount = {}; entries.forEach(d=>{ if(d.need) needCount[d.need]=(needCount[d.need]||0)+1; });
 const topNeed = Object.keys(needCount).sort((a,b)=>needCount[b]-needCount[a])[0];
 // What helps: routine items whose days average at least half a mood point higher (needs 3+ days each side).
 const helps = [];
 ROUTINE.flatMap(gr=>gr.items).forEach(([id,icon,en,am])=>{
  const withIt = entries.filter(d=>d.routine && d.routine[id]), without = entries.filter(d=>!(d.routine && d.routine[id]));
  if(withIt.length<3 || without.length<3) return;
  const avg = arr => arr.reduce((s,d)=>s+Number(d.mood),0)/arr.length;
  const diff = avg(withIt)-avg(without);
  if(diff>=0.5) helps.push({label:(lang==='am'?am:en.toLowerCase()), diff});
 });
 helps.sort((a,b)=>b.diff-a.diff);
 const good = entries.flatMap(d=>(d.good||[]).filter(Boolean).map(text=>({text,date:d.date})));
 return {keys, entries, topMood, topNeed, helps:helps.slice(0,2).map(h=>h.label), good};
}
const moodName = m => g('moods')[Number(m)-1];
const needName = id => g('needs')[needIds.indexOf(id)];
const joinAnd = arr => arr.join(m_('and'));
const mk = (tag, cls, text) => { const el = document.createElement(tag); if(cls) el.className = cls; if(text!=null) el.textContent = text; return el; };

function calendarCard(st){
 const card = mk('div','card month'); card.append(mk('h2',null,m_('calTitle')));
 if(st.entries.length<1){ card.append(mk('p','hint',m_('calEmpty'))); return card; }
 card.append(mk('p','hint',m_('calHint')));
 const grid = mk('div','mgrid');
 st.keys.slice(0,7).forEach(k=>grid.append(mk('small','mwd',fromKey(k).toLocaleDateString(LOC(),{weekday:'narrow'}))));
 const detail = mk('p','mdetail');
 st.keys.forEach(k=>{
  const d = S.days[k], has = d && d.checkin && d.mood;
  const b = mk('button','mdot'+(k===TODAY?' today':'')); b.dataset.date = k;
  b.type = 'button';
  if(has) b.style.background = MOOD_COLORS[Number(d.mood)-1];
  const dateTxt = fromKey(k).toLocaleDateString(LOC(),{weekday:'short',day:'numeric',month:'short'});
  const info = has ? `${dateTxt} · ${MOODS[d.mood]} ${moodName(d.mood)}${d.need?` · ${needName(d.need)}`:''}` : `${dateTxt} · ${m_('noEntry')}`;
  b.setAttribute('aria-label', info);
  b.onclick = () => { grid.querySelectorAll('.mdot.sel').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); detail.textContent = info; };
  grid.append(b);
 });
 const legend = mk('div','mlegend');
 [1,2,3,4,5].forEach(n=>{ const s = mk('span'); const dot = mk('i'); dot.style.background = MOOD_COLORS[n-1]; s.append(dot, document.createTextNode(moodName(n))); legend.append(s); });
 card.append(grid, detail, legend);
 const lines = mk('div','minsights');
 if(st.entries.length>=3 && st.topMood) lines.append(mk('p',null,m_('mostFelt')(`${MOODS[st.topMood]} ${moodName(st.topMood)}`)));
 if(st.topNeed) lines.append(mk('p',null,m_('neededMost')(needName(st.topNeed))));
 if(st.helps.length) lines.append(mk('p',null,m_('helps')(joinAnd(st.helps))));
 if(lines.children.length) card.append(lines);
 return card;
}

function jarCard(){
 const all = Object.values(S.days).filter(d=>d.checkin).flatMap(d=>(d.good||[]).filter(Boolean).map(text=>({text,date:d.date})));
 const card = mk('div','card jar'); card.append(mk('h2',null,m_('jarTitle')));
 if(!all.length){ card.append(mk('p','hint',m_('jarEmpty'))); return card; }
 card.append(mk('p','hint',`${m_('jarHint')} ${m_('jarCount')(all.length)}`));
 const out = mk('div','jarout hidden'), txt = mk('p','serif'), when = mk('small');
 out.append(txt, when);
 const btn = mk('button','calm',m_('jarBtn')); btn.type = 'button';
 let last = -1;
 btn.onclick = () => {
  let i = Math.floor(Math.random()*all.length);
  if(all.length>1 && i===last) i = (i+1)%all.length; last = i;
  txt.textContent = `“${all[i].text}”`;
  when.textContent = fromKey(all[i].date).toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'});
  out.classList.remove('hidden'); out.classList.remove('pop'); void out.offsetWidth; out.classList.add('pop');
 };
 card.append(out, btn);
 return card;
}

function letterCard(st){
 const checked = Object.keys(S.days).filter(k=>S.days[k].checkin).sort();
 if(!checked.length) return null;
 const age = Math.round((fromKey(TODAY)-fromKey(checked[0]))/864e5);
 const card = mk('div','card letter'); card.append(mk('h2',null,m_('letterTitle')));
 if(age<27){ card.append(mk('p','hint',m_('letterSoon')(27-age))); return card; }
 if(!st.entries.length) return null;
 const body = mk('div','lbody');
 body.append(mk('p','serif',m_('dear')));
 body.append(mk('p',null,m_('lDays')(st.entries.length)));
 if(st.topMood) body.append(mk('p',null,m_('lMood')(moodName(st.topMood))));
 if(st.topNeed) body.append(mk('p',null,m_('lNeed')(needName(st.topNeed))));
 if(st.helps.length) body.append(mk('p',null,m_('lHelps')(joinAnd(st.helps))));
 if(st.good.length){
  body.append(mk('p',null,m_('lGood')));
  const ul = mk('ul'); [...new Map(st.good.map(x=>[x.text.trim().toLowerCase(),x])).values()].sort(()=>Math.random()-.5).slice(0,3).forEach(x=>ul.append(mk('li',null,x.text))); body.append(ul);
 }
 body.append(mk('p',null,m_('lClose')));
 card.append(body);
 return card;
}

const recapBase = renderProgress;
renderProgress = function(){
 recapBase();
 const section = document.getElementById('progress'), st = monthStats();
 section.append(calendarCard(st), jarCard());
 const l = letterCard(st); if(l) section.append(l);
};

/* Settings live behind a ⚙️ button in the header instead of at the bottom of every tab. */
(function(){
 const settings = document.getElementById('settings'); if(!settings) return;
 const panel = mk('div','sheet'); panel.id = 'settingsPanel'; panel.hidden = true;
 panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true'); panel.setAttribute('aria-labelledby','settingsTitle');
 const top = mk('div','sheet-top'), title = mk('h2'); title.id = 'settingsTitle';
 const close = mk('button','sheet-close','✕'); close.type = 'button';
 top.append(title, close); panel.append(top, settings);
 settings.open = true; settings.querySelector('summary').hidden = true;
 document.body.append(panel);
 const btn = mk('button',null,'⚙️'); btn.type = 'button'; btn.id = 'settingsBtn';
 document.querySelector('.hbtns').prepend(btn);
 let back;
 const open = () => { back = document.activeElement; panel.hidden = false; document.body.style.overflow = 'hidden'; close.focus(); };
 const shut = () => { panel.hidden = true; document.body.style.overflow = ''; back?.focus(); };
 btn.onclick = open; close.onclick = shut;
 panel.addEventListener('keydown', e => { if(e.key==='Escape') shut(); });
 const label = () => { const am = lang==='am';
  title.textContent = am ? 'ማስተካከያ' : 'Settings';
  btn.setAttribute('aria-label', am ? 'ማስተካከያ' : 'Settings');
  const lb = document.getElementById('langBtn'); lb.textContent = '🌐'; lb.setAttribute('aria-label', am ? 'Switch to English' : 'ወደ አማርኛ ቀይሪ'); lb.title = am ? 'English' : 'አማርኛ'; close.setAttribute('aria-label', am ? 'ዝጊ' : 'Close'); };
 const baseLang = applyLang; applyLang = function(){ baseLang(); label(); }; label();
})();
