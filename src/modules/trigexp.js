/* ---------------- Trig, exponentials & logs ---------------- */
(function trigexp(){
  const cv=$('#te-canvas');if(!cv)return;
  let th=Math.PI/4;
  const sim=sim2d(cv,{h:w=>clamp(w*.42,250,340),draw(ctx,w,h){const R=Math.min(h/2-26,w*.2),cx=R+34,cy=h/2,gx=cx+R+50,gw=w-gx-16;
    ctx.save();ctx.strokeStyle=T.grid;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx-R-14,cy+.5);ctx.lineTo(cx+R+14,cy+.5);ctx.moveTo(cx+.5,cy-R-14);ctx.lineTo(cx+.5,cy+R+14);ctx.stroke();
    ctx.strokeStyle=T.muted;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();ctx.restore();
    const px=cx+R*Math.cos(th),py=cy-R*Math.sin(th);
    ctx.strokeStyle=T.hot;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,R*.28,0,-th,true);ctx.stroke();
    arrow(ctx,cx,cy,px,py,T.ink,2);line2(ctx,px,py,px,cy,T.cx,3);line2(ctx,cx,cy,px,cy,T.cv,3);dot(ctx,px,py,6,T.ink,T.surface);
    label(ctx,'cos θ',(cx+px)/2,cy+(Math.sin(th)>=0?14:-14),T.cv,'center','middle',LABEL);label(ctx,'sin θ',px+(Math.cos(th)>=0?8:-8),(py+cy)/2,T.cx,Math.cos(th)>=0?'left':'right','middle',LABEL);
    /* sine and cosine against θ */
    const gy=cy,gh=R,X=t=>gx+t/(2*Math.PI)*gw,Y=v=>gy-v*gh;ctx.strokeStyle=T.grid;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx,gy+.5);ctx.lineTo(gx+gw,gy+.5);ctx.stroke();
    [[Math.sin,T.cx],[Math.cos,T.cv]].forEach(([f,c])=>{ctx.strokeStyle=c;ctx.lineWidth=2.4;ctx.beginPath();for(let i=0;i<=200;i++){const t=i/200*2*Math.PI;i?ctx.lineTo(X(t),Y(f(t))):ctx.moveTo(X(t),Y(f(t)));}ctx.stroke();dot(ctx,X(th),Y(f(th)),5,c,T.surface);});
    ctx.strokeStyle=T.hot;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(X(th),gy-gh-6);ctx.lineTo(X(th),gy+gh+6);ctx.stroke();ctx.setLineDash([]);
    ['π/2','π','3π/2','2π'].forEach((s,i)=>label(ctx,s,X((i+1)*Math.PI/2),gy+gh+16,T.muted,'center','middle',MONO));label(ctx,'θ (radians)',gx+gw,gy-gh-10,T.muted,'right','middle',MONO);}});
  const line2=(ctx,x1,y1,x2,y2,c,w)=>{ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();};
  bindRange('te-ang',v=>fmt(v,3)+' rad',v=>{th=v;setText('te-sin',fmt(Math.sin(v),4));setText('te-cos',fmt(Math.cos(v),4));setText('te-tan',Math.abs(Math.cos(v))<1e-3?'not defined (cos θ = 0)':fmt(Math.tan(v),4));setText('te-deg',fmt(v*180/Math.PI,1)+'°');sim.render();});
  /* exp and log */
  let bb=Math.E;
  const sim2=glab('te-canvas2',{view:()=>({xr:[-3,6],yr:[-3,6]}),draw(ctx,P){const lb=Math.log(bb);curveD(ctx,P,x=>Math.pow(bb,x),-3,6,T.cx,2.8,300);curveD(ctx,P,x=>x>0?Math.log(x)/lb:NaN,1e-6,6,T.ca,2.8,300);
    line(ctx,P,-3,-3,6,6,T.muted,1.4,[5,5]);line(ctx,P,-3,1-3*lb,6,1+6*lb,T.hot,1.8);dot(ctx,P.X(0),P.Y(1),5,T.hot,T.surface);}});
  bindRange('te-base',v=>fmt(v,2),v=>{bb=v;setText('te-slope',fmt(Math.log(v),3)+(Math.abs(v-Math.E)<.03?'  (b ≈ e: slope ≈ 1)':''));setText('te-ln',fmt(Math.log(v),3));sim2.render();});
  drawers.trigexp=()=>{sim.render();sim2.render();};
  KEYS['te-canvas']=['Slide θ. Blue is sine (height), green is cosine (width); the dot also traces both graphs.',[['cx','sin θ'],['cv','cos θ'],['hot','the angle']]];
  KEYS['te-canvas2']=['Slide the base. Blue is b^x, pink is its inverse log, the orange line is the tangent at x = 0.',[['cx','b^x'],['ca','log base b'],['hot','tangent at (0, 1)']]];
  TIPS['te-ang']=el=>`θ = ${fmt(+el.value,3)} radians = ${fmt(el.value*180/Math.PI,1)}°. The dot is (cos θ, sin θ).`;
  TIPS['te-base']=el=>`The tangent at (0, 1) has slope ln b = ${fmt(Math.log(+el.value),3)}. At b = e it is exactly 1.`;
  GLOSS['radian']='An angle measured by the arc it cuts on the unit circle: 180° = π radians.';
  GLOSS['natural log']='ln x = log base e of x: the inverse of eˣ.';
  TT.trigexp='Have students find θ where sin and cos are equal, and where each is zero, using only the circle. Then connect the slope of b^x at 0 to ln b.';
})();
(function(){
  const ex=v=>{const m={0:'0',.5:'1/2','-0.5':'−1/2',1:'1','-1':'−1'};const r=+v.toFixed(6);if(m[r]!==undefined)return m[r];if(Math.abs(Math.abs(r)-Math.SQRT2/2)<1e-6)return (r<0?'−':'')+'√2/2';if(Math.abs(Math.abs(r)-Math.sqrt(3)/2)<1e-6)return (r<0?'−':'')+'√3/2';return fmt(r,3);};
  const ANG=[['0',0],['π/6',Math.PI/6],['π/4',Math.PI/4],['π/3',Math.PI/3],['π/2',Math.PI/2],['2π/3',2*Math.PI/3],['3π/4',3*Math.PI/4],['5π/6',5*Math.PI/6],['π',Math.PI],['7π/6',7*Math.PI/6],['5π/4',5*Math.PI/4],['4π/3',4*Math.PI/3],['3π/2',3*Math.PI/2],['5π/3',5*Math.PI/3],['7π/4',7*Math.PI/4],['11π/6',11*Math.PI/6]];
  PROBS.push({id:'te-special',topic:'trigexp',title:'Special angles',gen(){const [nm,t]=pick(ANG),fn=pick(['sin','cos']),v=Math[fn](t),ans=Math.abs(v)<1e-12?0:v;
    return {q:`Find the exact value of ${fn}(${nm}). (You can type √3/2, 1/2, 0 and so on.)`,ans,unit:'',abs:.005,chk:Math[fn](t),show:ex(ans),hint:'Picture the point on the unit circle at that angle: cos is its x-coordinate, sin is its y-coordinate.',
      sol:`The point at angle ${nm} on the unit circle is (${ex(Math.cos(t))}, ${ex(Math.sin(t))}), so ${fn}(${nm}) = <b>${ex(ans)}</b>.`};}});
  PROBS.push({id:'te-solve',topic:'trigexp',title:'Solve an exponential equation',gen(){const k=pick([2,3,4,5,-2,-3,.5]),c=ri(2,20),ans=Math.log(c)/k,kt=k===.5?'0.5':nz(k);
    return {q:`Solve e<sup>${kt}x</sup> = ${c} for x. Give a decimal to three places.`,ans,unit:'',tol:.01,chk:Math.log(c)/k,hint:'Take ln of both sides: ln(e^(kx)) = kx.',sol:`ln(e<sup>${kt}x</sup>) = ${kt}x = ln ${c} ≈ ${fmt(Math.log(c),4)}, so x = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'te-logs',topic:'trigexp',title:'Simplify with inverses',gen(){const p=ri(2,9),q=ri(2,9),r=ri(2,6),ans=p+q-r;
    return {q:`Evaluate ln(e<sup>${p}</sup>) + e<sup>ln ${q}</sup> − ln(e<sup>${r}</sup>).`,ans,unit:'',abs:.01,chk:Math.log(Math.exp(p))+Math.exp(Math.log(q))-Math.log(Math.exp(r)),hint:'ln and e^ undo each other: ln(e^a) = a, e^(ln b) = b.',sol:`ln(e<sup>${p}</sup>) = ${p}, e<sup>ln ${q}</sup> = ${q}, ln(e<sup>${r}</sup>) = ${r}. So ${p} + ${q} − ${r} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'te-lawlog',topic:'trigexp',title:'Log rules',gen(){const a=ri(2,6),n=ri(2,4),ans=n*Math.log(a)+Math.log(a),m=n+1;
    return {q:`If ln ${a} ≈ ${fmt(Math.log(a),4)}, find ln(${a}<sup>${n}</sup>·${a}) to three decimal places.`,ans,unit:'',tol:.005,chk:Math.log(Math.pow(a,n)*a),hint:'Combine: a^n · a = a^(n+1), then use ln(a^m) = m ln a.',sol:`${a}<sup>${n}</sup>·${a} = ${a}<sup>${m}</sup>, so ln(${a}<sup>${m}</sup>) = ${m} ln ${a} ≈ ${m}(${fmt(Math.log(a),4)}) = <b>${fmt(ans,3)}</b>.`};}});
})();
