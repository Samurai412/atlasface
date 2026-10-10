import{a0 as q,a1 as D,a2 as R,g as M,h as N,i as P,m as A,j as B,N as E,M as T,d as W,a3 as C,a4 as H,x as V,P as K}from"./index-QHYFmtLO.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";const L=new Map,F=new Map;function S(t){return t==null||t===""?null:(T()||[]).find(s=>s&&(s.id==t||String(s.id)===String(t)))||null}function Q(t){return t==null||t===""?null:(E()||[]).find(s=>s&&(s.id==t||String(s.id)===String(t)))||null}function U(t,r=null){const s=T()||[];if(r){const e=S(r);if(e)return e}const n=String(t||"doc").toLowerCase().replace(/\\/g,"/"),o=localStorage.getItem(`reader_linked_topic_${n}`);if(o){const e=S(o);if(e)return e}for(const e of s){if(!e)continue;const d=u=>Array.isArray(u)&&u.some(m=>{if(!m)return!1;const h=String(m.path||m.id||m.url||"").toLowerCase().replace(/\\/g,"/");return h&&(h===n||n.endsWith(h)||h.endsWith(n)||n.includes(h))});if(d(e.epubResources)||d(e.pdfResources)||d(e.videoResources)||d(e.webResources)||d(e.resources))return e;const c=String(e.epubPath||"").toLowerCase().replace(/\\/g,"/"),f=String(e.pdfPath||"").toLowerCase().replace(/\\/g,"/"),g=String(e.videoPath||e.videoUrl||"").toLowerCase().replace(/\\/g,"/"),p=String(e.webPath||e.webUrl||"").toLowerCase().replace(/\\/g,"/"),l=String(e.linkedDocumentPath||"").toLowerCase().replace(/\\/g,"/");if(c&&c===n||f&&f===n||g&&g===n||p&&p===n||l&&l===n)return e}const i=K();if(i){const e=S(i);if(e)return e}return null}function j(t,r,s,a="epub"){const n=S(t);if(!n)return null;const o=r||s||"document",i=String(o).toLowerCase().replace(/\\/g,"/"),e=s||String(o).split(/[\\/]/).pop()||"Document",d={id:o,name:e,path:o,url:o};return a==="epub"?(Array.isArray(n.epubResources)||(n.epubResources=[]),n.epubResources.some(c=>c.path===o||c.id===o||c.url===o)||n.epubResources.push(d),n.epubPath=o):a==="video"||a==="youtube"?(Array.isArray(n.videoResources)||(n.videoResources=[]),n.videoResources.some(c=>c.path===o||c.id===o||c.url===o)||n.videoResources.push(d),n.videoPath=o):a==="web"||a==="browser"?(Array.isArray(n.webResources)||(n.webResources=[]),n.webResources.some(c=>c.path===o||c.id===o||c.url===o)||n.webResources.push(d),n.webUrl=o):(Array.isArray(n.pdfResources)||(n.pdfResources=[]),n.pdfResources.some(c=>c.path===o||c.id===o||c.url===o)||n.pdfResources.push(d),n.pdfPath=o),n.linkedDocumentPath=o,R(n.id,n),localStorage.setItem(`reader_linked_topic_${i}`,String(n.id)),typeof window.saveData=="function"&&window.saveData(),n}function O(t,r,s,a="epub",n=null){const o=E()||[],i=n||q()||o[0]?.id||null,e=r||s||"document",d=String(e).toLowerCase().replace(/\\/g,"/"),c=t?.trim()||String(s||e).replace(/\.(epub|pdf)$/i,"").replace(/[-_]/g," ")||"Document Notes",f="lesson_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),g=s||String(e).split(/[\\/]/).pop()||c,p={id:e,name:g,path:e,url:e},l={id:f,courseId:i,name:c,cards:[],pdfResources:a==="pdf"?[p]:[],epubResources:a==="epub"?[p]:[],videoResources:a==="video"||a==="youtube"?[p]:[],linkedDocumentPath:e,markdownContent:`# ${c}

*Notes from ${g}*

`};return D(l),localStorage.setItem(`reader_linked_topic_${d}`,String(f)),typeof window.saveData=="function"&&window.saveData(),l}async function G(t){if(!t)return"";try{const r=M(t.id),s=await N(r);if(s?.success&&s.content)return s.content}catch(r){console.warn("[ReaderTopicNotes] Could not load markdown file:",r)}return typeof t.markdownContent=="string"&&t.markdownContent.trim().length>0?t.markdownContent:Array.isArray(t.cards)&&t.cards.length>0?P(t.cards):`# ${t.name||"Topic Notes"}

`}async function x(t,r){const s=S(t);if(s){s.markdownContent=r;try{const a=A(r,{},s.cards||[]),n=z(r,s.cards||[]),o=[...a.cards||[]],i=new Set(o.map(e=>(e.title||"").trim().toLowerCase()));for(const e of n)i.has((e.title||"").trim().toLowerCase())||(o.push(e),i.add((e.title||"").trim().toLowerCase()));s.cards=o}catch(a){console.warn("[ReaderTopicNotes] Error parsing cards from markdown:",a)}R(s.id,s);try{const a=M(s.id);await B(a,r)}catch(a){console.warn("[ReaderTopicNotes] Error saving markdown to disk:",a)}typeof window.saveData=="function"&&window.saveData()}}function z(t,r=[]){const s=(t||"").split(`
`),a=[],n=new Map;for(const o of r)o.title&&n.set(o.title.trim().toLowerCase(),o);for(let o=0;o<s.length;o++){const i=s[o].trim();if(i.startsWith("#")||i.startsWith("```")||i.startsWith("---")||i.startsWith(">"))continue;const d=i.replace(/^[-*+]\s+/,"").match(/^([^:\n]+?)\s*::\s*(.+)$/);if(d){const c=d[1].trim(),f=d[2].trim();if(c.length>1&&f.length>0){const g=c.toLowerCase(),p=n.get(g),l=p?p.id:Date.now()+Math.floor(Math.random()*1e3)+o;a.push({id:l,type:"text",title:c,content:f,gsW:p?.gsW??4,gsH:p?.gsH??3,srs_dueDate:p?.srs_dueDate??0,srs_interval:p?.srs_interval??0,srs_easeFactor:p?.srs_easeFactor??2.5,srs_reviews:p?.srs_reviews??0,srs_lapses:p?.srs_lapses??0,srs_ignored:p?.srs_ignored??!1,links:p?.links??[]})}}}return a}function I(t){if(!t)return 0;const r=(t.match(/^\s*##(?!#)\s*.+$/gm)||[]).length,s=(t.match(/^[^\n#>`*-][^\n]*?\s*::\s*.+$/gm)||[]).length;return r+s}function k(t){if(!t)return;const r=L.get(t);if(r){try{r.destroy()}catch(s){console.warn("[ReaderTopicNotes] Error destroying editor:",s)}L.delete(t)}}function Y(t,r){const s=new Map;for(const i of r)i&&s.set(String(i.id),i);const a=new Map,n=[];for(const i of t){if(!i)continue;const e=i.courseId!=null?String(i.courseId):null;e&&s.has(e)?(a.has(e)||a.set(e,[]),a.get(e).push(i)):n.push(i)}let o="";for(const[i,e]of a.entries()){const c=s.get(i)?.name||"Vault";o+=`<optgroup label="📁 ${b(c)}">`;for(const f of e)o+=`<option value="${f.id}">${b(f.name||"Untitled Topic")}</option>`;o+="</optgroup>"}if(n.length>0){a.size>0&&(o+='<optgroup label="General Topics">');for(const i of n)o+=`<option value="${i.id}">${b(i.name||"Untitled Topic")}</option>`;a.size>0&&(o+="</optgroup>")}return o}async function et(t,r={}){if(!t)return;k(t);const{filePath:s="",fileName:a="Document",docType:n="epub",entityId:o=null,onClose:i=null,getCurrentExcerpt:e=null}=r;let d=U(s,o);t.innerHTML=`
        <div class="reader-drawer-header rtn-header">
            <div class="rtn-header-title">
                <h3><i class="fa fa-sticky-note-o" aria-hidden="true"></i> Notes & Cards</h3>
            </div>
            <button class="rtn-close-btn epub-close-btn pdf-toc-close-btn" title="Close (Esc)">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
        <div class="rtn-body" id="rtn-body-container">
            <div class="rtn-loading"><i class="fa fa-circle-o-notch fa-spin"></i> Loading...</div>
        </div>
    `,t.querySelector(".rtn-close-btn")?.addEventListener("click",()=>{k(t),typeof i=="function"&&i()});const f=t.querySelector("#rtn-body-container");f&&(d?await $(f,d,{filePath:s,fileName:a,docType:n,getCurrentExcerpt:e,rootContainer:t}):_(f,{filePath:s,fileName:a,docType:n,getCurrentExcerpt:e,rootContainer:t}))}function _(t,r){const{filePath:s,fileName:a,docType:n,rootContainer:o=t}=r;k(o);const i=T()||[],e=E()||[],d=q()||e[0]?.id||null,c=(a||String(s).split(/[\\/]/).pop()||"Document Notes").replace(/\.(epub|pdf)$/i,"").replace(/[-_]/g," ").trim();t.innerHTML=`
        <div class="rtn-unlinked-clean">
            <!-- Section 1: Link Existing Topic -->
            <div class="rtn-clean-section">
                <span class="rtn-clean-label">LINK EXISTING TOPIC</span>
                ${i.length>0?`
                <div class="rtn-clean-row">
                    <select id="rtn-select-existing" class="rtn-clean-select">
                        <option value="" disabled selected>Choose a topic...</option>
                        ${Y(i,e)}
                    </select>
                    <button id="rtn-btn-link-existing" class="rtn-clean-btn rtn-clean-btn-primary">Link</button>
                </div>
                `:`
                <div class="rtn-clean-empty">No topics created yet.</div>
                `}
            </div>

            <div class="rtn-clean-divider"><span>or create new topic</span></div>

            <!-- Section 2: Create New Topic & Choose Vault / Project -->
            <div class="rtn-clean-section">
                <span class="rtn-clean-label">CREATE NEW TOPIC</span>
                <div class="rtn-clean-stack">
                    <input type="text" id="rtn-new-name" class="rtn-clean-input" value="${b(c)}" placeholder="Topic title..." />
                    
                    <div class="rtn-clean-row">
                        ${e.length>0?`
                        <select id="rtn-new-vault" class="rtn-clean-select" title="Target Vault / Project">
                            ${e.map(v=>{const w=v.id==d||String(v.id)===String(d)?"selected":"";return`<option value="${v.id}" ${w}>📁 ${b(v.name||"Untitled Vault")}</option>`}).join("")}
                        </select>
                        `:""}
                        <button id="rtn-btn-create-topic" class="rtn-clean-btn rtn-clean-btn-primary" style="${e.length===0?"width:100%":""}">
                            Create & Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;const f=t.querySelector("#rtn-select-existing"),g=t.querySelector("#rtn-btn-link-existing"),p=async()=>{if(!f?.value)if(f&&f.options.length>1)f.selectedIndex=1;else return;const w=f.value,y=j(w,s,a,n);y&&await $(t,y,r)};g?.addEventListener("click",p),f?.addEventListener("change",()=>{f.value&&p()});const l=t.querySelector("#rtn-btn-create-topic"),u=t.querySelector("#rtn-new-name"),m=t.querySelector("#rtn-new-vault"),h=async()=>{const v=u?.value?.trim()||c,w=m?.value||d,y=O(v,s,a,n,w);y&&await $(t,y,r)};l?.addEventListener("click",h),u?.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),h())})}async function $(t,r,s){const{fileName:a,getCurrentExcerpt:n,rootContainer:o=t}=s;k(o);const i=await G(r),e=I(i),d=Q(r.courseId);t.innerHTML=`
        <div class="rtn-editor-clean">
            <!-- Sleek Minimal Header Bar -->
            <div class="rtn-bar">
                <div class="rtn-bar-left">
                    <span class="rtn-pill-tag">TOPIC</span>
                    <span class="rtn-topic-text" title="${b(r.name)}">${b(r.name)}</span>
                    ${d?`<span class="rtn-vault-text" title="Vault: ${b(d.name)}">• ${b(d.name)}</span>`:""}
                    <button id="rtn-change-topic-btn" class="rtn-text-action" title="Link to different topic">change</button>
                </div>
                <div class="rtn-bar-right">
                    <span id="rtn-card-count-text" class="rtn-count-pill">${e} cards</span>
                    <span id="rtn-save-status" class="rtn-status-text">Saved</span>
                </div>
            </div>

            <!-- Crisp Quick-Action Flashcard & Formatting Toolbar -->
            <div class="rtn-tools">
                <div class="rtn-tools-group rtn-tools-cards">
                    <button id="rtn-tool-card" class="rtn-tool rtn-tool-primary" title="Insert flashcard: ## Question">
                        <i class="fa fa-plus"></i> Card (##)
                    </button>
                    <button id="rtn-tool-qa" class="rtn-tool" title="Insert inline card: Question :: Answer">
                        <i class="fa fa-plus"></i> Q :: A
                    </button>
                    <button id="rtn-tool-quote" class="rtn-tool" title="Insert highlighted quote with reference">
                        <i class="fa fa-quote-left"></i> Quote
                    </button>
                </div>
                <div class="rtn-tools-divider"></div>
                <div class="rtn-tools-group rtn-tools-formatting">
                    <button id="rtn-fmt-bold" class="rtn-tool-icon" title="Bold (**text**)"><i class="fa fa-bold"></i></button>
                    <button id="rtn-fmt-italic" class="rtn-tool-icon" title="Italic (*text*)"><i class="fa fa-italic"></i></button>
                    <button id="rtn-fmt-code" class="rtn-tool-icon" title="Inline code (\`code\`)"><i class="fa fa-code"></i></button>
                    <button id="rtn-fmt-h2" class="rtn-tool-icon" title="Heading 2 (##)">H2</button>
                    <button id="rtn-fmt-h3" class="rtn-tool-icon" title="Heading 3 (###)">H3</button>
                    <button id="rtn-fmt-list" class="rtn-tool-icon" title="Bullet list (- )"><i class="fa fa-list-ul"></i></button>
                    <button id="rtn-fmt-check" class="rtn-tool-icon" title="Task list (- [ ] )"><i class="fa fa-check-square-o"></i></button>
                    <button id="rtn-fmt-math" class="rtn-tool-icon" title="Math Formula ($...$)"><i class="fa fa-calculator"></i></button>
                    <button id="rtn-fmt-table" class="rtn-tool-icon" title="Table"><i class="fa fa-table"></i></button>
                    <button id="rtn-fmt-image" class="rtn-tool-icon" title="Insert Image (![alt](url))"><i class="fa fa-picture-o"></i></button>
                </div>
            </div>

            <!-- WYSIWYG Live Preview Editor Mount Container -->
            <div class="rtn-editor-mount" id="rtn-editor-mount"></div>
        </div>
    `;const c=t.querySelector("#rtn-editor-mount"),f=t.querySelector("#rtn-card-count-text"),g=t.querySelector("#rtn-save-status"),p=V(async u=>{g&&(g.textContent="Saving...",g.classList.add("saving")),await x(r.id,u),g&&(g.textContent="Saved",g.classList.remove("saving"))},600);F.set(r.id,p);let l=null;try{l=W({root:c,initialValue:i,placeholder:"Type notes with live markdown, flashcards (##), math formulas ($...$), quotes, and tables...",className:"rtn-atlas-editor",onChange:u=>{const m=I(u);f&&(f.textContent=`${m} card${m===1?"":"s"}`),p(u)},onBlur:()=>{if(l){const u=l.getMarkdown();x(r.id,u)}}}),L.set(o,l)}catch(u){console.error("[ReaderTopicNotes] Error creating AtlasMarkdownEditor:",u),c.innerHTML=`<textarea class="rtn-editor-textarea">${b(i)}</textarea>`;return}t.querySelector("#rtn-tool-card")?.addEventListener("click",()=>{l&&l.insertBlock(`

## Card Question
Card explanation and key points.

`,4,17)}),t.querySelector("#rtn-tool-qa")?.addEventListener("click",()=>{l&&l.insertBlock(`
Question :: Answer
`,1,9)}),t.querySelector("#rtn-tool-quote")?.addEventListener("click",()=>{if(!l)return;let u="",m="";if(typeof n=="function"){const w=n()||{};u=w.text||"",m=w.location||""}u||(u=window.getSelection()?.toString()?.trim()||"");const h=m?`${a} [${m}]`:a,v=u?`

> "${u}"
> — *${h}*

`:`

> "Excerpt..."
> — *${h}*

`;l.insertBlock(v)}),t.querySelector("#rtn-fmt-bold")?.addEventListener("click",()=>l.wrapSelection("**","**","bold text")),t.querySelector("#rtn-fmt-italic")?.addEventListener("click",()=>l.wrapSelection("*","*","italic text")),t.querySelector("#rtn-fmt-code")?.addEventListener("click",()=>l.wrapSelection("`","`","code")),t.querySelector("#rtn-fmt-h2")?.addEventListener("click",()=>l.formatSelectedLines(u=>C(u,"## "))),t.querySelector("#rtn-fmt-h3")?.addEventListener("click",()=>l.formatSelectedLines(u=>C(u,"### "))),t.querySelector("#rtn-fmt-list")?.addEventListener("click",()=>l.formatSelectedLines(u=>C(u,"- "))),t.querySelector("#rtn-fmt-check")?.addEventListener("click",()=>l.formatSelectedLines(u=>C(u,"- [ ] "))),t.querySelector("#rtn-fmt-math")?.addEventListener("click",()=>l.wrapSelection("$","$","E = mc^2")),t.querySelector("#rtn-fmt-table")?.addEventListener("click",()=>l.insertBlock(`
| Column 1 | Column 2 |
| --- | --- |
| Value 1 | Value 2 |
`)),t.querySelector("#rtn-fmt-image")?.addEventListener("click",()=>H({editor:l,lessonId:r.id})),t.querySelector("#rtn-change-topic-btn")?.addEventListener("click",()=>{k(o),_(t,s)})}function b(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}export{k as cleanupReaderTopicNotes,I as countCardsInMarkdown,O as createAndLinkTopic,Q as findCourseById,S as findLessonById,U as findLinkedTopicForDocument,j as linkDocumentToTopic,G as loadTopicMarkdownContent,et as renderReaderTopicNotes,x as saveTopicMarkdownContent};
