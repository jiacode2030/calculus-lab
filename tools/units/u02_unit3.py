# ---- figures for the chain rule and implicit differentiation
import math
_CHL = Plot((-.2, 2.1), (-.4, 4.6), (28, 26, 98, 150))
_CHR = Plot((-.2, 4.2), (-1.3, 1.3), (150, 26, 100, 150))
_chfig = fig(_CHL.axes((1, 2), (1, 2, 3, 4), 'x', 'u') + _CHL.curve(lambda x: x * x, 0, 2.05) + _CHR.axes((1, 2, 3, 4), (-1, 1), 'u', 'y') + _CHR.curve(math.sin, 0, 4.1)
             + txt(77, 16, 'inner: u = x²', 'ink', 10) + txt(200, 16, 'outer: sin u', 'ink', 10) + _CHL.dot(1, 1, '', 'ink', 0, 0, 4) + _CHR.dot(1, math.sin(1), '', 'ink', 0, 0, 4), [
    (1, ln(_CHL.X(1), _CHL.Y(1), _CHR.X(1), _CHR.Y(math.sin(1)), 'mut', 1.2, '4 4'), 'x = 1 gives u = 1', 'ink'),
    (2, _CHR.seg(.1, math.sin(1) - .9 * math.cos(1), 2.2, math.sin(1) + 1.2 * math.cos(1), 'tan', 2.4) + txt(205, 196, 'slope cos 1 ≈ 0.540', 'tan', 10), 'outer rate cos(1) ≈ 0.540', 'tan'),
    (3, _CHL.seg(.4, 1 - .6 * 2, 1.45, 1 + .45 * 2, 'tan', 2.4) + txt(77, 196, 'slope 2x = 2', 'tan', 10), 'inner rate 2x = 2 at x = 1', 'tan'),
    (4, txt(130, 222, 'f′(1) = 0.540 × 2 ≈ 1.081', 'ink', 13), "f′(1) = cos(1)·2 ≈ 1.081", 'd')],
    'The inner function turns x into u; the outer function turns u into y. The two slopes at the matching points multiply.', 235)

_IM = Plot((-6.6, 6.6), (-6.6, 6.6), (30, 8, 200, 200))
_imfig = fig(_IM.axes((-5, 5), (-5, 5), 'x', 'y') + pline([(_IM.X(5 * math.cos(t / 60 * 2 * math.pi)), _IM.Y(5 * math.sin(t / 60 * 2 * math.pi))) for t in range(61)], 'f', 2.8), [
    (1, txt(45, 24, 'x² + y² = 25', 'f', 11, 'start'), '2x + 2y·y′ = 0', 'f'),
    (2, _IM.seg(0, 0, 3, 4, 'mut', 1.4, '4 4') + _IM.seg(.3, 4 + .75 * 2.7, 6.1, 4 - .75 * 3.1, 'tan', 2.6) + _IM.dot(3, 4, '(3, 4)', 'ink', -10, -10, 4.5) + txt(172, 124, 'slope −3/4', 'tan', 10, 'start'), 'y′ = −x/y = −3/4 at (3, 4)', 'tan'),
    (3, '', 'next curve: x²y + y³ = 10', 'ink'),
    (4, '', '2xy + x²y′ + 3y²y′ = 0', 'ink'),
    (5, '', "y′ = −2xy / (x² + 3y²)", 'd')],
    'The tangent at (3, 4) is perpendicular to the radius: the radius has slope 4/3 and the tangent −3/4, which is the −x/y the rule gives.', 235)

