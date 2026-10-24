mod('motion','Derivatives in context & motion',
 'A derivative is a rate, and every rate has units and a story. The classic story: a particle moving along a line.',
 ['If <span class="m">s(t)</span> is position, then <span class="m">v(t) = s′(t)</span> is velocity and <span class="m">a(t) = v′(t) = s″(t)</span> is acceleration. Velocity can be negative (moving left or down). <b>Speed</b> is the size of velocity, |v|. The units of each derivative are the units of the quantity divided by the units of time: meters, meters per second, meters per second squared.',
  'The particle is <b>at rest</b> when v = 0, and it can turn around only there. It is <b>speeding up</b> when velocity and acceleration have the <i>same</i> sign, and <b>slowing down</b> when the signs are opposite. This is the sign test the exam loves.'],
 ('a derivative was a slope on a graph','a meaning: the instantaneous rate of change of a real quantity, with units','motion, growth, flow, cost and everything that changes in time','velocity, speed and acceleration, and how to interpret their signs'),
 [('v = s′ , a = v′ = s″','velocity, acceleration'),('speed = |v|','always ≥ 0'),('v and a same sign → speeding up','opposite signs → slowing down')],
 [lab('mo-lab','A particle on a line',canvas='mo-canvas',aria='A particle moving along a number line with velocity and acceleration arrows, above graphs of position, velocity and acceleration against time.',
   seg=('mo-fn','Motion',[('a','s = t³ − 6t² + 9t'),('b','s = 20t − 5t²'),('c','s = 3 sin t')]),
   ctl=[('mo-t','Time t',0,5,.02,0.5)],pre='<div class="row"><button type="button" class="btn" id="mo-play">Play</button></div>',
   out=[('mo-s','position s','x'),('mo-v','velocity v','v'),('mo-a','acceleration a','a'),('mo-state','what the particle is doing','')])],
 [('Choose the first motion and set t = 2.5. Is the particle speeding up or slowing down? <button type="button" class="btn link" data-show=\'' + show(["click","#mo-fn [data-k=a]"],["#mo-t",2.5]) + '\'>Set it up for me</button>','' ,'v(2.5) = 3(1.5)(−0.5) = −2.25 and a(2.5) = 6(2.5) − 12 = 3. Opposite signs, so it is slowing down: moving left, but being pushed right.'),
  ('Choose the ball (s = 20t − 5t²) and set t = 2. What does v = 0 mean here? <button type="button" class="btn link" data-show=\'' + show(["click","#mo-fn [data-k=b]"],["#mo-t",2]) + '\'>Set it up for me</button>','' ,'At t = 2 the ball is at its highest point (s = 20): it has stopped for an instant before falling. Velocity changes sign there, and acceleration is −10 the whole time.')],
 ('A particle has position s(t) = t³ − 6t² + 9t for t ≥ 0. When is it at rest, and is it speeding up or slowing down at t = 2.5?',[
  '<b>Velocity.</b> v(t) = s′(t) = 3t² − 12t + 9 = 3(t − 1)(t − 3).',
  '<b>At rest.</b> v = 0 at t = 1 and t = 3.',
  '<b>Acceleration.</b> a(t) = v′(t) = 6t − 12.',
  '<b>Signs at t = 2.5.</b> v(2.5) = 3(1.5)(−0.5) = −2.25 and a(2.5) = 3.',
  '<b>Answer.</b> At rest at <b>t = 1 and t = 3</b>. At t = 2.5 velocity is negative and acceleration positive (opposite signs), so the particle is <b>slowing down</b>.']),
 ['Confusing velocity with speed: velocity has a sign, speed does not.','Saying the particle is speeding up whenever acceleration is positive. You must compare it with the sign of velocity.','Forgetting units. Always write them: m/s, m/s².','Treating v = 0 as a stop forever. It may only be a turning point.','Using the position formula to find velocity at a time without differentiating first.'],
 ('Reading the story',['Positive velocity means moving in the positive direction; negative means the opposite. Where velocity changes sign the particle turns around. Where acceleration is zero velocity is momentarily constant (a maximum or minimum of v). The same logic reads any rate: if V(t) is volume, V′(t) is a flow rate, and V′ &gt; 0 means filling.']),
 [('v(t) = −4 and a(t) = −2 at some instant. The particle is',['speeding up','slowing down','at rest','turning around'],0,'Velocity and acceleration have the same sign (both negative), so speed is increasing.')])

