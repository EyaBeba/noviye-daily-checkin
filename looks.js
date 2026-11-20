/* Today's look (photos), Looks gallery, "on this day", optional PIN lock, and a shorter look-back tab. */
const LK = {
 en:{
  tab:'My month', add:"📸 Add today's look", addPast:'📸 Add a look', vibes:['Cozy','Comfy','Bold','Dressed up','Just me'],
  linePh:'One line about today (optional)', save:'Save', cancel:'Cancel', close:'Close', fav:'♡ Favourite', faved:'♥ Favourite',
  del:'Delete', delQ:'Delete?', title:'Looks 📸', empty:'Add a photo from the Today page, whenever you like.',
  favOnly:'♥ Favourites', all:'All', monthAgo:'A month ago today', photoFail:"Couldn't add this photo. Try another one.",
  backupPhotos:'Include photos in backups',
  pinTitle:'🔒 PIN lock', pinHint:'Ask for a 4-digit PIN when the page opens.', setPin:'Set a PIN', offPin:'Turn off PIN', pinOn:'PIN is on ✓',
  enterPin:'Enter your PIN', newPin:'Choose a 4-digit PIN', confirmPin:'Enter it again', mismatch:"They didn't match. Try again.", wrong:'Wrong PIN',
  forgot:'Forgot PIN?', forgotBody:"For your privacy, the PIN can't be recovered. You can reset it, but that deletes everything on this page. If you have a backup, you can restore it afterwards.",
  resetAll:'Delete everything and reset', back:'Back', currentPin:'Enter your current PIN'
 },
 am:{
  tab:'የኔ ወር', add:'📸 የዛሬ መልኬን ጨምሪ', addPast:'📸 መልክ ጨምሪ', vibes:['ሞቅ ያለ','ምቹ','ደፋር','ያማረ አለባበስ','እንደኔው'],
  linePh:'ስለ ዛሬ አንድ መስመር (ከፈለግሽ)', save:'አስቀምጪ', cancel:'ተዪው', close:'ዝጊ', fav:'♡ የምወደው', faved:'♥ የምወደው',
  del:'ሰርዢ', delQ:'ይሰረዝ?', title:'መልኮቼ 📸', empty:'ከ"ዛሬ" ገጽ በፈለግሽ ጊዜ ፎቶ ጨምሪ።',
  favOnly:'♥ የምወዳቸው', all:'ሁሉም', monthAgo:'ከአንድ ወር በፊት ዛሬ', photoFail:'ይህን ፎቶ መጨመር አልተቻለም። ሌላ ሞክሪ።',
  backupPhotos:'ፎቶዎችን በምትኬ ውስጥ አካትቺ',
  pinTitle:'🔒 የሚስጥር ቁጥር', pinHint:'ገጹ ሲከፈት 4 አሃዝ የሚስጥር ቁጥር ይጠይቃል።', setPin:'የሚስጥር ቁጥር አዘጋጂ', offPin:'የሚስጥር ቁጥሩን አጥፊ', pinOn:'የሚስጥር ቁጥር በርቷል ✓',
  enterPin:'የሚስጥር ቁጥርሽን አስገቢ', newPin:'4 አሃዝ የሚስጥር ቁጥር ምረጪ', confirmPin:'እንደገና አስገቢው', mismatch:'አልተመሳሰሉም። እንደገና ሞክሪ።', wrong:'የተሳሳተ ቁጥር',
  forgot:'ቁጥሩን ረሳሽው?', forgotBody:'ለግላዊነትሽ ሲባል ቁጥሩ መመለስ አይችልም። ዳግም ማስጀመር ትችያለሽ፣ ግን በዚህ ገጽ ያለው ሁሉ ይሰረዛል። ምትኬ ካለሽ በኋላ መመለስ ትችያለሽ።',
  resetAll:'ሁሉንም ሰርዢና እንደገና ጀምሪ', back:'ተመለሺ', currentPin:'አሁን ያለውን ቁጥር አስገቢ'
 }
};
const lk = k => LK[lang==='am'?'am':'en'][k];
const MAX_LOOKS = 3;

