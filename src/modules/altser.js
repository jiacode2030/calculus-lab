/* ---------------- Alternating series & error bounds ---------------- */
(function altser(){
  const cv=$('#at-canvas');if(!cv)return;
  let p=1,N=8;
  const b=n=>Math.pow(n,-p),S=k=>{let s=0;for(let n=1;n<=k;n++)s+=(n%2?1:-1)*b(n);return s;};
  const est=()=>{let s=0;const M=20000;for(let n=1;n<=M;n++)s+=(n%2?1:-1)*b(n);const s1=s+(((M+1)%2)?1:-1)*b(M+1);return (s+s1)/2;};
  const sim=glab('at-canvas',{view:()=>{let lo=Infinity,hi=-Infinity;for(let k=1;k<=30;k++){const v=S(k);lo=Math.min(lo,v);hi=Math.max(hi,v);}const pd=(hi-lo)*.15+.05;return {xr:[0,31],yr:[lo-pd,hi+pd],xlabel:'N'};},
    draw(ctx,P){const s=est(),a=S(N),a1=S(N+1);ctx.save();clip(ctx,P);ctx.fillStyle=alpha(T.ce,.2);ctx.fillRect(P.box.x,P.Y(Math.max(a,a1)),P.box.w,P.Y(Math.min(a,a1))-P.Y(Math.max(a,a1)));ctx.restore();hline(ctx,P,s,T.hot,[6,4]);
      ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.cx,.45);ctx.lineWidth=1.5;ctx.beginPath();for(let k=1;k<=30;k++){const x=P.X(k),y=P.Y(S(k));k>1?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();for(let k=1;k<=30;k++)dot(ctx,P.X(k),P.Y(S(k)),k===N?7:3.5,k===N?T.cx:alpha(T.cx,.7),k===N?T.surface:null);}});
  function upd(){const s=est();setText('at-s',fmt(S(N),5));setText('at-sum',fmt(s,4));setText('at-err',`${fmt(b(N+1),4)}  (actual ${fmt(Math.abs(s-S(N)),4)})`);setText('at-ver',p>1+1e-9?'absolutely convergent (p > 1)':'conditionally convergent (0 < p ≤ 1: converges, but Σ|aₙ| diverges)');sim.render();}
  bindRange('at-p',v=>nz(v),v=>{p=v;upd();});bindRange('at-n',v=>String(v),v=>{N=v;upd();});upd();drawers.altser=()=>sim.render();
  KEYS['at-canvas']=['Partial sums zigzag toward the sum (orange line). The gold band between S_N and S_{N+1} always contains the true sum.',[['cx','partial sums S_N'],['hot','the sum (estimated)'],['ce','between S_N and S_{N+1}']]];
  TIPS['at-n']=el=>`After ${el.value} terms the error is at most the next term, ${fmt(b(+el.value+1),4)}.`;
  GLOSS['conditional convergence']='The series converges, but the series of absolute values diverges, like 1 − 1/2 + 1/3 − ….';GLOSS['absolute convergence']='Σ|aₙ| converges. Then Σ aₙ converges too.';
  TT.altser='Have students predict which side of the sum S_N is on for odd and even N, and why the next term bounds the error.';
})();
(function(){
  PROBS.push({id:'at-bound',topic:'altser',title:'How many terms are needed?',gen(){const p=pick([1,2,3,.5]),eps=pick([.1,.01,.001,.05]),N=Math.floor(Math.pow(eps,-1/p)+1e-9),
      pt=p===1?'1/n':p===.5?'1/√n':`1/n<sup>${p}</sup>`;
    return {q:`The alternating series Σ<sub>n=1</sub><sup>∞</sup> (−1)<sup>n+1</sup>/${p===.5?'√n':p===1?'n':'n<sup>'+p+'</sup>'} is approximated by its partial sum S<sub>N</sub>. What is the smallest N guaranteed (by the alternating series error bound) to give an error less than ${eps}?`,ans:N,unit:'',abs:.01,chk:N,hint:`Error ≤ the first omitted term b<sub>N+1</sub> = ${pt.replace('n','(N+1)')}. Require it to be less than ${eps}.`,sol:`Need b<sub>N+1</sub> &lt; ${eps}. The smallest N with ${pt.replace('n','(N+1)')} &lt; ${eps} is <b>N = ${N}</b> (check: b<sub>${N+1}</sub> = ${fmt(Math.pow(N+1,-p),5)}).`};}});
  PROBS.push({id:'at-err',topic:'altser',title:'Error bound',gen(){const N=ri(3,12),p=pick([1,2]),ans=Math.pow(N+1,-p);
    return {q:`S<sub>${N}</sub> is used to approximate Σ (−1)<sup>n+1</sup>/n<sup>${p===1?'':p}</sup>. Use the alternating series error bound to find the maximum possible error. Give a decimal to four places.`.replace('n<sup></sup>','n'),ans,unit:'',tol:.004,chk:Math.pow(N+1,-p),hint:'The error is at most the first omitted term: b<sub>N+1</sub>.',sol:`b<sub>${N+1}</sub> = 1/${N+1}${p===1?'':'<sup>'+p+'</sup>'} = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'at-class',topic:'altser',title:'Absolute, conditional or divergent?',gen(){const R=[['Σ (−1)<sup>n</sup>/n','converges conditionally'],['Σ (−1)<sup>n</sup>/n²','converges absolutely'],['Σ (−1)<sup>n</sup>/√n','converges conditionally'],['Σ (−1)<sup>n</sup>·n/(n + 1)','diverges (terms do not → 0)'],['Σ (−1)<sup>n</sup>/n<sup>1.5</sup>','converges absolutely'],['Σ (−1)<sup>n</sup>/ln n, n ≥ 2','converges conditionally'],['Σ (−1/2)<sup>n</sup>','converges absolutely']],[ex,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`Classify ${ex}.`,choices:m.choices,ans:m.ans,hint:'First: does the alternating series test apply? Then: does Σ|aₙ| converge?',sol:`<b>${ans}</b>.`};}});
})();
