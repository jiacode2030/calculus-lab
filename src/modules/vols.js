/* ---------------- Volumes from cross sections ---------------- */
(function vols(){
  const cv=$('#vo-canvas');if(!cv)return;
  const FAC={sq:{f:1,n:'squares'},se:{f:Math.PI/8,n:'semicircles'},tr:{f:Math.sqrt(3)/4,n:'equilateral triangles'}};
  let sh='sq',x0=.5;
  const s=x=>x-x*x,A=x=>FAC[sh].f*s(x)**2;
  const sim=sim2d(cv,{h:w=>clamp(w*.42,260,340),draw(ctx,w,h){const half=Math.floor(w/2);
      const P1=gpanel(ctx,{x:40,y:14,w:half-52,h:h-44},[0,1.05],[-.05,1.05],{xn:4,yn:4});ctx.save();clip(ctx,P1);ctx.beginPath();for(let i=0;i<=100;i++){const x=i/100;i?ctx.lineTo(P1.X(x),P1.Y(x)):ctx.moveTo(P1.X(x),P1.Y(x));}for(let i=100;i>=0;i--){const x=i/100;ctx.lineTo(P1.X(x),P1.Y(x*x));}ctx.closePath();ctx.fillStyle=alpha(T.ce,.2);ctx.fill();ctx.restore();
      curveD(ctx,P1,x=>x,0,1,T.cx,2.6,100);curveD(ctx,P1,x=>x*x,0,1,T.ca,2.6,100);line(ctx,P1,x0,x0*x0,x0,x0,T.hot,4);label(ctx,'base region, s(x) = x − x²',P1.box.x+6,P1.box.y+10,T.muted,'left','middle',MONO);
      const mx=0.3;const P2=gpanel(ctx,{x:half+44,y:14,w:w-half-58,h:h-44},[0,1],[0,A(.5)*1.35+1e-9],{xn:4,yn:3});areaSigned(ctx,P2,A,0,1,T.ce,T.ca,200,.3);curveD(ctx,P2,A,0,1,T.ce,2.8,200);vline(ctx,P2,x0,T.hot,[4,4]);dot(ctx,P2.X(x0),P2.Y(A(x0)),6,T.ce,T.surface);label(ctx,'A(x): area of the slice at x',P2.box.x+6,P2.box.y+10,T.ce,'left','middle',MONO);
      /* the slice itself */
      const side=s(x0)*250,bx=P2.box.x+P2.box.w-side-22,by=P2.box.y+P2.box.h*.5;ctx.fillStyle=alpha(T.ce,.35);ctx.strokeStyle=T.ce;ctx.lineWidth=2;ctx.beginPath();
      if(sh==='sq')ctx.rect(bx,by-side,side,side);else if(sh==='se'){ctx.arc(bx+side/2,by,side/2,Math.PI,0);ctx.closePath();}else{ctx.moveTo(bx,by);ctx.lineTo(bx+side,by);ctx.lineTo(bx+side/2,by-side*Math.sqrt(3)/2);ctx.closePath();}ctx.fill();ctx.stroke();label(ctx,'slice, base s = '+fmt(s(x0),3),P2.box.x+P2.box.w-4,by+14,T.muted,'right','middle',MONO);}});
  function upd(){setText('vo-s',fmt(s(x0),4));setText('vo-A',fmt(A(x0),5));setText('vo-V',fmt(integ(A,0,1,800),5));sim.render();}
  bindRange('vo-x',v=>nz(v),v=>{x0=v;upd();});segBind('vo-sh','k',v=>{sh=v;upd();});upd();drawers.vols=()=>sim.render();
  KEYS['vo-canvas']=['Left: the base region; the orange segment is the base of the slice at x. Right: the slice area at each x; the shaded area under it is the volume.',[['cx','y = x'],['ca','y = x²'],['hot','base length s(x)'],['ce','A(x), and the volume']]];
  TIPS['vo-x']=el=>`At x = ${nz(+el.value)} the base is s = ${fmt(s(+el.value),3)}, so the slice has area ${fmt(A(+el.value),4)}.`;
  GLOSS['cross section']='The shape you get by cutting a solid with a plane, here perpendicular to the x-axis.';
  TT.vols='Ask students to name the base length s(x) first, then the area formula for the shape, before writing any integral.';
})();
(function(){
  const SH=[['squares',1,'s²'],['semicircles',Math.PI/8,'(π/8)s²'],['equilateral triangles',Math.sqrt(3)/4,'(√3/4)s²']];
  PROBS.push({id:'vo-parab',topic:'vols',title:'Volume with known cross sections',gen(){const kk=ri(1,3),[nm,f,fs]=pick(SH),ans=f*kk**5/30;
    return {q:`The base of a solid is the region between y = x² and y = ${kk===1?'':kk}x. Cross sections perpendicular to the x-axis are ${nm}. Find the volume. Give a decimal to three places.`,ans,unit:'',tol:.004,chk:integ(x=>f*(kk*x-x*x)**2,0,kk,3000),hint:`Base length s(x) = ${cof(kk,'x')} − x² on [0, ${kk}]. Slice area A = ${fs}. Integrate A(x).`,sol:`s = ${cof(kk,'x')} − x², A = ${fs}, V = ${f===1?'':f===Math.PI/8?'(π/8)':'(√3/4)'}∫<sub>0</sub><sup>${kk}</sup> (${cof(kk,'x')} − x²)² dx = ${f===1?'':f===Math.PI/8?'(π/8)·':'(√3/4)·'}${kk===1?'1':kk+'⁵'}/30 = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'vo-sqrt',topic:'vols',title:'Cross sections on a region under a curve',gen(){const b=pick([1,4,9]),[nm,f,fs]=pick(SH),ans=f*b*b/2;
    return {q:`The base of a solid is the region bounded by y = √x, the x-axis and x = ${b}. Cross sections perpendicular to the x-axis are ${nm}. Find the volume. Give a decimal to three places.`,ans,unit:'',tol:.004,chk:integ(x=>f*x,0,b,2000),hint:`Base length s(x) = √x, so s² = x. Slice area A = ${fs}.`,sol:`A(x) = ${f===1?'':f===Math.PI/8?'(π/8)':'(√3/4)'}x, so V = ${f===1?'':f===Math.PI/8?'(π/8)':'(√3/4)'}∫<sub>0</sub><sup>${b}</sup> x dx = ${f===1?'':f===Math.PI/8?'(π/8)·':'(√3/4)·'}${b}²/2 = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'vo-formula',topic:'vols',title:'Area of a cross section',gen(){const [nm,f,fs]=pick(SH),R=SH.map(r=>r[2]),m=mcq(fs,R.concat(['πs²/4']));
    return {q:`A cross section is ${nm.replace(/s$/,'')} with base (or diameter, or side) of length s. What is its area?`.replace('equilateral triangle','an equilateral triangle').replace(/^A cross section is (square|semicircle)/,'A cross section is a $1'),choices:m.choices,ans:m.ans,hint:nm==='semicircles'?'The diameter is s, so the radius is s/2.':nm==='squares'?'Side s.':'An equilateral triangle of side s has height (√3/2)s.',sol:`The area is <b>${fs}</b>.`};}});
})();
