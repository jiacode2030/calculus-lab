mod('slope','Slope fields',
 'A differential equation tells you the slope at every point. A slope field draws those slopes, and the solutions are the curves that follow them.',
 ['A <b>differential equation</b> like <span class="m">dy/dx = x − y</span> gives the slope of a solution at every point (x, y) without telling you the solution. A <b>slope field</b> draws a tiny line segment of the right slope at a grid of points. A solution curve is one that is tangent to the segments everywhere it passes, like a leaf drifting on a current.',
  'Read the field: if the right side depends only on x, segments in each vertical column are parallel; if only on y, segments in each row are parallel; slopes are zero where the right side is zero. Choose a starting point and you can trace the one solution through it. An initial condition like y(0) = 1 picks that curve.'],
 ('a derivative was computed from a known function','a rule for the slope, and a function to find','population growth, cooling, mixing and every model written as a rate','differential equations and slope fields'),
 [('dy/dx = F(x, y)','slope at (x, y)'),('y(x₀) = y₀','initial condition picks the curve'),('a solution is tangent to the field','everywhere')],
 [lab('sf-lab','Trace a solution',canvas='sf-canvas',aria='A slope field with a solution curve through a chosen starting point.',
   seg=('sf-fn','Differential equation',[('a','dy/dx = x'),('b','dy/dx = y'),('c','dy/dx = x − y'),('d','dy/dx = −x/y'),('e','dy/dx = 0.5y(1 − y/4)')]),
   ctl=[('sf-x0','Start x₀',-3,3,.1,0),('sf-y0','Start y₀',-3,3,.1,1)],pre='<p class="small" style="margin:0">Drag on the graph to move the starting point, or use the sliders.</p>',
   out=[('sf-sl','slope at the start','x'),('sf-y1','solution value 1 unit to the right','v'),('sf-note','what to notice','')])],
 [('Choose dy/dx = x. What do the solutions look like, and why are the segments in each column parallel? <button type="button" class="btn link" data-show=\'' + show(["click","#sf-fn [data-k=a]"]) + '\'>Set it up for me</button>','' ,'Parabolas y = x²/2 + C. The slope depends only on x, so every point in a vertical column has the same slope.'),
  ('Choose dy/dx = y and start at y₀ = 1, then at y₀ = −1. What happens? <button type="button" class="btn link" data-show=\'' + show(["click","#sf-fn [data-k=b]"],["#sf-y0",1],["#sf-x0",0]) + '\'>Set it up for me</button>','' ,'Solutions y = Ce^x grow away from the x-axis in both directions: y = 0 is a solution but an unstable one. Segments are parallel along each row (slope depends only on y).')],
 ('For dy/dx = x − y with y(0) = 1, find the slope at the start and use the tangent line to estimate y(0.2).',[
  '<b>Slope at (0, 1).</b> dy/dx = 0 − 1 = −1.',
  '<b>Tangent line.</b> y ≈ 1 + (−1)(x − 0).',
  '<b>Estimate.</b> y(0.2) ≈ 1 − 0.2 = 0.8.',
  '<b>Answer.</b> About <b>0.8</b>. (This is one step of Euler\'s method, a BC topic: use the new point to find a new slope.)']),
 ['Reading a slope field as the graph of the solution. The segments show slope only.','Mixing up "depends only on x" (parallel in columns) with "depends only on y" (parallel in rows).','Forgetting that two different solutions never cross (for a smooth equation).','Using the slope formula at the wrong point.','Believing the field determines one curve. You need an initial condition.'],
 ('Equilibrium solutions',['Where dy/dx = 0 for all x along a horizontal line y = c, that line is a solution (an equilibrium). In dy/dx = y it is y = 0. In the last case of the lab, y = 0 and y = 4 are equilibria, and solutions between them level off at 4.']),
 [('In a slope field for dy/dx = y² − 1, the segments along y = 1 are',['horizontal','vertical','rising','falling'],0,'dy/dx = 1 − 1 = 0 there, so the segments are flat.')])

# ---- figures for Separation of variables
import math as _m
_S = Plot((-1.25, 1.25), (0, 9.6), (30, 12, 215, 196))
def _field(P, f, xs, ys, L=9):
    o = ''
    for x in xs:
        for y in ys:
            sx = P.X(1) - P.X(0); sy = P.Y(0) - P.Y(1); dx, dy = sx, -f(x, y) * sy; k = L / _m.hypot(dx, dy)
            o += ln(P.X(x) - dx * k, P.Y(y) - dy * k, P.X(x) + dx * k, P.Y(y) + dy * k, 'mut', 1.3)
    return o
_sv = fig(_S.axes((-1, 1), (3, 6, 9), 'x', 'y') + _field(_S, lambda x, y: 2 * x * y, [i / 4 for i in range(-4, 5)], [1, 2.5, 4, 5.5, 7, 8.5]), [
    (1, '', 'dy/y = 2x dx', 'ink'),
    (2, '', 'ln|y| = x² + C', 'ink'),
    (3, ''.join(_S.curve(lambda x, A=A: A * _m.exp(x * x), -min(1.2, _m.sqrt(_m.log(9.5 / A))), min(1.2, _m.sqrt(_m.log(9.5 / A))), 'f', 1.3, '4 3') for A in (1, 2, 4)), 'y = A e^(x²): a family', 'f'),
    (4, _S.dot(0, 3, '(0, 3)', 'tan', 22, 4, 5), 'y(0) = 3 picks A = 3', 'tan'),
    (5, _S.curve(lambda x: 3 * _m.exp(x * x), -_m.sqrt(_m.log(9.5 / 3)), _m.sqrt(_m.log(9.5 / 3)), 'f', 3), 'y = 3e^(x²)', 'f')],
    'The slope field of dy/dx = 2xy (gray). Separating gives a whole family of curves; the starting point picks one.', 230)