# ---- figures for Related rates
_O, _s = (80, 205), 17
_F, _Tp = (_O[0] + 6 * _s, _O[1]), (_O[0], _O[1] - 8 * _s)
_lad_base = (ln(80, 205, 250, 205, 'mut', 2) + ln(80, 205, 80, 22, 'mut', 4) + ln(80, 195, 90, 195, 'mut', 1.2) + ln(90, 195, 90, 205, 'mut', 1.2)
             + ln(*_Tp, *_F, 'f', 5))
_lad = fig(_lad_base, [
    (1, txt(131, 222, 'x', 'f', 14) + txt(92, 140, 'y', 'f', 14, 'start') + txt(142, 128, '10 ft', 'f', 12, 'start'), 'x² + y² = 100', 'f'),
    (2, arr(182, 192, 222, 192, 'd') + txt(204, 182, 'dx/dt', 'd', 12) + arr(60, 69, 60, 110, 'd') + txt(56, 62, 'dy/dt', 'd', 12, 'end'), '2x·x′ + 2y·y′ = 0', 'd'),
    (3, txt(131, 237, '6', 'ink', 12) + txt(92, 156, '8', 'ink', 12, 'start'), 'x = 6, y = 8', 'ink'),
    (4, '', 'y′ = −(6/8)(2)', 'tan'),
    (5, txt(54, 128, '1.5 ft/s', 'tan', 12, 'end') + txt(54, 142, 'down', 'tan', 12, 'end'), 'top falls 1.5 ft/s', 'tan')],
    'The ladder (blue) is the hypotenuse. Its length stays 10 ft while x and y change.', 245)
_lamp_base = (ln(8, 205, 252, 205, 'mut', 2) + ln(25, 205, 25, 70, 'ink', 4) + ln(25, 72, 36, 72, 'ink', 3) + circ(38, 74, 6, 'area', 1, 'ink', 1.5)
              + ln(133, 205, 205, 205, 'ink', 5) + person(133, 205, 54))
_lamp = fig(_lamp_base, [
    (1, txt(79, 222, 'x', 'f', 14) + txt(169, 222, 's', 'f', 14) + txt(31, 140, '15 ft', 'ink', 11, 'start') + txt(146, 172, '6 ft', 'ink', 11, 'start') + ln(25, 212, 133, 212, 'f', 1.5) + ln(133, 212, 205, 212, 'f', 1.5, '4 3'), 'tip is at x + s', 'f'),
    (2, poly([(38, 74), (25, 205), (205, 205)], 'area', .14) + poly([(133, 151), (133, 205), (205, 205)], 'area', .4) + ln(38, 74, 205, 205, 'area', 1.6, '5 4'), '15/(x + s) = 6/s', 'area'),
    (3, arr(133, 132, 166, 132, 'd', '5 ft/s', off=(6, -12)), 's = (2/3)x, s′ = 10/3', 'd'),
    (4, arr(205, 194, 238, 194, 'd', '', w=2.6) + txt(221, 186, 'tip', 'd', 11), 'tip: (5/3)(5) = 25/3', 'd'),
    (5, '', 'x = 40 was never used', 'ink')],
    'Not to scale. The light ray over the head makes two similar triangles that share the angle at the tip.', 230)

