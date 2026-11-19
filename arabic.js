/* Arabic for daily life in Saudi Arabia, a few minutes a day:
   word of the day (with spoken audio), 2-minute flashcards that bring back the hard ones,
   and a notebook for words she hears at work. Progress is saved with her other entries. */

// [Arabic, how it sounds, meaning, note]   ordered from first-day basics to work and errands
const AR_WORDS = [
 ['السلام عليكم','as-salamu alaykum','Hello (peace be upon you)','The most common greeting'],
 ['وعليكم السلام','wa alaykum as-salam','Hello back (reply)','How to answer "as-salamu alaykum"'],
 ['مرحبا','marhaba','Hi',''],
 ['صباح الخير','sabah al-khair','Good morning',''],
 ['صباح النور','sabah an-noor','Good morning (reply)','Answer to "sabah al-khair"'],
 ['مساء الخير','masa al-khair','Good evening',''],
 ['كيف الحال؟','kaif al-haal?','How are you?',''],
 ['الحمد لله','al-hamdu lillah','I am fine, thank God','The usual answer to "how are you?"'],
 ['شكراً','shukran','Thank you',''],
 ['عفواً','afwan','You are welcome / excuse me',''],
 ['مع السلامة','ma\'a as-salama','Goodbye',''],
 ['إيه','eh','Yes','Everyday Saudi "yes"'],
 ['لا','la','No',''],
 ['لو سمحت','law samaht','Please / excuse me','To get someone\'s attention politely'],
 ['تفضل','tfaddal','Here you go / go ahead','Offering something or letting someone go first'],
 ['آسفة','aasfa','I am sorry','Said by a woman (a man says "aasif")'],
 ['يعطيك العافية','ya\'tik al-afya','Thanks for your effort','Said to someone working. Very common at work'],
 ['الله يعافيك','allah y\'afik','Reply to "ya\'tik al-afya"',''],
 ['إن شاء الله','in sha allah','God willing / hopefully','Used for anything in the future'],
 ['ما شاء الله','ma sha allah','How wonderful','Said when admiring something'],
 ['ما فهمت','ma fihimt','I did not understand',''],
 ['ممكن تعيد؟','mumkin t\'eed?','Can you repeat?',''],
 ['شوي شوي','shway shway','Slowly, please','Also means "little by little"'],
 ['أتكلم عربي شوي','atkallam arabi shway','I speak a little Arabic',''],
 ['أبغى','abgha','I want','Saudi everyday word'],
 ['ما أبغى','ma abgha','I do not want',''],
 ['وش؟','wesh?','What?','Saudi "what?"'],
 ['وين؟','wain?','Where?',''],
 ['متى؟','mata?','When?',''],
 ['ليش؟','laish?','Why?',''],
 ['كم؟','kam?','How much? / How many?',''],
 ['ما في مشكلة','ma fi mushkila','No problem',''],
 ['يلا','yalla','Let us go / come on',''],
 ['خلاص','khalas','Done / that is enough',''],
 ['الحين','al-heen','Now','Saudi word for "now"'],
 ['بعدين','ba\'dain','Later',''],
 ['اليوم','al-yoom','Today',''],
 ['بكرة','bukra','Tomorrow',''],
 ['دوام','dawam','Work shift / working hours','"Ana fi ad-dawam" = I am at work'],
 ['استراحة','istiraha','Break',''],
 ['إجازة','ijaza','Day off / holiday',''],
 ['مشغولة','mashghoola','Busy','Said by a woman (a man says "mashghool")'],
 ['تعبانة','ta\'bana','Tired','Said by a woman (a man says "ta\'ban")'],
 ['زميلتي','zameelti','My colleague','For a female colleague ("zameeli" for a male)'],
 ['المدير','al-mudeer','The manager',''],
 ['ساعدني لو سمحت','sa\'idni law samaht','Please help me',''],
 ['بكم هذا؟','bikam hatha?','How much is this?',''],
 ['غالي','ghali','Expensive',''],
 ['رخيص','rakhees','Cheap',''],
 ['الحساب لو سمحت','al-hisab law samaht','The bill, please',''],
 ['موية','moya','Water','Saudi everyday word for water'],
 ['قهوة','gahwa','Coffee','Saudi pronunciation with a "g"'],
 ['شاي','shai','Tea',''],
 ['يمين','yameen','Right',''],
 ['يسار','yasar','Left',''],
 ['على طول','ala tool','Straight ahead',''],
 ['وقف هنا لو سمحت','waggif hina law samaht','Stop here, please','For a taxi or driver'],
 ['واحد','wahid','One',''],['اثنين','ithnain','Two',''],['ثلاثة','thalatha','Three',''],['أربعة','arba\'a','Four',''],['خمسة','khamsa','Five',''],
 ['ستة','sitta','Six',''],['سبعة','sab\'a','Seven',''],['ثمانية','thamanya','Eight',''],['تسعة','tis\'a','Nine',''],['عشرة','ashara','Ten','']
];
const AR_GAPS = [1,2,4,7,14,30];          // days until a card comes back, by how well she knows it
const AR_SESSION = 5, AR_NEW = 3;

