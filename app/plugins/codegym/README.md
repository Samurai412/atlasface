# CodeGym

CodeGym is an ATLAS Face community plugin for learning to code by rebuilding interesting ideas one small reveal at a time.

It borrows the structure of the progressive reader, but swaps passive reading for an implementation loop:

1. Frame the idea.
2. Predict the shape of the solution.
3. Reveal the smallest useful code block.
4. Probe it with a check or experiment.
5. Export the important ideas as review cards.

## Included Labs

- Paper to Prototype: scaled dot-product attention.
- ML Algorithm Build: K-means from scratch.
- Graph Algorithm Build: PageRank.
- Research Reproduction: Q-learning.

CodeGym can also generate labs with AI. Paste an arXiv link, paper title, algorithm, or topic, choose a language/difficulty, and CodeGym creates a progressive implementation chapter with map, prediction, build, probe, refactor, and ship steps.

Each lab includes progressive blocks, code snippets, prompts, checkpoints, notes, and an optional AI coach if the app AI service is configured.

## Usage

1. Install CodeGym from the ATLAS Face plugin marketplace.
2. Open it from the sidebar, toolbar, command palette, or `Ctrl+Shift+G`.
3. Generate a lab from an arXiv link/topic, or pick a built-in example.
4. Reveal one block at a time.
5. Write predictions, complete checkpoints, and export cards into the current topic.

## Notes

CodeGym is local-first. Progress, generated labs, answers, and notes are saved in browser storage under `codegym.session.v1`.
