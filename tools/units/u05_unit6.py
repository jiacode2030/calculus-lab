# ---- figures for Accumulation & Riemann sums
_P = Plot((-.25, 3.4), (-.6, 10), (30, 12, 215, 196))
_sq = lambda x: x * x
_acc = fig(_P.axes((1, 2, 3), (4, 9), 'x', 'f') + _P.curve(_sq, 0, 3.15), [
    (1, ''.join(_P.text(i + .5, .35, 'Δx', 'mut', 10, w=500) for i in range(3)) + ''.join(_P.seg(i, -.25, i, .25, 'mut', 1.2) for i in range(4)), 'Δx = 1', 'ink'),
    (2, ''.join(_P.dot(i, i * i, str(i * i) if i else '', 'tan', -9, -6) for i in range(3)), 'f(0), f(1), f(2) = 0, 1, 4', 'tan'),
    (3, ''.join(_P.box_(i, i + 1, i * i) for i in range(3)), 'L₃ = (0 + 1 + 4)(1) = 5', 'area'),
    (4, _P.under(_sq, 0, 3, 'f', .12) + _P.text(2.55, 2.2, 'exact 9', 'f', 12), 'exact 9: L₃ is low', 'f'),
    (5, ''.join(f'<rect x="{n(_P.X(i))}" y="{n(_P.Y((i + 1) ** 2))}" width="{n(_P.X(i + 1) - _P.X(i))}" height="{n(_P.Y(0) - _P.Y((i + 1) ** 2))}" style="fill:none;stroke:var(--hot);stroke-width:1.6;stroke-dasharray:4 3"/>' for i in range(3)), 'R₃ = 14: high', 'tan')],
    'Left rectangles (gold) sit under the rising curve; right rectangles (dashed) stick out above it.', 230)
_t, _v = [0, 10, 15, 25, 30], [12, 18, 21, 17, 14]
_Q = Plot((-1.5, 33), (0, 25), (30, 12, 215, 190))
_car = fig(_Q.axes(_t[1:], (10, 20), 't', 'v') + ''.join(_Q.dot(a, b, str(b), 'f', 0, -9) for a, b in zip(_t, _v)), [
    (1, ''.join(_Q.seg(a, 0, a, 23, 'mut', 1, '3 3') for a in _t[1:]) + ''.join(_Q.text((_t[i] + _t[i + 1]) / 2, 2.6, str(_t[i + 1] - _t[i]), 'ink', 11) for i in range(4)), 'widths 10, 5, 10, 5', 'ink'),
    (2, ''.join(_Q.box_(_t[i], _t[i + 1], _v[i]) for i in range(4)), 'left sum = 505', 'area'),
    (3, _Q.text(15, 5, '≈ 505 m', 'ink', 13), 'meters traveled in 30 s', 'ink'),
    (4, poly([(_Q.X(a), _Q.Y(b)) for a, b in zip(_t, _v)] + [(_Q.X(30), _Q.Y(0)), (_Q.X(0), _Q.Y(0))], 'tan', .08, 'tan', 1.8, '4 3'), 'trapezoids = 515', 'tan'),
    (5, '', 'v rises, then falls', 'dd')],
    'The speedometer readings (blue dots). Strips have different widths because the readings are not evenly spaced.', 230)

