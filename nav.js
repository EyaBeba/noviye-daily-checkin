/* Phone back button behaves like an app: it closes what is open (a sheet, settings, the calm screen),
   then goes back to Today, and only leaves the page from Today. */
(function(){
 const layers = [
  {el:()=>document.getElementById('breathe'), open:e=>e && !e.classList.contains('hidden'), close:()=>document.getElementById('bClose')?.click()},
  {el:()=>document.getElementById('settingsPanel'), open:e=>e && !e.hidden, close:()=>document.querySelector('#settingsPanel .sheet-close')?.click()},
  {el:()=>document.querySelector('.looksheet'), open:e=>e && !e.hidden, close:()=>{ try{ closeSheet(); }catch(err){} if(typeof renderArabic==='function') renderArabic(); }}
 ];
 const anyOpen = () => layers.some(l=>l.open(l.el()));
 const onToday = () => !document.getElementById('today').classList.contains('hidden');
 let fromBack = false;

 // remember a step in history when something opens, so "back" has somewhere to go
 let wasOpen = false;
 const sync = () => {
  const now = anyOpen();
  if(now && !wasOpen) history.pushState({layer:true}, '');
  if(!now && wasOpen && !fromBack && history.state && history.state.layer){ fromBack = true; history.back(); }
  wasOpen = now;
 };
 const watch = new MutationObserver(sync);
 const observeAll = () => layers.forEach(l=>{ const e = l.el(); if(e && !e.__watched){ e.__watched = true; watch.observe(e,{attributes:true, attributeFilter:['hidden','class']}); } });
 observeAll(); setTimeout(observeAll, 1500);

 // leaving Today for another tab also adds a step
 document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click', () => {
  if(fromBack) return;
  const toToday = b.dataset.tab==='today';
  if(!toToday && !(history.state && history.state.tab)) history.pushState({tab:true}, '');
  if(toToday && history.state && history.state.tab){ fromBack = true; history.back(); }
 }));

 window.addEventListener('popstate', () => {
  if(fromBack){ fromBack = false; return; }       // our own history.back() after closing something
  fromBack = true;
  const top = layers.find(l=>l.open(l.el()));
  if(top) top.close();
  else if(!onToday()) document.querySelector('[data-tab="today"]').click();
  setTimeout(()=>{ fromBack = false; wasOpen = anyOpen(); }, 0);
 });
})();
