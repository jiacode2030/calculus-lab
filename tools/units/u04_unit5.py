# ---- figures for Extreme values & the Mean Value Theorem
_M = Plot((-.3, 3.6), (-.8, 10.5), (30, 12, 215, 196))
_mvf = fig(_M.axes((1, 2, 3), (1, 4, 9), 'x', 'y') + _M.curve(lambda x: x * x, 0, 3.2) + _M.dot(1, 1, '', 'ink') + _M.dot(3, 9, '', 'ink'), [
    (1, '', 'polynomial: continuous and differentiable', 'ink'),
    (2, _M.seg(.85, .4, 3.2, 9.8, 'tan', 2, '6 4') + _M.text(1.25, .55, '(1, 1)', 'ink', 10, 'start', 500) + _M.text(2.9, 9.6, '(3, 9)', 'ink', 10, 'end', 500), 'secant slope (9 − 1)/2 = 4', 'tan'),
    (3, '', 'set f′(c) = 2c equal to 4', 'd'),
    (4, _M.seg(1.1, .4, 2.9, 7.6, 'tan', 2.6) + _M.dot(2, 4, 'c = 2', 'd', 16, 12), 'tangent at c = 2 has slope 4', 'd'),
    (5, '', 'tangent ∥ secant', 'tan')],
    'The secant from (1, 1) to (3, 9) is dashed; the tangent at c = 2 (solid) is parallel to it.', 230)
_pb, _pc = 35 / 24 + 3.5 / 432 * 24, -3.5 / 432
_pp = lambda t: 12 + _pb * t + _pc * t * t
_Cm = Plot((-2, 39), (8, 66), (30, 8, 215, 106))
_Cv = Plot((-2, 39), (55, 106), (30, 150, 215, 112))
_vm = lambda t: 60 * (_pb + 2 * _pc * t)
_cam = fig(_Cm.axes((), (12, 47, 61), '', 'mile') + ''.join(_Cm.dot(a, b, '', 'f') for a, b in ((0, 12), (24, 47), (36, 61)))
           + _Cv.axes((12, 24, 36), (70, 87.5), 't', 'mph') + _Cv.seg(0, 70, 37, 70, 'mut', 1.2, '2 4'), [
    (1, _Cm.seg(0, 12, 24, 47, 'tan', 2, '6 4') + _Cm.text(13, 24, '87.5 mph', 'tan', 11, 'start') + _Cv.seg(0, 87.5, 24, 87.5, 'tan', 2, '6 4'), 'average 35 mi / 24 min = 87.5 mph', 'tan'),
    (2, _Cm.curve(_pp, 0, 36, 'f', 2, '3 4') + _Cv.curve(_vm, 0, 36, 'd', 2.4) + _Cv.dot(12, 87.5, 'c₁', 'd', 0, -10), 'speed exactly 87.5 at some c₁', 'd'),
    (3, _Cm.seg(24, 47, 36, 61, 'tan', 2, '6 4') + _Cm.text(37, 50, '70', 'tan', 11, 'end') + _Cv.seg(24, 70, 36, 70, 'tan', 2, '6 4') + _Cv.dot(30, 70, 'c₂', 'd', 0, -10), '14 mi / 12 min = 70 mph', 'tan'),
    (4, '', 'v fell from 87.5 to 70: a < 0 sometime', 'dd'),
    (5, '', 'MVT: some moment exists, not when', 'ink')],
    'Top: the three camera readings (blue dots) and the average speeds (dashed secants). Bottom: the speed on one possible trip (green, only an illustration). It must hit each average speed somewhere inside its interval.', 290)

