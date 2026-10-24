/* ---------------- Increasing, decreasing & the first derivative test ---------------- */
(function incdec(){
  const cv=$('#id-canvas');if(!cv)return;
  const C={a:{f:x=>x**3-3*x,d:x=>3*x*x-3,cr:[[-1,'local maximum'],[1,'local minimum']],yr:[-3.6,3.6],dr:[-4,10],xr:[-2.2,2.2]},
    b:{f:x=>x**3,d:x=>3*x*x,cr:[[0,'neither (no sign change)']],yr:[-8,8],dr:[-1,12],xr:[-2.2,2.2]},
    c:{f:x=>x**4-2*x*x,d:x=>4*x**3-4*x,cr:[[-1,'local minimum'],[0,'local maximum'],[1,'local minimum']],yr:[-1.5,5],dr:[-10,10],xr:[-2.1,2.1]},
    d:{f:x=>x*Math.exp(-x),d:x=>(1-x)*Math.exp(-x),cr:[[1,'local maximum']],yr:[-1.3,.6],dr:[-1.5,1.4],xr:[-2.2,3.5]},
    e:{f:x=>Math.pow(Math.abs(x),2/3),d:x=>x===0?NaN:(2/3)*Math.sign(x)*Math.pow(Math.abs(x),-1/3),cr:[[0,'local minimum (f′ DNE)']],yr:[-.2,2.2],dr:[-2.5,2.5],xr:[-2.2,2.2]}};
  let k='a',x0=.5;
  const shade=(ctx,P,A)=>signBands(ctx,P,A.xr,A.d,alpha(T.cv,.13),alpha(T.ca,.13));
  const sim=glab('id-canvas',{h:w=>clamp(w*.4,240,320),view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k];shade(ctx,P,A);curveD(ctx,P,A.f,A.xr[0],A.xr[1],T.cx,2.8,400);A.cr.forEach(([c])=>dot(ctx,P.X(c),P.Y(A.f(c)),5,T.ce,T.ink));
      const m=A.d(x0),y=A.f(x0);if(isFinite(m)&&Math.abs(m)<20)line(ctx,P,x0-.7,y-.7*m,x0+.7,y+.7*m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(y),6,T.hot,T.surface);label(ctx,'f(x)',P.box.x+8,P.box.y+10,T.cx,'left','middle',LABEL);}});
  const sim2=glab('id-canvas2',{h:w=>clamp(w*.3,170,230),view:()=>({xr:C[k].xr,yr:C[k].dr}),draw(ctx,P){const A=C[k],e=1e-7;shade(ctx,P,A);curveD(ctx,P,A.d,A.xr[0],-e,T.cv,2.8,300);curveD(ctx,P,A.d,e,A.xr[1],T.cv,2.8,300);if(k!=='e')curveD(ctx,P,A.d,-e,e,T.cv,2.8,4);
      A.cr.forEach(([c])=>dot(ctx,P.X(c),P.Y(isFinite(A.d(c))?0:0),5,T.ce,T.ink));const m=A.d(x0);if(isFinite(m)&&m>=A.dr[0]&&m<=A.dr[1])dot(ctx,P.X(x0),P.Y(m),6,T.cv,T.surface);label(ctx,'f′(x): green zone = increasing, pink zone = decreasing',P.box.x+8,P.box.y+10,T.muted,'left','middle',MONO);}});
  function upd(){const A=C[k],m=A.d(x0);setText('id-sign',!isFinite(m)?'f′ does not exist here':m>1e-6?`positive (${fmt(m,2)}): f is increasing`:m<-1e-6?`negative (${fmt(m,2)}): f is decreasing`:'zero: a flat tangent');setText('id-crit',A.cr.map(([c])=>'x = '+nz(c)).join(', '));setText('id-class',A.cr.map(([c,t])=>`x = ${nz(c)}: ${t}`).join('; '));sim.render();sim2.render();}
  bindRange('id-x',v=>nz(v),v=>{x0=v;upd();});segBind('id-fn','k',v=>{k=v;upd();});upd();drawers.incdec=()=>{sim.render();sim2.render();};
  KEYS['id-canvas']=['Green zone: f′ > 0 (f rising). Pink zone: f′ < 0 (f falling). Gold dots mark critical points.',[['cx','f(x)'],['cv','f′ > 0 (increasing)'],['ca','f′ < 0 (decreasing)'],['ce','critical points']]];
  TIPS['id-x']=el=>`x = ${nz(+el.value)}. The sign of f′ here decides rising or falling.`;
  GLOSS['local maximum']='A point where f is larger than at all nearby points: f′ changes + → −.';GLOSS['local minimum']='A point where f is smaller than at all nearby points: f′ changes − → +.';
  TT.incdec='Have students write the sign chart for each case before reading the shaded zones.';
})();
(function(){
  const cubic=(p,q)=>({B:-3*(p+q)/2,C0:3*p*q});
  const pq=()=>{let p,q;do{p=ri(-4,2);q=ri(p+1,5);}while((p+q)%2);return [p,q];};
  PROBS.push({id:'id-test',topic:'incdec',title:'First derivative test',gen(){const [p,q]=pq(),{B,C0}=cubic(p,q),f=x=>x**3+B*x*x+C0*x,askMax=Math.random()<.5,ans=askMax?p:q;
    return {q:`Let f(x) = ${polyTxt([1,B,C0,0])}. Find the x-coordinate of the local ${askMax?'maximum':'minimum'}.`,ans,unit:'',abs:.01,chk:D2(f,ans,1e-2)*(askMax?-1:1)>0&&Math.abs(D(f,ans))<1e-5?ans:NaN,hint:'f′(x) = 0 gives two critical points. Use the sign of f′ on each side (or f″).',sol:`f′(x) = 3(${lin(p)})(${lin(q)}). f′ changes + → − at x = ${nz(p)} (local max) and − → + at x = ${nz(q)} (local min). The local ${askMax?'maximum':'minimum'} is at <b>x = ${nz(ans)}</b>.`};}});
  PROBS.push({id:'id-value',topic:'incdec',title:'Value of a local maximum',gen(){const k=ri(1,4),f=x=>x**3-3*k*k*x,ans=f(-k);
    return {q:`Find the value (the y-coordinate) of the local maximum of f(x) = x³ − ${3*k*k}x.`,ans,unit:'',abs:.01,chk:Math.max(...Array.from({length:2001},(_,i)=>f(-k*1.8+k*1.6*i/2000))),hint:'f′ = 0 at x = ±k. The local max is at the smaller one (where f′ goes + → −). Then evaluate f there.',sol:`f′(x) = 3x² − ${3*k*k} = 0 ⇒ x = ±${k}. The local max is at x = −${k}: f(−${k}) = (−${k})³ − ${3*k*k}(−${k}) = ${nz(-(k**3))} + ${3*k**3} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'id-intervals',topic:'incdec',title:'Where is f increasing?',gen(){const [p,q]=pq(),c=pick(['increasing','decreasing']);const up=`(−∞, ${nz(p)}) and (${nz(q)}, ∞)`,dn=`(${nz(p)}, ${nz(q)})`,ans=c==='increasing'?up:dn;
    const m=mcq(ans,[up,dn,`(−∞, ${nz(q)})`,`(${nz(p)}, ∞)`].filter(s=>true));
    return {q:`f′(x) = (${lin(p)})(${lin(q)}). On which interval(s) is f ${c}?`,choices:m.choices,ans:m.ans,hint:'Make a sign chart for f′ using its zeros.',sol:`f′ is positive for x &lt; ${nz(p)} and x &gt; ${nz(q)}, negative between. So f is ${c} on <b>${ans}</b>.`};}});
  PROBS.push({id:'id-crit',topic:'incdec',title:'Critical points',gen(){const a=ri(1,5),R=[[`f(x) = x²${pmt(-2*a,'x')}`,`f′ = 2x − ${2*a} = 0 at x = ${a}`,String(a)],[`f(x) = x³ − ${3*a*a}x`,`f′ = 3x² − ${3*a*a} = 0 at x = ±${a}`,`${nz(-a)} and ${a}`],[`f(x) = |x − ${a}|`,`f′ does not exist at x = ${a}`,String(a)],[`f(x) = x e<sup>x</sup>`,'f′ = e<sup>x</sup>(1 + x) = 0 at x = −1','−1']],[fx,why,c]=pick(R),m=mcq(c,[String(a),`${nz(-a)} and ${a}`,'−1','0','no critical points']);
    return {q:`Find the critical point(s) of ${fx}.`,choices:m.choices,ans:m.ans,hint:'Critical points: f′ = 0 or f′ does not exist (inside the domain).',sol:`${why}. Critical point(s): <b>${c}</b>.`};}});
})();
