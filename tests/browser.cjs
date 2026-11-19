const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'test-results'); fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{const file=path.join(root,req.url==='/'?'index.html':req.url.split('?')[0]);if(!file.startsWith(root)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{
 await new Promise(r=>server.listen(4319,'127.0.0.1',r));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true});
 const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4319');await page.getByRole('heading',{name:'Your small check-in'}).waitFor();
 assert.match(await page.locator('#greet').innerText(),/Hiwiye/);
 assert.equal(await page.locator('#save').isDisabled(),true);
 assert.equal(await page.locator('.summary').isVisible(),false);
 assert.equal(await page.locator('#longer').getAttribute('open'),null);
 await page.screenshot({path:path.join(out,'hiwi-mobile.png'),fullPage:true});
 await page.screenshot({path:path.join(out,'hiwiye-preview.png')});
 await page.getByRole('button',{name:'Unsettled',exact:true}).click();
 await page.getByRole('button',{name:'Rest',exact:true}).click();
 await page.locator('#longer>summary').click();await page.locator('#text').fill('A difficult day, and I can rest.');
 await page.waitForTimeout(500);await page.reload();await page.waitForTimeout(400);
 assert.equal(await page.locator('#text').inputValue(),'A difficult day, and I can rest.');
 assert.equal(await page.getByRole('button',{name:'Rest',exact:true}).getAttribute('aria-pressed'),'true');
 await page.locator('#save').click();await page.locator('#done').waitFor({state:'visible'});
 assert.match(await page.locator('#doneMsg').innerText(),/Hiwiyeye/);
 await page.reload();await page.locator('#done').waitFor({state:'visible'});
 await page.getByRole('button',{name:'A little look back',exact:true}).click();
 assert.equal(await page.locator('#progress').innerText().then(t=>t.includes('%')),false);
 await page.getByRole('button',{name:'Tasks',exact:true}).click();
 await page.locator('form[data-kind="daily"] input').fill('A small thing');await page.locator('form[data-kind="daily"] button').click();
 await page.getByLabel('A small thing',{exact:true}).check();await page.waitForTimeout(200);
 await page.reload();await page.getByRole('button',{name:'Tasks',exact:true}).click();assert.equal(await page.getByLabel('A small thing',{exact:true}).isChecked(),true);
 await page.locator('#settings>summary').click();
 const downloadPromise=page.waitForEvent('download');await page.locator('#backup').click();const download=await downloadPromise;await download.saveAs(path.join(out,'backup-test.json'));
 const backup=JSON.parse(fs.readFileSync(path.join(out,'backup-test.json'),'utf8'));assert.equal(backup.days[0].text,'A difficult day, and I can rest.');
 await page.getByRole('button',{name:'Today',exact:true}).click();await page.locator('#calmBtn').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#breathe').isVisible(),false);
 await page.locator('#langBtn').click();assert.equal(await page.locator('html').getAttribute('lang'),'am');await page.locator('#langBtn').click();
 await page.locator('#themeBtn').click();await page.waitForTimeout(400);await page.screenshot({path:path.join(out,'hiwi-dark.png'),fullPage:true});
 await page.setViewportSize({width:1280,height:900});await page.locator('#themeBtn').click();await page.waitForTimeout(400);await page.screenshot({path:path.join(out,'hiwi-desktop.png'),fullPage:true});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 // Restore and deletion must not resurrect drafts during the reload.
 page.on('dialog',dialog=>dialog.accept());
 await page.locator('#backupFile').setInputFiles(path.join(out,'backup-test.json'));await page.waitForTimeout(500);
 await page.getByRole('button',{name:'Tasks',exact:true}).click();assert.equal(await page.getByLabel('A small thing',{exact:true}).isChecked(),true);
 await page.locator('#settings>summary').click();await page.locator('#erase').click();await page.waitForTimeout(500);
 assert.equal(await page.locator('#text').inputValue(),'');
 assert.equal(await page.evaluate(async()=>{const d=await new Promise(r=>{const q=indexedDB.open('my-day');q.onsuccess=()=>r(q.result);});const n=await new Promise(r=>{const q=d.transaction('days').objectStore('days').count();q.onsuccess=()=>r(q.result);});d.close();return n;}),0);
 // A failed write should retain the form and explain that nothing was saved.
 await page.getByRole('button',{name:'Low',exact:true}).click();
 await page.evaluate(()=>db.close());await page.locator('#save').click();await page.locator('#storageWarning').waitFor({state:'visible'});
 assert.equal(await page.locator('#done').isVisible(),false);
 // The same app left open overnight starts the new calendar day.
 const midnight=await context.newPage();await midnight.clock.install({time:new Date('2026-11-17T23:59:00')});await midnight.goto('http://127.0.0.1:4319');await midnight.waitForTimeout(200);
 await midnight.getByRole('button',{name:'Okay',exact:true}).click();await midnight.locator('#longer>summary').click();await midnight.locator('#text').fill('Before midnight');await midnight.waitForTimeout(400);
 await midnight.clock.fastForward(65000);await midnight.waitForTimeout(300);
 assert.equal(await midnight.evaluate(()=>TODAY),'2026-11-18');assert.equal(await midnight.locator('#text').inputValue(),'');
 await midnight.locator('#prevDay').click();await midnight.waitForTimeout(300);assert.equal(await midnight.locator('#text').inputValue(),'Before midnight');
 // Existing v2 data and audio migrate without being rewritten or rolled forward.
 const legacyContext=await browser.newContext({viewport:{width:320,height:760}}),legacy=await legacyContext.newPage();
 await legacy.goto('http://127.0.0.1:4319');await legacy.waitForFunction(()=>db!==null);await legacy.evaluate(()=>db.close());
 await legacy.evaluate(async()=>{
  await new Promise((resolve,reject)=>{const q=indexedDB.deleteDatabase('my-day');q.onsuccess=resolve;q.onerror=reject;});
  const d=await new Promise((resolve,reject)=>{const q=indexedDB.open('my-day',2);q.onupgradeneeded=()=>{q.result.createObjectStore('days',{keyPath:'date'});q.result.createObjectStore('tasks',{keyPath:'id'});q.result.createObjectStore('notes',{keyPath:'id'});};q.onsuccess=()=>resolve(q.result);q.onerror=reject;});
  await new Promise((resolve,reject)=>{const tx=d.transaction(['days','tasks','notes'],'readwrite');tx.objectStore('days').put({date:'2026-11-15',routine:{},mood:'2',checkin:true,text:'An older entry',audio:new Blob(['voice'],{type:'audio/webm;codecs=opus'})});tx.objectStore('tasks').put({id:'old-task',title:'An older task',kind:'daily',period:'2026-11-15',done:false,created:1});tx.oncomplete=resolve;tx.onerror=reject;});d.close();
 });await legacy.reload();await legacy.getByRole('button',{name:'Tasks',exact:true}).click();await legacy.getByText('An older task',{exact:true}).waitFor();
 assert.equal(await legacy.evaluate(()=>S.tasks[0].period),'2026-11-15');
 assert.equal(await legacy.evaluate(async()=>{const record=await packRecord(S.days['2026-11-15']);return await unpackRecord(record).audio.text();}),'voice');
 assert.equal(await legacy.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await legacy.getByRole('button',{name:'Today',exact:true}).click();await legacy.screenshot({path:path.join(out,'hiwiye-small-screen.png'),fullPage:true});
 await legacyContext.close();
 assert.deepEqual(errors,[]);
 console.log('PASS: quick check-in, drafts, persisted entries, needs, recap, tasks, backup export/restore/delete, save failure, midnight rollover, v2 migration with audio, nickname, language, theme, calm dialog, 320px/390px/desktop layouts.');
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1);});