mod('mvt','Extreme values & the Mean Value Theorem',
 'Two guarantees about continuous and differentiable functions: there is always a highest and lowest point, and somewhere the slope equals the average slope.',
 ['<b>Extreme Value Theorem:</b> a function continuous on a closed interval <span class="m">[a, b]</span> has an absolute maximum and an absolute minimum there. They occur at endpoints or at <b>critical points</b>, where f′ = 0 or f′ does not exist. To find them, evaluate f at the critical points and at both endpoints (the candidates test).',
  '<b>Mean Value Theorem:</b> if f is continuous on [a, b] and differentiable on (a, b), then somewhere inside there is a point c where the tangent line is parallel to the secant line: <span class="m">f′(c) = (f(b) − f(a))/(b − a)</span>. If you drove 120 miles in 2 hours, at some moment your speedometer read exactly 60.'],
 ('we looked for slopes and values one point at a time','guarantees about the whole interval','optimization, proofs of the derivative tests, and "must have happened" reasoning','the EVT and the MVT, with their hypotheses'),
 [('f continuous on [a, b] ⇒ max and min exist','EVT'),('f′(c) = (f(b) − f(a)) / (b − a)','MVT: continuous on [a, b], differentiable on (a, b)'),('critical point: f′(c) = 0 or DNE','candidate for an extreme')],
 [lab('mv-lab','Find the parallel tangent',canvas='mv-canvas',aria='A curve on an interval with the secant line between the endpoints and tangent lines at points where the slope equals the average slope.',
   seg=('mv-fn','Function',[('cu','x³/3 − x'),('sn','sin x'),('sq','x²'),('abs','|x|')]),
   ctl=[('mv-a','a (left end)',-2,1,.1,-1.5),('mv-b','b (right end)',1.2,3,.1,2.5)],
   out=[('mv-m','average slope (secant)','x'),('mv-c','point(s) c with f′(c) = that slope','v'),('mv-ext','absolute max / min on [a, b]','a')])],
 [('On x³/3 − x with the default interval, find where the tangent is parallel to the secant.',show(["click","#mv-fn [data-k=cu]"],["#mv-a",-1.5],["#mv-b",2.5]),'There can be more than one c. Each orange tangent is parallel to the secant. The MVT only promises at least one.'),
  ('On the same curve and interval, read the absolute maximum and minimum. Where are they?',show(["click","#mv-fn [data-k=cu]"],["#mv-a",-1.5],["#mv-b",2.5]),'The maximum is about 2.708 at the right endpoint x = 2.5 (the local maximum at x = −1 is only 2/3). The minimum is −2/3 at the critical point x = 1. This is why the candidates test always checks the endpoints.'),
  ('Choose x² on [−1, 2]. Find c before you look.',show(["click","#mv-fn [data-k=sq]"],["#mv-a",-1],["#mv-b",2]),'The average slope is (4 − 1)/3 = 1, and f′(c) = 2c = 1 gives c = 0.5, the midpoint. For any parabola, the MVT point is the midpoint of the interval.'),
  ('Choose |x|. Does a tangent parallel to the secant exist?',show(["click","#mv-fn [data-k=abs]"],["#mv-a",-1],["#mv-b",2]),'No: the slope of |x| is only −1 or 1, but the average slope here is 1/3. The MVT does not apply because |x| is not differentiable at 0, which lies inside the interval.')],
 [('Verify the MVT for f(x) = x² on [1, 3] and find c.',[
  '<b>Check the hypotheses.</b> f is a polynomial: continuous and differentiable everywhere.',
  '<b>Average slope.</b> (f(3) − f(1))/(3 − 1) = (9 − 1)/2 = 4.',
  '<b>Set the derivative equal.</b> f′(c) = 2c = 4.',
  '<b>Solve.</b> c = 2, and 2 lies in (1, 3). ✓',
  '<b>Answer.</b> <b>c = 2</b>. (The tangent at x = 2 has slope 4, parallel to the secant.)'],_mvf),
  {'h':'Worked example 2: speed cameras (AP-style table)','fig':_cam,'table':[['t (minutes after 2:00 pm)','0','24','36'],['p(t) (mile marker)','12','47','61']],
   'prob':'Highway cameras record a car at the times and mile markers in the table. The speed limit is 70 mph. The car\'s position p(t) is a differentiable function of t. (a) Must the car have been going faster than the speed limit at some time between 2:00 and 2:24? Justify. (b) Must the car have been going exactly 70 mph at some time between 2:24 and 2:36? (c) Assume p is twice differentiable. Must the car\'s acceleration have been negative at some time? Explain.',
   'steps':['<b>(a) Average speed.</b> (47 − 12) miles in 24 minutes: 35 miles ÷ 0.4 hour = <b>87.5 mph</b>.',
    '<b>Apply the MVT.</b> p is differentiable, so it is also continuous, on [0, 24]. So for some c₁ in (0, 24), p′(c₁) = 87.5 mph. <b>Yes</b>: at that moment the car was going exactly 87.5 mph, faster than 70.',
    '<b>(b)</b> From 2:24 to 2:36 the average speed is 14 miles ÷ 0.2 hour = 70 mph. By the MVT on [24, 36], <b>yes</b>: p′(c₂) = 70 mph for some c₂ in (24, 36).',
    '<b>(c) MVT again, on the velocity.</b> v = p′ is differentiable on [c₁, c₂], so for some time between, a = v′ = (70 − 87.5)/(c₂ − c₁). The numerator is negative and c₂ &gt; c₁, so <b>yes</b>: the acceleration was negative at some time.',
    '<b>What the MVT does not tell you.</b> It proves such moments exist, but not when they happened or what the speed was at 2:24. Average-speed cameras in some countries (the United Kingdom and Italy, for example) issue tickets with exactly this argument.']}],
 ['Using the MVT without checking continuity and differentiability.','Giving a c outside (a, b).','Finding extremes by only looking where f′ = 0 and forgetting the endpoints.','Confusing the MVT (an average slope) with Rolle\'s theorem (the special case f(a) = f(b), slope 0).','Saying a local maximum is the absolute maximum. Compare all candidates.','Mixing units: miles per minute is not miles per hour. Convert before comparing with a speed limit.'],
 ('The candidates test',['To find absolute extremes of a continuous f on [a, b]: (1) find critical points inside (a, b), (2) evaluate f at each critical point and at a and b, (3) the largest value is the maximum and the smallest is the minimum. It always works on a closed interval; on an open interval an extreme may not exist.']),
 [('f is continuous on [0, 4], f(0) = 1 and f(4) = 9, and differentiable on (0, 4). The MVT guarantees a c in (0, 4) with f′(c) =',['2','8','1/2','9'],0,'The average slope is (9 − 1)/(4 − 0) = 2.')])

