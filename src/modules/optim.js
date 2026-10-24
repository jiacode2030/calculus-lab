/* ---------------- Optimization ---------------- */
(function optim(){
  const cv=$('#op-canvas');if(!cv)return;
  /* each problem depends on one fixed amount p (op-c): fencing length, sheet width or can volume */
  const C={fence:{c:[40,200,10,100],cl:'Fencing available (ft)',f:p=>x=>x*(p-2*x),rng:p=>[p/200,p/2-p/200,p/200,p/5],best:p=>p/4,yr:p=>[-p*p/80,p*p/8*1.15],max:true,form:p=>`A = x(${p} − 2x)   (x = the two sides ⟂ the river; the side along the river is ${p} − 2x)`,dim:(p,x)=>`sides ${fmt(x,2)} ft, ${fmt(p-2*x,2)} ft, ${fmt(x,2)} ft`,u:'ft²',xl:'x (ft)'},
    box:{c:[6,30,1,12],cl:'Sheet width a (cm)',f:p=>x=>x*(p-2*x)**2,rng:p=>[p/600,p/2-p/600,p/600,p/12],best:p=>p/6,yr:p=>[-2*p**3/27*.12,2*p**3/27*1.15],max:true,form:p=>`V = x(${p} − 2x)²   (cut an x × x square from each corner of a ${p} × ${p} sheet)`,dim:(p,x)=>`height ${fmt(x,2)}, base ${fmt(p-2*x,2)} × ${fmt(p-2*x,2)}`,u:'cm³',xl:'x (cm)'},
    can:{c:[100,1000,5,355],cl:'Volume V (cm³)',f:p=>r=>2*Math.PI*r*r+2*p/r,rng:p=>{const b=Math.cbrt(p/(2*Math.PI));return [Math.round(b*25)/100,Math.round(b*240)/100,.01,Math.round(b*60)/100];},best:p=>Math.cbrt(p/(2*Math.PI)),yr:p=>{const b=Math.cbrt(p/(2*Math.PI));return [0,18*Math.PI*b*b];},max:false,form:p=>`S = 2πr² + 2V/r   (closed can holding V = ${p} cm³: least metal)`,dim:(p,r)=>`radius ${fmt(r,2)}, height ${fmt(p/(Math.PI*r*r),2)} cm`,u:'cm²',xl:'r (cm)'}};
  let k='fence',x=20,p=100;
  const F=()=>C[k].f(p);
  const sim=glab('op-canvas',{view:()=>{const A=C[k],[lo,hi]=A.rng(p);return {xr:[0,hi*1.04],yr:A.yr(p),xlabel:A.xl};},draw(ctx,P){const A=C[k],f=F(),b=A.best(p),[lo,hi]=A.rng(p);curveD(ctx,P,f,Math.max(lo*.5,.001),hi,T.cx,2.8,300);const m=D(f,x),y=f(x),dx=hi*.08;line(ctx,P,x-dx,y-dx*m,x+dx,y+dx*m,T.hot,2.2);dot(ctx,P.X(x),P.Y(y),6.5,T.cx,T.surface);dot(ctx,P.X(b),P.Y(f(b)),6,T.ce,T.ink);vline(ctx,P,b,T.muted,[3,4]);}});
  /* the real object, drawn to scale for the current x */
  const scene=sim2d($('#op-scene'),{h:w=>clamp(w*.36,190,260),draw(ctx,w,h){const pad=18;
    if(k==='fence'){const y=p-2*x,s=Math.min((w-2*pad)/(p/2),(h-56)/(p/4)),W=y*s,H=x*s,x0=w/2-W/2,y0=34;
      ctx.fillStyle=alpha(T.cx,.18);ctx.fillRect(0,4,w,24);label(ctx,'river (no fence needed)',w/2,16,T.cx,'center','middle',MONO);
      ctx.fillStyle=alpha(T.ce,.3);ctx.fillRect(x0,y0,W,H);ctx.strokeStyle=T.ink;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0,y0+H);ctx.lineTo(x0+W,y0+H);ctx.lineTo(x0+W,y0);ctx.stroke();
      label(ctx,fmt(x,1),x0-6,y0+H/2,T.cx,'right','middle',MONO);label(ctx,fmt(x,1),x0+W+6,y0+H/2,T.cx,'left','middle',MONO);label(ctx,fmt(y,1)+' ft',x0+W/2,y0+H+12,T.cx,'center','middle',MONO);if(H>18&&W>60)label(ctx,fmt(x*y,0)+' ft²',x0+W/2,y0+H/2,T.ink,'center','middle',MONO);}
    else if(k==='box'){const a=p,b=a-2*x,s=Math.min((w/2-2*pad)/a,(h-40)/a),x0=pad,y0=(h-a*s)/2,c=x*s;
      ctx.fillStyle=alpha(T.ce,.18);ctx.fillRect(x0,y0,a*s,a*s);ctx.fillStyle=T.surface;[[0,0],[a-x,0],[0,a-x],[a-x,a-x]].forEach(([i,j])=>{ctx.fillRect(x0+i*s,y0+j*s,c,c);});
      ctx.strokeStyle=T.ink;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x0+c,y0);ctx.lineTo(x0+a*s-c,y0);ctx.lineTo(x0+a*s-c,y0+c);ctx.lineTo(x0+a*s,y0+c);ctx.lineTo(x0+a*s,y0+a*s-c);ctx.lineTo(x0+a*s-c,y0+a*s-c);ctx.lineTo(x0+a*s-c,y0+a*s);ctx.lineTo(x0+c,y0+a*s);ctx.lineTo(x0+c,y0+a*s-c);ctx.lineTo(x0,y0+a*s-c);ctx.lineTo(x0,y0+c);ctx.lineTo(x0+c,y0+c);ctx.closePath();ctx.stroke();
      ctx.save();ctx.setLineDash([4,4]);ctx.strokeStyle=T.muted;ctx.strokeRect(x0+c,y0+c,b*s,b*s);ctx.restore();label(ctx,'cut x = '+fmt(x,2),x0+c/2,y0-8,T.cx,'left','middle',MONO);
      /* folded box in an oblique view */
      const bx=w*.62,by=h-24,u=b*s*1.3,d=u*.45,hh=x*s*1.3;ctx.lineWidth=2;ctx.strokeStyle=T.ink;
      const P0=[bx,by],P1=[bx+u,by],P2=[bx+u+d,by-d*.6],P3=[bx+d,by-d*.6],up=q=>[q[0],q[1]-hh];
      ctx.fillStyle=alpha(T.ce,.28);[[P0,P1,up(P1),up(P0)],[P1,P2,up(P2),up(P1)]].forEach(f=>{ctx.beginPath();f.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.closePath();ctx.fill();ctx.stroke();});
      ctx.save();ctx.setLineDash([4,4]);ctx.strokeStyle=T.muted;ctx.beginPath();ctx.moveTo(...up(P0));ctx.lineTo(...up(P3));ctx.lineTo(...up(P2));ctx.moveTo(...P3);ctx.lineTo(...up(P3));ctx.stroke();ctx.restore();
      label(ctx,`${fmt(b,2)} × ${fmt(b,2)} × ${fmt(x,2)}`,bx+u/2,by+12,T.cx,'center','middle',MONO);label(ctx,'V = '+fmt(x*b*b,1)+' cm³',bx+u/2,Math.max(12,by-d*.6-hh-12),T.ink,'center','middle',MONO);}
    else{const r=x,hgt=p/(Math.PI*r*r),rb=C.can.best(p),rmax=C.can.rng(p)[1],s=Math.min((h-50)/(4.5*rb),(w-2*pad)/(2*rmax+2)),R=r*s,H=hgt*s,cx=w/2,base=h-14,ry=R*.28,top=Math.max(ry+4,base-H);
      const cut=base-H<ry+4;ctx.fillStyle=alpha(T.ce,.22);ctx.fillRect(cx-R,top,2*R,base-top);ctx.beginPath();ctx.ellipse(cx,base,R,ry,0,0,Math.PI);ctx.fill();
      ctx.strokeStyle=T.ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-R,top);ctx.lineTo(cx-R,base);ctx.ellipse(cx,base,R,ry,0,Math.PI,0,true);ctx.lineTo(cx+R,top);ctx.stroke();
      ctx.fillStyle=alpha(T.ce,.4);ctx.beginPath();ctx.ellipse(cx,top,R,ry,0,0,6.283);ctx.fill();ctx.stroke();
      ctx.strokeStyle=T.cx;ctx.beginPath();ctx.moveTo(cx,top);ctx.lineTo(cx+R,top);ctx.stroke();label(ctx,'r = '+fmt(r,2),cx+R/2,top-ry-8,T.cx,'center','middle',MONO);
      if(cut)label(ctx,'(too tall to show)',cx,top+ry+14,T.muted,'center','middle',MONO);label(ctx,'h = '+fmt(hgt,2),cx+R+8,(top+base)/2,T.cx,'left','middle',MONO);label(ctx,hgt>2*r*1.03?'taller than wide':hgt<2*r*.97?'wider than tall':'height ≈ diameter',cx-R-8,(top+base)/2,T.muted,'right','middle',MONO);}}});
  function upd(){const A=C[k],f=F(),b=A.best(p),y=f(x);setText('op-form',A.form(p));const m0=D(f,x);setText('op-val',`${fmt(y,3)} ${A.u}  (slope ${fmt(Math.abs(m0)<1e-6?0:m0,2)})`);setText('op-best',`x = ${fmt(b,3)}, ${A.max?'max':'min'} = ${fmt(f(b),3)} ${A.u}`);setText('op-dim',A.dim(p,x));sim.render();scene.render();}
  const lbl=(id,t)=>{const s=$(`label[for=${id}] span`);if(s)s.textContent=t;};
  function setX(keep){const A=C[k],el=$('#op-x'),[lo,hi,st,d]=A.rng(p);el.min=lo;el.max=hi;el.step=st;if(!keep)el.value=d;x=clamp(+el.value,lo,hi);el.value=x;$('#op-x-out').textContent=nz(x);lbl('op-x',k==='can'?'r':'x');}
  function setC(){const A=C[k],el=$('#op-c'),[a,b,st,d]=A.c;el.min=a;el.max=b;el.step=st;el.value=d;p=d;$('#op-c-out').textContent=nz(p);lbl('op-c',A.cl);}
  bindRange('op-x',v=>nz(v),v=>{x=v;upd();});bindRange('op-c',v=>nz(v),v=>{p=v;setX(true);upd();});segBind('op-fn','k',v=>{k=v;setC();setX();upd();});setC();setX();upd();drawers.optim=()=>{sim.render();scene.render();};
  KEYS['op-canvas']=['Slide x. The gold dot is the best value; the orange tangent is flat there.',[['cx','the quantity to optimize'],['hot','tangent at your x'],['ce','the optimum']]];
  KEYS['op-scene']=['The object for your x, drawn to scale. Change the fixed amount to see the best shape scale up or down.',[['ce','the area, box or metal being optimized'],['cx','the dimensions']]];
  TIPS['op-x']=el=>{const A=C[k],m0=D(F(),+el.value),m=Math.abs(m0)<1e-6?0:m0;return `Slope ${fmt(m,2)}: ${Math.abs(m)<.5?'nearly flat, close to the optimum.':m>0?'still rising: moving right '+(A.max?'helps':'hurts')+'.':'falling: moving left '+(A.max?'helps':'hurts')+'.'}`;};
  TIPS['op-c']=el=>`Fixed amount ${nz(+el.value)}. The best x moves with it: P/4 for the fence, a/6 for the box, (V/2π)^(1/3) for the can.`;
  GLOSS['objective function']='The quantity you want to maximize or minimize.';GLOSS['constraint']='A condition linking the variables (a fixed perimeter or volume).';
  TT.optim='Have students write the constraint and objective before touching the graph, and justify the answer with a derivative test.';
})();
(function(){
  PROBS.push({id:'op-fence',topic:'optim',title:'Fence a rectangle',gen(){const P=pick([60,80,100,120,200,240]),barn=Math.random()<.5,f=barn?x=>x*(P-2*x):x=>x*(P/2-x),ans=barn?P*P/8:P*P/16,hi=barn?P/2:P/2;
    return {q:`${P} feet of fencing is used to enclose a rectangular pen${barn?' against a long straight wall (no fence on the wall side)':''}. What is the maximum possible area, in square feet?`,ans,unit:'ft²',abs:.01,chk:f(argmax(f,0,hi)),hint:barn?'Let x be the two sides perpendicular to the wall: A = x(P − 2x).':'Perimeter 2x + 2y = P, so y = P/2 − x. Maximize A = x(P/2 − x).',sol:barn?`A(x) = x(${P} − 2x), A′ = ${P} − 4x = 0 ⇒ x = ${P/4}, A = ${P/4}·${P/2} = <b>${ans}</b>.`:`A(x) = x(${P/2} − x), A′ = ${P/2} − 2x = 0 ⇒ x = ${P/4}, a square; A = <b>${ans}</b>.`};}});
  PROBS.push({id:'op-box',topic:'optim',title:'Open box',gen(){const a=pick([12,18,24,30]),askX=Math.random()<.5,x=a/6,V=x*(a-2*x)**2,f=t=>t*(a-2*t)**2,ans=askX?x:V;
    return {q:`An open box is made from a ${a} cm by ${a} cm square sheet by cutting equal squares from the corners and folding up the sides. ${askX?'What side length of the cut-out squares maximizes the volume?':'What is the maximum volume, in cm³?'}`,ans,unit:askX?'cm':'cm³',abs:.01,chk:askX?argmax(f,0,a/2):f(argmax(f,0,a/2)),hint:`V(x) = x(${a} − 2x)². Differentiate with the product rule and chain rule.`,sol:`V′(x) = (${a} − 2x)² − 4x(${a} − 2x) = (${a} − 2x)(${a} − 6x) = 0 ⇒ x = ${a/6} (x = ${a/2} gives no box). V(${a/6}) = <b>${V}</b> cm³; the best cut is <b>${a/6}</b> cm.`};}});
  PROBS.push({id:'op-can',topic:'optim',title:'A can with least metal',gen(){const V=pick([250,355,500,1000]),r=Math.cbrt(V/(2*Math.PI)),ans=r,S=x=>2*Math.PI*x*x+2*V/x;
    return {q:`A closed cylindrical can must hold ${V} cm³. What radius minimizes the amount of metal (surface area)? Give a decimal to two places, in cm.`,ans,unit:'cm',tol:.005,chk:argmin(S,.5,15),hint:'h = V/(πr²), so S(r) = 2πr² + 2V/r. Set S′(r) = 0.',sol:`S′(r) = 4πr − 2V/r² = 0 ⇒ r³ = V/(2π) ⇒ r = (${V}/(2π))<sup>1/3</sup> = <b>${fmt(r,2)} cm</b> (and h = 2r).`};}});
  PROBS.push({id:'op-dist',topic:'optim',title:'Closest point',gen(){const a=ri(1,6),ans=a-.5,d2=x=>(x-a)**2+x;
    return {q:`Find the x-coordinate of the point on the curve y = √x that is closest to the point (${a}, 0). Give a decimal.`,ans,unit:'',abs:.01,chk:argmin(d2,0,a+3),hint:'Minimize the squared distance d² = (x − a)² + x.',sol:`d² = (x − ${a})² + x. Setting its derivative 2(x − ${a}) + 1 = 0 gives x = <b>${fmt(ans,1)}</b>.`};}});
  PROBS.push({id:'op-sum',topic:'optim',title:'Two numbers',gen(){const S=ri(5,30),prodMax=Math.random()<.5,ans=prodMax?S*S/4:S*S/2;
    return {q:`Two positive numbers add to ${S}. ${prodMax?'What is the largest possible value of their product?':'What is the smallest possible value of the sum of their squares?'}`,ans,unit:'',tol:.005,chk:prodMax?(S/2)*(S/2):2*(S/2)**2,hint:'Write y = S − x and the quantity in terms of x alone, then find where its derivative is 0.',sol:`${prodMax?`P = x(${S} − x), P′ = ${S} − 2x = 0 ⇒ x = ${S/2}, P = <b>${ans}</b>.`:`Q = x² + (${S} − x)², Q′ = 4x − ${2*S} = 0 ⇒ x = ${S/2}, Q = <b>${ans}</b>.`}`};}});
})();