mod('related','Related rates',
 'When two quantities are tied together by an equation and both change in time, their rates are tied together too.',
 ['A ladder slides down a wall. The foot moves out at a steady 2 ft/s, but the top does not move down at a steady rate: it starts slowly and speeds up. The lengths x and y are linked by <span class="m">x² + y² = L²</span>, so their <i>rates</i> are linked by the derivative of that equation with respect to time.',
  'The method: <b>draw and label</b>; write an <b>equation</b> that holds at every moment; <b>differentiate with respect to t</b> (chain rule on every variable); only <b>then substitute</b> the numbers of the moment you care about. Substituting before differentiating freezes the variables and gives 0.'],
 ('quantities changed one at a time with x','a way to connect the rates of several changing quantities','ladders, balloons, shadows, cones, flows','differentiate an equation in time'),
 [('d/dt [x²] = 2x · dx/dt','chain rule in t'),('differentiate first','then plug in'),('draw · equation · d/dt · substitute','the four steps')],
 [lab('rr-lab','Same equation, linked rates',canvas='rr-canvas',aria='A picture of the chosen situation (ladder, ripple, balloon, lamppost or cone tank) with arrows for the given rate and the rate you want.',
   seg=('rr-fn','Situation',[('lad','Ladder'),('cir','Ripple'),('sph','Balloon'),('lamp','Lamppost shadow'),('cone','Cone tank')]),
   ctl=[('rr-v','Variable',1,9,.1,6),('rr-g','Given rate',.5,6,.5,2)],pre='<p class="small" id="rr-form" style="margin:0"></p>',
   out=[('rr-given','given rate','x'),('rr-ans','the rate you want','v'),('rr-eq','the derivative','')])],
 [('On the ladder (10 ft, foot moving out at 2 ft/s) set x = 6. How fast is the top sliding down?','' + show(["click","#rr-fn [data-k=lad]"],["#rr-v",6],["#rr-g",2]),'y = 8, and dy/dt = −(x/y)(2) = −(6/8)(2) = −1.5 ft/s: the top drops 1.5 ft/s.'),
  ('Now slide x up to 9. What happens to the speed of the top?',show(["click","#rr-fn [data-k=lad]"],["#rr-v",9],["#rr-g",2]),'y ≈ 4.36 and dy/dt ≈ −4.13 ft/s: it speeds up a lot as the ladder nears the floor, even though the foot moves at a steady 2 ft/s.'),
  ('Keep x = 6 and double the given rate to 4 ft/s. Predict the new dy/dt before you look.',show(["click","#rr-fn [data-k=lad]"],["#rr-v",6],["#rr-g",4]),'dy/dt = −(6/8)(4) = −3 ft/s, exactly double. At a fixed moment the rate you want is proportional to the given rate; only the moment (x and y) sets the factor.'),
  ('Choose the lamppost. Drag the person from 5 ft to 25 ft from the pole. Does the shadow grow faster when the person is far away?',show(["click","#rr-fn [data-k=lamp]"],["#rr-v",5],["#rr-g",5]),'No. The shadow grows at 10/3 ≈ 3.33 ft/s and its tip moves at 25/3 ≈ 8.33 ft/s wherever the person is, because similar triangles make s = (2/3)x, a straight-line relationship.'),
  ('Choose the cone tank (water in at 2 ft³/min). Compare dh/dt at h = 2 ft and at h = 8 ft.',show(["click","#rr-fn [data-k=cone]"],["#rr-v",2],["#rr-g",2]),'About 0.995 ft/min at h = 2 but only 0.062 ft/min at h = 8, 16 times slower: the surface is 4 times wider, so its area is 16 times bigger, and the same water spreads over it.')],
 [('A 10 ft ladder leans on a wall. Its foot slides away at 2 ft/s. How fast is the top sliding down when the foot is 6 ft from the wall?',[
  '<b>Draw and equation.</b> x = distance of foot from wall, y = height of top: x² + y² = 100.',
  '<b>Differentiate with respect to t.</b> 2x·dx/dt + 2y·dy/dt = 0, so dy/dt = −(x/y)·dx/dt.',
  '<b>Substitute the moment.</b> x = 6 gives y = √(100 − 36) = 8, and dx/dt = 2.',
  '<b>Compute.</b> dy/dt = −(6/8)(2) = −1.5.',
  '<b>Answer.</b> The top is sliding down at <b>1.5 ft/s</b> (dy/dt = −1.5 ft/s).'],_lad),
  {'h':'Worked example 2: a shadow on the sidewalk','fig':_lamp,
   'prob':'A street light is at the top of a 15 ft pole. A person 6 ft tall walks away from the pole at 5 ft/s. (a) How fast is the person\'s shadow getting longer when they are 40 ft from the pole? (b) How fast is the tip of the shadow moving?',
   'steps':['<b>Draw and name.</b> x = distance from the pole to the person, s = length of the shadow. The tip of the shadow is x + s from the pole. Given: dx/dt = 5 ft/s.',
    '<b>Equation that holds at every moment.</b> The big triangle (pole, ground to the tip) and the small one (person, shadow) are similar: 15/(x + s) = 6/s. Cross-multiply: 15s = 6x + 6s, so 9s = 6x and <b>s = (2/3)x</b>.',
    '<b>(a) Differentiate in t.</b> ds/dt = (2/3)·dx/dt = (2/3)(5) = <b>10/3 ≈ 3.33 ft/s</b>.',
    '<b>(b) The tip.</b> The tip is at D = x + s = (5/3)x, so dD/dt = (5/3)(5) = <b>25/3 ≈ 8.33 ft/s</b>. The tip outruns the person because the shadow is growing too.',
    '<b>What about the 40 ft?</b> Neither answer depends on x: s is a constant multiple of x, so its rate is too. AP problems sometimes give a value you do not need; say so rather than forcing it in.']}],
 ['Substituting numbers before differentiating. Constants have derivative 0, so you lose the rates.','Forgetting dx/dt: 2x alone is not d/dt of x².','Treating a changing quantity as constant (for example the ladder\'s length is constant, but x and y are not).','Ignoring signs: a decreasing quantity has a negative rate. Report it with the right direction.','Dropping units. Rates have units of quantity per time.','In shadow problems, using the distance to the person when the question asks about the tip of the shadow (x + s).'],
 ('A checklist',['Name every variable with units. Write what is constant and what changes. Use a relationship that is true at all times (Pythagoras, similar triangles, a volume or area formula), not just at the moment asked about. Differentiate. Substitute known values. Solve. Include units and a sentence.']),
 [('A circle\'s radius grows at 2 cm/s. dA/dt = ?',['2πr·(2)','πr²·(2)','2πr','2'],0,'A = πr², so dA/dt = 2πr·dr/dt = 2πr·2.')])