mod('incdec','Increasing, decreasing & the first derivative test',
 'Where the slope is positive the function climbs, where it is negative the function falls. The turning points are where the sign changes.',
 ['If <span class="m">f′(x) &gt; 0</span> on an interval, f is <b>increasing</b> there; if <span class="m">f′(x) &lt; 0</span>, f is <b>decreasing</b>. A <b>critical point</b> is an x in the domain where f′ = 0 or f′ does not exist. These are the only places a function can turn.',
  '<b>First derivative test:</b> at a critical point c, look at the sign of f′ on each side. If f′ changes from + to −, f has a <b>local maximum</b> at c. From − to +: a <b>local minimum</b>. If the sign does not change, c is neither (think x³ at 0). Always justify with a sign chart.'],
 ('the derivative was a number at a point','its sign tells the whole story of rise and fall','finding peaks and valleys','increasing/decreasing and the first derivative test'),
 [('f′ &gt; 0 ⇒ increasing · f′ &lt; 0 ⇒ decreasing','sign of the slope'),('+ → − ⇒ local max · − → + ⇒ local min','first derivative test'),('critical point: f′ = 0 or DNE','candidates')],
 [lab('id-lab','Read the shape from the slope',canvas='id-canvas',aria='A function above, with regions shaded by the sign of its derivative, and the derivative graph below.',
   seg=('id-fn','Function',[('a','x³ − 3x'),('b','x³'),('c','x⁴ − 2x²'),('d','x·e⁻ˣ'),('e','x^(2/3)')]),ctl=[('id-x','Point x',-2,2,.05,.5)],canvas2=('id-canvas2','Graph of the derivative with shaded sign regions.'),
   out=[('id-sign','sign of f′ at the point','x'),('id-crit','critical points','v'),('id-class','classification','a')])],
 [('Choose x³ and slide through 0. Is x = 0 a max, a min or neither? <button type="button" class="btn link" data-show=\'' + show(["click","#id-fn [data-k=b]"],["#id-x",0]) + '\'>Set it up for me</button>','' ,'Neither: f′ = 3x² is 0 at x = 0 but positive on both sides, so f keeps increasing. A critical point is a candidate, not a guarantee.'),
  ('Choose x^(2/3). What happens at x = 0? <button type="button" class="btn link" data-show=\'' + show(["click","#id-fn [data-k=e]"],["#id-x",0.2]) + '\'>Set it up for me</button>','' ,'f′ does not exist at 0 (a cusp), so 0 is a critical point. f′ changes from − to +, so it is a local minimum.')],
 ('Find the intervals where f(x) = x³ − 3x is increasing or decreasing, and classify its critical points.',[
  '<b>Differentiate.</b> f′(x) = 3x² − 3 = 3(x − 1)(x + 1).',
  '<b>Critical points.</b> f′ = 0 at x = −1 and x = 1.',
  '<b>Sign chart.</b> x &lt; −1: f′ &gt; 0; −1 &lt; x &lt; 1: f′ &lt; 0; x &gt; 1: f′ &gt; 0.',
  '<b>Conclude.</b> f is increasing on (−∞, −1) and (1, ∞), decreasing on (−1, 1).',
  '<b>Classify.</b> At x = −1 the sign goes + → −: <b>local maximum</b> f(−1) = 2. At x = 1 it goes − → +: <b>local minimum</b> f(1) = −2.']),
 ['Calling any point with f′ = 0 an extremum. Check the sign change.','Forgetting critical points where f′ does not exist.','Not showing a sign chart or a justification (the exam requires one).','Mixing up f and f′: the graph of f′ being above the axis means f is increasing, not that f is positive.','Reporting x when asked for the extreme value (the y-value), or the reverse.'],
 ('Writing the justification',['A complete answer says: "f′(x) changes from positive to negative at x = c, so f has a relative maximum at x = c." Always name the function whose sign you are using, and the interval you checked.']),
 [('f′(x) changes from negative to positive at x = 2. Then f has at x = 2 a',['local minimum','local maximum','inflection point','vertical asymptote'],0,'Decreasing then increasing: a valley, a local minimum.')])

