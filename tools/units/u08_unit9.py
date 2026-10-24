# ---- figures for parametric equations
import math
_PMx = lambda t: t * t
_PMy = lambda t: t ** 3 - 3 * t
_PM = Plot((-.6, 5), (-3.6, 3.6), (30, 12, 215, 196))
def _pmcurve(a, b, c='f', w=2.8, k=120): return pline([(_PM.X(_PMx(a + (b - a) * i / k)), _PM.Y(_PMy(a + (b - a) * i / k))) for i in range(k + 1)], c, w)
_pmfig = fig(_PM.axes((1, 2, 3, 4), (-2, 2), 'x', 'y') + _pmcurve(-2.1, 2.1), [
    (1, _PM.dot(0, 0, 't = 0', 'ink', 12, -8, 3.5) + _PM.text(2.7, -2.9, 'dx/dt = 2t, dy/dt = 3t² − 3', 'ink', 10, 'middle'), 'dx/dt = 2t · dy/dt = 3t² − 3', 'ink'),
    (2, _PM.dot(4, 2, 't = 2', 'tan', 10, 16, 4.5) + _PM.seg(2.8, 2 - 1.2 * 2.25, 5, 2 + 1 * 2.25, 'tan', 2.6) + _PM.text(3.6, 3.1, 'slope 9/4', 'tan', 10, 'end'), 'slope at t = 2 is 9/4', 'tan'),
    (3, '', 'd²y/dx² = 15/32 > 0 at t = 2: bending up', 'd'),
    (4, _PM.seg(.4, 2, 1.7, 2, 'd', 2.4) + _PM.seg(.4, -2, 1.7, -2, 'd', 2.4) + _PM.dot(1, 2, '(1, 2)', 'd', 22, -8, 4.5) + _PM.dot(1, -2, '(1, −2)', 'd', 24, 14, 4.5), 'dy/dt = 0 at t = ±1: horizontal tangents', 'd'),
    (5, '', 'slope 9/4 · 15/32 · (1, ±2)', 'ink')],
    'The curve x = t², y = t³ − 3t loops once through the origin; it has horizontal tangents at the points (1, 2) and (1, −2), and the slope at t = 2 is 9/4.', 230)