mod('chain','The chain rule',
 'When one function sits inside another, rates multiply: the speed of the outer function times the speed of the inner one.',
 ['Picture a chain of gears. If gear A turns 3 times as fast as gear B, and gear B turns twice as fast as gear C, then A turns 3 × 2 = 6 times as fast as C. A composite function <span class="m">y = f(g(x))</span> works the same way: as x changes, <span class="m">u = g(x)</span> changes at rate g′(x), and y changes with u at rate f′(u). Multiply them.',
  'So <span class="m">d/dx f(g(x)) = f′(g(x)) · g′(x)</span>: <b>differentiate the outside, leave the inside alone, then multiply by the derivative of the inside</b>. Leibniz writes it so it looks like cancelling: dy/dx = (dy/du)(du/dx).'],
 ('each rule handled one function at a time','a way through nested functions','sin(x²), e^{3x}, (2x + 1)⁵ and √(x² + 1) all need it','the chain rule'),
 [('(f∘g)′(x) = f′(g(x)) · g′(x)','chain rule'),('dy/dx = (dy/du)(du/dx)','Leibniz form'),('d/dx [f(u)] = f′(u) · u′','shorthand')],
 [lab('ch-lab','Two rates, multiplied',canvas='ch-canvas',aria='Left graph: the inner function u = g(x) with its tangent. Right graph: the outer function f(u) with its tangent at the matching point.',
   seg=('ch-fn','Composite',[('a','sin(x²)'),('b','(3x+1)⁴'),('c','e²ˣ'),('d','√(x²+1)')]),
   ctl=[('ch-x','Point x',-1.5,1.5,.05,.8)],canvas2=('ch-canvas2','The outer function f against u, with the tangent at u = g(x).'),pre='<p class="small" id="ch-form" style="margin:0"></p>',
   out=[('ch-gp','g′(x): inner rate','a'),('ch-fp','f′(g(x)): outer rate','v'),('ch-prod','product','x'),('ch-num','numeric slope of f(g(x))','')])],
 [('Choose <b>e²ˣ</b>. What are the two rates at any x, and what do they give? <button type="button" class="btn link" data-show=\'' + show(["click","#ch-fn [data-k=c]"],["#ch-x",0.5]) + '\'>Set it up for me</button>','' ,'The inner rate is always 2, the outer rate is e<sup>2x</sup>: the product 2e<sup>2x</sup> matches the numeric slope. The factor 2 is what the chain rule adds.'),
  ('Choose <b>(3x+1)⁴</b> and change x. Which factor is always the same? <button type="button" class="btn link" data-show=\'' + show(["click","#ch-fn [data-k=b]"]) + '\'>Set it up for me</button>','' ,'The inner rate 3. The outer rate 4u³ depends on x, but the inner rate does not, so the derivative is 4(3x+1)³·3 = 12(3x + 1)³.'),
  ('Choose <b>sin(x²)</b> and slide x to 1.25. What is the slope, and why so small?',show(["click","#ch-fn [data-k=a]"],["#ch-x",1.25]),'f′ = 2x cos(x²) ≈ 2.5·cos(1.5625) ≈ 0.021, nearly 0. At x = 1.25 the inner value x² ≈ 1.56 is almost π/2, where sin u peaks, so the outer rate cos u is nearly 0 and the product is too.'),
  ('Choose <b>√(x² + 1)</b> and slide x to 0. Which factor makes the slope 0 there?',show(["click","#ch-fn [data-k=d]"],["#ch-x",0]),'The inner rate 2x is 0 at x = 0, so the product is 0: f′ = x/√(x² + 1) = 0, a minimum at (0, 1). At x = 0.8 the slope is 0.8/√1.64 ≈ 0.625.')],
 ('Differentiate f(x) = sin(x²) and g(x) = (3x + 1)⁵.',[
  '<b>Name the layers.</b> For f: outer = sin u, inner = u = x². For g: outer = u⁵, inner = u = 3x + 1.',
  '<b>Differentiate the outside, keep the inside.</b> f′ = cos(x²) · (x²)′. g′ = 5(3x + 1)⁴ · (3x + 1)′.',
  '<b>Multiply by the derivative of the inside.</b> (x²)′ = 2x and (3x + 1)′ = 3.',
  '<b>Answer.</b> f′(x) = <b>2x cos(x²)</b>; g′(x) = <b>15(3x + 1)⁴</b>.'],_chfig),
 ['Forgetting the inside derivative: (sin x²)′ is not cos x².','Changing the inside when differentiating the outside. cos(x²) keeps x² as it is.','Applying the power rule to eˣ-type functions: (e<sup>3x</sup>)′ = 3e<sup>3x</sup>, not 3x e<sup>3x−1</sup>.','Stopping early on layers: √(sin(x²)) has three layers.','Mixing up the order of composition when evaluating at a point: you need g(a) first, then f′(g(a)).'],
 ('Several layers',['For three layers, y = f(g(h(x))), multiply three rates: f′(g(h(x)))·g′(h(x))·h′(x). Work from the outside in, one layer at a time, and write each step.']),
 [('d/dx [e<sup>x²</sup>] =',['2x e<sup>x²</sup>','e<sup>x²</sup>','x² e<sup>x²−1</sup>','2e<sup>x</sup>'],0,'Outer e^u gives e^(x²); the inside x² has derivative 2x.')])