/* ---------- storage: her progress lives in its own store, included in backups ---------- */
S.arabic = null;
let arLoading = null;
function loadArabic(){
 if(S.arabic!==null || !db) return Promise.resolve();
 return arLoading || (arLoading = getAll('arabic').then(r=>{ S.arabic = r; }).catch(()=>{ S.arabic = []; }));
}
const arRec = id => (S.arabic||[]).find(r=>r.id===id);
async function arPut(rec){ if(await put('arabic', rec)){ S.arabic = (S.arabic||[]).filter(r=>r.id!==rec.id).concat(rec); return true; } return false; }
const builtIn = i => ({id:'w'+i, ar:AR_WORDS[i][0], tr:AR_WORDS[i][1], en:AR_WORDS[i][2], note:AR_WORDS[i][3]});
const allCards = () => [
 ...AR_WORDS.map((_,i)=>builtIn(i)).filter(w=>arRec(w.id)),
 ...(S.arabic||[]).filter(r=>r.custom && r.en)
].map(w=>({...w, ...(arRec(w.id)||{})}));
const learned = () => (S.arabic||[]).filter(r=>(r.box||0)>=2).length;   // known on two different days
const practising = () => (S.arabic||[]).filter(r=>(r.box||0)<2 && (!r.custom || r.en)).length;
const todayNum = () => numOf(TODAY);
const dueCards = () => allCards().filter(c=>(c.due||0)<=todayNum());

/* word of the day walks through the list from the day she started */
function wordOfDay(){
 let start = Number(lsGet('ar-start')); if(!start){ start = todayNum(); lsSet('ar-start', start); }
 return builtIn(Math.max(0, todayNum()-start) % AR_WORDS.length);
}
async function addToDeck(w){ if(!arRec(w.id)) await arPut({id:w.id, box:0, due:todayNum(), added:TODAY}); }

/* ---------- sound ----------
   Built-in phrases: Google's Arabic voice (needs internet, works on any phone).
   Offline or if that fails: the phone's own text-to-speech. Her own words: her recording. */
const canSpeak = 'speechSynthesis' in window;
let arVoice = null, player = null;
function findVoice(){ try{ const v = speechSynthesis.getVoices(); arVoice = v.find(x=>/^ar[-_]SA/i.test(x.lang)) || v.find(x=>/^ar/i.test(x.lang)) || null; }catch(e){} }
if(canSpeak){ findVoice(); try{ speechSynthesis.addEventListener('voiceschanged', findVoice); }catch(e){} }
function phoneVoice(text){
 if(!canSpeak){ toast('Sound is not available on this phone'); return; }
 try{
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = arVoice ? arVoice.lang : 'ar-SA'; if(arVoice) u.voice = arVoice; u.rate = 0.8;
  speechSynthesis.speak(u);
  if(!arVoice) setTimeout(()=>{ findVoice(); if(!arVoice) toast("Couldn't play the sound. Check your internet and try again."); }, 1200);
 }catch(e){}
}
function playURL(url, onFail){
 try{ if(player){ player.pause(); } }catch(e){}
 player = new Audio(url);
 let failed = false; const fail = () => { if(!failed){ failed = true; onFail && onFail(); } };
 player.onerror = fail;
 const p = player.play(); if(p && p.catch) p.catch(fail);
}
function say(text){
 if(!text) return;
 if(navigator.onLine === false){ phoneVoice(text); return; }
 playURL('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q='+encodeURIComponent(text), ()=>phoneVoice(text));
}
const recURLs = new Map();
function playRecording(rec){ if(!recURLs.has(rec.id)) recURLs.set(rec.id, URL.createObjectURL(rec.audio)); playURL(recURLs.get(rec.id), ()=>toast("Couldn't play this recording")); }
function speakBtn(text, rec){
 const b = mk('button','arsay', rec && rec.audio ? '▶️' : '🔊'); b.type = 'button'; b.setAttribute('aria-label', rec && rec.audio ? 'Play your recording' : 'Hear it');
 b.onclick = e => { e.stopPropagation(); rec && rec.audio ? playRecording(rec) : say(text); };
 if(!(rec && rec.audio) && !text) b.hidden = true;
 return b;
}