mod('concav','Concavity & the second derivative test',
 'Concavity is the bend of a curve: bending up like a cup, or down like a frown. It is the sign of f″.',
 ['If <span class="m">f″ &gt; 0</span> the slope f′ is increasing: the graph is <b>concave up</b> (holds water). If <span class="m">f″ &lt; 0</span> the slope is decreasing: <b>concave down</b>. A <b>point of inflection</b> is where the concavity changes, so f″ changes sign (f″ = 0 or DNE there, but that alone is not enough).',
  '<b>Second derivative test:</b> at a critical point c (f′(c) = 0), if f″(c) &gt; 0 the curve bends up there: local minimum. If f″(c) &lt; 0: local maximum. If f″(c) = 0 the test says nothing: go back to the first derivative test.'],
 ('the sign of f′ told rising from falling','the sign of f″ tells how it bends','a second way to classify critical points, and inflection points','concavity and the second derivative test'),
 [('f″ &gt; 0 ⇒ concave up · f″ &lt; 0 ⇒ concave down','bend'),('f′(c) = 0, f″(c) &gt; 0 ⇒ local min','second derivative test'),('inflection: f″ changes sign','concavity changes')],
 [lab('cc-lab','The bend of a curve',canvas='cc-canvas',aria='A function with regions shaded by concavity, a tangent line at a point, and the second derivative graph below.',
   seg=('cc-fn','Function',[('a','x³ − 3x'),('b','x⁴'),('c','sin x'),('d','x⁴ − 2x²')]),ctl=[('cc-x','Point x',-2,2,.05,.6)],canvas2=('cc-canvas2','Graph of the second derivative.'),
   out=[('cc-fp','f′(x)','v'),('cc-fpp','f″(x)','a'),('cc-bend','concavity here','')])],
 [('Choose x³ − 3x and slide through 0. What happens to the tangent line and to f″? <button type="button" class="btn link" data-show=\'' + show(["click","#cc-fn [data-k=a]"],["#cc-x",0]) + '\'>Set it up for me</button>','' ,'f″ = 6x changes sign at 0: concave down to the left, concave up to the right. The tangent line crosses from above the curve to below it: an inflection point.'),
  ('Choose x⁴ and put x at 0. f″(0) = 0. Is there an inflection point? <button type="button" class="btn link" data-show=\'' + show(["click","#cc-fn [data-k=b]"],["#cc-x",0]) + '\'>Set it up for me</button>','' ,'No. f″ = 12x² is 0 at x = 0 but positive on both sides, so concavity does not change. f″ = 0 is not enough; the test fails here, yet x = 0 is a minimum.')],
 ('For f(x) = x³ − 6x² + 9x, find the local extrema using the second derivative test, and the inflection point.',[
  '<b>f′.</b> f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), so critical points x = 1 and x = 3.',
  '<b>f″.</b> f″(x) = 6x − 12.',
  '<b>Test.</b> f″(1) = −6 &lt; 0: local maximum f(1) = 4. f″(3) = 6 &gt; 0: local minimum f(3) = 0.',
  '<b>Inflection.</b> f″ = 0 at x = 2, and f″ changes from negative to positive there. The inflection point is <b>(2, 2)</b>.']),
 ['Saying f″ = 0 means an inflection point. The sign must change.','Using f″ to find concavity but writing the answer in terms of f′ (or the reverse).','Applying the second derivative test where f″ = 0, and concluding "neither".','Confusing concave up with increasing. A curve can be decreasing and concave up.','Forgetting that concavity changes can happen where f″ does not exist.'],
 ('Two tests, one picture',['At a critical point the first derivative test looks at the sign of f′ on each side; the second derivative test looks at the bend at the point. Use whichever is quicker; if the second derivative test is inconclusive (f″ = 0), fall back on the first.']),
 [('f′(3) = 0 and f″(3) = −5. Then f has at x = 3 a',['local maximum','local minimum','inflection point','no conclusion'],0,'f″ < 0: concave down at a flat point, a peak.')])

