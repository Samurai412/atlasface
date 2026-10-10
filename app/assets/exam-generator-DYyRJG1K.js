const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DCtijOJy.js","./vendor-codemirror-DUfYp2mG.js","./vendor-markdown-BkjUMIlX.js","./vendor-markdown-BCx1q_2Y.css","./vendor-graph-DwCx8zU5.js","./index-DMbRSi8e.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./vendor-codemirror-DUfYp2mG.js";import{m as S}from"./vendor-markdown-BkjUMIlX.js";import{I as C,J as k}from"./index-DCtijOJy.js";import"./vendor-graph-DwCx8zU5.js";class u{constructor(){this.overlay=null,this.panel=null,this.currentExam=null,this.isVisible=!1,this.examState={timeRemaining:0,startTime:null,answers:{},currentQuestionIndex:0,timerInterval:null,isSubmitted:!1},this.courseContent=null,this.init()}init(){this.createExamInterface(),this.attachEventListeners()}parseMarkdown(e){if(!e)return"";const t=String(e).replace(/\\\[([\s\S]*?)\\\]/g,(a,o)=>`$$${o}$$`).replace(/\\\(([\s\S]*?)\\\)/g,(a,o)=>`$${o}$`);let s="";try{S?.parse?s=S.parse(t):s=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}catch{s=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const n=C(s);return k(n)}formatMarkdownLists(e){return e}createExamInterface(){this.overlay=document.createElement("div"),this.overlay.className="exam-overlay",this.overlay.setAttribute("data-feature","exam"),this.overlay.innerHTML=`
            <div class="exam-container">
                <!-- University Header -->
                <div class="university-header">
                    <div class="university-logo">
                        <div class="logo-symbol">
                            <svg class="university-crest-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <div class="university-text">
                            <h1>UNIVERSITY OF ATLAS</h1>
                            <div class="university-subtitle">EXCELLENCE THROUGH KNOWLEDGE</div>
                        </div>
                    </div>
                    <div class="exam-metadata">
                        <div class="exam-id">EXAM ID: <span id="exam-id">UA-${Date.now()}</span></div>
                        <div class="exam-date">DATE: <span id="exam-date">${new Date().toLocaleDateString()}</span></div>
                        <button class="exam-header-close exam-close-btn" title="Close Exam" aria-label="Close Exam">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Exam Title Section -->
                <div class="exam-title-section">
                    <div class="exam-course-info">
                        <h2 class="exam-title">COMPREHENSIVE EXAMINATION</h2>
                        <div class="exam-subtitle" id="exam-course-name">Course Assessment</div>
                        <div class="exam-instructions">
                            Read all questions carefully. Answer all questions. Time limit applies.
                        </div>
                    </div>
                    
                    <!-- Timer Section -->
                    <div class="exam-timer-section">
                        <div class="timer-display" id="timer-display">--:--</div>
                        <div class="timer-label">TIME REMAINING</div>
                    </div>
                </div>

                <!-- Exam Status Bar -->
                <div class="exam-status-bar">
                    <div class="status-left">
                        <span class="question-counter">
                            Question <span id="current-question-num">1</span> of <span id="total-questions">--</span>
                        </span>
                    </div>
                    <div class="status-center">
                        <div class="progress-bar">
                            <div class="progress-fill" id="exam-progress-fill"></div>
                        </div>
                    </div>
                    <div class="status-right">
                        <span class="points-display">
                            <span id="current-points">0</span> / <span id="total-points">--</span> points
                        </span>
                    </div>
                </div>

                <!-- Main Exam Content -->
                <div class="exam-content" id="exam-content">
                    <!-- Loading State -->
                    <div class="exam-loading" id="exam-loading">
                        <div class="university-crest">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                        </div>
                        <h3>University of Atlas</h3>
                        <h4>Preparing Your Examination</h4>
                        <div class="loading-steps" id="loading-steps">
                            <div class="loading-step" data-step="0">
                                <span class="step-num">01</span>
                                <span class="step-text">Analyzing course curriculum and notes</span>
                                <span class="step-indicator"></span>
                            </div>
                            <div class="loading-step" data-step="1">
                                <span class="step-num">02</span>
                                <span class="step-text">Synthesizing comprehensive question prompts</span>
                                <span class="step-indicator"></span>
                            </div>
                            <div class="loading-step" data-step="2">
                                <span class="step-num">03</span>
                                <span class="step-text">Calibrating academic rubric and criteria</span>
                                <span class="step-indicator"></span>
                            </div>
                            <div class="loading-step" data-step="3">
                                <span class="step-num">04</span>
                                <span class="step-text">Finalizing examination assessment</span>
                                <span class="step-indicator"></span>
                            </div>
                        </div>
                        <div class="loading-bar">
                            <div class="loading-progress" id="loading-progress"></div>
                        </div>
                    </div>

                    <!-- Question Display -->
                    <div class="exam-question-container" id="exam-question-container" style="display: none;">
                        <div class="question-header">
                            <div class="question-number" id="question-number">Question 1</div>
                            <div class="question-type" id="question-type">Critical Analysis</div>
                            <div class="question-points" id="question-points">15 points</div>
                        </div>
                        <div class="question-content">
                            <div class="question-text" id="question-text">
                                <!-- Question content will be inserted here -->
                            </div>
                            <div class="question-context" id="question-context" style="display: none;">
                                <!-- Optional context will be inserted here -->
                            </div>
                        </div>
                        <div class="answer-section">
                            <div class="answer-header">
                                <h4>Your Answer</h4>
                                <div class="answer-metadata">
                                    <div class="recommended-length" id="recommended-length">Recommended: 300-500 words</div>
                                    <div class="word-count" id="word-count">0 words</div>
                                </div>
                            </div>
                            <textarea 
                                id="current-answer-input" 
                                class="exam-answer-input"
                                placeholder="Provide a comprehensive, well-reasoned response that demonstrates deep understanding..."
                                rows="12"
                            ></textarea>
                            <div class="answer-footer">
                                <div class="answer-tips">
                                    <span class="tip-badge">Guidance</span>
                                    <span>Use specific examples, articulate underlying principles, and explain your reasoning clearly.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Results Display -->
                    <div class="exam-results" id="exam-results" style="display: none;">
                        <div class="results-header">
                            <h2>Examination Complete</h2>
                            <div class="completion-time">
                                Completed in <span id="completion-time">45:23</span>
                            </div>
                        </div>
                        <div class="score-summary">
                            <div class="overall-score">
                                <div class="score-circle" id="score-circle">
                                    <span class="score-percentage" id="score-percentage">85</span>
                                    <span class="score-suffix">%</span>
                                </div>
                                <div class="score-grade" id="score-grade">B+</div>
                            </div>
                            <div class="score-breakdown">
                                <div class="breakdown-item">
                                    <span class="breakdown-label">Critical Thinking</span>
                                    <span class="breakdown-score" id="critical-thinking-score">8.5/10</span>
                                </div>
                                <div class="breakdown-item">
                                    <span class="breakdown-label">Content Knowledge</span>
                                    <span class="breakdown-score" id="content-knowledge-score">9.0/10</span>
                                </div>
                                <div class="breakdown-item">
                                    <span class="breakdown-label">Analysis & Synthesis</span>
                                    <span class="breakdown-score" id="analysis-score">7.5/10</span>
                                </div>
                            </div>
                        </div>
                        <div class="detailed-feedback" id="detailed-feedback">
                            <!-- Individual question feedback will be inserted here -->
                        </div>
                        <div class="results-actions">
                            <button class="atlas-btn primary exam-close-btn">Close Exam</button>
                        </div>
                    </div>
                </div>

                <!-- Unified Single-Deck Exam Navigation & Controls -->
                <div class="exam-navigation" id="exam-navigation" style="display: none;">
                    <div class="nav-left">
                        <button class="atlas-btn ghost" id="pause-exam" title="Pause exam timer">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" rx="1"/>
                                <rect x="14" y="4" width="4" height="16" rx="1"/>
                            </svg>
                            <span>Pause</span>
                        </button>
                        <button class="atlas-btn danger-ghost" id="end-exam" title="End exam and submit answers">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            <span>End Exam</span>
                        </button>
                    </div>
                    <div class="nav-center">
                        <div class="question-selector" id="question-selector">
                            <!-- Question dots will be generated here -->
                        </div>
                    </div>
                    <div class="nav-right">
                        <button class="atlas-btn secondary" id="previous-question" disabled>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            <span>Previous</span>
                        </button>
                        <button class="atlas-btn primary" id="next-question">
                            <span>Next</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button>
                        <button class="atlas-btn submit is-hidden" id="submit-exam" style="display: none;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Submit Exam</span>
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="exam-footer">
                    <div class="university-footer">
                        University of Atlas • Academic Excellence • Examination System v2.5
                    </div>
                </div>
            </div>
        `,document.body.appendChild(this.overlay),this.panel=this.overlay.querySelector(".exam-container")}attachEventListeners(){const e=this.overlay.querySelector("#previous-question"),t=this.overlay.querySelector("#next-question"),s=this.overlay.querySelector("#submit-exam"),n=this.overlay.querySelector("#pause-exam"),a=this.overlay.querySelector("#end-exam");e&&e.addEventListener("click",()=>this.previousQuestion()),t&&t.addEventListener("click",()=>this.nextQuestion()),s&&s.addEventListener("click",()=>this.submitExam()),n&&n.addEventListener("click",()=>this.pauseExam()),a&&a.addEventListener("click",()=>this.endExam()),this.overlay.addEventListener("click",i=>{i.target.tagName,i.target.className,i.target.classList.contains("exam-close-btn")?(i.preventDefault(),i.stopPropagation(),this.handleExamExit()):i.target.classList.contains("exam-resume-btn")&&this.resumeExam()});const o=this.overlay?.querySelector("#current-answer-input");o&&o.addEventListener("input",()=>{this.updateWordCount(),this.autoSaveAnswer()}),window.addEventListener("beforeunload",i=>{this.isVisible&&!this.examState.isSubmitted&&(i.preventDefault(),i.returnValue="You have an exam in progress. Are you sure you want to leave?")}),document.addEventListener("keydown",i=>{if(this.isVisible){if(i.key==="Escape"){i.preventDefault(),this.handleExamExit();return}(i.ctrlKey||i.metaKey)&&(i.key==="ArrowLeft"?(i.preventDefault(),this.previousQuestion()):i.key==="ArrowRight"?(i.preventDefault(),this.nextQuestion()):i.key==="Enter"&&(i.preventDefault(),this.nextQuestion()))}})}async generateExam(e){try{this.overlay||(this.createExamInterface(),this.attachEventListeners()),this.show(),this.showLoading();const t=window.state.findCourse(e);if(!t)throw new Error("Course not found");t.name;const s=window.state.getLessons();if(s?.length,!s||s.length===0)throw new Error("No lessons available in the app. Please create some lessons first.");s.map(i=>({name:i.name,courseId:i.courseId,type:typeof i.courseId}));const n=s.filter(i=>{const r=i.courseId===e||String(i.courseId)===String(e);return`${i.name}${i.courseId}`,i.courseId,`${e}`,`${r}`,r});if(n.map(i=>i.name),n.length===0){const i=[...new Set(s.map(r=>r.courseId))];throw new Error(`No lessons found for course ID "${e}". Available course IDs: ${i.join(", ")}. Total lessons in app: ${s.length}`)}if(n.length,this.courseContent={courseName:t.name,lessons:n,totalCards:n.reduce((i,r)=>i+(r.cards?.length||0),0)},this.courseContent.totalCards,this.courseContent.totalCards===0)throw new Error("No content found in this course. Add some lessons and cards first!");await this.updateLoadingStep(0),await this.sleep(800),await this.updateLoadingStep(1);const a=await this.generateComprehensiveQuestions();await this.sleep(800),await this.updateLoadingStep(2);const o=this.calibrateQuestionDifficulty(a);await this.sleep(800),await this.updateLoadingStep(3),this.currentExam={courseId:e,courseName:this.courseContent.courseName,questions:o,duration:this.calculateExamDuration(o),totalPoints:o.reduce((i,r)=>i+r.points,0),createdAt:Date.now()},await this.sleep(500),this.startExam()}catch(t){console.error("Failed to generate exam:",t),console.error("Error details:",{courseId:e,availableLessons:window.state?.getLessons?.()||"No getLessons method",errorMessage:t.message,errorStack:t.stack}),this.showError(t.message)}}async generateComprehensiveQuestions(){const e=[];this.courseContent.lessons.length;for(const t of this.courseContent.lessons)if(t.cards&&t.cards.length>0){t.name,t.cards.length;const s={lessonTitle:t.name,cards:t.cards};try{const n=await this.generateIvyLevelQuestions(s);n.length,t.name,e.push(...n)}catch(n){console.warn(`Failed to generate questions for lesson ${t.name}:`,n)}}if(e.length<8){const t=await this.generateSynthesisQuestions();e.push(...t)}return this.selectOptimalQuestions(e)}async generateIvyLevelQuestions(e){const t=`You are a distinguished professor at Harvard University creating a comprehensive examination. Generate advanced, Ivy League-level questions from the following lesson content.