_kc = _m.log(7 / 5) / 5
_Tc = lambda t: 20 + 70 * _m.exp(-_kc * t)
_C = Plot((-1.5, 33), (0, 100), (32, 12, 213, 196))
_t40 = _m.log(3.5) / _kc
_cof = fig(_C.axes((5, 10, 15, 20, 25, 30), (20, 40), 't', 'T') + _C.seg(0, 20, 32, 20, 'tan', 1.4, '5 4') + _C.text(31, 23, 'room 20°', 'tan', 10, 'end', 500), [
    (1, _C.dot(0, 90, '90', 'f', 14, 4) + _C.dot(5, 70, '70', 'f', 12, -6), 'T − 20 = 70e^(−kt)', 'f'),
    (2, '', 'k = ln(1.4)/5 ≈ 0.0673', 'ink'),
    (3, _C.curve(_Tc, 0, 32) + _C.dot(15, _Tc(15), '45.5', 'tan', 0, -10), 'T(15) ≈ 45.5°', 'tan'),
    (4, _C.seg(0, 40, _t40, 40, 'dd', 1.4, '3 3') + _C.seg(_t40, 0, _t40, 40, 'dd', 1.4, '3 3') + _C.text(_t40 + 1, 44, '18.6 min', 'dd', 11, 'start'), 'T = 40° at t ≈ 18.6', 'dd'),
    (5, _C.seg(-1, _Tc(0) + _kc * 70, 5, _Tc(0) - 5 * _kc * 70, 'tan', 2.2) + _C.seg(_t40 - 5, 40 + 5 * _kc * 20, _t40 + 5, 40 - 5 * _kc * 20, 'tan', 2.2), 'slope −4.71, then −1.35', 'tan')],
    'Temperature of the coffee (blue). The dashed line is the room: the coffee approaches it but never drops below.', 230)

mod('sepvar','Separation of variables & exponential models',
 'For some equations you can move all the y\'s to one side and all the x\'s to the other, then integrate. The most important result: when something changes at a rate proportional to itself, it follows an exponential.',
 ['<b>Separate</b>: for <span class="m">dy/dx = f(x)·g(y)</span>, write <span class="m">dy / g(y) = f(x) dx</span>, integrate both sides, and put the constant C on the x side (once). Then use the initial condition to find C, and solve for y if possible. Skipping the +C before using the starting value is the classic error.',
  'The model <span class="m">dy/dt = k y</span> says the rate is proportional to the amount. Separating gives <span class="m">y = y₀ e<sup>kt</sup></span>. With k &gt; 0 it is exponential growth (population, money at continuous interest); with k &lt; 0 it is decay (radioactive material, with half-life ln 2 / |k|). Newton\'s law of cooling, <span class="m">dT/dt = −k(T − T<sub>a</sub>)</span>, is the same thing for the difference T − T<sub>a</sub>.'],
 ('a slope field showed the shape of solutions','a way to find the exact solution','growth and decay, cooling, and any separable equation','separation of variables and exponential models'),
 [('dy/dt = k y ⇒ y = y₀ e<sup>kt</sup>','proportional growth or decay'),('∫ dy/g(y) = ∫ f(x) dx + C','separate, then integrate'),('half-life = ln 2 / |k|','doubling time = ln 2 / k')],
 [lab('sv-lab','Rate proportional to the amount',canvas='sv-canvas',aria='A graph of a quantity over time following the chosen differential equation, with its tangent line at a chosen time.',
   seg=('sv-fn','Model',[('gr','dy/dt = k y'),('co','cooling: dT/dt = −k(T − Tₐ)')]),
   ctl=[('sv-k','k',-1,1,.05,.3),('sv-y0','Start value',.5,10,.5,2),('sv-ta','Room temperature Tₐ (cooling only)',0,8,.5,1),('sv-t','Time t',0,10,.1,3)],
   out=[('sv-y','value at time t','x'),('sv-dy','rate dy/dt there','v'),('sv-key','doubling time or half-life','a')])],
 [('Set k = 0.3 and y₀ = 2. When does the quantity double?',show(["click","#sv-fn [data-k=gr]"],["#sv-k",0.3],["#sv-y0",2]),'After ln 2 / 0.3 ≈ 2.31 time units, and again after another 2.31. The doubling time does not depend on the starting value.'),
  ('Switch to cooling with Tₐ = 1, y₀ = 6 and k = 0.4. What does T approach?',show(["click","#sv-fn [data-k=co]"],["#sv-k",0.4],["#sv-y0",6],["#sv-ta",1]),'The room temperature, 1: the difference T − Tₐ decays exponentially, so T levels off at Tₐ.'),
  ('Set k = −0.5 and y₀ = 8 (decay). Slide t until the value is 4. How long did that take?',show(["click","#sv-fn [data-k=gr]"],["#sv-k",-0.5],["#sv-y0",8],["#sv-t",1.4]),'About 1.39 = ln 2 / 0.5, the half-life. Slide on to about 2.77 and it is 2: every half-life halves what is left.'),
  ('Keep k = 0.3 and t = 3. Change the start value from 0.5 to 5. What happens to the slope dy/dt?',show(["click","#sv-fn [data-k=gr]"],["#sv-k",0.3],["#sv-y0",0.5],["#sv-t",3]),'It goes from about 0.37 to about 3.69, ten times steeper, because the value is ten times bigger (1.23 to 12.3). That is what dy/dt = ky means: the slope is always k times the height.'),
  ('Cooling with k = 0.4, y₀ = 9 and Tₐ = 1. Compare the slope at t = 0 with the slope at t = 1.7.',show(["click","#sv-fn [data-k=co]"],["#sv-k",0.4],["#sv-y0",9],["#sv-ta",1],["#sv-t",0]),'At t = 0 the gap T − Tₐ is 8 and the slope is −0.4(8) = −3.2. By t ≈ 1.7 the gap has about halved (to 4.05), and so has the slope (about −1.62). Hot coffee cools fastest at the start.')],
 [('Solve dy/dx = 2xy with y(0) = 3.',[
  '<b>Separate.</b> dy/y = 2x dx (valid for y ≠ 0).',
  '<b>Integrate both sides.</b> ln|y| = x² + C.',
  '<b>Solve for y.</b> |y| = e<sup>C</sup> e<sup>x²</sup>, so y = A e<sup>x²</sup> with A = ± e<sup>C</sup>.',
  '<b>Use y(0) = 3.</b> A·e⁰ = 3, so A = 3.',
  '<b>Answer.</b> y = <b>3e<sup>x²</sup></b>.'],_sv),
  {'h':'Worked example 2: a cooling cup of coffee','fig':_cof,'table':[['t (minutes)','0','5'],['T(t) (°C)','90','70']],
   'prob':'Coffee is poured into a room kept at 20 °C. Its temperature T (°C) after t minutes satisfies dT/dt = −k(T − 20) for a constant k &gt; 0, and a thermometer gives the readings in the table. (a) Solve for T(t). (b) Predict the temperature at t = 15. (c) When is the coffee 40 °C? (d) How fast is it cooling at t = 0, and when it is 40 °C?',
   'steps':['<b>(a) Separate and integrate.</b> dT/(T − 20) = −k dt, so ln|T − 20| = −kt + C and T = 20 + Ae<sup>−kt</sup>. At t = 0, 90 = 20 + A, so A = 70: <b>T = 20 + 70e<sup>−kt</sup></b>.',
    '<b>Find k from the second reading.</b> 70 = 20 + 70e<sup>−5k</sup> gives e<sup>−5k</sup> = 5/7, so k = (1/5) ln(7/5) ≈ <b>0.0673</b> per minute.',
    '<b>(b) t = 15.</b> e<sup>−15k</sup> = (5/7)³ = 125/343, so T(15) = 20 + 70(125/343) ≈ <b>45.5 °C</b>.',
    '<b>(c) 40 °C.</b> 20 + 70e<sup>−kt</sup> = 40 gives e<sup>−kt</sup> = 2/7, so t = ln(3.5)/k ≈ <b>18.6 minutes</b>.',
    '<b>(d) Rates.</b> dT/dt = −k(T − 20). At t = 0: −0.0673(70) ≈ <b>−4.71 °C/min</b>. At 40 °C: −0.0673(20) ≈ <b>−1.35 °C/min</b>. The coffee cools fastest when it is hottest, because the rate is proportional to the gap with the room.']}],
 ['Not separating completely: all y\'s (with dy) on one side, all x\'s (with dx) on the other.','Forgetting + C, or adding it on both sides.','Using the initial condition before including C.','Dividing by something that could be zero without noting the equilibrium solution.','Mixing up k signs: k &lt; 0 is decay.','In cooling problems, writing T = T₀e<sup>−kt</sup>: it is the gap T − Tₐ that decays, not T itself.'],
 ('Why exponentials',['If the rate of change is proportional to the amount, a bigger amount grows faster, which makes it even bigger: that feedback is the shape of e<sup>kt</sup>. Check any proposed solution by differentiating: if y = y₀e<sup>kt</sup> then dy/dt = k·y₀e<sup>kt</sup> = k y. ✓']),
 [('If dy/dt = −0.2y and y(0) = 50, then y(t) =',['50e<sup>−0.2t</sup>','50e<sup>0.2t</sup>','−0.2·50e<sup>t</sup>','50 − 0.2t'],0,'dy/dt = ky gives y = y₀e^{kt} with k = −0.2.')])

