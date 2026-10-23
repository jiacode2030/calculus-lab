/* ---------------- Improper integrals ---------------- */
(function improper(){
  const cv=$('#ip-canvas');if(!cv)return;
  let ty='inf',p=2,z=1;
  const isOne=()=>Math.abs(p-1)<1e-9;
  const lim=()=>ty==='inf'?(p>1?1/(p-1):Infinity):(p<1?1/(1-p):Infinity);
  const val=()=>{if(ty==='inf'){const B=Math.pow(10,z);return isOne()?Math.log(B):(Math.pow(B,1-p)-1)/(1-p);}const e=Math.pow(10,-z);return isOne()?-Math.log(e):(1-Math.pow(e,1-p))/(1-p);};
  const sim=glab('ip-canvas',{view:()=>ty==='inf'?{xr:[0,12],yr:[0,4]}:{xr:[0,1.2],yr:[0,10]},draw(ctx,P){const f=x=>Math.pow(x,-p);
      if(ty==='inf'){const B=Math.pow(10,z);areaSigned(ctx,P,f,1,Math.min(B,P.xr[1]),T.ce,T.ca,300,.35);curveD(ctx,P,f,.05,12,T.cx,2.8,400);vline(ctx,P,1,T.muted);if(B<=12)vline(ctx,P,B,T.hot,[4,4]);else label(ctx,'the shading continues off the right edge',P.box.x+P.box.w-6,P.box.y+14,T.hot,'right','middle',MONO);}
      else{const e=Math.pow(10,-z);areaSigned(ctx,P,f,Math.max(e,.003),1,T.ce,T.ca,300,.35);curveD(ctx,P,f,.02,1.2,T.cx,2.8,400);vline(ctx,P,1,T.muted);vline(ctx,P,e,T.hot,[4,4]);label(ctx,'lower limit ε = '+fmt(e,3),P.box.x+P.box.w-6,P.box.y+14,T.hot,'right','middle',MONO);}}});
  function upd(){const L=lim();setText('ip-area',fmt(val(),4));setText('ip-lim',isFinite(L)?fmt(L,4):'∞ (grows without bound)');setText('ip-ver',isFinite(L)?'converges':'diverges');sim.render();}
  bindRange('ip-p',v=>nz(v),v=>{p=v;upd();});bindRange('ip-z',v=>ty==='inf'?'out to '+fmt(Math.pow(10,v),0):'from '+fmt(Math.pow(10,-v),4),v=>{z=v;upd();});segBind('ip-ty','k',v=>{ty=v;upd();});upd();drawers.improper=()=>sim.render();
  KEYS['ip-canvas']=['Slide p and push the limit out (or toward 0). If the area so far levels off at the limit it converges; if it keeps growing it diverges.',[['cx','f(x) = 1/xᵖ'],['ce','area so far'],['hot','the moving limit']]];
  TIPS['ip-p']=el=>{const q=+el.value;return ty==='inf'?(q>1?`p = ${nz(q)} > 1: the tail has finite area 1/(p − 1).`:'p ≤ 1: the area to ∞ diverges.'):(q<1?`p = ${nz(q)} < 1: finite area 1/(1 − p), despite the blow-up at 0.`:'p ≥ 1: the area near 0 diverges.');};
  GLOSS['improper integral']='An integral with an infinite limit or an integrand that blows up; defined as a limit of ordinary integrals.';GLOSS['converge']='The limit exists and is a finite number.';
  TT.improper='Ask students to predict convergence from p alone, then check on the lab. The borderline p = 1 diverges in both types.';
})();
(function(){
  PROBS.push({id:'ip-val',topic:'improper',title:'Evaluate an improper integral',gen(){const pat=pick([0,1,2,3]);let q,ans,show;
    if(pat===0){const p=pick([2,3,4,5]);q=`Evaluate ∫<sub>1</sub><sup>∞</sup> 1/x<sup>${p}</sup> dx. Give a fraction or decimal.`;ans=1/(p-1);show='1/'+(p-1);}
    else if(pat===1){const kk=ri(1,5);q=`Evaluate ∫<sub>0</sub><sup>∞</sup> e<sup>−${kk===1?'':kk}x</sup> dx. Give a fraction or decimal.`;ans=1/kk;show=kk===1?'1':'1/'+kk;}
    else if(pat===2){const m=pick([2,3,4,5]);q=`Evaluate ∫<sub>0</sub><sup>1</sup> 1/x<sup>1/${m}</sup> dx. Give a fraction or decimal.`;ans=1/(1-1/m);show=m+'/'+(m-1);}
    else{const a=pick([1,2,3]);q=`Evaluate ∫<sub>${a}</sub><sup>∞</sup> 1/x² dx. Give a fraction or decimal.`;ans=1/a;show=a===1?'1':'1/'+a;}
    return {q,ans,unit:'',tol:.004,show,chk:ans,hint:'Replace the problem point by a variable limit, integrate, and take the limit.',sol:`The limit of the proper integrals is <b>${show}</b>.`};}});
  PROBS.push({id:'ip-conv',topic:'improper',title:'Converge or diverge?',gen(){const R=[['∫<sub>1</sub><sup>∞</sup> 1/x dx','diverges'],['∫<sub>1</sub><sup>∞</sup> 1/x² dx','converges'],['∫<sub>1</sub><sup>∞</sup> 1/√x dx','diverges'],['∫<sub>1</sub><sup>∞</sup> 1/x<sup>1.5</sup> dx','converges'],['∫<sub>0</sub><sup>1</sup> 1/x dx','diverges'],['∫<sub>0</sub><sup>1</sup> 1/√x dx','converges'],['∫<sub>0</sub><sup>1</sup> 1/x² dx','diverges'],['∫<sub>0</sub><sup>∞</sup> e<sup>−x</sup> dx','converges'],['∫<sub>1</sub><sup>∞</sup> x dx','diverges']],[ex,ans]=pick(R),m=mcq(ans,['converges','diverges']);
    return {q:`Does ${ex} converge or diverge?`,choices:m.choices,ans:m.ans,hint:'p-test: ∫₁^∞ x⁻ᵖ converges iff p > 1; ∫₀¹ x⁻ᵖ converges iff p < 1.',sol:`<b>${ans}</b>.`};}});
  PROBS.push({id:'ip-pexp',topic:'improper',title:'Which p converge?',gen(){const type=pick(['inf','pt']),p=pick([.5,.8,1,1.2,1.5,2,3]),conv=type==='inf'?p>1:p<1,m=mcq(conv?'converges':'diverges',['converges','diverges']);
    return {q:`Does ${type==='inf'?`∫<sub>1</sub><sup>∞</sup> 1/x<sup>${p}</sup> dx`:`∫<sub>0</sub><sup>1</sup> 1/x<sup>${p}</sup> dx`} converge or diverge?`,choices:m.choices,ans:m.ans,hint:type==='inf'?'At ∞: converges iff p > 1.':'Near 0: converges iff p < 1.',sol:`With p = ${p}: <b>${conv?'converges':'diverges'}</b>.`};}});
})();