mod('implicit','Implicit differentiation',
 'Some curves, like a circle, cannot be written as y = f(x). You can still find their slopes by differentiating both sides and treating y as a function of x.',
 ['The circle <span class="m">x² + y² = 25</span> is not a single function (each x has two y values), but near any point it <i>behaves</i> like one. Differentiate both sides with respect to x. The key: whenever you differentiate something with y in it, use the chain rule and write <b>dy/dx</b>, because y depends on x.',
  'For the circle: <span class="m">2x + 2y·dy/dx = 0</span>, so <span class="m">dy/dx = −x/y</span>. The slope depends on both x and y: you need the point. At (3, 4) the slope is −3/4: the tangent heads down to the right, as a circle does in its upper right.'],
 ('y was always given as a formula in x','a way to find slopes of curves without solving for y','circles, ellipses and any equation tangled in x and y','implicit differentiation: differentiate, treat y as y(x), solve for dy/dx'),
 [('d/dx [y²] = 2y · dy/dx','chain rule on y'),('d/dx [xy] = y + x · dy/dx','product rule'),('solve for dy/dx','collect the dy/dx terms')],
 [lab('im-lab','A slope you can see',canvas='im-canvas',aria='A curve defined by an equation, a point on it, and the tangent line with slope given by implicit differentiation.',
   seg=('im-fn','Curve',[('circ','x² + y² = 9'),('ell','x² + 4y² = 4'),('hyp','xy = 4'),('cub','y² = x³ − x + 1')]),
   ctl=[('im-x','x of the point',-2,2.9,.05,1.5)],pre='<label class="check"><input type="checkbox" id="im-low"> Use the lower branch</label><p class="small" id="im-form" style="margin:0"></p>',
   out=[('im-pt','point (x, y)','x'),('im-sl','dy/dx from the formula','v'),('im-num','slope measured on the curve','a')])],
 [('On the circle, move to x = 3 on the upper branch. What is the slope? <button type="button" class="btn link" data-show=\'' + show(["click","#im-fn [data-k=circ]"],["#im-x",2.4],["#im-low",False]) + '\'>x = 2.4</button>','' ,'At x = 2.4 the point is (2.4, 1.8), and dy/dx = −x/y = −2.4/1.8 = −1.33. The tangent falls to the right.'),
  ('Switch to the lower branch at the same x. What happens to the slope? <button type="button" class="btn link" data-show=\'' + show(["click","#im-fn [data-k=circ]"],["#im-x",2.4],["#im-low",True]) + '\'>Set it up for me</button>','' ,'y is now negative, so −x/y is positive: the lower right of a circle slopes up. Same x, opposite slope, because the formula needs y too.'),
  ('Choose the ellipse x² + 4y² = 4 and use x = 1 on the upper branch. What is the slope?',show(["click","#im-fn [data-k=ell]"],["#im-x",1],["#im-low",False]),'y = √3/2 ≈ 0.866, and dy/dx = −x/(4y) = −1/(2√3) ≈ −0.289. A gentle downward slope, since the upper right of an ellipse that is wider than tall is nearly flat there.'),
  ('Choose xy = 4 at x = 2. What is the slope, and does the sign depend on the branch?',show(["click","#im-fn [data-k=hyp]"],["#im-x",2]),'The point is (2, 2) and dy/dx = −y/x = −1. On the other branch (x &lt; 0, y &lt; 0) it is also negative: −y/x is negative whenever x and y have the same sign, so both branches always fall.'),
  ('Choose y² = x³ − x + 1 and set x = −1.25 (upper branch). What happens to the slope as x approaches the left end?',show(["click","#im-fn [data-k=cub]"],["#im-x",-1.25],["#im-low",False]),'The point is about (−1.25, 0.545) and dy/dx = (3x² − 1)/(2y) ≈ 3.38. As x → −1.3247 the curve reaches y = 0, the denominator 2y goes to 0 and the slope blows up: a vertical tangent at the left tip.')],
 ('Find dy/dx for x² + y² = 25 and the slope at (3, 4). Then find dy/dx for x²y + y³ = 10.',[
  '<b>Differentiate both sides.</b> d/dx[x²] + d/dx[y²] = d/dx[25] gives 2x + 2y·y′ = 0.',
  '<b>Solve for y′.</b> 2y·y′ = −2x, so y′ = −x/y. At (3, 4): <b>−3/4</b>.',
  '<b>Second curve, product rule on x²y.</b> 2xy + x²y′ + 3y²y′ = 0.',
  '<b>Collect the y′ terms.</b> y′(x² + 3y²) = −2xy.',
  '<b>Answer.</b> y′ = <b>−2xy/(x² + 3y²)</b>.'],_imfig),
 ['Forgetting dy/dx after differentiating a y term: (y²)′ is 2y·y′, not 2y.','Not using the product rule on mixed terms like xy.','Dropping y from the answer. Leave it in; the formula depends on both coordinates.','Not isolating dy/dx: collect every y′ term on one side, factor and divide.','Substituting the point too early. Differentiate first, then substitute.'],
 ('Why it works',['Near a point on the curve, y is some function of x, even if you cannot write it down. Differentiating an equation that is true for all nearby (x, y) gives another true equation. The chain rule is just the way to differentiate y² = (y(x))² with respect to x.']),
 [('d/dx [y³] with respect to x equals',['3y² dy/dx','3y²','y³ dy/dx','3y² dx/dy'],0,'Chain rule: derivative of the outside (3y²) times the derivative of the inside (dy/dx).')])

