# Calculus Lab

An interactive, intuition-first study site for **AP Calculus AB and BC**: live graphs you can drag and zoom, step-by-step worked examples,
randomized practice with exact and symbolic answers, original free-response questions, and an exam builder. One site for both exams:
choose AB or BC at the top of the menu and the BC-only parts step aside.

Unofficial study aid. Not affiliated with the College Board. AP and Advanced Placement are trademarks registered by the College Board.

## What is inside
- 50 modules: a math toolkit, Units 1-8 (AB and BC), and a "BC only" section (integration techniques, Euler's method, logistic models, arc length, Unit 9 parametric/polar/vector, Unit 10 series).
- Each module: the idea, an assumption upgrade, a live lab, "Try this" predictions, a worked example, common mistakes, an explanation and check-yourself questions.
- Practice set (186 randomized problem generators), "Which method?" trainer, exam builder, mistakes queue, FRQ practice with point-by-point scoring.
- Reference drawer: derivatives, integrals, limits and series.

## Build and test
```
python3 tools/mk.py   # regenerate module pages from tools/units/*.py
python3 build.py      # writes index.html (needs Python 3 and Node)
node tests/flow.js    # end-to-end flows (Playwright + Chromium)
N=400 node tests/audit.js
node tests/check.js [moduleId ...]
```
See `CLAUDE.md` for the layout and the rules that keep the site working. localStorage keys all start with `calc-`.

Report a mistake or something confusing with the **Report an issue** link on any page: it opens a pre-filled GitHub issue.
