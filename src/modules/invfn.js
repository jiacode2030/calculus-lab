/* ---------------- Inverse functions & inverse trig ---------------- */
(function invfn(){
  const cv=$('#iv-canvas');if(!cv)return;
  const C={ex:{f:Math.exp,df:Math.exp,inv:Math.log,dom:[-3,3],a:[-1.5,1.5],a0:.6},cu:{f:x=>x**3+x,df:x=>3*x*x+1,inv:y=>solve(x=>x**3+x-y,-6,6),dom:[-2.2,2.2],a:[-1.4,1.4],a0:.7},
    sn:{f:Math.sin,df:Math.cos,inv:Math.asin,dom:[-Math.PI/2,Math.PI/2],a:[-1.3,1.3],a0:.8},sq:{f:x=>x*x,df:x=>2*x,inv:Math.sqrt,dom:[0,3],a:[.2,1.6],a0:.9}};
  let k='ex',a=.6;
  const sim=glab('iv-canvas',{h:w=>clamp(w*.7,300,440),view:(w,h)=>{const sp=6*(h-36)/(w-60);return {xr:[-3,3],yr:[-sp/2,sp/2]};},draw(ctx,P){const A=C[k],b=A.f(a),m=A.df(a),big=Math.max(P.xr[1],P.yr[1])*3;
      line(ctx,P,-9,-9,9,9,T.muted,1.4,[5,5]);curveD(ctx,P,A.f,A.dom[0],A.dom[1],T.cx,2.8,300);
      ctx.save();clip(ctx,P);ctx.strokeStyle=T.ca;ctx.lineWidth=2.8;ctx.beginPath();for(let i=0;i<=300;i++){const t=A.dom[0]+(A.dom[1]-A.dom[0])*i/300,px=P.X(A.f(t)),py=P.Y(t);i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();ctx.restore();
      line(ctx,P,a-1.6,b-1.6*m,a+1.6,b+1.6*m,T.hot,2.2);line(ctx,P,b-1.6*m,a-1.6,b+1.6*m,a+1.6,T.hot,2.2);
      dot(ctx,P.X(a),P.Y(b),6.5,T.cx,T.surface);dot(ctx,P.X(b),P.Y(a),6.5,T.ca,T.surface);label(ctx,'(a, b)',P.X(a)+10,P.Y(b)+14,T.cx,'left','middle',MONO);label(ctx,'(b, a)',P.X(b)+10,P.Y(a)+14,T.ca,'left','middle',MONO);}});
  function upd(){const A=C[k],m=A.df(a),b=A.f(a);setText('iv-m',fmt(m,4));setText('iv-mi',fmt(D(A.inv,b),4)+'  = 1/'+fmt(m,3));setText('iv-prod',fmt(m*D(A.inv,b),4));sim.render();}
  function setA(){const A=C[k],el=$('#iv-a');el.min=A.a[0];el.max=A.a[1];el.value=A.a0;a=A.a0;}
  bindRange('iv-a',v=>nz(v),v=>{a=v;upd();});segBind('iv-fn','k',v=>{k=v;setA();upd();});upd();
  /* inverse trig */
  const G={as:{f:Math.asin,d:x=>1/Math.sqrt(1-x*x),xr:[-1.15,1.15],yr:[-2,5],form:'(arcsin x)′ = 1/√(1 − x²)',r:[-.95,.95]},ac:{f:Math.acos,d:x=>-1/Math.sqrt(1-x*x),xr:[-1.15,1.15],yr:[-5,3.6],form:'(arccos x)′ = −1/√(1 − x²)',r:[-.95,.95]},at:{f:Math.atan,d:x=>1/(1+x*x),xr:[-3,3],yr:[-1.8,1.8],form:'(arctan x)′ = 1/(1 + x²)',r:[-3,3]}};
  let g='as',x0=.5;
  const sim2=glab('iv-canvas2',{view:()=>({xr:G[g].xr,yr:G[g].yr}),draw(ctx,P){const A=G[g],lo=Math.max(A.xr[0],-1+1e-6),hi=Math.min(A.xr[1],1-1e-6),r=g==='at'?[A.xr[0],A.xr[1]]:[lo,hi];curveD(ctx,P,A.f,r[0],r[1],T.cx,2.8,300);curveD(ctx,P,A.d,r[0],r[1],T.cv,2.8,300);
      dot(ctx,P.X(x0),P.Y(A.f(x0)),6,T.cx,T.surface);dot(ctx,P.X(x0),P.Y(A.d(x0)),6,T.cv,T.surface);vline(ctx,P,x0,T.muted,[3,4]);}});
  function setX(){const el=$('#iv-x'),A=G[g];el.min=A.r[0];el.max=A.r[1];if(+el.value<A.r[0]||+el.value>A.r[1])el.value=.5;x0=+el.value;}
  function upd2(){const A=G[g];setText('iv-form',A.form);setText('iv-sl',fmt(D(A.f,x0),4));setText('iv-fm',fmt(A.d(x0),4));sim2.render();}
  bindRange('iv-x',v=>nz(v),v=>{x0=v;upd2();});segBind('iv-tr','k',v=>{g=v;setX();upd2();});upd2();
  drawers.invfn=()=>{sim.render();sim2.render();};
  KEYS['iv-canvas']=['Blue is f, pink is f⁻¹ (its mirror image over the dashed y = x). Orange tangents have reciprocal slopes.',[['cx','f and the point (a, b)'],['ca','f⁻¹ and the point (b, a)'],['hot','tangent lines']]];
  KEYS['iv-canvas2']=['Blue is the inverse trig function; green is its derivative.',[['cx','inverse trig function'],['cv','its derivative']]];
  TIPS['iv-a']=el=>`a = ${nz(+el.value)}. The two tangent lines are mirror images, so one slope is the reciprocal of the other.`;
  GLOSS['inverse function']='f⁻¹ undoes f: f⁻¹(f(x)) = x. Its graph is the reflection of f over y = x.';
  TT.invfn='Have students predict the slope of the pink tangent from the blue one before reading it. Then connect to ln x as the inverse of eˣ.';
})();
(function(){
  PROBS.push({id:'iv-deriv',topic:'invfn',title:'Derivative of an inverse',gen(){const a=ri(-3,3)||1,c=ri(1,4),f=x=>x**3+c*x,df=3*a*a+c,b=f(a),g=gcd(1,df);
    return {q:`Let f(x) = x³ + ${c===1?'':c}x. Find (f<sup>−1</sup>)′(${nz(b)}). Give a fraction or decimal.`,ans:1/df,unit:'',tol:.01,show:'1/'+df,chk:1/D(f,a),hint:`Find a with f(a) = ${nz(b)} (try small integers), then use 1/f′(a).`,
      sol:`f(${nz(a)}) = ${nz(b)}, so a = ${nz(a)}. f′(x) = 3x² + ${c}, so f′(${nz(a)}) = ${df}. Then (f⁻¹)′(${nz(b)}) = <b>1/${df}</b>.`};}});
  PROBS.push({id:'iv-table',topic:'invfn',title:'Inverse derivative from a table',gen(){const xs=[1,2,3,4],ys=shuffle([2,5,7,9]),fp=xs.map(()=>ri(1,6)),i=ri(0,3),a=xs[i],b=ys[i],ans=1/fp[i];
    const tbl=`<table class="lmtbl"><thead><tr><th>x</th>${xs.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody><tr><th>f(x)</th>${ys.map(y=>`<td>${y}</td>`).join('')}</tr><tr><th>f′(x)</th>${fp.map(y=>`<td>${y}</td>`).join('')}</tr></tbody></table>`;
    return {q:`f is differentiable and invertible; values are in the table. Find (f<sup>−1</sup>)′(${b}). Give a fraction or decimal.${tbl}`,ans,unit:'',tol:.01,show:'1/'+fp[i],chk:ans,hint:`Which x has f(x) = ${b}? Then take 1/f′ at that x.`,sol:`f(${a}) = ${b}, so (f⁻¹)′(${b}) = 1/f′(${a}) = <b>1/${fp[i]}</b>.`};}});
  PROBS.push({id:'iv-trig',topic:'invfn',title:'Differentiate inverse trig',gen(){const T1=[()=>{const a=ri(2,5);return {f:`atan(${a}x)`,df:`${a}/(1+${a*a}x^2)`,fx:x=>Math.atan(a*x)};},()=>({f:'asin(x^2)',df:'2x/sqrt(1-x^4)',fx:x=>Math.asin(x*x)}),()=>({f:'atan(x^2)',df:'2x/(1+x^4)',fx:x=>Math.atan(x*x)}),()=>{const a=ri(2,4);return {f:`x*atan(x)`,df:`atan(x)+x/(1+x^2)`,fx:x=>x*Math.atan(x)};},()=>({f:'acos(x/2)',df:'-1/sqrt(4-x^2)',fx:x=>Math.acos(x/2)})],t=pick(T1)();
    const disp=s=>pretty(s).replace(/atan/g,'arctan').replace(/asin/g,'arcsin').replace(/acos/g,'arccos');
    return {q:`Find f′(x) for f(x) = ${disp(t.f)}. Type your answer (write arctan as atan, arcsin as asin).`,expr:t.df,chkf:x=>D(t.fx,x),hint:'Use (arctan u)′ = u′/(1 + u²) and (arcsin u)′ = u′/√(1 − u²).',sol:`Chain rule with the inverse trig derivative: f′(x) = <b>${disp(t.df)}</b>.`};}});
})();
