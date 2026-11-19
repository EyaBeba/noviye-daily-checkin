/* A quieter daily experience. Existing IndexedDB entries remain compatible. */
const G = {
 en:{eyebrow:'A little room for you',title:'Come as you are.',intro:'A long day deserves a soft landing. One tap is enough.',quick:'Your small check-in',optional:'Stay a little longer · optional',permission:'Skip anything. There is no catching up to do.',need:'What would help right now? (optional)',needs:['Rest','Some space','Someone to listen','Something comforting','Not sure'],routine:'Small comforts · optional',water:'A sip of water · optional',challenge:'Something just for you · optional',settings:'Make this yours',choose:'Choose the comforts you want to see. None is okay.',recap:'A little look back',recapHint:'These are moments you recorded, not a measure of you.',visits:n=>`You made space for yourself on ${n} of the last 7 days.`,noVisits:'Your next check-in can be a fresh start.',missing:'Days without entries are simply unrecorded.',notes:'Your words',worry:'Something stuck in your head?',worryHint:'A brief place to put it down. Stop whenever you want.',w1:'What happened? Just what you noticed.',w2:'What am I assuming or telling myself?',w3:'What do I need? What is one kind next step?',w4:'It can wait until… (optional)',keepWorry:'Add to my reflection',worryAdded:'Added to your reflection. Save your check-in when ready.',calm:'Take a quiet pause',calmHint:'Breathe comfortably, or look around and name five things you see. You can stop anytime.',privacy:'Your space, your choice',privacyBody:'Entries and voice notes are stored in this browser on this device. They are not sent to a partner or an account. Anyone with access to this browser profile may be able to read them. Clearing browser data can erase them. A backup contains sensitive, unencrypted entries: keep it somewhere private.',backup:'Download a backup',restore:'Restore a backup',erase:'Delete all my entries',eraseAsk:'Delete all check-ins, notes, tasks and drafts from this browser? This cannot be undone. Download a backup first if you want to keep them.',importAsk:'Replace entries in this browser with this backup? Your current entries will be replaced.',storage:'This browser could not save your changes. Keep this page open and copy important writing somewhere safe. Check available storage or browser privacy settings, then try saving again.',backupFail:'Could not complete the backup. Your entries have not been changed.',importFail:'This backup could not be restored. Your entries have not been changed.',restored:'Backup restored.',draft:'Draft kept in this browser',draftFail:'Your draft could not be kept. Save your check-in before leaving.',savedNeed:'What I needed',tasks:'Things on your mind',noTasks:'Nothing to carry here. Rest can be the plan.',earlier:'From an earlier day or week · keep, leave for later, or delete',keep:'Bring to today',later:'Leave for later',laterHint:'Left here for whenever you want to return.',todayTasks:'Today, if you have room',weekTasks:'This week, if useful',roll:'Older tasks stay here for you to choose. Nothing is automatically added to today.',moods:['Low','Unsettled','Somewhere in between','Okay','Good'],routineSaved:'Your choices are saved on this device.',good:'One small thing that felt okay (optional)',goodPh:'A warm drink, a quiet minute…',learn:'Anything you want to put down here? (optional)',reflection:'Your reflection',calmTitle:'A quiet moment',close:'Close',in:'Breathe in gently…',out:'Breathe out gently…',breathSub:'Only as deep and slow as feels comfortable. No breath holds.',breathDone:'Take the next moment at your own pace.',thanks:'That is enough for today.',done:'You do not have to solve everything tonight.',exportEmpty:'No saved entries yet.',voiceBusy:'Stop your recording before saving or changing days.',help:'If this space starts feeling like pressure, you can use less of it or take a break.'},
 am:{eyebrow:'ለራስሽ ትንሽ ቦታ',title:'እንዳለሽ ነዪ።',intro:'ከረጅም ቀን በኋላ እረፍት ይገባሻል። አንድ ንክኪ በቂ ነው።',quick:'ትንሽ ቆይታ ከራስሽ ጋር',optional:'ተጨማሪ ቆይታ · ከፈለግሽ ብቻ',permission:'የፈለግሽውን ዝለዪ። ያመለጠ ቀን መሙላት አያስፈልግም።',need:'አሁን ምን ይረዳሻል? (ከፈለግሽ)',needs:['እረፍት','ትንሽ የግል ጊዜ','የሚያዳምጠኝ ሰው','የሚያጽናናኝ ነገር','እርግጠኛ አይደለሁም'],routine:'ትንሽ እንክብካቤ · ከፈለግሽ',water:'ትንሽ ውሃ · ከፈለግሽ',challenge:'ለራስሽ የሚሆን ነገር · ከፈለግሽ',settings:'ለአንቺ እንዲመች',choose:'ማየት የምትፈልጊያቸውን ምረጪ። ምንም ባትመርጪም ችግር የለውም።',recap:'ትንሽ ወደ ኋላ እንመልከት',recapHint:'እነዚህ ያስቀመጥሻቸው ጊዜያት ናቸው፤ የአንቺ መለኪያ አይደሉም።',visits:n=>`ባለፉት 7 ቀናት ለራስሽ ${n} ቀናት ጊዜ ሰጥተሻል።`,noVisits:'ቀጣዩ ቆይታሽ አዲስ ጅማሬ ሊሆን ይችላል።',missing:'ያልተመዘገቡ ቀናት ያልተመዘገቡ ብቻ ናቸው።',notes:'የአንቺ ቃላት',worry:'በሀሳብሽ የቀረ ነገር አለ?',worryHint:'ለአፍታ እዚህ አስቀምጪው። በፈለግሽ ጊዜ ማቆም ትችያለሽ።',w1:'ምን ተፈጠረ? ያስተዋልሽውን ብቻ።',w2:'ምን እየገመትኩ ነው?',w3:'ምን ያስፈልገኛል? አንድ ደግ ቀጣይ እርምጃ ምንድነው?',w4:'እስከ መቼ ሊጠብቅ ይችላል? (ከፈለግሽ)',keepWorry:'ወደ ማስታወሻዬ ጨምሪ',worryAdded:'ወደ ማስታወሻሽ ተጨምሯል። ዝግጁ ስትሆኚ አስቀምጪ።',calm:'ለአፍታ እንረጋጋ',calmHint:'በምቾት ተንፍሺ ወይም ዙሪያሽን ተመልከቺና የምታዪያቸውን አምስት ነገሮች ሰይሚ።',privacy:'የአንቺ ቦታ፣ የአንቺ ምርጫ',privacyBody:'ጽሁፎችና ድምፆች በዚህ መሣሪያ ብራውዘር ውስጥ ይቀመጣሉ። ለሌላ ሰው አይላኩም። ይህን ብራውዘር የሚጠቀም ሰው ሊያያቸው ይችላል። የብራውዘር ዳታ ሲጠፋ ሊሰረዙ ይችላሉ። ምትኬው ያልተመሰጠረ የግል መረጃ ይይዛል፤ በጥንቃቄ አስቀምጪው።',backup:'ምትኬ አውርጂ',restore:'ምትኬ መልሺ',erase:'ሁሉንም ጽሁፎቼን ሰርዢ',eraseAsk:'ሁሉንም ቆይታዎች፣ ማስታወሻዎችና ስራዎች ከዚህ ብራውዘር ይሰረዙ? ይህ አይመለስም።',importAsk:'በዚህ ብራውዘር ያሉትን በምትኬው ይተኩ?',storage:'ለውጦችሽን ማስቀመጥ አልተቻለም። ገጹን ክፍት አድርጊና ጠቃሚ ጽሁፍሽን ሌላ ቦታ አስቀምጪ።',backupFail:'ምትኬው አልተሳካም። ጽሁፎችሽ አልተቀየሩም።',importFail:'ምትኬውን መመለስ አልተቻለም። ጽሁፎችሽ አልተቀየሩም።',restored:'ምትኬው ተመልሷል።',draft:'ረቂቅሽ በዚህ ብራውዘር ተቀምጧል',draftFail:'ረቂቅሽ ማስቀመጥ አልተቻለም። ከመውጣትሽ በፊት አስቀምጪ።',savedNeed:'ያስፈለገኝ',tasks:'በሀሳብሽ ያሉ ነገሮች',noTasks:'እዚህ የምትሸከሚው የለም። እረፍትም ዕቅድ ነው።',earlier:'ከቀድሞ ቀን ወይም ሳምንት · ምረጪ ወይም ሰርዢ',keep:'ወደ ዛሬ አምጪ',later:'ለበኋላ ተዪው',laterHint:'በፈለግሽ ጊዜ ለመመለስ እዚህ ይቆያል።',todayTasks:'ዛሬ፣ ጊዜ ካለሽ',weekTasks:'በዚህ ሳምንት፣ ከጠቀመሽ',roll:'የቀድሞ ስራዎች እንድትመርጪ እዚህ ይቆያሉ። በራሳቸው ወደ ዛሬ አይጨመሩም።',moods:['ዝቅ ብሎኛል','ተረብሻለሁ','መሃል ላይ ነኝ','ደህና ነኝ','ጥሩ ነኝ'],routineSaved:'ምርጫዎችሽ በዚህ መሣሪያ ተቀምጠዋል።',good:'ደህና የነበረ አንድ ትንሽ ነገር (ከፈለግሽ)',goodPh:'ሞቅ ያለ መጠጥ፣ የእረፍት ደቂቃ…',learn:'እዚህ ማስቀመጥ የምትፈልጊው አለ? (ከፈለግሽ)',reflection:'ማስታወሻሽ',calmTitle:'የእረፍት ጊዜ',close:'ዝጊ',in:'በእርጋታ ወደ ውስጥ ተንፍሺ…',out:'በእርጋታ ወደ ውጭ አውጪ…',breathSub:'በሚመችሽ መጠን ተንፍሺ። ትንፋሽ መያዝ አያስፈልግም።',breathDone:'ቀጣዩን አፍታ በራስሽ ፍጥነት ውሰጂ።',thanks:'ለዛሬ ይህ በቂ ነው።',done:'ዛሬ ማታ ሁሉንም መፍታት አያስፈልግም።',exportEmpty:'ገና የተቀመጠ ጽሁፍ የለም።',voiceBusy:'ከማስቀመጥሽ ወይም ቀን ከመቀየርሽ በፊት ቅጂውን አቁሚ።',help:'ይህ ቦታ ጫና ከሆነብሽ፣ ትንሽ ብቻ ተጠቀሚ ወይም እረፍት ውሰጂ።'}
};
const g=k=>G[lang==='am'?'am':'en'][k];
const $g=id=>document.getElementById(id);
if(!lsGet('ci-name') || ['Novi','Noviye'].includes(lsGet('ci-name'))) lsSet('ci-name','Noviye');
document.title='Noviye · A little room for you';
document.querySelector('meta[name="apple-mobile-web-app-title"]').content='Noviye';
let currentNeed='';
const needIds=['rest','space','listen','comfort','unsure'];
let selectedRoutines;
try{ selectedRoutines=JSON.parse(lsGet('gentle-routines')); }catch{}
if(!Array.isArray(selectedRoutines)) selectedRoutines=['breakfast','selfcare','sleptOnTime'];

