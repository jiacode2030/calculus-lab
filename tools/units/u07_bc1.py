# ---- figures for integration by parts
import math
_PA1 = Plot((-.2, 1.4), (-.4, 5.2), (30, 8, 215, 106))
_PA2 = Plot((-.2, 1.4), (-1.4, 1.3), (30, 152, 215, 110))
_paf = lambda x: x * math.exp(x)
_paF = lambda x: (x - 1) * math.exp(x)
_pafig = fig(_PA1.axes((1,), (2, 4), 'x', 'y') + _PA1.curve(_paf, 0, 1.3) + _PA2.axes((1,), (-1, 1), 'x', 'F'), [
    (1, '', 'u = x, dv = eˣ dx', 'ink'),
    (2, '', 'du = dx, v = eˣ', 'ink'),
    (3, _PA2.curve(_paF, 0, 1.3, 'd', 2.6), 'F(x) = x eˣ − eˣ = (x − 1)eˣ', 'd'),
    (4, _PA1.under(_paf, 0, 1, 'area', .35) + _PA1.text(.5, .7, 'area', 'ink', 11) + _PA2.dot(0, -1, '−1', 'd', -9, 4, 4) + _PA2.dot(1, 0, '', 'd', 0, 0, 4) + _PA2.seg(1, -1, 1, 0, 'area', 2.8) + _PA2.text(1.12, -.5, 'rise 1', 'ink', 10, 'start'), 'F(1) − F(0) = 0 − (−1) = 1', 'area'),
    (5, '', 'area = 1, the rise of F', 'ink')],
    'Top: x eˣ with the area from 0 to 1. Bottom: its antiderivative F; the rise of F from x = 0 to x = 1 equals that area.', 280)

mod('parts','Integration by parts',
 'The product rule, run backwards. It trades a hard integral of a product for a (hopefully easier) one.',
 ['The product rule says <span class="m">(uv)′ = u′v + uv′</span>. Integrate both sides and rearrange: <span class="m">∫ u dv = uv − ∫ v du</span>. You split the integrand into a part <b>u</b> to differentiate and a part <b>dv</b> to integrate. It pays off when differentiating u makes it simpler (x becomes 1, ln x becomes 1/x) and integrating dv is easy (eˣ, sin x, cos x).',
  'A good rule of thumb for choosing u is <b>LIATE</b>: Logarithmic, Inverse trig, Algebraic (powers of x), Trig, Exponential: pick u as the one that comes first. Some integrals need parts twice (x²eˣ), and a few circle back to themselves (eˣ sin x), which you solve algebraically.'],
 ('substitution handled products only when one factor was the derivative of the inside','a second tool for products, and for ∫ ln x','∫ x eˣ dx, ∫ x sin x dx, ∫ ln x dx','integration by parts'),
 [('∫ u dv = uv − ∫ v du','by parts'),('LIATE','choose u: Log, Inverse trig, Algebra, Trig, Exp'),('∫<sub>a</sub><sup>b</sup> u dv = [uv]<sub>a</sub><sup>b</sup> − ∫ v du','definite')],
 [lab('pa-lab','Check the formula against the area',canvas='pa-canvas',aria='A function with its area shaded from the lower limit to b, and readouts comparing the numeric area with the by-parts answer.',
   seg=('pa-fn','Integral',[('a','∫ x eˣ dx'),('b','∫ x sin x dx'),('c','∫ ln x dx'),('d','∫ x² eˣ dx')]),ctl=[('pa-b','Upper limit b',.3,3,.05,1.5)],pre='<p class="small" id="pa-form" style="margin:0"></p>',
   out=[('pa-num','area, found numerically','x'),('pa-fm','by parts: [uv − ∫v du] from a to b','v'),('pa-eq','agree?','')])],
 [('Choose ∫ x eˣ dx. Which choice of u makes the new integral easier: u = x or u = eˣ? Think, then read the formula line. <button type="button" class="btn link" data-show=\'' + show(["click","#pa-fn [data-k=a]"],["#pa-b",1.5]) + '\'>Set it up for me</button>','' ,'u = x: then du = dx and v = eˣ, so ∫ v du = ∫ eˣ dx, trivial. With u = eˣ you would get ∫ (x²/2) eˣ dx, which is harder than the original.'),
  ('Choose ∫ ln x dx. There is only one function; where is the product? <button type="button" class="btn link" data-show=\'' + show(["click","#pa-fn [data-k=c]"],["#pa-b",2]) + '\'>Set it up for me</button>','' ,'Write ln x = ln x · 1: u = ln x, dv = dx. Then du = dx/x, v = x, and ∫ ln x dx = x ln x − ∫ 1 dx = x ln x − x.'),
  ('Choose ∫ x sin x dx and set b = 1.5. Which choice of u, and what is the area?',show(["click","#pa-fn [data-k=b]"],["#pa-b",1.5]),'u = x (it becomes 1 when differentiated) and dv = sin x dx. The area is sin b − b cos b = 0.9975 − 0.106 ≈ 0.891.'),
  ('Choose ∫ x² eˣ dx and set b = 1. Why does it take two rounds of parts, and what is the area?',show(["click","#pa-fn [data-k=d]"],["#pa-b",1]),'Each round lowers the power of x by one: x² → x → 1. The antiderivative is eˣ(x² − 2x + 2), so the area from 0 to 1 is e(1) − 2 = e − 2 ≈ 0.718.'),
  ('Choose ∫ ln x dx and set b = 2. What is the area from 1 to 2?',show(["click","#pa-fn [data-k=c]"],["#pa-b",2]),'[x ln x − x] from 1 to 2 = (2 ln 2 − 2) − (0 − 1) = 2 ln 2 − 1 ≈ 0.386. The area under ln x is small near x = 1, where ln x is close to 0.')],
 ('Evaluate ∫ x e<sup>x</sup> dx and ∫<sub>0</sub><sup>1</sup> x e<sup>x</sup> dx.',[
  '<b>Choose u and dv (LIATE).</b> u = x (algebraic), dv = eˣ dx.',
  '<b>Differentiate and integrate.</b> du = dx, v = eˣ.',
  '<b>Apply the formula.</b> ∫ x eˣ dx = x eˣ − ∫ eˣ dx = x eˣ − eˣ + C.',
  '<b>Definite integral.</b> [x eˣ − eˣ]<sub>0</sub><sup>1</sup> = (e − e) − (0 − 1) = 1.',
  '<b>Answer.</b> <b>(x − 1)eˣ + C</b>, and the definite integral is <b>1</b>.'],_pafig),
 ['Choosing u badly (making the new integral harder). Try the other choice.','Forgetting to subtract ∫ v du, or its sign.','Dropping the product uv in a definite integral: evaluate [uv] at the limits too.','Not recognizing ln x needs u = ln x, dv = dx.','Forgetting + C in an indefinite integral.'],
 ('Twice, or circular',['For ∫ x² eˣ dx, apply parts twice: the power of x drops from 2 to 1 to 0. For ∫ eˣ sin x dx, applying parts twice returns the original integral: I = (…) − I, so I = (…)/2. The tabular method (a column of derivatives of u and a column of integrals of dv) organizes repeated parts.']),
 [('To find ∫ x cos x dx by parts, a good choice is',['u = x, dv = cos x dx','u = cos x, dv = x dx','u = x cos x, dv = dx','u = 1, dv = x cos x dx'],0,'Differentiating x gives 1; integrating cos x gives sin x. Easy.')])

