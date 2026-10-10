import{w as d,y as o}from"./index-wrzawYmd.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class c extends d{constructor(){super("card-expander-modal-overlay"),this.originalContent=null,this.expandedPreviewSection=null,this.expandedEditor=null,this.expandButton=null,this.confirmButton=null,this.cancelButton=null,this.loadingIndicator=null,this.errorMessage=null,this.expansionType=null,this.currentCard=null,this.currentLessonId=null,this.generatedCards=[],this.isProcessing=!1,this.handleExpandClick=this.handleExpandClick.bind(this),this.handleConfirmClick=this.handleConfirmClick.bind(this),this.handleCancelClick=this.handleCancelClick.bind(this)}initialize(){if(!super.initialize())return!1;if(this.originalContent=document.getElementById("card-expander-original"),this.expandedPreviewSection=document.querySelector(".card-expander-preview-section"),this.expandedEditor=document.getElementById("expanded-content-editor"),this.expandButton=document.getElementById("card-expander-expand-btn"),this.confirmButton=document.getElementById("card-expander-confirm-btn"),this.cancelButton=document.getElementById("card-expander-cancel-btn"),this.loadingIndicator=document.getElementById("card-expander-loading"),this.errorMessage=document.getElementById("card-expander-error"),this.expansionType=document.getElementById("expansion-type"),!this.originalContent)return console.error("Card Expander Modal: Required elements not found"),!1;this.expandButton&&this.expandButton.addEventListener("click",this.handleExpandClick),this.confirmButton&&this.confirmButton.addEventListener("click",this.handleConfirmClick),this.cancelButton&&this.cancelButton.addEventListener("click",this.handleCancelClick);const e=this.overlay?.querySelector(".card-expander-close-btn");return e&&e.addEventListener("click",()=>this.hide()),this.isInitialized=!0,!0}show(e,t){this.isInitialized||this.initialize();const n=window.state;this.currentLessonId=n?.getCurrentLessonId?.()||null,this.currentCard={...t,id:e},this.generatedCards=[],this.showError(""),this.hideLoading(),this.expandedPreviewSection&&(this.expandedPreviewSection.style.display="none"),this.confirmButton&&(this.confirmButton.style.display="none"),this.expansionType&&(this.expansionType.value="detailed");const i=t.content||t.front||"",a=t.title||"Untitled Card";this.originalContent.innerHTML=`
            <div class="original-card-preview">
                <h4>${this.escapeHtml(a)}</h4>
                <div class="card-content-preview">${this.formatContent(i)}</div>
            </div>
        `,super.show()}async handleExpandClick(){if(!this.isProcessing){this.isProcessing=!0,this.showLoading(),this.showError("");try{const e=this.currentCard.content||this.currentCard.front||"",t=this.currentCard.title||"",n=this.expansionType?.value||"detailed",i=this.buildExpandPrompt(t,e,n),a=await o(i,{temperature:.5});this.generatedCards=this.parseExpandResponse(a),!this.generatedCards||this.generatedCards.length===0?this.showError("AI could not generate expansion cards. Please try again."):(this.renderExpandPreview(),this.confirmButton&&(this.confirmButton.style.display="inline-block"))}catch(e){console.error("Error expanding card:",e),this.showError(`Failed to expand card: ${e.message}`)}finally{this.isProcessing=!1,this.hideLoading()}}}buildExpandPrompt(e,t,n){const i={detailed:`Create cards that dive deeper into specific concepts mentioned.
Each card should explain one concept in much more detail.
Include background information, nuances, and deeper understanding.`,explain:`Create cards that explain concepts as if to a beginner.
Use simple language and analogies.
Break down complex ideas into digestible pieces.`,academic:`Create cards with academic depth.
Include technical details, formal definitions, and theoretical foundations.
Reference related academic concepts.`,practical:`Create cards focused on practical applications.
Include real-world examples, use cases, and how-to guides.
Focus on actionable knowledge.`};return`You are an expert educator creating study flashcards. Given the following card, generate 2-4 NEW cards that explore the content in greater depth.

Original Card:
Title: ${e}
Content: ${t}

Expansion Type: ${n}
${i[n]||i.detailed}

LEARNING SCIENCE REQUIREMENTS:
1. Each new card should focus on ONE specific concept from the original
2. Go deeper than the original - add details, examples, or explanations
3. Cards should be complementary, not repetitive
4. Use clear, concise titles that indicate the topic
5. Content should be educational and well-structured (use markdown)
6. EACH CARD MUST END with a "🧠 Self-Check" section containing:
   - One question the learner should be able to answer after studying the card
   - This forces active engagement, not passive reading
