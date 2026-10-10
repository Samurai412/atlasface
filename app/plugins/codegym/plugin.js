/**
 * CodeGym - ATLAS Face Community Plugin
 * =====================================
 * A progressive coding lab for implementing research papers and ML algorithms.
 *
 * The plugin is deliberately self-contained because community plugins are
 * loaded as Blob modules by the marketplace.
 */

const PLUGIN_ID = 'codegym';
const STORAGE_KEY = 'codegym.session.v1';
const STYLE_ID = 'codegym-styles';
const GENERATED_ACCENTS = ['#14b8a6', '#6366f1', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6'];
const PAPER_BODY_CACHE = new Map();

const METHOD = [
    {
        id: 'map',
        label: 'Map',
        icon: 'fa-map-o',
        text: 'Turn the paper or algorithm into inputs, outputs, invariants, and failure cases.'
    },
    {
        id: 'slice',
        label: 'Slice',
        icon: 'fa-code',
        text: 'Build the smallest useful implementation path before adding optimizations.'
    },
    {
        id: 'probe',
        label: 'Probe',
        icon: 'fa-flask',
        text: 'Predict behavior, run mental tests, and explain surprising outputs.'
    },
    {
        id: 'ship',
        label: 'Ship',
        icon: 'fa-cube',
        text: 'Extract cards, experiments, and next changes so the idea becomes durable.'
    }
];

const LABS = [
    {
        id: 'attention-paper',
        title: 'Paper to Prototype',
        subtitle: 'Scaled dot-product attention',
        category: 'Research Paper',
        difficulty: 'Intermediate',
        language: 'Python',
        accent: '#14b8a6',
        icon: 'fa-file-text-o',
        summary: 'Read the core move from "Attention Is All You Need" and rebuild it as runnable tensor code.',
        outcome: 'Implement attention from query, key, and value matrices, then explain the shape math.',
        blocks: [
            {
                phase: 'Map',
                title: 'The paper move',
                time: '4 min',
                objective: 'Compress attention into one implementation sentence.',
                body: [
                    'Attention is a weighted lookup. A query asks what it needs, keys advertise what each token contains, and values carry the information to mix.',
                    'The implementation is not mystical: score every query against every key, normalize those scores, then use them to average the values.'
                ],
                prompt: 'Before seeing code, write the exact tensor shapes you expect for Q, K, V, scores, and output.',
                code: '',
                check: 'If Q is [batch, tokens_q, d] and K is [batch, tokens_k, d], then QK^T is [batch, tokens_q, tokens_k].'
            },
            {
                phase: 'Slice',
                title: 'The smallest implementation',
                time: '6 min',
                objective: 'Build attention without multi-heads, masks, dropout, or projections.',
                body: [
                    'First implement only the mathematical core. Keeping the first version small helps you see what multi-head attention is actually multiplying later.',
                    'The division by sqrt(d) keeps dot products from becoming too large as the hidden dimension grows.'
                ],
                prompt: 'Explain why the transpose is on K and not on Q.',
                code: `import math
import torch

def scaled_dot_product_attention(q, k, v):
    d = q.size(-1)
    scores = q @ k.transpose(-2, -1)
    weights = torch.softmax(scores / math.sqrt(d), dim=-1)
    return weights @ v, weights`,
                check: 'K is transposed so every query can be compared with every key across the feature dimension.'
            },
            {
                phase: 'Probe',
                title: 'A tiny numerical test',
                time: '7 min',
                objective: 'Use simple tensors to make the weighted lookup visible.',
                body: [
                    'A good paper implementation has a toy case you can reason through by hand.',
                    'When a query is close to one key, the softmax should put more mass on that key and pull the matching value into the output.'
                ],
                prompt: 'Predict which value vector dominates the output for the first query.',
                code: `q = torch.tensor([[[1.0, 0.0]]])
k = torch.tensor([[[1.0, 0.0], [0.0, 1.0]]])
v = torch.tensor([[[10.0, 0.0], [0.0, 5.0]]])

out, weights = scaled_dot_product_attention(q, k, v)
print(weights)
print(out)`,
                check: 'The first key should receive more weight because its dot product with the query is larger.'
            },
            {
                phase: 'Ship',
                title: 'From paper block to reusable module',
                time: '8 min',
                objective: 'Name the edge cases that a production version must handle.',
                body: [
                    'The prototype is enough to understand the paper, but real model code adds projection matrices, heads, masking, dropout, and caching.',
                    'Your next step is to preserve the mental model while making the interface harder to misuse.'
                ],
                prompt: 'List three tests you would add before trusting this attention function in a model.',
                code: `def attention_tests():
    # 1. Output shape matches [batch, query_tokens, value_dim].
    # 2. Masked positions receive near-zero weight.
    # 3. Identical queries over identical keys produce identical weights.
    pass`,
                check: 'Strong tests cover shape, masking, numerical stability, and gradient flow.'
            }
        ]
    },
    {
        id: 'kmeans-from-scratch',
        title: 'ML Algorithm Build',
        subtitle: 'K-means from scratch',
        category: 'Machine Learning',
        difficulty: 'Beginner',
        language: 'Python',
        accent: '#f59e0b',
        icon: 'fa-bullseye',
        summary: 'Rebuild clustering as an alternating loop: assign points, move centroids, repeat.',
        outcome: 'Implement K-means with vectorized distance calculation and convergence checks.',
        blocks: [
            {
                phase: 'Map',
                title: 'The invariant',
                time: '3 min',
                objective: 'State the loop that makes K-means work.',
                body: [
                    'K-means alternates between two simple operations: assign each point to the nearest centroid, then move each centroid to the mean of its assigned points.',
                    'The objective is to reduce within-cluster squared distance. It is greedy, useful, and sensitive to initialization.'
                ],
                prompt: 'Write what can go wrong if a centroid gets no points.',
                code: '',
                check: 'Empty clusters need a recovery rule, such as keeping the old centroid or reinitializing it to a far point.'
            },
            {
                phase: 'Slice',
                title: 'Distance without loops',
                time: '5 min',
                objective: 'Compute all point-to-centroid distances in one expression.',
                body: [
                    'Broadcasting lets every point compare itself with every centroid. This is the core trick that turns a textbook loop into practical code.',
                    'The result has one row per point and one column per centroid.'
                ],
                prompt: 'If X is [n, d] and centroids is [k, d], what shape is distances?',
                code: `import numpy as np

def assign_clusters(X, centroids):
    diff = X[:, None, :] - centroids[None, :, :]
    distances = np.sum(diff * diff, axis=2)
    return np.argmin(distances, axis=1)`,
                check: 'The distance matrix is [n, k]. Each row chooses its nearest centroid.'
            },
            {
                phase: 'Probe',
                title: 'Move the centroids',
                time: '6 min',
                objective: 'Update each centroid while handling empty clusters.',
                body: [
                    'The update step is where the algorithm learns the current cluster centers.',
                    'Keep the old centroid when a cluster is empty. It is not the only strategy, but it makes the first implementation stable.'
                ],
                prompt: 'Why is keeping an empty centroid safer than returning NaN?',
                code: `def update_centroids(X, labels, centroids):
    new_centroids = centroids.copy()
    for cluster_id in range(len(centroids)):
        members = X[labels == cluster_id]
        if len(members) > 0:
            new_centroids[cluster_id] = members.mean(axis=0)
    return new_centroids`,
                check: 'A NaN centroid poisons future distance calculations. A preserved centroid keeps the loop usable.'
            },
            {
                phase: 'Ship',
                title: 'The training loop',
                time: '8 min',
                objective: 'Assemble assignment and update into a complete algorithm.',
                body: [
                    'A complete implementation needs initialization, a max-iteration limit, and a stopping condition.',
                    'The convergence check compares old and new centroids. When they barely move, the algorithm is done.'
                ],
                prompt: 'Add one metric you would log to debug K-means quality.',
                code: `def kmeans(X, k, iterations=100, seed=0):
    rng = np.random.default_rng(seed)
    centroids = X[rng.choice(len(X), size=k, replace=False)]

    for _ in range(iterations):
        labels = assign_clusters(X, centroids)
        next_centroids = update_centroids(X, labels, centroids)
        if np.allclose(next_centroids, centroids):
            break
        centroids = next_centroids

    return labels, centroids`,
                check: 'Inertia, cluster sizes, and centroid movement are useful diagnostics.'
            }
        ]
    },
    {
        id: 'pagerank',
        title: 'Graph Algorithm Build',
        subtitle: 'PageRank by power iteration',
        category: 'Algorithms',
        difficulty: 'Intermediate',
        language: 'Python',
        accent: '#6366f1',
        icon: 'fa-sitemap',
        summary: 'Turn a graph into a probability machine and watch importance flow through links.',
        outcome: 'Implement damped PageRank and explain why teleportation matters.',
        blocks: [
            {
                phase: 'Map',
                title: 'Importance as flow',
                time: '4 min',
                objective: 'Model a graph as repeated probability redistribution.',
                body: [
                    'PageRank treats links as endorsements and computes a steady-state score for each node.',
                    'A node is important when important nodes point to it, but the algorithm needs damping so it does not get trapped in loops or dead ends.'
                ],
                prompt: 'Describe what should happen to a page with no outgoing links.',
                code: '',
                check: 'Dangling pages should redistribute their probability across all pages.'
            },
            {
                phase: 'Slice',
                title: 'Normalize the graph',
                time: '7 min',
                objective: 'Create a column-stochastic transition matrix.',
                body: [
                    'Each column represents where probability goes from one page.',
                    'If a page has no outgoing links, give it uniform links to every page so probability is conserved.'
                ],
                prompt: 'Why should each column sum to 1?',
                code: `import numpy as np

def transition_matrix(adjacency):
    M = adjacency.astype(float).copy()
    n = M.shape[0]
    column_sums = M.sum(axis=0)

    for j in range(n):
        if column_sums[j] == 0:
            M[:, j] = 1.0 / n
        else:
            M[:, j] /= column_sums[j]
    return M`,
                check: 'A column sum of 1 means all probability leaving that page is accounted for.'
            },
            {
                phase: 'Probe',
                title: 'Iterate until stable',
                time: '6 min',
                objective: 'Apply damping and watch ranks converge.',
                body: [
                    'Power iteration repeatedly applies the transition matrix to the rank vector.',
                    'Teleportation mixes in a uniform probability vector. That one line makes the system robust.'
                ],
                prompt: 'What does a damping value close to 1 emphasize?',
                code: `def pagerank(adjacency, damping=0.85, steps=100, tolerance=1e-8):
    M = transition_matrix(adjacency)
    n = M.shape[0]
    rank = np.ones(n) / n
    teleport = np.ones(n) / n

    for _ in range(steps):
        next_rank = damping * (M @ rank) + (1 - damping) * teleport
        if np.linalg.norm(next_rank - rank, ord=1) < tolerance:
            return next_rank
        rank = next_rank
    return rank`,
                check: 'Higher damping trusts graph links more and teleports less often.'
            },
            {
                phase: 'Ship',
                title: 'Use it like a researcher',
                time: '5 min',
                objective: 'Connect the algorithm to experiments and failure cases.',
                body: [
                    'Once you implement PageRank, the interesting learning comes from changing the graph.',
                    'Compare chains, hubs, disconnected components, and link farms. Algorithms become clearer when you make them misbehave.'
                ],
                prompt: 'Design one graph where PageRank gives an unintuitive result.',
                code: `# Try: a small clique that points to one isolated authority,
# then compare scores before and after adding a reciprocal link.`,
                check: 'Useful experiments isolate one structural change at a time.'
            }
        ]
    },
    {
        id: 'q-learning',
        title: 'Research Reproduction',
        subtitle: 'Q-learning gridworld',
        category: 'Reinforcement Learning',
        difficulty: 'Intermediate',
        language: 'Python',
        accent: '#ef4444',
        icon: 'fa-gamepad',
        summary: 'Rebuild a classic RL update rule and see how value moves backward from reward.',
        outcome: 'Implement tabular Q-learning and explain exploration, discounting, and bootstrapping.',
        blocks: [
            {
                phase: 'Map',
                title: 'The update rule',
                time: '5 min',
                objective: 'Translate the Bellman idea into one assignment.',
                body: [
                    'Q-learning estimates the value of taking an action in a state.',
                    'The update nudges the current estimate toward reward plus the best future estimate.'
                ],
                prompt: 'What is the difference between reward now and value later?',
                code: `target = reward + gamma * max_next_q
q[state, action] += alpha * (target - q[state, action])`,
                check: 'Reward is immediate feedback. Future value is bootstrapped from the current Q-table.'
            },
            {
                phase: 'Slice',
                title: 'Choose actions',
                time: '5 min',
                objective: 'Balance exploration and exploitation with epsilon-greedy control.',
                body: [
                    'Early in training, the agent needs to try uncertain moves. Later, it should mostly use what it has learned.',
                    'Epsilon-greedy is the simplest switch: sometimes random, otherwise best-known action.'
                ],
                prompt: 'Why can always choosing the current best action fail?',
                code: `def choose_action(q, state, epsilon, rng):
    if rng.random() < epsilon:
        return rng.integers(q.shape[1])
    return int(np.argmax(q[state]))`,
                check: 'The current best action may only be best because the agent has not explored alternatives.'
            },
            {
                phase: 'Probe',
                title: 'Train one episode',
                time: '8 min',
                objective: 'Update the Q-table as the agent walks through an environment.',
                body: [
                    'The environment only needs reset and step for the learning loop to make sense.',
                    'Each transition updates one table cell. Over many episodes, reward information propagates backward.'
                ],
                prompt: 'Which term makes reward propagate to earlier states?',
                code: `def train_episode(env, q, alpha, gamma, epsilon, rng):
    state = env.reset()
    done = False
    total_reward = 0

    while not done:
        action = choose_action(q, state, epsilon, rng)
        next_state, reward, done = env.step(action)
        target = reward + gamma * np.max(q[next_state])
        q[state, action] += alpha * (target - q[state, action])
        state = next_state
        total_reward += reward

    return total_reward`,
                check: 'The gamma * max(q[next_state]) term carries estimated future reward backward.'
            },
            {
                phase: 'Ship',
                title: 'Reproduce, then vary',
                time: '6 min',
                objective: 'Treat the implementation as a research playground.',
                body: [
                    'Reproduction is not copying a result once. It is rebuilding the mechanism, then varying one assumption at a time.',
                    'Try changing epsilon decay, reward shape, grid obstacles, and discount factor. Keep a lab note for every run.'
                ],
                prompt: 'Name one hyperparameter change and predict how learning behavior changes.',
                code: `experiments = [
    {'epsilon_decay': 0.995, 'gamma': 0.90},
    {'epsilon_decay': 0.980, 'gamma': 0.99},
    {'epsilon_decay': 0.999, 'gamma': 0.70},
]`,
                check: 'Good reproduction notes include the change, the expected effect, the observed effect, and a follow-up question.'
            }
        ]
    }
];

let ctxRef = null;
let modalHandle = null;
let mountedContainer = null;
let activeLabId = LABS[0].id;
let activeBlockIndex = 0;
let session = loadSession();
let codeGymKeyHandler = null;

function getAllLabs() {
    const generated = (session.generatedLabs || []).map(lab => {
        if (!lab?.generated || !Array.isArray(lab.blocks) || !lab.blocks.length) return lab;
        return {
            ...lab,
            blocks: [
                createOpeningPredictionBlock(lab.source || {}, lab.source?.request || lab.subtitle || lab.title),
                ...lab.blocks.slice(1)
            ]
        };
    });
    return [...generated, ...LABS];
}

function esc(value) {
    const div = document.createElement('div');
    div.textContent = String(value ?? '');
    return div.innerHTML;
}


function nanoMarkdown(str) {
    if (!str) return '';
    let html = esc(str);
    
    // Reverse esc for markdown syntax if they were escaped
    // esc() replaces <, >, &, ", '
    html = html.replace(/```[a-z]*\n([\s\S]*?)```/gi, '<div class="cg-code"><pre><code>$1</code></pre></div>');
    html = html.replace(/`([^`\n]+)`/g, '<code style="background: color-mix(in srgb, var(--color-text) 12%, transparent); padding: 2px 4px; border-radius: 4px;">$1</code>');
    html = html.replace(/\*\*([^\*\n]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^[ \t]*-\s+(.*)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul style="margin: 8px 0; padding-left: 20px;">$1</ul>');
    
    html = html.replace(/\n(?!<)/g, '<br>');
    return html;
}

function currentLab() {
    return getAllLabs().find(lab => lab.id === activeLabId) || getAllLabs()[0] || LABS[0];
}

function labState(labId) {
    if (!session.labs[labId]) {
        session.labs[labId] = {
            revealed: 1,
            completed: [],
            answers: {},
            feedback: {},
            notes: '',
            qa: []
        };
    }
    if (!Array.isArray(session.labs[labId].qa)) session.labs[labId].qa = [];
    if (!session.labs[labId].feedback || typeof session.labs[labId].feedback !== 'object') session.labs[labId].feedback = {};
    return session.labs[labId];
}

function loadSession() {
    const base = { labs: {}, generatedLabs: [], lastLabId: LABS[0].id };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return base;
        const parsed = JSON.parse(raw);
        return { ...base, ...parsed, labs: parsed.labs || {}, generatedLabs: parsed.generatedLabs || [] };
    } catch {
        return base;
    }
}

function saveSession() {
    try {
        session.lastLabId = activeLabId;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
        // Storage can fail in private contexts. The plugin remains usable.
    }
}

function toast(message, type = 'info') {
    if (ctxRef?.showToast) {
        ctxRef.showToast(message, type, 2800);
    } else if (window.showToast) {
        window.showToast(message, type, 2800);
    }
}

async function aiCall(prompt, opts = {}) {
    const options = {
        temperature: opts.temperature ?? 0.5,
        maxOutputTokens: opts.maxOutputTokens ?? opts.max_tokens ?? 1200,
        budgetProfile: opts.budgetProfile || 'default'
    };

    if (window._aiClient?.callAI) {
        return window._aiClient.callAI(prompt, options);
    }

    try {
        const aiClientUrl = new URL('./services/ai-client.js', window.location.href).href;
        const mod = await import(/* @vite-ignore */ aiClientUrl);
        if (mod?.callAI) {
            return mod.callAI(prompt, options);
        }
    } catch {
        // Fall through to legacy global.
    }

    if (window.callAI) {
        return window.callAI(prompt);
    }

    throw new Error('AI service is not available. Configure AI in Settings to use the coach.');
}

function extractArxivId(input) {
    const text = String(input || '').trim();
    const urlMatch = text.match(/arxiv\.org\/(?:abs|pdf)\/([0-9]{4}\.[0-9]{4,5}(?:v\d+)?)/i);
    if (urlMatch) return urlMatch[1];
    const bareMatch = text.match(/^([0-9]{4}\.[0-9]{4,5}(?:v\d+)?)$/i);
    return bareMatch ? bareMatch[1] : null;
}

async function fetchArxivMetadata(arxivId) {
    let xml = '';
    const appFetcher = window.electronAPI?.plugins?.fetchArxivMetadata;

    if (typeof appFetcher === 'function') {
        const result = await appFetcher(arxivId);
        if (!result?.success) {
            throw new Error(result?.error || 'ATLAS Face could not fetch arXiv metadata.');
        }
        xml = result.xml || '';
    } else {
        const response = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(arxivId)}`, {
            headers: { Accept: 'application/atom+xml, application/xml, text/xml' }
        });
        if (!response.ok) throw new Error(`arXiv metadata request failed with HTTP ${response.status}`);
        xml = await response.text();
    }

    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const entry = doc.querySelector('entry');
    if (!entry) throw new Error(`arXiv returned no entry for ${arxivId}`);

    const title = entry.querySelector('title')?.textContent?.replace(/\s+/g, ' ').trim();
    const summary = entry.querySelector('summary')?.textContent?.replace(/\s+/g, ' ').trim();
    const authors = Array.from(entry.querySelectorAll('author > name, author name'))
        .map(node => node.textContent.trim())
        .filter(Boolean)
        .slice(0, 12);
    const versionedId = entry.querySelector('id')?.textContent?.match(/\/abs\/([^/]+)$/)?.[1] || arxivId;
    const published = entry.querySelector('published')?.textContent || '';
    const updated = entry.querySelector('updated')?.textContent || '';

    if (!title || !summary) throw new Error(`arXiv metadata for ${arxivId} was incomplete`);

    return {
        id: arxivId,
        versionedId,
        title,
        summary,
        authors,
        published,
        updated,
        absUrl: `https://arxiv.org/abs/${versionedId}`,
        pdfUrl: `https://arxiv.org/pdf/${versionedId}`
    };
}

