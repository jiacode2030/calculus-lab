# ---- figures for the derivative
_hole = lambda P, x, y, c='f': circ(P.X(x), P.Y(y), 5, 'surf', 1, c, 2)
_DV = Plot((-.3, 3.1), (-.6, 9.4), (30, 12, 215, 196))
_dvf = fig(_DV.axes((1, 2, 3), (2, 4, 6, 8), 'x', 'y') + _DV.curve(lambda x: x * x, 0, 3.05), [
    (1, _DV.dot(1.5, 2.25, 'P', 'ink', -10, 12, 4) + _DV.dot(2.5, 6.25, 'Q', 'tan', 8, 14, 4) + _DV.seg(.6, 2.25 - .9 * 4, 2.6, 2.25 + 4, 'tan', 2), 'h = 1: secant slope 4', 'tan'),
    (2, _DV.dot(2, 4, '', 'tan', 0, 0, 4) + _DV.seg(.9, 2.25 - .6 * 3.5, 2.5, 2.25 + 3.5, 'tan', 2, '5 4'), 'h = 0.5: slope 3.5', 'tan'),
    (3, '', 'slope = 2x + h (f(x+h) − f(x)) / h', 'ink'),
    (4, _DV.seg(.7, 2.25 - .8 * 3, 2.6, 2.25 + 1.1 * 3, 'd', 2.8), 'h → 0: tangent slope 3 = 2(1.5)', 'd'),
    (5, '', "f′(x) = 2x", 'd')],
    'The secant from P to a nearby point Q rotates toward the tangent at P (green) as h shrinks.', 230)

# ---- figures for Average vs instantaneous rate
_R = Plot((-.3, 3.4), (-.8, 10), (30, 12, 215, 196))
_sq = lambda t: t * t
_ln = lambda P, x1, y1, x2, y2, a, b, c='tan', w=2.4, d='': P.seg(a, y1 + (y2 - y1) / (x2 - x1) * (a - x1), b, y1 + (y2 - y1) / (x2 - x1) * (b - x1), c, w, d)
_rt = fig(_R.axes((1, 2, 3), (1, 4, 9), 't', 's') + _R.curve(_sq, 0, 3.15) + _R.dot(1, 1, '', 'ink'), [
    (1, _R.dot(3, 9, '', 'dd') + _ln(_R, 1, 1, 3, 9, .5, 3.25) + _R.text(2.0, 7.3, 'slope 4', 'tan', 11, 'end'), 'secant slope 4', 'tan'),
    (2, _ln(_R, 1, 1, 1.1, 1.21, .25, 3.0, 'tan', 1.6, '5 3'), '1 to 1.1: 2.1', 'tan'),
    (3, '', '1 to 1.01: 2.01', 'tan'),
    (4, _R.seg(.4, -.2, 3, 5, 'd', 2.2), 'tangent slope 2', 'd')],
    'Position s = t² (blue). Each secant through t = 1 tilts less as its second point moves in; they settle on the tangent (green).', 230)
_ot, _od = [0, .5, 1, 1.5, 2], [0, 28, 61, 85, 120]
_O = Plot((.3, 1.72), (14, 100), (34, 12, 210, 196))
_odo = fig(_O.axes((.5, 1, 1.5), (28, 61, 85), 't', 'D') + ''.join(_O.dot(a, b, '', 'f') for a, b in zip(_ot[1:4], _od[1:4])), [
    (1, _O.seg(.35, 21, 1.6, 96, 'mut', 1.8, '5 4'), 'whole trip: 60 mph', 'ink'),
    (2, _ln(_O, .5, 28, 1, 61, .38, 1.25, 'dd', 2.4), 'left: 66 mph', 'dd'),
    (3, _ln(_O, 1, 61, 1.5, 85, .7, 1.68, 'd', 2.4), 'right: 48 mph', 'd'),
    (4, _ln(_O, .5, 28, 1.5, 85, .36, 1.62, 'tan', 2.6), 'centered: 57 mph', 'tan'),
    (5, '', 'best guess at t = 1', 'tan')],
    'Zoomed in around t = 1 on the odometer readings (blue). Each line\'s slope is an average speed; the centered one straddles t = 1.', 230)