# ---- figures for partial fractions, improper integrals, Euler, arc length
import math
def _clipc(P, f, a, b, lo, hi, c='f', w=2.6, k=400):
    segs, cur = [], []
    for i in range(k + 1):
        x = a + (b - a) * i / k
        try: y = f(x)
        except ZeroDivisionError: y = None
        if y is not None and lo <= y <= hi: cur.append((P.X(x), P.Y(y)))
        elif cur: segs.append(cur); cur = []
    if cur: segs.append(cur)
    return ''.join(pline(q, c, w) for q in segs if len(q) > 1)
_PF = Plot((-3.6, 4.6), (-6, 6), (30, 12, 215, 196))
_pff = lambda x: (3 * x + 1) / ((x + 1) * (x - 2))
_pfA = lambda x: (2 / 3) / (x + 1)
_pfB = lambda x: (7 / 3) / (x - 2)
_pfsplit = lambda P, f, c: ''.join(_clipc(P, f, a, b, -6, 6, c, 2.2) for a, b in ((-3.6, -1.03), (-.97, 4.6)))
_pffig = fig(_PF.axes((-2, 2, 4), (-4, 4), 'x', 'y') + ''.join(_clipc(_PF, _pff, a, b, -6, 6, 'f', 2.8) for a, b in ((-3.6, -1.03), (-.97, 1.97), (2.03, 4.6))), [
    (1, _PF.seg(-1, -6, -1, 6, 'tan', 1.4, '5 4') + _PF.seg(2, -6, 2, 6, 'tan', 1.4, '5 4'), 'poles at x = −1 and x = 2', 'tan'),
    (2, '', '3x + 1 = A(x − 2) + B(x + 1)', 'ink'),
    (3, ''.join(_clipc(_PF, _pfA, a, b, -6, 6, 'd', 2.0) for a, b in ((-3.6, -1.03), (-.97, 4.6))) + ''.join(_clipc(_PF, _pfB, a, b, -6, 6, 'dd', 2.0) for a, b in ((-3.6, 1.97), (2.03, 4.6))), 'A = 2/3 (green) and B = 7/3 (pink)', 'd'),
    (4, '', '∫ = (2/3) ln|x + 1| + (7/3) ln|x − 2|', 'ink'),
    (5, _PF.dot(3, 2.5, '2.5', 'ink', 12, -6, 4), 'at x = 3: 1/6 + 7/3 = 5/2 = f(3)', 'ink')],
    'The blue curve is the sum of the green and pink pieces. Each piece blows up at only one of the poles, which is why each is easy to integrate.', 230)

_IP = Plot((-.3, 6.4), (-.15, 1.15), (30, 12, 215, 196))
_ipfig = fig(_IP.axes((1, 2, 3, 4, 5, 6), (.5, 1), 'x', 'y') + _IP.curve(lambda x: 1 / x, .9, 6.3, 'dd', 2.4) + _IP.curve(lambda x: 1 / x ** 2, .9, 6.3, 'f', 2.8) + _IP.text(6.3, .3, '1/x', 'dd', 11, 'end') + _IP.text(6.3, .08, '1/x²', 'f', 11, 'end'), [
    (1, _IP.under(lambda x: 1 / x ** 2, 1, 4, 'area', .38) + _IP.seg(4, -.1, 4, 1.05, 'mut', 1.3, '4 4') + _IP.text(4.05, 1.0, 'b', 'ink', 12, 'start') + _IP.text(2, .12, '1 − 1/b', 'ink', 10), 'area from 1 to b is 1 − 1/b', 'area'),
    (2, _IP.seg(.9, 1, 6.3, 1, 'tan', 1.4, '6 4'), 'as b → ∞ the area → 1', 'tan'),
    (3, _IP.between(lambda x: 1 / x, lambda x: 1 / x ** 2, 1, 4, 'dd', .25), 'under 1/x the area is ln b', 'dd'),
    (4, '', 'ln b grows forever: diverges', 'dd')],
    'Both curves fall toward 0, but the blue one (1/x²) falls fast enough that the area to the right stays finite, while the pink one (1/x) does not.', 230)

