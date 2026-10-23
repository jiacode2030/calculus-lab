/* ---------------- Related rates ---------------- */
(function related(){
  const cv=$('#rr-canvas');if(!cv)return;
  const C={lad:{rng:[1,9.5,6],form:'x² + y² = 100   (ladder 10 ft; foot moves at dx/dt = 2 ft/s)',given:'dx/dt = 2 ft/s'},cir:{rng:[1,8,4],form:'A = πr²   (ripple radius grows at dr/dt = 3 cm/s)',given:'dr/dt = 3 cm/s'},sph:{rng:[1,8,4],form:'V = (4/3)πr³   (balloon radius grows at dr/dt = 2 cm/s)',given:'dr/dt = 2 cm/s'}};
  let k='lad',v=6;
  const sim=sim2d(cv,{h:w=>clamp(w*.5,260,360),draw(ctx,w,h){
    if(k==='lad'){const s=Math.min((h-60)/10,(w-120)/10),ox=60,oy=h-30,x=v,y=Math.sqrt(100-x*x);ctx.strokeStyle=T.muted;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(ox,oy-11*s);ctx.lineTo(ox,oy);ctx.lineTo(ox+11*s,oy);ctx.stroke();
      ctx.strokeStyle=T.cx;ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ox,oy-y*s);ctx.lineTo(ox+x*s,oy);ctx.stroke();ctx.lineCap='butt';
      label(ctx,'x = '+fmt(x,2),ox+x*s/2,oy+16,T.ca,'center','middle',MONO);label(ctx,'y = '+fmt(y,2),ox-8,oy-y*s/2,T.cv,'right','middle',MONO);label(ctx,'10 ft',ox+x*s/2+10,oy-y*s/2-8,T.cx,'left','middle',MONO);
      arrow(ctx,ox+x*s,oy-16,ox+x*s+36,oy-16,T.ca,3);arrow(ctx,ox+12,oy-y*s,ox+12,oy-y*s+Math.min(70,y>0?30*x/y:70),T.cv,3);}
    else{const R=Math.min(h/2-20,(w-80)/2),cx=w/2,cy=h/2,sc=R/8.5,r=v*sc;
      if(k==='cir'){for(let i=1;i<=3;i++){ctx.strokeStyle=alpha(T.cx,.18*i);ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r*i/3,0,6.283);ctx.stroke();}ctx.fillStyle=alpha(T.ce,.25);ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.fill();ctx.strokeStyle=T.cx;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.stroke();}
      else{const g=ctx.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);g.addColorStop(0,alpha(T.ca,.25));g.addColorStop(1,alpha(T.ca,.75));ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.fill();ctx.strokeStyle=T.ca;ctx.lineWidth=3;ctx.stroke();}
      ctx.strokeStyle=T.ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r,cy);ctx.stroke();label(ctx,'r = '+fmt(v,1),cx+r/2,cy-12,T.ink,'center','middle',MONO);arrow(ctx,cx+r,cy+18,cx+r+34,cy+18,T.hot,3);}}});
  function upd(){const g=C[k].given;let ans,eq;
    if(k==='lad'){const y=Math.sqrt(100-v*v);ans=`dy/dt = −(x/y)(2) = ${fmt(-(v/y)*2,3)} ft/s`;eq='2x·x′ + 2y·y′ = 0';}
    else if(k==='cir'){ans=`dA/dt = 2πr(3) = ${fmt(2*Math.PI*v*3,2)} cm²/s`;eq='dA/dt = 2πr·dr/dt';}
    else{ans=`dV/dt = 4πr²(2) = ${fmt(4*Math.PI*v*v*2,1)} cm³/s`;eq='dV/dt = 4πr²·dr/dt';}
    setText('rr-form',C[k].form);setText('rr-given',g);setText('rr-ans',ans);setText('rr-eq',eq);sim.render();}
  function setRng(){const el=$('#rr-v'),[a,b,d]=C[k].rng;el.min=a;el.max=b;el.value=d;v=d;}
  bindRange('rr-v',x=>nz(x),x=>{v=x;upd();});segBind('rr-fn','k',x=>{k=x;setRng();upd();});upd();drawers.related=()=>sim.render();
  KEYS['rr-canvas']=['Slide the variable. The arrows show the given rate and the rate you want; the readout does the chain rule.',[['ca','x or r (given)'],['cv','y (ladder top)'],['hot','growth rate']]];
  TIPS['rr-v']=el=>`${k==='lad'?'x':'r'} = ${nz(+el.value)}. The linked rate changes with it, even though the given rate is constant.`;
  GLOSS['related rates']='Rates of change of different quantities that are linked by an equation; differentiate the equation with respect to time.';
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
  PROBS.push({id:'rr-cars',topic:'related',title:'Distance between two moving objects',gen(){const [a,b,c]=pick(TRI),va=ri(2,6),vb=ri(2,6),ans=(a*va+b*vb)/c;
    return {q:`One car is ${a} km east of an intersection, driving away at ${va} km/h. Another is ${b} km north of it, driving away at ${vb} km/h. How fast is the distance between them changing, in km/h? Give a decimal.`,ans,unit:'km/h',tol:.01,chk:ans,hint:'z² = x² + y², so z·z′ = x·x′ + y·y′. Find z first.',sol:`z = √(${a}² + ${b}²) = ${c}. z′ = (x x′ + y y′)/z = (${a}·${va} + ${b}·${vb})/${c} = <b>${fmt(ans,3)} km/h</b>.`};}});
})();