function storageProblem(){ $g('storageWarning').textContent=g('storage'); $g('storageWarning').hidden=false; }
const warning=document.createElement('div'); warning.id='storageWarning'; warning.role='alert'; warning.hidden=true;
document.querySelector('.wrap').prepend(warning);

const today=$g('today'), form=$g('form'), checkCard=form.parentElement;
checkCard.classList.add('quick-card');
const hero=document.createElement('div'); hero.className='arrival'; hero.innerHTML='<span class="arrival-mark" aria-hidden="true">✳</span><p class="eyebrow" data-g="eyebrow"></p><h2 data-g="title"></h2><p data-g="intro"></p>';
today.insertBefore(hero,today.children[1]);
hero.after(checkCard);
const needs=document.createElement('div'); needs.className='block'; needs.innerHTML='<div class="q" data-g="need"></div><div id="needs" class="chips"></div>';
form.children[0].after(needs);
const longer=document.createElement('details'); longer.id='longer'; longer.className='optional-reflection';
longer.innerHTML='<summary data-g="optional"></summary>';
const qs=$g('dailyQs'), good=$g('g1').parentElement, reflection=$g('textMode').parentElement;
longer.append(qs,good,reflection); needs.after(longer);
const permission=document.createElement('p'); permission.className='permission'; permission.dataset.g='permission'; form.insertBefore(permission,$g('save'));
const draftStatus=document.createElement('p'); draftStatus.id='draftStatus'; draftStatus.className='draft-status'; draftStatus.role='status'; form.append(draftStatus);
// Keep legacy extra gratitude values available when editing an older entry.
$g('g2').hidden=true; $g('g3').hidden=true;

