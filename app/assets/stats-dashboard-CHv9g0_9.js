import{_ as q}from"./vendor-codemirror-DUfYp2mG.js";import{a7 as E,a8 as H,a9 as I}from"./index-QHYFmtLO.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";const B=60*1e3,L=60*B,C=24*L,V=3,U=7;let $=null;async function O(){return $||($=q(()=>import("./vendor-chart-CSZ8dA-i.js"),[],import.meta.url).catch(x=>{throw $=null,x})),$}class z{constructor(t,s={}){this.root=t||null,this.options=s,this.state=s.state||E,this.reviewSystem=null,this.reviewSystemResolver=typeof s.getReviewSystem=="function"?s.getReviewSystem:H,this.skillFilter="all",this.cachedSkillClassifications=null,this.trendChartModulePromise=null,this.xpTrendChart=null,this.skillDistributionChart=null;const e=typeof navigator<"u"&&navigator.language?navigator.language:"en-US";this.numberFormatter=new Intl.NumberFormat(e,{maximumFractionDigits:0}),this.preciseNumberFormatter=new Intl.NumberFormat(e,{maximumFractionDigits:2}),this.customStatDialog=null,this.customStatDialogRefs=null,this.customStatDialogMode=null,this.customStatDialogStatId=null,this.boundRefresh=this.refresh.bind(this),this.boundQuestRefresh=this.refresh.bind(this),this.boundSkillSystemRefresh=this.refresh.bind(this),this.boundReviewSessionComplete=this.refresh.bind(this),this.boundRootClick=this.handleRootClick.bind(this),this.boundRootChange=this.handleRootChange.bind(this),this.boundCustomStatFormSubmit=this.handleCustomStatFormSubmit.bind(this),this.boundCustomStatDialogCancel=this.handleCustomStatDialogCancel.bind(this),this.boundCustomStatDialogClick=this.handleCustomStatDialogClick.bind(this),this.boundCustomStatDialogKeydown=this.handleCustomStatDialogKeydown.bind(this),this.isInitialized=!1,this.isDestroyed=!1}async initialize(){return this.isDestroyed?(console.warn("[StatsDashboard] Attempted to initialize after destroy"),!1):this.root?(this.isInitialized||(this.renderSkeleton(),this.root.addEventListener("click",this.boundRootClick),this.root.addEventListener("change",this.boundRootChange),this.attachGlobalListeners(),this.refresh(),this.isInitialized=!0),!0):(console.warn("[StatsDashboard] Missing root element for initialization"),!1)}destroy(){this.isDestroyed||(this.detachGlobalListeners(),this.root&&(this.root.removeEventListener("click",this.boundRootClick),this.root.removeEventListener("change",this.boundRootChange)),this.xpTrendChart&&(this.xpTrendChart.destroy(),this.xpTrendChart=null),this.skillDistributionChart&&(this.skillDistributionChart.destroy(),this.skillDistributionChart=null),this.customStatDialog&&(this.customStatDialog.remove(),this.customStatDialog=null,this.customStatDialogRefs=null),this.isInitialized=!1,this.isDestroyed=!0)}openCustomStatDialog(t={}){const s=this.ensureCustomStatDialog();if(!s||!this.customStatDialogRefs)return;const{title:e,submitButton:a,detailSection:i,valueSection:o,confirmSection:r,confirmMessage:n,valueHint:c,inputs:l,panel:d,form:f,stepField:g}=this.customStatDialogRefs,u=t.mode||"create",m=t.stat||null;if(this.customStatDialogMode=u,this.customStatDialogStatId=m?.id||null,s.dataset.mode=u,(u==="edit"||u==="value"||u==="delete")&&!m){console.warn("[StatsDashboard] openCustomStatDialog missing stat for mode",u),this.customStatDialogMode=null,this.customStatDialogStatId=null;return}f&&f.reset();const h=u==="create"?"skill":m?.statType||"skill";switch(l.icon&&(l.icon.value="✨"),l.unit&&(l.unit.value=h==="skill"?"lvl":""),l.step&&(l.step.value="1"),l.statType&&(l.statType.value=h,l.statType.disabled=u!=="create"),l.trackingMode&&(l.trackingMode.value=m?.tracking?.mode||"manual",this.updateCustomStatDialogTrackingUi(l.trackingMode.value||"manual")),c&&(c.textContent=""),n&&(n.textContent=""),i&&(i.hidden=!0),o&&(o.hidden=!0),r&&(r.hidden=!0),a&&(a.textContent="Save",a.classList.remove("custom-stat-dialog__primary--danger")),u){case"create":{e&&(e.textContent="Add Skill"),a&&(a.textContent="Create Skill"),i&&(i.hidden=!1);break}case"edit":{e&&(e.textContent="Edit Custom Stat"),a&&(a.textContent="Save Changes"),i&&(i.hidden=!1),l.name&&(l.name.value=m.name||""),l.icon&&(l.icon.value=m.icon||"✨"),l.unit&&(l.unit.value=m.unit||(h==="skill"?"lvl":"")),l.category&&(l.category.value=m.category||""),l.trackingMode&&(l.trackingMode.value=m.tracking?.mode||"manual",this.updateCustomStatDialogTrackingUi(l.trackingMode.value||"manual")),l.step&&Number.isFinite(m.step)&&(l.step.value=String(m.step)),l.goal&&(l.goal.value=m.goal===null||m.goal===void 0?"":String(m.goal)),l.description&&(l.description.value=m.description||"");break}case"value":{if(e&&(e.textContent=`Set Value: ${m.name}`),a&&(a.textContent="Save Value"),o&&(o.hidden=!1),l.value&&(l.value.value=m.value===void 0||m.value===null?"":String(m.value)),c){const p=m.unit?` ${m.unit}`:"",S=Number.isFinite(m.value)?this.preciseNumberFormatter.format(m.value):"0";c.textContent=`Current value: ${S}${p}`}break}case"delete":{e&&(e.textContent="Delete Custom Stat"),r&&(r.hidden=!1),n&&(n.textContent=`Delete "${m.name}"? This action cannot be undone.`),a&&(a.textContent="Delete",a.classList.add("custom-stat-dialog__primary--danger"));break}default:return}if(g){const p=h!=="skill";g.style.display=p?"":"none"}d&&(d.scrollTop=0),s.classList.add("is-open"),s.setAttribute("aria-hidden","false"),document.addEventListener("keydown",this.boundCustomStatDialogKeydown),window.requestAnimationFrame(()=>{if(!this.customStatDialogRefs)return;let p=null;u==="value"?p=this.customStatDialogRefs.inputs.value:u==="delete"?p=a:p=this.customStatDialogRefs.inputs.name,p&&typeof p.focus=="function"&&p.focus()})}async updateXpTrendChart(t){const s=this.root?.querySelector('[data-role="xp-trend-chart"]'),e=this.root?.querySelector('[data-role="xp-trend-empty"]');if(!s)return;if(!(Array.isArray(t?.dailyXp)&&t.dailyXp.some(c=>c>0))){e&&(e.style.display="block"),s.style.display="none",this.xpTrendChart&&(this.xpTrendChart.destroy(),this.xpTrendChart=null);return}s.style.display="block",e&&(e.style.display="none");const i=await this.ensureChartModule();if(!i||!this.root)return;const o=i?.default||i?.Chart||i;if(!o){console.warn("[StatsDashboard] Chart.js constructor missing");return}const r=t.dayLabels||[],n=t.dailyXp||[];if(this.xpTrendChart)this.xpTrendChart.data.labels=r,this.xpTrendChart.data.datasets[0].data=n,this.xpTrendChart.update("none");else{const c=s.getContext("2d");if(!c)return;this.xpTrendChart=new o(c,{type:"line",data:{labels:r,datasets:[{label:"Effort",data:n,borderColor:"rgba(124, 91, 255, 0.9)",backgroundColor:"rgba(124, 91, 255, 0.2)",pointBackgroundColor:"#ffffff",pointBorderColor:"rgba(124, 91, 255, 0.9)",pointRadius:3,pointHoverRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{display:!1},ticks:{color:"rgba(183, 188, 197, 0.85)"}},y:{beginAtZero:!0,grid:{color:"rgba(255, 255, 255, 0.04)"},ticks:{precision:0,color:"rgba(183, 188, 197, 0.85)"}}},plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(12, 14, 20, 0.9)",titleColor:"#ffffff",bodyColor:"#ffffff",borderColor:"rgba(124, 91, 255, 0.6)",borderWidth:1,callbacks:{label:l=>`${l.parsed.y} effort`}}}}})}}async updateSkillDistributionChart(t){const s=this.root?.querySelector('[data-role="skill-distribution-chart"]'),e=this.root?.querySelector('[data-role="skill-distribution-empty"]');if(!s)return;if(!(Array.isArray(t?.skillDistribution)&&t.skillDistribution.some(l=>(l?.share||0)>0))){e&&(e.style.display="block"),s.style.display="none",this.skillDistributionChart&&(this.skillDistributionChart.destroy(),this.skillDistributionChart=null);return}s.style.display="block",e&&(e.style.display="none");const i=await this.ensureChartModule();if(!i||!this.root)return;const o=i?.default||i?.Chart||i;if(!o){console.warn("[StatsDashboard] Chart.js constructor missing");return}const r=t.skillDistribution.map(l=>l.name),n=t.skillDistribution.map(l=>l.share),c=this.getSkillDistributionPalette(r.length);if(this.skillDistributionChart)this.skillDistributionChart.data.labels=r,this.skillDistributionChart.data.datasets[0].data=n,this.skillDistributionChart.data.datasets[0].backgroundColor=c,this.skillDistributionChart.update("none");else{const l=s.getContext("2d");if(!l)return;this.skillDistributionChart=new o(l,{type:"doughnut",data:{labels:r,datasets:[{data:n,backgroundColor:c,borderColor:"rgba(12, 14, 20, 0.9)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{color:"rgba(183, 188, 197, 0.9)",boxWidth:12}},tooltip:{backgroundColor:"rgba(12, 14, 20, 0.95)",titleColor:"#ffffff",bodyColor:"#ffffff",callbacks:{label:d=>`${d.label}: ${d.parsed}%`}}}}})}}async ensureChartModule(){return this.trendChartModulePromise?this.trendChartModulePromise:(this.trendChartModulePromise=O().catch(t=>(console.error("[StatsDashboard] Failed to load chart module",t),this.trendChartModulePromise=null,null)),this.trendChartModulePromise)}getSkillDistributionPalette(t){const s=["#7C5BFF","#06B6D4","#F97316","#22C55E","#FACC15","#EC4899","#38BDF8"],e=[];for(let a=0;a<t;a++)e.push(s[a%s.length]);return e}renderSkeleton(){this.root.innerHTML=`
			<section class="stats-dashboard">
				<div class="stats-dashboard__top-metrics">
					<article class="metric-card">
						<header>Effort Today</header>
						<div id="stats-metric-xp-today" class="metric-value">0</div>
						<p id="stats-metric-quests-today" class="metric-sub">0 tasks completed</p>
					</article>
					<article class="metric-card">
						<header>Consistency</header>
						<div id="stats-metric-streak" class="metric-value">0d</div>
						<p class="metric-sub">Keep recurring work consistent</p>
					</article>
					<article class="metric-card">
						<header>Progress</header>
						<div class="metric-progress">
							<div class="metric-progress-bar">
								<div id="stats-metric-level-progress-bar" class="metric-progress-fill" style="width:0%"></div>
							</div>
							<div id="stats-metric-level-progress" class="metric-progress-label">0%</div>
						</div>
						<p class="metric-sub">Stage <span id="stats-metric-level">1</span></p>
					</article>
				</div>

				<div class="stats-dashboard__hero">
					<div class="hero-profile">
						<div class="hero-profile__header">
							<h3 id="stat-player-name">Profile</h3>
							<span class="hero-level-chip">
								<span class="hero-level-label">Stage</span>
								<span id="stat-player-level" class="hero-level-value">1</span>
							</span>
						</div>
						<div id="stat-player-title" class="hero-profile__title">Progress profile</div>
						<div class="hero-profile__xp">
							<div class="hero-xp-values">
								<span id="stat-player-xp">0</span>
								<span class="hero-xp-separator">/</span>
								<span id="stat-player-xp-next">100</span>
								<span class="hero-xp-label">effort</span>
							</div>
							<div class="hero-xp-bar">
								<div id="stat-xp-bar" class="hero-xp-bar-fill" style="width:0%"></div>
							</div>
						</div>
						<div class="hero-progress-highlights">
							<div class="hero-progress-item">
								<span class="hero-progress-label">Effort This Week</span>
								<div class="hero-progress-value">
									<span data-role="progress-weekly-xp-value">0</span>
									<span class="hero-progress-delta hero-progress-delta--neutral" data-role="progress-weekly-xp-delta">—</span>
								</div>
								<span class="hero-progress-sub" data-role="progress-weekly-xp-sub">Last week: 0 effort</span>
							</div>
							<div class="hero-progress-item">
								<span class="hero-progress-label">Tasks Completed</span>
								<div class="hero-progress-value">
									<span data-role="progress-weekly-quests-value">0</span>
									<span class="hero-progress-delta hero-progress-delta--neutral" data-role="progress-weekly-quests-delta">—</span>
								</div>
								<span class="hero-progress-sub" data-role="progress-weekly-quests-sub">Last week: 0</span>
							</div>
							<div class="hero-progress-item">
								<span class="hero-progress-label">Consistency</span>
								<div class="hero-progress-value">
									<span data-role="progress-streak-current">0d</span>
									<span class="hero-progress-delta hero-progress-delta--neutral" data-role="progress-streak-delta">—</span>
								</div>
								<span class="hero-progress-sub" data-role="progress-streak-sub">Previous best: 0d</span>
							</div>
						</div>
					</div>
				</div>

				<section class="stats-dashboard__performance" aria-label="Skill overview">
					<header class="section-header">
						<div>
							<h4 class="section-title">Tracked Skills</h4>
							<p id="stats-skillset-name" class="section-subtitle">0 / 6 slots used</p>
						</div>
						<div class="performance-controls">
							<select class="skill-template-picker" data-role="skill-template-picker" aria-label="Add preset skill to dashboard">
								<option value="">Add preset skill...</option>
							</select>
							<button class="section-action" type="button" data-action="skill-add-custom">
								<i class="fa fa-plus" aria-hidden="true"></i>
								New skill
							</button>
						</div>
					</header>
					<div data-role="performance-grid" class="performance-grid"></div>
					<div data-role="custom-stats-list" class="custom-stats-grid"></div>
				</section>

				<section class="stats-dashboard__goals" aria-label="Goals">
					<h4 class="section-title">Goals</h4>
					<div data-role="goals" class="goals-list"></div>
				</section>

				<div class="stats-dashboard__legacy-hooks" aria-hidden="true">
					<span id="stat-knowledge"></span>
					<span id="stat-discipline"></span>
					<span id="stat-discipline-streak"></span>
					<span id="stat-focus"></span>
					<span id="stat-creativity"></span>
					<span id="stat-exploration"></span>
					<span id="stat-resilience"></span>
				</div>
			</section>
		`}attachGlobalListeners(){window.addEventListener("quest:completed",this.boundQuestRefresh),this.ensureCustomStatDialog(),document.addEventListener("quests-updated",this.boundQuestRefresh),window.addEventListener("skill-system:updated",this.boundSkillSystemRefresh),window.addEventListener("review:session-complete",this.boundReviewSessionComplete),window.addEventListener("courses:updated",this.boundRefresh),window.addEventListener("custom-stats:updated",this.boundRefresh),window.addEventListener("core-stats:updated",this.boundRefresh),window.addEventListener("primary-stats:updated",this.boundRefresh)}detachGlobalListeners(){window.removeEventListener("quest:completed",this.boundQuestRefresh),document.removeEventListener("quests-updated",this.boundQuestRefresh),window.removeEventListener("skill-system:updated",this.boundSkillSystemRefresh),window.removeEventListener("review:session-complete",this.boundReviewSessionComplete),window.removeEventListener("courses:updated",this.boundRefresh),window.removeEventListener("custom-stats:updated",this.boundRefresh),window.removeEventListener("core-stats:updated",this.boundRefresh),window.removeEventListener("primary-stats:updated",this.boundRefresh)}refresh(){if(this.root)try{const t=this.calculateMetrics();this.updateTopMetrics(t),this.renderProgressHighlights(t.progressHighlights),this.renderPerformanceGrid({primaryStats:t.primaryStats,skillSummaries:t.skillSummaries,skillTypeStats:t.skillTypeStats,activeSkillSetName:t.activeSkillSetName,skillTemplates:t.skillTemplates,skillCount:t.skillCount,skillLimit:t.skillLimit}),this.renderCustomStats(t.customStats),this.renderGoals(t.goals)}catch(t){console.error("[StatsDashboard] Failed to refresh",t)}}calculateMetrics(){const t=this.state.getPlayerStats?this.state.getPlayerStats():{},s=this.state.getCourses?this.state.getCourses():[],e=this.state.getCustomStats?this.state.getCustomStats():[],a=typeof this.state.getSkillTypeStats=="function"?this.state.getSkillTypeStats():e.filter(v=>v.statType==="skill"),i=typeof this.state.getPrimaryStats=="function"?this.state.getPrimaryStats():this.buildLegacyPrimaryStats(t,e),o=typeof this.state.getSkillTemplates=="function"?this.state.getSkillTemplates():[],r=typeof this.state.getSkillLimit=="function"?this.state.getSkillLimit():6,n=Array.isArray(a)?a.length:0,c=this.collectCourseReviewStats(s),l=this.buildReviewSummary(c),d=this.getCompletedQuests(),f=new Date().toISOString().split("T")[0],g=d.filter(v=>{const k=v.completedAt||v.dateCompleted||0;return k?new Date(k).toISOString().split("T")[0]===f:!1}),u=g.reduce((v,k)=>v+this.getQuestXpValue(k),0),m=t?.level||1,h=t?.xp||0,p=t?.xpToNextLevel||100,S=p>0?Math.max(0,Math.min(100,Math.round(h/p*100))):0,w=this.buildSkillSummariesFromStats(a),y=this.calculateWeeklyPerformance(d),b={weeklyXp:y.xp,weeklyQuests:y.quests,streak:{current:t?.disciplineStreak||0,previous:t?.lastStreakBeforeBreak||0}};return{player:t,xpToday:u,questsToday:g.length,level:m,xpCurrent:h,xpToNext:p,levelProgressPercent:S,streakDays:t?.disciplineStreak||0,skillSummaries:w,skillTypeStats:a,activeSkillSetName:n>0?"Your Skills":"No skills yet",progressHighlights:b,reviewSummary:l,goals:this.buildGoalsSummary(s,c),customStats:e,primaryStats:i,skillTemplates:o,skillCount:n,skillLimit:r}}updateTopMetrics(t){this.setText("#stats-metric-xp-today",t.xpToday);const s=t.questsToday===1?"task":"tasks";this.setText("#stats-metric-quests-today",`${t.questsToday} ${s} completed`),this.setText("#stats-metric-streak",`${t.streakDays||0}d`),this.setText("#stats-metric-level",t.level||1),this.setText("#stats-metric-level-progress",`${t.levelProgressPercent}%`);const e=this.root.querySelector("#stats-metric-level-progress-bar");e&&(e.style.width=`${t.levelProgressPercent}%`);const a=this.root.querySelector("#stat-xp-bar");a&&(a.style.width=`${t.levelProgressPercent}%`),this.setText("#stat-player-xp",t.xpCurrent||0),this.setText("#stat-player-xp-next",t.xpToNext||0)}buildSkillSummariesFromStats(t=[]){if(!Array.isArray(t)||t.length===0)return[];const s=Date.now();return t.map((e,a)=>{const i=e&&typeof e.progress=="object"?e.progress:{},o=Number(i.level),r=Number.isFinite(o)&&o>0?o:1,n=Number(i.totalPoints),c=Number.isFinite(n)&&n>=0?n:Number.isFinite(Number(e?.value))?Number(e.value):0,l=Number(i.pointsIntoCurrentLevel),d=Number.isFinite(l)&&l>=0?l:0,f=Number(i.pointsRequiredForNextLevel),g=Number.isFinite(f)&&f>0?f:5,u=Number(i.lastAllocatedAt),m=Number(e?.updatedAt),h=Number.isFinite(u)&&u>0?u:Number.isFinite(m)&&m>0?m:null,p=h?Math.floor((s-h)/C):null,S=Math.max(0,g-d),w=g>0?Math.max(0,Math.min(100,d/g*100)):0,y=e?.tracking&&typeof e.tracking=="object"&&e.tracking.mode||"manual",b=e?.templateKey||e?.templateId||e?.templateRef||null;return{id:e?.id||e?.slug||`skill-${a+1}`,name:e?.name||"Unnamed Skill",category:e?.category||"",icon:e?.icon||"⭐",unit:e?.unit||"lvl",color:e?.color||"",level:r,totalPoints:c,lastAllocatedAt:h,daysSinceAllocation:p,pointsIntoCurrentLevel:d,pointsRequiredForNextLevel:g,nextMilestonePoints:S,progressPercent:w,isCustomSkill:!b,trackingMode:y,templateKey:b,sourceStat:e}})}buildSkillCard(t,s){const e=Math.min(100,Math.max(0,Math.round(t.progressPercent))),a=t.nextMilestonePoints>0?`${t.nextMilestonePoints} pts to next milestone`:"Milestone reached!",i=t.lastAllocatedAt?this.formatRelativeDate(t.lastAllocatedAt):"No allocations yet",o=this.buildSkillBadges(t,s),r=["skill-card"];s.focusSkillIds.has(t.id)&&r.push("skill-card--focus"),s.recentSkillIds.has(t.id)&&r.push("skill-card--recent"),s.laggingSkillIds.has(t.id)&&r.push("skill-card--lagging"),t.isCustomSkill&&r.push("skill-card--custom");const n=t.trackingMode&&t.trackingMode!=="manual"?`<span class="skill-card__tracking-badge" title="Tracking: ${t.trackingMode}">${this.escapeHtml(t.trackingMode)}</span>`:"";return`
			<article class="${r.join(" ")}" data-skill-id="${t.id}">
				<header class="skill-card__header">
					<div class="skill-card__identity">
						<span class="skill-card__icon">${t.icon||"⭐"}</span>
						<div>
							<h5 class="skill-card__name">${this.escapeHtml(t.name)}</h5>
							<span class="skill-card__category">${this.escapeHtml(t.category||"")}</span>
						</div>
					</div>
					<div class="skill-card__header-right">
						<span class="skill-card__level">Lv ${t.level}</span>
						${n}
					</div>
				</header>
				${o.length?`<div class="skill-card__badges">${o.join("")}</div>`:""}
				<div class="skill-card__progress">
					<div class="skill-card__progress-bar">
						<div class="skill-card__progress-fill" style="width:${e}%"></div>
					</div>
					<div class="skill-card__progress-text">${t.pointsIntoCurrentLevel}/${t.pointsRequiredForNextLevel} pts</div>
				</div>
				<div class="skill-card__meta">
					<span class="skill-card__meta-item">Total: ${t.totalPoints}</span>
					<span class="skill-card__meta-item">${i}</span>
				</div>
				<footer class="skill-card__footer">${a}</footer>
			</article>
		`}renderTrends(t){if(!t)return;const s=this.root.querySelector("#stats-xp-total-week");s&&(s.textContent=`${t.totalXpWeek} effort this week`),t&&(this.updateXpTrendChart(t).catch(e=>{console.error("[StatsDashboard] Failed to render XP trend chart",e)}),this.updateSkillDistributionChart(t).catch(e=>{console.error("[StatsDashboard] Failed to render skill distribution chart",e)}))}renderCallouts(t){const s=this.root.querySelector('[data-role="callout-list"]');if(s){if(!t.length){s.innerHTML='<li class="callout-empty">Balanced progress. Keep going.</li>';return}s.innerHTML=t.map(e=>`
			<li class="callout-item ${e.action?"callout-item--actionable":""}">
				<span class="callout-icon">${e.icon}</span>
				<div class="callout-text">
					<strong>${e.title}</strong>
					<p>${e.message}</p>
				</div>
				${e.action?`
					<button type="button" class="callout-action-btn" data-action="${e.action}" data-role="open-skill-panel">
						${e.actionLabel||"Allocate"}
					</button>
				`:""}
			</li>
		`).join("")}}renderGoals(t){const s=this.root.querySelector('[data-role="goals"]');if(s){if(!t.length){s.innerHTML=`
				<div class="goals-empty">
					Set a mastery deadline from the course sidebar to start tracking your goals here.
				</div>
			`;return}s.innerHTML=t.map(e=>{const a=this.escapeHtml(e.status||"on-track"),i=e.statusLabel?this.escapeHtml(e.statusLabel):"",o=["goal-card",`goal-card--${a}`].join(" "),r=i?`<span class="goal-card__status goal-card__status--${a}">${i}</span>`:"";return`
				<article class="${o}">
					<header class="goal-card__header">
						<h5>${this.escapeHtml(e.title)}</h5>
						${r}
					</header>
					<p>${this.escapeHtml(e.description)}</p>
					<div class="goal-progress">
						<div class="goal-progress-bar">
							<div class="goal-progress-fill" style="width:${e.progressPercent}%"></div>
						</div>
						<span class="goal-progress-label">${e.progressPercent}%</span>
					</div>
					<footer class="goal-card__footer">${this.escapeHtml(e.deadlineLabel)}</footer>
				</article>
			`}).join("")}}renderPerformanceGrid(t={}){const s=this.root?.querySelector('[data-role="performance-grid"]');if(!s)return;const{primaryStats:e=[],skillSummaries:a=[],skillTypeStats:i=[],activeSkillSetName:o="",skillTemplates:r=[],skillCount:n=0,skillLimit:c=6}=t,l=this.root?.querySelector('[data-role="skill-template-picker"]');if(l){const m=new Set(i.map(b=>String(b.name||"").trim().toLowerCase()).filter(Boolean)),h='<option value="">Add preset skill...</option>';let p=!1;const S=r.map(b=>{const v=m.has(String(b.name||"").trim().toLowerCase());p=p||!v;const k=b.icon?`${this.escapeHtml(b.icon)} `:"";return`<option value="${this.escapeHtml(b.key)}" ${v?"disabled":""}>${k}${this.escapeHtml(b.name)}</option>`}).join("");l.innerHTML=`${h}${S}`;const y=n>=c||!p;l.disabled=y,l.classList.toggle("primary-stat-picker--empty",y)}const d=`${Math.min(n,c)} / ${c} slots used`;this.setText("#stats-skillset-name",o?`${o} · ${d}`:d);const f=[],g=this.buildPrimaryStatCards(e);g&&f.push(g);const u=Array.isArray(a)&&a.length?[...a]:this.buildSkillSummariesFromStats(i);if(u.length){const m=this.classifySkills(u);this.cachedSkillClassifications=m,this.updateSkillFilterUI()}else this.cachedSkillClassifications=null,this.updateSkillFilterUI();if(!f.length){s.innerHTML="";return}s.innerHTML=f.join("")}buildPrimaryStatCards(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((s,e)=>{const a=s?.source==="custom"?"custom":"core",i=a==="custom",o=this.escapeHtml(s?.id||`primary-${e}`),r=i?s?.stat||{}:s,n=this.escapeHtml((i?r.icon:s?.icon)||(i?"✨":"⭐")),c=this.escapeHtml((i?r.name:s?.name)||(i?"Custom Stat":s?.key||"Stat")),l=i?r.unit:s?.unit,d=l?` ${this.escapeHtml(l)}`:"",f=i?r.value:s?.value,g=Number.isFinite(Number(f))?Number(f):0,u=this.preciseNumberFormatter.format(g),m=i?r.description:s?.description,h=m?`<p class="primary-stat-card__description">${this.escapeHtml(m)}</p>`:"",p=i?'<span class="primary-stat-card__badge">Custom</span>':'<span class="primary-stat-card__badge primary-stat-card__badge--core">Core</span>',S=i?this.getCustomStatDelta(r):null,w=S?`<span class="primary-stat-card__delta primary-stat-card__delta--${S.tone}">${this.escapeHtml(S.label)}</span>`:"",y=i?`<button type="button" class="primary-stat-card__button" data-action="primary-set" data-stat-source="custom" data-custom-stat-id="${this.escapeHtml(r.id)}">Set value</button>`:`<button type="button" class="primary-stat-card__button" data-action="primary-set" data-stat-source="core" data-core-stat-key="${this.escapeHtml(s?.key)}">Set value</button>`,b=i?`<button type="button" class="primary-stat-card__button" data-action="primary-remove" data-custom-stat-id="${this.escapeHtml(r.id)}" data-stat-ref="${o}">Unpin</button>`:`<button type="button" class="primary-stat-card__button" data-action="primary-hide" data-core-stat-key="${this.escapeHtml(s?.key)}" data-stat-ref="${o}">Hide</button>`,v=`<button type="button" class="primary-stat-card__icon-button" data-action="primary-move" data-direction="up" data-stat-ref="${o}" title="Move ${c} earlier">&uarr;</button>`,k=`<button type="button" class="primary-stat-card__icon-button" data-action="primary-move" data-direction="down" data-stat-ref="${o}" title="Move ${c} later">&darr;</button>`;return`
				<article class="primary-stat-card ${i?"primary-stat-card--custom":"primary-stat-card--core"}" data-stat-ref="${o}" data-stat-source="${a}">
					<header class="primary-stat-card__header">
						<span class="primary-stat-card__icon">${n}</span>
						<div class="primary-stat-card__titles">
							<h5>${c}</h5>
							${p}
						</div>
					</header>
					<div class="primary-stat-card__value">
						<span class="primary-stat-card__value-number">${u}${d}</span>
						${w}
					</div>
					${h}
					<footer class="primary-stat-card__footer">
						<div class="primary-stat-card__reorder">
							${v}
							${k}
						</div>
						<div class="primary-stat-card__actions">
							${y}
							${b}
						</div>
					</footer>
				</article>
			`}).join("")}getCustomStatDelta(t={}){const s=Array.isArray(t?.history)?t.history:[],e=s.length>1?s[s.length-2]:null;if(!e)return{label:"—",tone:"neutral"};const a=Number.isFinite(Number(t.value))?Number(t.value):0,i=Number.isFinite(Number(e?.value))?Number(e.value):0;return this.formatDelta(a,i,{style:"absolute",unitLabel:t.unit||""})}renderCustomStats(t=[]){const s=this.root?.querySelector('[data-role="custom-stats-list"]');if(!s)return;if(!Array.isArray(t)||!t.length){s.innerHTML=`
				<div class="custom-stats-empty">
					Create a skill to track practice, focus, or any capability you want to improve.
				</div>
			`;return}const e=a=>{const i=Math.abs(a||1);return Number.isInteger(i)?this.formatNumber(i):this.preciseNumberFormatter.format(i)};s.innerHTML=t.map(a=>{const i=a?.statType||"skill",o=this.escapeHtml(a.id),r=a.isPrimary?"Unpin":"Pin",n=a.isPrimary?"Remove from primary dashboard":"Pin to primary dashboard",c=a.isPrimary?'<span class="custom-stat-card__badge">Pinned</span>':"",l=a.description?`<p class="custom-stat-card__description">${this.escapeHtml(a.description)}</p>`:"",d=a.updatedAt?this.formatRelativeDate(a.updatedAt):"Just added";if(i==="skill"){const S=a&&typeof a.progress=="object"?a.progress:{},w=Number(S.level),y=Number.isFinite(w)&&w>0?Math.floor(w):1,b=Number(S.totalPoints??a.value),v=Number.isFinite(b)&&b>0?b:0,k=Number(S.pointsIntoCurrentLevel),_=Number.isFinite(k)&&k>0?k:0,M=Number(S.pointsRequiredForNextLevel),D=Number.isFinite(M)&&M>0?M:Math.max(_,10),N=Math.max(0,D-_),T=y+1,R=D>0?Math.min(100,Math.max(0,Math.round(_/D*100))):0,P=`${this.preciseNumberFormatter.format(v)} pts total`,F=`${this.preciseNumberFormatter.format(_)} / ${this.preciseNumberFormatter.format(D)} pts this stage`,A=N>0?`${this.preciseNumberFormatter.format(N)} pts to stage ${this.formatNumber(T)}`:"Ready for the next stage.";return`
					<article class="custom-stat-card custom-stat-card--skill" data-custom-stat-id="${o}">
						<header class="custom-stat-card__header">
							<span class="custom-stat-card__icon">${this.escapeHtml(a.icon||"✨")}</span>
							<div class="custom-stat-card__titles">
								<h5>${this.escapeHtml(a.name)}</h5>
								${c}
							</div>
							<div class="custom-stat-card__actions">
								<button type="button" class="custom-stat-card__icon-button custom-stat-card__pin" data-action="custom-stat-toggle-primary" data-custom-stat-id="${o}" data-primary="${a.isPrimary?"true":"false"}" title="${this.escapeHtml(n)}" aria-label="${this.escapeHtml(r)} skill">
									<i class="fa ${a.isPrimary?"fa-star":"fa-star-o"}" aria-hidden="true"></i>
								</button>
								<button type="button" class="custom-stat-card__icon-button custom-stat-card__edit" data-action="custom-stat-edit" data-custom-stat-id="${o}" title="Edit skill" aria-label="Edit skill">
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</button>
							</div>
						</header>
						${l}
						<div class="custom-stat-card__value custom-stat-card__value--skill">
							<span class="custom-stat-card__value-number">Stage ${this.escapeHtml(this.formatNumber(y))}</span>
							<span class="custom-stat-card__skill-total">${this.escapeHtml(P)}</span>
						</div>
						<div class="custom-stat-card__skill-progress">
							<div class="custom-stat-card__skill-bar">
								<div class="custom-stat-card__skill-bar-fill" style="width: ${R}%"></div>
							</div>
							<div class="custom-stat-card__skill-progress-meta">
								<span>${this.escapeHtml(F)}</span>
								<span>${this.escapeHtml(A)}</span>
							</div>
						</div>
						<footer class="custom-stat-card__footer">
							<span>${this.escapeHtml(d)}</span>
							<button type="button" class="custom-stat-card__icon-button custom-stat-card__delete" data-action="custom-stat-delete" data-custom-stat-id="${o}" title="Delete skill" aria-label="Delete skill">
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</footer>
					</article>
				`}const f=a.unit?` ${this.escapeHtml(a.unit)}`:"",g=Number.isFinite(a?.value)?a.value:0,u=this.getCustomStatDelta(a),m=Number.isFinite(a.goal)?`<div class="custom-stat-card__goal">Goal: ${this.preciseNumberFormatter.format(a.goal)}${f}</div>`:"",h=Number.isFinite(a.step)?a.step:1,p=e(h);return`
				<article class="custom-stat-card" data-custom-stat-id="${o}">
					<header class="custom-stat-card__header">
						<span class="custom-stat-card__icon">${this.escapeHtml(a.icon||"✨")}</span>
						<div class="custom-stat-card__titles">
							<h5>${this.escapeHtml(a.name)}</h5>
							${a.unit?`<span class="custom-stat-card__unit">${this.escapeHtml(a.unit)}</span>`:""}
							${c}
						</div>
						<div class="custom-stat-card__actions">
							<button type="button" class="custom-stat-card__icon-button custom-stat-card__pin" data-action="custom-stat-toggle-primary" data-custom-stat-id="${o}" data-primary="${a.isPrimary?"true":"false"}" title="${this.escapeHtml(n)}" aria-label="${this.escapeHtml(r)} stat">
								<i class="fa ${a.isPrimary?"fa-star":"fa-star-o"}" aria-hidden="true"></i>
							</button>
							<button type="button" class="custom-stat-card__icon-button custom-stat-card__edit" data-action="custom-stat-edit" data-custom-stat-id="${o}" title="Edit stat" aria-label="Edit stat">
								<i class="fa fa-pencil" aria-hidden="true"></i>
							</button>
						</div>
					</header>
					${l}
					<div class="custom-stat-card__value">
						<span class="custom-stat-card__value-number">${this.preciseNumberFormatter.format(g)}${f}</span>
						<span class="custom-stat-card__delta custom-stat-card__delta--${u.tone}">${this.escapeHtml(u.label)}</span>
					</div>
					${m}
					<div class="custom-stat-card__controls">
						<button type="button" data-action="custom-stat-decrement" data-custom-stat-id="${o}" data-step="${Math.abs(h)}" title="Decrease by ${p}${f}">-${p}</button>
						<button type="button" data-action="custom-stat-set" data-custom-stat-id="${o}">Set</button>
						<button type="button" data-action="custom-stat-increment" data-custom-stat-id="${o}" data-step="${Math.abs(h)}" title="Increase by ${p}${f}">+${p}</button>
					</div>
					<footer class="custom-stat-card__footer">
						<span>${this.escapeHtml(d)}</span>
						<button type="button" class="custom-stat-card__icon-button custom-stat-card__delete" data-action="custom-stat-delete" data-custom-stat-id="${o}" title="Delete stat" aria-label="Delete stat">
							<i class="fa fa-trash-o" aria-hidden="true"></i>
						</button>
					</footer>
				</article>
			`}).join("")}ensureCustomStatDialog(){if(!this.root||this.customStatDialog)return this.customStatDialog;const t=document.createElement("template");t.innerHTML=`
			<div class="custom-stat-dialog" data-role="custom-stat-dialog" aria-hidden="true">
				<div class="custom-stat-dialog__overlay" data-action="custom-stat-dialog-close"></div>
				<div class="custom-stat-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="custom-stat-dialog-title" tabindex="-1">
					<form data-role="custom-stat-form">
						<header class="custom-stat-dialog__header">
							<h5 id="custom-stat-dialog-title" data-role="custom-stat-dialog-title">Custom Stat</h5>
							<button type="button" class="custom-stat-dialog__close" data-action="custom-stat-dialog-close" aria-label="Close dialog">&times;</button>
						</header>
						<div class="custom-stat-dialog__body">
							<section class="custom-stat-dialog__section" data-section="details">
								<div class="custom-stat-dialog__field">
									<label for="custom-stat-name">Name</label>
									<input id="custom-stat-name" name="customStatName" type="text" maxlength="80" autocomplete="off" placeholder="Deep Work Hours" aria-required="true">
								</div>
								<div class="custom-stat-dialog__field-group">
									<div class="custom-stat-dialog__field">
										<label for="custom-stat-type">Type</label>
										<select id="custom-stat-type" name="customStatType">
											<option value="stat">Numeric Stat</option>
											<option value="skill">Progress Skill</option>
										</select>
									</div>
									<div class="custom-stat-dialog__field">
										<label for="custom-stat-category">Category</label>
										<input id="custom-stat-category" name="customStatCategory" type="text" maxlength="40" autocomplete="off" placeholder="Work, Fitness, etc.">
									</div>
								</div>
								<div class="custom-stat-dialog__field">
									<label for="custom-stat-tracking-mode">Tracking Mode</label>
									<select id="custom-stat-tracking-mode" name="customStatTrackingMode">
										<option value="manual">Manual (set values manually)</option>
										<option value="quest-feed">Task Feed (updates from task completion)</option>
									</select>
									<p class="custom-stat-dialog__hint" data-role="tracking-mode-hint">Manual tracking lets you set values directly.</p>
								</div>
								<div class="custom-stat-dialog__field-group">
									<div class="custom-stat-dialog__field">
										<label for="custom-stat-icon">Icon</label>
										<input id="custom-stat-icon" name="customStatIcon" type="text" maxlength="4" autocomplete="off" placeholder="✨">
									</div>
									<div class="custom-stat-dialog__field">
										<label for="custom-stat-unit">Unit</label>
										<input id="custom-stat-unit" name="customStatUnit" type="text" maxlength="16" autocomplete="off" placeholder="hrs">
									</div>
									<div class="custom-stat-dialog__field" data-field="step">
										<label for="custom-stat-step">Step</label>
										<input id="custom-stat-step" name="customStatStep" type="number" step="any" min="0.0001" placeholder="1">
									</div>
								</div>
								<div class="custom-stat-dialog__field">
									<label for="custom-stat-goal">Goal</label>
									<input id="custom-stat-goal" name="customStatGoal" type="number" step="any" placeholder="Leave blank for none">
								</div>
								<div class="custom-stat-dialog__field">
									<label for="custom-stat-description">Description</label>
									<textarea id="custom-stat-description" name="customStatDescription" rows="3" placeholder="Optional context to remember what you track."></textarea>
								</div>
							</section>
							<section class="custom-stat-dialog__section" data-section="value" hidden>
								<div class="custom-stat-dialog__field">
									<label for="custom-stat-value">Set value</label>
									<input id="custom-stat-value" name="customStatValue" type="number" step="any" placeholder="Enter a number">
									<p class="custom-stat-dialog__hint" data-role="custom-stat-value-hint"></p>
								</div>
							</section>
							<section class="custom-stat-dialog__section" data-section="confirm" hidden>
								<p data-role="custom-stat-confirm-message"></p>
							</section>
						</div>
						<footer class="custom-stat-dialog__footer">
							<button type="button" class="custom-stat-dialog__secondary" data-action="custom-stat-dialog-cancel">Cancel</button>
							<button type="submit" class="custom-stat-dialog__primary" data-role="custom-stat-dialog-submit">Save</button>
						</footer>
					</form>
				</div>
			</div>
		`;const s=t.content.firstElementChild;if(!s)return null;this.root.appendChild(s);const e=s.querySelector('[data-role="custom-stat-form"]'),a=s.querySelector('[data-section="details"]'),i=s.querySelector('[data-section="value"]'),o=s.querySelector('[data-section="confirm"]'),r=s.querySelector("#custom-stat-type"),n=s.querySelector("#custom-stat-tracking-mode"),c=s.querySelector('[data-field="step"]'),l=s.querySelector('[data-role="tracking-mode-hint"]');return this.customStatDialog=s,this.customStatDialogRefs={dialog:s,form:e,title:s.querySelector('[data-role="custom-stat-dialog-title"]'),submitButton:s.querySelector('[data-role="custom-stat-dialog-submit"]'),detailSection:a,valueSection:i,confirmSection:o,confirmMessage:s.querySelector('[data-role="custom-stat-confirm-message"]'),valueHint:s.querySelector('[data-role="custom-stat-value-hint"]'),panel:s.querySelector(".custom-stat-dialog__panel"),trackingModeHint:l,stepField:c,inputs:{name:s.querySelector("#custom-stat-name"),icon:s.querySelector("#custom-stat-icon"),unit:s.querySelector("#custom-stat-unit"),step:s.querySelector("#custom-stat-step"),goal:s.querySelector("#custom-stat-goal"),description:s.querySelector("#custom-stat-description"),value:s.querySelector("#custom-stat-value"),statType:r,category:s.querySelector("#custom-stat-category"),trackingMode:n}},e&&(e.setAttribute("novalidate","novalidate"),e.noValidate=!0),r&&r.addEventListener("change",()=>{const d=r.value==="skill";c&&(c.style.display=d?"none":"")}),n&&n.addEventListener("change",()=>{this.updateCustomStatDialogTrackingUi(n.value)}),e&&e.addEventListener("submit",this.boundCustomStatFormSubmit),s.addEventListener("click",this.boundCustomStatDialogClick),s.querySelectorAll('[data-action="custom-stat-dialog-cancel"]').forEach(d=>{d.addEventListener("click",this.boundCustomStatDialogCancel)}),this.customStatDialog}closeCustomStatDialog(){this.customStatDialog&&(this.customStatDialog.classList.remove("is-open"),this.customStatDialog.setAttribute("aria-hidden","true"),document.removeEventListener("keydown",this.boundCustomStatDialogKeydown),this.customStatDialogMode=null,this.customStatDialogStatId=null)}handleCustomStatFormSubmit(t){t.preventDefault();const s=this.customStatDialogMode;if(!s||!this.customStatDialogRefs)return;const{inputs:e}=this.customStatDialogRefs,a=this.customStatDialogStatId;if(s==="create"||s==="edit"){const i=e.name?.value.trim();if(!i){window.showStatusMessage&&window.showStatusMessage("Name is required for custom skills.","warning"),e.name?.focus();return}const o=e.icon?.value.trim(),r=e.unit?.value.trim(),n=e.step?.value.trim(),c=e.goal?.value.trim(),l=e.description?.value.trim(),d=e.category?.value.trim(),f=s==="edit"&&a&&this.findCustomStat(a)?.statType||"skill",g=e.statType?.value||f,u=["skill","stat"].includes(g)?g:f,m=e.trackingMode?.value||"manual",h=n?parseFloat(n):NaN,p=Number.isFinite(h)&&h!==0?h:1,S=c?parseFloat(c):null,y={name:i,icon:o||"✨",unit:u==="skill"?r||"lvl":r||"",description:l||"",category:d||"",statType:u,tracking:{mode:m,metricId:null,questFilter:null}};if(u!=="skill"&&(y.step=p),S!==null&&Number.isFinite(S)?y.goal=S:y.goal=null,s==="create"){const b=typeof this.state.createCustomStat=="function"?this.state.createCustomStat(y):null;if(b?.success){this.persistCustomStatsChange();const v=u==="skill"?"skill":"stat",k=m==="quest-feed"?" (task-tracked)":"";window.showStatusMessage&&window.showStatusMessage(`Added custom ${v} "${i}"${k}`,"success"),this.closeCustomStatDialog()}else if(window.showStatusMessage){const k={"limit-reached":"Skill limit reached. Remove an existing skill first.",default:`Could not create custom ${u==="skill"?"skill":"stat"}.`},_=k[b?.reason]||k.default;window.showStatusMessage(_,b?.reason==="limit-reached"?"warning":"error")}}else if(s==="edit"){if(!a)return;if(typeof this.state.updateCustomStat=="function"?this.state.updateCustomStat(a,y):!1){if(this.persistCustomStatsChange(),window.showStatusMessage){const v=u==="skill"?"skill":"stat";window.showStatusMessage(`Updated custom ${v} "${i}"`,"success")}this.closeCustomStatDialog()}else if(window.showStatusMessage){const v=u==="skill"?"skill":"stat";window.showStatusMessage(`Could not update custom ${v}.`,"error")}}return}if(s==="value"){if(!a)return;const i=e.value?.value.trim(),o=i===""?NaN:parseFloat(i);if(!Number.isFinite(o)){window.showStatusMessage&&window.showStatusMessage("Enter a valid number for the stat value.","warning"),e.value?.focus();return}if(typeof this.state.setCustomStatValue=="function"?this.state.setCustomStatValue(a,o):!1){this.persistCustomStatsChange();const n=this.findCustomStat(a);if(window.showStatusMessage&&n){const c=n.unit?` ${n.unit}`:"";window.showStatusMessage(`Set ${n.name} to ${this.preciseNumberFormatter.format(o)}${c}`,"success")}this.closeCustomStatDialog()}else window.showStatusMessage&&window.showStatusMessage("Could not update stat value.","error");return}if(s==="delete"){if(!a)return;const i=this.findCustomStat(a);(typeof this.state.deleteCustomStat=="function"?this.state.deleteCustomStat(a):!1)?(this.persistCustomStatsChange(),window.showStatusMessage&&i&&window.showStatusMessage(`Deleted custom stat "${i.name}"`,"success"),this.closeCustomStatDialog()):window.showStatusMessage&&window.showStatusMessage("Could not delete custom stat.","error")}}handleCustomStatDialogCancel(t){t.preventDefault(),this.closeCustomStatDialog()}handleCustomStatDialogClick(t){const s=t.target.closest("[data-action]");if(s&&s.dataset.action==="custom-stat-dialog-close"){this.closeCustomStatDialog();return}}handleCustomStatDialogKeydown(t){t.key==="Escape"&&this.closeCustomStatDialog()}updateCustomStatDialogTrackingUi(t){if(!this.customStatDialogRefs)return;const s=this.customStatDialogRefs,e={manual:"Manual tracking lets you set values directly.","quest-feed":"Task feed automatically updates when you complete tasks. Skills gain effort-based points, stats increment by 1."};s.trackingModeHint&&(s.trackingModeHint.textContent=e[t]||"")}persistCustomStatsChange(){this.persistStateChange()}persistStateChange(){typeof window.saveData=="function"?window.saveData():typeof window.saveDataImmediate=="function"?window.saveDataImmediate():typeof window.saveDataDebounced=="function"&&window.saveDataDebounced()}findCustomStat(t){return!t||typeof this.state.getCustomStats!="function"?null:this.state.getCustomStats().find(e=>e.id===t)||null}promptAddCustomStat(){this.promptAddSkill()}promptAddSkill(){if(typeof this.state.createCustomStat!="function"){console.warn("[StatsDashboard] Skill creation is unavailable in the current state context");return}const t=typeof this.state.getSkillLimit=="function"?this.state.getSkillLimit():6,s=typeof this.state.getCurrentSkillCount=="function"?this.state.getCurrentSkillCount():(()=>{const e=typeof this.state.getSkillTypeStats=="function"?this.state.getSkillTypeStats():[];return Array.isArray(e)?e.length:0})();if(Number.isFinite(t)&&Number.isFinite(s)&&s>=t){window.showStatusMessage&&window.showStatusMessage(`You can add up to ${t} skills. Remove one before adding another.`,"warning");return}this.openCustomStatDialog({mode:"create"})}promptEditCustomStat(t){const s=this.findCustomStat(t);if(!s){console.warn("[StatsDashboard] Cannot edit missing custom stat",t),window.showStatusMessage&&window.showStatusMessage("Custom stat could not be found.","warning");return}this.openCustomStatDialog({mode:"edit",stat:s})}promptSetCustomStatValue(t){const s=this.findCustomStat(t);if(!s){console.warn("[StatsDashboard] Cannot set value for missing custom stat",t),window.showStatusMessage&&window.showStatusMessage("Custom stat could not be found.","warning");return}if((s.statType||"skill")==="skill"){window.showStatusMessage&&window.showStatusMessage("Skill progress updates automatically. Edit the skill to adjust its tracking.","info");return}this.openCustomStatDialog({mode:"value",stat:s})}confirmDeleteCustomStat(t){const s=this.findCustomStat(t);if(!s){window.showStatusMessage&&window.showStatusMessage("Custom stat could not be found.","warning");return}this.openCustomStatDialog({mode:"delete",stat:s})}toggleCustomStatPrimary(t){if(!t)return;const s=this.findCustomStat(t);if(!s){window.showStatusMessage&&window.showStatusMessage("Custom stat could not be found.","warning");return}const e=!s.isPrimary;let a={success:!1};if(e&&typeof this.state.addCustomStatToPrimary=="function"?a=this.state.addCustomStatToPrimary(s.id)||{success:!1}:!e&&typeof this.state.removeCustomStatFromPrimary=="function"&&(a=this.state.removeCustomStatFromPrimary(s.id)||{success:!1}),a.success){if(this.persistStateChange(),window.showStatusMessage){const i=e?`Pinned "${s.name}" to the primary dashboard.`:`Removed "${s.name}" from the primary dashboard.`;window.showStatusMessage(i,"success")}}else window.showStatusMessage&&e&&a.reason==="max-primary-limit"?window.showStatusMessage("You can pin up to 6 primary stats. Unpin another stat first.","warning"):window.showStatusMessage&&window.showStatusMessage("Could not update stat pinning.","error")}addSkillFromTemplate(t){if(!t)return;if(typeof this.state.createSkillFromTemplate!="function"){console.warn("[StatsDashboard] Skill templates are unavailable in the current state context");return}const s=typeof this.state.getSkillLimit=="function"?this.state.getSkillLimit():6,e=typeof this.state.getCurrentSkillCount=="function"?this.state.getCurrentSkillCount():(()=>{const i=typeof this.state.getSkillTypeStats=="function"?this.state.getSkillTypeStats():[];return Array.isArray(i)?i.length:0})();if(Number.isFinite(s)&&Number.isFinite(e)&&e>=s){window.showStatusMessage&&window.showStatusMessage(`You can add up to ${s} skills. Remove one before adding another.`,"warning");return}const a=this.state.createSkillFromTemplate(t)||{success:!1};if(!a.success){const i=a.reason||"unknown";if(window.showStatusMessage){const o={"limit-reached":"Skill limit reached. Remove an existing skill first.","template-not-found":"That skill template is unavailable.",default:"Could not add the default skill."};window.showStatusMessage(o[i]||o.default,"error")}return}if(this.persistStateChange(),window.showStatusMessage){const i=a.stat?.name||t;window.showStatusMessage(`Added default skill "${i}".`,"success")}this.refresh()}addCoreStatToPrimary(t){if(!t||typeof this.state.setCoreStatVisibility!="function")return;if(this.state.setCoreStatVisibility(t,!0)){if(this.persistStateChange(),window.showStatusMessage){const i=(typeof this.state.getCoreStatOptions=="function"?this.state.getCoreStatOptions():this.buildLegacyCoreStatOptions()).find(o=>o.key===t)?.name||t;window.showStatusMessage(`Added "${i}" to the primary dashboard.`,"success")}}else if(window.showStatusMessage){const e=typeof this.state.getPrimaryStatLimit=="function"?this.state.getPrimaryStatLimit():6,a=typeof this.state.getPrimaryStats=="function"?this.state.getPrimaryStats():[];Array.isArray(a)&&a.length>=e?window.showStatusMessage(`You can pin up to ${e} primary stats. Unpin another stat first.`,"warning"):window.showStatusMessage("Could not add stat to dashboard.","error")}}hideCoreStat(t){if(!t||typeof this.state.setCoreStatVisibility!="function")return;if(this.state.setCoreStatVisibility(t,!1)){if(this.persistStateChange(),window.showStatusMessage){const i=(typeof this.state.getCoreStatOptions=="function"?this.state.getCoreStatOptions():this.buildLegacyCoreStatOptions()).find(o=>o.key===t)?.name||t;window.showStatusMessage(`Hidden "${i}" from the primary dashboard.`,"info")}}else window.showStatusMessage&&window.showStatusMessage("Could not hide the stat.","error")}promptSetCoreStatValue(t){if(!t)return;const s=this.state.getPlayerStats?this.state.getPlayerStats():{},a=(typeof this.state.getCoreStatOptions=="function"?this.state.getCoreStatOptions():this.buildLegacyCoreStatOptions(s)).find(d=>d.key===t)||{name:t},i=Number.isFinite(Number(s?.[t]))?Number(s[t]):0,o=`${a.name||t} value`,r=window.prompt(`Set ${o}`,String(i));if(r===null)return;const n=r.trim(),c=n===""?NaN:Number(n);if(!Number.isFinite(c)){window.showStatusMessage&&window.showStatusMessage("Enter a valid number for the stat value.","warning");return}(typeof this.state.setStatValue=="function"?this.state.setStatValue(t,c):!1)?(this.persistStateChange(),window.showStatusMessage&&window.showStatusMessage(`Set ${a.name||t} to ${this.preciseNumberFormatter.format(c)}.`,"success")):window.showStatusMessage&&window.showStatusMessage("Could not update stat value.","error")}changeCustomStatValue(t,s){if(!t||!Number.isFinite(s))return;const e=this.findCustomStat(t);if(!e){window.showStatusMessage&&window.showStatusMessage("Custom stat could not be found.","warning");return}if((e.statType||"skill")==="skill"){window.showStatusMessage&&window.showStatusMessage("Skill levels come from activity, not manual adjustments.","info");return}typeof this.state.incrementCustomStat=="function"&&(this.state.incrementCustomStat(t,s),this.persistCustomStatsChange())}renderProgressHighlights(t={}){if(!this.root)return;const s=t?.weeklyXp||{current:0,previous:0},e=t?.weeklyQuests||{current:0,previous:0},a=t?.streak||{current:0,previous:0},i=this.root.querySelector('[data-role="progress-weekly-xp-value"]');i&&(i.textContent=this.formatNumber(s.current));const o=this.root.querySelector('[data-role="progress-weekly-xp-delta"]');if(o){const u=this.formatDelta(s.current,s.previous,{unitLabel:"effort"});o.textContent=u.label,o.className=`hero-progress-delta hero-progress-delta--${u.tone}`}const r=this.root.querySelector('[data-role="progress-weekly-xp-sub"]');r&&(r.textContent=s.previous>0?`Last week: ${this.formatNumber(s.previous)} effort`:"No effort recorded last week");const n=this.root.querySelector('[data-role="progress-weekly-quests-value"]');n&&(n.textContent=this.formatNumber(e.current));const c=this.root.querySelector('[data-role="progress-weekly-quests-delta"]');if(c){const u=this.formatDelta(e.current,e.previous,{unitLabel:"tasks"});c.textContent=u.label,c.className=`hero-progress-delta hero-progress-delta--${u.tone}`}const l=this.root.querySelector('[data-role="progress-weekly-quests-sub"]');if(l){const u=e.previous===1?"task":"tasks";l.textContent=e.previous>0?`Last week: ${this.formatNumber(e.previous)} ${u}`:"No tasks completed last week"}const d=this.root.querySelector('[data-role="progress-streak-current"]');d&&(d.textContent=`${this.formatNumber(a.current)}d`);const f=this.root.querySelector('[data-role="progress-streak-delta"]');if(f){const u=this.formatDelta(a.current,a.previous,{style:"absolute",unitLabel:"days"});f.textContent=u.label,f.className=`hero-progress-delta hero-progress-delta--${u.tone}`}const g=this.root.querySelector('[data-role="progress-streak-sub"]');g&&(g.textContent=a.previous>0?`Previous best: ${this.formatNumber(a.previous)}d`:"Build your first consistency run")}buildLegacyCoreStatOptions(t={}){return[{key:"knowledge",name:"Knowledge",icon:"📚",unit:"pts",description:"Legacy knowledge stat."},{key:"discipline",name:"Discipline",icon:"🛡️",unit:"pts",description:"Legacy discipline stat."},{key:"focus",name:"Focus",icon:"🎯",unit:"pts",description:"Legacy focus stat."},{key:"creativity",name:"Creativity",icon:"🎨",unit:"pts",description:"Legacy creativity stat."},{key:"exploration",name:"Exploration",icon:"🧭",unit:"pts",description:"Legacy exploration stat."},{key:"resilience",name:"Resilience",icon:"💪",unit:"pts",description:"Legacy resilience stat."}].map((e,a)=>({key:e.key,name:e.name,icon:e.icon,unit:e.unit,description:e.description,hidden:!1,order:a}))}buildLegacyPrimaryStats(t={},s=[]){const e=this.buildLegacyCoreStatOptions(t),a=e.map((i,o)=>({id:`core:${i.key}`,source:"core",key:i.key,name:i.name,icon:i.icon,unit:i.unit,description:i.description,value:Number.isFinite(Number(t?.[i.key]))?Number(t[i.key]):0,step:1,slug:i.key,order:o}));return s.filter(i=>i?.isPrimary).forEach((i,o)=>{a.push({id:`custom:${i.id}`,source:"custom",key:i.id,stat:i,step:i.step,order:e.length+o})}),a}buildSkillSummaries(t,s){return!t||!Array.isArray(t.skills)?[]:t.skills.map(e=>{const a=s?.[e.id]||{},i=a.pointsIntoCurrentLevel||0,o=a.pointsRequiredForNextLevel||1,r=a.totalPoints||0,n=i/o*100,c=Math.max(0,(a.pointsRequiredForNextLevel||0)-i),l=a.lastAllocatedAt||null,d=l?Math.floor((Date.now()-l)/C):null;return{id:e.id,name:e.name,category:e.category,icon:e.icon,level:a.level||1,totalPoints:r,lastAllocatedAt:l,daysSinceAllocation:d,pointsIntoCurrentLevel:i,pointsRequiredForNextLevel:a.pointsRequiredForNextLevel||0,nextMilestonePoints:c,progressPercent:n}})}classifySkills(t){const s=new Set,e=new Set,a=new Set;if(t.length){const i=[...t].sort((o,r)=>(r.totalPoints||0)-(o.totalPoints||0));i.slice(0,Math.min(2,i.length)).forEach(o=>{(o.totalPoints||0)>0&&s.add(o.id)}),i.slice(-2).forEach(o=>{const r=o.daysSinceAllocation??1/0;((o.totalPoints||0)===0||r>=U)&&e.add(o.id)}),t.forEach(o=>{o.lastAllocatedAt&&(o.daysSinceAllocation??1/0)<=V&&a.add(o.id)})}return{focusSkillIds:s,recentSkillIds:a,laggingSkillIds:e}}filterSkills(t,s){switch(this.skillFilter){case"focus":return t.filter(e=>s.focusSkillIds.has(e.id));case"recent":return t.filter(e=>s.recentSkillIds.has(e.id));case"lagging":return t.filter(e=>s.laggingSkillIds.has(e.id));default:return t}}buildSkillBadges(t,s){const e=[];return s.focusSkillIds.has(t.id)&&e.push('<span class="skill-card__badge skill-card__badge--focus">Focus Skill</span>'),s.recentSkillIds.has(t.id)&&e.push('<span class="skill-card__badge skill-card__badge--recent">Recent Boost</span>'),s.laggingSkillIds.has(t.id)&&e.push('<span class="skill-card__badge skill-card__badge--lagging">Needs Attention</span>'),e}updateSkillFilterUI(){this.root.querySelectorAll("[data-skill-filter]").forEach(s=>{const e=s.dataset.skillFilter===this.skillFilter;s.classList.toggle("is-active",e),s.setAttribute("aria-pressed",String(e))})}buildTrends(t,s){const e=this.calculateDailyXp(t,7),a=this.buildDayLabels(e.length),i=e.reduce((n,c)=>n+c,0),o=s.reduce((n,c)=>n+(c.totalPoints||0),0),r=o>0?s.map(n=>({name:n.name,share:Math.round((n.totalPoints||0)/o*100)})):[];return{dailyXp:e,dayLabels:a,totalXpWeek:i,skillDistribution:r}}buildCallouts(t,s,e=null){const a=[];if(s>0&&a.push({icon:"⚡",title:"Spend Pending Points",message:`You have ${s} unallocated point${s===1?"":"s"}. Allocate them to boost your skills.`,action:"allocate-skills",actionLabel:"Allocate Points"}),e&&e.totalDueCards>0){const n=e.heaviestCourse?.course?.name||"your queue",c=e.totalDueCards>10?`You have ${e.totalDueCards} cards waiting. Start with ${n}.`:`You have ${e.totalDueCards} card${e.totalDueCards===1?"":"s"} ready. Review ${n} next.`;a.push({icon:"🧠",title:e.totalDueCards>10?"Review Backlog":"Reviews Ready",message:c})}t.filter(r=>!r.lastAllocatedAt||Date.now()-r.lastAllocatedAt>5*C).sort((r,n)=>(r.lastAllocatedAt||0)-(n.lastAllocatedAt||0)).slice(0,2).forEach(r=>{const n=r.lastAllocatedAt?Math.floor((Date.now()-r.lastAllocatedAt)/C):null,c=n!==null?`${r.name} hasn’t received points for ${n} day${n===1?"":"s"}.`:`${r.name} has not been upgraded yet.`;a.push({icon:"🧭",title:"Balance Your Skills",message:c})});const o=[...t].sort((r,n)=>(n.totalPoints||0)-(r.totalPoints||0));if(o.length>=2){const r=o[0],n=o[o.length-1];(r.totalPoints||0)-(n.totalPoints||0)>=5&&a.push({icon:"⚖️",title:"Skill Imbalance",message:`${r.name} is far ahead of ${n.name}. Consider reinforcing support skills.`})}return a.slice(0,3)}buildGoalsSummary(t,s=null){if(!Array.isArray(t)||t.length===0)return[];const e=s?null:this.resolveReviewSystem(),a=Date.now();return t.filter(o=>o&&o.isCramming&&o.cramUntilDate).map(o=>{const r=Number(o.cramUntilDate);if(!Number.isFinite(r)||r<=0)return null;let n=s?.[o.id]?.stats||null;if(!n&&e&&typeof e.getCourseReviewStats=="function")try{n=e.getCourseReviewStats(o.id)}catch(v){console.warn("[StatsDashboard] Failed to fetch review stats for course goal",o?.id,v)}const c=n?.totalCards??0,l=n?.ignoredCards??0,d=n?.dueCards??0,f=n?.reviewedCards??0,g=Math.max(0,c-l),u=g>0?Math.round(f/g*100):0,m=Math.max(0,Math.min(100,u)),h=g>0?`${f} / ${g} cards ready`:"Add cards to start tracking mastery",p=d>0?`${d} due now`:"All caught up",S=[h];(d>0||g>0)&&S.push(p),r<=a&&S.push("Deadline exceeded");const w=r-a;let y="on-track",b="On track";return r<=a?(y="overdue",b="Overdue"):w<=C?(y="due-soon",b="Due tomorrow"):w<=3*C&&(y="due-soon",b="Due soon"),{title:o.name||"Untitled Course",description:S.join(" — "),progressPercent:m,deadlineLabel:this.formatDeadline(r),deadlineMs:r,status:y,statusLabel:b}}).filter(Boolean).sort((o,r)=>o.deadlineMs!==r.deadlineMs?o.deadlineMs-r.deadlineMs:r.progressPercent-o.progressPercent).map(o=>({title:o.title,description:o.description,progressPercent:o.progressPercent,deadlineLabel:o.deadlineLabel,status:o.status,statusLabel:o.statusLabel}))}calculateWeeklyPerformance(t){const e=this.calculateDailyXp(t,14),a=this.calculateDailyQuestCounts(t,14),i=e.length,o=Math.max(0,i-7),r=Math.max(0,o-7),n=this.sumArray(e.slice(o)),c=this.sumArray(e.slice(r,o)),l=this.sumArray(a.slice(o)),d=this.sumArray(a.slice(r,o));return{xp:{current:n,previous:c},quests:{current:l,previous:d}}}calculateDailyQuestCounts(t,s){const e=Array(s).fill(0);if(!Array.isArray(t)||s<=0)return e;const a=new Date;return a.setHours(0,0,0,0),t.forEach(i=>{const o=i?.completedAt??i?.dateCompleted;if(!o)return;const r=new Date(o);if(Number.isNaN(r.getTime()))return;r.setHours(0,0,0,0);const n=Math.round((a-r)/C);n>=0&&n<s&&(e[s-n-1]+=1)}),e}sumArray(t=[]){return t.reduce((s,e)=>s+(Number.isFinite(Number(e))?Number(e):0),0)}formatDelta(t,s,e={}){const{style:a="percent",unitLabel:i=""}=e,o=i?` ${i}`:"",r=Number.isFinite(Number(t))?Number(t):0,n=Number.isFinite(Number(s))?Number(s):0;if(a==="absolute"){if(n<=0)return r<=0?{label:"—",tone:"neutral"}:{label:`+${this.formatNumber(r)}${o}`,tone:"positive"};const d=r-n;if(d===0)return{label:`0${o}`,tone:"neutral"};const f=this.formatNumber(Math.abs(d));return{label:`${d>0?"+":"-"}${f}${o}`,tone:d>0?"positive":"negative"}}if(n<=0)return r<=0?{label:"—",tone:"neutral"}:{label:`+${this.formatNumber(r)}${o}`,tone:"positive"};const c=r-n,l=Math.round(c/n*100);return l===0?{label:"0%",tone:"neutral"}:{label:`${l>0?"+":""}${l}%`,tone:l>0?"positive":"negative"}}formatNumber(t){const s=Number.isFinite(Number(t))?Number(t):0;return this.numberFormatter.format(Math.round(s))}collectCourseReviewStats(t){const s=this.resolveReviewSystem();if(!s||typeof s.getCourseReviewStats!="function")return null;const e={};return t.forEach(a=>{if(!(!a||!a.id))try{const i=s.getCourseReviewStats(a.id);e[a.id]={course:a,stats:i}}catch(i){console.warn("[StatsDashboard] Failed to gather review stats for course",a?.id,i)}}),e}buildReviewSummary(t){if(!t)return null;let s=0,e=0,a=0,i=null;return Object.values(t).forEach(o=>{const r=o?.stats;if(!r)return;const n=Math.max(0,(r.totalCards||0)-(r.ignoredCards||0)),c=r.dueCards||0;e+=n,s+=c,c>0&&(a++,(!i||c>i.stats.dueCards)&&(i=o))}),{totalDueCards:s,totalActiveCards:e,coursesWithDue:a,heaviestCourse:i}}resolveReviewSystem(){if(this.reviewSystem)return this.reviewSystem;if(typeof this.reviewSystemResolver=="function"){const t=this.reviewSystemResolver();return t&&(this.reviewSystem=t),t||null}return null}formatDeadline(t){if(!Number.isFinite(t))return"No deadline";const s=Date.now(),e=t-s,a=Math.abs(e),i=new Date(t);if(e<=0){if(a<C)return`Deadline passed today (${i.toLocaleDateString()})`;const r=Math.ceil(a/C);return`Deadline passed ${r} day${r===1?"":"s"} ago (${i.toLocaleDateString()})`}if(e<C){const r=Math.max(1,Math.round(e/L));return`Due in ${r} hour${r===1?"":"s"}`}const o=Math.ceil(e/C);return o<=7?`Due in ${o} day${o===1?"":"s"}`:`Due ${i.toLocaleDateString()}`}handleRootChange(t){const s=t.target.closest('[data-role="skill-template-picker"]');if(s){const a=s.value;a&&this.addSkillFromTemplate(a),s.value="";return}const e=t.target.closest('[data-role="primary-core-picker"]');if(e){const a=e.value;a&&this.addCoreStatToPrimary(a),e.value="";return}}handleRootClick(t){if(t.target.closest('[data-action="skill-add-custom"]')){this.promptAddSkill();return}const e=t.target.closest("[data-skill-filter]");if(e){const h=e.dataset.skillFilter||"all";this.setSkillFilter(h);return}if(t.target.closest('[data-action="allocate-skills"]')){I();return}const i=t.target.closest('[data-action="primary-move"]');if(i){const h=i.dataset.statRef,p=i.dataset.direction||"down";h&&typeof this.state.movePrimaryStat=="function"&&this.state.movePrimaryStat(h,p)&&this.persistStateChange();return}const o=t.target.closest('[data-action="primary-set"]');if(o){const h=o.dataset.statSource;h==="core"?this.promptSetCoreStatValue(o.dataset.coreStatKey):h==="custom"&&this.promptSetCustomStatValue(o.dataset.customStatId);return}const r=t.target.closest('[data-action="primary-hide"]');if(r){this.hideCoreStat(r.dataset.coreStatKey);return}const n=t.target.closest('[data-action="primary-remove"]');if(n){this.toggleCustomStatPrimary(n.dataset.customStatId);return}if(t.target.closest('[data-action="custom-stat-add"]')){this.promptAddCustomStat();return}const l=t.target.closest('[data-action="custom-stat-toggle-primary"]');if(l){this.toggleCustomStatPrimary(l.dataset.customStatId);return}const d=t.target.closest('[data-action="custom-stat-increment"]');if(d){const h=d.dataset.customStatId,p=parseFloat(d.dataset.step||"1");this.changeCustomStatValue(h,Math.abs(Number.isFinite(p)?p:1));return}const f=t.target.closest('[data-action="custom-stat-decrement"]');if(f){const h=f.dataset.customStatId,p=parseFloat(f.dataset.step||"1");this.changeCustomStatValue(h,-Math.abs(Number.isFinite(p)?p:1));return}const g=t.target.closest('[data-action="custom-stat-set"]');if(g){this.promptSetCustomStatValue(g.dataset.customStatId);return}const u=t.target.closest('[data-action="custom-stat-edit"]');if(u){this.promptEditCustomStat(u.dataset.customStatId);return}const m=t.target.closest('[data-action="custom-stat-delete"]');m&&this.confirmDeleteCustomStat(m.dataset.customStatId)}setSkillFilter(t){const s=["all","focus","recent","lagging"].includes(t)?t:"all";s!==this.skillFilter&&(this.skillFilter=s,this.updateSkillFilterUI(),this.refresh())}calculateDailyXp(t,s){const e=Array(s).fill(0);if(!Array.isArray(t)||s<=0)return e;const a=new Date;return a.setHours(0,0,0,0),t.forEach(i=>{const o=i?.completedAt??i?.dateCompleted;if(!o)return;const r=new Date(o);if(Number.isNaN(r.getTime()))return;r.setHours(0,0,0,0);const n=Math.round((a-r)/C);if(n>=0&&n<s){const c=this.getQuestXpValue(i);e[s-n-1]+=c}}),e}buildDayLabels(t){const s=[];if(!t||t<=0)return s;const e=new Date;e.setHours(12,0,0,0);const a=new Intl.DateTimeFormat(typeof navigator<"u"&&navigator.language?navigator.language:"en-US",{weekday:"short"});for(let i=t-1;i>=0;i--){const o=new Date(e);o.setDate(e.getDate()-i),s.push(a.format(o))}return s}getCompletedQuests(){return(this.state.getQuests?this.state.getQuests():[]).filter(s=>s.isCompleted||s.status==="complete")}getQuestXpValue(t){return Math.max(0,t?.xpReward||t?.rewards?.xp||0)}formatRelativeDate(t){const s=Date.now()-t;if(s<C)return"Updated today";const e=Math.floor(s/C);return e===1?"Updated yesterday":`${e} days ago`}setText(t,s){const e=typeof t=="string"?this.root.querySelector(t):t;e&&(e.textContent=s)}escapeHtml(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}}export{z as StatsDashboard,z as default};