mod('linear','Linearization & differentials',
 'Zoom in far enough and a curve is a line. Use the tangent line to estimate values you cannot compute by hand.',
 ['Near x = a, the curve is almost indistinguishable from its tangent line <span class="m">L(x) = f(a) + f′(a)(x − a)</span>. So to estimate f at a nearby point, use L instead: <span class="m">f(x) ≈ L(x)</span>. This is how a calculator first estimates square roots, and how physicists replace sin θ by θ for small angles.',
  'Whether the estimate is too big or too small depends on bending. If the curve is <b>concave down</b> (f″ &lt; 0) the tangent line lies <i>above</i> the curve: the estimate is an <b>overestimate</b>. If concave up (f″ &gt; 0) the tangent lies below: an underestimate. Differentials write the same idea as <span class="m">dy = f′(x) dx</span>.'],
 ('a function value needed a calculator or a formula','a fast, local approximation','estimating √ and trig values, error propagation and later Taylor polynomials','the tangent-line approximation and differentials'),
 [('L(x) = f(a) + f′(a)(x − a)','linearization at a'),('f(x) ≈ L(x) near a','good for x close to a'),('dy = f′(x) dx','differential')],
 [lab('li-lab','Tangent line vs the curve',canvas='li-canvas',aria='A curve with its tangent line at a, and the estimate and true value at a target x.',
   seg=('li-fn','Function',[('sq','√x'),('sn','sin x'),('ex','eˣ'),('ln','ln x')]),
   ctl=[('li-a','Tangent point a',.5,4,.1,1),('li-x','Target x',.3,4.5,.05,1.4)],
   out=[('li-L','estimate L(x)','x'),('li-f','true f(x)','v'),('li-e','error (L − f)','a'),('li-side','the tangent line is','')])],
 [('On √x with a = 1, estimate √1.2. <button type="button" class="btn link" data-show=\'' + show(["click","#li-fn [data-k=sq]"],["#li-a",1],["#li-x",1.2]) + '\'>Set it up for me</button>','' ,'L(x) = 1 + ½(x − 1), so L(1.2) = 1.1. The true √1.2 = 1.0954: a tiny overestimate, because √x is concave down.'),
  ('Slide x far from a. What happens to the error? <button type="button" class="btn link" data-show=\'' + show(["click","#li-fn [data-k=sq]"],["#li-a",1],["#li-x",4]) + '\'>Set it up for me</button>','' ,'The error grows quickly: L(4) = 2.5 but √4 = 2. A tangent line is only a good estimate close to a.')],
 ('Use a linearization to estimate √26.',[
  '<b>Pick a nearby easy point.</b> f(x) = √x, a = 25 (since √25 = 5).',
  '<b>Slope.</b> f′(x) = 1/(2√x), so f′(25) = 1/10.',
  '<b>Build L.</b> L(x) = 5 + (1/10)(x − 25).',
  '<b>Estimate.</b> L(26) = 5 + 0.1 = 5.1.',
  '<b>Answer.</b> √26 ≈ <b>5.1</b> (true value 5.0990). Overestimate, since √x is concave down.']),
 ['Choosing a not close to x. The estimate is only good near a.','Evaluating f′ at x instead of at a.','Forgetting f(a) in L(x).','Saying overestimate/underestimate from the sign of f′. It depends on f″ (concavity).','Using degrees for trig linearizations. They require radians.'],
 ('Differentials',['The change in y along the tangent line is dy = f′(x) dx, while the true change is Δy. For a small dx they nearly agree. This is how measurement error spreads: if the radius of a sphere is measured with a small error dr, the error in volume is about dV = 4πr² dr.']),
 [('The tangent line to f at a lies above the curve near a when',['f″(a) < 0','f″(a) > 0','f′(a) < 0','f′(a) > 0'],0,'Concave down means the curve bends away below its tangent line, so the tangent estimate is too large.')])