mod('sketch','Connecting f, f′ and f″',
 'The three graphs tell one story. Draw the slope and you can rebuild the shape of the function.',
 ['Think of f′ as the slope-meter for f, and f″ as the slope-meter for f′. Where f′ is above the axis, f rises; where f′ crosses from above to below, f has a peak; where f′ has a peak or valley, f has an inflection point; where f′ is rising, f is concave up.',
  'On the exam you read this information from a given graph (of f, f′ or f″) and justify a conclusion. In the lab you control f′ with draggable points, and f is rebuilt from it. Drag the nodes and watch the extrema and inflections move.'],
 ('each graph was studied alone','one graph determines the shape of the others (up to a vertical shift)','curve sketching and reading graphs','the relationships among f, f′ and f″'),
 [('f′ crosses + → − ⇒ f local max','f′ crosses − → + ⇒ local min'),('f′ has a local extremum ⇒ f has an inflection','f″ changes sign'),('f determined by f′ up to + C','the vertical shift')],
 [lab('sk-lab','Drag the slope, rebuild the curve',canvas='sk-canvas',aria='Top graph: a piecewise-linear derivative with draggable points. Bottom graph: the function rebuilt from it.',
   pre='<p class="small" style="margin:0">Drag the green points up and down to set f′. The blue curve f is built from it.</p>',canvas2=('sk-canvas2','The function f rebuilt from the derivative, with extrema and inflection points marked.'),
   ctl=[('sk-c','f(−3), the starting height',-3,3,.25,0)],out=[('sk-inc','f is increasing on','x'),('sk-ext','local extrema','v'),('sk-inf','inflection points','a')],post='<div class="row"><button type="button" class="btn" id="sk-reset">Reset the points</button></div>')],
 [('Drag the middle point of f′ well above the axis. What happens to f?','' ,'f rises steeply where f′ is large and positive, and the bends of f follow the ups and downs of f′.'),
  ('Make f′ cross the axis downward. What does f do there? ','' ,'f has a local maximum where f′ goes from positive to negative. Drag until you see the peak.')],
 ('The graph of f′ is positive on (−3, 1), negative on (1, 4) and has a minimum at x = 2.5. Describe f.',[
  '<b>Increasing/decreasing.</b> f′ &gt; 0 on (−3, 1): f increasing there; f′ &lt; 0 on (1, 4): f decreasing.',
  '<b>Extremum.</b> f′ changes + → − at x = 1, so f has a local maximum at x = 1.',
  '<b>Concavity.</b> f′ is decreasing before its minimum at 2.5 and increasing after, so f″ changes sign at 2.5.',
  '<b>Answer.</b> Local maximum at x = 1, and an inflection point at x = 2.5 (concave down before, concave up after).']),
 ['Reading f′ as if it were f. A positive f′ means rising, not "positive height".','Looking at where f′ is zero for inflection. Inflection is where f′ has an extremum (f″ changes sign).','Forgetting f is only determined up to a vertical shift.','Confusing which graph is given: always read the label.','Not justifying: say "f′ changes sign from + to − at x = 1".'],
 ('Justifications that earn the point',['"f has a relative maximum at x = c because f′ changes from positive to negative at x = c." "f has a point of inflection at x = c because f″ changes sign at x = c." Name the derivative and the sign change.']),
 [('Where f′ has a local maximum, f has',['an inflection point','a local maximum','a local minimum','a vertical tangent'],0,'f′ has a maximum there, so f″ changes from + to −: the concavity of f changes.')])