_EU = Plot((-.12, 1.15), (.7, 3.7), (30, 12, 215, 196))
_euex = lambda x: 2 * math.exp(x) - x - 1
_eufig = fig(_EU.axes((.5, 1), (1, 2, 3), 'x', 'y') + _EU.curve(_euex, 0, 1.1, 'f', 2.8), [
    (1, _EU.seg(0, 1, .5, 1.5, 'tan', 2.8) + _EU.dot(0, 1, '', 'ink', 0, 0, 4.5) + _EU.dot(.5, 1.5, '1.5', 'tan', 0, 16, 4.5) + _EU.text(.05, 1.38, 'slope 1', 'tan', 10, 'start'), 'slope 1 at (0, 1): y₁ = 1.5', 'tan'),
    (2, _EU.seg(.5, 1.5, 1, 2.5, 'tan', 2.8) + _EU.dot(1, 2.5, '2.5', 'tan', -12, 16, 4.5) + _EU.text(.62, 2.2, 'slope 2', 'tan', 10, 'start'), 'slope 2 at (0.5, 1.5): y₂ = 2.5', 'tan'),
    (3, _EU.dot(1, _euex(1), '3.44 (exact)', 'f', -4, -10, 4.5).replace('text-anchor="middle"', 'text-anchor="end"') + _EU.seg(1, 2.5, 1, _euex(1), 'dd', 2.2, '3 3'), 'estimate 2.5 vs exact 2e − 2 ≈ 3.44', 'dd')],
    "Euler's polyline (orange) follows tangent lines, which lie below the concave-up exact curve (blue), so the estimate falls short.", 230)

_AL = Plot((-.3, 3.4), (-.4, 4), (30, 12, 215, 196))
_alf = lambda x: 2 / 3 * x ** 1.5
_alpts = [(i, _alf(i)) for i in range(4)]
_alfig = fig(_AL.axes((1, 2, 3), (1, 2, 3), 'x', 'y') + _AL.curve(_alf, 0, 3.05, 'f', 2.8), [
    (1, pline([(_AL.X(a), _AL.Y(b)) for a, b in _alpts], 'tan', 2.2, '5 4') + ''.join(_AL.dot(a, b, '', 'tan', 0, 0, 3.5) for a, b in _alpts) + _AL.text(1.4, .35, '3 chords: 4.647', 'tan', 10, 'start'), 'three chords: 4.647, a bit short', 'tan'),
    (2, _AL.seg(.1, .2, 1.1, .2 + 1, 'd', 2) if False else '', 'f′ = √x, so 1 + (f′)² = 1 + x', 'd'),
    (3, '', 'L = ∫₀³ √(1 + x) dx', 'ink'),
    (4, _AL.text(.5, 3.4, 'L = 14/3 ≈ 4.667', 'ink', 13, 'start'), 'L = (2/3)(8 − 1) = 14/3', 'ink')],
    'The orange chords (n = 3) are shorter than the curve; more chords would close the gap (n = 40 gives 4.6664). The exact length is 14/3.', 230)