mod('accum','Accumulation & Riemann sums',
 'How much water flowed into the tank? Add up the rate over time. When the rate changes, slice the time into short pieces and add rate × time for each.',
 ['If water flows at a constant 5 gallons per minute for 10 minutes, the amount is 5 × 10 = 50 gallons: <b>rate × time</b>, which is the area of a rectangle on a graph of rate against time. When the rate <i>changes</i>, slice the time into thin strips, treat the rate as nearly constant on each strip, and add up the rectangle areas. That is a <b>Riemann sum</b>.',
  'Thinner strips give a better answer. In the limit as the number of strips goes to infinity the sum becomes the <b>definite integral</b> <span class="m">∫<sub>a</sub><sup>b</sup> f(x) dx</span>: the net accumulation of f from a to b, with area above the axis counted positive and below counted negative. Left, right, midpoint and trapezoid sums choose the height differently.'],
 ('rates multiplied by time only when the rate was constant','a method for changing rates','distance from velocity, volume from flow, total change','Riemann sums and the idea of the definite integral'),
 [('Σ f(x<sub>i</sub>*) Δx','Riemann sum, Δx = (b − a)/n'),('∫<sub>a</sub><sup>b</sup> f(x) dx = lim Σ f(x<sub>i</sub>*) Δx','definite integral'),('rate × time = amount','units: (units of f) × (units of x)')],
 [lab('ac-lab','Add up the rectangles',canvas='ac-canvas',aria='A rate graph with rectangles under it for the chosen Riemann sum method, and the exact area for comparison.',
   seg=('ac-fn','Rate f(x)',[('a','x²'),('b','sin x'),('c','4 − x²'),('d','eˣ')]),
   pre='<div class="ctl"><span class="lbl">Method</span><div class="seg" id="ac-m" role="group" aria-label="Riemann sum method"><button type="button" data-k="L" aria-pressed="true">Left</button><button type="button" data-k="R" aria-pressed="false">Right</button><button type="button" data-k="M" aria-pressed="false">Midpoint</button><button type="button" data-k="T" aria-pressed="false">Trapezoid</button></div></div>',
   ctl=[('ac-n','Number of strips n',1,60,1,4),('ac-b','Stop at b',.25,3,'any',3)],out=[('ac-sum','sum','x'),('ac-ex','exact integral','v'),('ac-err','sum − exact','a'),('ac-note','bias','')])],
 [('On x² with left sums and n = 4, is the estimate too big or too small?',show(["click","#ac-fn [data-k=a]"],["click","#ac-m [data-k=L]"],["#ac-n",4],["#ac-b",3]),'Too small: x² is increasing, so the left edge of each strip is the lowest point and every rectangle sits under the curve. Right sums would overestimate.'),
  ('Increase n to 60. What happens to the error?',show(["click","#ac-fn [data-k=a]"],["click","#ac-m [data-k=L]"],["#ac-n",60],["#ac-b",3]),'It shrinks toward 0: the sum approaches the integral as n → ∞. The error of a left or right sum falls roughly in proportion to 1/n.'),
  ('Switch to the trapezoid rule on x² with n = 4. Over or under?',show(["click","#ac-fn [data-k=a]"],["click","#ac-m [data-k=T]"],["#ac-n",4],["#ac-b",3]),'Over: 9.28125 against the exact 9. x² is concave up, so each straight top edge lies above the curve.'),
  ('Choose 4 − x² with the midpoint rule and n = 60. Slide b from 2 up to 3. Why does the total go down?',show(["click","#ac-fn [data-k=c]"],["click","#ac-m [data-k=M]"],["#ac-n",60],["#ac-b",2]),'Up to b = 2 the total is 16/3 ≈ 5.33, the largest it gets. After x = 2 the rate is negative (pink strips), so the amount decreases, reaching 3 at b = 3. Think of water draining out once the flow reverses.'),
  ('Choose sin x and slide b all the way to 2π ≈ 6.28. What is the exact integral now?',show(["click","#ac-fn [data-k=b]"],["click","#ac-m [data-k=M]"],["#ac-n",60],["#ac-b",6.2832]),'0: the gold area above the axis on [0, π] (2) is cancelled by the pink area below it on [π, 2π] (−2). A definite integral is net change, not total area.')],
 [('Use a left Riemann sum with n = 3 to estimate ∫<sub>0</sub><sup>3</sup> x² dx.',[
  '<b>Strip width.</b> Δx = (3 − 0)/3 = 1.',
  '<b>Left endpoints.</b> x = 0, 1, 2, so f = 0, 1, 4.',
  '<b>Add rate × width.</b> L₃ = (0 + 1 + 4)(1) = 5.',
  '<b>Compare.</b> The exact value is 9, so L₃ is an underestimate (f is increasing).',
  '<b>Answer.</b> <b>5</b>. Right sum: (1 + 4 + 9)(1) = 14, an overestimate.'],_acc),
  {'h':'Worked example 2: a car\'s speedometer (AP-style table)','fig':_car,'table':[['t (seconds)','0','10','15','25','30'],['v(t) (meters per second)','12','18','21','17','14']],
   'prob':'A car\'s speed v(t) is read from its speedometer at the times in the table. (a) Use a left Riemann sum with the four subintervals in the table to estimate ∫<sub>0</sub><sup>30</sup> v(t) dt, and explain its meaning with units. (b) Estimate the same integral with a trapezoidal sum. (c) Is the left sum an overestimate or an underestimate?',
   'steps':['<b>Widths.</b> The readings are not evenly spaced: the strips are 10, 5, 10 and 5 seconds wide. Use each width separately, not one Δx.',
    '<b>(a) Left sum.</b> Use the speed at the start of each strip: 12(10) + 18(5) + 21(10) + 17(5) = 120 + 90 + 210 + 85 = <b>505</b>.',
    '<b>Meaning.</b> ∫<sub>0</sub><sup>30</sup> v(t) dt is the car\'s change in position over the 30 seconds. The speed is positive, so the car traveled about <b>505 meters</b> in those 30 seconds. Units: (m/s) × s = m.',
    '<b>(b) Trapezoids.</b> Average the two ends of each strip: 10(12 + 18)/2 + 5(18 + 21)/2 + 10(21 + 17)/2 + 5(17 + 14)/2 = 150 + 97.5 + 190 + 77.5 = <b>515 meters</b>.',
    '<b>(c) Over or under?</b> It cannot be determined. A left sum is low where v increases and high where it decreases, and these readings rise then fall. Without knowing v is monotonic on the whole interval, you cannot say.']}],
 ['Using the wrong number of heights: n strips use n heights, not n + 1 (except in the trapezoid rule\'s endpoints).','Using Δx = b − a instead of (b − a)/n.','With a table of uneven times, using one Δx for every strip.','Calling a left sum an overestimate for an increasing function. It underestimates.','Forgetting that area below the axis counts negative in a definite integral.','Dropping units: (liters/minute) × minutes = liters.'],
 ('Which sum is high or low?',['For an <b>increasing</b> function, left sums underestimate and right sums overestimate; for a <b>decreasing</b> function it reverses. The trapezoid rule overestimates when f is concave up (the chords lie above the curve) and underestimates when concave down; the midpoint rule does the opposite. Averaging left and right sums gives the trapezoid sum.']),
 [('For a decreasing function, a right Riemann sum is',['an underestimate','an overestimate','exact','impossible to tell'],0,'On a decreasing function the right edge is the lowest point of each strip, so the rectangles are under the curve.')])

