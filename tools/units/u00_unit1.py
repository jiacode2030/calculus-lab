# ---- figures for Algebraic limits, Continuity, Infinite limits, The derivative
_hole = lambda P, x, y, c='f': circ(P.X(x), P.Y(y), 5, 'surf', 1, c, 2)
def _clipcurve(P, f, a, b, lo, hi, c='f', w=2.6, k=400):
    segs, cur = [], []
    for i in range(k + 1):
        x = a + (b - a) * i / k
        try: y = f(x)
        except ZeroDivisionError: y = None
        if y is not None and lo <= y <= hi: cur.append((P.X(x), P.Y(y)))
        elif cur: segs.append(cur); cur = []
    if cur: segs.append(cur)
    return ''.join(pline(s, c, w) for s in segs if len(s) > 1)

_LA = Plot((-1, 4.6), (-.6, 5.8), (30, 12, 215, 196))
_laf = fig(_LA.axes((1, 2, 3, 4), (1, 3, 5), 'x', 'y') + _LA.curve(lambda x: x + 1, -.5, 4.3), [
    (1, _LA.dot(2, 0, '0/0', 'tan', 0, -10, 4), 'plugging in x = 2 gives 0/0', 'tan'),
    (2, _LA.text(-.9, 5.3, '(x − 2)(x + 1)', 'd', 11, 'start') if False else '', 'x² − x − 2 = (x − 2)(x + 1)', 'd'),
    (3, _LA.curve(lambda x: x + 1, -.5, 4.3, 'tan', 1.8, '6 5') + _LA.text(3.9, 5.15, 'y = x + 1', 'tan', 11, 'end'), 'cancel: the graph is y = x + 1', 'tan'),
    (4, _LA.seg(-1, 3, 2, 3, 'mut', 1.2, '4 4') + _LA.seg(2, 3, 2, 0, 'mut', 1.2, '4 4') + _hole(_LA, 2, 3) + _LA.text(-.7, 3.3, '3', 'ink', 12), 'the hole at (2, 3): the limit is 3', 'ink'),
    (5, '', 'limit 3, but f(2) is undefined', 'ink')],
    'The original function is the line y = x + 1 with a single hole at x = 2; the limit is the height of that hole.', 230)

_CT = Plot((-1, 3.2), (-1.6, 5.4), (30, 12, 215, 196))
_ctf = fig(_CT.axes((1, 2, 3), (1, 3, 5), 'x', 'y') + _CT.curve(lambda x: x * x, -1, 1, 'f') + _CT.dot(1, 1, '1', 'f', -12, -6, 4), [
    (1, _CT.text(-.7, 1.9, 'x²', 'f', 12), 'left: f(1) = 1', 'f'),
    (2, _CT.curve(lambda x: x + 2, 1, 3, 'tan', 1.8, '6 5') + _hole(_CT, 1, 3, 'tan') + _CT.text(1.2, 4.9, 'k = 1: y = x + 2', 'tan', 10, 'start'), 'right limit = k + 2 (k = 1 jumps to 3)', 'tan'),
    (3, '', 'need k + 2 = 1', 'ink'),
    (4, _CT.curve(lambda x: 2 - x, 1, 3, 'd', 2.8) + _CT.text(3.0, -1.35, 'k = −1', 'd', 11, 'end'), 'k = −1: the pieces connect', 'd')],
    'Dashed: a wrong k (a jump). Solid green: k = −1, where the right piece starts exactly at the height 1 where the left piece ends.', 230)

