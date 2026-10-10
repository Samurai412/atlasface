/**
 * Thinking Toolkit — Community Plugin for ATLAS Face
 * ===================================================
 * A comprehensive collection of mental models and thinking frameworks
 * inspired by untools.co. Each tool provides an interactive workspace
 * with AI assistance and card export integration.
 *
 * Tools included:
 *   Decision Making: Six Thinking Hats, Eisenhower Matrix, Decision Matrix,
 *                    Impact-Effort Matrix, Second-Order Thinking, OODA Loop,
 *                    Ladder of Inference, Hard Choice Model, Cynefin Framework,
 *                    Confidence Speed/Quality
 *   Problem Solving: Ishikawa Diagram, Abstraction Laddering, Inversion,
 *                    Issue Trees, Zwicky Box, Conflict Resolution Diagram,
 *                    Productive Thinking Model
 *   Systems Thinking: Iceberg Model, Connection Circles, Concept Map,
 *                     Balancing Feedback Loop, Reinforcing Feedback Loop
 *   Communication:   Minto Pyramid, Situation-Behavior-Impact
 */

/* ═══════════════════════════════════════════════════════════════════
   TOOL DEFINITIONS
   ═══════════════════════════════════════════════════════════════════ */

const CATEGORIES = {
    decision: { label: 'Decision Making', icon: 'fa-balance-scale', color: '#818cf8' },
    problem:  { label: 'Problem Solving', icon: 'fa-wrench', color: '#f59e0b' },
    systems:  { label: 'Systems Thinking', icon: 'fa-cogs', color: '#10b981' },
    comms:    { label: 'Communication', icon: 'fa-comments', color: '#ec4899' },
};

const TOOLS = [
    // ── Decision Making ─────────────────────────────────────────
    {
        id: 'six-thinking-hats',
        name: 'Six Thinking Hats',
        category: 'decision',
        description: 'Look at a decision from six distinct perspectives',
        icon: 'fa-graduation-cap',
        render: renderSixThinkingHats,
    },
    {
        id: 'eisenhower-matrix',
        name: 'Eisenhower Matrix',
        category: 'decision',
        description: 'Prioritize by urgency and importance',
        icon: 'fa-th-large',
        render: renderEisenhowerMatrix,
    },
    {
        id: 'decision-matrix',
        name: 'Decision Matrix',
        category: 'decision',
        description: 'Choose the best option by weighing multiple factors',
        icon: 'fa-table',
        render: renderDecisionMatrix,
    },
    {
        id: 'impact-effort-matrix',
        name: 'Impact-Effort Matrix',
        category: 'decision',
        description: 'Prioritize by weighing impact against effort',
        icon: 'fa-arrows',
        render: renderImpactEffortMatrix,
    },
    {
        id: 'second-order-thinking',
        name: 'Second-Order Thinking',
        category: 'decision',
        description: 'Consider the long-term consequences of decisions',
        icon: 'fa-link',
        render: renderSecondOrderThinking,
    },
    {
        id: 'ooda-loop',
        name: 'OODA Loop',
        category: 'decision',
        description: 'Make faster decisions with incomplete data',
        icon: 'fa-refresh',
        render: renderOODALoop,
    },
    {
        id: 'ladder-of-inference',
        name: 'Ladder of Inference',
        category: 'decision',
        description: 'Avoid jumping to conclusions — decide based on reality',
        icon: 'fa-sort-amount-asc',
        render: renderLadderOfInference,
    },
    {
        id: 'hard-choice-model',
        name: 'Hard Choice Model',
        category: 'decision',
        description: 'Figure out what kind of decision you are making',
        icon: 'fa-question-circle',
        render: renderHardChoiceModel,
    },
    {
        id: 'cynefin-framework',
        name: 'Cynefin Framework',
        category: 'decision',
        description: 'Make sense of situations to choose an appropriate response',
        icon: 'fa-compass',
        render: renderCynefinFramework,
    },
    {
        id: 'confidence-speed-quality',
        name: 'Confidence → Speed vs Quality',
        category: 'decision',
        description: 'Determine the trade-off between speed and quality',
        icon: 'fa-tachometer',
        render: renderConfidenceSpeedQuality,
    },
    // ── Problem Solving ─────────────────────────────────────────
    {
        id: 'ishikawa-diagram',
        name: 'Ishikawa Diagram',
        category: 'problem',
        description: 'Identify root causes of problems',
        icon: 'fa-share-alt',
        render: renderIshikawaDiagram,
    },
    {
        id: 'abstraction-laddering',
        name: 'Abstraction Laddering',
        category: 'problem',
        description: 'Frame problems at different levels of abstraction',
        icon: 'fa-exchange',
        render: renderAbstractionLaddering,
    },
    {
        id: 'inversion',
        name: 'Inversion',
        category: 'problem',
        description: 'Approach a problem from the opposite direction',
        icon: 'fa-random',
        render: renderInversion,
    },
    {
        id: 'issue-trees',
        name: 'Issue Trees (MECE)',
        category: 'problem',
        description: 'Structure problems into mutually exclusive, collectively exhaustive branches',
        icon: 'fa-sitemap',
        render: renderIssueTrees,
    },
    {
        id: 'zwicky-box',
        name: 'Zwicky Box',
        category: 'problem',
        description: 'Generate unique solutions via morphological analysis',
        icon: 'fa-cubes',
        render: renderZwickyBox,
    },
    {
        id: 'conflict-resolution',
        name: 'Conflict Resolution Diagram',
        category: 'problem',
        description: 'Find win-win solutions to conflicts',
        icon: 'fa-handshake-o',
        render: renderConflictResolution,
    },
    {
        id: 'productive-thinking',
        name: 'Productive Thinking Model',
        category: 'problem',
        description: 'Solve problems creatively with a 6-step process',
        icon: 'fa-lightbulb-o',
        render: renderProductiveThinking,
    },
    // ── Systems Thinking ────────────────────────────────────────
    {
        id: 'iceberg-model',
        name: 'Iceberg Model',
        category: 'systems',
        description: 'Uncover root causes by looking at hidden levels',
        icon: 'fa-diamond',
        render: renderIcebergModel,
    },
    {
        id: 'connection-circles',
        name: 'Connection Circles',
        category: 'systems',
        description: 'Map relationships and feedback loops in systems',
        icon: 'fa-circle-o',
        render: renderConnectionCircles,
    },
    {
        id: 'concept-map',
        name: 'Concept Map',
        category: 'systems',
        description: 'Visualize relationships between entities',
        icon: 'fa-project-diagram',
        render: renderConceptMap,
    },
    {
        id: 'balancing-feedback-loop',
        name: 'Balancing Feedback Loop',
        category: 'systems',
        description: 'Understand mechanisms that create stability',
        icon: 'fa-minus-circle',
        render: renderBalancingFeedbackLoop,
    },
    {
        id: 'reinforcing-feedback-loop',
        name: 'Reinforcing Feedback Loop',
        category: 'systems',
        description: 'Understand forces behind exponential changes',
        icon: 'fa-plus-circle',
        render: renderReinforcingFeedbackLoop,
    },
    // ── Communication ───────────────────────────────────────────
    {
        id: 'minto-pyramid',
        name: 'Minto Pyramid',
        category: 'comms',
        description: 'Structure communication for clarity and efficiency',
        icon: 'fa-sort-amount-desc',
        render: renderMintoPyramid,
    },
    {
        id: 'situation-behavior-impact',
        name: 'Situation-Behavior-Impact',
        category: 'comms',
        description: 'Give clearer feedback without judgement',
        icon: 'fa-commenting-o',
        render: renderSBI,
    },
];

/* ═══════════════════════════════════════════════════════════════════
   SHARED UTILITIES
   ═══════════════════════════════════════════════════════════════════ */

let _uid = 0;
function uid() { return `tt-${++_uid}-${Date.now().toString(36)}`; }
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/** Try to call the app's AI (uses the ai-client service which auto-fetches the API key) */
async function aiCall(prompt, opts = {}) {
    // 1. Prefer the already-exposed ai-client service (auto-resolves API key from settings)
    if (window._aiClient && typeof window._aiClient.callAI === 'function') {
        return await window._aiClient.callAI(prompt, {
            temperature: opts.temperature ?? 0.7,
            maxOutputTokens: opts.max_tokens ?? 4096,
        });
    }

    // 2. If the global has not been exposed yet, import the shared ai-client directly.
    // Blob-loaded community plugins cannot use relative imports, so resolve from the app URL.
    try {
        const aiClientUrl = new URL('./services/ai-client.js', window.location.href).href;
        const mod = await import(/* @vite-ignore */ aiClientUrl);
        if (mod && typeof mod.callAI === 'function') {
            return await mod.callAI(prompt, {
                temperature: opts.temperature ?? 0.7,
                maxOutputTokens: opts.max_tokens ?? 4096,
            });
        }
    } catch (err) {
        console.warn('[ThinkingToolkit] Shared ai-client import failed, falling back to legacy AI path:', err?.message || err);
    }

    // 3. Final fallback: renderer.js callAI (requires manual key)
    if (typeof window.callAI === 'function') {
        let apiKey = typeof window.getAIApiKey === 'function' ? window.getAIApiKey() : '';
        if (!apiKey) {
            try {
                const settings = JSON.parse(localStorage.getItem('studyapp-settings') || '{}');
                apiKey = settings.aiApiKey || localStorage.getItem('setting_ai_api_key') || '';
            } catch {
                apiKey = localStorage.getItem('setting_ai_api_key') || '';
            }
        }
        if (!apiKey) throw new Error('AI API key not set — go to Settings to add your Groq key');
        return await window.callAI(prompt, apiKey);
    }
    throw new Error('AI not available — please configure an API key in Settings');
}

/** Add cards to the current topic */
function addCardsToTopic(cards, ctx) {
    const state = ctx?.state || window.state;
    if (!state) { throw new Error('App state not available'); }
    const lessonId = state.getCurrentLessonId();
    if (!lessonId) { throw new Error('No topic is currently open'); }

    let added = 0;
    for (const c of cards) {
        const card = {
            id: Date.now() + added + Math.floor(Math.random() * 1000),
            type: 'text',
            title: c.title || 'Thinking Tool Card',
            content: c.content || '',
            gsW: c.gsW || 4,
            gsH: c.gsH || 3,
            links: [],
            tags: c.tags || ['thinking-toolkit'],
            srs_dueDate: null,
            srs_interval: 0,
            srs_easeFactor: 2.5,
            srs_reviews: 0,
            srs_lapses: 0,
            srs_ignored: false,
            createdAt: new Date().toISOString(),
        };
        state.addCard(lessonId, card);
        added++;
    }
    return added;
}

/** Show toast via ctx or window */
function toast(msg, type = 'info', ctx = null) {
    if (ctx?.showToast) { ctx.showToast(msg, type); return; }
    if (typeof window.showToast === 'function') { window.showToast(msg, type); }
}

/** Create a textarea element with common styling */
function makeTextarea(placeholder, rows = 3) {
    const ta = document.createElement('textarea');
    ta.className = 'tt-textarea';
    ta.placeholder = placeholder;
    ta.rows = rows;
    ta.spellcheck = false;
    return ta;
}

/** Create a button element */
function makeBtn(label, icon, className = '') {
    const btn = document.createElement('button');
    btn.className = `tt-btn ${className}`.trim();
    btn.innerHTML = icon ? `<i class="fa ${icon}"></i> ${label}` : label;
    return btn;
}

/** Create an AI-assist button that does work */
function makeAIBtn(label = 'AI Assist') {
    const btn = makeBtn(label, 'fa-magic', 'tt-btn-ai');
    return btn;
}

/** Create section header */
function makeSection(title, subtitle = '') {
    const el = document.createElement('div');
    el.className = 'tt-section';
    el.innerHTML = `<h3 class="tt-section-title">${esc(title)}</h3>` +
        (subtitle ? `<p class="tt-section-sub">${esc(subtitle)}</p>` : '');
    return el;
}

/** Simple editable list */
function makeEditableList(items, onChange) {
    const ul = document.createElement('ul');
    ul.className = 'tt-editable-list';

    function rebuild() {
        ul.innerHTML = '';
        items.forEach((text, i) => {
            const li = document.createElement('li');
            li.className = 'tt-editable-item';
            const span = document.createElement('span');
            span.className = 'tt-item-text';
            span.contentEditable = true;
            span.textContent = text;
            span.addEventListener('blur', () => {
                items[i] = span.textContent.trim();
                if (onChange) onChange(items);
            });
            span.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); span.blur(); }
            });
            const del = document.createElement('button');
            del.className = 'tt-btn-icon tt-btn-danger';
            del.innerHTML = '<i class="fa fa-times"></i>';
            del.addEventListener('click', () => { items.splice(i, 1); rebuild(); if (onChange) onChange(items); });
            li.appendChild(span);
            li.appendChild(del);
            ul.appendChild(li);
        });
        // Add button
        const addLi = document.createElement('li');
        addLi.className = 'tt-add-item';
        const addBtn = document.createElement('button');
        addBtn.className = 'tt-btn-icon tt-btn-add';
        addBtn.innerHTML = '<i class="fa fa-plus"></i> Add';
        addBtn.addEventListener('click', () => {
            items.push('');
            rebuild();
            const lastSpan = ul.querySelectorAll('.tt-item-text');
            if (lastSpan.length) lastSpan[lastSpan.length - 1].focus();
        });
        addLi.appendChild(addBtn);
        ul.appendChild(addLi);
    }

    rebuild();
    return { el: ul, rebuild };
}


