/* ---------------- Antiderivatives ---------------- */
(function antider(){
  const cv=$('#an-canvas');if(!cv)return;
  const C={a:{f:x=>2*x,F:x=>x*x,t:'x²',yr:[-5,8]},b:{f:Math.cos,F:Math.sin,t:'sin x',yr:[-4.5,4.5]},c:{f:Math.exp,F:Math.exp,t:'eˣ',yr:[-4,10]},d:{f:x=>3*x*x-3,F:x=>x**3-3*x,t:'x³ − 3x',yr:[-7,9]}};
  let k='a',c0=1,x0=.5;
  const sim=glab('an-canvas',{view:()=>({xr:[-2.5,2.5],yr:C[k].yr}),draw(ctx,P){const A=C[k];for(let c=-3;c<=3;c++)curveD(ctx,P,x=>A.F(x)+c,-2.5,2.5,alpha(T.cx,.28),1.6,300);
      curveD(ctx,P,x=>A.F(x)+c0,-2.5,2.5,T.cx,3,300);curveD(ctx,P,A.f,-2.5,2.5,T.cv,2.2,300,[6,4]);const y=A.F(x0)+c0,m=A.f(x0);line(ctx,P,x0-.7,y-.7*m,x0+.7,y+.7*m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(y),6.5,T.cx,T.surface);}});
  function upd(){const A=C[k];setText('an-big',`${A.t} ${c0<0?'−':'+'} ${Math.abs(c0)}`);setText('an-chk',fmt(D(x=>A.F(x)+c0,x0),4));setText('an-f',fmt(A.f(x0),4));sim.render();}
  bindRange('an-c',v=>nz(v),v=>{c0=v;upd();});bindRange('an-x',v=>nz(v),v=>{x0=v;upd();});segBind('an-fn','k',v=>{k=v;upd();});upd();drawers.antider=()=>sim.render();
  KEYS['an-canvas']=['Light blue: the family F + C. Bold blue: your choice of C. Green dashed: f. The orange tangent has slope f at the point.',[['cx','F(x) + C, the antiderivatives'],['cv','f(x), the integrand'],['hot','tangent to the chosen curve']]];
  TIPS['an-c']=el=>`C = ${nz(+el.value)}: shifts the whole curve vertically; the slope at each x is unchanged.`;
  GLOSS['antiderivative']='A function F with F′ = f. If F is one, so is F + C for any constant C.';GLOSS['constant of integration']='The + C: the arbitrary vertical shift of an antiderivative.';
  TT.antider='Have students change C and say what stays the same, then pick C to pass through a given point.';
})();
(function(){
  const dfn=ts=>x=>tval(ts,x);
  PROBS.push({id:'an-expr',topic:'antider',title:'Find an antiderivative',gen(){const pat=pick([0,1,2]);let f,F,fx;
    if(pat===0){const ts=[[ri(1,4)*3,pick([3,2])],[ri(-6,6)||2,1],[ri(-5,5)||1,0]],I=tint(ts);f=terms(ts);F=terms(I.map(([c,p])=>[+c.toFixed(6),p]));fx=dfn(ts);}
    else if(pat===1){const a=ri(1,6),b=ri(1,6);f=`${a}cos(x)+${b}e^x`;F=`${a}sin(x)+${b}e^x`;fx=x=>a*Math.cos(x)+b*Math.exp(x);}
    else{const n=ri(2,5),a=ri(2,6)*n;f=`${a}x^${n-1}`;F=`${a/n}x^${n}`;fx=x=>a*Math.pow(x,n-1);}
    return {q:`Find an antiderivative of f(x) = ${pretty(f).replace(/cos\(x\)/,'cos x')}. Type your answer (the + C is optional).`,expr:F,c:true,chkf:fx,hint:'Run the derivative rules backwards, and check by differentiating your answer.',sol:`An antiderivative is F(x) = <b>${pretty(F)} + C</b>.`};}});
  PROBS.push({id:'an-init',topic:'antider',title:'Initial value problem',gen(){const a=ri(1,3),b=ri(-5,5),x1=ri(0,2),y1=ri(-6,8),x2=x1+ri(1,2),ts=[[a*3,2],[2*b,1]],I=tint(ts),C0=y1-tval(I,x1),ans=tval(I,x2)+C0;
    return {q:`F′(x) = ${pretty(terms(ts))} and F(${x1}) = ${nz(y1)}. Find F(${x2}).`,ans,unit:'',abs:.01,chk:y1+integ(x=>tval(ts,x),x1,x2,2000),hint:'Find the family F(x) = … + C, use F(x1) to get C, then evaluate.',sol:`F(x) = ${pretty(terms(I))} + C. F(${x1}) = ${nz(y1)} gives C = ${nz(+C0.toFixed(4))}. So F(${x2}) = <b>${nz(+ans.toFixed(4))}</b>.`};}});
  PROBS.push({id:'an-which',topic:'antider',title:'Pick the antiderivative',gen(){const n=ri(2,6),correct=`x<sup>${n+1}</sup>/${n+1} + C`,m=mcq(correct,[`${n}x<sup>${n-1}</sup> + C`,`x<sup>${n+1}</sup> + C`,`x<sup>${n+1}</sup>/${n} + C`,`(${n+1})x<sup>${n}</sup> + C`]);
    return {q:`Which is ∫ x<sup>${n}</sup> dx?`,choices:m.choices,ans:m.ans,hint:'Raise the power by 1, then divide by the new power.',sol:`<b>${correct}</b>. Check: its derivative is x<sup>${n}</sup>.`};}});
})();