/* ---------- shorter look-back: new tab name, no 7-day row ---------- */
const lbBase = renderProgress;
renderProgress = function(){ lbBase(); const r = document.querySelector('#progress .recap'); if(r) r.remove(); };

/* ---------- photo helpers ---------- */
S.looks = null;
let looksLoading = null;
function loadLooks(){
 if(S.looks!==null) return Promise.resolve();
 if(!db) return Promise.resolve();   // storage not open yet: try again on the next render
 return looksLoading || (looksLoading = getAll('looks').then(r=>{ S.looks = r; }).catch(()=>{ S.looks = []; }));
}
function drawSmall(src, w, h){
 const max = 1080, sc = Math.min(1, max/Math.max(w, h));
 const c = document.createElement('canvas'); c.width = Math.max(1,Math.round(w*sc)); c.height = Math.max(1,Math.round(h*sc));
 c.getContext('2d').drawImage(src,0,0,c.width,c.height);
 return new Promise((ok,no)=>c.toBlob(b=>b && b.size ? ok(b) : no(Error('encode')), 'image/jpeg', 0.8));
}
async function shrink(file){
 try{ return await shrinkImg(file); }catch(e){}
 try{ if(window.createImageBitmap){ const bmp = await createImageBitmap(file); return await drawSmall(bmp, bmp.width, bmp.height); } }catch(e){}
 if(file.size && file.size < 6*1024*1024) return file;   // last resort: keep the photo as it is
 throw Error('photo');
}
function shrinkImg(file){
 return new Promise((resolve,reject)=>{
  const url = URL.createObjectURL(file), img = new Image();
  img.onload = () => {
   const max = 1080, sc = Math.min(1, max/Math.max(img.naturalWidth, img.naturalHeight));
   const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth*sc); c.height = Math.round(img.naturalHeight*sc);
   c.getContext('2d').drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url);
   c.toBlob(b=>b ? resolve(b) : reject(Error('encode')), 'image/jpeg', 0.8);
  };
  img.onerror = () => { URL.revokeObjectURL(url); reject(Error('decode')); };
  img.src = url;
 });
}
const urls = new Map();
function photoURL(look){ if(!urls.has(look.id)) urls.set(look.id, URL.createObjectURL(look.photo)); return urls.get(look.id); }
const looksOn = k => (S.looks||[]).filter(l=>l.date===k).sort((a,b)=>a.created-b.created);

/* ---------- sheets (add / view) ---------- */
const sheet = mk('div','sheet looksheet'); sheet.hidden = true; sheet.setAttribute('role','dialog'); sheet.setAttribute('aria-modal','true');
document.body.append(sheet);
function openSheet(build){ sheet.replaceChildren(); const box = mk('div','lbox'); build(box); sheet.append(box); sheet.hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet(){ sheet.hidden = true; document.body.style.overflow = ''; }
sheet.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSheet(); });

const picker = mk('input'); picker.type = 'file'; picker.accept = 'image/*'; picker.className = 'offscreen'; picker.tabIndex = -1; picker.setAttribute('aria-hidden','true'); document.body.append(picker);
// a second chooser that opens the camera straight away (front camera, for outfit photos)
const camera = mk('input'); camera.type = 'file'; camera.accept = 'image/*'; camera.setAttribute('capture','user');
camera.className = 'offscreen'; camera.tabIndex = -1; camera.setAttribute('aria-hidden','true'); document.body.append(camera);
camera.onchange = () => picker.onchange.call(camera);
picker.onchange = async function(){
 const input = this && this.files ? this : picker;
 const file = input.files[0]; input.value = ''; if(!file) return;
 let blob; try{ blob = await shrink(file); }catch(e){ toast(lk('photoFail')); return; }
 const prev = URL.createObjectURL(blob); let vibe = null;
 openSheet(box=>{
  const img = mk('img','lphoto'); img.src = prev; img.alt = '';
  const chips = mk('div','chips');
  lk('vibes').forEach((v,i)=>{ const b = mk('button',null,v); b.type='button'; b.onclick = () => { vibe = vibe===i?null:i; chips.querySelectorAll('button').forEach((x,j)=>x.classList.toggle('on', j===vibe)); }; chips.append(b); });
  const line = mk('input'); line.maxLength = 120; line.placeholder = lk('linePh'); line.setAttribute('aria-label', lk('linePh'));
  const row = mk('div','lbtns'); const cancel = mk('button','calm',lk('cancel')), save = mk('button','btn',lk('save'));
  cancel.type = save.type = 'button';
  cancel.onclick = () => { URL.revokeObjectURL(prev); closeSheet(); };
  save.onclick = async () => {
   save.disabled = true;
   const look = {id:Date.now()+'-'+Math.random().toString(36).slice(2,6), date:VIEW, created:Date.now(), photo:blob, vibe, line:line.value.trim(), fav:false};
   if(await put('looks', look)){ (S.looks = S.looks || []).push(look); URL.revokeObjectURL(prev); closeSheet(); toast(); renderLookRow(); renderGallery(); }
   else { save.disabled = false; toast(lk('photoFail')); }
  };
  row.append(cancel, save); box.append(img, chips, line, row);
 });
};