# ---- figures for The definite integral & the Fundamental Theorem
_F = Plot((-.25, 3.5), (-.6, 8.2), (30, 12, 215, 196))
_lin = lambda x: 2 * x + 1
_ftcf = fig(_F.axes((1, 2, 3), (3, 7), 'x', 'f') + _F.curve(_lin, 0, 3.3) + _F.text(.2, 7.7, 'f(x) = 2x + 1', 'f', 12, 'start'), [
    (1, _F.text(.2, 6.6, 'F(x) = x² + x', 'ink', 11, 'start', 500), 'F(x) = x² + x', 'f'),
    (2, _F.under(_lin, 1, 3) + _F.seg(1, 0, 1, 3, 'area', 1.6) + _F.seg(3, 0, 3, 7, 'area', 1.6) + _F.dot(1, 3, '3', 'f', -10, -4) + _F.dot(3, 7, '7', 'f', 10, 2) + _F.text(2, 2, '10', 'ink', 15), 'F(3) − F(1) = 12 − 2 = 10', 'area'),
    (2, '', 'check: trapezoid 2·(3 + 7)/2 = 10', 'ink'),
    (3, '', 'upper limit x² moves at rate 2x', 'tan'),
    (4, '', 'd/dx = sin(x²)·2x', 'd')],
    'The integral is the gold area under f(x) = 2x + 1 from 1 to 3. It is a trapezoid, so geometry confirms the 10.', 230)