const worry=document.createElement('details'); worry.id='worry'; worry.className='worry';
worry.innerHTML='<summary data-g="worry"></summary><p class="hint" data-g="worryHint"></p>'+[1,2,3,4].map(n=>`<label for="worry${n}" data-g="w${n}"></label><textarea id="worry${n}" maxlength="1200" rows="2"></textarea>`).join('')+'<button type="button" class="calm" id="keepWorry" data-g="keepWorry"></button>';
longer.prepend(worry);
$g('keepWorry').onclick=()=>{
 const parts=[1,2,3,4].map(n=>{const value=$g('worry'+n).value.trim(); return value?g('w'+n)+'\n'+value:'';}).filter(Boolean);
 if(!parts.length) return;
 $g('text').value=[$g('text').value,...parts].filter(Boolean).join('\n\n');
 [1,2,3,4].forEach(n=>$g('worry'+n).value=''); worry.open=false; persistDraft(); toast(g('worryAdded'));
};

// Make optional tracking compact and give the calming action its own clear position.
const routineCard=$g('routine').parentElement, waterCard=$g('water').parentElement, challengeCard=$g('challenge').parentElement;
function foldCard(card,key){ const details=document.createElement('details'); details.className='card comfort'; const summary=document.createElement('summary'); summary.dataset.g=key; details.append(summary); card.before(details); while(card.firstChild) details.append(card.firstChild); card.remove(); return details; }
foldCard(routineCard,'routine'); foldCard(waterCard,'water'); foldCard(challengeCard,'challenge');
const calmCard=$g('calmBtn').parentElement; calmCard.classList.add('calm-card');
calmCard.querySelector('.label').remove(); $g('tipTitle').hidden=true; $g('tipBody').hidden=true;
const calmHint=document.createElement('p'); calmHint.dataset.g='calmHint'; calmCard.prepend(calmHint); checkCard.after(calmCard);
$g('today').querySelector('.summary').hidden=true;
document.querySelector('.love').classList.add('quiet-note');

