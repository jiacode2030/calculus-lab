# ---- figures for series basics, p-series, comparison/ratio, alternating
import math as _m
_SB = Plot((0, 9.4), (-.2, 5.3), (30, 12, 215, 196))
_sbS = lambda n: 9 / 2 * (1 - 3 ** -n)
_sbT = lambda n: 3 * 3 ** -(n - 1)
_sbf = fig(_SB.axes((2, 4, 6, 8), (1, 3, 4.5), 'N', 'S_N') + ''.join(_SB.dot(n, _sbS(n), '', 'f') for n in range(1, 9)), [
    (1, ''.join(rect(_SB.X(n) - 6, _SB.Y(_sbT(n)), 12, _SB.Y(0) - _SB.Y(_sbT(n)), 'area', .4) for n in range(1, 7)) + _SB.text(1, 3.5, '3', 'ink', 11) + _SB.text(2, 1.5, '1', 'ink', 11) + _SB.text(3, .65, '⅓', 'ink', 11), 'a = 3, r = 1/3: terms 3, 1, 1/3, …', 'area'),
    (2, '', '|r| = 1/3 < 1: converges', 'ink'),
    (3, _SB.seg(0, 4.5, 9.4, 4.5, 'tan', 2, '6 4') + _SB.text(9.3, 4.85, '9/2', 'tan', 12, 'end'), 'sum = 3/(1 − 1/3) = 9/2', 'tan'),
    (4, ''.join(_SB.dot(n, n / (n + 1), '', 'dd') for n in range(1, 9)) + _SB.text(9.3, 1.35, 'n/(n+1) → 1', 'dd', 10.5, 'end'), 'terms n/(n+1) → 1, not 0: diverges', 'dd'),
    (5, '', 'converges to 9/2; the other diverges', 'ink')],
    'Blue dots: the partial sums of 3 + 1 + 1/3 + …, climbing to the dashed line at 9/2. Gold bars: the terms. Pink dots: the terms of Σ n/(n+1), which never shrink to 0.', 230)

_PS = Plot((0, 12.5), (-.05, 1.08), (30, 12, 215, 196))
_psf = lambda x: 1 / (x * x + 1)
_psg = lambda x: 1 / (x * x)
_psfig = fig(_PS.axes((2, 4, 6, 8, 10, 12), (.5, 1), 'x', 'y') + _PS.curve(_psf, 0, 12.3), [
    (1, _PS.dot(1, _psf(1), '', 'ink') + _PS.text(1.5, .56, 'f(1) = ½', 'ink', 11, 'start'), 'f(x) = 1/(x² + 1): positive, decreasing', 'ink'),
    (2, _PS.under(_psf, 1, 12.3, 'area', .3) + _PS.text(5.5, .22, '∫ = π/4', 'ink', 12), '∫₁^∞ f dx = π/4', 'area'),
    (3, ''.join(rect(_PS.X(n - 1), _PS.Y(_psf(n)), _PS.X(n) - _PS.X(n - 1), _PS.Y(0) - _PS.Y(_psf(n)), 'tan', .28, 'tan', 1) for n in range(2, 13)), 'rectangles for n ≥ 2 fit under the curve', 'tan'),
    (4, _PS.curve(_psg, 1, 12.3, 'dd', 2.2, '5 4') + _PS.seg(10, -.05, 10, 1.05, 'dd', 1.4, '4 4') + _PS.text(10.2, .85, 'N = 10', 'dd', 11, 'start'), 'dashed: 1/x², tail beyond N = 10', 'dd'),
    (5, '', 'tail ≤ ∫₁₀^∞ dx/x² = 0.1', 'dd')],
    'The blue curve and the gold area under it bound the sum of the orange rectangles. Dashed pink: 1/x², used to bound the tail after ten terms.', 230)

_T1 = Plot((0, 11), (0, 1.05), (30, 8, 215, 112))
_T2 = Plot((0, 11), (0, 1.4), (30, 158, 215, 112))
_ctr = lambda n: (n + 1) / (3 * n)
_ctq = lambda n: n * n * (n + 1) / (n ** 3 + 5)
_ctfig = fig(_T1.axes((2, 4, 6, 8, 10), (1 / 3, 1), 'n', 'ratio') + _T2.axes((2, 4, 6, 8, 10), (1,), 'n', 'aₙ/bₙ'), [
    (1, ''.join(_T1.dot(n, _ctr(n), '', 'f') for n in range(1, 11)), 'ratio (n + 1)/(3n)', 'f'),
    (2, _T1.seg(0, 1 / 3, 11, 1 / 3, 'tan', 2, '6 4') + _T1.seg(0, 1, 11, 1, 'dd', 1.4, '4 4') + _T1.text(10.8, .52, 'L = 1/3', 'tan', 11, 'end'), 'L = 1/3 < 1: converges', 'tan'),
    (3, ''.join(_T2.dot(n, _ctq(n), '', 'f') for n in range(1, 11)), 'aₙ/bₙ = n²(n + 1)/(n³ + 5)', 'f'),
    (4, _T2.seg(0, 1, 11, 1, 'tan', 2, '6 4') + _T2.text(10.8, 1.2, 'limit 1', 'tan', 11, 'end'), 'limit 1: same behavior as Σ 1/n²', 'tan'),
    (5, '', 'both converge', 'ink')],
    'Top: the ratio of consecutive terms of Σ n/3ⁿ settles at 1/3, below the pink line at 1. Bottom: the terms of the second series divided by 1/n² settle at 1.', 290)