_E = lambda t: 6 * t - t * t
_r1, _r2 = 3 - 5 ** .5, 3 + 5 ** .5
_G = Plot((-.3, 6.6), (-.8, 10.2), (30, 12, 215, 196))
_tank = fig(_G.axes((1, 2, 3, 4, 5, 6), (4, 9), 't', 'L/h') + _G.curve(_E, 0, 6) + _G.seg(0, 4, 6, 4, 'dd', 2, '6 4')
            + _G.text(4.6, 9.4, 'in: E(t)', 'f', 11) + _G.text(6.3, 4.7, 'out: 4', 'dd', 11, 'end'), [
    (1, _G.between(_E, lambda t: 4, _r1, _r2) + _G.between(lambda t: 4, _E, 0, _r1, 'dd', .3) + _G.between(lambda t: 4, _E, _r2, 6, 'dd', .3)
        + _G.text(1.9, 5.0, 'gain', 'ink', 11, w=500) + _G.text(.38, 3.0, 'loss', 'dd', 10, w=500), 'net rate = E(t) − 4', 'area'),
    (2, _G.text(3, 1.7, 'net +12 L', 'ink', 13), 'W(6) = 50 + 12 = 62', 'area'),
    (3, arr(_G.X(3), _G.Y(4), _G.X(3), _G.Y(9), 'd', '', 2.4) + _G.dot(3, 9, 'E(3) = 9', 'f', 0, -9) + _G.text(3.15, 6.9, '5', 'd', 13, 'start'), 'W′(3) = 9 − 4 = 5', 'd'),
    (4, _G.dot(_r1, 4, '0.76', 'tan', 16, -6) + _G.dot(_r2, 4, '5.24', 'tan', -16, -6), 'W′ = 0 at t = 3 ± √5', 'tan'),
    (5, '', 'least at t ≈ 0.764: 48.546 L', 'f')],
    'Blue is the inflow rate, the dashed pink line the outflow. Gold strips add water; pink strips (near t = 0 and t = 6) drain it.', 230)