_asf = lambda x: (3 * x * x - 3) / (x * x - 4)
_AS = Plot((-6.4, 6.4), (-8, 10), (30, 12, 215, 196))
_asyf = fig(_AS.axes((-4, -2, 2, 4), (3, 6), 'x', 'y') + ''.join(_clipcurve(_AS, _asf, a, b, -8, 10) for a, b in ((-6.4, -2.02), (-1.98, 1.98), (2.02, 6.4))), [
    (1, _AS.seg(-2, -8, -2, 10, 'tan', 1.8, '6 5') + _AS.seg(2, -8, 2, 10, 'tan', 1.8, '6 5'), 'vertical asymptotes x = ±2', 'tan'),
    (2, _AS.seg(-6.4, 3, 6.4, 3, 'tan', 1.8, '6 5') + _AS.text(5.9, 3.9, 'y = 3', 'tan', 11, 'end'), 'horizontal asymptote y = 3', 'tan'),
    (3, arr(_AS.X(5.0), _AS.Y(3.35), _AS.X(6.3), _AS.Y(3.1), 'f') + arr(_AS.X(-5.0), _AS.Y(3.35), _AS.X(-6.3), _AS.Y(3.1), 'f'), 'both ends level off at 3', 'f'),
    (4, '', 'x = ±2 and y = 3', 'ink')],
    'The graph blows up at x = ±2 (top 9, bottom 0) and levels off at y = 3 at both ends.', 230)

mod('limalg','Algebraic limits',
 'When plugging in gives 0/0, the function is hiding something. Algebra rewrites it into a form that does not hide it.',
 ['Direct substitution works whenever the function is continuous at <span class="m">a</span>: just evaluate. The trouble is the form <span class="m">0/0</span>, which is not a number but a clue: the top and bottom share a factor that is going to zero. Remove the shared factor and what is left can be evaluated.',
  'Three moves cover almost everything. <b>Factor and cancel</b> (polynomials). <b>Multiply by the conjugate</b> (square roots). <b>Combine fractions</b> (a fraction inside a fraction). When a function is trapped between two others that share a limit, the <b>squeeze</b> theorem gives the answer.'],
 ('a limit was something you read off a table or graph','algebra','most limits on the exam come as formulas, not pictures','a way to simplify the formula until the limit is just substitution'),
 [('lim f = f(a)','if f is continuous at a'),('0/0','factor, rationalize or combine'),('g ≤ f ≤ h','and lim g = lim h = L ⇒ lim f = L')],
 [lab('la-lab','Same graph, simpler formula',canvas='la-canvas',aria='Graph of the original function with a hole, and the simplified function drawn dashed on top.',
   seg=('la-fn','Case',[('fac','Factor'),('rat','Conjugate'),('frc','Fractions'),('sq','Squeeze')]),pre='<p class="small" id="la-formula" style="margin:0"></p>',
   out=[('la-plug','plugging in gives','x'),('la-simp','after algebra','a'),('la-lim','the limit','v')],post='<div class="xpsteps"><div><b>The algebra</b><span id="la-alg">—</span></div></div>')],
 [('Choose <b>Factor</b>. The orange dashed line is the simplified formula. Where do the two graphs differ? <button type="button" class="btn link" data-show=\'' + show(["click","#la-fn [data-k=fac]"]) + '\'>Set it up for me</button>','' ,'Only at x = 3, where the original has a hole. Everywhere else they are the same graph, so they approach the same height: the simplified formula gives the limit.'),
  ('Choose <b>Squeeze</b>. Why can\'t you just plug in x = 0? <button type="button" class="btn link" data-show=\'' + show(["click","#la-fn [data-k=sq]"]) + '\'>Set it up for me</button>','' ,'sin(1/0) is meaningless. But sin is always between −1 and 1, so x²·sin(1/x) is trapped between −x² and x². Both bounds go to 0, so the function is squeezed to 0.'),
  ('Choose <b>Conjugate</b>. What happens if you plug in x = 0, and what does the dashed formula give?',show(["click","#la-fn [data-k=rat]"]),'Plugging in gives 0/0. Multiplying top and bottom by √(x + 4) + 2 leaves 1/(√(x + 4) + 2), which is 1/4 at x = 0. Check: at x = 0.1 the original is (√4.1 − 2)/0.1 ≈ 0.2485, already close to 0.25.'),
  ('Choose <b>Fractions</b>. Why is the limit negative?',show(["click","#la-fn [data-k=frc]"]),'Combining 1/x − 1/3 = (3 − x)/(3x) gives (3 − x)/(3x(x − 3)) = −1/(3x) once the factor is cancelled. At x = 3 that is −1/9 ≈ −0.111: the numerator 3 − x is the opposite sign of the denominator x − 3.')],
 ('Find lim<sub>x→2</sub> (x² − x − 2)/(x − 2).',[
  '<b>Plug in.</b> 4 − 2 − 2 = 0 on top and 2 − 2 = 0 on the bottom: the form 0/0, so keep working.',
  '<b>Factor the top.</b> x² − x − 2 = (x − 2)(x + 1).',
  '<b>Cancel the common factor.</b> For x ≠ 2, (x − 2)(x + 1)/(x − 2) = x + 1. The limit only looks at x ≠ 2, so this is allowed.',
  '<b>Substitute.</b> lim<sub>x→2</sub> (x + 1) = 3.',
  '<b>Answer.</b> The limit is <b>3</b>. The original has a hole at (2, 3).'],_laf),
 ['Cancelling a factor that does not go to 0: only cancel the factor that is the cause of 0/0.','Stopping at 0/0 and writing "the limit does not exist". 0/0 means "do more work".','Multiplying only the top by the conjugate. Multiply top and bottom by the same thing.','Using the squeeze theorem with bounds that do not have the same limit.','Writing "= 3" after the first step. Keep "lim" until you substitute.'],
 ('Why algebra is allowed',['Two functions that agree everywhere except at <span class="m">a</span> have the same limit at <span class="m">a</span>, because a limit never looks at <span class="m">x = a</span> itself. That is why cancelling (x − 2)/(x − 2) is legal in a limit, even though 0/0 at x = 2 is not defined.']),
 [('which move turns (√(x + 9) − 3)/x into something you can evaluate at 0?',['Factor the top','Multiply top and bottom by √(x + 9) + 3','Plug in 0 and divide','Use the squeeze theorem'],1,'The square root is the problem; multiplying by the conjugate gives x/(x(√(x+9)+3)), then cancel x. The limit is 1/6.')])