mod('avgval','Average value & motion with integrals',
 'The average of a function over an interval is the height of a rectangle with the same area. And for a moving particle, integrals tell you how far it went and how far it ended up.',
 ['The <b>average value</b> of f on [a, b] is <span class="m">f<sub>avg</sub> = (1/(b − a)) ∫<sub>a</sub><sup>b</sup> f(x) dx</span>: total accumulation divided by the length of the interval. A continuous function actually <i>equals</i> its average somewhere (the Mean Value Theorem for integrals).',
  'For a particle with velocity v(t): <b>displacement</b> (net change in position) is <span class="m">∫ v dt</span>, while <b>total distance</b> traveled is <span class="m">∫ |v| dt</span>. If v changes sign the two differ. And position is <span class="m">s(T) = s(0) + ∫<sub>0</sub><sup>T</sup> v dt</span>.'],
 ('an average was a sum over a count','an average over a continuous interval','average temperature, average velocity, and displacement vs distance','the average value of a function'),
 [('f<sub>avg</sub> = (1/(b−a)) ∫<sub>a</sub><sup>b</sup> f dx','average value'),('displacement = ∫ v dt · distance = ∫ |v| dt','particle motion'),('s(T) = s(0) + ∫₀ᵀ v dt','position')],
 [lab('av-lab','The rectangle with the same area',canvas='av-canvas',aria='A function on an interval with a horizontal line at its average value and a rectangle of equal area.',
   seg=('av-fn','Function',[('a','x²'),('b','sin x'),('c','eˣ'),('d','4x − x²')]),ctl=[('av-a','a',0,2,.1,0),('av-b','b',2.5,5,.1,3)],
   out=[('av-int','∫ f dx','x'),('av-avg','average value','v'),('av-c','where f equals its average','a')]),
  lab('av-lab2','Displacement vs distance',canvas='av-canvas2',aria='A velocity graph with the area up to time T shaded, positive and negative, and readouts of displacement, distance and position.',
   ctl=[('av-T','T',.1,5,.05,4)],pre='<p class="small" style="margin:0">v(t) = t² − 4t + 3 (m/s), starting position s(0) = 2 m.</p>',
   out=[('av-disp','displacement ∫₀ᵀ v dt','x'),('av-dist','total distance ∫₀ᵀ |v| dt','a'),('av-pos','position s(T)','v')])],
 [('On x² over [0, 3], find the average value and where f equals it. <button type="button" class="btn link" data-show=\'' + show(["click","#av-fn [data-k=a]"],["#av-a",0],["#av-b",3]) + '\'>Set it up for me</button>','' ,'∫₀³ x² dx = 9, so the average is 3. x² = 3 at x = √3 ≈ 1.73: the green dot where the curve crosses the average line.'),
  ('Set T = 3 on the motion graph. Compare displacement and distance. <button type="button" class="btn link" data-show=\'' + show(["#av-T",3]) + '\'>T = 3</button>','' ,'Displacement is 0 (the signed areas cancel): the particle ends where it started, s(3) = 2 m. But the distance is 4/3 + 4/3 = 8/3 m: it went forward, then back. Distance counts both trips.')],
 ('Find the average value of f(x) = x² on [0, 3], and the displacement and distance for v(t) = t² − 4t + 3 on [0, 3].',[
  '<b>Average value.</b> (1/3) ∫<sub>0</sub><sup>3</sup> x² dx = (1/3)(9) = 3.',
  '<b>Displacement.</b> ∫<sub>0</sub><sup>3</sup> (t² − 4t + 3) dt = [t³/3 − 2t² + 3t]<sub>0</sub><sup>3</sup> = 9 − 18 + 9 = 0.',
  '<b>Sign of v.</b> v = (t − 1)(t − 3): positive on [0, 1), negative on (1, 3).',
  '<b>Distance.</b> ∫<sub>0</sub><sup>1</sup> v dt = 4/3, and ∫<sub>1</sub><sup>3</sup> v dt = −4/3. Distance = 4/3 + 4/3 = 8/3.',
  '<b>Answer.</b> Average value <b>3</b>; displacement <b>0</b>; total distance <b>8/3 m</b>.']),
 ['Dividing by the wrong thing: divide by b − a, not by b or by 2.','Using ∫ v instead of ∫ |v| for distance.','Forgetting the starting position when finding position.','Averaging endpoint values (f(a) + f(b))/2 instead of integrating.','Not splitting the integral where v changes sign.'],
 ('Units',['Average value has the units of f. Displacement and distance have the units of v × t. If f is a rate, ∫ f is a total amount; dividing by the interval length gives the average rate.']),
 [('The average value of f(x) = 2x on [1, 3] is',['4','2','8','3'],0,'(1/2)∫₁³ 2x dx = (1/2)(9 − 1) = 4.')])