_AS = Plot((0, 15), (.68, 1.05), (30, 12, 215, 196))
_asA = lambda N: sum((1 if n % 2 else -1) / n ** 2 for n in range(1, N + 1))
_asS = _m.pi ** 2 / 12
_asfig = fig(_AS.axes((2, 4, 6, 8, 10, 12, 14), (.7, .8, .9, 1), 'N', 'S_N') + _AS.seg(0, _asA(1), 0, _asA(1), 'f', 1) + pline([(_AS.X(n), _AS.Y(_asA(n))) for n in range(1, 15)], 'f', 1.5) + ''.join(_AS.dot(n, _asA(n), '', 'f', 0, -9, 3.5) for n in range(1, 15)), [
    (1, _AS.text(1.2, 1.015, 'b₁ = 1', 'ink', 10, 'start') + _AS.text(2.6, .73, 'b₂ = ¼', 'ink', 10, 'start'), 'bₙ = 1/n² decreases to 0', 'ink'),
    (2, _AS.seg(0, _asS, 15, _asS, 'tan', 2, '6 4') + _AS.text(14.8, _asS + .014, 'S ≈ 0.8225', 'tan', 11, 'end'), 'sums zigzag around S', 'tan'),
    (3, rect(_AS.X(0), _AS.Y(_asA(11)), _AS.X(15) - _AS.X(0), _AS.Y(_asA(10)) - _AS.Y(_asA(11)), 'area', .3) + _AS.seg(10, .68, 10, 1.05, 'mut', 1.2, '4 4'), 'S between S₁₀ and S₁₁', 'area'),
    (4, '', 'error ≤ b₁₁ = 1/121 < 0.01', 'dd'),
    (5, '', 'Σ 1/n² converges: absolute', 'ink')],
    'The partial sums swing above and below the dashed sum, each swing smaller. The gold band between S₁₀ and S₁₁ always traps S.', 230)

mod('seriesbasic','Series, geometric series & the nth-term test',
 'Can you add infinitely many numbers and get a finite answer? Sometimes yes: it depends on whether the terms shrink fast enough.',
 ['An <b>infinite series</b> Σ aₙ is the limit of its <b>partial sums</b> S_N = a₁ + … + a_N. If S_N approaches a number S, the series <b>converges</b> to S; otherwise it <b>diverges</b>. Think of walking toward a wall: half the distance, then half of what remains, and so on. The steps add up to the whole distance: 1/2 + 1/4 + 1/8 + … = 1.',
  'The <b>geometric series</b> Σ a rⁿ is the model: it converges exactly when |r| &lt; 1, and then the sum from n = 0 is <span class="m">a/(1 − r)</span> (first term over one minus the ratio). The <b>nth-term test</b> is a quick check for divergence: if aₙ does not go to 0, the series diverges. (The converse is false: 1/n → 0 yet Σ 1/n diverges.)'],
 ('a sum had finitely many terms','infinitely many terms, defined as a limit of partial sums','every later topic in Unit 10','series, convergence and the geometric series'),
 [('S_N = a₁ + … + a_N · Σ aₙ = lim S_N','partial sums'),('Σ a rⁿ = a/(1 − r), |r| &lt; 1','geometric series'),('aₙ ↛ 0 ⇒ Σ aₙ diverges','nth-term test')],
 [lab('sb-lab','Partial sums of a geometric series',canvas='sb-canvas',aria='Partial sums of a geometric series plotted against the number of terms, with a dashed line at the limit when it exists.',
   ctl=[('sb-a','First term a',-4,4,.5,2),('sb-r','Ratio r',-1.6,1.6,.05,.5),('sb-n','Number of terms N',1,30,1,10)],
   out=[('sb-s','partial sum S_N','x'),('sb-lim','a/(1 − r), if |r| < 1','v'),('sb-ver','the series','')])],
 [('Set r = 0.5, a = 2. What do the partial sums approach? <button type="button" class="btn link" data-show=\'' + show(["#sb-a",2],["#sb-r",0.5],["#sb-n",30]) + '\'>Set it up for me</button>','' ,'Toward 2/(1 − 0.5) = 4. After 30 terms the sum is within about 10⁻⁸ of it.'),
  ('Set r = −0.8. What happens, and what about r = 1.2? <button type="button" class="btn link" data-show=\'' + show(["#sb-r",-0.8],["#sb-n",30]) + '\'>r = −0.8</button>','' ,'With r = −0.8 the sums zigzag toward a/(1 + 0.8) = 1.11 (converges, |r| < 1). With r = 1.2 the terms grow, so the sums run away: diverges.'),
  ('Set a = 2 and r = 1. What do the partial sums do?',show(["#sb-a",2],["#sb-r",1],["#sb-n",30]),'They climb in a straight line, S<sub>N</sub> = 2N, reaching 60 at N = 30. The ratio r = 1 is the boundary: the terms stay at 2, never shrinking to 0, so the series diverges.'),
  ('Set r = −0.5 and a = 3. Where do the sums settle, and on which sides of the limit do they land?',show(["#sb-a",3],["#sb-r",-0.5],["#sb-n",30]),'They settle at 3/(1 + 0.5) = 2, landing alternately above and below it, because the terms alternate in sign.'),
  ('Flip the first term to a = −3 with r = 0.5. How does the limit change?',show(["#sb-a",-3],["#sb-r",0.5],["#sb-n",30]),'The limit is −3/(1 − 0.5) = −6: the formula a/(1 − r) scales with a, so flipping the sign of the first term flips the sum, and the sums descend instead of climbing.')],
 ('Find 3 + 1 + 1/3 + 1/9 + …, and decide about Σ n/(n + 1).',[
  '<b>Identify.</b> First term a = 3, ratio r = 1/3: geometric.',
  '<b>Check |r| &lt; 1.</b> 1/3 is between −1 and 1, so it converges.',
  '<b>Sum.</b> a/(1 − r) = 3/(1 − 1/3) = 3/(2/3) = 9/2.',
  '<b>The other series.</b> aₙ = n/(n + 1) → 1 ≠ 0, so by the nth-term test Σ n/(n + 1) diverges.',
  '<b>Answer.</b> The geometric series converges to <b>9/2</b>; the second one <b>diverges</b>.'],_sbf),
 ['Using a/(1 − r) when |r| ≥ 1.','Starting at the wrong n: a/(1 − r) assumes the first term is a (starting n = 0). For Σ from n = 1 use a₁/(1 − r).','Concluding a series converges because aₙ → 0 (the nth-term test can only prove divergence).','Confusing the sequence aₙ with the series Σ aₙ.','Forgetting that r is the ratio of consecutive terms.'],
 ('Repeating decimals',['A repeating decimal is a geometric series: 0.777… = 7/10 + 7/100 + … = (7/10)/(1 − 1/10) = 7/9. And 0.2323… = 23/99.']),
 [('Σ<sub>n=0</sub><sup>∞</sup> 5(2/3)<sup>n</sup> =',['15','10','5','diverges'],0,'a/(1 − r) = 5/(1 − 2/3) = 15.')])