mod('rates','Average vs instantaneous rate',
 'Speed over a trip is easy: distance divided by time. Speed at one instant needs a limit. Watch a secant line turn into a tangent line.',
 ['The <b>average rate of change</b> of f from x = a to x = b is the slope of the <b>secant line</b> through the two points: <span class="m">(f(b) − f(a)) / (b − a)</span>. It is what a car\'s trip computer tells you: miles per hour over the whole trip.',
  'The <b>instantaneous rate of change</b> is what the speedometer shows at one moment. Shrink the interval: move the second point toward the first. The secant line rotates and settles into the <b>tangent line</b>, and its slope is the limit of the average rates. That limit is the derivative.'],
 ('a rate needed two different points (distance over time)','a rate at a single instant','speed at a moment, marginal cost, the slope of a curve at a point','an instantaneous rate defined as a limit of average rates'),
 [('(f(b) − f(a)) / (b − a)','average rate = secant slope'),('lim<sub>h→0</sub> (f(a + h) − f(a)) / h','instantaneous rate = tangent slope'),('units: output per input','e.g. meters per second')],
 [lab('rt-lab','Shrink the interval',canvas='rt-canvas',aria='A curve with a fixed point, a second point at distance h, and the secant line through them; the tangent line is dashed.',
   seg=('rt-fn','Function',[('sq','x²'),('cu','x³ − 3x'),('sn','sin x'),('ex','eˣ')]),
   ctl=[('rt-x','Point a',-2,2,.1,1),('rt-h','Gap h',-1.5,1.5,.05,1.2)],
   out=[('rt-avg','average rate (secant slope)','a'),('rt-inst','instantaneous rate (tangent slope)','v'),('rt-diff','difference','')])],
 [('Make h smaller and smaller on x² at a = 1. What do the secant slopes approach?',show(["click","#rt-fn [data-k=sq]"],["#rt-x",1],["#rt-h",0.05]),'Toward 2, the slope of the tangent line at x = 1. With h = 0.05 the average rate is 2.05; with h = 0.001 it would be 2.001.'),
  ('Set h negative (second point on the left). Does the answer still approach the same number?',show(["click","#rt-fn [data-k=sq]"],["#rt-x",1],["#rt-h",-0.05]),'Yes: 1.95 from the left, 2.05 from the right. For a smooth curve both sides squeeze toward the same tangent slope.'),
  ('Choose eˣ at a = 0 with h = 1.2, then shrink h to 0.05. What number is the secant slope heading for?',show(["click","#rt-fn [data-k=ex]"],["#rt-x",0],["#rt-h",1.2]),'About 1.93 at h = 1.2 and 1.03 at h = 0.05, heading for 1: the slope of eˣ at 0 is e⁰ = 1. The big gap overestimates because eˣ curves upward.'),
  ('Choose sin x with a = 1.6 (near the top of the hump). Compare h = 0.5 with h = −0.5.',show(["click","#rt-fn [data-k=sn]"],["#rt-x",1.6],["#rt-h",0.5]),'About −0.27 to the right and +0.22 to the left: the two secants tilt opposite ways because they straddle the peak. The tangent slope, cos 1.6 ≈ −0.03, is nearly flat and sits between them.')],
 [('A car\'s position is s(t) = t² feet after t seconds. Find the average velocity from t = 1 to t = 3 and estimate the velocity at t = 1.',[
  '<b>Average rate.</b> (s(3) − s(1))/(3 − 1) = (9 − 1)/2 = 4 ft/s.',
  '<b>Shrink the interval.</b> From t = 1 to t = 1.1: (1.21 − 1)/0.1 = 2.1 ft/s. From 1 to 1.01: (1.0201 − 1)/0.01 = 2.01.',
  '<b>Spot the pattern.</b> The average velocities approach 2.',
  '<b>Answer.</b> Average velocity on [1, 3] is <b>4 ft/s</b>; the instantaneous velocity at t = 1 is <b>2 ft/s</b>.'],_rt),
  {'h':'Worked example 2: odometer readings on a road trip (AP-style table)','fig':_odo,'table':[['t (hours)','0','0.5','1','1.5','2'],['D(t) (miles)','0','28','61','85','120']],
   'prob':'The odometer of a car on a highway trip gives the distance D(t), in miles, after t hours. (a) Find the average speed for the whole trip. (b) Estimate the car\'s speed at t = 1 using the readings just before t = 1, then just after. (c) Give the best estimate of the speed at t = 1 the table allows, and say what it means.',
   'steps':['<b>(a) Whole trip.</b> (D(2) − D(0))/(2 − 0) = 120/2 = <b>60 mph</b>. That is the slope of the long dashed secant.',
    '<b>(b) Just before t = 1.</b> (D(1) − D(0.5))/(1 − 0.5) = 33/0.5 = <b>66 mph</b>.',
    '<b>Just after t = 1.</b> (D(1.5) − D(1))/(1.5 − 1) = 24/0.5 = <b>48 mph</b>. The two one-sided averages disagree a lot: the car was slowing down around t = 1.',
    '<b>(c) Center the interval.</b> (D(1.5) − D(0.5))/(1.5 − 0.5) = 57/1 = <b>57 mph</b>. It uses readings on both sides of t = 1, so it is the average of 66 and 48 and the best estimate from this table.',
    '<b>Meaning.</b> D′(1) ≈ 57 means that at t = 1 hour the speedometer read about 57 miles per hour. Units: miles per hour, because D is in miles and t in hours.']}],
 ['Dividing by the wrong thing: the denominator is b − a (change in input), not b.','Forgetting units. A rate has units of output per input, like ft/s or dollars per item.','Thinking the average rate over an interval equals the rate at its midpoint. It only does for special functions.','Using a gap h = 0 in the formula: the quotient is 0/0. A limit, not substitution.','With a table, using readings that do not contain the time asked about.'],
 ('Two ways to see it',['Geometrically: secant slope → tangent slope. Numerically: a table of (f(a+h) − f(a))/h for smaller and smaller h. Algebraically: simplify the quotient, then let h → 0. The next module does that last step formally.']),
 [('The average rate of change of f over [2, 5] is',['(f(5) − f(2))/(5 − 2)','(f(5) − f(2))/5','f(5)/f(2)','(f(5) + f(2))/2'],0,'Average rate = change in output over change in input = (f(5) − f(2))/(5 − 2).')])

