/* Clue table and "which method?" items for the Which-method trainer. A third entry / bc:true marks BC-only rows. */
METHODS.clues.push(
 ['Limit gives 0/0 at the point','Factor and cancel, rationalize with a conjugate, combine fractions, or L\'Hôpital\'s rule'],
 ['Limit as x → ±∞ of a rational function','Compare degrees of top and bottom (or divide by the highest power)'],
 ['"Find the slope at a point", "rate of change at an instant"','A derivative evaluated at that point'],
 ['A function inside another: sin(3x), (x² + 1)⁵, e^(x²)','Chain rule'],
 ['Two functions multiplied or divided, both containing x','Product rule or quotient rule'],
 ['Equation mixing x and y, such as x² + y² = 25; "find dy/dx"','Implicit differentiation'],
 ['Two quantities change with time and an equation links them','Related rates: differentiate with respect to t, then substitute'],
 ['"Estimate", "approximate" a value near a known point','Tangent-line approximation (linearization)'],
 ['"Where is f increasing / decreasing / has a maximum"','Sign chart of f′; first derivative test'],
 ['"Where is f concave up / down", "inflection point"','Sign of f″ and where it changes'],
 ['"Absolute maximum on [a, b]"','Candidates test: critical points and endpoints'],
 ['"Largest area / least cost / shortest distance"','Optimization: constraint, one variable, f′ = 0, justify'],
 ['"Must there be a point where…" with f continuous or differentiable','Intermediate Value Theorem, or Mean Value Theorem'],
 ['Total accumulated amount from a rate; "net change"','Definite integral of the rate (FTC)'],
 ['Rate given only in a table','Riemann sum or trapezoid estimate'],
 ['Derivative of ∫ₐ^g(x) f(t) dt','FTC Part 1 with the chain rule: f(g(x))·g′(x)'],
 ['Integral where an inside function\'s derivative also appears','u-substitution'],
 ['Area between two curves','∫ (top − bottom) dx, split at crossings'],
 ['Region spun around an axis','Disc or washer: π∫ (R² − r²) dx, radii from the axis'],
 ['Solid with known cross sections','V = ∫ A(x) dx with A from the base length'],
 ['dy/dx given in terms of x and y; "particular solution"','Separation of variables, then the initial condition'],
 ['"Particle", velocity v(t), "total distance"','∫ |v| dt for distance; ∫ v dt for displacement; signs of v and a for speeding up'],
 ['Product of x and eˣ, sin x, or ln x',  'Integration by parts (LIATE)',true],
 ['Fraction of polynomials with a factorable denominator',  'Partial fractions (after long division if needed)',true],
 ['Limits of integration at ∞, or integrand blows up',  'Improper integral: replace by a limit',true],
 ['x(t) and y(t) given','dy/dx = (dy/dt)/(dx/dt); speed √(x′² + y′²)',true],
 ['r = f(θ); "area enclosed"','½∫ r² dθ over the right interval of θ',true],
 ['Series with n! or aⁿ in the terms','Ratio test',true],
 ['Series that behaves like 1/nᵖ','Limit comparison with a p-series',true],
 ['Series with alternating signs','Alternating series test; error ≤ first omitted term',true],
 ['"Approximate f(x) by a polynomial", error','Taylor polynomial and the Lagrange error bound',true]);
