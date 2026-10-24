/* ---------------- The derivative & differentiability ---------------- */
(function deriv(){
  const cv=$('#dv-canvas');if(!cv)return;
  const cbrt=Math.cbrt;
  const F={sq:{f:x=>x*x,d:x=>2*x,yr:[-1,7],dr:[-5.5,5.5],why:''},abs:{f:Math.abs,d:x=>x===0?NaN:Math.sign(x),yr:[-1,3],dr:[-1.8,1.8],why:'a corner'},
    cr:{f:cbrt,d:x=>x===0?NaN:1/(3*Math.pow(Math.abs(x),2/3)),yr:[-2,2],dr:[-.5,4],why:'a vertical tangent'},st:{f:x=>x<0?x-1:x+1,d:x=>x===0?NaN:1,yr:[-4,4],dr:[-1,3],why:'a jump'}};
  let k='sq',x0=1;
  const set=v=>{const el=$('#dv-x');el.value=clamp(Math.round(v*20)/20,-2.5,2.5);el.dispatchEvent(new Event('input',{bubbles:true}));};
  const sim=glab('dv-canvas',{view:()=>({xr:[-2.5,2.5],yr:F[k].yr}),draw(ctx,P){const f=F[k].f,e=1e-7,y0=f(x0),h5=1e-5,sl=(f(x0)-f(x0-h5))/h5,sr=(f(x0+h5)-f(x0))/h5,m=Math.abs(sl-sr)<1e-2?D(f,x0):NaN;
      if(k==='st'){curveD(ctx,P,f,-2.5,-e,T.cx,2.8,200);curveD(ctx,P,f,0,2.5,T.cx,2.8,200);hole(ctx,P.X(0),P.Y(-1),5,T.cx,false);hole(ctx,P.X(0),P.Y(1),5,T.cx,true);}else curveD(ctx,P,f,-2.5,2.5,T.cx,2.8,500);
      if(isFinite(m)&&Math.abs(m)<8)line(ctx,P,x0-1,y0-m,x0+1,y0+m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(y0),7,T.hot,T.surface);},
    drag:(kind,x)=>{set(x);}});
  const sim2=glab('dv-canvas2',{h:w=>clamp(w*.3,170,240),view:()=>({xr:[-2.5,2.5],yr:F[k].dr}),draw(ctx,P){const d=F[k].d,e=1e-7;curveD(ctx,P,d,-2.5,-e,T.cv,2.6,300);curveD(ctx,P,d,e,2.5,T.cv,2.6,300);
      label(ctx,"f′(x): the slope of the graph above",P.box.x+8,P.box.y+10,T.cv,'left','middle',LABEL);const v=F[k].d(x0);if(isFinite(v)&&v>=F[k].dr[0]&&v<=F[k].dr[1])dot(ctx,P.X(x0),P.Y(v),6.5,T.cv,T.surface);else if(!isFinite(v)||Math.abs(x0)<1e-9)hole(ctx,P.X(x0),P.Y(0),5,T.cv,false);}});
  function upd(){const f=F[k].f,h=1e-5,sl=(f(x0)-f(x0-h))/h,sr=(f(x0+h)-f(x0))/h,big=v=>Math.abs(v)>2000;
    setText('dv-sl',big(sl)?'∞ (vertical)':fmt(sl,3));setText('dv-sr',big(sr)?'∞ (vertical)':fmt(sr,3));
    const ok=!big(sl)&&!big(sr)&&Math.abs(sl-sr)<1e-2;setText('dv-ok',ok?'yes: f′ = '+fmt((sl+sr)/2,3):'no: '+F[k].why);sim.render();sim2.render();}
  bindRange('dv-x',v=>nz(v),v=>{x0=v;upd();});segBind('dv-fn','k',v=>{k=v;upd();});upd();drawers.deriv=()=>{sim.render();sim2.render();};
  KEYS['dv-canvas']=['Drag the point (or use the slider). Orange is the tangent line; the green graph below records its slope.',[['cx','f(x)'],['hot','tangent line at the point'],['cv','f′(x), the slope function']]];
  TIPS['dv-x']=el=>`x = ${nz(+el.value)}. The green dot below is at height equal to the tangent's slope here.`;
  GLOSS['differentiable']='A function is differentiable at x if its derivative exists there: the graph is smooth, with a single non-vertical tangent.';
  GLOSS['derivative']='The slope of the tangent line, as a function of x. f′(x) = lim (f(x+h) − f(x))/h.';
  TT.deriv='Ask students to sketch f′ below before revealing it. At x = 0 for |x| and ∛x ask which of the three conditions fails.';
})();
(function(){
  PROBS.push({id:'dv-def',topic:'deriv',title:'Derivative from the definition',gen(){const a=ri(1,5),b=ri(-6,6),x0=ri(-3,3),ans=2*a*x0+b;
    return {q:`Evaluate lim h→0 [f(${nz(x0)} + h) − f(${nz(x0)})]/h for f(x) = ${polyTxt([a,b,0])}.`,ans,unit:'',abs:.01,chk:D(x=>a*x*x+b*x,x0),hint:'That limit is f′(x0). Expand f(x0 + h) − f(x0) and divide by h before letting h → 0.',
      sol:`The limit is f′(${nz(x0)}). Since f′(x) = ${cof(2*a,'x')}${pmt(b)}, f′(${nz(x0)}) = ${mulv(2*a,x0)}${pmt(b)} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'dv-nodiff',topic:'deriv',title:'Where is it not differentiable?',gen(){const c=ri(-4,4),kind=pick(['abs','cbrt','piece']);let ex,why;
    if(kind==='abs'){ex=`f(x) = |${lin(c)}|`;why='has a corner at x = '+nz(c);}else if(kind==='cbrt'){ex=`f(x) = (${lin(c)})<sup>1/3</sup>`;why='has a vertical tangent at x = '+nz(c);}else{ex=`f(x) = ${lin(c)} for x &lt; ${nz(c)} and f(x) = ${lin(c)} + 2 for x ≥ ${nz(c)}`;why='jumps at x = '+nz(c);}
    const m=mcq(`x = ${nz(c)}`,[`x = ${nz(-c)}`,'x = 0','nowhere']);
    return {q:`At which x is ${ex} not differentiable?`.replace('x = 0','x = 0'),choices:m.choices,ans:m.ans,hint:'Look for a corner, a vertical tangent or a discontinuity.',sol:`The function ${why}, so it is not differentiable at <b>x = ${nz(c)}</b>.`};}});
  PROBS.push({id:'dv-concept',topic:'deriv',title:'Differentiable or continuous?',gen(){const Q=[['f is differentiable at x = a. Which must be true?','f is continuous at x = a',['f has a corner at x = a','f(a) = 0','f′(a) = 0'],'Differentiable implies continuous.'],
      ['f is continuous at x = a. Which is true?','f might not be differentiable at x = a',['f must be differentiable at x = a','f′(a) = 0','f(a) = lim f(x) is false'],'Continuity does not guarantee a tangent: |x| is continuous at 0 and not differentiable.'],
      ['The left-hand slope of f at a is 2 and the right-hand slope is −2. Which is true?','f is not differentiable at a',['f′(a) = 0','f′(a) = 2','f is not continuous at a'],'The one-sided slopes disagree, so the derivative does not exist (a corner). f can still be continuous.']],
      [q,c,w,why]=pick(Q),m=mcq(c,w);return {q,choices:m.choices,ans:m.ans,hint:'Remember: differentiable ⇒ continuous, but not the other way around.',sol:why+` The answer: <b>${c}</b>.`};}});
})();