7. Do NOT provide complete explanations that leave nothing for the learner to think about

Return your response in this EXACT JSON format:
[
  {
    "title": "Card Title 1",
    "content": "Detailed content in markdown...

🧠 **Self-Check**: Can you explain why...?",
    "selfCheckQuestion": "The question from the self-check section"
  },
  {
    "title": "Card Title 2", 
    "content": "Detailed content in markdown...

🧠 **Self-Check**: What would happen if...?",
    "selfCheckQuestion": "The question from the self-check section"
  }
]

Return ONLY the JSON array, no other text.`}parseExpandResponse(e){try{let t=e.trim();t.startsWith("```")&&(t=t.replace(/```json?\n?/gi,"").replace(/```$/g,"").trim());const n=JSON.parse(t);return Array.isArray(n)?n.filter(i=>i.title&&i.content).map(i=>({title:i.title.trim(),content:i.content.trim()})):(console.error("Response is not an array"),[])}catch(t){return console.error("Error parsing expand response:",t),[]}}renderExpandPreview(){this.expandedPreviewSection&&(this.expandedPreviewSection.style.display="block");let e=this.expandedPreviewSection?.querySelector(".expanded-cards-preview");if(!e){e=document.createElement("div"),e.className="expanded-cards-preview";const t=this.expandedPreviewSection?.querySelector(".expanded-content-preview");t&&(t.innerHTML="",t.appendChild(e))}e.innerHTML=this.generatedCards.map((t,n)=>`
            <div class="expanded-card-item" data-index="${n}">
                <div class="expanded-card-header">
                    <span class="expanded-card-number">${n+1}</span>
                    <input type="text" class="expanded-card-title" value="${this.escapeHtml(t.title)}" data-index="${n}">
                    <button class="remove-expanded-card" data-index="${n}" title="Remove this card">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <textarea class="expanded-card-content" data-index="${n}" rows="4">${this.escapeHtml(t.content)}</textarea>
            </div>
        `).join(""),e.querySelectorAll(".expanded-card-title").forEach(t=>{t.addEventListener("input",n=>{const i=parseInt(n.target.dataset.index);this.generatedCards[i].title=n.target.value})}),e.querySelectorAll(".expanded-card-content").forEach(t=>{t.addEventListener("input",n=>{const i=parseInt(n.target.dataset.index);this.generatedCards[i].content=n.target.value})}),e.querySelectorAll(".remove-expanded-card").forEach(t=>{t.addEventListener("click",n=>{const i=parseInt(n.target.closest(".remove-expanded-card").dataset.index);this.generatedCards.splice(i,1),this.renderExpandPreview(),this.generatedCards.length===0&&this.confirmButton&&(this.confirmButton.style.display="none")})})}async handleConfirmClick(){if(!this.generatedCards||this.generatedCards.length===0){this.showError("No cards to add.");return}try{const e=window.state,t=e.findLesson(this.currentLessonId);if(!t)throw new Error("Lesson not found");let i=Math.max(0,...t.cards.map(r=>r.id||0))+1;const a=this.generatedCards.map(r=>({id:i++,title:r.title,content:r.content,front:r.content,back:"",type:"content",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),expandedFrom:this.currentCard.id,srsData:{interval:1,ease:2.5,repetitions:0,nextReview:new Date().toISOString()}}));t.cards.push(...a),typeof e.saveData=="function"&&await e.saveData(),typeof window.displayNoteContent=="function"&&window.displayNoteContent(t),typeof window.showToast=="function"&&window.showToast(`Added ${a.length} new cards!`,"success",2e3),this.hide()}catch(e){console.error("Error saving expanded cards:",e),this.showError(`Failed to save cards: ${e.message}`)}}handleCancelClick(){this.hide()}showLoading(){this.loadingIndicator&&(this.loadingIndicator.style.display="flex"),this.expandButton&&(this.expandButton.disabled=!0)}hideLoading(){this.loadingIndicator&&(this.loadingIndicator.style.display="none"),this.expandButton&&(this.expandButton.disabled=!1)}showError(e){this.errorMessage&&(this.errorMessage.textContent=e,this.errorMessage.style.display=e?"block":"none")}formatContent(e){return typeof marked<"u"&&marked.parse?marked.parse(e||""):this.escapeHtml(e||"").replace(/\n/g,"<br>")}escapeHtml(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}hide(){this.currentCard=null,this.currentLessonId=null,this.generatedCards=[],super.hide()}}const s=new c;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{s.initialize()}):setTimeout(()=>s.initialize(),0);typeof window<"u"&&(window.cardExpanderModal=s);export{c as CardExpanderModal,s as cardExpanderModal};