mod('ftc','The definite integral & the Fundamental Theorem',
 'Differentiating and integrating are opposites. This theorem is why antiderivatives can find areas.',
 ['Define the <b>accumulation function</b> <span class="m">A(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt</span>: the signed area from a up to x. Slide x to the right and the area grows at a rate equal to the height of f at the edge. That is <b>FTC Part 1</b>: <span class="m">A′(x) = f(x)</span>. Integration undoes differentiation.',
  '<b>FTC Part 2</b> turns that into a method: if F is any antiderivative of f, then <span class="m">∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</span>. No more adding rectangles. A related fact: the net change of a quantity equals the integral of its rate, <span class="m">∫<sub>a</sub><sup>b</sup> f′(x) dx = f(b) − f(a)</span>.'],
 ('the definite integral was a limit of sums','a shortcut through antiderivatives','areas, accumulated quantities and almost every integral problem','the Fundamental Theorem of Calculus'),
 [('d/dx ∫<sub>a</sub><sup>x</sup> f(t) dt = f(x)','Part 1'),('∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)','Part 2, F′ = f'),('d/dx ∫<sub>a</sub><sup>g(x)</sup> f(t) dt = f(g(x))·g′(x)','with the chain rule')],
 [lab('fc-lab','Area so far, and its slope',canvas='fc-canvas',aria='Top graph: f with the signed area from a to x shaded. Bottom graph: the accumulated area A(x) with a point at x.',
   seg=('fc-fn','f(t)',[('a','t² − 2t'),('b','cos t'),('c','e^(−t²)')]),ctl=[('fc-x','x',0,3,.05,1.5),('fc-start','Start a',0,2,.05,0)],canvas2=('fc-canvas2','The accumulation function A of x.'),
   out=[('fc-A','A(x) = ∫ₐˣ f(t) dt','x'),('fc-f','f(x), the height at the edge','v'),('fc-slope','slope of A at x (numeric)','a')])],
 [('Choose t² − 2t and slide x to 2. What is happening to A?',show(["click","#fc-fn [data-k=a]"],["#fc-start",0],["#fc-x",2]),'A is at its lowest point (A(2) = −4/3): f is negative until x = 2 (area below the axis counts negative), so A decreases, and f(2) = 0 where A turns around.'),
  ('Compare f(x) with the slope of A at several x. What do you see?',show(["click","#fc-fn [data-k=b]"],["#fc-start",0],["#fc-x",1]),'They are equal everywhere: the slope of the accumulation graph is the height of f. That is FTC Part 1.'),
  ('On t² − 2t, move the start a from 0 to 1. What happens to the A graph, and what stays the same?',show(["click","#fc-fn [data-k=a]"],["#fc-x",2.5],["#fc-start",1]),'The whole A graph moves up by 2/3 (it now crosses 0 at x = 1, because A(1) = 0), but its shape and its slope at every x are unchanged: A′(x) = f(x) whatever the start. Changing a only adds a constant. That is why any antiderivative works in FTC Part 2.'),
  ('Choose e^(−t²) and slide x to 3. Read A(3). Why is this function special?',show(["click","#fc-fn [data-k=c]"],["#fc-start",0],["#fc-x",3]),'A(3) ≈ 0.8862, almost exactly √π/2 (the rest of the tail beyond 3 adds only about 0.00002). e^(−t²) has no antiderivative made of elementary functions, so A(x) = ∫<sub>0</sub><sup>x</sup> e^(−t²) dt is a genuinely new function, and FTC Part 1 still tells you its derivative: A′(x) = e^(−x²).')],
 [('Evaluate ∫<sub>1</sub><sup>3</sup> (2x + 1) dx, and find d/dx ∫<sub>0</sub><sup>x²</sup> sin t dt.',[
  '<b>Antiderivative.</b> F(x) = x² + x.',
  '<b>FTC Part 2.</b> F(3) − F(1) = (9 + 3) − (1 + 1) = 10. The integral is <b>10</b>.',
  '<b>Second problem: chain rule.</b> The upper limit is g(x) = x², so d/dx ∫<sub>0</sub><sup>x²</sup> sin t dt = sin(x²)·(x²)′.',
  '<b>Answer.</b> <b>2x sin(x²)</b>.'],_ftcf),
  {'h':'Worked example 2: a water tank (AP-style)','fig':_tank,
   'prob':'Water flows into a tank at the rate E(t) = 6t − t² liters per hour and drains out at a constant 4 liters per hour, for 0 ≤ t ≤ 6 hours. At t = 0 the tank holds 50 liters. Let W(t) be the amount of water in the tank at time t. (a) How much water is in the tank at t = 6? (b) Is the amount of water increasing or decreasing at t = 3? At what rate? (c) At what time in [0, 6] is the amount of water least? Justify your answer.',
   'steps':['<b>Amount = start + ∫ net rate.</b> The net rate is in minus out, so W(t) = 50 + ∫<sub>0</sub><sup>t</sup> (6s − s² − 4) ds.',
    '<b>(a)</b> ∫<sub>0</sub><sup>6</sup> (6t − t² − 4) dt = [3t² − t³/3 − 4t]<sub>0</sub><sup>6</sup> = 108 − 72 − 24 = 12, so W(6) = 50 + 12 = <b>62 liters</b>.',
    '<b>(b)</b> By FTC Part 1, W′(t) = E(t) − 4, so W′(3) = 9 − 4 = 5. The amount is <b>increasing at 5 liters per hour</b>.',
    '<b>(c) Critical points.</b> W′(t) = 0 when 6t − t² = 4, that is t² − 6t + 4 = 0, so t = 3 ± √5 ≈ 0.764 and 5.236. W′ &lt; 0 before 0.764, W′ &gt; 0 between, and W′ &lt; 0 after 5.236.',
    '<b>Candidates test.</b> W(0) = 50, W(0.764) ≈ 48.546, W(5.236) ≈ 63.454, W(6) = 62. The least amount is about <b>48.546 liters, at t = 3 − √5 ≈ 0.764 hours</b>: at first water drains faster than it flows in.']}],
 ['Forgetting to subtract: F(b) − F(a), not F(b) + F(a).','Adding + C in a definite integral. It cancels, so leave it out.','Forgetting the chain rule factor g′(x) when the upper limit is not just x.','Treating area below the axis as positive. The integral is net (signed) area.','Swapping limits without changing the sign: ∫<sub>b</sub><sup>a</sup> = −∫<sub>a</sub><sup>b</sup>.','In amount problems, forgetting the starting amount, or using the inflow rate alone instead of in minus out.'],
 ('Properties worth knowing',['∫<sub>a</sub><sup>a</sup> f = 0; ∫<sub>a</sub><sup>b</sup> f = −∫<sub>b</sub><sup>a</sup> f; ∫<sub>a</sub><sup>c</sup> f = ∫<sub>a</sub><sup>b</sup> f + ∫<sub>b</sub><sup>c</sup> f; constants pull out and sums split. If f is the rate of change of a quantity, ∫<sub>a</sub><sup>b</sup> f is the total change in that quantity from a to b.']),
 [('d/dx ∫<sub>1</sub><sup>x</sup> √(t<sup>3</sup> + 1) dt =',['√(x³ + 1)','x√(x³ + 1)','3x²/(2√(x³ + 1))','0'],0,'FTC Part 1 with upper limit x: the answer is the integrand evaluated at x.')])

