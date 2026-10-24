/* ---------------- Product & quotient rules ---------------- */
(function prodquot(){
  const cv=$('#pq-canvas');if(!cv)return;
  const C={a:{f:x=>x*x*Math.sin(x),d:x=>2*x*Math.sin(x)+x*x*Math.cos(x),bad:x=>2*x*Math.cos(x),xr:[0,4],yr:[-20,20],br:[],form:'f = u·v with u = x², v = sin x:  f′ = 2x sin x + x² cos x   (naive: u′v′ = 2x cos x)'},
    b:{f:x=>x*Math.exp(x),d:x=>(1+x)*Math.exp(x),bad:x=>Math.exp(x),xr:[0,2.5],yr:[-5,45],br:[],form:'f = u·v with u = x, v = eˣ:  f′ = eˣ + x eˣ   (naive: u′v′ = eˣ)'},
    c:{f:x=>Math.sin(x)/x,d:x=>(x*Math.cos(x)-Math.sin(x))/(x*x),bad:x=>Math.cos(x),xr:[.2,6.3],yr:[-1.2,1.5],br:[],form:'f = u/v with u = sin x, v = x:  f′ = (x cos x − sin x)/x²   (naive: u′/v′ = cos x)'},
    d:{f:x=>(x*x+1)/(x-1),d:x=>(x*x-2*x-1)/((x-1)**2),bad:x=>2*x,xr:[-1,4],yr:[-8,12],br:[1],form:'f = u/v with u = x² + 1, v = x − 1:  f′ = (x² − 2x − 1)/(x − 1)²   (naive: u′/v′ = 2x)'}};
  let k='a',x0=1.5;
  const sim=glab('pq-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k],pts=[A.xr[0],...A.br,A.xr[1]],e=1e-5;
    const seg=(fn,col,w,dash)=>{for(let i=0;i<pts.length-1;i++)curveD(ctx,P,fn,pts[i]+(i?e:0),pts[i+1]-(i<pts.length-2?e:0),col,w,500,dash);};
    seg(A.f,T.cx,2.6);seg(A.bad,T.hot,2,[6,4]);seg(A.d,T.cv,2.8);
    [[A.f(x0),T.cx],[A.d(x0),T.cv],[A.bad(x0),T.hot]].forEach(([y,c])=>{if(isFinite(y))dot(ctx,P.X(x0),P.Y(y),5.5,c,T.surface);});vline(ctx,P,x0,T.muted,[3,4]);}});
  function upd(){const A=C[k];setText('pq-form',A.form);setText('pq-ok',fmt(A.d(x0),4));setText('pq-num',fmt(D(A.f,x0),4));setText('pq-bad',fmt(A.bad(x0),4));sim.render();}
  function clampX(){const A=C[k],el=$('#pq-x');el.min=A.xr[0]+(A.xr[0]===0?.1:0);el.max=A.xr[1]-.1;if(+el.value<+el.min||+el.value>+el.max)el.value=Math.min(Math.max(+el.min,k==='d'?2:1.5),+el.max);x0=+el.value;}
  bindRange('pq-x',v=>nz(v),v=>{x0=v;upd();});segBind('pq-fn','k',v=>{k=v;clampX();upd();});upd();drawers.prodquot=()=>sim.render();
  KEYS['pq-canvas']=['Compare the dots at the chosen x: green is the correct derivative, orange the tempting wrong one.',[['cx','f(x)'],['cv','correct f′ (product or quotient rule)'],['hot','naive u′v′ or u′/v′ (wrong)']]];
  TIPS['pq-x']=el=>`At x = ${nz(+el.value)}: true slope ${fmt(D(C[k].f,+el.value),3)}, naive answer ${fmt(C[k].bad(+el.value),3)}.`;
  GLOSS['product rule']='(uv)′ = u′v + uv′.';GLOSS['quotient rule']='(u/v)′ = (u′v − uv′)/v².';
  TT.prodquot='Have students predict, for one case, whether the naive orange curve is above or below the true green curve before looking.';
})();
(function(){
  PROBS.push({id:'pq-prod',topic:'prodquot',title:'Product rule',gen(){const a=ri(1,5),b=ri(-5,5),n=ri(2,4),pat=pick([0,1,2,3]);let f,df,fx;const lb=polyTxt([a,b]);
    const xn=k=>k===1?'x':'x<sup>'+k+'</sup>',L=`(${lb})`;let work;
    if(pat===0){f=`(${lb.replace(/−/g,'-')})e^x`;df=`e^x*(${a}x+${a+b})`;fx=x=>(a*x+b)*Math.exp(x);work=`u = ${lb}, v = eˣ: f′(x) = ${cof(a,'eˣ')} + ${L}eˣ = <b>eˣ(${polyTxt([a,a+b])})</b>`;}
    else if(pat===1){f=`x^${n}sin(x)`;df=`${n}x^${n-1}sin(x)+x^${n}cos(x)`;fx=x=>Math.pow(x,n)*Math.sin(x);work=`u = ${xn(n)}, v = sin x: f′(x) = u′v + uv′ = <b>${n}${xn(n-1)} sin x + ${xn(n)} cos x</b>`;}
    else if(pat===2){f=`(${lb.replace(/−/g,'-')})cos(x)`;df=`${a}cos(x)-(${a}x+${b})sin(x)`;fx=x=>(a*x+b)*Math.cos(x);work=`u = ${lb}, v = cos x: f′(x) = ${cof(a,'cos x')} + ${L}(−sin x) = <b>${cof(a,'cos x')} − ${L}sin x</b>`;}
    else{f=`x^${n}ln(x)`;df=`${n}x^${n-1}ln(x)+x^${n-1}`;fx=x=>Math.pow(x,n)*Math.log(x);work=`u = ${xn(n)}, v = ln x: f′(x) = ${n}${xn(n-1)} ln x + ${xn(n)}·(1/x) = <b>${n}${xn(n-1)} ln x + ${xn(n-1)}</b>`;}
    return {q:`Find f′(x) for f(x) = ${pretty(f).replace(/sin\(x\)/g,'sin x').replace(/cos\(x\)/g,'cos x').replace(/ln\(x\)/g,'ln x')}. Type your answer.`,expr:df,chkf:x=>D(fx,x),hint:'(uv)′ = u′v + uv′. Identify u and v first.',sol:`(uv)′ = u′v + uv′ with ${work}.`};}});
  PROBS.push({id:'pq-quot',topic:'prodquot',title:'Quotient rule',gen(){const a=ri(1,5),b=ri(1,5),n=ri(1,3),pat=pick([0,1,2,3]);let f,df,fx;
    const xn=k=>k===1?'x':'x<sup>'+k+'</sup>';let work;
    if(pat===0){f=`(x^2+${a})/(x+${b})`;df=`(x^2+${2*b}x-${a})/(x+${b})^2`;fx=x=>(x*x+a)/(x+b);work=`[2x(x + ${b}) − (x² + ${a})]/(x + ${b})² = <b>(${polyTxt([1,2*b,-a])})/(x + ${b})²</b>`;}
    else if(pat===1){f=`e^x/(x+${b})`;df=`e^x(x+${b-1})/(x+${b})^2`;fx=x=>Math.exp(x)/(x+b);work=`[eˣ(x + ${b}) − eˣ·1]/(x + ${b})² = <b>eˣ(${polyTxt([1,b-1])})/(x + ${b})²</b>`;}
    else if(pat===2){f=`sin(x)/x^${n}`;df=`(x cos(x)-${n}sin(x))/x^${n+1}`;fx=x=>Math.sin(x)/Math.pow(x,n);work=`[${xn(n)} cos x − ${n===1?'':n+(n-1===1?'x':xn(n-1))+' '}sin x]/x<sup>${2*n}</sup> = <b>(x cos x − ${n===1?'':n+' '}sin x)/x<sup>${n+1}</sup></b>`;}
    else{f=`(${a}x+${b})/(x^2+1)`;df=`(-${a}x^2-${2*b}x+${a})/(x^2+1)^2`;fx=x=>(a*x+b)/(x*x+1);work=`[${a===1?'':a}(x² + 1) − (${polyTxt([a,b])})(2x)]/(x² + 1)² = <b>(${polyTxt([-a,-2*b,a])})/(x² + 1)²</b>`;}
    const disp=s=>pretty(s).replace(/sin\(x\)/g,'sin x').replace(/cos\(x\)/g,'cos x');
    return {q:`Find f′(x) for f(x) = ${disp(f)}. Type your answer.`,expr:df,chkf:x=>D(fx,x),hint:'(u/v)′ = (u′v − uv′)/v². Identify u and v first, and square the denominator.',sol:`(u/v)′ = (u′v − uv′)/v²: f′(x) = ${work}.`};}});
  PROBS.push({id:'pq-eval',topic:'prodquot',title:'Evaluate with the product rule',gen(){const a=ri(1,5),b=ri(-4,4),x0=ri(-3,3),f=x=>(x*x+a)*(x+b),ans=2*x0*(x0+b)+(x0*x0+a);
    return {q:`If f(x) = (x² + ${a})${b===0?'x':'('+lin(-b)+')'}, find f′(${nz(x0)}).`,ans,unit:'',abs:.01,chk:D(f,x0),hint:'Product rule: u = x² + a, v = x + b.',sol:`f′(x) = 2x${b===0?'·x':'('+lin(-b)+')'} + (x² + ${a}). At x = ${nz(x0)}: 2(${nz(x0)})(${nz(x0+b)}) + ${nz(x0*x0+a)} = <b>${nz(ans)}</b>.`};}});
})();