function normalizePaperText(text) {
    return String(text || '')
        .replace(/\u00a0/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function extractPaperTextFromHtml(html, sourceUrl) {
    const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    doc.querySelectorAll('script, style, noscript, nav, header, footer, .ltx_bibliography').forEach(node => node.remove());

    const sections = [];
    const seen = new Set();
    const nodes = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, figcaption, .ltx_equation'));
    let current = { heading: 'Paper opening', level: 0, paragraphs: [] };

    const pushCurrent = () => {
        const text = normalizePaperText(current.paragraphs.join('\n\n'));
        if (text.length < 80) return;
        sections.push({
            heading: current.heading,
            level: current.level,
            text: text.slice(0, 4200)
        });
    };

    for (const node of nodes) {
        const raw = normalizePaperText(node.textContent);
        if (!raw || raw.length < 8) continue;
        if (/^(references|bibliography|acknowledg(e)?ments?)$/i.test(raw)) break;

        const compactKey = raw.toLowerCase().slice(0, 180);
        if (seen.has(compactKey)) continue;
        seen.add(compactKey);

        const tag = node.tagName.toLowerCase();
        const isHeading = /^h[1-6]$/.test(tag);
        const isEquation = node.classList?.contains('ltx_equation');
        if (isHeading) {
            pushCurrent();
            current = { heading: raw.slice(0, 160), level: Number(tag.slice(1)) || 2, paragraphs: [] };
        } else {
            current.paragraphs.push(isEquation ? `Equation: ${raw}` : raw);
        }
    }
    pushCurrent();

    const text = normalizePaperText(sections.map(section => `## ${section.heading}\n${section.text}`).join('\n\n')).slice(0, 24000);
    if (text.length < 1200) throw new Error('Extracted paper body was too short.');

    return {
        source: 'ar5iv',
        sourceUrl,
        outline: sections.map(section => section.heading).slice(0, 80),
        sections,
        text,
        chars: text.length
    };
}

async function fetchArxivPaperBody(arxivId) {
    const cacheKey = String(arxivId || '').trim();
    if (PAPER_BODY_CACHE.has(cacheKey)) return PAPER_BODY_CACHE.get(cacheKey);

    const appFetcher = window.electronAPI?.plugins?.fetchArxivHtml;
    let result = null;
    let parsed = null;

    if (typeof appFetcher === 'function') {
        result = await appFetcher(arxivId);
        if (!result?.success) throw new Error(result?.error || 'ATLAS Face could not fetch arXiv paper body.');
        parsed = extractPaperTextFromHtml(result.html || '', result.sourceUrl || `https://ar5iv.labs.arxiv.org/html/${arxivId}`);
        PAPER_BODY_CACHE.set(cacheKey, parsed);
        return parsed;
    }

    const response = await fetch(`https://ar5iv.labs.arxiv.org/html/${encodeURIComponent(arxivId)}`, {
        headers: { Accept: 'text/html, application/xhtml+xml' }
    });
    if (!response.ok) throw new Error(`ar5iv paper body request failed with HTTP ${response.status}`);
    parsed = extractPaperTextFromHtml(await response.text(), `https://ar5iv.labs.arxiv.org/html/${arxivId}`);
    PAPER_BODY_CACHE.set(cacheKey, parsed);
    return parsed;
}

function keywordSet(text) {
    const stop = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'your', 'what', 'when', 'where', 'will', 'paper', 'slice', 'learn', 'code', 'make', 'write', 'explain']);
    return new Set(String(text || '').toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g)?.filter(word => !stop.has(word)) || []);
}