mod('contin','Continuity & the IVT',
 'A function is continuous if you can draw it without lifting your pencil. Calculus needs a sharper test, and one big consequence: continuous functions cannot skip values.',
 ['Continuity at a point means three things hold: <b>f(a) exists</b>, <b>the limit as x → a exists</b>, and <b>they are equal</b>. A hole, a jump or a blow-up each breaks one of the three. Continuous on an interval means continuous at every point of it.',
  'If a function is continuous on <span class="m">[a, b]</span> it cannot skip over any value between <span class="m">f(a)</span> and <span class="m">f(b)</span>. That is the <b>Intermediate Value Theorem</b>. It is why you can say a root exists in an interval without finding it.'],
 ('a graph was just a picture you could sketch','a precise test for "no breaks"','continuity underpins differentiation and integration theorems','continuity defined with limits, and the IVT'),
 [('lim<sub>x→a</sub> f(x) = f(a)','continuous at a'),('f(c) = N','IVT: some c in (a, b) for any N between f(a) and f(b)'),('removable · jump · infinite','types of discontinuity')],
 [lab('ct-lab','Make it continuous',canvas='ct-canvas',aria='Graph of a piecewise function with a slider-controlled slope on the right piece.',
   ctl=[('ct-k','k',-1,5,.25,1)],pre='<p class="small" style="margin:0">f(x) = x + 1 for x &lt; 2 and f(x) = kx − 3 for x ≥ 2. Slide k until the graph has no break.</p>',
   out=[('ct-defd','1. f(2) is defined','x'),('ct-lim','2. the limit exists','a'),('ct-eq','3. limit = f(2)','v'),('ct-verdict','verdict','')]),
  lab('ct-lab2','The Intermediate Value Theorem',canvas='ct-canvas2',aria='A graph on [0, 3] with a horizontal line at a chosen height; the crossing is marked, or not found if the function jumps.',
   ctl=[('ct-c','height N',-2,7,.1,3)],pre='<label class="check"><input type="checkbox" id="ct-brk"> Break the function (add a jump at x = 1.5)</label>',
   out=[('ct-ivt','where f(x) = N','x'),('ct-ivt2','what this shows','')])],
 [('Slide k to 3. What changes in the three-part checklist? <button type="button" class="btn link" data-show=\'' + show(["#ct-k",3]) + '\'>k = 3</button>','' ,'At k = 3 the right piece starts at 3·2 − 3 = 3, exactly where the left piece is heading (2 + 1 = 3). All three conditions pass: f(2) = 3, the limit is 3, and they match.'),
  ('Tick <b>Break the function</b> and set N = 2. Does any x give f(x) = 2? <button type="button" class="btn link" data-show=\'' + show(["#ct-brk",True],["#ct-c",2]) + '\'>Set it up for me</button>','' ,'No. The jump skips from height 0.25 to 3.25, so heights in between are never reached. The IVT does not apply because the function is not continuous.'),
  ('Slide k to 1. How big is the jump?',show(["#ct-k",1]),'The left piece heads to 3, but at k = 1 the right piece starts at 2(1) − 3 = −1. The jump is 3 − (−1) = 4, and the verdict says discontinuous. Only k = 3 repairs it.'),
  ('Leave the function unbroken and set N = 3. Where does f(x) = 3, and why is it guaranteed?',show(["#ct-brk",False],["#ct-c",3]),'x² − 2 = 3 gives x = √5 ≈ 2.236. The function is continuous on [0, 3] with f(0) = −2 and f(3) = 7, and 3 is between them, so the IVT promises a solution.'),
  ('Tick Break the function and set N = 0. Is a crossing still found? Why does the break not matter here?',show(["#ct-brk",True],["#ct-c",0]),'Yes: x = √2 ≈ 1.414, which is left of the jump at 1.5. The break only hides the heights between 0.25 and 3.25. The IVT does not apply, but a crossing can still exist.')],
 ('Find k so that f(x) = x² for x ≤ 1 and f(x) = kx + 2 for x &gt; 1 is continuous at x = 1.',[
  '<b>Left piece at 1.</b> f(1) = 1² = 1, and the left limit is also 1.',
  '<b>Right limit.</b> As x → 1⁺ the function is kx + 2, so the right limit is k + 2.',
  '<b>Match.</b> Continuity needs left = right = f(1): k + 2 = 1.',
  '<b>Solve.</b> k = <b>−1</b>.'],_ctf),
 ['Checking only that the limit exists and forgetting f(a) must be defined and equal to it.','Calling a hole a "jump". A hole (removable) has matching sides; a jump does not.','Using the IVT without checking the function is continuous on the whole closed interval.','Thinking the IVT finds the number: it only guarantees one exists.','Assuming "continuous" means "differentiable". A corner is continuous but not differentiable (Unit 2).'],
 ('Types of discontinuity',['<b>Removable</b>: the limit exists but f(a) is missing or different. <b>Jump</b>: the one-sided limits are different numbers. <b>Infinite</b>: the function blows up (a vertical asymptote). <b>Oscillating</b>: the function swings forever. A removable discontinuity can be "repaired" by redefining f(a) as the limit.']),
 [('f is continuous on [1, 4] with f(1) = −2 and f(4) = 5. Which value must f take somewhere in [1, 4]?',['6','0','−3','8'],1,'0 lies between −2 and 5, so the IVT guarantees it. The others are outside the interval from −2 to 5.')])

