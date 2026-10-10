const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-wrzawYmd.js","./vendor-codemirror-DUfYp2mG.js","./vendor-markdown-BkjUMIlX.js","./vendor-markdown-BCx1q_2Y.css","./vendor-graph-DwCx8zU5.js","./index-DMbRSi8e.css"])))=>i.map(i=>d[i]);
import{_ as w}from"./vendor-codemirror-DUfYp2mG.js";const x=6;let E=0;function y(){return`fp-${++E}-${Date.now().toString(36)}`}class T{constructor(t){this._ctx=t,this._root=null,this._panelEl=null,this._modalOverlay=null,this._savedTrees=this._loadSaved()}renderPanel(t){this._panelEl=t,t.classList.add("fp-panel"),this._renderPanelContent()}_renderPanelContent(){const t=this._panelEl;if(!t)return;t.innerHTML="";const e=document.createElement("div");if(e.className="fp-panel-header",e.innerHTML=`
            <span class="fp-panel-title">First Principles</span>
            <button class="fp-btn fp-btn-sm fp-btn-primary" title="New decomposition">
                <i class="fa fa-plus"></i> New
            </button>
        `,e.querySelector("button").addEventListener("click",()=>this.openModal()),t.appendChild(e),this._savedTrees.length===0){const s=document.createElement("div");s.className="fp-empty",s.innerHTML=`
                <i class="fa fa-sitemap fp-empty-icon"></i>
                <p>No decompositions yet</p>
                <p class="fp-empty-sub">Break down complex concepts into fundamental truths</p>
            `,t.appendChild(s)}else{const s=document.createElement("div");s.className="fp-saved-list";for(const n of this._savedTrees){const i=document.createElement("div");i.className="fp-saved-item";const r=this._countFundamentals(n.root),o=this._countNodes(n.root);i.innerHTML=`
                    <div class="fp-saved-item-main">
                        <span class="fp-saved-item-title">${this._esc(n.root.text)}</span>
                        <span class="fp-saved-item-meta">${r} principle${r!==1?"s":""} · ${o} node${o!==1?"s":""}</span>
                    </div>
                    <div class="fp-saved-item-actions">
                        <button class="fp-btn-icon" title="Open"><i class="fa fa-external-link"></i></button>
                        <button class="fp-btn-icon fp-btn-danger" title="Delete"><i class="fa fa-trash-o"></i></button>
                    </div>
                `,i.querySelector('button[title="Open"]').addEventListener("click",()=>{this._root=JSON.parse(JSON.stringify(n.root)),this.openModal()}),i.querySelector('button[title="Delete"]').addEventListener("click",()=>{this._savedTrees=this._savedTrees.filter(a=>a.id!==n.id),this._persistSaved(),this._renderPanelContent()}),s.appendChild(i)}t.appendChild(s)}}openModal(){if(this._modalOverlay){this._modalOverlay.classList.add("active"),this._renderModalContent();return}const t=document.createElement("div");t.className="modal-overlay fp-modal-overlay",t.innerHTML=`
            <div class="modal-box fp-modal">
                <div class="fp-modal-header">
                    <h2><i class="fa fa-sitemap"></i> First Principles Thinking</h2>
                    <div class="fp-modal-actions-top">
                        <button class="fp-btn fp-btn-sm" id="fp-save-btn" title="Save">
                            <i class="fa fa-floppy-o"></i> Save
                        </button>
                        <button class="fp-btn fp-btn-sm" id="fp-export-btn" title="Add all principles as study cards to your current topic">
                            <i class="fa fa-share-square-o"></i> Add to Topic
                        </button>
                        <button class="fp-btn fp-btn-sm" id="fp-ai-btn" title="AI decompose">
                            <i class="fa fa-magic"></i> AI Assist
                        </button>
                        <button class="fp-btn fp-btn-sm" id="fp-reset-btn" title="Start over">
                            <i class="fa fa-refresh"></i> Reset
                        </button>
                        <button class="fp-modal-close" id="fp-close-btn">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="fp-modal-body">
                    <div class="fp-start-screen" id="fp-start">
                        <div class="fp-start-inner">
                            <i class="fa fa-sitemap fp-start-icon"></i>
                            <h3>What concept do you want to break down?</h3>
                            <p class="fp-start-sub">Enter a complex idea, assumption, or problem. We'll decompose it into fundamental truths.</p>
                            <div class="fp-start-input">
                                <textarea id="fp-root-input" placeholder="e.g. &quot;Electric vehicles are better than gas cars&quot; or &quot;How does machine learning work?&quot;" rows="3"></textarea>
                                <button class="fp-btn fp-btn-primary fp-btn-lg" id="fp-begin-btn">
                                    <i class="fa fa-arrow-right"></i> Begin Decomposition
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="fp-tree-area" id="fp-tree" style="display:none;">
                        <div class="fp-tree-container" id="fp-tree-container"></div>
                        <div class="fp-summary-bar" id="fp-summary"></div>
                    </div>
                </div>
            </div>
        `,this._modalOverlay=t,document.body.appendChild(t),t.querySelector("#fp-close-btn").addEventListener("click",()=>this._closeModal()),t.querySelector("#fp-begin-btn").addEventListener("click",()=>this._beginDecomposition()),t.querySelector("#fp-save-btn").addEventListener("click",()=>this._save()),t.querySelector("#fp-export-btn").addEventListener("click",()=>this._exportAsCards()),t.querySelector("#fp-ai-btn").addEventListener("click",()=>this._aiDecompose()),t.querySelector("#fp-reset-btn").addEventListener("click",()=>this._reset()),t.addEventListener("click",e=>{e.target===t&&this._closeModal()}),t.querySelector("#fp-root-input").addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this._beginDecomposition())}),requestAnimationFrame(()=>t.classList.add("active")),this._renderModalContent()}_closeModal(){this._modalOverlay&&this._modalOverlay.classList.remove("active")}_renderModalContent(){if(!this._modalOverlay)return;const t=this._modalOverlay.querySelector("#fp-start"),e=this._modalOverlay.querySelector("#fp-tree");this._root?(t.style.display="none",e.style.display="flex",this._renderTree(),this._renderSummary()):(t.style.display="flex",e.style.display="none")}_beginDecomposition(){const e=this._modalOverlay?.querySelector("#fp-root-input")?.value.trim();e&&(this._root={id:y(),text:e,children:[],isFundamental:!1,depth:0},this._renderModalContent())}_reset(){this._root=null,this._renderModalContent();const t=this._modalOverlay?.querySelector("#fp-root-input");t&&(t.value="",t.focus())}_renderTree(){const t=this._modalOverlay?.querySelector("#fp-tree-container");!t||!this._root||(t.innerHTML="",t.appendChild(this._buildNodeEl(this._root)))}_buildNodeEl(t){const e=document.createElement("div");e.className="fp-node"+(t.isFundamental?" fp-fundamental":"")+(t.depth===0?" fp-root-node":""),e.dataset.id=t.id,e.dataset.depth=t.depth;const s=document.createElement("div");s.className="fp-node-card";const n=document.createElement("span");n.className="fp-depth-badge",n.textContent=t.depth===0?"?":`L${t.depth}`,n.title=t.depth===0?"Root concept":`Depth level ${t.depth}`;const i=document.createElement("span");i.className="fp-node-text",i.textContent=t.text,i.contentEditable=!0,i.spellcheck=!1,i.addEventListener("blur",()=>{const a=i.textContent.trim();a&&a!==t.text&&(t.text=a,this._renderSummary())}),i.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),i.blur())});const r=document.createElement("div");if(r.className="fp-node-actions",t.depth<x){const a=document.createElement("button");a.className="fp-btn-icon",a.title='Ask "Why?" — add sub-principle',a.innerHTML='<i class="fa fa-plus-circle"></i>',a.addEventListener("click",()=>this._addChild(t)),r.appendChild(a);const l=document.createElement("button");l.className="fp-btn-icon fp-btn-ai",l.title="AI: decompose this node deeper",l.innerHTML='<i class="fa fa-magic"></i>',l.addEventListener("click",()=>this._aiDecompose(t,l)),r.appendChild(l)}const o=document.createElement("button");if(o.className="fp-btn-icon"+(t.isFundamental?" fp-active":""),o.title=t.isFundamental?"Unmark as fundamental":"Mark as fundamental truth",o.innerHTML='<i class="fa fa-star"></i>',o.addEventListener("click",()=>{t.isFundamental=!t.isFundamental,this._renderTree(),this._renderSummary()}),r.appendChild(o),t.depth>0){const a=document.createElement("button");a.className="fp-btn-icon fp-btn-danger",a.title="Remove",a.innerHTML='<i class="fa fa-times"></i>',a.addEventListener("click",()=>this._removeNode(t.id)),r.appendChild(a)}if(s.appendChild(n),s.appendChild(i),s.appendChild(r),e.appendChild(s),t.children.length>0){const a=document.createElement("div");a.className="fp-children";for(const l of t.children)a.appendChild(this._buildNodeEl(l));e.appendChild(a)}return e}_addChild(t){const e={id:y(),text:"",children:[],isFundamental:!1,depth:t.depth+1};t.children.push(e),this._renderTree(),this._renderSummary(),requestAnimationFrame(()=>{const s=this._modalOverlay?.querySelector(`[data-id="${e.id}"] .fp-node-text`);s&&s.focus()})}_removeNode(t){const e=s=>{s.children=s.children.filter(n=>n.id===t?!1:(e(n),!0))};this._root&&e(this._root),this._renderTree(),this._renderSummary()}_renderSummary(){const t=this._modalOverlay?.querySelector("#fp-summary");if(!t||!this._root)return;const e=this._collectFundamentals(this._root),s=this._countNodes(this._root),n=this._maxDepth(this._root);t.innerHTML=`
            <div class="fp-summary-stat">
                <i class="fa fa-star"></i>
                <span>${e.length} fundamental${e.length!==1?"s":""}</span>
            </div>
            <div class="fp-summary-stat">
                <i class="fa fa-sitemap"></i>
                <span>${s} nodes · depth ${n}</span>
            </div>
            ${e.length>0?`
            <div class="fp-fundamentals-list">
                ${e.map(i=>`<span class="fp-fund-chip">${this._esc(i.text||"(empty)")}</span>`).join("")}
            </div>`:""}
        `}_getAncestryChain(t){const e=[],s=(n,i)=>{if(n.id===t.id)return e.push(...i,n),!0;for(const r of n.children)if(s(r,[...i,n]))return!0;return!1};return this._root&&s(this._root,[]),e}async _aiDecompose(t,e){const s=t||this._root;if(!s)return;const n=e||this._modalOverlay?.querySelector("#fp-ai-btn"),i=n?.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa fa-spinner fa-spin"></i>');try{const{callAI:r}=await w(async()=>{const{callAI:d}=await import("./index-wrzawYmd.js").then(u=>u.ap);return{callAI:d}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),o=s.depth===0,a=this._getAncestryChain(s);let l="";a.length>1&&(l=`

Reasoning chain so far (root → current):
`+a.map((d,u)=>`${"  ".repeat(u)}L${d.depth}: ${d.text}`).join(`
`));const f=s.children.length>0?`

Already identified at this level:
${s.children.map(d=>`- ${d.text}`).join(`
`)}

Do NOT repeat these. Provide ADDITIONAL sub-principles not yet listed.`:"",h=o?"Identify 3-5 **foundational sub-principles** that this concept rests upon.":`Break this intermediate principle into 2-4 **deeper sub-principles** — more fundamental truths that explain WHY "${s.text}" is true.`,m=`You are an expert at First Principles Thinking — recursively decomposing concepts down to their most basic, self-evident truths.
${l}

Target to decompose: "${s.text}" (depth level ${s.depth})

${h}

Each sub-principle must be:
- A declarative STATEMENT (not a question)
- More fundamental than the parent statement
- Directly supports or explains the parent

Also indicate whether each is truly fundamental ("isFundamental": true — cannot be decomposed further, self-evident) or intermediate ("isFundamental": false — could be broken down more).
${f}

Respond ONLY with a JSON array: [{"text": "sub-principle statement", "isFundamental": true/false}]
No markdown fences, no explanation — just the raw JSON array.`,g=await r(m,{temperature:.5,max_tokens:800});let _;try{const d=g.match(/\[[\s\S]*?\]/);_=JSON.parse(d?d[0]:g)}catch{throw new Error("AI response was not valid JSON")}if(Array.isArray(_)){let d=0;for(const v of _)v.text&&s.depth+1<=x&&(s.children.push({id:y(),text:v.text,children:[],isFundamental:!!v.isFundamental,depth:s.depth+1}),d++);this._renderTree(),this._renderSummary();const u=o?"foundational principles":"sub-principles";this._ctx.showToast(`Added ${d} ${u} at L${s.depth+1}`,"success")}}catch(r){console.error("[FirstPrinciples] AI decompose error:",r),this._ctx.showToast("AI decomposition failed: "+r.message,"error")}finally{n&&(n.disabled=!1,n.innerHTML=i||'<i class="fa fa-magic"></i> AI Assist')}}_save(){if(!this._root){this._ctx.showToast("Nothing to save","warning");return}const t=this._savedTrees.findIndex(s=>s.root.text===this._root.text||s.id===this._root.id),e={id:this._root.id,root:JSON.parse(JSON.stringify(this._root)),savedAt:Date.now()};t>=0?this._savedTrees[t]=e:this._savedTrees.unshift(e),this._persistSaved(),this._renderPanelContent(),this._ctx.showToast("Decomposition saved","success")}_loadSaved(){try{const t=localStorage.getItem("fp-saved-trees");return t?JSON.parse(t):[]}catch{return[]}}_persistSaved(){try{localStorage.setItem("fp-saved-trees",JSON.stringify(this._savedTrees))}catch(t){console.error("[FirstPrinciples] Failed to persist:",t)}}async _exportAsCards(){if(!this._root)return;const t=this._collectAllNodes(this._root).filter(o=>o.depth>0);if(this._collectFundamentals(this._root),t.length===0){this._ctx.showToast("Add sub-principles before exporting","warning");return}const e=this._ctx.state,s=e.getCurrentLessonId();if(!s){this._ctx.showToast("Select a topic first, then export","warning");return}const n=e.findLesson(s),i=n?.name||"current topic";let r=0;for(const o of t){const l=this._getPathToRoot(o.id).map((h,m)=>m===0?h.text:`→ ${h.text}`).join(`
`),f={id:Date.now()+r+Math.floor(Math.random()*1e3),type:"text",title:o.isFundamental?`★ ${o.text}`:o.text,content:`<p><strong>Root concept:</strong> ${this._esc(this._root.text)}</p><p><strong>Reasoning chain:</strong></p><p>${l.split(`
`).map(h=>this._esc(h)).join("<br>")}</p>`+(o.isFundamental?"<p><em>This is a fundamental truth that cannot be reduced further.</em></p>":""),gsW:4,gsH:3,links:[],tags:["first-principles",this._root.text.slice(0,30)],createdAt:new Date().toISOString(),srs_dueDate:0,srs_interval:0,srs_easeFactor:2.5,srs_reviews:0,srs_lapses:0,srs_ignored:!1};e.addCard(s,f),r++}typeof window.saveData=="function"&&window.saveData(),typeof window.renderLessons=="function"&&window.renderLessons(),e.getCurrentLessonId()===s&&n&&typeof window.displayNoteContent=="function"&&await window.displayNoteContent(n),this._ctx.showToast(`Added ${r} cards to "${i}"`,"success")}_collectFundamentals(t){const e=[];t.isFundamental&&e.push(t);for(const s of t.children)e.push(...this._collectFundamentals(s));return e}_collectAllNodes(t){const e=[t];for(const s of t.children)e.push(...this._collectAllNodes(s));return e}_countFundamentals(t){return this._collectFundamentals(t).length}_countNodes(t){return 1+t.children.reduce((e,s)=>e+this._countNodes(s),0)}_maxDepth(t){return t.children.length===0?t.depth:Math.max(...t.children.map(e=>this._maxDepth(e)))}_getPathToRoot(t){const e=[],s=(n,i)=>{if(i.push(n),n.id===t)return e.push(...i),!0;for(const r of n.children)if(s(r,[...i]))return!0;return!1};return this._root&&s(this._root,[]),e}_esc(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}destroy(){this._modalOverlay&&(this._modalOverlay.remove(),this._modalOverlay=null),this._panelEl=null,this._root=null}}let c=null,b=[];async function N(p){const t=document.createElement("link");t.rel="stylesheet",t.href=new URL(""+new URL("first-principles-uqeSA9RI.css",import.meta.url).href,import.meta.url).href,document.head.appendChild(t),b.push(()=>t.remove()),c=new T(p);const{getRailRegistry:e}=await w(async()=>{const{getRailRegistry:n}=await import("./index-wrzawYmd.js").then(i=>i.aw);return{getRailRegistry:n}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);e().register({id:"first-principles",icon:"fa fa-sitemap",label:"First Principles",type:"panel",shortcutKey:"F",builtin:!1,defaultEnabled:!0,section:"top",description:"Break down complex concepts into fundamental building blocks",panelRender:n=>c.renderPanel(n)}),p.addToolbarButton({icon:"fa-sitemap",label:"First Principles",title:"First Principles Thinking",onClick:()=>c.openModal()}),p.registerCommand({id:"open-first-principles",title:"First Principles: Decompose Concept",subtitle:"Break down a complex idea into fundamental truths",icon:"fa-sitemap",action:()=>c.openModal()}),p.registerKeybind("Alt+F",()=>c.openModal(),"Open First Principles"),window.firstPrinciples=c}function L(){for(const p of b)try{p()}catch{}b=[],c?.destroy&&c.destroy(),c=null,delete window.firstPrinciples}function C(){}const A={open:()=>c?.openModal(),getUI:()=>c};export{N as activate,A as api,L as deactivate,C as onAppReady};
