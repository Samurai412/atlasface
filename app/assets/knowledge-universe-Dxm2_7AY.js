import{_ as w}from"./vendor-codemirror-DUfYp2mG.js";import{o as C,p as L,q as I}from"./index-wrzawYmd.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";let v=null,a=null;async function E(){if(a||(a=await I.load("three")),!v){const y=await w(()=>import("./vendor-graph-DwCx8zU5.js").then(e=>e._),[],import.meta.url);v=y.default||y}return{THREE:a,ForceGraph3D:v}}class S{constructor(){this.container=null,this.graph=null,this.graphData={nodes:[],links:[]},this.rawNodes=[],this.rawLinks=[],this.selectedNode=null,this.hoveredNode=null,this.isolatedNode=null,this.isVisible=!1,this.is2D=!1,this.animFrameId=null,this.starfield=null,this.ambientDust=null,this.activeFilters={relationshipTypes:new Set(["builds-on","prerequisite","explains","example","contradicts","related","is-related-to","default"]),courseId:"all",minConnections:0,searchQuery:""},this.settings={nodeRelSize:5,linkWidth:1.2,linkOpacity:.55,particleSpeed:.008,particleWidth:2.2,showParticles:!0,showLabels:!0,showStarfield:!0,autoRotate:!0,autoRotateSpeed:.45,repulsionStrength:-180,linkDistance:60,centeringStrength:.25,nodeColors:this.getThemeColors()},this.relationshipColors={"builds-on":"#10b981",prerequisite:"#f59e0b",prereq:"#f59e0b",explains:"#06b6d4",example:"#a855f7",contradicts:"#ef4444",related:"#38bdf8","is-related-to":"#38bdf8",default:"#6366f1"},this.init()}getThemeColors(){const t=document.documentElement.className.match(/theme-([\w-]+)/)?.[1]||"light",s={light:{node:"#4f46e5",nodeHighlight:"#6366f1",background:"#090d16",grid:"rgba(99, 102, 241, 0.08)",stars:"#ffffff",dust:"#818cf8",accent:"#4f46e5"},dark:{node:"#8b5cf6",nodeHighlight:"#a78bfa",background:"#07070f",grid:"rgba(139, 92, 246, 0.08)",stars:"#e2e8f0",dust:"#a855f7",accent:"#8b5cf6"},"atlas-dark":{node:"#3b82f6",nodeHighlight:"#60a5fa",background:"#060a12",grid:"rgba(59, 130, 246, 0.08)",stars:"#f8fafc",dust:"#38bdf8",accent:"#3b82f6"},athenaeum:{node:"#d4af37",nodeHighlight:"#f5d77f",background:"#080806",grid:"rgba(212, 175, 55, 0.08)",stars:"#fef08a",dust:"#eab308",accent:"#d4af37"},lain:{node:"#00ff41",nodeHighlight:"#5cff87",background:"#000000",grid:"rgba(0, 255, 65, 0.12)",stars:"#00ff41",dust:"#22c55e",accent:"#00ff41"},"solo-leveling":{node:"#9333ea",nodeHighlight:"#c084fc",background:"#05010a",grid:"rgba(147, 51, 234, 0.1)",stars:"#f3e8ff",dust:"#a855f7",accent:"#9333ea"},nonov:{node:"#e879f9",nodeHighlight:"#f5d0fe",background:"#0f0a14",grid:"rgba(232, 121, 249, 0.08)",stars:"#fae8ff",dust:"#f472b6",accent:"#e879f9"},lea:{node:"#10b981",nodeHighlight:"#34d399",background:"#030c08",grid:"rgba(16, 185, 129, 0.08)",stars:"#ecfdf5",dust:"#10b981",accent:"#10b981"},taz:{node:"#f97316",nodeHighlight:"#fb923c",background:"#0c0704",grid:"rgba(249, 115, 22, 0.08)",stars:"#ffedd5",dust:"#fb923c",accent:"#f97316"},eman:{node:"#06b6d4",nodeHighlight:"#22d3ee",background:"#040b10",grid:"rgba(6, 182, 212, 0.08)",stars:"#ecfeff",dust:"#06b6d4",accent:"#06b6d4"}};return s[t]||s.dark}init(){this.createContainer(),this.observeThemeChanges()}createContainer(){const e=document.getElementById("knowledge-universe");e&&e.remove();const t=document.createElement("div");t.id="knowledge-universe",t.innerHTML=`
            <div class="ku-background"></div>
            <div class="ku-graph-container" id="ku-graph"></div>

            <!-- Top Floating Command Bar -->
            <header class="ku-command-bar">
                <div class="ku-brand-group">
                    <div class="ku-brand-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/>
                            <circle cx="12" cy="12" r="4" fill="currentColor"/>
                            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)"/>
                        </svg>
                    </div>
                    <div class="ku-brand-meta">
                        <span class="ku-brand-title">Knowledge Universe</span>
                        <span class="ku-node-count" id="ku-node-count">0 nodes</span>
                    </div>
                </div>

                <!-- Central Search Module -->
                <div class="ku-search-module">
                    <div class="ku-search-input-wrap">
                        <svg class="ku-search-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" id="ku-search-input" placeholder="Search concepts or press /" autocomplete="off" spellcheck="false">
                        <kbd class="ku-search-kbd">/</kbd>
                    </div>
                    <div class="ku-search-results" id="ku-search-results"></div>
                </div>

                <!-- Command Actions -->
                <div class="ku-actions-group">
                    <button class="ku-action-btn" id="ku-btn-reset" title="Reset View [Space]" data-tooltip="Reset Camera">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M3 12h3M18 12h3M12 3v3M12 18v3"/>
                        </svg>
                    </button>
                    <button class="ku-action-btn ku-btn-toggle active" id="ku-btn-auto-rotate" title="Auto Orbit [A]" data-tooltip="Toggle Orbit">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                        </svg>
                    </button>
                    <button class="ku-action-btn ku-btn-toggle active" id="ku-btn-labels" title="Toggle Labels [L]" data-tooltip="Toggle Labels">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="4 7 4 4 20 4 20 7"/>
                            <line x1="9" y1="20" x2="15" y2="20"/>
                            <line x1="12" y1="4" x2="12" y2="20"/>
                        </svg>
                    </button>
                    <button class="ku-action-btn ku-btn-toggle active" id="ku-btn-particles" title="Flow Particles [P]" data-tooltip="Toggle Flow">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="6" cy="12" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="18" cy="12" r="2"/>
                        </svg>
                    </button>
                    <button class="ku-action-btn" id="ku-btn-2d-toggle" title="2D/3D Projection [2/3]" data-tooltip="Toggle 2D/3D">
                        <span class="ku-projection-badge" id="ku-projection-text">3D</span>
                    </button>
                    <div class="ku-divider-v"></div>
                    <button class="ku-action-btn ku-btn-close" id="ku-close" title="Close Universe [Esc]" data-tooltip="Exit Universe">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </header>

            <!-- Left HUD: Telemetry, Filters & Knowledge Hubs -->
            <aside class="ku-drawer ku-drawer-left" id="ku-left-drawer">
                <div class="ku-drawer-header">
                    <span class="ku-drawer-title">Network Telemetry</span>
                    <button class="ku-icon-btn" id="ku-left-toggle" title="Collapse Telemetry">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                    </button>
                </div>

                <div class="ku-drawer-scroll">
                    <!-- Metric Cards -->
                    <div class="ku-telemetry-grid">
                        <div class="ku-telemetry-card">
                            <span class="ku-tel-val" id="ku-stat-nodes">0</span>
                            <span class="ku-tel-lbl">Concepts</span>
                        </div>
                        <div class="ku-telemetry-card">
                            <span class="ku-tel-val" id="ku-stat-links">0</span>
                            <span class="ku-tel-lbl">Connections</span>
                        </div>
                        <div class="ku-telemetry-card">
                            <span class="ku-tel-val" id="ku-stat-density">0%</span>
                            <span class="ku-tel-lbl">Density</span>
                        </div>
                        <div class="ku-telemetry-card">
                            <span class="ku-tel-val" id="ku-stat-clusters">0</span>
                            <span class="ku-tel-lbl">Clusters</span>
                        </div>
                    </div>

                    <!-- Relationship Type Filter Chips -->
                    <div class="ku-section-group">
                        <div class="ku-group-header">
                            <span>Connection Matrix</span>
                            <button class="ku-text-btn" id="ku-filter-reset-links">All</button>
                        </div>
                        <div class="ku-filter-chips" id="ku-relationship-filters">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Course Filter Dropdown -->
                    <div class="ku-section-group">
                        <div class="ku-group-header">
                            <span>Course Scope</span>
                        </div>
                        <select class="ku-select" id="ku-course-select">
                            <option value="all">All Knowledge Domains</option>
                        </select>
                    </div>

                    <!-- Knowledge Hubs Leaderboard -->
                    <div class="ku-section-group">
                        <div class="ku-group-header">
                            <span>Knowledge Hubs</span>
                            <span class="ku-badge-sub">Top Degree</span>
                        </div>
                        <div class="ku-hubs-list" id="ku-hubs-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Force Physics Studio Accordion -->
                    <details class="ku-accordion" id="ku-physics-accordion">
                        <summary class="ku-accordion-summary">
                            <span>Physics Simulation</span>
                            <svg class="ku-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </summary>
                        <div class="ku-accordion-body">
                            <div class="ku-slider-row">
                                <label>Repulsion <span id="ku-val-repulsion">-180</span></label>
                                <input type="range" id="ku-slider-repulsion" min="-500" max="-50" step="10" value="-180">
                            </div>
                            <div class="ku-slider-row">
                                <label>Link Distance <span id="ku-val-distance">60</span></label>
                                <input type="range" id="ku-slider-distance" min="20" max="180" step="5" value="60">
                            </div>
                            <div class="ku-slider-row">
                                <label>Centering <span id="ku-val-gravity">0.25</span></label>
                                <input type="range" id="ku-slider-gravity" min="0.05" max="0.8" step="0.05" value="0.25">
                            </div>
                        </div>
                    </details>
                </div>
            </aside>

            <!-- Right HUD: Selected Concept Inspector -->
            <aside class="ku-drawer ku-drawer-right" id="ku-right-drawer">
                <div class="ku-drawer-header">
                    <span class="ku-drawer-title">Concept Inspector</span>
                    <button class="ku-icon-btn" id="ku-inspector-close" title="Close Inspector">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div class="ku-drawer-scroll" id="ku-inspector-body">
                    <div class="ku-empty-inspector" id="ku-inspector-empty">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <p>Select any node in the universe to inspect connections, hierarchy, and content.</p>
                    </div>

                    <div class="ku-inspector-content" id="ku-inspector-content" style="display: none;">
                        <div class="ku-inspector-header-card">
                            <div class="ku-node-domain-badge" id="ku-insp-course">Domain</div>
                            <h2 class="ku-insp-title" id="ku-insp-title">Concept Title</h2>
                            <div class="ku-insp-lesson" id="ku-insp-lesson">Lesson Location</div>
                        </div>

                        <!-- Action Row -->
                        <div class="ku-insp-actions">
                            <button class="ku-btn-primary" id="ku-btn-goto">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                <span>Open in Study Workspace</span>
                            </button>
                            <button class="ku-btn-secondary" id="ku-btn-isolate" title="Isolate connected subgraph">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="7"/>
                                    <polyline points="12 9 12 12 13.5 13.5"/>
                                </svg>
                                <span id="ku-isolate-text">Isolate Subgraph</span>
                            </button>
                        </div>

                        <!-- Card Content Preview Snippet -->
                        <div class="ku-section-group" id="ku-insp-snippet-wrap">
                            <div class="ku-group-header">
                                <span>Card Excerpt</span>
                            </div>
                            <div class="ku-card-snippet" id="ku-insp-snippet">
                                No card excerpt available.
                            </div>
                        </div>

                        <!-- Inbound / Outbound Relations -->
                        <div class="ku-section-group">
                            <div class="ku-group-header">
                                <span>Inbound Relations</span>
                                <span class="ku-badge-count" id="ku-insp-inbound-count">0</span>
                            </div>
                            <div class="ku-relations-list" id="ku-insp-inbound-list"></div>
                        </div>

                        <div class="ku-section-group">
                            <div class="ku-group-header">
                                <span>Outbound Relations</span>
                                <span class="ku-badge-count" id="ku-insp-outbound-count">0</span>
                            </div>
                            <div class="ku-relations-list" id="ku-insp-outbound-list"></div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Bottom Floating Shortcuts Capsule -->
            <footer class="ku-shortcuts-hud">
                <span class="ku-hud-hint"><kbd>Left Drag</kbd> Rotate</span>
                <span class="ku-hud-hint"><kbd>Right Drag</kbd> Pan</span>
                <span class="ku-hud-hint"><kbd>Scroll</kbd> Zoom</span>
                <span class="ku-hud-hint"><kbd>Click</kbd> Inspect</span>
                <span class="ku-hud-hint"><kbd>Dbl Click</kbd> Focus</span>
                <span class="ku-hud-hint"><kbd>Space</kbd> Reset</span>
                <span class="ku-hud-hint"><kbd>Esc</kbd> Exit</span>
            </footer>

            <!-- Loading Screen Overlay -->
            <div class="ku-loading-overlay" id="ku-loading">
                <div class="ku-loader-card">
                    <div class="ku-loader-orb">
                        <div class="ku-loader-ring"></div>
                        <div class="ku-loader-ring-inner"></div>
                    </div>
                    <p class="ku-loader-text">Synthesizing Spatial Knowledge Graph</p>
                    <span class="ku-loader-sub">Mapping concepts, relational splines, and starfield metrics...</span>
                </div>
            </div>
        `,document.body.appendChild(t),this.container=t,this.injectStyles(),this.setupEventListeners()}injectStyles(){if(document.getElementById("knowledge-universe-styles"))return;const e=document.createElement("style");e.id="knowledge-universe-styles",e.textContent=`
            /* ==========================================================================
               KNOWLEDGE UNIVERSE - A-TIER 3D SPATIAL KNOWLEDGE GRAPH
               ========================================================================== */

            #knowledge-universe {
                position: fixed;
                inset: 0;
                z-index: 200000;
                display: none;
                background: #06080e;
                font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #f8fafc;
                user-select: none;
                overflow: hidden;
            }

            #knowledge-universe.ku-visible {
                display: block;
                animation: kuFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes kuFadeIn {
                from { opacity: 0; transform: scale(1.008); }
                to { opacity: 1; transform: scale(1); }
            }

            /* Cosmic Depth Background */
            .ku-background {
                position: absolute;
                inset: 0;
                background: 
                    radial-gradient(ellipse 90% 70% at 50% -20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
                    radial-gradient(ellipse 70% 60% at 85% 95%, rgba(139, 92, 246, 0.09) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 50% at 10% 85%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                    linear-gradient(180deg, #05070d 0%, #080c16 50%, #04060a 100%);
                pointer-events: none;
            }

            .ku-graph-container {
                position: absolute;
                inset: 0;
                cursor: grab;
            }

            .ku-graph-container:active {
                cursor: grabbing;
            }

            /* ==========================================================================
               TOP COMMAND BAR
               ========================================================================== */
            .ku-command-bar {
                position: absolute;
                top: 18px;
                left: 20px;
                right: 20px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                background: rgba(10, 15, 26, 0.75);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.09);
                border-radius: 14px;
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.45),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                z-index: 50;
                pointer-events: auto;
            }

            .ku-brand-group {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-shrink: 0;
            }

            .ku-brand-icon {
                width: 32px;
                height: 32px;
                border-radius: 9px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%);
                border: 1px solid rgba(255, 255, 255, 0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #818cf8;
            }

            .ku-brand-meta {
                display: flex;
                align-items: baseline;
                gap: 8px;
            }

            .ku-brand-title {
                font-size: 14px;
                font-weight: 600;
                letter-spacing: -0.01em;
                color: #ffffff;
            }

            .ku-node-count {
                font-size: 11px;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                color: rgba(255, 255, 255, 0.5);
                padding: 2px 7px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.06);
            }

            /* Search Module */
            .ku-search-module {
                position: relative;
                width: 340px;
                max-width: 40vw;
            }

            .ku-search-input-wrap {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;
            }

            .ku-search-icon {
                position: absolute;
                left: 11px;
                color: rgba(255, 255, 255, 0.4);
                pointer-events: none;
            }

            #ku-search-input {
                width: 100%;
                height: 34px;
                padding: 0 34px 0 32px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 9px;
                color: #ffffff;
                font-size: 12.5px;
                font-family: inherit;
                outline: none;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }

            #ku-search-input::placeholder {
                color: rgba(255, 255, 255, 0.35);
            }

            #ku-search-input:focus {
                background: rgba(255, 255, 255, 0.08);
                border-color: rgba(99, 102, 241, 0.6);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
            }

            .ku-search-kbd {
                position: absolute;
                right: 9px;
                padding: 2px 5px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                font-size: 10px;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                color: rgba(255, 255, 255, 0.45);
                pointer-events: none;
            }

            .ku-search-results {
                position: absolute;
                top: calc(100% + 8px);
                left: 0;
                right: 0;
                background: rgba(12, 17, 30, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 10px;
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
                max-height: 280px;
                overflow-y: auto;
                display: none;
                z-index: 100;
                padding: 4px;
            }

            .ku-search-results.visible {
                display: block;
            }

            .ku-search-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 10px;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.15s ease;
            }

            .ku-search-item:hover, .ku-search-item.active {
                background: rgba(99, 102, 241, 0.2);
            }

            .ku-search-item-title {
                font-size: 12.5px;
                font-weight: 500;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 8px;
            }

            .ku-search-item-course {
                font-size: 10.5px;
                color: rgba(255, 255, 255, 0.45);
                flex-shrink: 0;
            }

            /* Action Buttons */
            .ku-actions-group {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .ku-action-btn {
                height: 34px;
                min-width: 34px;
                padding: 0 8px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .ku-action-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
                border-color: rgba(255, 255, 255, 0.16);
            }

            .ku-action-btn:active {
                transform: scale(0.96);
            }

            .ku-action-btn.active {
                background: rgba(99, 102, 241, 0.22);
                border-color: rgba(99, 102, 241, 0.5);
                color: #818cf8;
            }

            .ku-projection-badge {
                font-size: 11px;
                font-weight: 600;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                letter-spacing: 0.05em;
            }

            .ku-divider-v {
                width: 1px;
                height: 18px;
                background: rgba(255, 255, 255, 0.1);
                margin: 0 3px;
            }

            .ku-btn-close {
                background: rgba(239, 68, 68, 0.1);
                border-color: rgba(239, 68, 68, 0.25);
                color: #f87171;
            }

            .ku-btn-close:hover {
                background: rgba(239, 68, 68, 0.25);
                border-color: rgba(239, 68, 68, 0.5);
                color: #ffffff;
            }

            /* ==========================================================================
               DRAWERS & HUDS (LEFT & RIGHT)
               ========================================================================== */
            .ku-drawer {
                position: absolute;
                top: 84px;
                bottom: 56px;
                width: 310px;
                background: rgba(10, 15, 26, 0.82);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.09);
                border-radius: 16px;
                box-shadow: 
                    0 16px 40px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08);
                display: flex;
                flex-direction: column;
                z-index: 40;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
                overflow: hidden;
            }

            .ku-drawer-left {
                left: 20px;
            }

            .ku-drawer-left.collapsed {
                transform: translateX(-330px);
                opacity: 0.4;
                pointer-events: none;
            }

            .ku-drawer-right {
                right: 20px;
                width: 340px;
                transform: translateX(360px);
                opacity: 0;
                pointer-events: none;
            }

            .ku-drawer-right.open {
                transform: translateX(0);
                opacity: 1;
                pointer-events: auto;
            }

            .ku-drawer-header {
                height: 46px;
                padding: 0 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                flex-shrink: 0;
            }

            .ku-drawer-title {
                font-size: 11.5px;
                font-weight: 600;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                color: rgba(255, 255, 255, 0.6);
            }

            .ku-icon-btn {
                width: 26px;
                height: 26px;
                border-radius: 6px;
                background: transparent;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .ku-icon-btn:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #ffffff;
            }

            .ku-drawer-scroll {
                padding: 16px;
                overflow-y: auto;
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .ku-drawer-scroll::-webkit-scrollbar {
                width: 4px;
            }

            .ku-drawer-scroll::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.12);
                border-radius: 2px;
            }

            /* Telemetry Metrics */
            .ku-telemetry-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }

            .ku-telemetry-card {
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                display: flex;
                flex-direction: column;
            }

            .ku-tel-val {
                font-size: 20px;
                font-weight: 600;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                color: #ffffff;
                line-height: 1.2;
            }

            .ku-tel-lbl {
                font-size: 10.5px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: rgba(255, 255, 255, 0.45);
                margin-top: 4px;
            }

            /* Section Groups */
            .ku-section-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .ku-group-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                color: rgba(255, 255, 255, 0.5);
            }

            .ku-text-btn {
                background: none;
                border: none;
                font-size: 11px;
                color: #818cf8;
                cursor: pointer;
                padding: 0;
            }

            .ku-text-btn:hover {
                text-decoration: underline;
            }

            .ku-badge-sub {
                font-size: 9.5px;
                font-family: 'JetBrains Mono', monospace;
                padding: 1px 5px;
                background: rgba(255, 255, 255, 0.06);
                border-radius: 4px;
                color: rgba(255, 255, 255, 0.45);
            }

            /* Filter Chips */
            .ku-filter-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }

            .ku-chip {
                padding: 5px 9px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 7px;
                font-size: 11px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.15s ease;
            }

            .ku-chip:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #ffffff;
            }

            .ku-chip.active {
                background: rgba(255, 255, 255, 0.09);
                border-color: var(--chip-color, #818cf8);
                color: #ffffff;
            }

            .ku-chip-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--chip-color, #818cf8);
            }

            /* Course Select */
            .ku-select {
                width: 100%;
                height: 32px;
                padding: 0 10px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                color: #ffffff;
                font-size: 12px;
                font-family: inherit;
                outline: none;
                cursor: pointer;
            }

            .ku-select:focus {
                border-color: rgba(99, 102, 241, 0.5);
            }

            /* Hubs List */
            .ku-hubs-list {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .ku-hub-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 10px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .ku-hub-item:hover {
                background: rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.3);
                transform: translateX(2px);
            }

            .ku-hub-left {
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 0;
            }

            .ku-hub-rank {
                font-size: 10px;
                font-family: 'JetBrains Mono', monospace;
                color: rgba(255, 255, 255, 0.4);
                width: 14px;
            }

            .ku-hub-name {
                font-size: 12px;
                font-weight: 500;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .ku-hub-count {
                font-size: 10.5px;
                font-family: 'JetBrains Mono', monospace;
                color: #818cf8;
                background: rgba(99, 102, 241, 0.15);
                padding: 2px 6px;
                border-radius: 5px;
                flex-shrink: 0;
            }

            /* Accordion & Sliders */
            .ku-accordion {
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.02);
                overflow: hidden;
            }

            .ku-accordion-summary {
                padding: 10px 12px;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                list-style: none;
            }

            .ku-accordion-summary::-webkit-details-marker {
                display: none;
            }

            .ku-accordion[open] .ku-chevron {
                transform: rotate(180deg);
            }

            .ku-accordion-body {
                padding: 8px 12px 12px 12px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
            }

            .ku-slider-row {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .ku-slider-row label {
                font-size: 11px;
                color: rgba(255, 255, 255, 0.6);
                display: flex;
                justify-content: space-between;
            }

            .ku-slider-row label span {
                font-family: 'JetBrains Mono', monospace;
                color: #818cf8;
            }

            .ku-slider-row input[type="range"] {
                width: 100%;
                height: 4px;
                accent-color: #6366f1;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                outline: none;
            }

            /* ==========================================================================
               INSPECTOR CONTENT
               ========================================================================== */
            .ku-empty-inspector {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 240px;
                text-align: center;
                gap: 12px;
                padding: 20px;
                color: rgba(255, 255, 255, 0.4);
                font-size: 12px;
                line-height: 1.5;
            }

            .ku-inspector-content {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            .ku-inspector-header-card {
                padding: 14px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
                border: 1px solid rgba(99, 102, 241, 0.25);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .ku-node-domain-badge {
                font-size: 10px;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                color: #818cf8;
            }

            .ku-insp-title {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: #ffffff;
                line-height: 1.3;
            }

            .ku-insp-lesson {
                font-size: 11.5px;
                color: rgba(255, 255, 255, 0.5);
            }

            .ku-insp-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .ku-btn-primary {
                height: 38px;
                background: #4f46e5;
                border: 1px solid #6366f1;
                border-radius: 9px;
                color: #ffffff;
                font-size: 12.5px;
                font-weight: 600;
                font-family: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
            }

            .ku-btn-primary:hover {
                background: #4338ca;
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(79, 70, 229, 0.45);
            }

            .ku-btn-secondary {
                height: 34px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 9px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
                font-weight: 500;
                font-family: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .ku-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #ffffff;
            }

            .ku-btn-secondary.active {
                background: rgba(239, 68, 68, 0.15);
                border-color: rgba(239, 68, 68, 0.4);
                color: #f87171;
            }

            .ku-card-snippet {
                padding: 10px 12px;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 8px;
                font-size: 11.5px;
                color: rgba(255, 255, 255, 0.7);
                line-height: 1.5;
                max-height: 110px;
                overflow-y: auto;
            }

            .ku-badge-count {
                font-size: 10px;
                font-family: 'JetBrains Mono', monospace;
                padding: 1px 6px;
                background: rgba(255, 255, 255, 0.08);
                border-radius: 4px;
                color: rgba(255, 255, 255, 0.6);
            }

            .ku-relations-list {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .ku-rel-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 7px 10px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 7px;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .ku-rel-item:hover {
                background: rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.3);
            }

            .ku-rel-name {
                font-size: 11.5px;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 170px;
            }

            .ku-rel-type-tag {
                font-size: 9.5px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                padding: 2px 6px;
                border-radius: 4px;
                color: #ffffff;
                background: var(--tag-bg, #6366f1);
            }

            /* ==========================================================================
               BOTTOM SHORTCUTS HUD
               ========================================================================== */
            .ku-shortcuts-hud {
                position: absolute;
                bottom: 16px;
                left: 50%;
                transform: translateX(-50%);
                height: 32px;
                padding: 0 16px;
                background: rgba(10, 15, 26, 0.75);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 14px;
                z-index: 30;
                pointer-events: none;
            }

            .ku-hud-hint {
                font-size: 11px;
                color: rgba(255, 255, 255, 0.5);
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .ku-hud-hint kbd {
                padding: 1px 5px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 4px;
                font-size: 9.5px;
                font-family: 'JetBrains Mono', monospace;
                color: rgba(255, 255, 255, 0.75);
            }

            /* ==========================================================================
               LOADING SCREEN
               ========================================================================== */
            .ku-loading-overlay {
                position: absolute;
                inset: 0;
                background: rgba(5, 7, 13, 0.94);
                backdrop-filter: blur(30px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 200;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }

            .ku-loading-overlay.hidden {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }

            .ku-loader-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 14px;
                text-align: center;
            }

            .ku-loader-orb {
                position: relative;
                width: 54px;
                height: 54px;
            }

            .ku-loader-ring {
                position: absolute;
                inset: 0;
                border: 2px solid rgba(99, 102, 241, 0.2);
                border-top-color: #818cf8;
                border-radius: 50%;
                animation: kuSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            }

            .ku-loader-ring-inner {
                position: absolute;
                inset: 8px;
                border: 2px solid rgba(139, 92, 246, 0.2);
                border-bottom-color: #c084fc;
                border-radius: 50%;
                animation: kuSpinReverse 0.9s linear infinite;
            }

            @keyframes kuSpin {
                to { transform: rotate(360deg); }
            }

            @keyframes kuSpinReverse {
                to { transform: rotate(-360deg); }
            }

            .ku-loader-text {
                margin: 0;
                font-size: 15px;
                font-weight: 600;
                color: #ffffff;
                letter-spacing: -0.01em;
            }

            .ku-loader-sub {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.45);
            }

            /* Responsive Adjustments */
            @media (max-width: 900px) {
                .ku-drawer-left {
                    display: none;
                }
                .ku-search-module {
                    width: 200px;
                }
                .ku-shortcuts-hud {
                    display: none;
                }
            }
        `,document.head.appendChild(e)}setupEventListeners(){document.getElementById("ku-close")?.addEventListener("click",()=>this.hide()),document.getElementById("ku-left-toggle")?.addEventListener("click",()=>{document.getElementById("ku-left-drawer")?.classList.toggle("collapsed")}),document.getElementById("ku-inspector-close")?.addEventListener("click",()=>{this.clearSelection()}),document.getElementById("ku-btn-reset")?.addEventListener("click",()=>this.resetView()),document.getElementById("ku-btn-auto-rotate")?.addEventListener("click",r=>this.toggleAutoRotate(r.currentTarget)),document.getElementById("ku-btn-labels")?.addEventListener("click",r=>this.toggleLabels(r.currentTarget)),document.getElementById("ku-btn-particles")?.addEventListener("click",r=>this.toggleParticles(r.currentTarget)),document.getElementById("ku-btn-2d-toggle")?.addEventListener("click",()=>this.toggle2DProjection()),document.getElementById("ku-btn-goto")?.addEventListener("click",()=>this.navigateToSelectedCard()),document.getElementById("ku-btn-isolate")?.addEventListener("click",()=>this.toggleIsolateSelected());const e=document.getElementById("ku-search-input");e?.addEventListener("input",r=>this.handleSearch(r.target.value)),e?.addEventListener("keydown",r=>this.handleSearchKeydown(r)),document.getElementById("ku-course-select")?.addEventListener("change",r=>{this.activeFilters.courseId=r.target.value,this.applyFilters()}),document.getElementById("ku-filter-reset-links")?.addEventListener("click",()=>{Object.keys(this.relationshipColors).forEach(r=>this.activeFilters.relationshipTypes.add(r)),this.updateFilterChips(),this.applyFilters()});const t=document.getElementById("ku-slider-repulsion"),s=document.getElementById("ku-slider-distance"),i=document.getElementById("ku-slider-gravity");t?.addEventListener("input",r=>{const o=parseFloat(r.target.value);document.getElementById("ku-val-repulsion").textContent=o,this.settings.repulsionStrength=o,this.graph&&this.graph.d3Force("charge")?.strength(o)}),s?.addEventListener("input",r=>{const o=parseFloat(r.target.value);document.getElementById("ku-val-distance").textContent=o,this.settings.linkDistance=o,this.graph&&this.graph.d3Force("link")?.distance(o)}),i?.addEventListener("input",r=>{const o=parseFloat(r.target.value);document.getElementById("ku-val-gravity").textContent=o,this.settings.centeringStrength=o,this.graph&&this.graph.d3VelocityDecay(o)}),document.addEventListener("keydown",r=>{if(this.isVisible){if(r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA"){r.key==="Escape"&&(r.target.blur(),document.getElementById("ku-search-results")?.classList.remove("visible"));return}switch(r.key.toLowerCase()){case"escape":this.hide();break;case" ":r.preventDefault(),this.resetView();break;case"a":this.toggleAutoRotate(document.getElementById("ku-btn-auto-rotate"));break;case"l":this.toggleLabels(document.getElementById("ku-btn-labels"));break;case"p":this.toggleParticles(document.getElementById("ku-btn-particles"));break;case"2":this.is2D||this.toggle2DProjection();break;case"3":this.is2D&&this.toggle2DProjection();break;case"/":r.preventDefault(),document.getElementById("ku-search-input")?.focus();break}}})}observeThemeChanges(){new MutationObserver(()=>{this.settings.nodeColors=this.getThemeColors(),this.graph&&this.updateGraphColors()}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}async open(e={}){return this.show(e)}async show(e={}){if(!this.container)return;this.isVisible=!0,this.container.classList.add("ku-visible");const t=document.getElementById("ku-loading");t&&t.classList.remove("hidden");try{this.generateGraphData(),await this.initGraph(),this.updateUI(),e.cardId&&setTimeout(()=>{const s=this.graphData.nodes.find(i=>i.id===e.cardId);s&&this.handleNodeClick(s)},400),setTimeout(()=>{t&&t.classList.add("hidden")},350)}catch(s){console.error("[KnowledgeUniverse] Error initializing graph:",s),t&&t.classList.add("hidden")}}hide(){this.container&&(this.isVisible=!1,this.container.classList.remove("ku-visible"),this.animFrameId&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=null),this.graph&&(this.graph._destructor?.(),this.graph=null))}generateGraphData(){const e=[],t=[],s=new Map,i=window.state?.getLessons()||[],r=window.state?.getCourses?.()||[],o=new Map;r.forEach(n=>{o.set(n.id,this.getCourseColor(n.id))}),i.forEach(n=>{if(!n||!Array.isArray(n.cards))return;const c=window.state?.findCourse?.(l=>l.id===n.courseId),p=o.get(c?.id)||this.getCourseColor(c?.id||n.id);n.cards.forEach(l=>{if(l.isRelationshipCard)return;const u=this.extractCardSnippet(l.content),g={id:l.id,name:l.title||"Untitled Concept",snippet:u,lessonId:n.id,lessonName:n.name||"General Lesson",courseId:c?.id||"default",courseName:c?.name||"General Domain",color:p,content:l.content||"",links:l.links||[],inboundLinks:[],outboundLinks:[],val:1};e.push(g),s.set(l.id,g)})}),e.forEach(n=>{Array.isArray(n.links)&&n.links.forEach(c=>{let p,l;if(typeof c=="number")p=c,l="related";else if(typeof c=="object"&&c.targetId)p=c.targetId,l=c.relationshipType||"related";else return;if(s.has(p)){const u=s.get(p),g={source:n.id,target:p,type:l,color:this.relationshipColors[l]||this.relationshipColors.default};t.push(g),n.val=(n.val||1)+.8,u.val=(u.val||1)+.8,n.outboundLinks.push({target:u,type:l}),u.inboundLinks.push({source:n,type:l})}}),n.content&&n.content.includes("[[")&&C(n.content).forEach(p=>{const l=L(p.raw,n.lessonId);if(l.exists&&l.type==="card"&&l.card){const u=l.card.id;if(s.has(u)&&u!==n.id&&!t.some(h=>h.source===n.id&&h.target===u||h.source===u&&h.target===n.id)){const h=l.relationship||"related",f=s.get(u),b={source:n.id,target:u,type:h,color:this.relationshipColors[h]||this.relationshipColors.default};t.push(b),n.val=(n.val||1)+.8,f.val=(f.val||1)+.8,n.outboundLinks.push({target:f,type:h}),f.inboundLinks.push({source:n,type:h})}}})});const d=i.find(n=>n.name==="Links"||n.isLinksLesson);d&&Array.isArray(d.cards)&&d.cards.forEach(n=>{if(n.isRelationshipCard&&n.sourceCardId&&n.targetCardId&&s.has(n.sourceCardId)&&s.has(n.targetCardId)){const c=s.get(n.sourceCardId),p=s.get(n.targetCardId),l=n.relationshipType||"related";t.some(g=>g.source===n.sourceCardId&&g.target===n.targetCardId||g.source===n.targetCardId&&g.target===n.sourceCardId)||(t.push({source:n.sourceCardId,target:n.targetCardId,type:l,color:this.relationshipColors[l]||this.relationshipColors.default}),c.val=(c.val||1)+.8,p.val=(p.val||1)+.8,c.outboundLinks.push({target:p,type:l}),p.inboundLinks.push({source:c,type:l}))}}),this.rawNodes=e,this.rawLinks=t,this.graphData={nodes:[...e],links:[...t]}}extractCardSnippet(e){if(!e||typeof e!="string")return"";const t=e.replace(/#+\s+/g,"").replace(/\[([^\]]+)\]\([^\)]+\)/g,"$1").replace(/[*_`~]/g,"").replace(/\n+/g," ").trim();return t.length>140?t.substring(0,140)+"...":t}getCourseColor(e){const t=["#6366f1","#3b82f6","#06b6d4","#10b981","#8b5cf6","#a855f7","#ec4899","#f97316","#eab308","#14b8a6","#0ea5e9","#d946ef"];let s=0;const i=String(e||"course-default");for(let r=0;r<i.length;r++)s=i.charCodeAt(r)+((s<<5)-s);return t[Math.abs(s)%t.length]}async initGraph(){const e=document.getElementById("ku-graph");if(!e)return;await E(),e.innerHTML="",this.getThemeColors(),this.graph=v()(e).graphData(this.graphData).backgroundColor("rgba(0,0,0,0)").showNavInfo(!1).nodeRelSize(this.settings.nodeRelSize).nodeVal(s=>Math.max(1,Math.min(s.val||1,14))).nodeThreeObject(s=>this.createCustomNodeMesh(s)).nodeThreeObjectExtend(!1).linkCurvature(s=>s.type==="contradicts"?.25:s.type==="prerequisite"?.15:.08).linkColor(s=>this.getLinkColor(s)).linkWidth(s=>this.getLinkWidth(s)).linkOpacity(this.settings.linkOpacity).linkDirectionalParticles(this.settings.showParticles?2:0).linkDirectionalParticleSpeed(this.settings.particleSpeed).linkDirectionalParticleWidth(this.settings.particleWidth).linkDirectionalParticleColor(s=>this.getLinkColor(s)).onNodeClick(s=>this.handleNodeClick(s)).onNodeHover(s=>this.handleNodeHover(s)).onLinkHover(s=>this.handleLinkHover(s)).onBackgroundClick(()=>this.clearSelection()).cooldownTicks(90).d3AlphaDecay(.02).d3VelocityDecay(this.settings.centeringStrength),this.graph.d3Force("charge")?.strength(this.settings.repulsionStrength),this.graph.d3Force("link")?.distance(this.settings.linkDistance);const t=this.graph.controls();t&&(t.autoRotate=this.settings.autoRotate,t.autoRotateSpeed=this.settings.autoRotateSpeed,t.enableDamping=!0,t.dampingFactor=.05),this.setupSceneEnvironment()}setupSceneEnvironment(){if(!this.graph||!a)return;const e=this.graph.scene(),t=new a.AmbientLight(16777215,.7);e.add(t);const s=new a.DirectionalLight(16777215,.8);s.position.set(200,300,200),e.add(s);const i=new a.DirectionalLight(8490232,.4);i.position.set(-200,-200,-200),e.add(i);const r=1800,o=new a.BufferGeometry,d=new Float32Array(r*3),n=new Float32Array(r*3),c=[new a.Color(16777215),new a.Color(14412542),new a.Color(14739455),new a.Color(16707722),new a.Color(9684477)];for(let f=0;f<r;f++){const b=800+Math.random()*1200,x=Math.random()*Math.PI*2,k=Math.acos(Math.random()*2-1);d[f*3]=b*Math.sin(k)*Math.cos(x),d[f*3+1]=b*Math.sin(k)*Math.sin(x),d[f*3+2]=b*Math.cos(k);const m=c[Math.floor(Math.random()*c.length)];n[f*3]=m.r,n[f*3+1]=m.g,n[f*3+2]=m.b}o.setAttribute("position",new a.BufferAttribute(d,3)),o.setAttribute("color",new a.BufferAttribute(n,3));const p=new a.PointsMaterial({size:2.2,vertexColors:!0,transparent:!0,opacity:.75,sizeAttenuation:!0});this.starfield=new a.Points(o,p),e.add(this.starfield);const l=new a.RingGeometry(180,181,64),u=new a.MeshBasicMaterial({color:6514417,transparent:!0,opacity:.08,side:a.DoubleSide}),g=new a.Mesh(l,u);g.rotation.x=Math.PI/2,e.add(g);const h=()=>{this.isVisible&&(this.starfield&&this.settings.showStarfield&&(this.starfield.rotation.y+=15e-5,this.starfield.rotation.x+=8e-5),this.animFrameId=requestAnimationFrame(h))};h()}createCustomNodeMesh(e){if(!a)return null;const t=new a.Group,s=Math.max(3.2,Math.min(e.val?e.val*1.8:3.5,12)),i=new a.Color(e.color||"#6366f1"),r=new a.SphereGeometry(s,20,20),o=new a.MeshStandardMaterial({color:i,emissive:i,emissiveIntensity:.65,roughness:.25,metalness:.2}),d=new a.Mesh(r,o);t.add(d);const n=new a.SphereGeometry(s*1.35,16,16),c=new a.MeshBasicMaterial({color:i,transparent:!0,opacity:.16,side:a.BackSide,blending:a.AdditiveBlending}),p=new a.Mesh(n,c);t.add(p);const l=(e.inboundLinks?.length||0)+(e.outboundLinks?.length||0);if(l>=3){const u=new a.TorusGeometry(s*1.7,.25,6,28),g=new a.MeshBasicMaterial({color:i,transparent:!0,opacity:.45,blending:a.AdditiveBlending}),h=new a.Mesh(u,g);if(h.rotation.x=Math.PI/3,h.rotation.y=Math.PI/6,t.add(h),l>=6){const f=h.clone();f.scale.set(1.25,1.25,1.25),f.rotation.x=-Math.PI/4,t.add(f)}}if(this.settings.showLabels){const u=this.createCanvasLabel(e.name,e.courseName);u.position.set(0,s+7,0),u.name="labelSprite",t.add(u)}return t.userData={node:e,baseRadius:s},t}createCanvasLabel(e,t){const s=document.createElement("canvas"),i=s.getContext("2d"),r=2,o="600 24px Outfit, Inter, sans-serif",d="400 18px Outfit, Inter, sans-serif";i.font=o;const n=i.measureText(e).width;i.font=d;const c=i.measureText(t||"").width,p=Math.max(n,c),l=24,u=16,g=p+l*2,h=64+u;s.width=g*r,s.height=h*r,i.scale(r,r),i.fillStyle="rgba(8, 12, 22, 0.85)",i.strokeStyle="rgba(255, 255, 255, 0.12)",i.lineWidth=1.5;const f=12;i.beginPath(),i.roundRect(0,0,g,h,f),i.fill(),i.stroke(),i.font=o,i.fillStyle="#ffffff",i.textAlign="left",i.textBaseline="top",i.fillText(e,l,u),t&&(i.font=d,i.fillStyle="rgba(255, 255, 255, 0.55)",i.fillText(t,l,u+28));const b=new a.CanvasTexture(s);b.minFilter=a.LinearFilter,b.wrapS=a.ClampToEdgeWrapping,b.wrapT=a.ClampToEdgeWrapping;const x=new a.SpriteMaterial({map:b,transparent:!0,depthWrite:!1}),k=new a.Sprite(x),m=.16;return k.scale.set(g*m,h*m,1),k}getLinkColor(e){const t=e.color||this.relationshipColors[e.type]||this.relationshipColors.default;if(!this.selectedNode&&!this.hoveredNode)return t;const s=(this.hoveredNode||this.selectedNode)?.id,i=typeof e.source=="object"?e.source.id:e.source,r=typeof e.target=="object"?e.target.id:e.target;return i===s||r===s?"#ffffff":"rgba(255,255,255,0.06)"}getLinkWidth(e){if(!this.selectedNode&&!this.hoveredNode)return this.settings.linkWidth;const t=(this.hoveredNode||this.selectedNode)?.id,s=typeof e.source=="object"?e.source.id:e.source,i=typeof e.target=="object"?e.target.id:e.target;return s===t||i===t?2.8:.4}handleNodeClick(e){if(!e)return;this.selectedNode=e,this.populateInspector(e);const t=document.getElementById("ku-right-drawer");t&&t.classList.add("open"),this.focusOnNode(e),this.refreshGraphVisuals()}handleNodeHover(e){this.hoveredNode=e;const t=document.getElementById("ku-graph");t&&(t.style.cursor=e?"pointer":"grab"),this.refreshGraphVisuals()}handleLinkHover(e){const t=document.getElementById("ku-graph");t&&(t.style.cursor=e?"pointer":"grab")}clearSelection(){this.selectedNode=null,this.isolatedNode=null;const e=document.getElementById("ku-right-drawer");e&&e.classList.remove("open");const t=document.getElementById("ku-btn-isolate");t&&t.classList.remove("active"),this.refreshGraphVisuals()}refreshGraphVisuals(){this.graph&&(this.graph.linkColor(e=>this.getLinkColor(e)),this.graph.linkWidth(e=>this.getLinkWidth(e)))}focusOnNode(e){if(!this.graph||!e||e.x===void 0)return;const t=160,s=Math.hypot(e.x,e.y,e.z)||1,i=1+t/s;this.graph.cameraPosition({x:e.x*i,y:e.y*i+15,z:e.z*i},{x:e.x,y:e.y,z:e.z},1e3)}resetView(){this.graph&&(this.clearSelection(),this.graph.cameraPosition({x:0,y:0,z:520},{x:0,y:0,z:0},1e3))}toggle2DProjection(){if(!this.graph)return;this.is2D=!this.is2D;const e=document.getElementById("ku-projection-text");e&&(e.textContent=this.is2D?"2D":"3D"),this.graph.numDimensions(this.is2D?2:3),this.is2D?this.graph.cameraPosition({x:0,y:0,z:600},{x:0,y:0,z:0},800):this.resetView()}toggleAutoRotate(e){if(!this.graph)return;const t=this.graph.controls();t&&(t.autoRotate=!t.autoRotate,this.settings.autoRotate=t.autoRotate,e?.classList.toggle("active",t.autoRotate))}toggleLabels(e){this.settings.showLabels=!this.settings.showLabels,e?.classList.toggle("active",this.settings.showLabels),this.graph&&this.graph.scene().traverse(s=>{s.name==="labelSprite"&&(s.visible=this.settings.showLabels)})}toggleParticles(e){this.graph&&(this.settings.showParticles=!this.settings.showParticles,e?.classList.toggle("active",this.settings.showParticles),this.graph.linkDirectionalParticles(this.settings.showParticles?2:0))}populateInspector(e){const t=document.getElementById("ku-inspector-empty"),s=document.getElementById("ku-inspector-content");if(!t||!s)return;t.style.display="none",s.style.display="flex",document.getElementById("ku-insp-course").textContent=e.courseName,document.getElementById("ku-insp-title").textContent=e.name,document.getElementById("ku-insp-lesson").textContent=`Lesson: ${e.lessonName}`,document.getElementById("ku-insp-snippet").textContent=e.snippet||"No card excerpt available.";const i=document.getElementById("ku-insp-inbound-list"),r=document.getElementById("ku-insp-inbound-count");i&&r&&(r.textContent=e.inboundLinks.length,e.inboundLinks.length===0?i.innerHTML='<span style="font-size: 11px; color: rgba(255,255,255,0.4);">No inbound prerequisites</span>':(i.innerHTML=e.inboundLinks.map(n=>`
                    <div class="ku-rel-item" data-node-id="${n.source.id}">
                        <span class="ku-rel-name">${this.escapeHtml(n.source.name)}</span>
                        <span class="ku-rel-type-tag" style="--tag-bg: ${this.relationshipColors[n.type]||"#6366f1"}">${n.type.replace(/-/g," ")}</span>
                    </div>
                `).join(""),i.querySelectorAll(".ku-rel-item").forEach(n=>{n.addEventListener("click",()=>{const c=this.graphData.nodes.find(p=>p.id===parseInt(n.dataset.nodeId));c&&this.handleNodeClick(c)})})));const o=document.getElementById("ku-insp-outbound-list"),d=document.getElementById("ku-insp-outbound-count");o&&d&&(d.textContent=e.outboundLinks.length,e.outboundLinks.length===0?o.innerHTML='<span style="font-size: 11px; color: rgba(255,255,255,0.4);">No outbound extensions</span>':(o.innerHTML=e.outboundLinks.map(n=>`
                    <div class="ku-rel-item" data-node-id="${n.target.id}">
                        <span class="ku-rel-name">${this.escapeHtml(n.target.name)}</span>
                        <span class="ku-rel-type-tag" style="--tag-bg: ${this.relationshipColors[n.type]||"#6366f1"}">${n.type.replace(/-/g," ")}</span>
                    </div>
                `).join(""),o.querySelectorAll(".ku-rel-item").forEach(n=>{n.addEventListener("click",()=>{const c=this.graphData.nodes.find(p=>p.id===parseInt(n.dataset.nodeId));c&&this.handleNodeClick(c)})})))}toggleIsolateSelected(){if(!this.selectedNode)return;const e=document.getElementById("ku-btn-isolate");if(this.isolatedNode===this.selectedNode)this.isolatedNode=null,e?.classList.remove("active"),this.applyFilters();else{this.isolatedNode=this.selectedNode,e?.classList.add("active");const s=new Set([this.selectedNode.id]);this.rawLinks.forEach(o=>{const d=typeof o.source=="object"?o.source.id:o.source,n=typeof o.target=="object"?o.target.id:o.target;d===this.selectedNode.id&&s.add(n),n===this.selectedNode.id&&s.add(d)});const i=this.rawNodes.filter(o=>s.has(o.id)),r=this.rawLinks.filter(o=>{const d=typeof o.source=="object"?o.source.id:o.source,n=typeof o.target=="object"?o.target.id:o.target;return s.has(d)&&s.has(n)});this.graphData={nodes:i,links:r},this.graph?.graphData(this.graphData)}}navigateToSelectedCard(){if(!this.selectedNode)return;const e=this.selectedNode.lessonId,t=this.selectedNode.id;if(this.hide(),e&&window.state){window.state.setCurrentLessonId(e);const s=new CustomEvent("display-lesson",{detail:{lessonId:e,focusCardId:t}});document.dispatchEvent(s)}}handleSearch(e){const t=document.getElementById("ku-search-results");if(!t)return;if(!e.trim()){t.innerHTML="",t.classList.remove("visible");return}const s=e.toLowerCase(),i=this.rawNodes.filter(r=>r.name.toLowerCase().includes(s)||r.courseName.toLowerCase().includes(s)).slice(0,8);if(i.length===0){t.innerHTML='<div style="padding: 10px; font-size: 11.5px; color: rgba(255,255,255,0.4); text-align: center;">No matching concepts found</div>',t.classList.add("visible");return}t.innerHTML=i.map(r=>`
            <div class="ku-search-item" data-node-id="${r.id}">
                <span class="ku-search-item-title">${this.escapeHtml(r.name)}</span>
                <span class="ku-search-item-course">${this.escapeHtml(r.courseName)}</span>
            </div>
        `).join(""),t.classList.add("visible"),t.querySelectorAll(".ku-search-item").forEach(r=>{r.addEventListener("click",()=>{const o=this.graphData.nodes.find(d=>d.id===parseInt(r.dataset.nodeId));o&&(this.handleNodeClick(o),t.classList.remove("visible"),document.getElementById("ku-search-input").value="")})})}handleSearchKeydown(e){const t=document.getElementById("ku-search-results");if(!t||!t.classList.contains("visible"))return;const s=Array.from(t.querySelectorAll(".ku-search-item")),i=s.findIndex(r=>r.classList.contains("active"));if(e.key==="ArrowDown"){e.preventDefault();const r=(i+1)%s.length;s.forEach((o,d)=>o.classList.toggle("active",d===r))}else if(e.key==="ArrowUp"){e.preventDefault();const r=(i-1+s.length)%s.length;s.forEach((o,d)=>o.classList.toggle("active",d===r))}else if(e.key==="Enter"){e.preventDefault();const r=i>=0?s[i]:s[0];r&&r.click()}}applyFilters(){let e=[...this.rawNodes],t=[...this.rawLinks];if(this.activeFilters.courseId!=="all"){e=e.filter(i=>String(i.courseId)===String(this.activeFilters.courseId));const s=new Set(e.map(i=>i.id));t=t.filter(i=>{const r=typeof i.source=="object"?i.source.id:i.source,o=typeof i.target=="object"?i.target.id:i.target;return s.has(r)&&s.has(o)})}t=t.filter(s=>this.activeFilters.relationshipTypes.has(s.type)),this.graphData={nodes:e,links:t},this.graph?.graphData(this.graphData),this.updateTelemetryMetrics()}updateUI(){const e=document.getElementById("ku-node-count");e&&(e.textContent=`${this.graphData.nodes.length} concepts · ${this.graphData.links.length} links`),this.updateTelemetryMetrics(),this.populateCourseSelect(),this.populateRelationshipFilterChips(),this.populateHubsLeaderboard()}updateTelemetryMetrics(){const e=this.graphData.nodes.length,t=this.graphData.links.length;document.getElementById("ku-stat-nodes").textContent=e,document.getElementById("ku-stat-links").textContent=t;const s=e*(e-1)/2,i=s>0?(t/s*100).toFixed(1):0;document.getElementById("ku-stat-density").textContent=`${i}%`,document.getElementById("ku-stat-clusters").textContent=this.calculateClusterCount()}calculateClusterCount(){if(this.graphData.nodes.length===0)return 0;const e=new Set;let t=0;const s=i=>{e.has(i)||(e.add(i),this.graphData.links.forEach(r=>{const o=typeof r.source=="object"?r.source.id:r.source,d=typeof r.target=="object"?r.target.id:r.target;o===i&&!e.has(d)&&s(d),d===i&&!e.has(o)&&s(o)}))};return this.graphData.nodes.forEach(i=>{e.has(i.id)||(s(i.id),t++)}),t}populateCourseSelect(){const e=document.getElementById("ku-course-select");if(!e)return;const t=window.state?.getCourses?.()||[],s=e.value;e.innerHTML='<option value="all">All Knowledge Domains</option>'+t.map(i=>`
            <option value="${i.id}">${this.escapeHtml(i.name)}</option>
        `).join(""),s&&(e.value=s)}populateRelationshipFilterChips(){const e=document.getElementById("ku-relationship-filters");if(!e)return;const t=new Set(this.rawLinks.map(s=>s.type));if(t.size===0){e.innerHTML='<span style="font-size: 11px; color: rgba(255,255,255,0.4);">No connections defined</span>';return}e.innerHTML=Array.from(t).map(s=>{const i=this.relationshipColors[s]||this.relationshipColors.default,r=s.replace(/-/g," ");return`
                <div class="ku-chip ${this.activeFilters.relationshipTypes.has(s)?"active":""}" data-rel-type="${s}" style="--chip-color: ${i}">
                    <span class="ku-chip-dot"></span>
                    <span>${r}</span>
                </div>
            `}).join(""),e.querySelectorAll(".ku-chip").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.relType;this.activeFilters.relationshipTypes.has(i)?(this.activeFilters.relationshipTypes.delete(i),s.classList.remove("active")):(this.activeFilters.relationshipTypes.add(i),s.classList.add("active")),this.applyFilters()})})}updateFilterChips(){const e=document.getElementById("ku-relationship-filters");e&&e.querySelectorAll(".ku-chip").forEach(t=>{const s=this.activeFilters.relationshipTypes.has(t.dataset.relType);t.classList.toggle("active",s)})}populateHubsLeaderboard(){const e=document.getElementById("ku-hubs-list");if(!e)return;const t=new Map;this.rawNodes.forEach(i=>t.set(i.id,0)),this.rawLinks.forEach(i=>{const r=typeof i.source=="object"?i.source.id:i.source,o=typeof i.target=="object"?i.target.id:i.target;t.set(r,(t.get(r)||0)+1),t.set(o,(t.get(o)||0)+1)});const s=this.rawNodes.map(i=>({...i,degree:t.get(i.id)||0})).filter(i=>i.degree>0).sort((i,r)=>r.degree-i.degree).slice(0,6);if(s.length===0){e.innerHTML='<span style="font-size: 11px; color: rgba(255,255,255,0.4);">No hubs found. Create connections between concepts.</span>';return}e.innerHTML=s.map((i,r)=>`
            <div class="ku-hub-item" data-node-id="${i.id}">
                <div class="ku-hub-left">
                    <span class="ku-hub-rank">${r+1}</span>
                    <span class="ku-hub-name">${this.escapeHtml(i.name)}</span>
                </div>
                <span class="ku-hub-count">${i.degree}</span>
            </div>
        `).join(""),e.querySelectorAll(".ku-hub-item").forEach(i=>{i.addEventListener("click",()=>{const r=this.graphData.nodes.find(o=>o.id===parseInt(i.dataset.nodeId));r&&this.handleNodeClick(r)})})}updateGraphColors(){this.graph&&(this.settings.nodeColors=this.getThemeColors(),this.refreshGraphVisuals())}escapeHtml(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}}const B=new S;window.knowledgeUniverse=B;export{B as default};
