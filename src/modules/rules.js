/* ---------------- Power, sum & constant-multiple rules ---------------- */
(function rules(){
  const cv=$('#ru-canvas');if(!cv)return;
  let n=3,x0=1.5;
  const f=x=>Math.pow(x,n),df=x=>n*Math.pow(x,n-1);
  const sim=glab('ru-canvas',{view:()=>({xr:[0,3],yr:[-3,9]}),draw(ctx,P){curveD(ctx,P,f,.001,3,T.cx,2.8,400);curveD(ctx,P,df,.001,3,T.cv,2.8,400);const y=f(x0),m=df(x0);line(ctx,P,x0-1,y-m,x0+1,y+m,T.hot,2,[6,4]);dot(ctx,P.X(x0),P.Y(y),6,T.cx,T.surface);dot(ctx,P.X(x0),P.Y(m),6,T.cv,T.surface);vline(ctx,P,x0,T.muted,[3,4]);}});
  function upd(){setText('ru-f','x^'+nz(n));setText('ru-d',`${nz(n)}·x^${nz(n-1)}`);setText('ru-num',`${fmt(D(f,x0),4)}  vs rule ${fmt(df(x0),4)}`);sim.render();}
  bindRange('ru-n',v=>nz(v),v=>{n=v;upd();});bindRange('ru-x',v=>nz(v),v=>{x0=v;upd();});upd();
  /* polynomial */
  let a=.5,b=-1,c=-1,px=1;
  const g=x=>a*x*x*x+b*x*x+c*x,dg=x=>3*a*x*x+2*b*x+c;
  const sim2=glab('ru-canvas2',{view:()=>({xr:[-3,3],yr:[-8,8]}),draw(ctx,P){curveD(ctx,P,g,-3,3,T.cx,2.8,300);curveD(ctx,P,dg,-3,3,T.cv,2.8,300);const y=g(px),m=dg(px);line(ctx,P,px-1.2,y-1.2*m,px+1.2,y+1.2*m,T.hot,2,[6,4]);dot(ctx,P.X(px),P.Y(y),6,T.cx,T.surface);dot(ctx,P.X(px),P.Y(m),6,T.cv,T.surface);}});
  function upd2(){setText('ru-eq',`f(x) = ${polyTxt([a,b,c,0])}      f′(x) = ${polyTxt([3*a,2*b,c])}`);setText('ru-fx',polyTxt([3*a,2*b,c]));setText('ru-slope',fmt(dg(px),3));sim2.render();}
  [['a',v=>a=v],['b',v=>b=v],['c',v=>c=v]].forEach(([s,fn])=>bindRange('ru-'+s,v=>nz(v),v=>{fn(v);upd2();}));bindRange('ru-px',v=>nz(v),v=>{px=v;upd2();});upd2();
  drawers.rules=()=>{sim.render();sim2.render();};
  KEYS['ru-canvas']=['Move n and x. Blue is x^n, green is the rule\'s derivative, the dashed orange line is the tangent.',[['cx','f(x) = xⁿ'],['cv','f′(x) = n xⁿ⁻¹'],['hot','tangent at the point']]];
  KEYS['ru-canvas2']=['Change a coefficient. Where the blue curve has a peak or valley, the green curve crosses zero.',[['cx','f(x)'],['cv','f′(x) from the rules'],['hot','tangent']]];
  TIPS['ru-n']=el=>`n = ${nz(+el.value)}: the derivative is ${nz(+el.value)}·x^${nz(el.value-1)}. For n = 0.5 that is a square root's slope.`;
  GLOSS['power rule']='d/dx [xⁿ] = n·xⁿ⁻¹ for any real n.';
  TT.rules='Ask students to use the green curve to predict where the blue curve peaks. Then have them rewrite roots and reciprocals as powers by hand.';
})();
(function(){
  const rnd=()=>{const ps=[[3,4,5,6],[2,1],[.5],[-1,-2],[0]];const ts=[[ri(1,6)*pick([1,-1]),pick([2,3,4,5])],[ri(1,6)*pick([1,-1]),pick([1,2])],[ri(1,6)*pick([1,-1]),pick([.5,-1,-2])],[ri(1,9)*pick([1,-1]),0]];return ts;};
  PROBS.push({id:'ru-poly',topic:'rules',title:'Differentiate with the power rule',gen(){let ts;do{ts=rnd();}while(new Set(ts.map(t=>t[1])).size<4);const f=terms(ts),df=terms(tder(ts));
    return {q:`Find f′(x) for f(x) = ${pretty(f)}. Type your answer, like 6x^2 − 4x + 5.`,expr:df,chkf:x=>D(x2=>tval(ts,x2),x),hint:'Rewrite roots and reciprocals as powers, then bring each exponent down and subtract 1. A constant differentiates to 0.',
      sol:`Term by term: f′(x) = <b>${pretty(df)}</b>.`};}});
  PROBS.push({id:'ru-eval',topic:'rules',title:'Evaluate a derivative',gen(){const a=ri(1,5),b=ri(1,6)*pick([1,-1]),c=ri(-8,8),x0=ri(-3,3),ts=[[a,3],[b,2],[c,1]],ans=tval(tder(ts),x0);
    return {q:`If f(x) = ${pretty(terms(ts))}, find f′(${nz(x0)}).`,ans,unit:'',abs:.01,chk:D(x=>tval(ts,x),x0),hint:'Differentiate first, then substitute.',sol:`f′(x) = ${pretty(terms(tder(ts)))}. At x = ${nz(x0)}: <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'ru-tangent',topic:'rules',title:'Tangent line',gen(){const a=ri(1,3),b=ri(-5,5),c=ri(-4,4),x0=ri(-2,3),x1=x0+ri(1,3),ts=[[a,2],[b,1],[c,0]],y0=tval(ts,x0),m=tval(tder(ts),x0),ans=y0+m*(x1-x0);
    return {q:`The tangent line to f(x) = ${pretty(terms(ts))} at x = ${nz(x0)} is used to approximate f(${nz(x1)}). What is the tangent line's value at x = ${nz(x1)}?`,ans,unit:'',abs:.01,chk:y0+D(x=>tval(ts,x),x0)*(x1-x0),hint:'Tangent line: y = f(x0) + f′(x0)(x − x0).',sol:`f(${nz(x0)}) = ${nz(y0)}, f′(${nz(x0)}) = ${nz(m)}. At x = ${nz(x1)}: ${nz(y0)} ${m<0?'−':'+'} ${nz(Math.abs(m))}(${x1-x0}) = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'ru-flat',topic:'rules',title:'Horizontal tangent',gen(){const p=ri(1,4),k=ri(-6,6),ts=[[1,3],[-3*p*p,1],[k,0]];
    return {q:`f(x) = ${pretty(terms(ts))} has horizontal tangents at x = ± r. Find the positive value r.`,ans:p,unit:'',abs:.01,chk:Math.abs(D(x=>tval(ts,x),p))<1e-6?p:NaN,hint:'Horizontal tangent means f′(x) = 0. Solve it.',sol:`f′(x) = 3x² − ${3*p*p} = 0, so x² = ${p*p} and x = ±${p}. The positive value is <b>${p}</b>.`};}});
})();