# ---- figures for Optimization
_P = Plot((0, 54), (0, 1500), (30, 134, 212, 86))
_fence_base = (rect(20, 8, 220, 22, 'f', .22) + txt(130, 23, 'river', 'f', 11, w=500) + ln(55, 32, 205, 32, 'mut', 1.5, '4 4')
               + ln(55, 32, 55, 107, 'ink', 3) + ln(55, 107, 205, 107, 'ink', 3) + ln(205, 32, 205, 107, 'ink', 3)
               + _P.axes((25, 50), (1250,), 'x', 'A'))
_fence = fig(_fence_base, [
    (1, txt(45, 74, 'x', 'f', 14, 'end') + txt(215, 74, 'x', 'f', 14, 'start') + txt(130, 122, 'y = 100 − 2x', 'f', 12), '2x + y = 100', 'f'),
    (2, rect(55, 32, 150, 75, 'area', .3) + txt(130, 74, 'A = xy', 'ink', 13) + _P.curve(lambda x: x * (100 - 2 * x), 0, 50), 'A = x(100 − 2x)', 'area'),
    (3, _P.seg(13, 1250, 37, 1250, 'tan', 2.6), 'A′ = 100 − 4x = 0', 'd'),
    (4, '', 'A″ = −4 < 0: a max', 'dd'),
    (5, _P.dot(25, 1250, '1250 ft²', 'tan', 0, 18), 'x = 25, y = 50', 'tan')],
    'Top: the pen seen from above. Bottom: the area A(x); the best x is where the tangent is flat.', 244)
def _cyl(cx, base, r, h, c='ink', fill='area', op=0, dash=''):
    ry = r * .28; top = base - h
    sd = f'<path d="M{n(cx - r)},{n(top)} L{n(cx - r)},{n(base)} A{n(r)},{n(ry)} 0 0 0 {n(cx + r)},{n(base)} L{n(cx + r)},{n(top)}" style="fill:{col(fill)};fill-opacity:{op};stroke:{col(c)};stroke-width:2' + (f';stroke-dasharray:{dash}' if dash else '') + '"/>'
    return sd + ell(cx, top, r, ry, fill, op * 1.6, c, 2, dash)
