const D=["https://raw.githubusercontent.com/Resistance-Labs-Tech/atlasface-community/main/content-catalog.json","https://atlasface.resistancelabs.tech/community-catalog.json","./community-catalog.json"],x="community_installed",j="community_catalog";class O{constructor(){this._catalog=[],this._installed=new Map,this._lastEntityId=0,this._loadInstalled()}async fetchCatalog(){const t=this._getCachedCatalog();if(t)return this._catalog=t,t;for(const e of D)try{`${e}`;const a=await fetch(e,{cache:"no-cache"});if(!a.ok)continue;const i=await a.json(),s=i.content||i.items||[];return this._catalog=s,this._cacheCatalog(s),`${s.length}`,s}catch(a){console.warn(`[ContentMarketplace] Failed to fetch from ${e}:`,a.message)}return this._catalog=[],[]}getCatalog(){return this._catalog}search(t){if(!t||!t.trim())return this._catalog;const e=t.toLowerCase().trim();return this._catalog.filter(a=>a.name.toLowerCase().includes(e)||a.description.toLowerCase().includes(e)||a.author.toLowerCase().includes(e)||(a.tags||[]).some(i=>i.toLowerCase().includes(e))||a.category.toLowerCase().includes(e))}filterByCategory(t){return t==="all"?this._catalog:t==="installed"?this._catalog.filter(e=>this.isInstalled(e.id)):t==="featured"?this._catalog.filter(e=>e.featured):this._catalog.filter(e=>e.category===t)}filterByType(t){return t==="all"?this._catalog:this._catalog.filter(e=>e.type===t)}async install(t){const e=this._catalog.find(a=>a.id===t);if(!e)return{success:!1,error:`Content "${t}" not found in catalog`};if(this.isInstalled(t))return{success:!0,data:{alreadyInstalled:!0}};try{`${e.name}`;let a=e.package;if(!a){const o={"spanish-essentials.json":"https://raw.githubusercontent.com/Resistance-Labs-Tech/atlasface-community/main/content/spanish-basics-vocab.json","javascript-typescript-mastery.json":"https://raw.githubusercontent.com/Resistance-Labs-Tech/atlasface-community/main/content/javascript-fundamentals.json","ap-biology-mastery.json":"https://raw.githubusercontent.com/Resistance-Labs-Tech/atlasface-community/main/content/biology-cell-structure.json"},n=[];if(e.packageUrl){n.push(e.packageUrl);for(const[c,f]of Object.entries(o))e.packageUrl.includes(c)&&!n.includes(f)&&n.push(f)}for(const c of n)try{const f=await fetch(c);if(f.ok){const h=await f.text();if(h.length<=10485760){a=JSON.parse(h);break}}else console.warn(`[ContentMarketplace] Download from ${c} returned ${f.status}`)}catch(f){console.warn(`[ContentMarketplace] Download error for ${c}:`,f.message)}if(!a){const c=(e.sampleCards||[]).map(h=>({title:h.front,content:h.back,type:"flashcard"})),f={name:e.name,description:e.description,cards:c};a={meta:{id:e.id,type:e.type||"topic",name:e.name,description:e.description,author:e.author,category:e.category,tags:e.tags||[],cardCount:c.length,version:e.version||"1.0.0"},data:{lesson:{name:e.name,description:e.description},topics:[f],projects:e.type==="vault"?[{name:e.name,topics:[f]}]:void 0,cards:c}}}}const i=this._validatePackagePayload(e,a);if(!i.success)throw new Error(i.error||"Invalid package payload");const s=await this._importContent(e,i.package);if(!s.success)throw new Error(s.error||"Import failed");return this._installed.set(t,{version:e.version,installedAt:new Date().toISOString(),type:e.type,localId:s.localId}),this._saveInstalled(),`${e.name}`,window.dispatchEvent(new CustomEvent("contentInstalled",{detail:{itemId:t,item:e,localId:s.localId}})),{success:!0,data:{localId:s.localId}}}catch(a){return console.error(`[ContentMarketplace] Failed to install "${t}":`,a),{success:!1,error:a.message}}}async _importContent(t,e){const a=window.state;if(!a||typeof a.addCourse!="function"||typeof a.addLesson!="function")return{success:!1,error:"App state not available or required mutators missing"};const i=this._createImportSnapshot(a);if(!i.success)return{success:!1,error:i.error};const s=e.data||e,o=i.snapshot;try{let n=null;switch(t.type){case"vault":n=await this._importVault(a,t,s);break;case"project":n=await this._importProject(a,t,s);break;case"topic":n=await this._importTopic(a,t,s);break;default:throw new Error(`Unknown content type: ${t.type}`)}return await this._persistImport(),this._refreshImportViews(),{success:!0,localId:n}}catch(n){return this._restoreImportSnapshot(a,o),{success:!1,error:n.message}}}async _importVault(t,e,a){const i=this._nextEntityId(),s={id:i,name:`${e.name} (Community)`,type:"course",parentId:null,isFolder:!0,order:t.getCourses().length,source:{type:"community",id:e.id,author:e.author}};if(t.addCourse(s),a.projects)for(const o of a.projects){const n=this._nextEntityId(),c={id:n,name:o.name,type:"course",parentId:i,isFolder:!1,order:t.getCourses().length};if(t.addCourse(c),o.topics)for(const f of o.topics)await this._importTopicData(t,n,f)}return i}async _importProject(t,e,a){const i=this._nextEntityId(),s={id:i,name:`${e.name} (Community)`,type:"course",parentId:null,isFolder:!1,order:t.getCourses().length,source:{type:"community",id:e.id,author:e.author}};if(t.addCourse(s),a.topics)for(const o of a.topics)await this._importTopicData(t,i,o);return i}async _importTopic(t,e,a){const i=this._nextEntityId(),s={id:i,name:`${e.name} (Community)`,type:"course",parentId:null,isFolder:!1,order:t.getCourses().length,source:{type:"community",id:e.id,author:e.author}};t.addCourse(s);const o=a.topics||[a];let n;for(const c of o)n=await this._importTopicData(t,i,c);return n}async _importTopicData(t,e,a){const i=this._nextEntityId(),s={id:i,courseId:e,name:a.name||a.title||"Imported Topic",document:a.document||a.markdown||"",cards:(a.cards||[]).map((o,n)=>({id:this._nextEntityId(),title:o.title||o.front||"Card",content:o.content||o.back||"",type:o.type||"text",srs:o.srs||{easeFactor:2.5,interval:0,repetitions:0,dueDate:null}}))};return t.addLesson(s),i}_nextEntityId(){const t=Date.now();return this._lastEntityId=Math.max(this._lastEntityId+1,t),this._lastEntityId}_createImportSnapshot(t){return typeof t.getCourses!="function"||typeof t.getLessons!="function"||typeof t.setCourses!="function"||typeof t.setLessons!="function"?{success:!1,error:"App state snapshot/rollback APIs unavailable"}:{success:!0,snapshot:{courses:this._cloneDeep(t.getCourses()),lessons:this._cloneDeep(t.getLessons())}}}_restoreImportSnapshot(t,e){try{t.setCourses(this._cloneDeep(e.courses)),t.setLessons(this._cloneDeep(e.lessons)),this._refreshImportViews()}catch(a){console.error("[ContentMarketplace] Failed to rollback import snapshot:",a)}}async _persistImport(){if(typeof window.saveData=="function"){await Promise.resolve(window.saveData());return}typeof window.saveDataDebounced=="function"&&window.saveDataDebounced()}_refreshImportViews(){const t=[window.renderCourses,window.renderLessons,window.refreshExplorer];for(const e of t)if(typeof e=="function")try{e()}catch(a){console.warn("[ContentMarketplace] Failed to refresh UI after import:",a)}}_cloneDeep(t){return JSON.parse(JSON.stringify(t??null))}_validatePackagePayload(t,e){if(!e||typeof e!="object")return{success:!1,error:"Package must be an object"};const a=e.data&&typeof e.data=="object"?e.data:e,i={...e,data:a};if(t.type==="vault"){if(!Array.isArray(a.projects))return{success:!1,error:"Vault package must include projects[]"};if(a.projects.length>500)return{success:!1,error:"Vault exceeds 500 projects limit"};for(const[s,o]of a.projects.entries()){if(!o||typeof o!="object")return{success:!1,error:`Invalid project at index ${s}`};if(!Array.isArray(o.topics))return{success:!1,error:`Project ${s} missing topics[]`};if(o.topics.length>2e3)return{success:!1,error:`Project ${s} exceeds topic limit`};const n=this._validateTopics(o.topics,`project ${s}`);if(!n.success)return n}}if(t.type==="project"){if(!Array.isArray(a.topics))return{success:!1,error:"Project package must include topics[]"};if(a.topics.length>2e3)return{success:!1,error:"Project exceeds 2000 topics limit"};const s=this._validateTopics(a.topics,"project");if(!s.success)return s}if(t.type==="topic")if(Array.isArray(a.topics)){if(a.topics.length>2e3)return{success:!1,error:"Topic package exceeds 2000 topics limit"};const s=this._validateTopics(a.topics,"topic package");if(!s.success)return s}else{const s=this._validateTopics([a],"topic package");if(!s.success)return s}return{success:!0,package:i}}_validateTopics(t,e){for(const[a,i]of t.entries()){if(!i||typeof i!="object")return{success:!1,error:`Invalid topic at index ${a} in ${e}`};const s=Array.isArray(i.cards)?i.cards:[];if(s.length>5e3)return{success:!1,error:`Topic ${a} in ${e} exceeds 5000 cards limit`};for(const[o,n]of s.entries())if(!n||typeof n!="object")return{success:!1,error:`Invalid card at topic ${a}, card ${o} in ${e}`}}return{success:!0}}isInstalled(t){return this._installed.has(t)}getInstalledInfo(t){return this._installed.get(t)||null}async exportForPublishing(t,e,a){try{const i=window.state;if(!i||typeof i.getCourses!="function")throw new Error("App state not available");const s=i.getCourses(),o=i.getLessons();let n={},c=0,f=0,h=0;switch(t){case"vault":{if(!s.find(y=>y.id===e&&y.isFolder))throw new Error("Vault not found");const v=s.filter(y=>y.parentId===e&&!y.isFolder);n.projects=v.map(y=>{const _=o.filter(d=>d.courseId===y.id).map(d=>({name:d.name||d.title,document:d.document||"",cards:(d.cards||[]).map(g=>({title:g.title,content:g.content,type:g.type||"basic"}))}));return c+=_.reduce((d,g)=>d+g.cards.length,0),f+=_.length,{name:y.name,topics:_}}),h=v.length;break}case"project":{if(!s.find(y=>y.id===e&&!y.isFolder))throw new Error("Project not found");const v=o.filter(y=>y.courseId===e);n.topics=v.map(y=>({name:y.name||y.title,document:y.document||"",cards:(y.cards||[]).map(C=>({title:C.title,content:C.content,type:C.type||"basic"}))})),c=n.topics.reduce((y,C)=>y+C.cards.length,0),f=n.topics.length;break}case"topic":{const l=o.find(v=>v.id===e);if(!l)throw new Error("Topic not found");n={name:l.name||l.title,document:l.document||"",cards:(l.cards||[]).map(v=>({title:v.title,content:v.content,type:v.type||"basic"}))},c=n.cards.length,f=1;break}}return{success:!0,package:{meta:{id:`${a.author||"user"}-${a.name.toLowerCase().replace(/\s+/g,"-")}-${Date.now()}`,type:t,name:a.name,description:a.description||"",author:a.author||"Anonymous",category:a.category||"other",tags:a.tags||[],cardCount:c,topicCount:f,projectCount:h,version:"1.0.0",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},data:n}}}catch(i){return{success:!1,error:i.message}}}async publishDirect(t){try{const e=t.meta||{},a=JSON.stringify(t,null,2);try{navigator.clipboard?.writeText&&await navigator.clipboard.writeText(a)}catch(o){console.warn("[ContentMarketplace] Clipboard write failed:",o)}const i=localStorage.getItem("atlas-github-token")||localStorage.getItem("atlas-github-pat");if(i)try{const o=`### Content Name

${e.name||"Study Content"}

### Content Type

${e.type||"topic"}

### Category

${e.category||"other"}

### Your Name/Username

${e.author||"Anonymous"}

### Description

${e.description||""}

### Tags

${(e.tags||[]).join(", ")}

### Package JSON

\`\`\`json
${a}
\`\`\`

### Agreement

- [x] I created this content or have rights to share it
- [x] This content is educational and appropriate
- [x] I agree to license this under CC BY-SA 4.0
`,n=await fetch("https://api.github.com/repos/Resistance-Labs-Tech/atlasface-community/issues",{method:"POST",headers:{Authorization:`token ${i}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({title:`[Content] ${e.name||"Study Content"}`,labels:["content-submission","automated"],body:o})});if(n.ok){const c=await n.json();return{success:!0,createdIssue:!0,item:{name:e.name,shareUrl:c.html_url}}}}catch(o){console.warn("[ContentMarketplace] Direct GitHub API submission failed:",o)}if(typeof window<"u"&&window.location?.origin&&window.location.origin.startsWith("http")&&!window.location.origin.includes("localhost:5173"))try{const o=await fetch(`${window.location.origin}/api/publish`,{method:"POST",headers:{"Content-Type":"application/json"},body:a});if(o.ok){const n=await o.json();if(n.success)return n}}catch{}const s=this.getSubmitUrl(t);return window.electronAPI?.openExternal?window.electronAPI.openExternal(s):typeof window<"u"&&window.open(s,"_blank"),{success:!0,openedBrowser:!0,submitUrl:s,item:{name:e.name,shareUrl:s}}}catch(e){return console.error("[ContentMarketplace] Direct publish failed:",e),{success:!1,error:e.message}}}async exportToFile(t,e,a){const i=await this.exportForPublishing(t,e,a);if(!i.success)return i;try{const s=JSON.stringify(i.package,null,2),o=new Blob([s],{type:"application/json"}),n=`${(a.name||"study-deck").toLowerCase().replace(/[^a-z0-9]+/g,"-")}.atlasdeck`,c=document.createElement("a");return c.href=URL.createObjectURL(o),c.download=n,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(c.href),{success:!0,filename:n}}catch(s){return console.error("[ContentMarketplace] Export to file failed:",s),{success:!1,error:s.message}}}async importFromFile(t){try{let e;if(typeof t=="string")e=t;else if(t instanceof Blob||t instanceof File)e=await t.text();else throw new Error("Unsupported file format for import");const a=JSON.parse(e),i=a.meta||a,s={id:i.id||`local-import-${Date.now()}`,type:i.type||"topic",name:i.name||"Imported Deck",author:i.author||"Local User",version:i.version||"1.0.0"},o=this._validatePackagePayload(s,a);if(!o.success)throw new Error(o.error||"Invalid package payload");const n=await this._importContent(s,o.package);if(!n.success)throw new Error(n.error||"Import failed");return{success:!0,localId:n.localId,item:s}}catch(e){return console.error("[ContentMarketplace] Import from file failed:",e),{success:!1,error:e.message}}}getSubmitUrl(t){const e=t.meta||{};return`https://github.com/Resistance-Labs-Tech/atlasface-community/issues/new?${new URLSearchParams({template:"content-submission.yml",title:`[Content] ${e.name||"New Deck"}`}).toString()}`}_loadInstalled(){try{const t=localStorage.getItem(x);if(t){const e=JSON.parse(t);this._installed=new Map(Object.entries(e))}}catch{}}_saveInstalled(){try{const t=Object.fromEntries(this._installed);localStorage.setItem(x,JSON.stringify(t))}catch{}}_getCachedCatalog(){try{const t=sessionStorage.getItem(j);if(!t)return null;const{timestamp:e,data:a,version:i}=JSON.parse(t);return(i||0)<2||Date.now()-e>9e5?(sessionStorage.removeItem(j),null):a}catch{return null}}_cacheCatalog(t){try{sessionStorage.setItem(j,JSON.stringify({timestamp:Date.now(),version:2,data:t}))}catch{}}}const I=new O;window.contentMarketplace=I;const P=[{id:"all",label:"All",icon:"fa-globe"},{id:"featured",label:"Featured",icon:"fa-star"},{id:"popular",label:"Popular",icon:"fa-fire"},{id:"recent",label:"Recent",icon:"fa-clock-o"},{id:"languages",label:"Languages",icon:"fa-language"},{id:"science",label:"Science",icon:"fa-flask"},{id:"math",label:"Math",icon:"fa-calculator"},{id:"history",label:"History",icon:"fa-book"},{id:"programming",label:"Programming",icon:"fa-code"},{id:"medicine",label:"Medicine",icon:"fa-heartbeat"},{id:"other",label:"Other",icon:"fa-folder-o"}],F=[{id:"all",label:"All Types"},{id:"vault",label:"Vaults"},{id:"project",label:"Projects"},{id:"topic",label:"Topics"}];class R{constructor(){this.overlay=null,this.isOpen=!1,this.activeCategory="all",this.activeType="all",this.searchQuery="",this._built=!1,this._items=[],this._detailItem=null,this._catalogUnavailable=!1}async open(){this._built||this._build(),this.overlay.classList.add("active"),this.isOpen=!0,document.body.classList.add("modal-open"),this._closeDetail(),this._showLoading(),await this._fetchItems(),this._renderItems();const t=this.overlay.querySelector(".cm-search-input");t&&setTimeout(()=>t.focus(),100)}close(){this.overlay&&(this.overlay.classList.remove("active"),this.isOpen=!1,document.body.classList.remove("modal-open"))}toggle(){this.isOpen?this.close():this.open()}_build(){this.overlay=document.createElement("div"),this.overlay.className="cm-overlay",this.overlay.innerHTML=`
            <div class="cm-modal" role="dialog" aria-label="Community Marketplace">
                <div class="cm-header">
                    <div class="cm-header-left">
                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        <h2>Community Marketplace</h2>
                        <span class="cm-beta-badge">Beta</span>
                    </div>
                    <div class="cm-header-actions">
                        <button class="btn btn-secondary btn-sm cm-import-file-btn" title="Import a local .atlasdeck or JSON file">
                            <i class="fa fa-folder-open-o"></i>
                            <span>Import File</span>
                        </button>
                        <input type="file" class="cm-import-file-input" accept=".json,.atlasdeck" style="display: none;" />
                        <button class="btn btn-secondary btn-sm cm-publish-btn">
                            <i class="fa fa-upload"></i>
                            <span>Publish</span>
                        </button>
                        <button class="cm-close-btn" title="Close">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>

                <div class="cm-toolbar">
                    <div class="cm-search">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" class="cm-search-input" placeholder="Search study content..." />
                    </div>
                    
                    <div class="cm-type-filter">
                        ${F.map(t=>`
                            <button class="cm-type-btn ${t.id==="all"?"active":""}" 
                                    data-type="${t.id}">
                                ${t.label}
                            </button>
                        `).join("")}
                    </div>
                </div>

                <div class="cm-body">
                    <aside class="cm-sidebar">
                        <h3 class="cm-sidebar-title">Categories</h3>
                        <nav class="cm-categories">
                            ${P.map(t=>`
                                <button class="cm-cat-btn ${t.id==="all"?"active":""}" 
                                        data-category="${t.id}">
                                    <i class="fa ${t.icon}" aria-hidden="true"></i>
                                    <span>${t.label}</span>
                                </button>
                            `).join("")}
                        </nav>
                    </aside>

                    <main class="cm-main">
                        <div class="cm-items-grid"></div>
                        <div class="cm-loading">
                            <div class="cm-spinner"></div>
                            <p>Loading community content...</p>
                        </div>
                        <div class="cm-empty">
                            <i class="fa fa-inbox"></i>
                            <p>No content found</p>
                            <span>Try adjusting your filters or be the first to publish!</span>
                        </div>
                    </main>

                    <aside class="cm-detail">
                        <div class="cm-detail-header">
                            <button class="cm-detail-back">
                                <i class="fa fa-arrow-left"></i>
                                <span>Back</span>
                            </button>
                        </div>
                        <div class="cm-detail-content"></div>
                    </aside>
                </div>
            </div>
        `,document.body.appendChild(this.overlay),this._attachEvents(),this._built=!0}_attachEvents(){this.overlay.querySelector(".cm-close-btn").addEventListener("click",()=>this.close()),this.overlay.addEventListener("click",s=>{s.target===this.overlay&&this.close()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&this.isOpen&&this.close()}),this.overlay.querySelectorAll(".cm-cat-btn").forEach(s=>{s.addEventListener("click",()=>{this.overlay.querySelectorAll(".cm-cat-btn").forEach(o=>o.classList.remove("active")),s.classList.add("active"),this.activeCategory=s.dataset.category,this._renderItems()})}),this.overlay.querySelectorAll(".cm-type-btn").forEach(s=>{s.addEventListener("click",()=>{this.overlay.querySelectorAll(".cm-type-btn").forEach(o=>o.classList.remove("active")),s.classList.add("active"),this.activeType=s.dataset.type,this._renderItems()})});const t=this.overlay.querySelector(".cm-search-input");let e;t.addEventListener("input",s=>{clearTimeout(e),e=setTimeout(()=>{this.searchQuery=s.target.value.toLowerCase(),this._renderItems()},200)}),this.overlay.querySelector(".cm-detail-back").addEventListener("click",()=>{this._closeDetail()}),this.overlay.querySelector(".cm-publish-btn").addEventListener("click",()=>{this._openPublishFlow()});const a=this.overlay.querySelector(".cm-import-file-btn"),i=this.overlay.querySelector(".cm-import-file-input");a&&i&&(a.addEventListener("click",()=>i.click()),i.addEventListener("change",async s=>{if(s.target.files&&s.target.files[0]){const o=s.target.files[0],n=await I.importFromFile(o);n.success?(window.notificationService?.showToast&&window.notificationService.showToast({title:"Deck Imported",message:`"${n.item.name}" was successfully imported into your library.`,type:"success",duration:4e3}),this.close()):window.notificationService?.showToast&&window.notificationService.showToast({title:"Import Failed",message:n.error||"Could not import file",type:"error",duration:4e3}),i.value=""}})),window.addEventListener("atlasface:deep-link-install",async s=>{const{id:o}=s.detail||{};if(o){await this.open();const n=this._items.find(c=>c.id===o);n&&this._openDetail(n)}})}async _fetchItems(){this._catalogUnavailable=!1,this._items=await I.fetchCatalog();const t=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";this._items.length===0&&(this._catalogUnavailable=!0,t&&(this._items=this._getDemoItems()))}_getDemoItems(){return[{id:"spanish-basics",type:"project",name:"Spanish Basics",description:"Essential Spanish vocabulary and phrases for beginners. Covers greetings, numbers, colors, and common expressions.",author:"StudyWorld",authorAvatar:null,category:"languages",downloads:12453,rating:4.8,ratingCount:234,cardCount:250,topicCount:12,tags:["spanish","language","beginner","vocabulary"],featured:!0,previewImage:null,createdAt:"2024-03-15",updatedAt:"2024-03-28",packageUrl:null},{id:"ap-biology",type:"vault",name:"AP Biology Complete",description:"Comprehensive AP Biology study vault covering all units: Cell Biology, Genetics, Evolution, Ecology, and more.",author:"ScienceGeek",authorAvatar:null,category:"science",downloads:8721,rating:4.9,ratingCount:156,cardCount:890,topicCount:45,projectCount:8,tags:["biology","AP","science","cells","genetics"],featured:!0,previewImage:null,createdAt:"2024-02-10",updatedAt:"2024-03-20",packageUrl:null},{id:"javascript-fundamentals",type:"topic",name:"JavaScript Fundamentals",description:"Core JavaScript concepts including variables, functions, arrays, objects, and async programming.",author:"CodeMaster",authorAvatar:null,category:"programming",downloads:5234,rating:4.7,ratingCount:89,cardCount:120,tags:["javascript","programming","web","code"],featured:!1,previewImage:null,createdAt:"2024-03-01",updatedAt:"2024-03-25",packageUrl:null}]}_getFilteredItems(){return this._items.filter(t=>{if(this.activeType!=="all"&&t.type!==this.activeType)return!1;if(this.activeCategory==="featured"){if(!t.featured)return!1}else if(this.activeCategory!=="popular"){if(this.activeCategory!=="recent"){if(this.activeCategory!=="all"&&t.category!==this.activeCategory)return!1}}return!(this.searchQuery&&!`${t.name} ${t.description} ${t.tags.join(" ")} ${t.author}`.toLowerCase().includes(this.searchQuery))}).sort((t,e)=>this.activeCategory==="popular"?e.downloads-t.downloads:this.activeCategory==="recent"?new Date(e.updatedAt)-new Date(t.updatedAt):t.featured!==e.featured?e.featured-t.featured:e.downloads-t.downloads)}_showLoading(){const t=this.overlay.querySelector(".cm-loading"),e=this.overlay.querySelector(".cm-items-grid"),a=this.overlay.querySelector(".cm-empty");t.style.display="flex",e.style.display="none",a.style.display="none"}_renderItems(){const t=this.overlay.querySelector(".cm-loading"),e=this.overlay.querySelector(".cm-items-grid"),a=this.overlay.querySelector(".cm-empty"),i=a.querySelector("p"),s=a.querySelector("span");if(t.style.display="none",this._catalogUnavailable?(i.textContent="Community catalog unavailable",s.textContent="Check your connection and try again. No demo data is shown in production."):(i.textContent="No content found",s.textContent="Try adjusting your filters or be the first to publish!"),this._getFilteredItems().length===0){e.style.display="none",a.style.display="flex";return}}async _fetchItems(){this._catalogUnavailable=!1,this._items=await I.fetchCatalog();const t=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";this._items.length===0&&(this._catalogUnavailable=!0,t&&(this._items=this._getDemoItems()))}_getDemoItems(){return[{id:"spanish-basics",type:"project",name:"Spanish Basics",description:"Essential Spanish vocabulary and phrases for beginners. Covers greetings, numbers, colors, and common expressions.",author:"StudyWorld",authorAvatar:null,category:"languages",downloads:12453,rating:4.8,ratingCount:234,cardCount:250,topicCount:12,tags:["spanish","language","beginner","vocabulary"],featured:!0,previewImage:null,createdAt:"2024-03-15",updatedAt:"2024-03-28",packageUrl:null},{id:"ap-biology",type:"vault",name:"AP Biology Complete",description:"Comprehensive AP Biology study vault covering all units: Cell Biology, Genetics, Evolution, Ecology, and more.",author:"ScienceGeek",authorAvatar:null,category:"science",downloads:8721,rating:4.9,ratingCount:156,cardCount:890,topicCount:45,projectCount:8,tags:["biology","AP","science","cells","genetics"],featured:!0,previewImage:null,createdAt:"2024-02-10",updatedAt:"2024-03-20",packageUrl:null},{id:"javascript-fundamentals",type:"topic",name:"JavaScript Fundamentals",description:"Core JavaScript concepts including variables, functions, arrays, objects, and async programming.",author:"CodeMaster",authorAvatar:null,category:"programming",downloads:5234,rating:4.7,ratingCount:89,cardCount:120,tags:["javascript","programming","web","code"],featured:!1,previewImage:null,createdAt:"2024-03-01",updatedAt:"2024-03-25",packageUrl:null}]}_getFilteredItems(){return this._items.filter(t=>{if(this.activeType!=="all"&&t.type!==this.activeType)return!1;if(this.activeCategory==="featured"){if(!t.featured)return!1}else if(this.activeCategory!=="popular"){if(this.activeCategory!=="recent"){if(this.activeCategory!=="all"&&t.category!==this.activeCategory)return!1}}return!(this.searchQuery&&!`${t.name} ${t.description} ${t.tags.join(" ")} ${t.author}`.toLowerCase().includes(this.searchQuery))}).sort((t,e)=>this.activeCategory==="popular"?e.downloads-t.downloads:this.activeCategory==="recent"?new Date(e.updatedAt)-new Date(t.updatedAt):t.featured!==e.featured?e.featured-t.featured:e.downloads-t.downloads)}_showLoading(){const t=this.overlay.querySelector(".cm-loading"),e=this.overlay.querySelector(".cm-items-grid"),a=this.overlay.querySelector(".cm-empty");t.style.display="flex",e.style.display="none",a.style.display="none"}_renderItems(){const t=this.overlay.querySelector(".cm-loading"),e=this.overlay.querySelector(".cm-items-grid"),a=this.overlay.querySelector(".cm-empty"),i=a.querySelector("p"),s=a.querySelector("span");t.style.display="none",this._catalogUnavailable?(i.textContent="Community catalog unavailable",s.textContent="Check your connection and try again. No demo data is shown in production."):(i.textContent="No content found",s.textContent="Try adjusting your filters or be the first to publish!");const o=this._getFilteredItems();if(o.length===0){e.style.display="none",a.style.display="flex";return}e.style.display="grid",a.style.display="none",e.innerHTML=o.map(n=>this._renderItemCard(n)).join(""),e.querySelectorAll(".cm-item-card").forEach(n=>{n.addEventListener("click",()=>{const c=n.dataset.itemId,f=this._items.find(h=>h.id===c);f&&this._openDetail(f)})})}_renderItemCard(t){const e={vault:"fa-folder",project:"fa-book",topic:"fa-file-text-o"}[t.type]||"fa-file-o",a={vault:"Vault",project:"Project",topic:"Topic"}[t.type]||"Content",i=[];return t.cardCount&&i.push(`${this._formatNumber(t.cardCount)} cards`),t.topicCount&&i.push(`${t.topicCount} topics`),t.projectCount&&i.push(`${t.projectCount} projects`),`
            <article class="cm-item-card" data-item-id="${t.id}">
                <div class="cm-item-header">
                    <div class="cm-item-type">
                        <i class="fa ${e}"></i>
                        <span>${a}</span>
                    </div>
                    <div class="cm-item-header-meta">
                        ${t.featured?'<span class="cm-item-featured-chip" title="Featured"><i class="fa fa-star"></i> Featured</span>':""}
                        <div class="cm-item-rating">
                            <i class="fa fa-star"></i>
                            <span>${t.rating}</span>
                        </div>
                    </div>
                </div>
                
                <h3 class="cm-item-name">${this._escapeHtml(t.name)}</h3>
                <p class="cm-item-desc">${this._escapeHtml(t.description)}</p>
                
                <div class="cm-item-stats">
                    ${i.map(s=>`<span>${s}</span>`).join("")}
                </div>
                
                <div class="cm-item-footer">
                    <div class="cm-item-author">
                        <div class="cm-item-avatar">
                            ${t.authorAvatar?`<img src="${t.authorAvatar}" alt="${t.author}" />`:`<span>${t.author.charAt(0).toUpperCase()}</span>`}
                        </div>
                        <span>${this._escapeHtml(t.author)}</span>
                    </div>
                    <div class="cm-item-downloads">
                        <i class="fa fa-download"></i>
                        <span>${this._formatNumber(t.downloads)}</span>
                    </div>
                </div>
            </article>
        `}_openDetail(t){this._detailItem=t;const e=this.overlay.querySelector(".cm-detail"),a=e.querySelector(".cm-detail-content"),i={vault:"fa-folder-o",project:"fa-book",topic:"fa-file-text-o"}[t.type]||"fa-file-o";let s=t.sampleCards||[];s.length===0&&t.package?.data&&(Array.isArray(t.package.data.cards)?s=t.package.data.cards.map(d=>({front:d.title||d.prompt||d.question||"Concept Prompt",back:d.content||d.answer||d.solution||"Explanation"})):Array.isArray(t.package.data.topics)&&t.package.data.topics.forEach(d=>{Array.isArray(d.cards)&&d.cards.forEach(g=>{s.length<10&&s.push({front:g.title||g.prompt||`${d.name||"Topic"}: Card`,back:g.content||g.answer||"Study prompt content"})})})),s.length===0&&(s=[{front:`Overview: ${t.name}`,back:t.description||"Study deck containing flashcards and structured review prompts ready to install in your ATLAS:Face library."}]),a.innerHTML=`
            <div class="cm-detail-workspace">
                <!-- Left Column: Identity, Stats & Actions -->
                <div class="cm-detail-left">
                    <div class="cm-detail-hero">
                        <div class="cm-detail-type ${t.type}">
                            <i class="fa ${i}"></i>
                            <span>${t.type?t.type.charAt(0).toUpperCase()+t.type.slice(1):"Topic"}</span>
                        </div>
                        ${t.featured?'<span class="cm-detail-featured"><i class="fa fa-star"></i> Featured</span>':""}
                    </div>

                    <h2 class="cm-detail-title">${this._escapeHtml(t.name)}</h2>

                    <div class="cm-detail-meta">
                        <div class="cm-detail-author">
                            <div class="cm-detail-avatar">
                                ${t.authorAvatar?`<img src="${t.authorAvatar}" alt="${t.author}" />`:`<span>${(t.author||"C").charAt(0).toUpperCase()}</span>`}
                            </div>
                            <span>by <strong>${this._escapeHtml(t.author||"Community")}</strong></span>
                        </div>
                        <div class="cm-detail-rating">
                            ${this._renderStars(t.rating||5)}
                            <span>${t.rating||5} ${t.ratingCount?`(${t.ratingCount} reviews)`:"(Community verified)"}</span>
                        </div>
                    </div>

                    <p class="cm-detail-desc">${this._escapeHtml(t.description||"Community-contributed study deck for ATLAS:Face.")}</p>

                    <div class="cm-detail-stats-grid">
                        <div class="cm-stat-card">
                            <i class="fa fa-download"></i>
                            <span class="cm-stat-card-val">${this._formatNumber(t.downloads||1)}</span>
                            <span class="cm-stat-card-lbl">Installs</span>
                        </div>
                        <div class="cm-stat-card">
                            <i class="fa fa-clone"></i>
                            <span class="cm-stat-card-val">${t.cardCount||s.length||0}</span>
                            <span class="cm-stat-card-lbl">Cards</span>
                        </div>
                        <div class="cm-stat-card">
                            <i class="fa fa-file-text-o"></i>
                            <span class="cm-stat-card-val">${t.topicCount||1}</span>
                            <span class="cm-stat-card-lbl">Topics</span>
                        </div>
                    </div>

                    <div class="cm-detail-actions">
                        <button class="btn btn-primary btn-lg cm-install-btn">
                            <i class="fa fa-download"></i>
                            <span>Install in Library</span>
                        </button>
                        <button class="btn btn-secondary cm-copy-link-btn" title="Copy public share URL">
                            <i class="fa fa-link"></i>
                            <span>Share</span>
                        </button>
                    </div>

                    <div class="cm-detail-spec-card">
                        <div class="cm-info-row">
                            <span class="cm-info-label">Category</span>
                            <span class="cm-info-value">${this._getCategoryLabel(t.category)}</span>
                        </div>
                        <div class="cm-info-row">
                            <span class="cm-info-label">Last updated</span>
                            <span class="cm-info-value">${this._formatDate(t.updatedAt||t.createdAt)}</span>
                        </div>
                        <div class="cm-info-row">
                            <span class="cm-info-label">Published</span>
                            <span class="cm-info-value">${this._formatDate(t.createdAt)}</span>
                        </div>
                        ${t.tags&&t.tags.length>0?`
                            <div class="cm-info-row-tags">
                                <span class="cm-info-label">Tags</span>
                                <div class="cm-tags-wrap">
                                    ${t.tags.map(d=>`<span class="cm-tag">${this._escapeHtml(d)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                </div>

                <!-- Right Column: Interactive 3D Card Preview Stage -->
                <div class="cm-detail-right">
                    <div class="cm-preview-box">
                        <div class="cm-preview-header">
                            <div class="cm-preview-title-wrap">
                                <i class="fa fa-eye"></i>
                                <span>Interactive Flashcard Preview</span>
                            </div>
                            <span class="cm-preview-counter" id="cm-card-counter">Card 1 of ${s.length}</span>
                        </div>

                        <!-- 3D Card Stage -->
                        <div class="cm-card-stage-wrap">
                            <div class="cm-card-stage" id="cm-card-stage" title="Click to flip card">
                                <div class="cm-card-flipper">
                                    <div class="cm-card-face cm-card-front">
                                        <span class="cm-card-face-tag">Front (Prompt)</span>
                                        <div class="cm-card-text" id="cm-card-front-text">${this._escapeHtml(s[0]?.front||"")}</div>
                                        <span class="cm-card-hint"><i class="fa fa-repeat"></i> Click to flip</span>
                                    </div>
                                    <div class="cm-card-face cm-card-back">
                                        <span class="cm-card-face-tag">Back (Answer)</span>
                                        <div class="cm-card-text" id="cm-card-back-text">${this._escapeHtml(s[0]?.back||"")}</div>
                                        <span class="cm-card-hint"><i class="fa fa-repeat"></i> Click to flip</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Preview Navigation Controls -->
                        <div class="cm-preview-controls">
                            <button class="btn btn-secondary btn-sm" id="cm-prev-card-btn" ${s.length<=1?"disabled":""}>
                                <i class="fa fa-chevron-left"></i> <span>Prev</span>
                            </button>
                            <span class="cm-preview-nav-hint">Click card to flip</span>
                            <button class="btn btn-secondary btn-sm" id="cm-next-card-btn" ${s.length<=1?"disabled":""}>
                                <span>Next</span> <i class="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Card Outlines Inspector -->
                    <div class="cm-card-list-box">
                        <div class="cm-card-list-header">
                            <i class="fa fa-list"></i>
                            <span>Sample Prompts in Deck (${s.length})</span>
                        </div>
                        <div class="cm-card-list-items">
                            ${s.map((d,g)=>`
                                <div class="cm-card-list-item ${g===0?"active":""}" data-idx="${g}">
                                    <span class="cm-card-list-num">${g<9?"0":""}${g+1}</span>
                                    <div class="cm-card-list-txt">
                                        <strong>${this._escapeHtml(d.front)}</strong>
                                        <p>${this._escapeHtml(d.back)}</p>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;let o=0;const n=a.querySelector("#cm-card-stage"),c=a.querySelector("#cm-card-front-text"),f=a.querySelector("#cm-card-back-text"),h=a.querySelector("#cm-card-counter"),m=a.querySelector("#cm-prev-card-btn"),l=a.querySelector("#cm-next-card-btn"),v=a.querySelectorAll(".cm-card-list-item"),y=d=>{o=Math.max(0,Math.min(d,s.length-1));const g=s[o];g&&(n&&n.classList.remove("flipped"),c&&(c.textContent=g.front),f&&(f.textContent=g.back),h&&(h.textContent=`Card ${o+1} of ${s.length}`),m&&(m.disabled=o===0),l&&(l.disabled=o===s.length-1),v.forEach(E=>{const L=parseInt(E.dataset.idx,10);E.classList.toggle("active",L===o)}))};n&&n.addEventListener("click",()=>{n.classList.toggle("flipped")}),m&&m.addEventListener("click",d=>{d.stopPropagation(),y(o-1)}),l&&l.addEventListener("click",d=>{d.stopPropagation(),y(o+1)}),v.forEach(d=>{d.addEventListener("click",()=>{const g=parseInt(d.dataset.idx,10);y(g)})});const C=a.querySelector(".cm-copy-link-btn");C&&C.addEventListener("click",async()=>{const d=t.shareUrl||`https://atlasface.resistancelabs.tech/marketplace?id=${encodeURIComponent(t.id)}`;try{await navigator.clipboard.writeText(d),window.notificationService?.showToast&&window.notificationService.showToast({title:"Link Copied",message:"Marketplace share URL copied to clipboard.",type:"success",duration:3e3})}catch(g){console.warn("Clipboard write failed:",g)}});const _=a.querySelector(".cm-install-btn");_&&_.addEventListener("click",()=>{this._installItem(t)}),e.classList.add("open"),this.overlay.querySelector(".cm-main").classList.add("detail-open")}_closeDetail(){this.overlay.querySelector(".cm-detail")?.classList.remove("open"),this.overlay.querySelector(".cm-main")?.classList.remove("detail-open"),this._detailItem=null}_renderStars(t){const e=Math.floor(t),a=t%1>=.5,i=5-e-(a?1:0);return[...Array(e).fill('<i class="fa fa-star"></i>'),a?'<i class="fa fa-star-half-o"></i>':"",...Array(i).fill('<i class="fa fa-star-o"></i>')].join("")}async _installItem(t){const e=this.overlay.querySelector(".cm-install-btn");e.disabled=!0,e.innerHTML='<i class="fa fa-spinner fa-spin"></i> <span>Installing...</span>';try{if(!t.packageUrl){e.innerHTML='<i class="fa fa-info-circle"></i> <span>Demo Only</span>',window.notificationService?.showToast&&window.notificationService.showToast({title:"Demo Content",message:"This is demo content. Real content will be available from the community repository.",type:"info",duration:4e3}),setTimeout(()=>{e.disabled=!1,e.innerHTML='<i class="fa fa-download"></i> <span>Install</span>'},2e3);return}const a=await I.install(t.id);if(!a.success)throw new Error(a.error||"Installation failed");e.innerHTML='<i class="fa fa-check"></i> <span>Installed!</span>',e.classList.add("btn-success"),window.notificationService?.showToast&&window.notificationService.showToast({title:"Content Installed",message:`"${t.name}" has been added to your library.`,type:"success",duration:4e3}),setTimeout(()=>{e.disabled=!1,e.innerHTML='<i class="fa fa-check"></i> <span>Installed</span>',e.classList.remove("btn-success")},2e3)}catch(a){e.disabled=!1,e.innerHTML='<i class="fa fa-exclamation-circle"></i> <span>Error</span>',e.classList.add("btn-danger"),window.notificationService?.showToast&&window.notificationService.showToast({title:"Installation Failed",message:a.message||"Could not install content",type:"error",duration:4e3}),setTimeout(()=>{e.innerHTML='<i class="fa fa-download"></i> <span>Install</span>',e.classList.remove("btn-danger")},2e3)}}_previewItem(t){window.notificationService?.showToast&&window.notificationService.showToast({title:"Preview",message:`${t.name}: ${t.cardCount} cards, ${t.topicCount||1} topics`,type:"info",duration:3e3})}_openPublishFlow(){this._showPublishModal()}_showPublishModal(){const t=document.querySelector(".cm-publish-modal");t&&t.remove();const e=window.state||{},a=typeof e.getCourses=="function"?e.getCourses():[],i=typeof e.getLessons=="function"?e.getLessons():[],s=typeof e.getCurrentLessonId=="function"?e.getCurrentLessonId():null,o=typeof e.getCurrentCourseId=="function"?e.getCurrentCourseId():null,n=i.map(r=>{const u=a.find(p=>p.id===r.courseId);return{id:r.id,type:"topic",name:r.name||r.title||"Untitled Topic",parentName:u?u.name:"Unassigned Course",cardCount:(r.cards||[]).length,description:(r.document||"").slice(0,120)}}),c=a.filter(r=>!r.isFolder).map(r=>{const u=i.filter(b=>b.courseId===r.id),p=u.reduce((b,w)=>b+(w.cards||[]).length,0);return{id:r.id,type:"project",name:r.name||"Untitled Project",parentName:r.parentId?a.find(b=>b.id===r.parentId)?.name||"Vault":"Root Library",topicCount:u.length,cardCount:p,description:`${u.length} topics, ${p} cards`}}),f=a.filter(r=>r.isFolder).map(r=>{const u=a.filter(w=>w.parentId===r.id&&!w.isFolder);let p=0,b=0;return u.forEach(w=>{const $=i.filter(k=>k.courseId===w.id);b+=$.length,p+=$.reduce((k,S)=>k+(S.cards||[]).length,0)}),{id:r.id,type:"vault",name:r.name||"Untitled Vault",parentName:"Vault Folder",projectCount:u.length,topicCount:b,cardCount:p,description:`${u.length} projects, ${p} cards`}});let h="topic",m=null;s&&n.some(r=>String(r.id)===String(s))?(h="topic",m=n.find(r=>String(r.id)===String(s))):o&&(a.some(u=>String(u.id)===String(o)&&u.isFolder)&&f.some(u=>String(u.id)===String(o))?(h="vault",m=f.find(u=>String(u.id)===String(o))):c.some(u=>String(u.id)===String(o))&&(h="project",m=c.find(u=>String(u.id)===String(o)))),m||(n.length>0?(h="topic",m=n[0]):c.length>0?(h="project",m=c[0]):f.length>0&&(h="vault",m=f[0]));const l=document.createElement("div");l.className="cm-publish-modal",l.innerHTML=`
            <div class="cm-publish-overlay">
                <div class="cm-publish-box">
                    <div class="cm-publish-header">
                        <h3><i class="fa fa-upload"></i> Publish to Community</h3>
                        <button class="cm-publish-close" title="Close"><i class="fa fa-times"></i></button>
                    </div>
                    <div class="cm-publish-body">
                        <p class="cm-publish-intro">
                            Select the study material from your library to share with the community.
                        </p>

                        <!-- Visual Scope Switcher -->
                        <div class="cm-scope-tabs">
                            <button type="button" class="cm-scope-tab ${h==="topic"?"active":""}" data-scope="topic">
                                <i class="fa fa-file-text-o"></i> <span>Topics (${n.length})</span>
                            </button>
                            <button type="button" class="cm-scope-tab ${h==="project"?"active":""}" data-scope="project">
                                <i class="fa fa-book"></i> <span>Projects (${c.length})</span>
                            </button>
                            <button type="button" class="cm-scope-tab ${h==="vault"?"active":""}" data-scope="vault">
                                <i class="fa fa-folder-o"></i> <span>Vaults (${f.length})</span>
                            </button>
                        </div>

                        <!-- Search Filter inside Picker -->
                        <div class="cm-picker-search">
                            <i class="fa fa-search"></i>
                            <input type="text" class="cm-picker-search-input" placeholder="Search your library..." />
                        </div>

                        <!-- Visual Item Selector List -->
                        <div class="cm-item-picker-list" id="cm-item-picker-list">
                            <!-- Populated dynamically -->
                        </div>

                        <!-- Selected Summary Pill -->
                        <div class="cm-selected-summary-pill" id="cm-selected-summary">
                            <i class="fa fa-check-circle"></i>
                            <span class="cm-selected-text">No item selected</span>
                        </div>

                        <!-- Publishing Metadata Form -->
                        <div class="cm-publish-form">
                            <div class="cm-form-group">
                                <label>Display Name *</label>
                                <input type="text" id="cm-publish-name" placeholder="Title for community listing" />
                            </div>

                            <div class="cm-form-group">
                                <label>Description</label>
                                <textarea id="cm-publish-desc" rows="2" placeholder="Brief summary of concepts, units, or key topics covered..."></textarea>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div class="cm-form-group">
                                    <label>Category</label>
                                    <select id="cm-publish-category">
                                        <option value="languages">Languages</option>
                                        <option value="science">Science</option>
                                        <option value="math">Math</option>
                                        <option value="history">History</option>
                                        <option value="programming">Programming</option>
                                        <option value="medicine">Medicine</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="cm-form-group">
                                    <label>Author / Username</label>
                                    <input type="text" id="cm-publish-author" placeholder="Your Name or Nickname" />
                                </div>
                            </div>

                            <div class="cm-form-group">
                                <label>Tags (comma-separated)</label>
                                <input type="text" id="cm-publish-tags" placeholder="biology, cells, exam, revision" />
                            </div>
                        </div>
                    </div>

                    <div class="cm-publish-footer">
                        <button class="btn btn-secondary cm-publish-cancel">Cancel</button>
                        <button class="btn btn-secondary cm-publish-export-file" title="Save as a local .atlasdeck file for offline sharing">
                            <i class="fa fa-download"></i> Save .atlasdeck
                        </button>
                        <button class="btn btn-primary cm-publish-submit">
                            <i class="fa fa-cloud-upload"></i> Publish to Community
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(l);const v=l.querySelector("#cm-publish-name"),y=l.querySelector("#cm-selected-summary"),C=l.querySelector(".cm-selected-text"),_=l.querySelector("#cm-item-picker-list"),d=l.querySelector(".cm-picker-search-input"),g=l.querySelectorAll(".cm-scope-tab"),E=()=>{if(!m){C.textContent="Please select a study deck or project above",y.style.borderColor="rgba(239, 68, 68, 0.4)";return}y.style.borderColor="rgba(59, 130, 246, 0.35)";const r=m.type?m.type.charAt(0).toUpperCase()+m.type.slice(1):"Item",u=m.cardCount!==void 0?`${m.cardCount} cards`:"";C.textContent=`Selected: [${r}] ${m.name} ${u?`• ${u}`:""}`,v.value=m.name||""},L=()=>{let r=h==="topic"?n:h==="project"?c:f;const u=(d?.value||"").toLowerCase().trim();if(u&&(r=r.filter(p=>p.name.toLowerCase().includes(u)||p.parentName&&p.parentName.toLowerCase().includes(u))),r.length===0){_.innerHTML=`<div style="text-align: center; color: var(--color-text-secondary, #94a3b8); padding: 1.5rem 0.5rem; font-size: 12px;">No ${h}s found in your library.</div>`;return}_.innerHTML=r.map(p=>{const b=m&&String(m.id)===String(p.id)&&m.type===p.type,w=p.type==="topic"?`${p.cardCount||0} cards`:p.type==="project"?`${p.topicCount||0} topics, ${p.cardCount||0} cards`:`${p.projectCount||0} projects, ${p.cardCount||0} cards`;return`
                    <div class="cm-picker-card ${b?"selected":""}" data-id="${p.id}" data-type="${p.type}">
                        <div class="cm-picker-card-left">
                            <span class="cm-picker-card-title">${this._escapeHtml(p.name)}</span>
                            <span class="cm-picker-card-breadcrumb">
                                <i class="fa fa-folder-o"></i> ${this._escapeHtml(p.parentName||"Library")}
                            </span>
                        </div>
                        <div class="cm-picker-card-right">
                            <span class="cm-picker-badge">${w}</span>
                            <div class="cm-picker-check">
                                <i class="fa fa-check"></i>
                            </div>
                        </div>
                    </div>
                `}).join(""),_.querySelectorAll(".cm-picker-card").forEach(p=>{p.addEventListener("click",()=>{const b=p.dataset.id,w=p.dataset.type,k=(w==="topic"?n:w==="project"?c:f).find(S=>String(S.id)===String(b));k&&(m=k,E(),L())})})};g.forEach(r=>{r.addEventListener("click",()=>{g.forEach(u=>u.classList.remove("active")),r.classList.add("active"),h=r.dataset.scope||"topic",L()})}),d&&d.addEventListener("input",()=>{L()}),E(),L(),l.querySelector(".cm-publish-close").addEventListener("click",()=>l.remove()),l.querySelector(".cm-publish-cancel").addEventListener("click",()=>l.remove()),l.querySelector(".cm-publish-overlay").addEventListener("click",r=>{r.target===l.querySelector(".cm-publish-overlay")&&l.remove()}),l.querySelector(".cm-publish-export-file").addEventListener("click",async()=>{const r=m?.id,u=m?.type||h,p=v.value.trim()||m?.name,b=l.querySelector("#cm-publish-desc").value.trim(),w=l.querySelector("#cm-publish-category").value,$=l.querySelector("#cm-publish-tags").value.split(",").map(A=>A.trim()).filter(Boolean),k=l.querySelector("#cm-publish-author").value.trim()||"Anonymous";if(!m||r===void 0||r===null||!p){window.notificationService?.showToast&&window.notificationService.showToast({title:"Missing Selection",message:"Please select a topic or project from your library to save",type:"warning",duration:3e3});return}const S=await I.exportToFile(u,r,{name:p,description:b,category:w,tags:$,author:k});S.success?(l.remove(),window.notificationService?.showToast&&window.notificationService.showToast({title:"File Saved",message:`Exported "${S.filename}" successfully.`,type:"success",duration:4e3})):window.notificationService?.showToast&&window.notificationService.showToast({title:"Export Failed",message:S.error||"Could not export file",type:"error",duration:4e3})});const T=l.querySelector(".cm-publish-submit");T.addEventListener("click",async()=>{const r=m?.id,u=m?.type||h,p=v.value.trim()||m?.name,b=l.querySelector("#cm-publish-desc").value.trim(),w=l.querySelector("#cm-publish-category").value,$=l.querySelector("#cm-publish-tags").value.split(",").map(q=>q.trim()).filter(Boolean),k=l.querySelector("#cm-publish-author").value.trim()||"Anonymous";if(!m||r===void 0||r===null||!p){window.notificationService?.showToast&&window.notificationService.showToast({title:"Missing Selection",message:"Please select a topic or project from your library to publish",type:"warning",duration:3e3});return}T.disabled=!0,T.innerHTML='<i class="fa fa-spinner fa-spin"></i> <span>Publishing...</span>';const S=await I.exportForPublishing(u,r,{name:p,description:b,category:w,tags:$,author:k});if(!S.success){T.disabled=!1,T.innerHTML='<i class="fa fa-cloud-upload"></i> Publish to Community',window.notificationService?.showToast&&window.notificationService.showToast({title:"Export Failed",message:S.error,type:"error",duration:4e3});return}const A=await I.publishDirect(S.package);A.success?(l.remove(),A.createdIssue?window.notificationService?.showToast&&window.notificationService.showToast({title:"Submission Created!",message:`"${p}" submitted to GitHub. GitHub Actions is now publishing it!`,type:"success",duration:7e3}):A.openedBrowser?window.notificationService?.showToast&&window.notificationService.showToast({title:"Submission Form Opened",message:`JSON copied to clipboard! Paste and submit the issue in your browser to publish "${p}".`,type:"success",duration:8e3}):window.notificationService?.showToast&&window.notificationService.showToast({title:"Published to Community",message:`"${p}" is now live in the community catalog!`,type:"success",duration:6e3}),setTimeout(async()=>{await this._fetchItems(),this._renderItems()},2e3)):(T.disabled=!1,T.innerHTML='<i class="fa fa-cloud-upload"></i> Publish to Community',window.notificationService?.showToast&&window.notificationService.showToast({title:"Publish Failed",message:A.error||'Could not publish deck. You can use "Save .atlasdeck" to export directly.',type:"error",duration:6e3}))})}_escapeHtml(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}_formatNumber(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toString()}_formatDate(t){if(!t)return"Recently";const e=new Date(t);return isNaN(e.getTime())?"Recently":e.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}_getCategoryLabel(t){return P.find(a=>a.id===t)?.label||t}}const N=new R;window.communityMarketplace=N;export{R as CommunityMarketplaceModal,N as communityMarketplace};
