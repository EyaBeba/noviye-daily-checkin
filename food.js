/* Food & how it felt: Noviye notes what she ate (any time, shifts move around) and how her body felt after.
   Over a few weeks it shows which foods tend to sit badly and which agree with her. No calories. */
const FEELS = ['😊 Comfortable','🙂 Fine','😮‍💨 Heavy','🎈 Bloated','🤢 Upset stomach','😴 Sleepy'];
const UNCOMFY = [2,3,4], COMFY = [0,1];
const KINDS = ['🍽️ Meal','🍪 Snack','🥤 Drink'];
const ASK_AFTER = 30*60*1000;   // ask "how did it feel?" once it has been 30 minutes

const foodsOn = k => ((S.days[k]||{}).food||[]).filter(f=>f && typeof f.text==='string');
const timeOf = f => new Date(f.at).toLocaleTimeString(LOC(),{hour:'numeric',minute:'2-digit'});
const items = text => text.toLowerCase().split(/,|\+|&|\band\b|\bwith\b/).map(x=>x.trim()).filter(x=>x.length>1);
const nice = t => t.charAt(0).toUpperCase()+t.slice(1);

async function saveFood(k, list){ const d = day(k); d.food = list; return saveDay(d, true); }

const foodCard = mk('div','card food');
(document.querySelector('.lookrow') || document.querySelector('.quick-card')).after(foodCard);
let formOpen = false, feelOpen = null;

function feelChips(onPick, current){
 const row = mk('div','chips feelchips');
 FEELS.forEach((f,i)=>{ const b = mk('button', current===i?'on':'', f); b.type = 'button'; b.onclick = () => onPick(i); row.append(b); });
 return row;
}
function renderFood(){
 foodCard.replaceChildren();
 foodCard.append(mk('h2',null,'🍽️ Food & how it felt'));
 const list = foodsOn(VIEW).sort((a,b)=>a.at-b.at);
 // gentle follow-up for something eaten a while ago without a feeling yet
 const due = list.filter(f=>f.feel==null && Date.now()-f.at>=ASK_AFTER && Date.now()-f.at<12*3600*1000).pop();
 if(due && feelOpen!==due.id){
  const ask = mk('div','foodask');
  ask.append(mk("p",null,`How did you feel after your ${(t=>t.charAt(0).toLowerCase()+t.slice(1))(due.text.length>40 ? due.text.slice(0,40)+"…" : due.text)}?`));
  ask.append(feelChips(async i=>{ due.feel = i; if(await saveFood(VIEW, list)){ toast(); renderFood(); } }));
  foodCard.append(ask);
 }
 if(!list.length && !formOpen) foodCard.append(mk('p','hint','Note what you eat, then how your body felt after. Over time you will see which foods agree with you.'));
 list.forEach(f=>{
  const row = mk('div','frow');
  const top = mk('div','ftop');
  top.append(mk('small','ftime',timeOf(f)), mk('span','ftext',`${(KINDS[f.kind]||KINDS[0]).split(' ')[0]} ${f.text}`));
  const feelBtn = mk('button', 'ffeel'+(f.feel==null?' empty':''), f.feel==null ? 'How did it feel?' : FEELS[f.feel]); feelBtn.type = 'button';
  feelBtn.onclick = () => { feelOpen = feelOpen===f.id ? null : f.id; renderFood(); };
  top.append(feelBtn); row.append(top);
  if(feelOpen===f.id){
   row.append(feelChips(async i=>{ f.feel = f.feel===i ? null : i; feelOpen = null; if(await saveFood(VIEW, list)){ toast(); renderFood(); } }, f.feel));
   const del = mk('button','link danger','Delete'); del.type = 'button';
   del.onclick = async () => {
    if(!del.classList.contains('armed')){ del.classList.add('armed'); del.textContent = 'Delete?'; setTimeout(()=>{ del.classList.remove('armed'); del.textContent = 'Delete'; }, 3000); return; }
    if(await saveFood(VIEW, list.filter(x=>x.id!==f.id))){ feelOpen = null; renderFood(); }
   };
   row.append(del);
  }
  foodCard.append(row);
 });
 if(formOpen){
  const form = mk('div','fform');
  const inp = mk('input'); inp.maxLength = 100; inp.placeholder = 'What did you eat? e.g. Firfir and tea'; inp.setAttribute('aria-label','What did you eat?');
  const dl = mk('datalist'); dl.id = 'pastFoods'; inp.setAttribute('list','pastFoods');
  [...new Set(Object.values(S.days).flatMap(d=>(d.food||[]).map(f=>f.text)).reverse())].slice(0,30).forEach(t=>{ const o = mk('option'); o.value = t; dl.append(o); });
  let kind = 0, feel = null;
  const kinds = mk('div','chips');
  KINDS.forEach((k,i)=>{ const b = mk('button', i===kind?'on':'', k); b.type = 'button'; b.onclick = () => { kind = i; kinds.querySelectorAll('button').forEach((x,j)=>x.classList.toggle('on', j===i)); }; kinds.append(b); });
  const feelRow = feelChips(i=>{ feel = feel===i ? null : i; feelRow.querySelectorAll('button').forEach((x,j)=>x.classList.toggle('on', j===feel)); });
  const btns = mk('div','lbtns'); const cancel = mk('button','calm','Cancel'), save = mk('button','btn','Save');
  cancel.type = save.type = 'button';
  cancel.onclick = () => { formOpen = false; renderFood(); };
  save.onclick = async () => {
   const text = inp.value.trim(); if(!text){ inp.focus(); return; }
   const at = VIEW===TODAY ? Date.now() : fromKey(VIEW).setHours(13,0,0,0);
   const next = [...foodsOn(VIEW), {id:Date.now()+'-'+Math.random().toString(36).slice(2,6), at, text, kind, feel}];
   save.disabled = true;
   if(await saveFood(VIEW, next)){ formOpen = false; toast(); renderFood(); } else save.disabled = false;
  };
  btns.append(cancel, save);
  form.append(inp, dl, kinds, mk('small','fq','How do you feel right now? (optional, I can ask you later)'), feelRow, btns);
  foodCard.append(form);
  setTimeout(()=>inp.focus(), 0);
 } else {
  const add = mk('button','lookadd fadd','+ I ate something'); add.type = 'button';
  add.onclick = () => { formOpen = true; renderFood(); };
  foodCard.append(add);
 }
}