/* ---------- Today card ---------- */
const arCard = mk('div','card arabic');
(document.querySelector('.food') || document.querySelector('.quick-card')).after(arCard);
async function renderArabic(){
 await loadArabic();
 arCard.replaceChildren();
 const w = wordOfDay();
 const head = mk('div','arhead'); head.append(mk('small',null,'🇸🇦 Arabic · word of the day'));
 const word = mk('div','arword');
 const a = mk('p','arbig',w.ar); a.lang = 'ar'; a.dir = 'rtl';
 word.append(a, speakBtn(w.ar));
 arCard.append(head, word, mk('p','artr',w.tr), mk('p','aren',w.en));
 if(w.note) arCard.append(mk('p','arnote',w.note));
 const due = dueCards().length, n = learned();
 const row = mk('div','lbtns');
 const prac = mk('button','btn', due ? `Practise · ${Math.min(due+AR_NEW, AR_SESSION)} cards` : 'Practise · 2 min'); prac.type = 'button';
 prac.onclick = async () => { await addToDeck(w); startPractice(); };
 const heard = mk('button','calm','+ Word I heard'); heard.type = 'button'; heard.onclick = openHeard;
 row.append(prac, heard); arCard.append(row);
 const pr = practising(), bits = [];
 if(n) bits.push(`${n} learned 🌱`); if(pr) bits.push(`${pr} practising`); if(due) bits.push(`${due} to review today`);
 arCard.append(mk('small','arstat', bits.length ? bits.join(' · ') : 'Each practice takes about 2 minutes.'));
}

/* ---------- 2-minute flashcards ---------- */
function startPractice(){
 const due = dueCards().sort((x,y)=>(x.box||0)-(y.box||0));
 const fresh = AR_WORDS.map((_,i)=>builtIn(i)).filter(w=>!arRec(w.id)).slice(0, Math.max(0, Math.min(AR_NEW, AR_SESSION-due.length)));
 const cards = [...due.slice(0, AR_SESSION), ...fresh].slice(0, AR_SESSION);
 if(!cards.length){ toast('All caught up for today 🌱'); return; }
 let i = 0, known = 0;
 const show = () => openSheet(box=>{
  const c = {...cards[i], ...(arRec(cards[i].id)||{})};
  const englishFirst = (c.box||0)>=2;   // once she recognises it, ask her to say it
  box.append(mk('small','arprog',`${i+1} of ${cards.length}`));
  const card = mk('div','flash');
  if(englishFirst){ card.append(mk('p','aren big',c.en), mk('p','hint','How do you say it in Arabic?')); }
  else { const a = mk('p','arbig',c.ar||c.tr); a.lang='ar'; a.dir='rtl'; card.append(a); if(c.ar && c.tr!==c.ar) card.append(mk('p','artr',c.tr)); if(c.ar || c.audio) card.append(speakBtn(c.ar, c)); card.append(mk('p','hint','What does it mean?')); }
  const reveal = mk('button','btn','Show answer'); reveal.type = 'button';
  const answer = mk('div','flashans'); answer.hidden = true;
  if(englishFirst){ const a = mk('p','arbig',c.ar||c.tr); a.lang='ar'; a.dir='rtl'; answer.append(a); if(c.ar && c.tr!==c.ar) answer.append(mk('p','artr',c.tr)); if(c.ar || c.audio) answer.append(speakBtn(c.ar, c)); }
  else answer.append(mk('p','aren big',c.en));
  if(c.note) answer.append(mk('p','arnote',c.note));
  const grade = mk('div','lbtns'); grade.hidden = true;
  const again = mk('button','calm','Still learning'), good = mk('button','btn','Know it ✓'); again.type = good.type = 'button';
  const next = async ok => {
   const b = ok ? Math.min((c.box||0)+1, AR_GAPS.length-1) : 0;
   await arPut({...(arRec(c.id)||{}), id:c.id, box:b, due:todayNum()+(ok ? AR_GAPS[b] : 1), seen:TODAY});
   if(ok) known++;
   i++; i<cards.length ? show() : finish();
  };
  again.onclick = () => next(false); good.onclick = () => next(true);
  grade.append(again, good);
  reveal.onclick = () => { reveal.hidden = true; answer.hidden = false; grade.hidden = false; if(englishFirst){ c.audio ? playRecording(c) : c.ar && say(c.ar); } };
  const stop = mk('button','link','Stop for now'); stop.type = 'button'; stop.onclick = () => { closeSheet(); renderArabic(); };
  card.append(answer); box.append(card, reveal, grade, stop);
 });
 const finish = async () => {
  const d = day(TODAY); d.arabic = (d.arabic||0) + cards.length; await saveDay(d, true);
  openSheet(box=>{
   box.append(mk('p','arbig','🌱'), mk('h2',null,'Nice work!'), mk('p','hint',`You knew ${known} of ${cards.length}. The ones you are still learning come back tomorrow.`));
   const done = mk('button','btn','Done'); done.type = 'button'; done.onclick = () => { closeSheet(); renderArabic(); };
   box.append(done);
  });
  petals();
 };
 show();
}