# ---- figures for antiderivatives and u-substitution
import math
def _clipc(P, f, a, b, lo, hi, c='f', w=2.6, k=300):
    segs, cur = [], []
    for i in range(k + 1):
        x = a + (b - a) * i / k; y = f(x)
        if lo <= y <= hi: cur.append((P.X(x), P.Y(y)))
        elif cur: segs.append(cur); cur = []
    if cur: segs.append(cur)
    return ''.join(pline(q, c, w) for q in segs if len(q) > 1)
_AN = Plot((-1.2, 2.3), (-6, 14), (34, 12, 206, 196))
_anF = lambda x: 2 * x ** 3 - 2 * x * x
_anfig = fig(_AN.axes((1, 2), (-5, 5, 10), 'x', 'y'), [
    (1, ''.join(_clipc(_AN, lambda x, c=c: _anF(x) + c, -1.2, 2.3, -6, 14, 'f', 1.3) for c in (-2, 1, 5, 8)), "F(x) = 2x³ − 2x² + C: one curve for each C", 'f'),
    (2, _clipc(_AN, lambda x: _anF(x) + 5, -1.2, 2.3, -6, 14, 'd', 3) + _AN.dot(1, 5, '(1, 5)', 'ink', 14, -8, 4.5), 'F(1) = C = 5 picks one curve', 'd'),
    (3, _AN.text(-1.1, 11.2, 'F = 2x³ − 2x² + 5', 'd', 12, 'start'), 'F(x) = 2x³ − 2x² + 5', 'd')],
    'Every curve has the same slope at each x (they are vertical shifts of each other); the point (1, 5) selects the green one.', 230)

_U1 = Plot((-.2, 2.3), (-25, 275), (30, 8, 215, 106))
_U2 = Plot((-.2, 5.6), (-8, 72), (30, 152, 215, 110))
_usg = lambda x: x * (x * x + 1) ** 3
_usfig = fig(_U1.axes((1, 2), (100, 200), 'x', 'y') + _U1.curve(_usg, 0, 2.2) + _U2.axes((1, 2, 3, 4, 5), (30, 60), 'u', 'y') + _U2.curve(lambda u: u ** 3 / 2, 0, 5.4, 'd'), [
    (1, _U1.under(_usg, 0, 2, 'area', .35) + _U1.text(.55, 150, 'area in x', 'ink', 10, 'start'), 'the integral to evaluate, in x', 'area'),
    (2, '', 'u = x² + 1, du = 2x dx', 'ink'),
    (3, _U1.seg(0, -20, 0, 270, 'tan', 1.4, '4 4') + _U1.seg(2, -20, 2, 270, 'tan', 1.4, '4 4') + _U1.text(.1, 255, 'u = 1', 'tan', 10, 'start') + _U1.text(1.9, 255, 'u = 5', 'tan', 10, 'end'), 'x = 0 → u = 1, x = 2 → u = 5', 'tan'),
    (4, _U2.under(lambda u: u ** 3 / 2, 1, 5, 'area', .35) + _U2.text(3, 12, 'area in u', 'ink', 10), 'now ∫ u³/2 du from 1 to 5', 'area'),
    (5, _U1.text(1.4, 55, '78', 'ink', 14) + _U2.text(3.8, 28, '78', 'ink', 14), 'both areas: 78', 'ink')],
    'Substitution changes the shape of the picture, not the area. The same 78 square units appear in x (top) and in u (bottom).', 280)

