# Calculus Lab: notes for Claude

Interactive, intuition-first AP Calculus AB and BC study site. One self-contained `index.html`, built from `src/` by `python3 build.py`. Sibling of Mechanics Lab (github.com/jiacode2030/physics-mechanics) and Chemistry Lab (github.com/jiacode2030/chemistry-lab): they share the engine and design but are separate repos and sites.

## Workflow
- Edit `src/`, never `index.html` directly. Run `python3 build.py` (needs Python 3 and Node for the JS syntax check), then commit both `src/` and the rebuilt `index.html`.
- Module = `src/modules/<id>.html` + `<id>.js`. The HTML is **generated** from `tools/units/*.py` by `python3 tools/mk.py` (one `mod(...)` call per module; edit the Python, not the HTML). The JS is hand-written. Add new modules to `src/groups.json` (unit order, `bc:true` for BC-only groups) and `src/mods.json` (title, description, `bc`).
- Shared engine: `src/js/core.js` (helpers, panels), `calclib.js` (`sim2d`, `glab` graph labs, `parseExpr`/`sameFn` expression checker, numerics `D`, `D2`, `integ`, `limit`, `roots`, `argmax`, `svgG` static graphs, `mcq`, `terms`), `teach.js` (Coach, Reset, Set-it-up buttons), `practice.js` (problem cards, FRQs, "Which method?"). Data banks: `src/data/*.js` (FRQs, method clues).
- Theme tokens: end of `src/css/calc.css` (indigo layer). Color roles stay fixed on every graph: **f(x) blue, f′ green, f″ pink, tangent/secant orange, area/accumulation gold**.

## AB / BC
- BC-only content carries class `bc` (modules, nav links, problem cards, FRQs, clue rows); BC extension boxes inside shared modules are `.bcx`. The toggle `COURSE()` is stored in `calc-course` (default BC); `body.is-ab` hides everything marked `bc`. A problem is BC if `p.bc` or its module is in a BC group (`isBC(p)`).

## Rules that break the site if ignored
- The page has no doctype (quirks mode): ids and class names match case-insensitively. Never use two names that differ only by case (for example `x-A` and `x-a`), and never reuse an id across modules (`build.py` stops on case clashes).
- localStorage keys use the prefix `calc-`.
- A `sim2d`/`glab` step function must not call its own `render()`. Other sims' `render()` is fine.
- In canvas draw code, do not shadow the global theme object `T` with a local variable.
- Problem generators (`PROBS.push({id,topic,title,gen})`) return `{q, ans|choices|expr, unit, tol|abs, hint, sol}`. Symbolic answers use `expr` (compared by `sameFn`); antiderivatives also set `c:true`. Give every numeric generator an independent `chk` (a numeric computation of the same quantity) and every `expr` generator a `chkf`; `tests/audit.js` compares them.
- Answer boxes accept `3/4`, `2pi`, `ln(2)`, `sqrt(3)/2` and so on (`parseNum` falls back to `exprConst`).

## Content rules
- Accuracy first. After adding or changing problems run `N=400 node tests/audit.js` and verify answers by hand.
- Keep the notices: "Unofficial study aid. Not affiliated with the College Board." and the study-only note. Don't add analytics copied from the physics site.
- AP exam date: `AP_EXAM_DATES` in `src/js/ui.js` (2027-05-10, Session 1, morning, both AB and BC). Reconfirm each year at apstudents.collegeboard.org/exam-dates.

## Tests (Playwright + Chromium)
`node tests/check.js [moduleId ...]` (all views, desktop and phone, light and dark; takes tens of minutes for all, run it in the background), `node tests/flow.js`, `node tests/audit.js`, `node tests/design.js`.

## Known uncertainties
The unit and topic list was written from memory of the course and exam description (verify against the current CED); FRQs and "Which method?" items are original and want teacher review; some BC extras inside Units 6–8 are placed in a "BC only" section rather than inside each unit.