mod('param','Parametric equations',
 'Instead of y as a function of x, let both depend on time t. The curve is the path of a moving point, and slopes come from the chain rule.',
 ['A <b>parametric curve</b> is a pair <span class="m">x = x(t), y = y(t)</span>. As t increases the point <span class="m">(x, y)</span> traces a path, which can loop, double back and cross itself, none of which a function y = f(x) can do. Eliminating t sometimes gives a familiar curve (a circle, an ellipse), but the parametrization also records the direction and speed of travel.',
  'The slope comes from the chain rule: <span class="m">dy/dx = (dy/dt)/(dx/dt)</span>, valid where dx/dt ≠ 0. A <b>horizontal tangent</b> happens where dy/dt = 0 (and dx/dt ≠ 0), a <b>vertical tangent</b> where dx/dt = 0 (and dy/dt ≠ 0). The second derivative is <span class="m">d²y/dx² = (d/dt(dy/dx))/(dx/dt)</span>. The arc length is <span class="m">∫ √((dx/dt)² + (dy/dt)²) dt</span>.'],
 ('curves were graphs of functions y = f(x)','a way to describe any path, with direction and speed','circles, orbits, projectiles, cycloids','parametric equations and their derivatives'),
 [('dy/dx = (dy/dt)/(dx/dt)','slope'),('d²y/dx² = [d/dt(dy/dx)] / (dx/dt)','concavity'),('length = ∫ √(x′² + y′²) dt','arc length')],
 [lab('pm-lab','Follow the moving point',canvas='pm-canvas',aria='A parametric curve with a moving point, its tangent line and velocity vector.',
   seg=('pm-fn','Curve',[('el','ellipse'),('cy','cycloid'),('li','figure eight'),('pa','parabola')]),ctl=[('pm-t','Parameter t',0,12.5,.02,1)],
   out=[('pm-xy','point (x, y)','x'),('pm-v','(dx/dt, dy/dt)','a'),('pm-sl','dy/dx','v'),('pm-d2','d²y/dx²',''),('pm-note','tangent','')])],
 [('On the ellipse, find t where the tangent is horizontal. <button type="button" class="btn link" data-show=\'' + show(["click","#pm-fn [data-k=el]"],["#pm-t",1.5708]) + '\'>t = π/2</button>','' ,'At t = π/2, dy/dt = 2cos t = 0 while dx/dt = −3 sin t ≠ 0: the top of the ellipse, a horizontal tangent.'),
  ('On the cycloid, put t at 2π. What is happening to the slope? <button type="button" class="btn link" data-show=\'' + show(["click","#pm-fn [data-k=cy]"],["#pm-t",6.2832]) + '\'>t = 2π</button>','' ,'Both dx/dt = 1 − cos t and dy/dt = sin t are 0: a cusp, where the wheel point touches down. The slope is not defined there.'),
  ('On the parabola x = t, y = t² − 2t, put t = 1. What is dy/dx?',show(["click","#pm-fn [data-k=pa]"],["#pm-t",1]),'dy/dt = 2t − 2 = 0 and dx/dt = 1, so dy/dx = 0: a horizontal tangent at the vertex (1, −1). For this curve dy/dx = 2t − 2 is just the ordinary derivative of y = x² − 2x.'),
  ('On the figure eight (x = cos t, y = sin 2t), put t = π/4 ≈ 0.785. What is the slope?',show(["click","#pm-fn [data-k=li]"],["#pm-t",0.7854]),'dy/dt = 2cos(2t) = 0 at t = π/4 while dx/dt = −sin t ≠ 0: a horizontal tangent at the top of the right loop, (0.707, 1).'),
  ('On the figure eight, put t = 0. Why does the tangent look vertical?',show(["click","#pm-fn [data-k=li]"],["#pm-t",0]),'At t = 0 the point is (1, 0). dx/dt = −sin 0 = 0 and dy/dt = 2cos 0 = 2, so the velocity is straight up: a vertical tangent, and dy/dx is not defined there.')],
 ('For x = t² and y = t³ − 3t, find dy/dx and d²y/dx² at t = 2, and the points of horizontal tangent.',[
  '<b>Rates.</b> dx/dt = 2t, dy/dt = 3t² − 3.',
  '<b>Slope.</b> dy/dx = (3t² − 3)/(2t). At t = 2: 9/4.',
  '<b>Second derivative.</b> d/dt(dy/dx) = d/dt[(3/2)t − (3/2)/t] = 3/2 + (3/2)/t². Divide by dx/dt = 2t: at t = 2 that is (3/2 + 3/8)/4 = 15/32.',
  '<b>Horizontal tangents.</b> dy/dt = 0 at t = ±1 (dx/dt = ±2 ≠ 0): the points (1, −2) and (1, 2).',
  '<b>Answer.</b> dy/dx = <b>9/4</b>, d²y/dx² = <b>15/32</b>; horizontal tangents at <b>(1, −2)</b> and <b>(1, 2)</b>.'],_pmfig),
 ['Differentiating dy/dx = (dy/dt)/(dx/dt) with respect to t and forgetting to divide by dx/dt again for the second derivative.','Writing dy/dx = dx/dt ÷ dy/dt (upside down).','Calling a point with dx/dt = dy/dt = 0 a tangent: check, it may be a cusp.','Forgetting that t is time, not the x-coordinate.','Using speed formula without the square root.'],
 ('Speed and direction',['The velocity vector is ⟨dx/dt, dy/dt⟩ and always points along the tangent in the direction of travel. The speed is its magnitude √((dx/dt)² + (dy/dt)²). The distance traveled is the integral of speed, which is the arc length formula.']),
 [('For x = 2t, y = t², dy/dx at t = 3 is',['3','6','1/3','2'],0,'(dy/dt)/(dx/dt) = 2t/2 = t = 3.')])

