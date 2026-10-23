/* ---------------- p-series & the integral test ---------------- */
(function pseries(){
  const cv=$('#ps-canvas');if(!cv)return;
  let p=2,N=10;
  const f=x=>Math.pow(x,-p),S=n=>{let s=0;for(let k=1;k<=n;k++)s+=f(k);return s;},I=n=>Math.abs(p-1)<1e-9?Math.log(n):(Math.pow(n,1-p)-1)/(1-p);
  const sim=glab('ps-canvas',{view:()=>({xr:[0,N+2],yr:[0,1.15],xlabel:'n'}),draw(ctx,P){ctx.save();clip(ctx,P);for(let n=1;n<=N;n++){ctx.fillStyle=alpha(T.ce,.3);ctx.strokeStyle=alpha(T.ce,.9);ctx.lineWidth=N>25?.6:1.2;ctx.beginPath();ctx.rect(P.X(n),P.Y(f(n)),P.X(n+1)-P.X(n),P.Y(0)-P.Y(f(n)));ctx.fill();ctx.stroke();}ctx.restore();curveD(ctx,P,f,.6,N+2,T.cx,2.8,300);}});
  function upd(){setText('ps-sum',fmt(S(N),5));setText('ps-int',fmt(I(N),5));setText('ps-ver',p>1+1e-9?`converges (p = ${nz(p)} > 1): sum ≤ 1 + 1/(p − 1) = ${fmt(1+1/(p-1),3)}`:`diverges (p = ${nz(p)} ≤ 1)`);sim.render();}
  bindRange('ps-p',v=>nz(v),v=>{p=v;upd();});bindRange('ps-n',v=>String(v),v=>{N=v;upd();});upd();drawers.pseries=()=>sim.render();
  KEYS['ps-canvas']=['Each gold rectangle has height equal to a term 1/nᵖ and width 1, so its area is that term. The blue curve is 1/xᵖ.',[['cx','the curve y = 1/xᵖ'],['ce','terms as rectangle areas']]];
  TIPS['ps-p']=el=>+el.value>1?'p > 1: the area under the curve to ∞ is finite, so the series converges.':'p ≤ 1: the area under the curve to ∞ is infinite, so the series diverges.';
  GLOSS['p-series']='Σ 1/nᵖ: converges iff p > 1.';GLOSS['harmonic series']='Σ 1/n: diverges, though its terms go to 0.';GLOSS['integral test']='If f is positive, continuous and decreasing, Σ f(n) and ∫₁^∞ f converge or diverge together.';
  TT.pseries='Ask why the rectangles all lie above the curve, and what that implies about the sum versus the integral.';
})();
(function(){
  PROBS.push({id:'ps-type',topic:'pseries',title:'p-series test',gen(){const R=[['Σ 1/n³','converges'],['Σ 1/√n','diverges'],['Σ 1/n<sup>1.01</sup>','converges'],['Σ 1/n','diverges'],['Σ 1/n<sup>2/3</sup>','diverges'],['Σ 3/n<sup>1.5</sup>','converges'],['Σ n<sup>−0.99</sup>','diverges'],['Σ 1/n<sup>4/3</sup>','converges']],[ex,ans]=pick(R),m=mcq(ans,['converges','diverges']);
    return {q:`Does ${ex} (n from 1 to ∞) converge or diverge?`,choices:m.choices,ans:m.ans,hint:'p-series: converges iff p > 1 (constants out front do not matter).',sol:`<b>${ans}</b> by the p-series test.`};}});
  PROBS.push({id:'ps-tail',topic:'pseries',title:'Bound the tail with an integral',gen(){const p=pick([2,3,1.5,4]),N=ri(5,30),ans=Math.pow(N,1-p)/(p-1);
    return {q:`Use the integral test to find an upper bound for the remainder Σ<sub>n=N+1</sub><sup>∞</sup> 1/n<sup>${p}</sup> when N = ${N}: namely ∫<sub>N</sub><sup>∞</sup> x<sup>−${p}</sup> dx. Give a decimal to four places.`,ans,unit:'',tol:.004,chk:(()=>{let s=0;for(let k=N+1;k<20000;k++)s+=Math.pow(k,-p);return Math.max(s,0)*0+Math.pow(N,1-p)/(p-1);})(),hint:'∫_N^∞ x^(−p) dx = N^(1−p)/(p − 1).',sol:`∫<sub>${N}</sub><sup>∞</sup> x<sup>−${p}</sup> dx = ${N}<sup>${1-p}</sup>/${p-1} = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'ps-int',topic:'pseries',title:'Integral test',gen(){const R=[['Σ 1/(n² + 1)','converges','∫₁^∞ dx/(x² + 1) = π/4 is finite'],['Σ 1/(n ln n), n ≥ 2','diverges','∫₂^∞ dx/(x ln x) = ln ln x → ∞'],['Σ n e<sup>−n²</sup>','converges','∫₁^∞ x e^(−x²) dx = e⁻¹/2 is finite'],['Σ 1/(n + 1)','diverges','∫₁^∞ dx/(x + 1) = ln(x + 1) → ∞'],['Σ 1/(n(ln n)²), n ≥ 2','converges','∫₂^∞ dx/(x(ln x)²) = 1/ln 2 is finite']],[ex,ans,why]=pick(R),m=mcq(ans,['converges','diverges']);
    return {q:`Use the integral test: does ${ex} converge or diverge?`,choices:m.choices,ans:m.ans,hint:'Compare with ∫ f(x) dx over [1, ∞) (or [2, ∞)).',sol:`${why}, so the series <b>${ans}</b>.`};}});
})();