mod('invfn','Inverse functions & inverse trig',
 'If f turns a into b, its inverse turns b back into a. Their slopes at matching points are reciprocals, and that fact gives the derivatives of ln, arcsin and arctan.',
 ['The graph of f⁻¹ is the graph of f reflected over the line y = x. A reflection swaps the roles of rise and run, so a tangent of slope m at (a, b) becomes a tangent of slope <span class="m">1/m</span> at (b, a). That is the rule: <span class="m">(f⁻¹)′(b) = 1 / f′(a)</span> where <span class="m">f(a) = b</span>.',
  'Use it on f(x) = sin x to get <span class="m">(arcsin x)′ = 1/√(1 − x²)</span>, and on tan x to get <span class="m">(arctan x)′ = 1/(1 + x²)</span>. The AP course asks for arcsin, arccos and arctan.'],
 ('inverses were just "undo" functions','their slopes are linked','arcsin, arctan and ln have clean derivatives','the derivative of an inverse function'),
 [('(f⁻¹)′(b) = 1 / f′(a), f(a) = b','inverse function derivative'),('(arcsin x)′ = 1/√(1−x²)','−1/√(1−x²) for arccos'),('(arctan x)′ = 1/(1+x²)','')],
 [lab('iv-lab','Reflect a tangent line',canvas='iv-canvas',aria='A function and its inverse as mirror images across y = x, with tangent lines at matching points.',
   seg=('iv-fn','Function',[('ex','eˣ'),('cu','x³ + x'),('sn','sin x'),('sq','x² (x ≥ 0)')]),ctl=[('iv-a','a',-1.5,1.5,.05,.6)],
   out=[('iv-m','f′(a)','x'),('iv-mi','(f⁻¹)′(f(a))','a'),('iv-prod','product','v')]),
  lab('iv-lab2','Inverse trig derivatives',canvas='iv-canvas2',aria='An inverse trig function in blue with its derivative in green.',
   seg=('iv-tr','Function',[('as','arcsin x'),('ac','arccos x'),('at','arctan x')]),ctl=[('iv-x','x',-.95,.95,.05,.5)],pre='<p class="small" id="iv-form" style="margin:0"></p>',
   out=[('iv-sl','slope at x (numeric)','x'),('iv-fm','formula value','v')])],
 [('On eˣ, find the product f′(a)·(f⁻¹)′. <button type="button" class="btn link" data-show=\'' + show(["click","#iv-fn [data-k=ex]"],["#iv-a",0.6]) + '\'>Set it up for me</button>','' ,'Always 1: the slopes are reciprocals. At a = 0.6, f′ = e^0.6 ≈ 1.82, and the inverse (ln) has slope 1/1.82 ≈ 0.55 at the matching point.'),
  ('On arcsin x, move x toward 1. What happens to the slope? <button type="button" class="btn link" data-show=\'' + show(["click","#iv-tr [data-k=as]"],["#iv-x",0.95]) + '\'>Set it up for me</button>','' ,'It grows large: arcsin has a vertical tangent at x = 1, matching 1/√(1 − x²) → ∞. The sine curve is flat there, so its inverse is steep.')],
 ('If f(x) = x³ + x, find (f⁻¹)′(10).',[
  '<b>Find a.</b> We need f(a) = 10. Try a = 2: 8 + 2 = 10. ✓',
  '<b>Differentiate f.</b> f′(x) = 3x² + 1, so f′(2) = 13.',
  '<b>Reciprocal.</b> (f⁻¹)′(10) = 1/f′(2).',
  '<b>Answer.</b> <b>1/13</b>.']),
 ['Evaluating f′ at b instead of at a. You need the x that f sends to b.','Writing (f⁻¹)′ = 1/f′(x) without the inverse in the argument: it is 1/f′(f⁻¹(b)).','Confusing f⁻¹ with 1/f.','Forgetting the domain restrictions for inverse trig.','Dropping the chain rule: d/dx arctan(2x) = 2/(1 + 4x²), not 1/(1 + 4x²).'],
 ('Why arcsin has that derivative',['Let y = arcsin x, so sin y = x. Differentiate implicitly: cos y · y′ = 1, so y′ = 1/cos y. With y between −π/2 and π/2, cos y = √(1 − sin²y) = √(1 − x²).']),
 [('If f(2) = 5 and f′(2) = 4, then (f⁻¹)′(5) =',['1/4','4','1/5','5/4'],0,'Reciprocal of the slope at the matching point: 1/f′(2) = 1/4.')])

