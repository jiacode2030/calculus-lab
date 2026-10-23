/* ---------------- Volumes of revolution ---------------- */
(function volrev(){
  const cv=$('#vr-canvas');if(!cv)return;
  const C={a:{top:Math.sqrt,bot:()=>0,c:0,lo:0,hi:4,xr:[-.3,4.4],yr:[-3,3],sc:14,max:3.9},b:{top:Math.sqrt,bot:x=>x*x,c:0,lo:0,hi:1,xr:[-.1,1.2],yr:[-1.3,1.3],sc:40,max:.95},c:{top:Math.sqrt,bot:()=>0,c:-1,lo:0,hi:4,xr:[-.3,4.4],yr:[-5,3],sc:11,max:3.9}};
  let k='a',x0=1;
  const R=(A,x)=>A.top(x)-A.c,r=(A,x)=>A.bot(x)-A.c;
  const sim=glab('vr-canvas',{h:w=>clamp(w*.55,280,380),view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k],N=200,refl=y=>2*A.c-y;
      ctx.save();clip(ctx,P);[1,-1].forEach(sg=>{ctx.beginPath();for(let i=0;i<=N;i++){const x=A.lo+(A.hi-A.lo)*i/N,y=sg>0?A.top(x):refl(A.top(x));i?ctx.lineTo(P.X(x),P.Y(y)):ctx.moveTo(P.X(x),P.Y(y));}for(let i=N;i>=0;i--){const x=A.lo+(A.hi-A.lo)*i/N,y=sg>0?A.bot(x):refl(A.bot(x));ctx.lineTo(P.X(x),P.Y(y));}ctx.closePath();ctx.fillStyle=alpha(T.ce,sg>0?.3:.14);ctx.fill();});
      ctx.strokeStyle=alpha(T.cx,.22);ctx.lineWidth=1;for(let i=0;i<=40;i++){const x=A.lo+(A.hi-A.lo)*i/40;ctx.beginPath();ctx.moveTo(P.X(x),P.Y(A.c-R(A,x)));ctx.lineTo(P.X(x),P.Y(A.c+R(A,x)));ctx.stroke();}ctx.restore();
      curveD(ctx,P,A.top,A.lo,A.hi,T.cx,2.8,200);curveD(ctx,P,x=>refl(A.top(x)),A.lo,A.hi,alpha(T.cx,.6),2,200);if(k==='b'){curveD(ctx,P,A.bot,A.lo,A.hi,T.ca,2.8,200);curveD(ctx,P,x=>refl(A.bot(x)),A.lo,A.hi,alpha(T.ca,.6),2,200);}
      line(ctx,P,P.xr[0],A.c,P.xr[1],A.c,T.ink,1.6,[6,4]);const Rv=R(A,x0),rv=r(A,x0);line(ctx,P,x0,A.c+rv,x0,A.c+Rv,T.hot,4.5);line(ctx,P,x0,A.c-Rv,x0,A.c-rv,T.hot,4.5);
      const cx=P.box.x+P.box.w-62,cy=P.box.y+62;ctx.beginPath();ctx.arc(cx,cy,Rv*A.sc,0,6.283);ctx.fillStyle=alpha(T.ce,.45);ctx.fill();ctx.strokeStyle=T.hot;ctx.lineWidth=2;ctx.stroke();if(rv>1e-6){ctx.beginPath();ctx.arc(cx,cy,rv*A.sc,0,6.283);ctx.fillStyle=T.surface;ctx.fill();ctx.stroke();}label(ctx,'end view',cx,cy+Rv*A.sc+13,T.muted,'center','middle',MONO);}});
  const V=()=>{const A=C[k];return Math.PI*integ(x=>R(A,x)**2-r(A,x)**2,A.lo,A.hi,1000);};
  function upd(){const A=C[k];setText('vr-ro',fmt(R(A,x0),4));setText('vr-ri',fmt(r(A,x0),4));setText('vr-V',fmt(V(),4));sim.render();}
  function setR(){const A=C[k],el=$('#vr-x');el.max=A.max;el.value=Math.min(+el.value,A.max);if(k==='b')el.value=.5;x0=+el.value;}
  bindRange('vr-x',v=>nz(v),v=>{x0=v;upd();});segBind('vr-fn','k',v=>{k=v;setR();upd();});upd();drawers.volrev=()=>sim.render();
  KEYS['vr-canvas']=['Slide x. The orange segment is the slice across the solid; the end view shows the disc or washer you would see looking along the axis.',[['cx','the curve(s) and their mirror image'],['hot','radii R and r of the slice'],['ce','the region and the solid'],['ink','the axis of revolution']]];
  TIPS['vr-x']=el=>`Slice at x = ${nz(+el.value)}: R = ${fmt(R(C[k],+el.value),3)}, r = ${fmt(r(C[k],+el.value),3)}, area ${fmt(Math.PI*(R(C[k],+el.value)**2-r(C[k],+el.value)**2),3)}.`;
  GLOSS['washer']='A disc with a circular hole: area π(R² − r²).';GLOSS['disc method']='Slice a solid of revolution perpendicular to the axis: each slice is a disc of area πR².';
  TT.volrev='Have students sketch the end view of a slice before writing the integral, and label R and r as distances from the axis.';
})();
(function(){
  PROBS.push({id:'vr-disc',topic:'volrev',title:'Disc method',gen(){const n=pick([.5,1,2]),b=ri(1,4),nm=n===.5?'√x':n===1?'x':'x²',ans=Math.PI*Math.pow(b,2*n+1)/(2*n+1);
    return {q:`The region under y = ${nm} on [0, ${b}] is revolved about the x-axis. Find the volume of the solid. Give a decimal to two places.`,ans,unit:'',tol:.004,chk:Math.PI*integ(x=>Math.pow(x,2*n),0,b,3000),hint:`Discs of radius R = ${nm}: V = π∫R² dx.`,sol:`V = π∫<sub>0</sub><sup>${b}</sup> (${nm})² dx = π·${b}<sup>${2*n+1}</sup>/${2*n+1} = <b>${fmt(ans,2)}</b>.`};}});
  PROBS.push({id:'vr-washer',topic:'volrev',title:'Washer method',gen(){const kk=ri(1,4),ans=Math.PI*kk**5*2/15;
    return {q:`The region between y = ${kk===1?'':kk}x and y = x² is revolved about the x-axis. Find the volume. Give a decimal to two places.`,ans,unit:'',tol:.004,chk:Math.PI*integ(x=>(kk*x)**2-x**4,0,kk,3000),hint:`Intersections x = 0 and x = ${kk}. Outer radius ${kk}x, inner radius x². V = π∫(R² − r²) dx.`,sol:`V = π∫<sub>0</sub><sup>${kk}</sup> (${kk*kk}x² − x⁴) dx = π(${kk*kk}·${kk}³/3 − ${kk}⁵/5) = <b>${fmt(ans,2)}</b>.`};}});
  PROBS.push({id:'vr-axis',topic:'volrev',title:'Revolving about a different line',gen(){const c=ri(1,3),ans=Math.PI*(8+32*c/3);
    return {q:`The region under y = √x on [0, 4] is revolved about the line y = −${c}. Find the volume. Give a decimal to one place.`,ans,unit:'',tol:.003,chk:Math.PI*integ(x=>(Math.sqrt(x)+c)**2-c*c,0,4,3000),hint:`Outer radius √x + ${c}, inner radius ${c} (distance from the axis to the x-axis).`,sol:`V = π∫<sub>0</sub><sup>4</sup> [(√x + ${c})² − ${c}²] dx = π∫(x + ${2*c}√x) dx = π(8 + ${32*c}/3) = <b>${fmt(ans,1)}</b>.`};}});
  PROBS.push({id:'vr-setup',topic:'volrev',title:'Set up the volume integral',gen(){const R=[['the region between y = √x and y = x about the x-axis','π∫₀¹ (x − x²) dx',['π∫₀¹ (√x − x)² dx','π∫₀¹ (√x + x)² dx','∫₀¹ (x − x²) dx']],['the region under y = x² on [0, 2] about the x-axis','π∫₀² x⁴ dx',['π∫₀² x² dx','π∫₀² x dx','2π∫₀² x⁴ dx']],['the region under y = √x on [0, 4] about y = −1','π∫₀⁴ [(√x + 1)² − 1] dx',['π∫₀⁴ x dx','π∫₀⁴ (√x − 1)² dx','π∫₀⁴ (√x + 1)² dx']]],[reg,c,w]=pick(R),m=mcq(c,w);
    return {q:`Which integral gives the volume when ${reg} is revolved?`,choices:m.choices,ans:m.ans,hint:'Radii are distances from the axis. Square each radius, subtract the inner from the outer if there is a hole, and include π.',sol:`<b>${c}</b>.`};}});
})();