# ---- figures for Area between curves
_A = Plot((-.15, 1.25), (-.15, 1.25), (30, 10, 212, 200))
_ar = fig(_A.axes((1,), (1,), 'x', 'y') + _A.curve(lambda x: x, -.1, 1.2) + _A.curve(lambda x: x * x, -.1, 1.1, 'dd') + _A.text(.66, .86, 'y = x', 'f', 11, 'end') + _A.text(1.08, .78, 'y = x²', 'dd', 11, 'start'), [
    (1, _A.dot(0, 0, '', 'tan') + _A.dot(1, 1, '(1, 1)', 'tan', -22, -4), 'x = x² at 0 and 1', 'tan'),
    (2, _A.seg(.4, .16, .4, .4, 'tan', 4) + _A.text(.36, .5, 'top − bottom', 'tan', 11, 'end'), 'height x − x²', 'tan'),
    (3, _A.between(lambda x: x, lambda x: x * x, 0, 1), '∫₀¹ (x − x²) dx', 'area'),
    (4, _A.text(.6, .43, '1/6', 'ink', 13), 'area 1/6', 'ink')],
    'The region between the line (blue) and the parabola (pink). Every vertical slice has height top − bottom.', 230)
_C2 = Plot((-.4, 9.6), (-.6, 14.5), (32, 10, 210, 196))
_cyc = fig(_C2.axes((2, 4, 6, 8), (6, 12), 't', 'v'), [
    (1, _C2.curve(lambda t: 6, 0, 9.3) + _C2.curve(lambda t: 1.5 * t, 0, 9.3, 'dd') + _C2.text(9.3, 6.7, 'Ana 6', 'f', 11, 'end') + _C2.text(7.0, 12.4, 'Ben 1.5t', 'dd', 11, 'end'), 'gap rate 6 − 1.5t', 'ink'),
    (2, _C2.between(lambda t: 6, lambda t: 1.5 * t, 0, 4) + _C2.text(1.4, 4.2, '12 m', 'ink', 13), 'Ana ahead 12 m', 'area'),
    (3, _C2.dot(4, 6, 't = 4', 'tan', -18, -8), 'widest gap at t = 4', 'tan'),
    (4, _C2.between(lambda t: 1.5 * t, lambda t: 6, 4, 8, 'dd', .25) + _C2.text(6.5, 7.6, '12 m', 'ink', 13) + _C2.dot(8, 12, '', 'dd'), 'Ben gains 12 m: tied at 8', 'dd'),
    (5, '', 'total area 24 ≠ gap 0', 'ink')],
    'Velocities of Ana (blue) and Ben (pink). The area between the graphs is how far apart the riders get.', 230)