const settings=document.createElement('details'); settings.className='card settings'; settings.id='settings';
settings.innerHTML='<summary data-g="settings"></summary><p data-g="choose"></p><div id="routineChoices"></div><h3 data-g="privacy"></h3><p data-g="privacyBody"></p><div class="backup-actions"><button id="backup" class="calm" data-g="backup"></button><button id="restore" class="calm" data-g="restore"></button><input type="file" id="backupFile" accept="application/json,.json" hidden><button id="erase" class="link danger" data-g="erase"></button></div><p class="hint" data-g="help"></p>';
document.querySelector('.wrap>.foot').before(settings);

function renderNeeds(){
 const box=$g('needs'); if(!box) return; box.replaceChildren();
 needIds.forEach((id,i)=>{const b=document.createElement('button'); b.type='button'; b.textContent=g('needs')[i]; b.className=currentNeed===id?'on':''; b.setAttribute('aria-pressed',currentNeed===id); b.onclick=()=>{currentNeed=currentNeed===id?'':id; renderNeeds(); persistDraft();}; box.append(b);});
}
renderRoutine=function(){
 const box=$g('routine'); box.replaceChildren();
 ROUTINE.flatMap(group=>group.items).filter(item=>selectedRoutines.includes(item[0])).forEach(([id,icon,en,am])=>{
  const label=document.createElement('label'); label.className='check';
  const input=document.createElement('input'); input.type='checkbox'; input.checked=!!day().routine[id];
  input.onchange=async()=>{const d=day(); d.routine[id]=input.checked; await saveDay(d);};
  const text=document.createElement('span'); text.textContent=icon+' '+(lang==='am'?am:en); label.append(input,text); box.append(label);
 });
 if(!box.children.length){const p=document.createElement('p'); p.className='hint'; p.textContent=g('permission'); box.append(p);}
};
function renderChoices(){
 const box=$g('routineChoices'); box.replaceChildren();
 ROUTINE.flatMap(group=>group.items).forEach(([id,icon,en,am])=>{
  const label=document.createElement('label'); label.className='choice'; const input=document.createElement('input'); input.type='checkbox'; input.checked=selectedRoutines.includes(id);
  input.onchange=()=>{selectedRoutines=input.checked?[...selectedRoutines,id]:selectedRoutines.filter(x=>x!==id); lsSet('gentle-routines',JSON.stringify(selectedRoutines)); renderRoutine();};
  const text=document.createElement('span'); text.textContent=icon+' '+(lang==='am'?am:en); label.append(input,text); box.append(label);
 });
}
renderSummary=()=>{};
encouragement=function(d){
 const answers=d.answers||{};
 if(Number(d.mood)<=2 || ['carry','sleep','calm'].some(key=>answers[key]===2)) return lang==='am'
  ? 'ኖቪዬ፣ ዛሬ ከባድ ቢሆንም ዋጋሽ አይቀንስም። ሁሉንም ዛሬ ማታ መፍታት አያስፈልግም።'
  : 'Noviye, a hard day does not make you any less worthy of care. You do not have to solve everything tonight.';
 const count=Object.values(S.days).filter(day=>day.checkin).length;
 if(count===1) return lang==='am' ? 'ኖቪዬ፣ ይህ ትንሽ ቦታ የአንቺ ነው። በራስሽ ፍጥነት ተጠቀሚበት።' : 'Noviye, this little space is yours now. Use it at your own pace.';
 if(count===5) return lang==='am' ? 'ኖቪዬ፣ ለራስሽ የሰጠሻቸው አምስት ትንሽ ጊዜያት። ተከታታይ መሆን አያስፈልጋቸውም።' : 'Five little moments for yourself, Noviye. They never needed to be on consecutive days.';
 return g('done');
};
rollTasks=async()=>{};
renderProgress=function(){
 const section=$g('progress'); section.replaceChildren();
 const card=document.createElement('div'); card.className='card recap';
 const h=document.createElement('h2'); h.textContent=g('recap'); const p=document.createElement('p'); p.textContent=g('recapHint');
 const n=lastDays(7).filter(k=>S.days[k]?.checkin).length;
 const count=document.createElement('p'); count.className='recap-title'; count.textContent=n?g('visits')(n):g('noVisits');
 const days=document.createElement('div'); days.className='gentle-days';
 lastDays(7).forEach(k=>{const d=S.days[k], el=document.createElement('div'); const mark=document.createElement('span'); mark.textContent=d?.checkin?(MOODS[d.mood]||'✳'):'·';
  const date=fromKey(k).toLocaleDateString(LOC(),{weekday:'short',month:'short',day:'numeric'}); mark.setAttribute('aria-label',date+': '+(d?.checkin?g('moods')[Number(d.mood)-1]:g('missing'))); const label=document.createElement('small'); label.textContent=fromKey(k).toLocaleDateString(LOC(),{weekday:'short'}); el.append(mark,label); days.append(el);});
 const foot=document.createElement('p'); foot.className='hint'; foot.textContent=g('missing'); card.append(h,p,count,days,foot); section.append(card);
};
renderTasks=function(){
 [['daily',TODAY,'dailyList','dailyCount'],['weekly',WEEK,'weeklyList','weeklyCount']].forEach(([kind,period,listId,countId])=>{
  const list=S.tasks.filter(x=>x.kind===kind&&(x.period===period||(!x.done&&x.period<period))).sort((a,b)=>(a.done-b.done)||(a.created-b.created));
  const box=$g(listId); box.replaceChildren(); $g(countId).hidden=true;
  if(!list.length){const p=document.createElement('p'); p.className='none'; p.textContent=g('noTasks'); box.append(p);}
  list.forEach(tk=>{
   const row=document.createElement('div'); row.className='task-row'; const label=document.createElement('label'); label.className='check';
   const input=document.createElement('input'); input.type='checkbox'; input.checked=tk.done; const title=document.createElement('span'); title.textContent=tk.title; label.append(input,title);
   input.onchange=async()=>{const next={...tk,done:input.checked,doneDate:input.checked?TODAY:null}; if(await put('tasks',next)){Object.assign(tk,next); renderTasks(); toast();}else input.checked=tk.done;};
   const remove=document.createElement('button'); remove.className='link'; remove.textContent=t('del'); remove.setAttribute('aria-label',t('del')+': '+tk.title); remove.onclick=async()=>{if(await del('tasks',tk.id)){S.tasks=S.tasks.filter(x=>x.id!==tk.id);renderTasks();}};
   row.append(label,remove);
   if(tk.period<period){const review=document.createElement('div'); review.className='task-review'; const hint=document.createElement('p'); hint.textContent=g('earlier');
    const keep=document.createElement('button'); keep.className='link'; keep.textContent=g('keep'); keep.onclick=async()=>{const next={...tk,period};if(await put('tasks',next)){Object.assign(tk,next);renderTasks();}};
    review.append(hint,keep);row.append(review);}
   box.append(row);
  });
 });
};