/* ---------- words she hears at work ---------- */
function openHeard(){
 openSheet(box=>{
  box.append(mk('h2',null,'Words I heard 👂'), mk('p','hint','Write how it sounds (or in Arabic if you can). Add the meaning now or later. Words with a meaning join your practice.'));
  const sound = mk('input'); sound.maxLength = 60; sound.placeholder = 'How it sounds, e.g. "mafi mushkila"'; sound.setAttribute('aria-label','How it sounds');
  const mean = mk('input'); mean.maxLength = 80; mean.placeholder = 'What it means (optional)'; mean.setAttribute('aria-label','What it means');
  const where = mk('input'); where.maxLength = 80; where.placeholder = 'Where you heard it (optional)'; where.setAttribute('aria-label','Where you heard it');
  // record the word by voice: the way she heard it, or saying it herself
  let voice = null, mr = null, chunks = [], t0 = 0, tick = null, stream = null;
  const recRow = mk('div','hrec'), recBtn = mk('button','recbtn small','🎙️'), recTxt = mk('small',null,'Or record it: tap 🎙️ and say the word'), recPlay = mk('button','arsay','▶️');
  recBtn.type = recPlay.type = 'button'; recBtn.setAttribute('aria-label','Record the word'); recPlay.setAttribute('aria-label','Play recording'); recPlay.hidden = true;
  const stopRec = () => { if(mr && mr.state!=='inactive') mr.stop(); };
  recBtn.onclick = async () => {
   if(mr && mr.state==='recording'){ stopRec(); return; }
   try{ stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false, noiseSuppression:false, autoGainControl:false}}); }
   catch(e){ recTxt.textContent = "Couldn't reach the microphone. Please allow it, or type instead."; return; }
   const ty = ['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/aac'].find(x=>{ try{ return MediaRecorder.isTypeSupported(x); }catch(e){ return false; } }) || '';
   mr = ty ? new MediaRecorder(stream,{mimeType:ty}) : new MediaRecorder(stream); chunks = [];
   mr.ondataavailable = e => { if(e.data && e.data.size) chunks.push(e.data); };
   mr.onstop = () => { clearInterval(tick); stream.getTracks().forEach(x=>x.stop()); recBtn.classList.remove('live'); recBtn.textContent = '🎙️';
    voice = new Blob(chunks,{type:mr.mimeType||ty||'audio/webm'}); recPlay.hidden = !voice.size; recTxt.textContent = voice.size ? 'Recorded ✓ Tap ▶️ to listen, or 🎙️ to redo' : 'Nothing recorded, try again'; };
   mr.start(500); t0 = Date.now(); recBtn.classList.add('live'); recBtn.textContent = '■';
   recTxt.textContent = 'Recording… tap ■ to stop';
   tick = setInterval(()=>{ const sec = Math.round((Date.now()-t0)/1000); recTxt.textContent = `Recording… 0:${String(sec).padStart(2,'0')} · tap ■ to stop`; if(sec>=20) stopRec(); }, 500);
  };
  recPlay.onclick = () => { if(voice) playURL(URL.createObjectURL(voice), ()=>toast("Couldn't play this recording")); };
  if(!(navigator.mediaDevices && window.MediaRecorder)) recRow.hidden = true;
  recRow.append(recBtn, recTxt, recPlay);
  const btns = mk('div','lbtns'); const close = mk('button','calm','Close'), save = mk('button','btn','Save word'); close.type = save.type = 'button';
  close.onclick = () => { stopRec(); closeSheet(); renderArabic(); };
  save.onclick = async () => {
   if(mr && mr.state==='recording'){ stopRec(); await new Promise(r=>setTimeout(r,300)); }
   const tr = sound.value.trim() || (voice ? '🎙️ Voice note' : ''); if(!tr){ sound.focus(); return; }
   const isArabic = /[؀-ۿ]/.test(tr);
   const rec = {id:'h'+Date.now(), custom:true, ar:isArabic?tr:'', tr, en:mean.value.trim(), note:where.value.trim() ? 'Heard: '+where.value.trim() : '', box:0, due:todayNum(), added:TODAY};
   if(voice && voice.size) rec.audio = voice;
   if(await arPut(rec)){ toast(rec.en ? 'Saved, and added to your practice 🌱' : 'Saved. Add the meaning when you know it'); openHeard(); }
  };
  btns.append(close, save); box.append(sound, recRow, mean, where, btns);
  const mine = (S.arabic||[]).filter(r=>r.custom).sort((a,b)=>b.id.localeCompare(a.id));
  if(mine.length){
   box.append(mk('div','sub','Your words'));
   mine.forEach(r=>{
    const row = mk('div','hrow');
    const t = mk('div','htop'); t.append(mk('p',null,r.tr)); if(r.audio || r.ar) t.append(speakBtn(r.ar, r)); row.append(t);
    if(r.en) row.append(mk('small',null,r.en));
    else { const m = mk('input'); m.placeholder = 'Add meaning…'; m.maxLength = 80; m.setAttribute('aria-label','Meaning for '+r.tr);
     m.onchange = async () => { const v = m.value.trim(); if(v && await arPut({...r, en:v, due:todayNum()})){ toast('Added to your practice 🌱'); openHeard(); } };
     row.append(m); }
    const del = mk('button','link','Delete'); del.type = 'button';
    del.onclick = async () => { if(!del.classList.contains('armed')){ del.classList.add('armed'); del.textContent='Delete?'; setTimeout(()=>{ del.classList.remove('armed'); del.textContent='Delete'; },3000); return; }
     if(await del_('arabic', r.id)){ S.arabic = S.arabic.filter(x=>x.id!==r.id); openHeard(); } };
    row.append(del); box.append(row);
   });
  }
  setTimeout(()=>sound.focus(), 0);
 });
}
const del_ = (store, key) => del(store, key);