mod('area','Area between curves',
 'The region between two curves is made of thin slices. Top minus bottom, added up, gives the area.',
 ['Slice the region into vertical strips. Each has width dx and height <b>(top − bottom)</b>, so the area is <span class="m">∫<sub>a</sub><sup>b</sup> (f(x) − g(x)) dx</span> where f ≥ g. Find the limits by solving f(x) = g(x). If the curves cross, split the integral at each crossing so the height is always top minus bottom (never negative).',
  'Sometimes horizontal slices are easier: width dy and length <b>(right − left)</b>, giving <span class="m">∫<sub>c</sub><sup>d</sup> (x<sub>right</sub> − x<sub>left</sub>) dy</span>. Use them when the region is bounded by curves that are easy to write as x = h(y), or when top/bottom switch.'],
 ('the integral of f was the area under f','the area between two curves','the area enclosed by curves, the first step to volumes','area between curves, with vertical or horizontal slices'),
 [('A = ∫ (top − bottom) dx','vertical slices'),('A = ∫ (right − left) dy','horizontal slices'),('limits: where the curves meet','solve f(x) = g(x)')],
 [lab('ar-lab','Slice the region',canvas='ar-canvas',aria='The region between two curves shaded, with vertical rectangles of height top minus bottom, and one highlighted slice.',
   seg=('ar-fn','Curves',[('a','y = x and y = x²'),('b','y = √x and y = x²'),('c','y = x³ and y = x'),('d','sin x and cos x')]),
   ctl=[('ar-n','Slices n',0,40,1,8),('ar-x','Highlight the slice at x',0,1,'any',.5)],out=[('ar-lim','intersections','x'),('ar-h','top − bottom at x','a'),('ar-exact','exact area','v'),('ar-sum','sum of the slices','')])],
 [('Choose √x and x² and slice with n = 8. How close is the sum to the exact area?',show(["click","#ar-fn [data-k=b]"],["#ar-n",8]),'Close, a little off: the sum is a midpoint estimate. The exact area is 1/3. More slices give a better answer.'),
  ('Choose y = x³ and y = x. Which is on top, and why must you split the integral?',show(["click","#ar-fn [data-k=c]"],["#ar-n",0],["#ar-x",0.5]),'On (0, 1) the line y = x is on top; on (−1, 0) the cubic is. The curves cross at x = 0, so top and bottom swap there. Splitting (or using symmetry) keeps every height positive; the area is 1/2, but ∫₋₁¹ (x − x³) dx without splitting gives 0.'),
  ('Choose y = x and y = x². Slide the highlighted slice across. Where is it tallest?',show(["click","#ar-fn [data-k=a]"],["#ar-n",8],["#ar-x",0.5]),'At x = 0.5, where the height x − x² reaches 1/4. The area is the sum of all these heights times dx: ∫₀¹ (x − x²) dx = 1/6.'),
  ('Choose sin x and cos x with n = 40. What is the area between them from π/4 to 5π/4?',show(["click","#ar-fn [data-k=d]"],["#ar-n",40]),'2√2 ≈ 2.828: ∫ (sin x − cos x) dx = [−cos x − sin x] from π/4 to 5π/4 = √2 − (−√2).')],
 [('Find the area enclosed by y = x and y = x².',[
  '<b>Intersections.</b> x = x² ⇒ x = 0 or 1.',
  '<b>Top and bottom.</b> On (0, 1), x ≥ x², so top = x, bottom = x².',
  '<b>Integrate.</b> ∫<sub>0</sub><sup>1</sup> (x − x²) dx = [x²/2 − x³/3]<sub>0</sub><sup>1</sup>.',
  '<b>Answer.</b> 1/2 − 1/3 = <b>1/6</b>.'],_ar),
  {'h':'Worked example 2: two cyclists on a bike path','fig':_cyc,
   'prob':'Ana and Ben start side by side at t = 0. Ana rides at a steady 6 m/s. Ben starts from rest and speeds up, with velocity 1.5t m/s. (a) How far ahead is Ana at t = 4 seconds? (b) When does Ben catch up? (c) Find ∫<sub>0</sub><sup>8</sup> |6 − 1.5t| dt. Is it the distance between the riders at t = 8?',
   'steps':['<b>The gap grows at the difference of the velocities.</b> d/dt (gap) = 6 − 1.5t. It is positive until t = 4 (Ana is faster) and negative after (Ben is faster).',
    '<b>(a) Area between the velocity graphs.</b> Gap at t = 4: ∫<sub>0</sub><sup>4</sup> (6 − 1.5t) dt = [6t − 0.75t²]<sub>0</sub><sup>4</sup> = 24 − 12 = <b>12 m</b>.',
    '<b>Why t = 4 is the widest gap.</b> There the velocities are equal, so the gap\'s rate of change is 0. Before it Ana pulls away; after it Ben closes in.',
    '<b>(b) Catch up.</b> ∫<sub>0</sub><sup>T</sup> (6 − 1.5t) dt = 6T − 0.75T² = 0 gives T = 0 or <b>T = 8 s</b>. Ben\'s pink region has exactly cancelled Ana\'s gold one.',
    '<b>(c) Total area.</b> 12 + 12 = <b>24 m</b>. It is not the gap (the riders are side by side at t = 8). The area between curves counts both pieces as positive; the net change ∫(6 − 1.5t) dt lets them cancel. Read which one the question asks for.']}],
 ['Subtracting in the wrong order, giving a negative area. Use top − bottom.','Using the wrong limits: find intersections by setting the functions equal.','Not splitting at crossings when top and bottom switch.','Integrating x² − x as if it were the area under one curve minus a number.','Using dx slices when horizontal slices would avoid splitting.','In context, confusing the total area between two rate graphs with the net change (which can cancel).'],
 ('Vertical or horizontal?',['Vertical slices (dx): integrand top − bottom as a function of x. Horizontal slices (dy): integrand right − left as a function of y, so you must write each boundary as x = h(y). Choose the one where the boundary does not change formulas partway through.']),
 [('The area between y = 4 and y = x² from x = −2 to 2 is',['∫<sub>−2</sub><sup>2</sup> (4 − x²) dx','∫<sub>−2</sub><sup>2</sup> (x² − 4) dx','∫<sub>0</sub><sup>4</sup> (4 − x²) dx','∫<sub>−2</sub><sup>2</sup> 4x² dx'],0,'On [−2, 2] the line y = 4 is on top, so integrate top − bottom = 4 − x².')])

# ---- figures for Volumes from cross sections
_W = Plot((-.08, 1.12), (-.08, 1.12), (24, 48, 180, 172))
def _sqslice(x, c='area', op=.35, dash=''):
    a, b = _W.Y(x * x), _W.Y(x); L = a - b; o = .55 * L
    return poly([(_W.X(x), a), (_W.X(x), b), (_W.X(x) + o, b - o), (_W.X(x) + o, a - o)], c, op, 'tan' if not dash else 'mut', 1.6, dash)
_vo = fig(_W.axes((1,), (1,), 'x', 'y') + _W.curve(lambda x: x, 0, 1.08) + _W.curve(lambda x: x * x, 0, 1.04, 'dd'), [
    (1, _W.between(lambda x: x, lambda x: x * x, 0, 1, 'area', .2) + _W.text(.95, .62, 'base', 'mut', 10, 'start', 500), 'base: x² to x', 'area'),
    (2, _W.seg(.5, .25, .5, .5, 'tan', 3.5) + _W.text(.46, .36, 's', 'tan', 13, 'end'), 's = x − x²', 'tan'),
    (3, _sqslice(.5), 'A = s² = (x − x²)²', 'area'),
    (4, _sqslice(.25, 'area', .12, '3 3') + _sqslice(.75, 'area', .12, '3 3'), '∫₀¹ (x² − 2x³ + x⁴) dx', 'ink'),
    (5, '', 'V = 1/30', 'ink')],
    'The base region seen from above. Each square slice stands straight up out of the page on the segment s.', 230)