_can_base = ln(10, 216, 250, 216, 'mut', 1.5) + _cyl(70, 215, 42, 84)
_can = fig(_can_base, [
    (1, ln(70, 131, 112, 131, 'f', 2) + txt(91, 125, 'r', 'f', 13) + ln(122, 131, 122, 215, 'f', 1.5) + txt(127, 177, 'h', 'f', 13, 'start'), 'πr²h = 355', 'f'),
    (2, _cyl(70, 215, 42, 84, 'ink', 'area', .25), 'S = 2πr² + 710/r', 'area'),
    (3, txt(70, 112, 'r ≈ 3.84', 'tan', 12), 'S′ = 4πr − 710/r² = 0', 'd'),
    (4, txt(70, 244, 'h ≈ 7.67 = 2r', 'tan', 12), 'S″ > 0: a min', 'dd'),
    (5, _cyl(190, 215, 33.5, 134, 'tan', 'tan', .08, '5 4') + txt(190, 64, 'r ≈ 3.05', 'tan', 12) + txt(190, 244, 'h ≈ 12.2 = 4r', 'tan', 12), 'lids cost 2×: h = 4r', 'tan')],
    'Drawn to scale. Left: the can with the least metal. Right (dashed): the cheapest can when the lids cost twice as much.', 252)

