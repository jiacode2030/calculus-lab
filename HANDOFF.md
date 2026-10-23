# Calculus Lab: handoff

State: all 50 modules, the review tools (practice, Which method, exam builder, mistakes queue, FRQs) and the AB/BC toggle are built. Everything is committed locally in this repo; there is no GitHub remote yet (create `jiacode2030/calculus-lab`, add it as `origin`, push `main`).

## To publish on GitHub Pages
1. Create the repo `jiacode2030/calculus-lab` (public), `git remote add origin ...`, `git push -u origin main`.
2. Settings → Pages → deploy from `main`, root. `index.html` is the built site; `.nojekyll` is present.
3. "Report an issue" opens issues in `jiacode2030/intulab-feedback` (`REPO` in `src/js/report.js`), labelled `course:calc`.

## Before relying on the content
- Verify the unit/topic list and the BC-only flags against the current course and exam description (written from memory).
- AB and BC 2027 exam dates (Mon May 10, morning) came from a web search; confirm at apstudents.collegeboard.org/exam-dates.
- FRQs and "Which method?" items are original; a teacher should review them.
- `node tests/audit.js` cross-checks every generator against an independent numeric computation.

See `CLAUDE.md` for the architecture, the module generator (`tools/mk.py`) and the rules that break the site if ignored.