mod('deriv','The derivative & differentiability',
 'The derivative is a function: at every x it gives the slope of the tangent line. Some graphs have no tangent at certain points, and those are worth knowing.',
 ['Define <span class="m">f′(x) = lim<sub>h→0</sub> (f(x + h) − f(x))/h</span>. When this limit exists, f is <b>differentiable</b> at x and f′(x) is the slope of the tangent line there. Doing this at every x produces a new function f′, the <b>derivative function</b>, and its graph is built from the slopes of the original.',
  'Differentiable means smooth: no corner, no cusp, no vertical tangent, no jump. A corner has two different one-sided slopes. A vertical tangent has an infinite slope. A discontinuity has no tangent at all. <b>Differentiable ⇒ continuous</b>, but not the other way: |x| is continuous at 0 and not differentiable there.'],
 ('the slope was a single number you got from two points','the slope at every x, as a function','this is the central object of Units 2–5','the derivative defined by a limit, and the idea of "differentiable"'),
 [('f′(x) = lim<sub>h→0</sub> [f(x+h) − f(x)] / h','definition'),('f′(a) = lim<sub>x→a</sub> [f(x) − f(a)] / (x − a)','same, one point'),('differentiable ⇒ continuous','not the converse')],
 [lab('dv-lab','Slope at every point',canvas='dv-canvas',aria='Top graph: the function with a tangent line at a draggable point. Bottom graph: the slope function, with a matching point.',
   seg=('dv-fn','Function',[('sq','x²'),('abs','|x|'),('cr','∛x'),('st','step')]),
   ctl=[('dv-x','Point x',-2.5,2.5,.05,1)],canvas2=('dv-canvas2','Graph of the derivative: the slope of the top graph at each x.'),
   out=[('dv-sl','slope from the left','x'),('dv-sr','slope from the right','a'),('dv-ok','differentiable here?','v')])],
 [('Choose <b>|x|</b> and slide x through 0. What does the slope graph do at 0? <button type="button" class="btn link" data-show=\'' + show(["click","#dv-fn [data-k=abs]"],["#dv-x",0]) + '\'>Set it up for me</button>','' ,'The left slope is −1 and the right slope is +1, so there is no single slope at 0: the derivative graph jumps. A corner is not differentiable.'),
  ('Choose <b>∛x</b> and move toward 0. What happens to the slope? <button type="button" class="btn link" data-show=\'' + show(["click","#dv-fn [data-k=cr]"],["#dv-x",0.1]) + '\'>Set it up for me</button>','' ,'The slope grows without bound as x → 0 (the tangent becomes vertical), so f′(0) does not exist even though the function is continuous.'),
  ('Choose x² and set x = 1. Compare the slope with 2x, then try x = 2.',show(["click","#dv-fn [data-k=sq]"],["#dv-x",1]),'At x = 1 the slope is 2; at x = 2 it is 4: the slope at each point is 2x, which is the derivative graph below (a straight line through the origin).'),
  ('Choose the step function and slide x to 0. Is it differentiable there?',show(["click","#dv-fn [data-k=st]"],["#dv-x",0]),'No: at x = 0 the graph jumps by 2 (from −1 up to 1), so there is no tangent at all. Everywhere else the pieces are lines of slope 1, so the derivative graph is the constant 1 with a gap at 0. Not continuous there, so not differentiable (differentiable ⇒ continuous).')],
 ('Use the definition to find f′(x) for f(x) = x².',[
  '<b>Write the quotient.</b> f′(x) = lim (f(x + h) − f(x))/h = lim ((x + h)² − x²)/h.',
  '<b>Expand.</b> (x + h)² − x² = 2xh + h².',
  '<b>Factor out h.</b> (2xh + h²)/h = 2x + h (for h ≠ 0).',
  '<b>Take the limit.</b> lim<sub>h→0</sub> (2x + h) = 2x.',
  '<b>Answer.</b> f′(x) = <b>2x</b>. At x = 3 the slope is 6.'],_dvf),
 ['Plugging h = 0 into the quotient before simplifying: it is 0/0.','Forgetting to expand (x + h)² as x² + 2xh + h².','Believing continuous means differentiable (|x| is the counterexample).','Writing f′(x) = limit "= 0" when the numerator goes to zero: the denominator goes to zero too.','Calling the derivative at a point a function. f′(a) is a number; f′(x) is a function.'],
 ('Notation',['f′(x), y′, dy/dx and d/dx[f(x)] all mean the same derivative. Leibniz\'s dy/dx reminds you it is a ratio of tiny changes (change in y over change in x). f′(a) means "evaluate the derivative function at x = a".']),
 [('Which function is continuous at 0 but not differentiable at 0?',['x²','|x|','x³','sin x'],1,'|x| has a corner at 0: the left slope is −1 and the right slope is 1.')])

