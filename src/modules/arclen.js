/* ---------------- Arc length ---------------- */
(function arclen(){
  const cv=$('#al-canvas');if(!cv)return;
  const C={a:{f:x=>x*x,d:x=>2*x,lo:0,hi:2,yr:[-.3,4.4]},b:{f:Math.sin,d:Math.cos,lo:0,hi:Math.PI,yr:[-.3,1.4]},c:{f:x=>2/3*Math.pow(x,1.5),d:Math.sqrt,lo:0,hi:3,yr:[-.3,3.8]}};
  let k='a',n=4;
  const sim=glab('al-canvas',{view:()=>({xr:[C[k].lo-.2,C[k].hi+.2],yr:C[k].yr}),draw(ctx,P){const A=C[k];curveD(ctx,P,A.f,A.lo,A.hi,T.cx,2.8,300);ctx.save();clip(ctx,P);ctx.strokeStyle=T.hot;ctx.lineWidth=2.4;ctx.beginPath();for(let i=0;i<=n;i++){const x=A.lo+(A.hi-A.lo)*i/n;i?ctx.lineTo(P.X(x),P.Y(A.f(x))):ctx.moveTo(P.X(x),P.Y(A.f(x)));}ctx.stroke();ctx.restore();
      for(let i=0;i<=n;i++){const x=A.lo+(A.hi-A.lo)*i/n;dot(ctx,P.X(x),P.Y(A.f(x)),n>20?2.5:5,T.hot,T.surface);}}});
  const poly=()=>{const A=C[k];let s=0;for(let i=0;i<n;i++){const x0=A.lo+(A.hi-A.lo)*i/n,x1=A.lo+(A.hi-A.lo)*(i+1)/n;s+=Math.hypot(x1-x0,A.f(x1)-A.f(x0));}return s;};
  function upd(){const A=C[k],I=integ(x=>Math.sqrt(1+A.d(x)**2),A.lo,A.hi,2000),s=poly();setText('al-poly',fmt(s,5));setText('al-int',fmt(I,5));setText('al-diff',fmt(I-s,5));sim.render();}
  bindRange('al-n',v=>String(v),v=>{n=v;upd();});segBind('al-fn','k',v=>{k=v;upd();});upd();drawers.arclen=()=>sim.render();
  KEYS['al-canvas']=['The orange polygon uses n straight segments. Its length approaches the arc length from below as n grows.',[['cx','the curve'],['hot','polygon with n segments']]];
  TIPS['al-n']=el=>`${el.value} chords: always shorter than the curve, but closer as n increases.`;
  GLOSS['arc length']='The length of a curve: ∫ √(1 + (f′(x))²) dx.';
  TT.arclen='Ask students why every polygon is shorter than the curve, and what the integral adds up.';
})();
(function(){
  PROBS.push({id:'al-length',topic:'arclen',title:'Compute an arc length',gen(){const pat=pick([0,1,2]);let q,ans,chk,work;
    if(pat===0){const b=pick([1,3,8,15]);q=`Find the arc length of y = (2/3)x<sup>3/2</sup> from x = 0 to x = ${b}. Give a decimal.`;ans=(2/3)*(Math.pow(1+b,1.5)-1);work=`f′ = x<sup>1/2</sup>, so 1 + (f′)² = 1 + x. L = ∫<sub>0</sub><sup>${b}</sup> √(1 + x) dx = (2/3)[(1 + x)<sup>3/2</sup>]<sub>0</sub><sup>${b}</sup> = (2/3)(${b===1?'2√2':Math.round(Math.pow(1+b,1.5))} − 1) =`;chk=integ(x=>Math.sqrt(1+x),0,b,3000);}
    else if(pat===1){q='Find the arc length of y = x³/6 + 1/(2x) from x = 1 to x = 2. Give a fraction or decimal.';ans=17/12;work='f′ = x²/2 − 1/(2x²), so 1 + (f′)² = (x²/2 + 1/(2x²))². L = ∫<sub>1</sub><sup>2</sup> (x²/2 + 1/(2x²)) dx = [x³/6 − 1/(2x)]<sub>1</sub><sup>2</sup> = (4/3 − 1/4) − (1/6 − 1/2) = 17/12 =';chk=integ(x=>Math.sqrt(1+(x*x/2-1/(2*x*x))**2),1,2,3000);}
    else{const b=pick([1,2,3]);q=`Find the arc length of y = (e<sup>x</sup> + e<sup>−x</sup>)/2 from x = 0 to x = ${b}. Give a decimal to three places.`;ans=Math.sinh(b);work=`f′ = (e<sup>x</sup> − e<sup>−x</sup>)/2, so 1 + (f′)² = ((e<sup>x</sup> + e<sup>−x</sup>)/2)². L = ∫<sub>0</sub><sup>${b}</sup> (e<sup>x</sup> + e<sup>−x</sup>)/2 dx = [(e<sup>x</sup> − e<sup>−x</sup>)/2]<sub>0</sub><sup>${b}</sup> = (e${b===1?'':'<sup>'+b+'</sup>'} − e<sup>−${b}</sup>)/2 =`;chk=integ(x=>Math.cosh(x),0,b,2000);}
    return {q,ans,unit:'',tol:.003,chk,hint:'Differentiate, form 1 + (f′)², and look for a perfect square.',sol:`${work} <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'al-setup',topic:'arclen',title:'Set up the arc length integral',gen(){const R=[['y = x² from x = 0 to x = 2','∫₀² √(1 + 4x²) dx',['∫₀² √(1 + x⁴) dx','∫₀² √(1 + 2x) dx','∫₀² (1 + 4x²) dx']],['y = sin x from x = 0 to x = π','∫₀^π √(1 + cos²x) dx',['∫₀^π √(1 + sin²x) dx','∫₀^π √(1 + cos x) dx','∫₀^π (1 + cos²x) dx']],['y = ln x from x = 1 to x = e','∫₁^e √(1 + 1/x²) dx',['∫₁^e √(1 + ln²x) dx','∫₁^e √(1 + 1/x) dx','∫₁^e (1 + 1/x²) dx']],['y = eˣ from x = 0 to x = 1','∫₀¹ √(1 + e²ˣ) dx',['∫₀¹ √(1 + eˣ) dx','∫₀¹ √(1 + e⁴ˣ) dx','∫₀¹ (1 + e²ˣ) dx']]],[cur,c,w]=pick(R),m=mcq(c,w);
    return {q:`Which integral gives the length of the curve ${cur}?`,choices:m.choices,ans:m.ans,hint:'L = ∫ √(1 + (f′(x))²) dx. Differentiate first, then square f′.',sol:`<b>${c}</b>.`};}});
})();