# ---- figures for vector-valued motion and polar curves
_VC = Plot((-.6, 5.2), (-3.6, 5.4), (30, 12, 215, 196))
_vcx = lambda t: t * t
_vcy = lambda t: t ** 3 - 3 * t
_vcfig = fig(_VC.axes((1, 2, 3, 4, 5), (-2, 2, 4), 'x', 'y') + pline([(_VC.X(_vcx(-2.1 + 4.2 * i / 120)), _VC.Y(_vcy(-2.1 + 4.2 * i / 120))) for i in range(121)], 'f', 2.8) + _VC.dot(4, 2, '', 'ink', 0, -9, 4.5) + _VC.text(4.2, 1.3, 't = 2', 'ink', 10.5, 'start'), [
    (1, arr(_VC.X(4), _VC.Y(2), _VC.X(4.8), _VC.Y(3.8), 'd', '', 3) + _VC.text(3.75, 3.5, 'v = ⟨4, 9⟩', 'd', 11, 'end'), 'v(2) = ⟨4, 9⟩ along the path', 'd'),
    (2, _VC.text(3.75, 2.85, '|v| ≈ 9.85', 'd', 10.5, 'end'), 'speed √97 ≈ 9.849', 'd'),
    (3, arr(_VC.X(4), _VC.Y(2), _VC.X(4.4), _VC.Y(4.4), 'dd', '', 3) + _VC.text(3.75, 4.6, 'a = ⟨2, 12⟩', 'dd', 11, 'end'), 'a(2) = ⟨2, 12⟩', 'dd'),
    (4, '', 'v · a = 116 > 0: speeding up', 'tan'),
    (5, '', 'v ⟨4, 9⟩ · √97 · a ⟨2, 12⟩', 'ink')],
    'The path r(t) = ⟨t², t³ − 3t⟩ with the velocity (green) and acceleration (pink) at t = 2, both drawn at one fifth of their length. The velocity is tangent to the path; the acceleration points to where the path is bending.', 230)

_PO = Plot((-2.6, 9.2), (-5.4, 5.4), (30, 12, 215, 196))
import math as _pm
_pof = lambda th, K=1: K * (1 + _pm.cos(th))
def _porg(P, K, a, b, c, op, k=120):
    pts = [(P.X(0), P.Y(0))] + [(P.X(_pof(a + (b - a) * i / k, K) * _pm.cos(a + (b - a) * i / k)), P.Y(_pof(a + (b - a) * i / k, K) * _pm.sin(a + (b - a) * i / k))) for i in range(k + 1)]
    return poly(pts, c, op)
_pocur = lambda P, K, c='f', w=2.8: pline([(P.X(_pof(2 * _pm.pi * i / 200, K) * _pm.cos(2 * _pm.pi * i / 200)), P.Y(_pof(2 * _pm.pi * i / 200, K) * _pm.sin(2 * _pm.pi * i / 200))) for i in range(201)], c, w)
_PC = Plot((-1.5, 2.6), (-1.7, 1.7), (30, 12, 215, 196))
_pofig = fig(_PC.axes((1, 2), (-1, 1), 'x', 'y') + _pocur(_PC, 1), [
    (1, _porg(_PC, 1, .9, 1.1, 'tan', .6) + _PC.seg(0, 0, _pof(1) * _pm.cos(1), _pof(1) * _pm.sin(1), 'tan', 1.6) + _PC.text(2.55, 1.5, 'a thin slice: ½r² dθ', 'tan', 10.5, 'end') , 'slice area ½r² dθ, r = 1 + cos θ', 'tan'),
    (2, '', '(1 + cos θ)² = 3/2 + 2cos θ + ½cos 2θ', 'ink'),
    (3, _porg(_PC, 1, 0, 2 * _pm.pi, 'area', .32) + _PC.text(.7, .5, '3π/2', 'ink', 13), '∫ from 0 to 2π gives 3π', 'area'),
    (4, '', 'A = ½ · 3π = 3π/2 ≈ 4.712', 'ink')],
    'Sweeping θ from 0 to 2π, the thin sectors add up to the whole cardioid.', 230)
_pomic = fig(_PO.axes((2, 4, 6, 8), (-4, 4), 'ft', 'ft') + _pocur(_PO, 4), [
    (1, _porg(_PO, 4, 0, 2 * _pm.pi, 'area', .3) + _PO.text(3.6, 2.4, '24π ≈ 75.4 ft²', 'ink', 11), 'whole region 24π ft²', 'area'),
    (2, _PO.seg(0, 0, 8, 0, 'tan', 2, '5 4') + _PO.seg(0, 0, 0, 4, 'tan', 2, '5 4') + _PO.dot(8, 0, '', 'tan') + _PO.text(7.8, 1, 'r = 8', 'tan', 10.5, 'end') + _PO.dot(0, 4, 'r = 4', 'tan', 22, 4) + _PO.dot(0, 0, '', 'dd') + _PO.text(-2.5, 1.2, 'r = 0 behind', 'dd', 10.5, 'start'), 'reach: 8 ft ahead, 4 at the side, 0 behind', 'tan'),
    (3, _porg(_PO, 4, _pm.pi / 2, 3 * _pm.pi / 2, 'dd', .5) + _PO.text(-2.5, -2.4, 'rear 5.7 ft²', 'dd', 10.5, 'start'), 'rear half: 12π − 32 ≈ 5.70 ft²', 'dd'),
    (4, '', '5.70 / 75.40 ≈ 7.6% of the area', 'ink')],
    'The microphone sits at the origin facing right. Gold: the whole pickup region. Pink: the half behind the microphone (π/2 ≤ θ ≤ 3π/2), tiny by comparison.', 230)