mod('rules','Power, sum & constant-multiple rules',
 'You will not use the limit definition every time. A few rules let you differentiate polynomials, roots and reciprocals almost instantly.',
 ['<b>Power rule:</b> <span class="m">d/dx [x<sup>n</sup>] = n x<sup>n−1</sup></span>. Bring the exponent down in front and lower the exponent by one. It works for every real n: x³, √x = x<sup>1/2</sup>, and 1/x² = x<sup>−2</sup>.',
  '<b>Constants and sums:</b> constants multiply through, <span class="m">(c·f)′ = c·f′</span>, and sums differentiate term by term, <span class="m">(f + g)′ = f′ + g′</span>. The derivative of a constant is 0, because a flat line has slope 0. Rewrite roots and fractions as powers first.'],
 ('every derivative needed the limit definition','a shortcut for powers of x','polynomials, roots and reciprocals everywhere','the power, sum and constant-multiple rules'),
 [('d/dx [x<sup>n</sup>] = n x<sup>n−1</sup>','power rule'),('(c f)′ = c f′','constant multiple'),('(f ± g)′ = f′ ± g′','sum'),('d/dx [c] = 0','constant')],
 [lab('ru-lab','The power rule, checked',canvas='ru-canvas',aria='Graph of x to the n in blue, its derivative n x to the n minus 1 in green, and the tangent at a point.',
   ctl=[('ru-n','Exponent n',-2,4,.5,3),('ru-x','Point x',.3,2.5,.05,1.5)],
   out=[('ru-f','f(x) = xⁿ','x'),('ru-d','f′(x) = n·xⁿ⁻¹','v'),('ru-num','slope from the graph (numeric)','a')]),
  lab('ru-lab2','Build a polynomial, differentiate it',canvas='ru-canvas2',aria='A cubic polynomial with adjustable coefficients, its derivative, and the tangent at a point.',
   ctl=[('ru-a','a (x³ coefficient)',-2,2,.25,.5),('ru-b','b (x² coefficient)',-3,3,.5,-1),('ru-c','c (x coefficient)',-4,4,.5,-1),('ru-px','Point x',-3,3,.1,1)],
   pre='<p class="small" id="ru-eq" style="margin:0"></p>',out=[('ru-fx','f′(x) by the rules','v'),('ru-slope','f′ at the point','x')])],
 [('Set n = 2 and x = 1.5. What are the formula and the graph\'s slope? <button type="button" class="btn link" data-show=\'' + show(["#ru-n",2],["#ru-x",1.5]) + '\'>Set it up for me</button>','' ,'f′(x) = 2x, so the slope at 1.5 is 3. The numeric slope agrees: the rule is the shortcut for the limit.'),
  ('Set n = 0.5 (a square root). What is f′ at x = 1? <button type="button" class="btn link" data-show=\'' + show(["#ru-n",0.5],["#ru-x",1]) + '\'>Set it up for me</button>','' ,'f′(x) = ½x<sup>−1/2</sup> = 1/(2√x), so f′(1) = 0.5. The square root flattens as x grows.')],
 ('Differentiate f(x) = 4x³ − 6√x + 5/x² + 7.',[
  '<b>Rewrite as powers.</b> f(x) = 4x³ − 6x<sup>1/2</sup> + 5x<sup>−2</sup> + 7.',
  '<b>Differentiate each term.</b> 4·3x² = 12x²; −6·(1/2)x<sup>−1/2</sup> = −3x<sup>−1/2</sup>; 5·(−2)x<sup>−3</sup> = −10x<sup>−3</sup>; the constant 7 goes to 0.',
  '<b>Answer.</b> f′(x) = <b>12x² − 3x<sup>−1/2</sup> − 10x<sup>−3</sup></b>, or 12x² − 3/√x − 10/x³.']),
 ['Differentiating a constant as if it had an x: the derivative of 7 is 0, and of 7x is 7.','Forgetting to lower the exponent, writing (x³)′ = 3x³.','Applying the power rule to eˣ or 2ˣ. The variable is in the exponent there: a different rule.','Not rewriting 1/x² or √x as powers before differentiating.','Splitting a product or quotient term by term. (x²·x³)′ is not (x²)′·(x³)′.'],
 ('Why it works',['The derivative of x² is 2x (you saw it from the definition). For x³ expand (x + h)³ = x³ + 3x²h + 3xh² + h³, subtract x³, divide by h and let h → 0: 3x². The pattern n x<sup>n−1</sup> comes from the binomial expansion, and it holds for every real n.']),
 [('d/dx [3x⁴ − 2x + 9] =',['12x³ − 2','12x³ − 2x','3x³ − 2','12x³ − 2 + 9'],0,'4·3 = 12 on x³; the derivative of −2x is −2; the derivative of 9 is 0.')])