// Drafts include unfinished guided reflections and voice blobs, in the same database.
let draftTimer, draftQueue=Promise.resolve(), replacingData=false;
function draftValue(){return {date:VIEW,mood:ci.mood,answers:{...ci.answers},need:currentNeed,good:[1,2,3].map(i=>$g('g'+i).value),text:$g('text').value,audio:ciRec.blob||null,worry:[1,2,3,4].map(i=>$g('worry'+i).value)};}
function persistDraft(){
 if(replacingData||!db||!$g('form')||$g('form').classList.contains('hidden')) return draftQueue;
 const value=draftValue(); if(!value.mood&&!value.need&&!value.text&&!value.audio&&!value.good.some(Boolean)&&!Object.keys(value.answers).length&&!value.worry.some(Boolean)) return draftQueue;
 draftQueue=draftQueue.then(()=>put('drafts',value)).then(ok=>{if(ok&&VIEW===value.date) $g('draftStatus').textContent=g('draft');}); return draftQueue;
}
async function clearDraft(key){await draftQueue;await del('drafts',key);$g('draftStatus').textContent='';}
async function restoreDraft(){
 if(!db) return; const key=VIEW;
 const draft=await new Promise(resolve=>{try{const r=db.transaction('drafts').objectStore('drafts').get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>resolve(null);}catch{resolve(null);}});
 if(!draft||VIEW!==key)return; $g('form').classList.remove('hidden');$g('done').classList.add('hidden');
 ci={mood:draft.mood,answers:draft.answers||{}}; currentNeed=draft.need||'';renderNeeds();renderQuestions();
 document.querySelectorAll('#moods button').forEach(b=>{const selected=b.dataset.v===String(ci.mood);b.classList.toggle('on',selected);b.setAttribute('aria-pressed',selected);});
 [1,2,3].forEach((n,i)=>$g('g'+n).value=draft.good?.[i]||'');$g('text').value=draft.text||'';
 [1,2,3,4].forEach((n,i)=>$g('worry'+n).value=draft.worry?.[i]||'');
 if(draft.audio){ciRec.show(draft.audio);setMode('voice');}
 $g('save').disabled=!ci.mood;$g('draftStatus').textContent=g('draft');
 if(draft.text||draft.audio||draft.good?.some(Boolean)||draft.worry?.some(Boolean))longer.open=true;
}
form.addEventListener('input',()=>{clearTimeout(draftTimer);draftTimer=setTimeout(persistDraft,300);});
form.addEventListener('click',()=>{clearTimeout(draftTimer);draftTimer=setTimeout(persistDraft,100);});
window.addEventListener('pagehide',persistDraft);
const originalSetView=setView;
setView=async function(k){if([ciRec,nRec].some(r=>(r.rec&&r.rec.state!=='inactive'))){toast(g('voiceBusy'));return;}await persistDraft();[1,2,3,4].forEach(n=>$g('worry'+n).value='');$g('draftStatus').textContent='';originalSetView(k);};
const originalSave=$g('save').onclick;
$g('save').onclick=async()=>{if((ciRec.rec&&ciRec.rec.state!=='inactive')){toast(g('voiceBusy'));return;}await refreshDay();if(!ci.mood)return;$g('save').disabled=true;try{await originalSave();}finally{$g('save').disabled=!ci.mood;}};
const originalNoteSave=$g('nSave').onclick;
$g('nSave').onclick=async()=>{if((nRec.rec&&nRec.rec.state!=='inactive')){toast(g('voiceBusy'));return;}$g('nSave').disabled=true;try{await originalNoteSave();}finally{$g('nSave').disabled=false;}};