mod('pseries','p-series & the integral test',
 'Compare a sum with an area. If the area under the curve is finite, so is the sum, and vice versa.',
 ['The <b>p-series</b> Σ 1/nᵖ converges if p &gt; 1 and diverges if p ≤ 1. For p = 1 this is the <b>harmonic series</b> 1 + 1/2 + 1/3 + …, which diverges, very slowly: it takes about 12,000 terms to pass 10.',
  'The reason is the <b>integral test</b>: if f is positive, continuous and decreasing, Σ f(n) and ∫₁^∞ f(x) dx either both converge or both diverge. The terms are the heights of rectangles under (or over) the curve, so the sum is squeezed between ∫₁^{N+1} f and f(1) + ∫₁^N f. The same picture bounds the <b>tail</b> of a convergent series: Σ_{n&gt;N} f(n) ≤ ∫_N^∞ f.'],
 ('we compared a sum with itself','a comparison between a sum and an integral','harmonic and p-series, which every other test refers to','the p-series test and the integral test'),
 [('Σ 1/nᵖ converges iff p &gt; 1','p-series'),('∫₁^∞ f converges ⇔ Σ f(n) converges','integral test (f positive, decreasing)'),('tail ≤ ∫_N^∞ f(x) dx','bound on the remainder')],
 [lab('ps-lab','Rectangles under a curve',canvas='ps-canvas',aria='The curve one over x to the p with rectangles of width 1 whose heights are the terms, and partial sums compared with the integral.',
   ctl=[('ps-p','p',.4,3,.05,2),('ps-n','Terms N',1,40,1,10)],out=[('ps-sum','partial sum S_N','x'),('ps-int','∫ from 1 to N of 1/xᵖ','v'),('ps-ver','Σ 1/nᵖ','')])],
 [('Set p = 2 and N = 40. How big can the sum get? <button type="button" class="btn link" data-show=\'' + show(["#ps-p",2],["#ps-n",40]) + '\'>Set it up for me</button>','' ,'Never more than 1 + ∫₁^∞ 1/x² = 2 (the sum is actually π²/6 ≈ 1.645). The rectangles are under the curve, so the sum is bounded by the area.'),
  ('Set p = 1. Does the sum level off? <button type="button" class="btn link" data-show=\'' + show(["#ps-p",1],["#ps-n",40]) + '\'>Set it up for me</button>','' ,'No: S_N ≥ ∫₁^{N+1} dx/x = ln(N + 1), which grows without bound. The harmonic series diverges, but slowly.'),
  ('Set p = 1.5 and N = 40. Compare the partial sum with the bound 1 + 1/(p − 1).',show(["#ps-p",1.5],["#ps-n",40]),'S<sub>40</sub> ≈ 2.298, safely under the bound 1 + 1/0.5 = 3. The true sum is about 2.612, so the 40-term sum is still 0.31 short: a p-series with p near 1 converges slowly.'),
  ('Set p = 1.1 and N = 40. Does the series converge? How far along is it?',show(["#ps-p",1.1],["#ps-n",40]),'Yes, p = 1.1 &gt; 1, but S<sub>40</sub> is only about 3.68 while the bound is 1 + 1/0.1 = 11. When p is barely above 1 the tail is huge, so the sum is far from finished after 40 terms.'),
  ('Set p = 0.5 and N = 40. How does S<sub>N</sub> compare with the integral?',show(["#ps-p",0.5],["#ps-n",40]),'S<sub>40</sub> ≈ 11.27, above the integral 2(√40 − 1) ≈ 10.65, and both keep growing like 2√N without bound. Here the rectangles stay above the curve and the sum diverges.')],
 ('Use the integral test to decide Σ<sub>n=1</sub><sup>∞</sup> 1/(n² + 1), and bound the tail after N = 10 terms of Σ 1/n².',[
  '<b>Check the conditions.</b> f(x) = 1/(x² + 1) is positive, continuous and decreasing for x ≥ 1.',
  '<b>Integral.</b> ∫<sub>1</sub><sup>∞</sup> dx/(x² + 1) = lim [arctan x]<sub>1</sub><sup>b</sup> = π/2 − π/4 = π/4, finite.',
  '<b>Conclude.</b> The series converges.',
  '<b>Tail bound.</b> Σ<sub>n&gt;10</sub> 1/n² ≤ ∫<sub>10</sub><sup>∞</sup> dx/x² = 1/10.',
  '<b>Answer.</b> Converges; the remainder after 10 terms is at most <b>0.1</b>.'],_psfig),
 ['Using the integral test without checking positive, continuous, decreasing.','Thinking the integral equals the sum. They only share convergence (the sum is a different number).','Believing 1/n converges because its terms go to 0.','Mixing up p-series (p &gt; 1) with the p-integral near 0 (p &lt; 1).','Forgetting the first terms of the sum when estimating: S ≈ S_N + tail.'],
 ('Comparing the tests',['The p-series test is the integral test done once and for all for 1/nᵖ. The comparison tests (next module) use p-series as the benchmark: most rational-looking series behave like a p-series.']),
 [('Σ 1/n<sup>1.5</sup>',['converges (p = 1.5 > 1)','diverges (p ≤ 1)','converges to 1.5','diverges by the nth-term test'],0,'p-series with p = 1.5 > 1.')])

