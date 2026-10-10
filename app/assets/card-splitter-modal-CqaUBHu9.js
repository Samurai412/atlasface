import{w as o,y as d}from"./index-DCtijOJy.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class c extends o{constructor(){super("card-splitter-modal-overlay"),this.modalTitle=null,this.originalContent=null,this.splitPreview=null,this.splitButton=null,this.confirmButton=null,this.cancelButton=null,this.loadingIndicator=null,this.errorMessage=null,this.currentCard=null,this.currentLessonId=null,this.splitCards=[],this.isProcessing=!1,this.handleSplitClick=this.handleSplitClick.bind(this),this.handleConfirmClick=this.handleConfirmClick.bind(this),this.handleCancelClick=this.handleCancelClick.bind(this)}initialize(){return super.initialize()?(this.modalTitle=document.getElementById("card-splitter-title"),this.originalContent=document.getElementById("card-splitter-original"),this.splitPreview=document.getElementById("card-splitter-preview"),this.splitButton=document.getElementById("card-splitter-split-btn"),this.confirmButton=document.getElementById("card-splitter-confirm-btn"),this.cancelButton=document.getElementById("card-splitter-cancel-btn"),this.loadingIndicator=document.getElementById("card-splitter-loading"),this.errorMessage=document.getElementById("card-splitter-error"),!this.originalContent||!this.splitPreview?(console.error("Card Splitter Modal: Required elements not found"),!1):(this.splitButton&&this.splitButton.addEventListener("click",this.handleSplitClick),this.confirmButton&&this.confirmButton.addEventListener("click",this.handleConfirmClick),this.cancelButton&&this.cancelButton.addEventListener("click",this.handleCancelClick),this.isInitialized=!0,!0)):!1}show(e,t,i){this.isInitialized||this.initialize(),this.currentCard={...t,id:e},this.currentLessonId=i,this.splitCards=[],this.showError(""),this.hideLoading(),this.splitPreview.innerHTML='<p class="placeholder-text">Click "Split with AI" to analyze and split this card.</p>',this.confirmButton&&(this.confirmButton.style.display="none");const s=t.content||t.front||"",n=t.title||"Untitled Card";this.modalTitle&&(this.modalTitle.textContent=`Split Card: ${n}`),this.originalContent.innerHTML=`
            <div class="original-card-preview">
                <h4>${this.escapeHtml(n)}</h4>
                <div class="card-content-preview">${this.formatContent(s)}</div>
            </div>
        `,super.show()}async handleSplitClick(){if(!this.isProcessing){this.isProcessing=!0,this.showLoading(),this.showError("");try{const e=this.currentCard.content||this.currentCard.front||"",t=this.currentCard.title||"",i=this.buildSplitPrompt(t,e),s=await d(i,{temperature:.3});this.splitCards=this.parseSplitResponse(s),this.splitCards.length<=1?(this.showError("This card appears to contain a single concept. Consider editing it directly instead."),this.splitPreview.innerHTML='<p class="placeholder-text">No split possible for this card.</p>'):(this.renderSplitPreview(),this.confirmButton&&(this.confirmButton.style.display="inline-block"))}catch(e){console.error("Error splitting card:",e),this.showError(`Failed to split card: ${e.message}`)}finally{this.isProcessing=!1,this.hideLoading()}}}buildSplitPrompt(e,t){return`You are an expert at breaking down study material into focused, atomic concepts.

Analyze this study card and split it into multiple smaller cards, where each card focuses on ONE distinct concept, fact, or idea.

Original Card:
Title: ${e}
Content: ${t}

Instructions:
1. Identify distinct concepts, facts, or ideas in the content
2. Create a separate card for each concept
3. Each new card should be self-contained and understandable on its own
4. Preserve important context needed for understanding
5. Keep markdown formatting if present
6. Create at least 2 cards if the content can be meaningfully split
7. Create no more than 5 cards to avoid over-fragmentation
8. If cards form a SEQUENCE (must be learned in order), indicate this with "sequence": true and "order": 1, 2, 3...
9. If cards have a HIERARCHY (one is prerequisite for another), use "prerequisite": "title of prerequisite card"

Return your response as a JSON array of objects:
[
  {"title": "Concept 1 Title", "content": "Content for concept 1...", "sequence": false, "order": null, "prerequisite": null},
  {"title": "Concept 2 Title", "content": "Content for concept 2...", "sequence": true, "order": 1, "prerequisite": "Concept 1 Title"}
]