_py_base = (ln(20, 205, 240, 205, 'mut', 1.5) + poly([(38, 205), (222, 205), (130, 87.4)], 'area', .12, 'ink', 2.2)
            + txt(130, 222, '230 m', 'ink', 11) + ln(130, 205, 130, 87.4, 'mut', 1, '3 3') + txt(126, 135, '147 m', 'mut', 10, 'end', 500))
_pyr = fig(_py_base, [
    (1, rect(75.6, 154.5, 108.8, 5, 'tan', .5, 'tan', 1.5) + txt(130, 150, 's = 230(1 − y/147)', 'tan', 10.5) + arr(24, 205, 24, 157, 'mut', '', 1.4) + txt(28, 182, 'y', 'mut', 12, 'start'), 'side shrinks linearly', 'tan'),
    (2, '', 'A(y) = 230²(1 − y/147)²', 'area'),
    (3, '', 'V = 230²·147/3', 'ink'),
    (4, rect(38, 87.4, 184, 117.6, 'mut', 0, 'mut', 1.2) , 'box: 3 times bigger', 'ink'),
    (5, poly([(38, 205), (222, 205), (203, 180.7), (57, 180.7)], 'f', .3) + txt(225, 184, 'half', 'f', 10, 'start'), 'half below 30.3 m', 'f')],
    'Side view, drawn to scale. Every horizontal slice is a square; the shaded band at the bottom holds half the stone.', 230)

mod('vols','Volumes from cross sections',
 'Stack thin slices of a known shape along an axis, and add up their volumes. A slice with area A(x) and thickness dx has volume A(x) dx.',
 ['A solid is built on a base region in the xy-plane. Cut it by planes perpendicular to the x-axis: each cut is a shape (a square, a semicircle, an equilateral triangle, a rectangle) whose size depends on the <b>base length s(x) = top − bottom</b>. Compute its area A(x), and the volume is <span class="m">V = ∫<sub>a</sub><sup>b</sup> A(x) dx</span>.',
  'Areas to know, with s the base length: <b>square</b> A = s²; <b>semicircle</b> A = (π/8)s² (the diameter is s); <b>equilateral triangle</b> A = (√3/4)s²; <b>rectangle of height h</b> A = h·s; <b>isosceles right triangle with leg s</b> A = s²/2. The hard part is only getting s(x) right.'],
 ('integrals measured area in the plane','a volume as an integral of areas','solids that are not made by rotation','volumes of solids with known cross sections'),
 [('V = ∫ A(x) dx','volume from cross sections'),('square: A = s² · semicircle: A = πs²/8','s = top − bottom'),('equilateral triangle: A = (√3/4)s²','')],
 [lab('vo-lab','Stack the slices',canvas='vo-canvas',aria='Left: the base region with a vertical line at x and the base length s. Right: the area of the cross section at each x, with the volume as the shaded area.',
   seg=('vo-sh','Cross-section shape',[('sq','Squares'),('se','Semicircles'),('tr','Equilateral triangles')]),pre='<p class="small" style="margin:0">Base: the region between y = x² and y = x on [0, 1], so the base length is s(x) = x − x².</p>',
   ctl=[('vo-x','Position x',.05,.95,.01,.5)],out=[('vo-s','base length s(x)','x'),('vo-A','area A(x) of the slice','v'),('vo-V','volume V = ∫ A dx','a')])],
 [('Choose squares. Where is the slice largest?',show(["click","#vo-sh [data-k=sq]"],["#vo-x",0.5]),'At x = 0.5: s = 0.25 is the longest base, so the square slice is largest there. V = ∫(x − x²)² dx = 1/30.'),
  ('Switch to semicircles. How does the volume compare with squares?',show(["click","#vo-sh [data-k=se]"],["#vo-x",0.5]),'π/8 ≈ 0.39 of the square volume (about 0.0131): a semicircle with diameter s covers π/8 of the square of side s.'),
  ('Switch to equilateral triangles. Predict the volume before you look.',show(["click","#vo-sh [data-k=tr]"],["#vo-x",0.5]),'(√3/4)(1/30) ≈ 0.0144: every slice is √3/4 ≈ 0.433 of the square on the same base, so the whole volume is too.'),
  ('Compare the slices at x = 0.1 and x = 0.9.',show(["click","#vo-sh [data-k=sq]"],["#vo-x",0.1]),'Both have s = 0.09: x − x² is symmetric about x = 0.5, so the solid is too. Area A(x) only depends on the base length, not on where the slice sits.')],
 [('The base of a solid is the region between y = x² and y = x. Cross sections perpendicular to the x-axis are squares. Find the volume.',[
  '<b>Base length.</b> s(x) = x − x² on [0, 1].',
  '<b>Area of a square slice.</b> A(x) = s² = (x − x²)² = x² − 2x³ + x⁴.',
  '<b>Integrate.</b> V = ∫<sub>0</sub><sup>1</sup> (x² − 2x³ + x⁴) dx = 1/3 − 1/2 + 1/5.',
  '<b>Stack them.</b> Every thin square of area A(x) and thickness dx contributes A(x) dx; the integral adds them up.',
  '<b>Answer.</b> <b>1/30</b> ≈ 0.0333.'],_vo),
  {'h':'Worked example 2: the Great Pyramid','fig':_pyr,
   'prob':'The Great Pyramid of Giza had a square base about 230 m on a side and was about 147 m tall. (a) Using horizontal square cross sections, find its volume. (b) Compare it with a box that has the same base and height. (c) At what height is half of the pyramid\'s volume below you?',
   'steps':['<b>Slice horizontally.</b> At height y (in m), the cross section is a square whose side shrinks in a straight line from 230 at the base to 0 at the top: s(y) = 230(1 − y/147).',
    '<b>Area of a slice.</b> A(y) = s(y)² = 230²(1 − y/147)².',
    '<b>(a) Integrate.</b> V = ∫<sub>0</sub><sup>147</sup> 230²(1 − y/147)² dy. With u = 1 − y/147 (dy = −147 du) this is 230²·147·∫<sub>0</sub><sup>1</sup> u² du = 230²·147/3 = <b>2,592,100 m³</b>, about 2.6 million cubic meters.',
    '<b>(b) Compare.</b> The box is 230²·147 = 7,776,300 m³, so the pyramid is exactly <b>1/3</b> of it. That is where V = (1/3)(base area)(height) for every pyramid and cone comes from.',
    '<b>(c) Half the volume.</b> Above height y sits a smaller pyramid scaled by (1 − y/147), with volume V(1 − y/147)³. Set it to V/2: 1 − y/147 = 2<sup>−1/3</sup>, so y = 147(1 − 2<sup>−1/3</sup>) ≈ <b>30.3 m</b>. Half of all the stone is in the bottom fifth of the height.']}],
 ['Using the wrong base length: it is top − bottom, not just one function.','Squaring after integrating instead of before: A(x) must be squared first.','Using the radius instead of the diameter for a semicircle (the diameter is s).','Forgetting the constant in the area formula (π/8, √3/4).','Mixing dx and dy slices: the slice direction decides which variable you integrate.'],
 ('Derivations of the area formulas',['Semicircle with diameter s: radius s/2, area (1/2)π(s/2)² = πs²/8. Equilateral triangle with side s: area (1/2)·s·(√3/2)s = (√3/4)s². Square: s². Keep these in your head: they are the whole difficulty in most cross-section problems.']),
 [('A semicircular cross section has diameter s(x). Its area is',['πs²/8','πs²/4','πs²/2','s²'],0,'Radius s/2, area half of π(s/2)² = πs²/8.')])