mod('antider','Antiderivatives',
 'An antiderivative undoes a derivative. Because constants vanish when you differentiate, every function has a whole family of antiderivatives.',
 ['F is an <b>antiderivative</b> of f if F′ = f. The antiderivative of 2x is x², but so are x² + 5 and x² − 100: they all have slope 2x. The family is written <span class="m">∫ f(x) dx = F(x) + C</span>, and C is the constant of integration. Graphically, the antiderivatives are the same curve shifted up and down.',
  'Run your derivative rules backwards. <span class="m">∫ x<sup>n</sup> dx = x<sup>n+1</sup>/(n+1) + C</span> (n ≠ −1), <span class="m">∫ 1/x dx = ln|x| + C</span>, <span class="m">∫ e<sup>x</sup> dx = e<sup>x</sup> + C</span>, <span class="m">∫ cos x dx = sin x + C</span>. An <b>initial condition</b> like F(1) = 3 picks out the one curve in the family.'],
 ('every derivative had one answer','a family of answers, picked out by a starting value','solving for position from velocity, and every integral','the indefinite integral and the constant of integration'),
 [('∫ x<sup>n</sup> dx = x<sup>n+1</sup>/(n+1) + C','n ≠ −1'),('F′ = f ⇒ ∫ f = F + C','check by differentiating'),('F(a) = b','initial condition fixes C')],
 [lab('an-lab','A family of curves with the same slope',canvas='an-canvas',aria='Several vertical shifts of an antiderivative in light blue, with the chosen one highlighted and the integrand in green.',
   seg=('an-fn','f(x)',[('a','2x'),('b','cos x'),('c','eˣ'),('d','3x² − 3')]),ctl=[('an-c','Constant C',-3,3,.25,1),('an-x','Point x',-2,2,.05,.5)],
   out=[('an-big','the highlighted F(x)','x'),('an-chk','slope of F at the point','a'),('an-f','f at the point','v')])],
 [('Change C. What changes about the curve, and what stays the same? <button type="button" class="btn link" data-show=\'' + show(["#an-c",2]) + '\'>C = 2</button>','' ,'The curve slides up or down, but the slope at each x is identical: the slope readout does not change with C. That is why C is arbitrary until an initial condition fixes it.'),
  ('Choose cos x. The slope of the highlighted curve at x = 0.5 matches what? <button type="button" class="btn link" data-show=\'' + show(["click","#an-fn [data-k=b]"],["#an-x",0.5]) + '\'>Set it up for me</button>','' ,'cos(0.5) = 0.878: F = sin x + C has slope cos x, so F is an antiderivative of cos x for every C.'),
  ('Choose eˣ. What is the slope of the highlighted curve at x = 0.5, and does it depend on C?',show(["click","#an-fn [data-k=c]"],["#an-x",0.5]),'The slope is e^0.5 ≈ 1.6487 for every C, because F = eˣ + C has F′ = eˣ. Changing C only slides the curve.'),
  ('Choose 3x² − 3 and put x = 1. What is the slope of F there, and what happens to F?',show(["click","#an-fn [data-k=d]"],["#an-x",1]),'The slope is f(1) = 3(1) − 3 = 0: F = x³ − 3x + C has a flat tangent at x = 1. Since f goes from negative to positive there, F has a local minimum at x = 1 (and a local maximum at x = −1).')],
 ('Find the function F with F′(x) = 6x² − 4x and F(1) = 5.',[
  '<b>Antiderivative.</b> F(x) = 2x³ − 2x² + C.',
  '<b>Apply the condition.</b> F(1) = 2 − 2 + C = C = 5.',
  '<b>Answer.</b> F(x) = <b>2x³ − 2x² + 5</b>.'],_anfig),
 ['Forgetting + C in an indefinite integral.','Using the power rule on 1/x: ∫ 1/x dx = ln|x| + C, not x⁰/0.','Differentiating instead of integrating: raise the exponent, then divide by the new exponent.','Forgetting to divide by the coefficient inside, for example ∫ cos(3x) dx = sin(3x)/3 + C.','Using F(a) = b with the wrong sign when solving for C.'],
 ('Check by differentiating',['An antiderivative can always be checked: differentiate your answer; you must get the original integrand back. If it does not match, the integral is wrong. This check catches most mistakes on the exam.']),
 [('∫ (4x³ + 2) dx =',['x⁴ + 2x + C','12x² + C','x⁴ + 2 + C','4x⁴ + 2x + C'],0,'Raise each power by one and divide by the new power: 4x⁴/4 = x⁴, and 2 becomes 2x.')])

