/* ---------------- Area between curves ---------------- */
(function area(){
  const cv=$('#ar-canvas');if(!cv)return;
  const C={a:{f:x=>x,g:x=>x*x,lo:0,hi:1,xr:[-.2,1.3],yr:[-.2,1.3],lim:'x = 0 and x = 1',nf:'y = x',ng:'y = x²'},b:{f:Math.sqrt,g:x=>x*x,lo:0,hi:1,xr:[-.2,1.3],yr:[-.2,1.3],lim:'x = 0 and x = 1',nf:'y = √x',ng:'y = x²'},
    c:{f:x=>x**3,g:x=>x,lo:-1,hi:1,xr:[-1.4,1.4],yr:[-1.4,1.4],lim:'x = −1, 0 and 1 (they cross at 0)',nf:'y = x³',ng:'y = x'},d:{f:Math.sin,g:Math.cos,lo:Math.PI/4,hi:5*Math.PI/4,xr:[0,4.2],yr:[-1.4,1.4],lim:'x = π/4 and x = 5π/4',nf:'y = sin x',ng:'y = cos x'}};
  let k='a',n=8;
  const sim=glab('ar-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k],top=x=>Math.max(A.f(x),A.g(x)),bot=x=>Math.min(A.f(x),A.g(x)),N=240;
      ctx.save();clip(ctx,P);ctx.beginPath();for(let i=0;i<=N;i++){const x=A.lo+(A.hi-A.lo)*i/N;i?ctx.lineTo(P.X(x),P.Y(top(x))):ctx.moveTo(P.X(x),P.Y(top(x)));}for(let i=N;i>=0;i--){const x=A.lo+(A.hi-A.lo)*i/N;ctx.lineTo(P.X(x),P.Y(bot(x)));}ctx.closePath();ctx.fillStyle=alpha(T.ce,.22);ctx.fill();
      if(n>0){const h=(A.hi-A.lo)/n;ctx.strokeStyle=alpha(T.ce,.95);ctx.lineWidth=n>25?.6:1.3;for(let i=0;i<n;i++){const m=A.lo+(i+.5)*h;ctx.beginPath();ctx.rect(P.X(m-h/2),P.Y(top(m)),P.X(m+h/2)-P.X(m-h/2),P.Y(bot(m))-P.Y(top(m)));ctx.stroke();}}ctx.restore();
      curveD(ctx,P,A.f,A.xr[0],A.xr[1],T.cx,2.8,300);curveD(ctx,P,A.g,A.xr[0],A.xr[1],T.ca,2.8,300);label(ctx,A.nf,P.box.x+8,P.box.y+10,T.cx,'left','middle',LABEL);label(ctx,A.ng,P.box.x+8,P.box.y+28,T.ca,'left','middle',LABEL);}});
  function upd(){const A=C[k],ex=integ(x=>Math.abs(A.f(x)-A.g(x)),A.lo,A.hi,4000);let s=NaN;if(n>0){const h=(A.hi-A.lo)/n;s=0;for(let i=0;i<n;i++){const m=A.lo+(i+.5)*h;s+=Math.abs(A.f(m)-A.g(m))*h;}}
    setText('ar-lim',A.lim);setText('ar-exact',fmt(ex,5));setText('ar-sum',n>0?fmt(s,5):'(no slices)');sim.render();}
  bindRange('ar-n',v=>String(v),v=>{n=v;upd();});segBind('ar-fn','k',v=>{k=v;upd();});upd();drawers.area=()=>sim.render();
  KEYS['ar-canvas']=['Gold strips have height top − bottom. More strips → the sum approaches the exact area.',[['cx','first curve'],['ca','second curve'],['ce','the region and its slices']]];
  TIPS['ar-n']=el=>+el.value?`${el.value} strips of width ${fmt((C[k].hi-C[k].lo)/el.value,3)}, each with height top − bottom.`:'Add strips to see the area as a sum.';
  GLOSS['top minus bottom']='The height of a vertical slice between two curves: the upper function minus the lower one.';
  TT.area='Have students decide which curve is on top before looking, and say why the sign matters when curves cross.';
})();
(function(){
  PROBS.push({id:'ar-area',topic:'area',title:'Area between a parabola and a line',gen(){let p,q;do{p=ri(-3,2);q=ri(p+1,4);}while(q-p>5);const ans=(q-p)**3/6,line=polyTxt([p+q,-p*q]);
    return {q:`Find the area of the region enclosed by y = x² and y = ${line}. Give a fraction or decimal.`,ans,unit:'',tol:.003,show:(q-p)**3%6===0?String((q-p)**3/6):(q-p)**3+'/6',chk:integ(x=>Math.abs((p+q)*x-p*q-x*x),p,q,3000),hint:'Intersections: solve x² = the line (they are x = '+p+' and x = '+q+'). On that interval the line is on top.',sol:`Intersections at x = ${nz(p)} and x = ${q}. A = ∫ (${line} − x²) dx from ${nz(p)} to ${q} = (${q} − ${nz(p)})³/6 = <b>${(q-p)**3%6===0?(q-p)**3/6:(q-p)**3+'/6'}</b>.`};}});
  PROBS.push({id:'ar-fn',topic:'area',title:'Area between two other curves',gen(){const fam=pick([0,1,2]);let q,ans,chk;
    if(fam===0){const b=pick([1,2]);q=`Find the area between y = e<sup>x</sup> and y = x on [0, ${b}]. Give a decimal to three places.`;ans=Math.exp(b)-1-b*b/2;chk=integ(x=>Math.exp(x)-x,0,b,2000);}
    else if(fam===1){q=`Find the area between y = cos x and y = sin x on [0, π/4]. Give a decimal to three places.`;ans=Math.SQRT2-1;chk=integ(x=>Math.cos(x)-Math.sin(x),0,Math.PI/4,2000);}
    else{const b=pick([1,4,9]),r=Math.sqrt(b);q=r===1?'Find the area of the region bounded by y = √x and y = x. Give a fraction or decimal.':`Find the area of the region bounded by y = √x and y = x/${r}. Give a fraction or decimal.`;ans=Math.pow(b,1.5)/6;chk=integ(x=>Math.abs(Math.sqrt(x)-x/r),0,b,3000);}
    return {q,ans,unit:'',tol:.004,chk,hint:'Find which function is on top, then integrate top − bottom between the limits.',sol:`Integrating top − bottom gives <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'ar-horiz',topic:'area',title:'Horizontal slices',gen(){const kk=ri(2,6),ans=kk**3/6;
    return {q:`Using horizontal slices, find the area between x = y² and x = ${kk}y. Give a fraction or decimal.`,ans,unit:'',tol:.003,show:kk**3%6===0?String(kk**3/6):kk**3+'/6',chk:integ(y=>kk*y-y*y,0,kk,3000),hint:'Right minus left: x = '+kk+'y is on the right between the intersection points y = 0 and y = '+kk+'.',sol:`A = ∫<sub>0</sub><sup>${kk}</sup> (${kk}y − y²) dy = ${kk}·${kk}²/2 − ${kk}³/3 = <b>${kk**3%6===0?kk**3/6:kk**3+'/6'}</b>.`};}});
  PROBS.push({id:'ar-setup',topic:'area',title:'Set up the integral',gen(){const R=[['y = √x and y = x²','∫₀¹ (√x − x²) dx',['∫₀¹ (x² − √x) dx','∫₀¹ (√x + x²) dx','∫₀¹ (√x − x²)² dx']],['y = 4 and y = x²','∫₋₂² (4 − x²) dx',['∫₋₂² (x² − 4) dx','∫₀⁴ (4 − x²) dx','∫₋₂² (4 + x²) dx']],['y = x and y = x³ in the first quadrant','∫₀¹ (x − x³) dx',['∫₀¹ (x³ − x) dx','∫₋₁¹ (x − x³) dx','∫₀¹ (x + x³) dx']],['y = eˣ, y = 1 and x = 2','∫₀² (eˣ − 1) dx',['∫₀² (1 − eˣ) dx','∫₀² eˣ dx','∫₁² (eˣ − 1) dx']]],[reg,c,w]=pick(R),m=mcq(c,w);
    return {q:`Which integral gives the area of the region bounded by ${reg}?`,choices:m.choices,ans:m.ans,hint:'Find the intersections, decide which curve is on top, then use top − bottom.',sol:`Top minus bottom between the intersection points: <b>${c}</b>.`};}});
})();