mod('convtests','Comparison & ratio tests',
 'Decide whether a series converges without finding its sum: compare it with one you know, or look at how fast the terms shrink.',
 ['<b>Direct comparison:</b> if 0 ≤ aₙ ≤ bₙ and Σ bₙ converges, then Σ aₙ converges; if aₙ ≥ bₙ ≥ 0 and Σ bₙ diverges, so does Σ aₙ. <b>Limit comparison:</b> if aₙ/bₙ → L with 0 &lt; L &lt; ∞, both series do the same thing. Pick bₙ by keeping only the dominant terms: (n + 1)/(n³ + 5) behaves like 1/n².',
  '<b>Ratio test:</b> let L = lim |aₙ₊₁/aₙ|. If L &lt; 1 the series converges absolutely; if L &gt; 1 it diverges; if L = 1 the test says nothing. It shines with factorials and exponentials (n!, 2ⁿ) and is useless for p-series (L = 1).'],
 ('tests for geometric and p-series only','general-purpose tests','almost every series you meet','comparison, limit comparison and the ratio test'),
 [('0 ≤ aₙ ≤ bₙ, Σ bₙ converges ⇒ Σ aₙ converges','direct comparison'),('lim aₙ/bₙ = L, 0 < L < ∞ ⇒ same behavior','limit comparison'),('L = lim |aₙ₊₁/aₙ|: < 1 converges, > 1 diverges, = 1 no information','ratio test')],
 [lab('ts-lab','The ratio of consecutive terms',canvas='ts-canvas',aria='The ratio of consecutive terms plotted against n with a dashed line at 1.',
   seg=('ts-fn','Series',[('a','n/2ⁿ'),('b','2ⁿ/n!'),('c','n!/3ⁿ'),('d','1/n²'),('e','1/n')]),pre='<p class="small" id="ts-form" style="margin:0"></p>',
   out=[('ts-r','|aₙ₊₁/aₙ| at n = 30','x'),('ts-l','the limit L','v'),('ts-ver','ratio test says','')]),
  lab('ts-lab2','Compare with a series you know',canvas='ts-canvas2',aria='Terms of two series plotted together to compare them.',
   seg=('ts-cm','Compare',[('a','1/(n²+1) vs 1/n²'),('b','1/√(n²−1) vs 1/n'),('c','1/(2ⁿ+1) vs 1/2ⁿ'),('d','1/ln n vs 1/n')]),pre='<p class="small" id="ts-cform" style="margin:0"></p>',
   out=[('ts-ra','aₙ/bₙ at n = 30','x'),('ts-cv','conclusion','')])],
 [('Choose 2ⁿ/n!. What does the ratio do as n grows? <button type="button" class="btn link" data-show=\'' + show(["click","#ts-fn [data-k=b]"]) + '\'>Set it up for me</button>','' ,'The ratio is 2/(n + 1), which goes to 0, so L = 0 &lt; 1: converges absolutely. Factorials grow faster than exponentials.'),
  ('Choose 1/n². What is L, and does the test decide? <button type="button" class="btn link" data-show=\'' + show(["click","#ts-fn [data-k=d]"]) + '\'>Set it up for me</button>','' ,'L = 1, so the ratio test is inconclusive. (1/n² converges, 1/n diverges, and both have L = 1.) Use the p-series test instead.'),
  ('Choose n!/3ⁿ. What happens to the ratio, and what does that mean?',show(["click","#ts-fn [data-k=c]"]),'The ratio is (n + 1)/3, which grows without bound, so L = ∞ &gt; 1 and the series diverges. The terms themselves eventually blow up, so the nth-term test agrees.'),
  ('In the second lab, choose 1/(n² + 1) vs 1/n². Which test is this, and what does the ratio aₙ/bₙ show?',show(["click","#ts-cm [data-k=a]"]),'Direct comparison: every term is smaller than the term of the convergent p-series 1/n², so it converges. The ratio aₙ/bₙ is close to 1 (0.9989 at n = 30), so limit comparison would agree.'),
  ('Choose 1/ln n vs 1/n. Why does this one diverge even though both terms go to 0?',show(["click","#ts-cm [data-k=d]"]),'Since ln n &lt; n, each term 1/ln n is larger than 1/n, and Σ 1/n diverges, so the bigger series diverges too. Comparison only proves divergence when your series is the larger one.')],
 ('Decide whether Σ n/3ⁿ and Σ (n + 1)/(n³ + 5) converge.',[
  '<b>First series: ratio test.</b> |aₙ₊₁/aₙ| = [(n + 1)/3ⁿ⁺¹]·[3ⁿ/n] = (n + 1)/(3n) → 1/3.',
  '<b>Conclude.</b> L = 1/3 &lt; 1, so it converges.',
  '<b>Second series: limit comparison with 1/n².</b> aₙ/bₙ = n²(n + 1)/(n³ + 5) → 1.',
  '<b>Conclude.</b> 0 &lt; 1 &lt; ∞ and Σ 1/n² converges, so it converges.',
  '<b>Answer.</b> Both <b>converge</b>.'],_ctfig),
 ['Using the ratio test on a p-series (L = 1 always).','Concluding "diverges" when L = 1. The test is inconclusive.','Comparing in the wrong direction: a series smaller than a divergent one proves nothing.','Applying direct comparison without positive terms.','Choosing bₙ that does not capture the dominant behavior.'],
 ('Choosing the test',['Factorials or exponentials in aₙ: ratio test. Rational function of n (or roots): limit comparison with a p-series. Terms like 1/(n² + 1) that are slightly smaller than 1/n²: direct comparison. If the terms alternate in sign: the next module.']),
 [('lim |aₙ₊₁/aₙ| = 2. Then Σ aₙ',['diverges','converges absolutely','converges conditionally','cannot be decided'],0,'L > 1: the ratio test says diverges.')])

