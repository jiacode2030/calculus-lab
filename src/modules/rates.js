/* ---------------- Average vs instantaneous rate ---------------- */
(function rates(){
  const cv=$('#rt-canvas');if(!cv)return;
  const F={sq:{f:x=>x*x,d:x=>2*x,yr:[-1,9]},cu:{f:x=>x*x*x-3*x,d:x=>3*x*x-3,yr:[-5,6]},sn:{f:Math.sin,d:Math.cos,yr:[-1.6,1.6]},ex:{f:Math.exp,d:Math.exp,yr:[-1,8]}};
  let k='sq',x0=1,h=1.2;
  const hh=()=>Math.abs(h)<1e-3?1e-4:h;
  const sim=glab('rt-canvas',{view:()=>({xr:[-3.5,3.5],yr:F[k].yr}),draw(ctx,P){const f=F[k].f,y0=f(x0),x1=x0+hh(),y1=f(x1),m=(y1-y0)/hh(),t=F[k].d(x0);
    curveD(ctx,P,f,-3.5,3.5,T.cx,2.8,400);line(ctx,P,-3.5,y0+t*(-3.5-x0),3.5,y0+t*(3.5-x0),alpha(T.hot,.55),1.8,[6,5]);line(ctx,P,-3.5,y0+m*(-3.5-x0),3.5,y0+m*(3.5-x0),T.hot,2.4);
    dot(ctx,P.X(x0),P.Y(y0),6.5,T.ink,T.surface);dot(ctx,P.X(x1),P.Y(y1),6,T.ca,T.surface);label(ctx,'a',P.X(x0),P.Y(y0)+16,T.ink,'center','middle',MONO);label(ctx,'a + h',P.X(x1),P.Y(y1)-14,T.ca,'center','middle',MONO);}});
  function upd(){const f=F[k].f,m=(f(x0+hh())-f(x0))/hh(),t=F[k].d(x0);setText('rt-avg',fmt(m,4));setText('rt-inst',fmt(t,4));setText('rt-diff',fmt(m-t,4));sim.render();}
  bindRange('rt-x',v=>nz(v),v=>{x0=v;upd();});bindRange('rt-h',v=>nz(v),v=>{h=v;upd();});segBind('rt-fn','k',v=>{k=v;upd();});upd();drawers.rates=()=>sim.render();
  KEYS['rt-canvas']=['Move a and shrink h. The solid orange line is the secant; the dashed one is the tangent.',[['cx','f(x)'],['hot','secant (solid) and tangent (dashed)'],['ca','the second point at a + h']]];
  TIPS['rt-h']=el=>`h = ${nz(+el.value)}: the second point is ${Math.abs(el.value)} ${+el.value>=0?'right':'left'} of a. Smaller |h| turns the secant into the tangent.`;
  GLOSS['secant line']='A line through two points of a curve. Its slope is the average rate of change between them.';
  GLOSS['tangent line']='The line that just touches a curve at a point and has the same slope there.';
  TT.rates='Ask students to predict the secant slope for h = 0.1 before they set it, and to explain why h = 0 cannot be plugged in.';
})();
(function(){
  PROBS.push({id:'rt-avg',topic:'rates',title:'Average rate of change',gen(){const a=ri(-3,2),b=a+ri(2,4),c=ri(1,4),d=ri(-5,5),f=x=>c*x*x+d*x,ans=(f(b)-f(a))/(b-a);
    return {q:`Find the average rate of change of f(x) = ${polyTxt([c,d,0])} on the interval [${nz(a)}, ${b}].`,ans,unit:'',abs:.01,chk:ans,hint:'Average rate = (f(b) − f(a)) / (b − a).',sol:`f(${b}) = ${nz(f(b))} and f(${nz(a)}) = ${nz(f(a))}. So (${nz(f(b))} − (${nz(f(a))}))/(${b} − (${nz(a)})) = ${nz(f(b)-f(a))}/${b-a} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'rt-table',topic:'rates',title:'Rate of change from a table',gen(){const t0=ri(0,4),dt=[1,2,3],ts=[t0,t0+dt[0],t0+dt[0]+ri(1,3),t0+dt[0]+ri(4,6)].sort((p,q)=>p-q).filter((v,i,A)=>A.indexOf(v)===i),A=ri(1,3),B=ri(0,6),f=t=>A*t*t+B*t+ri(0,0),
      vals=ts.map(t=>A*t*t+B*t),i=ri(0,ts.length-2),ans=(vals[i+1]-vals[i])/(ts[i+1]-ts[i]);
    const tbl=`<table class="lmtbl"><thead><tr><th>t (s)</th>${ts.map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody><tr><th>s(t) (m)</th>${vals.map(v=>`<td>${v}</td>`).join('')}</tbody></table>`;
    return {q:`A particle's position s(t) is given in the table. Find its average velocity from t = ${ts[i]} to t = ${ts[i+1]} seconds, in m/s.${tbl}`,ans,unit:'m/s',tol:.01,chk:(A*ts[i+1]**2+B*ts[i+1]-A*ts[i]**2-B*ts[i])/(ts[i+1]-ts[i]),hint:'Change in position over change in time.',sol:`(${vals[i+1]} − ${vals[i]})/(${ts[i+1]} − ${ts[i]}) = ${vals[i+1]-vals[i]}/${ts[i+1]-ts[i]} = <b>${nz(ans)} m/s</b>.`};}});
  PROBS.push({id:'rt-inst',topic:'rates',title:'Estimate an instantaneous rate',gen(){const x0=ri(1,5),a=ri(1,3),f=x=>a*x*x,ans=2*a*x0,h=.001,est=(f(x0+h)-f(x0))/h;
    return {q:`For f(x) = ${a===1?'':a}x², the average rate of change over [${x0}, ${x0}.001] is ${fmt(est,4)}. What whole number is the instantaneous rate of change at x = ${x0}, which the average rates approach?`,ans,unit:'',abs:.01,chk:ans,hint:'Round the average rate to the nearest whole number: the gap h is tiny.',sol:`The average rates approach ${ans} as h → 0 (the derivative of ${a===1?'':a}x² is ${2*a}x, and ${2*a}(${x0}) = <b>${ans}</b>).`};}});
  PROBS.push({id:'rt-units',topic:'rates',title:'Units of a rate',gen(){const C=[['C(q) is the cost in dollars to make q items','dollars per item'],['V(t) is the volume of water in liters after t minutes','liters per minute'],['s(t) is the position in meters after t seconds','meters per second'],['P(d) is the pressure in pascals at depth d meters','pascals per meter'],['T(h) is temperature in °C at altitude h km','°C per kilometer']],[tx,u]=pick(C),m=mcq(u,C.map(c=>c[1]));
    return {q:`${tx}. What are the units of the rate of change, the derivative?`,choices:m.choices,ans:m.ans,hint:'Rate = output units divided by input units.',sol:`The derivative is (change in output)/(change in input): <b>${u}</b>.`};}});
})();
