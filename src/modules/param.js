/* ---------------- Parametric equations ---------------- */
(function param(){
  const cv=$('#pm-canvas');if(!cv)return;
  const C={el:{x:t=>3*Math.cos(t),y:t=>2*Math.sin(t),dx:t=>-3*Math.sin(t),dy:t=>2*Math.cos(t),tr:[0,6.2832,1],xr:[-4.5,4.5],yc:0},
    cy:{x:t=>t-Math.sin(t),y:t=>1-Math.cos(t),dx:t=>1-Math.cos(t),dy:t=>Math.sin(t),tr:[0,12.566,5],xr:[-.8,14],yc:2},
    li:{x:t=>Math.cos(t),y:t=>Math.sin(2*t),dx:t=>-Math.sin(t),dy:t=>2*Math.cos(2*t),tr:[0,6.2832,.6],xr:[-1.8,1.8],yc:0},
    pa:{x:t=>t,y:t=>t*t-2*t,dx:()=>1,dy:t=>2*t-2,tr:[-1,3,1],xr:[-1.8,3.8],yc:1.5}};
  let k='el',t0=1;
  const sim=glab('pm-canvas',{h:w=>clamp(w*.55,280,380),view:(w,h)=>{const A=C[k],sp=(A.xr[1]-A.xr[0])*(h-36)/(w-60);return {xr:A.xr,yr:[A.yc-sp/2,A.yc+sp/2]};},
    draw(ctx,P){const A=C[k],n=400;ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.cx,.25);ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=n;i++){const t=A.tr[0]+(A.tr[1]-A.tr[0])*i/n;i?ctx.lineTo(P.X(A.x(t)),P.Y(A.y(t))):ctx.moveTo(P.X(A.x(t)),P.Y(A.y(t)));}ctx.stroke();
      ctx.strokeStyle=T.cx;ctx.lineWidth=3;ctx.beginPath();const m=Math.max(2,Math.round(n*(t0-A.tr[0])/(A.tr[1]-A.tr[0])));for(let i=0;i<=m;i++){const t=A.tr[0]+(t0-A.tr[0])*i/m;i?ctx.lineTo(P.X(A.x(t)),P.Y(A.y(t))):ctx.moveTo(P.X(A.x(t)),P.Y(A.y(t)));}ctx.stroke();ctx.restore();
      const px=P.X(A.x(t0)),py=P.Y(A.y(t0)),dx=A.dx(t0),dy=A.dy(t0),L=Math.hypot(dx,dy);
      if(L>1e-6){const ux=dx/L,uy=-dy/L;ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.hot,.7);ctx.lineWidth=1.8;ctx.setLineDash([6,4]);ctx.beginPath();ctx.moveTo(px-ux*400,py-uy*400);ctx.lineTo(px+ux*400,py+uy*400);ctx.stroke();ctx.restore();arrow(ctx,px,py,px+ux*46,py+uy*46,T.cv,3);}
      dot(ctx,px,py,7,T.hot,T.surface);}});
  function upd(){const A=C[k],dx=A.dx(t0),dy=A.dy(t0),zero=v=>Math.abs(v)<1e-3;setText('pm-xy',`(${fmt(A.x(t0),3)}, ${fmt(A.y(t0),3)})`);setText('pm-v',`(${fmt(dx,3)}, ${fmt(dy,3)})`);
    const sl=zero(dx)?NaN:dy/dx;setText('pm-sl',zero(dx)?(zero(dy)?'not defined (cusp: both zero)':'not defined (vertical tangent)'):fmt(sl,4));
    setText('pm-d2',zero(dx)?'—':fmt(D(t=>A.dy(t)/A.dx(t),t0,2e-3)/dx,4));setText('pm-note',zero(dx)&&zero(dy)?'dx/dt = dy/dt = 0: a cusp':zero(dx)?'vertical tangent':zero(dy)?'horizontal tangent':'oblique');sim.render();}
  function setT(){const A=C[k],el=$('#pm-t');el.min=A.tr[0];el.max=A.tr[1];el.value=A.tr[2];t0=A.tr[2];}
  bindRange('pm-t',v=>nz(v),v=>{t0=v;upd();});segBind('pm-fn','k',v=>{k=v;setT();upd();});setT();upd();drawers.param=()=>sim.render();
  KEYS['pm-canvas']=['Slide t. The point moves along the curve; the green arrow is the velocity (dx/dt, dy/dt), and the dashed orange line is the tangent.',[['cx','the path traced so far (faint: the whole curve)'],['cv','velocity vector'],['hot','the point and its tangent line']]];
  TIPS['pm-t']=el=>`t = ${nz(+el.value)}: the point moves with velocity (${fmt(C[k].dx(+el.value),2)}, ${fmt(C[k].dy(+el.value),2)}).`;
  GLOSS['parametric equations']='x and y each given as a function of a third variable t (often time).';GLOSS['cusp']='A sharp point of a curve where dx/dt and dy/dt are both zero.';
  TT.param='Have students predict horizontal and vertical tangents from dx/dt and dy/dt, then slide t to find them.';
})();
(function(){
  PROBS.push({id:'pm-slope',topic:'param',title:'Slope of a parametric curve',gen(){const a=ri(1,3),b=ri(-3,3),c=ri(1,3),d=ri(-4,4),t0=ri(1,3),den=2*a*t0+b,ans=(3*c*t0*t0+d)/den;if(den===0)return PROBS.find(p=>p.id==='pm-slope').gen();
    return {q:`For x = ${polyTxt([a,b,0],'t')} and y = ${polyTxt([c,0,d,0],'t')}, find dy/dx at t = ${t0}. Give a fraction or decimal.`,ans,unit:'',tol:.005,chk:D(t=>c*t**3+d*t,t0)/D(t=>a*t*t+b*t,t0),hint:'dy/dx = (dy/dt)/(dx/dt). Differentiate each, then substitute t.',sol:`dx/dt = ${polyTxt([2*a,b],'t')}, dy/dt = ${polyTxt([3*c,0,d],'t')}. At t = ${t0}: ${nz(3*c*t0*t0+d)}/${nz(den)} = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'pm-tan',topic:'param',title:'Horizontal or vertical tangent',gen(){const p=ri(1,4),q=ri(1,4),horiz=Math.random()<.5,x=t=>t*t-2*p*t,y=t=>t*t*t-3*q*q*t,ans=horiz?q:p;
    return {q:`For x = ${polyTxt([1,-2*p,0],'t')} and y = ${polyTxt([1,0,-3*q*q,0],'t')}, find the positive value of t where the tangent line is ${horiz?'horizontal':'vertical'}.`,ans,unit:'',abs:.01,chk:horiz?(Math.abs(D(y,q))<1e-5?q:NaN):(Math.abs(D(x,p))<1e-5?p:NaN),hint:horiz?'Horizontal tangent: dy/dt = 0 (and dx/dt ≠ 0).':'Vertical tangent: dx/dt = 0 (and dy/dt ≠ 0).',sol:horiz?`dy/dt = 3t² − ${3*q*q} = 0 ⇒ t = ±${q}; the positive value is <b>${q}</b>.`:`dx/dt = 2t − ${2*p} = 0 ⇒ t = <b>${p}</b>.`};}});
  PROBS.push({id:'pm-speed',topic:'param',title:'Speed',gen(){const a=ri(1,4),b=ri(1,3),t0=ri(1,3),ans=Math.sqrt(a*a+4*b*b*t0*t0);
    return {q:`A particle moves with x(t) = ${a===1?'':a}t and y(t) = ${b===1?'':b}t². Find its speed at t = ${t0}. Give a decimal.`,ans,unit:'',tol:.004,chk:Math.hypot(D(t=>a*t,t0),D(t=>b*t*t,t0)),hint:'Speed = √((dx/dt)² + (dy/dt)²).',sol:`dx/dt = ${a}, dy/dt = ${2*b}t = ${2*b*t0}. Speed = √(${a*a} + ${(2*b*t0)**2}) = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'pm-d2',topic:'param',title:'Second derivative of a parametric curve',gen(){const a=ri(1,3),b=ri(1,4),t0=ri(1,3),ans=3*b/(4*a*a*t0);
    return {q:`For x = ${a===1?'':a}t² and y = ${b===1?'':b}t³, find d²y/dx² at t = ${t0}. Give a fraction or decimal.`,ans,unit:'',tol:.005,chk:D(t=>(3*b*t*t)/(2*a*t),t0)/(2*a*t0),hint:'First dy/dx = (dy/dt)/(dx/dt) as a function of t; then d²y/dx² = (d/dt of that)/(dx/dt).',sol:`dy/dx = ${3*b}t²/${2*a}t = ${fmt(3*b/(2*a),3)}t. Its t-derivative is ${fmt(3*b/(2*a),3)}, divided by dx/dt = ${2*a}t: <b>${fmt(ans,4)}</b> at t = ${t0}.`};}});
  PROBS.push({id:'pm-len',topic:'param',title:'Arc length of a parametric curve',gen(){const b=pick([1,2,3]),ans=(Math.pow(4+9*b*b,1.5)-8)/27;
    return {q:`Find the length of the curve x = t², y = t³ for 0 ≤ t ≤ ${b}. Give a decimal to three places.`,ans,unit:'',tol:.003,chk:integ(t=>Math.hypot(2*t,3*t*t),0,b,3000),hint:'Length = ∫ √((dx/dt)² + (dy/dt)²) dt = ∫ t√(4 + 9t²) dt. Use u = 4 + 9t².',sol:`Length = (1/27)[(4 + 9t²)<sup>3/2</sup>]<sub>0</sub><sup>${b}</sup> = (1/27)(${fmt(Math.pow(4+9*b*b,1.5),3)} − 8) = <b>${fmt(ans,3)}</b>.`};}});
})();