mod('altser','Alternating series & error bounds',
 'Terms that alternate in sign can converge even when the unsigned series does not, and you get a neat built-in error bound.',
 ['An <b>alternating series</b> Σ (−1)ⁿ⁺¹ bₙ (with bₙ &gt; 0) converges if the terms <b>decrease</b> (bₙ₊₁ ≤ bₙ) and <b>go to 0</b>. That is the alternating series test. The partial sums swing back and forth, each overshooting the true sum less than before.',
  'That gives the <b>alternating series error bound</b>: stopping after N terms, the error is at most the first omitted term, <span class="m">|S − S_N| ≤ b_{N+1}</span>, and the true sum lies between S_N and S_{N+1}. Then separate the cases: Σ|aₙ| converges ⇒ <b>absolutely convergent</b> (and so convergent). If Σ aₙ converges but Σ|aₙ| diverges, it is <b>conditionally convergent</b>: the alternating harmonic series 1 − 1/2 + 1/3 − … is the classic example.'],
 ('all terms positive','signs that alternate','the alternating harmonic series and Taylor series error','the alternating series test and error bound'),
 [('Σ (−1)ⁿ⁺¹ bₙ converges if bₙ decreasing → 0','alternating series test'),('|S − S_N| ≤ b_{N+1}','error bound'),('Σ|aₙ| converges ⇒ absolute; else conditional if Σ aₙ converges','')],
 [lab('at-lab','Partial sums that swing',canvas='at-canvas',aria='Partial sums of an alternating series plotted against N, zigzagging toward the true sum, with the error band around it.',
   ctl=[('at-p','p in (−1)ⁿ⁺¹/nᵖ',.2,2.5,.1,1),('at-n','Terms N',1,30,1,8)],
   out=[('at-s','S_N','x'),('at-sum','the sum S (estimated)','v'),('at-err','error bound b(N+1)','a'),('at-ver','Σ (−1)ⁿ⁺¹/nᵖ is','')])],
 [('Set p = 1 (alternating harmonic series), N = 8. Where is the true sum, and how far off is S₈? <button type="button" class="btn link" data-show=\'' + show(["#at-p",1],["#at-n",8]) + '\'>Set it up for me</button>','' ,'The sum is ln 2 ≈ 0.693. S₈ ≈ 0.635, and the bound is 1/9 ≈ 0.111; the real error is 0.058, within the bound.'),
  ('Set p = 0.5 and then 2. What changes about the type of convergence? <button type="button" class="btn link" data-show=\'' + show(["#at-p",0.5]) + '\'>p = 0.5</button>','' ,'For 0 < p ≤ 1 it converges only because of the alternating signs (conditional). For p > 1 even the absolute values converge (absolute convergence).'),
  ('Set p = 2 and N = 10. How good is S₁₀, and what is the bound?',show(["#at-p",2],["#at-n",10]),'S<sub>10</sub> ≈ 0.8180 and the bound is b<sub>11</sub> = 1/121 ≈ 0.0083. The true sum is π²/12 ≈ 0.8225, so the real error is about 0.0045, within the bound.'),
  ('Set p = 0.3 and N = 30. Is the error bound useful here?',show(["#at-p",0.3],["#at-n",30]),'The series still converges (conditionally), but b<sub>31</sub> = 31<sup>−0.3</sup> ≈ 0.357, almost as large as the partial sum 0.386. The bound is correct but nearly useless: terms that shrink slowly need many terms.'),
  ('Set p = 1 and slide N from 8 to 9. Which side of the sum is S<sub>N</sub> on for odd N and for even N?',show(["#at-p",1],["#at-n",9]),'For odd N the partial sum is above the true sum ln 2 ≈ 0.693 (the last term added was positive), and for even N it is below. The true sum always lies between consecutive partial sums.')],
 ('How many terms of Σ (−1)ⁿ⁺¹/n² guarantee an error less than 0.01? Is the series absolutely convergent?',[
  '<b>Check the test.</b> bₙ = 1/n² is decreasing and → 0, so the series converges.',
  '<b>Error bound.</b> |S − S_N| ≤ b_{N+1} = 1/(N + 1)².',
  '<b>Require less than 0.01.</b> 1/(N + 1)² &lt; 0.01 ⇒ (N + 1)² &gt; 100 ⇒ N + 1 &gt; 10 ⇒ N ≥ 10.',
  '<b>Absolute?</b> Σ 1/n² is a convergent p-series (p = 2), so the series converges absolutely.',
  '<b>Answer.</b> <b>N = 10</b> terms; <b>absolutely</b> convergent.'],_asfig),
 ['Skipping the decreasing condition in the alternating series test.','Using b_N instead of b_{N+1} for the error bound.','Thinking every convergent alternating series converges absolutely.','Applying the error bound to a non-alternating series.','Counting the number of terms off by one: S_N has N terms and the bound is the (N + 1)th term.'],
 ('Absolute vs conditional',['Absolute convergence is the strongest kind: rearranging terms cannot change the sum. A conditionally convergent series like 1 − 1/2 + 1/3 − … is fragile: its terms can be rearranged to sum to any number (Riemann). In the course, you need to classify a series as absolutely convergent, conditionally convergent or divergent.']),
 [('Σ (−1)ⁿ/√n',['converges conditionally','converges absolutely','diverges','converges to 0'],0,'Terms decrease to 0 (so it converges), but Σ 1/√n is a divergent p-series (p = 1/2).')])

