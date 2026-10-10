var y=Object.defineProperty;var b=(g,e,a)=>e in g?y(g,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):g[e]=a;var h=(g,e,a)=>b(g,typeof e!="symbol"?e+"":e,a);import{m as f}from"./vendor-markdown-BkjUMIlX.js";import{pluginMarketplace as d}from"./plugin-marketplace-D2KqVvvV.js";import{z as m,A as _,C as $,D as w,F as L,G as E,H as u,I as M}from"./index-wrzawYmd.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-graph-DwCx8zU5.js";const C=[{id:"all",label:"All",icon:"fa-th"},{id:"installed",label:"Installed",icon:"fa-check-circle"},{id:"sidebar",label:"Sidebar",icon:"fa-bars"},{id:"lesson",label:"Lesson Tools",icon:"fa-book"},{id:"modal",label:"Modals",icon:"fa-window-maximize"},{id:"visualization",label:"Visualization",icon:"fa-line-chart"},{id:"productivity",label:"Productivity",icon:"fa-rocket"},{id:"service",label:"Services",icon:"fa-cogs"}];class k{constructor(){h(this,"_currentDetailId",null);this.overlay=null,this.isOpen=!1,this.activeCategory="all",this.searchQuery="",this._built=!1,this._readmeCache=new Map}async open(){this._built||this._build(),this.overlay.classList.add("active"),this.isOpen=!0,document.body.classList.add("modal-open"),this._closeDetail(),this._showLoading(),await d.fetchCatalog(),this._renderPlugins();const e=this.overlay.querySelector(".mp-search-input");e&&setTimeout(()=>e.focus(),100)}close(){this.overlay&&(this.overlay.classList.remove("active"),this.isOpen=!1,document.body.classList.remove("modal-open"))}toggle(){this.isOpen?this.close():this.open()}_build(){this.overlay=document.createElement("div"),this.overlay.className="mp-overlay",this.overlay.innerHTML=`
            <div class="mp-modal" role="dialog" aria-label="Plugin Marketplace">
                <div class="mp-header">
                    <div class="mp-header-left">
                        <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
                        <h2>Plugin Marketplace</h2>
                    </div>
                    <button class="mp-close-btn" title="Close"><i class="fa fa-times"></i></button>
                </div>

                <div class="mp-toolbar">
                    <div class="mp-search">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" class="mp-search-input" placeholder="Search plugins..." />
                    </div>
                    <div class="mp-categories">
                        ${C.map(e=>`
                            <button class="mp-cat-btn ${e.id==="all"?"active":""}" 
                                    data-category="${e.id}" title="${e.label}">
                                <i class="fa ${e.icon}" aria-hidden="true"></i>
                                <span>${e.label}</span>
                            </button>
                        `).join("")}
                    </div>
                </div>

                <!-- Main grid / detail split -->
                <div class="mp-body">
                    <div class="mp-plugins-grid" id="mp-plugins-grid">
                        <!-- Plugins rendered here -->
                    </div>
                    <div class="mp-detail-panel" id="mp-detail-panel" style="display:none;">
                        <!-- Detail / README rendered here -->
                    </div>
                </div>

                <div class="mp-footer">
                    <span class="mp-footer-text">
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                        Community plugins are open-source. 
                        <a href="#" class="mp-dev-link">Create your own →</a>
                    </span>
                </div>
            </div>
        `,document.body.appendChild(this.overlay),this._bindEvents(),this._built=!0}_bindEvents(){this.overlay.querySelector(".mp-close-btn").addEventListener("click",()=>this.close()),this.overlay.addEventListener("click",t=>{t.target===this.overlay&&this.close()}),this.overlay.addEventListener("keydown",t=>{t.key==="Escape"&&(this._isDetailOpen()?this._closeDetail():this.close())});const e=this.overlay.querySelector(".mp-search-input");let a;e.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(()=>{this.searchQuery=e.value,this._renderPlugins()},200)}),this.overlay.querySelectorAll(".mp-cat-btn").forEach(t=>{t.addEventListener("click",()=>{this.overlay.querySelectorAll(".mp-cat-btn").forEach(l=>l.classList.remove("active")),t.classList.add("active"),this.activeCategory=t.dataset.category,this._closeDetail(),this._renderPlugins()})}),this.overlay.querySelector(".mp-dev-link")?.addEventListener("click",t=>{t.preventDefault(),window.electronAPI?.openExternal?window.electronAPI.openExternal("https://github.com/Resistance-Labs-Tech/atlasface-plugins"):window.open("https://github.com/Resistance-Labs-Tech/atlasface-plugins","_blank")}),this.overlay.querySelector("#mp-plugins-grid").addEventListener("click",async t=>{const l=t.target.closest(".mp-install-btn");if(l){t.stopPropagation();const r=l.dataset.pluginId;l.disabled=!0,l.innerHTML='<i class="fa fa-spinner fa-spin"></i> Installing...',await d.install(r)?this._renderPlugins():(l.disabled=!1,l.innerHTML='<i class="fa fa-download"></i> Install');return}const o=t.target.closest(".mp-uninstall-btn");if(o){t.stopPropagation();const r=o.dataset.pluginId;o.disabled=!0,o.innerHTML='<i class="fa fa-spinner fa-spin"></i> Removing...',await d.uninstall(r)&&(this._renderPlugins(),this._currentDetailId===r&&this._closeDetail());return}const p=t.target.closest(".mp-toggle-btn");if(p){t.stopPropagation();const r=p.dataset.pluginId,n=p.dataset.builtin==="true";await this._togglePlugin(r,n),this._renderPlugins();return}const c=t.target.closest(".mp-card");if(c){const r=c.dataset.pluginId,n=c.dataset.builtin==="true";r&&this._openDetail(r,n)}}),this.overlay.querySelector("#mp-detail-panel").addEventListener("click",async t=>{if(t.target.closest(".mp-detail-back")){this._closeDetail();return}const l=t.target.closest(".mp-toggle-btn");if(l){const c=l.dataset.pluginId,r=l.dataset.builtin==="true";await this._togglePlugin(c,r),this._renderPlugins(),this._openDetail(c,r);return}const o=t.target.closest(".mp-install-btn");if(o){const c=o.dataset.pluginId;o.disabled=!0,o.innerHTML='<i class="fa fa-spinner fa-spin"></i> Installing...',await d.install(c)&&(this._renderPlugins(),this._openDetail(c,!1));return}const p=t.target.closest(".mp-uninstall-btn");if(p){const c=p.dataset.pluginId;p.disabled=!0,p.innerHTML='<i class="fa fa-spinner fa-spin"></i> Removing...',await d.uninstall(c)&&(this._closeDetail(),this._renderPlugins());return}})}async _togglePlugin(e,a){if(a){const i=m(e);if(_()!=="custom"){const s={};for(const t of Object.keys($))s[t]=m(t);w(s),L("custom")}E(e,!i),`${e}`}else u.getLoadedIds().includes(e)?(await u.unload(e),this._setPluginDisabled(e,!0),`${e}`):(this._setPluginDisabled(e,!1),await u.load(e),`${e}`)}_isLockedCommunityEnable(e,a){return a?!1:!u.getLoadedIds().includes(e)}_setPluginDisabled(e,a){try{const i=localStorage.getItem("marketplace_disabled_plugins"),s=new Set(i?JSON.parse(i):[]);a?s.add(e):s.delete(e),localStorage.setItem("marketplace_disabled_plugins",JSON.stringify([...s]))}catch{}}_isPluginDisabled(e){try{const a=localStorage.getItem("marketplace_disabled_plugins");return a?JSON.parse(a).includes(e):!1}catch{return!1}}_isDetailOpen(){const e=this.overlay.querySelector("#mp-detail-panel");return e&&e.style.display!=="none"}async _openDetail(e,a){this._currentDetailId=e;const i=this.overlay.querySelector("#mp-plugins-grid"),s=this.overlay.querySelector("#mp-detail-panel");i.style.display="none",s.style.display="block";let t=null;if(a){const n=u.getDefinition(e);n&&(t={id:n.id,name:n.name,description:n.description,category:n.category,icon:this._getIconForPlugin(n.id),author:"Built-in",version:"-",isBuiltIn:!0})}else{const n=d.getCatalog().find(v=>v.id===e);n&&(t={...n,isBuiltIn:!1})}if(!t){s.innerHTML='<p style="padding:24px;color:var(--text-muted)">Plugin not found.</p>';return}const l=u.getLoadedIds().includes(e),o=!a&&d.isInstalled(e),p=!a&&(t.status==="planned"||!t.downloadUrl);let c="";if(a){const n=m(e);c=`
                <button class="mp-toggle-btn ${n?"mp-toggle-on":"mp-toggle-off"}" 
                        data-plugin-id="${e}" data-builtin="true">
                    <i class="fa ${n?"fa-toggle-on":"fa-toggle-off"}"></i>
                    ${n?"Enabled":"Disabled"}
                </button>
                <span class="mp-settings-hint">
                    <i class="fa fa-link"></i> Synced with Settings
                </span>
            `}else o&&(c=`
                <button class="mp-toggle-btn ${l?"mp-toggle-on":"mp-toggle-off"}" 
                        data-plugin-id="${e}" data-builtin="${a}">
                    <i class="fa ${l?"fa-toggle-on":"fa-toggle-off"}"></i>
                    ${l?"Enabled":"Disabled"}
                </button>
            `);let r="";a||(p?r='<span class="mp-card-badge mp-badge-planned"><i class="fa fa-clock-o"></i> Coming Soon</span>':o?r=`<button class="mp-uninstall-btn" data-plugin-id="${e}">
                    <i class="fa fa-trash"></i> Uninstall
                </button>`:r=`<button class="mp-install-btn" data-plugin-id="${e}">
                    <i class="fa fa-download"></i> Install
                </button>`),s.innerHTML=`
            <div class="mp-detail-header">
                <button class="mp-detail-back" title="Back to list">
                    <i class="fa fa-arrow-left"></i>
                </button>
                <div class="mp-detail-icon">
                    <i class="fa ${t.icon||"fa-puzzle-piece"}"></i>
                </div>
                <div class="mp-detail-meta">
                    <h3 class="mp-detail-title">${t.name}</h3>
                    <span class="mp-detail-author">by ${t.author||"Unknown"}</span>
                    ${t.version&&t.version!=="-"?`<span class="mp-detail-version">v${t.version}</span>`:""}
                </div>
                <div class="mp-detail-actions">
                    ${c}
                    ${r}
                </div>
            </div>
            <div class="mp-detail-tags">
                <span class="mp-detail-tag"><i class="fa fa-tag"></i> ${t.category||"general"}</span>
                ${t.isBuiltIn?'<span class="mp-detail-tag mp-tag-builtin"><i class="fa fa-cube"></i> Built-in</span>':""}
                ${o?'<span class="mp-detail-tag mp-tag-installed"><i class="fa fa-check-circle"></i> Installed</span>':""}
                ${(t.tags||[]).map(n=>`<span class="mp-detail-tag">${n}</span>`).join("")}
            </div>
            <div class="mp-detail-desc">${t.description}</div>
            <div class="mp-detail-readme" id="mp-detail-readme">
                <div class="mp-loading">
                    <i class="fa fa-spinner fa-spin"></i>
                    <p>Loading README...</p>
                </div>
            </div>
        `,this._loadReadme(e,t)}_closeDetail(){this._currentDetailId=null;const e=this.overlay?.querySelector("#mp-plugins-grid"),a=this.overlay?.querySelector("#mp-detail-panel");e&&(e.style.display=""),a&&(a.style.display="none",a.innerHTML="")}async _loadReadme(e,a){const i=this.overlay.querySelector("#mp-detail-readme");if(!i)return;if(this._readmeCache.has(e)){i.innerHTML=this._renderMarkdown(this._readmeCache.get(e));return}let s=a.readmeUrl;if(!s&&a.repository){const t=a.repository.replace(/\/$/,"");t.includes("github.com")&&(s=`https://raw.githubusercontent.com/${t.replace("https://github.com/","")}/master/plugins/${e}/README.md`)}if(a.isBuiltIn||!s){i.innerHTML=`
                <div class="mp-readme-content">
                    <h4>About</h4>
                    <p>${a.description}</p>
                    ${a.isBuiltIn?'<p style="color:var(--text-muted);font-size:0.85rem;">This is a built-in plugin that ships with ATLAS:Face. Toggling it here also updates <strong>Settings &gt; Features</strong>.</p>':""}
                    ${!s&&!a.isBuiltIn?'<p style="color:var(--text-muted);font-size:0.85rem;">No README available for this plugin.</p>':""}
                </div>
            `;return}try{const t=await fetch(s,{cache:"no-cache"});if(!t.ok)throw new Error(`HTTP ${t.status}`);const l=await t.text();this._readmeCache.set(e,l),this._currentDetailId===e&&(i.innerHTML=this._renderMarkdown(l))}catch(t){console.warn(`[Marketplace] Failed to load README for ${e}:`,t),this._currentDetailId===e&&(i.innerHTML=`
                    <div class="mp-readme-content">
                        <h4>About</h4>
                        <p>${a.description}</p>
                        <p style="color:var(--text-muted);font-size:0.85rem;">Could not load README from the repository.</p>
                    </div>
                `)}}_renderMarkdown(e){e.replace(/```[\s\S]*?```/g,a=>{const i=a.replace(/^```\w*\n?/,"").replace(/\n?```$/,"");return`<pre><code>${this._escapeHtml(i)}</code></pre>`}).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/^#### (.+)$/gm,"<h6>$1</h6>").replace(/^### (.+)$/gm,"<h5>$1</h5>")}_closeDetail(){this._currentDetailId=null;const e=this.overlay?.querySelector("#mp-plugins-grid"),a=this.overlay?.querySelector("#mp-detail-panel");e&&(e.style.display=""),a&&(a.style.display="none",a.innerHTML="")}async _loadReadme(e,a){const i=this.overlay.querySelector("#mp-detail-readme");if(!i)return;if(this._readmeCache.has(e)){i.innerHTML=this._renderMarkdown(this._readmeCache.get(e));return}let s=a.readmeUrl;if(!s&&a.repository){const t=a.repository.replace(/\/$/,"");t.includes("github.com")&&(s=`https://raw.githubusercontent.com/${t.replace("https://github.com/","")}/master/plugins/${e}/README.md`)}if(a.isBuiltIn||!s){i.innerHTML=`
                <div class="mp-readme-content">
                    <h4>About</h4>
                    <p>${a.description}</p>
                    ${a.isBuiltIn?'<p style="color:var(--text-muted);font-size:0.85rem;">This is a built-in plugin that ships with ATLAS:Face. Toggling it here also updates <strong>Settings &gt; Features</strong>.</p>':""}
                    ${!s&&!a.isBuiltIn?'<p style="color:var(--text-muted);font-size:0.85rem;">No README available for this plugin.</p>':""}
                </div>
            `;return}try{const t=await fetch(s,{cache:"no-cache"});if(!t.ok)throw new Error(`HTTP ${t.status}`);const l=await t.text();this._readmeCache.set(e,l),this._currentDetailId===e&&(i.innerHTML=this._renderMarkdown(l))}catch(t){console.warn(`[Marketplace] Failed to load README for ${e}:`,t),this._currentDetailId===e&&(i.innerHTML=`
                    <div class="mp-readme-content">
                        <h4>About</h4>
                        <p>${a.description}</p>
                        <p style="color:var(--text-muted);font-size:0.85rem;">Could not load README from the repository.</p>
                    </div>
                `)}}_renderMarkdown(e){if(!e)return"";let a="";try{f?.parse?a=f.parse(String(e)):a=this._escapeHtml(String(e)).replace(/\n/g,"<br>")}catch{a=this._escapeHtml(String(e)).replace(/\n/g,"<br>")}return`<div class="mp-readme-content">${M(a)}</div>`}_escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}_renderPlugins(){const e=this.overlay.querySelector("#mp-plugins-grid");if(!e)return;let a=this.activeCategory!=="all"?d.filterByCategory(this.activeCategory):d.getCatalog();this.searchQuery&&(a=d.search(this.searchQuery),this.activeCategory!=="all"&&this.activeCategory!=="installed"&&(a=a.filter(s=>s.category===this.activeCategory))),this.activeCategory==="installed"&&(a=a.filter(s=>d.isInstalled(s.id)));const i=this._getBuiltInPlugins();if(a.length===0&&i.length===0){e.innerHTML=`
                <div class="mp-empty">
                    <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
                    <h3>No plugins found</h3>
                    <p>The community plugin catalog is empty or couldn't be loaded.</p>
                    <p>Check back later or <a href="#" class="mp-dev-link">create your own plugin</a>!</p>
                </div>
            `;return}if(e.innerHTML="",i.length>0&&(this.activeCategory==="all"||this.activeCategory==="installed")){const s=this.searchQuery?i.filter(t=>t.name.toLowerCase().includes(this.searchQuery.toLowerCase())||t.description.toLowerCase().includes(this.searchQuery.toLowerCase())):i;if(s.length>0){const t=document.createElement("div");t.className="mp-section",t.innerHTML='<h3 class="mp-section-title"><i class="fa fa-cube"></i> Built-in Plugins</h3>';const l=document.createElement("div");l.className="mp-cards",s.forEach(o=>{l.innerHTML+=this._renderBuiltInCard(o)}),t.appendChild(l),e.appendChild(t)}}if(a.length>0){const s=document.createElement("div");s.className="mp-section",s.innerHTML='<h3 class="mp-section-title"><i class="fa fa-globe"></i> Community Plugins</h3>';const t=document.createElement("div");t.className="mp-cards",a.forEach(l=>{t.innerHTML+=this._renderCommunityCard(l)}),s.appendChild(t),e.appendChild(s)}}_renderBuiltInCard(e){const a=m(e.id),i=a?"mp-toggle-on":"mp-toggle-off";return`
            <div class="mp-card mp-card-builtin" data-plugin-id="${e.id}" data-builtin="true">
                <div class="mp-card-header">
                    <div class="mp-card-icon"><i class="fa ${e.icon||"fa-puzzle-piece"}"></i></div>
                    <div class="mp-card-meta">
                        <h4 class="mp-card-title">${e.name}</h4>
                        <span class="mp-card-author">Built-in</span>
                    </div>
                    <button class="mp-toggle-btn ${i}" data-plugin-id="${e.id}" data-builtin="true" title="${a?"Enabled":"Disabled"}">
                        <i class="fa ${a?"fa-toggle-on":"fa-toggle-off"}"></i>
                    </button>
                </div>
                <p class="mp-card-desc">${e.description}</p>
                <div class="mp-card-footer">
                    <span class="mp-card-category"><i class="fa fa-tag"></i> ${e.category}</span>
                    <span class="mp-card-badge mp-badge-builtin">Included</span>
                </div>
            </div>
        `}_renderCommunityCard(e){const a=d.isInstalled(e.id),i=u.getLoadedIds().includes(e.id),s=d.hasUpdate(e.id),t=e.status==="planned"||!e.downloadUrl;let l="";if(t)l='<span class="mp-card-badge mp-badge-planned"><i class="fa fa-clock-o"></i> Coming Soon</span>';else if(a){const p=i?"mp-toggle-on":"mp-toggle-off",c=i?"fa-toggle-on":"fa-toggle-off";l=`
                <button class="mp-toggle-btn ${p}" data-plugin-id="${e.id}" data-builtin="false" title="${i?"Enabled":"Disabled"}">
                    <i class="fa ${c}"></i>
                </button>
            `}else l=`<button class="mp-install-btn" data-plugin-id="${e.id}">
                   <i class="fa fa-download"></i> Install
               </button>`;const o=s?'<span class="mp-card-badge mp-badge-update"><i class="fa fa-arrow-up"></i> Update</span>':"";return`
            <div class="mp-card ${a?"mp-card-installed":""}" data-plugin-id="${e.id}" data-builtin="false">
                <div class="mp-card-header">
                    <div class="mp-card-icon"><i class="fa ${e.icon||"fa-puzzle-piece"}"></i></div>
                    <div class="mp-card-meta">
                        <h4 class="mp-card-title">${e.name}</h4>
                        <span class="mp-card-author">by ${e.author}</span>
                    </div>
                    ${l}
                </div>
                <p class="mp-card-desc">${e.description}</p>
                <div class="mp-card-footer">
                    <span class="mp-card-category"><i class="fa fa-tag"></i> ${e.category}</span>
                    <span class="mp-card-version">v${e.version}</span>
                    ${o}
                    ${e.downloads?`<span class="mp-card-downloads"><i class="fa fa-download"></i> ${e.downloads}</span>`:""}
                </div>
            </div>
        `}_showLoading(){const e=this.overlay.querySelector("#mp-plugins-grid");e&&(e.innerHTML=`
                <div class="mp-loading">
                    <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>
                    <p>Loading plugin catalog...</p>
                </div>
            `)}_getBuiltInPlugins(){const e=new Set(d.getInstalledIds()),a=new Set(d.getCatalog().map(s=>s.id));return u.getRegisteredIds().filter(s=>{if(e.has(s)||a.has(s))return!1;const t=u.getDefinition(s);return!(t&&t.isCommunity)}).map(s=>{const t=u.getDefinition(s);return t?{id:t.id,name:t.name,description:t.description,category:t.category,icon:this._getIconForPlugin(t.id)}:null}).filter(Boolean)}_getIconForPlugin(e){return{gamification:"fa-trophy",brainTraining:"fa-gamepad",universe:"fa-globe",adventureLog:"fa-book",routine:"fa-clock-o",focus:"fa-bullseye",slides:"fa-television",canvas:"fa-columns",sync:"fa-mobile",scratch:"fa-pencil-square-o"}[e]||"fa-puzzle-piece"}}const D=new k;window.openPluginMarketplace=()=>D.open();export{D as marketplaceModal};
