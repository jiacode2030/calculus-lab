/* ---------------- Functions & transformations ---------------- */
(function functions(){
  const cv=$('#fn-canvas');if(!cv)return;
  const B={sq:{f:u=>u*u,n:'u²'},abs:{f:Math.abs,n:'|u|'},rt:{f:u=>u<0?NaN:Math.sqrt(u),n:'√u'},sin:{f:Math.sin,n:'sin u'}};
  let base='sq',a=1,b=1,h=0,kk=0;
  const g=x=>a*B[base].f(b*(x-h))+kk;
  const sim=glab('fn-canvas',{view:()=>({xr:[-6,6],yr:[-6,6]}),draw(ctx,P){curveD(ctx,P,B[base].f,-6,6,T.muted,1.6,400,[5,5]);curveD(ctx,P,g,-6,6,T.cx,2.8,600);dot(ctx,P.X(0),P.Y(0),4,T.muted);dot(ctx,P.X(h),P.Y(kk),6,T.hot,T.surface);}});
  function upd(){const u=`${b===1?'':nz(b)}(x${h===0?'':h<0?' + '+(-h):' − '+h})`.replace('(x)','x').replace(/^1/,'');const core=B[base].n.replace('u',b===1&&h===0?'x':u.startsWith('(')?u:'('+u+')');
    setText('fn-eq',`y = ${a===1?'':a===-1?'−':nz(a)+'·'}${B[base].n.replace('u',b===1&&h===0?'x':b===1?`(x${h<0?' + '+(-h):' − '+h})`:`${nz(b)}(x${h===0?'':h<0?' + '+(-h):' − '+h})`)}${kk===0?'':kk<0?' − '+(-kk):' + '+kk}`);
    setText('fn-ho','(0, 0)');setText('fn-hn',`(${nz(h)}, ${nz(kk)})`);sim.render();}
  ['a','b','h','k'].forEach(s=>bindRange('fn-'+s,v=>nz(v),v=>{if(s==='a')a=v;if(s==='b')b=v;if(s==='h')h=v;if(s==='k')kk=v;upd();}));
  segBind('fn-base','k',v=>{base=v;upd();});upd();drawers.functions=()=>sim.render();
  KEYS['fn-canvas']=['Move the sliders. The dashed grey curve is the parent; the orange dot is its key point.',[['cx','transformed graph'],['muted','parent function'],['hot','where the key point went']]];
  TIPS['fn-h']=el=>`h = ${nz(+el.value)}: inside the parentheses, so the graph moves ${+el.value>0?'right':+el.value<0?'left':'nowhere'} ${Math.abs(el.value)}.`;
  TIPS['fn-k']=el=>`k = ${nz(+el.value)}: outside, so the graph moves ${+el.value>0?'up':+el.value<0?'down':'nowhere'} ${Math.abs(el.value)}.`;
  TIPS['fn-a']=el=>`a = ${nz(+el.value)}: a vertical stretch by ${Math.abs(el.value)}${+el.value<0?', flipped over the x-axis':''}.`;
  TIPS['fn-b']=el=>`b = ${nz(+el.value)}: squeezes the graph horizontally by a factor of ${nz(+el.value)} (stretches it if b &lt; 1).`;
  GLOSS['composition']='f(g(x)): put x into g, then put the result into f.';
  GLOSS['parent function']='The simplest member of a family, like x² or |x|, before any shifting or stretching.';
  TT.functions='Let students move one slider at a time and say aloud which direction the graph moves before releasing.';
})();
(function(){
  PROBS.push({id:'fn-vertex',topic:'functions',title:'Read a transformation',gen(){const h=ri(-5,5),k=ri(-6,6),a=pick([1,2,3,-1,-2]),askH=Math.random()<.5;
    const fx=`${a===1?'':a===-1?'−':a}(${lin(h)})²${k===0?'':sgn(k)}`;
    return {q:`The graph of y = ${fx} is a parabola. What is the ${askH?'x':'y'}-coordinate of its vertex?`,ans:askH?h:k,unit:'',abs:.01,chk:askH?h:k,hint:'Compare with the parent y = x²: inside the parentheses shifts x (backwards), outside shifts y.',
      sol:`The vertex of y = a(x − h)² + k is (h, k) = (${nz(h)}, ${nz(k)}). The ${askH?'x':'y'}-coordinate is <b>${nz(askH?h:k)}</b>.`};}});
  PROBS.push({id:'fn-comp',topic:'functions',title:'Composition',gen(){const a=ri(1,4),b=ri(-5,5),c=ri(1,3),d=ri(-4,4),p=ri(-3,3),inner=c*p*p+d,ans=a*inner+b;
    return {q:`Let f(x) = ${polyTxt([a,b])} and g(x) = ${polyTxt([c,0,d])}. Find f(g(${nz(p)})).`,ans,unit:'',abs:.01,chk:ans,hint:'Work inside out: find g first, then put that result into f.',
      sol:`g(${nz(p)}) = ${nz(inner)}. Then f(${nz(inner)}) = ${a}(${nz(inner)}) ${sgn(b)} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'fn-inv',topic:'functions',title:'Inverse of a linear function',gen(){const a=pick([2,3,4,5,-2,-3]),b=ri(-6,6),x0=ri(-4,4),y0=a*x0+b;
    return {q:`Let f(x) = ${polyTxt([a,b])}. Find f<sup>−1</sup>(${nz(y0)}).`,ans:x0,unit:'',abs:.01,chk:(y0-b)/a,hint:`f⁻¹(y) is the x for which f(x) = y. Solve ${polyTxt([a,b])} = ${nz(y0)}.`,
      sol:`Solve ${polyTxt([a,b])} = ${nz(y0)}: ${a}x = ${nz(y0-b)}, so x = <b>${nz(x0)}</b>.`};}});
  PROBS.push({id:'fn-parity',topic:'functions',title:'Even, odd or neither',gen(){const E=['x^2+3','2*x^4-5','x^6-x^2','cos(x)+x^2','abs(x)-1'],O=['x^3-x','x^5+3*x','2*x^3','sin(x)+x','x^3-2*x^5'],N=['x^2+x','x^3+1','2*x+5','e^x','x^4-x^3'],kind=pick(['even','odd','neither']),e=pick({even:E,odd:O,neither:N}[kind]);
    const f=parseExpr(e),even=Math.abs(f(1.3)-f(-1.3))<1e-9,odd=Math.abs(f(1.3)+f(-1.3))<1e-9,truth=even&&!odd?'even':odd&&!even?'odd':'neither';
    const m=mcq(truth,['even','odd','neither']);return {q:`Is f(x) = ${pretty(e).replace('abs(x)','|x|')} even, odd or neither?`,choices:m.choices,ans:m.ans,hint:'Compute f(−x) and compare it with f(x) and with −f(x).',sol:`Replacing x by −x ${truth==='even'?'gives the same function (f(−x) = f(x))':truth==='odd'?'gives the negative (f(−x) = −f(x))':'gives neither f(x) nor −f(x)'}, so it is <b>${truth}</b>.`};}});
})();
