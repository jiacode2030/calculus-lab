/* ---------------- Integration by parts ---------------- */
(function parts(){
  const cv=$('#pa-canvas');if(!cv)return;
  const C={a:{f:x=>x*Math.exp(x),F:x=>x*Math.exp(x)-Math.exp(x),a0:0,form:'u = x, dv = eˣ dx → du = dx, v = eˣ:   ∫ x eˣ dx = x eˣ − ∫ eˣ dx = (x − 1)eˣ',bmin:.3},
    b:{f:x=>x*Math.sin(x),F:x=>Math.sin(x)-x*Math.cos(x),a0:0,form:'u = x, dv = sin x dx → v = −cos x:   ∫ x sin x dx = −x cos x + ∫ cos x dx = sin x − x cos x',bmin:.3},
    c:{f:Math.log,F:x=>x*Math.log(x)-x,a0:1,form:'u = ln x, dv = dx → du = dx/x, v = x:   ∫ ln x dx = x ln x − ∫ dx = x ln x − x',bmin:1.05},
    d:{f:x=>x*x*Math.exp(x),F:x=>Math.exp(x)*(x*x-2*x+2),a0:0,form:'parts twice: u = x², dv = eˣ dx, then u = x:   ∫ x² eˣ dx = eˣ(x² − 2x + 2)',bmin:.3}};
  let k='a',b=1.5;
  const sim=glab('pa-canvas',{view:()=>{const A=C[k];let hi=0,lo=0;for(let i=0;i<=60;i++){const v=A.f(A.a0+.01+(3.3-A.a0)*i/60);hi=Math.max(hi,v);lo=Math.min(lo,v);}return {xr:[-.2,3.3],yr:[lo-.1*hi-.1,hi*1.1+.1]};},draw(ctx,P){const A=C[k];areaSigned(ctx,P,A.f,A.a0,b,T.ce,T.ca);curveD(ctx,P,A.f,A.a0+(k==='c'?1e-4:0),3.3,T.cx,2.8,300);vline(ctx,P,b,T.hot,[4,4]);vline(ctx,P,A.a0,T.muted);}});
  function upd(){const A=C[k],num=integ(A.f,A.a0,b,1500),fm=A.F(b)-A.F(A.a0);setText('pa-form',A.form);setText('pa-num',fmt(num,5));setText('pa-fm',fmt(fm,5));setText('pa-eq',Math.abs(num-fm)<1e-5?'yes ✓':'no');sim.render();}
  function setR(){const el=$('#pa-b');el.min=C[k].bmin;if(+el.value<C[k].bmin)el.value=Math.max(C[k].bmin,1.5);b=+el.value;}
  bindRange('pa-b',v=>nz(v),v=>{b=v;upd();});segBind('pa-fn','k',v=>{k=v;setR();upd();});upd();drawers.parts=()=>sim.render();
  KEYS['pa-canvas']=['Move b. The shaded area is computed two ways: numerically, and from the by-parts antiderivative.',[['cx','the integrand'],['ce','area (pink if below the axis)'],['hot','upper limit b']]];
  TIPS['pa-b']=()=>'The by-parts formula and the numeric area must agree for every b.';
  GLOSS['LIATE']='A memory aid for choosing u in integration by parts: Logarithmic, Inverse trig, Algebraic, Trig, Exponential.';GLOSS['integration by parts']='∫ u dv = uv − ∫ v du, from the product rule.';
  TT.parts='Ask students to try both choices of u and see which makes ∫ v du easier. Use LIATE as a default, not a law.';
})();
(function(){
  const T1=[()=>{const a=ri(1,3);return {f:`x*e^(${a}x)`,F:`e^(${a}x)*(${a}x-1)/${a*a}`,fx:x=>x*Math.exp(a*x)};},()=>{const a=ri(1,4);return {f:`x*sin(${a}x)`,F:`sin(${a}x)/${a*a}-x*cos(${a}x)/${a}`,fx:x=>x*Math.sin(a*x)};},()=>{const a=ri(1,4);return {f:`x*cos(${a}x)`,F:`cos(${a}x)/${a*a}+x*sin(${a}x)/${a}`,fx:x=>x*Math.cos(a*x)};},()=>({f:'ln(x)',F:'x*ln(x)-x',fx:Math.log}),()=>({f:'x*ln(x)',F:'x^2*ln(x)/2-x^2/4',fx:x=>x*Math.log(x)}),()=>({f:'x^2*e^x',F:'e^x*(x^2-2x+2)',fx:x=>x*x*Math.exp(x)})];
  PROBS.push({id:'pa-expr',topic:'parts',title:'Integrate by parts',gen(){const t=T1[ri(0,T1.length-1)]();
    return {q:`Find ∫ ${pretty(t.f).replace(/sin\(/,'sin(').replace(/ln\(x\)/,'ln x')} dx. Type your answer (the + C is optional).`,expr:t.F,c:true,chkf:t.fx,hint:'Use ∫u dv = uv − ∫v du. For ln x, take u = ln x and dv = dx. Check by differentiating.',sol:`By parts: <b>${pretty(t.F)} + C</b>.`};}});
  PROBS.push({id:'pa-def',topic:'parts',title:'Definite integral by parts',gen(){const pat=ri(0,3);let q,ans,chk;
    if(pat===0){const a=ri(1,3);q=`Evaluate ∫<sub>0</sub><sup>1</sup> x e<sup>${a===1?'':a}x</sup> dx. Give a decimal to three places.`;ans=(Math.exp(a)*(a-1)+1)/(a*a);chk=integ(x=>x*Math.exp(a*x),0,1,2000);}
    else if(pat===1){q='Evaluate ∫<sub>0</sub><sup>π</sup> x sin x dx. Give a decimal to three places.';ans=Math.PI;chk=integ(x=>x*Math.sin(x),0,Math.PI,2000);}
    else if(pat===2){const b=pick([2,3,4]);q=`Evaluate ∫<sub>1</sub><sup>${b}</sup> ln x dx. Give a decimal to three places.`;ans=b*Math.log(b)-b+1;chk=integ(Math.log,1,b,3000);}
    else{const b=pick([2,3]);q=`Evaluate ∫<sub>1</sub><sup>${b}</sup> x ln x dx. Give a decimal to three places.`;ans=b*b*Math.log(b)/2-b*b/4+.25;chk=integ(x=>x*Math.log(x),1,b,3000);}
    return {q,ans,unit:'',tol:.003,chk,hint:'Integrate by parts, then evaluate uv at the limits and subtract ∫ v du.',sol:`The by-parts evaluation gives <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'pa-choice',topic:'parts',title:'Choose u',gen(){const R=[['x e<sup>3x</sup>','u = x'],['x² sin x','u = x²'],['ln x','u = ln x'],['x arctan x','u = arctan x'],['x ln x','u = ln x'],['e<sup>x</sup> x³','u = x³'],['x cos 2x','u = x'],['arcsin x','u = arcsin x']],[ex,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`Using LIATE, which choice of u is best for ∫ ${ex} dx?`,choices:m.choices,ans:m.ans,hint:'Logarithmic, Inverse trig, Algebraic, Trig, Exponential: pick the first one that appears.',sol:`<b>${ans}</b>.`};}});
})();