LESSON: ${e.lessonTitle}

CONTENT:
${e.cards.map(i=>`${i.front||i.title||""}
${i.back||i.content||""}`).join(`

`)}

Create 2-3 HIGH-ORDER THINKING questions that demonstrate Ivy League academic rigor:

REQUIREMENTS:
1. CRITICAL ANALYSIS: Questions requiring deep analytical thinking
2. SYNTHESIS: Combine multiple concepts into coherent arguments  
3. EVALUATION: Judge, critique, or assess with supporting evidence
4. APPLICATION: Apply concepts to novel, complex scenarios
5. COMPARISON: Draw sophisticated comparisons and contrasts

QUESTION TYPES TO INCLUDE:
- Essay questions requiring 300-500 word responses
- Case study analysis with multi-part questions
- Comparative analysis across different aspects
- Problem-solving with real-world applications
- Creative application scenarios

FORMAT REQUIREMENTS:
- Questions should take 8-15 minutes each to answer properly
- Include specific instructions for depth expected
- Provide context or scenarios when appropriate
- Make questions intellectually challenging but fair

Return ONLY a valid JSON object:
{
  "questions": [
    {
      "type": "Critical Analysis Essay",
      "question": "detailed question text with specific instructions",
      "context": "additional context if needed (optional)",
      "expectedLength": "300-500 words",
      "timeEstimate": 12,
      "points": 25,
      "assessmentCriteria": ["criterion1", "criterion2", "criterion3"]
    }
  ]
}`;if(!this._aiLoaded){try{const i=await b(()=>import("./index-DCtijOJy.js").then(r=>r.ap),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);this._aiCall=i.callAI,this._extractJsonBlock=i.extractJsonBlock}catch(i){console.warn("[ExamGen] Failed loading ai-client, will attempt window fallback",i)}this._aiLoaded=!0}let s="";try{if(this._aiCall)s=await this._aiCall(t,{temperature:.65,topP:.9,maxOutputTokens:8192});else if(window.callAI&&window.getAIApiKey){const i=window.getAIApiKey();if(!i)throw new Error("API key missing");s=await window.callAI(t,i)}else throw new Error("No AI pathway available");s.substring(0,120)}catch(i){return console.warn("[ExamGen] AI call failed, returning mock:",i.message),this.generateMockIvyQuestions(e)}const n=this.cleanAIResponse(s),a=this._extractJsonBlock?this._extractJsonBlock(n):null,o=[n,a].filter(Boolean);for(let i=0;i<o.length;i++){const r=o[i];try{const l=JSON.parse(r);if(l.questions&&Array.isArray(l.questions)&&l.questions.length)return l.questions}catch(l){if(console.warn(`[ExamGen] Parse attempt ${i+1} failed:`,l.message),console.warn("[ExamGen] Failed candidate (first 200):",r.substring(0,200)),i===o.length-1){const c=this.attemptJsonRepair(r);if(c!==r)try{const d=JSON.parse(c);if(d.questions&&Array.isArray(d.questions)&&d.questions.length)return d.questions}catch(d){console.warn("[ExamGen] JSON repair also failed:",d.message)}}}}return console.warn("[ExamGen] All parse attempts failed, using mock questions"),this.generateMockIvyQuestions(e)}generateMockIvyQuestions(e){return[{type:"Critical Analysis Essay",question:`**Critically analyze** the core concepts presented in "${e.lessonTitle}". 

