/* ---------------- Linearization & differentials ---------------- */
(function linear(){
  const cv=$('#li-canvas');if(!cv)return;
  const C={sq:{f:x=>Math.sqrt(Math.max(x,0)),xr:[0,5],yr:[-.3,2.6],a:[.5,4,1],x:[.3,5,1.4]},sn:{f:Math.sin,xr:[0,4.5],yr:[-1.4,1.4],a:[.2,3,1],x:[.1,4,1.3]},ex:{f:Math.exp,xr:[-1.5,3.2],yr:[-1,22],a:[-1,2,0],x:[-1,3,.5]},ln:{f:x=>x>0?Math.log(x):NaN,xr:[0,5],yr:[-2,2.2],a:[.5,4,1],x:[.3,5,1.4]}};
  let k='sq',a=1,x=1.4;
  const sim=glab('li-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const f=C[k].f,fa=f(a),m=D(f,a),L=t=>fa+m*(t-a),fx=f(x);curveD(ctx,P,f,C[k].xr[0]+(k==='ln'?1e-4:0),C[k].xr[1],T.cx,2.8,300);line(ctx,P,C[k].xr[0],L(C[k].xr[0]),C[k].xr[1],L(C[k].xr[1]),T.hot,2.2);
      dot(ctx,P.X(a),P.Y(fa),6,T.ink,T.surface);vline(ctx,P,x,T.muted,[3,4]);dot(ctx,P.X(x),P.Y(fx),6,T.cx,T.surface);dot(ctx,P.X(x),P.Y(L(x)),6,T.hot,T.surface);label(ctx,'a',P.X(a),P.Y(fa)+16,T.ink,'center','middle',MONO);}});
  function upd(){const f=C[k].f,fa=f(a),m=D(f,a),L=fa+m*(x-a),fx=f(x),cc=D2(f,a,5e-3);setText('li-L',fmt(L,4));setText('li-f',fmt(fx,4));setText('li-e',fmt(L-fx,4));
    setText('li-side',Math.abs(cc)<1e-3?'nearly straight at a (f″ ≈ 0)':cc<0?'above the curve near a (f″ < 0): overestimates':'below the curve near a (f″ > 0): underestimates');sim.render();}
  function setR(){const A=C[k],ea=$('#li-a'),ex=$('#li-x');ea.min=A.a[0];ea.max=A.a[1];ea.value=A.a[2];ex.min=A.x[0];ex.max=A.x[1];ex.value=A.x[2];a=A.a[2];x=A.x[2];}
  bindRange('li-a',v=>nz(v),v=>{a=v;upd();});bindRange('li-x',v=>nz(v),v=>{x=v;upd();});segBind('li-fn','k',v=>{k=v;setR();upd();});upd();drawers.linear=()=>sim.render();
  KEYS['li-canvas']=['Pick a and a target x. Orange is the tangent line at a; compare its height at x with the curve.',[['cx','f(x)'],['hot','tangent line L(x)'],['ink','the tangent point a']]];
  TIPS['li-x']=el=>`Target x = ${nz(+el.value)}, ${fmt(Math.abs(el.value-a),2)} away from a. The farther from a, the worse the estimate.`;
  GLOSS['linearization']='The tangent line used as an approximation near its point of tangency: L(x) = f(a) + f′(a)(x − a).';
  TT.linear='Ask students to predict whether the estimate is high or low from the concavity before reading the sign of the error.';
})();
(function(){
  PROBS.push({id:'li-sqrt',topic:'linear',title:'Estimate a square root',gen(){const m=ri(3,12),d=ri(1,4)*pick([1,-1]),x=m*m+d,ans=m+d/(2*m);
    return {q:`Use the tangent line to f(x) = √x at x = ${m*m} to estimate √${x}. Give a decimal to four places.`,ans,unit:'',abs:.0005,chk:Math.sqrt(m*m)+D(Math.sqrt,m*m)*d,hint:`L(x) = f(${m*m}) + f′(${m*m})(x − ${m*m}) with f′(x) = 1/(2√x).`,sol:`f(${m*m}) = ${m}, f′(${m*m}) = 1/${2*m}. L(${x}) = ${m} + (${d})/${2*m} = <b>${fmt(ans,4)}</b> (true value ${fmt(Math.sqrt(x),4)}).`};}});
  PROBS.push({id:'li-tan',topic:'linear',title:'Linearization of a polynomial or exponential',gen(){const useE=Math.random()<.5,a=ri(0,2),dx=pick([.1,.2,-.1,-.2]),x=a+dx;let q,ans,chk,sol;
    if(useE){const c=ri(1,3);q=`Let f(x) = ${c}e<sup>x</sup>. Find the linearization of f at x = ${a} and use it to estimate f(${nz(x)}). Give a decimal.`;const fa=c*Math.exp(a);ans=fa+fa*dx;chk=fa+D(t=>c*Math.exp(t),a)*dx;sol=`f(${a}) = f′(${a}) = ${c}e<sup>${a}</sup> = ${fmt(fa,3)}, so L(${nz(x)}) = ${fmt(fa,3)} + ${fmt(fa,3)}(${nz(dx)}) = <b>${fmt(ans,3)}</b>.`;}
    else{const c=ri(1,4),b=ri(-3,3);q=`Let f(x) = x³ ${sgn(b)}x... `;const f=t=>t**3+c*t,fa=f(a),m=3*a*a+c;q=`Let f(x) = ${polyTxt([1,0,c,0])}. Use the linearization at x = ${a} to estimate f(${nz(x)}). Give a decimal.`;ans=fa+m*dx;chk=fa+D(f,a)*dx;sol=`f(${a}) = ${fa}, f′(${a}) = ${m}. L(${nz(x)}) = ${fa} + ${m}(${nz(dx)}) = <b>${fmt(ans,3)}</b>.`;}
    return {q,ans,unit:'',abs:.002,chk,hint:'L(x) = f(a) + f′(a)(x − a).',sol};}});
  PROBS.push({id:'li-side',topic:'linear',title:'Over- or underestimate?',gen(){const F=[['f(x) = √x at a = 4','overestimate'],['f(x) = x² at a = 1','underestimate'],['f(x) = e<sup>x</sup> at a = 0','underestimate'],['f(x) = ln x at a = 1','overestimate'],['f(x) = x³ at a = 2 (x &gt; 2)','underestimate'],['f(x) = cos x at a = 0','overestimate']],[tx,ans]=pick(F),m=mcq(ans,['overestimate','underestimate']);
    return {q:`The tangent line to ${tx} is used to approximate f near a. Is the estimate an overestimate or an underestimate?`,choices:m.choices,ans:m.ans,hint:'Concave down (f″ < 0): the tangent line lies above the curve. Concave up: below.',sol:`The sign of f″ near a decides it: the tangent line gives an <b>${ans}</b>.`};}});
  PROBS.push({id:'li-diff',topic:'linear',title:'Differentials',gen(){const a=ri(1,4),n=pick([2,3]),x0=ri(1,5),dx=pick([.1,.05,.2,-.1]),ans=n*a*Math.pow(x0,n-1)*dx;
    return {q:`Let y = ${a===1?'':a}x${n===2?'²':'³'}. Use the differential dy = f′(x) dx to estimate the change in y when x changes from ${x0} to ${nz(x0+dx)}. Give a decimal.`,ans,unit:'',abs:.002,chk:D(t=>a*Math.pow(t,n),x0)*dx,hint:'dy = f′(x)·dx with dx = the change in x.',sol:`dy = ${n*a}x${n===2?'':'²'}·dx = ${n*a*Math.pow(x0,n-1)}(${nz(dx)}) = <b>${nz(+ans.toFixed(4))}</b>.`};}});
})();