Return ONLY the JSON array, no additional text or explanation.`}parseSplitResponse(e){try{let t=e.trim();t.startsWith("```")&&(t=t.replace(/```json?\n?/gi,"").replace(/```$/g,"").trim());const i=t.match(/\[[\s\S]*\]/);i&&(t=i[0]);const s=JSON.parse(t);if(!Array.isArray(s))throw new Error("Response is not an array");return s.map((n,r)=>({title:n.title||`Split Card ${r+1}`,content:n.content||"",srs_level:0,srs_due:null,srs_reviews:0,srs_last_review:null}))}catch(t){throw console.error("Failed to parse split response:",t,e),new Error("Failed to parse AI response. Please try again.")}}renderSplitPreview(){const e=this.splitCards.map((t,i)=>`
            <div class="split-card-preview" data-index="${i}">
                <div class="split-card-header">
                    <span class="split-card-number">${i+1}</span>
                    <input type="text" class="split-card-title-input" value="${this.escapeHtml(t.title)}" data-field="title">
                </div>
                <textarea class="split-card-content-input" data-field="content" rows="4">${this.escapeHtml(t.content)}</textarea>
                <button class="split-card-remove-btn" title="Remove this card" data-index="${i}">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `).join("");this.splitPreview.innerHTML=`
            <p class="split-info">This card will be split into ${this.splitCards.length} cards. You can edit them before confirming.</p>
            <div class="split-cards-list">
                ${e}
            </div>
        `,this.splitPreview.querySelectorAll(".split-card-title-input, .split-card-content-input").forEach(t=>{t.addEventListener("input",i=>{const s=parseInt(i.target.closest(".split-card-preview").dataset.index),n=i.target.dataset.field;this.splitCards[s][n]=i.target.value})}),this.splitPreview.querySelectorAll(".split-card-remove-btn").forEach(t=>{t.addEventListener("click",i=>{const s=parseInt(i.target.closest(".split-card-remove-btn").dataset.index);this.splitCards.splice(s,1),this.renderSplitPreview(),this.splitCards.length<=1&&(this.showError("At least 2 cards are required for splitting."),this.confirmButton&&(this.confirmButton.style.display="none"))})})}async handleConfirmClick(){if(this.splitCards.length<2){this.showError("At least 2 cards are required for splitting.");return}try{const e=window.state,t=e.findLesson(this.currentLessonId);if(!t)throw new Error("Lesson not found");const i=Date.now(),s=this.splitCards.map((r,l)=>({id:i+l,title:r.title,content:r.content,front:r.content,back:"",srs_level:r.srs_level||0,srs_due:r.srs_due||null,srs_reviews:r.srs_reviews||0,srs_last_review:r.srs_last_review||null,createdAt:new Date().toISOString(),splitFrom:this.currentCard.id,x:this.currentCard.x||0,y:(this.currentCard.y||0)+l+1,w:this.currentCard.w||3,h:this.currentCard.h||2})),n=t.cards.findIndex(r=>r.id===this.currentCard.id);n!==-1&&t.cards.splice(n,1),t.cards.push(...s),typeof e.saveData=="function"&&await e.saveData(),typeof window.displayNoteContent=="function"&&window.displayNoteContent(t),typeof window.showToast=="function"&&window.showToast(`Card split into ${s.length} cards`,"success",2e3),this.hide()}catch(e){console.error("Error confirming split:",e),this.showError(`Failed to save split cards: ${e.message}`)}}handleCancelClick(){this.hide()}showLoading(){this.loadingIndicator&&(this.loadingIndicator.style.display="flex"),this.splitButton&&(this.splitButton.disabled=!0)}hideLoading(){this.loadingIndicator&&(this.loadingIndicator.style.display="none"),this.splitButton&&(this.splitButton.disabled=!1)}showError(e){this.errorMessage&&(this.errorMessage.textContent=e,this.errorMessage.style.display=e?"block":"none")}formatContent(e){return typeof marked<"u"&&marked.parse?marked.parse(e||""):this.escapeHtml(e||"").replace(/\n/g,"<br>")}escapeHtml(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}hide(){this.currentCard=null,this.currentLessonId=null,this.splitCards=[],super.hide()}}const a=new c;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{a.initialize()}):setTimeout(()=>a.initialize(),0);typeof window<"u"&&(window.cardSplitterModal=a);export{c as CardSplitterModal,a as cardSplitterModal};
