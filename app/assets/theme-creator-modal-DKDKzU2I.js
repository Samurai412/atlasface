import{V as s,W as I,X as E,Y as f,Z as C,a as B}from"./index-DCtijOJy.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class x{constructor(){this.modalId="theme-creator-modal",this.currentTheme=null,this.isEditing=!1,this.originalTheme=null,this.colorInputDebounce=null,this.activeTab="generator",this.activePreviewView="card",this.init()}init(){this.createModalHTML(),this.attachEventListeners()}createModalHTML(){if(document.getElementById(this.modalId+"-overlay"))return;const t=`
            <div id="${this.modalId}-overlay" class="theme-creator-overlay">
                <div id="${this.modalId}-box" class="theme-creator-box">
                    <!-- Header -->
                    <div class="theme-creator-header">
                        <div class="header-brand-group">
                            <div class="theme-creator-title">
                                <i class="fa fa-palette"></i>
                                <span id="theme-creator-title-text">Theme Studio</span>
                            </div>
                            <div class="theme-contrast-badge" id="theme-contrast-badge" title="Real-time WCAG contrast ratio for body text on surface">
                                <i class="fa fa-circle"></i>
                                <span id="contrast-val">7.2:1</span>
                                <small id="contrast-level">WCAG AAA</small>
                            </div>
                        </div>

                        <div class="header-actions-group">
                            <button class="theme-quick-action-btn" id="theme-auto-harmonize-btn" title="Harmonize entire palette from Primary Accent">
                                <i class="fa fa-magic"></i> Auto-Harmonize
                            </button>
                            <button class="theme-quick-action-btn" id="theme-randomize-btn" title="Generate a random stylish palette">
                                <i class="fa fa-random"></i> Roll Palette
                            </button>
                            <button class="theme-creator-close" id="theme-creator-close" title="Close Theme Creator">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Segmented Tabs Navigation -->
                    <div class="theme-inspector-tabs">
                        <button class="theme-tab-btn active" data-tab="generator">
                            <i class="fa fa-sliders"></i> Harmonizer & Presets
                        </button>
                        <button class="theme-tab-btn" data-tab="palette">
                            <i class="fa fa-tint"></i> Color Palette
                        </button>
                        <button class="theme-tab-btn" data-tab="effects">
                            <i class="fa fa-cube"></i> Skin & FX
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div class="theme-creator-content">
                        <!-- Left Panel: Settings Inspector -->
                        <div class="theme-creator-settings">
                            <!-- TAB 1: Generator & Presets -->
                            <div class="tab-pane active" id="tab-pane-generator">
                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-info-circle"></i> Theme Details</h3>
                                    <div class="theme-creator-field">
                                        <label for="theme-name">Theme Name</label>
                                        <input type="text" id="theme-name" placeholder="My Custom Theme" maxlength="50">
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="theme-description">Description</label>
                                        <input type="text" id="theme-description" placeholder="A brief mood description..." maxlength="100">
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="theme-type">Theme Scope</label>
                                        <select id="theme-type">
                                            <option value="app">Complete Application Theme</option>
                                            <option value="card">Card Skin Only</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-wand-magic-sparkles"></i> Chromatic Harmony Engine</h3>
                                    <p class="section-help-text">Pick a brand anchor color. The engine mathematically calculates the secondary complementary/analogous hues, chromatically tints the background and card surfaces, and guarantees WCAG AAA readability.</p>
                                    
                                    <div class="theme-harmonize-controls">
                                        <div class="theme-creator-field">
                                            <label for="harmonize-anchor-color">Brand Anchor Accent</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="harmonize-anchor-color" value="#6366f1">
                                                <input type="text" class="color-hex" data-for="harmonize-anchor-color" value="#6366f1">
                                            </div>
                                        </div>

                                        <div class="theme-creator-field">
                                            <label>Color Harmony Formula</label>
                                            <div class="theme-harmony-chips" id="theme-harmony-chips">
                                                <button type="button" class="harmony-chip active" data-harmony="complementary" title="Opposite 180° hue — high contrast dynamic duo">
                                                    <i class="fa fa-bolt"></i> Complementary
                                                </button>
                                                <button type="button" class="harmony-chip" data-harmony="analogous" title="Adjacent 38° hues — smooth atmospheric mood">
                                                    <i class="fa fa-tint"></i> Analogous
                                                </button>
                                                <button type="button" class="harmony-chip" data-harmony="golden-ratio" title="Golden angle 137.5° hue — organic natural balance">
                                                    <i class="fa fa-star"></i> Golden Ratio
                                                </button>
                                                <button type="button" class="harmony-chip" data-harmony="triadic" title="Equidistant 120° hues — vibrant cyberpunk tri-tone">
                                                    <i class="fa fa-diamond"></i> Triadic Cyber
                                                </button>
                                                <button type="button" class="harmony-chip" data-harmony="monochrome" title="Single hue luminance steps — deep minimal elegance">
                                                    <i class="fa fa-circle"></i> Monochrome
                                                </button>
                                            </div>
                                        </div>

                                        <div class="theme-creator-field">
                                            <label>Canvas Environment & Mood</label>
                                            <div class="theme-mode-chips" id="theme-mode-chips">
                                                <button type="button" class="mode-chip active" data-mode="dark">🌌 Atmospheric Dark</button>
                                                <button type="button" class="mode-chip" data-mode="oled">🌑 OLED Void</button>
                                                <button type="button" class="mode-chip" data-mode="midnight">🌃 Midnight Studio</button>
                                                <button type="button" class="mode-chip" data-mode="slate">❄️ Arctic Slate</button>
                                                <button type="button" class="mode-chip" data-mode="paper">📜 Warm Editorial</button>
                                                <button type="button" class="mode-chip" data-mode="light">☀️ Crisp Light</button>
                                            </div>
                                        </div>

                                        <div class="theme-creator-field">
                                            <label>Live Synthesized Swatches</label>
                                            <div class="harmony-swatch-ribbon" id="harmony-swatch-ribbon">
                                                <div class="ribbon-swatch" id="ribbon-primary" title="Primary Anchor Accent"><span>Primary</span></div>
                                                <div class="ribbon-swatch" id="ribbon-accent" title="Calculated Secondary Accent"><span>Secondary</span></div>
                                                <div class="ribbon-swatch" id="ribbon-bg" title="Tinted Canvas Background"><span>Canvas</span></div>
                                                <div class="ribbon-swatch" id="ribbon-surface" title="Card Surface"><span>Surface</span></div>
                                                <div class="ribbon-swatch" id="ribbon-border" title="Border Trim"><span>Border</span></div>
                                            </div>
                                        </div>

                                        <button class="theme-harmonize-apply-btn" id="harmonize-apply-btn">
                                            <i class="fa fa-wand-magic-sparkles"></i> Synthesize Harmonious Theme
                                        </button>
                                    </div>
                                </div>

                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-swatchbook"></i> Starter Presets</h3>
                                    <div class="theme-preset-grid" id="theme-preset-grid">
                                        <!-- Inserted by populatePresets -->
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 2: Fine-Tuned Color Palette -->
                            <div class="tab-pane" id="tab-pane-palette">
                                <div class="theme-creator-section theme-colors-section">
                                    <div class="color-group">
                                        <h4>Canvas & Surfaces</h4>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-background">App Background</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-background" value="#1a1a2e">
                                                <input type="text" class="color-hex" data-for="color-background" value="#1a1a2e">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-surface">Card Surface</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-surface" value="#252545">
                                                <input type="text" class="color-hex" data-for="color-surface" value="#252545">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-surfaceElevated">Elevated Controls</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-surfaceElevated" value="#2d2d55">
                                                <input type="text" class="color-hex" data-for="color-surfaceElevated" value="#2d2d55">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-sidebarBg">Sidebar / Rail</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-sidebarBg" value="#1f1f3d">
                                                <input type="text" class="color-hex" data-for="color-sidebarBg" value="#1f1f3d">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="color-group">
                                        <h4>Typography & Readability</h4>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-text">Primary Text</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-text" value="#e4e4ed">
                                                <input type="text" class="color-hex" data-for="color-text" value="#e4e4ed">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-textSecondary">Secondary / Muted Text</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-textSecondary" value="#9ca3af">
                                                <input type="text" class="color-hex" data-for="color-textSecondary" value="#9ca3af">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="color-group">
                                        <h4>Accents & Borders</h4>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-primary">Primary Brand</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-primary" value="#6366f1">
                                                <input type="text" class="color-hex" data-for="color-primary" value="#6366f1">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-accent">Accent Highlight</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-accent" value="#8b5cf6">
                                                <input type="text" class="color-hex" data-for="color-accent" value="#8b5cf6">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-border">Border Stroke</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-border" value="#3d3d5c">
                                                <input type="text" class="color-hex" data-for="color-border" value="#3d3d5c">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="color-group">
                                        <h4>Semantic States</h4>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-success">Success</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-success" value="#22c55e">
                                                <input type="text" class="color-hex" data-for="color-success" value="#22c55e">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-warning">Warning</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-warning" value="#f59e0b">
                                                <input type="text" class="color-hex" data-for="color-warning" value="#f59e0b">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-error">Error / Danger</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-error" value="#ef4444">
                                                <input type="text" class="color-hex" data-for="color-error" value="#ef4444">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-info">Info / Tip</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-info" value="#0ea5e9">
                                                <input type="text" class="color-hex" data-for="color-info" value="#0ea5e9">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="color-group">
                                        <h4>Interactive Elements</h4>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-noteBg">Note Editor</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-noteBg" value="#252545">
                                                <input type="text" class="color-hex" data-for="color-noteBg" value="#252545">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-inputBg">Input Background</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-inputBg" value="#252545">
                                                <input type="text" class="color-hex" data-for="color-inputBg" value="#252545">
                                            </div>
                                        </div>
                                        <div class="theme-creator-field color-field">
                                            <label for="color-hoverBg">Hover Highlight</label>
                                            <div class="color-input-wrapper">
                                                <input type="color" id="color-hoverBg" value="#2d2d55">
                                                <input type="text" class="color-hex" data-for="color-hoverBg" value="#2d2d55">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 3: Skin & Effects -->
                            <div class="tab-pane" id="tab-pane-effects">
                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-vector-square"></i> Surface Textures & Finish</h3>
                                    <div class="theme-creator-field">
                                        <label for="card-pattern">Texture & Pattern</label>
                                        <select id="card-pattern">
                                            <option value="none">Smooth Solid</option>
                                            <option value="dots">Subtle Dots</option>
                                            <option value="grid">Matrix Blueprint Grid</option>
                                            <option value="diagonal">Technical Diagonal</option>
                                            <option value="waves">Flowing Waves</option>
                                            <option value="circles">Concentric Rings</option>
                                            <option value="hexagons">Cyber Hexagons</option>
                                            <option value="carbon">Carbon Fiber Mesh</option>
                                            <option value="blueprint">Architectural Graph</option>
                                            <option value="scanlines">Retro CRT Scanlines</option>
                                            <option value="circuit">Tech PCB Circuit</option>
                                            <option value="topography">Topographic Contour</option>
                                            <option value="isometric">Isometric Cube Lattice</option>
                                            <option value="crosshatch">Fine Crosshatch</option>
                                            <option value="stars">Stardust Constellation</option>
                                        </select>
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="card-pattern-opacity">Texture Intensity</label>
                                        <div class="slider-row">
                                            <input type="range" id="card-pattern-opacity" min="0" max="0.35" step="0.01" value="0.08">
                                            <span id="card-pattern-opacity-value" class="slider-val-badge">0.08</span>
                                        </div>
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="card-surface-style">Surface Finish</label>
                                        <select id="card-surface-style">
                                            <option value="solid">Solid Surface (Pure & Fast)</option>
                                            <option value="gradient">Subtle Dual-Tone Depth</option>
                                            <option value="sheen">Ambient Top Light Sheen</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-square-o"></i> Card Geometry & Borders</h3>
                                    <div class="theme-creator-field">
                                        <label for="card-border-radius">Corner Radius</label>
                                        <div class="slider-row">
                                            <input type="range" id="card-border-radius" min="0" max="24" step="1" value="12">
                                            <span id="card-border-radius-value" class="slider-val-badge">12px</span>
                                        </div>
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="card-border-width">Border Thickness</label>
                                        <select id="card-border-width">
                                            <option value="0px">Borderless (0px)</option>
                                            <option value="1px" selected>Crisp Outline (1px)</option>
                                            <option value="2px">Medium Frame (2px)</option>
                                            <option value="3px">Bold Outline (3px)</option>
                                        </select>
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="card-border-style">Border Line Style</label>
                                        <select id="card-border-style">
                                            <option value="solid" selected>Solid Clean</option>
                                            <option value="dashed">Technical Dashed</option>
                                            <option value="dotted">Fine Dotted</option>
                                            <option value="double">Cyber Double Line</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-window-maximize"></i> Header & Accents</h3>
                                    <div class="theme-creator-field">
                                        <label for="card-accent-strip">Top Accent Strip</label>
                                        <select id="card-accent-strip">
                                            <option value="gradient" selected>Glowing Gradient Bar</option>
                                            <option value="primary">Solid Primary Bar</option>
                                            <option value="accent">Solid Accent Bar</option>
                                            <option value="neon">Cyber Neon Glow Bar</option>
                                            <option value="none">No Top Strip</option>
                                        </select>
                                    </div>
                                    <div class="theme-creator-field">
                                        <label for="card-header-style">Title Badge Style</label>
                                        <select id="card-header-style">
                                            <option value="floating" selected>Floating Glass Tag</option>
                                            <option value="pill">Rounded Capsule Pill</option>
                                            <option value="solid">Solid Tinted Badge</option>
                                            <option value="underline">Minimal Accent Underline</option>
                                            <option value="minimal">Pure Clean Typography</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="theme-creator-section">
                                    <h3><i class="fa fa-sun-o"></i> Depth & Lighting</h3>
                                    <div class="theme-creator-field">
                                        <label for="card-shadow-preset">Elevation & Shadow</label>
                                        <select id="card-shadow-preset">
                                            <option value="subtle" selected>Subtle Micro Depth</option>
                                            <option value="elevated">Studio Elevation</option>
                                            <option value="floating">Deep 3D Lift</option>
                                            <option value="ambient">Ambient Neon Aura</option>
                                            <option value="none">Flat & Minimal (No Shadow)</option>
                                        </select>
                                    </div>
                                    <div class="theme-creator-field glow-toggle-row">
                                        <label for="effect-glow">
                                            <input type="checkbox" id="effect-glow">
                                            Ambient Edge Glow
                                        </label>
                                    </div>
                                    <div class="theme-creator-field glow-settings" style="display: none;">
                                        <label for="glow-color">Glow Color</label>
                                        <div class="color-input-wrapper">
                                            <input type="color" id="glow-color" value="#6366f1">
                                            <input type="text" class="color-hex" data-for="glow-color" value="#6366f1">
                                        </div>
                                    </div>
                                    <div class="theme-creator-field glow-settings" style="display: none;">
                                        <label for="glow-intensity">Glow Radius</label>
                                        <div class="slider-row">
                                            <input type="range" id="glow-intensity" min="4" max="32" step="1" value="12">
                                            <span id="glow-intensity-value" class="slider-val-badge">12px</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Live Studio Preview -->
                        <div class="theme-creator-preview">
                            <div class="preview-stage-header">
                                <div class="preview-stage-title">
                                    <i class="fa fa-desktop"></i> Live Studio Stage
                                </div>
                                <div class="preview-view-switcher">
                                    <button class="preview-view-btn active" data-view="card" title="Flashcard with real floating controls">
                                        <i class="fa fa-clone"></i> Card & Buttons
                                    </button>
                                    <button class="preview-view-btn" data-view="document" title="Document & typography view">
                                        <i class="fa fa-file-text-o"></i> Document
                                    </button>
                                    <button class="preview-view-btn" data-view="workspace" title="Full workspace rail view">
                                        <i class="fa fa-th-large"></i> App Shell
                                    </button>
                                </div>
                            </div>

                            <div class="theme-preview-container" id="theme-preview-container">
                                <div class="preview-workspace">
                                    <!-- Sidebar Rail Preview -->
                                    <aside class="preview-rail">
                                        <div class="preview-rail-dot active" title="Knowledge Base"></div>
                                        <div class="preview-rail-dot" title="Neural Flashcards"></div>
                                        <div class="preview-rail-dot" title="Deep Reflection"></div>
                                        <div class="preview-rail-dot" title="Analytics"></div>
                                    </aside>

                                    <!-- Explorer Sidebar Preview -->
                                    <aside class="preview-explorer">
                                        <div class="preview-app-wordmark">ATLAS:Face</div>
                                        <div class="preview-search"><i class="fa fa-search"></i> Search notes...</div>
                                        <div class="preview-tree-item active">
                                            <i class="fa fa-folder-open"></i>
                                            Cognitive Science
                                        </div>
                                        <div class="preview-tree-item">
                                            <i class="fa fa-file-text-o"></i>
                                            Retrieval Practice
                                        </div>
                                        <div class="preview-tree-item">
                                            <i class="fa fa-sitemap"></i>
                                            Concept Graph
                                        </div>
                                    </aside>

                                    <!-- Main Stage Preview -->
                                    <main class="preview-stage">
                                        <!-- Dynamic Stage View Content -->
                                        <div class="preview-view-content" id="preview-view-content">
                                            <!-- Top Document Bar -->
                                            <div class="preview-topbar">
                                                <div>
                                                    <span class="preview-title">Retrieval Practice & Working Memory</span>
                                                    <span class="preview-subtitle">Lesson 04 • Active Recall Synthesis</span>
                                                </div>
                                                <div class="preview-toolbar">
                                                    <button title="Bold"><i class="fa fa-bold"></i></button>
                                                    <button title="List"><i class="fa fa-list-ul"></i></button>
                                                    <button title="Link"><i class="fa fa-link"></i></button>
                                                </div>
                                            </div>

                                            <!-- Interactive Preview Card with REAL Floating Action Buttons -->
                                            <div class="preview-card-showcase">
                                                <article class="preview-interactive-card">
                                                    <div class="preview-card-accent-bar"></div>
                                                    <div class="preview-card-topbar">
                                                        <div class="preview-card-meta">
                                                            <span class="preview-card-badge">Concept</span>
                                                            <span class="preview-card-title">Cognitive Load & Retrieval Cues</span>
                                                        </div>

                                                        <!-- Real Card Floating Controls with Verified FontAwesome Icons -->
                                                        <div class="card-floating-controls preview-floating-controls" title="Hover over buttons to test icon rendering & styles">
                                                            <button class="float-link-btn" title="Link this Card"><i class="fa fa-link"></i></button>
                                                            <button class="focus-links-btn" title="Focus on Links"><i class="fa fa-eye"></i></button>
                                                            <button class="float-blackboard-btn" title="Blackboard Focus"><i class="fa fa-pencil"></i></button>
                                                            <button class="float-network-btn" title="View Network Connections"><i class="fa fa-sitemap"></i></button>
                                                            <button class="float-think-deeper-btn" title="Think Deeper"><i class="fa fa-lightbulb-o"></i></button>
                                                            <button class="float-ai-chat-btn" title="Ask AI"><i class="fa fa-android"></i></button>
                                                            <button class="float-split-btn" title="Split Card"><i class="fa fa-cut"></i></button>
                                                            <button class="float-expand-btn" title="Expand Card"><i class="fa fa-expand"></i></button>
                                                            <button class="float-highlight-btn" title="Highlight Text"><i class="fa fa-paint-brush"></i></button>
                                                            <button class="float-delete-btn" title="Delete Card"><i class="fa fa-trash"></i></button>
                                                        </div>
                                                    </div>

                                                    <div class="preview-card-body">
                                                        <p>Active retrieval reconstructs neural traces far more effectively than passive rereading. Each recall attempt calibrates the synaptic strength of the memory pathway.</p>
                                                        <div class="preview-code-snippet">
                                                            <code>strength = base_ease * pow(interval, stability_factor)</code>
                                                        </div>
                                                    </div>

                                                    <div class="preview-card-footer">
                                                        <div class="preview-card-tags">
                                                            <span class="tag-success"><i class="fa fa-check"></i> Mastered</span>
                                                            <span class="tag-secondary"><i class="fa fa-tag"></i> Neuroscience</span>
                                                            <span class="tag-warning"><i class="fa fa-clock-o"></i> Due Today</span>
                                                        </div>
                                                        <div class="preview-action-pills">
                                                            <button class="preview-btn primary">Review Now</button>
                                                            <button class="preview-btn secondary">Edit Note</button>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <!-- Document View Section -->
                                            <section class="preview-editor-shell">
                                                <div class="preview-editor-toolbar">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <div class="preview-editor-paper">
                                                    <h1>Encoding and Synaptic Consolidation</h1>
                                                    <p>Context cues reshape recall, especially when study intervals are spaced dynamically.</p>
                                                    <blockquote>Retrieval is strongest when the associative path back to the core concept is repeatedly traversed.</blockquote>
                                                    <div class="preview-selection"><i class="fa fa-highlighter"></i> active concept annotation</div>
                                                </div>
                                            </section>
                                        </div>
                                    </main>

                                    <!-- Inspector Aside Preview -->
                                    <aside class="preview-inspector">
                                        <div class="preview-panel-title">Active Resources</div>
                                        <div class="preview-resource active">
                                            <i class="fa fa-file-pdf-o"></i>
                                            <span>Neuroscience_101.pdf</span>
                                        </div>
                                        <div class="preview-resource">
                                            <i class="fa fa-play-circle"></i>
                                            <span>Lecture_Clip.mp4</span>
                                        </div>

                                        <div class="preview-panel-title" style="margin-top: 12px;">Token Palette</div>
                                        <div class="preview-token-row preview-token-primary">
                                            <span>Primary</span>
                                            <b id="preview-token-primary-swatch"></b>
                                        </div>
                                        <div class="preview-token-row preview-token-accent">
                                            <span>Secondary</span>
                                            <b id="preview-token-accent-swatch"></b>
                                        </div>
                                        <div class="preview-token-row preview-token-surface">
                                            <span>Surface</span>
                                            <b id="preview-token-surface-swatch"></b>
                                        </div>
                                        <div class="preview-token-row preview-token-border">
                                            <span>Border</span>
                                            <b id="preview-token-border-swatch"></b>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="theme-creator-footer">
                        <div class="footer-left">
                            <button class="theme-btn secondary" id="theme-import-btn" title="Import JSON theme">
                                <i class="fa fa-upload"></i> Import JSON
                            </button>
                            <button class="theme-btn secondary" id="theme-export-btn" title="Export theme as JSON">
                                <i class="fa fa-download"></i> Export JSON
                            </button>
                        </div>
                        <div class="footer-right">
                            <button class="theme-btn secondary" id="theme-cancel-btn">Cancel</button>
                            <button class="theme-btn primary" id="theme-save-btn">
                                <i class="fa fa-check"></i> Save & Apply Theme
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Import Modal -->
                <div id="theme-import-modal" class="theme-import-overlay" style="display: none;">
                    <div class="theme-import-box">
                        <h3><i class="fa fa-file-code-o"></i> Import Theme JSON</h3>
                        <p>Paste your theme JSON configuration below:</p>
                        <textarea id="theme-import-textarea" placeholder='{"name": "My Theme", "colors": { ... }}'></textarea>
                        <div class="theme-import-actions">
                            <button class="theme-btn secondary" id="theme-import-cancel">Cancel</button>
                            <button class="theme-btn primary" id="theme-import-confirm"><i class="fa fa-check"></i> Import</button>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML("beforeend",t),this.populatePresets()}populatePresets(){const t=document.getElementById("theme-preset-grid");if(!t)return;const e=s.getPresets();t.innerHTML=Object.entries(e).map(([o,r])=>`
            <div class="theme-preset-item" data-preset="${o}" title="${r.description}">
                <div class="preset-preview" style="background: ${r.colors.background}; border-color: ${r.colors.border||r.colors.primary};">
                    <div class="preset-surface" style="background: ${r.colors.surface};"></div>
                    <div class="preset-accent" style="background: ${r.colors.primary};"></div>
                </div>
                <span class="preset-name">${r.name}</span>
            </div>
        `).join("")}attachEventListeners(){document.getElementById("theme-creator-close")?.addEventListener("click",()=>this.close()),document.getElementById("theme-cancel-btn")?.addEventListener("click",()=>this.close()),document.getElementById(`${this.modalId}-overlay`)?.addEventListener("click",t=>{t.target.id===`${this.modalId}-overlay`&&this.close()}),document.getElementById("theme-save-btn")?.addEventListener("click",()=>this.saveTheme()),document.getElementById("theme-import-btn")?.addEventListener("click",()=>this.showImportModal()),document.getElementById("theme-export-btn")?.addEventListener("click",()=>this.exportTheme()),document.getElementById("theme-import-cancel")?.addEventListener("click",()=>this.hideImportModal()),document.getElementById("theme-import-confirm")?.addEventListener("click",()=>this.importTheme()),document.querySelectorAll(".theme-tab-btn").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.tab;this.switchTab(o)})}),document.querySelectorAll(".preview-view-btn").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.view;this.switchPreviewView(o)})}),document.querySelectorAll(".harmony-chip").forEach(t=>{t.addEventListener("click",e=>{document.querySelectorAll(".harmony-chip").forEach(o=>o.classList.remove("active")),e.currentTarget.classList.add("active"),this.applyHarmonizer()})}),document.querySelectorAll(".mode-chip").forEach(t=>{t.addEventListener("click",e=>{document.querySelectorAll(".mode-chip").forEach(o=>o.classList.remove("active")),e.currentTarget.classList.add("active"),this.applyHarmonizer()})}),document.querySelectorAll(".tint-chip").forEach(t=>{t.addEventListener("click",e=>{document.querySelectorAll(".tint-chip").forEach(o=>o.classList.remove("active")),e.currentTarget.classList.add("active"),this.applyHarmonizer()})}),document.getElementById("harmonize-anchor-color")?.addEventListener("input",t=>{this.applyHarmonizer()}),document.getElementById("harmonize-apply-btn")?.addEventListener("click",()=>this.applyHarmonizer()),document.getElementById("theme-auto-harmonize-btn")?.addEventListener("click",()=>this.applyHarmonizer()),document.getElementById("theme-randomize-btn")?.addEventListener("click",()=>this.rollRandomPalette()),document.getElementById("theme-preset-grid")?.addEventListener("click",t=>{const e=t.target.closest(".theme-preset-item");e&&this.applyPreset(e.dataset.preset)}),document.getElementById("effect-glow")?.addEventListener("change",t=>{document.querySelectorAll(".glow-settings").forEach(e=>{e.style.display=t.target.checked?"block":"none"}),this.updatePreview()}),document.querySelectorAll(".color-hex").forEach(t=>{t.addEventListener("input",e=>{const o=document.getElementById(e.target.dataset.for);o&&/^#[0-9A-Fa-f]{6}$/.test(e.target.value)&&(o.value=e.target.value,this.schedulePreviewUpdate())})}),document.querySelectorAll('input[type="color"]').forEach(t=>{t.addEventListener("input",e=>{const o=document.querySelector(`.color-hex[data-for="${e.target.id}"]`);o&&(o.value=e.target.value),this.schedulePreviewUpdate()})}),document.getElementById("card-pattern-opacity")?.addEventListener("input",t=>{document.getElementById("card-pattern-opacity-value").textContent=t.target.value,this.schedulePreviewUpdate()}),document.getElementById("card-border-radius")?.addEventListener("input",t=>{document.getElementById("card-border-radius-value").textContent=t.target.value+"px",this.schedulePreviewUpdate()}),document.getElementById("glow-intensity")?.addEventListener("input",t=>{document.getElementById("glow-intensity-value").textContent=t.target.value+"px",this.schedulePreviewUpdate()}),document.getElementById("card-pattern")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-surface-style")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-border-width")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-border-style")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-accent-strip")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-header-style")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("card-shadow-preset")?.addEventListener("change",()=>this.updatePreview()),document.getElementById("theme-name")?.addEventListener("input",()=>this.updatePreview())}switchTab(t){this.activeTab=t,document.querySelectorAll(".theme-tab-btn").forEach(e=>{e.classList.toggle("active",e.dataset.tab===t)}),document.querySelectorAll(".tab-pane").forEach(e=>{e.classList.toggle("active",e.id===`tab-pane-${t}`)})}switchPreviewView(t){this.activePreviewView=t,document.querySelectorAll(".preview-view-btn").forEach(r=>{r.classList.toggle("active",r.dataset.view===t)});const e=document.querySelector(".preview-card-showcase"),o=document.querySelector(".preview-editor-shell");t==="card"?(e&&(e.style.display="block"),o&&(o.style.display="none")):t==="document"?(e&&(e.style.display="none"),o&&(o.style.display="block")):(e&&(e.style.display="block"),o&&(o.style.display="block"))}applyHarmonizer(){const t=document.getElementById("harmonize-anchor-color"),e=t?.value||this.getColorInput("color-primary")||"#6366f1",o=document.querySelector(".mode-chip.active"),r=o?o.dataset.mode:"dark",a=document.querySelector(".harmony-chip.active"),n=a?a.dataset.harmony:"complementary",c=document.querySelector(".tint-chip.active"),d=c?c.dataset.tint:"balanced",i=s.autoHarmonizePalette(e,{toneMode:r,harmonyType:n,tintIntensity:d});if(this.setColorInput("color-background",i.background),this.setColorInput("color-surface",i.surface),this.setColorInput("color-surfaceElevated",i.surfaceElevated),this.setColorInput("color-sidebarBg",i.sidebarBg),this.setColorInput("color-noteBg",i.noteBg),this.setColorInput("color-inputBg",i.inputBg),this.setColorInput("color-hoverBg",i.hoverBg),this.setColorInput("color-text",i.text),this.setColorInput("color-textSecondary",i.textSecondary),this.setColorInput("color-border",i.border),this.setColorInput("color-primary",i.primary),this.setColorInput("color-accent",i.accent),this.setColorInput("color-success",i.success),this.setColorInput("color-warning",i.warning),this.setColorInput("color-error",i.error),this.setColorInput("color-info",i.info),t&&t.value!==e){t.value=e;const l=document.querySelector('.color-hex[data-for="harmonize-anchor-color"]');l&&(l.value=e)}this.updatePreview()}rollRandomPalette(){const t=Math.floor(Math.random()*360),e=75+Math.floor(Math.random()*25),o=48+Math.floor(Math.random()*12),r=s.hslToHex(t,e,o),a=["complementary","analogous","golden-ratio","triadic","monochrome"],n=["dark","oled","midnight","slate","paper"],c=a[Math.floor(Math.random()*a.length)],d=n[Math.floor(Math.random()*n.length)];document.querySelectorAll(".harmony-chip").forEach(l=>{l.classList.toggle("active",l.dataset.harmony===c)}),document.querySelectorAll(".mode-chip").forEach(l=>{l.classList.toggle("active",l.dataset.mode===d)});const i=document.getElementById("harmonize-anchor-color");if(i){i.value=r;const l=document.querySelector('.color-hex[data-for="harmonize-anchor-color"]');l&&(l.value=r)}this.applyHarmonizer(),this.showNotification(`Synthesized ${c} palette on ${d} canvas!`)}schedulePreviewUpdate(){this.colorInputDebounce&&clearTimeout(this.colorInputDebounce),this.colorInputDebounce=setTimeout(()=>{this.updatePreview()},80)}open(t=null){document.getElementById(`${this.modalId}-overlay`)||(this.createModalHTML(),this.attachEventListeners()),t?(this.isEditing=!0,this.currentTheme=JSON.parse(JSON.stringify(t)),this.originalTheme=JSON.parse(JSON.stringify(t)),document.getElementById("theme-creator-title-text").textContent="Edit Theme Studio",this.loadThemeIntoForm(t)):(this.isEditing=!1,this.currentTheme=s.createTheme("My Custom Theme"),this.originalTheme=null,document.getElementById("theme-creator-title-text").textContent="Theme Studio",this.resetForm()),document.getElementById(`${this.modalId}-overlay`).style.display="flex",document.body.style.overflow="hidden",this.switchTab("generator"),this.switchPreviewView("card"),this.updatePreview()}close(){const t=document.getElementById(`${this.modalId}-overlay`);t&&(t.style.display="none"),document.body.style.overflow="",this.currentTheme=null,this.isEditing=!1,this.originalTheme=null}resetForm(){document.getElementById("theme-name").value="My Custom Theme",document.getElementById("theme-description").value="Harmonious dark studio palette",document.getElementById("theme-type").value="app";const t=I.colors;this.setColorInput("color-background",t.background),this.setColorInput("color-surface",t.surface),this.setColorInput("color-surfaceElevated",t.surfaceElevated),this.setColorInput("color-text",t.text),this.setColorInput("color-textSecondary",t.textSecondary),this.setColorInput("color-border",t.border),this.setColorInput("color-primary",t.primary),this.setColorInput("color-accent",t.accent),this.setColorInput("color-success",t.success),this.setColorInput("color-warning",t.warning),this.setColorInput("color-error",t.error),this.setColorInput("color-info",t.info),this.setColorInput("color-sidebarBg",t.sidebarBg),this.setColorInput("color-noteBg",t.noteBg),this.setColorInput("color-inputBg",t.inputBg),this.setColorInput("color-hoverBg",t.hoverBg),document.getElementById("effect-glow").checked=!1,document.querySelectorAll(".glow-settings").forEach(e=>e.style.display="none")}loadThemeIntoForm(t){document.getElementById("theme-name").value=t.name||"",document.getElementById("theme-description").value=t.description||"",document.getElementById("theme-type").value=t.type||"app";const e=t.colors;this.setColorInput("color-background",e.background),this.setColorInput("color-surface",e.surface),this.setColorInput("color-surfaceElevated",e.surfaceElevated),this.setColorInput("color-text",e.text),this.setColorInput("color-textSecondary",e.textSecondary),this.setColorInput("color-border",e.border),this.setColorInput("color-primary",e.primary),this.setColorInput("color-accent",e.accent),this.setColorInput("color-success",e.success),this.setColorInput("color-warning",e.warning),this.setColorInput("color-error",e.error),this.setColorInput("color-info",e.info),this.setColorInput("color-sidebarBg",e.sidebarBg||e.surfaceSecondary||e.background),this.setColorInput("color-noteBg",e.noteBg||e.surface),this.setColorInput("color-inputBg",e.inputBg||e.surface),this.setColorInput("color-hoverBg",e.hoverBg||e.surfaceElevated);const o=!!t.effects?.glowColor;if(document.getElementById("effect-glow").checked=o,document.querySelectorAll(".glow-settings").forEach(r=>r.style.display=o?"block":"none"),o){this.setColorInput("glow-color",t.effects.glowColor);const r=t.effects.glowIntensity||12;document.getElementById("glow-intensity").value=r;const a=document.getElementById("glow-intensity-value");a&&(a.textContent=r+"px")}if(t.cardSkin){document.getElementById("card-pattern").value=t.cardSkin.pattern||"none";const r=t.cardSkin.patternOpacity??.08;document.getElementById("card-pattern-opacity").value=r;const a=document.getElementById("card-pattern-opacity-value");a&&(a.textContent=r);const n=parseInt(t.cardSkin.borderRadius)||12;document.getElementById("card-border-radius").value=n;const c=document.getElementById("card-border-radius-value");c&&(c.textContent=n+"px"),document.getElementById("card-border-width")&&(document.getElementById("card-border-width").value=t.cardSkin.borderWidth||"1px"),document.getElementById("card-border-style")&&(document.getElementById("card-border-style").value=t.cardSkin.borderStyle||"solid"),document.getElementById("card-surface-style")&&(document.getElementById("card-surface-style").value=t.cardSkin.surfaceStyle||"solid"),document.getElementById("card-accent-strip")&&(document.getElementById("card-accent-strip").value=t.cardSkin.accentStrip||"gradient"),document.getElementById("card-header-style")&&(document.getElementById("card-header-style").value=t.cardSkin.headerStyle||"floating"),document.getElementById("card-shadow-preset")&&(document.getElementById("card-shadow-preset").value=t.cardSkin.shadowPreset||"subtle")}}setColorInput(t,e){const o=document.getElementById(t),r=document.querySelector(`.color-hex[data-for="${t}"]`);o&&(o.value=e||"#000000"),r&&(r.value=e||"#000000")}getColorInput(t){return document.getElementById(t)?.value||"#000000"}applyPreset(t){const e=E[t];if(!e)return;const o=e.colors;this.setColorInput("color-background",o.background),this.setColorInput("color-surface",o.surface),this.setColorInput("color-surfaceElevated",o.surfaceElevated),this.setColorInput("color-text",o.text),this.setColorInput("color-textSecondary",o.textSecondary),this.setColorInput("color-border",o.border),this.setColorInput("color-primary",o.primary),this.setColorInput("color-accent",o.accent||o.primary),this.setColorInput("color-sidebarBg",o.sidebarBg||o.surfaceSecondary||o.background),this.setColorInput("color-noteBg",o.noteBg||o.surface),this.setColorInput("color-inputBg",o.inputBg||o.surface),this.setColorInput("color-hoverBg",o.hoverBg||o.surfaceElevated),document.querySelectorAll(".theme-preset-item").forEach(r=>{r.classList.toggle("selected",r.dataset.preset===t)}),this.updatePreview()}getThemeFromForm(){const t=this.currentTheme||s.createTheme();t.name=document.getElementById("theme-name").value||"Untitled Theme",t.description=document.getElementById("theme-description").value||"",t.type=document.getElementById("theme-type").value||"app";const e=this.getColorInput("color-sidebarBg")||this.getColorInput("color-background"),o=this.getColorInput("color-noteBg")||this.getColorInput("color-surface"),r=this.getColorInput("color-inputBg")||this.getColorInput("color-surface"),a=this.getColorInput("color-hoverBg")||this.getColorInput("color-surfaceElevated");t.colors={background:this.getColorInput("color-background"),backgroundRgb:s.hexToRgb(this.getColorInput("color-background")),surface:this.getColorInput("color-surface"),surfaceRgb:s.hexToRgb(this.getColorInput("color-surface")),surfaceElevated:this.getColorInput("color-surfaceElevated"),surfaceSecondary:e,sidebarBg:e,noteBg:o,inputBg:r,hoverBg:a,text:this.getColorInput("color-text"),textRgb:s.hexToRgb(this.getColorInput("color-text")),textSecondary:this.getColorInput("color-textSecondary"),textMuted:this.getColorInput("color-textSecondary"),border:this.getColorInput("color-border"),borderSubtle:this.getColorInput("color-border"),borderMedium:this.getColorInput("color-border"),primary:this.getColorInput("color-primary"),primaryRgb:s.hexToRgb(this.getColorInput("color-primary")),primaryHover:s.darkenColor(this.getColorInput("color-primary"),10),primaryDark:s.darkenColor(this.getColorInput("color-primary"),20),accent:this.getColorInput("color-accent"),accentRgb:s.hexToRgb(this.getColorInput("color-accent")),accentHover:s.darkenColor(this.getColorInput("color-accent"),10),success:this.getColorInput("color-success"),successLight:this.getColorInput("color-success")+"33",warning:this.getColorInput("color-warning"),warningLight:this.getColorInput("color-warning")+"33",error:this.getColorInput("color-error"),errorLight:this.getColorInput("color-error")+"33",info:this.getColorInput("color-info"),infoLight:this.getColorInput("color-info")+"33",modalOverlay:"rgba(0, 0, 0, 0.85)",modalBg:this.getColorInput("color-surface"),modalHeaderBg:this.getColorInput("color-surfaceElevated"),modalFooterBg:this.getColorInput("color-surfaceElevated")},t.effects={glowColor:document.getElementById("effect-glow").checked?this.getColorInput("glow-color"):null,glowIntensity:parseInt(document.getElementById("glow-intensity").value)||12,borderGlow:document.getElementById("effect-glow").checked};const n=document.getElementById("card-pattern")?.value||"none",c=parseFloat(document.getElementById("card-pattern-opacity")?.value)||.08,d=(document.getElementById("card-border-radius")?.value||12)+"px",i=document.getElementById("card-border-width")?.value||"1px",l=document.getElementById("card-border-style")?.value||"solid",p=document.getElementById("card-surface-style")?.value||"solid",u=document.getElementById("card-accent-strip")?.value||"gradient",h=document.getElementById("card-header-style")?.value||"floating",v=document.getElementById("card-shadow-preset")?.value||"subtle";return t.cardSkin={background:`linear-gradient(135deg, ${t.colors.surface} 0%, ${t.colors.background} 100%)`,border:`${i} ${l} ${t.colors.border}`,borderWidth:i,borderStyle:l,borderRadius:d,surfaceStyle:p,accentStrip:u,headerStyle:h,shadowPreset:v,boxShadow:"0 4px 20px rgba(0, 0, 0, 0.3)",textColor:t.colors.text,titleColor:t.colors.accent,titleBackground:t.colors.accent+"1a",pattern:n,patternOpacity:c},t}updatePreview(){const t=this.getThemeFromForm(),e=document.getElementById("theme-preview-container");if(!e)return;const o=s.getThemeRenderTokens(t),r=o.colors,a=t.cardSkin||{};if(e.style.setProperty("--preview-bg",r.background),e.style.setProperty("--preview-surface",r.surface),e.style.setProperty("--preview-surface-elevated",r.surfaceElevated),e.style.setProperty("--preview-text",r.text),e.style.setProperty("--preview-text-secondary",r.textSecondary),e.style.setProperty("--preview-border",r.border),e.style.setProperty("--preview-primary",r.primary),e.style.setProperty("--preview-accent",r.accent),e.style.setProperty("--preview-success",r.success),e.style.setProperty("--preview-warning",r.warning),e.style.setProperty("--preview-error",r.error),e.style.setProperty("--preview-info",r.info),e.style.setProperty("--preview-bg-rgb",o.bgRgb),e.style.setProperty("--preview-text-rgb",o.textRgb),e.style.setProperty("--preview-primary-rgb",o.primaryRgb),e.style.setProperty("--preview-accent-rgb",o.accentRgb),e.style.setProperty("--preview-sidebar",o.sidebarBg),e.style.setProperty("--preview-note-bg",o.noteBg),e.style.setProperty("--preview-input-bg",o.inputBg),e.style.setProperty("--preview-hover-bg",o.hoverBg),e.style.setProperty("--preview-active-bg",o.activeBg),e.style.setProperty("--preview-card-radius",a.borderRadius||"12px"),e.style.setProperty("--preview-card-border-width",a.borderWidth||"1px"),e.style.setProperty("--preview-card-border-style",a.borderStyle||"solid"),a.surfaceStyle==="gradient"?e.style.setProperty("--preview-card-surface",`linear-gradient(145deg, ${r.noteBg} 0%, ${r.background} 100%)`):a.surfaceStyle==="sheen"?e.style.setProperty("--preview-card-surface",`linear-gradient(180deg, ${r.surfaceElevated} 0%, ${r.noteBg} 35%)`):e.style.setProperty("--preview-card-surface",r.noteBg),a.shadowPreset==="none"?e.style.setProperty("--preview-card-shadow","none"):a.shadowPreset==="elevated"?e.style.setProperty("--preview-card-shadow","0 8px 24px rgba(0, 0, 0, 0.28)"):a.shadowPreset==="floating"?e.style.setProperty("--preview-card-shadow","0 16px 36px rgba(0, 0, 0, 0.38), 0 2px 6px rgba(0, 0, 0, 0.15)"):a.shadowPreset==="ambient"?e.style.setProperty("--preview-card-shadow",`0 0 24px rgba(${o.primaryRgb}, 0.28)`):e.style.setProperty("--preview-card-shadow","0 4px 16px rgba(0, 0, 0, 0.18)"),a.accentStrip==="none"?e.style.setProperty("--preview-accent-bar-display","none"):(e.style.setProperty("--preview-accent-bar-display","block"),a.accentStrip==="primary"?(e.style.setProperty("--preview-accent-bar-bg",r.primary),e.style.setProperty("--preview-accent-bar-shadow","none")):a.accentStrip==="accent"?(e.style.setProperty("--preview-accent-bar-bg",r.accent),e.style.setProperty("--preview-accent-bar-shadow","none")):a.accentStrip==="neon"?(e.style.setProperty("--preview-accent-bar-bg",r.accent),e.style.setProperty("--preview-accent-bar-shadow",`0 0 12px ${r.accent}`)):(e.style.setProperty("--preview-accent-bar-bg",`linear-gradient(90deg, ${r.primary} 0%, ${r.accent} 100%)`),e.style.setProperty("--preview-accent-bar-shadow",`0 0 8px rgba(${o.accentRgb}, 0.5)`))),a.headerStyle==="pill"?(e.style.setProperty("--preview-title-badge-radius","999px"),e.style.setProperty("--preview-title-badge-bg",`rgba(${o.accentRgb}, 0.18)`),e.style.setProperty("--preview-title-badge-border",`1px solid rgba(${o.accentRgb}, 0.35)`),e.style.setProperty("--preview-title-badge-shadow",`0 0 6px rgba(${o.accentRgb}, 0.2)`)):a.headerStyle==="solid"?(e.style.setProperty("--preview-title-badge-radius","6px"),e.style.setProperty("--preview-title-badge-bg",r.surfaceElevated),e.style.setProperty("--preview-title-badge-border",`1px solid ${r.border}`),e.style.setProperty("--preview-title-badge-shadow","none")):a.headerStyle==="underline"||a.headerStyle==="minimal"?(e.style.setProperty("--preview-title-badge-radius","0px"),e.style.setProperty("--preview-title-badge-bg","transparent"),e.style.setProperty("--preview-title-badge-border","none"),e.style.setProperty("--preview-title-badge-shadow","none")):(e.style.setProperty("--preview-title-badge-radius","4px"),e.style.setProperty("--preview-title-badge-bg",`rgba(${o.accentRgb}, 0.18)`),e.style.setProperty("--preview-title-badge-border",`1px solid rgba(${o.accentRgb}, 0.35)`),e.style.setProperty("--preview-title-badge-shadow",`0 0 6px rgba(${o.accentRgb}, 0.2)`)),t.effects?.glowColor?e.style.setProperty("--preview-glow",`0 0 ${t.effects.glowIntensity}px ${t.effects.glowColor}`):e.style.setProperty("--preview-glow","none"),a.pattern&&a.pattern!=="none"&&f[a.pattern]){const w=f[a.pattern];e.style.setProperty("--preview-card-pattern",w),e.style.setProperty("--preview-card-pattern-size",C?.[a.pattern]||"auto"),e.style.setProperty("--preview-pattern-opacity",a.patternOpacity??.08)}else e.style.setProperty("--preview-card-pattern","none"),e.style.setProperty("--preview-card-pattern-size","auto"),e.style.setProperty("--preview-pattern-opacity","0");const n=document.getElementById("preview-token-primary-swatch");n&&(n.style.background=r.primary);const c=document.getElementById("preview-token-accent-swatch");c&&(c.style.background=r.accent);const d=document.getElementById("preview-token-surface-swatch");d&&(d.style.background=r.surface);const i=document.getElementById("preview-token-border-swatch");i&&(i.style.background=r.border);const l=document.getElementById("ribbon-primary");l&&(l.style.background=r.primary,l.title=`Primary: ${r.primary}`);const p=document.getElementById("ribbon-accent");p&&(p.style.background=r.accent,p.title=`Secondary Accent: ${r.accent}`);const u=document.getElementById("ribbon-bg");u&&(u.style.background=r.background,u.title=`Canvas: ${r.background}`);const h=document.getElementById("ribbon-surface");h&&(h.style.background=r.surface,h.title=`Surface: ${r.surface}`);const v=document.getElementById("ribbon-border");v&&(v.style.background=r.border,v.title=`Border: ${r.border}`);const g=s.calculateContrastRatio(r.text,r.surface),m=document.getElementById("theme-contrast-badge"),b=document.getElementById("contrast-val"),y=document.getElementById("contrast-level");m&&b&&y&&(b.textContent=`${g}:1`,g>=7?(m.className="theme-contrast-badge pass-aaa",y.textContent="WCAG AAA"):g>=4.5?(m.className="theme-contrast-badge pass-aa",y.textContent="WCAG AA"):(m.className="theme-contrast-badge fail",y.textContent="Low Contrast"))}saveTheme(){const t=this.getThemeFromForm();if(!t.name.trim()){this.showNotification("Please enter a theme name","error");return}try{s.saveTheme(t),typeof s.applyCustomTheme=="function"?s.applyCustomTheme(t.id):typeof s.applyTheme=="function"?s.applyTheme(t.id):B(t.id),this.showNotification(`Theme "${t.name}" saved & applied!`),this.refreshCustomThemesList(),this.close()}catch(e){console.error("[ThemeCreator] Error saving/applying theme:",e),this.showNotification("Failed to save theme: "+e.message,"error")}}showImportModal(){document.getElementById("theme-import-modal").style.display="flex",document.getElementById("theme-import-textarea").value=""}hideImportModal(){document.getElementById("theme-import-modal").style.display="none"}importTheme(){const t=document.getElementById("theme-import-textarea").value.trim();if(!t){this.showNotification("Please paste valid theme JSON","error");return}try{const e=s.importTheme(t);this.loadThemeIntoForm(e),this.currentTheme=e,this.isEditing=!0,this.hideImportModal(),this.updatePreview(),this.showNotification(`Theme "${e.name}" imported successfully!`)}catch(e){this.showNotification("Failed to import theme: "+e.message,"error")}}exportTheme(){const t=this.getThemeFromForm(),e=JSON.stringify(t,null,2);navigator.clipboard.writeText(e).then(()=>{this.showNotification("Theme JSON copied to clipboard!")}).catch(()=>{prompt("Copy this theme JSON:",e)})}refreshCustomThemesList(){window.dispatchEvent(new CustomEvent("customThemesUpdated"))}showNotification(t,e="success"){typeof window.showToast=="function"?window.showToast(t,e):`${e.toUpperCase()}${t}`}}const L=new x;export{x as ThemeCreatorModal,L as default,L as themeCreatorModal};
