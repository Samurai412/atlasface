import{w as v}from"./index-DCtijOJy.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class y{constructor(){this.ctx=null}_init(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}playTone(t=440,e=.08,s="sine",i=.15){try{if(this._init(),!this.ctx)return;const a=this.ctx.createOscillator(),n=this.ctx.createGain();a.connect(n),n.connect(this.ctx.destination),a.frequency.setValueAtTime(t,this.ctx.currentTime),a.type=s,n.gain.setValueAtTime(i,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+e),a.start(),a.stop(this.ctx.currentTime+e)}catch{}}playSuccess(){this.playTone(587.33,.06,"sine",.12),setTimeout(()=>this.playTone(880,.1,"sine",.12),60)}playError(){this.playTone(220,.12,"sawtooth",.1)}playTap(t=520){this.playTone(t,.04,"triangle",.1)}destroy(){if(this.ctx){try{this.ctx.close()}catch{}this.ctx=null}}}const o=new y,g=[{name:"Novice",tier:"I",minScore:0,color:"#94a3b8",icon:"fa-shield"},{name:"Adept",tier:"II",minScore:40,color:"#60a5fa",icon:"fa-certificate"},{name:"Expert",tier:"III",minScore:60,color:"#34d399",icon:"fa-star"},{name:"Master",tier:"IV",minScore:75,color:"#a78bfa",icon:"fa-diamond"},{name:"Grandmaster",tier:"V",minScore:90,color:"#f59e0b",icon:"fa-trophy"}],k={nback:{mean:65,sd:18},stroop:{mean:78,sd:14},pattern:{mean:5,sd:2,isLevel:!0},math:{mean:60,sd:20},speed:{mean:72,sd:16},recall:{mean:55,sd:20},taskswitch:{mean:70,sd:18},flanker:{mean:75,sd:15},corsi:{mean:5,sd:1.8,isLevel:!0},rhythm:{mean:50,sd:22},visualsearch:{mean:75,sd:16},gonogo:{mean:60,sd:18}};function T(h,t,e){const s=k[h];if(!s)return 50;const a=((s.isLevel?t:e??t)-s.mean)/s.sd,n=1/(1+.2316419*Math.abs(a)),c=.3989422804*Math.exp(-a*a/2)*n*(.3193815+n*(-.3565638+n*(1.781478+n*(-1.821256+n*1.330274)))),l=a>0?1-c:c;return Math.max(1,Math.min(99,Math.round(l*100)))}function f(h){let t=g[0];for(const e of g)h>=e.minScore&&(t=e);return t}class w{constructor(t,e){this.container=t,this.onComplete=e,this.n=2,this.sequence=[],this.index=0,this.hits=0,this.misses=0,this.falseAlarms=0,this.correctRejections=0,this.trialCount=20,this.intervalMs=2400,this.letters="BCDFGHJKLMNPQRSTVWXYZ".split(""),this.timer=null,this.isiTimer=null,this.isWaiting=!1,this.responded=!1}start(){this.sequence=[];for(let t=0;t<this.trialCount;t++)if(t>=this.n&&Math.random()<.35)this.sequence.push(this.sequence[t-this.n]);else{let e;do e=this.letters[Math.floor(Math.random()*this.letters.length)];while(t>=this.n&&e===this.sequence[t-this.n]);this.sequence.push(e)}this.index=0,this.hits=0,this.misses=0,this.falseAlarms=0,this.correctRejections=0,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-clone"></i> ${this.n}-Back Task</span>
                    <span class="bt-game-progress">0 / ${this.trialCount}</span>
                </div>
                <div class="bt-game-instruction">
                    Press <kbd>SPACE</kbd> or click <strong>Match</strong> when the letter matches the one from <strong>${this.n} steps ago</strong>.
                </div>
                <div class="bt-nback-stimulus" id="bt-nback-letter"></div>
                <button class="bt-nback-match-btn" id="bt-nback-match">
                    <i class="fa fa-check"></i> Match (${this.n}-Back)
                </button>
                <div class="bt-game-stats">
                    <span class="bt-stat-correct">Hits: <span id="bt-nb-hits">0</span></span>
                    <span class="bt-stat-wrong">False Alarms: <span id="bt-nb-fa">0</span></span>
                </div>
                <div class="bt-kbd-hint">
                    <span><kbd>SPACE</kbd> Match</span>
                </div>
            </div>
        `,document.getElementById("bt-nback-match").addEventListener("click",()=>this.respond()),this._keyHandler=t=>{t.code==="Space"&&(t.preventDefault(),this.respond())},document.addEventListener("keydown",this._keyHandler),setTimeout(()=>this.nextTrial(),400)}nextTrial(){if(this.index>=this.trialCount){this.finish();return}const t=document.getElementById("bt-nback-letter"),e=this.container.querySelector(".bt-game-progress");if(!t)return;t.textContent=this.sequence[this.index],t.className="bt-nback-stimulus bt-nback-active",this.responded=!1,this.isWaiting=!0,e&&(e.textContent=`${this.index+1} / ${this.trialCount}`);const s=this.index>=this.n&&this.sequence[this.index]===this.sequence[this.index-this.n];this.currentIsMatch=s,o.playTap(440),this.timer=setTimeout(()=>{this.isWaiting=!1,s&&!this.responded?(this.misses++,t.classList.add("bt-nback-miss")):!s&&!this.responded&&this.correctRejections++,t.classList.remove("bt-nback-active"),this.isiTimer=setTimeout(()=>{t.className="bt-nback-stimulus",t.textContent="",this.index++,this.nextTrial()},350)},this.intervalMs-350)}respond(){if(this.responded||!this.isWaiting)return;this.responded=!0;const t=document.getElementById("bt-nback-letter");this.currentIsMatch?(this.hits++,o.playSuccess(),t&&t.classList.add("bt-nback-correct")):(this.falseAlarms++,o.playError(),t&&t.classList.add("bt-nback-wrong")),this.updateStats()}updateStats(){const t=document.getElementById("bt-nb-hits"),e=document.getElementById("bt-nb-fa");t&&(t.textContent=this.hits),e&&(e.textContent=this.falseAlarms)}finish(){this.isWaiting=!1,document.removeEventListener("keydown",this._keyHandler),clearTimeout(this.timer),clearTimeout(this.isiTimer);const t=this.hits+this.misses,e=Math.round((this.hits+this.correctRejections)/this.trialCount*100);this.onComplete({game:"N-Back",level:this.n,score:this.hits,total:t,accuracy:e,falseAlarms:this.falseAlarms,hits:this.hits,misses:this.misses})}destroy(){clearTimeout(this.timer),clearTimeout(this.isiTimer),this.isWaiting=!1,document.removeEventListener("keydown",this._keyHandler)}}class E{constructor(t,e){this.container=t,this.onComplete=e,this.colors=[{name:"RED",hex:"#f87171"},{name:"BLUE",hex:"#60a5fa"},{name:"GREEN",hex:"#34d399"},{name:"YELLOW",hex:"#facc15"},{name:"PURPLE",hex:"#c084fc"},{name:"ORANGE",hex:"#fb923c"}],this.round=0,this.totalRounds=20,this.score=0,this.errors=0,this.startTime=0,this.responseTimes=[],this.answered=!1}start(){this.round=0,this.score=0,this.errors=0,this.responseTimes=[],this.answered=!1,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-eye"></i> Stroop Task</span>
                    <span class="bt-game-progress">0 / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction">
                    Select the <strong>INK COLOR</strong> of the text. Ignore what the word reads.
                </div>
                <div class="bt-stroop-word" id="bt-stroop-word"></div>
                <div class="bt-stroop-choices" id="bt-stroop-choices"></div>
            </div>
        `,this.nextRound()}nextRound(){if(this.round>=this.totalRounds){this.finish();return}this.answered=!1;const t=Math.random()<.3,e=Math.floor(Math.random()*this.colors.length);let s;if(t)s=e;else do s=Math.floor(Math.random()*this.colors.length);while(s===e);const i=this.colors[e].name,a=this.colors[s],n=document.getElementById("bt-stroop-word"),r=document.getElementById("bt-stroop-choices"),c=this.container.querySelector(".bt-game-progress");if(!n||!r)return;n.textContent=i,n.style.color=a.hex,c&&(c.textContent=`${this.round+1} / ${this.totalRounds}`);const l=[...this.colors].sort(()=>Math.random()-.5);r.innerHTML=l.map(d=>`
            <button class="bt-stroop-choice" data-color="${d.name}">
                <span class="bt-stroop-dot" style="background:${d.hex}"></span>
                <span>${d.name}</span>
            </button>
        `).join(""),this.startTime=performance.now(),this.correctColor=a.name,r.querySelectorAll(".bt-stroop-choice").forEach(d=>{d.addEventListener("click",()=>this.respond(d.dataset.color,d))})}respond(t,e){if(this.answered)return;this.answered=!0;const s=performance.now()-this.startTime;this.responseTimes.push(s),t===this.correctColor?(this.score++,o.playSuccess(),e.classList.add("bt-stroop-correct")):(this.errors++,o.playError(),e.classList.add("bt-stroop-wrong")),this.round++,setTimeout(()=>this.nextRound(),400)}finish(){const t=this.responseTimes.length>0?Math.round(this.responseTimes.reduce((e,s)=>e+s,0)/this.responseTimes.length):0;this.onComplete({game:"Stroop Test",score:this.score,total:this.totalRounds,accuracy:Math.round(this.score/this.totalRounds*100),avgResponseTime:t,errors:this.errors})}destroy(){this.answered=!0}}class L{constructor(t,e){this.container=t,this.onComplete=e,this.gridSize=4,this.sequence=[],this.playerIndex=0,this.level=3,this.maxLevel=10,this.score=0,this.isLocked=!0,this.seqTimer=null}start(){this.level=3,this.score=0,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-th"></i> Pattern Memory</span>
                    <span class="bt-game-progress">Level ${this.level}</span>
                </div>
                <div class="bt-game-instruction" id="bt-pattern-msg">Observe the illuminated sequence...</div>
                <div class="bt-pattern-grid" id="bt-pattern-grid"></div>
            </div>
        `;const t=document.getElementById("bt-pattern-grid");for(let e=0;e<this.gridSize*this.gridSize;e++){const s=document.createElement("button");s.className="bt-pattern-cell",s.dataset.index=e,s.addEventListener("click",()=>this.cellClicked(e)),t.appendChild(s)}setTimeout(()=>this.showSequence(),500)}showSequence(){this.isLocked=!0,this.playerIndex=0;const t=document.getElementById("bt-pattern-msg");t&&(t.textContent="Observe the illuminated sequence..."),this.sequence=[];const e=this.gridSize*this.gridSize;for(;this.sequence.length<this.level;){const n=Math.floor(Math.random()*e);this.sequence.includes(n)||this.sequence.push(n)}const s=this.container.querySelectorAll(".bt-pattern-cell");let i=0;const a=()=>{if(i>0&&s[this.sequence[i-1]].classList.remove("bt-pattern-highlight"),i>=this.sequence.length){this.isLocked=!1,t&&(t.textContent="Now reproduce the pattern!");return}s[this.sequence[i]].classList.add("bt-pattern-highlight"),o.playTap(440+i*50),i++,this.seqTimer=setTimeout(a,550)};this.seqTimer=setTimeout(a,400)}cellClicked(t){if(this.isLocked)return;const e=this.container.querySelectorAll(".bt-pattern-cell");if(t===this.sequence[this.playerIndex]){if(o.playTap(520+this.playerIndex*40),e[t].classList.add("bt-pattern-correct"),setTimeout(()=>e[t].classList.remove("bt-pattern-correct"),250),this.playerIndex++,this.playerIndex>=this.sequence.length){this.isLocked=!0,this.score++,o.playSuccess(),this.level=Math.min(this.level+1,this.maxLevel);const s=this.container.querySelector(".bt-game-progress");s&&(s.textContent=`Level ${this.level}`),setTimeout(()=>{e.forEach(i=>i.classList.remove("bt-pattern-correct","bt-pattern-wrong")),this.showSequence()},700)}}else this.isLocked=!0,o.playError(),e[t].classList.add("bt-pattern-wrong"),setTimeout(()=>this.finish(),750)}finish(){this.isLocked=!0,clearTimeout(this.seqTimer),this.onComplete({game:"Pattern Memory",score:this.score,maxLevel:this.level,total:this.score})}destroy(){this.isLocked=!0,clearTimeout(this.seqTimer)}}class R{constructor(t,e){this.container=t,this.onComplete=e,this.round=0,this.totalRounds=15,this.score=0,this.difficulty=1,this.startTime=0,this.responseTimes=[],this.answered=!1}start(){this.round=0,this.score=0,this.difficulty=1,this.responseTimes=[],this.answered=!1,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-calculator"></i> Mental Arithmetic</span>
                    <span class="bt-game-progress">0 / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction">Calculate the answer accurately as fast as possible.</div>
                <div class="bt-math-problem" id="bt-math-problem"></div>
                <div class="bt-math-input-area">
                    <input type="number" id="bt-math-input" class="bt-math-input" placeholder="?" autocomplete="off" autofocus />
                    <button class="bt-math-submit" id="bt-math-submit"><i class="fa fa-arrow-right"></i></button>
                </div>
                <div class="bt-game-feedback" id="bt-math-feedback"></div>
                <div class="bt-kbd-hint">
                    <span><kbd>ENTER</kbd> Submit</span>
                </div>
            </div>
        `;const t=document.getElementById("bt-math-input"),e=document.getElementById("bt-math-submit");t.addEventListener("keydown",s=>{s.key==="Enter"&&this.submitAnswer()}),e.addEventListener("click",()=>this.submitAnswer()),this.nextProblem()}generateProblem(){const e=["+","-","×"][Math.floor(Math.random()*(this.difficulty>=3?3:2))];let s,i,a;const n=Math.min(10+this.difficulty*8,100);switch(e){case"+":s=Math.floor(Math.random()*n)+2,i=Math.floor(Math.random()*n)+2,a=s+i;break;case"-":s=Math.floor(Math.random()*n)+5,i=Math.floor(Math.random()*s)+1,a=s-i;break;case"×":s=Math.floor(Math.random()*Math.min(n,16))+2,i=Math.floor(Math.random()*12)+2,a=s*i;break}return{text:`${s} ${e} ${i}`,answer:a}}nextProblem(){if(this.round>=this.totalRounds){this.finish();return}this.answered=!1,this.currentProblem=this.generateProblem();const t=document.getElementById("bt-math-problem"),e=document.getElementById("bt-math-input"),s=document.getElementById("bt-math-feedback"),i=this.container.querySelector(".bt-game-progress");t&&(t.textContent=this.currentProblem.text),e&&(e.value="",e.disabled=!1,e.focus()),s&&(s.textContent=""),i&&(i.textContent=`${this.round+1} / ${this.totalRounds}`),this.startTime=performance.now()}submitAnswer(){if(this.answered)return;const t=document.getElementById("bt-math-input"),e=document.getElementById("bt-math-feedback");if(!t||t.value==="")return;this.answered=!0,t.disabled=!0;const s=parseInt(t.value,10),i=performance.now()-this.startTime;this.responseTimes.push(i),s===this.currentProblem.answer?(this.score++,o.playSuccess(),e&&(e.textContent="CORRECT",e.className="bt-game-feedback bt-feedback-correct"),this.score%3===0&&this.difficulty++):(o.playError(),e&&(e.textContent=`Correct: ${this.currentProblem.answer}`,e.className="bt-game-feedback bt-feedback-wrong")),this.round++,setTimeout(()=>this.nextProblem(),650)}finish(){const t=this.responseTimes.length>0?Math.round(this.responseTimes.reduce((e,s)=>e+s,0)/this.responseTimes.length):0;this.onComplete({game:"Mental Math",score:this.score,total:this.totalRounds,accuracy:Math.round(this.score/this.totalRounds*100),avgResponseTime:t,difficulty:this.difficulty})}destroy(){this.answered=!0}}class x{constructor(t,e){this.container=t,this.onComplete=e,this.symbols=["◆","▲","●","■","★","✚","✦","⬟"],this.round=0,this.totalRounds=24,this.score=0,this.errors=0,this.prev=null,this.current=null,this.responseTimes=[],this.startTime=0,this.answered=!1}start(){this.round=0,this.score=0,this.errors=0,this.responseTimes=[],this.prev=null,this.current=this.symbols[Math.floor(Math.random()*this.symbols.length)],this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-bolt"></i> Speed Match</span>
                    <span class="bt-game-progress">Trial 1 / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction" id="bt-speed-inst">
                    Memorize this initial symbol. Then decide if the next matches it.
                </div>
                <div class="bt-speed-symbol" id="bt-speed-symbol">${this.current}</div>
                <div class="bt-speed-buttons">
                    <button class="bt-speed-btn bt-speed-yes" id="bt-speed-yes">
                        <i class="fa fa-check"></i> Match [←]
                    </button>
                    <button class="bt-speed-btn bt-speed-no" id="bt-speed-no">
                        <i class="fa fa-times"></i> Different [→]
                    </button>
                </div>
                <div class="bt-kbd-hint">
                    <span><kbd>←</kbd> or <kbd>A</kbd> Match</span>
                    <span><kbd>→</kbd> or <kbd>D</kbd> Different</span>
                </div>
            </div>
        `,document.getElementById("bt-speed-yes").addEventListener("click",()=>this.respond(!0)),document.getElementById("bt-speed-no").addEventListener("click",()=>this.respond(!1)),this._keyHandler=t=>{(t.key==="ArrowLeft"||t.key==="a"||t.key==="A")&&this.respond(!0),(t.key==="ArrowRight"||t.key==="d"||t.key==="D")&&this.respond(!1)},document.addEventListener("keydown",this._keyHandler),setTimeout(()=>this.nextRound(),1200)}nextRound(){if(this.round>=this.totalRounds){this.finish();return}if(this.prev=this.current,Math.random()<.42)this.current=this.prev;else{let i;do i=this.symbols[Math.floor(Math.random()*this.symbols.length)];while(i===this.prev);this.current=i}const t=document.getElementById("bt-speed-symbol"),e=document.getElementById("bt-speed-inst"),s=this.container.querySelector(".bt-game-progress");e&&(e.innerHTML="Does this symbol match the <strong>previous</strong> one?"),t&&(t.textContent=this.current,t.className="bt-speed-symbol"),s&&(s.textContent=`Trial ${this.round+1} / ${this.totalRounds}`),this.startTime=performance.now(),this.answered=!1}respond(t){if(this.answered||this.prev===null)return;this.answered=!0;const e=performance.now()-this.startTime;this.responseTimes.push(e);const s=this.current===this.prev,i=t===s,a=document.getElementById("bt-speed-symbol");i?(this.score++,o.playSuccess(),a&&a.classList.add("bt-speed-correct")):(this.errors++,o.playError(),a&&a.classList.add("bt-speed-wrong")),this.round++,setTimeout(()=>this.nextRound(),380)}finish(){document.removeEventListener("keydown",this._keyHandler);const t=this.responseTimes.length>0?Math.round(this.responseTimes.reduce((e,s)=>e+s,0)/this.responseTimes.length):0;this.onComplete({game:"Speed Match",score:this.score,total:this.totalRounds,accuracy:Math.round(this.score/this.totalRounds*100),avgResponseTime:t})}destroy(){document.removeEventListener("keydown",this._keyHandler),this.answered=!0}}class M{constructor(t,e){this.container=t,this.onComplete=e,this.wordBank=["ocean","bridge","candle","forest","rhythm","glacier","lantern","meadow","anchor","crystal","desert","ember","horizon","island","journey","kettle","marble","nebula","orchid","puzzle","quartz","river","shadow","temple","velvet","whisper","zenith","breeze","cipher","dusk","falcon","garden","harbor","ivory","jasmine","knight"],this.currentWords=[],this.level=5,this.score=0,this.rounds=0,this.maxRounds=4,this.totalWordsPresented=0,this._countdown=null}start(){this.level=5,this.score=0,this.rounds=0,this.totalWordsPresented=0,this.nextRound()}nextRound(){if(this.rounds>=this.maxRounds){this.finish();return}const t=[...this.wordBank].sort(()=>Math.random()-.5);this.currentWords=t.slice(0,this.level),this.totalWordsPresented+=this.currentWords.length;const e=Math.min(4+this.level,10);this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-list-ol"></i> Word Recall</span>
                    <span class="bt-game-progress">Round ${this.rounds+1} / ${this.maxRounds} · ${this.level} words</span>
                </div>
                <div class="bt-game-instruction">Memorize the words below before time expires.</div>
                <div class="bt-word-timer-bar">
                    <div class="bt-word-timer-fill" id="bt-word-timer-fill" style="width: 100%"></div>
                </div>
                <div class="bt-word-list">
                    ${this.currentWords.map(a=>`<span class="bt-word-item">${a}</span>`).join("")}
                </div>
            </div>
        `;let s=e;const i=document.getElementById("bt-word-timer-fill");this._countdown=setInterval(()=>{s--,i&&(i.style.width=`${s/e*100}%`),s<=0&&(clearInterval(this._countdown),this.showRecallInput())},1e3)}showRecallInput(){this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-list-ol"></i> Word Recall</span>
                    <span class="bt-game-progress">Round ${this.rounds+1} / ${this.maxRounds}</span>
                </div>
                <div class="bt-game-instruction">Type all the words you remember separated by spaces or commas.</div>
                <textarea id="bt-recall-input" class="bt-recall-input" placeholder="Type words here..." rows="3" autofocus></textarea>
                <button class="bt-recall-submit" id="bt-recall-submit">Submit Recall</button>
            </div>
        `;const t=document.getElementById("bt-recall-input"),e=document.getElementById("bt-recall-submit");t&&t.focus(),e.addEventListener("click",()=>this.checkRecall()),t.addEventListener("keydown",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),this.checkRecall())})}checkRecall(){const t=document.getElementById("bt-recall-input");if(!t)return;const e=t.value.toLowerCase().split(/[\s,]+/).filter(a=>a.length>0),s=new Set(this.currentWords.map(a=>a.toLowerCase()));let i=0;e.forEach(a=>{s.has(a)&&i++}),this.score+=i,i>0?o.playSuccess():o.playError(),this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-list-ol"></i> Recall Results</span>
                    <span class="bt-game-progress">Recalled ${i} / ${this.currentWords.length}</span>
                </div>
                <div class="bt-game-instruction">Summary of presented words:</div>
                <div class="bt-word-list">
                    ${this.currentWords.map(a=>`<span class="bt-word-item ${e.includes(a.toLowerCase())?"bt-word-correct":"bt-word-missed"}">${a}</span>`).join("")}
                </div>
            </div>
        `,i>=this.currentWords.length-1?this.level=Math.min(this.level+1,10):i<Math.ceil(this.currentWords.length/2)&&(this.level=Math.max(this.level-1,4)),this.rounds++,setTimeout(()=>this.nextRound(),1800)}finish(){clearInterval(this._countdown);const t=this.totalWordsPresented>0?Math.round(this.score/this.totalWordsPresented*100):0;this.onComplete({game:"Word Recall",score:this.score,total:this.totalWordsPresented,accuracy:t,maxLevel:this.level})}destroy(){clearInterval(this._countdown)}}class C{constructor(t,e){this.container=t,this.onComplete=e,this.round=0,this.totalRounds=24,this.score=0,this.errors=0,this.responseTimes=[],this.startTime=0,this.currentRule="parity",this.answered=!1}start(){this.round=0,this.score=0,this.errors=0,this.responseTimes=[],this.currentRule="parity",this.answered=!1,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-random"></i> Task Switch</span>
                    <span class="bt-game-progress">0 / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction" id="bt-ts-rule"></div>
                <div class="bt-ts-number" id="bt-ts-number"></div>
                <div class="bt-speed-buttons">
                    <button class="bt-speed-btn bt-speed-yes" id="bt-ts-yes">
                        <i class="fa fa-check"></i> YES [←]
                    </button>
                    <button class="bt-speed-btn bt-speed-no" id="bt-ts-no">
                        <i class="fa fa-times"></i> NO [→]
                    </button>
                </div>
                <div class="bt-game-feedback" id="bt-ts-feedback"></div>
                <div class="bt-kbd-hint">
                    <span><kbd>←</kbd> YES</span>
                    <span><kbd>→</kbd> NO</span>
                </div>
            </div>
        `,document.getElementById("bt-ts-yes").addEventListener("click",()=>this.respond(!0)),document.getElementById("bt-ts-no").addEventListener("click",()=>this.respond(!1)),this._keyHandler=t=>{(t.key==="ArrowLeft"||t.key==="a"||t.key==="A")&&this.respond(!0),(t.key==="ArrowRight"||t.key==="d"||t.key==="D")&&this.respond(!1)},document.addEventListener("keydown",this._keyHandler),this.nextRound()}nextRound(){if(this.round>=this.totalRounds){this.finish();return}this.currentRule=Math.floor(this.round/4)%2===0?"parity":"magnitude",this.currentNumber=Math.floor(Math.random()*9)+1;const t=document.getElementById("bt-ts-rule"),e=document.getElementById("bt-ts-number"),s=document.getElementById("bt-ts-feedback"),i=this.container.querySelector(".bt-game-progress");t&&(this.currentRule==="parity"?t.innerHTML='<span class="bt-rule-pill bt-rule-parity">PARITY RULE: Is the number EVEN?</span>':t.innerHTML='<span class="bt-rule-pill bt-rule-magnitude">MAGNITUDE RULE: Is it GREATER than 5?</span>'),e&&(e.textContent=this.currentNumber),s&&(s.textContent=""),i&&(i.textContent=`${this.round+1} / ${this.totalRounds}`),this.startTime=performance.now(),this.answered=!1}respond(t){if(this.answered)return;this.answered=!0;const e=performance.now()-this.startTime;this.responseTimes.push(e);let s;this.currentRule==="parity"?s=t===(this.currentNumber%2===0):s=t===this.currentNumber>5;const i=document.getElementById("bt-ts-feedback");s?(this.score++,o.playSuccess(),i&&(i.textContent="CORRECT",i.className="bt-game-feedback bt-feedback-correct")):(this.errors++,o.playError(),i&&(i.textContent="INCORRECT",i.className="bt-game-feedback bt-feedback-wrong")),this.round++,setTimeout(()=>this.nextRound(),420)}finish(){document.removeEventListener("keydown",this._keyHandler);const t=this.responseTimes.length>0?Math.round(this.responseTimes.reduce((e,s)=>e+s,0)/this.responseTimes.length):0;this.onComplete({game:"Task Switch",score:this.score,total:this.totalRounds,accuracy:Math.round(this.score/this.totalRounds*100),avgResponseTime:t})}destroy(){document.removeEventListener("keydown",this._keyHandler),this.answered=!0}}class S{constructor(t,e){this.container=t,this.onComplete=e,this.round=0,this.totalRounds=24,this.score=0,this.errors=0,this.responseTimes=[],this.startTime=0,this.answered=!1}start(){this.round=0,this.score=0,this.errors=0,this.responseTimes=[],this.answered=!1,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-arrows-h"></i> Flanker Task</span>
                    <span class="bt-game-progress">0 / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction">
                    Focus on the <strong>CENTER</strong> arrow. Press the direction it points, ignoring the flankers.
                </div>
                <div class="bt-flanker-display" id="bt-flanker-display"></div>
                <div class="bt-speed-buttons">
                    <button class="bt-speed-btn bt-speed-yes" id="bt-flanker-left">
                        <i class="fa fa-arrow-left"></i> Left [←]
                    </button>
                    <button class="bt-speed-btn bt-speed-no" id="bt-flanker-right">
                        Right [→] <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
                <div class="bt-game-feedback" id="bt-flanker-feedback"></div>
                <div class="bt-kbd-hint">
                    <span><kbd>←</kbd> or <kbd>A</kbd> Left</span>
                    <span><kbd>→</kbd> or <kbd>D</kbd> Right</span>
                </div>
            </div>
        `,document.getElementById("bt-flanker-left").addEventListener("click",()=>this.respond("left")),document.getElementById("bt-flanker-right").addEventListener("click",()=>this.respond("right")),this._keyHandler=t=>{(t.key==="ArrowLeft"||t.key==="a"||t.key==="A")&&this.respond("left"),(t.key==="ArrowRight"||t.key==="d"||t.key==="D")&&this.respond("right")},document.addEventListener("keydown",this._keyHandler),this.nextRound()}nextRound(){if(this.round>=this.totalRounds){this.finish();return}const t="←",e="→",s=["congruent","incongruent","neutral"],i=s[Math.floor(Math.random()*s.length)];this.centerDir=Math.random()<.5?"left":"right";const a=this.centerDir==="left"?t:e;let n;i==="congruent"?n=a:i==="incongruent"?n=this.centerDir==="left"?e:t:n="—";const r=document.getElementById("bt-flanker-display"),c=document.getElementById("bt-flanker-feedback"),l=this.container.querySelector(".bt-game-progress");r&&(r.innerHTML=`
                <span class="bt-flanker-distractor">${n}</span>
                <span class="bt-flanker-distractor">${n}</span>
                <span class="bt-flanker-target">${a}</span>
                <span class="bt-flanker-distractor">${n}</span>
                <span class="bt-flanker-distractor">${n}</span>
            `),c&&(c.textContent=""),l&&(l.textContent=`${this.round+1} / ${this.totalRounds}`),this.startTime=performance.now(),this.answered=!1}respond(t){if(this.answered)return;this.answered=!0;const e=performance.now()-this.startTime;this.responseTimes.push(e);const s=t===this.centerDir,i=document.getElementById("bt-flanker-feedback");s?(this.score++,o.playSuccess(),i&&(i.textContent="CORRECT",i.className="bt-game-feedback bt-feedback-correct")):(this.errors++,o.playError(),i&&(i.textContent="INCORRECT",i.className="bt-game-feedback bt-feedback-wrong")),this.round++,setTimeout(()=>this.nextRound(),400)}finish(){document.removeEventListener("keydown",this._keyHandler);const t=this.responseTimes.length>0?Math.round(this.responseTimes.reduce((e,s)=>e+s,0)/this.responseTimes.length):0;this.onComplete({game:"Flanker Task",score:this.score,total:this.totalRounds,accuracy:Math.round(this.score/this.totalRounds*100),avgResponseTime:t})}destroy(){document.removeEventListener("keydown",this._keyHandler),this.answered=!0}}class ${constructor(t,e){this.container=t,this.onComplete=e,this.blockCount=9,this.sequence=[],this.playerIndex=0,this.span=2,this.maxSpan=2,this.fails=0,this.isLocked=!0,this.seqTimer=null}start(){this.span=2,this.maxSpan=2,this.fails=0,this.isLocked=!0,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-cubes"></i> Corsi Block Span</span>
                    <span class="bt-game-progress">Span: ${this.span}</span>
                </div>
                <div class="bt-game-instruction" id="bt-corsi-msg">Observe the tapping sequence...</div>
                <div class="bt-corsi-grid" id="bt-corsi-grid"></div>
            </div>
        `;const t=[[35,45],[145,25],[245,50],[55,135],[155,150],[235,125],[30,225],[140,245],[255,235]],e=document.getElementById("bt-corsi-grid");t.forEach((s,i)=>{const a=document.createElement("button");a.className="bt-corsi-block",a.dataset.index=i,a.style.left=`${s[0]}px`,a.style.top=`${s[1]}px`,a.addEventListener("click",()=>this.blockClicked(i)),e.appendChild(a)}),setTimeout(()=>this.showSequence(),500)}showSequence(){this.isLocked=!0,this.playerIndex=0;const t=document.getElementById("bt-corsi-msg");t&&(t.textContent="Observe the tapping sequence...");const e=this.container.querySelectorAll(".bt-corsi-block");for(this.sequence=[];this.sequence.length<this.span;){const a=Math.floor(Math.random()*this.blockCount);this.sequence[this.sequence.length-1]!==a&&this.sequence.push(a)}let s=0;const i=()=>{if(s>0&&e[this.sequence[s-1]].classList.remove("bt-corsi-active"),s>=this.sequence.length){this.isLocked=!1,t&&(t.textContent="Now tap the blocks in the same order!");return}e[this.sequence[s]].classList.add("bt-corsi-active"),o.playTap(480+s*35),s++,this.seqTimer=setTimeout(i,650)};this.seqTimer=setTimeout(i,450)}blockClicked(t){if(this.isLocked)return;const e=this.container.querySelectorAll(".bt-corsi-block");if(t===this.sequence[this.playerIndex]){if(o.playTap(520+this.playerIndex*35),e[t].classList.add("bt-corsi-correct"),setTimeout(()=>e[t].classList.remove("bt-corsi-correct"),200),this.playerIndex++,this.playerIndex>=this.sequence.length){this.isLocked=!0,this.maxSpan=Math.max(this.maxSpan,this.span),this.span++,o.playSuccess();const s=this.container.querySelector(".bt-game-progress");s&&(s.textContent=`Span: ${this.span}`),setTimeout(()=>{e.forEach(i=>i.classList.remove("bt-corsi-correct","bt-corsi-wrong")),this.showSequence()},750)}}else this.isLocked=!0,o.playError(),e[t].classList.add("bt-corsi-wrong"),this.fails++,this.fails>=2?setTimeout(()=>this.finish(),800):setTimeout(()=>{e.forEach(s=>s.classList.remove("bt-corsi-wrong")),this.showSequence()},800)}finish(){this.isLocked=!0,clearTimeout(this.seqTimer),this.onComplete({game:"Corsi Blocks",score:this.maxSpan,total:this.maxSpan,maxLevel:this.maxSpan})}destroy(){this.isLocked=!0,clearTimeout(this.seqTimer)}}class I{constructor(t,e){this.container=t,this.onComplete=e,this.level=1,this.score=0,this.totalRounds=8,this.round=0,this.beats=[],this.playerBeats=[],this.tolerance=130,this.isProcessing=!1}start(){this.level=1,this.score=0,this.round=0,this.nextRound()}nextRound(){if(this.round++,this.round>this.totalRounds)return this.finish();const t=3+Math.floor(this.level/2);this.generatePattern(t),this.render("listen"),setTimeout(()=>this.playPattern(),600)}generatePattern(t){this.beats=[];const e=Math.max(220,420-this.level*20),s=Math.max(420,720-this.level*30);for(let i=0;i<t;i++)this.beats.push(i===0?0:e+Math.floor(Math.random()*(s-e)))}render(t){const e=t==="listen"?"Listen to the rhythm pulse...":"Tap the rhythm cadence back!";this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-music"></i> Rhythm Recall (Level ${this.level})</span>
                    <span class="bt-game-progress">${this.round} / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction">${e}</div>
                <div class="bt-rhythm-pad" id="bt-rhythm-pad">
                    <div class="bt-rhythm-circle ${t==="tap"?"bt-rhythm-active":""}" id="bt-rhythm-circle">
                        <i class="fa ${t==="listen"?"fa-headphones":"fa-hand-o-down"}"></i>
                        <span>${t==="listen"?"Listen":"Tap Space"}</span>
                    </div>
                </div>
                <div class="bt-rhythm-feedback" id="bt-rhythm-feedback"></div>
                <div class="bt-kbd-hint">
                    <span><kbd>SPACE</kbd> or click to tap beat</span>
                </div>
            </div>
        `,t==="tap"&&(this.playerBeats=[],this.tapStartTime=null,this.isProcessing=!1,document.getElementById("bt-rhythm-pad").addEventListener("mousedown",()=>this.handleTap()),this._keyHandler=i=>{i.code==="Space"&&(i.preventDefault(),this.handleTap())},document.addEventListener("keydown",this._keyHandler))}playPattern(){const t=document.getElementById("bt-rhythm-circle");let e=0;const s=()=>{if(e>=this.beats.length){setTimeout(()=>this.render("tap"),500);return}setTimeout(()=>{t&&(t.classList.add("bt-rhythm-pulse"),o.playTone(660,.07,"sine",.15),setTimeout(()=>t.classList.remove("bt-rhythm-pulse"),120)),e++,s()},this.beats[e])};s()}handleTap(){if(this.isProcessing)return;const t=performance.now();this.tapStartTime?this.playerBeats.push(t-this.tapStartTime-this.playerBeats.reduce((s,i)=>s+i,0)):(this.tapStartTime=t,this.playerBeats.push(0));const e=document.getElementById("bt-rhythm-circle");e&&(e.classList.add("bt-rhythm-pulse"),o.playTone(660,.05,"sine",.15),setTimeout(()=>e.classList.remove("bt-rhythm-pulse"),120)),this.playerBeats.length>=this.beats.length&&(this.isProcessing=!0,document.removeEventListener("keydown",this._keyHandler),setTimeout(()=>this.evaluateTap(),250))}evaluateTap(){let t=0;for(let a=1;a<this.beats.length;a++)t+=Math.abs(this.beats[a]-(this.playerBeats[a]||0));const e=t/(this.beats.length-1),s=e<this.tolerance;s?(this.score++,this.level++,o.playSuccess()):o.playError();const i=document.getElementById("bt-rhythm-feedback");i&&(i.innerHTML=s?`<span class="bt-feedback-correct">Synchronized (±${Math.round(e)}ms)</span>`:`<span class="bt-feedback-wrong">Timing deviation (±${Math.round(e)}ms)</span>`),setTimeout(()=>this.nextRound(),1200)}finish(){document.removeEventListener("keydown",this._keyHandler);const t=Math.round(this.score/this.totalRounds*100);this.onComplete({game:"Rhythm Recall",score:this.score,total:this.totalRounds,accuracy:t,maxLevel:this.level})}destroy(){document.removeEventListener("keydown",this._keyHandler),this.isProcessing=!0}}class B{constructor(t,e){this.container=t,this.onComplete=e,this.round=0,this.totalRounds=12,this.score=0,this.totalTime=0,this.startTime=0,this.answered=!1}start(){this.round=0,this.score=0,this.totalTime=0,this.nextRound()}nextRound(){if(this.round++,this.answered=!1,this.round>this.totalRounds)return this.finish();const t=8+this.round*2,e=Math.ceil(Math.sqrt(t+1))+1,s=["L","Γ","⌐","˩"],i=Math.floor(Math.random()*(t+1));let a="";for(let r=0;r<=t;r++){const c=r===i,l=Math.floor(Math.random()*4)*90,d=c?"T":s[Math.floor(Math.random()*s.length)];a+=`
                <button class="bt-vs-cell" data-target="${c}" style="transform: rotate(${l}deg)">
                    ${d}
                </button>
            `}this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-search"></i> Visual Search</span>
                    <span class="bt-game-progress">${this.round} / ${this.totalRounds}</span>
                </div>
                <div class="bt-game-instruction">Locate and select the target letter <strong>T</strong> among rotated distractors.</div>
                <div class="bt-vs-grid" id="bt-vs-grid" style="grid-template-columns: repeat(${e}, 1fr)">${a}</div>
            </div>
        `,this.startTime=performance.now();const n=document.getElementById("bt-vs-grid");n.addEventListener("click",r=>{if(this.answered)return;const c=r.target.closest(".bt-vs-cell");if(!c)return;this.answered=!0;const l=c.dataset.target==="true",d=performance.now()-this.startTime;if(this.totalTime+=d,l)this.score++,o.playSuccess(),c.style.background="rgba(16,185,129,0.3)",c.style.borderColor="#10b981";else{o.playError(),c.style.background="rgba(239,68,68,0.3)",c.style.borderColor="#ef4444";const m=n.querySelector('[data-target="true"]');m&&(m.style.background="rgba(16,185,129,0.2)",m.style.borderColor="#10b981")}setTimeout(()=>this.nextRound(),600)})}finish(){const t=Math.round(this.totalTime/this.totalRounds),e=Math.round(this.score/this.totalRounds*100);this.onComplete({game:"Visual Search",score:this.score,total:this.totalRounds,accuracy:e,avgResponseTime:t})}destroy(){this.answered=!0}}class A{constructor(t,e){this.container=t,this.onComplete=e,this.trial=0,this.totalTrials=26,this.goRatio=.72,this.hits=0,this.falseAlarms=0,this.misses=0,this.correctRejections=0,this.totalRT=0,this.rtCount=0,this.trialTimeout=null,this.feedbackTimeout=null,this.isAcceptingInput=!1}start(){this.trial=0,this.hits=0,this.falseAlarms=0,this.misses=0,this.correctRejections=0,this.totalRT=0,this.rtCount=0,this.container.innerHTML=`
            <div class="bt-game-area">
                <div class="bt-game-header">
                    <span class="bt-game-level"><i class="fa fa-hand-stop-o"></i> Go / No-Go</span>
                    <span class="bt-game-progress">0 / ${this.totalTrials}</span>
                </div>
                <div class="bt-game-instruction">
                    Press <kbd>SPACE</kbd> or tap immediately for <strong style="color:#34d399">GO (Green)</strong>.
                    Hold and do NOT press for <strong style="color:#f87171">NO-GO (Red)</strong>.
                </div>
                <div class="bt-gng-stimulus" id="bt-gng-stimulus">
                    <div class="bt-gng-circle" id="bt-gng-circle">Ready</div>
                </div>
                <div class="bt-game-feedback" id="bt-gng-feedback"></div>
                <div class="bt-kbd-hint">
                    <span><kbd>SPACE</kbd> Respond to Green</span>
                </div>
            </div>
        `,this._keyHandler=e=>{(e.code==="Space"||e.code==="Enter")&&(e.preventDefault(),this.respond())},this._clickHandler=()=>this.respond(),document.addEventListener("keydown",this._keyHandler);const t=document.getElementById("bt-gng-stimulus");t&&t.addEventListener("click",this._clickHandler),setTimeout(()=>this.nextTrial(),800)}nextTrial(){if(clearTimeout(this.trialTimeout),clearTimeout(this.feedbackTimeout),this.trial++,this.trial>this.totalTrials){this.finish();return}this.isAcceptingInput=!1;const t=document.getElementById("bt-gng-circle"),e=this.container.querySelector(".bt-game-progress"),s=document.getElementById("bt-gng-feedback");e&&(e.textContent=`${this.trial} / ${this.totalTrials}`),s&&(s.textContent=""),t&&(t.className="bt-gng-circle",t.textContent="+");const i=600+Math.floor(Math.random()*600);this.trialTimeout=setTimeout(()=>{const a=Math.random()<this.goRatio;this.currentIsGo=a,this.trialStart=performance.now(),this.isAcceptingInput=!0,t&&(t.className=`bt-gng-circle ${a?"bt-gng-go":"bt-gng-nogo"}`,t.textContent=a?"GO":"HOLD"),this.trialTimeout=setTimeout(()=>{this.isAcceptingInput&&(this.isAcceptingInput=!1,this.currentIsGo?(this.misses++,o.playError(),this.showFeedback("Omission Miss","#f59e0b")):(this.correctRejections++,o.playSuccess(),this.showFeedback("Inhibited Hold","#34d399")),this.feedbackTimeout=setTimeout(()=>this.nextTrial(),650))},850)},i)}respond(){if(!this.isAcceptingInput)return;this.isAcceptingInput=!1,clearTimeout(this.trialTimeout);const t=performance.now()-this.trialStart;this.currentIsGo?(this.hits++,this.totalRT+=t,this.rtCount++,o.playSuccess(),this.showFeedback(`Hit (${Math.round(t)}ms)`,"#34d399")):(this.falseAlarms++,o.playError(),this.showFeedback("Commission Error (False Alarm)","#ef4444")),this.feedbackTimeout=setTimeout(()=>this.nextTrial(),650)}showFeedback(t,e){const s=document.getElementById("bt-gng-feedback");s&&(s.textContent=t,s.style.color=e)}finish(){document.removeEventListener("keydown",this._keyHandler),clearTimeout(this.trialTimeout),clearTimeout(this.feedbackTimeout);const t=this.hits+this.misses,e=this.falseAlarms+this.correctRejections,s=Math.min(.99,Math.max(.01,t>0?this.hits/t:.5)),i=Math.min(.99,Math.max(.01,e>0?this.falseAlarms/e:.5)),a=l=>{const d=l<.5?-1:1,m=Math.sqrt(-2*Math.log(1-2*Math.abs(l-.5)));return d*m},n=Math.round((a(s)-a(i))*100)/100,r=this.rtCount>0?Math.round(this.totalRT/this.rtCount):0,c=Math.round((this.hits+this.correctRejections)/this.totalTrials*100);this.onComplete({game:"Go/No-Go",score:this.hits,total:t,accuracy:c,dprime:n,hits:this.hits,misses:this.misses,falseAlarms:this.falseAlarms,avgResponseTime:r})}destroy(){document.removeEventListener("keydown",this._keyHandler),clearTimeout(this.trialTimeout),clearTimeout(this.feedbackTimeout),this.isAcceptingInput=!1}}const u=[{id:"nback",name:"N-Back",domain:"memory",domainLabel:"Working Memory",icon:"fa-clone",accentColor:"#818cf8",description:"Working memory training. Match current stimulus to the letter N steps back.",science:"Jaeggi et al. (2008) — PNAS; fluid intelligence & working memory capacity",citation:"Jaeggi et al. (2008)",instruction:"Press SPACE or tap Match when the current letter matches the item from N positions ago in the stream.",GameClass:w},{id:"stroop",name:"Stroop Task",domain:"attention",domainLabel:"Inhibition & Focus",icon:"fa-eye",accentColor:"#f87171",description:"Semantic vs perceptual interference. Identify the ink color while ignoring the printed word.",science:"MacLeod (1991) — Psychological Bulletin; cognitive inhibition & executive control",citation:"MacLeod (1991)",instruction:"Select the actual ink color of the word. Do not select the semantic color name described by the letters.",GameClass:E},{id:"pattern",name:"Pattern Memory",domain:"memory",domainLabel:"Visual-Spatial",icon:"fa-th",accentColor:"#34d399",description:"Encode and reproduce progressive spatial sequences on an illuminated grid.",science:"Gathercole & Alloway (2006) — visuo-spatial sketchpad & working memory",citation:"Gathercole & Alloway (2006)",instruction:"Carefully watch the illuminated tile sequence, then repeat the exact order.",GameClass:L},{id:"math",name:"Mental Arithmetic",domain:"speed",domainLabel:"Processing Speed",icon:"fa-calculator",accentColor:"#fb923c",description:"Rapid timed arithmetic computations with dynamic difficulty scaling.",science:"Dehaene (2011) — The Number Sense; intraparietal sulcus and numerical fluency",citation:"Dehaene (2011)",instruction:"Solve each equation as fast and accurately as possible. Press Enter to submit.",GameClass:R},{id:"speed",name:"Speed Match",domain:"speed",domainLabel:"Processing Speed",icon:"fa-bolt",accentColor:"#facc15",description:"Rapid perceptual comparison between consecutive geometric stimuli.",science:"Salthouse (1996) — Psychological Review; processing speed theory of adult cognition",citation:"Salthouse (1996)",instruction:"Decide if the current symbol matches the previous symbol in the sequence using arrow keys.",GameClass:x},{id:"recall",name:"Word Recall",domain:"memory",domainLabel:"Verbal Memory",icon:"fa-list-ol",accentColor:"#60a5fa",description:"Encode word lists under temporal constraint followed by uncued free recall.",science:"Baddeley (2003) — Nature Reviews Neuroscience; phonological loop model",citation:"Baddeley (2003)",instruction:"Memorize the word cluster before the countdown timer expires, then type all remembered words.",GameClass:M},{id:"taskswitch",name:"Task Switch",domain:"speed",domainLabel:"Cognitive Flexibility",icon:"fa-random",accentColor:"#2dd4bf",description:"Dynamically alternate between numerical parity (Even/Odd) and magnitude (> 5) rules.",science:"Monsell (2003) — Trends in Cognitive Sciences; task-set reconfiguration & switch cost",citation:"Monsell (2003)",instruction:"Check the active rule banner on each trial: Parity (Even) vs Magnitude (> 5). Answer YES or NO.",GameClass:C},{id:"flanker",name:"Flanker Task",domain:"attention",domainLabel:"Selective Attention",icon:"fa-arrows-h",accentColor:"#f472b6",description:"Target-distractor interference resolution. Respond to center arrow direction.",science:"Eriksen & Eriksen (1974), Fan et al. (2002) — Attention Network Test",citation:"Eriksen & Eriksen (1974)",instruction:"Focus strictly on the center arrow. Press Left or Right corresponding to its direction.",GameClass:S},{id:"corsi",name:"Corsi Block Span",domain:"memory",domainLabel:"Spatial Span",icon:"fa-cubes",accentColor:"#818cf8",description:"Neuropsychological spatial span assessment via sequential block tapping.",science:"Corsi (1972), Kessels et al. (2000) — spatial span index in neuropsychology",citation:"Corsi (1972)",instruction:"Observe the spatial blocks lighting up across the board and tap them in identical order.",GameClass:$},{id:"rhythm",name:"Rhythm Recall",domain:"speed",domainLabel:"Temporal Timing",icon:"fa-music",accentColor:"#e879f9",description:"Encode auditory-temporal intervals and reproduce timing cadence with precision.",science:"Dalla Bella et al. (2025) — rhythmic training and sensorimotor coordination",citation:"Dalla Bella (2025)",instruction:"Listen to the rhythm pulse, then tap the spacebar to reproduce the exact beat intervals.",GameClass:I},{id:"visualsearch",name:"Visual Search",domain:"attention",domainLabel:"Visual Attention",icon:"fa-search",accentColor:"#a3e635",description:"Feature-conjunction visual scanning to isolate target orientation among distractors.",science:"Treisman & Gelade (1980), Gao et al. (2024) — feature integration theory",citation:"Gao et al. (2024)",instruction:"Scan the grid to locate and click the upright or rotated letter T among distractors.",GameClass:B},{id:"gonogo",name:"Go / No-Go",domain:"attention",domainLabel:"Impulse Control",icon:"fa-hand-stop-o",accentColor:"#fb7185",description:"Sustained vigilance task evaluating motor response and impulse inhibition.",science:"Donders (1868), Verbruggen & Logan (2008) — response inhibition & impulse control",citation:"Verbruggen (2008)",instruction:"Press Space immediately when GREEN appears. Withhold response completely when RED appears.",GameClass:A}];class G extends v{constructor(){super("brain-training-overlay"),this.activeGame=null,this.sessionHistory=[],this.activeCategory="all";try{this._stats=JSON.parse(localStorage.getItem("bt-stats")||"{}")}catch{this._stats={}}}open(){this.show()}close(){this.hide()}initialize(){this.isInitialized||(super.initialize(),this.gameListEl=document.getElementById("bt-game-list"),this.gamePlayEl=document.getElementById("bt-game-play"),this.gamePlayArea=document.getElementById("bt-game-play-area"),this.homeBtn=document.getElementById("bt-home-btn"),this.closeBtn=document.getElementById("bt-close-btn"),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.hide()),this.homeBtn&&this.homeBtn.addEventListener("click",()=>this.showGameList()),this.isInitialized=!0)}show(){this.initialize(),super.show(),this.showGameList()}setCategory(t){this.activeCategory=t,this.showGameList()}showGameList(){this.activeGame&&(this.activeGame.destroy(),this.activeGame=null),this.gamePlayEl&&(this.gamePlayEl.style.display="none"),this.gameListEl&&(this.gameListEl.style.display="block"),this.homeBtn&&(this.homeBtn.style.display="none");const t=this.activeCategory==="all"?u:u.filter(r=>r.domain===this.activeCategory);let e=0,s=g[0],i=0,a=0;Object.values(this._stats).forEach(r=>{if(e+=r.plays||0,r.bestPercentile){i+=r.bestPercentile,a++;const c=f(r.bestPercentile);r.bestPercentile>=s.minScore&&(s=c)}});const n=a>0?Math.round(i/a):50;this.gameListEl&&(this.gameListEl.innerHTML=`
                <div class="bt-header">
                    <div class="bt-header-main">
                        <span class="bt-suite-pill"><i class="fa fa-flask"></i> Cognitive Assessment Lab</span>
                        <h2>Brain Training Suite</h2>
                        <p class="bt-subtitle">Validated neurocognitive exercises targeting working memory, inhibition, and executive function.</p>
                    </div>
                    <div class="bt-overview-stats">
                        <div class="bt-overview-chip">
                            <span class="bt-overview-chip-num">${e}</span>
                            <span class="bt-overview-chip-label">Sessions</span>
                        </div>
                        <div class="bt-overview-chip">
                            <span class="bt-overview-chip-num">${a>0?`Top ${100-n}%`:"—"}</span>
                            <span class="bt-overview-chip-label">Avg Percentile</span>
                        </div>
                    </div>
                </div>

                <div class="bt-filter-tabs">
                    <button class="bt-tab ${this.activeCategory==="all"?"active":""}" data-category="all">
                        <i class="fa fa-th-large"></i> All Modules (${u.length})
                    </button>
                    <button class="bt-tab ${this.activeCategory==="memory"?"active":""}" data-category="memory">
                        <i class="fa fa-clone"></i> Working Memory (4)
                    </button>
                    <button class="bt-tab ${this.activeCategory==="attention"?"active":""}" data-category="attention">
                        <i class="fa fa-crosshairs"></i> Attention & Focus (4)
                    </button>
                    <button class="bt-tab ${this.activeCategory==="speed"?"active":""}" data-category="speed">
                        <i class="fa fa-bolt"></i> Speed & Flexibility (4)
                    </button>
                </div>

                <div class="bt-game-grid">
                    ${t.map(r=>this.renderGameCard(r)).join("")}
                </div>
            `,this.gameListEl.querySelectorAll(".bt-tab").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.category;this.setCategory(c)})}),this.gameListEl.querySelectorAll(".bt-game-card").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.gameId;this.startGame(c)})}))}renderGameCard(t){const e=this._stats[t.id],s=e?.best??"—",i=e?.plays??0;let a="";if(e?.bestPercentile){const n=f(e.bestPercentile);a=`
                <span class="bt-tier-pill" style="color: ${n.color}">
                    <i class="fa ${n.icon}"></i> ${n.name}
                </span>
            `}return`
            <div class="bt-game-card" data-game-id="${t.id}" style="--card-accent: ${t.accentColor}">
                <div class="bt-card-icon-box">
                    <i class="fa ${t.icon}"></i>
                </div>
                <div class="bt-card-info">
                    <div class="bt-card-header-row">
                        <h3 class="bt-card-name">${t.name}</h3>
                        <span class="bt-domain-tag">${t.domainLabel}</span>
                    </div>
                    <p class="bt-card-desc">${t.description}</p>
                    <div class="bt-card-meta">
                        <span class="bt-card-citation">${t.citation}</span>
                        <div class="bt-card-stats-row">
                            ${a}
                            <span class="bt-card-stat-item" title="High Score">
                                <i class="fa fa-trophy"></i> ${s}
                            </span>
                            <span class="bt-card-stat-item" title="Completed Sessions">
                                <i class="fa fa-play"></i> ${i}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `}startGame(t){const e=u.find(s=>s.id===t);e&&(this.gameListEl&&(this.gameListEl.style.display="none"),this.gamePlayEl&&(this.gamePlayEl.style.display="block"),this.homeBtn&&(this.homeBtn.style.display="inline-flex"),this.gamePlayArea&&(this.gamePlayArea.innerHTML=`
                <div class="bt-game-intro">
                    <div class="bt-intro-icon-box">
                        <i class="fa ${e.icon}"></i>
                    </div>
                    <h2>${e.name}</h2>
                    <p class="bt-intro-desc">${e.description}</p>

                    <div class="bt-intro-science-box">
                        <i class="fa fa-graduation-cap"></i>
                        <div>
                            <strong>Scientific Rationale:</strong><br>
                            ${e.science}
                        </div>
                    </div>

                    <div class="bt-instruction-card">
                        <div class="bt-instruction-title"><i class="fa fa-info-circle"></i> Protocol & Instructions</div>
                        <div class="bt-instruction-content">${e.instruction}</div>
                    </div>

                    <button class="bt-start-btn" id="bt-start-game">
                        <i class="fa fa-play"></i> Start Exercise
                    </button>
                </div>
            `,document.getElementById("bt-start-game").addEventListener("click",()=>{this.activeGame=new e.GameClass(this.gamePlayArea,s=>{this.onGameComplete(e,s)}),this.activeGame.start()})))}onGameComplete(t,e){this.activeGame=null,this.sessionHistory.push(e);const s=T(t.id,e.score,e.accuracy),i=f(s);this._stats[t.id]||(this._stats[t.id]={plays:0,best:0,bestPercentile:0,history:[]});const a=this._stats[t.id];a.plays++,e.score>a.best&&(a.best=e.score),s>(a.bestPercentile||0)&&(a.bestPercentile=s),a.history||(a.history=[]),a.history.push({score:e.score,accuracy:e.accuracy??null,date:Date.now()}),a.history.length>20&&a.history.shift();try{localStorage.setItem("bt-stats",JSON.stringify(this._stats))}catch{}const n=this._generateInsight(s,e,a);this.gamePlayArea&&(this.gamePlayArea.innerHTML=`
                <div class="bt-game-results">
                    <div class="bt-results-icon-box">
                        <i class="fa ${t.icon}"></i>
                    </div>
                    <h2>${t.name} Completed</h2>

                    <div class="bt-rank-display" style="--rank-color: ${i.color}">
                        <i class="fa ${i.icon} bt-rank-icon"></i>
                        <span class="bt-rank-name">${i.name} Tier</span>
                    </div>

                    <div class="bt-percentile-wrapper">
                        <div class="bt-percentile-header">
                            <span>Normative Cohort</span>
                            <span>Top ${100-s}%</span>
                        </div>
                        <div class="bt-percentile-bar">
                            <div class="bt-percentile-fill" style="width: ${s}%"></div>
                        </div>
                        <div class="bt-percentile-label">Performance exceeds ${s}% of reference population norms.</div>
                    </div>

                    <div class="bt-results-grid">
                        <div class="bt-result-card">
                            <span class="bt-result-number">${e.score}</span>
                            <span class="bt-result-label">Score</span>
                        </div>
                        ${e.accuracy!==void 0?`
                        <div class="bt-result-card">
                            <span class="bt-result-number">${e.accuracy}%</span>
                            <span class="bt-result-label">Accuracy</span>
                        </div>
                        `:""}
                        ${e.avgResponseTime!==void 0?`
                        <div class="bt-result-card">
                            <span class="bt-result-number">${e.avgResponseTime}ms</span>
                            <span class="bt-result-label">Mean Latency</span>
                        </div>
                        `:""}
                        ${e.maxLevel!==void 0?`
                        <div class="bt-result-card">
                            <span class="bt-result-number">${e.maxLevel}</span>
                            <span class="bt-result-label">Span / Level</span>
                        </div>
                        `:""}
                        ${e.dprime!==void 0?`
                        <div class="bt-result-card">
                            <span class="bt-result-number">${e.dprime}</span>
                            <span class="bt-result-label">Sensitivity (d′)</span>
                        </div>
                        `:""}
                    </div>

                    <div class="bt-insight">
                        <div class="bt-insight-header"><i class="fa fa-line-chart"></i> Neurocognitive Insight</div>
                        ${n}
                    </div>

                    <div class="bt-results-actions">
                        <button class="bt-play-again-btn" id="bt-play-again">
                            <i class="fa fa-repeat"></i> Train Again
                        </button>
                        <button class="bt-back-btn" id="bt-back-home">
                            <i class="fa fa-th-large"></i> All Modules
                        </button>
                    </div>
                </div>
            `,document.getElementById("bt-play-again")?.addEventListener("click",()=>{this.startGame(t.id)}),document.getElementById("bt-back-home")?.addEventListener("click",()=>{this.showGameList()}))}_generateInsight(t,e,s){const i=s.history||[];let a="";if(i.length>=3){const r=i.slice(-3).map(l=>l.score),c=i.slice(-6,-3).map(l=>l.score);if(c.length>=2){const l=r.reduce((p,b)=>p+b,0)/r.length,d=c.reduce((p,b)=>p+b,0)/c.length,m=Math.round((l-d)/(d||1)*100);m>5?a=`Positive adaptation: Performance increased by ${m}% across recent trials.`:m<-5?a=`Cognitive fatigue detected: Performance dipped ${Math.abs(m)}%. Rest before subsequent trials.`:a="Consistent baseline stability across recent sessions."}}let n;return t>=90?n="Exceptional executive control. Your score places in the top decile of standardized norms.":t>=75?n="Strong performance indicating above-average processing fidelity and working memory stability.":t>=50?n="Solid normative baseline. Regular training sessions stimulate sustained neuroplastic gains.":n="Foundational baseline established. Repeated structured practice enhances synaptic efficiency.",`<p>${n}</p>${a?`<p class="bt-insight-trend">${a}</p>`:""}`}hide(){this.activeGame&&(this.activeGame.destroy(),this.activeGame=null),super.hide()}destroy(){this.activeGame&&(this.activeGame.destroy(),this.activeGame=null),o.destroy(),super.destroy()}}const _=new G;export{G as BrainTrainingModal,_ as brainTrainingModal};