function viewLook(look){
 openSheet(box=>{
  const img = mk('img','lphoto'); img.src = photoURL(look); img.alt = '';
  const meta = mk('p','lmeta', fromKey(look.date).toLocaleDateString(LOC(),{weekday:'long',day:'numeric',month:'long'}) + (look.vibe!=null ? ' · ' + lk('vibes')[look.vibe] : ''));
  box.append(img, meta);
  if(look.line) box.append(mk('p','lline', look.line));
  const row = mk('div','lbtns');
  const fav = mk('button','calm', look.fav ? lk('faved') : lk('fav')); fav.type = 'button';
  fav.onclick = async () => { const next = {...look, fav:!look.fav}; if(await put('looks', next)){ Object.assign(look,next); fav.textContent = look.fav ? lk('faved') : lk('fav'); renderGallery(); } };
  const delBtn = mk('button','link danger', lk('del')); delBtn.type = 'button';
  delBtn.onclick = async () => {
   if(!delBtn.classList.contains('armed')){ delBtn.classList.add('armed'); delBtn.textContent = lk('delQ'); setTimeout(()=>{ delBtn.classList.remove('armed'); delBtn.textContent = lk('del'); }, 3000); return; }
   if(await del('looks', look.id)){ S.looks = S.looks.filter(x=>x.id!==look.id); if(urls.has(look.id)){ URL.revokeObjectURL(urls.get(look.id)); urls.delete(look.id); } closeSheet(); renderLookRow(); renderGallery(); }
  };
  const close = mk('button','btn', lk('close')); close.type = 'button'; close.onclick = closeSheet;
  row.append(fav, close); box.append(row, delBtn); close.focus();
 });
}

/* ---------- compact row on Today ---------- */
const lookRow = mk('div','lookrow');
document.querySelector('.quick-card').after(lookRow);
function thumb(look){ const b = mk('button','lthumb'); b.type = 'button'; const i = mk('img'); i.src = photoURL(look); i.alt = ''; b.append(i); b.onclick = () => viewLook(look); b.setAttribute('aria-label', lk('title')); return b; }
async function renderLookRow(){
 await loadLooks();
 lookRow.replaceChildren();
 const mine = looksOn(VIEW);
 const top = mk('div','lrow');
 mine.forEach(l=>top.append(thumb(l)));
 if(mine.length < MAX_LOOKS){
  if(!mine.length) top.append(mk('small','lklabel', VIEW===TODAY ? "📸 Today's look" : '📸 A look for this day'));
  const snap = mk('button','lookadd', '📷 Take a photo'); snap.type = 'button'; snap.onclick = () => camera.click();
  const pick = mk('button','lookadd', '🖼️ From gallery'); pick.type = 'button'; pick.onclick = () => picker.click();
  snap.setAttribute('aria-label', lk('add')+' with the camera'); pick.setAttribute('aria-label', lk('add')+' from your photos');
  top.append(snap, pick);
 }
 lookRow.append(top);
 const ago = fromKey(VIEW); ago.setMonth(ago.getMonth()-1); const old = looksOn(keyOf(ago));
 if(old.length){ const m = mk('div','lago'); m.append(mk('small',null,lk('monthAgo')+' 💭')); old.forEach(l=>m.append(thumb(l))); lookRow.append(m); }
}

