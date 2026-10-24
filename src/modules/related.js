/* ---------------- Related rates ---------------- */
(function related(){
  const cv=$('#rr-canvas');if(!cv)return;
  /* rng: [min,max,default,step] of the variable; g: default given rate */
  const C={lad:{rng:[1,9.5,6,.1],g:2,vl:'Foot distance x (ft)',gl:'dx/dt (ft/s)',form:'x² + y² = 100   (ladder 10 ft long)'},
    cir:{rng:[1,8,4,.1],g:3,vl:'Radius r (cm)',gl:'dr/dt (cm/s)',form:'A = πr²   (ripple on a pond)'},
    sph:{rng:[1,8,4,.1],g:2,vl:'Radius r (cm)',gl:'dr/dt (cm/s)',form:'V = (4/3)πr³   (balloon being inflated)'},
    lamp:{rng:[1,30,10,.5],g:5,vl:'Distance from the pole x (ft)',gl:'walking speed dx/dt (ft/s)',form:'15/(x + s) = 6/s, so s = (2/3)x   (15 ft lamppost, 6 ft person)'},
    cone:{rng:[1,10,5,.1],g:2,vl:'Water depth h (ft)',gl:'inflow dV/dt (ft³/min)',form:'V = (π/3)r²h with r = 0.4h   (cone 10 ft deep, top radius 4 ft)'}};
  let k='lad',v=6,g=2;
  const sim=sim2d(cv,{h:w=>clamp(w*.5,260,360),draw(ctx,w,h){
    if(k==='lad'){const s=Math.min((h-60)/10,(w-120)/10),ox=60,oy=h-30,x=v,y=Math.sqrt(100-x*x),dy=-(x/y)*g;ctx.strokeStyle=T.muted;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(ox,oy-11*s);ctx.lineTo(ox,oy);ctx.lineTo(ox+11*s,oy);ctx.stroke();
      ctx.strokeStyle=T.cx;ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ox,oy-y*s);ctx.lineTo(ox+x*s,oy);ctx.stroke();ctx.lineCap='butt';
      label(ctx,'x = '+fmt(x,2),ox+x*s/2,oy+16,T.cx,'center','middle',MONO);label(ctx,'y = '+fmt(y,2),ox-8,oy-y*s/2,T.cx,'right','middle',MONO);label(ctx,'10 ft',ox+x*s/2+10,oy-y*s/2-8,T.cx,'left','middle',MONO);
      arrow(ctx,ox+x*s,oy-16,ox+x*s+12*g,oy-16,T.cv,3);label(ctx,fmt(g,2)+' ft/s',ox+x*s+12*g+6,oy-16,T.cv,'left','middle',MONO);
      const L=Math.min(110,-dy*12);arrow(ctx,ox+12,oy-y*s,ox+12,oy-y*s+L,T.hot,3);label(ctx,fmt(dy,2)+' ft/s',ox+20,oy-y*s+L/2,T.hot,'left','middle',MONO);}
    else if(k==='lamp'){const oy=h-34,ox=40,s=Math.min((h-70)/15.5,(w-90)/50),x=v,sh=2*x/3,px=ox+x*s,tx=ox+(x+sh)*s,ly=oy-15*s,hy=oy-6*s;
      ctx.fillStyle=T.sunk;ctx.fillRect(0,oy,w,26);ctx.strokeStyle=T.ink;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,oy+.5);ctx.lineTo(w,oy+.5);ctx.stroke();
      ctx.fillStyle=alpha(T.ce,.12);ctx.beginPath();ctx.moveTo(ox,ly);ctx.lineTo(ox,oy);ctx.lineTo(tx,oy);ctx.closePath();ctx.fill();ctx.fillStyle=alpha(T.ce,.35);ctx.beginPath();ctx.moveTo(px,hy);ctx.lineTo(px,oy);ctx.lineTo(tx,oy);ctx.closePath();ctx.fill();
      ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle=T.ce;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(ox,ly);ctx.lineTo(tx,oy);ctx.stroke();ctx.restore();
      ctx.strokeStyle=T.ink;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox,ly);ctx.stroke();dot(ctx,ox,ly,7,T.ce,T.ink);label(ctx,'15 ft',ox+10,ly+14,T.muted,'left','middle',MONO);
      ctx.strokeStyle=alpha(T.ink,.7);ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(px,oy-2);ctx.lineTo(tx,oy-2);ctx.stroke();
      const hd=6*s*.13;ctx.strokeStyle=T.cx;ctx.lineWidth=2.6;ctx.beginPath();ctx.arc(px,hy+hd,hd,0,6.283);ctx.moveTo(px,hy+2*hd);ctx.lineTo(px,oy-6*s*.42);ctx.lineTo(px-6*s*.14,oy);ctx.moveTo(px,oy-6*s*.42);ctx.lineTo(px+6*s*.14,oy);ctx.moveTo(px-6*s*.16,oy-6*s*.52);ctx.lineTo(px,oy-6*s*.72);ctx.lineTo(px+6*s*.16,oy-6*s*.52);ctx.stroke();
      label(ctx,'x = '+fmt(x,1),(ox+px)/2,oy+14,T.cx,'center','middle',MONO);label(ctx,'s = '+fmt(sh,2),(px+tx)/2,oy+14,T.cx,'center','middle',MONO);
      arrow(ctx,px,hy-14,px+8*g,hy-14,T.cv,3);label(ctx,fmt(g,2)+' ft/s',px+8*g+6,hy-14,T.cv,'left','middle',MONO);
      arrow(ctx,tx,oy-14,tx+8*g*5/3,oy-14,T.hot,3);label(ctx,'tip '+fmt(g*5/3,2)+' ft/s',tx+8*g*5/3+6,oy-14,T.hot,'left','middle',MONO);}
    else if(k==='cone'){const s=Math.min((h-60)/10.5,(w-80)/9),cx=w/2,ay=h-24,ty=ay-10*s,hh=v,wy=ay-hh*s,dh=g/(.16*Math.PI*hh*hh);
      ctx.fillStyle=alpha(T.cx,.28);ctx.beginPath();ctx.moveTo(cx,ay);ctx.lineTo(cx-.4*hh*s,wy);ctx.lineTo(cx+.4*hh*s,wy);ctx.closePath();ctx.fill();
      ctx.strokeStyle=T.cx;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx-.4*hh*s,wy);ctx.lineTo(cx+.4*hh*s,wy);ctx.stroke();
      ctx.strokeStyle=T.ink;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx-4*s,ty);ctx.lineTo(cx,ay);ctx.lineTo(cx+4*s,ty);ctx.stroke();ctx.save();ctx.setLineDash([4,4]);ctx.strokeStyle=T.muted;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx-4*s,ty);ctx.lineTo(cx+4*s,ty);ctx.stroke();ctx.restore();
      ctx.strokeStyle=T.muted;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx+4*s+18,ay);ctx.lineTo(cx+4*s+18,wy);ctx.stroke();label(ctx,'h = '+fmt(hh,2),cx+4*s+24,(ay+wy)/2,T.cx,'left','middle',MONO);
      label(ctx,'r = '+fmt(.4*hh,2),cx-.4*hh*s-8,wy,T.cx,'right','middle',MONO);
      arrow(ctx,cx-4*s-30,ty-14,cx-14,ty+10,T.cv,3);label(ctx,fmt(g,2)+' ft³/min in',cx-4*s-34,ty-20,T.cv,'left','middle',MONO);
      const L=Math.max(8,Math.min(80,dh*80));arrow(ctx,cx,wy-2,cx,wy-2-L,T.hot,3);label(ctx,'dh/dt',cx+8,wy-2-L/2,T.hot,'left','middle',MONO);}
    else{const R=Math.min(h/2-20,(w-80)/2),cx=w/2,cy=h/2,sc=R/8.5,r=v*sc;
      if(k==='cir'){for(let i=1;i<=3;i++){ctx.strokeStyle=alpha(T.cx,.18*i);ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r*i/3,0,6.283);ctx.stroke();}ctx.fillStyle=alpha(T.ce,.25);ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.fill();ctx.strokeStyle=T.cx;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.stroke();}
      else{const gr=ctx.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);gr.addColorStop(0,alpha(T.ca,.25));gr.addColorStop(1,alpha(T.ca,.75));ctx.fillStyle=gr;ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.fill();ctx.strokeStyle=T.ca;ctx.lineWidth=3;ctx.stroke();}
      ctx.strokeStyle=T.ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();label(ctx,'r = '+fmt(v,1),cx+r/2,cy-12,T.ink,'center','middle',MONO);arrow(ctx,cx+r,cy+18,cx+r+10*g,cy+18,T.cv,3);}}});
  function upd(){let ans,eq,giv;
    if(k==='lad'){const y=Math.sqrt(100-v*v);giv=`dx/dt = ${fmt(g,2)} ft/s`;ans=`dy/dt = −(x/y)(${fmt(g,2)}) = ${fmt(-(v/y)*g,3)} ft/s`;eq='2x·x′ + 2y·y′ = 0';}
    else if(k==='cir'){giv=`dr/dt = ${fmt(g,2)} cm/s`;ans=`dA/dt = 2πr(${fmt(g,2)}) = ${fmt(2*Math.PI*v*g,2)} cm²/s`;eq='dA/dt = 2πr·dr/dt';}
    else if(k==='sph'){giv=`dr/dt = ${fmt(g,2)} cm/s`;ans=`dV/dt = 4πr²(${fmt(g,2)}) = ${fmt(4*Math.PI*v*v*g,1)} cm³/s`;eq='dV/dt = 4πr²·dr/dt';}
    else if(k==='lamp'){giv=`dx/dt = ${fmt(g,2)} ft/s`;ans=`ds/dt = ${fmt(2*g/3,3)} ft/s; tip ${fmt(5*g/3,3)} ft/s`;eq='ds/dt = (2/3)·dx/dt';}
    else{giv=`dV/dt = ${fmt(g,2)} ft³/min`;ans=`dh/dt = ${fmt(g/(.16*Math.PI*v*v),4)} ft/min`;eq='dV/dt = 0.16π h²·dh/dt';}
    setText('rr-form',C[k].form);setText('rr-given',giv);setText('rr-ans',ans);setText('rr-eq',eq);sim.render();}
  const lbl=(id,t)=>{const s=$(`label[for=${id}] span`);if(s)s.textContent=t;};
  function setRng(){const A=C[k],el=$('#rr-v'),[a,b,d,st]=A.rng;el.min=a;el.max=b;el.step=st;el.value=d;v=d;$('#rr-v-out').textContent=nz(d);const eg=$('#rr-g');eg.value=A.g;g=A.g;$('#rr-g-out').textContent=nz(g);lbl('rr-v',A.vl);lbl('rr-g',A.gl);}
  bindRange('rr-v',x=>nz(x),x=>{v=x;upd();});bindRange('rr-g',x=>nz(x),x=>{g=x;upd();});segBind('rr-fn','k',x=>{k=x;setRng();upd();});setRng();upd();drawers.related=()=>sim.render();
  KEYS['rr-canvas']=['Slide the variable to choose the moment, and the given rate to change how fast things move. Green arrows are given rates; orange arrows are the rate you want.',[['cx','the changing lengths'],['cv','given rate'],['hot','the rate you want'],['ce','similar triangles (lamppost)']]];
  TIPS['rr-v']=el=>`At this moment the variable is ${nz(+el.value)}. The linked rate depends on the moment, even though the given rate is constant.`;
  TIPS['rr-g']=el=>`Given rate ${nz(+el.value)}. At a fixed moment the rate you want is proportional to it.`;
  GLOSS['related rates']='Rates of change of different quantities that are linked by an equation; differentiate the equation with respect to time.';GLOSS['similar triangles']='Triangles with the same angles; their matching sides are in the same ratio.';
  TT.related='Ask students to say which quantities are constant and which change before writing any equation, and to differentiate before substituting.';
})();
(function(){
  const TRI=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]];
  PROBS.push({id:'rr-ladder',topic:'related',title:'Sliding ladder',gen(){const [x,y,L]=pick(TRI),sw=Math.random()<.5,dx=ri(1,4),ans=-(x/y)*dx;
    return {q:`A ${L} ft ladder leans against a vertical wall. Its foot slides away from the wall at ${dx} ft/s. How fast is the top sliding down the wall (give dy/dt, negative if falling) when the foot is ${x} ft from the wall? Give a decimal or fraction in ft/s.`,ans,unit:'ft/s',tol:.01,chk:ans,hint:'x² + y² = L². Differentiate in t first, then use x = '+x+', y = '+y+'.',sol:`x² + y² = ${L*L} ⇒ 2x·x′ + 2y·y′ = 0 ⇒ y′ = −(x/y)x′. At x = ${x}, y = ${y}: y′ = −(${x}/${y})(${dx}) = <b>${fmt(ans,3)} ft/s</b>.`};}});
  PROBS.push({id:'rr-circle',topic:'related',title:'Growing circle',gen(){const r=ri(2,9),dr=ri(1,5),ans=2*Math.PI*r*dr;
    return {q:`The radius of a circular oil spill grows at ${dr} m/min. How fast is the area growing when r = ${r} m? Give a decimal in m²/min.`,ans,unit:'m²/min',tol:.01,chk:ans,hint:'A = πr², so dA/dt = 2πr·dr/dt.',sol:`dA/dt = 2πr·dr/dt = 2π(${r})(${dr}) = <b>${fmt(ans,2)} m²/min</b>.`};}});
  PROBS.push({id:'rr-sphere',topic:'related',title:'Inflating a balloon',gen(){const r=ri(2,9),dV=pick([20,40,60,100,200]),ans=dV/(4*Math.PI*r*r);
    return {q:`Air is pumped into a spherical balloon at ${dV} cm³/s. How fast is the radius increasing when r = ${r} cm? Give a decimal in cm/s.`,ans,unit:'cm/s',tol:.01,chk:ans,hint:'V = (4/3)πr³ ⇒ dV/dt = 4πr²·dr/dt. Solve for dr/dt.',sol:`dr/dt = (dV/dt)/(4πr²) = ${dV}/(4π(${r})²) = <b>${fmt(ans,4)} cm/s</b>.`};}});
  PROBS.push({id:'rr-rect',topic:'related',title:'Rectangle area',gen(){const L=ri(4,12),W=ri(2,9),dL=ri(1,4),dW=ri(-3,3)||1,ans=dL*W+L*dW;
    return {q:`A rectangle's length is ${L} cm and increasing at ${dL} cm/s; its width is ${W} cm and ${dW>0?'increasing':'decreasing'} at ${Math.abs(dW)} cm/s. How fast is the area changing, in cm²/s?`,ans,unit:'cm²/s',abs:.01,chk:ans,hint:'A = LW. Product rule in t: dA/dt = L′W + LW′. Decreasing means a negative rate.',sol:`dA/dt = (${dL})(${W}) + (${L})(${nz(dW)}) = <b>${nz(ans)} cm²/s</b>.`};}});
  PROBS.push({id:'rr-lamp',topic:'related',title:'Shadow from a street light',gen(){const H=pick([12,15,18,20]),p=pick([5,6]),sp=pick([3,4,5,6]),d=ri(10,40),tip=Math.random()<.5,ans=tip?sp*H/(H-p):sp*p/(H-p);
    return {q:`A street light is at the top of a ${H} ft pole. A person ${p} ft tall walks away from the pole at ${sp} ft/s. How fast is ${tip?'the tip of the shadow moving':'the shadow getting longer'} when the person is ${d} ft from the pole? Give a decimal in ft/s.`,ans,unit:'ft/s',tol:.005,chk:(()=>{const s=x=>p*x/(H-p),e=1e-4;return tip?(((d+e)+s(d+e))-((d-e)+s(d-e)))/(2*e)*sp:(s(d+e)-s(d-e))/(2*e)*sp;})(),hint:`Similar triangles: ${H}/(x + s) = ${p}/s. Solve for s in terms of x, then differentiate.`,sol:`${H}s = ${p}x + ${p}s ⇒ s = ${p}x/${H-p}. ds/dt = (${p}/${H-p})(${sp}) = ${fmt(sp*p/(H-p),3)} ft/s; the tip x + s moves at (${H}/${H-p})(${sp}) = ${fmt(sp*H/(H-p),3)} ft/s. Answer: <b>${fmt(ans,3)} ft/s</b> (the ${d} ft is not needed).`};}});
  PROBS.push({id:'rr-cone',topic:'related',title:'Filling a cone',gen(){const H=pick([8,10,12]),R=pick([2,3,4]),q=pick([2,3,5,10]),hh=ri(2,H-1),ans=q*H*H/(Math.PI*R*R*hh*hh);
    return {q:`Water flows at ${q} ft³/min into a tank shaped like an upside-down cone, ${H} ft deep with a top radius of ${R} ft. How fast is the water level rising when the water is ${hh} ft deep? Give a decimal in ft/min.`,ans,unit:'ft/min',tol:.005,chk:(()=>{const V=x=>Math.PI/3*(R*x/H)**2*x,e=1e-4;return q/((V(hh+e)-V(hh-e))/(2*e));})(),hint:`Similar triangles give r = (${R}/${H})h, so V = (π/3)(${R}/${H})²h³. Differentiate in t.`,sol:`V = (π/3)(${R}h/${H})²h = πR²h³/(3·${H}²), so dV/dt = π(${R*R}/${H*H})h²·dh/dt. dh/dt = ${q}·${H*H}/(π·${R*R}·${hh*hh}) = <b>${fmt(ans,4)} ft/min</b>.`};}});
  PROBS.push({id:'rr-cars',topic:'related',title:'Distance between two moving objects',gen(){const [a,b,c]=pick(TRI),va=ri(2,6),vb=ri(2,6),ans=(a*va+b*vb)/c;
    return {q:`One car is ${a} km east of an intersection, driving away at ${va} km/h. Another is ${b} km north of it, driving away at ${vb} km/h. How fast is the distance between them changing, in km/h? Give a decimal.`,ans,unit:'km/h',tol:.01,chk:ans,hint:'z² = x² + y², so z·z′ = x·x′ + y·y′. Find z first.',sol:`z = √(${a}² + ${b}²) = ${c}. z′ = (x x′ + y y′)/z = (${a}·${va} + ${b}·${vb})/${c} = <b>${fmt(ans,3)} km/h</b>.`};}});
})();