# ---- figures for Taylor polynomials
import math as _m
_E = Plot((-2.3, 2.3), (-1.2, 7.6), (30, 10, 212, 200))
_p = lambda c: (lambda x: sum(ci * x ** i for i, ci in enumerate(c)))
_tp = fig(_E.axes((-2, -1, 1, 2), (1, 4, 7), 'x', 'y') + _E.curve(_m.exp, -2.2, 2.02) + _E.text(1.6, 6.8, 'eˣ', 'f', 13, 'end'), [
    (1, _E.dot(0, 1, '', 'ink'), 'f⁽ᵏ⁾(0) = 1', 'ink'),
    (2, _E.curve(_p([1, 1]), -2.2, 2.2, 'tan', 1.3, '3 3') + _E.curve(_p([1, 1, .5]), -2.2, 2.2, 'tan', 1.3, '6 3') + _E.curve(_p([1, 1, .5, 1 / 6]), -2.2, 2.25, 'tan', 2.6) + _E.text(2.2, 2.6, 'P₃', 'tan', 12, 'end'), 'P₁, P₂, P₃ hug eˣ', 'tan'),
    (3, _E.seg(.5, -1, .5, 1.65, 'mut', 1.2, '3 3') + _E.dot(.5, 1.6458, '', 'tan'), 'P₃(0.5) = 1.6458', 'tan'),
    (4, '', '|error| ≤ 0.0044', 'dd'),
    (5, '', 'actual 0.0029', 'ink')],
    'eˣ (blue) and its Taylor polynomials (orange). Each extra term bends the polynomial closer to the curve near 0.', 230)
_S2 = Plot((-3.7, 3.7), (-2.2, 2.2), (30, 10, 212, 196))
_sinf = fig(_S2.axes((-3, 3), (-1, 1), 'x', 'y') + _S2.curve(_m.sin, -3.6, 3.6), [
    (1, _S2.curve(lambda x: x, -2.2, 2.2, 'tan', 1.2, '3 3'), 'x − x³/3! + x⁵/5! − …', 'ink'),
    (2, _S2.curve(lambda x: x - x ** 3 / 6, -3.1, 3.1, 'tan', 1.3, '6 3'), 'P₃(0.5) = 0.479167', 'tan'),
    (3, _S2.curve(lambda x: x - x ** 3 / 6 + x ** 5 / 120, -3.55, 3.55, 'tan', 2.6) + _S2.dot(.5, _m.sin(.5), '', 'ink'), 'P₅(0.5) = 0.479427', 'tan'),
    (4, '', '|error| ≤ 1.55 × 10⁻⁶', 'dd'),
    (5, rect(_S2.X(-_m.pi / 4), _S2.Y(2.2), _S2.X(_m.pi / 4) - _S2.X(-_m.pi / 4), _S2.Y(-2.2) - _S2.Y(2.2), 'area', .18) + _S2.text(0, -1.9, '[−π/4, π/4]', 'area', 10.5), 'only a small interval needed', 'area')],
    'sin x (blue) with the degree 1, 3 and 5 polynomials (orange). Near 0 they agree; far away they peel off.', 230)

mod('taylorpoly','Taylor polynomials & Lagrange error',
 'Approximate any smooth function near a point by a polynomial built from its derivatives. And know how big the error can be.',
 ['The <b>Taylor polynomial</b> of degree n centered at a is <span class="m">P_n(x) = Σ_{k=0}^{n} f⁽ᵏ⁾(a)(x − a)ᵏ/k!</span>. It matches f and its first n derivatives at a, so it hugs f near a. Degree 1 is the tangent line; degree 2 adds the bend. When a = 0 it is called a <b>Maclaurin polynomial</b>.',
  'The <b>Lagrange error bound</b> says how far off P_n can be: <span class="m">|f(x) − P_n(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)!</span>, where M is the maximum of |f⁽ⁿ⁺¹⁾| between a and x. Higher degree and a closer x make the bound tiny. This is how a computer can find sin 0.5 or e<sup>0.5</sup> using only addition and multiplication: with enough terms of a polynomial.'],
 ('the tangent line was our best local approximation','a whole polynomial of any degree','calculators, physics approximations and series','Taylor polynomials and the Lagrange error bound'),
 [('P_n(x) = Σ f⁽ᵏ⁾(a)(x − a)ᵏ/k!','Taylor polynomial'),('|R_n(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)!','Lagrange error bound'),('M = max |f⁽ⁿ⁺¹⁾| between a and x','')],
 [lab('tp-lab','Add terms and watch the fit improve',canvas='tp-canvas',aria='A function and its Taylor polynomial of the chosen degree, with the probe point and the error.',
   seg=('tp-fn','Function (centered at 0)',[('ex','eˣ'),('sn','sin x'),('cs','cos x'),('ln','ln(1+x)')]),ctl=[('tp-n','Degree n',0,12,1,3),('tp-x','Probe x',-2.8,2.8,.05,1)],
   out=[('tp-P','Pₙ(x)','x'),('tp-f','f(x)','v'),('tp-e','error |f − Pₙ|','a'),('tp-b','Lagrange bound','')])],
 [('On sin x, raise the degree from 1 to 7. What changes?',show(["click","#tp-fn [data-k=sn]"],["#tp-n",7],["#tp-x",2]),'The polynomial hugs sin x over a wider and wider interval around 0. At x = 2, P₇(2) ≈ 0.9079 while sin 2 ≈ 0.9093: the error is about 0.0014, and degree 9 cuts it to under 0.0001.'),
  ('Choose ln(1+x) and move the probe to x = 1.5. What happens as n grows?',show(["click","#tp-fn [data-k=ln]"],["#tp-n",8],["#tp-x",1.5]),'The error does not shrink: ln(1 + x) has a Taylor series only for −1 < x ≤ 1. Outside that interval the polynomials get worse, not better.'),
  ('Choose eˣ with n = 3 at x = 1. Compare the actual error with the Lagrange bound.',show(["click","#tp-fn [data-k=ex]"],["#tp-n",3],["#tp-x",1]),'P₃(1) = 1 + 1 + 1/2 + 1/6 ≈ 2.6667 against e ≈ 2.7183, an error of about 0.052. The bound uses M = e¹: e/4! ≈ 0.113. The bound is a guarantee, not an estimate, so it is usually bigger than the real error.'),
  ('Choose cos x and put the probe far out at x = 2.8. Compare degree 2 with degree 10.',show(["click","#tp-fn [data-k=cs]"],["#tp-n",2],["#tp-x",2.8]),'Degree 2 gives −2.92 against cos 2.8 ≈ −0.942, way off. Degree 10 gives about −0.9427, an error near 0.0005. Far from the center you need many more terms.')],
 [('Find the degree-3 Maclaurin polynomial of f(x) = e<sup>x</sup> and use the Lagrange bound to bound the error at x = 0.5.',[
  '<b>Derivatives at 0.</b> f⁽ᵏ⁾(0) = 1 for every k.',
  '<b>Polynomial.</b> P₃(x) = 1 + x + x²/2 + x³/6.',
  '<b>Estimate.</b> P₃(0.5) = 1 + 0.5 + 0.125 + 0.0208 = 1.6458 (true e<sup>0.5</sup> = 1.6487).',
  '<b>Bound.</b> f⁗ = eˣ ≤ e<sup>0.5</sup> &lt; 1.7 on [0, 0.5]. |error| ≤ 1.7(0.5)⁴/4! = 1.7(0.0625)/24 ≈ 0.0044.',
  '<b>Answer.</b> P₃ = <b>1 + x + x²/2 + x³/6</b>; error at 0.5 is at most <b>0.0044</b> (actual 0.0029).'],_tp)],
 ['Forgetting the k! in the denominators.','Using the (n)th derivative instead of the (n + 1)th in the Lagrange bound.','Using a polynomial far from its center and trusting it.','Mixing up the degree n and the number of terms (n + 1 terms for degree n).','Forgetting to evaluate the derivatives at the center a, not at x.'],
 ('Reading coefficients',['The coefficient of (x − a)ᵏ is f⁽ᵏ⁾(a)/k!. So if P₃(x) = 2 + 3x − 4x² + 10x³, then f(0) = 2, f′(0) = 3, f″(0) = 2!·(−4) = −8, f‴(0) = 3!·10 = 60.']),
 [('The coefficient of x³ in the Maclaurin series of f is',['f‴(0)/6','f‴(0)/3','f‴(0)','f⁗(0)/6'],0,'Coefficient of xᵏ is f⁽ᵏ⁾(0)/k!, so k = 3 gives f‴(0)/3! = f‴(0)/6.')])