mod('transder','Trig, e^x and ln x derivatives',
 'Four functions to memorize once: the slopes of sine, cosine, e<sup>x</sup> and ln x.',
 ['Here is the pattern worth seeing. The slope of sin x is cos x: sine climbs fastest at 0 (slope 1 = cos 0) and is flat at its peaks (slope 0 = cos π/2). The slope of cos x is <b>−sin x</b>: cosine starts flat, then falls. The slope of e<sup>x</sup> is e<sup>x</sup>: the one function whose slope equals its height. The slope of ln x is <b>1/x</b>: steep near 0, flatter and flatter after.',
  'tan x, cot x, sec x and csc x follow from the quotient rule. The three with "co" in their names get minus signs. These derivatives need radians.'],
 ('we could differentiate only powers of x','memorized derivatives for the other basic functions','every model with oscillation or growth','the derivatives of trig, exponential and log functions'),
 [('(sin x)′ = cos x · (cos x)′ = −sin x','trig'),('(tan x)′ = sec²x','and sec, csc, cot below'),('(e<sup>x</sup>)′ = e<sup>x</sup> · (a<sup>x</sup>)′ = a<sup>x</sup> ln a','exponentials'),('(ln x)′ = 1/x','x &gt; 0')],
 [lab('td-lab','Guess the slope function',canvas='td-canvas',aria='Top graph: the chosen function with a tangent. Bottom graph: the slope function, which can be hidden.',
   seg=('td-fn','Function',[('sin','sin x'),('cos','cos x'),('exp','eˣ'),('ln','ln x'),('tan','tan x')]),
   pre='<label class="check"><input type="checkbox" id="td-show"> Show the slope function f′ (predict it first!)</label>',ctl=[('td-x','Point x',.2,3,.05,1)],canvas2=('td-canvas2','Graph of the derivative of the chosen function, hidden until you tick the box.'),
   out=[('td-sl','slope at x (numeric)','x'),('td-fx','f′(x) by formula','v'),('td-form','the rule','')])],
 [('Choose <b>sin x</b>, find where the tangent is flat, and predict f′ there. <button type="button" class="btn link" data-show=\'' + show(["click","#td-fn [data-k=sin]"],["#td-x",1.5708]) + '\'>x = π/2</button>','' ,'At the peak (x = π/2) the tangent is flat, so f′ = 0, and cos(π/2) = 0. The slope graph is the cosine curve.'),
  ('Choose <b>eˣ</b> and tick the box. What do you notice about the two graphs? <button type="button" class="btn link" data-show=\'' + show(["click","#td-fn [data-k=exp]"],["#td-show",True]) + '\'>Set it up for me</button>','' ,'They are identical. Wherever the curve has height h its slope is h too. That is what makes e special.')],
 ('Differentiate f(x) = 3 sin x − 2e<sup>x</sup> + 5 ln x, and find f′(1).',[
  '<b>Term by term.</b> (3 sin x)′ = 3 cos x; (−2e<sup>x</sup>)′ = −2e<sup>x</sup>; (5 ln x)′ = 5/x.',
  '<b>Combine.</b> f′(x) = 3 cos x − 2e<sup>x</sup> + 5/x.',
  '<b>Evaluate at 1.</b> 3 cos 1 − 2e + 5 = 3(0.5403) − 2(2.7183) + 5 = 1.6209 − 5.4366 + 5 ≈ <b>1.184</b> (radians).']),
 ['Writing (cos x)′ = sin x. The sign is minus: −sin x.','Using degrees on the calculator. The rules assume radians.','Writing (e<sup>x</sup>)′ = x e<sup>x−1</sup>. The power rule needs the variable in the base.','Writing (ln x)′ = ln x or x. It is 1/x.','Forgetting (a<sup>x</sup>)′ = a<sup>x</sup> ln a for other bases.'],
 ('The other trig derivatives',['(tan x)′ = sec²x, (cot x)′ = −csc²x, (sec x)′ = sec x tan x, (csc x)′ = −csc x cot x. You can get all of them from the quotient rule on sin and cos, but they are common enough to memorize.']),
 [('(cos x)′ =',['−sin x','sin x','−cos x','1/x'],0,'Cosine falls from 1 at the start, so its slope is negative: −sin x.')])

