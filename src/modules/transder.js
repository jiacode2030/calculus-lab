/* ---------------- Trig, e^x and ln x derivatives ---------------- */
(function transder(){
  const cv=$('#td-canvas');if(!cv)return;
  const P2=Math.PI/2;
  const F={sin:{f:Math.sin,d:Math.cos,xr:[-.3,6.6],yr:[-1.6,1.6],dr:[-1.6,1.6],form:'(sin x)′ = cos x',br:[]},cos:{f:Math.cos,d:x=>-Math.sin(x),xr:[-.3,6.6],yr:[-1.6,1.6],dr:[-1.6,1.6],form:'(cos x)′ = −sin x',br:[]},
    exp:{f:Math.exp,d:Math.exp,xr:[-1,3.2],yr:[-1,22],dr:[-1,22],form:'(eˣ)′ = eˣ',br:[]},ln:{f:Math.log,d:x=>1/x,xr:[0,6],yr:[-3,3],dr:[-1,5],form:'(ln x)′ = 1/x',br:[]},
    tan:{f:Math.tan,d:x=>1/(Math.cos(x)**2),xr:[-.2,3.3],yr:[-6,6],dr:[-1,12],form:'(tan x)′ = sec²x',br:[P2]}};
  let k='sin',x0=1,shown=false;
  const segs=(ctx,P,fn,col,w,lo,hi,br)=>{const pts=[lo,...br,hi],e=1e-5;for(let i=0;i<pts.length-1;i++)curveD(ctx,P,fn,pts[i]+(i?e:0),pts[i+1]-(i<pts.length-2?e:0),col,w,500);};
  const sim=glab('td-canvas',{view:()=>({xr:F[k].xr,yr:F[k].yr}),draw(ctx,P){const A=F[k];segs(ctx,P,A.f,T.cx,2.8,A.xr[0]+(k==='ln'?1e-4:0),A.xr[1],A.br);const y=A.f(x0),m=A.d(x0);
      if(isFinite(y)&&isFinite(m)&&Math.abs(m)<20)line(ctx,P,x0-.8,y-.8*m,x0+.8,y+.8*m,T.hot,2.2);if(isFinite(y))dot(ctx,P.X(x0),P.Y(y),6.5,T.hot,T.surface);}});
  const sim2=glab('td-canvas2',{h:w=>clamp(w*.3,170,240),view:()=>({xr:F[k].xr,yr:F[k].dr}),draw(ctx,P){const A=F[k];
      if(!shown){label(ctx,'f′ is hidden: sketch it in your head, then tick the box',P.box.x+P.box.w/2,P.box.y+P.box.h/2,T.muted,'center','middle',LABEL);return;}
      segs(ctx,P,A.d,T.cv,2.8,A.xr[0]+(k==='ln'?1e-4:0),A.xr[1],A.br);const m=A.d(x0);if(isFinite(m))dot(ctx,P.X(x0),P.Y(m),6.5,T.cv,T.surface);label(ctx,'f′(x)',P.box.x+8,P.box.y+10,T.cv,'left','middle',LABEL);}});
  function clampX(){const A=F[k],el=$('#td-x');el.min=A.xr[0]<=0?(k==='ln'?.2:0):A.xr[0];el.max=Math.min(A.xr[1]-.1,6.2);if(+el.value<+el.min)el.value=el.min;x0=+el.value;}
  function upd(){const A=F[k];setText('td-sl',fmt(D(A.f,x0),4));setText('td-fx',Math.abs(Math.cos(x0))<2e-2&&k==='tan'?'undefined (cos x = 0)':fmt(A.d(x0),4));setText('td-form',A.form);sim.render();sim2.render();}
  bindRange('td-x',v=>nz(v),v=>{x0=v;upd();});segBind('td-fn','k',v=>{k=v;clampX();upd();});$('#td-show').addEventListener('change',e=>{shown=e.target.checked;sim2.render();});
  upd();drawers.transder=()=>{sim.render();sim2.render();};
  KEYS['td-canvas']=['Slide x and watch the orange tangent. Before ticking the box, predict the shape of the slope function.',[['cx','f(x)'],['hot','tangent line'],['cv','f′(x), once shown']]];
  TIPS['td-x']=el=>`x = ${nz(+el.value)}: tangent slope ${fmt(D(F[k].f,+el.value),3)}.`;
  GLOSS['sec']='sec x = 1/cos x.';
  TT.transder='Have students sketch the slope function for sine from the tangent lines before revealing it, then repeat for cosine and ln.';
})();
(function(){
  PROBS.push({id:'td-expr',topic:'transder',title:'Differentiate a combination',gen(){const a=ri(1,6)*pick([1,-1]),b=ri(1,6)*pick([1,-1]),c=ri(1,6)*pick([1,-1]),pat=pick([0,1,2]);let f,df,fx;
    if(pat===0){f=`${a}sin(x)${b<0?'-':'+'}${Math.abs(b)}cos(x)`;df=`${a}cos(x)${b<0?'+':'-'}${Math.abs(b)}sin(x)`;fx=x=>a*Math.sin(x)+b*Math.cos(x);}
    else if(pat===1){f=`${a}e^x${b<0?'-':'+'}${Math.abs(b)}ln(x)`;df=`${a}e^x${b<0?'-':'+'}${Math.abs(b)}/x`;fx=x=>a*Math.exp(x)+b*Math.log(x);}
    else{f=`${a}tan(x)${b<0?'-':'+'}${Math.abs(b)}x^2`;df=`${a}sec(x)^2${b<0?'-':'+'}${2*Math.abs(b)}x`;fx=x=>a*Math.tan(x)+b*x*x;}
    return {q:`Find f′(x) for f(x) = ${pretty(f).replace(/sin\(x\)/g,'sin x').replace(/cos\(x\)/g,'cos x').replace(/tan\(x\)/g,'tan x').replace(/ln\(x\)/g,'ln x')}. Type your answer, like 3cos(x) − 2e^x.`,expr:df,chkf:x=>D(fx,x),hint:'Use (sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec²x, (eˣ)′ = eˣ, (ln x)′ = 1/x, term by term.',sol:`Differentiating each term: f′(x) = <b>${pretty(df).replace(/sec\(x\)²/,'sec²x')}</b>.`};}});
  PROBS.push({id:'td-eval',topic:'transder',title:'Evaluate a derivative',gen(){const a=ri(2,6),b=ri(1,5),x0=pick([0,Math.PI/2,Math.PI,Math.PI/3,Math.PI/4]),nm={0:'0',[Math.PI/2]:'π/2',[Math.PI]:'π',[Math.PI/3]:'π/3',[Math.PI/4]:'π/4'}[x0],f=x=>a*Math.sin(x)+b*Math.cos(x)+x,ans=a*Math.cos(x0)-b*Math.sin(x0)+1;
    return {q:`If f(x) = ${a} sin x + ${b} cos x + x, find f′(${nm}). Give a decimal.`,ans,unit:'',abs:.01,chk:D(f,x0),hint:'f′(x) = a cos x − b sin x + 1. Then substitute.',sol:`f′(x) = ${a} cos x − ${b} sin x + 1. At x = ${nm}: ${a}(${fmt(Math.cos(x0),3)}) − ${b}(${fmt(Math.sin(x0),3)}) + 1 = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'td-slope',topic:'transder',title:'Slope of eˣ and ln x',gen(){const a=ri(1,5),useExp=Math.random()<.5,x0=useExp?ri(0,2):ri(1,4),f=useExp?x=>a*Math.exp(x):x=>a*Math.log(x),ans=useExp?a*Math.exp(x0):a/x0;
    return {q:`Find the slope of the tangent line to y = ${a===1?'':a}${useExp?'e<sup>x</sup>':'ln x'} at x = ${x0}. Give a decimal to three places.`,ans,unit:'',tol:.005,chk:D(f,x0),hint:useExp?'The derivative of a·eˣ is a·eˣ.':'The derivative of a·ln x is a/x.',sol:`f′(x) = ${useExp?`${a}e<sup>x</sup>`:`${a}/x`}. At x = ${x0}: <b>${fmt(ans,3)}</b>.`};}});
})();