In your analysis, you should:
- **Evaluate** the strengths and limitations of the key ideas
- **Examine** the underlying assumptions
- **Discuss** the broader implications for the field
- **Support** your arguments with specific examples and evidence

*Consider multiple perspectives and demonstrate your understanding of the complexity of the subject matter.*`,expectedLength:"400-600 words",timeEstimate:15,points:30,assessmentCriteria:["Depth of critical analysis","Quality of supporting evidence","Logical argument structure","Demonstration of synthesis"]},{type:"Comparative Synthesis",question:`**Compare and contrast** the different approaches, methods, or perspectives discussed in this lesson.

Your response should:
1. **Identify** key similarities and differences
2. **Analyze** how these approaches complement or contradict each other
3. **Synthesize** them into a coherent framework
4. **Propose** your own integrated approach based on this analysis

*Demonstrate critical thinking and original synthesis of ideas.*`,expectedLength:"350-500 words",timeEstimate:12,points:25,assessmentCriteria:["Comprehensive comparison","Synthesis quality","Original thinking","Practical application"]}]}async generateSynthesisQuestions(){return[{type:"Cross-Lesson Synthesis",question:`## Comprehensive Course Analysis

**Drawing from multiple lessons** in this course, construct a comprehensive analysis that demonstrates the interconnections between different topics.