mod('powser','Power series: radius & interval of convergence',
 'A power series is an infinite polynomial. It converges for x near its center, and the radius tells you how near.',
 ['A <b>power series</b> centered at c is Σ aₙ(x − c)ⁿ. It is a polynomial with infinitely many terms, so for each x it either converges or diverges. The set of x where it converges is an interval centered at c: the <b>interval of convergence</b>, with <b>radius R</b> (the series converges for |x − c| &lt; R and diverges for |x − c| &gt; R).',
  'Find R with the <b>ratio test</b> on |aₙ₊₁(x − c)ⁿ⁺¹ / aₙ(x − c)ⁿ| &lt; 1, then <b>test the endpoints</b> x = c ± R separately (the ratio test fails there, so use p-series, alternating, or nth-term). The radius can be 0 (only x = c) or ∞ (all x). Inside the radius, you may differentiate and integrate term by term, and the radius does not change.'],
 ('series of numbers','series with a variable','functions as infinite polynomials, and Taylor series','power series, radius and interval of convergence'),
 [('Σ aₙ(x − c)ⁿ','power series centered at c'),('R: |x − c| < R converges, > R diverges','radius of convergence'),('endpoints: test separately','x = c ± R')],
 [lab('pw-lab','Where does it converge?',canvas='pw-canvas',aria='Partial sums of the chosen power series at the probe x, plotted against the number of terms, and the interval of convergence on a number line.',
   seg=('pw-fn','Series',[('a','Σ xⁿ'),('b','Σ xⁿ/n'),('c','Σ xⁿ/n²'),('d','Σ xⁿ/n!'),('e','Σ n! xⁿ')]),ctl=[('pw-x','Probe x',-3,3,.05,.5)],
   out=[('pw-R','radius R','x'),('pw-int','interval of convergence','v'),('pw-st','at the probe x the series','')])],
 [('Choose Σ xⁿ/n. At x = 1 and x = −1 what happens? <button type="button" class="btn link" data-show=\'' + show(["click","#pw-fn [data-k=b]"],["#pw-x",1]) + '\'>x = 1</button>','' ,'At x = 1 it is the harmonic series (diverges); at x = −1 it is the alternating harmonic series (converges). So the interval is [−1, 1): the endpoints must be tested separately.'),
  ('Choose Σ n! xⁿ. For which x does it converge? <button type="button" class="btn link" data-show=\'' + show(["click","#pw-fn [data-k=e]"],["#pw-x",0.3]) + '\'>x = 0.3</button>','' ,'Only at x = 0: the terms n!xⁿ blow up for any x ≠ 0 (R = 0). Compare Σ xⁿ/n!, which converges for every x (R = ∞).')],
 ('Find the radius and interval of convergence of Σ<sub>n=1</sub><sup>∞</sup> (x − 2)ⁿ/(n·3ⁿ).',[
  '<b>Ratio test.</b> |aₙ₊₁/aₙ| = |x − 2|·n/(3(n + 1)) → |x − 2|/3.',
  '<b>Converges when</b> |x − 2|/3 &lt; 1, i.e. |x − 2| &lt; 3. So R = 3, center 2, open interval (−1, 5).',
  '<b>Endpoint x = 5.</b> Σ 3ⁿ/(n·3ⁿ) = Σ 1/n: harmonic, diverges.',
  '<b>Endpoint x = −1.</b> Σ (−3)ⁿ/(n·3ⁿ) = Σ (−1)ⁿ/n: alternating harmonic, converges.',
  '<b>Answer.</b> R = <b>3</b>; interval of convergence <b>[−1, 5)</b>.']),
 ['Forgetting to test the endpoints.','Stopping at |x − c| &lt; R and writing the interval as closed.','Confusing the radius with the interval (R = 3 has length 6).','Using the ratio test at the endpoints (it gives L = 1: inconclusive).','Forgetting the center: the interval is centered at c, not at 0.'],
 ('Term-by-term calculus',['Inside the radius, differentiate and integrate a power series term by term, and the radius stays the same. At the endpoints convergence may change. For example, from 1/(1 − x) = Σ xⁿ (|x| &lt; 1) you get 1/(1 − x)² = Σ n xⁿ⁻¹ and −ln(1 − x) = Σ xⁿ/n.']),
 [('Σ xⁿ/n² has interval of convergence',['[−1, 1]','(−1, 1)','[−1, 1)','(−1, 1]'],0,'R = 1. At x = ±1 it is Σ 1/n² (p = 2, converges) and the alternating version (converges), so both endpoints are included.')])