mod('partial','Partial fractions & long division',
 'A fraction of polynomials can be split into simpler fractions you can integrate with logarithms.',
 ['A rational function like <span class="m">(3x + 1)/((x − 1)(x + 2))</span> is hard to integrate, but it is the sum of two simple fractions, <span class="m">A/(x − 1) + B/(x + 2)</span>, each integrating to a logarithm. To find A and B, clear the denominators and match: use convenient x-values (the roots of the denominator), or compare coefficients.',
  'First check the degrees. If the top has degree ≥ the bottom, do <b>long division</b> first (a polynomial plus a proper fraction). For repeated or irreducible factors the pieces are A/(x − a) + B/(x − a)² and (Cx + D)/(quadratic); the AP course sticks mostly to distinct linear factors. Also useful here: completing the square for ∫ 1/(x² + bx + c) gives an arctangent.'],
 ('integrals of quotients needed a lucky substitution','a systematic way to integrate rational functions','∫ (3x + 1)/(x² + x − 2) dx and population models','partial fraction decomposition'),
 [('(px+q)/((x−a)(x−b)) = A/(x−a) + B/(x−b)','distinct roots'),('A = (pa+q)/(a−b) · B = (pb+q)/(b−a)','cover-up'),('∫ A/(x−a) dx = A ln|x−a| + C','')],
 [lab('pf-lab','Split a fraction',canvas='pf-canvas',aria='Graphs of a rational function and its two partial fractions, with their sum matching the original.',
   ctl=[('pf-a','a (first root)',-3,0,1,-1),('pf-b','b (second root)',1,3,1,2),('pf-p','p',-4,4,1,3),('pf-q','q',-4,4,1,1),('pf-x','Probe x',-4,5,.05,3.5)],
   pre='<p class="small" id="pf-form" style="margin:0"></p>',out=[('pf-ca','A','x'),('pf-cb','B','a'),('pf-chk','f(x) at the probe vs A/(x−a) + B/(x−b)','v')])],
 [('Use the default values. What do A and B equal, and what is the check? <button type="button" class="btn link" data-show=\'' + show(["#pf-a",-1],["#pf-b",2],["#pf-p",3],["#pf-q",1]) + '\'>Set it up for me</button>','' ,'(3x + 1)/((x + 1)(x − 2)) = A/(x + 1) + B/(x − 2) with A = (3(−1) + 1)/(−1 − 2) = 2/3 and B = (6 + 1)/(2 + 1) = 7/3. The two sides agree at every probe x.'),
  ('Change the probe x. Does the equality ever fail? <button type="button" class="btn link" data-show=\'' + show(["#pf-x",-3]) + '\'>x = −3</button>','' ,'No: it is an identity, true for every x except the roots a and b where the original is not defined.'),
  ('Set a = −1, b = 1, p = 5, q = 1. What are A and B?',show(["#pf-a",-1],["#pf-b",1],["#pf-p",5],["#pf-q",1]),'A = (5(−1) + 1)/(−1 − 1) = 2 and B = (5 + 1)/(1 + 1) = 3. Check at x = 3: the fraction is 16/(4·2) = 2, and 2/4 + 3/2 = 2.'),
  ('Set a = −1, b = 2, p = 0, q = 3. Why is A negative?',show(["#pf-a",-1],["#pf-b",2],["#pf-p",0],["#pf-q",3]),'A = 3/(−1 − 2) = −1 and B = 3/(2 + 1) = 1, so 3/((x + 1)(x − 2)) = −1/(x + 1) + 1/(x − 2). The cover-up divides by (a − b), which is negative here. Check at x = 3: 3/4 = −1/4 + 1.')],
 ('Find ∫ (3x + 1)/((x + 1)(x − 2)) dx.',[
  '<b>Decompose.</b> (3x + 1)/((x + 1)(x − 2)) = A/(x + 1) + B/(x − 2).',
  '<b>Clear denominators.</b> 3x + 1 = A(x − 2) + B(x + 1).',
  '<b>Cover-up.</b> x = 2: 7 = 3B, so B = 7/3. x = −1: −2 = −3A, so A = 2/3.',
  '<b>Integrate each piece.</b> ∫ [ (2/3)/(x + 1) + (7/3)/(x − 2) ] dx.',
  '<b>Answer.</b> <b>(2/3) ln|x + 1| + (7/3) ln|x − 2| + C</b>.'],_pffig),
 ['Forgetting long division when the top has degree ≥ the bottom.','Mixing up A and B when substituting the roots.','Dropping the absolute value in ln|x − a|.','Using partial fractions on ∫ 1/(x² + 1), which is arctan.','Splitting a sum in the denominator: 1/(x + y) ≠ 1/x + 1/y.'],
 ('Long division',['If the degree of the numerator is at least the degree of the denominator, divide first. For example (x² + 3x + 5)/(x + 1) = x + 2 + 3/(x + 1), and the integral is x²/2 + 2x + 3 ln|x + 1| + C.']),
 [('(5x + 1)/((x − 1)(x + 1)) = A/(x − 1) + B/(x + 1). Then A =',['3','2','−2','5'],0,'Cover-up at x = 1: (5·1 + 1)/(1 + 1) = 3.')])