mod('lhop','L\'Hôpital\'s rule',
 'If a limit of a ratio is 0/0 or ∞/∞, you can differentiate the top and bottom separately and try again.',
 ['When both f and g go to 0 at a, the ratio f/g depends on <i>how fast</i> each goes to 0. Near a, f ≈ f′(a)(x − a) and g ≈ g′(a)(x − a), so their ratio is about f′(a)/g′(a): the ratio of their <b>rates</b>. That is <b>L\'Hôpital\'s rule</b>: <span class="m">lim f/g = lim f′/g′</span>, if the left side is 0/0 or ∞/∞ and the right side exists.',
  'Check the form first. Never apply the rule to something that is not 0/0 or ∞/∞. Other indeterminate forms (0·∞, ∞ − ∞, 1<sup>∞</sup>) must be rewritten into a ratio first. You differentiate top and bottom <i>separately</i>: this is not the quotient rule.'],
 ('0/0 was solved by algebra when we were lucky','a general tool for indeterminate quotients','limits like sin x / x, (eˣ − 1)/x, x² / eˣ and ln x / x','L\'Hôpital\'s rule'),
 [('lim f/g = lim f′/g′','if 0/0 or ∞/∞'),('0/0 · ∞/∞','the two direct forms'),('0·∞ · ∞−∞ · 1^∞','rewrite first')],
 [lab('lh-lab','Ratio of functions vs ratio of derivatives',canvas='lh-canvas',aria='Graphs of f over g and of f prime over g prime near a; both approach the same limit.',
   seg=('lh-fn','Limit',[('a','(eˣ−1)/x at 0'),('b','(1−cos x)/x² at 0'),('c','ln x/(x−1) at 1'),('d','x²/eˣ as x→∞')]),
   ctl=[('lh-w','Zoom (closer to a, or farther out)',0,3,.05,0)],pre='<p class="small" id="lh-form" style="margin:0"></p>',
   out=[('lh-r','f(x)/g(x) at the probe','x'),('lh-rp','f′(x)/g′(x) at the probe','v'),('lh-lim','the limit','a')])],
 [('Choose (eˣ − 1)/x and zoom in. Compare the two ratios. <button type="button" class="btn link" data-show=\'' + show(["click","#lh-fn [data-k=a]"],["#lh-w",3]) + '\'>Set it up for me</button>','' ,'Both head to 1. The ratio of derivatives, eˣ/1, is already 1 at x = 0, so L\'Hôpital gives the limit in one line.'),
  ('Choose x²/eˣ and widen the window. Which grows faster, top or bottom? <button type="button" class="btn link" data-show=\'' + show(["click","#lh-fn [data-k=d]"],["#lh-w",3]) + '\'>Set it up for me</button>','' ,'The exponential wins: the ratio heads to 0. Applying the rule twice: x²/eˣ → 2x/eˣ → 2/eˣ → 0.')],
 ('Find lim<sub>x→0</sub> (1 − cos x)/x².',[
  '<b>Check the form.</b> 1 − cos 0 = 0 and 0² = 0: the form 0/0, so the rule applies.',
  '<b>Differentiate top and bottom.</b> (sin x)/(2x).',
  '<b>Check again.</b> Still 0/0 at x = 0, so apply the rule once more.',
  '<b>Differentiate again.</b> (cos x)/2, which at x = 0 is 1/2.',
  '<b>Answer.</b> The limit is <b>1/2</b>.']),
 ['Using the quotient rule on f/g. Differentiate the top and bottom separately.','Applying the rule when the form is not 0/0 or ∞/∞ (for example 1/0 or 0/5).','Stopping after one step when the form is still 0/0.','Applying it to 0·∞ or ∞ − ∞ directly. Rewrite as a quotient first.','Concluding the original limit does not exist because f′/g′ oscillates: then the rule gives no information.'],
 ('Growth rates',['L\'Hôpital settles a hierarchy: as x → ∞, ln x grows slower than any power of x, which grows slower than any exponential. So (ln x)/x → 0 and x<sup>n</sup>/e<sup>x</sup> → 0 for every n.']),
 [('Which is the first step for lim<sub>x→0</sub> sin(3x)/x?',['Check it is 0/0, then differentiate top and bottom','Plug in 0 and say it is 0','Apply the quotient rule','Say it does not exist'],0,'It is 0/0, so the rule applies: 3cos(3x)/1 → 3.')])
