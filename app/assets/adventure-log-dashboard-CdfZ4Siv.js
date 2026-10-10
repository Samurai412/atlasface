import{t as c,u as l,v as p,B as u}from"./index-QHYFmtLO.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class y{constructor(e){this.container=e,this.filters={type:"all",dateRange:"week",searchQuery:""},this.boundHandlers=new Map}initialize(){if(!this.container){console.warn("[AdventureLog] Container element not provided");return}this.container.innerHTML="",this.render(),this.attachEventListeners(),window.addEventListener("quest:completed",()=>this.refresh()),window.addEventListener("quest:created",()=>this.refresh())}render(){const e=this.getCompletedQuests(),t=this.calculateTodayStats(e),s=this.calculateWeeklyStats(e),i=this.groupQuestsByDate(e),a=this.getTodaysRoutine();this.container.innerHTML=`
      <div class="adventure-log-dashboard">
        <!-- Hero Summary -->
        <section class="adventure-log-hero">
          ${this.renderHeroSummary(t)}
        </section>

        <!-- Today's Routine Section -->
        <section class="adventure-log-routine">
          ${this.renderTodaysRoutine(a)}
        </section>

        <!-- Filter Bar -->
        <section class="adventure-log-filters">
          ${this.renderFilterBar()}
        </section>

        <!-- Main Content Grid -->
        <div class="adventure-log-grid">
          <!-- Timeline Feed -->
          <section class="adventure-log-timeline">
            <h3 class="adventure-log-section-title">
              <i class="fa fa-history" aria-hidden="true"></i>
              Activity Timeline
            </h3>
            ${this.renderTimeline(i)}
          </section>

          <!-- Insight Rail -->
          <aside class="adventure-log-insights">
            <h3 class="adventure-log-section-title">
              <i class="fa fa-chart-line" aria-hidden="true"></i>
              Insights
            </h3>
            ${this.renderInsightRail(s,e)}
          </aside>
        </div>
      </div>
    `}renderHeroSummary(e){return`
      <div class="hero-summary">
        <div class="hero-stat">
          <div class="hero-stat-icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
          <div class="hero-stat-content">
            <div class="hero-stat-value">${e.questsCompleted}</div>
            <div class="hero-stat-label">Tasks today</div>
          </div>
        </div>
        
        <div class="hero-stat">
          <div class="hero-stat-icon"><i class="fa fa-clock-o" aria-hidden="true"></i></div>
          <div class="hero-stat-content">
            <div class="hero-stat-value">${e.xpEarned}</div>
            <div class="hero-stat-label">Effort logged</div>
          </div>
        </div>
        
      </div>
    `}renderFilterBar(){return`
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Type:</label>
          <select class="filter-select" data-filter="type">
            <option value="all">All tasks</option>
            <option value="daily">Recurring</option>
            <option value="general">Tasks</option>
            <option value="weekly">Weekly</option>
            <option value="story">Milestones</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Period:</label>
          <select class="filter-select" data-filter="dateRange">
            <option value="today">Today</option>
            <option value="week" selected>This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        
        <div class="filter-group filter-search">
          <input 
            type="search" 
            class="filter-search-input" 
            data-filter="search"
            placeholder="Search tasks..."
            aria-label="Search task history"
          >
        </div>
      </div>
    `}renderTimeline(e){return Object.keys(e).length===0?`
        <div class="timeline-empty">
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
          <p>No completed tasks yet.</p>
          <p class="timeline-empty-hint">Completed tasks will appear here.</p>
        </div>
      `:`
      <div class="timeline-feed">
        ${Object.entries(e).map(([t,s])=>`
          <div class="timeline-day">
            <div class="timeline-day-header">
              <h4 class="timeline-date">${this.formatDate(t)}</h4>
              <span class="timeline-day-count">${s.length} task${s.length!==1?"s":""}</span>
            </div>
            <div class="timeline-cards">
              ${s.map(i=>this.renderTimelineCard(i)).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}renderTimelineCard(e){const t=`timeline-card--${e.type||"general"}`,s=e.completedAt||e.dateCompleted?new Date(e.completedAt||e.dateCompleted).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}):"",i=e.skillTags&&e.skillTags.length>0,a=this.getTaskMetadata(e);return`
      <div class="timeline-card ${t}" data-quest-id="${e.id}">
        <div class="timeline-card-header">
          <div class="timeline-card-title-row">
            <span class="timeline-card-type">${this.getQuestTypeLabel(e.type)}</span>
            ${s?`<span class="timeline-card-time">${s}</span>`:""}
          </div>
          <h5 class="timeline-card-title">${this.escapeHtml(e.title)}</h5>
        </div>
        
        ${e.description?`
          <p class="timeline-card-description">${this.escapeHtml(e.description)}</p>
        `:""}
        
        ${a.length>0?`
          <div class="timeline-card-rewards">
            ${a.map(n=>`<span class="quest-meta">${this.escapeHtml(n)}</span>`).join("")}
          </div>
        `:""}
        
        ${i?`
          <div class="timeline-card-skills">
            <span class="skill-tags-label">Related:</span>
            ${e.skillTags.map(n=>`
              <span class="skill-tag">${this.escapeHtml(n)}</span>
            `).join("")}
          </div>
        `:""}
        
        <div class="timeline-card-reflection">
          <textarea 
            class="reflection-input" 
            data-quest-id="${e.id}"
            placeholder="Add a reflection note..."
            rows="2"
          >${e.reflectionNote||""}</textarea>
        </div>
      </div>
    `}renderInsightRail(e,t){return`
      <div class="insight-widgets">
        <div class="insight-widget">
          <h4 class="insight-widget-title">Effort This Week</h4>
          ${this.renderXpSparkline(e.dailyXp)}
          <div class="insight-widget-summary">
            <span class="insight-value">${e.totalXp}</span>
            <span class="insight-label">Total effort</span>
          </div>
        </div>

        <div class="insight-widget">
          <h4 class="insight-widget-title">Task Mix</h4>
          ${this.renderQuestTypeDistribution(t)}
        </div>
      </div>
    `}renderXpSparkline(e){const t=Math.max(...e,1),s=100/e.length;return`
      <div class="sparkline">
        ${e.map((i,a)=>{const n=i/t*100,o=this.getDayLabel(a);return`
            <div class="sparkline-bar" style="width: ${s}%; height: ${n}%;" title="${o}: ${i} effort">
              <span class="sparkline-value">${i}</span>
            </div>
          `}).join("")}
      </div>
      <div class="sparkline-labels">
        ${e.map((i,a)=>`
          <span class="sparkline-label">${this.getDayLabel(a,!0)}</span>
        `).join("")}
      </div>
    `}renderQuestTypeDistribution(e){if(!e.length)return'<p class="insight-empty">No completed tasks yet.</p>';const t={};e.forEach(i=>{const a=i.type||"general";t[a]=(t[a]||0)+1});const s=e.length||1;return`
      <div class="quest-distribution">
        ${Object.entries(t).map(([i,a])=>{const n=Math.round(a/s*100);return`
            <div class="distribution-row">
              <div class="distribution-bar-wrapper">
                <div class="distribution-bar distribution-bar--${i}" style="width: ${n}%"></div>
              </div>
              <span class="distribution-label">${this.getQuestTypeLabel(i)}</span>
              <span class="distribution-count">${a}</span>
            </div>
          `}).join("")}
      </div>
    `}attachEventListeners(){this.container.querySelectorAll("[data-filter]").forEach(t=>{const s=i=>this.handleFilterChange(i);t.addEventListener("change",s),t.addEventListener("input",s),this.boundHandlers.set(t,s)}),this.container.addEventListener("click",t=>{if(t.target.closest(".routine-toggle")){const s=t.target.closest(".routine-item");if(s&&!s.classList.contains("routine-item-completed")&&!s.classList.contains("routine-item-skipped")){const i=s.dataset.blockId;i&&this.handleRoutineBlockComplete(i)}}}),this.container.addEventListener("blur",t=>{if(t.target.classList.contains("reflection-input")){const s=t.target.dataset.questId,i=t.target.value.trim();this.saveReflectionNote(s,i)}},!0)}handleFilterChange(e){const t=e.target.dataset.filter,s=e.target.value;this.filters[t]=s,this.refresh()}handleRoutineBlockComplete(e){const t=c.updateBlockStatus(e,"completed");t?(this.refresh(),typeof window.showStatusMessage=="function"&&window.showStatusMessage(`${t.title||"Block"} completed.`,"success",2e3),window.dispatchEvent(new CustomEvent("routine:blockCompleted",{detail:{blockId:e,block:t}}))):console.warn("[AdventureLog] Could not update block status:",e)}handleRoutineComplete(e){if(window.questManager&&typeof window.questManager.completeQuest=="function")window.questManager.completeQuest(e);else{const s=(l("all")||[]).find(i=>i.id===e);if(s){s.isCompleted=!0,s.dateCompleted=Date.now(),s.status="complete",p();const i=s.xpReward||25;typeof window.awardExperience=="function"&&window.awardExperience(i,`Completed: ${s.title||s.name}`)}}this.refresh(),typeof window.showStatusMessage=="function"&&window.showStatusMessage("Routine completed.","success",2e3),window.dispatchEvent(new CustomEvent("quest:completed",{detail:{questId:e}}))}saveReflectionNote(e,t){const i=l().find(a=>a.id===e);i&&(i.reflectionNote=t,p())}refresh(){this.render(),this.attachEventListeners()}destroy(){this.boundHandlers.forEach((e,t)=>{t.removeEventListener("change",e),t.removeEventListener("input",e)}),this.boundHandlers.clear()}getTodaysRoutine(){const e=c.getDailyFlow();if(!e||!e.blocks||e.blocks.length===0)return{blocks:[],pending:[],completed:[],inProgress:[],total:0,completedCount:0,progressPercent:0};const t=e.blocks.filter(r=>r.status==="pending"),s=e.blocks.filter(r=>r.status==="in-progress"),i=e.blocks.filter(r=>r.status==="completed"),a=e.blocks.filter(r=>r.status==="skipped"),n=e.blocks.length,o=i.length+a.length;return{blocks:e.blocks,pending:t,inProgress:s,completed:i,skipped:a,total:n,completedCount:o,progressPercent:n>0?Math.round(o/n*100):0}}renderTodaysRoutine(e){if(e.total===0)return`
        <div class="routine-section">
          <div class="routine-header">
            <h3 class="adventure-log-section-title">
              <i class="fa fa-sun-o" aria-hidden="true"></i>
              Today's Routine
            </h3>
          </div>
          <div class="routine-empty">
            <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
            <p>No routine blocks for today</p>
            <p class="routine-empty-hint">Open the Routine panel to set up your daily schedule!</p>
          </div>
        </div>
      `;const t=[...e.blocks].sort((s,i)=>{if(s.status==="in-progress"&&i.status!=="in-progress")return-1;if(i.status==="in-progress"&&s.status!=="in-progress")return 1;const a={pending:0,"in-progress":0,completed:1,skipped:1};if(a[s.status]!==a[i.status])return a[s.status]-a[i.status];const n=s.startTime?.split(":").map(Number)||[0,0],o=i.startTime?.split(":").map(Number)||[0,0];return n[0]*60+n[1]-(o[0]*60+o[1])});return`
      <div class="routine-section">
        <div class="routine-header">
          <h3 class="adventure-log-section-title">
            <i class="fa fa-sun-o" aria-hidden="true"></i>
            Today's Routine
          </h3>
          <div class="routine-progress">
            <span class="routine-progress-text">${e.completedCount}/${e.total}</span>
            <div class="routine-progress-bar">
              <div class="routine-progress-fill" style="width: ${e.progressPercent}%"></div>
            </div>
          </div>
        </div>
        
        <div class="routine-list">
          ${t.map(s=>this.renderRoutineItem(s)).join("")}
        </div>
      </div>
    `}renderRoutineItem(e){const t=u[e.type]||{icon:"fa-circle",color:"#888",label:"Block"},s=e.status==="completed",i=e.status==="in-progress",a=e.status==="skipped";let n="routine-item-pending",o="fa-circle-o";s?(n="routine-item-completed",o="fa-check-circle"):i?(n="routine-item-active",o="fa-play-circle"):a&&(n="routine-item-skipped",o="fa-times-circle");const r=e.startTime||"",d=e.duration?`${e.duration}min`:"";return`
      <div class="routine-item ${n}" data-block-id="${e.id}" data-block-type="${e.type}">
        <div class="routine-item-type-indicator" style="background-color: ${t.color}"></div>
        <button class="routine-toggle" title="${s?"Completed!":i?"In progress":a?"Skipped":"Mark complete"}" ${s||a?"disabled":""}>
          <i class="fa ${o}" aria-hidden="true"></i>
        </button>
        <div class="routine-item-content">
          <div class="routine-item-header">
            <span class="routine-item-title">${e.title||t.label}</span>
            <span class="routine-item-time">${r}</span>
          </div>
          <div class="routine-item-meta">
            <span class="routine-item-type" style="color: ${t.color}">
              <i class="fa ${t.icon}" aria-hidden="true"></i>
              ${t.label}
            </span>
            ${d?`<span class="routine-item-duration"><i class="fa fa-clock-o"></i> ${d}</span>`:""}
          </div>
        </div>
      </div>
    `}getCompletedQuests(){let t=(l()||[]).filter(n=>n.status==="complete"||n.isCompleted);this.filters.type!=="all"&&(t=t.filter(n=>n.type===this.filters.type));const s=Date.now(),i={today:s-1440*60*1e3,week:s-10080*60*1e3,month:s-720*60*60*1e3,all:0},a=i[this.filters.dateRange]||i.week;if(a>0&&(t=t.filter(n=>(n.completedAt||n.dateCompleted||0)>=a)),this.filters.searchQuery){const n=this.filters.searchQuery.toLowerCase();t=t.filter(o=>(o.title||"").toLowerCase().includes(n)||(o.description||"").toLowerCase().includes(n))}return t.sort((n,o)=>(o.completedAt||o.dateCompleted||0)-(n.completedAt||n.dateCompleted||0)),t}groupQuestsByDate(e){const t={};return e.forEach(s=>{const a=(s.completedAt||s.dateCompleted?new Date(s.completedAt||s.dateCompleted):new Date).toISOString().split("T")[0];t[a]||(t[a]=[]),t[a].push(s)}),t}calculateTodayStats(e){const t=new Date().toISOString().split("T")[0],s=e.filter(a=>{const n=a.completedAt||a.dateCompleted;return(n?new Date(n).toISOString().split("T")[0]:"")===t}),i=s.reduce((a,n)=>a+(n.xpReward||n.rewards?.xp||0),0);return{questsCompleted:s.length,xpEarned:i}}calculateWeeklyStats(e){const t=[0,0,0,0,0,0,0],s=new Date;return e.forEach(i=>{const a=i.completedAt||i.dateCompleted;if(!a)return;const n=new Date(a),o=Math.floor((s-n)/(1440*60*1e3));if(o>=0&&o<7){const r=i.xpReward||i.rewards?.xp||0;t[6-o]+=r}}),{dailyXp:t,totalXp:t.reduce((i,a)=>i+a,0)}}getTaskMetadata(e){const t=[],s=e.estimation?.durationMinutes||e.duration||e.durationMinutes,i=e.estimation?.complexity||e.complexity;return s&&t.push(`${s} min`),i&&t.push(`Effort ${i}/5`),t}formatDate(e){const t=new Date(e),s=new Date,i=new Date(s);i.setDate(i.getDate()-1);const a=t.toISOString().split("T")[0],n=s.toISOString().split("T")[0],o=i.toISOString().split("T")[0];return a===n?"Today":a===o?"Yesterday":t.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}getDayLabel(e,t=!1){const s=t?["S","M","T","W","T","F","S"]:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i=new Date,a=new Date(i);return a.setDate(i.getDate()-(6-e)),s[a.getDay()]}getQuestTypeLabel(e){return{daily:"Recurring",general:"Task",weekly:"Weekly",story:"Milestone"}[e]||"Task"}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}export{y as AdventureLogDashboard};