Your analysis should address:
- **Identify patterns** and recurring themes across lessons
- **Analyze contradictions** and how they might be resolved
- **Explore synergies** between different concepts
- **Synthesize** these elements into a coherent understanding

*How do these concepts work together to form a unified understanding of the subject matter?*`,expectedLength:"500-700 words",timeEstimate:18,points:35,assessmentCriteria:["Cross-topic integration","Pattern recognition","Comprehensive understanding","Coherent argumentation"]},{type:"Applied Problem Solving",question:`## Real-World Application Challenge

**Scenario:** You are consulting for a real-world organization facing challenges related to the concepts covered in this course.

**Your task:**
1. **Define the problem** using course concepts
2. **Design a comprehensive solution** that applies theoretical knowledge
3. **Justify your approach** with evidence from course material
4. **Address potential limitations** and alternative approaches

*Demonstrate practical application while maintaining theoretical rigor.*`,expectedLength:"400-600 words",timeEstimate:15,points:30,assessmentCriteria:["Practical application","Solution feasibility","Theoretical grounding","Innovation and creativity"]}]}selectOptimalQuestions(e){const t=e.sort((n,a)=>{const o={"Critical Analysis Essay":5,"Cross-Lesson Synthesis":4,"Comparative Synthesis":4,"Applied Problem Solving":3,"Case Study Analysis":3};return(o[a.type]||2)-(o[n.type]||2)}),s=t.slice(0,Math.min(10,Math.max(8,t.length)));return this.ensureQuestionVariety(s)}ensureQuestionVariety(e){const t={};e.forEach(a=>{t[a.type]||(t[a.type]=[]),t[a.type].push(a)});const s=[],n=3;return Object.values(t).forEach(a=>{s.push(...a.slice(0,n))}),s}calibrateQuestionDifficulty(e){return e.map((t,s)=>({...t,id:`q_${s+1}`,number:s+1,points:t.points||this.calculateQuestionPoints(t),timeEstimate:t.timeEstimate||this.calculateTimeEstimate(t)}))}calculateQuestionPoints(e){return{"Critical Analysis Essay":30,"Cross-Lesson Synthesis":35,"Comparative Synthesis":25,"Applied Problem Solving":30,"Case Study Analysis":25}[e.type]||20}calculateTimeEstimate(e){return{"Critical Analysis Essay":15,"Cross-Lesson Synthesis":18,"Comparative Synthesis":12,"Applied Problem Solving":15,"Case Study Analysis":12}[e.type]||10}calculateExamDuration(e){const t=e.reduce((s,n)=>s+n.timeEstimate,0);return Math.ceil(t*1.2)}startExam(){this.hideLoading(),this.examState={timeRemaining:this.currentExam.duration*60,startTime:Date.now(),answers:{},currentQuestionIndex:0,timerInterval:null,isSubmitted:!1};const e=this.overlay?.querySelector("#exam-course-name"),t=this.overlay?.querySelector("#total-points");e&&(e.textContent=this.currentExam.courseName),t&&(t.textContent=this.currentExam.totalPoints),this.showExamInterface(),this.startTimer(),this.loadQuestion(0)}showExamInterface(){const e=this.overlay?.querySelector("#exam-question-container"),t=this.overlay?.querySelector("#exam-navigation"),s=this.overlay?.querySelector("#exam-controls");e&&(e.style.display="flex"),t&&(t.style.display="flex"),s&&(s.style.display="none"),this.generateQuestionSelector()}generateQuestionSelector(){const e=this.overlay?.querySelector("#question-selector");e&&(e.innerHTML="",this.currentExam.questions.forEach((t,s)=>{const n=document.createElement("button");n.className="question-dot",n.textContent=s+1,n.addEventListener("click",()=>this.loadQuestion(s)),e.appendChild(n)}))}loadQuestion(e){if(e<0||e>=this.currentExam.questions.length)return;this.saveCurrentAnswer();const t=this.overlay?.querySelector("#exam-content");t&&(t.scrollTop=0),this.examState.currentQuestionIndex=e;const s=this.currentExam.questions[e],n=this.overlay?.querySelector("#question-number"),a=this.overlay?.querySelector("#question-type"),o=this.overlay?.querySelector("#question-points"),i=this.overlay?.querySelector("#question-text");if(n&&(n.textContent=`Question ${e+1}`),a&&(a.textContent=s.type),o&&(o.textContent=`${s.points} points`),i&&(i.innerHTML=this.parseMarkdown(s.question)),s.context){const c=this.overlay?.querySelector("#question-context");c&&(c.innerHTML=this.parseMarkdown(s.context),c.style.display="block")}else{const c=this.overlay?.querySelector("#question-context");c&&(c.style.display="none")}const r=this.overlay?.querySelector("#recommended-length");r&&(r.textContent=`Recommended: ${s.expectedLength||"200-400 words"}`);const l=this.overlay?.querySelector("#current-answer-input");l&&(l.value=this.examState.answers[s.id]||"",this.updateWordCount()),this.updateNavigation(),this.updateProgress(),this.updateQuestionSelector()}updateNavigation(){const e=this.overlay?.querySelector("#previous-question"),t=this.overlay?.querySelector("#next-question"),s=this.overlay?.querySelector("#submit-exam");e&&(e.disabled=this.examState.currentQuestionIndex===0);const n=this.examState.currentQuestionIndex===this.currentExam.questions.length-1;t&&(n?(t.classList.add("is-hidden"),t.style.display="none"):(t.classList.remove("is-hidden"),t.style.display="inline-flex")),s&&(n?(s.classList.remove("is-hidden"),s.style.display="inline-flex"):(s.classList.add("is-hidden"),s.style.display="none"))}updateProgress(){const e=this.examState.currentQuestionIndex+1,t=this.currentExam.questions.length,s=e/t*100,n=this.overlay?.querySelector("#current-question-num"),a=this.overlay?.querySelector("#total-questions"),o=this.overlay?.querySelector("#exam-progress-fill");n&&(n.textContent=e),a&&(a.textContent=t),o&&(o.style.width=`${s}%`)}updateQuestionSelector(){if(!this.overlay)return;this.overlay.querySelectorAll(".question-dot").forEach((t,s)=>{t.classList.remove("current","answered"),s===this.examState.currentQuestionIndex&&t.classList.add("current");const n=this.currentExam.questions[s].id;this.examState.answers[n]&&t.classList.add("answered")})}startTimer(){this.updateTimerDisplay(),this.examState.timerInterval=setInterval(()=>{this.examState.timeRemaining--,this.updateTimerDisplay(),this.examState.timeRemaining<=0&&this.timeExpired()},1e3)}updateTimerDisplay(){const e=Math.floor(this.examState.timeRemaining/60),t=this.examState.timeRemaining%60,s=`${e}:${t.toString().padStart(2,"0")}`,n=this.overlay?.querySelector("#timer-display");n&&(n.textContent=s,n.classList.remove("warning","critical"),this.examState.timeRemaining<=300?n.classList.add("critical"):this.examState.timeRemaining<=600&&n.classList.add("warning"))}updateWordCount(){const e=this.overlay?.querySelector("#current-answer-input"),t=this.overlay?.querySelector("#word-count");if(!e||!t)return;const s=e.value.trim().split(/\s+/).filter(n=>n.length>0);t.textContent=`${s.length} words`}saveCurrentAnswer(){if(!this.currentExam)return;const e=this.currentExam.questions[this.examState.currentQuestionIndex],t=this.overlay?.querySelector("#current-answer-input");e&&t&&(this.examState.answers[e.id]=t.value.trim())}autoSaveAnswer(){clearTimeout(this.autoSaveTimeout),this.autoSaveTimeout=setTimeout(()=>{this.saveCurrentAnswer(),this.updateQuestionSelector()},1e3)}previousQuestion(){this.examState.currentQuestionIndex>0&&this.loadQuestion(this.examState.currentQuestionIndex-1)}nextQuestion(){this.examState.currentQuestionIndex<this.currentExam.questions.length-1&&this.loadQuestion(this.examState.currentQuestionIndex+1)}async submitExam(){const e=this.getUnansweredQuestions();let t="Are you sure you want to submit your exam?";if(e.length>0&&(t+=`