// Upgrade only by adding a store; all original entries and voice recordings survive.
openDB=function(){return new Promise(resolve=>{try{const request=indexedDB.open('novi-day',6);request.onupgradeneeded=()=>{const database=request.result;for(const [name,key] of [['days','date'],['tasks','id'],['notes','id'],['drafts','date'],['tries','id'],['looks','id'],['arabic','id']])if(!database.objectStoreNames.contains(name))database.createObjectStore(name,{keyPath:key});};request.onsuccess=()=>{request.result.onversionchange=()=>request.result.close();resolve(request.result);};request.onerror=()=>resolve(null);request.onblocked=()=>{storageProblem();resolve(null);};}catch{resolve(null);}});};

// Refresh calendar state when a phone returns to the app, including after midnight.
async function refreshDay(){
 const fresh=dayNow(),key=keyOf(fresh); if(key===TODAY)return;
 if([ciRec,nRec].some(r=>(r.rec&&r.rec.state!=='inactive')))return;
 await persistDraft();const wasToday=VIEW===TODAY;now=fresh;TODAY=key;const monday=new Date(now);monday.setDate(monday.getDate()-((monday.getDay()+6)%7));WEEK=keyOf(monday);
 if(wasToday){VIEW=TODAY;resetForm();[1,2,3,4].forEach(n=>$g('worry'+n).value='');if(S.days[TODAY]?.checkin)loadCheckin(S.days[TODAY]);else await restoreDraft();}
 applyLang();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)persistDraft();else refreshDay();});
window.addEventListener('focus',refreshDay);setInterval(refreshDay,30000);

