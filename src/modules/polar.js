/* ---------------- Polar curves & area ---------------- */
(function polar(){
  const cv=$('#po-canvas');if(!cv)return;
  const C={ca:{r:t=>1+Math.cos(t),max:6.2832,rm:2},ro:{r:t=>2*Math.cos(2*t),max:6.2832,rm:2},li:{r:t=>1+2*Math.cos(t),max:6.2832,rm:3},ci:{r:t=>2*Math.sin(t),max:Math.PI,rm:2}};
  let k='ca',th=1.2;
  const sim=sim2d(cv,{h:w=>clamp(w*.62,300,420),draw(ctx,w,h){const A=C[k],R=Math.min(w/2-30,h/2-26),cx=w/2,cy=h/2,sc=R/(A.rm*1.1),X=(r,t)=>cx+r*sc*Math.cos(t),Y=(r,t)=>cy-r*sc*Math.sin(t);
      ctx.strokeStyle=T.grid;ctx.lineWidth=1;for(let q=1;q<=Math.ceil(A.rm);q++){ctx.beginPath();ctx.arc(cx,cy,q*sc,0,6.2832);ctx.stroke();label(ctx,String(q),cx+q*sc+3,cy-8,T.muted,'left','middle',MONO);}
      for(let i=0;i<12;i++){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*1.1*Math.cos(i*Math.PI/6),cy-R*1.1*Math.sin(i*Math.PI/6));ctx.stroke();}
      const n=240;ctx.beginPath();ctx.moveTo(cx,cy);const m=Math.max(2,Math.round(n*th/A.max*A.max/6.2832*1));for(let i=0;i<=m;i++){const t=th*i/m,r=A.r(t);ctx.lineTo(X(r,t),Y(r,t));}ctx.closePath();ctx.fillStyle=alpha(T.ce,.3);ctx.fill();
      ctx.strokeStyle=alpha(T.cx,.3);ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=n;i++){const t=A.max*i/n,r=A.r(t);i?ctx.lineTo(X(r,t),Y(r,t)):ctx.moveTo(X(r,t),Y(r,t));}ctx.stroke();
      ctx.strokeStyle=T.cx;ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=m;i++){const t=th*i/m,r=A.r(t);i?ctx.lineTo(X(r,t),Y(r,t)):ctx.moveTo(X(r,t),Y(r,t));}ctx.stroke();
      const r=A.r(th);ctx.strokeStyle=T.hot;ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(X(r,th),Y(r,th));ctx.stroke();ctx.setLineDash([]);dot(ctx,X(r,th),Y(r,th),7,T.hot,T.surface);}});
  function upd(){const A=C[k],r=A.r(th),ar=.5*integ(t=>A.r(t)**2,0,th,Math.max(20,Math.round(th*100)));setText('po-rt',`(${fmt(r,3)}, ${fmt(th,3)})`);setText('po-xy',`(${fmt(r*Math.cos(th),3)}, ${fmt(r*Math.sin(th),3)})`);setText('po-ar',fmt(ar,4));setText('po-tot',fmt(.5*integ(t=>A.r(t)**2,0,A.max,2000),4)+(k==='ci'?' (over [0, π])':''));sim.render();}
  function setR(){const A=C[k],el=$('#po-th');el.max=A.max;if(+el.value>A.max)el.value=A.max;th=+el.value;}
  bindRange('po-th',v=>fmt(v,2)+' rad',v=>{th=v;upd();});segBind('po-fn','k',v=>{k=v;setR();upd();});upd();drawers.polar=()=>sim.render();
  KEYS['po-canvas']=['Slide θ. The point sits at distance r in direction θ; the gold sector is the area swept from θ = 0.',[['cx','the curve'],['ce','area swept so far, ½∫r² dθ'],['hot','the radius to the current point']]];
  TIPS['po-th']=el=>`θ = ${fmt(+el.value,2)} rad. A negative r plots the point on the opposite side of the origin.`;
  GLOSS['polar coordinates']='A point described by distance r from the origin and angle θ from the positive x-axis.';GLOSS['cardioid']='A heart-shaped polar curve such as r = 1 + cos θ.';
  TT.polar='Ask students to predict where r is zero or negative on each curve before sliding θ, and to explain why area uses r².';
})();
(function(){
  PROBS.push({id:'po-area',topic:'polar',title:'Area of a polar region',gen(){const pat=pick([0,1,2,3]);let q,ans,chk;
    if(pat===0){const a=ri(1,4);q=`Find the area enclosed by the cardioid r = ${a===1?'':a}(1 + cos θ). Give a decimal to three places.`;ans=1.5*Math.PI*a*a;chk=.5*integ(t=>(a*(1+Math.cos(t)))**2,0,2*Math.PI,3000);}
    else if(pat===1){const a=ri(1,4),n=ri(1,4);q=`Find the area of one petal of the rose r = ${a===1?'':a}cos(${n===1?'':n}θ). Give a decimal to three places.`;ans=Math.PI*a*a/(4*n);chk=.5*integ(t=>(a*Math.cos(n*t))**2,-Math.PI/(2*n),Math.PI/(2*n),3000);}
    else if(pat===2){const a=ri(1,4);q=`Find the area enclosed by the circle r = ${a}. Give a decimal to three places.`;ans=Math.PI*a*a;chk=.5*integ(()=>a*a,0,2*Math.PI,10);}
    else{const a=ri(1,3),b=pick([1,2,3]);q=`Find the area swept by the spiral r = ${a===1?'':a}θ from θ = 0 to θ = ${b}. Give a decimal to three places.`;ans=a*a*Math.pow(b,3)/6;chk=.5*integ(t=>(a*t)**2,0,b,2000);}
    return {q,ans,unit:'',tol:.003,chk,hint:'Area = ½ ∫ r² dθ over the right interval of θ.',sol:`Using A = ½∫r² dθ: <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'po-conv',topic:'polar',title:'Convert polar to rectangular',gen(){const r=ri(1,6),[nm,t]=pick([['π/6',Math.PI/6],['π/4',Math.PI/4],['π/3',Math.PI/3],['π/2',Math.PI/2],['2π/3',2*Math.PI/3],['π',Math.PI],['3π/4',3*Math.PI/4]]),askX=Math.random()<.5,ans=askX?r*Math.cos(t):r*Math.sin(t),a2=Math.abs(ans)<1e-9?0:ans;
    return {q:`Find the ${askX?'x':'y'}-coordinate of the point with polar coordinates (${r}, ${nm}). Give a decimal to three places (or an exact value).`,ans:a2,unit:'',abs:.002,chk:a2,hint:askX?'x = r cos θ.':'y = r sin θ.',sol:`${askX?'x = r cos θ':'y = r sin θ'} = ${r}·${fmt(askX?Math.cos(t):Math.sin(t),4)} = <b>${fmt(a2,3)}</b>.`};}});
  PROBS.push({id:'po-slope',topic:'polar',title:'Slope of a polar curve',gen(){const a=ri(1,3),b=ri(1,3),t0=pick([Math.PI/2,Math.PI/3,Math.PI/4,Math.PI/6,2*Math.PI/3]),nm={[Math.PI/2]:'π/2',[Math.PI/3]:'π/3',[Math.PI/4]:'π/4',[Math.PI/6]:'π/6',[2*Math.PI/3]:'2π/3'}[t0],r=t=>a+b*Math.cos(t),rp=t=>-b*Math.sin(t),den=rp(t0)*Math.cos(t0)-r(t0)*Math.sin(t0);if(Math.abs(den)<1e-6)return PROBS.find(p=>p.id==='po-slope').gen();const ans=(rp(t0)*Math.sin(t0)+r(t0)*Math.cos(t0))/den;
        return {q:`Find dy/dx for r = ${a} + ${b===1?'':b}cos θ at θ = ${nm}. Give a decimal to three places.`,ans,unit:'',tol:.004,chk:D(t=>r(t)*Math.sin(t),t0,1e-3)/D(t=>r(t)*Math.cos(t),t0,1e-3),hint:'dy/dx = (r′ sin θ + r cos θ)/(r′ cos θ − r sin θ), from x = r cos θ and y = r sin θ.',sol:`With r = ${fmt(r(t0),4)} and r′ = ${fmt(rp(t0),4)} at θ = ${nm}: dy/dx = <b>${fmt(ans,3)}</b>.`};}});
})();
