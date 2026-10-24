/* ---------------- Comparison & ratio tests ---------------- */
(function convtests(){
  const cv=$('#ts-canvas');if(!cv)return;
  const C={a:{rat:n=>(n+1)/(2*n),L:.5,txt:'aₙ = n/2ⁿ:  ratio = (n + 1)/(2n) → 1/2',ver:'L = 1/2 < 1: converges absolutely'},b:{rat:n=>2/(n+1),L:0,txt:'aₙ = 2ⁿ/n!:  ratio = 2/(n + 1) → 0',ver:'L = 0 < 1: converges absolutely'},
    c:{rat:n=>(n+1)/3,L:Infinity,txt:'aₙ = n!/3ⁿ:  ratio = (n + 1)/3 → ∞',ver:'L > 1: diverges'},d:{rat:n=>(n/(n+1))**2,L:1,txt:'aₙ = 1/n²:  ratio = (n/(n + 1))² → 1',ver:'L = 1: inconclusive (this series converges, by the p-series test)'},e:{rat:n=>n/(n+1),L:1,txt:'aₙ = 1/n:  ratio = n/(n + 1) → 1',ver:'L = 1: inconclusive (this series diverges, by the p-series test)'}};
  let k='a';
  const sim=glab('ts-canvas',{h:w=>clamp(w*.38,230,300),view:()=>({xr:[0,41],yr:[0,3],xlabel:'n'}),draw(ctx,P){const A=C[k];hline(ctx,P,1,T.hot,[6,4]);label(ctx,'ratio = 1',P.box.x+P.box.w-6,P.Y(1)-9,T.hot,'right','middle',MONO);ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.cx,.5);ctx.lineWidth=1.6;ctx.beginPath();for(let n=1;n<=40;n++){const x=P.X(n),y=P.Y(A.rat(n));n>1?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();for(let n=1;n<=40;n++)dot(ctx,P.X(n),P.Y(A.rat(n)),3.5,T.cx);}});
  function upd(){const A=C[k];setText('ts-form',A.txt);setText('ts-r',fmt(A.rat(30),4));setText('ts-l',A.L===Infinity?'∞':fmt(A.L,3));setText('ts-ver',A.ver);sim.render();}
  segBind('ts-fn','k',v=>{k=v;upd();});upd();
  /* comparison */
  const D2={a:{a:n=>1/(n*n+1),b:n=>1/(n*n),n0:1,txt:'aₙ = 1/(n² + 1) < bₙ = 1/n²; Σ 1/n² converges (p = 2)',ver:'Direct comparison: 0 < aₙ < bₙ and Σ bₙ converges ⇒ Σ aₙ converges.'},
    b:{a:n=>1/Math.sqrt(n*n-1),b:n=>1/n,n0:2,txt:'aₙ = 1/√(n² − 1), bₙ = 1/n; Σ 1/n diverges',ver:'Limit comparison: aₙ/bₙ → 1 (0 < 1 < ∞), and Σ 1/n diverges ⇒ Σ aₙ diverges.'},
    c:{a:n=>1/(Math.pow(2,n)+1),b:n=>1/Math.pow(2,n),n0:1,txt:'aₙ = 1/(2ⁿ + 1) < bₙ = 1/2ⁿ; Σ (1/2)ⁿ is geometric, converges',ver:'Direct comparison with a convergent geometric series ⇒ Σ aₙ converges.'},
    d:{a:n=>1/Math.log(n),b:n=>1/n,n0:2,txt:'aₙ = 1/ln n > bₙ = 1/n (since ln n < n); Σ 1/n diverges',ver:'Direct comparison: aₙ ≥ bₙ ≥ 0 and Σ bₙ diverges ⇒ Σ aₙ diverges.'}};
  let c='a';
  const sim2=glab('ts-canvas2',{h:w=>clamp(w*.38,230,300),view:()=>{const A=D2[c];const m=Math.max(A.a(A.n0),A.b(A.n0))*1.15;return {xr:[0,41],yr:[0,m],xlabel:'n'};},draw(ctx,P){const A=D2[c];[[A.b,T.ca],[A.a,T.cx]].forEach(([fn,col])=>{ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(col,.55);ctx.lineWidth=1.6;ctx.beginPath();for(let n=A.n0;n<=40;n++){const x=P.X(n),y=P.Y(fn(n));n>A.n0?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();for(let n=A.n0;n<=40;n++)dot(ctx,P.X(n),P.Y(fn(n)),3,col);});label(ctx,'aₙ (blue) and bₙ (pink)',P.box.x+P.box.w-6,P.box.y+10,T.muted,'right','middle',MONO);}});
  function upd2(){const A=D2[c];setText('ts-cform',A.txt);setText('ts-ra',fmt(A.a(30)/A.b(30),4));setText('ts-cv',A.ver);sim2.render();}
  segBind('ts-cm','k',v=>{c=v;upd2();});upd2();drawers.convtests=()=>{sim.render();sim2.render();};
  KEYS['ts-canvas']=['Each dot is |aₙ₊₁/aₙ|. If it settles below the orange line (1) the series converges; above it diverges; at 1 the test is silent.',[['cx','ratio |aₙ₊₁/aₙ|'],['hot','the value 1']]];
  KEYS['ts-canvas2']=['Blue: the series you are testing. Pink: the one you know. Their relationship decides the answer.',[['cx','aₙ (to test)'],['ca','bₙ (known)']]];
  TIPS['ts-cm']=()=>'Pick bₙ by keeping only the dominant terms of aₙ.';
  GLOSS['ratio test']='L = lim |aₙ₊₁/aₙ|: L < 1 converges absolutely, L > 1 diverges, L = 1 no information.';GLOSS['limit comparison']='If aₙ/bₙ → L with 0 < L < ∞, then Σ aₙ and Σ bₙ both converge or both diverge.';
  TT.convtests='Ask students to name the best test before seeing the lab, and to say what family of series bₙ comes from.';
})();
(function(){
  PROBS.push({id:'ts-ratio',topic:'convtests',title:'Ratio test limit',gen(){const pat=pick([0,1,2,3]);let q,ans,show,chk,work;
    if(pat===0){const b=ri(2,6);q=`For aₙ = n/${b}<sup>n</sup>, find L = lim |aₙ₊₁/aₙ|. Give a fraction or decimal.`;ans=1/b;show='1/'+b;work=`aₙ₊₁/aₙ = [(n + 1)/${b}<sup>n+1</sup>]·[${b}<sup>n</sup>/n] = (n + 1)/(${b}n) → 1/${b}`;chk=(n=>(n+1)/(b*n))(1e6);}
    else if(pat===1){const b=ri(2,6);q=`For aₙ = ${b}<sup>n</sup>/n!, find L = lim |aₙ₊₁/aₙ|.`;ans=0;show='0';work=`aₙ₊₁/aₙ = [${b}<sup>n+1</sup>/(n + 1)!]·[n!/${b}<sup>n</sup>] = ${b}/(n + 1) → 0`;chk=b/1e6;}
    else if(pat===2){const b=ri(2,5),c=ri(1,3);q=`For aₙ = n²(n + ${c})/${b}<sup>n</sup>, find L = lim |aₙ₊₁/aₙ|. Give a fraction or decimal.`;ans=1/b;show='1/'+b;chk=(n=>(n+1)**2*(n+1+c)/(b*n*n*(n+c)))(1e6);work=`aₙ₊₁/aₙ = (n + 1)²(n + ${c+1})/(${b}n²(n + ${c})). The polynomial parts have the same leading term n³, so their ratio → 1, leaving 1/${b}`;}
    else{const b=ri(2,5);q=`For aₙ = ${b}<sup>n</sup>/n, find L = lim |aₙ₊₁/aₙ|.`;ans=b;show=String(b);work=`aₙ₊₁/aₙ = [${b}<sup>n+1</sup>/(n + 1)]·[n/${b}<sup>n</sup>] = ${b}n/(n + 1) → ${b}`;chk=(n=>b*n/(n+1))(1e6);}
    return {q,ans,unit:'',tol:.004,show,chk,hint:'Write aₙ₊₁/aₙ, simplify, and take the limit as n → ∞.',sol:`${work}. So L = <b>${show}</b>.`};}});
  PROBS.push({id:'ts-which',topic:'convtests',title:'Which test first?',gen(){const R=[['Σ n!/5ⁿ','Ratio test'],['Σ 1/(n³ + 2)','Direct or limit comparison with 1/n³'],['Σ (2n + 1)/(n³ − n)','Limit comparison with 1/n²'],['Σ (−1)ⁿ/n','Alternating series test'],['Σ 3ⁿ/n!','Ratio test'],['Σ 1/(2ⁿ + n)','Direct comparison with (1/2)ⁿ'],['Σ n/(n + 1)','nth-term test (diverges)']],[ex,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`Which test is the most natural first choice for ${ex}?`,choices:m.choices,ans:m.ans,hint:'Factorials and exponentials: ratio test. Rational in n: compare with a p-series. Alternating: alternating series test.',sol:`<b>${ans}</b>.`};}});
  PROBS.push({id:'ts-verdict',topic:'convtests',title:'Converge or diverge?',gen(){const R=[['Σ 1/(n² + 4)','converges (compare with 1/n²)'],['Σ n/(n² + 1)','diverges (limit comparison with 1/n)'],['Σ 2ⁿ/n!','converges (ratio test, L = 0)'],['Σ n!/2ⁿ','diverges (ratio test, L = ∞)'],['Σ 1/(3ⁿ + 1)','converges (compare with (1/3)ⁿ)'],['Σ 1/√(n + 1)','diverges (limit comparison with 1/√n)'],['Σ n²/3ⁿ','converges (ratio test, L = 1/3)']],[ex,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`Decide ${ex}, and give the reason.`,choices:m.choices,ans:m.ans,hint:'Pick a test that fits the form of aₙ, and check its condition.',sol:`<b>${ans}</b>.`};}});
})();