You have ${e.length} unanswered question(s): ${e.join(", ")}`),!confirm(t))return;this.saveCurrentAnswer(),this.examState.timerInterval&&clearInterval(this.examState.timerInterval),this.examState.isSubmitted=!0;const s=Date.now()-this.examState.startTime;await this.gradeExam(s)}getUnansweredQuestions(){const e=[];return this.currentExam.questions.forEach((t,s)=>{(!this.examState.answers[t.id]||this.examState.answers[t.id].trim().length===0)&&e.push(s+1)}),e}async gradeExam(e){this.showGradingInterface();try{const t=await this.processExamGrading();this.displayResults(t,e)}catch(t){console.error("Grading failed:",t),this.showGradingError(t.message)}}showGradingInterface(){const e=this.overlay?.querySelector("#exam-question-container"),t=this.overlay?.querySelector("#exam-navigation"),s=this.overlay?.querySelector("#exam-controls"),n=this.overlay?.querySelector("#exam-results");e&&(e.style.display="none"),t&&(t.style.display="none"),s&&(s.style.display="none"),n&&(n.style.display="none");const a=this.overlay?.querySelector("#exam-content");if(!a)return;let o=a.querySelector(".exam-grading");o||(o=document.createElement("div"),o.className="exam-grading",o.innerHTML=`
                <div class="grading-animation">
                    <div class="grading-spinner"></div>
                    <h2>Evaluating Examination</h2>
                    <p>Assessing candidate responses against rigorous academic criteria...</p>
                    <div class="grading-progress">
                        <div class="grading-step active"><span class="step-num">01</span> Analyzing candidate responses</div>
                        <div class="grading-step"><span class="step-num">02</span> Evaluating critical reasoning & structure</div>
                        <div class="grading-step"><span class="step-num">03</span> Computing rubric performance scores</div>
                        <div class="grading-step"><span class="step-num">04</span> Synthesizing qualitative evaluation report</div>
                    </div>
                </div>
            `,a.appendChild(o)),o.style.display="block"}async processExamGrading(){this.currentExam?.questions?.length;const e={totalScore:0,maxScore:this.currentExam.totalPoints,questionResults:[],categoryScores:{criticalThinking:0,contentKnowledge:0,analysisSynthesis:0}};for(let t=0;t<this.currentExam.questions.length;t++){const s=this.currentExam.questions[t],n=this.examState.answers[s.id]||"";t+1,`${this.currentExam.questions.length}${s.question.substring(0,50)}`,await this.updateGradingStep(Math.floor(t/this.currentExam.questions.length*3));const a=await this.gradeQuestion(s,n);t+1,e.questionResults.push(a),e.totalScore+=a.score,this.updateCategoryScores(e.categoryScores,a)}return await this.updateGradingStep(3),e}async gradeQuestion(e,t){if(!t.trim())return{questionId:e.id,score:0,maxScore:e.points,feedback:"No answer provided.",categories:{criticalThinking:0,contentKnowledge:0,analysisSynthesis:0}};const s=window.getAIApiKey?.();if(s)try{return await this.gradeWithAI(e,t,s)}catch{console.warn("AI grading failed, using heuristic grading")}return this.gradeHeuristically(e,t)}attemptJsonRepair(e){if(!e)return e;let t=0,s=0;for(const o of e)o==="{"&&t++,o==="}"&&s++;let n=e;const a=t-s;return a>0&&(n+="}".repeat(a),`${a}`),n=n.replace(/"question":\s*"([^"]*)"([^"]*)"([^"]*?)"/g,(o,i,r,l)=>`"question": "${i+r.replace(/"/g,'\\"')+l}"`),n}cleanAIResponse(e){if(!e)return e;let t=e.replace(/```json\s*/gi,"").replace(/```/g,"");const s=t.indexOf("{");s>0&&(t=t.slice(s));const n=t.lastIndexOf("}");return n>0&&(t=t.slice(0,n+1)),t=t.replace(/[“”]/g,'"').replace(/[‘’]/g,"'"),t=t.replace(/`+/g,""),t=t.replace(/\\(?!["ntrfb\\/])/g,""),t.trim()}async gradeWithAI(e,t,s){const n=`You are a Harvard University professor grading a comprehensive examination. Evaluate this student's answer with Ivy League academic standards.

QUESTION (${e.points} points):
${e.question}

STUDENT'S ANSWER:
${t}

ASSESSMENT CRITERIA:
${e.assessmentCriteria?.join(", ")||"Critical thinking, content knowledge, analysis quality"}

Provide a detailed evaluation with:

1. SCORE: Rate from 0-${e.points} points
2. BREAKDOWN: Rate each category (0-10):
   - Critical Thinking: Depth of analysis, logical reasoning
   - Content Knowledge: Accuracy, understanding of concepts
   - Analysis & Synthesis: Integration of ideas, original thinking

3. FEEDBACK: Specific, constructive feedback (100-200 words)

Return ONLY valid JSON:
{
  "score": number,
  "categories": {
    "criticalThinking": number,
    "contentKnowledge": number, 
    "analysisSynthesis": number
  },
  "feedback": "detailed feedback string"
}`;try{const a=await window.callAI(n,s),o=this.cleanAIResponse(a),i=JSON.parse(o);if(typeof i.score!="number"||!i.feedback)throw new Error("Invalid grading result structure");return{questionId:e.id,score:Math.min(i.score,e.points),maxScore:e.points,feedback:i.feedback,categories:i.categories||{}}}catch(a){return console.error("AI grading failed:",a.message),this.gradeHeuristically(e,t)}}gradeHeuristically(e,t){const s=t.trim().split(/\s+/).filter(c=>c.length>0).length,n=this.extractExpectedWordCount(e.expectedLength);let a=0;const o={criticalThinking:0,contentKnowledge:0,analysisSynthesis:0},i=Math.min(1,s/n)*.3,r=this.analyzeContentQuality(t)*.7;a=Math.round((i+r)*e.points);const l=a/e.points*10;return o.criticalThinking=Math.min(10,l+this.analyzeAnalyticalLanguage(t)),o.contentKnowledge=Math.min(10,l+this.analyzeContentDepth(t)),o.analysisSynthesis=Math.min(10,l+this.analyzeSynthesis(t)),{questionId:e.id,score:Math.max(0,a),maxScore:e.points,feedback:this.generateHeuristicFeedback(t,a,e.points),categories:o}}extractExpectedWordCount(e){const t=e?.match(/(\d+)-(\d+)/);return t?(parseInt(t[1])+parseInt(t[2]))/2:300}analyzeContentQuality(e){const s=["analyze","evaluate","compare","contrast","therefore","however","furthermore","moreover","consequently"].filter(o=>e.toLowerCase().includes(o)).length,n=e.split(/[.!?]+/).filter(o=>o.trim().length>0),a=e.length/n.length;return Math.min(1,s*.1+(a>50?.3:.1)+.5)}analyzeAnalyticalLanguage(e){const s=["because","since","therefore","consequently","analysis","critical","evaluate"].filter(n=>e.toLowerCase().includes(n)).length;return Math.min(2,s*.3)}analyzeContentDepth(e){const t=e.split(/[.!?]+/).filter(a=>a.trim().length>0),n=["example","instance","specifically","particularly","evidence"].filter(a=>e.toLowerCase().includes(a)).length;return Math.min(2,(t.length>8?1:0)+n*.3)}analyzeSynthesis(e){const s=["connect","relationship","integrate","combine","overall","conclusion"].filter(n=>e.toLowerCase().includes(n)).length;return Math.min(2,s*.4)}generateHeuristicFeedback(e,t,s){const n=t/s*100;return n>=90?"Excellent response demonstrating comprehensive understanding and sophisticated analysis.":n>=80?"Strong response with good analytical thinking. Consider providing more specific examples or deeper analysis.":n>=70?"Satisfactory response showing basic understanding. Strengthen your analysis with more detailed explanations and evidence.":n>=60?"Response shows some understanding but lacks depth. Focus on developing your arguments more thoroughly.":"Response needs significant improvement. Review the question requirements and provide more comprehensive analysis."}updateCategoryScores(e,t){e.criticalThinking+=t.categories.criticalThinking,e.contentKnowledge+=t.categories.contentKnowledge,e.analysisSynthesis+=t.categories.analysisSynthesis}displayResults(e,t){const s=Math.round(e.totalScore/e.maxScore*100),n=this.calculateLetterGrade(s),a=e.questionResults.length,o=(e.categoryScores.criticalThinking/a).toFixed(1),i=(e.categoryScores.contentKnowledge/a).toFixed(1),r=(e.categoryScores.analysisSynthesis/a).toFixed(1),l=Math.floor(t/6e4),c=Math.floor(t%6e4/1e3),d=`${l}:${c.toString().padStart(2,"0")}`,w=this.overlay?.querySelector(".exam-grading");w&&(w.style.display="none");const h=this.overlay?.querySelector("#exam-results");if(h)h.style.display="block";else{console.error("Results container not found!"),this.overlay?.querySelector("#exam-content")?.children,this.ensureResultsContainer();return}const p=this.overlay?.querySelector("#score-percentage"),g=this.overlay?.querySelector("#score-grade"),y=this.overlay?.querySelector("#completion-time"),v=this.overlay?.querySelector("#critical-thinking-score"),x=this.overlay?.querySelector("#content-knowledge-score"),f=this.overlay?.querySelector("#analysis-score");p&&(p.textContent=s),g&&(g.textContent=n),y&&(y.textContent=d),v&&(v.textContent=`${o}/10`),x&&(x.textContent=`${i}/10`),f&&(f.textContent=`${r}/10`),setTimeout(()=>{this.animateScoreCircle(s)},500),this.generateDetailedFeedback(e),this.saveExamResults(e,t)}calculateLetterGrade(e){return e>=97?"A+":e>=93?"A":e>=90?"A-":e>=87?"B+":e>=83?"B":e>=80?"B-":e>=77?"C+":e>=73?"C":e>=70?"C-":e>=67?"D+":e>=63?"D":e>=60?"D-":"F"}animateScoreCircle(e){if(!this.overlay?.querySelector("#score-circle"))return;const s=2*Math.PI*90,n=document.createElement("style");n.textContent=`
            .score-circle::before {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                border-radius: 50%;
                border: 6px solid #e9ecef;
                box-sizing: border-box;
            }
            .score-circle::after {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                border-radius: 50%;
                border: 6px solid transparent;
                border-top-color: ${this.getScoreColor(e)};
                box-sizing: border-box;
                transform: rotate(-90deg);
                animation: scoreCircleAnimation 2s ease-out forwards;
            }
            @keyframes scoreCircleAnimation {
                from { stroke-dasharray: 0 ${s}; }
                to { stroke-dasharray: ${e/100*s} ${s}; }
            }
        `,document.head.appendChild(n)}getScoreColor(e){return e>=90?"#28a745":e>=80?"#17a2b8":e>=70?"#ffc107":e>=60?"#fd7e14":"#dc3545"}generateDetailedFeedback(e){const t=this.overlay?.querySelector("#detailed-feedback");if(!t)return;let s="<h3>Detailed Question Feedback</h3>";e.questionResults.forEach((n,a)=>{const o=this.currentExam.questions[a],i=Math.round(n.score/n.maxScore*100);s+=`
                <div class="question-feedback">
                    <div class="question-feedback-header">
                        <h4>Question ${a+1}: ${o.type}</h4>
                        <div class="question-score">${n.score}/${n.maxScore} (${i}%)</div>
                    </div>
                    <div class="question-feedback-content">
                        <div class="question-text">${this.parseMarkdown(o.question)}</div>
                        <div class="feedback-text">${this.parseMarkdown(n.feedback)}</div>
                        <div class="category-scores">
                            <span class="category-score">Critical Thinking: ${n.categories.criticalThinking}/10</span>
                            <span class="category-score">Content Knowledge: ${n.categories.contentKnowledge}/10</span>
                            <span class="category-score">Analysis & Synthesis: ${n.categories.analysisSynthesis}/10</span>
                        </div>
                    </div>
                </div>
            `}),t.innerHTML=s}saveExamResults(e,t){const s={courseId:this.currentExam.courseId,courseName:this.currentExam.courseName,examId:`exam_${Date.now()}`,results:e,completionTime:t,answers:this.examState.answers,timestamp:Date.now()};try{const n=`exam_results_${this.currentExam.courseId}`,a=JSON.parse(localStorage.getItem(n)||"[]");a.push(s),localStorage.setItem(n,JSON.stringify(a))}catch(n){console.error("Failed to save exam results:",n)}}showLoading(){const e=this.overlay?.querySelector("#exam-loading"),t=this.overlay?.querySelector("#exam-question-container"),s=this.overlay?.querySelector("#exam-results");e&&(e.style.display="block"),t&&(t.style.display="none"),s&&(s.style.display="none")}hideLoading(){const e=this.overlay?.querySelector("#exam-loading");e&&(e.style.display="none")}async updateLoadingStep(e){if(!this.overlay)return;this.overlay.querySelectorAll(".loading-step").forEach((s,n)=>{s.classList.toggle("active",n<=e)})}async updateGradingStep(e){if(!this.overlay)return;this.overlay.querySelectorAll(".grading-step").forEach((s,n)=>{s.classList.toggle("active",n<=e)})}showError(e){const t=this.overlay?.querySelector("#exam-content");t&&(t.innerHTML=`
            <div class="exam-error">
                <div class="error-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <h2>Exam Generation Failed</h2>
                <p>${e}</p>
                <button class="atlas-btn primary exam-close-btn">Close</button>
            </div>
        `)}showGradingError(e){const t=this.overlay?.querySelector("#exam-content");t&&(t.innerHTML=`
            <div class="exam-error">
                <div class="error-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <h2>Grading Failed</h2>
                <p>${e}</p>
                <p>Your answers have been saved. You can try viewing results again later.</p>
                <button class="atlas-btn primary exam-close-btn">Close</button>
            </div>
        `)}pauseExam(){if(this.examState.timerInterval){clearInterval(this.examState.timerInterval),this.examState.timerInterval=null;const e=document.createElement("div");e.className="exam-pause-overlay",e.innerHTML=`
                <div class="pause-content">
                    <h2>Exam Paused</h2>
                    <p>Your exam is paused. Click Resume to continue.</p>
                    <button class="atlas-btn primary exam-resume-btn">Resume Exam</button>
                </div>
            `,this.overlay&&this.overlay.appendChild(e)}}resumeExam(){const e=this.overlay?.querySelector(".exam-pause-overlay");e&&e.remove(),this.startTimer()}endExam(){confirm("Are you sure you want to end the exam? This will submit your current answers.")&&this.submitExam()}timeExpired(){alert("Time has expired! Your exam will be submitted automatically."),this.submitExam()}show(){if(!this.overlay){console.error("Cannot show exam: overlay not initialized");return}this.isVisible=!0,this.overlay.classList.add("active"),document.body.style.overflow="hidden"}hide(){if(!this.overlay){console.error("Cannot hide exam: overlay not initialized");return}this.isVisible=!1,this.overlay.classList.remove("active"),document.body.style.overflow="",this.examState.timerInterval&&clearInterval(this.examState.timerInterval),this.examState={timeRemaining:0,startTime:null,answers:{},currentQuestionIndex:0,timerInterval:null,isSubmitted:!1}}sleep(e){return new Promise(t=>setTimeout(t,e))}static async generateExamForCourse(e){window.examGenerator||(window.examGenerator=new u),await window.examGenerator.generateExam(e)}ensureResultsContainer(){const e=this.overlay?.querySelector("#exam-content");if(!e){console.error("Exam content container not found!");return}let t=e.querySelector("#exam-results");t||(t=document.createElement("div"),t.className="exam-results",t.id="exam-results",t.style.display="none",t.innerHTML=`
                <div class="results-header">
                    <h2>Examination Complete</h2>
                    <div class="completion-time">
                        Completed in <span id="completion-time">45:23</span>
                    </div>
                </div>
                <div class="score-summary">
                    <div class="overall-score">
                        <div class="score-circle" id="score-circle">
                            <span class="score-percentage" id="score-percentage">85</span>
                            <span class="score-suffix">%</span>
                        </div>
                        <div class="score-grade" id="score-grade">B+</div>
                    </div>
                    <div class="score-breakdown">
                        <div class="breakdown-item">
                            <span class="breakdown-label">Critical Thinking</span>
                            <span class="breakdown-score" id="critical-thinking-score">8.5/10</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">Content Knowledge</span>
                            <span class="breakdown-score" id="content-knowledge-score">9.0/10</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">Analysis & Synthesis</span>
                            <span class="breakdown-score" id="analysis-score">7.5/10</span>
                        </div>
                    </div>
                </div>
                <div class="detailed-feedback" id="detailed-feedback">
                    <!-- Individual question feedback will be inserted here -->
                </div>
            `,e.appendChild(t));const s=e.querySelector(".exam-grading");s&&(s.style.display="none"),t.style.display="block"}handleExamExit(){if(this.examState?.isSubmitted,this.currentExam,this.examState?.startTime,Object.keys(this.examState?.answers||{}).length,this.examState?.isSubmitted){this.hide();return}if(this.currentExam&&this.examState?.startTime&&!this.examState?.isSubmitted){const e=Object.keys(this.examState.answers||{}).some(s=>this.examState.answers[s]?.trim());let t="Are you sure you want to exit the exam?";if(e&&(t+=`

Your progress will be lost and cannot be recovered.`),!confirm(t))return}this.hide()}}let m=null;window.ExamGenerator=u;function q(){return window.examGenerator instanceof u?(m=window.examGenerator,m):(m=new u,window.examGenerator=m,m)}document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",q,{once:!0});window.generateExamForCourse=async function(E){return await u.generateExamForCourse(E)};export{u as ExamGenerator,q as ensureExamGenerator};