mod('vector','Vector-valued functions & motion',
 'A particle moving in the plane has a position vector, a velocity vector and an acceleration vector. Each is the derivative of the one before.',
 ['Write the position as <span class="m">r(t) = ⟨x(t), y(t)⟩</span>. Then the <b>velocity</b> is <span class="m">v(t) = ⟨x′(t), y′(t)⟩</span> (tangent to the path) and the <b>acceleration</b> is <span class="m">a(t) = ⟨x″(t), y″(t)⟩</span>. The <b>speed</b> is |v| = √(x′² + y′²), and the distance traveled from t = a to t = b is <span class="m">∫ |v| dt</span>.',
  'Integrate component by component to go backwards: position = initial position + ∫ velocity. The particle speeds up when the acceleration has a positive component along the velocity (v · a &gt; 0) and slows down when v · a &lt; 0. Uniform circular motion has constant speed but nonzero acceleration (pointing to the center): the velocity direction keeps changing.'],
 ('motion on a line, one number for position','motion in the plane with two components','projectiles, orbits and any path','vector-valued functions and planar motion'),
 [('v = r′ = ⟨x′, y′⟩ · a = v′','velocity, acceleration'),('speed = √(x′² + y′²)','|v|'),('distance = ∫ |v| dt','speeding up if v · a > 0')],
 [lab('vc-lab','Position, velocity, acceleration',canvas='vc-canvas',aria='A particle moving along a path in the plane, with its velocity vector (green) and acceleration vector (pink).',
   seg=('vc-fn','Motion',[('ci','circle'),('pr','projectile'),('sp','spiral')]),ctl=[('vc-t','Time t',0,6.3,.02,1)],pre='<div class="row"><button type="button" class="btn" id="vc-play">Play</button></div>',
   out=[('vc-r','position','x'),('vc-vel','velocity v and speed','v'),('vc-acc','acceleration a','a'),('vc-state','speed is','')])],
 [('On circle motion, compare the speed at different t. Is it constant? What about acceleration? <button type="button" class="btn link" data-show=\'' + show(["click","#vc-fn [data-k=ci]"],["#vc-t",2]) + '\'>Set it up for me</button>','' ,'The speed is constant (2), but the acceleration is not zero and points to the center: the particle is always turning. Velocity changes direction even when speed does not.'),
  ('On the projectile, find when the acceleration changes. <button type="button" class="btn link" data-show=\'' + show(["click","#vc-fn [data-k=pr]"],["#vc-t",1.5]) + '\'>Set it up for me</button>','' ,'It never changes: a = ⟨0, −2⟩ at every t (gravity). The vertical velocity decreases, then the particle falls.'),
  ('On the projectile, set t = 2. Compare v and a here. Is the particle speeding up?',show(["click","#vc-fn [data-k=pr]"],["#vc-t",2]),'At the top of the path v = ⟨2, 0⟩ and a = ⟨0, −2⟩, so v · a = 0: the velocity is horizontal and the acceleration vertical. The speed is 2, its smallest value on this path, and it is neither increasing nor decreasing at that instant.'),
  ('Choose the spiral and set t = 3. Is the particle speeding up or slowing down?',show(["click","#vc-fn [data-k=sp]"],["#vc-t",3]),'Speeding up: v · a ≈ 3.0 &gt; 0. The speed is √(1 + t²) = √10 ≈ 3.16 and it keeps growing, even though the path keeps turning. The acceleration has a part along the velocity and a part across it.')],
 ('A particle has r(t) = ⟨t², t³ − 3t⟩. Find its velocity, speed and acceleration at t = 2.',[
  '<b>Velocity.</b> v(t) = ⟨2t, 3t² − 3⟩, so v(2) = ⟨4, 9⟩.',
  '<b>Speed.</b> |v(2)| = √(16 + 81) = √97 ≈ 9.849.',
  '<b>Acceleration.</b> a(t) = ⟨2, 6t⟩, so a(2) = ⟨2, 12⟩.',
  '<b>Speeding up?</b> v · a = 4(2) + 9(12) = 116 &gt; 0: yes.',
  '<b>Answer.</b> v = <b>⟨4, 9⟩</b>, speed <b>√97</b>, a = <b>⟨2, 12⟩</b>; speeding up.'],_vcfig),
 ['Forgetting that speed is a magnitude (square root of the sum of squares).','Saying the particle is not accelerating because its speed is constant.','Differentiating only x or only y: both components.','Using the position vector for velocity.','Confusing the path (a curve) with the position function (a point moving on it).'],
 ('Components',['Everything works component by component. The x and y motions are independent in a projectile: constant horizontal velocity, constant downward acceleration. For uniform circular motion r(t) = ⟨R cos ωt, R sin ωt⟩, the speed is Rω and the acceleration has size Rω², directed inward.']),
 [('r(t) = ⟨3t, 4t⟩. The speed is',['5','7','25','12'],0,'v = ⟨3, 4⟩, so |v| = √(9 + 16) = 5.')])