mod('asym','Infinite limits & end behavior',
 'What happens when the function blows up near a point, or when x gets enormous? Both questions give asymptotes.',
 ['A <b>vertical asymptote</b> at <span class="m">x = a</span> means the function grows without bound as x → a: <span class="m">lim f(x) = ±∞</span> from at least one side. In a fraction it happens where the bottom is 0 but the top is not. The limit "= ∞" is shorthand: it technically does not exist, but we say <i>how</i> it fails.',
  'A <b>horizontal asymptote</b> comes from limits at infinity: <span class="m">lim<sub>x→∞</sub> f(x) = L</span>. For a ratio of polynomials compare the leading terms: a lower-degree top gives 0, equal degrees give the ratio of leading coefficients, a higher-degree top gives ±∞ (no horizontal asymptote).'],
 ('limits were finite numbers at finite points','a language for "grows without bound" and "as x gets huge"','rational functions near their zeros and far from the origin','infinite limits and limits at infinity'),
 [('lim<sub>x→a</sub> f(x) = ±∞','vertical asymptote x = a'),('lim<sub>x→±∞</sub> f(x) = L','horizontal asymptote y = L'),('deg top vs deg bottom','compare leading terms')],
 [lab('ay-lab','Zoom out to see the end behavior',canvas='ay-canvas',aria='Graph of a rational function with its asymptotes drawn dashed; slider widens the x window.',
   seg=('ay-fn','Function',[('lt','top lower degree'),('eq','equal degrees'),('gt','top higher degree'),('sin','sin x / x')]),pre='<p class="small" id="ay-formula" style="margin:0"></p>',
   ctl=[('ay-w','Window half-width',0.7,3,.05,1)],out=[('ay-fx','f at the right edge','x'),('ay-inf','as x → ±∞','a'),('ay-vert','vertical asymptotes','v')])],
 [('Choose <b>equal degrees</b> and zoom out. What height does the graph flatten to? <button type="button" class="btn link" data-show=\'' + show(["click","#ay-fn [data-k=eq]"],["#ay-w",3]) + '\'>Set it up for me</button>','' ,'Toward 2, the ratio of leading coefficients (2x² over x²). The two vertical asymptotes at x = ±1 stay put while the ends level off.'),
  ('Choose <b>top higher degree</b> and zoom out. Does it level off? <button type="button" class="btn link" data-show=\'' + show(["click","#ay-fn [data-k=gt]"],["#ay-w",3]) + '\'>Set it up for me</button>','' ,'No. It keeps growing, like the line y = x. A higher-degree top means no horizontal asymptote: the limit at infinity is ±∞.'),
  ('Choose <b>sin x / x</b> and zoom out. The ends go to 0. Does the graph ever touch y = 0?',show(["click","#ay-fn [data-k=sin]"],["#ay-w",3]),'Yes, again and again: sin x / x = 0 at x = π, 2π, 3π, … while the waves shrink toward 0. A graph may cross its horizontal asymptote; the asymptote only describes where the far ends go.'),
  ('Choose <b>top lower degree</b> and zoom out. Which height do the ends approach?',show(["click","#ay-fn [data-k=lt]"],["#ay-w",3]),'0: (3x + 1)/(x² − 4) has the higher degree on the bottom, so the bottom wins. The vertical asymptotes x = ±2 stay put.')],
 ('Find the asymptotes of f(x) = (3x² − 3)/(x² − 4).',[
  '<b>Vertical.</b> The bottom is 0 at x = ±2. The top at x = ±2 is 9, not 0, so both are vertical asymptotes.',
  '<b>Horizontal.</b> The degrees match (2 and 2): divide the leading coefficients, 3/1 = 3.',
  '<b>Check the limit.</b> lim<sub>x→∞</sub> (3 − 3/x²)/(1 − 4/x²) = 3/1 = 3. The same value at −∞.',
  '<b>Answer.</b> Vertical: x = 2 and x = −2. Horizontal: y = <b>3</b>.'],_asyf),
 ['Calling every zero of the bottom a vertical asymptote. If the factor also cancels with the top, it is a hole.','Writing lim = ∞ as if ∞ were a number you can substitute.','Using only the leading coefficient of the top for the horizontal asymptote.','Forgetting the limit at −∞ can differ from +∞ (for example, e<sup>x</sup> or an odd-degree ratio).','Thinking a graph cannot cross its horizontal asymptote. It can, near the origin; the asymptote describes the far ends.'],
 ('Reading the sign',['To get the sign of an infinite limit, check which side you approach from. Near x = 2, 1/(x − 2) is large positive from the right (positive denominator) and large negative from the left, so lim<sub>x→2⁺</sub> = ∞ and lim<sub>x→2⁻</sub> = −∞, and the two-sided limit does not exist.']),
 [('lim<sub>x→∞</sub> (5x + 1)/(2x² + 7) =',['0','5/2','∞','1/7'],0,'The bottom has the higher degree, so it wins and the ratio goes to 0.')])