# ---- figures for Volumes of revolution
import math as _m
_V = Plot((-.35, 4.5), (-3.2, 2.6), (30, 10, 215, 200))
_sqrt = lambda x: _m.sqrt(max(x, 0))
_vr = fig(_V.axes((1, 2, 4), (1, 2), 'x', 'y') + _V.under(_sqrt, 0, 4) + _V.curve(_sqrt, 0, 4), [
    (1, _V.under(lambda x: -_sqrt(x), 0, 4, 'area', .12) + _V.curve(lambda x: -_sqrt(x), 0, 4, 'f', 1.6, '4 3') + _V.seg(1, -1, 1, 1, 'tan', 4) + _V.text(1.12, .45, 'R = √x', 'tan', 11, 'start'), 'disc area π(√x)² = πx', 'tan'),
    (2, _V.seg(-.3, -1, 4.4, -1, 'ink', 1.6, '6 4') + _V.text(4.4, -1.35, 'y = −1', 'ink', 10, 'end', 500) + _V.seg(3.1, -1, 3.1, _sqrt(3.1), 'tan', 3) + _V.seg(3.35, -1, 3.35, 0, 'dd', 3)
        + _V.text(3.0, .5, 'R', 'tan', 13, 'end') + _V.text(3.45, -.6, 'r', 'dd', 13, 'start'), 'R = √x + 1, r = 1', 'tan'),
    (3, '', 'π∫₀⁴ (x + 2√x) dx', 'area'),
    (4, '', 'π(8 + 32/3)', 'ink'),
    (5, '', '8π and 56π/3', 'ink')],
    'The region under y = √x (gold). Step 1 spins it about the x-axis; step 2 about the dashed line y = −1, which leaves a hole.', 230)
_B = Plot((-7.4, 7.4), (-.6, 10.4), (18, 12, 224, 166))
_par = lambda x: x * x / 4
_hh = 9 / _m.sqrt(2)
_bowl = fig(_B.seg(0, -.5, 0, 10.3, 'mut', 1.2, '5 4') + _B.text(.3, 10, 'axis', 'mut', 10, 'start', 500) + _B.seg(-6, 9, 6, 9, 'mut', 1.2, '3 3') + _B.curve(_par, -6.2, 6.2, 'ink', 3.2)
            + _B.text(-6.4, 9.3, 'rim', 'mut', 10, 'end', 500), [
    (1, ell(_B.X(0), _B.Y(4), _B.X(4) - _B.X(0), 6, 'tan', .25, 'tan', 2) + _B.seg(0, 4, 4, 4, 'tan', 2) + _B.text(2, 4.6, 'x = 2√y', 'tan', 11), 'disc radius 2√y, area 4πy', 'tan'),
    (2, poly(_B.pts(_par, -6, 6), 'area', .22), 'V(h) = 2πh², full = 162π', 'area'),
    (3, poly(_B.pts(_par, -_m.sqrt(4 * _hh), _m.sqrt(4 * _hh)), 'f', .25) + _B.seg(-6.6, _hh, 6.6, _hh, 'f', 1.6, '4 3') + txt(130, 200, 'half the volume at h ≈ 6.36 cm', 'f', 11), 'half full at h ≈ 6.36', 'f'),
    (4, arr(_B.X(-3.4), _B.Y(4.1), _B.X(-3.4), _B.Y(5.9), 'd') + _B.text(-4.0, 6.6, 'dh/dt', 'd', 11, 'middle'), 'dh/dt = 20/(16π) ≈ 0.398', 'd'),
    (5, '', '508.9 cm³ · 6.36 cm · 0.398 cm/s', 'ink')],
    'Side view of the bowl, drawn to scale. Every horizontal slice is a disc centered on the axis.', 210)