mod('improper','Improper integrals',
 'What if the area stretches out forever, or the function blows up inside the interval? Sometimes the area is still finite.',
 ['An integral is <b>improper</b> if one limit is ∞ or the integrand blows up on the interval. Replace the troublesome point by a variable and take a limit: <span class="m">∫<sub>1</sub><sup>∞</sup> f dx = lim<sub>b→∞</sub> ∫<sub>1</sub><sup>b</sup> f dx</span>. If the limit is a number the integral <b>converges</b> to it; if not, it <b>diverges</b>.',
  'The benchmark: <span class="m">∫<sub>1</sub><sup>∞</sup> 1/x<sup>p</sup> dx</span> converges iff <b>p &gt; 1</b> (to 1/(p − 1)); and <span class="m">∫<sub>0</sub><sup>1</sup> 1/x<sup>p</sup> dx</span> converges iff <b>p &lt; 1</b> (to 1/(1 − p)). So 1/x² has finite area from 1 to ∞, but 1/x does not, narrowly.'],
 ('definite integrals had finite limits and a continuous integrand','a limit definition for unbounded cases','∫ e^{−x} dx from 0 to ∞, and the p-test for series','improper integrals'),
 [('∫<sub>a</sub><sup>∞</sup> f = lim<sub>b→∞</sub> ∫<sub>a</sub><sup>b</sup> f','infinite limit'),('∫<sub>1</sub><sup>∞</sup> x<sup>−p</sup> dx converges iff p &gt; 1','value 1/(p − 1)'),('∫<sub>0</sub><sup>1</sup> x<sup>−p</sup> dx converges iff p &lt; 1','value 1/(1 − p)')],
 [lab('ip-lab','Area that never stops, or does',canvas='ip-canvas',aria='A graph of one over x to the p with shaded area out to a growing limit, and the area so far compared with the limiting value.',
   seg=('ip-ty','Type',[('inf','∫₁^∞ 1/xᵖ dx'),('pt','∫₀¹ 1/xᵖ dx')]),ctl=[('ip-p','p',.4,3,.05,2),('ip-z','How far out (or how close to 0)',0,3,.05,1)],
   out=[('ip-area','area so far','x'),('ip-lim','the limit','v'),('ip-ver','converges?','')])],
 [('Set p = 2 and push the slider out. What does the area approach? <button type="button" class="btn link" data-show=\'' + show(["click","#ip-ty [data-k=inf]"],["#ip-p",2],["#ip-z",3]) + '\'>Set it up for me</button>','' ,'1: the area from 1 to b is 1 − 1/b → 1. The infinite tail has finite area.'),
  ('Set p = 1 and push out. Does it level off? <button type="button" class="btn link" data-show=\'' + show(["click","#ip-ty [data-k=inf]"],["#ip-p",1],["#ip-z",3]) + '\'>Set it up for me</button>','' ,'No: the area is ln b, which grows forever (slowly). ∫ 1/x from 1 to ∞ diverges.'),
  ('Choose ∫₀¹ 1/xᵖ dx and set p = 0.5. Does it converge near 0?',show(["click","#ip-ty [data-k=pt]"],["#ip-p",0.5],["#ip-z",3]),'Yes, to 1/(1 − p) = 2. A singularity at 0 is tolerable when p &lt; 1: the curve climbs, but slowly enough to keep the area finite. The pattern is the reverse of the one at ∞.'),
  ('Choose ∫₁^∞ 1/xᵖ dx and set p = 1.5. What does it converge to?',show(["click","#ip-ty [data-k=inf]"],["#ip-p",1.5],["#ip-z",3]),'To 1/(p − 1) = 2. Any p &gt; 1 converges at ∞, and it gets slower to converge as p drops toward 1, where it fails.'),
  ('Choose ∫₀¹ 1/xᵖ dx and set p = 1. Converge or diverge?',show(["click","#ip-ty [data-k=pt]"],["#ip-p",1],["#ip-z",3]),'Diverges: the area from ε to 1 is ln(1/ε), which grows without bound as ε → 0. p = 1 is the borderline for both types of integral.')],
 ('Decide whether ∫<sub>1</sub><sup>∞</sup> 1/x² dx and ∫<sub>1</sub><sup>∞</sup> 1/x dx converge, and evaluate any that do.',[
  '<b>Replace ∞ by b.</b> ∫<sub>1</sub><sup>b</sup> x<sup>−2</sup> dx = [−1/x]<sub>1</sub><sup>b</sup> = 1 − 1/b.',
  '<b>Take the limit.</b> lim<sub>b→∞</sub> (1 − 1/b) = 1. Converges to <b>1</b>.',
  '<b>The other.</b> ∫<sub>1</sub><sup>b</sup> 1/x dx = ln b, and lim<sub>b→∞</sub> ln b = ∞.',
  '<b>Answer.</b> The first converges to <b>1</b>; the second <b>diverges</b>.'],_ipfig),
 ['Plugging ∞ in as a number. Always take a limit of an integral with a variable limit.','Forgetting the integrand can be unbounded at an interior point, which also makes it improper.','Thinking a tail that gets small must have finite area: 1/x → 0 but its area diverges.','Reversing the p-conditions for the two types (p &gt; 1 at ∞; p &lt; 1 at 0).','Forgetting to split an integral with a problem point inside.'],
 ('Comparison',['If 0 ≤ f ≤ g and ∫ g converges, then ∫ f converges; if ∫ f diverges, so does ∫ g. This lets you decide convergence without finding the value, and it returns in the series tests.']),
 [('∫<sub>1</sub><sup>∞</sup> 1/x<sup>3/2</sup> dx',['converges to 2','converges to 1','diverges','converges to 3/2'],0,'p = 3/2 > 1: value 1/(p − 1) = 2.')])