const originalApplyLang=applyLang;
applyLang=function(){
 originalApplyLang();document.querySelectorAll('[data-g]').forEach(el=>el.textContent=g(el.dataset.g));
 checkCard.querySelector('h2').textContent=g('quick');$g('calmBtn').textContent=g('calm');
 document.querySelector('[data-tab="progress"]').textContent=g('recap');document.querySelector('[data-tab="journal"]').textContent=g('notes');
 document.querySelector('[data-i="goodQ"]').textContent=g('good');$g('g1').placeholder=g('goodPh');document.querySelector('[data-i="learnedQ"]').textContent=g('learn');
 document.querySelector('[data-i="todayTasks"]').textContent=g('todayTasks');document.querySelector('[data-i="weekTasks"]').textContent=g('weekTasks');document.querySelector('[data-i="rollNote"]').textContent=g('roll');
 document.querySelector('[data-i="thanks"]').textContent=g('thanks');document.querySelector('[data-i="foot"]').textContent=lang==='am'?'በዚህ ብራውዘር ይቀመጣል። የምታጋሪውን አንቺ ትመርጫለሽ።':'Saved in this browser. You choose what to share.';
 document.querySelectorAll('#moods button').forEach((b,i)=>{b.setAttribute('aria-label',g('moods')[i]);b.setAttribute('aria-pressed',b.classList.contains('on'));b.dataset.label=lang==='am'?['ዝቅ','ረብሾኛል','መሃል','ደህና','ጥሩ'][i]:['Low','Heavy','Mixed','Okay','Good'][i];});
 renderNeeds();renderChoices();if(!warning.hidden)storageProblem();
};
$g('moods').addEventListener('click',()=>document.querySelectorAll('#moods button').forEach(b=>b.setAttribute('aria-pressed',b.classList.contains('on'))));

// Gentle breathing without holds or a promise to change how someone feels.
runBreath=function(){bTimers.forEach(clearTimeout);bTimers=[];$g('bAgain').classList.add('hidden');$g('bSub').textContent=g('breathSub');orb.style.transition='none';orb.style.transform='scale(.65)';let at=200;
 for(let i=0;i<5;i++)for(const [key,ms,scale] of [['in',4000,1],['out',6000,.65]]){bTimers.push(setTimeout(()=>{bText.textContent=g(key);orb.style.transition=`transform ${ms}ms ease-in-out`;orb.style.transform=`scale(${scale})`;},at));at+=ms;}
 bTimers.push(setTimeout(()=>{bText.textContent=g('breathDone');$g('bAgain').classList.remove('hidden');},at));};
let calmReturn;
$g('breathe').setAttribute('role','dialog');$g('breathe').setAttribute('aria-modal','true');$g('breathe').setAttribute('aria-labelledby','bText');
$g('calmBtn').onclick=()=>{calmReturn=document.activeElement;$g('breathe').classList.remove('hidden');runBreath();$g('bClose').focus();};
$g('bClose').onclick=()=>{bTimers.forEach(clearTimeout);$g('breathe').classList.add('hidden');calmReturn?.focus();};
$g('bAgain').onclick=runBreath;
$g('breathe').addEventListener('keydown',e=>{if(e.key==='Escape')$g('bClose').click();if(e.key==='Tab'){const buttons=[...$g('breathe').querySelectorAll('button:not(.hidden)')];if(buttons.length===1){e.preventDefault();buttons[0].focus();}else if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons[buttons.length-1].focus();}else if(!e.shiftKey&&document.activeElement===buttons[buttons.length-1]){e.preventDefault();buttons[0].focus();}}});

