/* ---------------- Continuity & the IVT ---------------- */
(function contin(){
  const cv=$('#ct-canvas');if(!cv)return;
  let kk=1,brk=false,cN=3;
  const f1=x=>x<2?x+1:kk*x-3;
  const sim=glab('ct-canvas',{view:()=>({xr:[-1,5],yr:[-2,8]}),draw(ctx,P){const e=1e-7;curveD(ctx,P,f1,-1,2-e,T.cx,2.8,200);curveD(ctx,P,f1,2,5,T.cx,2.8,200);
    const r=2*kk-3;hole(ctx,P.X(2),P.Y(3),5.5,T.cx,false);hole(ctx,P.X(2),P.Y(r),5.5,T.cx,true);vline(ctx,P,2,T.muted);}});
  const ok=()=>Math.abs(2*kk-3-3)<1e-9;
  function upd(){setText('ct-defd','f(2) = '+nz(2*kk-3)+' ✓');setText('ct-lim',ok()?'yes: both sides → 3 ✓':`no: left → 3, right → ${nz(2*kk-3)} ✗`);setText('ct-eq',ok()?'3 = 3 ✓':'✗');
    setText('ct-verdict',ok()?'continuous at 2':'discontinuous (jump)');sim.render();}
  bindRange('ct-k',v=>nz(v),v=>{kk=v;upd();});
  /* IVT */
  const f2=x=>x*x-2+(brk&&x>=1.5?3:0);
  const sim2=glab('ct-canvas2',{view:()=>({xr:[0,3],yr:[-3,10]}),draw(ctx,P){const e=1e-7;if(brk){curveD(ctx,P,f2,0,1.5-e,T.cx,2.8,200);curveD(ctx,P,f2,1.5,3,T.cx,2.8,200);hole(ctx,P.X(1.5),P.Y(.25),5,T.cx,false);hole(ctx,P.X(1.5),P.Y(3.25),5,T.cx,true);}else curveD(ctx,P,f2,0,3,T.cx,2.8,200);
      hline(ctx,P,cN,T.hot,[6,4]);const xs=cross();xs.forEach(x=>dot(ctx,P.X(x),P.Y(cN),6,T.ce,T.surface));
      dot(ctx,P.X(0),P.Y(f2(0)),5,T.ink);dot(ctx,P.X(3),P.Y(f2(3)),5,T.ink);label(ctx,'f(0) = −2',P.X(0)+8,P.Y(-2)+14,T.muted,'left','middle',MONO);label(ctx,'f(3) = '+nz(f2(3)),P.X(3)-8,P.Y(f2(3))-12,T.muted,'right','middle',MONO);}});
  function cross(){const out=[],n=3000;for(let i=0;i<n;i++){const a=3*i/n,b=3*(i+1)/n;if(brk&&a<1.5&&b>=1.5)continue;const u=f2(a)-cN,w=f2(b)-cN;if(u===0||u*w<0){out.push(solve(x=>f2(x)-cN,a,b,60));}}return out;}
  function upd2(){const xs=cross();setText('ct-ivt',xs.length?'x ≈ '+xs.map(x=>fmt(x,3)).join(', '):'no x in [0, 3] has f(x) = N');
    setText('ct-ivt2',!brk?'f is continuous and N is between f(0) and f(3): a crossing is guaranteed':(cN>.25&&cN<3.25?'f jumped over N, so the IVT cannot apply':'a crossing happens to exist, but the IVT does not promise it'));sim2.render();}
  bindRange('ct-c',v=>nz(v),v=>{cN=v;upd2();});
  $('#ct-brk').addEventListener('change',e=>{brk=e.target.checked;upd2();});
  upd();upd2();drawers.contin=()=>{sim.render();sim2.render();};
  $('#ct-lab').addEventListener('labreset',()=>{});
  KEYS['ct-canvas']=['Slide k and watch the filled dot meet the open circle.',[['cx','f(x)'],['ink','filled: f(2); open: where the left side is heading']]];
  KEYS['ct-canvas2']=['Slide N. The gold dot is where f(x) = N.',[['hot','the height N'],['ce','where f reaches N']]];
  TIPS['ct-k']=el=>`k = ${nz(+el.value)}: the right piece starts at 2k − 3 = ${nz(2*el.value-3)}. The left piece is heading to 3.`;
  GLOSS['continuous']='No breaks: f(a) exists, the limit exists, and they are equal.';
  GLOSS['IVT']='Intermediate Value Theorem: a continuous function on [a, b] takes every value between f(a) and f(b).';
  TT.contin='Ask students to say all three conditions aloud for each graph in the first lab. The IVT lab works best when they predict the crossing first.';
})();
(function(){
  PROBS.push({id:'ct-removable',topic:'contin',title:'Make a removable discontinuity continuous',gen(){const c=pick([-4,-3,-2,-1,1,2,3,4,5]),ans=2*c;
    return {q:`Let f(x) = (x² − ${c*c})/(${lin(c)}) for x ≠ ${nz(c)}, and f(${nz(c)}) = k. For what value of k is f continuous at x = ${nz(c)}?`,ans,unit:'',abs:.01,chk:limit(x=>(x*x-c*c)/(x-c),c,1),hint:'Continuity needs f(c) to equal the limit as x → c. Simplify the fraction first.',
      sol:`For x ≠ ${nz(c)}, (x² − ${c*c})/(${lin(c)}) = x ${c<0?'−':'+'} ${Math.abs(c)}, which tends to ${2*c} at x = ${nz(c)}. So k = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'ct-k2',topic:'contin',title:'Continuity of a piecewise function',gen(){const c=pick([-2,-1,1,2]),k=pick([-3,-2,-1,1,2,3]),a=ri(-3,3)||1,b=k*c*c-a*c;
    return {q:`Let f(x) = ${polyTxt([a,b])} for x ≤ ${nz(c)} and f(x) = kx² for x &gt; ${nz(c)}. Find k so that f is continuous at x = ${nz(c)}.`,ans:k,unit:'',abs:.01,chk:(a*c+b)/(c*c),hint:`Set the left value ${a}(${nz(c)}) ${sgn(b).trim()} equal to the right value k(${nz(c)})².`,
      sol:`Left side at x = ${nz(c)}: ${a}(${nz(c)}) ${sgn(b)} = ${nz(a*c+b)}. Right side: k·${c*c}. Setting ${c*c}k = ${nz(a*c+b)} gives k = <b>${nz(k)}</b>.`};}});
  PROBS.push({id:'ct-type',topic:'contin',title:'Classify a discontinuity',gen(){const T0=[['removable','lim<sub>x→a</sub> f(x) = 2 (both sides) but f(a) is not defined'],['removable','lim<sub>x→a</sub> f(x) = 5 but f(a) = 1'],['jump','lim<sub>x→a⁻</sub> f(x) = 1 and lim<sub>x→a⁺</sub> f(x) = 4'],['jump','lim<sub>x→a⁻</sub> f(x) = −2 and lim<sub>x→a⁺</sub> f(x) = 3, f(a) = −2'],['infinite','lim<sub>x→a⁺</sub> f(x) = ∞'],['infinite','lim<sub>x→a⁻</sub> f(x) = −∞'],['none (continuous)','lim<sub>x→a</sub> f(x) = 3 and f(a) = 3']],[ty,txt]=pick(T0);
    const m=mcq(ty,['removable','jump','infinite','none (continuous)']);return {q:`What kind of behavior at x = a does this describe? ${txt}.`,choices:m.choices,ans:m.ans,hint:'Compare the one-sided limits with each other, then with f(a).',sol:`Removable: the limit exists but differs from (or lacks) f(a). Jump: the sides disagree. Infinite: the function blows up. Here it is <b>${ty}</b>.`};}});
  PROBS.push({id:'ct-ivt',topic:'contin',title:'Apply the IVT',gen(){const a=ri(-3,2),b=a+ri(2,4),p=ri(-6,0),q=p+ri(6,12),v=ri(p+1,q-1),out=[p-ri(1,3),q+ri(1,3),p-ri(4,6),q+ri(4,6)];
    const m=mcq(String(v).replace('-','−'),out.map(x=>String(x).replace('-','−')));return {q:`f is continuous on [${nz(a)}, ${b}] with f(${nz(a)}) = ${nz(p)} and f(${b}) = ${q}. Which value must f take somewhere on [${nz(a)}, ${b}]?`,choices:m.choices,ans:m.ans,hint:'The IVT guarantees every value between f(a) and f(b).',sol:`Every value between ${nz(p)} and ${q} is taken. Only <b>${nz(v)}</b> lies in that range.`};}});
})();