mod('prodquot','Product & quotient rules',
 'The derivative of a product is not the product of the derivatives. Here is what it is, and why the naive answer fails.',
 ['If f = u·v, change in f has two parts: u changes while v stays, and v changes while u stays. That gives <span class="m">(uv)′ = u′v + uv′</span>: "derivative of the first times the second, plus the first times the derivative of the second". For a quotient, <span class="m">(u/v)′ = (u′v − uv′)/v²</span>: low d-high minus high d-low over low squared.',
  'You can check that (uv)′ ≠ u′v′ with any example: for u = v = x, uv = x² has derivative 2x, but u′v′ = 1. Watch the lab: the naive answer drifts away from the true slope.'],
 ('we differentiated one term at a time','a rule for products and for quotients','functions like x² sin x and (x + 1)/(x − 2)','the product and quotient rules'),
 [('(uv)′ = u′v + uv′','product'),('(u/v)′ = (u′v − uv′) / v²','quotient'),('(uv)′ ≠ u′v′','the common error')],
 [lab('pq-lab','True derivative vs the tempting wrong one',canvas='pq-canvas',aria='Graph of the function in blue, the correct derivative in green and the incorrect product of derivatives in orange dashed.',
   seg=('pq-fn','Function',[('a','x²·sin x'),('b','x·eˣ'),('c','sin x / x'),('d','(x²+1)/(x−1)')]),pre='<p class="small" id="pq-form" style="margin:0"></p>',
   ctl=[('pq-x','Point x',.3,3,.05,1.5)],out=[('pq-ok','correct rule','v'),('pq-num','slope from the graph (numeric)','x'),('pq-bad','naive u′·v′ (or u′/v′)','a')])],
 [('Choose <b>x·eˣ</b> at x = 1.5. Compare the three numbers. <button type="button" class="btn link" data-show=\'' + show(["click","#pq-fn [data-k=b]"],["#pq-x",1.5]) + '\'>Set it up for me</button>','' ,'The product rule matches the numeric slope (about 11.2); the naive u′v′ gives e<sup>1.5</sup> ≈ 4.48. Only the product rule is right.'),
  ('Choose the quotient <b>sin x / x</b> and compare. <button type="button" class="btn link" data-show=\'' + show(["click","#pq-fn [data-k=c]"],["#pq-x",2]) + '\'>Set it up for me</button>','' ,'(x cos x − sin x)/x² agrees with the numeric slope. Dividing the derivatives (cos x / 1) does not.')],
 ('Differentiate f(x) = x² eˣ and g(x) = (x + 1)/(x − 2).',[
  '<b>Product rule on f.</b> u = x², v = eˣ, so u′ = 2x, v′ = eˣ. f′ = 2x·eˣ + x²·eˣ = eˣ(x² + 2x).',
  '<b>Quotient rule on g.</b> u = x + 1, v = x − 2, so u′ = 1, v′ = 1. g′ = (1·(x − 2) − (x + 1)·1)/(x − 2)².',
  '<b>Simplify the top.</b> (x − 2) − (x + 1) = −3.',
  '<b>Answer.</b> f′(x) = <b>eˣ(x² + 2x)</b> and g′(x) = <b>−3/(x − 2)²</b>.']),
 ['Writing (uv)′ = u′v′. It misses half of the change.','Getting the quotient numerator in the wrong order: it is u′v − uv′ (low d-high minus high d-low).','Forgetting to square the denominator.','Using the quotient rule when the denominator is a constant. Just pull the constant out.','Not simplifying: factor and cancel if you can.'],
 ('Why the product rule has two terms',['A rectangle with sides u and v has area uv. If both sides grow, the area gains a strip along each side: u′v from stretching one side and uv′ from stretching the other. The tiny corner u′v′ is second order and vanishes in the limit.']),
 [('d/dx [x sin x] =',['sin x + x cos x','cos x','x cos x','sin x + cos x'],0,'(x)′ sin x + x (sin x)′ = sin x + x cos x.')])