/* ═══════════════════════════════════════════════════════════════════
   TOOL RENDERERS
   Each function: render(container, ctx) → void
   ═══════════════════════════════════════════════════════════════════ */

// ─── SIX THINKING HATS ─────────────────────────────────────────────

const HATS = [
    { id: 'white',  color: '#f1f5f9', textColor: '#334155', label: 'White Hat',  subtitle: 'Facts & Information', prompt: 'What facts and data do we have? What information is missing?' },
    { id: 'red',    color: '#fca5a5', textColor: '#7f1d1d', label: 'Red Hat',    subtitle: 'Feelings & Intuition', prompt: 'What is your gut feeling? What emotions does this evoke?' },
    { id: 'black',  color: '#374151', textColor: '#f9fafb', label: 'Black Hat',  subtitle: 'Caution & Risks', prompt: 'What could go wrong? What are the risks and downsides?' },
    { id: 'yellow', color: '#fde68a', textColor: '#78350f', label: 'Yellow Hat', subtitle: 'Benefits & Optimism', prompt: 'What are the benefits? What is the best-case scenario?' },
    { id: 'green',  color: '#86efac', textColor: '#14532d', label: 'Green Hat',  subtitle: 'Creativity & Ideas', prompt: 'What alternatives exist? What new ideas can we think of?' },
    { id: 'blue',   color: '#93c5fd', textColor: '#1e3a5f', label: 'Blue Hat',   subtitle: 'Process & Overview', prompt: 'What is our thinking process? What conclusions can we draw?' },
];