mod('functions','Functions & transformations',
 'Before derivatives: how to read a formula as a graph. Shift, stretch and flip a parent function and see exactly what each number does.',
 ['Every graph in calculus is a familiar parent function that has been moved. <span class="m">y = a·f(b(x − h)) + k</span> says: shift right by <b>h</b>, shift up by <b>k</b>, stretch vertically by <b>a</b> (flip if negative) and squeeze horizontally by <b>b</b>. Changes <i>inside</i> the parentheses act on x and act backwards (x − h moves right); changes <i>outside</i> act on y and do what they say.',
  'Functions can also be composed, <span class="m">f(g(x))</span> (do g first), and many have inverses that reflect the graph over the line y = x. Composition is what the chain rule differentiates.'],
 ('you read each graph as its own formula','a way to see families of graphs at once','derivatives of shifted and stretched functions come straight from the parent','a transformation toolkit and composition'),
 [('y = a·f(b(x − h)) + k','general transformation'),('(f∘g)(x) = f(g(x))','composition: g first'),('f(f⁻¹(x)) = x','inverse')],
 [lab('fn-lab','Move the parent function',canvas='fn-canvas',aria='Graph of a parent function (faint) and its transformed version (solid).',
   seg=('fn-base','Parent',[('sq','x²'),('abs','|x|'),('rt','√x'),('sin','sin x')]),
   ctl=[('fn-a','a (vertical stretch / flip)',-3,3,.25,1),('fn-b','b (horizontal squeeze)',.25,3,.25,1),('fn-h','h (right)',-4,4,.5,0),('fn-k','k (up)',-4,4,.5,0)],
   pre='<p class="small" id="fn-eq" style="margin:0"></p>',out=[('fn-ho','key point moves from','x'),('fn-hn','to','a')])],
 [('Set h = 2 and k = 1 on x². Where is the vertex? <button type="button" class="btn link" data-show=\'' + show(["click","#fn-base [data-k=sq]"],["#fn-h",2],["#fn-k",1]) + '\'>Set it up for me</button>','' ,'At (2, 1): right 2 because of (x − 2), up 1 because of + 1.'),
  ('Set a = −1 on x². What happens? <button type="button" class="btn link" data-show=\'' + show(["click","#fn-base [data-k=sq]"],["#fn-a",-1]) + '\'>Set it up for me</button>','' ,'The parabola flips upside down: a negative a reflects the graph across the x-axis.')],
 ('If f(x) = x² + 1 and g(x) = 2x − 3, find f(g(2)) and g(f(2)).',[
  '<b>Inside first.</b> For f(g(2)) work out g(2) = 2·2 − 3 = 1.',
  '<b>Then f.</b> f(1) = 1² + 1 = 2.',
  '<b>Now the other order.</b> f(2) = 4 + 1 = 5, then g(5) = 10 − 3 = 7.',
  '<b>Answer.</b> f(g(2)) = <b>2</b> and g(f(2)) = <b>7</b>. Composition is not commutative.']),
 ['Moving the wrong way: (x + 2) shifts the graph left, not right.','Applying h before the stretch b when b is inside: in y = f(b(x − h)) the shift is h, not h/b.','Mixing up f(g(x)) and g(f(x)).','Treating f<sup>−1</sup>(x) as 1/f(x). It is the inverse function, not the reciprocal.'],
 ('Even, odd and inverses',['Even functions satisfy f(−x) = f(x) (mirror in the y-axis, like x²). Odd functions satisfy f(−x) = −f(x) (turn 180° about the origin, like x³ and sin x). A function has an inverse only if it passes the horizontal line test; the inverse graph is the reflection over y = x.']),
 [('The graph of y = (x − 3)² + 2 is the graph of y = x² moved:',['left 3, up 2','right 3, up 2','right 3, down 2','left 3, down 2'],1,'Inside shifts act backwards: x − 3 moves right 3; + 2 outside moves up 2.')])