mod('maclaurin','Maclaurin series & operations',
 'A few series to know by heart, and a toolbox for building new ones: substitute, multiply, differentiate, integrate.',
 ['The key series (centered at 0): <span class="m">eˣ = Σ xⁿ/n!</span> (all x), <span class="m">sin x = Σ (−1)ⁿ x²ⁿ⁺¹/(2n + 1)!</span> (all x), <span class="m">cos x = Σ (−1)ⁿ x²ⁿ/(2n)!</span> (all x), and <span class="m">1/(1 − x) = Σ xⁿ</span> (|x| &lt; 1). Everything else can be made from these.',
  '<b>Substitute</b>: replace x by 2x or x²: e^{−x²} = Σ (−1)ⁿ x²ⁿ/n!. <b>Multiply</b> by x or a power. <b>Differentiate or integrate</b> term by term: integrating 1/(1 + x) gives ln(1 + x) = Σ (−1)ⁿ⁺¹ xⁿ/n; integrating 1/(1 + x²) gives arctan x = Σ (−1)ⁿ x²ⁿ⁺¹/(2n + 1). Series can also evaluate limits and integrals that have no closed form.'],
 ('a Taylor series needed derivatives computed from scratch every time','a short list plus rules for combining them','limits, integrals with no closed form, and approximations','the standard Maclaurin series and operations on series'),
 [('eˣ = Σ xⁿ/n! · 1/(1−x) = Σ xⁿ','sin x = Σ (−1)ⁿx²ⁿ⁺¹/(2n+1)! · cos x = Σ (−1)ⁿx²ⁿ/(2n)!'),('substitute · multiply · differentiate · integrate','new series from old'),('coefficient of xᵏ is f⁽ᵏ⁾(0)/k!','read off derivatives')],
 [lab('mc-lab','Build a series and compare',canvas='mc-canvas',aria='A function and its partial sum of the chosen Maclaurin series.',
   seg=('mc-fn','Function',[('ex','eˣ'),('e2','e^(−x²)'),('sn','sin x'),('sx','sin(x²)'),('at','arctan x'),('ln','ln(1+x)')]),ctl=[('mc-n','Number of nonzero terms',1,8,1,3)],pre='<p class="small" id="mc-form" style="margin:0"></p>',
   out=[('mc-ser','the series starts','x'),('mc-rad','converges for','v'),('mc-err','max error on the plotted window','a')])],
 [('Choose e^(−x²). Where does the series come from, and how many terms are needed near x = 1? <button type="button" class="btn link" data-show=\'' + show(["click","#mc-fn [data-k=e2]"],["#mc-n",4]) + '\'>Set it up for me</button>','' ,'Replace x by −x² in the series for eˣ: 1 − x² + x⁴/2 − x⁶/6 + …. With 4 terms the curve matches well for |x| ≤ 1.3 or so.'),
  ('Choose arctan x and increase the terms. What happens past |x| = 1? <button type="button" class="btn link" data-show=\'' + show(["click","#mc-fn [data-k=at]"],["#mc-n",6]) + '\'>Set it up for me</button>','' ,'The partial sums fly off: the series has radius 1. It was obtained by integrating Σ (−1)ⁿ x²ⁿ = 1/(1 + x²), which only converges for |x| < 1.')],
 ('Use known series to find the first three nonzero terms of x·sin(x²) and lim<sub>x→0</sub> (e<sup>x</sup> − 1 − x)/x².',[
  '<b>Substitute.</b> sin u = u − u³/6 + u⁵/120 − …, with u = x²: sin(x²) = x² − x⁶/6 + x¹⁰/120 − ….',
  '<b>Multiply by x.</b> x sin(x²) = x³ − x⁷/6 + x¹¹/120 − ….',
  '<b>Limit.</b> eˣ − 1 − x = x²/2 + x³/6 + …, so (eˣ − 1 − x)/x² = 1/2 + x/6 + … → 1/2.',
  '<b>Answer.</b> x³ − x⁷/6 + x¹¹/120; the limit is <b>1/2</b>.']),
 ['Not replacing x consistently when substituting (every x in the series changes).','Forgetting factorials in e<sup>x</sup>, sin and cos.','Using the sin series for cos (or the reverse): sin has odd powers, cos has even powers.','Forgetting the alternating sign (−1)ⁿ.','Ignoring the interval of convergence after substituting or integrating.'],
 ('Why these are enough',['Differentiating the series for sin x term by term gives the series for cos x, and integrating Σ xⁿ gives −ln(1 − x). The AP exam usually asks for the first few terms, a pattern (general term), or a value computed from a known series, and the error bound.']),
 [('The coefficient of x⁴ in the Maclaurin series of cos x is',['1/24','−1/24','1/12','1/6'],0,'cos x = 1 − x²/2! + x⁴/4! − …, and 4! = 24: the coefficient is +1/24.')])
