/* ---------------- Optimization ---------------- */
(function optim(){
  const cv=$('#op-canvas');if(!cv)return;
  const V0=355;
  const C={fence:{f:x=>x*(100-2*x),lo:1,hi:49,def:20,xr:[0,50],yr:[-100,1400],max:true,form:'A = x(100 − 2x)   (x = sides ⟂ river; the side along the river is 100 − 2x)',dim:x=>`sides ${fmt(x,2)} ft, ${fmt(100-2*x,2)} ft, ${fmt(x,2)} ft`,u:'ft²',xl:'x (ft)'},
    box:{f:x=>x*(12-2*x)**2,lo:.2,hi:5.8,def:1,xr:[0,6],yr:[-20,150],max:true,form:'V = x(12 − 2x)²   (cut an x × x square from each corner of a 12 × 12 sheet)',dim:x=>`height ${fmt(x,2)}, base ${fmt(12-2*x,2)} × ${fmt(12-2*x,2)}`,u:'cm³',xl:'x (cm)'},
    can:{f:r=>2*Math.PI*r*r+2*V0/r,lo:1,hi:8,def:2,xr:[0,9],yr:[0,600],max:false,form:'S = 2πr² + 2V/r   (can of fixed volume V = 355 cm³: least metal)',dim:r=>`radius ${fmt(r,2)}, height ${fmt(V0/(Math.PI*r*r),2)}`,u:'cm²',xl:'r (cm)'}};
  let k='fence',x=3;
  const best=()=>{const A=C[k];return A.max?argmax(A.f,A.lo,A.hi):argmin(A.f,A.lo,A.hi);};
  const sim=glab('op-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr,xlabel:C[k].xl}),draw(ctx,P){const A=C[k],b=best();curveD(ctx,P,A.f,Math.max(A.xr[0],.01),A.xr[1],T.cx,2.8,300);const m=D(A.f,x),y=A.f(x);line(ctx,P,x-1.5,y-1.5*m,x+1.5,y+1.5*m,T.hot,2);dot(ctx,P.X(x),P.Y(y),6.5,T.hot,T.surface);dot(ctx,P.X(b),P.Y(A.f(b)),6,T.ce,T.ink);vline(ctx,P,b,T.muted,[3,4]);}});
  function upd(){const A=C[k],b=best(),y=A.f(x);setText('op-form',A.form);setText('op-val',`${fmt(y,3)} ${A.u}  (slope ${fmt(D(A.f,x),2)})`);setText('op-best',`x = ${fmt(b,3)}, ${A.max?'max':'min'} = ${fmt(A.f(b),3)} ${A.u}`);setText('op-dim',A.dim(x));sim.render();}
  function setR(){const A=C[k],el=$('#op-x');el.min=A.lo;el.max=A.hi;el.value=A.def;x=A.def;}
  bindRange('op-x',v=>nz(v),v=>{x=v;upd();});segBind('op-fn','k',v=>{k=v;setR();upd();});setR();upd();drawers.optim=()=>sim.render();
  KEYS['op-canvas']=['Slide x. The gold dot is the best value; the orange tangent is flat there.',[['cx','the quantity to optimize'],['hot','tangent at your x'],['ce','the optimum']]];
  TIPS['op-x']=el=>{const A=C[k],m=D(A.f,+el.value);return `Slope ${fmt(m,2)}: ${Math.abs(m)<.5?'nearly flat, close to the optimum.':m>0?'still rising: moving right '+(A.max?'helps':'hurts')+'.':'falling: moving left '+(A.max?'helps':'hurts')+'.'}`;};
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