mod('trigexp','Trig, exponentials & logs',
 'Sine, cosine, e<sup>x</sup> and ln x: four functions you will differentiate and integrate constantly. Here is what each one looks like and why.',
 ['On the unit circle, the point at angle <span class="m">θ</span> (measured in radians from the positive x-axis) is <span class="m">(cos θ, sin θ)</span>. That one picture gives you the graphs of sine and cosine, their values at the special angles, and the identity <span class="m">sin²θ + cos²θ = 1</span>. Calculus uses radians because then the arc length equals the angle.',
  'An <b>exponential</b> <span class="m">b<sup>x</sup></span> multiplies by b for every step in x. The special base <b>e ≈ 2.718</b> is the one whose slope equals its height at every point. Its inverse is the <b>natural log</b> <span class="m">ln x</span>: <span class="m">ln(e<sup>x</sup>) = x</span> and <span class="m">e<sup>ln x</sup> = x</span>.'],
 ('angles were degrees and growth was a table','radians, and one special exponential base','the derivative of sin x is only cos x in radians, and e<sup>x</sup> is its own derivative','the unit circle in radians, and e and ln'),
 [('(cos θ, sin θ)','point on the unit circle'),('sin²θ + cos²θ = 1','identity'),('ln(ab) = ln a + ln b · ln(a<sup>n</sup>) = n ln a','log rules'),('e<sup>ln x</sup> = x · ln e<sup>x</sup> = x','inverses')],
 [lab('te-lab','The unit circle',canvas='te-canvas',aria='Unit circle with a point at the chosen angle, and its sine and cosine drawn as segments.',
   ctl=[('te-ang','Angle θ (radians)',0,6.2832,.0524,.7854)],out=[('te-sin','sin θ (blue)','x'),('te-cos','cos θ (green)','v'),('te-tan','tan θ = sin θ / cos θ',''),('te-deg','in degrees','')]),
  lab('te-lab2','e and ln are inverses',canvas='te-canvas2',aria='Graphs of b to the x, its inverse log, and the line y = x.',
   ctl=[('te-base','Base b',1.2,6,.05,2.718)],out=[('te-slope','slope of b^x at x = 0','x'),('te-ln','ln b','a')])],
 [('Set θ = π/4 (about 0.785). What are sine and cosine? <button type="button" class="btn link" data-show=\'' + show(["#te-ang",0.7854]) + '\'>Set it up for me</button>','' ,'Both are √2/2 ≈ 0.707: at 45° the point sits on the diagonal, so its x and y coordinates are equal.'),
  ('Slide the base b to e (2.718). What is the slope of b<sup>x</sup> at x = 0? <button type="button" class="btn link" data-show=\'' + show(["#te-base",2.718]) + '\'>Set it up for me</button>','' ,'1. For other bases the slope at 0 is ln b: below 1 for b &lt; e, above 1 for b &gt; e. Only e makes the slope exactly equal to the height (1) at x = 0.')],
 ('Solve e<sup>2x</sup> = 7 for x.',[
  '<b>Undo e with ln.</b> Take the natural log of both sides: ln(e<sup>2x</sup>) = ln 7.',
  '<b>Simplify.</b> ln(e<sup>2x</sup>) = 2x, so 2x = ln 7.',
  '<b>Solve.</b> x = (ln 7)/2.',
  '<b>Answer.</b> x ≈ <b>0.973</b>. Check: e<sup>1.946</sup> ≈ 7.']),
 ['Using degrees in calculus formulas. Set your calculator to radians.','Writing ln(a + b) = ln a + ln b. The rule is for products: ln(ab) = ln a + ln b.','Forgetting ln x is only defined for x &gt; 0.','Thinking e<sup>x</sup> can be zero or negative: it is always positive.','Mixing up sin²θ with sin(θ²).'],
 ('The special angles',['Memorize the first-quadrant values: sin 0 = 0, sin π/6 = 1/2, sin π/4 = √2/2, sin π/3 = √3/2, sin π/2 = 1, and cosine runs the other way (1, √3/2, √2/2, 1/2, 0). The signs in the other quadrants follow from which coordinate is negative.']),
 [('ln(e<sup>5</sup>) =',['5','e<sup>5</sup>','1/5','ln 5'],0,'ln undoes e to a power: ln(e^5) = 5.')])
