/* ---------------- Partial fractions & long division ---------------- */
(function partial(){
  const cv=$('#pf-canvas');if(!cv)return;
  let a=-1,b=2,p=3,q=1,x0=3.5;
  const f=x=>(p*x+q)/((x-a)*(x-b)),A=()=>(p*a+q)/(a-b),B=()=>(p*b+q)/(b-a);
  const sim=glab('pf-canvas',{view:()=>({xr:[-5,5],yr:[-8,8]}),draw(ctx,P){const xs=[-5,a,b,5].sort((u,v)=>u-v),e=1e-4;
      for(let i=0;i<3;i++){const lo=xs[i]+(i?e:0),hi=xs[i+1]-(i<2?e:0);curveD(ctx,P,f,lo,hi,T.cx,3,500);curveD(ctx,P,x=>A()/(x-a),lo,hi,alpha(T.ca,.9),2,500,[6,4]);curveD(ctx,P,x=>B()/(x-b),lo,hi,alpha(T.cv,.9),2,500,[6,4]);}
      vline(ctx,P,a,T.muted);vline(ctx,P,b,T.muted);const y=f(x0);if(isFinite(y))dot(ctx,P.X(x0),P.Y(y),6,T.cx,T.surface);}});
  function upd(){const form=`f(x) = (${polyTxt([p,q])})/((${lin(a)})(${lin(b)})) = A/(${lin(a)}) + B/(${lin(b)})   ⇒   ∫ f dx = A ln|${lin(a)}| + B ln|${lin(b)}| + C`;setText('pf-form',form);setText('pf-ca',fmt(A(),4)+'  = '+frac(A()));setText('pf-cb',fmt(B(),4)+'  = '+frac(B()));
    const y=f(x0),s=A()/(x0-a)+B()/(x0-b);setText('pf-chk',Math.abs(x0-a)<.05||Math.abs(x0-b)<.05?'x is near a root of the denominator':`${fmt(y,5)}  vs  ${fmt(s,5)}`);sim.render();}
  [['a',v=>a=v],['b',v=>b=v],['p',v=>p=v],['q',v=>q=v],['x',v=>x0=v]].forEach(([s,fn])=>bindRange('pf-'+s,v=>nz(v),v=>{fn(v);upd();}));upd();drawers.partial=()=>sim.render();
  KEYS['pf-canvas']=['Blue is the original fraction; the pink and green dashed curves are its two partial fractions. Their sum is the blue curve.',[['cx','the original f(x)'],['ca','A/(x − a)'],['cv','B/(x − b)']]];
  TIPS['pf-x']=()=>'Move the probe: the two readouts always agree, except at the roots a and b.';
  GLOSS['partial fractions']='Writing a fraction of polynomials as a sum of simpler fractions, such as A/(x − a) + B/(x − b).';GLOSS['cover-up method']='To find A, cover the factor (x − a) in the denominator and substitute x = a in what remains.';
  TT.partial='Have students find A and B by the cover-up method, then check at one value of x.';
})();
(function(){
  /* "2 ln|x − 1| − 3 ln|x|" from coefficients and inner texts */
  const lnT=(ps)=>ps.filter(([c])=>c).map(([c,s],i)=>(c<0?(i?' − ':'−'):(i?' + ':''))+(Math.abs(c)===1?'':Math.abs(c)+' ')+'ln'+s).join('')||'0';
  const rp=()=>{let a,b;do{a=ri(-4,2);b=ri(a+1,5);}while(a===b);return [a,b];};
  PROBS.push({id:'pf-AB',topic:'partial',title:'Find A or B',gen(){const [a,b]=rp(),A=ri(-5,5)||2,B=ri(-5,5)||3,p=A+B,q=-(A*b+B*a),askA=Math.random()<.5,f=x=>(p*x+q)/((x-a)*(x-b));
    return {q:`(${polyTxt([p,q])})/((${lin(a)})(${lin(b)})) = A/(${lin(a)}) + B/(${lin(b)}). Find ${askA?'A':'B'}.`,ans:askA?A:B,unit:'',abs:.01,chk:askA?limit(x=>(x-a)*f(x),a,1):limit(x=>(x-b)*f(x),b,1),hint:`Cover-up: to find ${askA?'A':'B'}, substitute x = ${nz(askA?a:b)} into everything except the factor (${lin(askA?a:b)}).`,sol:`Multiply both sides by (${lin(askA?a:b)}) and put x = ${nz(askA?a:b)}: ${askA?'A':'B'} = (${p===0?nz(q):mulv(p,askA?a:b)+pmt(q)})/(${nz(askA?a:b)} − ${parn(askA?b:a)}) = ${nz(askA?p*a+q:p*b+q)}/${parn(askA?a-b:b-a)} = <b>${nz(askA?A:B)}</b>.`};}});
  PROBS.push({id:'pf-int',topic:'partial',title:'Definite integral with partial fractions',gen(){const [a,b]=rp(),A=ri(-4,4)||1,B=ri(-4,4)||2,p=A+B,q=-(A*b+B*a),lo=Math.max(a,b)+1,hi=lo+ri(2,5),f=x=>(p*x+q)/((x-a)*(x-b)),ans=A*Math.log((hi-a)/(lo-a))+B*Math.log((hi-b)/(lo-b));
    return {q:`Evaluate ∫<sub>${nz(lo)}</sub><sup>${nz(hi)}</sup> (${polyTxt([p,q])})/((${lin(a)})(${lin(b)})) dx. Give a decimal to three places.`,ans,unit:'',tol:.004,chk:integ(f,lo,hi,3000),hint:'Split into A/(x − a) + B/(x − b), integrate to logs, and evaluate.',sol:`A = ${nz(A)}, B = ${nz(B)}, so the integral is [${lnT([[A,'|'+lin(a)+'|'],[B,'|'+lin(b)+'|']])}]<sub>${nz(lo)}</sub><sup>${nz(hi)}</sup> = ${lnT([[A,'('+frac((hi-a)/(lo-a))+')'],[B,'('+frac((hi-b)/(lo-b))+')']])} = <b>${fmt(ans,4)}</b>.`};}});
  PROBS.push({id:'pf-expr',topic:'partial',title:'Antiderivative with partial fractions',gen(){const [a,b]=rp(),A=ri(-4,4)||1,B=ri(-4,4)||2,p=A+B,q=-(A*b+B*a),f=x=>(p*x+q)/((x-a)*(x-b)),F=`(${A})*ln(abs(x-(${a})))+(${B})*ln(abs(x-(${b})))`;
    return {q:`Find ∫ (${polyTxt([p,q])})/((${lin(a)})(${lin(b)})) dx. Type your answer using ln(abs(...)) (the + C is optional).`,expr:F,c:true,chkf:f,hint:'Partial fractions: A/(x − a) + B/(x − b); each integrates to a log.',sol:`Write it as A/(${lin(a)}) + B/(${lin(b)}). Cover-up: A = ${nz(A)} (put x = ${nz(a)}), B = ${nz(B)} (put x = ${nz(b)}). Each piece integrates to a log: <b>${lnT([[A,'|'+lin(a)+'|'],[B,'|'+lin(b)+'|']])} + C</b>.`};}});
  PROBS.push({id:'pf-long',topic:'partial',title:'Long division first',gen(){const r=ri(-2,2),bb=ri(-3,5),cc=ri(-4,6),lo=r+1,hi=r+ri(2,4),R=r*r+bb*r+cc,f=x=>(x*x+bb*x+cc)/(x-r),ans=(hi*hi-lo*lo)/2+(bb+r)*(hi-lo)+R*Math.log((hi-r)/(lo-r));
    return {q:`Evaluate ∫<sub>${nz(lo)}</sub><sup>${nz(hi)}</sup> (${polyTxt([1,bb,cc])})/${r===0?'x':'('+lin(r)+')'} dx. Give a decimal to three places.`,ans,unit:'',tol:.004,chk:integ(f,lo,hi,3000),hint:`The top has higher degree: divide first. ${polyTxt([1,bb,cc])} = ${r===0?'x':'('+lin(r)+')'}(${polyTxt([1,bb+r])})${pmt(R)}.`,sol:`(${polyTxt([1,bb,cc])})/${r===0?'x':'('+lin(r)+')'} = ${polyTxt([1,bb+r])}${R?(R<0?' − ':' + ')+Math.abs(R)+'/'+(r===0?'x':'('+lin(r)+')'):''}. Integrating: [x²/2${pmt(bb+r,'x')}${R?(R<0?' − ':' + ')+(Math.abs(R)===1?'':Math.abs(R)+' ')+'ln|'+lin(r)+'|':''}]<sub>${nz(lo)}</sub><sup>${nz(hi)}</sup> = <b>${fmt(ans,4)}</b>.`};}});
})();
