/* ---------------- Slope fields ---------------- */
(function slope(){
  const cv=$('#sf-canvas');if(!cv)return;
  const C={a:{F:(x,y)=>x,note:'The slope depends only on x: segments in each column are parallel. Solutions are parabolas.'},b:{F:(x,y)=>y,note:'The slope depends only on y: segments in each row are parallel. Solutions are y = Ce^x.'},
    c:{F:(x,y)=>x-y,note:'Solutions settle toward the line y = x − 1 as x grows.'},d:{F:(x,y)=>y===0?NaN:-x/y,note:'Solutions are circles x² + y² = r²: the slope is perpendicular to the radius. They are not functions near y = 0.'},
    e:{F:(x,y)=>.5*y*(1-y/4),note:'Equilibria at y = 0 and y = 4. Solutions between them rise toward 4: logistic-style growth.'}};
  let k='a',x0=0,y0=1;
  const rk=(F,x,y,h)=>{const k1=F(x,y),k2=F(x+h/2,y+h/2*k1),k3=F(x+h/2,y+h/2*k2),k4=F(x+h,y+h*k3);return y+h/6*(k1+2*k2+2*k3+k4);};
  const trace=(dir)=>{const F=C[k].F,pts=[[x0,y0]];let x=x0,y=y0;for(let i=0;i<260;i++){const h=.04*dir;const yn=rk(F,x,y,h);if(!isFinite(yn)||Math.abs(yn)>30)break;x+=h;y=yn;pts.push([x,y]);if(Math.abs(x)>4.3)break;if(k==='d'&&Math.abs(y)<.02)break;}return pts;};
  const sim=glab('sf-canvas',{h:w=>clamp(w*.62,300,430),view:(w,h)=>{const sp=8*(h-36)/(w-60);return {xr:[-4,4],yr:[-sp/2,sp/2]};},
    draw(ctx,P){const F=C[k].F;ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.muted,.75);ctx.lineWidth=1.6;
      const nx=Math.round(P.box.w/34),ny=Math.round(P.box.h/34);for(let i=0;i<=nx;i++)for(let j=0;j<=ny;j++){const x=P.xr[0]+(P.xr[1]-P.xr[0])*(i+.5)/(nx+1),y=P.yr[0]+(P.yr[1]-P.yr[0])*(j+.5)/(ny+1),s=F(x,y);if(!isFinite(s))continue;const L=Math.hypot(1,s),dx=9/L,dy=9*s/L,px=P.X(x),py=P.Y(y);ctx.beginPath();ctx.moveTo(px-dx,py+dy);ctx.lineTo(px+dx,py-dy);ctx.stroke();}ctx.restore();
      [trace(1),trace(-1)].forEach(pts=>{ctx.save();clip(ctx,P);ctx.strokeStyle=T.cx;ctx.lineWidth=3;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(P.X(x),P.Y(y)):ctx.moveTo(P.X(x),P.Y(y)));ctx.stroke();ctx.restore();});
      dot(ctx,P.X(x0),P.Y(y0),7,T.hot,T.surface);},
    drag:(kind,x,y)=>{setS('sf-x0',x);setS('sf-y0',y);}});
  const setS=(id,v)=>{const el=$('#'+id);el.value=clamp(Math.round(v*10)/10,-3,3);el.dispatchEvent(new Event('input',{bubbles:true}));};
  function upd(){const F=C[k].F,s=F(x0,y0);const pts=trace(1);let y1=NaN;for(const [x,y] of pts)if(x>=x0+1-1e-9){y1=y;break;}
    setText('sf-sl',isFinite(s)?fmt(s,3):'not defined here');setText('sf-y1',isFinite(y1)?fmt(y1,3):'leaves the window');setText('sf-note',C[k].note);sim.render();}
  bindRange('sf-x0',v=>nz(v),v=>{x0=v;upd();});bindRange('sf-y0',v=>nz(v),v=>{y0=v;upd();});segBind('sf-fn','k',v=>{k=v;upd();});upd();drawers.slope=()=>sim.render();
  KEYS['sf-canvas']=['Each grey segment shows the slope there. The blue curve starts at the orange dot and follows the segments. Drag to move the dot.',[['muted','slope segments'],['cx','the solution through the start'],['hot','initial condition']]];
  TIPS['sf-x0']=()=>'The starting point picks which solution curve you follow.';
  GLOSS['slope field']='A grid of short line segments showing dy/dx at each point; solutions are tangent to them.';GLOSS['differential equation']='An equation involving a function and its derivative, such as dy/dx = x − y.';
  TT.slope='Ask students to sketch the solution through a point by hand, following the segments, before the lab draws it.';
})();
(function(){
  const CASES=[['x',(x,y)=>x],['y',(x,y)=>y],['x + y',(x,y)=>x+y],['x − y',(x,y)=>x-y],['xy',(x,y)=>x*y],['y − x',(x,y)=>y-x],['2x',(x,y)=>2*x],['−y',(x,y)=>-y]];
  PROBS.push({id:'sf-slope',topic:'slope',title:'Slope at a point',gen(){const a=ri(1,4),b=ri(-4,4)||2,p=ri(-3,3),q=ri(-3,3),ans=a*p+b*q;
    return {q:`If dy/dx = ${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}y, what is the slope of the solution curve at the point (${nz(p)}, ${nz(q)})?`,ans,unit:'',abs:.01,chk:ans,hint:'Substitute x and y into the right-hand side.',sol:`dy/dx = ${a}(${nz(p)}) ${b<0?'−':'+'} ${Math.abs(b)}(${nz(q)}) = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'sf-match',topic:'slope',title:'Match the slope field',gen(){const idx=shuffle([0,1,2,3,4,5,6,7]).slice(0,4),[ci]=shuffle(idx),[nm,F]=CASES[ci];const pieces=[];
    for(let x=-4;x<=4;x++)for(let y=-3;y<=3;y++){const s=F(x,y),L=Math.hypot(1,s),dx=.28/L*1,dy=.28*s/L;const m=s;if(!isFinite(s))continue;
      // segment of slope s through (x, y), length ~0.5 in plot units (aspect-adjusted)
      const half=.3/Math.sqrt(1+(s*.56)**2);pieces.push({f:t=>y+s*(t-x),x0:x-half,x1:x+half,color:'var(--muted)'});}
    const svg=svgG({xr:[-4.6,4.6],yr:[-3.6,3.6],pieces,alt:'A slope field.'}),opts=idx.map(i=>`dy/dx = ${CASES[i][0]}`),m=mcq(`dy/dx = ${nm}`,opts);
    return {q:'Which differential equation has this slope field?',fig:svg,choices:m.choices,ans:m.ans,hint:'Check the slope at a few points: along x = 0, along y = 0, and where the right side would be zero.',sol:`The slopes match dy/dx = ${nm}: check, for example, the point (2, 1) where it gives ${nz(F(2,1))}. The answer is <b>dy/dx = ${nm}</b>.`};}});
  PROBS.push({id:'sf-tan',topic:'slope',title:'Estimate with a tangent line',gen(){const a=ri(1,3),y0=ri(1,5),dx=pick([.1,.2,.5]),ans=y0+dx*(a*0+ -a*y0+ri(0,0));
    const slope=-a*y0;return {q:`The solution of dy/dx = −${a===1?'':a}y satisfies y(0) = ${y0}. Use the tangent line at x = 0 to estimate y(${dx}). Give a decimal.`,ans:y0+dx*slope,unit:'',abs:.005,chk:y0+dx*slope,hint:'Slope at (0, y0) is −a·y0. Then y ≈ y0 + slope·dx.',sol:`The slope at (0, ${y0}) is −${a}(${y0}) = ${nz(slope)}. So y(${dx}) ≈ ${y0} + (${nz(slope)})(${dx}) = <b>${nz(+(y0+dx*slope).toFixed(4))}</b>.`};}});
  PROBS.push({id:'sf-eq',topic:'slope',title:'Equilibrium solutions',gen(){const r=ri(1,5),R=[[`dy/dx = y − ${r}`,`y = ${r}`],[`dy/dx = ${r}y − ${r*r}`,`y = ${r}`],[`dy/dx = y(${r} − y)`,`y = 0 and y = ${r}`],[`dy/dx = (y − ${r})(y + ${r})`,`y = ${r} and y = −${r}`]],[de,ans]=pick(R),m=mcq(ans,[`y = ${r}`,`y = 0`,`y = 0 and y = ${r}`,`y = ${r} and y = −${r}`,`y = −${r}`]);
    return {q:`Which horizontal line(s) are solutions of ${de}?`,choices:m.choices,ans:m.ans,hint:'Equilibrium solutions are the constants y = c where dy/dx = 0.',sol:`Set the right side to 0: <b>${ans}</b>.`};}});
})();
