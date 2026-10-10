import{m as v}from"./vendor-markdown-BkjUMIlX.js";import{_ as m,$ as f,I as S,J as L}from"./index-QHYFmtLO.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-graph-DwCx8zU5.js";async function g(o){try{const e=o.cards.map(i=>i.content).filter(i=>i&&i.trim()).join(`

`);if(!e.trim())throw new Error("No content available to generate exercises from");const s=`You are an expert educational content creator specializing in learning science and cognitive psychology. Your task is to generate tiered exercises based on the following lesson content.

LESSON TITLE: ${o.lessonTitle}

SOURCE MATERIAL:
${e}

TASK: Generate exercises across THREE cognitive levels based on Bloom's Taxonomy, PLUS metacognitive and error analysis exercises:

LEVEL 1: Foundation Check (Recall & Recognition)
- Fill-in-the-blank, definition recall, basic identification

LEVEL 2: Connection Builder (Comprehension & Elaboration)
- Self-explanation: "Explain in your own words why..."
- Compare and contrast concepts
- "How does X relate to Y?"

LEVEL 3: Scenario Application (Synthesis & Application)
- Real-world scenarios requiring application
- Problem-solving with the concepts

METACOGNITIVE EXERCISE (REQUIRED - include at least 1):
- Confidence rating: "Rate your understanding of [concept] from 1-5 and explain your rating"
- Identify gaps: "What aspect of this topic do you find most confusing?"

ERROR ANALYSIS EXERCISE (REQUIRED - include at least 1):
- Present a COMMON MISTAKE and ask: "What error was made here and why is it wrong?"
- The mistake should reflect a real misconception students have

CRITICAL REQUIREMENTS:
1. Base ALL exercises strictly on the provided source material
2. Return ONLY a valid JSON object with no additional text, markdown, or formatting
3. For Level 1 exercises, provide specific "suggestedAnswer" values
4. For Level 2, 3, and metacognitive exercises, set "suggestedAnswer" to null (these are open-ended)
5. Include at least 1 metacognitive exercise and 1 error analysis exercise
6. Make questions engaging and pedagogically sound

REQUIRED JSON FORMAT:
{
  "exercises": [
    {
      "level": 1,
      "type": "Fill-in-the-Blank",
      "question": "Question text with _______ for blanks",
      "suggestedAnswer": "specific answer"
    },
    {
      "level": 2,
      "type": "Self-Explanation",
      "question": "Explain in your own words why...",
      "suggestedAnswer": null
    },
    {
      "level": 3,
      "type": "Application Scenario",
      "question": "Scenario-based question for application",
      "suggestedAnswer": null
    },
    {
      "level": 2,
      "type": "Metacognitive",
      "question": "Rate your confidence on [concept] from 1-5 and explain why",
      "suggestedAnswer": null
    },
    {
      "level": 2,
      "type": "Error Analysis",
      "question": "A student said [wrong statement]. What misconception does this reveal?",
      "suggestedAnswer": "The misconception is..."
    }
  ]
}`;let t;try{t=await m(s,{maxOutputTokens:4096})}catch(i){console.warn("[Exercises] Gemini client failed, using mock exercises:",i.message),t=A(o)}let r;try{const i=f(t)||t;r=JSON.parse(i)}catch(i){throw console.error("Failed to parse Gemini response:",i),console.error("Raw response:",t),new Error("Invalid response format from Gemini API")}if(!r.exercises||!Array.isArray(r.exercises))throw new Error("Invalid exercise format returned from Gemini");return r.exercises}catch(e){throw console.error("Error generating lesson exercises:",e),e}}function A(o){const e={exercises:[{level:1,type:"Fill-in-the-Blank",question:"The main topic of this lesson is about _______.",suggestedAnswer:o.lessonTitle.toLowerCase()},{level:1,type:"Definition",question:"What is the key concept mentioned in the first part of the lesson?",suggestedAnswer:"See lesson notes for details"},{level:2,type:"Elaboration",question:"Explain the main ideas from this lesson in your own words and how they connect to each other.",suggestedAnswer:null},{level:2,type:"Compare and Contrast",question:"Compare the different concepts presented in this lesson and identify their relationships.",suggestedAnswer:null},{level:3,type:"Application Scenario",question:`How would you apply the concepts from "${o.lessonTitle}" to a real-world situation?`,suggestedAnswer:null}]};return JSON.stringify(e)}class a{constructor(){this.overlay=null,this.panel=null,this.currentExercises=[],this.isVisible=!1,this.lessonContent=null,this.init()}init(){this.createPanel(),this.attachEventListeners()}createPanel(){this.overlay=document.createElement("div"),this.overlay.className="exercise-panel-overlay",this.overlay.setAttribute("data-feature","exercisePanel"),this.overlay.innerHTML=`
            <div class="exercise-panel">
                <div class="exercise-panel-header">
                    <h2 class="exercise-panel-title">Practice Exercises</h2>
                    <p class="exercise-panel-subtitle">Test your understanding with these generated exercises</p>
                    <button class="exercise-panel-close" title="Close">&times;</button>
                </div>
                <div class="exercise-panel-content">
                    <div class="exercise-loading">
                        <div class="exercise-loading-spinner"></div>
                        <div class="exercise-loading-text">Generating exercises...</div>
                        <div class="exercise-loading-subtitle">Analyzing lesson content and creating practice questions</div>
                    </div>
                </div>
                <div class="exercise-panel-footer" style="display: none;">
                    <div class="exercise-panel-info">
                        <span id="exercise-count">0 exercises</span> • Generated using AI
                    </div>
                    <div class="exercise-panel-actions">
                        <button class="exercise-action-btn secondary" id="regenerate-exercises">Regenerate</button>
                        <button class="exercise-action-btn primary" id="close-exercises">Done</button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(this.overlay),this.panel=this.overlay.querySelector(".exercise-panel")}attachEventListeners(){const e=this.overlay.querySelector(".exercise-panel-close"),s=this.overlay.querySelector("#close-exercises"),t=this.overlay.querySelector("#regenerate-exercises");e.addEventListener("click",()=>this.hide()),s.addEventListener("click",()=>this.hide()),t.addEventListener("click",()=>this.regenerateExercises()),this.overlay.addEventListener("click",r=>{r.target===this.overlay&&this.hide()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&this.isVisible&&this.hide()})}async show(e){this.lessonContent=e,this.isVisible=!0,this.overlay.classList.add("active");const s=this.overlay.querySelector(".exercise-panel-title");s.textContent=`Practice Exercises: ${e.lessonTitle}`;const t=this.loadExerciseData(e.lessonTitle);if(t&&t.exercises&&t.exercises.length>0)e.lessonTitle,this.currentExercises=t.exercises,this.renderExercises(),setTimeout(()=>this.restoreSavedAnswers(t.answers),100);else{this.showLoading();try{this.currentExercises=await g(e),this.saveExerciseData(e.lessonTitle,this.currentExercises,{}),this.renderExercises()}catch(r){console.error("Failed to generate exercises:",r),this.showError(r.message)}}}hide(){this.isVisible=!1,this.overlay.classList.remove("active"),setTimeout(()=>{this.showLoading(),this.overlay.querySelector(".exercise-panel-footer").style.display="none"},300)}showLoading(){const e=this.overlay.querySelector(".exercise-panel-content");e.innerHTML=`
            <div class="exercise-loading">
                <div class="exercise-loading-spinner"></div>
                <div class="exercise-loading-text">Generating exercises...</div>
                <div class="exercise-loading-subtitle">Analyzing lesson content and creating practice questions</div>
            </div>
        `}showError(e){const s=this.overlay.querySelector(".exercise-panel-content");s.innerHTML=`
            <div class="exercise-error">
                <div class="exercise-error-icon">⚠️</div>
                <div class="exercise-error-title">Generation Failed</div>
                <div class="exercise-error-message">${e}</div>
                <button class="exercise-retry-btn">
                    Try Again
                </button>
            </div>
        `;const t=s.querySelector(".exercise-retry-btn");t&&t.addEventListener("click",()=>this.regenerateExercises())}renderExercises(){if(!this.currentExercises||this.currentExercises.length===0){this.showError("No exercises were generated. Please try again.");return}const e=this.groupExercisesByLevelWithIndexes(this.currentExercises),s=this.overlay.querySelector(".exercise-panel-content");s.innerHTML="",Object.keys(e).forEach(i=>{const n=this.createLevelSection(i,e[i]);s.appendChild(n)});const t=this.overlay.querySelector(".exercise-panel-footer");t.style.display="flex";const r=t.querySelector("#exercise-count");r.textContent=`${this.currentExercises.length} exercise${this.currentExercises.length!==1?"s":""}`}groupExercisesByLevel(e){const s={};return e.forEach(t=>{const r=t.level;s[r]||(s[r]=[]),s[r].push(t)}),s}groupExercisesByLevelWithIndexes(e){const s={};return e.forEach((t,r)=>{const i=t.level;s[i]||(s[i]=[]),s[i].push({...t,globalIndex:r})}),s}createLevelSection(e,s){const t=this.getLevelInfo(e),r=document.createElement("div");return r.className=`exercise-level-section level-${e}`,r.innerHTML=`
            <div class="exercise-level-header">
                <div class="exercise-level-title">
                    <span class="exercise-level-badge">Level ${e}</span>
                    ${t.title}
                </div>
                <p class="exercise-level-description">${t.description}</p>
            </div>
            <div class="exercise-list">
                ${s.map(i=>this.createExerciseItem(i,i.globalIndex)).join("")}
            </div>
        `,setTimeout(()=>{r.querySelectorAll(".exercise-question").forEach(i=>{const n=i.closest(".exercise-item"),c=parseInt(n.dataset.exerciseIndex);i.addEventListener("click",()=>{this.toggleExerciseAnswer(r,c)})}),r.querySelectorAll(".exercise-student-answer-input").forEach(i=>{i.addEventListener("input",()=>{clearTimeout(this.saveTimeout),this.saveTimeout=setTimeout(()=>{this.saveCurrentAnswers()},1e3)}),i.addEventListener("blur",()=>{this.saveCurrentAnswers()})}),r.querySelectorAll(".exercise-validate-btn").forEach(i=>{i.addEventListener("click",async n=>{n.stopPropagation();const c=parseInt(i.dataset.exerciseIndex);await this.validateAnswer(r,c)})})},0),r}createExerciseItem(e,s){const t=e.suggestedAnswer&&e.suggestedAnswer.trim(),r=e.level>=2;return`
            <div class="exercise-item" data-exercise-index="${s}">
                <div class="exercise-question">
                    <div class="exercise-type">${e.type}</div>
                    <p class="exercise-question-text">${e.question}</p>
                    <span class="exercise-toggle">Click to ${t?"reveal answer":"add your answer"} ↓</span>
                </div>
                <div class="exercise-answer">
                    ${t?`
                        <div class="exercise-answer-label">Suggested Answer:</div>
                        <div class="exercise-answer-content">${e.suggestedAnswer}</div>
                    `:`
                        <div class="exercise-answer-content exercise-no-answer">
                            This is an open-ended question. Think through your answer and compare it with your lesson notes.
                        </div>
                    `}
                    <div class="exercise-student-answer">
                        <label class="exercise-student-answer-label">Your Answer:</label>
                        <textarea 
                            class="exercise-student-answer-input" 
                            placeholder="Write your answer here..."
                            data-exercise-index="${s}"
                        ></textarea>
                        ${r?`
                            <div class="exercise-validation-container">
                                <button class="exercise-validate-btn" data-exercise-index="${s}">
                                    <span class="validate-icon">📝</span>
                                    Validate Answer
                                </button>
                                <div class="exercise-validation-result" style="display: none;"></div>
                            </div>
                        `:""}
                    </div>
                </div>
            </div>
        `}toggleExerciseAnswer(e,s){const t=e.querySelector(`[data-exercise-index="${s}"]`),r=t.querySelector(".exercise-answer"),i=t.querySelector(".exercise-toggle");r.classList.contains("active")?(r.classList.remove("active"),i.textContent=i.textContent.replace("Hide","Click to reveal")):(r.classList.add("active"),i.textContent=i.textContent.replace("Click to reveal","Hide"),setTimeout(()=>{const n=r.querySelector(".exercise-student-answer-input");n&&n.focus()},100))}getLevelInfo(e){return{1:{title:"Foundation Check",description:"Basic recall and recognition exercises to test fundamental understanding"},2:{title:"Connection Builder",description:"Comprehension and elaboration exercises to explore relationships and deeper meaning"},3:{title:"Scenario Application",description:"Synthesis and application exercises for real-world problem solving"}}[e]||{title:"Exercise",description:"Practice question"}}async regenerateExercises(){if(this.lessonContent){this.showLoading(),this.overlay.querySelector(".exercise-panel-footer").style.display="none";try{this.currentExercises=await g(this.lessonContent),this.saveExerciseData(this.lessonContent.lessonTitle,this.currentExercises,{}),this.renderExercises()}catch(e){console.error("Failed to regenerate exercises:",e),this.showError(e.message)}}}async validateAnswer(e,s){const t=e.querySelector(`[data-exercise-index="${s}"]`),r=t.querySelector(".exercise-student-answer-input"),i=t.querySelector(".exercise-validate-btn"),n=t.querySelector(".exercise-validation-result"),c=r.value.trim();if(!c){alert("Please write your answer first before validating."),r.focus();return}const h=this.currentExercises[s];if(!h){console.error("Exercise not found:",s);return}const w=i.innerHTML;i.innerHTML='<span class="validate-icon">⏳</span> Validating...',i.disabled=!0;try{const d=window.getAIApiKey();if(!d){alert("Please set your AI API key in Settings first.");return}const y=`You are a professional assignment corrector from Harvard University. You are grading a student's answer to an educational exercise.

EXERCISE QUESTION:
${h.question}

STUDENT'S ANSWER:
${c}

LESSON CONTEXT:
${this.lessonContent.lessonTitle}

Your task is to evaluate this answer professionally and constructively. Provide:

1. SCORE: Rate from 1-10 based on:
   - Accuracy and correctness
   - Depth of understanding
   - Completeness of response
   - Use of relevant examples/details

2. FEEDBACK: Provide specific, actionable feedback including:
   - What the student did well
   - Areas for improvement
   - Suggestions for deeper understanding
   - Any missing key concepts

3. SUGGESTIONS: Recommend 1-2 specific ways to strengthen the answer

Respond in JSON format only:
{
  "score": 8,
  "grade": "Excellent/Good/Satisfactory/Needs Improvement",
  "strengths": ["What they did well"],
  "improvements": ["What could be better"],
  "suggestions": ["Specific recommendations"],
  "encouragement": "Brief encouraging note"
}`,p=await window.callAI(y,d);let x;try{const u=p.match(/\{[\s\S]*\}/),E=u?u[0]:p;x=JSON.parse(E)}catch{throw new Error("Failed to parse validation response")}this.displayValidationResult(n,x)}catch(d){console.error("Error validating answer:",d),n.innerHTML=`
                <div class="validation-error">
                    <strong>⚠️ Validation Error</strong>
                    <p>Failed to validate your answer: ${d.message}</p>
                </div>
            `,n.style.display="block"}finally{i.innerHTML=w,i.disabled=!1}}renderMarkdown(e){if(!e)return"";const s=String(e).replace(/\\\[([\s\S]*?)\\\]/g,(i,n)=>`$$${n}$$`).replace(/\\\(([\s\S]*?)\\\)/g,(i,n)=>`$${n}$`);let t="";try{v?.parse?t=v.parse(s):t=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}catch{t=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const r=S(t);return L(r)}displayValidationResult(e,s){const t=this.getScoreColor(s.score);e.innerHTML=`
            <div class="validation-result">
                <div class="validation-header">
                    <div class="validation-score">
                        <span class="score-number" style="color: ${t}">${s.score}/10</span>
                        <span class="score-grade">${s.grade}</span>
                    </div>
                </div>
                
                ${s.strengths&&s.strengths.length>0?`
                    <div class="validation-section">
                        <h4>✅ Strengths</h4>
                        <ul>
                            ${s.strengths.map(r=>`<li>${this.renderMarkdown(r)}</li>`).join("")}
                        </ul>
                    </div>
                `:""}
                
                ${s.improvements&&s.improvements.length>0?`
                    <div class="validation-section">
                        <h4>🔄 Areas for Improvement</h4>
                        <ul>
                            ${s.improvements.map(r=>`<li>${this.renderMarkdown(r)}</li>`).join("")}
                        </ul>
                    </div>
                `:""}
                
                ${s.suggestions&&s.suggestions.length>0?`
                    <div class="validation-section">
                        <h4>💡 Suggestions</h4>
                        <ul>
                            ${s.suggestions.map(r=>`<li>${this.renderMarkdown(r)}</li>`).join("")}
                        </ul>
                    </div>
                `:""}
                
                ${s.encouragement?`
                    <div class="validation-encouragement">
                        ${this.renderMarkdown(s.encouragement)}
                    </div>
                `:""}
            </div>
        `,e.style.display="block"}getScoreColor(e){return e>=8?"#4CAF50":e>=6?"#FF9800":e>=4?"#F44336":"#9E9E9E"}saveExerciseData(e,s,t){const r=`exercise_data_${e}`,i={exercises:s,answers:t,timestamp:Date.now()};try{localStorage.setItem(r,JSON.stringify(i))}catch(n){console.error("Failed to save exercise data:",n)}}loadExerciseData(e){const s=`exercise_data_${e}`;try{const t=localStorage.getItem(s);if(t)return JSON.parse(t)}catch(t){console.error("Failed to load exercise data:",t)}return null}saveCurrentAnswers(){if(!this.lessonContent)return;const e={};this.overlay.querySelectorAll(".exercise-student-answer-input").forEach((r,i)=>{const n=r.value.trim();n&&(e[i]=n)});const t=this.loadExerciseData(this.lessonContent.lessonTitle)||{};t.answers=e,t.exercises=t.exercises||this.currentExercises,this.saveExerciseData(this.lessonContent.lessonTitle,t.exercises,e)}restoreSavedAnswers(e){if(!e)return;this.overlay.querySelectorAll(".exercise-student-answer-input").forEach((t,r)=>{e[r]&&(t.value=e[r])})}static async showForLesson(e){if(typeof window.state>"u"){console.error("State not available");return}const s=window.state.findLesson(e);if(!s){console.error("Lesson not found:",e);return}const t={lessonTitle:s.name||"Untitled Lesson",cards:s.cards||[]};if(!t.cards.length){alert("This lesson doesn't have any cards yet. Add some content first!");return}window.exercisePanel||(window.exercisePanel=new a),await window.exercisePanel.show(t)}}window.showExercisesForLesson=async function(o){return await a.showForLesson(o)};let l=null;window.ExercisePanel=a;document.addEventListener("DOMContentLoaded",()=>{l=new a,window.exercisePanel=l});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.exercisePanel||(l=new a,window.exercisePanel=l)}):(l=new a,window.exercisePanel=l);window.showExercisesForLesson=async function(o){try{return await a.showForLesson(o)}catch(e){console.error("Error in showExercisesForLesson:",e),alert("Error generating exercises: "+e.message)}};Object.defineProperty(window,"showExercisesForLesson",{value:window.showExercisesForLesson,writable:!0,enumerable:!0,configurable:!0});window.showExercisesForLesson.static=a.showForLesson;window.showExercisesForLesson;export{a as ExercisePanel};
