const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DCtijOJy.js","./vendor-codemirror-DUfYp2mG.js","./vendor-markdown-BkjUMIlX.js","./vendor-markdown-BCx1q_2Y.css","./vendor-graph-DwCx8zU5.js","./index-DMbRSi8e.css"])))=>i.map(i=>d[i]);
import{_ as T}from"./vendor-codemirror-DUfYp2mG.js";import{ai as E,Q as M,g as F,j as I,aj as D,m as A,P as C,N,M as B}from"./index-DCtijOJy.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";const L="atlas_live_markdown_feeds",H="AtlasLiveMarkdownDB",x=1,p="cachedDocs";function k(){return new Promise((n,e)=>{if(!window.indexedDB){n(null);return}const s=indexedDB.open(H,x);s.onupgradeneeded=t=>{const a=t.target.result;a.objectStoreNames.contains(p)||a.createObjectStore(p)},s.onsuccess=()=>n(s.result),s.onerror=()=>e(s.error)})}async function q(n){try{const e=await k();return e?new Promise((s,t)=>{const l=e.transaction(p,"readonly").objectStore(p).get(String(n));l.onsuccess=()=>s(l.result||""),l.onerror=()=>t(l.error)}):localStorage.getItem(`atlas_live_doc_${n}`)||""}catch(e){return console.warn("[LiveMarkdownSync] Failed to read from IndexedDB, falling back to localStorage:",e),localStorage.getItem(`atlas_live_doc_${n}`)||""}}async function O(n,e){try{const s=await k();if(!s){localStorage.setItem(`atlas_live_doc_${n}`,e.slice(0,5e5));return}return new Promise((t,a)=>{const i=s.transaction(p,"readwrite").objectStore(p).put(e,String(n));i.onsuccess=()=>t(),i.onerror=()=>a(i.error)})}catch(s){console.warn("[LiveMarkdownSync] Failed to save to IndexedDB:",s)}}async function R(n){try{localStorage.removeItem(`atlas_live_doc_${n}`);const e=await k();return e?new Promise(s=>{const o=e.transaction(p,"readwrite").objectStore(p).delete(String(n));o.onsuccess=()=>s(),o.onerror=()=>s()}):void 0}catch{}}function _(n){if(!n)return"0";let e=0;for(let s=0;s<n.length;s++){const t=n.charCodeAt(s);e=(e<<5)-e+t,e|=0}return`${n.length}:${e}`}class U{constructor(e){this.ctx=e,this.feeds=new Map,this._listeners=new Set,this._loadFeeds()}_loadFeeds(){try{const e=localStorage.getItem(L);if(e){const s=JSON.parse(e);Array.isArray(s)&&(this.feeds.clear(),s.forEach(t=>{t&&t.id&&this.feeds.set(t.id,{id:t.id,name:t.name||"Untitled Live Note",url:t.url||"",intervalHours:Number(t.intervalHours??24),syncToCards:!!t.syncToCards,targetLessonId:t.targetLessonId||null,lastSynced:t.lastSynced||null,lastStatus:t.lastStatus||"idle",lastError:t.lastError||null,etag:t.etag||null,lastModifiedHeader:t.lastModifiedHeader||null,lastSyncHash:t.lastSyncHash||null,localModified:!!t.localModified})}))}}catch(e){console.error("[LiveMarkdownSync] Failed to load feeds from localStorage:",e)}}_saveFeeds(){try{const e=Array.from(this.feeds.values());localStorage.setItem(L,JSON.stringify(e)),this._notifyChange()}catch(e){console.error("[LiveMarkdownSync] Failed to save feeds to localStorage:",e)}}_notifyChange(){const e=this.getAllFeeds();for(const s of this._listeners)try{s(e)}catch(t){console.warn(t)}}onChange(e){return this._listeners.add(e),()=>this._listeners.delete(e)}getAllFeeds(){return Array.from(this.feeds.values())}getFeed(e){return this.feeds.get(String(e))||null}getFeedForLesson(e){if(!e)return null;for(const s of this.feeds.values())if(String(s.targetLessonId)===String(e))return s;return null}addFeed({name:e,url:s,intervalHours:t=24,syncToCards:a=!1,targetLessonId:o=null}){const l=`feed_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,i={id:l,name:(e||"Live Note").trim(),url:(s||"").trim(),intervalHours:Math.max(0,Number(t)||24),syncToCards:!!a,targetLessonId:o||null,lastSynced:null,lastStatus:"idle",lastError:null,etag:null,lastModifiedHeader:null,lastSyncHash:null,localModified:!1};return this.feeds.set(l,i),this._saveFeeds(),i}updateFeed(e,s={}){const t=this.feeds.get(String(e));return t?(s.name!==void 0&&(t.name=String(s.name).trim()),s.url!==void 0&&(t.url=String(s.url).trim()),s.intervalHours!==void 0&&(t.intervalHours=Math.max(0,Number(s.intervalHours))),s.syncToCards!==void 0&&(t.syncToCards=!!s.syncToCards),s.targetLessonId!==void 0&&(t.targetLessonId=s.targetLessonId),s.localModified!==void 0&&(t.localModified=!!s.localModified),this._saveFeeds(),t):null}async removeFeed(e){const s=String(e);return this.feeds.has(s)?(this.feeds.delete(s),await R(s),this._saveFeeds(),!0):!1}markLocalEdit(e){const s=this.getFeedForLesson(e);s&&!s.localModified&&(s.localModified=!0,this._saveFeeds())}async getFeedContent(e){return await q(e)}async syncFeed(e,{force:s=!1,ignoreConflicts:t=!1}={}){const a=this.feeds.get(String(e));if(!a)throw new Error(`Feed ${e} not found`);if(!a.url)return a.lastStatus="error",a.lastError="No URL specified",this._saveFeeds(),{status:"error",error:"No URL specified"};a.lastStatus="syncing",this._notifyChange();try{const o={};!s&&a.etag&&(o["If-None-Match"]=a.etag),!s&&a.lastModifiedHeader&&(o["If-Modified-Since"]=a.lastModifiedHeader),`${a.url}`;const l=await E({url:a.url,headers:o});if(!l.success&&l.status!==304)throw new Error(l.error||`HTTP ${l.status||"Failed"}`);if(l.status===304)return`${a.name}`,a.lastSynced=Date.now(),a.lastStatus="not-modified",a.lastError=null,this._saveFeeds(),{status:"not-modified",feed:a};const i=l.text||"",m=l.etag,r=l.lastModified;if(await O(a.id,i),a.targetLessonId){const u=M(a.targetLessonId);if(u){const c=u.markdownContent||"",v=_(c);if((a.localModified||a.lastSyncHash&&v!==a.lastSyncHash&&c.trim().length>0)&&!t&&!s)return a.lastStatus="conflict",this._saveFeeds(),{status:"conflict",feed:a,newMarkdown:i,currentMarkdown:c,sizeBytes:i.length};await this.applyMarkdownToTopic(a,i)}}return a.etag=m||null,a.lastModifiedHeader=r||null,a.lastSynced=Date.now(),a.lastStatus="ok",a.lastError=null,a.lastSyncHash=_(i),a.localModified=!1,this._saveFeeds(),`${a.name}${i.length}`,{status:"ok",feed:a,sizeBytes:i.length}}catch(o){return console.error(`[LiveMarkdownSync] Error syncing ${a.name}:`,o),a.lastStatus="error",a.lastError=o.message||"Network error",this._saveFeeds(),{status:"error",error:a.lastError}}}async applyMarkdownToTopic(e,s){if(!e.targetLessonId)return;const t=M(e.targetLessonId);if(t){t.markdownContent=s;try{const a=F(t.id);await I(a,s)}catch(a){console.warn("[LiveMarkdownSync] Error writing topic markdown to disk:",a)}if(e.syncToCards)try{`${t.id}`;const a=Array.isArray(t.cards)?t.cards:[],o=D(a),l=A(s,o,a);t.cards=Array.isArray(l?.cards)?l.cards:[]}catch(a){console.warn("[LiveMarkdownSync] Error generating cards from markdown:",a)}if(typeof window.saveDataDebounced=="function"?window.saveDataDebounced():typeof window.saveData=="function"&&window.saveData(),typeof window.renderTopicDocumentView=="function"&&C()==t.id){const a=document.getElementById("note-editor-container")||document.getElementById("lesson-display");a&&window.renderTopicDocumentView(a,t)}}}async checkDueFeeds(){const e=Date.now(),s=Array.from(this.feeds.values()).filter(t=>!t.url||t.intervalHours<=0?!1:e-(t.lastSynced||0)>=t.intervalHours*3600*1e3);if(s.length!==0){`${s.length}`;for(const t of s)try{(await this.syncFeed(t.id)).status==="ok"&&this.ctx.showToast(`Updated live note "${t.name}"`,"info",3e3)}catch(a){console.warn(`[LiveMarkdownSync] Scheduled check failed for ${t.name}:`,a)}}}}class P{constructor(e,s){this.ctx=e,this.service=s,this._modalOverlay=null,this._activeBanner=null,this._unsubscribeService=this.service.onChange(()=>{this._refreshModalIfOpen(),this._updateTopicBannerIfActive()})}destroy(){this._unsubscribeService&&this._unsubscribeService(),this._modalOverlay&&(this._modalOverlay.remove(),this._modalOverlay=null),this._activeBanner&&(this._activeBanner.remove(),this._activeBanner=null)}openManageModal(){this._modalOverlay&&this._modalOverlay.remove();const e=document.createElement("div");e.className="modal-overlay lms-modal-overlay active show",e.style.display="flex";const s=document.createElement("div");s.className="modal-box lms-modal",e.appendChild(s),this._modalOverlay=e,this._renderManageModalContent(s),e.addEventListener("click",t=>{t.target===e&&(e.remove(),this._modalOverlay=null)}),document.body.appendChild(e)}_refreshModalIfOpen(){if(!this._modalOverlay)return;const e=this._modalOverlay.querySelector(".lms-modal");e&&this._renderManageModalContent(e)}_renderManageModalContent(e){const s=this.service.getAllFeeds();e.innerHTML=`
            <div class="lms-modal-header">
                <div class="lms-header-title">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                    <h2>Live Markdown Notes</h2>
                </div>
                <div class="lms-header-actions">
                    <button class="lms-btn lms-btn-primary" id="lms-add-feed-btn">
                        <i class="fa fa-plus" aria-hidden="true"></i> Add Live Source
                    </button>
                    <button class="lms-close-btn" id="lms-close-btn" title="Close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div class="lms-modal-body">
                <p class="lms-modal-desc">
                    Subscribe topics to live Markdown documents. Notes remain 100% editable, check for updates automatically on a schedule, and let you toggle card generation to prevent freezing on large wikis.
                </p>
                <div class="lms-feeds-list">
                    ${s.length===0?`
                        <div class="lms-empty-state">
                            <i class="fa fa-rss" aria-hidden="true"></i>
                            <p>No live notes configured yet.</p>
                            <span class="lms-subtext">Click "Add Live Source" to link a webpage or raw Markdown URL.</span>
                        </div>
                    `:""}
                </div>
            </div>
        `,e.querySelector("#lms-close-btn").onclick=()=>{this._modalOverlay?.remove(),this._modalOverlay=null},e.querySelector("#lms-add-feed-btn").onclick=()=>{this.openAddEditModal()};const t=e.querySelector(".lms-feeds-list");s.forEach(a=>{const o=this._createFeedCard(a);t.appendChild(o)})}_createFeedCard(e){const s=document.createElement("div");s.className="lms-feed-card";let t="Never synced";e.lastSynced&&(t=new Date(e.lastSynced).toLocaleString());let a='<span class="lms-badge lms-badge-idle">Idle</span>';e.lastStatus==="syncing"?a='<span class="lms-badge lms-badge-syncing"><i class="fa fa-spinner fa-spin"></i> Syncing</span>':e.lastStatus==="ok"?a='<span class="lms-badge lms-badge-success">Up to date</span>':e.lastStatus==="not-modified"?a='<span class="lms-badge lms-badge-info">Unchanged (304)</span>':e.lastStatus==="conflict"?a='<span class="lms-badge lms-badge-warning">Update available</span>':e.lastStatus==="error"&&(a=`<span class="lms-badge lms-badge-error" title="${e.lastError||""}">Sync error</span>`);let o="Unlinked (standalone cache)";if(e.targetLessonId){const r=M(e.targetLessonId);r?o=`Topic: <strong>${f(r.name||r.title||"Untitled")}</strong>`:o=`Topic: [ID: ${e.targetLessonId}]`}const l=e.syncToCards?"Cards: Enabled":"Cards: Off (Freeze-free)",i=e.syncToCards?"lms-badge-card-on":"lms-badge-card-off";s.innerHTML=`
            <div class="lms-feed-main">
                <div class="lms-feed-title-row">
                    <h3 class="lms-feed-name">${f(e.name)}</h3>
                    <div class="lms-badges">
                        ${a}
                        <span class="lms-badge ${i}">${l}</span>
                    </div>
                </div>
                <div class="lms-feed-url" title="${f(e.url)}">
                    <i class="fa fa-link" aria-hidden="true"></i> ${f(e.url)}
                </div>
                <div class="lms-feed-meta">
                    <span><i class="fa fa-clock-o"></i> Check: Every ${e.intervalHours}h</span>
                    <span><i class="fa fa-history"></i> Last synced: ${t}</span>
                    <span><i class="fa fa-folder-o"></i> ${o}</span>
                </div>
            </div>
            <div class="lms-feed-actions">
                <button class="lms-btn lms-btn-sm lms-btn-sync" title="Sync from remote URL now">
                    <i class="fa fa-refresh ${e.lastStatus==="syncing"?"fa-spin":""}"></i> Sync Now
                </button>
                <button class="lms-btn lms-btn-sm lms-btn-edit" title="Edit source settings">
                    <i class="fa fa-pencil"></i> Edit
                </button>
                <button class="lms-btn lms-btn-sm lms-btn-danger lms-btn-delete" title="Delete subscription">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        `;const m=s.querySelector(".lms-btn-sync");return m.onclick=async()=>{m.disabled=!0,m.innerHTML='<i class="fa fa-spinner fa-spin"></i> Syncing...';try{const r=await this.service.syncFeed(e.id);r.status==="conflict"?this.openConflictModal(e,r):r.status==="not-modified"?this.ctx.showToast(`"${e.name}" is already up to date.`,"info",2500):r.status==="ok"?this.ctx.showToast(`Synced "${e.name}" successfully.`,"success",2500):this.ctx.showToast(`Failed to sync: ${r.error||"Network error"}`,"error",3500)}catch(r){this.ctx.showToast(`Error: ${r.message}`,"error",3500)}finally{this._refreshModalIfOpen()}},s.querySelector(".lms-btn-edit").onclick=()=>{this.openAddEditModal(e)},s.querySelector(".lms-btn-delete").onclick=async()=>{confirm(`Remove live subscription for "${e.name}"? (Your topic notes will remain untouched)`)&&(await this.service.removeFeed(e.id),this._refreshModalIfOpen())},s}openAddEditModal(e=null){const s=document.createElement("div");s.className="modal-overlay lms-submodal-overlay active show",s.style.display="flex";const t=document.createElement("div");t.className="modal-box lms-edit-modal",s.appendChild(t);const a=!!e,o=N()||[],l=B()||[];let i='<option value="">-- Standalone (Cache in reader only) --</option>';o.forEach(r=>{const u=l.filter(c=>c.courseId==r.id);if(u.length>0){const c=r.name||r.title||"Course";i+=`<optgroup label="${f(c)}">`,u.forEach(v=>{const y=e?.targetLessonId==v.id?"selected":"",b=v.name||v.title||"Untitled Topic";i+=`<option value="${v.id}" ${y}>${f(b)}</option>`}),i+="</optgroup>"}}),t.innerHTML=`
            <div class="lms-modal-header">
                <h3>${a?"Edit Live Source":"Add Live Markdown Source"}</h3>
                <button class="lms-close-btn" id="lms-edit-close"><i class="fa fa-times"></i></button>
            </div>
            <div class="lms-modal-body">
                <form id="lms-feed-form">
                    <div class="lms-form-group">
                        <label for="lms-feed-name">Display Name</label>
                        <input type="text" id="lms-feed-name" required placeholder="e.g. Course Syllabus, React Cheat Sheet" value="${f(e?.name||"")}">
                    </div>

                    <div class="lms-form-group">
                        <label for="lms-feed-url">Markdown URL</label>
                        <input type="url" id="lms-feed-url" required placeholder="https://raw.githubusercontent.com/.../notes.md" value="${f(e?.url||"")}">
                        <span class="lms-help-text">Direct URL to a raw Markdown (.md) or text file.</span>
                    </div>

                    <div class="lms-form-row">
                        <div class="lms-form-group">
                            <label for="lms-feed-interval">Sync Frequency</label>
                            <select id="lms-feed-interval">
                                <option value="24" ${e?.intervalHours===24?"selected":""}>Daily (Every 24 hours)</option>
                                <option value="12" ${e?.intervalHours===12?"selected":""}>Every 12 hours</option>
                                <option value="6" ${e?.intervalHours===6?"selected":""}>Every 6 hours</option>
                                <option value="1" ${e?.intervalHours===1?"selected":""}>Every 1 hour</option>
                                <option value="0" ${e?.intervalHours===0?"selected":""}>Manual only</option>
                            </select>
                        </div>

                        <div class="lms-form-group">
                            <label for="lms-feed-topic">Link to Topic</label>
                            <select id="lms-feed-topic">
                                ${i}
                            </select>
                        </div>
                    </div>

                    <div class="lms-form-group lms-checkbox-group">
                        <label class="lms-checkbox-label">
                            <input type="checkbox" id="lms-feed-cards" ${e?.syncToCards?"checked":""}>
                            <span class="lms-checkbox-title">Enable Card Engine (Generate flashcards from ## headings)</span>
                        </label>
                        <p class="lms-checkbox-help">
                            Keep <strong>unchecked</strong> for large documents or wikis to keep editing fast and prevent app freezes. Check this for normal lecture notes or compact cheat sheets.
                        </p>
                    </div>

                    <div class="lms-form-actions">
                        <button type="button" class="lms-btn" id="lms-edit-cancel">Cancel</button>
                        <button type="submit" class="lms-btn lms-btn-primary" id="lms-edit-save">
                            ${a?"Save Changes":"Create & Sync"}
                        </button>
                    </div>
                </form>
            </div>
        `,t.querySelector("#lms-edit-close").onclick=()=>s.remove(),t.querySelector("#lms-edit-cancel").onclick=()=>s.remove();const m=t.querySelector("#lms-feed-form");m.onsubmit=async r=>{r.preventDefault();const u=t.querySelector("#lms-feed-name").value.trim(),c=t.querySelector("#lms-feed-url").value.trim(),v=Number(t.querySelector("#lms-feed-interval").value),y=t.querySelector("#lms-feed-topic").value||null,b=t.querySelector("#lms-feed-cards").checked;if(!c){alert("Please enter a valid URL.");return}const w=t.querySelector("#lms-edit-save");w.disabled=!0,w.innerHTML='<i class="fa fa-spinner fa-spin"></i> Saving...';try{if(a)this.service.updateFeed(e.id,{name:u,url:c,intervalHours:v,targetLessonId:y,syncToCards:b}),this.ctx.showToast(`Updated "${u}".`,"success",2e3);else{const S=this.service.addFeed({name:u,url:c,intervalHours:v,targetLessonId:y,syncToCards:b});this.service.syncFeed(S.id).catch($=>console.warn($)),this.ctx.showToast(`Added live note "${u}". Starting initial sync...`,"success",3e3)}s.remove(),this._refreshModalIfOpen()}catch(S){alert("Error saving live note: "+S.message),w.disabled=!1,w.textContent="Save"}},document.body.appendChild(s)}openConflictModal(e,s){const t=document.createElement("div");t.className="modal-overlay lms-submodal-overlay active show",t.style.display="flex";const a=document.createElement("div");a.className="modal-box lms-conflict-modal",t.appendChild(a),a.innerHTML=`
            <div class="lms-modal-header">
                <h3><i class="fa fa-exclamation-triangle" style="color:#d97706;"></i> Remote Update Available</h3>
                <button class="lms-close-btn" id="lms-conflict-close"><i class="fa fa-times"></i></button>
            </div>
            <div class="lms-modal-body">
                <p>
                    A new version of <strong>${f(e.name)}</strong> is available from the web, but you have made local edits in this topic.
                </p>
                <p class="lms-subtext">
                    Choose how you want to handle these changes:
                </p>

                <div class="lms-conflict-choices">
                    <button class="lms-choice-btn" id="lms-choice-overwrite">
                        <div class="lms-choice-title">
                            <i class="fa fa-download"></i> Update with Latest Remote Version
                        </div>
                        <div class="lms-choice-desc">
                            Replaces the document with the remote page. Your local edits will be automatically saved as a timestamped backup copy in Scratchpad so nothing is lost.
                        </div>
                    </button>

                    <button class="lms-choice-btn" id="lms-choice-append">
                        <div class="lms-choice-title">
                            <i class="fa fa-plus-square-o"></i> Append Remote Changes to Bottom
                        </div>
                        <div class="lms-choice-desc">
                            Keeps your current notes intact and appends the latest remote update under an "Updated Remote Content" heading at the end.
                        </div>
                    </button>

                    <button class="lms-choice-btn" id="lms-choice-keep">
                        <div class="lms-choice-title">
                            <i class="fa fa-file-text-o"></i> Keep My Local Edits (Skip Update)
                        </div>
                        <div class="lms-choice-desc">
                            Leaves your current topic document unchanged.
                        </div>
                    </button>
                </div>
            </div>
        `,a.querySelector("#lms-conflict-close").onclick=()=>t.remove(),a.querySelector("#lms-choice-overwrite").onclick=async()=>{t.remove();const o=`# Backup of ${e.name} (${new Date().toLocaleString()})

${s.currentMarkdown}`;window.scratchpad?.append&&window.scratchpad.append(o),await this.service.applyMarkdownToTopic(e,s.newMarkdown),e.localModified=!1,e.lastStatus="ok",e.lastSynced=Date.now(),this.service._saveFeeds(),this.ctx.showToast(`Updated "${e.name}". Local edits backed up to Scratchpad.`,"success",3500),this._refreshModalIfOpen()},a.querySelector("#lms-choice-append").onclick=async()=>{t.remove();const o=`${s.currentMarkdown}

---
## Updated Remote Source (${new Date().toLocaleDateString()})

${s.newMarkdown}`;await this.service.applyMarkdownToTopic(e,o),e.localModified=!1,e.lastStatus="ok",e.lastSynced=Date.now(),this.service._saveFeeds(),this.ctx.showToast(`Appended updates to "${e.name}".`,"success",3e3),this._refreshModalIfOpen()},a.querySelector("#lms-choice-keep").onclick=()=>{t.remove(),e.lastStatus="idle",this.service._saveFeeds(),this.ctx.showToast(`Kept local edits for "${e.name}".`,"info",2e3),this._refreshModalIfOpen()},document.body.appendChild(t)}attachToTopicView(e,s){if(!e||!s)return;const t=this.service.getFeedForLesson(e);if(!t){this._activeBanner&&(this._activeBanner.remove(),this._activeBanner=null);return}const a=s.querySelector(".lms-topic-banner");a&&a.remove();const o=document.createElement("div");o.className="lms-topic-banner";let l="Never synced";t.lastSynced&&(l=`Synced ${new Date(t.lastSynced).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`);let i="lms-banner-ok",m=l;t.lastStatus==="syncing"?(i="lms-banner-syncing",m='<i class="fa fa-spinner fa-spin"></i> Syncing...'):t.lastStatus==="conflict"&&(i="lms-banner-warning",m='<i class="fa fa-exclamation-triangle"></i> Remote update available'),o.innerHTML=`
            <div class="lms-banner-left">
                <i class="fa fa-rss lms-banner-icon"></i>
                <span class="lms-banner-title">Live Note: <strong>${f(t.name)}</strong></span>
                <span class="lms-banner-status ${i}">${m}</span>
            </div>
            <div class="lms-banner-right">
                <button class="lms-banner-btn lms-banner-sync" title="Check and update from remote webpage">
                    <i class="fa fa-refresh ${t.lastStatus==="syncing"?"fa-spin":""}"></i> Sync Now
                </button>
                <button class="lms-banner-btn lms-banner-settings" title="Live Note Settings">
                    <i class="fa fa-cog"></i>
                </button>
            </div>
        `,o.querySelector(".lms-banner-sync").onclick=async r=>{r.stopPropagation();const u=o.querySelector(".lms-banner-sync");u.disabled=!0;try{const c=await this.service.syncFeed(t.id);c.status==="conflict"?this.openConflictModal(t,c):c.status==="not-modified"?this.ctx.showToast(`"${t.name}" is already up to date.`,"info",2e3):c.status==="ok"&&this.ctx.showToast(`Updated "${t.name}" successfully.`,"success",2500)}catch(c){this.ctx.showToast(`Sync failed: ${c.message}`,"error",3e3)}finally{u.disabled=!1}},o.querySelector(".lms-banner-settings").onclick=r=>{r.stopPropagation(),this.openAddEditModal(t)},s.insertBefore(o,s.firstChild),this._activeBanner=o}_updateTopicBannerIfActive(){const e=C();if(e){const s=document.getElementById("note-editor-container")||document.querySelector(".topic-doc-view-active");s&&this.attachToTopicView(e,s)}}}function f(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}let h=null,d=null,g=[];async function Y(n){const e=document.createElement("link");e.rel="stylesheet",e.href=new URL(""+new URL("live-markdown-sync-DBsdvxcB.css",import.meta.url).href,import.meta.url).href,document.head.appendChild(e),g.push(()=>e.remove()),h=new U(n),d=new P(n,h),window.openLiveMarkdownSync=()=>d.openManageModal(),g.push(()=>delete window.openLiveMarkdownSync);try{const{getRailRegistry:t}=await T(async()=>{const{getRailRegistry:o}=await import("./index-DCtijOJy.js").then(l=>l.aw);return{getRailRegistry:o}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);t().register({id:"live-markdown-sync",icon:"fa fa-rss",label:"Live Notes",type:"action",shortcutKey:"L",builtin:!0,defaultEnabled:!0,section:"top",description:"Manage Live Markdown Web Sources",onAction:()=>d.openManageModal()})}catch(t){console.warn("[LiveMarkdownSync] Could not register with Activity Rail:",t)}n.addSidebarButton({icon:"fa-rss",label:"Live Notes",title:"Manage Live Markdown Web Sources",onClick:()=>{d.openManageModal()}}),n.addToolbarButton({icon:"fa-rss",label:"Live Notes",title:"Live Markdown Sync",onClick:()=>{d.openManageModal()}}),n.registerCommand({id:"lms-manage",title:"Live Notes: Manage Sources",subtitle:"View, edit, and sync subscribed Markdown webpages",icon:"fa-rss",action:()=>d.openManageModal()}),n.registerCommand({id:"lms-add",title:"Live Notes: Add Live Source",subtitle:"Subscribe a topic to a live web Markdown URL",icon:"fa-plus",action:()=>d.openAddEditModal()}),n.registerCommand({id:"lms-sync-all",title:"Live Notes: Sync All Due Feeds",subtitle:"Check and update all due live Markdown sources",icon:"fa-refresh",action:async()=>{n.showToast("Checking live notes for updates...","info",2e3),await h.checkDueFeeds()}}),n.registerKeybind("Alt+L",()=>d.openManageModal(),"Open Live Notes Manager"),n.setInterval(()=>{h.checkDueFeeds()},3600*1e3),n.setTimeout(()=>{h.checkDueFeeds()},4e3);const s=n.setInterval(()=>{d._updateTopicBannerIfActive()},1500);g.push(()=>window.clearInterval(s)),window.liveMarkdownSync={service:h,ui:d}}function G(){for(const n of g)try{n()}catch{}g=[],d?.destroy&&d.destroy(),d=null,h=null,delete window.liveMarkdownSync}function J(){d&&d._updateTopicBannerIfActive()}const W={openManageModal:()=>d?.openManageModal(),openAddModal:()=>d?.openAddEditModal(),syncFeed:(n,e)=>h?.syncFeed(n,e),syncAll:()=>h?.checkDueFeeds(),getService:()=>h,getUI:()=>d};export{Y as activate,W as api,G as deactivate,J as onAppReady};
