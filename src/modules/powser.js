/* ---------------- Power series: radius & interval of convergence ---------------- */
(function powser(){
  const cv=$('#pw-canvas');if(!cv)return;
  const fact=n=>n<=1?1:n*fact(n-1);
  const C={a:{t:(n,x)=>Math.pow(x,n),n0:0,R:'1',int:'(−1, 1)',ok:x=>Math.abs(x)<1},b:{t:(n,x)=>Math.pow(x,n)/n,n0:1,R:'1',int:'[−1, 1)',ok:x=>x>=-1&&x<1},c:{t:(n,x)=>Math.pow(x,n)/(n*n),n0:1,R:'1',int:'[−1, 1]',ok:x=>Math.abs(x)<=1},
    d:{t:(n,x)=>Math.pow(x,n)/fact(n),n0:0,R:'∞',int:'(−∞, ∞)',ok:()=>true},e:{t:(n,x)=>fact(n)*Math.pow(x,n),n0:0,R:'0',int:'{0}',ok:x=>x===0}};
  let k='a',x0=.5;
  const S=(j,x)=>{let s=0;for(let n=C[k].n0;n<=j;n++)s+=C[k].t(n,x);return s;};
  const sim=sim2d(cv,{h:w=>clamp(w*.55,300,400),draw(ctx,w,h){const A=C[k];
      /* number line with the interval of convergence */
      const x0p=40,x1p=w-40,X=q=>x0p+(q+3)/6*(x1p-x0p),yL=40;ctx.strokeStyle=T.muted;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x0p,yL);ctx.lineTo(x1p,yL);ctx.stroke();ctx.fillStyle=T.muted;ctx.font=MONO;ctx.textAlign='center';for(let q=-3;q<=3;q++){ctx.beginPath();ctx.moveTo(X(q),yL-4);ctx.lineTo(X(q),yL+4);ctx.stroke();ctx.fillText(String(q).replace('-','−'),X(q),yL+18);}
      const lo=k==='d'?-3:k==='e'?0:-1,hi=k==='d'?3:k==='e'?0:1;ctx.strokeStyle=T.cv;ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(X(lo),yL);ctx.lineTo(X(hi),yL);ctx.stroke();ctx.lineCap='butt';
      if(k!=='d'&&k!=='e'){hole(ctx,X(-1),yL,6,T.cv,k==='b'||k==='c');hole(ctx,X(1),yL,6,T.cv,k==='c');}if(k==='e')hole(ctx,X(0),yL,6,T.cv,true);
      dot(ctx,X(clamp(x0,-3,3)),yL-18,6,A.ok(x0)?T.cv:T.ca,T.surface);label(ctx,'interval of convergence (green)',x0p,14,T.muted,'left','middle',MONO);
      /* partial sums at the probe */
      let lo2=Infinity,hi2=-Infinity;const vals=[];for(let j=A.n0;j<=40;j++){vals.push(S(j,x0));}vals.forEach(v=>{if(isFinite(v)){lo2=Math.min(lo2,v);hi2=Math.max(hi2,v);}});const cap=Math.max(Math.abs(vals[5]||1)*20,20);lo2=Math.max(lo2,-cap);hi2=Math.min(hi2,cap);const p=(hi2-lo2)*.15+.3;
      const P=gpanel(ctx,{x:46,y:78,w:w-60,h:h-78-34},[0,41],[lo2-p,hi2+p],{xn:5,yn:4,xlabel:'N'});ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(A.ok(x0)?T.cv:T.ca,.5);ctx.lineWidth=1.5;ctx.beginPath();vals.forEach((v,i)=>{const x=P.X(i+A.n0),y=P.Y(v);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();ctx.restore();vals.forEach((v,i)=>dot(ctx,P.X(i+A.n0),P.Y(clamp(v,P.yr[0],P.yr[1])),3.2,A.ok(x0)?T.cv:T.ca));label(ctx,`partial sums of the series at x = ${nz(x0)}`,P.box.x+8,P.box.y+10,T.muted,'left','middle',MONO);}});
  function upd(){const A=C[k];setText('pw-R',A.R);setText('pw-int',A.int);setText('pw-st',A.ok(x0)?'converges':'diverges');sim.render();}
  bindRange('pw-x',v=>nz(v),v=>{x0=v;upd();});segBind('pw-fn','k',v=>{k=v;upd();});upd();drawers.powser=()=>sim.render();
  KEYS['pw-canvas']=['Move the probe x. The partial sums of the series at that x are plotted below: they settle if x is inside the interval (green).',[['cv','converging (inside the interval)'],['ca','diverging (outside)']]];
  TIPS['pw-x']=el=>`At x = ${nz(+el.value)} the series ${C[k].ok(+el.value)?'converges':'diverges'}. Test the endpoints ±R separately.`;
  GLOSS['radius of convergence']='R such that the power series converges for |x − c| < R and diverges for |x − c| > R.';GLOSS['interval of convergence']='All x where the power series converges, including any endpoints that work.';
  TT.powser='Have students find the radius with the ratio test first, then check each endpoint by hand against the lab.';
})();
(function(){
  PROBS.push({id:'pw-R',topic:'powser',title:'Radius of convergence',gen(){const b=ri(2,6),pat=pick([0,1,2,3]);let q,ans,work;
    if(pat===0){q=`Find the radius of convergence of Σ<sub>n=1</sub><sup>∞</sup> n·xⁿ/${b}ⁿ.`;ans=b;work=`|aₙ₊₁/aₙ| = ((n + 1)/n)·|x|/${b} → |x|/${b}, and |x|/${b} &lt; 1 means |x| &lt; ${b}`;}
    else if(pat===1){const c=ri(1,4);q=`Find the radius of convergence of Σ<sub>n=0</sub><sup>∞</sup> (x − ${c})ⁿ/${b}ⁿ.`;ans=b;work=`|aₙ₊₁/aₙ| = |x − ${c}|/${b} for every n, and that is &lt; 1 when |x − ${c}| &lt; ${b}`;}
    else if(pat===2){q=`Find the radius of convergence of Σ<sub>n=1</sub><sup>∞</sup> ${b}ⁿ·xⁿ/n².`;ans=1/b;work=`|aₙ₊₁/aₙ| = ${b}|x|·n²/(n + 1)² → ${b}|x|, and ${b}|x| &lt; 1 means |x| &lt; 1/${b}`;}
    else{q=`Find the radius of convergence of Σ<sub>n=1</sub><sup>∞</sup> (${b}x)ⁿ/n.`;ans=1/b;work=`|aₙ₊₁/aₙ| = ${b}|x|·n/(n + 1) → ${b}|x|, and ${b}|x| &lt; 1 means |x| &lt; 1/${b}`;}
    return {q:q+' Give a fraction or decimal.',ans,unit:'',tol:.004,show:ans>=1?String(ans):'1/'+Math.round(1/ans),chk:ans,hint:'Ratio test: lim |aₙ₊₁/aₙ| < 1 gives |x − c| < R.',sol:`Ratio test: ${work}. So R = <b>${ans>=1?ans:'1/'+Math.round(1/ans)}</b>.`};}});
  PROBS.push({id:'pw-int',topic:'powser',title:'Interval of convergence',gen(){const R=[['Σ xⁿ/n','[−1, 1)','The ratio test gives R = 1. At x = 1 it is the harmonic series (diverges); at x = −1 the alternating harmonic series (converges)'],['Σ xⁿ/n²','[−1, 1]','The ratio test gives R = 1. At x = ±1 the absolute values form the p-series with p = 2, so both endpoints converge'],['Σ xⁿ','(−1, 1)','Geometric with r = x, so |x| &lt; 1. At x = ±1 the terms do not go to 0'],['Σ (−1)ⁿxⁿ/n','(−1, 1]','The ratio test gives R = 1. At x = 1 it is the alternating harmonic series (converges); at x = −1 it is the harmonic series (diverges)'],['Σ (x − 2)ⁿ/n','[1, 3)','Center 2, R = 1. At x = 3 it is the harmonic series (diverges); at x = 1 the alternating harmonic series (converges)'],['Σ (x − 2)ⁿ/n²','[1, 3]','Center 2, R = 1. At both endpoints the absolute values form the p-series with p = 2, so both converge'],['Σ (x + 1)ⁿ/(2ⁿ·n)','[−3, 1)','Center −1, ratio |x + 1|/2 &lt; 1 gives R = 2. At x = 1 it is the harmonic series (diverges); at x = −3 the alternating harmonic series (converges)'],['Σ xⁿ/n!','(−∞, ∞)','The ratio is |x|/(n + 1) → 0 &lt; 1 for every x'],['Σ n!xⁿ','{0}','The ratio is (n + 1)|x| → ∞ for every x ≠ 0, so only x = 0 works']],[ex,ans,why]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`Find the interval of convergence of ${ex} (n starting at 1, or 0 for the last two).`,choices:m.choices,ans:m.ans,hint:'Ratio test for the radius, then test each endpoint with a series test.',sol:`${why}. Interval: <b>${ans}</b>.`};}});
  PROBS.push({id:'pw-end',topic:'powser',title:'What happens at an endpoint?',gen(){const R=[['Σ xⁿ/n at x = 1','diverges (harmonic series)'],['Σ xⁿ/n at x = −1','converges (alternating harmonic series)'],['Σ xⁿ/n² at x = 1','converges (p-series, p = 2)'],['Σ xⁿ at x = 1','diverges (terms → 1, nth-term test)'],['Σ xⁿ/√n at x = 1','diverges (p-series, p = 1/2)'],['Σ xⁿ/√n at x = −1','converges (alternating series test)']],[ex,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`What happens to ${ex}?`,choices:m.choices,ans:m.ans,hint:'Substitute the endpoint and identify the resulting series of numbers.',sol:`<b>${ans}</b>.`};}});
})();