mod('euler','Euler\'s method',
 'When you cannot solve a differential equation, you can still follow its slopes in small steps.',
 ['Start at the initial point <span class="m">(x₀, y₀)</span>. The differential equation gives the slope there. Walk along that tangent line for a short step <span class="m">Δx = h</span>, arrive at a new point, find the new slope, and repeat. The rule is <span class="m">y<sub>n+1</sub> = y<sub>n</sub> + h·F(x<sub>n</sub>, y<sub>n</sub>)</span> with <span class="m">x<sub>n+1</sub> = x<sub>n</sub> + h</span>.',
  'Smaller steps follow the true curve more closely. Euler\'s method underestimates when the solution is concave up (it follows tangent lines, which lie below), and overestimates when concave down. It is a numerical approximation of a solution you could trace by hand on a slope field.'],
 ('a tangent line gave one estimate','a chain of tangent-line steps','solving equations that have no closed form','Euler\'s method'),
 [('y<sub>n+1</sub> = y<sub>n</sub> + h·F(x<sub>n</sub>, y<sub>n</sub>)','Euler step'),('x<sub>n+1</sub> = x<sub>n</sub> + h','move right'),('smaller h → better estimate','but never exact')],
 [lab('eu-lab','Step along the slopes',canvas='eu-canvas',aria='The true solution curve with the polyline from Euler\'s method for a chosen step size.',
   seg=('eu-fn','Equation',[('a','dy/dx = y, y(0) = 1'),('b','dy/dx = x − y, y(0) = 1'),('c','dy/dx = −2xy, y(0) = 1')]),
   pre='<div class="ctl"><span class="lbl">Step size h</span><div class="seg" id="eu-h" role="group" aria-label="Step size"><button type="button" data-k="h1" aria-pressed="false">1</button><button type="button" data-k="h05" aria-pressed="true">0.5</button><button type="button" data-k="h025" aria-pressed="false">0.25</button><button type="button" data-k="h01" aria-pressed="false">0.1</button><button type="button" data-k="h005" aria-pressed="false">0.05</button></div></div>',
   out=[('eu-est','Euler estimate at x = 2','x'),('eu-ex','exact value','v'),('eu-err','error','a')],post='<div class="tablewrap"><table class="lmtbl" id="eu-tbl" aria-label="Euler steps"></table></div>')],
 [('Use h = 1 on dy/dx = y. Is the estimate too high or too low? <button type="button" class="btn link" data-show=\'' + show(["click","#eu-fn [data-k=a]"],["click","#eu-h [data-k=h1]"]) + '\'>Set it up for me</button>','' ,'Too low: the exact y = eˣ is concave up, so each tangent line lies below it. With h = 1 the estimate at x = 2 is 4 versus the exact 7.39.'),
  ('Now shrink h to 0.05. What happens to the error? <button type="button" class="btn link" data-show=\'' + show(["click","#eu-fn [data-k=a]"],["click","#eu-h [data-k=h005]"]) + '\'>Set it up for me</button>','' ,'It shrinks a lot: more, shorter steps hug the curve. The error is roughly proportional to h.'),
  ('Use h = 1 on dy/dx = −2xy, y(0) = 1. What does the estimate at x = 2 look like?',show(["click","#eu-fn [data-k=c]"],["click","#eu-h [data-k=h1]"]),'It is −1, an impossible value: the exact solution e^(−x²) is always positive. The first step uses slope 0 at x = 0, and the second step overshoots badly. A step size that is too large can give nonsense.'),
  ('Use h = 0.5 on dy/dx = y. Predict the estimate at x = 2 before you look.',show(["click","#eu-fn [data-k=a]"],["click","#eu-h [data-k=h05]"]),'Each step multiplies y by 1 + h = 1.5, and there are 4 steps: 1.5⁴ = 5.0625 (exact 7.389). With h = 1 it was 2² = 4, and with h = 0.05 it is 1.05⁴⁰ ≈ 7.04.')],
 ('Use Euler\'s method with h = 0.5 to estimate y(1) if dy/dx = x + y and y(0) = 1.',[
  '<b>Step 1 from (0, 1).</b> slope = 0 + 1 = 1, so y₁ = 1 + 0.5(1) = 1.5 at x = 0.5.',
  '<b>Step 2 from (0.5, 1.5).</b> slope = 0.5 + 1.5 = 2, so y₂ = 1.5 + 0.5(2) = 2.5 at x = 1.',
  '<b>Answer.</b> y(1) ≈ <b>2.5</b>. (The exact solution is 2e − 2 ≈ 3.44: Euler underestimates since y is concave up.)'],_eufig),
 ['Using the slope at the old point for the wrong coordinates: use both x<sub>n</sub> and y<sub>n</sub>.','Forgetting to move x by h each step.','Stopping at the wrong number of steps: (x<sub>end</sub> − x₀)/h steps.','Believing Euler is exact. It is only an approximation.','Mixing up over- and under-estimates: tangent lines lie below a concave-up curve.'],
 ('Why it works',['Near a point the solution is almost its tangent line, whose slope the differential equation gives exactly. Each step makes a small error; many small steps keep the total error small. The smaller the step, the closer you stay to the true curve.']),
 [('Euler\'s method for dy/dx = x + y, y(0) = 2, h = 0.1 gives y₁ =',['2.2','2.1','2.0','2.3'],0,'slope at (0, 2) is 2, so y₁ = 2 + 0.1(2) = 2.2.')])

# ---- figures for Logistic models
import math
_lgP = lambda t: 500 / (1 + 9 * math.exp(-.02 * t))
_ti = math.log(9) / .02
_Lg = Plot((-12, 335), (-30, 580), (30, 12, 215, 196))
_lgf = fig(_Lg.axes((100, 200, 300), (250, 500), 't', 'P') + _Lg.curve(_lgP, 0, 330) + _Lg.dot(0, 50, '50', 'f', 18, -4), [
    (1, '', 'k = 0.02, L = 500', 'ink'),
    (2, _Lg.seg(0, 500, 330, 500, 'tan', 2, '6 4') + _Lg.text(330, 530, 'L = 500', 'tan', 11, 'end'), 'P → 500', 'tan'),
    (3, _Lg.seg(0, 250, _ti, 250, 'mut', 1.2, '3 4') + _Lg.dot(_ti, 250, 'P = 250', 'area', 34, 12), 'fastest at P = L/2 = 250', 'area'),
    (4, _Lg.seg(_ti - 45, 250 - 112.5, _ti + 45, 250 + 112.5, 'tan', 2.4), 'slope there kL/4 = 2.5', 'tan'),
    (5, '', 'inflection of the S-curve', 'area')],
    'The solution starting at P(0) = 50: steepest where it crosses half the carrying capacity, then leveling off at 500.', 230)
_fish = lambda t: 5000 / (1 + 24 * math.exp(-.4 * t))
_t1, _t2 = math.log(6) / .4, math.log(24) / .4
_Fi = Plot((-1, 25.5), (-300, 5800), (30, 12, 215, 196))
_lake = fig(_Fi.axes((5, 10, 15, 20, 25), (2500, 5000), 't', 'P') + _Fi.curve(_fish, 0, 25) + _Fi.dot(0, 200, '200', 'f', 22, -6), [
    (1, _Fi.seg(0, 5000, 25, 5000, 'tan', 2, '6 4') + _Fi.text(25, 5350, 'L = 5000', 'tan', 11, 'end'), 'P → 5000', 'tan'),
    (2, _Fi.seg(0, 2500, 25, 2500, 'mut', 1.2, '3 4'), 'fastest at 2500: 500 fish/yr', 'area'),
    (3, _Fi.dot(_t1, 1000, 'P = 1000', 'f', 30, 6), 'P = 1000: concave up', 'dd'),
    (4, _Fi.dot(_t2, 2500, 't ≈ 7.95', 'area', 32, 14), 'reaches 2500 at t ≈ 7.945', 'area'),
    (5, '', 'harvest ≤ 500/yr is sustainable', 'ink')],
    'The fish population: nearly exponential at first, steepest at 2500 fish, then leveling off at the carrying capacity.', 230)

