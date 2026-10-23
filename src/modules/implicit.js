/* ---------------- Implicit differentiation ---------------- */
(function implicit(){
  const cv=$('#im-canvas');if(!cv)return;
  const C={circ:{br:(x,s)=>s*Math.sqrt(9-x*x),sl:(x,y)=>-x/y,dom:[-2.9,2.9],form:'2x + 2y·y′ = 0  ⇒  y′ = −x/y',two:true,seg:[[-3,3]]},
    ell:{br:(x,s)=>s*Math.sqrt((4-x*x)/4),sl:(x,y)=>-x/(4*y),dom:[-1.9,1.9],form:'2x + 8y·y′ = 0  ⇒  y′ = −x/(4y)',two:true,seg:[[-2,2]]},
    hyp:{br:(x)=>4/x,sl:(x,y)=>-y/x,dom:[-3,3],form:'y + x·y′ = 0  ⇒  y′ = −y/x',two:false,seg:[[-6,-.5],[.5,6]]},
    cub:{br:(x,s)=>s*Math.sqrt(x*x*x-x+1),sl:(x,y)=>(3*x*x-1)/(2*y),dom:[-1.25,3],form:'2y·y′ = 3x² − 1  ⇒  y′ = (3x² − 1)/(2y)',two:true,seg:[[-1.3247,3.6]]}};
  let k='circ',x0=1.5,low=false;
  const s=()=>low?-1:1;
  const sim=glab('im-canvas',{h:w=>clamp(w*.62,280,400),view:(w,h)=>{const sp=8*(h-36)/(w-60);return {xr:[-4,4],yr:[-sp/2,sp/2]};},draw(ctx,P){const A=C[k];
      A.seg.forEach(([a,b])=>{const e=1e-6;[1,-1].forEach(sg=>{if(!A.two&&sg<0)return;const fn=x=>A.br(x,sg);curveD(ctx,P,fn,Math.max(a,k==='hyp'?a:a)+e,b-e,T.cx,2.8,400);});});
      const y=A.br(x0,s()),m=A.sl(x0,y);if(isFinite(y)){line(ctx,P,x0-1.4,y-1.4*m,x0+1.4,y+1.4*m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(y),6.5,T.hot,T.surface);}}});
  function setDom(){const A=C[k],el=$('#im-x');el.min=A.dom[0];el.max=A.dom[1];if(+el.value<A.dom[0]||+el.value>A.dom[1])el.value=k==='circ'?1.5:k==='ell'?1:k==='hyp'?2:1.5;x0=+el.value;if(k==='hyp'&&Math.abs(x0)<.3){el.value=.3;x0=.3;}}
  function upd(){const A=C[k];if(k==='hyp'&&Math.abs(x0)<.3)x0=.3*(x0<0?-1:1);const y=A.br(x0,s());setText('im-form',A.form);setText('im-pt',`(${fmt(x0,2)}, ${fmt(y,2)})`);setText('im-sl',fmt(A.sl(x0,y),4));setText('im-num',fmt(D(x=>A.br(x,s()),x0),4));sim.render();}
  bindRange('im-x',v=>nz(v),v=>{x0=v;upd();});segBind('im-fn','k',v=>{k=v;setDom();upd();});$('#im-low').addEventListener('change',e=>{low=e.target.checked;upd();});upd();drawers.implicit=()=>sim.render();
  KEYS['im-canvas']=['Slide x; the orange tangent uses the slope formula from implicit differentiation.',[['cx','the curve'],['hot','tangent line and point']]];
  TIPS['im-x']=el=>`x = ${nz(+el.value)}. The slope formula needs y too, so it differs between the upper and lower branch.`;
  GLOSS['implicit differentiation']='Differentiate both sides of an equation in x and y, treating y as a function of x, then solve for dy/dx.';
  TT.implicit='Stress that every y-term picks up a dy/dx. Have students predict the sign of the slope on each quarter of the circle before sliding.';
})();
(function(){
  PROBS.push({id:'im-conic',topic:'implicit',title:'Slope on a conic',gen(){const a=ri(1,4),b=ri(1,4),p=pick([-3,-2,-1,1,2,3]),q=pick([-3,-2,-1,1,2,3]),c=a*p*p+b*q*q,ans=-a*p/(b*q),g=gcd(a*p,b*q),nm=nz(-a*p/g*Math.sign(b*q)),dn=Math.abs(b*q/g);
    return {q:`Find dy/dx at the point (${nz(p)}, ${nz(q)}) on the curve ${a===1?'':a}x² + ${b===1?'':b}y² = ${c}. Give a fraction or decimal.`,ans,unit:'',tol:.01,show:dn===1?nm:nm+'/'+dn,chk:-a*p/(b*q),hint:'Differentiate both sides: 2a·x + 2b·y·y′ = 0, then solve for y′.',sol:`${2*a}x + ${2*b}y·y′ = 0 ⇒ y′ = −${a}x/(${b}y). At (${nz(p)}, ${nz(q)}): −${a}(${nz(p)})/(${b}(${nz(q)})) = <b>${dn===1?nm:nm+'/'+dn}</b>.`};}});
  PROBS.push({id:'im-xy',topic:'implicit',title:'Implicit differentiation with a product',gen(){const p=ri(1,3),q=ri(-3,3)||1,c=p*p+p*q+q*q,ans=-(2*p+q)/(p+2*q);if(p+2*q===0)return PROBS.find(z=>z.id==='im-xy').gen();
    return {q:`Find dy/dx at (${p}, ${nz(q)}) on the curve x² + xy + y² = ${c}. Give a fraction or decimal.`,ans,unit:'',tol:.01,chk:-(2*p+q)/(p+2*q),hint:'d/dx[xy] = y + x·y′. Collect the y′ terms: y′(x + 2y) = −(2x + y).',sol:`2x + y + x·y′ + 2y·y′ = 0 ⇒ y′ = −(2x + y)/(x + 2y). At (${p}, ${nz(q)}): −${nz(2*p+q)}/${nz(p+2*q)} = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'im-form',topic:'implicit',title:'Choose the derivative formula',gen(){const R=[['x² + y² = r²','−x/y',['x/y','−y/x','y/x']],['xy = k','−y/x',['−x/y','y/x','x/y']],['x² − y² = k','x/y',['−x/y','y/x','−y/x']],['y² = kx','k/(2y)',['k/y','2y/k','−k/(2y)']],['x³ + y³ = k','−x²/y²',['x²/y²','−y²/x²','−x/y']]],[eq,c,w]=pick(R),m=mcq(c,w);
    return {q:`Which expression is dy/dx for ${eq}?`,choices:m.choices,ans:m.ans,hint:'Differentiate both sides with respect to x. Every y-term gets a factor of dy/dx.',sol:`Differentiating ${eq} implicitly and solving for y′ gives <b>${c}</b>.`};}});
})();