// Backup includes audio, drafts and preferences. Restore replaces records atomically.
async function packRecord(record){const next={...record};if(next.photo instanceof Blob){next.photo=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(next.photo);});}if(next.audio instanceof Blob){next.audio=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(next.audio);});}return next;}
function unpackRecord(record){const next={...record};if(next.photo){if(typeof next.photo!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]*$/i.test(next.photo))throw Error('Invalid photo');const [pm,pd]=next.photo.split(',');const pb=atob(pd);next.photo=new Blob([Uint8Array.from(pb,c=>c.charCodeAt(0))],{type:pm.slice(5,-7)});}if(next.audio){if(typeof next.audio!=='string'||!/^data:audio\/[a-z0-9.+-]+(?:;[a-z0-9.+-]+=[a-z0-9.+-]+)*;base64,[A-Za-z0-9+/=]*$/i.test(next.audio))throw Error('Invalid audio');const [meta,data]=next.audio.split(',');const binary=atob(data);next.audio=new Blob([Uint8Array.from(binary,c=>c.charCodeAt(0))],{type:meta.slice(5,-7)});}return next;}
const stores=['days','tasks','notes','drafts','tries','looks','arabic'];
function replaceRecords(records){return new Promise((resolve,reject)=>{if(!db)return reject(Error('No storage'));try{const tx=db.transaction(stores,'readwrite');stores.forEach(name=>{if(!records[name])return;const store=tx.objectStore(name);store.clear();records[name].forEach(record=>store.put(record));});tx.oncomplete=resolve;tx.onerror=tx.onabort=()=>reject(Error('Write failed'));}catch(e){reject(e);}});}
$g('backup').onclick=async()=>{try{await persistDraft();if(!db)throw Error('No storage');const data={format:'my-day-backup',version:1,exported:new Date().toISOString(),preferences:{routines:selectedRoutines,waterGoal,lang,theme}};for(const name of stores){if(name==='looks'&&lsGet('backup-photos')==='0')continue;data[name]=await Promise.all((await getAll(name)).map(packRecord));}const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='noviye-backup-'+TODAY+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch{toast(g('backupFail'));}};
$g('restore').onclick=()=>$g('backupFile').click();
$g('backupFile').onchange=async e=>{try{
 const file=e.target.files[0];if(!file)return;if(file.size>100*1024*1024)throw Error('Too large');
 const data=JSON.parse(await file.text());if(data.format!=='my-day-backup'||data.version!==1)throw Error('Format');
 const records={};for(const name of stores){if(name==='tries'&&data[name]==null)data[name]=[];if((name==='looks'||name==='arabic')&&data[name]==null)continue;if(!Array.isArray(data[name]))throw Error('Missing records');records[name]=data[name].map(record=>{if(!record||typeof record!=='object'||Array.isArray(record))throw Error('Record');const key=['days','drafts'].includes(name)?'date':'id';if(typeof record[key]!=='string'||!record[key])throw Error('Key');if(key==='date'&&(!/^\d{4}-\d{2}-\d{2}$/.test(record.date)||keyOf(fromKey(record.date))!==record.date))throw Error('Date');if(record.mood!=null&&(!Number.isInteger(Number(record.mood))||Number(record.mood)<1||Number(record.mood)>5))throw Error('Mood');if(name==='tasks'&&(typeof record.title!=='string'||!['daily','weekly'].includes(record.kind)||typeof record.period!=='string'))throw Error('Task');if(record.text!=null&&typeof record.text!=='string')throw Error('Text');if(record.good!=null&&(!Array.isArray(record.good)||record.good.length>3||record.good.some(x=>typeof x!=='string')))throw Error('Gratitude');if(record.routine!=null&&(typeof record.routine!=='object'||Array.isArray(record.routine)))throw Error('Routine');return unpackRecord(record);});}
 if(!confirm(g('importAsk')))return;replacingData=true;clearTimeout(draftTimer);await draftQueue;await replaceRecords(records);
 if(data.preferences){const prefs=data.preferences;if(Array.isArray(prefs.routines))lsSet('gentle-routines',JSON.stringify(prefs.routines.filter(id=>ALL_ITEMS.includes(id))));if(Number.isInteger(prefs.waterGoal)&&prefs.waterGoal>=1&&prefs.waterGoal<=16)lsSet('water-goal',prefs.waterGoal);if(['en','am'].includes(prefs.lang))lsSet('lang',prefs.lang);if(['light','dark'].includes(prefs.theme))lsSet('theme',prefs.theme);}
 location.reload();
 }catch{replacingData=false;toast(g('importFail'));}finally{e.target.value='';}};
$g('erase').onclick=async()=>{if(!confirm(g('eraseAsk')))return;try{replacingData=true;clearTimeout(draftTimer);await draftQueue;await replaceRecords(Object.fromEntries(stores.map(name=>[name,[]])));location.reload();}catch{replacingData=false;storageProblem();}};

// Give controls explicit labels; avoid relying on placeholders and emoji alone.
for(const [id,label] of [['nameIn',()=>t('namePh')],['g1',()=>g('good')],['g2',()=>t('good2')],['g3',()=>t('good3')],['text',()=>g('reflection')],['nTitle',()=>t('noteTitlePh')],['nText',()=>t('notePh')]])$g(id).setAttribute('aria-label',label());
$g('toast').setAttribute('role','status');
document.querySelectorAll('form.addrow input').forEach(input=>input.setAttribute('aria-label',input.getAttribute('data-ph')==='addDaily'?t('addDaily'):t('addWeekly')));
document.querySelectorAll('form.addrow button').forEach(button=>button.setAttribute('aria-label',t('start')));