/* ---------- My month: Arabic progress ---------- */
function arabicMonthCard(){
 const card = mk('div','card armonth'); card.append(mk('h2',null,'Arabic 🇸🇦'));
 const days = lastDays(28).filter(k=>(S.days[k]||{}).arabic).length;
 const n = learned(), inDeck = (S.arabic||[]).length, heard = (S.arabic||[]).filter(r=>r.custom).length;
 if(!inDeck){ card.append(mk('p','hint','Start with the word of the day on Today. Your progress will grow here.')); return card; }
 const stats = mk('div','stats');
 [[n,'words learned'],[practising(),'practising'],[days,'practice days']].forEach(([v,l])=>{ const s = mk('div','stat'); s.append(mk('b',null,String(v)), mk('span',null,l)); stats.append(s); });
 card.append(stats);
 const bar = mk('div','bar'); const fill = mk('i'); fill.style.width = Math.round(Math.min(n, AR_WORDS.length)/AR_WORDS.length*100)+'%'; fill.style.background = 'var(--rose)'; bar.append(fill);
 card.append(mk('p','hint',`${Math.min(n, AR_WORDS.length)} of ${AR_WORDS.length} everyday phrases learned${heard ? ` · ${heard} words you heard yourself` : ''}`), bar);
 return card;
}
const monthBaseAr = renderProgress;
renderProgress = function(){ monthBaseAr(); loadArabic().then(()=>{ const sec = document.getElementById('progress'); sec.querySelector('.armonth')?.remove(); const f = sec.querySelector('.foodins'); const c = arabicMonthCard(); f ? f.after(c) : sec.append(c); }); };
const viewBaseAr = renderView;
renderView = function(){ viewBaseAr(); renderArabic(); };