mod('optim','Optimization',
 'Biggest area, least material, fastest time: set up a formula for the quantity, find where its derivative is zero, and check it is the best.',
 ['An optimization problem has four steps. <b>Draw</b> and name the variables. Write the <b>objective</b> (the thing to maximize or minimize) and a <b>constraint</b> (what is fixed). Use the constraint to write the objective in <b>one variable</b>. Then <b>differentiate, set to zero, solve</b>, and <b>justify</b> that you have a max or min (first or second derivative test, or the candidates test on a closed interval).',
  'Do not forget the domain: dimensions are positive, and endpoints can be the answer. In the lab the picture and the graph move together: the best value sits at a peak or valley of the graph, where the orange tangent is flat.'],
 ('we found extremes of given formulas','how to build the formula from a story','fences, boxes, cans, distance and cost','the optimization procedure'),
 [('draw · objective · constraint · one variable','setup'),('f′(x) = 0','critical points'),('justify with a test','max or min, and domain')],
 [lab('op-lab','Find the best x',canvas='op-scene',aria='A picture of the chosen object (fenced pen, folded box or can) drawn to scale for the current x.',
   seg=('op-fn','Problem',[('fence','Fence (river on one side)'),('box','Open box from a sheet'),('can','Can with least metal')]),
   canvas2=('op-canvas','Graph of the quantity to optimize as a function of one variable, with a tangent line and a marker at the current value.'),
   ctl=[('op-x','x',.5,50,.5,20),('op-c','Fixed amount',40,200,10,100)],pre='<p class="small" id="op-form" style="margin:0"></p>',out=[('op-val','objective at this x','x'),('op-best','best x and value','v'),('op-dim','the dimensions','')])],
 [('Choose the fence problem. Slide x to find the largest area.',show(["click","#op-fn [data-k=fence]"],["#op-c",100],["#op-x",25]),'The maximum area is 1250 ft² at x = 25 (so the other side is 50). The derivative A′ = 100 − 4x is zero there and changes from + to −.'),
  ('Choose the open box. What size square cut gives the largest volume?',show(["click","#op-fn [data-k=box]"],["#op-c",12],["#op-x",2]),'x = 2 gives V = 2(12 − 4)² = 128 cm³, the maximum for a 12 cm sheet. Any larger cut leaves too little base; any smaller one makes the box too shallow.'),
  ('Choose the can and find the radius with the least metal. Compare its height with its width.',show(["click","#op-fn [data-k=can]"],["#op-c",355],["#op-x",3.84]),'r ≈ 3.84 cm and h ≈ 7.67 cm, so the height equals the diameter. That is true for every volume: setting S′ = 0 gives r³ = V/(2π), and then h = V/(πr²) = 2r.'),
  ('Back to the fence. Change the fixed amount of fencing to 200 ft and find the best x again. Then try 60 ft.',show(["click","#op-fn [data-k=fence]"],["#op-c",200],["#op-x",50]),'The best x is 50 for 200 ft and 15 for 60 ft: always P/4, with the long side P/2. The constraint changes the numbers but not the shape of the answer.'),
  ('Choose the box and make the sheet 30 cm wide. Where is the best cut now?',show(["click","#op-fn [data-k=box]"],["#op-c",30],["#op-x",5]),'x = 5 = 30/6, giving V = 5·20² = 2000 cm³. For any a × a sheet the best cut is a/6, because V′ = (a − 2x)(a − 6x).')],
 [('100 ft of fence encloses a rectangular pen against a straight river (no fence on the river side). Find the dimensions of the largest area.',[
  '<b>Variables.</b> Let x = the two sides perpendicular to the river, y = the side parallel. Constraint: 2x + y = 100, so y = 100 − 2x.',
  '<b>Objective.</b> A = x·y = x(100 − 2x) = 100x − 2x², with 0 &lt; x &lt; 50.',
  '<b>Differentiate.</b> A′ = 100 − 4x = 0, so x = 25.',
  '<b>Justify.</b> A″ = −4 &lt; 0, so x = 25 is a maximum.',
  '<b>Answer.</b> x = 25 ft and y = 50 ft, giving the maximum area <b>1250 ft²</b>.'],_fence),
  {'h':'Worked example 2: designing a soda can','fig':_can,
   'prob':'A soda can is a closed cylinder that must hold 355 cm³ (12 fl oz). (a) What radius and height use the least aluminum? (b) The top and bottom are made of thicker metal and cost twice as much per cm² as the side. What radius and height make the cheapest can?',
   'steps':['<b>Variables and constraint.</b> Radius r and height h in cm. The volume is fixed: πr²h = 355, so h = 355/(πr²).',
    '<b>Objective in one variable.</b> Metal = two lids + side: S = 2πr² + 2πrh = 2πr² + 2πr·355/(πr²) = <b>2πr² + 710/r</b>, for r &gt; 0.',
    '<b>Differentiate.</b> S′ = 4πr − 710/r² = 0 gives r³ = 710/(4π) = 355/(2π), so r = (355/(2π))<sup>1/3</sup> ≈ <b>3.84 cm</b>.',
    '<b>Justify and finish (a).</b> S″ = 4π + 1420/r³ &gt; 0 for every r &gt; 0, so this is the minimum. h = 355/(π·3.84²) ≈ <b>7.67 cm</b>: the height equals the diameter.',
    '<b>(b) Lids cost twice as much.</b> Cost (in side-metal units) C = 2·2πr² + 710/r = 4πr² + 710/r. C′ = 8πr − 710/r² = 0 gives r³ = 355/(4π), r ≈ <b>3.05 cm</b>, and h = 355/(πr²) ≈ <b>12.2 cm</b> = 4r. Costly lids push the design taller and narrower, which is the shape of the cans you see in stores.']}],
 ['Not using the constraint to reduce to one variable.','Forgetting to check endpoints or the domain.','Giving the optimal x when asked for the maximum value (or the reverse).','Not justifying that it is a max or min.','Mixing units, for example using a formula with radius when the problem gives diameter.'],
 ('Common setups',['<b>Perimeter fixed, maximize area:</b> the square wins. <b>Area fixed, minimize perimeter:</b> the square. <b>Volume fixed, minimize surface area of a can:</b> height = diameter. <b>Distance to a curve:</b> minimize the square of the distance (the same minimum, no square root).']),
 [('To maximize A = x(100 − 2x), you solve',['A′(x) = 0','A(x) = 0','A″(x) = 0','x = 100'],0,'Critical points of the objective are where its derivative is zero.')])