(function(){
  const T={sub:'Direct substitution',alg:'Algebra first (factor, conjugate, common denominator), then substitute',lhop:'L\'Hôpital\'s rule',pow:'Power and sum rules',prod:'Product rule',quot:'Quotient rule',chain:'Chain rule',impl:'Implicit differentiation',
    rel:'Related rates: differentiate an equation in t',lin:'Tangent-line approximation',mvt:'Mean Value Theorem',ivt:'Intermediate Value Theorem',crit:'Sign chart of f′ (first derivative test)',conc:'Sign of f″ (concavity)',cand:'Candidates test on a closed interval',opt:'Optimization (constraint, one variable, f′ = 0)',
    ftc:'FTC: evaluate an antiderivative at the limits',ftc1:'FTC Part 1 with the chain rule',usub:'u-substitution',rsum:'Riemann or trapezoid sum',area:'Area between curves (top − bottom)',disc:'Washer method',cross:'Cross sections: integrate A(x)',sep:'Separation of variables',slope:'Read the slope field',
    parts:'Integration by parts',pf:'Partial fractions',impr:'Improper integral (a limit)',par:'dy/dx = (dy/dt)/(dx/dt)',pol:'Polar area ½∫ r² dθ',ratio:'Ratio test',comp:'Comparison with a p-series',alt:'Alternating series test',tay:'Taylor polynomial and Lagrange bound',geom:'Geometric series formula',
    avg:'Average value (1/(b − a))∫ f dx',dist:'∫ |v| dt'};
  const add=(q,right,wrong,explain,miss,bc)=>{const opts=[right,...wrong];const order=[0,1,2,3].sort(()=>Math.random()-.5);const shuffled=order.map(i=>opts[i]);METHODS.items.push({q,opts:shuffled,correct:shuffled.indexOf(right),explain,miss,bc});};
  add('Find lim<sub>x→3</sub> (x² − 9)/(x − 3).',T.alg,[T.lhop+' is overkill, but unnecessary here: first try plain substitution',T.ftc,T.ratio].map((x,i)=>i===0?T.sub:x),'It is 0/0, so factor: (x − 3)(x + 3)/(x − 3) = x + 3.');
  add('Differentiate f(x) = x² sin(3x).',T.prod,[T.chain+' alone',T.quot,T.usub],'The outermost operation is a product; the chain rule then appears inside sin(3x).');
  add('Find dy/dx on the curve x² + xy + y² = 7.',T.impl,[T.chain+' on x only',T.sep,T.rsum],'y cannot be isolated easily: differentiate both sides, treating y as a function of x.');
  add('A 13 ft ladder slides down a wall; the foot moves out at 2 ft/s. How fast does the top fall when the foot is 5 ft out?',T.rel,[T.opt,T.lin,T.ftc1],'Two quantities linked by x² + y² = 169 and both changing in time: related rates.');
  add('Estimate √16.2 without a calculator.',T.lin,[T.mvt,T.rsum,T.ivt],'Use the tangent line to √x at x = 16, a nearby easy value.');
  add('Find the absolute minimum of f(x) = x³ − 6x² on [0, 5].',T.cand,[T.mvt,T.ivt,T.conc],'A closed interval: compare f at the critical points and at both endpoints.');
  add('Find the dimensions of the rectangle of largest area with perimeter 80.',T.opt,[T.crit+' only',T.rsum,T.mvt],'Constraint (perimeter) lets you write the area in one variable; then A′ = 0 and justify.');
  add('Water flow rates are given in a table at uneven times. Estimate the total volume.',T.rsum,[T.ftc,T.mvt,T.avg],'Only data points are known, so use a trapezoid or Riemann sum with the table\'s subintervals.');
  add('Find d/dx ∫<sub>1</sub><sup>x²</sup> sin(t²) dt.',T.ftc1,[T.usub,T.parts,T.prod],'Upper limit x²: replace t by x² and multiply by (x²)′ = 2x.');
  add('Evaluate ∫ x cos(x²) dx.',T.usub,[T.parts,T.pf,T.sep],'The derivative of the inside x² (up to a constant) is present: u = x².');
  add('Find the area enclosed by y = x and y = x².',T.area,[T.disc,T.cross,T.avg],'Intersections, then ∫ (top − bottom) dx.');
  add('The region under y = √x on [0, 4] is revolved about the x-axis. Find the volume.',T.disc,[T.area,T.cross,T.avg],'Slices perpendicular to the axis are discs of radius √x.');
  add('Solve dy/dx = 2xy with y(0) = 3.',T.sep,[T.slope,T.usub+' on y only',T.parts],'All y\'s on one side, all x\'s on the other, integrate, use the initial condition.');
  add('A particle\'s velocity changes sign. Find the total distance traveled from t = 0 to t = 5.',T.dist,[T.ftc+' of v only',T.avg,T.lin],'Distance counts all movement; split where v changes sign and add absolute values.');
  add('Find ∫ x e<sup>x</sup> dx.',T.parts,[T.usub,T.pf,T.sep],'A product of x and eˣ; differentiating x makes it simpler: u = x, dv = eˣ dx.',undefined,true);
  add('Find ∫ (3x + 1)/((x − 1)(x + 2)) dx.',T.pf,[T.usub,T.parts,T.impr],'A fraction of polynomials with distinct linear factors: split into A/(x − 1) + B/(x + 2).',undefined,true);
  add('Decide whether Σ n!/3<sup>n</sup> converges.',T.ratio,[T.comp,T.alt,T.geom],'Factorials in the terms: the ratio test (L = ∞, so it diverges).',undefined,true);
  add('Decide whether Σ (n + 1)/(n³ + 5) converges.',T.comp,[T.ratio+' (it gives L = 1)',T.alt,T.geom],'The terms behave like 1/n², a convergent p-series: limit comparison.',undefined,true);
  add('Estimate the error in using the first four terms of 1 − 1/2 + 1/3 − 1/4 + … to approximate its sum.',T.alt,[T.ratio,T.tay,T.comp],'An alternating series with decreasing terms: error ≤ the first omitted term, 1/5.',undefined,true);
  add('Find the slope dy/dx at t = 2 for x = t³ − t, y = t² + 1.',T.par,[T.impl,T.chain+' only',T.pol],'Both coordinates depend on t: (dy/dt)/(dx/dt) = 4/11.',undefined,true);
  add('Find the area inside r = 2 + 2cos θ.',T.pol,[T.area,T.par,T.disc],'Polar area is (1/2)∫ r² dθ over [0, 2π].',undefined,true);
  add('Approximate sin(0.3) with an error less than 10⁻⁴ using a polynomial.',T.tay,[T.lin+' only',T.ratio,T.geom],'Use the Maclaurin polynomial and the Lagrange bound to choose the degree.',undefined,true);
})();