/* ---------- gallery in "Your words" ---------- */
const gallery = mk('div','card gallery');
document.getElementById('journal').prepend(gallery);
let favFilter = false;
async function renderGallery(){
 await loadLooks();
 gallery.replaceChildren();
 const head = mk('div','ghead'); head.append(mk('h2',null,lk('title')));
 const list = [...(S.looks||[])].sort((a,b)=>b.date.localeCompare(a.date)||b.created-a.created);
 if(list.some(l=>l.fav)){ const f = mk('button','link', favFilter ? lk('all') : lk('favOnly')); f.type = 'button'; f.onclick = () => { favFilter = !favFilter; renderGallery(); }; head.append(f); }
 gallery.append(head);
 const shown = favFilter ? list.filter(l=>l.fav) : list;
 if(!shown.length){ gallery.append(mk('p','hint', lk('empty'))); return; }
 let month = '';
 let grid;
 shown.forEach(l=>{
  const mo = fromKey(l.date).toLocaleDateString(LOC(),{month:'long', year:'numeric'});
  if(mo!==month){ month = mo; gallery.append(mk('div','sub',mo)); grid = mk('div','ggrid'); gallery.append(grid); }
  const t = thumb(l); if(l.fav) t.append(mk('span','gfav','♥')); grid.append(t);
 });
}

/* ---------- PIN lock ---------- */
async function hashPin(pin){
 let salt = lsGet('pin-salt'); if(!salt){ salt = Math.random().toString(36).slice(2); lsSet('pin-salt', salt); }
 const text = 'my-day:'+salt+':'+pin;
 try{ const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)); return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
 catch(e){ let h = 0; for(const c of text) h = (h*31 + c.charCodeAt(0))|0; return 'x'+h; }
}
const lock = mk('div','sheet pinlock'); lock.hidden = true; lock.setAttribute('role','dialog'); lock.setAttribute('aria-modal','true');
document.body.append(lock);
function pinPad(title, onDone, extra){
 let code = '';
 lock.replaceChildren();
 const box = mk('div','pbox');
 const h = mk('h2',null,title), msg = mk('p','pmsg'), dots = mk('div','pdots');
 const draw = () => { dots.replaceChildren(...[0,1,2,3].map(i=>mk('i', i<code.length?'on':''))); };
 const keys = mk('div','pkeys');
 const press = async k => {
  if(k==='⌫'){ code = code.slice(0,-1); draw(); return; }
  if(code.length>=4) return;
  code += k; draw();
  if(code.length===4){ const c = code; code = ''; setTimeout(draw, 250); const err = await onDone(c); if(err){ msg.textContent = err; dots.classList.remove('shake'); void dots.offsetWidth; dots.classList.add('shake'); } }
 };
 ['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(k=>{
  const b = mk('button', k==='' ? 'pblank' : '', k); b.type = 'button'; if(k==='') b.disabled = true; else b.onclick = () => press(k);
  if(k==='⌫') b.setAttribute('aria-label','Delete');
  keys.append(b);
 });
 draw(); box.append(h, dots, msg, keys); if(extra) box.append(extra(box)); lock.append(box);
 lock.hidden = false; document.body.style.overflow = 'hidden';
 lock.onkeydown = e => { if(/^[0-9]$/.test(e.key)) press(e.key); if(e.key==='Backspace') press('⌫'); };
 (keys.querySelector('button')).focus();
}
function hideLock(){ lock.hidden = true; document.body.style.overflow = ''; document.documentElement.classList.remove('locked'); }
function showUnlock(){
 pinPad(lk('enterPin'), async c => {
  if(await hashPin(c)===lsGet('pin-hash')){ hideLock(); return null; }
  return lk('wrong');
 }, () => { const f = mk('button','link',lk('forgot')); f.type = 'button'; f.onclick = forgotFlow; return f; });
}
function forgotFlow(){
 lock.replaceChildren();
 const box = mk('div','pbox');
 box.append(mk('h2',null,lk('forgot')), mk('p','pmsg pinfo',lk('forgotBody')));
 const reset = mk('button','calm danger',lk('resetAll')); reset.type = 'button';
 reset.onclick = async () => {
  try{ if(db) await replaceRecords(Object.fromEntries(stores.map(n=>[n,[]]))); }catch(e){}
  ['pin-hash','pin-salt'].forEach(k=>{ try{ localStorage.removeItem('novi:'+k); }catch(e){} });
  location.reload();
 };
 const back = mk('button','btn',lk('back')); back.type = 'button'; back.onclick = showUnlock;
 box.append(back, reset); lock.append(box);
}
function setPinFlow(){
 document.getElementById('settingsPanel').hidden = true;
 let first = null;
 const step1 = () => pinPad(lk('newPin'), async c => { first = c; step2(); return null; }, cancelBtn);
 const step2 = () => pinPad(lk('confirmPin'), async c => {
  if(c!==first){ step1(); setTimeout(()=>{ lock.querySelector('.pmsg').textContent = lk('mismatch'); }, 0); return null; }
  lsSet('pin-hash', await hashPin(c)); hideLock(); toast(lk('pinOn')); renderPinSetting(); return null;
 }, cancelBtn);
 step1();
}
function offPinFlow(){
 document.getElementById('settingsPanel').hidden = true;
 pinPad(lk('currentPin'), async c => {
  if(await hashPin(c)!==lsGet('pin-hash')) return lk('wrong');
  ['pin-hash','pin-salt'].forEach(k=>{ try{ localStorage.removeItem('novi:'+k); }catch(e){} });
  hideLock(); toast(); renderPinSetting(); return null;
 }, cancelBtn);
}
function cancelBtn(){ const b = mk('button','link',lk('cancel')); b.type = 'button'; b.onclick = hideLock; return b; }
if(lsGet('pin-hash')) showUnlock();
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
 if(document.hidden){ hiddenAt = Date.now(); return; }
 if(lsGet('pin-hash') && lock.hidden && hiddenAt && Date.now()-hiddenAt > 60000){ closeSheet(); showUnlock(); }
});

