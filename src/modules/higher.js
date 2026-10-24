/* ---------------- Higher-order derivatives & choosing a rule ---------------- */
(function higher(){
  const cv=$('#hi-canvas');if(!cv)return;
  const C={a:{f:x=>x**3-3*x,d:x=>3*x*x-3,dd:x=>6*x,y:[[-3.5,3.5],[-4,10],[-13,13]]},b:{f:Math.sin,d:Math.cos,dd:x=>-Math.sin(x),y:[[-1.5,1.5],[-1.5,1.5],[-1.5,1.5]]},
    c:{f:x=>x**4-2*x*x,d:x=>4*x**3-4*x,dd:x=>12*x*x-4,y:[[-1.5,8.5],[-26,26],[-6,46]]},d:{f:Math.exp,d:Math.exp,dd:Math.exp,y:[[-1,8],[-1,8],[-1,8]]}};
  let k='a',x0=.5;
  const sim=sim2d(cv,{h:w=>clamp(w*.8,400,540),draw(ctx,w,h){const A=C[k],bh=Math.floor((h-44)/3)-6,cols=[T.cx,T.cv,T.ca],fns=[A.f,A.d,A.dd],names=['f(x): height','f′(x): slope','f″(x): bend'];
      for(let i=0;i<3;i++){const P=gpanel(ctx,{x:46,y:6+i*(bh+20),w:w-60,h:bh},[-2,2],A.y[i],{xn:4,yn:3});curveD(ctx,P,fns[i],-2,2,cols[i],2.8,300);const v=fns[i](x0);dot(ctx,P.X(x0),P.Y(v),6,cols[i],T.surface);vline(ctx,P,x0,T.muted,[3,4]);label(ctx,names[i],P.box.x+8,P.box.y+11,cols[i],'left','middle',LABEL);hline(ctx,P,0,alpha(T.muted,.0));}}});
  function upd(){const A=C[k];setText('hi-f',fmt(A.f(x0),3));setText('hi-d',fmt(A.d(x0),3));setText('hi-dd',fmt(A.dd(x0),3));sim.render();}
  bindRange('hi-x',v=>nz(v),v=>{x0=v;upd();});segBind('hi-fn','k',v=>{k=v;upd();});upd();drawers.higher=()=>sim.render();
  KEYS['hi-canvas']=['Slide x. Each graph is the derivative of the one above it: green is the slope of blue, pink is the slope of green.',[['cx','f'],['cv','f′ (slope of f)'],['ca','f″ (slope of f′)']]];
  TIPS['hi-x']=el=>`x = ${nz(+el.value)}. Where f′ is zero f has a flat tangent; where f″ is zero the bend switches.`;
  GLOSS['second derivative']='The derivative of the derivative: how fast the slope is changing. Positive means bending up.';
  GLOSS['acceleration']='The derivative of velocity: the second derivative of position.';
  TT.higher='Ask students to predict where each graph crosses zero from the one above before sliding.';
})();
(function(){
  const nth=(n)=>[Math.sin,Math.cos,x=>-Math.sin(x),x=>-Math.cos(x)][n%4];
  PROBS.push({id:'hi-second',topic:'higher',title:'Second derivative',gen(){const a=ri(1,3),b=ri(1,4),c=ri(-5,5),x0=ri(-2,2),ts=[[a,4],[b,3],[c,1]],ans=tval(tder(tder(ts)),x0);
    return {q:`If f(x) = ${pretty(terms(ts))}, find f″(${nz(x0)}).`,ans,unit:'',abs:.01,chk:D2(x=>tval(ts,x),x0,1e-2),hint:'Differentiate twice, then substitute.',sol:`f′(x) = ${pretty(terms(tder(ts)))}, f″(x) = ${pretty(terms(tder(tder(ts))))}. At x = ${nz(x0)}: <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'hi-expr',topic:'higher',title:'Second derivative of a function',gen(){const a=ri(2,4),T1=[()=>({f:`e^(${a}x)`,d2:`${a*a}e^(${a}x)`,d1:`${a}e^(${a}x)`,fx:x=>Math.exp(a*x)}),()=>({f:`sin(${a}x)`,d2:`-${a*a}sin(${a}x)`,d1:`${a}cos(${a}x)`,fx:x=>Math.sin(a*x)}),()=>({f:`x*e^(${a}x)`,d2:`e^(${a}x)(${a*a}x+${2*a})`,d1:`e^(${a}x)(1+${a}x)`,fx:x=>x*Math.exp(a*x)}),()=>({f:`ln(${a}x)`,d2:`-1/x^2`,d1:`${a}/(${a}x) = 1/x`,fx:x=>Math.log(a*x)})],t=pick(T1)(),disp=s=>pretty(s).replace(/sin\(/g,'sin(');
    return {q:`Find f″(x) for f(x) = ${disp(t.f)}. Type your answer.`,expr:t.d2,chkf:x=>D2(t.fx,x,5e-3),hint:'Differentiate twice. Simplify f′ before the second differentiation.',sol:`f′(x) = ${disp(t.d1)}, so f″(x) = <b>${disp(t.d2)}</b>.`};}});
  PROBS.push({id:'hi-nth',topic:'higher',title:'A repeating pattern',gen(){const n=ri(3,15),useCos=Math.random()<.5,x0=pick([0,Math.PI]),base=useCos?Math.cos:Math.sin,idx=useCos?n+1:n,fn=nth(idx),ans=Math.abs(fn(x0))<1e-9?0:fn(x0);
    return {q:`Let f(x) = ${useCos?'cos':'sin'} x. Find the ${n}th derivative f<sup>(${n})</sup> evaluated at x = ${x0===0?'0':'π'}.`,ans,unit:'',abs:.01,hint:'The derivatives of sine and cosine repeat every four steps: sin, cos, −sin, −cos.',sol:`The pattern repeats every 4. ${n} mod 4 = ${n%4}, so f<sup>(${n})</sup>(x) = ${['','','−','−'][(idx%4)]}${[ 'sin','cos','sin','cos'][idx%4]} x, and at x = ${x0===0?'0':'π'} that is <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'hi-which',topic:'higher',title:'Which rule first?',gen(){const R=[['x² sin(3x)','Product rule'],['(x² + 1)/(x − 3)','Quotient rule'],['sin(x² + 1)','Chain rule'],['x³ + 5x − 2','Sum and power rules'],['e<sup>x</sup> ln x','Product rule'],['√(1 + x³)','Chain rule'],['cos x / x²','Quotient rule'],['(3x + 1)<sup>7</sup>','Chain rule'],['x e<sup>−x</sup>','Product rule']],[ex,ans]=pick(R),m=mcq(ans,['Product rule','Quotient rule','Chain rule','Sum and power rules']);
    return {q:`Which rule do you apply first to differentiate f(x) = ${ex}?`,choices:m.choices,ans:m.ans,hint:'Look at the outermost operation of the whole expression.',sol:`The outermost operation is the one to handle first: <b>${ans}</b>.`};}});
})();