mod('logistic','Logistic models',
 'Real populations do not grow forever. A logistic model grows fast when small, slows as it approaches a carrying capacity, and levels off.',
 ['<span class="m">dP/dt = kP(1 − P/L)</span>. When P is small the factor (1 − P/L) is near 1, so growth is almost exponential. As P approaches the <b>carrying capacity L</b>, the factor shrinks to 0 and growth stops. P = 0 and P = L are equilibria; L is stable. The solution is an S-shaped curve with limit L.',
  'The growth rate dP/dt is a parabola in P: zero at P = 0 and P = L, and <b>largest at P = L/2</b>, where the S-curve has its inflection point and steepest slope. The maximum rate is kL/4. Everything here (limit, max rate, inflection) can be read from the differential equation without solving it.'],
 ('exponential growth forever','growth that levels off at a limit','populations, spread of disease, adoption of technology','the logistic differential equation'),
 [('dP/dt = kP(1 − P/L)','logistic'),('lim P = L','carrying capacity'),('max growth at P = L/2, rate kL/4','inflection of the S-curve')],
 [lab('lg-lab','The S-curve and its rate',canvas='lg-canvas',aria='Top: population against time, an S-shaped curve with a dashed line at the carrying capacity. Bottom: growth rate against population, a parabola.',
   ctl=[('lg-k','k',.1,1,.05,.5),('lg-L','Carrying capacity L',2,10,.5,8),('lg-p0','Start P₀',.2,10,.2,1),('lg-t','Time t',0,20,.1,6)],canvas2=('lg-canvas2','Growth rate dP over dt against P, with the current population marked.'),
   out=[('lg-P','P(t)','x'),('lg-dP','dP/dt now','v'),('lg-max','fastest growth','a')])],
 [('Set P₀ = 1, L = 8. When is the population growing fastest?',show(["#lg-p0",1],["#lg-L",8],["#lg-k",0.5]),'When P = L/2 = 4 (the steepest part of the S, and the top of the parabola below). The maximum rate is kL/4 = 0.5·8/4 = 1.'),
  ('Now raise k to 1. What changes, and what does not?',show(["#lg-p0",1],["#lg-L",8],["#lg-k",1]),'The fastest rate doubles to kL/4 = 1·8/4 = 2, and the S-curve happens in half the time. But growth is still fastest at P = 4, and the limit is still L = 8: k sets the speed, L sets where it ends.'),
  ('Start exactly at half the carrying capacity: P₀ = 4, L = 8. Where is the inflection point?',show(["#lg-p0",4],["#lg-L",8],["#lg-k",0.5]),'There is none after t = 0. The population starts at the fastest-growth point, so the rate only falls from there and the curve is concave down the whole time.'),
  ('Start small: P₀ = 0.2, L = 8, and set t = 2. Compare P with the exponential 0.2e<sup>kt</sup>.',show(["#lg-p0",0.2],["#lg-L",8],["#lg-k",0.5],["#lg-t",2]),'The model gives P(2) ≈ 0.521; pure exponential growth would give 0.2e ≈ 0.544. While P is small, (1 − P/L) is close to 1, so logistic growth starts out nearly exponential. Later the two separate completely.'),
  ('Start P₀ above L (try P₀ = 10, L = 8). What does P do?',show(["#lg-p0",10],["#lg-L",8]),'It decreases toward L: (1 − P/L) is negative, so the model pulls the population back down to the carrying capacity.')],
 [('dP/dt = 0.02P(1 − P/500), P(0) = 50. Find lim<sub>t→∞</sub> P, the P at which growth is fastest, and the fastest rate.',[
  '<b>Compare with kP(1 − P/L).</b> k = 0.02, L = 500.',
  '<b>Limit.</b> The carrying capacity: lim P = 500 (since 0 &lt; P(0) &lt; L).',
  '<b>Fastest growth.</b> At P = L/2 = 250.',
  '<b>Rate.</b> kL/4 = 0.02(500)/4 = 2.5 per time unit.',
  '<b>Answer.</b> Limit <b>500</b>; fastest at <b>P = 250</b> with rate <b>2.5</b>.'],_lgf),
  {'h':'Worked example 2: stocking a lake (AP-style)','fig':_lake,
   'prob':'A lake is stocked with 200 fish. The population P(t), t years later, satisfies dP/dt = 0.4P(1 − P/5000). (a) Find lim<sub>t→∞</sub> P(t). (b) For what value of P is the population growing fastest, and how fast? (c) Is the graph of P concave up or concave down when P = 1000? Explain. (d) The solution is P(t) = 5000/(1 + 24e<sup>−0.4t</sup>). When does the population reach 2500?',
   'steps':['<b>(a)</b> Here k = 0.4 and L = 5000. Since 0 &lt; 200 &lt; 5000, lim P = <b>5000 fish</b>.',
    '<b>(b)</b> dP/dt is largest at P = L/2 = <b>2500</b>, where dP/dt = 0.4(2500)(1 − 1/2) = <b>500 fish per year</b>.',
    '<b>(c)</b> Differentiate the equation: d²P/dt² = 0.4(1 − 2P/5000)·dP/dt. At P = 1000, 1 − 2P/5000 = 0.6 &gt; 0 and dP/dt = 0.4(1000)(0.8) = 320 &gt; 0, so d²P/dt² &gt; 0: <b>concave up</b>. Below 2500 fish the growth is speeding up.',
    '<b>(d)</b> 5000/(1 + 24e<sup>−0.4t</sup>) = 2500 gives 24e<sup>−0.4t</sup> = 1, so t = ln 24 / 0.4 ≈ <b>7.945 years</b>. This is the inflection point, the steepest part of the S.',
    '<b>Why fisheries care (beyond the AP exam).</b> If H fish per year are caught, dP/dt = 0.4P(1 − P/5000) − H. The population can hold steady only if H is at most the largest natural growth rate, 500 per year, which happens when the lake holds 2500 fish. This is the idea of a "maximum sustainable yield".']}],
 ['Using L = the limit of dP/dt. L is the limit of P itself.','Reading the maximum growth at P = L instead of L/2.','Forgetting the sign: for P &gt; L the population decreases.','Confusing logistic with exponential growth.','Mixing up P (population) and dP/dt (growth rate) when reading graphs.','For concavity, forgetting the chain rule: d²P/dt² needs dP/dt as a factor.'],
 ('Solving it',['Separating variables with partial fractions gives P(t) = L/(1 + Ae<sup>−kt</sup>) with A = (L − P₀)/P₀. You rarely need the formula on the exam: the equation itself tells you the limit, the equilibria and where growth is fastest.']),
 [('In dP/dt = 0.1P(1 − P/200), the population is growing fastest when P =',['100','200','50','20'],0,'Fastest at half the carrying capacity: 200/2.')])

