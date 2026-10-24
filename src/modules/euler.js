/* ---------------- Euler's method ---------------- */
(function euler(){
  const cv=$('#eu-canvas');if(!cv)return;
  const C={a:{F:(x,y)=>y,ex:x=>Math.exp(x),yr:[0,8.5]},b:{F:(x,y)=>x-y,ex:x=>x-1+2*Math.exp(-x),yr:[.5,2.4]},c:{F:(x,y)=>-2*x*y,ex:x=>Math.exp(-x*x),yr:[-.1,1.15]}};
  const H={h1:1,h05:.5,h025:.25,h01:.1,h005:.05};
  let k='a',hk='h05';
  const pts=()=>{const F=C[k].F,h=H[hk],n=Math.round(2/h),out=[[0,1]];let x=0,y=1;for(let i=0;i<n;i++){y+=h*F(x,y);x=+(x+h).toFixed(6);out.push([x,y]);}return out;};
  const sim=glab('eu-canvas',{view:()=>({xr:[-.1,2.1],yr:C[k].yr}),draw(ctx,P){const A=C[k],ps=pts(),h=H[hk];curveD(ctx,P,A.ex,0,2,T.cx,2.8,300);
      ctx.save();clip(ctx,P);ctx.strokeStyle=T.hot;ctx.lineWidth=2.4;ctx.beginPath();ps.forEach(([x,y],i)=>i?ctx.lineTo(P.X(x),P.Y(y)):ctx.moveTo(P.X(x),P.Y(y)));ctx.stroke();ctx.restore();ps.forEach(([x,y])=>dot(ctx,P.X(x),P.Y(y),h>=.25?5:3,T.hot,T.surface));}});
  function upd(){const A=C[k],ps=pts(),h=H[hk],est=ps[ps.length-1][1],ex=A.ex(2);setText('eu-est',fmt(est,4));setText('eu-ex',fmt(ex,4));setText('eu-err',fmt(est-ex,4)+(est<ex?' (under)':' (over)'));
    const rows=ps.length>10?[...ps.slice(0,6),null,ps[ps.length-1]]:ps;let i0=0;$('#eu-tbl').innerHTML='<thead><tr><th>n</th><th>xₙ</th><th>yₙ</th><th>slope F(xₙ, yₙ)</th></tr></thead><tbody>'+rows.map(r=>{if(!r)return '<tr><td colspan="4">…</td></tr>';const n=ps.indexOf(r);return `<tr><td>${n}</td><td>${fmt(r[0],2)}</td><td>${fmt(r[1],4)}</td><td>${n<ps.length-1?fmt(A.F(r[0],r[1]),4):'—'}</td></tr>`;}).join('')+'</tbody>';sim.render();}
  segBind('eu-fn','k',v=>{k=v;upd();});segBind('eu-h','k',v=>{hk=v;upd();});upd();drawers.euler=()=>sim.render();
  KEYS['eu-canvas']=['Blue is the exact solution; the orange polyline is Euler\'s method. Change the step size h.',[['cx','exact solution'],['hot','Euler steps']]];
  TIPS['eu-h']=()=>'A smaller step h means more, shorter tangent-line steps, and a smaller error.';
  GLOSS["Euler's method"]='Approximate a solution by repeated tangent-line steps: yₙ₊₁ = yₙ + h·F(xₙ, yₙ).';
  TT.euler='Have students do the first two steps by hand on the first equation, then use the lab to see what shrinking h does.';
})();
(function(){
  const DE=[['x + y',(x,y)=>x+y],['x − y',(x,y)=>x-y],['y − x',(x,y)=>y-x],['2x + y',(x,y)=>2*x+y],['xy',(x,y)=>x*y],['y',(x,y)=>y],['x²',(x,y)=>x*x],['y − 1',(x,y)=>y-1]];
  PROBS.push({id:'eu-step',topic:'euler',title:'Two steps of Euler\'s method',gen(){const [nm,F]=pick(DE),h=pick([.5,.25,1]),y0=ri(1,4),n=2,x0=ri(0,1);let x=x0,y=y0;const steps=[];for(let i=0;i<n;i++){const s=F(x,y);steps.push(`step ${i+1}: slope ${nz(s)} at (${nz(x)}, ${nz(y)}) → y = ${nz(+(y+h*s).toFixed(4))}`);y+=h*s;x+=h;}
    let xm=x0,ym=y0;for(let i=0;i<n;i++){ym=ym+h*F(xm,ym);xm+=h;}
    return {q:`Use Euler's method with step size h = ${h}, two steps, to approximate y(${nz(x0+n*h)}) for dy/dx = ${nm}, y(${x0}) = ${y0}. Give a decimal.`,ans:y,unit:'',abs:.01,chk:ym,hint:'y_new = y_old + h · (slope at the old point). Update x by h each step.',sol:`${steps.join('; ')}. So y(${nz(x0+n*h)}) ≈ <b>${nz(+y.toFixed(4))}</b>.`};}});
  PROBS.push({id:'eu-bias',topic:'euler',title:'Over- or underestimate?',gen(){const R=[['dy/dx = y, y(0) = 1 (solution eˣ, concave up)','underestimate'],['dy/dx = −y, y(0) = 4 (solution 4e⁻ˣ, concave up)','underestimate'],['dy/dx = 2x, y(0) = 0 (solution x², concave up)','underestimate'],['dy/dx = −2x, y(0) = 5 (solution 5 − x², concave down)','overestimate'],['dy/dx = cos x, y(0) = 0 on [0, π/2] (solution sin x, concave down)','overestimate']],[tx,ans]=pick(R),m=mcq(ans,['underestimate','overestimate']);
    return {q:`Euler's method is used for ${tx}. Is the estimate an overestimate or an underestimate?`,choices:m.choices,ans:m.ans,hint:'Tangent lines lie below a concave-up curve and above a concave-down one.',sol:`Euler follows tangent lines, which lie ${ans==='underestimate'?'below':'above'} the solution: an <b>${ans}</b>.`};}});
  PROBS.push({id:'eu-slope',topic:'euler',title:'One Euler step',gen(){const a=ri(1,3),b=ri(-2,3)||1,x0=ri(0,2),y0=ri(1,5),h=pick([.1,.2,.5]),F=(x,y)=>a*x+b*y,ans=y0+h*F(x0,y0);
    return {q:`dy/dx = ${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}y with y(${x0}) = ${y0}. Use one Euler step of size ${h} to estimate y(${nz(+(x0+h).toFixed(2))}). Give a decimal.`,ans,unit:'',abs:.005,chk:y0+h*(a*x0+b*y0),hint:'New y = y₀ + h·(dy/dx at (x₀, y₀)).',sol:`slope = ${mulv(a,x0)} ${b<0?'−':'+'} ${mulp(Math.abs(b),y0)} = ${nz(F(x0,y0))}. y₁ = ${y0} + ${h}(${nz(F(x0,y0))}) = <b>${nz(+ans.toFixed(4))}</b>.`};}});
})();
