import{x as o}from"./index-DCtijOJy.js";import"./vendor-codemirror-DUfYp2mG.js";import"./vendor-markdown-BkjUMIlX.js";import"./vendor-graph-DwCx8zU5.js";class h{constructor(){this.currentLessonId=null,this.isOpen=!1,this.canvas=null,this.ctx=null,this.isDrawing=!1,this.lastX=0,this.lastY=0,this.isDragging=!1,this.dragStartX=0,this.dragStartY=0,this.panelX=0,this.panelY=0,this.isEraserMode=!1,this.undoStack=[],this.maxUndoSteps=20,this.drawingSettings={strokeStyle:"#3498db",lineWidth:3,lineCap:"round",lineJoin:"round"},this.initializeScratchpad()}initializeScratchpad(){this.createScratchpadPanel(),this.attachEventListeners(),this.setupKeyboardShortcut()}createScratchpadPanel(){const t=document.createElement("div");t.id="scratchpad-panel",t.className="scratchpad-panel",t.setAttribute("data-feature","scratch"),t.innerHTML=`
            <div class="scratchpad-header" id="scratchpad-drag-handle">
                <span class="scratchpad-title">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    Scratchpad
                </span>
                <div class="scratchpad-header-controls">
                    <button id="scratchpad-minimize-btn" class="scratchpad-header-btn" title="Minimize">
                        <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <button id="scratchpad-close-btn" class="scratchpad-header-btn" title="Close (Alt+S)">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            
            <div class="scratchpad-toolbar">
                <div class="scratchpad-tools">
                    <button id="scratchpad-pen" class="scratchpad-tool-btn active" title="Pen">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button id="scratchpad-eraser" class="scratchpad-tool-btn" title="Eraser">
                        <i class="fa fa-eraser" aria-hidden="true"></i>
                    </button>
                    <input type="color" id="scratchpad-color" value="#3498db" title="Pen Color">
                    <input type="range" id="scratchpad-size" min="1" max="15" value="3" title="Brush Size">
                    <div class="scratchpad-bg-selector">
                        <button id="scratchpad-bg-btn" class="scratchpad-tool-btn" title="Background">
                            <i class="fa fa-square-o" aria-hidden="true"></i>
                        </button>
                        <div id="scratchpad-bg-menu" class="scratchpad-bg-menu">
                            <button class="scratchpad-bg-option" data-bg="white" title="White">
                                <span class="bg-preview bg-white"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="cream" title="Cream">
                                <span class="bg-preview bg-cream"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="grid" title="Grid">
                                <span class="bg-preview bg-grid"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="dots" title="Dots">
                                <span class="bg-preview bg-dots"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="lined" title="Lined">
                                <span class="bg-preview bg-lined"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="dark" title="Dark">
                                <span class="bg-preview bg-dark"></span>
                            </button>
                            <button class="scratchpad-bg-option" data-bg="blackboard" title="Blackboard">
                                <span class="bg-preview bg-blackboard"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="scratchpad-actions">
                    <button id="scratchpad-undo" class="scratchpad-action-btn" title="Undo (Ctrl+Z)">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </button>
                    <button id="scratchpad-clear" class="scratchpad-action-btn" title="Clear All">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button id="scratchpad-save" class="scratchpad-action-btn scratchpad-save-btn" title="Save to Lesson">
                        <i class="fa fa-save" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            
            <div class="scratchpad-canvas-container" id="scratchpad-canvas-container">
                <canvas id="scratchpad-canvas"></canvas>
            </div>
            
            <div class="scratchpad-footer">
                <span class="scratchpad-hint">Tip: Draw to work through problems during review</span>
            </div>
            
            <!-- Resize handle -->
            <div class="scratchpad-resize-handle" id="scratchpad-resize-handle"></div>
        `,document.body.appendChild(t),this.positionPanel(),this.canvas=document.getElementById("scratchpad-canvas"),this.ctx=this.canvas.getContext("2d"),this.panel=t,this.currentBackground="white",this.resizeCanvas()}positionPanel(){const t=document.getElementById("scratchpad-panel");if(!t)return;const e=20;this.panelX=window.innerWidth-t.offsetWidth-e,this.panelY=window.innerHeight-t.offsetHeight-e,this.panelX=Math.max(0,this.panelX),this.panelY=Math.max(0,this.panelY),t.style.left=this.panelX+"px",t.style.top=this.panelY+"px"}resizeCanvas(){if(!this.canvas||!this.ctx)return;const t=this.canvas.parentElement;if(!t)return;let e=null;if(this.canvas.width>0&&this.canvas.height>0)try{e=this.canvas.toDataURL("image/png")}catch{}const a=t.getBoundingClientRect();if(this.canvas.width=a.width,this.canvas.height=a.height,this.applyDrawingSettings(),e){const i=new Image;i.onload=()=>{this.ctx.drawImage(i,0,0)},i.src=e}}applyDrawingSettings(){this.ctx&&(this.ctx.strokeStyle=this.drawingSettings.strokeStyle,this.ctx.lineWidth=this.drawingSettings.lineWidth,this.ctx.lineCap=this.drawingSettings.lineCap,this.ctx.lineJoin=this.drawingSettings.lineJoin)}attachEventListeners(){document.getElementById("scratchpad-close-btn")?.addEventListener("click",()=>{this.close()}),document.getElementById("scratchpad-minimize-btn")?.addEventListener("click",()=>{this.toggleMinimize()}),document.getElementById("scratchpad-pen")?.addEventListener("click",()=>{this.setTool("pen")}),document.getElementById("scratchpad-eraser")?.addEventListener("click",()=>{this.setTool("eraser")}),document.getElementById("scratchpad-color")?.addEventListener("input",s=>{this.drawingSettings.strokeStyle=s.target.value,this.setTool("pen")}),document.getElementById("scratchpad-size")?.addEventListener("input",s=>{this.drawingSettings.lineWidth=parseInt(s.target.value),this.applyDrawingSettings()});const t=document.getElementById("scratchpad-bg-btn"),e=document.getElementById("scratchpad-bg-menu");t&&e&&(t.addEventListener("click",s=>{s.stopPropagation(),e.classList.toggle("show")}),e.querySelectorAll(".scratchpad-bg-option").forEach(s=>{s.addEventListener("click",r=>{r.stopPropagation();const d=s.dataset.bg;this.setBackground(d),e.classList.remove("show")})}),document.addEventListener("click",()=>{e.classList.remove("show")})),document.getElementById("scratchpad-undo")?.addEventListener("click",()=>{this.undo()}),document.getElementById("scratchpad-clear")?.addEventListener("click",()=>{this.clearCanvas()}),document.getElementById("scratchpad-save")?.addEventListener("click",()=>{this.saveToLesson()});const a=document.getElementById("scratchpad-drag-handle");a&&(a.addEventListener("mousedown",s=>this.startDrag(s)),a.addEventListener("dblclick",()=>this.toggleMinimize())),document.addEventListener("mousemove",s=>this.drag(s)),document.addEventListener("mouseup",()=>this.stopDrag());const i=document.getElementById("scratchpad-resize-handle");i&&i.addEventListener("mousedown",s=>this.startResize(s)),document.addEventListener("mousemove",s=>this.resize(s)),document.addEventListener("mouseup",()=>this.stopResize()),this.canvas&&(this.canvas.addEventListener("mousedown",s=>this.startDrawing(s)),this.canvas.addEventListener("mousemove",s=>this.draw(s)),this.canvas.addEventListener("mouseup",()=>this.stopDrawing()),this.canvas.addEventListener("mouseout",()=>this.stopDrawing()),this.canvas.addEventListener("touchstart",s=>this.handleTouchStart(s)),this.canvas.addEventListener("touchmove",s=>this.handleTouchMove(s)),this.canvas.addEventListener("touchend",()=>this.stopDrawing())),window.addEventListener("resize",o(()=>{this.isOpen&&this.keepInBounds()},100))}setupKeyboardShortcut(){document.addEventListener("keydown",t=>{t.altKey&&t.key.toLowerCase()==="s"&&(t.preventDefault(),this.toggle()),t.ctrlKey&&t.key.toLowerCase()==="z"&&this.isOpen&&document.getElementById("scratchpad-panel")?.matches(":hover")&&(t.preventDefault(),this.undo())})}setTool(t){const e=document.getElementById("scratchpad-pen"),a=document.getElementById("scratchpad-eraser");t==="pen"?(this.isEraserMode=!1,e?.classList.add("active"),a?.classList.remove("active"),this.canvas.style.cursor="crosshair",this.applyDrawingSettings()):t==="eraser"&&(this.isEraserMode=!0,e?.classList.remove("active"),a?.classList.add("active"),this.canvas.style.cursor="cell")}setBackground(t){const e=document.getElementById("scratchpad-canvas-container");if(!e)return;e.classList.remove("bg-white","bg-cream","bg-grid","bg-dots","bg-lined","bg-dark","bg-blackboard"),e.classList.add(`bg-${t}`),this.currentBackground=t;const a=document.getElementById("scratchpad-color");(t==="dark"||t==="blackboard")&&(this.drawingSettings.strokeStyle==="#3498db"||this.drawingSettings.strokeStyle==="#000000")&&(this.drawingSettings.strokeStyle="#ffffff",a&&(a.value="#ffffff"),this.applyDrawingSettings())}startDrawing(t){if(!this.ctx)return;this.saveUndoState(),this.isDrawing=!0;const e=this.canvas.getBoundingClientRect();this.lastX=t.clientX-e.left,this.lastY=t.clientY-e.top}draw(t){if(!this.isDrawing||!this.ctx)return;const e=this.canvas.getBoundingClientRect(),a=t.clientX-e.left,i=t.clientY-e.top;this.ctx.beginPath(),this.isEraserMode?(this.ctx.globalCompositeOperation="destination-out",this.ctx.lineWidth=this.drawingSettings.lineWidth*3):(this.ctx.globalCompositeOperation="source-over",this.applyDrawingSettings()),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(a,i),this.ctx.stroke(),this.lastX=a,this.lastY=i}stopDrawing(){this.isDrawing&&(this.isDrawing=!1,this.ctx.globalCompositeOperation="source-over")}handleTouchStart(t){t.preventDefault();const e=t.touches[0];this.startDrawing({clientX:e.clientX,clientY:e.clientY})}handleTouchMove(t){t.preventDefault();const e=t.touches[0];this.draw({clientX:e.clientX,clientY:e.clientY})}saveUndoState(){if(this.canvas)try{const t=this.canvas.toDataURL("image/png");this.undoStack.push(t),this.undoStack.length>this.maxUndoSteps&&this.undoStack.shift()}catch{}}undo(){if(this.undoStack.length===0)return;const t=this.undoStack.pop(),e=new Image;e.onload=()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(e,0,0)},e.src=t}clearCanvas(){!this.ctx||!this.canvas||(this.saveUndoState(),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.showNotification("Canvas cleared"))}startDrag(t){if(t.target.closest(".scratchpad-header-btn"))return;this.isDragging=!0;const e=document.getElementById("scratchpad-panel");this.dragStartX=t.clientX-e.offsetLeft,this.dragStartY=t.clientY-e.offsetTop,e.style.cursor="grabbing"}drag(t){if(!this.isDragging)return;t.preventDefault();const e=document.getElementById("scratchpad-panel");let a=t.clientX-this.dragStartX,i=t.clientY-this.dragStartY;a=Math.max(0,Math.min(a,window.innerWidth-e.offsetWidth)),i=Math.max(0,Math.min(i,window.innerHeight-e.offsetHeight)),e.style.left=a+"px",e.style.top=i+"px",this.panelX=a,this.panelY=i}stopDrag(){if(this.isDragging){this.isDragging=!1;const t=document.getElementById("scratchpad-panel");t&&(t.style.cursor="")}}startResize(t){this.isResizing=!0,this.resizeStartX=t.clientX,this.resizeStartY=t.clientY;const e=document.getElementById("scratchpad-panel");this.resizeStartWidth=e.offsetWidth,this.resizeStartHeight=e.offsetHeight}resize(t){if(!this.isResizing)return;t.preventDefault();const e=document.getElementById("scratchpad-panel"),a=Math.max(250,this.resizeStartWidth+(t.clientX-this.resizeStartX)),i=Math.max(300,this.resizeStartHeight+(t.clientY-this.resizeStartY));e.style.width=a+"px",e.style.height=i+"px",this.resizeCanvas()}stopResize(){this.isResizing&&(this.isResizing=!1)}keepInBounds(){const t=document.getElementById("scratchpad-panel");if(!t)return;const e=window.innerWidth-t.offsetWidth,a=window.innerHeight-t.offsetHeight;this.panelX>e&&(this.panelX=Math.max(0,e),t.style.left=this.panelX+"px"),this.panelY>a&&(this.panelY=Math.max(0,a),t.style.top=this.panelY+"px")}toggleMinimize(){const t=document.getElementById("scratchpad-panel");if(!t)return;t.classList.toggle("minimized");const e=t.classList.contains("minimized"),a=document.getElementById("scratchpad-minimize-btn");a&&(a.innerHTML=e?'<i class="fa fa-plus" aria-hidden="true"></i>':'<i class="fa fa-minus" aria-hidden="true"></i>')}open(){const t=document.getElementById("scratchpad-panel");t&&(this.isOpen=!0,t.classList.add("active"),t.classList.remove("minimized"),this.currentLessonId=window.state?.getCurrentLessonId(),this.positionPanel(),setTimeout(()=>this.resizeCanvas(),100),this.loadFromLesson(),this.currentLessonId)}close(){const t=document.getElementById("scratchpad-panel");t&&(this.isOpen=!1,t.classList.remove("active"))}toggle(){this.isOpen?this.close():this.open()}saveToLesson(){if(!this.currentLessonId||!window.state){typeof window.showTopicPicker=="function"?window.showTopicPicker({message:"Pick a topic to save scratchpad",onSelect:e=>{this.currentLessonId=e,this.saveToLesson()}}):this.showNotification("Select a lesson first","warning");return}const t=window.state.findLesson(this.currentLessonId);if(!t){this.showNotification("Lesson not found","warning");return}try{const e=this.canvas.toDataURL("image/png");t.scratchpadData||(t.scratchpadData=[]),t.scratchpadData.push({image:e,timestamp:new Date().toISOString(),width:this.canvas.width,height:this.canvas.height}),t.scratchpadData.length>10&&(t.scratchpadData=t.scratchpadData.slice(-10)),window.saveData&&window.saveData(),this.showNotification("Saved to lesson!","success"),t.name}catch(e){console.error("[Scratchpad] Save failed:",e),this.showNotification("Save failed","error")}}loadFromLesson(){if(!this.currentLessonId||!window.state)return;const t=window.state.findLesson(this.currentLessonId);if(!t?.scratchpadData?.length){this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);return}const e=t.scratchpadData[t.scratchpadData.length-1];if(e?.image){const a=new Image;a.onload=()=>{this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx?.drawImage(a,0,0,this.canvas.width,this.canvas.height)},a.src=e.image}}showNotification(t,e="info"){window.showStatusMessage&&window.showStatusMessage(t,e,2e3)}}let n=null;function c(){n||(n=new h,window.scratchpadManager=n)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();export{h as ScratchpadManager,n as scratchpadManager};