mod('arclen','Arc length',
 'How long is a curve? Approximate it with tiny straight pieces and use the Pythagorean theorem on each.',
 ['A tiny piece of the curve over a width dx rises by dy, so its length is <span class="m">√(dx² + dy²) = √(1 + (dy/dx)²) dx</span>. Adding them up: <span class="m">L = ∫<sub>a</sub><sup>b</sup> √(1 + (f′(x))²) dx</span>. The polygon with more and more short segments approaches this length.',
  'The integrand rarely has a nice antiderivative, which is why exam problems are chosen so that 1 + (f′)² is a perfect square, or ask you to evaluate with a calculator. Always differentiate first, then square f′ (not f), and then integrate.'],
 ('area and volume were integrals of lengths or areas','the length of a curve itself','cables, roads and paths','the arc length formula'),
 [('L = ∫ √(1 + (f′(x))²) dx','arc length of y = f(x)'),('ds = √(dx² + dy²)','a tiny piece'),('f′ first, then square','')],
 [lab('al-lab','Straight pieces along a curve',canvas='al-canvas',aria='A curve with a polygon of n straight segments along it, compared with the arc length integral.',
   seg=('al-fn','Curve',[('a','y = x² on [0, 2]'),('b','y = sin x on [0, π]'),('c','y = (2/3)x^(3/2) on [0, 3]')]),ctl=[('al-n','Segments n',1,40,1,4)],
   out=[('al-poly','length of the polygon','x'),('al-int','∫ √(1 + f′²) dx','v'),('al-diff','difference','a')])],
 [('Set n = 1 on y = x². How does the one-chord length compare with the arc length? <button type="button" class="btn link" data-show=\'' + show(["click","#al-fn [data-k=a]"],["#al-n",1]) + '\'>Set it up for me</button>','' ,'A straight chord is always shorter than the curve through the same end points. Chord: √(4 + 16) = 4.47; the curve is 4.65.'),
  ('Increase n to 40. What happens? <button type="button" class="btn link" data-show=\'' + show(["#al-n",40]) + '\'>n = 40</button>','' ,'The polygon length climbs toward the integral from below. The integral is the limit of polygon lengths as the pieces shrink.'),
  ('Choose y = sin x on [0, π] and set n = 1, then n = 4. What do the lengths do?',show(["click","#al-fn [data-k=b]"],["#al-n",1]),'One chord is the base π ≈ 3.142, and four chords give 3.790; the arc length is about 3.820. The polygon always stays below the curve and climbs toward the integral as n grows.'),
  ('Choose y = (2/3)x^(3/2) and set n = 3. How close is the polygon?',show(["click","#al-fn [data-k=c]"],["#al-n",3]),'Polygon 4.647 against the exact 14/3 ≈ 4.667: about 0.4% short with only 3 chords, because this curve is almost straight. The sine curve with 4 chords is about 0.8% short.')],
 ('Find the length of y = (2/3)x<sup>3/2</sup> from x = 0 to x = 3.',[
  '<b>Derivative first.</b> f′(x) = x<sup>1/2</sup>, so (f′)² = x.',
  '<b>Set up.</b> L = ∫<sub>0</sub><sup>3</sup> √(1 + x) dx.',
  '<b>Integrate.</b> (2/3)(1 + x)<sup>3/2</sup> from 0 to 3 = (2/3)(8 − 1).',
  '<b>Answer.</b> <b>14/3</b> ≈ 4.667.'],_alfig),
 ['Squaring f instead of f′ in 1 + (f′)².','Forgetting the square root or the 1.','Leaving the derivative inside √ without squaring: it is (f′)², not f′.','Using the area formula by mistake.','Not simplifying: look for 1 + (f′)² as a perfect square.'],
 ('Parametric arc length',['If x = x(t) and y = y(t), the length is ∫ √((dx/dt)² + (dy/dt)²) dt. The speed of a particle is the same square root, so arc length is the integral of speed.']),
 [('The arc length of y = f(x) on [a, b] is',['∫ √(1 + (f′)²) dx','∫ √(1 + f²) dx','∫ (1 + f′²) dx','∫ √(f′) dx'],0,'Pythagoras on dx and dy: √(dx² + dy²) = √(1 + (dy/dx)²) dx.')])
