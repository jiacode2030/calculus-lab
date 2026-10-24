/* ---------------- L'Hôpital's rule ---------------- */
(function lhop(){
  const cv=$('#lh-canvas');if(!cv)return;
  const C={a:{f:x=>Math.exp(x)-1,g:x=>x,fp:Math.exp,gp:()=>1,a:0,L:1,form:'lim (eˣ − 1)/x:  top → 0 and bottom → 0.  f′/g′ = eˣ/1 → 1'},
    b:{f:x=>1-Math.cos(x),g:x=>x*x,fp:Math.sin,gp:x=>2*x,a:0,L:.5,form:'lim (1 − cos x)/x²:  0/0.  f′/g′ = sin x/(2x), still 0/0; again: cos x/2 → 1/2'},
    e:{f:x=>Math.sin(3*x),g:x=>x,fp:x=>3*Math.cos(3*x),gp:()=>1,a:0,L:3,form:'lim sin(3x)/x:  0/0.  f′/g′ = 3cos(3x)/1 → 3'},
    c:{f:Math.log,g:x=>x-1,fp:x=>1/x,gp:()=>1,a:1,L:1,form:'lim ln x/(x − 1) at 1:  0/0.  f′/g′ = (1/x)/1 → 1'},
    d:{f:x=>x*x,g:Math.exp,fp:x=>2*x,gp:Math.exp,a:Infinity,L:0,form:'lim x²/eˣ as x → ∞:  ∞/∞.  f′/g′ = 2x/eˣ, still ∞/∞; again: 2/eˣ → 0'}};
  let k='a',z=0;
  const W=()=>2*Math.pow(10,-z),probe=()=>C[k].a===Infinity?3+7*z:C[k].a+W()/2;
  const sim=glab('lh-canvas',{view:()=>{const A=C[k];if(A.a===Infinity){const hi=10+10*z;return {xr:[0,hi],yr:[-.3,1.6]};}
      const xr=[A.a-W(),A.a+W()];let lo=Infinity,hi=-Infinity;for(let i=0;i<=200;i++){const x=xr[0]+(xr[1]-xr[0])*i/200;[A.f(x)/A.g(x),A.fp(x)/A.gp(x)].forEach(v=>{if(isFinite(v)){lo=Math.min(lo,v);hi=Math.max(hi,v);}});}lo=Math.min(lo,A.L);hi=Math.max(hi,A.L);const p=Math.max((hi-lo)*.3,1e-9);return {xr,yr:[lo-p,hi+p]};},
    draw(ctx,P){const A=C[k],e=1e-9;const lo=P.xr[0],hi=P.xr[1];const R=x=>A.f(x)/A.g(x),Rp=x=>A.fp(x)/A.gp(x);
      if(A.a===Infinity){curveD(ctx,P,R,lo+1e-6,hi,T.cx,2.8,400);curveD(ctx,P,Rp,lo+1e-6,hi,T.cv,2.2,400,[6,4]);hline(ctx,P,0,T.hot);}
      else{curveD(ctx,P,R,lo,A.a-e*(hi-lo),T.cx,2.8,300);curveD(ctx,P,R,A.a+e*(hi-lo),hi,T.cx,2.8,300);curveD(ctx,P,Rp,lo,hi,T.cv,2.2,300,[6,4]);hline(ctx,P,A.L,T.hot);vline(ctx,P,A.a,T.muted);hole(ctx,P.X(A.a),P.Y(A.L),5,T.cx,false);}
      const x=probe();[[R,T.cx],[Rp,T.cv]].forEach(([fn,c])=>{const y=fn(x);if(isFinite(y))dot(ctx,P.X(x),P.Y(y),5.5,c,T.surface);});}});
  function upd(){const A=C[k],x=probe();setText('lh-form',A.form);setText('lh-r',fmt(A.f(x)/A.g(x),5));setText('lh-rp',fmt(A.fp(x)/A.gp(x),5));setText('lh-lim',frac(A.L));sim.render();}
  bindRange('lh-w',v=>nz(v),v=>{z=v;upd();});segBind('lh-fn','k',v=>{k=v;upd();});upd();drawers.lhop=()=>sim.render();
  KEYS['lh-canvas']=['Blue is f/g, green dashed is f′/g′; both head to the same limit (orange line).',[['cx','f(x)/g(x)'],['cv','f′(x)/g′(x)'],['hot','the limit']]];
  TIPS['lh-w']=el=>C[k].a===Infinity?'Slide right to look at larger x.':`The window is ${fmt(2*Math.pow(10,-el.value),4)} wide around a. The two ratios agree more and more.`;
  GLOSS["L'Hôpital's rule"]="If f/g is 0/0 or ∞/∞ at a, then lim f/g = lim f′/g′ (when the right limit exists)."; GLOSS['indeterminate form']='An expression like 0/0 or ∞/∞ whose limit cannot be read off directly.';
  TT.lhop='Ask students to name the form before touching a derivative, and to state which function wins in the ∞/∞ case.';
})();
(function(){
  PROBS.push({id:'lh-basic',topic:'lhop',title:'Use L\'Hôpital\'s rule',gen(){const a=ri(2,7),b=pick([2,3,4,5,6,7].filter(v=>v!==a)),n=ri(2,6),pat=pick([0,1,2,3]);let q,ans,f,pt,show,work;
    if(pat===0){q=`lim x→0 (e<sup>${a}x</sup> − 1)/(${b}x)`;f=x=>(Math.exp(a*x)-1)/(b*x);pt=0;ans=a/b;const g=gcd(a,b);show=a/g+(b/g===1?'':'/'+b/g);work=`Top → e<sup>0</sup> − 1 = 0 and bottom → 0. Derivatives: ${a}e<sup>${a}x</sup>/${b} → ${a}e<sup>0</sup>/${b} = ${a}/${b}`;}
    else if(pat===1){q=`lim x→0 sin(${a}x)/sin(${b}x)`;f=x=>Math.sin(a*x)/Math.sin(b*x);pt=0;ans=a/b;const g=gcd(a,b);show=a/g+(b/g===1?'':'/'+b/g);work=`Top → sin 0 = 0 and bottom → 0. Derivatives: ${a}cos(${a}x)/(${b}cos(${b}x)) → ${a}(1)/(${b}(1)) = ${a}/${b}`;}
    else if(pat===2){q=`lim x→1 (x<sup>${n}</sup> − 1)/(x − 1)`;f=x=>(Math.pow(x,n)-1)/(x-1);pt=1;ans=n;show=String(n);work=`Top → 1 − 1 = 0 and bottom → 0. Derivatives: ${n}x${n===2?'':'<sup>'+(n-1)+'</sup>'}/1 → ${n}(1)${n===2?'':'<sup>'+(n-1)+'</sup>'} = ${n}`;}
    else{q=`lim x→1 (ln x)/(x<sup>${n}</sup> − 1)`;f=x=>Math.log(x)/(Math.pow(x,n)-1);pt=1;ans=1/n;show='1/'+n;work=`Top → ln 1 = 0 and bottom → 0. Derivatives: (1/x)/(${n}x<sup>${n-1}</sup>) = 1/(${n}x<sup>${n}</sup>) → 1/${n}`;}
    return {q:`Find ${q}. Give a fraction or decimal.`,ans,unit:'',tol:.01,show,chk:limit(f,pt,1),hint:'Check the form is 0/0, then differentiate top and bottom separately.',sol:`${work}${work.endsWith(show)?'':' = '+show}. So the limit is <b>${show}</b>.`};}});
  PROBS.push({id:'lh-twice',topic:'lhop',title:'Apply the rule twice',gen(){const a=ri(1,6),pat=pick([0,1]),ax=cof(a,'x'),A=a===1?'':a;let q,ans,f,show,work;
    if(pat===0){q=`lim x→0 (1 − cos(${ax}))/x²`;f=x=>(1-Math.cos(a*x))/(x*x);ans=a*a/2;show=a*a%2===0?String(a*a/2):a*a+'/2';work=`0/0, so differentiate: ${A}sin(${ax})/(2x), still 0/0. Again: ${a===1?'':a*a}cos(${ax})/2 → ${a*a}/2`;}
    else{q=`lim x→0 (e<sup>${ax}</sup> − 1 − ${ax})/x²`;f=x=>(Math.exp(a*x)-1-a*x)/(x*x);ans=a*a/2;show=a*a%2===0?String(a*a/2):a*a+'/2';work=`0/0, so differentiate: (${A}e<sup>${ax}</sup> − ${a})/(2x), still 0/0. Again: ${a===1?'':a*a}e<sup>${ax}</sup>/2 → ${a*a}/2`;}
    return {q:`Find ${q}. Give a fraction or decimal.`,ans,unit:'',tol:.01,show,chk:limit(f,0,1),hint:'The first derivative step is still 0/0. Apply the rule again.',sol:`${work}${show===a*a+'/2'?'':' = '+show}. So the limit is <b>${show}</b>.`};}});
  PROBS.push({id:'lh-inf',topic:'lhop',title:'Which grows faster?',gen(){const n=ri(2,6),p=ri(1,3),R=[[`lim x→∞ x<sup>${n}</sup>/e<sup>x</sup>`,'0'],[`lim x→∞ e<sup>x</sup>/x<sup>${n}</sup>`,'∞'],[`lim x→∞ (ln x)/x<sup>${p}</sup>`,'0'],[`lim x→∞ x<sup>${p}</sup>/ln x`,'∞']],[q,c]=pick(R),m=mcq(c,['0','∞','1','−∞']);
    return {q:`Find ${q}.`,choices:m.choices,ans:m.ans,hint:'Exponentials beat powers; powers beat logs. Or apply L\'Hôpital until the answer is clear.',sol:`Growth hierarchy: ln x ≪ powers ≪ eˣ. The limit is <b>${c}</b>.`};}});
  PROBS.push({id:'lh-form',topic:'lhop',title:'Name the form',gen(){const R=[['lim x→0 (e<sup>x</sup> − 1)/x','0/0 (apply the rule)'],['lim x→∞ (ln x)/x','∞/∞ (apply the rule)'],['lim x→0⁺ x ln x','0·∞ (rewrite as a ratio first)'],['lim x→1 (x + 2)/(x² + 1)','not indeterminate (substitute: 3/2)'],['lim x→∞ (x² + 1)/(e<sup>x</sup>)','∞/∞ (apply the rule)'],['lim x→0 sin x/x','0/0 (apply the rule)']],[q,c]=pick(R),m=mcq(c,R.map(r=>r[1]));
    return {q:`What is the form of ${q}, and what should you do?`,choices:m.choices,ans:m.ans,hint:'Substitute the limiting value into the top and bottom separately.',sol:`<b>${c}</b>.`};}});
})();