mod('polar','Polar curves & area',
 'Describe a point by its distance r from the origin and its angle θ. Flowers, spirals and hearts have simple polar equations.',
 ['A point has polar coordinates <span class="m">(r, θ)</span> and rectangular coordinates <span class="m">x = r cos θ, y = r sin θ</span>. A <b>polar curve</b> r = f(θ) draws a point at distance f(θ) in direction θ as θ sweeps. The cardioid r = 1 + cos θ, the rose r = 2 cos 2θ and the spiral r = θ are all simple in polar form and awkward in rectangular form.',
  'The <b>area</b> swept out is made of thin sectors (pizza slices): a sector of angle dθ and radius r has area ½r² dθ, so <span class="m">A = ½ ∫<sub>α</sub><sup>β</sup> r² dθ</span>. The slope is found as for a parametric curve (x = r cos θ, y = r sin θ), giving <span class="m">dy/dx = (r′ sin θ + r cos θ)/(r′ cos θ − r sin θ)</span>.'],
 ('every point had (x, y) coordinates','a coordinate system built from distance and angle','roses, cardioids and orbits','polar coordinates, curves and area'),
 [('x = r cos θ, y = r sin θ','conversion'),('A = ½ ∫ r² dθ','area of a polar region'),('dy/dx = (r′ sin θ + r cos θ)/(r′ cos θ − r sin θ)','slope')],
 [lab('po-lab','Sweep out the curve and its area',canvas='po-canvas',aria='A polar curve with a point at angle theta and the sector swept so far shaded.',
   seg=('po-fn','Curve',[('ca','cardioid r = 1 + cos θ'),('ro','rose r = 2 cos 2θ'),('li','limaçon r = 1 + 2 cos θ'),('ci','circle r = 2 sin θ')]),ctl=[('po-th','Angle θ',0,6.2832,.02,1.2)],
   out=[('po-rt','(r, θ)','x'),('po-xy','(x, y)','a'),('po-ar','area swept so far','v'),('po-tot','total area over [0, 2π]','')])],
 [('On the cardioid, sweep θ from 0 to π. What fraction of the total area is swept? <button type="button" class="btn link" data-show=\'' + show(["click","#po-fn [data-k=ca]"],["#po-th",3.1416]) + '\'>θ = π</button>','' ,'Half: by symmetry across the x-axis, the upper half of the cardioid is half the area, 3π/4 of 3π/2.'),
  ('On the rose r = 2 cos 2θ, where is r negative? <button type="button" class="btn link" data-show=\'' + show(["click","#po-fn [data-k=ro]"],["#po-th",1.2]) + '\'>θ = 1.2</button>','' ,'When cos 2θ &lt; 0, for π/4 &lt; θ &lt; 3π/4: the point is plotted in the opposite direction, which draws the other petals.'),
  ('On the rose, set θ = 6.28 (a full turn). What is the area swept, and what does it cover?',show(["click","#po-fn [data-k=ro]"],["#po-th",6.28]),'The total is 2π ≈ 6.283: ½ ∫ 4cos²2θ dθ over 0 to 2π. The four petals each have area π/2, and the sectors for negative r still add area, because r² is never negative.'),
  ('Choose the limaçon r = 1 + 2 cos θ and set θ = 3.14. What is r, and where is the point?',show(["click","#po-fn [data-k=li]"],["#po-th",3.14]),'r = 1 + 2 cos π = −1, so the point is plotted one unit in the direction opposite to θ = π, that is at (1, 0) on the positive x-axis. This is the tip of the small inner loop, which exists only where r is negative.'),
  ('Choose the circle r = 2 sin θ and set θ = π/2 (about 1.57). How much area is swept, and when is the circle finished?',show(["click","#po-fn [data-k=ci]"],["#po-th",1.57]),'Half of π: the area swept is about 1.57 (π/2), and the circle is complete at θ = π, with total area π. This circle has radius 1, so π is right, and θ only needs to run from 0 to π, not 2π.')],
 [('Find the area enclosed by the cardioid r = 1 + cos θ.',[
  '<b>Formula.</b> A = ½ ∫<sub>0</sub><sup>2π</sup> r² dθ = ½ ∫<sub>0</sub><sup>2π</sup> (1 + cos θ)² dθ.',
  '<b>Expand.</b> (1 + cos θ)² = 1 + 2 cos θ + cos²θ = 3/2 + 2 cos θ + (1/2)cos 2θ.',
  '<b>Integrate.</b> ∫<sub>0</sub><sup>2π</sup> (3/2 + 2 cos θ + (1/2)cos 2θ) dθ = (3/2)(2π) = 3π (the cosines integrate to 0).',
  '<b>Answer.</b> A = (1/2)(3π) = <b>3π/2</b>.'],_pofig),
  {'h':'Worked example 2: a microphone\'s pickup region (AP-style model)','fig':_pomic,
   'prob':'A cardioid microphone sits at the origin facing the positive x-axis. Model the region in which it picks up a performer clearly by r = 4(1 + cos θ), with r in feet and θ measured from the direction the microphone faces. (a) Find the area of the region. (b) Find how far the pickup reaches directly ahead, directly to the side (θ = π/2) and directly behind. (c) Find the area of the part behind the microphone, π/2 ≤ θ ≤ 3π/2, and what fraction of the whole it is.',
   'steps':['<b>(a)</b> Area = ½ ∫<sub>0</sub><sup>2π</sup> [4(1 + cos θ)]² dθ = 16 · ½ ∫<sub>0</sub><sup>2π</sup> (1 + cos θ)² dθ = 16 · (3π/2) = <b>24π ≈ 75.40 ft²</b>, using the result of the first example.',
    '<b>(b)</b> r(0) = 4(2) = <b>8 ft</b> ahead, r(π/2) = 4(1) = <b>4 ft</b> to the side, and r(π) = 4(0) = <b>0 ft</b> directly behind.',
    '<b>(c) Rear half.</b> A = ½ ∫<sub>π/2</sub><sup>3π/2</sup> 16(1 + cos θ)² dθ = 8 [3θ/2 + 2 sin θ + (1/4) sin 2θ]<sub>π/2</sub><sup>3π/2</sup> = 8(3π/2 − 4) = <b>12π − 32 ≈ 5.70 ft²</b>.',
    '<b>Fraction.</b> 5.70 ÷ 75.40 ≈ <b>7.6%</b>: only about one thirteenth of the pickup region lies behind the microphone.',
    '<b>Why microphones are built this way (beyond the AP exam).</b> A cardioid pattern rejects sound from behind, which is why such microphones are used on stage next to loudspeakers. Real patterns describe sensitivity rather than a sharp edge, so this region is only a model.']}],
 ['Forgetting the ½ in the area formula.','Using ∫ r dθ instead of ∫ r² dθ.','Using the wrong interval for θ so that the curve is traced twice or only partly.','Mixing up (r, θ) and (x, y) in conversions.','Treating a negative r as an error: it simply plots the point on the opposite side.'],
 ('Finding limits',['To get the right θ limits, find where r = 0 (the curve returns to the origin) for one petal or loop, or use symmetry. Between two curves r₁ and r₂ (r₁ outer): A = ½ ∫ (r₁² − r₂²) dθ.']),
 [('The area enclosed by the circle r = 2 (θ from 0 to 2π) is',['4π','2π','π','8π'],0,'½ ∫ 4 dθ over 2π = 4π, the area of a circle of radius 2.')])