mod('volrev','Volumes of revolution',
 'Spin a region around an axis and it sweeps out a solid. Each slice is a disc (or a ring, called a washer), and its area is π × radius².',
 ['Slice the solid perpendicular to the axis of revolution. A slice through a region that touches the axis is a <b>disc</b> of radius R(x), area πR². If the region has a gap between it and the axis, the slice is a <b>washer</b>: outer radius R, inner radius r, area <span class="m">π(R² − r²)</span>. The volume is <span class="m">V = π ∫<sub>a</sub><sup>b</sup> (R(x)² − r(x)²) dx</span>.',
  'Radii are distances from the axis. If you revolve around <span class="m">y = c</span>, then R = (top − c) and r = (bottom − c). Square <i>the distance</i>, not the function: (f − g)² is not R² − r².'],
 ('cross sections of any known shape','a particular family: all slices are circles or rings','tanks, domes, bottles and every spun shape','the disc and washer methods'),
 [('V = π ∫ R² dx','disc'),('V = π ∫ (R² − r²) dx','washer, R outer, r inner'),('R = distance from the axis','axis y = c: R = f − c')],
 [lab('vr-lab','Spin the region',canvas='vr-canvas',aria='The region and its mirror image across the axis of revolution, with slices drawn as vertical segments, and an end view of the washer at a chosen x.',
   seg=('vr-fn','Region and axis',[('a','y = √x, about the x-axis, [0, 4]'),('b','between y = √x and y = x², about the x-axis'),('c','y = √x about y = −1, [0, 4]')]),
   ctl=[('vr-x','Slice at x',.05,3.9,.05,1),('vr-c','Axis of revolution y = c',-2,0,.1,0)],out=[('vr-ro','outer radius R','x'),('vr-ri','inner radius r','a'),('vr-V','volume','v')])],
 [('Choose the first region. What shape is each slice, and what is its radius at x = 1?',show(["click","#vr-fn [data-k=a]"],["#vr-x",1]),'A disc with radius √1 = 1, area π. V = π∫₀⁴ x dx = 8π ≈ 25.13.'),
  ('Choose the region between √x and x². What is the slice now?',show(["click","#vr-fn [data-k=b]"],["#vr-x",0.5]),'A washer: outer radius √x, inner radius x². At x = 0.5 that is R ≈ 0.707 and r = 0.25. V = π∫₀¹ (x − x⁴) dx = 3π/10 ≈ 0.942.'),
  ('Back to the first region. Move the axis down to y = −1. What happens to each slice?',show(["click","#vr-fn [data-k=a]"],["#vr-c",-1],["#vr-x",1]),'Each slice gets a hole of radius 1 (the gap between the axis and the x-axis), and the outer radius grows to √x + 1. V = π(8 + 32/3) = 56π/3 ≈ 58.64.'),
  ('Now move the axis to y = −2. The region is the same. Why is the volume bigger?',show(["click","#vr-fn [data-k=a]"],["#vr-c",-2],["#vr-x",1]),'V = π(8 + 64/3) = 88π/3 ≈ 92.15. The region is farther from the axis, so every point travels around a bigger circle: the washers get wider rings, even though the hole grows too.')],
 [('Find the volume when the region under y = √x on [0, 4] is revolved about the x-axis, then about y = −1.',[
  '<b>About the x-axis (discs).</b> R = √x, so V = π ∫<sub>0</sub><sup>4</sup> x dx = π(8) = 8π.',
  '<b>About y = −1 (washers).</b> The axis is 1 unit below the x-axis: R = √x + 1, r = 1 (the x-axis is 1 above the axis).',
  '<b>Set up.</b> V = π ∫<sub>0</sub><sup>4</sup> [(√x + 1)² − 1²] dx = π ∫<sub>0</sub><sup>4</sup> (x + 2√x) dx.',
  '<b>Integrate.</b> π [x²/2 + (4/3)x<sup>3/2</sup>]<sub>0</sub><sup>4</sup> = π(8 + 32/3).',
  '<b>Answer.</b> About x-axis: <b>8π</b>. About y = −1: <b>56π/3</b>.'],_vr),
  {'h':'Worked example 2: filling a bowl','fig':_bowl,
   'prob':'The inside of a bowl is the curve y = x²/4 revolved about the y-axis (x and y in cm), and the bowl is 9 cm deep. (a) How much does the bowl hold? (b) How deep is the water when the bowl holds half that much? (c) Water is poured in at 20 cm³/s. How fast is the water level rising when the water is 4 cm deep?',
   'steps':['<b>Slice across the axis.</b> The axis is vertical, so slice horizontally. At height y the slice is a disc of radius x, where y = x²/4 gives x² = 4y. Its area is πx² = <b>4πy</b>.',
    '<b>(a) Add up the discs.</b> Water to depth h has volume V(h) = ∫<sub>0</sub><sup>h</sup> 4πy dy = 2πh². Full: V(9) = 2π(81) = <b>162π ≈ 508.9 cm³</b>.',
    '<b>(b) Half full.</b> 2πh² = 81π gives h² = 40.5, h = 9/√2 ≈ <b>6.36 cm</b>. Half the volume sits in the top 29% of the depth, because the bowl is widest there.',
    '<b>(c) Related rate.</b> Differentiate V = 2πh² in t: dV/dt = 4πh·dh/dt. With dV/dt = 20 and h = 4: dh/dt = 20/(16π) ≈ <b>0.398 cm/s</b>. (4πh is the area of the water\'s surface: the rise is the inflow spread over the surface.)',
    '<b>Answers.</b> (a) 162π ≈ 508.9 cm³, (b) about 6.36 cm, (c) about 0.398 cm/s, and it slows as the surface widens.']}],
 ['Squaring the difference of functions: (f − g)² is not f² − g².','Forgetting π.','Measuring radii from the x-axis when the axis of revolution is a different line.','Using a disc when there is a gap (it should be a washer).','Mixing up outer and inner radius.','Revolving about the y-axis but still slicing in x: slices must be perpendicular to the axis, so integrate in y.'],
 ('Which method?',['If the slices perpendicular to the axis are full circles, use discs. If they have a hole, use washers. In AB you slice perpendicular to the axis of revolution (discs and washers); the shell method is not part of the course.']),
 [('Revolving the region under y = x on [0, 2] about the x-axis gives volume',['π ∫₀² x² dx','π ∫₀² x dx','2π ∫₀² x dx','∫₀² x² dx'],0,'Discs of radius R = x: π R² = πx².')])