/* ---------- settings: PIN + photos in backup ---------- */
const pinBox = mk('div','xsettings pinset');
function renderPinSetting(){
 pinBox.replaceChildren();
 pinBox.append(mk('h3',null,lk('pinTitle')), mk('p',null, lsGet('pin-hash') ? lk('pinOn') : lk('pinHint')));
 const b = mk('button','calm', lsGet('pin-hash') ? lk('offPin') : lk('setPin')); b.type = 'button';
 b.onclick = lsGet('pin-hash') ? offPinFlow : setPinFlow;
 pinBox.append(b);
}
(function(){
 const settings = document.getElementById('settings'); if(!settings) return;
 const privacy = settings.querySelector('[data-g="privacy"]'); privacy ? privacy.before(pinBox) : settings.append(pinBox);
 const lab = mk('label','choice'); const cb = mk('input'); cb.type = 'checkbox'; cb.checked = lsGet('backup-photos')!=='0';
 const txt = mk('span'); lab.append(cb, txt); cb.onchange = () => lsSet('backup-photos', cb.checked?'1':'0');
 settings.querySelector('.backup-actions').before(lab);
 const label = () => { txt.textContent = '📸 ' + lk('backupPhotos'); renderPinSetting(); document.querySelector('[data-tab="progress"]').textContent = lk('tab'); };
 const lb = applyLang; applyLang = function(){ lb(); label(); renderLookRow(); renderGallery(); };
 const vb = renderView; renderView = function(){ vb(); renderLookRow(); };
 label();
})();

/* Her name in Amharic script when the page is in Amharic. */
const greetBase = setGreeting;
setGreeting = function(){
 greetBase();
 if(lang==='am'){ const h = document.getElementById('greet'); h.textContent = h.textContent.replace(/Noviye|Noviye|Novi/g, m => m==='Noviye' ? 'ኖቪዬ' : 'ኖቪዬ'); }
};
setGreeting();
