/* ---------------- Taylor polynomials & Lagrange error ---------------- */
(function taylorpoly(){
  const cv=$('#tp-canvas');if(!cv)return;
  const fact=n=>n<=1?1:n*fact(n-1);
  const C={ex:{f:Math.exp,c:k=>1/fact(k),xr:[-3.2,3.2],yr:[-3,12],xs:[-2.8,2.8],x0:1,M:(x,n)=>Math.exp(Math.max(x,0))},
    sn:{f:Math.sin,c:k=>k%2?((k-1)/2%2?-1:1)/fact(k):0,xr:[-6.5,6.5],yr:[-2.5,2.5],xs:[-6,6],x0:2,M:()=>1},
    cs:{f:Math.cos,c:k=>k%2?0:((k/2)%2?-1:1)/fact(k),xr:[-6.5,6.5],yr:[-2.5,2.5],xs:[-6,6],x0:2,M:()=>1},
    ln:{f:x=>Math.log(1+x),c:k=>k===0?0:((k%2)?1:-1)/k,xr:[-.95,3],yr:[-4,2.5],xs:[-.9,2.5],x0:.8,M:(x,n)=>x>=0?fact(n):fact(n)/Math.pow(1+x,n+1)}};
  let k='ex',n=3,x0=1;
  const Pn=(x,m=n)=>{let s=0;for(let j=0;j<=m;j++)s+=C[k].c(j)*Math.pow(x,j);return s;};
  const sim=glab('tp-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k];curveD(ctx,P,A.f,A.xr[0]+(k==='ln'?1e-4:0),A.xr[1],T.cx,2.8,400);curveD(ctx,P,x=>Pn(x),A.xr[0],A.xr[1],T.hot,2.6,400);vline(ctx,P,x0,T.muted,[3,4]);dot(ctx,P.X(x0),P.Y(A.f(x0)),6,T.cx,T.surface);dot(ctx,P.X(x0),P.Y(Pn(x0)),6,T.hot,T.surface);}});
  function upd(){const A=C[k],fx=A.f(x0),px=Pn(x0),bound=A.M(x0,n)*Math.pow(Math.abs(x0),n+1)/fact(n+1);setText('tp-P',fmt(px,5));setText('tp-f',fmt(fx,5));setText('tp-e',fmt(Math.abs(fx-px),5));setText('tp-b',`${bound>1e6?sci(bound,2):fmt(bound,5)}${k==='ln'&&x0>1?' (the series diverges here)':''}`);sim.render();}
  function setX(){const A=C[k],el=$('#tp-x');el.min=A.xs[0];el.max=A.xs[1];el.value=A.x0;x0=A.x0;}
  bindRange('tp-n',v=>String(v),v=>{n=v;upd();});bindRange('tp-x',v=>nz(v),v=>{x0=v;upd();});segBind('tp-fn','k',v=>{k=v;setX();upd();});upd();drawers.taylorpoly=()=>sim.render();
  KEYS['tp-canvas']=['Blue is f; orange is the Taylor polynomial of degree n. Raise n and the orange curve hugs the blue one over a wider interval.',[['cx','f(x)'],['hot','Pₙ(x)']]];
  TIPS['tp-n']=el=>`Degree ${el.value}: ${+el.value+1} terms. The polynomial matches f and its first ${el.value} derivatives at 0.`;
  GLOSS['Taylor polynomial']='Pₙ(x) = Σ f⁽ᵏ⁾(a)(x − a)ᵏ/k!, the degree-n polynomial that best matches f near a.';GLOSS['Lagrange error bound']='|f(x) − Pₙ(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)! where M bounds |f⁽ⁿ⁺¹⁾| between a and x.';
  TT.taylorpoly='Ask students to predict where the polynomial will leave the curve, then raise the degree and compare the bound with the actual error.';
})();
(function(){
  const fact=n=>n<=1?1:n*fact(n-1);
  PROBS.push({id:'tp-coef',topic:'taylorpoly',title:'A Taylor coefficient',gen(){const pat=pick([0,1,2]);let q,ans,show;
    if(pat===0){const a=ri(1,3),k=ri(2,5);q=`Find the coefficient of x<sup>${k}</sup> in the Maclaurin series of e<sup>${a===1?'':a}x</sup>. Give a fraction or decimal.`;ans=Math.pow(a,k)/fact(k);const g=gcd(Math.pow(a,k),fact(k));show=`${Math.pow(a,k)/g}${fact(k)/g===1?'':'/'+fact(k)/g}`;}
    else if(pat===1){const a=ri(1,3),m=ri(1,2),k=2*m+1;q=`Find the coefficient of x<sup>${k}</sup> in the Maclaurin series of sin(${a===1?'':a}x). Give a fraction or decimal.`;ans=(m%2?-1:1)*Math.pow(a,k)/fact(k);const g=gcd(Math.pow(a,k),fact(k));show=`${ans<0?'−':''}${Math.pow(a,k)/g}${fact(k)/g===1?'':'/'+fact(k)/g}`;}
    else{const m=ri(1,3),k=2*m;q=`Find the coefficient of x<sup>${k}</sup> in the Maclaurin series of cos x. Give a fraction or decimal.`;ans=(m%2?-1:1)/fact(k);show=`${ans<0?'−':''}1/${fact(k)}`;}
    return {q,ans,unit:'',tol:.005,show,chk:ans,hint:'The coefficient of xᵏ is f⁽ᵏ⁾(0)/k!. Or substitute into a known series.',sol:`Using the known series: the coefficient is <b>${show}</b>.`};}});
  PROBS.push({id:'tp-eval',topic:'taylorpoly',title:'Evaluate a Taylor polynomial',gen(){const n=pick([2,3,4]),x=pick([.5,1,.2,-.5,-1]),pat=pick([0,1]);let q,ans,chk;
    if(pat===0){q=`Use the degree-${n} Maclaurin polynomial of e<sup>x</sup> to approximate e<sup>${nz(x)}</sup>. Give a decimal to four places.`;ans=0;for(let j=0;j<=n;j++)ans+=Math.pow(x,j)/fact(j);chk=(()=>{let s=0;for(let j=0;j<=n;j++)s+=Math.pow(x,j)/fact(j);return s;})();}
    else{q=`Use the degree-${n===2?3:n===3?3:5} Maclaurin polynomial of sin x to approximate sin(${nz(x)}). Give a decimal to four places.`;const deg=n===4?5:3;ans=x-Math.pow(x,3)/6+(deg===5?Math.pow(x,5)/120:0);chk=ans;}
    return {q,ans,unit:'',abs:.0006,chk,hint:'Add the terms xᵏ/k! (or the sin series terms) up to the given degree.',sol:`Adding the terms gives <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'tp-lagrange',topic:'taylorpoly',title:'Lagrange error bound',gen(){const n=ri(2,5),x=pick([.5,1,.3,.8]),pat=pick([0,1]);let q,ans;
    if(pat===0){q=`Use the Lagrange error bound to bound the error when the degree-${n} Maclaurin polynomial of sin x approximates sin(${x}). Give a decimal (use M = 1).`;ans=Math.pow(x,n+1)/fact(n+1);}
    else{q=`Use the Lagrange error bound for the degree-${n} Maclaurin polynomial of e<sup>x</sup> at x = ${x}. Use M = e<sup>${x}</sup> (the maximum of e<sup>t</sup> on [0, ${x}]). Give a decimal.`;ans=Math.exp(x)*Math.pow(x,n+1)/fact(n+1);}
    return {q,ans,unit:'',tol:.01,chk:ans,hint:'|error| ≤ M·|x|^(n+1)/(n + 1)!.',sol:`Bound = M·${x}<sup>${n+1}</sup>/${n+1}! = <b>${ans<1e-3?sci(ans,2):fmt(ans,5)}</b>.`};}});
  PROBS.push({id:'tp-deriv',topic:'taylorpoly',title:'Read a derivative from a polynomial',gen(){const k=pick([2,3,4]),cs=[ri(-4,6),ri(-5,5)||2,ri(-6,6)||3,ri(-6,6)||-2,ri(-6,6)||5],c=cs[k],ans=c*fact(k);
    return {q:`The Taylor polynomial of f centered at 0 is P(x) = ${cs.map((v,j)=>`${j===0?nz(v):sgn(v)}${j===0?'':j===1?'x':'x<sup>'+j+'</sup>'}`).join('')}. Find f<sup>(${k})</sup>(0).`.replace(/\s+/g,' '),ans,unit:'',abs:.01,chk:ans,hint:'The coefficient of xᵏ is f⁽ᵏ⁾(0)/k!, so f⁽ᵏ⁾(0) = k!·coefficient.',sol:`f<sup>(${k})</sup>(0) = ${k}!·(${nz(c)}) = <b>${nz(ans)}</b>.`};}});
})();