function selectPaperSections(paperBody, query, limit = 2) {
    const terms = keywordSet(query);
    const sections = Array.isArray(paperBody?.sections) ? paperBody.sections : [];
    if (!sections.length) return [];

    return sections
        .map((section, index) => {
            const haystack = `${section.heading} ${section.text}`.toLowerCase();
            let score = index === 0 ? 0.25 : 0;
            for (const term of terms) {
                if (haystack.includes(term)) score += section.heading.toLowerCase().includes(term) ? 3 : 1;
            }
            return { section, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.section);
}

async function getPaperContextForSlice(lab, block, userQuestion = '') {
    if (lab.source?.kind !== 'arxiv') return '';
    const arxivId = lab.source?.arxivId || extractArxivId(lab.source?.url || lab.source?.request || '');
    if (!arxivId) return '';

    try {
        const paperBody = await fetchArxivPaperBody(arxivId);
        const query = [
            block.paperFocus,
            block.title,
            block.objective,
            block.prompt,
            userQuestion
        ].filter(Boolean).join(' ');
        const selected = selectPaperSections(paperBody, query, 2);
        if (!selected.length) return '';

        return [
            `ON-DEMAND PAPER CONTEXT from ${paperBody.sourceUrl}:`,
            ...selected.map(section => `## ${section.heading}\n${section.text.slice(0, 1800)}`)
        ].join('\n\n');
    } catch (error) {
        console.warn('[CodeGym] Could not load on-demand arXiv context:', error);
        return '';
    }
}

async function resolveSourceContext(input) {
    const source = String(input || '').trim();
    const arxivId = extractArxivId(source);
    if (!source) throw new Error('Enter an arXiv link, paper title, topic, or algorithm.');

    if (arxivId) {
        try {
            const metadata = await fetchArxivMetadata(arxivId);
            let paperBody = null;
            try {
                paperBody = await fetchArxivPaperBody(metadata.versionedId || arxivId);
            } catch (bodyError) {
                console.warn('[CodeGym] Could not fetch arXiv paper outline; using abstract only:', bodyError);
            }
            return {
                kind: 'arxiv',
                label: `arXiv:${metadata.versionedId}`,
                arxiv: {
                    ...metadata,
                    contentSource: paperBody?.source || 'abstract',
                    contentSourceUrl: paperBody?.sourceUrl || metadata.absUrl,
                    contentChars: paperBody?.chars || metadata.summary.length,
                    outline: paperBody?.outline || []
                },
                text: [
                    `VERIFIED ARXIV PAPER`,
                    `arXiv ID: ${metadata.versionedId}`,
                    `Canonical URL: ${metadata.absUrl}`,
                    `PDF URL: ${metadata.pdfUrl}`,
                    `Title: ${metadata.title}`,
                    `Authors: ${metadata.authors.join(', ') || 'Unknown'}`,
                    metadata.published ? `Published: ${metadata.published}` : '',
                    metadata.updated ? `Updated: ${metadata.updated}` : '',
                    `Abstract: ${metadata.summary}`,
                    paperBody
                        ? `\nPAPER STRUCTURE AVAILABLE ON DEMAND (${paperBody.source}, ${paperBody.chars} chars from ${paperBody.sourceUrl}). Section headings:\n${paperBody.outline.slice(0, 36).map((heading, index) => `${index + 1}. ${heading}`).join('\n')}`
                        : `\nPAPER BODY STATUS: Full paper body was unavailable, so this lab must stay abstract-level unless the learner supplies the PDF/text.`
                ].filter(Boolean).join('\n')
            };
        } catch (error) {
            console.warn('[CodeGym] Could not fetch arXiv metadata:', error);
            throw new Error(`Could not fetch verified arXiv metadata for ${arxivId}. CodeGym will not generate from an unverified arXiv link because that can hallucinate the wrong paper.`);
        }
    }

    if (/^https?:\/\//i.test(source)) {
        return { kind: 'link', label: 'Link', text: `Use this source link as the paper/topic reference: ${source}` };
    }

    return { kind: 'topic', label: 'Topic', text: source };
}

function parseLabJson(raw) {
    const text = String(raw || '').trim();
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1] : text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    if (!candidate || candidate === text.slice(0, 0)) {
        throw new Error('AI did not return a JSON object.');
    }
    return JSON.parse(candidate);
}

async function parseGeneratedLabJson(raw, repairPrompt) {
    try {
        return parseLabJson(raw);
    } catch (error) {
        const repaired = await aiCall(`${repairPrompt}

The previous response was not valid JSON.
Error: ${error.message}

Repair it into one strict JSON object that matches the requested schema. Use "codeLines": ["line 1", "line 2"] instead of multiline code strings. Return JSON only.

BROKEN RESPONSE:
${String(raw || '').slice(0, 12000)}`, { temperature: 0.1, maxOutputTokens: 4200, budgetProfile: 'json' });
        try {
            return parseLabJson(repaired);
        } catch (repairError) {
            throw new Error(`The generated lab was not valid JSON after repair. Try a shorter topic or regenerate. ${repairError.message}`);
        }
    }
}

function createOpeningPredictionBlock(sourceMeta, request) {
    return {
        phase: 'Ground',
        title: 'Start with the simplest story',
        time: '3 min',
        objective: 'Understand what changes before naming the official parts.',
        body: [
            'You do not need the official terms yet. Treat the idea as a tiny machine with something going in and something coming out.',
            'First, make a rough guess about what changes. Precision comes after the intuition has a place to land.'
        ],
        prompt: 'Write a two-sentence sketch: what goes in, what changes, and what might come out. Add one guess about where the next slice will go.',
        code: '',
        check: 'A useful first prediction can be rough: name the input, the action, and the output. The next step will attach the formal words to that story.',
        paperFocus: 'abstract introduction overview'
    };
}

function normalizeGeneratedLab(rawLab, sourceMeta, request) {
    const index = (session.generatedLabs || []).length;
    const lab = rawLab || {};
    const id = `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const phases = ['Ground', 'Name', 'Trace', 'Rebuild', 'Probe', 'Recall'];
    const blocks = Array.isArray(lab.blocks) ? lab.blocks.slice(0, 32) : [];

    if (blocks.length < 3) {
        throw new Error('AI returned too few reader slices. Try a more specific topic or paper link.');
    }

    const isVerifiedArxiv = sourceMeta.kind === 'arxiv' && sourceMeta.arxiv?.title;
    const normalized = {
        id,
        title: String(isVerifiedArxiv ? sourceMeta.arxiv.title : (lab.title || 'AI Generated Lab')).slice(0, 80),
        subtitle: String(isVerifiedArxiv ? sourceMeta.label : (lab.subtitle || request || sourceMeta.label || 'Progressive implementation')).slice(0, 100),
        category: String(lab.category || (sourceMeta.kind === 'arxiv' ? 'Research Paper' : 'Generated Lab')).slice(0, 40),
        difficulty: String(lab.difficulty || 'Intermediate').slice(0, 32),
        language: String(lab.language || 'Python').slice(0, 32),
        accent: GENERATED_ACCENTS[index % GENERATED_ACCENTS.length],
        icon: sourceMeta.kind === 'arxiv' ? 'fa-file-text-o' : 'fa-magic',
        generated: true,
        source: {
            kind: sourceMeta.kind,
            label: sourceMeta.label,
            title: sourceMeta.arxiv?.title || '',
            url: sourceMeta.arxiv?.absUrl || '',
            arxivId: sourceMeta.arxiv?.versionedId || sourceMeta.arxiv?.id || '',
            contentSource: sourceMeta.arxiv?.contentSource || '',
            contentSourceUrl: sourceMeta.arxiv?.contentSourceUrl || '',
            outline: Array.isArray(sourceMeta.arxiv?.outline) ? sourceMeta.arxiv.outline.slice(0, 80) : [],
            request
        },
        summary: String(isVerifiedArxiv ? `Progressive reader for the verified arXiv paper: ${sourceMeta.arxiv.title}.` : (lab.summary || 'A generated progressive coding lab.')).slice(0, 260),
        outcome: String(lab.outcome || 'Build the core idea in small, testable steps.').slice(0, 220),
        blocks: blocks.map((block, blockIndex) => ({
            phase: String(block.phase || phases[blockIndex % phases.length]).slice(0, 32),
            title: String(block.title || `Step ${blockIndex + 1}`).slice(0, 80),
            time: String(block.time || '6 min').slice(0, 20),
            objective: String(block.objective || 'Build the intuition for this step from first principles.').slice(0, 180),
            body: Array.isArray(block.body)
                ? block.body.slice(0, 4).map(item => String(item).slice(0, 500))
                : [String(block.body || 'Start with a tiny concrete case, then predict the next implementation move before revealing it.').slice(0, 500)],
            prompt: String(block.prompt || 'Write your own note: summarize this slice, then predict the next line, rule, or output before revealing it.').slice(0, 260),
            code: (Array.isArray(block.codeLines) ? block.codeLines.join('\n') : Array.isArray(block.code) ? block.code.join('\n') : String(block.code || '')).slice(0, 3000),
            check: String(block.check || 'Compare your answer against the invariant and the code behavior.').slice(0, 320),
            paperFocus: String(block.paperFocus || block.section || block.title || '').slice(0, 160)
        }))
    };

    normalized.blocks[0] = createOpeningPredictionBlock(sourceMeta, request);
    return normalized;
}

function buildFallbackGeneratedLab(sourceMeta, request, language, difficulty, rawResponse = '') {
    const subject = request || sourceMeta.label || 'selected topic';
    const responseHint = String(rawResponse || '').replace(/\s+/g, ' ').slice(0, 180);

    return {
        title: `AI Lab: ${subject}`.slice(0, 80),
        subtitle: 'From zero to first implementation',
        category: sourceMeta.kind === 'arxiv' ? 'Research Paper' : 'Generated Lab',
        difficulty,
        language,
        summary: `A ground-up prediction lab for learning and coding ${subject}.`,
        outcome: `Build intuition for ${subject}, predict each next move, then compare against a tiny implementation.`,
        blocks: [
            {
                phase: 'Ground',
                title: 'Start with the object',
                time: '4 min',
                objective: 'Define the idea using a tiny object before any jargon.',
                body: [
                    `Pretend ${subject} is only one small input and one small output.`,
                    responseHint ? `Useful signal from the AI draft: ${responseHint}` : 'Do not optimize yet; only name what changes from input to output.'
                ],
                prompt: 'Predict the smallest input and output pair that would prove you understand the idea.',
                codeLines: ['# Example shape:', 'input_value = ...', 'expected_output = ...'],
                check: 'A good first prediction names one concrete input, one expected output, and the rule connecting them.'
            },
            {
                phase: 'Predict',
                title: 'Guess the next rule',
                time: '5 min',
                objective: 'Use the toy case to infer the rule before seeing code.',
                body: ['Read the input like a next-token predictor: based on the current state, guess the next transformation.'],
                prompt: 'What is the next operation you expect the algorithm to perform, and why?',
                codeLines: ['# The next move should transform the toy input once.', 'next_state = step(toy_input)'],
                check: 'The strongest prediction explains both the operation and what should change after it runs.'
            },
            {
                phase: 'Build',
                title: 'Reveal the small implementation',
                time: '8 min',
                objective: 'Turn the predicted rule into the smallest useful function.',
                body: ['Now compare your prediction against the direct implementation. Every line should match a rule you can say aloud.'],
                prompt: 'Before revealing, predict the function signature and the one line that carries the idea.',
                codeLines: ['def core_step(x):', '    # implement the central transformation', '    return x'],
                check: 'The first implementation should be boring, direct, and traceable on the toy input.'
            },
            {
                phase: 'Probe',
                title: 'Predict the failure',
                time: '6 min',
                objective: 'Find the first place your intuition could be wrong.',
                body: ['Change one input detail and predict the output before running the test. This is where intuition becomes durable.'],
                prompt: 'What tiny test would expose a wrong mental model?',
                codeLines: ['assert core_step(toy_input) == expected'],
                check: 'Strong probes test the toy rule, one edge case, and one assumption the algorithm depends on.'
            }
        ]
    };
}

async function generateLabFromInput(button) {
    const sourceInput = document.getElementById('cg-generate-source');
    const languageInput = document.getElementById('cg-generate-language');
    const difficultyInput = document.getElementById('cg-generate-difficulty');
    const source = sourceInput?.value.trim() || '';
    const language = languageInput?.value || 'Python';
    const difficulty = difficultyInput?.value || 'Intermediate';
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Building Lab';

    try {
        const sourceMeta = await resolveSourceContext(source);
        const prompt = `You are CodeGym, an AI tutor that turns papers, algorithms, and technical topics into progressive coding labs.

SOURCE:
${sourceMeta.text}

SOURCE LOCK:
${sourceMeta.kind === 'arxiv'
    ? `This is a verified arXiv source. You must build the lab for exactly arXiv ${sourceMeta.arxiv.versionedId}: "${sourceMeta.arxiv.title}". Do not substitute another paper or invent a different title. The initial generation has metadata, abstract, and section headings only. Build a progressive roadmap and ground-up learning path, but do not pretend you have read every paper detail. For each block, set paperFocus to the section heading, keyword, or concept that should be fetched later on demand.`
    : 'Use only the source/topic supplied above. Do not silently substitute a different paper or algorithm.'}

USER PREFERENCES:
Language: ${language}
Difficulty: ${difficulty}

Create a ground-up progressive implementation lab. Assume the learner does not already know the topic. Teach like a Progressive Reader for code: each block is a small readable slice, then a learner-owned note/prediction, then a tiny reveal they can compare against. The AI should act as a verifier of the learner's understanding, not as a lecturer asking quiz questions.

Return strict JSON only, no markdown fences:
{
  "title": "short lab title",
  "subtitle": "specific algorithm/paper idea",
  "category": "Research Paper | Machine Learning | Algorithms | Systems | Generated Lab",
  "difficulty": "${difficulty}",
  "language": "${language}",
  "summary": "one sentence describing the generated lab",
  "outcome": "what the learner will implement",
  "blocks": [
    {
      "phase": "Ground | Name | Trace | Rebuild | Probe | Recall | other short phase name",
      "title": "short step title",
      "time": "4 min",
      "objective": "one concrete first-principles learning goal",
      "body": ["2-3 short reader sentences that explain only this slice, with no skipped prerequisites"],
      "prompt": "a learner task phrased as writing a note, prediction, tiny example, or memory reconstruction",
      "codeLines": ["the tiny reveal after the prediction, one line per array item"],
      "check": "the smallest comparison point for checking the learner's note without overexplaining",
      "paperFocus": "for arXiv labs only: matching paper section heading or keywords to fetch on demand"
    }
  ]
}

Rules:
- Produce as many blocks as the topic needs. Do not target a fixed count; stop only when the learner has enough slices to rebuild and recall the idea without being overwhelmed.
- Use phases like Ground, Name, Trace, Rebuild, Probe, Recall, but add or repeat phases when the idea needs more careful stepping.
- Start from a concrete toy example and reveal one idea per block. Do not assume prior knowledge or use unexplained jargon.
- The first block must be plain-language orientation only. It must not ask for formulas, shapes, dimensions, complexity, gradients, kernels, strides, padding, tensors, matrices, or other technical terms.
- Any technical word used in a prompt must be defined in the body of the same block first.
- Every prompt should make the learner write their own understanding: summarize, predict what comes next, make an example, explain a line, or reconstruct from memory.
- Do not phrase prompts as quiz questions from the app. Prefer imperatives like "Write...", "Predict...", "Make...", "Explain...".
- The body should be useful on its own, like reading a tiny paragraph from a careful textbook.
- Keep every string short. Body items must be one sentence each.
- codeLines must contain at most 6 short lines. Do not use multiline strings.
- Do not dump a full solution in any block.
- Use codeLines as the reveal, not as extra explanation.
- If the source is a paper, focus on the core implementable contribution, not a generic summary.
- For arXiv papers, use section headings as a navigation map. The detailed paper text will be fetched by CodeGym on demand during Q&A and note checking, so keep the initial block bodies honest and foundational.`;

        let response;
        try {
            response = await aiCall(prompt, { temperature: 0.35, maxOutputTokens: 4200, budgetProfile: 'json' });
        } catch (jsonModeError) {
            console.warn('[CodeGym] JSON-mode AI request failed, retrying normal mode:', jsonModeError?.message || jsonModeError);
            response = await aiCall(`${prompt}

The provider may not support enforced JSON mode. Still return only one compact JSON object.`, {
                temperature: 0.3,
                maxOutputTokens: 4200
            });
        }
        let rawLab;
        try {
            rawLab = await parseGeneratedLabJson(response, prompt);
        } catch (parseError) {
            console.warn('[CodeGym] Falling back after invalid generated lab JSON:', parseError?.message || parseError);
            rawLab = buildFallbackGeneratedLab(sourceMeta, source, language, difficulty, response);
            toast('AI returned messy JSON, so CodeGym built a compact fallback lab.', 'warning');
        }
        const generated = normalizeGeneratedLab(rawLab, sourceMeta, source);
        session.generatedLabs = [generated, ...(session.generatedLabs || [])].slice(0, 12);
        activeLabId = generated.id;
        activeBlockIndex = 0;
        labState(generated.id).revealed = 1;
        saveSession();
        toast('Generated a new CodeGym lab', 'success');
        render();
    } catch (error) {
        toast(error?.message || String(error), 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
.codegym-modal-shell {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    width: 100vw !important;
    max-width: none !important;
    height: 100vh !important;
    max-height: none !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 0 !important;
}
.cg-shell {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    background: radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--cg-accent, #14b8a6) 10%, transparent), transparent 28rem), var(--color-bg);
    color: var(--color-text);
    font-family: inherit;
}
.cg-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 18px;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 64%, transparent);
    background: color-mix(in srgb, var(--color-bg) 92%, transparent);
    backdrop-filter: blur(16px);
    z-index: 10;
}
.cg-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}
.cg-brand-icon {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 20%, transparent);
    color: var(--cg-accent, #14b8a6);
    flex: 0 0 auto;
}
.cg-title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0;
}
.cg-subtitle {
    margin: 2px 0 0;
    color: var(--color-text-muted);
    font-size: 0.78rem;
}
.cg-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.cg-btn {
    border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
    background: transparent;
    color: var(--color-text);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 0.86rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 34px;
    transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;
    letter-spacing: 0;
}
.cg-btn:hover {
    border-color: var(--cg-accent, #14b8a6);
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 8%, transparent);
    transform: translateY(-1px);
}
.cg-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
}
.cg-btn-primary {
    border-color: var(--cg-accent, #14b8a6);
    background: var(--cg-accent, #14b8a6);
    color: var(--color-bg);
}
.cg-btn-primary:hover {
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 88%, white);
}
.cg-icon-btn {
    width: 34px;
    padding: 0;
}
.cg-main {
    min-height: 0;
    display: block;
    overflow: auto;
}
.cg-stage {
    min-width: 0;
    min-height: 100%;
    padding: clamp(1.5rem, 4vw, 4.5rem) clamp(1rem, 5vw, 5rem) 2rem;
    background: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
}
.cg-stage-inner {
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    flex: 1;
}
.cg-coach {
    min-height: 0;
    overflow: auto;
    padding: 16px;
    background: color-mix(in srgb, var(--color-surface) 74%, transparent);
    border-left: 1px solid color-mix(in srgb, var(--color-border) 64%, transparent);
}
.cg-reader-card {
    background: transparent;
    border: none;
    margin-top: 2.25rem;
    padding: 0 0 2.25rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 36%, transparent);
    scroll-margin: 5rem;
}
.cg-reader-card.current-focus {
    border-bottom-color: color-mix(in srgb, var(--cg-accent, #14b8a6) 36%, transparent);
}
.cg-reader-stream {
    display: grid;
    gap: 0;
}
.cg-reader-head {
    padding: 18px 0;
    border-bottom: 2px solid color-mix(in srgb, var(--cg-accent, #14b8a6) 20%, transparent);
    display: flex;
    justify-content: space-between;
    gap: 12px;
}
.cg-phase {
    color: var(--cg-accent, #14b8a6);
    font-weight: 800;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.cg-reader-head h4 {
    margin: 5px 0 0;
    font-size: 1.45rem;
    letter-spacing: 0;
}
.cg-time {
    color: var(--color-text-muted);
    font-size: 0.86rem;
    white-space: nowrap;
    padding-top: 5px;
}
.cg-reader-body {
    padding: 28px 0;
    font-size: 1.05rem;
    line-height: 1.72;
}
.cg-objective {
    margin: 0 0 20px;
    color: var(--color-text);
    font-weight: 650;
    font-size: 1.1rem;
    border-left: 3px solid var(--cg-accent, #14b8a6);
    padding-left: 14px;
}
.cg-reader-body p {
    color: color-mix(in srgb, var(--color-text) 85%, transparent);
    margin: 0 0 16px;
}
.cg-code {
    margin: 24px 0;
    border: 1px solid color-mix(in srgb, var(--color-border) 40%, transparent);
    border-radius: 8px;
    overflow: auto;
    background: color-mix(in srgb, var(--color-surface) 60%, black);
    box-shadow: 0 10px 32px rgba(15, 23, 42, 0.2);
}
.cg-code pre {
    margin: 0;
    padding: 16px;
    min-width: max-content;
}
.cg-code code {
    color: #dbeafe;
    font-size: 0.86rem;
    line-height: 1.6;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}
.cg-navigation {
    position: sticky;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem auto 0;
    padding: 0.55rem;
    width: min(100%, 760px);
    border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-bg) 90%, transparent);
    backdrop-filter: blur(18px);
    z-index: 4;
}
.cg-navigation .cg-btn {
    flex: 1;
    min-width: 120px;
}
.cg-workbench {
    border: 1px solid color-mix(in srgb, var(--cg-accent, #14b8a6) 38%, transparent);
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 7%, transparent);
    border-radius: 8px;
    padding: 18px;
    margin-top: 28px;
}
.cg-slice {
    margin-top: 18px;
}
.cg-slice p {
    margin: 0 0 16px;
}
.cg-workbench strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 0.95rem;
    color: var(--cg-accent, #14b8a6);
}
.cg-task {
    color: color-mix(in srgb, var(--color-text) 82%, transparent);
    line-height: 1.55;
}
.cg-answer {
    width: 100%;
    min-height: 100px;
    margin-top: 14px;
    resize: vertical;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
    background: color-mix(in srgb, var(--color-bg) 50%, transparent);
    color: var(--color-text);
    padding: 12px;
    font: inherit;
    font-size: 0.95rem;
    line-height: 1.6;
    outline: none;
    transition: border-color 0.2s;
}
.cg-answer:focus {
    border-color: var(--cg-accent, #14b8a6);
    background: color-mix(in srgb, var(--color-bg) 80%, transparent);
}
.cg-check {
    display: none;
    margin-top: 16px;
    padding: 14px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 9%, transparent);
    border: 1px solid color-mix(in srgb, var(--cg-accent, #14b8a6) 34%, transparent);
    color: color-mix(in srgb, var(--color-text) 84%, transparent);
    line-height: 1.5;
    font-size: 0.9rem;
}
.cg-check.visible {
    display: block;
}
.cg-check .cg-code {
    margin: 10px 0 14px;
}
.cg-feedback {
    margin-top: 14px;
    padding: 13px 14px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--color-border) 46%, transparent);
    background: color-mix(in srgb, var(--color-bg) 58%, transparent);
    color: color-mix(in srgb, var(--color-text) 82%, transparent);
    font-size: 0.92rem;
    line-height: 1.55;
}
.cg-feedback strong {
    margin-bottom: 8px;
}
.cg-prompt-ask {
    margin: 0;
    border: none;
    background: transparent;
    color: var(--cg-accent, #14b8a6);
    padding: 0;
    font: inherit;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
}
.cg-block-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    margin-top: 12px;
}
.cg-panel {
    border: 1px solid color-mix(in srgb, var(--color-border) 64%, transparent);
    border-radius: 8px;
    padding: 14px;
    background: transparent;
    margin-bottom: 16px;
}
.cg-panel h4 {
    margin: 0 0 10px;
    font-size: 0.95rem;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 8px;
}
.cg-panel h4 i {
    color: var(--cg-accent, #14b8a6);
}
.cg-panel p,
.cg-panel li {
    color: color-mix(in srgb, var(--color-text) 70%, transparent);
    font-size: 0.86rem;
    line-height: 1.5;
}
.cg-panel ul {
    margin: 0;
    padding-left: 20px;
}
.cg-note {
    width: 100%;
    min-height: 120px;
    resize: vertical;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
    background: color-mix(in srgb, var(--color-bg) 60%, transparent);
    color: var(--color-text);
    padding: 12px;
    font: inherit;
    font-size: 0.86rem;
    line-height: 1.5;
    outline: none;
}
.cg-coach-output {
    white-space: pre-wrap;
    color: color-mix(in srgb, var(--color-text) 80%, transparent);
    font-size: 0.86rem;
    line-height: 1.6;
    margin-top: 12px;
    padding: 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-bg) 40%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-border) 40%, transparent);
}
.cg-chat-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
}
.cg-chat-input-row {
    display: flex;
    gap: 8px;
}
.cg-lab-hero {
    margin-bottom: 30px;
}
.cg-lab-hero h3 {
    margin: 0;
    font-size: 1.8rem;
    letter-spacing: 0;
}
.cg-lab-hero p {
    margin: 10px 0 0;
    color: var(--color-text-muted);
    line-height: 1.6;
    font-size: 1.05rem;
}
.cg-pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
}
.cg-pill {
    border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
    border-radius: 999px;
    padding: 4px 10px;
    color: var(--color-text-muted);
    font-size: 0.78rem;
    background: color-mix(in srgb, var(--color-bg) 50%, transparent);
}
.cg-block-map {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 0 0 24px;
}
.cg-block-dot {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
    background: color-mix(in srgb, var(--color-bg) 60%, transparent);
    color: var(--color-text-muted);
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    padding: 0;
    flex: 0 0 auto;
}
.cg-block-dot.available {
    color: var(--color-text);
}
.cg-block-dot.active {
    border-color: var(--cg-accent, #14b8a6);
    background: var(--cg-accent, #14b8a6);
    color: var(--color-bg);
    transform: scale(1.1);
    box-shadow: 0 0 15px color-mix(in srgb, var(--cg-accent, #14b8a6) 40%, transparent);
}
.cg-doc-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin: 0 0 2rem;
    color: color-mix(in srgb, var(--color-text) 58%, transparent);
    font-size: 0.78rem;
    letter-spacing: 0;
}
.cg-generator {
    margin: 0 0 2.25rem;
    padding: 0 0 1.1rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 54%, transparent);
}
.cg-generator-kicker {
    color: var(--cg-accent, #14b8a6);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
}
.cg-generator-title {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: flex-end;
    margin-bottom: 12px;
}
.cg-generator-title h3 {
    margin: 0;
    font-size: 1.18rem;
    letter-spacing: 0;
}
.cg-generator-title p {
    margin: 4px 0 0;
    color: var(--color-text-muted);
    font-size: 0.92rem;
    line-height: 1.45;
}
.cg-generator-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 126px 132px auto;
    gap: 8px;
    align-items: stretch;
}
.cg-input,
.cg-select {
    min-height: 38px;
    border: 1px solid color-mix(in srgb, var(--color-border) 64%, transparent);
    border-radius: 6px;
    background: color-mix(in srgb, var(--color-bg) 62%, transparent);
    color: var(--color-text);
    padding: 8px 10px;
    font: inherit;
    font-size: 0.88rem;
    outline: none;
}
.cg-input:focus,
.cg-select:focus {
    border-color: var(--cg-accent, #14b8a6);
}
.cg-focus-marker {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0 0 0.8rem;
    color: var(--cg-accent, #14b8a6);
    font-size: 0.78rem;
    font-weight: 700;
}
.cg-ask-chip {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--cg-accent, #14b8a6) 48%, transparent);
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 12%, transparent);
    color: var(--cg-accent, #14b8a6);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: transform 140ms ease, background 140ms ease;
}
.cg-ask-chip:hover {
    background: color-mix(in srgb, var(--cg-accent, #14b8a6) 20%, transparent);
    transform: translateY(-1px);
}
.cg-inline-question {
    display: none;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
    align-items: stretch;
    margin: 0 0 1rem;
    padding: 0.55rem;
    border: 1px solid color-mix(in srgb, var(--cg-accent, #14b8a6) 32%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-bg) 86%, transparent);
}
.cg-inline-question.active {
    display: grid;
}
.cg-inline-question-input {
    min-height: 38px;
    border: none;
    background: transparent;
    color: var(--color-text);
    padding: 0 0.4rem;
    font: inherit;
    outline: none;
}
.cg-inline-qa-log {
    display: grid;
    gap: 0.8rem;
    margin: 0 0 1.25rem;
}
.cg-qa-bubble {
    border-left: 2px solid var(--cg-accent, #14b8a6);
    padding: 0.1rem 0 0.1rem 0.9rem;
}
.cg-qa-question {
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
}
.cg-qa-answer {
    color: color-mix(in srgb, var(--color-text) 78%, transparent);
    font-size: 0.92rem;
    line-height: 1.6;
}
.cg-focus-dot {
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--cg-accent, #14b8a6) 14%, transparent);
}
.cg-source-note {
    margin-top: 12px;
    color: var(--color-text-muted);
    font-size: 0.8rem;
}
.cg-delete-lab {
    color: #fca5a5;
}
@media (max-width: 980px) {
    .codegym-modal-shell {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
        width: calc(100vw - 14px) !important;
        height: calc(100vh - 14px) !important;
    }
    .cg-main {
        display: block;
    }
    .cg-stage {
        padding: 16px;
    }
    .cg-generator-row {
        grid-template-columns: 1fr;
    }
    .cg-generator-title {
        display: block;
    }
    .cg-inline-question {
        grid-template-columns: 1fr auto auto;
    }
}
`;
    document.head.appendChild(style);
}

function removeStyles() {
    document.getElementById(STYLE_ID)?.remove();
}

function progressFor(lab) {
    const state = labState(lab.id);
    return Math.round((state.completed.length / lab.blocks.length) * 100);
}

function renderLabButton(lab) {
    const state = labState(lab.id);
    const active = lab.id === activeLabId ? 'active' : '';
    const progress = progressFor(lab);
    return `
        <button class="cg-lab-card ${active}" data-action="select-lab" data-lab-id="${esc(lab.id)}" style="--cg-card-accent:${lab.accent}">
            <strong><i class="fa ${esc(lab.icon)}"></i> ${esc(lab.title)}</strong>
            <span>${esc(lab.subtitle)}</span>
            <div class="cg-progress-track"><div class="cg-progress-fill" style="width:${progress}%"></div></div>
            <span>${state.revealed}/${lab.blocks.length} revealed, ${state.completed.length} understood</span>
        </button>
    `;
}

function renderBlockMap(lab, state) {
    return `
        <div class="cg-block-map" aria-label="Lab blocks">
            ${lab.blocks.map((block, index) => {
                const available = index < state.revealed;
                const active = index === activeBlockIndex;
                const completed = state.completed.includes(index);
                return `
                    <button class="cg-block-dot ${available ? 'available' : ''} ${active ? 'active' : ''}"
                        data-action="jump-block"
                        data-block-index="${index}"
                        ${available ? '' : 'disabled'}
                        title="${esc(block.phase)}: ${esc(block.title)}">
                        ${completed ? '<i class="fa fa-check"></i>' : index + 1}
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

function renderGeneratorPanel() {
    return `
        <section class="cg-generator">
            <div class="cg-generator-kicker">AI Lab Builder</div>
            <div class="cg-generator-title">
                <div>
                    <h3>Generate a progressive coding reader</h3>
                    <p>Paste an arXiv link, algorithm, or topic. CodeGym turns it into tiny slices you can summarize, predict, check, and rebuild.</p>
                </div>
            </div>
            <div class="cg-generator-row">
                <input id="cg-generate-source" class="cg-input" type="text" placeholder="arxiv.org/abs/1706.03762, diffusion models, A*, LoRA, FlashAttention..." />
                <select id="cg-generate-language" class="cg-select">
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>TypeScript</option>
                    <option>Rust</option>
                    <option>Pseudocode</option>
                </select>
                <select id="cg-generate-difficulty" class="cg-select">
                    <option>Intermediate</option>
                    <option>Beginner</option>
                    <option>Advanced</option>
                </select>
                <button class="cg-btn cg-btn-primary" data-action="generate-lab">
                    <i class="fa fa-magic"></i> Generate
                </button>
            </div>
        </section>
    `;
}

function renderInlineQA(state, blockIndex) {
    const items = Array.isArray(state.qa)
        ? state.qa.filter(item => item.blockIndex === blockIndex).slice(-3)
        : [];
    if (!items.length) return '';

    return `
        <div class="cg-inline-qa-log">
            ${items.map(item => `
                <div class="cg-qa-bubble">
                    <div class="cg-qa-question"><i class="fa fa-question-circle"></i> ${esc(item.question)}</div>
                    <div class="cg-qa-answer conversational-content markdown-body">${nanoMarkdown(item.answer)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderReaderBlock(lab, state, block, index) {
    const answer = state.answers[index] || '';
    const feedback = state.feedback?.[index] || '';
    const isComplete = state.completed.includes(index);
    const isActive = index === activeBlockIndex;
    const bodyItems = Array.isArray(block.body) ? block.body : [block.body].filter(Boolean);

    return `
        <article class="cg-reader-card ${isActive ? 'current-focus' : ''}" data-block-index="${index}">
            <div class="cg-reader-head">
                <div>
                    <div class="cg-phase">${esc(block.phase)}</div>
                    <h4>${esc(block.title)}</h4>
                </div>
                <div class="cg-time"><i class="fa fa-clock-o"></i> ${esc(block.time)}</div>
            </div>
            <div class="cg-reader-body">
                <div class="cg-objective">${esc(block.objective)}</div>
                <div class="cg-slice">
                    ${bodyItems.map(item => `<p>${esc(item)}</p>`).join('')}
                </div>
                <div class="cg-workbench">
                    <strong><i class="fa fa-pencil"></i> Your understanding</strong>
                    <div class="cg-task">${esc(block.prompt)}</div>
                    <textarea class="cg-answer" data-action="answer" data-block-index="${index}" placeholder="Write your summary, prediction, tiny example, or line-by-line explanation here...">${esc(answer)}</textarea>
                    ${feedback ? `
                        <div class="cg-feedback">
                            <strong><i class="fa fa-check-circle"></i> AI check</strong>
                            <div class="conversational-content markdown-body">${nanoMarkdown(feedback)}</div>
                        </div>
                    ` : ''}
                    <div class="cg-check ${isComplete ? 'visible' : ''}" data-block-index="${index}">
                        ${block.code ? `<strong>Next slice:</strong><div class="cg-code"><pre><code>${esc(block.code)}</code></pre></div>` : ''}
                        <strong>Compare:</strong> ${esc(block.check)}
                    </div>
                    <div class="cg-block-actions">
                        <button class="cg-btn cg-btn-primary" data-action="verify-note" data-block-index="${index}">
                            <i class="fa fa-magic"></i> Check My Note
                        </button>
                        <button class="cg-btn" data-action="show-check" data-block-index="${index}">
                            <i class="fa fa-eye"></i> ${isComplete ? 'Hide/Show Next Slice' : 'Reveal Next Slice'}
                        </button>
                        <button class="cg-btn" data-action="complete-block" data-block-index="${index}">
                            <i class="fa fa-check"></i> ${isComplete ? 'Marked Understood' : 'Mark Understood'}
                        </button>
                        <button class="cg-prompt-ask" data-action="enter-qa" data-block-index="${index}">
                            <i class="fa fa-question-circle"></i> Ask a specific question
                        </button>
                    </div>
                </div>
            </div>
            ${renderInlineQA(state, index)}
            ${isActive ? `
                <div class="cg-focus-marker">
                    <span class="cg-focus-dot"></span>
                    <span>Current reader slice ${index + 1} of ${lab.blocks.length}</span>
                    <button class="cg-ask-chip" data-action="enter-qa" data-block-index="${index}" title="Ask about this block">
                        <i class="fa fa-question"></i>
                    </button>
                </div>
                <div class="cg-inline-question" id="cg-inline-question">
                    <input class="cg-inline-question-input" id="cg-inline-question-input" type="text" placeholder="Ask about the current block" />
                    <button class="cg-btn cg-btn-primary" data-action="submit-inline-question" data-block-index="${index}">
                        <i class="fa fa-paper-plane"></i>
                    </button>
                    <button class="cg-btn cg-icon-btn" data-action="cancel-qa" title="Close question">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            ` : ''}
        </article>
    `;
}

function renderStage(lab, state) {
    const visibleBlocks = lab.blocks.slice(0, Math.max(1, state.revealed));
    const canRevealNext = state.revealed < lab.blocks.length;

    return `
        <section class="cg-stage">
            <div class="cg-stage-inner">
                ${renderGeneratorPanel()}
                <div class="cg-lab-hero">
                    <h3>${esc(lab.title)}: ${esc(lab.subtitle)}</h3>
                    <p>${esc(lab.summary)}</p>
                    <div class="cg-pill-row">
                        ${lab.generated ? '<span class="cg-pill"><i class="fa fa-magic"></i> AI generated</span>' : ''}
                        <span class="cg-pill"><i class="fa fa-tag"></i> ${esc(lab.category)}</span>
                        <span class="cg-pill"><i class="fa fa-signal"></i> ${esc(lab.difficulty)}</span>
                        <span class="cg-pill"><i class="fa fa-terminal"></i> ${esc(lab.language)}</span>
                    </div>
                    ${lab.source?.label ? `<div class="cg-source-note"><i class="fa fa-link"></i> Source: ${esc(lab.source.label)}</div>` : ''}
                </div>

                ${renderBlockMap(lab, state)}

                <div class="cg-reader-stream">
                    ${visibleBlocks.map((block, index) => renderReaderBlock(lab, state, block, index)).join('')}
                </div>
            </div>
            
            <div class="cg-navigation">
                <button class="cg-btn" data-action="prev-block" ${activeBlockIndex <= 0 ? 'disabled' : ''}>
                    <i class="fa fa-arrow-up"></i> Focus Previous
                </button>
                <button class="cg-btn cg-btn-primary" data-action="reveal-next" ${canRevealNext ? '' : 'disabled'}>
                    <i class="fa fa-unlock"></i> ${canRevealNext ? 'Reveal Next Slice' : 'All Slices Revealed'}
                </button>
                <button class="cg-btn" data-action="next-block" ${activeBlockIndex >= state.revealed - 1 ? 'disabled' : ''}>
                    Focus Next <i class="fa fa-arrow-down"></i>
                </button>
            </div>
        </section>
    `;
}

function renderSidebar() { return ""; }

function renderCoach(lab, state) {
    const block = lab.blocks[activeBlockIndex];
    
    const coachHtml = state.coach || '';
    
    return `
        <aside class="cg-coach">
            <div class="cg-panel" style="border-color: var(--cg-accent); background: color-mix(in srgb, var(--cg-accent) 5%, transparent);">
                <h4><i class="fa fa-magic"></i> AI Coach</h4>
                <p>Discuss the formulation, edge cases, and implementation here.</p>
                <div class="cg-chat-container">
                    <div class="cg-coach-output" id="cg-coach-output" style="display: ${state.coach ? 'block' : 'none'}; max-height: 300px; overflow-y: auto;">
                        ${coachHtml}
                    </div>
                    <textarea class="cg-note" id="cg-coach-chat-input" placeholder="Ask AI Coach..." style="min-height: 60px; margin-top: 8px;"></textarea>
                    <div class="cg-chat-input-row" style="margin-top: 8px;">
                        <button class="cg-btn cg-btn-primary" data-action="ask-ai-custom" style="width: 100%;">
                            <i class="fa fa-paper-plane"></i> Send
                        </button>
                    </div>
                </div>
            </div>
            <div class="cg-panel">
                <h4><i class="fa fa-compass"></i> Current Target</h4>
                <p>${esc(lab.outcome)}</p>
            </div>
            <div class="cg-panel">
                <h4><i class="fa fa-list-ul"></i> Coach Questions</h4>
                <ul>
                    <li>What are the inputs and outputs?</li>
                    <li>What shape or invariant must never break?</li>
                    <li>What tiny example proves the block works?</li>
                    <li>What changes when this scales?</li>
                </ul>
            </div>
            <div class="cg-panel">
                <h4><i class="fa fa-sticky-note-o"></i> Lab Notes</h4>
                <textarea class="cg-note" data-action="notes" placeholder="Keep experiment notes, questions, and next variations here...">${esc(state.notes || '')}</textarea>
            </div>
            <div class="cg-panel">
                <h4><i class="fa fa-lightbulb-o"></i> Active Prompt</h4>
                <p>${esc(block.prompt)}</p>
            </div>
        </aside>
    `;
}

function renderShell() {
    const lab = currentLab();
    const state = labState(lab.id);
    activeBlockIndex = Math.max(0, Math.min(activeBlockIndex, state.revealed - 1, lab.blocks.length - 1));

    return `
        <div class="cg-header" style="--cg-accent:${lab.accent}">
            <div class="cg-brand">
                <div class="cg-brand-icon"><i class="fa fa-code"></i></div>
                <div>
                    <h2 class="cg-title">CodeGym</h2>
                    <p class="cg-subtitle">Progressive implementation labs for papers, ML, and algorithms.</p>
                </div>
            </div>
            <div class="cg-header-actions">
                <select class="cg-btn cg-lab-select" data-action="change-lab" style="min-width: 200px; padding: 4px 10px; height: 34px; border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent); background: transparent; color: var(--color-text);">
                    ${getAllLabs().map(l => `<option value="${l.id}" ${l.id === lab.id ? 'selected' : ''}>${l.generated ? 'AI: ' : ''}${esc(l.title)}</option>`).join('')}
                </select>
                <button class="cg-btn" data-action="export-cards" title="Export this lab into review cards">
                    <i class="fa fa-clone"></i>
                </button>
                <button class="cg-btn" data-action="reset-lab" title="Reset current lab progress">
                    <i class="fa fa-repeat"></i> Reset
                </button>
                ${lab.generated ? `<button class="cg-btn cg-delete-lab" data-action="delete-generated-lab" title="Delete generated lab"><i class="fa fa-trash"></i></button>` : ''}
                <button class="cg-btn cg-icon-btn" data-action="close" title="Close CodeGym">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
        <main class="cg-main" style="--cg-accent:${lab.accent}">
            ${renderStage(lab, state)}
        </main>
    `;
}

function render(root = document.querySelector('.cg-shell'), options = {}) {
    if (!root) return;

    // Capture scroll states
    const scrollMap = new Map();
    root.querySelectorAll('*').forEach(el => {
        if (el.scrollHeight > el.clientHeight && el.scrollTop > 0) {
            let path = el.className || el.tagName;
            scrollMap.set(path, el.scrollTop);
        }
    });
    
    // Always preserve focus if we have an active input
    const activeId = document.activeElement?.id;
    const activeAction = document.activeElement?.dataset?.action;

    root.innerHTML = renderShell();
    bindRoot(root);

    // Restore scroll
    root.querySelectorAll('*').forEach(el => {
        let path = el.className || el.tagName;
        if (scrollMap.has(path)) {
            el.scrollTop = scrollMap.get(path);
        }
    });

    if (activeId && root.querySelector(`#${activeId}`)) {
        root.querySelector(`#${activeId}`).focus();
    } else if (activeAction && root.querySelector(`[data-action="${activeAction}"]`)) {
        root.querySelector(`[data-action="${activeAction}"]`).focus();
    }

    if (options.scrollToActive) {
        const afterPaint = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
        afterPaint(() => {
            const card = root.querySelector(`.cg-reader-card[data-block-index="${activeBlockIndex}"]`);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
}

function renderLauncher(container) {
    if (!container) return;
    mountedContainer = container;
    container.innerHTML = `
        <div class="cg-launcher" style="--cg-accent:${LABS[0].accent}">
            <div class="cg-launcher-icon"><i class="fa fa-code"></i></div>
            <div class="cg-launcher-copy">
                <strong>CodeGym</strong>
                <span>Progressive labs for papers, algorithms, and ML implementations.</span>
            </div>
            <button class="cg-btn cg-btn-primary" type="button" data-codegym-open>
                <i class="fa fa-play"></i> Open
            </button>
        </div>
    `;
    container.querySelector('[data-codegym-open]')?.addEventListener('click', openCodeGym);
}

function bindRoot(root) {
    root.onkeydown = (event) => {
        if (event.key === 'Enter' && event.target?.id === 'cg-inline-question-input') {
            event.preventDefault();
            askInlineQuestion(root.querySelector('[data-action="submit-inline-question"]'), currentLab(), labState(activeLabId));
            return;
        }
        if (event.key === 'Escape' && root.querySelector('#cg-inline-question')?.classList.contains('active')) {
            event.preventDefault();
            exitInlineQuestion(root);
        }
    };

    root.onchange = (event) => {
        const target = event.target.closest('select[data-action="change-lab"]');
        if (target) {
            activeLabId = target.value;
            activeBlockIndex = Math.min(labState(activeLabId).revealed - 1, currentLab().blocks.length - 1) || 0;
            saveSession();
            render(root, { scrollToActive: true });
        }
    };
    root.onclick = async (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const lab = currentLab();
        const state = labState(lab.id);

        if (action === 'close') {
            closeCodeGym();
            return;
        }

        if (action === 'select-lab') {
            activeLabId = target.dataset.labId;
            activeBlockIndex = Math.min(labState(activeLabId).revealed - 1, 0);
            saveSession();
            render(root, { scrollToActive: true });
            return;
        }

        if (action === 'jump-block') {
            const nextIndex = Number(target.dataset.blockIndex);
            if (Number.isInteger(nextIndex) && nextIndex < state.revealed) {
                activeBlockIndex = nextIndex;
                render(root, { scrollToActive: true });
            }
            return;
        }

        if (action === 'prev-block') {
            activeBlockIndex = Math.max(0, activeBlockIndex - 1);
            render(root, { scrollToActive: true });
            return;
        }

        if (action === 'next-block') {
            activeBlockIndex = Math.min(state.revealed - 1, activeBlockIndex + 1);
            render(root, { scrollToActive: true });
            return;
        }

        if (action === 'show-check') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            const check = root.querySelector(`.cg-check[data-block-index="${blockIndex}"]`);
            check?.classList.toggle('visible');
            return;
        }

        if (action === 'verify-note') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            if (Number.isInteger(blockIndex)) activeBlockIndex = Math.max(0, Math.min(blockIndex, state.revealed - 1));
            await verifyBlockNote(target, lab, state, activeBlockIndex);
            return;
        }

        if (action === 'complete-block') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            if (!state.completed.includes(blockIndex)) {
                state.completed.push(blockIndex);
                state.completed.sort((a, b) => a - b);
            }
            activeBlockIndex = Math.max(0, Math.min(blockIndex, state.revealed - 1));
            saveSession();
            toast('Marked understood', 'success');
            render(root, { scrollToActive: false });
            return;
        }

        if (action === 'reveal-next') {
            if (state.revealed < lab.blocks.length) {
                state.revealed += 1;
                activeBlockIndex = state.revealed - 1;
                saveSession();
                render(root, { scrollToActive: true });
            }
            return;
        }

        if (action === 'reset-lab') {
            session.labs[lab.id] = {
                revealed: 1,
                completed: [],
                answers: {},
                feedback: {},
                notes: '',
                qa: []
            };
            activeBlockIndex = 0;
            saveSession();
            toast('Lab reset', 'info');
            render();
            return;
        }

        if (action === 'generate-lab') {
            await generateLabFromInput(target);
            return;
        }

        if (action === 'delete-generated-lab') {
            if (!lab.generated) return;
            session.generatedLabs = (session.generatedLabs || []).filter(item => item.id !== lab.id);
            delete session.labs[lab.id];
            activeLabId = (session.generatedLabs?.[0] || LABS[0]).id;
            activeBlockIndex = 0;
            saveSession();
            toast('Generated lab deleted', 'info');
            render(root, { scrollToActive: true });
            return;
        }

        if (action === 'export-cards') {
            exportCards(lab);
            return;
        }

        if (action === 'enter-qa') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            if (Number.isInteger(blockIndex)) activeBlockIndex = Math.max(0, Math.min(blockIndex, state.revealed - 1));
            if (!root.querySelector(`.cg-reader-card[data-block-index="${activeBlockIndex}"]`)?.classList.contains('current-focus')) {
                render(root, { scrollToActive: true });
                const afterPaint = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
                afterPaint(() => enterInlineQuestion(document.querySelector('.cg-shell')));
                return;
            }
            enterInlineQuestion(root);
            return;
        }

        if (action === 'cancel-qa') {
            exitInlineQuestion(root);
            return;
        }

        if (action === 'submit-inline-question') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            if (Number.isInteger(blockIndex)) activeBlockIndex = Math.max(0, Math.min(blockIndex, state.revealed - 1));
            await askInlineQuestion(target, lab, state);
        }
    };

    root.oninput = (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;

        const state = labState(activeLabId);
        if (target.dataset.action === 'answer') {
            const blockIndex = Number(target.dataset.blockIndex ?? activeBlockIndex);
            state.answers[Number.isInteger(blockIndex) ? blockIndex : activeBlockIndex] = target.value;
            saveSession();
        }
        if (target.dataset.action === 'notes') {
            state.notes = target.value;
            saveSession();
        }
    };
}

function isTypingTarget(target) {
    const tag = target?.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable;
}

function enterInlineQuestion(root = document.querySelector('.cg-shell')) {
    const container = root?.querySelector('#cg-inline-question');
    const input = root?.querySelector('#cg-inline-question-input');
    if (!container || !input) return;
    container.classList.add('active');
    input.value = '';
    input.focus();
    container.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
}

function exitInlineQuestion(root = document.querySelector('.cg-shell')) {
    const container = root?.querySelector('#cg-inline-question');
    const input = root?.querySelector('#cg-inline-question-input');
    container?.classList.remove('active');
    if (input) input.value = '';
}

async function askInlineQuestion(button, lab, state) {
    const block = lab.blocks[activeBlockIndex];
    const answer = state.answers[activeBlockIndex] || '';
    const inputField = document.getElementById('cg-inline-question-input');
    const userMessage = inputField ? inputField.value.trim() : '';
    const root = document.querySelector('.cg-shell');
    if (!userMessage) {
        exitInlineQuestion(root);
        return;
    }
    
    const originalText = button?.innerHTML || '';
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    }

    try {
        const recentQA = (state.qa || []).slice(-3).map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
        const paperContext = await getPaperContextForSlice(lab, block, userMessage);
        const prompt = `You are CodeGym, a concise coding companion inside ATLAS Face.

Lab: ${lab.title} - ${lab.subtitle}
Source: ${lab.source?.label || lab.category}
Current reader slice: ${block.phase} - ${block.title}
Objective: ${block.objective}
Learner task: ${block.prompt}
Learner note so far: ${answer || '(empty)'}
${paperContext ? `\n${paperContext}\n` : ''}
Recent Q&A:
${recentQA || '(none)'}

Learner Question: ${userMessage}

Respond STRICTLY and DIRECTLY to the question in 1 to 3 sentences. Keep it first-principles and help the learner repair or sharpen their own understanding. Prefer tiny examples and local invariants. If paper context is provided, ground the answer in that context without quoting long passages. Do not jump ahead or dump the solution.`;

        const result = await aiCall(prompt);
        state.qa = [
            ...(state.qa || []),
            {
                question: userMessage,
                answer: String(result || '').trim(),
                blockIndex: activeBlockIndex,
                createdAt: Date.now()
            }
        ].slice(-20);
        saveSession();
        render();
    } catch (error) {
        const message = error?.message || String(error);
        toast(message, 'warning');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
}

async function verifyBlockNote(button, lab, state, blockIndex) {
    const block = lab.blocks[blockIndex];
    const note = String(state.answers?.[blockIndex] || '').trim();
    if (!note) {
        toast('Write your note or prediction first', 'info');
        return;
    }

    const originalText = button?.innerHTML || '';
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Checking';
    }

    try {
        const paperContext = await getPaperContextForSlice(lab, block, note);
        const prompt = `You are CodeGym's verifier. The learner is using AI the disciplined way: they read a small technical slice, write their own understanding or prediction, then ask whether it is correct.

Lab: ${lab.title} - ${lab.subtitle}
Slice: ${block.phase} - ${block.title}
Slice text:
${(Array.isArray(block.body) ? block.body : [block.body]).filter(Boolean).join('\n')}
${paperContext ? `\n${paperContext}\n` : ''}

Learner task:
${block.prompt}

Learner note:
${note}

Hidden comparison point:
${block.check}

Respond in 1 to 3 short sentences. Start with exactly one of: "Correct.", "Mostly correct.", "Not quite.", or "Too vague." If paper context is provided, use it as the reference for this slice. Do not reveal the full solution or future steps. If there is a gap, name the smallest missing idea and give a tiny hint so the learner can repair their own note.`;

        const result = await aiCall(prompt, { temperature: 0.2, maxOutputTokens: 360, budgetProfile: 'default' });
        state.feedback = state.feedback || {};
        state.feedback[blockIndex] = String(result || '').trim();
        saveSession();
        render(document.querySelector('.cg-shell'));
    } catch (error) {
        toast(error?.message || String(error), 'warning');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
}


function exportCards(lab) {
    const state = ctxRef?.state || window.state;
    const lessonId = state?.getCurrentLessonId?.();
    if (!state || !lessonId || typeof state.addCard !== 'function') {
        toast('Open a topic first to export CodeGym cards', 'warning');
        return;
    }

    const cards = lab.blocks.map((block, index) => ({
        id: Date.now() + index + Math.floor(Math.random() * 1000),
        type: 'text',
        title: `CodeGym: ${block.title}`,
        content: [
            `Lab: ${lab.title} - ${lab.subtitle}`,
            `Phase: ${block.phase}`,
            `Objective: ${block.objective}`,
            `Prediction prompt: ${block.prompt}`,
            `Reveal/check: ${block.check}`
        ].join('\n\n'),
        gsW: 4,
        gsH: 3,
        links: [],
        tags: ['codegym', lab.category.toLowerCase().replace(/\s+/g, '-')],
        srs_dueDate: null,
        srs_interval: 0,
        srs_easeFactor: 2.5,
        srs_reviews: 0,
        srs_lapses: 0,
        srs_ignored: false,
        createdAt: new Date().toISOString()
    }));

    cards.forEach(card => state.addCard(lessonId, card));
    toast(`Exported ${cards.length} CodeGym cards`, 'success');
}

function openCodeGym() {
    injectStyles();
    if (session.lastLabId && getAllLabs().some(lab => lab.id === session.lastLabId)) {
        activeLabId = session.lastLabId;
    }

    if (modalHandle?.overlay?.isConnected) {
        modalHandle.overlay.remove();
    }

    const content = document.createElement('div');
    content.className = 'cg-shell';
    content.setAttribute('role', 'application');
    content.setAttribute('aria-label', 'CodeGym');

    if (ctxRef?.showModal) {
        modalHandle = ctxRef.showModal(content, { className: 'codegym-modal-shell' });
    } else {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.display = 'flex';
        overlay.setAttribute('data-plugin-modal', PLUGIN_ID);
        const box = document.createElement('div');
        box.className = 'modal-box codegym-modal-shell';
        box.appendChild(content);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        modalHandle = { overlay, close: () => overlay.remove() };
    }

    modalHandle?.overlay?.classList.add('active', 'show');
    if (modalHandle?.overlay) {
        modalHandle.overlay.style.display = 'flex';
        modalHandle.overlay.style.visibility = 'visible';
        modalHandle.overlay.style.opacity = '1';
    }
    document.body.classList.add('modal-open');
    render(content);

    if (codeGymKeyHandler) document.removeEventListener('keydown', codeGymKeyHandler);
    codeGymKeyHandler = (event) => {
        if (!modalHandle?.overlay?.isConnected || !modalHandle.overlay.classList.contains('active')) return;
        if (event.key !== '?' || isTypingTarget(event.target)) return;
        event.preventDefault();
        enterInlineQuestion(content);
    };
    document.addEventListener('keydown', codeGymKeyHandler);
}

function closeCodeGym() {
    if (codeGymKeyHandler) {
        document.removeEventListener('keydown', codeGymKeyHandler);
        codeGymKeyHandler = null;
    }
    modalHandle?.close?.();
    modalHandle = null;
    document.body.classList.remove('modal-open');
}

export async function activate(ctx) {
    ctxRef = ctx;
    injectStyles();

    renderLauncher(ctx.getContainer?.());

    ctx.addSidebarButton({
        icon: 'fa-code',
        label: 'CodeGym',
        title: 'Open CodeGym',
        onClick: openCodeGym
    });

    ctx.addToolbarButton?.({
        icon: 'fa-code',
        label: 'CodeGym',
        title: 'Open CodeGym',
        onClick: openCodeGym
    });

    ctx.registerCommand?.({
        id: 'open',
        title: 'Open CodeGym',
        subtitle: 'Progressive labs for papers, algorithms, and ML implementations',
        icon: 'fa-code',
        action: openCodeGym
    });

    ctx.registerKeybind?.('Ctrl+Shift+G', openCodeGym, 'Open CodeGym');

    console.log('[CodeGym] Activated');
}

export function deactivate() {
    closeCodeGym();
    if (mountedContainer) {
        mountedContainer.innerHTML = '';
        mountedContainer = null;
    }
    removeStyles();
    if (window.__toolbarPluginButtons) {
        window.__toolbarPluginButtons = window.__toolbarPluginButtons.filter(button => button.pluginId !== PLUGIN_ID);
        window.__contextToolbar?.update?.();
    }
    ctxRef = null;
    console.log('[CodeGym] Deactivated');
}

export function onAppReady() {
    console.log('[CodeGym] Ready');
}

export const api = {
    open: openCodeGym,
    getLabs() {
        return LABS.map(({ id, title, subtitle, category, difficulty }) => ({
            id,
            title,
            subtitle,
            category,
            difficulty
        }));
    },
    resetAllProgress() {
        session = { labs: {}, generatedLabs: [], lastLabId: LABS[0].id };
        saveSession();
    }
};