function renderSixThinkingHats(container, ctx) {
    const data = { topic: '', hats: {} };
    HATS.forEach(h => data.hats[h.id] = '');

    const topicInput = makeTextarea('What decision or topic are you thinking about?', 2);
    const hatsGrid = document.createElement('div');
    hatsGrid.className = 'tt-hats-grid';

    HATS.forEach(hat => {
        const card = document.createElement('div');
        card.className = 'tt-hat-card';
        card.style.background = hat.color;
        card.style.color = hat.textColor;
        card.innerHTML = `
            <div class="tt-hat-header">
                <span class="tt-hat-dot" style="background:${hat.id === 'white' ? '#cbd5e1' : hat.color}; border: 2px solid ${hat.textColor}33"></span>
                <strong>${hat.label}</strong>
            </div>
            <p class="tt-hat-subtitle">${hat.subtitle}</p>
            <p class="tt-hat-prompt">${hat.prompt}</p>
        `;
        const ta = document.createElement('textarea');
        ta.className = 'tt-hat-textarea';
        ta.placeholder = 'Your thoughts...';
        ta.rows = 4;
        ta.addEventListener('input', () => data.hats[hat.id] = ta.value);
        card.appendChild(ta);
        hatsGrid.appendChild(card);
    });

    // AI button
    const aiBtn = makeAIBtn('AI: Fill All Hats');
    aiBtn.addEventListener('click', async () => {
        data.topic = topicInput.value.trim();
        if (!data.topic) { toast('Enter a topic first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Thinking...';
        try {
            const prompt = `You are an expert in Edward de Bono's Six Thinking Hats technique.

Topic: "${data.topic}"

For each hat, provide a thoughtful analysis (2-4 sentences each). Respond with a JSON object:
{"white": "...", "red": "...", "black": "...", "yellow": "...", "green": "...", "blue": "..."}

Only the JSON, no markdown fences.`;
            const raw = await aiCall(prompt, { temperature: 0.7, max_tokens: 1000 });
            const match = raw.match(/\{[\s\S]*\}/);
            const result = match ? JSON.parse(match[0]) : JSON.parse(raw);
            HATS.forEach(hat => {
                if (result[hat.id]) {
                    data.hats[hat.id] = result[hat.id];
                    const ta = hatsGrid.querySelector(`.tt-hat-card:nth-child(${HATS.indexOf(hat) + 1}) textarea`);
                    if (ta) ta.value = result[hat.id];
                }
            });
            toast('All hats filled!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Fill All Hats'; }
    });

    // Export
    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        data.topic = topicInput.value.trim();
        if (!data.topic) { toast('Enter a topic first', 'warning', ctx); return; }
        const cards = HATS.filter(h => data.hats[h.id]).map(h => ({
            title: `${h.label}: ${data.topic}`,
            content: `<p><strong>${h.subtitle}</strong></p><p>${esc(data.hats[h.id])}</p>`,
            tags: ['thinking-toolkit', 'six-thinking-hats', h.id],
        }));
        if (cards.length === 0) { toast('Fill at least one hat first', 'warning', ctx); return; }
        try { const n = addCardsToTopic(cards, ctx); toast(`Added ${n} cards`, 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);

    container.append(
        makeSection('Six Thinking Hats', 'Examine a decision from six perspectives'),
        topicInput, hatsGrid, actions
    );
}


// ─── EISENHOWER MATRIX ──────────────────────────────────────────────

function renderEisenhowerMatrix(container, ctx) {
    const quadrants = {
        do:       { label: 'Do First',  sub: 'Urgent + Important', color: '#ef4444', items: [] },
        schedule: { label: 'Schedule',   sub: 'Not Urgent + Important', color: '#3b82f6', items: [] },
        delegate: { label: 'Delegate',   sub: 'Urgent + Not Important', color: '#f59e0b', items: [] },
        eliminate:{ label: 'Eliminate',   sub: 'Not Urgent + Not Important', color: '#6b7280', items: [] },
    };

    const grid = document.createElement('div');
    grid.className = 'tt-matrix-grid';

    // Axis labels
    const yLabel = document.createElement('div');
    yLabel.className = 'tt-axis-label tt-axis-y';
    yLabel.innerHTML = '<span>Important</span><span>Not Important</span>';
    const xLabel = document.createElement('div');
    xLabel.className = 'tt-axis-label tt-axis-x';
    xLabel.innerHTML = '<span>Urgent</span><span>Not Urgent</span>';

    Object.entries(quadrants).forEach(([key, q]) => {
        const cell = document.createElement('div');
        cell.className = 'tt-matrix-cell';
        cell.dataset.quadrant = key;
        cell.innerHTML = `
            <div class="tt-matrix-header" style="border-left: 3px solid ${q.color}">
                <strong>${q.label}</strong>
                <small>${q.sub}</small>
            </div>
        `;
        const list = makeEditableList(q.items, () => {});
        cell.appendChild(list.el);
        grid.appendChild(cell);
    });

    // AI
    const topicInput = makeTextarea('What tasks or decisions are you trying to prioritize?', 2);
    const aiBtn = makeAIBtn('AI: Categorize');
    aiBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        if (!topic) { toast('Enter tasks to categorize', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Analyzing...';
        try {
            const raw = await aiCall(`Categorize these tasks/items into an Eisenhower Matrix.

Tasks: "${topic}"

Respond with JSON: {"do": ["..."], "schedule": ["..."], "delegate": ["..."], "eliminate": ["..."]}
Only JSON, no fences.`, { temperature: 0.5, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            Object.keys(quadrants).forEach(key => {
                if (Array.isArray(result[key])) {
                    quadrants[key].items.push(...result[key]);
                    const cell = grid.querySelector(`[data-quadrant="${key}"]`);
                    const list = makeEditableList(quadrants[key].items);
                    const oldList = cell.querySelector('.tt-editable-list');
                    if (oldList) oldList.replaceWith(list.el);
                    else cell.appendChild(list.el);
                }
            });
            toast('Tasks categorized!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Categorize'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const cards = Object.values(quadrants).filter(q => q.items.length > 0).map(q => ({
            title: `Eisenhower: ${q.label}`,
            content: `<p><strong>${q.sub}</strong></p><ul>${q.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`,
            tags: ['thinking-toolkit', 'eisenhower-matrix'],
        }));
        if (cards.length === 0) { toast('Add items first', 'warning', ctx); return; }
        try { const n = addCardsToTopic(cards, ctx); toast(`Added ${n} cards`, 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Eisenhower Matrix', 'Prioritize tasks by urgency and importance'), topicInput, yLabel, grid, xLabel, actions);
}


// ─── DECISION MATRIX ────────────────────────────────────────────────

function renderDecisionMatrix(container, ctx) {
    const data = { question: '', options: ['Option A', 'Option B'], criteria: [{ name: 'Cost', weight: 3 }, { name: 'Quality', weight: 4 }], scores: {} };

    function rebuildTable() {
        table.innerHTML = '';
        // Header
        const thead = document.createElement('thead');
        let headerRow = '<tr><th>Criteria</th><th>Weight</th>';
        data.options.forEach((o, i) => {
            headerRow += `<th><input class="tt-table-input tt-opt-name" data-i="${i}" value="${esc(o)}" /></th>`;
        });
        headerRow += '<th><button class="tt-btn-icon tt-btn-add tt-add-opt"><i class="fa fa-plus"></i></button></th></tr>';
        thead.innerHTML = headerRow;
        table.appendChild(thead);

        // Body
        const tbody = document.createElement('tbody');
        data.criteria.forEach((c, ci) => {
            let row = `<tr>
                <td><input class="tt-table-input tt-crit-name" data-ci="${ci}" value="${esc(c.name)}" /></td>
                <td><input class="tt-table-input tt-crit-weight" data-ci="${ci}" type="number" min="1" max="10" value="${c.weight}" /></td>`;
            data.options.forEach((_, oi) => {
                const key = `${ci}-${oi}`;
                const val = data.scores[key] || 0;
                row += `<td><input class="tt-table-input tt-score" data-key="${key}" type="number" min="0" max="10" value="${val}" /></td>`;
            });
            row += `<td><button class="tt-btn-icon tt-btn-danger tt-del-crit" data-ci="${ci}"><i class="fa fa-times"></i></button></td></tr>`;
            tbody.innerHTML += row;
        });
        // Add criteria row
        tbody.innerHTML += `<tr><td colspan="${data.options.length + 3}"><button class="tt-btn-icon tt-btn-add tt-add-crit"><i class="fa fa-plus"></i> Add Criteria</button></td></tr>`;
        table.appendChild(tbody);

        // Totals
        const tfoot = document.createElement('tfoot');
        let totRow = '<tr><td><strong>Total</strong></td><td></td>';
        data.options.forEach((_, oi) => {
            let total = 0;
            data.criteria.forEach((c, ci) => {
                total += (data.scores[`${ci}-${oi}`] || 0) * c.weight;
            });
            totRow += `<td class="tt-total"><strong>${total}</strong></td>`;
        });
        totRow += '<td></td></tr>';
        tfoot.innerHTML = totRow;
        table.appendChild(tfoot);

        // Wire events
        table.querySelectorAll('.tt-opt-name').forEach(inp => inp.addEventListener('change', e => { data.options[+e.target.dataset.i] = e.target.value; rebuildTable(); }));
        table.querySelectorAll('.tt-crit-name').forEach(inp => inp.addEventListener('change', e => { data.criteria[+e.target.dataset.ci].name = e.target.value; }));
        table.querySelectorAll('.tt-crit-weight').forEach(inp => inp.addEventListener('change', e => { data.criteria[+e.target.dataset.ci].weight = +e.target.value; rebuildTable(); }));
        table.querySelectorAll('.tt-score').forEach(inp => inp.addEventListener('change', e => { data.scores[e.target.dataset.key] = +e.target.value; rebuildTable(); }));
        table.querySelectorAll('.tt-add-opt').forEach(b => b.addEventListener('click', () => { data.options.push(`Option ${data.options.length + 1}`); rebuildTable(); }));
        table.querySelectorAll('.tt-add-crit').forEach(b => b.addEventListener('click', () => { data.criteria.push({ name: '', weight: 3 }); rebuildTable(); }));
        table.querySelectorAll('.tt-del-crit').forEach(b => b.addEventListener('click', e => { data.criteria.splice(+e.target.closest('button').dataset.ci, 1); rebuildTable(); }));
    }

    const questionInput = makeTextarea('What decision are you trying to make?', 2);
    const table = document.createElement('table');
    table.className = 'tt-decision-table';
    rebuildTable();

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        let html = `<table><thead><tr><th>Criteria</th><th>Weight</th>${data.options.map(o => `<th>${esc(o)}</th>`).join('')}</tr></thead><tbody>`;
        data.criteria.forEach((c, ci) => {
            html += `<tr><td>${esc(c.name)}</td><td>${c.weight}</td>`;
            data.options.forEach((_, oi) => { html += `<td>${data.scores[`${ci}-${oi}`] || 0}</td>`; });
            html += '</tr>';
        });
        html += '</tbody></table>';
        try { const n = addCardsToTopic([{ title: `Decision Matrix: ${questionInput.value.trim() || 'Untitled'}`, content: html, tags: ['thinking-toolkit', 'decision-matrix'], gsW: 6, gsH: 4 }], ctx); toast(`Added ${n} card`, 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(exportBtn);
    container.append(makeSection('Decision Matrix', 'Score options against weighted criteria'), questionInput, table, actions);
}


// ─── IMPACT-EFFORT MATRIX ───────────────────────────────────────────

function renderImpactEffortMatrix(container, ctx) {
    const quadrants = {
        quickWins:  { label: 'Quick Wins',    sub: 'High Impact, Low Effort', color: '#22c55e', items: [] },
        bigProjects:{ label: 'Big Projects',   sub: 'High Impact, High Effort', color: '#3b82f6', items: [] },
        fillIns:    { label: 'Fill-Ins',       sub: 'Low Impact, Low Effort', color: '#f59e0b', items: [] },
        timeWasters:{ label: 'Time Wasters',   sub: 'Low Impact, High Effort', color: '#ef4444', items: [] },
    };

    const grid = document.createElement('div');
    grid.className = 'tt-matrix-grid';

    Object.entries(quadrants).forEach(([key, q]) => {
        const cell = document.createElement('div');
        cell.className = 'tt-matrix-cell';
        cell.innerHTML = `<div class="tt-matrix-header" style="border-left: 3px solid ${q.color}"><strong>${q.label}</strong><small>${q.sub}</small></div>`;
        const list = makeEditableList(q.items);
        cell.appendChild(list.el);
        grid.appendChild(cell);
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const cards = Object.values(quadrants).filter(q => q.items.length > 0).map(q => ({
            title: `Impact-Effort: ${q.label}`,
            content: `<p><strong>${q.sub}</strong></p><ul>${q.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`,
            tags: ['thinking-toolkit', 'impact-effort-matrix'],
        }));
        if (cards.length === 0) { toast('Add items first', 'warning', ctx); return; }
        try { const n = addCardsToTopic(cards, ctx); toast(`Added ${n} cards`, 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(exportBtn);
    container.append(makeSection('Impact-Effort Matrix', 'Prioritize by weighing impact against effort'), grid, actions);
}


// ─── SECOND-ORDER THINKING ──────────────────────────────────────────

function renderSecondOrderThinking(container, ctx) {
    const data = { decision: '', orders: [{ label: '1st Order', items: [] }, { label: '2nd Order', items: [] }, { label: '3rd Order', items: [] }] };

    const decisionInput = makeTextarea('What decision are you considering?', 2);
    const chain = document.createElement('div');
    chain.className = 'tt-consequence-chain';

    function rebuild() {
        chain.innerHTML = '';
        data.orders.forEach((order, idx) => {
            const block = document.createElement('div');
            block.className = 'tt-order-block';
            block.innerHTML = `<div class="tt-order-label"><span class="tt-order-badge">${idx + 1}</span> ${esc(order.label)} Effects</div>`;
            if (idx > 0) {
                const arrow = document.createElement('div');
                arrow.className = 'tt-chain-arrow';
                arrow.textContent = '↓ then what?';
                chain.appendChild(arrow);
            }
            const list = makeEditableList(order.items);
            block.appendChild(list.el);
            chain.appendChild(block);
        });
    }
    rebuild();

    const aiBtn = makeAIBtn('AI: Trace Consequences');
    aiBtn.addEventListener('click', async () => {
        data.decision = decisionInput.value.trim();
        if (!data.decision) { toast('Enter a decision first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Thinking...';
        try {
            const raw = await aiCall(`Apply second-order thinking to this decision: "${data.decision}"

For each order of consequences, list 2-4 effects.

Respond with JSON: {"first": ["..."], "second": ["..."], "third": ["..."]}
Only JSON.`, { temperature: 0.6, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.first) data.orders[0].items = result.first;
            if (result.second) data.orders[1].items = result.second;
            if (result.third) data.orders[2].items = result.third;
            rebuild();
            toast('Consequences traced!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Trace Consequences'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = data.orders.map(o => `<h4>${esc(o.label)} Effects</h4><ul>${o.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
        try { addCardsToTopic([{ title: `Second-Order: ${decisionInput.value.trim() || 'Untitled'}`, content, tags: ['thinking-toolkit', 'second-order-thinking'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Second-Order Thinking', 'And then what? Trace the chain of consequences'), decisionInput, chain, actions);
}


// ─── OODA LOOP ──────────────────────────────────────────────────────

function renderOODALoop(container, ctx) {
    const phases = [
        { id: 'observe', label: 'Observe', icon: 'fa-eye', color: '#3b82f6', prompt: 'Gather raw information. What do you see, hear, sense?' },
        { id: 'orient',  label: 'Orient',  icon: 'fa-compass', color: '#8b5cf6', prompt: 'Analyze and synthesize. What does the data mean in context?' },
        { id: 'decide',  label: 'Decide',  icon: 'fa-check-square-o', color: '#f59e0b', prompt: 'Choose a course of action. What will you do?' },
        { id: 'act',     label: 'Act',     icon: 'fa-bolt', color: '#ef4444', prompt: 'Execute. Implement the decision and observe the results.' },
    ];
    const data = {};
    phases.forEach(p => data[p.id] = '');

    const loop = document.createElement('div');
    loop.className = 'tt-ooda-loop';

    phases.forEach((phase, i) => {
        const card = document.createElement('div');
        card.className = 'tt-ooda-card';
        card.innerHTML = `
            <div class="tt-ooda-header" style="color: ${phase.color}">
                <i class="fa ${phase.icon}"></i>
                <strong>${phase.label}</strong>
            </div>
            <p class="tt-ooda-prompt">${phase.prompt}</p>
        `;
        const ta = makeTextarea('Your notes...', 3);
        ta.addEventListener('input', () => data[phase.id] = ta.value);
        card.appendChild(ta);
        if (i < phases.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'tt-ooda-arrow';
            arrow.textContent = '→';
            loop.appendChild(card);
            loop.appendChild(arrow);
        } else {
            loop.appendChild(card);
        }
    });

    const aiBtn = makeAIBtn('AI: Run Loop');
    aiBtn.addEventListener('click', async () => {
        const situation = data.observe || Object.values(data).find(v => v) || '';
        if (!situation) { toast('Enter a situation in Observe first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
        try {
            const raw = await aiCall(`Apply the OODA Loop to this situation: "${situation}"

Respond with JSON: {"observe": "...", "orient": "...", "decide": "...", "act": "..."}
2-3 sentences each. Only JSON.`, { temperature: 0.6, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            phases.forEach(p => {
                if (result[p.id]) {
                    data[p.id] = result[p.id];
                    const ta = loop.querySelectorAll('.tt-ooda-card textarea');
                    const idx = phases.indexOf(p);
                    if (ta[idx]) ta[idx].value = result[p.id];
                }
            });
            toast('OODA Loop complete!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Run Loop'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = phases.map(p => `<h4><i class="fa ${p.icon}"></i> ${p.label}</h4><p>${esc(data[p.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: `OODA Loop Analysis`, content, tags: ['thinking-toolkit', 'ooda-loop'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('OODA Loop', 'Observe → Orient → Decide → Act'), loop, actions);
}


// ─── LADDER OF INFERENCE ────────────────────────────────────────────

function renderLadderOfInference(container, ctx) {
    const rungs = [
        { id: 'actions', label: 'Actions', desc: 'What actions did you take (or plan to take)?' },
        { id: 'beliefs', label: 'Beliefs', desc: 'What beliefs formed from your conclusions?' },
        { id: 'conclusions', label: 'Conclusions', desc: 'What conclusions did you draw?' },
        { id: 'assumptions', label: 'Assumptions', desc: 'What assumptions did you make?' },
        { id: 'interpreted', label: 'Interpreted Meaning', desc: 'What meaning did you add to the selected data?' },
        { id: 'selected', label: 'Selected Data', desc: 'What data did you focus on? What did you ignore?' },
        { id: 'observable', label: 'Observable Data', desc: 'What is the raw, observable reality?' },
    ];
    const data = {};
    rungs.forEach(r => data[r.id] = '');

    const ladder = document.createElement('div');
    ladder.className = 'tt-ladder';

    rungs.forEach((rung, i) => {
        const step = document.createElement('div');
        step.className = 'tt-ladder-rung';
        step.innerHTML = `
            <div class="tt-rung-number">${rungs.length - i}</div>
            <div class="tt-rung-body">
                <strong>${rung.label}</strong>
                <p class="tt-rung-desc">${rung.desc}</p>
                <textarea class="tt-textarea" rows="2" placeholder="Your reflection..."></textarea>
            </div>
        `;
        step.querySelector('textarea').addEventListener('input', e => data[rung.id] = e.target.value);
        ladder.appendChild(step);
    });

    const aiBtn = makeAIBtn('AI: Walk the Ladder');
    aiBtn.addEventListener('click', async () => {
        const situation = data.observable || data.actions || '';
        if (!situation) { toast('Enter the observable data or situation first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Analyzing...';
        try {
            const raw = await aiCall(`Apply the Ladder of Inference to this situation/observation: "${situation}"

Walk UP the ladder from observable data to actions. For each rung, explain what typically happens.

Respond with JSON with these keys: ${rungs.map(r => `"${r.id}"`).join(', ')}
2 sentences each. Only JSON.`, { temperature: 0.5, max_tokens: 800 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const tas = ladder.querySelectorAll('textarea');
            rungs.forEach((r, i) => {
                if (result[r.id]) { data[r.id] = result[r.id]; tas[i].value = result[r.id]; }
            });
            toast('Ladder walked!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Walk the Ladder'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = rungs.map((r, i) => `<p><strong>${rungs.length - i}. ${r.label}:</strong> ${esc(data[r.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: 'Ladder of Inference', content, tags: ['thinking-toolkit', 'ladder-of-inference'], gsW: 4, gsH: 5 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Ladder of Inference', 'Trace your reasoning from data to action — avoid jumping to conclusions'), ladder, actions);
}


// ─── HARD CHOICE MODEL ──────────────────────────────────────────────

function renderHardChoiceModel(container, ctx) {
    const types = [
        { id: 'no-brainer', label: 'No-Brainer', desc: 'One option is clearly better', color: '#22c55e', action: 'Just do it — analysis paralysis is the only risk.' },
        { id: 'big-swing', label: 'Big Swing', desc: 'High upside, high risk', color: '#3b82f6', action: 'Worth the risk if you can handle the downside.' },
        { id: 'apples-oranges', label: 'Apples vs Oranges', desc: 'Options are too different to compare', color: '#f59e0b', action: 'Clarify your values — what matters most to you?' },
        { id: 'hard-choice', label: 'Hard Choice', desc: 'Options are similar in value but different in nature', color: '#ef4444', action: 'Either is fine — commit fully to whichever you choose.' },
    ];

    const decisionInput = makeTextarea('Describe your decision and the options you are considering', 3);
    const cards = document.createElement('div');
    cards.className = 'tt-choice-cards';
    let selected = null;

    types.forEach(t => {
        const card = document.createElement('div');
        card.className = 'tt-choice-card';
        card.innerHTML = `
            <div class="tt-choice-header" style="border-left: 4px solid ${t.color}">
                <strong>${t.label}</strong>
            </div>
            <p>${t.desc}</p>
            <p class="tt-choice-action"><em>${t.action}</em></p>
        `;
        card.addEventListener('click', () => {
            cards.querySelectorAll('.tt-choice-card').forEach(c => c.classList.remove('tt-selected'));
            card.classList.add('tt-selected');
            selected = t;
        });
        cards.appendChild(card);
    });

    const aiBtn = makeAIBtn('AI: Classify My Decision');
    aiBtn.addEventListener('click', async () => {
        const decision = decisionInput.value.trim();
        if (!decision) { toast('Describe your decision first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Classifying...';
        try {
            const raw = await aiCall(`Based on the Hard Choice Model, classify this decision: "${decision}"

Types: no-brainer (one option clearly better), big-swing (high upside + high risk), apples-oranges (options too different to compare), hard-choice (similar value, different nature).

Respond with JSON: {"type": "one-of-the-types", "reasoning": "why this classification", "advice": "what to do"}
Only JSON.`, { temperature: 0.5, max_tokens: 400 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.type) {
                cards.querySelectorAll('.tt-choice-card').forEach(c => c.classList.remove('tt-selected'));
                const idx = types.findIndex(t => t.id === result.type);
                if (idx >= 0) { cards.children[idx].classList.add('tt-selected'); selected = types[idx]; }
            }
            if (result.reasoning) {
                toast(result.reasoning, 'info', ctx);
            }
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Classify My Decision'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        if (!selected) { toast('Select a decision type first', 'warning', ctx); return; }
        try { addCardsToTopic([{ title: `Hard Choice: ${selected.label}`, content: `<p><strong>${selected.desc}</strong></p><p>${selected.action}</p><p>${esc(decisionInput.value.trim())}</p>`, tags: ['thinking-toolkit', 'hard-choice'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Hard Choice Model', 'What kind of decision are you making?'), decisionInput, cards, actions);
}


// ─── CYNEFIN FRAMEWORK ──────────────────────────────────────────────

function renderCynefinFramework(container, ctx) {
    const domains = [
        { id: 'clear',     label: 'Clear',     sub: 'Best Practice', color: '#22c55e', desc: 'Cause-effect obvious. Sense → Categorize → Respond.' },
        { id: 'complicated',label: 'Complicated', sub: 'Good Practice', color: '#3b82f6', desc: 'Cause-effect discoverable with expertise. Sense → Analyze → Respond.' },
        { id: 'complex',   label: 'Complex',   sub: 'Emergent Practice', color: '#f59e0b', desc: 'Cause-effect only apparent in retrospect. Probe → Sense → Respond.' },
        { id: 'chaotic',   label: 'Chaotic',   sub: 'Novel Practice', color: '#ef4444', desc: 'No cause-effect relationship. Act → Sense → Respond.' },
        { id: 'confused',  label: 'Confused',  sub: 'Disorder', color: '#6b7280', desc: 'You don\'t know which domain you\'re in. Break down the situation.' },
    ];

    const situationInput = makeTextarea('Describe the situation you need to make sense of', 3);
    const grid = document.createElement('div');
    grid.className = 'tt-cynefin-grid';
    let selectedDomain = null;

    domains.forEach(d => {
        const card = document.createElement('div');
        card.className = 'tt-cynefin-card';
        card.innerHTML = `<div style="border-left: 3px solid ${d.color}; padding-left: 10px;"><strong>${d.label}</strong> <small style="opacity:0.7">${d.sub}</small><p style="margin:6px 0 0; font-size:0.85rem; opacity:0.8">${d.desc}</p></div>`;
        card.addEventListener('click', () => {
            grid.querySelectorAll('.tt-cynefin-card').forEach(c => c.classList.remove('tt-selected'));
            card.classList.add('tt-selected');
            selectedDomain = d;
        });
        grid.appendChild(card);
    });

    const aiBtn = makeAIBtn('AI: Classify Domain');
    aiBtn.addEventListener('click', async () => {
        const sit = situationInput.value.trim();
        if (!sit) { toast('Describe the situation', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Classifying...';
        try {
            const raw = await aiCall(`Classify this situation into the Cynefin Framework: "${sit}"

Domains: clear, complicated, complex, chaotic, confused.
Respond with JSON: {"domain": "...", "reasoning": "...", "recommended_approach": "..."}
Only JSON.`, { temperature: 0.5, max_tokens: 400 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.domain) {
                grid.querySelectorAll('.tt-cynefin-card').forEach(c => c.classList.remove('tt-selected'));
                const idx = domains.findIndex(d => d.id === result.domain);
                if (idx >= 0) { grid.children[idx].classList.add('tt-selected'); selectedDomain = domains[idx]; }
            }
            if (result.reasoning) toast(result.reasoning, 'info', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Classify Domain'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        if (!selectedDomain) { toast('Select a domain first', 'warning', ctx); return; }
        try { addCardsToTopic([{ title: `Cynefin: ${selectedDomain.label}`, content: `<p><strong>${selectedDomain.sub}</strong></p><p>${selectedDomain.desc}</p><p>${esc(situationInput.value.trim())}</p>`, tags: ['thinking-toolkit', 'cynefin'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Cynefin Framework', 'What domain is your situation in?'), situationInput, grid, actions);
}


// ─── CONFIDENCE → SPEED VS QUALITY ──────────────────────────────────

function renderConfidenceSpeedQuality(container, ctx) {
    const data = { decision: '', confidence: 50 };

    const decisionInput = makeTextarea('What decision or product are you building?', 2);
    const sliderWrap = document.createElement('div');
    sliderWrap.className = 'tt-slider-wrap';
    sliderWrap.innerHTML = `
        <label class="tt-slider-label">How confident are you in this idea?</label>
        <div class="tt-slider-row">
            <span class="tt-slider-end">Low</span>
            <input type="range" class="tt-slider" min="0" max="100" value="50" />
            <span class="tt-slider-end">High</span>
        </div>
        <div class="tt-slider-value">50%</div>
        <div class="tt-slider-result"></div>
    `;
    const slider = sliderWrap.querySelector('input[type="range"]');
    const valueDisplay = sliderWrap.querySelector('.tt-slider-value');
    const resultDisplay = sliderWrap.querySelector('.tt-slider-result');

    function updateResult() {
        const v = +slider.value;
        data.confidence = v;
        valueDisplay.textContent = v + '%';
        let advice;
        if (v < 30) advice = '<strong>Prioritize SPEED.</strong> Ship fast, get feedback, iterate. Don\'t over-invest in quality for an unvalidated idea.';
        else if (v < 70) advice = '<strong>Balance both.</strong> Build with reasonable quality but don\'t over-polish. Plan for iteration.';
        else advice = '<strong>Prioritize QUALITY.</strong> You\'re confident this is right — invest in durability, polish, and long-term architecture.';
        resultDisplay.innerHTML = advice;
    }
    slider.addEventListener('input', updateResult);
    updateResult();

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        try { addCardsToTopic([{ title: `Speed vs Quality: ${data.confidence}% confidence`, content: resultDisplay.innerHTML + `<p>${esc(decisionInput.value.trim())}</p>`, tags: ['thinking-toolkit', 'confidence-speed-quality'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(exportBtn);
    container.append(makeSection('Confidence → Speed vs Quality', 'Your confidence level determines the trade-off'), decisionInput, sliderWrap, actions);
}


// ─── ISHIKAWA DIAGRAM ───────────────────────────────────────────────

function renderIshikawaDiagram(container, ctx) {
    const categories = ['People', 'Process', 'Technology', 'Environment', 'Materials', 'Management'];
    const data = { problem: '', causes: {} };
    categories.forEach(c => data.causes[c] = []);

    const problemInput = makeTextarea('What problem are you analyzing?', 2);
    const fishbone = document.createElement('div');
    fishbone.className = 'tt-fishbone';

    categories.forEach(cat => {
        const bone = document.createElement('div');
        bone.className = 'tt-fishbone-branch';
        bone.innerHTML = `<div class="tt-fishbone-cat"><strong>${cat}</strong></div>`;
        const list = makeEditableList(data.causes[cat]);
        bone.appendChild(list.el);
        fishbone.appendChild(bone);
    });

    const aiBtn = makeAIBtn('AI: Find Root Causes');
    aiBtn.addEventListener('click', async () => {
        data.problem = problemInput.value.trim();
        if (!data.problem) { toast('Describe the problem first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Analyzing...';
        try {
            const raw = await aiCall(`Use the Ishikawa (fishbone) diagram to identify root causes for: "${data.problem}"

Categorize causes into: ${categories.join(', ')}

Respond with JSON: {${categories.map(c => `"${c}": ["cause1", "cause2"]`).join(', ')}}
2-3 causes per category. Only JSON.`, { temperature: 0.6, max_tokens: 800 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            categories.forEach(cat => {
                if (Array.isArray(result[cat])) {
                    data.causes[cat].push(...result[cat]);
                }
            });
            // Rebuild
            fishbone.innerHTML = '';
            categories.forEach(cat => {
                const bone = document.createElement('div');
                bone.className = 'tt-fishbone-branch';
                bone.innerHTML = `<div class="tt-fishbone-cat"><strong>${cat}</strong></div>`;
                const list = makeEditableList(data.causes[cat]);
                bone.appendChild(list.el);
                fishbone.appendChild(bone);
            });
            toast('Root causes identified!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Find Root Causes'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = categories.map(c => data.causes[c].length > 0 ? `<h4>${c}</h4><ul>${data.causes[c].map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : '').filter(Boolean).join('');
        if (!content) { toast('Add causes first', 'warning', ctx); return; }
        try { addCardsToTopic([{ title: `Ishikawa: ${problemInput.value.trim() || 'Root Cause Analysis'}`, content, tags: ['thinking-toolkit', 'ishikawa'], gsW: 5, gsH: 5 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Ishikawa Diagram', 'Identify root causes organized by category'), problemInput, fishbone, actions);
}


// ─── ABSTRACTION LADDERING ──────────────────────────────────────────

function renderAbstractionLaddering(container, ctx) {
    const data = { problem: '', levels: ['', '', '', '', ''] }; // 5 levels: abstract → concrete

    const labels = ['Why? (Most Abstract)', 'Why?', '→ Your Problem ←', 'How?', 'How? (Most Concrete)'];
    const problemInput = makeTextarea('What is the problem you want to reframe?', 2);
    const ladder = document.createElement('div');
    ladder.className = 'tt-abstraction-ladder';

    labels.forEach((label, i) => {
        const step = document.createElement('div');
        step.className = 'tt-abstraction-step' + (i === 2 ? ' tt-abstraction-current' : '');
        step.innerHTML = `<div class="tt-abstraction-label">${label}</div>`;
        const ta = makeTextarea(i === 2 ? 'Your problem statement' : i < 2 ? 'More abstract framing...' : 'More concrete framing...', 2);
        ta.addEventListener('input', () => data.levels[i] = ta.value);
        step.appendChild(ta);
        if (i < labels.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'tt-abstraction-arrow';
            arrow.textContent = i < 2 ? '↑ Why?' : '↓ How?';
            ladder.appendChild(step);
            ladder.appendChild(arrow);
        } else {
            ladder.appendChild(step);
        }
    });

    const aiBtn = makeAIBtn('AI: Generate Abstraction Levels');
    aiBtn.addEventListener('click', async () => {
        const problem = problemInput.value.trim();
        if (!problem) { toast('Enter your problem first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Reframing...';
        try {
            const raw = await aiCall(`Apply Abstraction Laddering to this problem: "${problem}"

Go UP (ask "Why?") to find more abstract framings, and DOWN (ask "How?") for concrete ones.

Respond with JSON: {"abstract2": "most abstract why", "abstract1": "why", "problem": "${problem}", "concrete1": "how", "concrete2": "most concrete how"}
Only JSON.`, { temperature: 0.6, max_tokens: 400 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const mapping = ['abstract2', 'abstract1', 'problem', 'concrete1', 'concrete2'];
            const tas = ladder.querySelectorAll('textarea');
            mapping.forEach((key, i) => {
                if (result[key]) { data.levels[i] = result[key]; tas[i].value = result[key]; }
            });
            toast('Abstraction levels generated!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Generate Abstraction Levels'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = labels.map((l, i) => `<p><strong>${l}:</strong> ${esc(data.levels[i] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: `Abstraction Laddering: ${problemInput.value.trim() || 'Untitled'}`, content, tags: ['thinking-toolkit', 'abstraction-laddering'], gsW: 4, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Abstraction Laddering', 'Reframe your problem at different levels of abstraction'), problemInput, ladder, actions);
}


// ─── INVERSION ──────────────────────────────────────────────────────

function renderInversion(container, ctx) {
    const data = { goal: '', inverted: [], insights: [] };

    const goalInput = makeTextarea('What goal or outcome do you want to achieve?', 2);
    const invertedSection = document.createElement('div');
    invertedSection.innerHTML = '<h4 style="margin:12px 0 6px">🔄 Inverted: How to guarantee FAILURE?</h4>';
    const invertedList = makeEditableList(data.inverted);
    invertedSection.appendChild(invertedList.el);

    const insightSection = document.createElement('div');
    insightSection.innerHTML = '<h4 style="margin:12px 0 6px">💡 Insights: Now reverse each — what should you DO?</h4>';
    const insightList = makeEditableList(data.insights);
    insightSection.appendChild(insightList.el);

    const aiBtn = makeAIBtn('AI: Invert & Solve');
    aiBtn.addEventListener('click', async () => {
        const goal = goalInput.value.trim();
        if (!goal) { toast('Enter your goal first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Inverting...';
        try {
            const raw = await aiCall(`Apply Inversion thinking to this goal: "${goal}"

1. First, think of ways to guarantee FAILURE (the opposite of the goal)
2. Then reverse each failure mode into actionable advice

Respond with JSON: {"inverted": ["way to fail 1", ...], "insights": ["actionable advice 1", ...]}
4-5 items each. Only JSON.`, { temperature: 0.7, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.inverted) { data.inverted.push(...result.inverted); invertedList.rebuild(); }
            if (result.insights) { data.insights.push(...result.insights); insightList.rebuild(); }
            toast('Inversion complete!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Invert & Solve'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = `<h4>Ways to Guarantee Failure</h4><ul>${data.inverted.map(i => `<li>${esc(i)}</li>`).join('')}</ul><h4>Reversed Insights</h4><ul>${data.insights.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
        try { addCardsToTopic([{ title: `Inversion: ${goalInput.value.trim() || 'Untitled'}`, content, tags: ['thinking-toolkit', 'inversion'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Inversion', 'Think about what you want to avoid, then reverse it'), goalInput, invertedSection, insightSection, actions);
}


// ─── ISSUE TREES (MECE) ────────────────────────────────────────────

function renderIssueTrees(container, ctx) {
    const data = { problem: '', branches: [] };

    function buildTree() {
        treeEl.innerHTML = '';
        if (data.branches.length === 0) {
            treeEl.innerHTML = '<p class="tt-empty">Click AI Assist or add branches manually</p>';
            return;
        }

        data.branches.forEach((branch, bi) => {
            const branchEl = document.createElement('div');
            branchEl.className = 'tt-issue-branch';
            branchEl.innerHTML = `<div class="tt-branch-header"><strong>${esc(branch.label)}</strong></div>`;
            const subList = makeEditableList(branch.items);
            branchEl.appendChild(subList.el);
            treeEl.appendChild(branchEl);
        });
    }

    const problemInput = makeTextarea('What is the core problem or question?', 2);
    const treeEl = document.createElement('div');
    treeEl.className = 'tt-issue-tree';
    buildTree();

    const addBranchBtn = makeBtn('Add Branch', 'fa-plus-circle', '');
    addBranchBtn.addEventListener('click', () => {
        data.branches.push({ label: `Branch ${data.branches.length + 1}`, items: [] });
        buildTree();
    });

    const aiBtn = makeAIBtn('AI: Build MECE Tree');
    aiBtn.addEventListener('click', async () => {
        const problem = problemInput.value.trim();
        if (!problem) { toast('Enter the problem first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Structuring...';
        try {
            const raw = await aiCall(`Build a MECE (Mutually Exclusive, Collectively Exhaustive) issue tree for: "${problem}"

Create 3-5 main branches, each with 2-3 sub-issues.

Respond with JSON: [{"label": "Branch Name", "items": ["sub-issue 1", "sub-issue 2"]}]
Only JSON.`, { temperature: 0.6, max_tokens: 800 });
            const m = raw.match(/\[[\s\S]*\]/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (Array.isArray(result)) { data.branches = result; buildTree(); }
            toast('Issue tree built!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Build MECE Tree'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = data.branches.map(b => `<h4>${esc(b.label)}</h4><ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
        if (!content) { toast('Build the tree first', 'warning', ctx); return; }
        try { addCardsToTopic([{ title: `Issue Tree: ${problemInput.value.trim() || 'MECE'}`, content, tags: ['thinking-toolkit', 'issue-trees'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(addBranchBtn, aiBtn, exportBtn);
    container.append(makeSection('Issue Trees (MECE)', 'Decompose problems into mutually exclusive, collectively exhaustive branches'), problemInput, treeEl, actions);
}


// ─── ZWICKY BOX ─────────────────────────────────────────────────────

function renderZwickyBox(container, ctx) {
    const data = { problem: '', dimensions: [{ name: 'Dimension 1', values: ['Value A', 'Value B'] }, { name: 'Dimension 2', values: ['Value X', 'Value Y'] }] };

    function rebuildGrid() {
        gridEl.innerHTML = '';
        data.dimensions.forEach((dim, di) => {
            const row = document.createElement('div');
            row.className = 'tt-zwicky-row';
            row.innerHTML = `<div class="tt-zwicky-dim"><input class="tt-table-input" value="${esc(dim.name)}" data-di="${di}" /><button class="tt-btn-icon tt-btn-danger tt-del-dim" data-di="${di}"><i class="fa fa-times"></i></button></div>`;
            const values = document.createElement('div');
            values.className = 'tt-zwicky-values';
            dim.values.forEach((v, vi) => {
                const chip = document.createElement('span');
                chip.className = 'tt-zwicky-chip';
                chip.contentEditable = true;
                chip.textContent = v;
                chip.addEventListener('blur', () => { dim.values[vi] = chip.textContent.trim(); });
                values.appendChild(chip);
            });
            const addValBtn = document.createElement('button');
            addValBtn.className = 'tt-btn-icon tt-btn-add';
            addValBtn.innerHTML = '<i class="fa fa-plus"></i>';
            addValBtn.addEventListener('click', () => { dim.values.push('New'); rebuildGrid(); });
            values.appendChild(addValBtn);
            row.appendChild(values);
            gridEl.appendChild(row);
        });
        gridEl.querySelectorAll('.tt-zwicky-dim input').forEach(inp => inp.addEventListener('change', e => { data.dimensions[+e.target.dataset.di].name = e.target.value; }));
        gridEl.querySelectorAll('.tt-del-dim').forEach(b => b.addEventListener('click', e => { data.dimensions.splice(+e.target.closest('button').dataset.di, 1); rebuildGrid(); }));
    }

    const problemInput = makeTextarea('What problem are you trying to solve creatively?', 2);
    const gridEl = document.createElement('div');
    gridEl.className = 'tt-zwicky-grid';
    rebuildGrid();

    const addDimBtn = makeBtn('Add Dimension', 'fa-plus-circle', '');
    addDimBtn.addEventListener('click', () => { data.dimensions.push({ name: `Dimension ${data.dimensions.length + 1}`, values: [] }); rebuildGrid(); });

    const aiBtn = makeAIBtn('AI: Generate Dimensions');
    aiBtn.addEventListener('click', async () => {
        const problem = problemInput.value.trim();
        if (!problem) { toast('Enter the problem first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Generating...';
        try {
            const raw = await aiCall(`Apply Zwicky Box (morphological analysis) to: "${problem}"

Identify 3-4 key dimensions/parameters, each with 3-4 possible values.

Respond with JSON: [{"name": "Dimension Name", "values": ["value1", "value2", "value3"]}]
Only JSON.`, { temperature: 0.7, max_tokens: 600 });
            const m = raw.match(/\[[\s\S]*\]/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (Array.isArray(result)) { data.dimensions = result; rebuildGrid(); }
            toast('Dimensions generated!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Generate Dimensions'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = data.dimensions.map(d => `<p><strong>${esc(d.name)}:</strong> ${d.values.map(v => esc(v)).join(' | ')}</p>`).join('');
        try { addCardsToTopic([{ title: `Zwicky Box: ${problemInput.value.trim() || 'Morphological'}`, content, tags: ['thinking-toolkit', 'zwicky-box'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(addDimBtn, aiBtn, exportBtn);
    container.append(makeSection('Zwicky Box', 'Explore the full solution space via morphological analysis'), problemInput, gridEl, actions);
}


// ─── CONFLICT RESOLUTION DIAGRAM ────────────────────────────────────

function renderConflictResolution(container, ctx) {
    const fields = [
        { id: 'objective', label: 'Common Objective', placeholder: 'What do both sides ultimately want?' },
        { id: 'need_a', label: 'Need A', placeholder: 'What does side A need?' },
        { id: 'need_b', label: 'Need B', placeholder: 'What does side B need?' },
        { id: 'want_a', label: 'Want A (Position)', placeholder: 'What does side A demand?' },
        { id: 'want_b', label: 'Want B (Position)', placeholder: 'What does side B demand?' },
    ];
    const data = {};
    fields.forEach(f => data[f.id] = '');

    const diagram = document.createElement('div');
    diagram.className = 'tt-conflict-diagram';

    fields.forEach(f => {
        const block = document.createElement('div');
        block.className = `tt-conflict-block tt-conflict-${f.id}`;
        block.innerHTML = `<label>${f.label}</label>`;
        const ta = makeTextarea(f.placeholder, 2);
        ta.addEventListener('input', () => data[f.id] = ta.value);
        block.appendChild(ta);
        diagram.appendChild(block);
    });

    const aiBtn = makeAIBtn('AI: Find Win-Win');
    aiBtn.addEventListener('click', async () => {
        if (!data.objective && !data.want_a) { toast('Fill in at least the objective or positions', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Resolving...';
        try {
            const context = Object.entries(data).filter(([_, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
            const raw = await aiCall(`Apply the Conflict Resolution Diagram (Evaporating Cloud) to find a win-win solution.

Current conflict:
${context}

Fill in any missing fields and propose a resolution that satisfies both sides.

Respond with JSON: {"objective": "...", "need_a": "...", "need_b": "...", "want_a": "...", "want_b": "...", "resolution": "..."}
Only JSON.`, { temperature: 0.6, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const tas = diagram.querySelectorAll('textarea');
            fields.forEach((f, i) => {
                if (result[f.id]) { data[f.id] = result[f.id]; tas[i].value = result[f.id]; }
            });
            if (result.resolution) toast('Resolution: ' + result.resolution, 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Find Win-Win'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = fields.map(f => `<p><strong>${f.label}:</strong> ${esc(data[f.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: 'Conflict Resolution', content, tags: ['thinking-toolkit', 'conflict-resolution'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Conflict Resolution Diagram', 'Find win-win solutions using the Evaporating Cloud'), diagram, actions);
}


// ─── PRODUCTIVE THINKING MODEL ──────────────────────────────────────

function renderProductiveThinking(container, ctx) {
    const steps = [
        { id: 'itch', label: '1. What\'s the Itch?', placeholder: 'Describe the mess — what bothers you?' },
        { id: 'what', label: '2. What\'s the Problem?', placeholder: 'Reframe it as a clear problem statement' },
        { id: 'why', label: '3. What\'s the Question?', placeholder: 'What question, if answered, would solve this?' },
        { id: 'answers', label: '4. Generate Answers', placeholder: 'Brainstorm solutions (list many, judge later)' },
        { id: 'forge', label: '5. Forge the Solution', placeholder: 'Combine and refine the best ideas into a plan' },
        { id: 'resources', label: '6. Align Resources', placeholder: 'What resources, people, and steps are needed?' },
    ];
    const data = {};
    steps.forEach(s => data[s.id] = '');

    const stepsEl = document.createElement('div');
    stepsEl.className = 'tt-productive-steps';

    steps.forEach((step, i) => {
        const block = document.createElement('div');
        block.className = 'tt-productive-step';
        block.innerHTML = `<div class="tt-step-badge">${i + 1}</div><div class="tt-step-body"><label>${step.label}</label></div>`;
        const ta = makeTextarea(step.placeholder, 3);
        ta.addEventListener('input', () => data[step.id] = ta.value);
        block.querySelector('.tt-step-body').appendChild(ta);
        stepsEl.appendChild(block);
    });

    const aiBtn = makeAIBtn('AI: Guide Through Steps');
    aiBtn.addEventListener('click', async () => {
        const itch = data.itch || '';
        if (!itch) { toast('Describe "the itch" first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Thinking...';
        try {
            const raw = await aiCall(`Apply the Productive Thinking Model to this issue: "${itch}"

Fill all 6 steps. Be thorough but concise.

Respond with JSON: {${steps.map(s => `"${s.id}": "..."`).join(', ')}}
Only JSON.`, { temperature: 0.7, max_tokens: 1000 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const tas = stepsEl.querySelectorAll('textarea');
            steps.forEach((s, i) => { if (result[s.id]) { data[s.id] = result[s.id]; tas[i].value = result[s.id]; } });
            toast('All steps completed!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Guide Through Steps'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = steps.map(s => `<p><strong>${esc(s.label)}:</strong> ${esc(data[s.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: 'Productive Thinking', content, tags: ['thinking-toolkit', 'productive-thinking'], gsW: 5, gsH: 5 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Productive Thinking Model', 'Solve problems creatively in 6 steps'), stepsEl, actions);
}


// ─── ICEBERG MODEL ──────────────────────────────────────────────────

function renderIcebergModel(container, ctx) {
    const layers = [
        { id: 'events', label: 'Events', desc: 'What happened? (visible above waterline)', color: '#60a5fa' },
        { id: 'patterns', label: 'Patterns', desc: 'What trends have been occurring?', color: '#38bdf8' },
        { id: 'structures', label: 'Structures', desc: 'What systems or structures caused these patterns?', color: '#0284c7' },
        { id: 'mental_models', label: 'Mental Models', desc: 'What beliefs, values, or assumptions sustain these structures?', color: '#1e3a5f' },
    ];
    const data = {};
    layers.forEach(l => data[l.id] = '');

    const topicInput = makeTextarea('What event or situation are you analyzing?', 2);
    const iceberg = document.createElement('div');
    iceberg.className = 'tt-iceberg';

    layers.forEach((layer, i) => {
        const block = document.createElement('div');
        block.className = 'tt-iceberg-layer';
        block.style.background = layer.color + '22';
        block.style.borderLeft = `4px solid ${layer.color}`;
        if (i === 0) block.innerHTML += '<div class="tt-waterline">~~~ waterline ~~~</div>';
        block.innerHTML += `<strong style="color: ${layer.color}">${layer.label}</strong><p class="tt-layer-desc">${layer.desc}</p>`;
        const ta = makeTextarea('Your analysis...', 2);
        ta.addEventListener('input', () => data[layer.id] = ta.value);
        block.appendChild(ta);
        iceberg.appendChild(block);
    });

    const aiBtn = makeAIBtn('AI: Dive Deeper');
    aiBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        if (!topic) { toast('Enter a situation first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Diving...';
        try {
            const raw = await aiCall(`Apply the Iceberg Model to: "${topic}"

Analyze at all four levels, from surface events down to deep mental models.

Respond with JSON: {${layers.map(l => `"${l.id}": "..."`).join(', ')}}
2-3 sentences each. Only JSON.`, { temperature: 0.6, max_tokens: 600 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const tas = iceberg.querySelectorAll('textarea');
            layers.forEach((l, i) => { if (result[l.id]) { data[l.id] = result[l.id]; tas[i].value = result[l.id]; } });
            toast('Analysis complete!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Dive Deeper'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = layers.map(l => `<p><strong style="color:${l.color}">${l.label}:</strong> ${esc(data[l.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: `Iceberg Model: ${topicInput.value.trim() || 'Analysis'}`, content, tags: ['thinking-toolkit', 'iceberg-model'], gsW: 4, gsH: 5 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Iceberg Model', 'Look beneath surface events to find root causes'), topicInput, iceberg, actions);
}


// ─── CONNECTION CIRCLES ─────────────────────────────────────────────

function renderConnectionCircles(container, ctx) {
    const data = { topic: '', elements: [], connections: [] };

    const topicInput = makeTextarea('What system are you analyzing?', 2);
    const elementsSection = document.createElement('div');
    elementsSection.innerHTML = '<h4 style="margin:12px 0 6px">Elements in the System</h4>';
    const elementList = makeEditableList(data.elements);
    elementsSection.appendChild(elementList.el);

    const connectionsSection = document.createElement('div');
    connectionsSection.innerHTML = '<h4 style="margin:12px 0 6px">Connections (A → B)</h4>';
    const connList = document.createElement('div');
    connList.className = 'tt-connection-list';
    connectionsSection.appendChild(connList);

    const aiBtn = makeAIBtn('AI: Map Connections');
    aiBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        if (!topic) { toast('Enter a system to analyze', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mapping...';
        try {
            const raw = await aiCall(`Apply Connection Circles to this system: "${topic}"

Identify 5-8 key elements and their causal connections. Show which connections form feedback loops.

Respond with JSON: {"elements": ["el1", "el2", ...], "connections": [{"from": "el1", "to": "el2", "type": "reinforcing|balancing", "label": "short description"}]}
Only JSON.`, { temperature: 0.6, max_tokens: 800 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.elements) { data.elements.length = 0; data.elements.push(...result.elements); elementList.rebuild(); }
            if (result.connections) {
                data.connections = result.connections;
                connList.innerHTML = result.connections.map(c =>
                    `<div class="tt-connection-item"><span>${esc(c.from)}</span> <span class="tt-conn-arrow ${c.type === 'balancing' ? 'tt-balancing' : 'tt-reinforcing'}">→</span> <span>${esc(c.to)}</span> <small>(${esc(c.label || c.type)})</small></div>`
                ).join('');
            }
            toast('Connections mapped!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Map Connections'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        let content = `<p><strong>Elements:</strong> ${data.elements.map(e => esc(e)).join(', ')}</p>`;
        if (data.connections.length) {
            content += '<h4>Connections</h4><ul>' + data.connections.map(c => `<li>${esc(c.from)} → ${esc(c.to)} (${esc(c.type || '')}${c.label ? ': ' + esc(c.label) : ''})</li>`).join('') + '</ul>';
        }
        try { addCardsToTopic([{ title: `Connection Circles: ${topicInput.value.trim() || 'System'}`, content, tags: ['thinking-toolkit', 'connection-circles'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Connection Circles', 'Map relationships and feedback loops in a system'), topicInput, elementsSection, connectionsSection, actions);
}


// ─── CONCEPT MAP ────────────────────────────────────────────────────

function renderConceptMap(container, ctx) {
    const data = { topic: '', nodes: [], edges: [] };

    const topicInput = makeTextarea('What concept or system do you want to map?', 2);
    const nodesSection = document.createElement('div');
    nodesSection.innerHTML = '<h4 style="margin:12px 0 6px">Concepts</h4>';
    const nodeList = makeEditableList(data.nodes);
    nodesSection.appendChild(nodeList.el);

    const edgesDisplay = document.createElement('div');
    edgesDisplay.className = 'tt-edges-display';

    const aiBtn = makeAIBtn('AI: Build Concept Map');
    aiBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        if (!topic) { toast('Enter a concept to map', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mapping...';
        try {
            const raw = await aiCall(`Build a concept map for: "${topic}"

Identify 6-10 key concepts and the relationships between them.

Respond with JSON: {"nodes": ["concept1", ...], "edges": [{"from": "concept1", "to": "concept2", "label": "relationship"}]}
Only JSON.`, { temperature: 0.6, max_tokens: 800 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.nodes) { data.nodes.length = 0; data.nodes.push(...result.nodes); nodeList.rebuild(); }
            if (result.edges) {
                data.edges = result.edges;
                edgesDisplay.innerHTML = '<h4>Relationships</h4>' + result.edges.map(e =>
                    `<div class="tt-edge-item">${esc(e.from)} <span class="tt-edge-label">—${esc(e.label || '')}→</span> ${esc(e.to)}</div>`
                ).join('');
            }
            toast('Concept map built!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Build Concept Map'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        let content = `<p><strong>Concepts:</strong> ${data.nodes.map(n => esc(n)).join(', ')}</p>`;
        if (data.edges.length) content += '<ul>' + data.edges.map(e => `<li>${esc(e.from)} —${esc(e.label || '')}→ ${esc(e.to)}</li>`).join('') + '</ul>';
        try { addCardsToTopic([{ title: `Concept Map: ${topicInput.value.trim() || 'Map'}`, content, tags: ['thinking-toolkit', 'concept-map'], gsW: 5, gsH: 4 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Concept Map', 'Visualize relationships between concepts'), topicInput, nodesSection, edgesDisplay, actions);
}


// ─── FEEDBACK LOOPS (shared for both balancing & reinforcing) ───────

function renderFeedbackLoop(container, ctx, isBalancing) {
    const loopType = isBalancing ? 'Balancing' : 'Reinforcing';
    const loopDesc = isBalancing
        ? 'A mechanism that pushes back against change to create stability (negative feedback / homeostasis).'
        : 'A mechanism that amplifies change — the more you have, the more you get (positive feedback / exponential growth).';

    const data = { system: '', steps: [], description: '' };

    const systemInput = makeTextarea(`Describe the system with a ${loopType.toLowerCase()} feedback loop`, 2);
    const stepsSection = document.createElement('div');
    stepsSection.innerHTML = `<h4 style="margin:12px 0 6px">Loop Steps (A → B → C → ...A)</h4>`;
    const stepList = makeEditableList(data.steps);
    stepsSection.appendChild(stepList.el);

    const descEl = document.createElement('div');
    descEl.className = 'tt-loop-desc';

    const aiBtn = makeAIBtn('AI: Map the Loop');
    aiBtn.addEventListener('click', async () => {
        const system = systemInput.value.trim();
        if (!system) { toast('Describe the system first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mapping...';
        try {
            const raw = await aiCall(`Identify a ${loopType.toLowerCase()} feedback loop in: "${system}"

A ${loopType.toLowerCase()} feedback loop ${isBalancing ? 'opposes change to maintain stability' : 'amplifies change, creating exponential growth or decline'}.

Respond with JSON: {"steps": ["step1 leads to", "step2 leads to", ...], "description": "explanation of how the loop works"}
Only JSON.`, { temperature: 0.6, max_tokens: 500 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (result.steps) { data.steps.length = 0; data.steps.push(...result.steps); stepList.rebuild(); }
            if (result.description) { data.description = result.description; descEl.innerHTML = `<p><em>${esc(result.description)}</em></p>`; }
            toast('Loop mapped!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Map the Loop'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = `<p>${esc(loopDesc)}</p><ol>${data.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${data.description ? `<p><em>${esc(data.description)}</em></p>` : ''}`;
        try { addCardsToTopic([{ title: `${loopType} Feedback Loop`, content, tags: ['thinking-toolkit', `${loopType.toLowerCase()}-feedback-loop`] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection(`${loopType} Feedback Loop`, loopDesc), systemInput, stepsSection, descEl, actions);
}

function renderBalancingFeedbackLoop(container, ctx) { renderFeedbackLoop(container, ctx, true); }
function renderReinforcingFeedbackLoop(container, ctx) { renderFeedbackLoop(container, ctx, false); }


// ─── MINTO PYRAMID ──────────────────────────────────────────────────

function renderMintoPyramid(container, ctx) {
    const data = { mainPoint: '', keyArgs: [{ arg: '', supporting: [] }, { arg: '', supporting: [] }, { arg: '', supporting: [] }] };

    const mainInput = makeTextarea('What is your main point / recommendation?', 2);
    mainInput.addEventListener('input', () => data.mainPoint = mainInput.value);

    const pyramid = document.createElement('div');
    pyramid.className = 'tt-pyramid';

    function rebuildPyramid() {
        pyramid.innerHTML = '';
        // Top
        const top = document.createElement('div');
        top.className = 'tt-pyramid-top';
        top.innerHTML = `<div class="tt-pyramid-label">Main Point</div><div class="tt-pyramid-value">${esc(data.mainPoint || '(enter above)')}</div>`;
        pyramid.appendChild(top);

        // Supporting args
        const argsRow = document.createElement('div');
        argsRow.className = 'tt-pyramid-row';
        data.keyArgs.forEach((ka, i) => {
            const block = document.createElement('div');
            block.className = 'tt-pyramid-block';
            const argInput = document.createElement('input');
            argInput.className = 'tt-table-input';
            argInput.placeholder = `Key Argument ${i + 1}`;
            argInput.value = ka.arg;
            argInput.addEventListener('change', () => { ka.arg = argInput.value; });

            const supportList = makeEditableList(ka.supporting);
            block.appendChild(argInput);
            block.appendChild(supportList.el);
            argsRow.appendChild(block);
        });
        pyramid.appendChild(argsRow);
    }
    rebuildPyramid();
    mainInput.addEventListener('input', rebuildPyramid);

    const addArgBtn = makeBtn('Add Argument', 'fa-plus-circle', '');
    addArgBtn.addEventListener('click', () => { data.keyArgs.push({ arg: '', supporting: [] }); rebuildPyramid(); });

    const aiBtn = makeAIBtn('AI: Structure Arguments');
    aiBtn.addEventListener('click', async () => {
        data.mainPoint = mainInput.value.trim();
        if (!data.mainPoint) { toast('Enter your main point first', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Structuring...';
        try {
            const raw = await aiCall(`Apply the Minto Pyramid Principle to structure this argument: "${data.mainPoint}"

Create 3 key supporting arguments, each with 2-3 pieces of supporting evidence/detail.

Respond with JSON: [{"arg": "key argument", "supporting": ["evidence 1", "evidence 2"]}]
Only JSON.`, { temperature: 0.6, max_tokens: 800 });
            const m = raw.match(/\[[\s\S]*\]/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            if (Array.isArray(result)) { data.keyArgs = result; rebuildPyramid(); }
            toast('Arguments structured!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Structure Arguments'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        let content = `<h4>Main Point</h4><p>${esc(data.mainPoint)}</p>`;
        data.keyArgs.forEach((ka, i) => {
            if (ka.arg) { content += `<h4>${i + 1}. ${esc(ka.arg)}</h4><ul>${ka.supporting.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`; }
        });
        try { addCardsToTopic([{ title: `Minto Pyramid: ${data.mainPoint.slice(0, 50)}`, content, tags: ['thinking-toolkit', 'minto-pyramid'], gsW: 5, gsH: 5 }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(addArgBtn, aiBtn, exportBtn);
    container.append(makeSection('Minto Pyramid', 'Start with the answer, then support it with structured arguments'), mainInput, pyramid, actions);
}


// ─── SITUATION-BEHAVIOR-IMPACT ──────────────────────────────────────

function renderSBI(container, ctx) {
    const data = { situation: '', behavior: '', impact: '' };

    const blocks = [
        { id: 'situation', label: 'Situation', desc: 'When and where did this happen?', icon: 'fa-map-marker' },
        { id: 'behavior', label: 'Behavior', desc: 'What specific, observable behavior did you notice?', icon: 'fa-eye' },
        { id: 'impact', label: 'Impact', desc: 'What was the impact of that behavior?', icon: 'fa-bolt' },
    ];

    const sbiEl = document.createElement('div');
    sbiEl.className = 'tt-sbi';

    blocks.forEach(b => {
        const block = document.createElement('div');
        block.className = 'tt-sbi-block';
        block.innerHTML = `<div class="tt-sbi-header"><i class="fa ${b.icon}"></i> <strong>${b.label}</strong></div><p class="tt-sbi-desc">${b.desc}</p>`;
        const ta = makeTextarea('', 3);
        ta.addEventListener('input', () => data[b.id] = ta.value);
        block.appendChild(ta);
        sbiEl.appendChild(block);
    });

    const aiBtn = makeAIBtn('AI: Draft Feedback');
    aiBtn.addEventListener('click', async () => {
        const context = Object.entries(data).filter(([_, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
        if (!context) { toast('Fill in at least one field', 'warning', ctx); return; }
        aiBtn.disabled = true;
        aiBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Drafting...';
        try {
            const raw = await aiCall(`Using the SBI (Situation-Behavior-Impact) feedback model, help structure or improve this feedback:

${context}

Fill in any missing fields and ensure the feedback is specific, non-judgmental, and actionable.

Respond with JSON: {"situation": "...", "behavior": "...", "impact": "..."}
Only JSON.`, { temperature: 0.5, max_tokens: 400 });
            const m = raw.match(/\{[\s\S]*\}/);
            const result = m ? JSON.parse(m[0]) : JSON.parse(raw);
            const tas = sbiEl.querySelectorAll('textarea');
            blocks.forEach((b, i) => { if (result[b.id]) { data[b.id] = result[b.id]; tas[i].value = result[b.id]; } });
            toast('Feedback structured!', 'success', ctx);
        } catch (e) { toast('AI failed: ' + e.message, 'error', ctx); }
        finally { aiBtn.disabled = false; aiBtn.innerHTML = '<i class="fa fa-magic"></i> AI: Draft Feedback'; }
    });

    const exportBtn = makeBtn('Add to Topic', 'fa-plus-circle', 'tt-btn-export');
    exportBtn.addEventListener('click', () => {
        const content = blocks.map(b => `<p><strong>${b.label}:</strong> ${esc(data[b.id] || '(empty)')}</p>`).join('');
        try { addCardsToTopic([{ title: 'SBI Feedback', content, tags: ['thinking-toolkit', 'sbi'] }], ctx); toast('Card added!', 'success', ctx); }
        catch (e) { toast(e.message, 'error', ctx); }
    });

    const actions = document.createElement('div');
    actions.className = 'tt-actions';
    actions.append(aiBtn, exportBtn);
    container.append(makeSection('Situation-Behavior-Impact', 'Give clear, non-judgmental feedback'), sbiEl, actions);
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN UI — Tool Browser & Modal
   ═══════════════════════════════════════════════════════════════════ */

let _styleInjected = false;
let _overlayEl = null;
let _ctx = null;

function injectStyles() {
    if (_styleInjected) return;
    _styleInjected = true;

    const style = document.createElement('style');
    style.id = 'thinking-toolkit-styles';
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
}

function openToolBrowser() {
    if (_overlayEl) { _overlayEl.style.display = 'flex'; return; }

    const overlay = document.createElement('div');
    overlay.className = 'tt-overlay';
    overlay.innerHTML = `
        <div class="tt-modal">
            <div class="tt-modal-header">
                <h2><i class="fa fa-lightbulb-o"></i> Thinking Toolkit</h2>
                <div class="tt-header-actions">
                    <input type="text" class="tt-search" placeholder="Search tools..." />
                    <button class="tt-close-btn"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="tt-modal-body">
                <div class="tt-categories"></div>
                <div class="tt-tool-grid"></div>
            </div>
        </div>
    `;

    const closeBtn = overlay.querySelector('.tt-close-btn');
    closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });

    // Category tabs
    const catContainer = overlay.querySelector('.tt-categories');
    const gridContainer = overlay.querySelector('.tt-tool-grid');
    const searchInput = overlay.querySelector('.tt-search');
    let activeCategory = 'all';

    function renderCategoryTabs() {
        catContainer.innerHTML = '';
        const allBtn = document.createElement('button');
        allBtn.className = 'tt-cat-btn' + (activeCategory === 'all' ? ' tt-active' : '');
        allBtn.textContent = `All (${TOOLS.length})`;
        allBtn.addEventListener('click', () => { activeCategory = 'all'; renderCategoryTabs(); renderToolGrid(); });
        catContainer.appendChild(allBtn);

        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            const count = TOOLS.filter(t => t.category === key).length;
            const btn = document.createElement('button');
            btn.className = 'tt-cat-btn' + (activeCategory === key ? ' tt-active' : '');
            btn.innerHTML = `<i class="fa ${cat.icon}"></i> ${cat.label} (${count})`;
            btn.style.borderColor = activeCategory === key ? cat.color : 'transparent';
            btn.addEventListener('click', () => { activeCategory = key; renderCategoryTabs(); renderToolGrid(); });
            catContainer.appendChild(btn);
        });
    }

    function renderToolGrid(filter = '') {
        gridContainer.innerHTML = '';
        let tools = activeCategory === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);
        if (filter) {
            const q = filter.toLowerCase();
            tools = tools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
        }

        if (tools.length === 0) {
            gridContainer.innerHTML = '<p class="tt-empty">No tools found.</p>';
            return;
        }

        tools.forEach(tool => {
            const cat = CATEGORIES[tool.category];
            const card = document.createElement('div');
            card.className = 'tt-tool-card';
            card.innerHTML = `
                <div class="tt-tool-icon" style="color: ${cat.color}"><i class="fa ${tool.icon}"></i></div>
                <div class="tt-tool-info">
                    <strong>${tool.name}</strong>
                    <span class="tt-tool-cat" style="color: ${cat.color}">${cat.label}</span>
                    <p>${tool.description}</p>
                </div>
            `;
            card.addEventListener('click', () => openTool(tool));
            gridContainer.appendChild(card);
        });
    }

    searchInput.addEventListener('input', () => renderToolGrid(searchInput.value));

    renderCategoryTabs();
    renderToolGrid();

    document.body.appendChild(overlay);
    _overlayEl = overlay;
}

function openTool(tool) {
    // Replace the tool grid with the tool's workspace
    if (!_overlayEl) return;

    const body = _overlayEl.querySelector('.tt-modal-body');
    body.innerHTML = '';

    // Back button + title
    const toolbar = document.createElement('div');
    toolbar.className = 'tt-tool-toolbar';
    const backBtn = makeBtn('← Back', null, 'tt-btn-back');
    backBtn.addEventListener('click', () => {
        body.innerHTML = '<div class="tt-categories"></div><div class="tt-tool-grid"></div>';

        // Rebuild category tabs and tool grid
        const catContainer = body.querySelector('.tt-categories');
        const gridContainer = body.querySelector('.tt-tool-grid');
        const searchInput = _overlayEl.querySelector('.tt-search');
        let activeCategory = 'all';

        function renderCatTabs() {
            catContainer.innerHTML = '';
            const allBtn = document.createElement('button');
            allBtn.className = 'tt-cat-btn' + (activeCategory === 'all' ? ' tt-active' : '');
            allBtn.textContent = `All (${TOOLS.length})`;
            allBtn.addEventListener('click', () => { activeCategory = 'all'; renderCatTabs(); renderGrid(); });
            catContainer.appendChild(allBtn);
            Object.entries(CATEGORIES).forEach(([key, cat]) => {
                const count = TOOLS.filter(t => t.category === key).length;
                const btn = document.createElement('button');
                btn.className = 'tt-cat-btn' + (activeCategory === key ? ' tt-active' : '');
                btn.innerHTML = `<i class="fa ${cat.icon}"></i> ${cat.label} (${count})`;
                btn.addEventListener('click', () => { activeCategory = key; renderCatTabs(); renderGrid(); });
                catContainer.appendChild(btn);
            });
        }
        function renderGrid(filter = '') {
            gridContainer.innerHTML = '';
            let tools = activeCategory === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);
            if (filter) { const q = filter.toLowerCase(); tools = tools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)); }
            tools.forEach(t => {
                const cat = CATEGORIES[t.category];
                const card = document.createElement('div');
                card.className = 'tt-tool-card';
                card.innerHTML = `<div class="tt-tool-icon" style="color: ${cat.color}"><i class="fa ${t.icon}"></i></div><div class="tt-tool-info"><strong>${t.name}</strong><span class="tt-tool-cat" style="color: ${cat.color}">${cat.label}</span><p>${t.description}</p></div>`;
                card.addEventListener('click', () => openTool(t));
                gridContainer.appendChild(card);
            });
        }
        if (searchInput) searchInput.value = '';
        renderCatTabs();
        renderGrid();
    });

    const title = document.createElement('h3');
    title.className = 'tt-tool-title';
    const cat = CATEGORIES[tool.category];
    title.innerHTML = `<i class="fa ${tool.icon}" style="color: ${cat.color}"></i> ${tool.name}`;

    toolbar.append(backBtn, title);
    body.appendChild(toolbar);

    const workspace = document.createElement('div');
    workspace.className = 'tt-workspace';
    body.appendChild(workspace);

    // Render the tool's UI
    tool.render(workspace, _ctx);
}


/* ═══════════════════════════════════════════════════════════════════
   PLUGIN LIFECYCLE
   ═══════════════════════════════════════════════════════════════════ */

export function activate(ctx) {
    _ctx = ctx;
    injectStyles();

    // Sidebar quick-action button (visible in the sidebar action grid)
    ctx.addSidebarButton({
        icon: 'fa-lightbulb-o',
        label: 'Thinking',
        title: 'Open Thinking Toolkit — 25 mental models at your fingertips',
        onClick: openToolBrowser,
    });

    // Toolbar button (in context toolbar overflow)
    ctx.addToolbarButton({
        icon: 'fa-lightbulb-o',
        label: 'Thinking Toolkit',
        title: 'Open Thinking Toolkit — 25 mental models at your fingertips',
        onClick: openToolBrowser,
    });

    // Command palette
    ctx.registerCommand({
        id: 'thinking-toolkit',
        title: 'Thinking Toolkit',
        subtitle: 'Open the mental models toolkit',
        icon: 'fa-lightbulb-o',
        group: 'Plugins',
        action: openToolBrowser,
    });

    // Keybind
    ctx.registerKeybind('Alt+T', openToolBrowser, 'Thinking Toolkit');

    console.log('[ThinkingToolkit] Activated with', TOOLS.length, 'tools');
}

export function deactivate() {
    if (_overlayEl) { _overlayEl.remove(); _overlayEl = null; }
    const style = document.getElementById('thinking-toolkit-styles');
    if (style) style.remove();
    _styleInjected = false;
    console.log('[ThinkingToolkit] Deactivated');
}


/* ═══════════════════════════════════════════════════════════════════
   STYLES (embedded for self-contained community plugin)
   ═══════════════════════════════════════════════════════════════════ */

const CSS_TEXT = `
/* ── Overlay & Modal ────────────────────────────── */
.tt-overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    animation: ttFadeIn 0.15s ease;
}
@keyframes ttFadeIn { from { opacity: 0; } to { opacity: 1; } }

.tt-modal {
    width: 96vw;
    max-width: 96vw;
    height: 92vh;
    max-height: 92vh;
    background: var(--color-bg-secondary, #1e1e2e);
    border-radius: 12px;
    border: 1px solid var(--color-border, #333);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.tt-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    gap: 12px;
    flex-shrink: 0;
}
.tt-modal-header h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text, #e0e0e0);
    margin: 0;
    white-space: nowrap;
}
.tt-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.tt-search {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 6px;
    padding: 6px 12px;
    color: var(--color-text, #ddd);
    font-size: 0.85rem;
    width: 240px;
    outline: none;
}
.tt-search:focus { border-color: var(--color-accent, #818cf8); }
.tt-close-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #888);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
}
.tt-close-btn:hover { background: var(--color-hover-bg, rgba(255,255,255,0.08)); color: var(--color-text, #ddd); }

.tt-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px;
}

/* ── Category Tabs ──────────────────────────────── */
.tt-categories {
    display: flex;
    gap: 6px;
    padding: 0 0 14px;
    flex-wrap: wrap;
}
.tt-cat-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1.5px solid transparent;
    background: var(--color-bg-primary, #181825);
    color: var(--color-text-muted, #999);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
}
.tt-cat-btn:hover { background: var(--color-hover-bg, rgba(255,255,255,0.06)); color: var(--color-text, #ddd); }
.tt-cat-btn.tt-active { background: var(--color-accent, #818cf8)22; color: var(--color-accent, #818cf8); border-color: var(--color-accent, #818cf8); }

/* ── Tool Card Grid ─────────────────────────────── */
.tt-tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
}
.tt-tool-card {
    display: flex;
    gap: 12px;
    padding: 14px;
    border-radius: 10px;
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    cursor: pointer;
    transition: all 0.15s;
}
.tt-tool-card:hover {
    border-color: var(--color-accent, #818cf8);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.tt-tool-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    width: 40px;
    text-align: center;
    padding-top: 2px;
}
.tt-tool-info strong {
    display: block;
    color: var(--color-text, #e0e0e0);
    font-size: 0.95rem;
    margin-bottom: 2px;
}
.tt-tool-cat {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}
.tt-tool-info p {
    margin: 6px 0 0;
    font-size: 0.82rem;
    color: var(--color-text-muted, #999);
    line-height: 1.4;
}
.tt-empty {
    text-align: center;
    color: var(--color-text-muted, #666);
    padding: 40px 0;
    font-size: 0.9rem;
}

/* ── Tool Workspace ─────────────────────────────── */
.tt-tool-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 0 14px;
    border-bottom: 1px solid var(--color-border, #333);
    margin-bottom: 16px;
}
.tt-btn-back {
    padding: 6px 14px;
    font-size: 0.82rem;
}
.tt-tool-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text, #e0e0e0);
    margin: 0;
}
.tt-workspace {
    padding-bottom: 20px;
}

/* ── Shared Components ──────────────────────────── */
.tt-section-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text, #e0e0e0);
    margin: 0 0 4px;
}
.tt-section-sub {
    font-size: 0.82rem;
    color: var(--color-text-muted, #888);
    margin: 0 0 14px;
}

.tt-textarea {
    width: 100%;
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 10px 12px;
    color: var(--color-text, #ddd);
    font-size: 0.85rem;
    line-height: 1.5;
    resize: vertical;
    outline: none;
    font-family: inherit;
    margin-bottom: 12px;
    box-sizing: border-box;
}
.tt-textarea:focus { border-color: var(--color-accent, #818cf8); }

.tt-btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid var(--color-border, #333);
    background: var(--color-bg-primary, #181825);
    color: var(--color-text, #ddd);
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.15s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.tt-btn:hover { border-color: var(--color-accent, #818cf8); background: var(--color-accent, #818cf8)15; }
.tt-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.tt-btn-ai { color: var(--color-accent, #818cf8); border-color: var(--color-accent, #818cf8)55; }
.tt-btn-ai:hover { background: var(--color-accent, #818cf8)20; }

.tt-btn-export { color: #22c55e; border-color: #22c55e55; }
.tt-btn-export:hover { background: #22c55e20; }

.tt-btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 5px;
    border: none;
    background: transparent;
    color: var(--color-text-muted, #888);
    cursor: pointer;
    font-size: 0.82rem;
}
.tt-btn-icon:hover { background: var(--color-hover-bg, rgba(255,255,255,0.08)); color: var(--color-text, #ddd); }
.tt-btn-icon.tt-btn-danger:hover { background: rgba(239,68,68,0.15); color: #ef4444; }
.tt-btn-icon.tt-btn-add { width: auto; gap: 4px; padding: 4px 10px; font-size: 0.78rem; color: var(--color-accent, #818cf8); }

.tt-actions {
    display: flex;
    gap: 8px;
    padding: 14px 0 0;
    border-top: 1px solid var(--color-border, #333);
    margin-top: 16px;
}

/* ── Editable List ──────────────────────────────── */
.tt-editable-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.tt-editable-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
}
.tt-item-text {
    flex: 1;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid transparent;
    font-size: 0.82rem;
    color: var(--color-text, #ddd);
    outline: none;
    min-width: 0;
}
.tt-item-text:focus { border-color: var(--color-accent, #818cf8); background: var(--color-bg-primary, #181825); }
.tt-add-item { padding: 4px 0; }

/* ── Six Thinking Hats ──────────────────────────── */
.tt-hats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
}
.tt-hat-card {
    border-radius: 10px;
    padding: 14px;
    transition: transform 0.15s;
}
.tt-hat-card:hover { transform: translateY(-1px); }
.tt-hat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    font-size: 0.95rem;
}
.tt-hat-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
}
.tt-hat-subtitle {
    font-size: 0.78rem;
    margin: 0 0 4px;
    opacity: 0.8;
}
.tt-hat-prompt {
    font-size: 0.78rem;
    font-style: italic;
    margin: 0 0 8px;
    opacity: 0.65;
}
.tt-hat-textarea {
    width: 100%;
    background: rgba(0,0,0,0.15);
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 6px;
    padding: 8px;
    color: inherit;
    font-size: 0.82rem;
    resize: vertical;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
}
.tt-hat-textarea:focus { border-color: rgba(0,0,0,0.3); }

/* ── Matrix Grid ────────────────────────────────── */
.tt-matrix-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 12px 0;
}
.tt-matrix-cell {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
    min-height: 120px;
}
.tt-matrix-header {
    padding-left: 8px;
    margin-bottom: 8px;
}
.tt-matrix-header strong { font-size: 0.88rem; color: var(--color-text, #ddd); }
.tt-matrix-header small { display: block; font-size: 0.72rem; color: var(--color-text-muted, #888); margin-top: 2px; }

.tt-axis-label { display: flex; justify-content: space-between; padding: 4px 10px; font-size: 0.72rem; color: var(--color-text-muted, #666); text-transform: uppercase; letter-spacing: 0.5px; }

/* ── Consequence Chain ──────────────────────────── */
.tt-consequence-chain { margin: 12px 0; }
.tt-order-block {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
}
.tt-order-label { font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; color: var(--color-text, #ddd); display: flex; align-items: center; gap: 8px; }
.tt-order-badge { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--color-accent, #818cf8); color: white; font-size: 0.72rem; font-weight: 700; }
.tt-chain-arrow { text-align: center; padding: 6px 0; color: var(--color-text-muted, #666); font-size: 0.82rem; }

/* ── OODA Loop ──────────────────────────────────── */
.tt-ooda-loop {
    display: flex;
    gap: 8px;
    align-items: stretch;
    margin: 12px 0;
    overflow-x: auto;
}
.tt-ooda-card {
    flex: 1;
    min-width: 180px;
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
}
.tt-ooda-header { font-size: 0.95rem; margin-bottom: 4px; display: flex; gap: 6px; align-items: center; }
.tt-ooda-prompt { font-size: 0.75rem; color: var(--color-text-muted, #888); margin: 0 0 8px; }
.tt-ooda-arrow { display: flex; align-items: center; color: var(--color-text-muted, #555); font-size: 1.5rem; flex-shrink: 0; }

/* ── Ladder ──────────────────────────────────────── */
.tt-ladder { margin: 12px 0; }
.tt-ladder-rung {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    align-items: flex-start;
}
.tt-rung-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-accent, #818cf8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.78rem;
    font-weight: 700;
    flex-shrink: 0;
}
.tt-rung-body { flex: 1; }
.tt-rung-body strong { font-size: 0.88rem; color: var(--color-text, #ddd); }
.tt-rung-desc { font-size: 0.75rem; color: var(--color-text-muted, #888); margin: 2px 0 6px; }

/* ── Choice Cards ───────────────────────────────── */
.tt-choice-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    margin: 12px 0;
}
.tt-choice-card {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
    transition: all 0.15s;
}
.tt-choice-card:hover { border-color: var(--color-text-muted, #666); }
.tt-choice-card.tt-selected { border-color: var(--color-accent, #818cf8); background: var(--color-accent, #818cf8)10; box-shadow: 0 0 0 1px var(--color-accent, #818cf8); }
.tt-choice-header { margin-bottom: 6px; }
.tt-choice-action { font-size: 0.78rem; color: var(--color-text-muted, #888); margin-top: 6px; }
.tt-choice-card p { font-size: 0.82rem; margin: 4px 0; color: var(--color-text-muted, #aaa); }

/* ── Cynefin ────────────────────────────────────── */
.tt-cynefin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    margin: 12px 0;
}
.tt-cynefin-card {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.15s;
}
.tt-cynefin-card:hover { border-color: var(--color-text-muted, #666); }
.tt-cynefin-card.tt-selected { border-color: var(--color-accent, #818cf8); background: var(--color-accent, #818cf8)10; box-shadow: 0 0 0 1px var(--color-accent, #818cf8); }

/* ── Slider ──────────────────────────────────────── */
.tt-slider-wrap { margin: 12px 0; }
.tt-slider-label { font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; display: block; color: var(--color-text, #ddd); }
.tt-slider-row { display: flex; align-items: center; gap: 10px; }
.tt-slider-end { font-size: 0.75rem; color: var(--color-text-muted, #888); }
.tt-slider { flex: 1; accent-color: var(--color-accent, #818cf8); }
.tt-slider-value { text-align: center; font-size: 1.5rem; font-weight: 700; color: var(--color-accent, #818cf8); margin: 8px 0; }
.tt-slider-result { background: var(--color-bg-primary, #181825); border: 1px solid var(--color-border, #333); border-radius: 8px; padding: 12px; font-size: 0.88rem; color: var(--color-text, #ddd); line-height: 1.5; }

/* ── Fishbone ───────────────────────────────────── */
.tt-fishbone {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    margin: 12px 0;
}
.tt-fishbone-branch {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
}
.tt-fishbone-cat { font-size: 0.88rem; margin-bottom: 6px; color: var(--color-text, #ddd); }

/* ── Abstraction Ladder ─────────────────────────── */
.tt-abstraction-ladder { margin: 12px 0; }
.tt-abstraction-step {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
}
.tt-abstraction-step.tt-abstraction-current {
    border-color: var(--color-accent, #818cf8);
    background: var(--color-accent, #818cf8)10;
}
.tt-abstraction-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-text-muted, #888);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.tt-abstraction-arrow {
    text-align: center;
    padding: 4px 0;
    color: var(--color-text-muted, #555);
    font-size: 0.82rem;
}

/* ── Issue Tree ──────────────────────────────────── */
.tt-issue-tree { margin: 12px 0; }
.tt-issue-branch {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 8px;
}
.tt-branch-header { font-size: 0.88rem; margin-bottom: 6px; color: var(--color-text, #ddd); }

/* ── Zwicky Box ──────────────────────────────────── */
.tt-zwicky-grid { margin: 12px 0; }
.tt-zwicky-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border, #333)55;
}
.tt-zwicky-dim {
    width: 140px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
}
.tt-zwicky-values {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
}
.tt-zwicky-chip {
    padding: 4px 10px;
    border-radius: 14px;
    background: var(--color-accent, #818cf8)20;
    color: var(--color-accent, #818cf8);
    font-size: 0.78rem;
    border: 1px solid var(--color-accent, #818cf8)40;
    outline: none;
    min-width: 40px;
}
.tt-zwicky-chip:focus { border-color: var(--color-accent, #818cf8); }

/* ── Conflict Resolution ─────────────────────────── */
.tt-conflict-diagram {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 12px 0;
}
.tt-conflict-block { background: var(--color-bg-primary, #181825); border: 1px solid var(--color-border, #333); border-radius: 8px; padding: 12px; }
.tt-conflict-block label { font-size: 0.82rem; font-weight: 600; color: var(--color-text, #ddd); display: block; margin-bottom: 6px; }
.tt-conflict-objective { grid-column: 1 / -1; }

/* ── Productive Thinking ─────────────────────────── */
.tt-productive-steps { margin: 12px 0; }
.tt-productive-step {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    align-items: flex-start;
}
.tt-step-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-accent, #818cf8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.78rem;
    font-weight: 700;
    flex-shrink: 0;
}
.tt-step-body { flex: 1; }
.tt-step-body label { font-size: 0.85rem; font-weight: 600; color: var(--color-text, #ddd); display: block; margin-bottom: 6px; }

/* ── Iceberg ─────────────────────────────────────── */
.tt-iceberg { margin: 12px 0; }
.tt-iceberg-layer {
    padding: 12px 14px;
    margin-bottom: 2px;
    border-radius: 6px;
    position: relative;
}
.tt-waterline {
    text-align: center;
    font-size: 0.72rem;
    color: #60a5fa;
    letter-spacing: 2px;
    padding-bottom: 6px;
    border-bottom: 1px dashed #60a5fa44;
    margin-bottom: 6px;
}
.tt-layer-desc { font-size: 0.75rem; color: var(--color-text-muted, #888); margin: 2px 0 6px; }

/* ── Connection / Edge display ───────────────────── */
.tt-connection-list, .tt-edges-display { margin: 8px 0; }
.tt-connection-item, .tt-edge-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    font-size: 0.82rem;
    color: var(--color-text, #ddd);
}
.tt-conn-arrow { font-weight: 700; font-size: 1.1rem; }
.tt-conn-arrow.tt-reinforcing { color: #22c55e; }
.tt-conn-arrow.tt-balancing { color: #ef4444; }
.tt-edge-label { color: var(--color-accent, #818cf8); font-size: 0.78rem; }

/* ── Pyramid ─────────────────────────────────────── */
.tt-pyramid { margin: 12px 0; }
.tt-pyramid-top {
    text-align: center;
    background: var(--color-accent, #818cf8)15;
    border: 1px solid var(--color-accent, #818cf8)44;
    border-radius: 8px;
    padding: 14px;
    margin-bottom: 12px;
}
.tt-pyramid-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-text-muted, #888); margin-bottom: 4px; }
.tt-pyramid-value { font-size: 0.95rem; color: var(--color-text, #ddd); }
.tt-pyramid-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
.tt-pyramid-block {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
}

/* ── SBI ─────────────────────────────────────────── */
.tt-sbi { margin: 12px 0; }
.tt-sbi-block {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 14px;
    margin-bottom: 10px;
}
.tt-sbi-header { font-size: 0.95rem; margin-bottom: 4px; color: var(--color-text, #ddd); }
.tt-sbi-desc { font-size: 0.75rem; color: var(--color-text-muted, #888); margin: 0 0 8px; }

/* ── Decision Table ──────────────────────────────── */
.tt-decision-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 0.82rem;
}
.tt-decision-table th, .tt-decision-table td {
    padding: 6px 8px;
    border: 1px solid var(--color-border, #333);
    text-align: center;
}
.tt-decision-table th {
    background: var(--color-bg-primary, #181825);
    color: var(--color-text, #ddd);
    font-weight: 600;
}
.tt-decision-table .tt-total {
    background: var(--color-accent, #818cf8)15;
    color: var(--color-accent, #818cf8);
    font-weight: 700;
}
.tt-table-input {
    background: transparent;
    border: 1px solid transparent;
    color: var(--color-text, #ddd);
    text-align: center;
    width: 100%;
    padding: 3px 5px;
    font-size: 0.82rem;
    outline: none;
    border-radius: 4px;
    box-sizing: border-box;
}
.tt-table-input:focus { border-color: var(--color-accent, #818cf8); background: var(--color-bg-primary, #181825); }
.tt-table-input[type="number"] { width: 50px; }

/* ── Loop description ────────────────────────────── */
.tt-loop-desc {
    background: var(--color-bg-primary, #181825);
    border: 1px solid var(--color-border, #333);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
    font-size: 0.85rem;
    color: var(--color-text-muted, #aaa);
    font-style: italic;
}

/* ── Scrollbar ───────────────────────────────────── */
.tt-modal-body::-webkit-scrollbar { width: 6px; }
.tt-modal-body::-webkit-scrollbar-track { background: transparent; }
.tt-modal-body::-webkit-scrollbar-thumb { background: var(--color-border, #333); border-radius: 3px; }
.tt-modal-body::-webkit-scrollbar-thumb:hover { background: var(--color-text-muted, #555); }
`;