/* ---------- My month: food & comfort patterns ---------- */
function foodInsightCard(){
 const card = mk('div','card foodins'); card.append(mk('h2',null,'Food & comfort 🍽️'));
 const all = lastDays(28).flatMap(k=>foodsOn(k)).filter(f=>f.feel!=null);
 if(all.length<3){ card.append(mk('p','hint','After a few meals with how they felt, patterns show up here.')); return card; }
 const comfy = all.filter(f=>COMFY.includes(f.feel)).length;
 card.append(mk('p',null,`You felt comfortable after ${comfy} of ${all.length} things you ate in the last 4 weeks.`));
 const stats = {};
 all.forEach(f=>items(f.text).forEach(it=>{ const s = stats[it] = stats[it] || {n:0, bad:0, good:0, how:{}}; s.n++;
  if(UNCOMFY.includes(f.feel)){ s.bad++; s.how[f.feel] = (s.how[f.feel]||0)+1; } if(COMFY.includes(f.feel)) s.good++; }));
 const bad = Object.entries(stats).filter(([,s])=>s.n>=2 && s.bad/s.n>=0.6).sort((a,b)=>b[1].bad-a[1].bad).slice(0,4);
 const good = Object.entries(stats).filter(([,s])=>s.n>=2 && s.good/s.n>=0.75).sort((a,b)=>b[1].good-a[1].good).slice(0,4);
 if(bad.length){
  card.append(mk('div','sub','Often uncomfortable after'));
  bad.forEach(([it,s])=>{ const top = Object.entries(s.how).sort((a,b)=>b[1]-a[1])[0]; card.append(mk('p','fins',`${nice(it)}: ${FEELS[top[0]].toLowerCase()} ${s.bad} of ${s.n} times`)); });
 }
 if(good.length){
  card.append(mk('div','sub','Usually agrees with you'));
  good.forEach(([it,s])=>card.append(mk('p','fins',`${nice(it)}: comfortable ${s.good} of ${s.n} times`)));
 }
 if(!bad.length && !good.length) card.append(mk('p','hint','Keep noting how food feels. When a food shows up a few times, it will appear here.'));
 card.append(mk('p','fnote','These are patterns from your own notes, not a diagnosis. If discomfort keeps coming back, it is worth talking to a doctor.'));
 return card;
}
const monthBaseFood = renderProgress;
renderProgress = function(){
 monthBaseFood();
 const sec = document.getElementById('progress'), cal = sec.querySelector('.month');
 const c = foodInsightCard(); cal ? cal.after(c) : sec.append(c);
};
const viewBaseFood = renderView;
renderView = function(){ viewBaseFood(); formOpen = false; feelOpen = null; renderFood(); };
// re-check every few minutes so the "how did you feel after…" question appears on its own
setInterval(()=>{ if(!formOpen && feelOpen===null && !document.getElementById('today').classList.contains('hidden')) renderFood(); }, 5*60*1000);
