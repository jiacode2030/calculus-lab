/* ---------------- Maclaurin series & operations ---------------- */
(function maclaurin(){
  const cv=$('#mc-canvas');if(!cv)return;
  const fact=n=>n<=1?1:n*fact(n-1);
  const C={ex:{f:Math.exp,term:n=>({c:1/fact(n),p:n,s:1,d:fact(n)}),conv:'all x',xr:[-3,3],yr:[-1,9],dom:[-3,3]},e2:{f:x=>Math.exp(-x*x),term:n=>({c:(n%2?-1:1)/fact(n),p:2*n,s:n%2?-1:1,d:fact(n)}),conv:'all x',xr:[-2.6,2.6],yr:[-.8,1.5],dom:[-2.6,2.6]},
    sn:{f:Math.sin,term:n=>({c:(n%2?-1:1)/fact(2*n+1),p:2*n+1,s:n%2?-1:1,d:fact(2*n+1)}),conv:'all x',xr:[-6.5,6.5],yr:[-2.5,2.5],dom:[-6.5,6.5]},sx:{f:x=>Math.sin(x*x),term:n=>({c:(n%2?-1:1)/fact(2*n+1),p:4*n+2,s:n%2?-1:1,d:fact(2*n+1)}),conv:'all x',xr:[-2.6,2.6],yr:[-2.5,2.5],dom:[-2.6,2.6]},
    at:{f:Math.atan,term:n=>({c:(n%2?-1:1)/(2*n+1),p:2*n+1,s:n%2?-1:1,d:2*n+1}),conv:'−1 ≤ x ≤ 1',xr:[-2.5,2.5],yr:[-2.5,2.5],dom:[-2.5,2.5]},ln:{f:x=>Math.log(1+x),term:n=>({c:((n+1)%2?-1:1)/(n+1),p:n+1,s:(n+1)%2?-1:1,d:n+1}),conv:'−1 < x ≤ 1',xr:[-.95,2.5],yr:[-4,2.5],dom:[-.95,2.5]}};
  let k='ex',m=3;
  const SN=(x,mm=m)=>{let s=0;for(let n=0;n<mm;n++){const t=C[k].term(n);s+=t.c*Math.pow(x,t.p);}return s;};
  const sup='⁰¹²³⁴⁵⁶⁷⁸⁹',pw=p=>p===0?'':p===1?'x':'x'+String(p).split('').map(c=>sup[+c]).join('');
  const txt=()=>{const parts=[];for(let n=0;n<Math.min(m,4);n++){const t=C[k].term(n),a=t.d===1?'':'/'+t.d,body=t.p===0?'1':(t.d===1?'':'')+pw(t.p)+a;parts.push((n?(t.s<0?' − ':' + '):(t.s<0?'−':''))+(t.p===0?(t.d===1?'1':'1'+a):body));}return parts.join('')+(m>4?' + …':' + …');};
  const sim=glab('mc-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k];curveD(ctx,P,A.f,A.xr[0]+(k==='ln'?1e-4:0),A.xr[1],T.cx,2.8,400);curveD(ctx,P,x=>SN(x),A.xr[0],A.xr[1],T.hot,2.6,400);}});
  function upd(){const A=C[k];let me=0;for(let i=0;i<=100;i++){const x=-.5+i/100;me=Math.max(me,Math.abs(A.f(x)-SN(x)));}setText('mc-form',`f(x) = ${({ex:'eˣ',e2:'e^(−x²)',sn:'sin x',sx:'sin(x²)',at:'arctan x',ln:'ln(1 + x)'})[k]}`);setText('mc-ser',txt());setText('mc-rad',A.conv);setText('mc-err',sci(me,2));sim.render();}
  bindRange('mc-n',v=>String(v),v=>{m=v;upd();});segBind('mc-fn','k',v=>{k=v;upd();});upd();drawers.maclaurin=()=>sim.render();
  KEYS['mc-canvas']=['Blue is f; orange is the partial sum with the chosen number of nonzero terms.',[['cx','f(x)'],['hot','partial sum of the Maclaurin series']]];
  TIPS['mc-n']=el=>`${el.value} nonzero term${el.value==='1'?'':'s'}. Near 0 the fit is excellent; far away it needs many more terms (or fails outside the radius).`;
  GLOSS['Maclaurin series']='A Taylor series centered at 0: Σ f⁽ⁿ⁾(0)xⁿ/n!.';
  TT.maclaurin='Ask students how each function here was built from eˣ, sin x or 1/(1 − x) by substituting, multiplying or integrating.';
})();
(function(){
  const fact=n=>n<=1?1:n*fact(n-1);
  PROBS.push({id:'mc-term',topic:'maclaurin',title:'A coefficient of a new series',gen(){const pat=pick([0,1,2,3]);let q,ans,show;
    if(pat===0){const m=ri(2,4);q=`Find the coefficient of x<sup>${2*m}</sup> in the Maclaurin series of e<sup>x²</sup>. Give a fraction or decimal.`;ans=1/fact(m);show='1/'+fact(m);}
    else if(pat===1){const m=ri(1,2);q=`Find the coefficient of x<sup>${2*m+2}</sup> in the Maclaurin series of x·sin x. Give a fraction or decimal.`;ans=(m%2?-1:1)/fact(2*m+1);show=`${ans<0?'−':''}1/${fact(2*m+1)}`;}
    else if(pat===2){const m=ri(1,3);q=`Find the coefficient of x<sup>${2*m+1}</sup> in the Maclaurin series of arctan x. Give a fraction or decimal.`;ans=(m%2?-1:1)/(2*m+1);show=`${ans<0?'−':''}1/${2*m+1}`;}
    else{const a=ri(2,4),k2=ri(2,4);q=`Find the coefficient of x<sup>${k2}</sup> in the Maclaurin series of 1/(1 − ${a}x). Give a number.`;ans=Math.pow(a,k2);show=String(ans);}
    return {q,ans,unit:'',tol:.005,show,chk:ans,hint:'Substitute into a known series: e^u, sin u, 1/(1 − u), or integrate a known series term by term.',sol:`The coefficient is <b>${show}</b>.`};}});
  PROBS.push({id:'mc-sum',topic:'maclaurin',title:'Sum a series using a known one',gen(){const pat=pick([0,1,2,3]);let q,ans,chk;
    if(pat===0){const a=pick([1,2,-1,.5]);q=`Find Σ<sub>n=0</sub><sup>∞</sup> ${nz(a)}<sup>n</sup>/n!. Give a decimal to three places.`;ans=Math.exp(a);chk=(()=>{let s=0;for(let n=0;n<40;n++)s+=Math.pow(a,n)/fact(n);return s;})();}
    else if(pat===1){const a=pick([1,2,3,.5]);q=`Find Σ<sub>n=0</sub><sup>∞</sup> (−1)<sup>n</sup>${nz(a)}<sup>2n+1</sup>/(2n + 1)!. Give a decimal to three places.`;ans=Math.sin(a);chk=(()=>{let s=0;for(let n=0;n<30;n++)s+=(n%2?-1:1)*Math.pow(a,2*n+1)/fact(2*n+1);return s;})();}
    else if(pat===2){const a=pick([1,2,3]);q=`Find Σ<sub>n=0</sub><sup>∞</sup> (−1)<sup>n</sup>${nz(a)}<sup>2n</sup>/(2n)!. Give a decimal to three places.`;ans=Math.cos(a);chk=(()=>{let s=0;for(let n=0;n<30;n++)s+=(n%2?-1:1)*Math.pow(a,2*n)/fact(2*n);return s;})();}
    else{const r=pick([.5,.25,-.5,.2]);q=`Find Σ<sub>n=0</sub><sup>∞</sup> (${nz(r)})<sup>n</sup>. Give a decimal to three places.`;ans=1/(1-r);chk=(()=>{let s=0;for(let n=0;n<200;n++)s+=Math.pow(r,n);return s;})();}
    return {q,ans,unit:'',tol:.003,chk,hint:'Recognize it as the Maclaurin series of eˣ, sin x, cos x or 1/(1 − x) evaluated at a point.',sol:`It is a known series evaluated at the given value: <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'mc-limit',topic:'maclaurin',title:'A limit using series',gen(){const pat=pick([0,1,2,3]),a=ri(1,4);let q,ans,show,f;
    if(pat===0){q=`Use Maclaurin series to find lim x→0 (sin(${a===1?'':a}x) − ${a===1?'':a}x)/x³. Give a fraction or decimal.`;ans=-Math.pow(a,3)/6;f=x=>(Math.sin(a*x)-a*x)/Math.pow(x,3);show=`−${a**3}/6`;}
    else if(pat===1){q=`Use Maclaurin series to find lim x→0 (1 − cos(${a===1?'':a}x))/x². Give a fraction or decimal.`;ans=a*a/2;f=x=>(1-Math.cos(a*x))/(x*x);show=`${a*a}/2`;}
    else if(pat===2){q=`Use Maclaurin series to find lim x→0 (e<sup>${a===1?'':a}x</sup> − 1 − ${a===1?'':a}x)/x². Give a fraction or decimal.`;ans=a*a/2;f=x=>(Math.exp(a*x)-1-a*x)/(x*x);show=`${a*a}/2`;}
    else{q=`Use Maclaurin series to find lim x→0 (ln(1 + ${a===1?'':a}x) − ${a===1?'':a}x)/x². Give a fraction or decimal.`;ans=-a*a/2;f=x=>(Math.log(1+a*x)-a*x)/(x*x);show=`−${a*a}/2`;}
    return {q,ans,unit:'',tol:.004,show,chk:limit(f,0,1),hint:'Replace each function by its series, cancel the leading terms, then divide by the power of x.',sol:`After cancelling the first terms the leading term gives <b>${show}</b>.`};}});
  PROBS.push({id:'mc-deriv',topic:'maclaurin',title:'A derivative from a series',gen(){const k=pick([3,4,5]),pat=pick([0,1]);let q,ans;
    if(pat===0){q=`The Maclaurin series of f is Σ (−1)ⁿ x²ⁿ/(n + 1). Find f<sup>(${2*Math.floor(k/2)})</sup>(0)... `;const m=Math.floor(k/2);q=`The Maclaurin series of f is Σ<sub>n=0</sub><sup>∞</sup> (−1)<sup>n</sup>x<sup>2n</sup>/(n + 1). Find f<sup>(${2*m})</sup>(0).`;ans=(m%2?-1:1)*fact(2*m)/(m+1);}
    else{q=`The Maclaurin series of f is Σ<sub>n=0</sub><sup>∞</sup> xⁿ/(n + 1). Find f<sup>(${k})</sup>(0).`;ans=fact(k)/(k+1);}
    return {q,ans,unit:'',tol:.005,chk:ans,hint:'f⁽ᵏ⁾(0) = k! × (coefficient of xᵏ).',sol:`Coefficient of x<sup>k</sup>, times k! gives <b>${fmt(ans,3)}</b>.`};}});
})();