mod('higher','Higher-order derivatives & choosing a rule',
 'Differentiate again and you get the rate at which the slope changes. Then practise the skill that matters most on the exam: picking the right rule.',
 ['The <b>second derivative</b> f″ is the derivative of f′. If f is position, f′ is velocity and f″ is acceleration. If f′ is slope, f″ tells you how the slope is changing: positive means the slope is increasing (the curve bends up), negative means it bends down. You will use this in Unit 5 to find concavity.',
  'With more rules, the real skill is <b>choosing</b>. Look at the outermost operation first: is the whole expression a sum, a product, a quotient, or a function of something? That operation is the rule you apply first.'],
 ('one derivative per function','f″, f‴ and a method for picking the right rule','acceleration, concavity and the shapes of graphs','repeated differentiation, and a decision procedure'),
 [('f″ = (f′)′','second derivative'),('d²y/dx² · f⁽ⁿ⁾','notation'),('sum → product → quotient → chain','look at the outermost operation first')],
 [lab('hi-lab','Height, slope and bend',canvas='hi-canvas',aria='Three stacked graphs: f, its derivative f prime, and its second derivative f double prime, with matching points.',
   seg=('hi-fn','Function',[('a','x³ − 3x'),('b','sin x'),('c','x⁴ − 2x²'),('d','eˣ')]),ctl=[('hi-x','Point x',-2,2,.05,.5)],
   out=[('hi-f','f(x): height','x'),('hi-d','f′(x): slope','v'),('hi-dd','f″(x): bend','a')])],
 [('Choose <b>x³ − 3x</b> and slide x to 0. What is f″ there, and what does the curve do? <button type="button" class="btn link" data-show=\'' + show(["click","#hi-fn [data-k=a]"],["#hi-x",0]) + '\'>Set it up for me</button>','' ,'f″(0) = 0: the bend switches there. The curve changes from bending down (f″ < 0 for x &lt; 0) to bending up (f″ > 0).'),
  ('Choose <b>sin x</b>. Where is f″ largest in size? <button type="button" class="btn link" data-show=\'' + show(["click","#hi-fn [data-k=b]"],["#hi-x",1.5708]) + '\'>x = π/2</button>','' ,'At the peak (x = π/2): f″ = −sin(π/2) = −1. The curve bends sharply there, and f′ passes through zero.')],
 ('Find f″(x) for f(x) = x e<sup>2x</sup>.',[
  '<b>Choose a rule.</b> It is a product of x and e<sup>2x</sup>.',
  '<b>First derivative.</b> f′ = 1·e<sup>2x</sup> + x·(2e<sup>2x</sup>) = e<sup>2x</sup>(1 + 2x).',
  '<b>Differentiate again (product).</b> f″ = 2e<sup>2x</sup>(1 + 2x) + e<sup>2x</sup>·2.',
  '<b>Simplify.</b> f″ = e<sup>2x</sup>(2 + 4x + 2) = <b>e<sup>2x</sup>(4x + 4)</b>.']),
 ['Differentiating the original instead of f′ for the second derivative.','Not simplifying f′ before differentiating again.','Choosing the wrong rule: look at the outermost operation, not the innermost.','Confusing f² with f″.','Sign errors when differentiating trig functions twice: sin → cos → −sin.'],
 ('Which rule first?',['<b>Sum or difference</b>: split and differentiate each term. <b>Product</b> of two functions of x: product rule. <b>Quotient</b>: quotient rule (or rewrite as a product with a negative power). <b>A function of a function</b>, like sin(3x) or √(x² + 1): chain rule. <b>Constant times something</b>: pull out the constant. Many problems need two or three of these in order.']),
 [('Which rule do you apply first to f(x) = x² sin(3x)?',['Chain rule','Product rule','Quotient rule','Power rule only'],1,'The outermost operation is a product of x² and sin(3x); the chain rule then appears inside sin(3x).')])