mod('usub','u-substitution',
 'The chain rule run backwards: when an integral contains a function and its derivative, rename the inside as u and the integral becomes simple.',
 ['The chain rule gave <span class="m">d/dx f(g(x)) = f′(g(x))·g′(x)</span>. Reverse it: <span class="m">∫ f′(g(x))·g′(x) dx = f(g(x)) + C</span>. In practice, look for an <b>inside function whose derivative also appears</b>: in <span class="m">∫ 2x cos(x²) dx</span> the inside is x² and 2x is its derivative. Let <span class="m">u = x²</span>, so <span class="m">du = 2x dx</span>, and the integral becomes <span class="m">∫ cos u du = sin u + C</span>.',
  'For a <b>definite integral</b> either change back to x at the end, or (better) change the limits: when x goes from a to b, u goes from g(a) to g(b). The areas are equal, which the lab shows.'],
 ('antiderivatives of simple functions only','a way to undo the chain rule','integrals like ∫ x e^{x²} dx or ∫ (3x + 1)⁴ dx','u-substitution'),
 [('u = g(x), du = g′(x) dx','substitution'),('∫ f(g(x)) g′(x) dx = ∫ f(u) du','indefinite'),('limits: x = a, b → u = g(a), g(b)','definite')],
 [lab('us-lab','The same area in two coordinates',canvas='us-canvas',aria='Left graph: the integrand in x with its area. Right graph: the simplified integrand in u with the equal area.',
   seg=('us-fn','Integral',[('a','∫ 2x cos(x²) dx'),('b','∫ x eˣ² dx'),('c','∫ x/(x²+1) dx')]),ctl=[('us-b','Upper limit b',.2,1.6,.05,1)],canvas2=('us-canvas2','The integrand after substitution, as a function of u, with its area.'),
   pre='<p class="small" id="us-form" style="margin:0"></p>',out=[('us-i1','∫₀ᵇ in x','x'),('us-i2','∫ in u over [g(0), g(b)]','v'),('us-eq','equal?','')])],
 [('Choose 2x cos(x²). What are the new limits when b = 1? <button type="button" class="btn link" data-show=\'' + show(["click","#us-fn [data-k=a]"],["#us-b",1]) + '\'>Set it up for me</button>','' ,'u = x², so u runs from 0² = 0 to 1² = 1. The right graph is cos u on [0, 1]; both areas equal sin 1 ≈ 0.841.'),
  ('Choose x/(x²+1). Why u = x² + 1? <button type="button" class="btn link" data-show=\'' + show(["click","#us-fn [data-k=c]"],["#us-b",1.5]) + '\'>Set it up for me</button>','' ,'Its derivative 2x is almost the numerator x (off by a factor of 2), so x dx = du/2 and the integral is (1/2)∫ du/u = (1/2) ln u.'),
  ('Choose x·eˣ² with b = 1. What is the area, and what are the new limits?',show(["click","#us-fn [data-k=b]"],["#us-b",1]),'u = x², so u goes from 0 to 1 and x dx = du/2: the area is (1/2)∫<sub>0</sub><sup>1</sup> eᵘ du = (e − 1)/2 ≈ 0.859.'),
  ('Choose 2x cos(x²) and slide b to 1.6. Why is the area smaller than at b = 1?',show(["click","#us-fn [data-k=a]"],["#us-b",1.6]),'The area is sin(b²) = sin 2.56 ≈ 0.549, less than sin 1 ≈ 0.841. Once x² passes π/2 ≈ 1.57 (x ≈ 1.25) the integrand cos(x²) is negative, so the area starts to cancel. The picture in u shows cos u on [0, 2.56].')],
 ('Evaluate ∫<sub>0</sub><sup>2</sup> x(x² + 1)³ dx.',[
  '<b>Choose u.</b> The inside is x² + 1, whose derivative 2x nearly matches the extra factor x. Let u = x² + 1.',
  '<b>Find du.</b> du = 2x dx, so x dx = du/2.',
  '<b>Change the limits.</b> x = 0 → u = 1; x = 2 → u = 5.',
  '<b>Rewrite and integrate.</b> ∫<sub>1</sub><sup>5</sup> u³ (du/2) = (1/2)(u⁴/4) |<sub>1</sub><sup>5</sup> = (1/8)(625 − 1).',
  '<b>Answer.</b> 624/8 = <b>78</b>.'],_usfig),
 ['Forgetting to change the limits (or to change back to x at the end).','Leaving some x in the integral after substituting. Everything must be in u.','Not adjusting for a constant: if du = 2x dx you must replace x dx by du/2.','Choosing u that does not make the rest cancel: u should be the inside whose derivative appears.','Dropping + C in an indefinite integral.'],
 ('Choosing u',['Good candidates: the inside of a power (3x + 1)⁵, the exponent of e, the argument of sin or cos, the denominator of a fraction when its derivative is in the numerator, or the inside of a square root. If a constant factor is missing, it is fine: just divide by it.']),
 [('For ∫ x e<sup>x²</sup> dx, which substitution works?',['u = x²','u = x','u = e<sup>x</sup>','u = x e<sup>x</sup>'],0,'The exponent x² has derivative 2x, and x is almost 2x: x dx = du/2.')])
