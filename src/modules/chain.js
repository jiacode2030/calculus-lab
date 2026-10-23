/* ---------------- The chain rule ---------------- */
(function chain(){
  const cv=$('#ch-canvas');if(!cv)return;
  const C={a:{g:x=>x*x,gp:x=>2*x,f:Math.sin,fp:Math.cos,y1:[-.5,3],x2:[-.3,2.6],y2:[-1.5,1.5],form:'y = sin(u), u = x²:  dy/dx = cos(x²)·2x'},
    b:{g:x=>3*x+1,gp:()=>3,f:u=>u**4,fp:u=>4*u**3,y1:[-4,5],x2:[-3.5,5.5],y2:[-20,300],form:'y = u⁴, u = 3x + 1:  dy/dx = 4(3x + 1)³·3'},
    c:{g:x=>2*x,gp:()=>2,f:Math.exp,fp:Math.exp,y1:[-3.5,3.5],x2:[-3.5,3.5],y2:[-2,22],form:'y = eᵘ, u = 2x:  dy/dx = e²ˣ·2'},
    d:{g:x=>x*x+1,gp:x=>2*x,f:Math.sqrt,fp:u=>.5/Math.sqrt(u),y1:[0,3.5],x2:[0,3.6],y2:[-.2,2],form:'y = √u, u = x² + 1:  dy/dx = (1/(2√(x²+1)))·2x'}};
  let k='a',x0=.8;
  const sim=glab('ch-canvas',{h:w=>clamp(w*.4,230,300),view:()=>({xr:[-1.5,1.5],yr:C[k].y1,ylabel:'u = g(x)'}),draw(ctx,P){const A=C[k],u0=A.g(x0),m=A.gp(x0);curveD(ctx,P,A.g,-1.5,1.5,T.ca,2.8,200);line(ctx,P,x0-.5,u0-.5*m,x0+.5,u0+.5*m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(u0),6.5,T.ca,T.surface);label(ctx,'slope '+fmt(m,2),P.box.x+P.box.w-6,P.box.y+14,T.hot,'right','middle',LABEL);}});
  const sim2=glab('ch-canvas2',{h:w=>clamp(w*.4,230,300),view:()=>({xr:C[k].x2,yr:C[k].y2,ylabel:'y = f(u)'}),draw(ctx,P){const A=C[k],u0=A.g(x0),y0=A.f(u0),m=A.fp(u0),w=(A.x2[1]-A.x2[0])*.1;curveD(ctx,P,A.f,A.x2[0],A.x2[1],T.cx,2.8,300);line(ctx,P,u0-w,y0-w*m,u0+w,y0+w*m,T.hot,2.2);dot(ctx,P.X(u0),P.Y(y0),6.5,T.cx,T.surface);label(ctx,'slope '+fmt(m,2),P.box.x+P.box.w-6,P.box.y+14,T.hot,'right','middle',LABEL);label(ctx,'u = '+fmt(u0,2),P.X(u0),P.box.y+P.box.h-8,T.muted,'center','middle',MONO);}});
  function clampX(){const el=$('#ch-x');const lim=k==='b'?1:1.5;el.min=-lim;el.max=lim;if(Math.abs(el.value)>lim)el.value=lim*.5;x0=+el.value;}
  function upd(){const A=C[k],u0=A.g(x0),gp=A.gp(x0),fp=A.fp(u0);setText('ch-form',A.form);setText('ch-gp',fmt(gp,3));setText('ch-fp',fmt(fp,3));setText('ch-prod',fmt(gp*fp,3));setText('ch-num',fmt(D(x=>A.f(A.g(x)),x0),3));sim.render();sim2.render();}
  bindRange('ch-x',v=>nz(v),v=>{x0=v;upd();});segBind('ch-fn','k',v=>{k=v;clampX();upd();});upd();drawers.chain=()=>{sim.render();sim2.render();};
  KEYS['ch-canvas']=['Left: the inner function and its slope. Right: the outer function at the matching u. Multiply the two slopes.',[['ca','u = g(x), inner'],['cx','y = f(u), outer'],['hot','tangent lines']]];
  TIPS['ch-x']=el=>`x = ${nz(+el.value)}: inner slope × outer slope = the slope of the whole composite.`;
  GLOSS['chain rule']='d/dx f(g(x)) = f′(g(x))·g′(x): outer derivative (inside unchanged) times inner derivative.';
  GLOSS['composite function']='A function inside another: f(g(x)).';
  TT.chain='Have students multiply the two readouts themselves and compare with the numeric slope. Then ask what changes if the inner function is a straight line.';
})();
(function(){
  const T0=[
    ()=>{const n=ri(2,6),a=ri(1,5),b=ri(-5,5);return {f:`(${a}x${b<0?'':'+'}${b})^${n}`,df:`${n*a}(${a}x${b<0?'':'+'}${b})^${n-1}`,fx:x=>Math.pow(a*x+b,n)};},
    ()=>{const a=ri(2,6);return {f:`sin(${a}x)`,df:`${a}cos(${a}x)`,fx:x=>Math.sin(a*x)};},
    ()=>{const a=ri(1,4),b=ri(-3,3);return {f:`e^(${a}x^2${b<0?'':'+'}${b}x)`,df:`(${2*a}x${b<0?'':'+'}${b})e^(${a}x^2${b<0?'':'+'}${b}x)`,fx:x=>Math.exp(a*x*x+b*x)};},
    ()=>{const a=ri(1,5);return {f:`ln(x^2+${a})`,df:`2x/(x^2+${a})`,fx:x=>Math.log(x*x+a)};},
    ()=>{const a=ri(2,6),b=ri(1,6);return {f:`sqrt(${a}x+${b})`,df:`${a}/(2sqrt(${a}x+${b}))`,fx:x=>Math.sqrt(a*x+b)};},
    ()=>{const a=ri(1,4);return {f:`cos(x^${a+1})`,df:`-${a+1}x^${a}sin(x^${a+1})`,fx:x=>Math.cos(Math.pow(x,a+1))};}];
  const disp=s=>pretty(s).replace(/sin\(/g,'sin(').replace(/e\^\(([^)]*)\)/g,'e^($1)');
  PROBS.push({id:'ch-expr',topic:'chain',title:'Differentiate with the chain rule',gen(){const t=pick(T0)();
    return {q:`Find f′(x) for f(x) = ${disp(t.f)}. Type your answer.`,expr:t.df,chkf:x=>D(t.fx,x),hint:'Identify the outer and inner functions. Differentiate the outside (leave the inside alone), then multiply by the derivative of the inside.',sol:`Outer × inner derivative: f′(x) = <b>${disp(t.df)}</b>.`};}});
  PROBS.push({id:'ch-eval',topic:'chain',title:'Evaluate a chain-rule derivative',gen(){const n=ri(2,5),a=ri(1,4),b=ri(-3,3),x0=ri(-2,2),f=x=>Math.pow(a*x+b,n),ans=n*a*Math.pow(a*x0+b,n-1);
    return {q:`If f(x) = (${polyTxt([a,b])})<sup>${n}</sup>, find f′(${nz(x0)}).`,ans,unit:'',abs:.01,chk:D(f,x0),hint:'f′(x) = n(ax + b)^(n−1)·a.',sol:`f′(x) = ${n}(${polyTxt([a,b])})<sup>${n-1}</sup>·${a}. At x = ${nz(x0)}: <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'ch-table',topic:'chain',title:'Chain rule from a table',gen(){const xs=[1,2,3,4],gv={},gpv={},fv={},fpv={};xs.forEach(x=>{gv[x]=pick(xs);gpv[x]=ri(-4,5)||2;fv[x]=ri(-5,8);fpv[x]=ri(-5,6)||3;});const a=pick(xs),u=gv[a],ans=fpv[u]*gpv[a];
    const row=(nm,o)=>`<tr><th>${nm}</th>${xs.map(x=>`<td>${nz(o[x])}</td>`).join('')}</tr>`;
    const tbl=`<table class="lmtbl"><thead><tr><th>x</th>${xs.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${row('g(x)',gv)}${row('g′(x)',gpv)}${row('f(x)',fv)}${row('f′(x)',fpv)}</tbody></table>`;
    return {q:`Values of f, g and their derivatives are in the table. If h(x) = f(g(x)), find h′(${a}).${tbl}`,ans,unit:'',abs:.01,chk:ans,hint:'h′(a) = f′(g(a))·g′(a). Find g(a) first.',sol:`g(${a}) = ${u}, so f′(g(${a})) = f′(${u}) = ${nz(fpv[u])}. And g′(${a}) = ${nz(gpv[a])}. So h′(${a}) = (${nz(fpv[u])})(${nz(gpv[a])}) = <b>${nz(ans)}</b>.`};}});
})();
