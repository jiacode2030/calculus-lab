/* ---------------- Average value & motion with integrals ---------------- */
(function avgval(){
  const cv=$('#av-canvas');if(!cv)return;
  const C={a:{f:x=>x*x,xr:[-.3,5.3],yr:[-1,26]},b:{f:Math.sin,xr:[-.3,5.3],yr:[-1.4,1.4]},c:{f:Math.exp,xr:[-.3,5.3],yr:[-5,110]},d:{f:x=>4*x-x*x,xr:[-.3,5.3],yr:[-5,5]}};
  let k='a',a=0,b=3;
  const sim=glab('av-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const f=C[k].f,avg=integ(f,a,b,1000)/(b-a);ctx.save();clip(ctx,P);ctx.fillStyle=alpha(T.ce,.18);ctx.fillRect(P.X(a),P.Y(Math.max(avg,0)),P.X(b)-P.X(a),Math.abs(P.Y(avg)-P.Y(0)));ctx.restore();
      areaSigned(ctx,P,f,a,b,T.ce,T.ca,300,.2);curveD(ctx,P,f,C[k].xr[0],C[k].xr[1],T.cx,2.8,300);hline(ctx,P,avg,T.hot,[7,4]);vline(ctx,P,a,T.muted);vline(ctx,P,b,T.muted);
      roots(x=>f(x)-avg,a+1e-6,b-1e-6).forEach(c=>dot(ctx,P.X(c),P.Y(avg),6,T.cv,T.surface));}});
  function upd(){const f=C[k].f,I=integ(f,a,b,1000),avg=I/(b-a),cs=roots(x=>f(x)-avg,a+1e-6,b-1e-6);setText('av-int',fmt(I,4));setText('av-avg',fmt(avg,4));setText('av-c',cs.length?cs.map(c=>'x ≈ '+fmt(c,3)).join(', '):'none in the interval');sim.render();}
  bindRange('av-a',v=>nz(v),v=>{a=v;upd();});bindRange('av-b',v=>nz(v),v=>{b=v;upd();});segBind('av-fn','k',v=>{k=v;upd();});upd();
  /* motion */
  const vv=t=>t*t-4*t+3;let T0=4;
  const sim2=glab('av-canvas2',{view:()=>({xr:[0,5],yr:[-1.6,8.5],xlabel:'t'}),draw(ctx,P){areaSigned(ctx,P,vv,0,T0,T.ce,T.ca,300,.3);curveD(ctx,P,vv,0,5,T.cv,2.8,300);vline(ctx,P,T0,T.hot,[4,4]);dot(ctx,P.X(T0),P.Y(vv(T0)),6,T.cv,T.surface);label(ctx,'v(t)',P.box.x+8,P.box.y+10,T.cv,'left','middle',LABEL);}});
  function upd2(){const F=t=>t**3/3-2*t*t+3*t,disp=F(T0),dist=integ(t=>Math.abs(vv(t)),0,T0,2000);setText('av-disp',fmt(disp,4));setText('av-dist',fmt(dist,4));setText('av-pos',fmt(2+disp,4));sim2.render();}
  bindRange('av-T',v=>nz(v),v=>{T0=v;upd2();});upd2();drawers.avgval=()=>{sim.render();sim2.render();};
  KEYS['av-canvas']=['Dashed orange line: the average value. The pale rectangle has the same area as the shaded region. Green dots: where f equals its average.',[['cx','f(x)'],['hot','average value'],['ce','area under f'],['cv','points where f = average']]];
  KEYS['av-canvas2']=['Slide T. Gold area is moving forward, pink area is moving backward. Displacement subtracts them; distance adds them.',[['cv','velocity v(t)'],['ce','area where v > 0'],['ca','area where v < 0']]];
  TIPS['av-T']=el=>{const T1=+el.value;return T1<=1?'Moving forward the whole time: displacement and distance agree.':'Part of the trip went backward (pink), so distance is larger than displacement.';};
  GLOSS['displacement']='Net change in position: ∫ v dt. Forward and backward motion cancel.';GLOSS['total distance']='∫ |v| dt: all the ground covered, no cancelling.';
  TT.avgval='Ask students to estimate the average from the graph, then compare with the readout; and to predict when distance will exceed displacement.';
})();
(function(){
  PROBS.push({id:'av-avg',topic:'avgval',title:'Average value of a function',gen(){const a=ri(0,2),b=a+ri(2,4),fam=pick(['poly','trig','exp']);let q,ans,chk;
    if(fam==='poly'){const A=ri(1,4),B=ri(0,6),f=x=>A*x*x+B;q=`Find the average value of f(x) = ${polyTxt([A,0,B])} on [${a}, ${b}]. Give a decimal.`;ans=(A*(b**3-a**3)/3+B*(b-a))/(b-a);chk=integ(f,a,b,2000)/(b-a);}
    else if(fam==='trig'){const c=ri(1,5);q=`Find the average value of f(x) = ${c} sin x on [0, π]. Give a decimal to three places.`;ans=2*c/Math.PI;chk=integ(x=>c*Math.sin(x),0,Math.PI,2000)/Math.PI;}
    else{const c=ri(1,3),b2=ri(1,3);q=`Find the average value of f(x) = ${c}e<sup>x</sup> on [0, ${b2}]. Give a decimal to three places.`;ans=c*(Math.exp(b2)-1)/b2;chk=integ(x=>c*Math.exp(x),0,b2,2000)/b2;}
    return {q,ans,unit:'',tol:.003,chk,hint:'Average value = (1/(b − a)) ∫ f dx.',sol:`Compute the integral and divide by the interval length: <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'av-disp',topic:'avgval',title:'Displacement and distance',gen(){const p=ri(1,3),q2=ri(p+1,5),T0=q2+ri(1,2),v=t=>(t-p)*(t-q2),F=t=>t**3/3-(p+q2)/2*t*t+p*q2*t,dist=(()=>{let s=Math.abs(F(Math.min(p,T0))-F(0));if(T0>p)s+=Math.abs(F(Math.min(q2,T0))-F(p));if(T0>q2)s+=Math.abs(F(T0)-F(q2));return s;})(),askDist=Math.random()<.5,ans=askDist?dist:F(T0)-F(0);
    return {q:`A particle's velocity is v(t) = ${polyTxt([1,-(p+q2),p*q2],'t')} m/s. Find its ${askDist?'total distance traveled':'displacement'} from t = 0 to t = ${T0}. Give a decimal.`,ans,unit:'m',tol:.003,chk:askDist?integ(t=>Math.abs(v(t)),0,T0,4000):integ(v,0,T0,2000),hint:askDist?'Distance = ∫|v| dt. Split at the times v = 0 and add the absolute values.':'Displacement = ∫ v dt, with no splitting.',sol:askDist?`v = (t − ${p})(t − ${q2}) changes sign at t = ${p} and ${q2}. Splitting and adding absolute values: <b>${fmt(ans,3)} m</b>.`:`∫<sub>0</sub><sup>${T0}</sup> v dt = <b>${fmt(ans,3)} m</b>.`};}});
  PROBS.push({id:'av-pos',topic:'avgval',title:'Position from velocity',gen(){const s0=ri(-5,10),a=ri(1,4),b=ri(-6,6),T0=ri(1,5),ans=s0+a*T0**3/3+b*T0**2/2;
    return {q:`A particle has velocity v(t) = ${polyTxt([a,b,0],'t')} m/s and position s(0) = ${nz(s0)} m. Find s(${T0}). Give a decimal.`,ans,unit:'m',tol:.003,chk:s0+integ(t=>a*t*t+b*t,0,T0,2000),hint:'s(T) = s(0) + ∫₀ᵀ v dt.',sol:`s(${T0}) = ${nz(s0)} + ∫<sub>0</sub><sup>${T0}</sup> v dt = <b>${fmt(ans,3)} m</b>.`};}});
  PROBS.push({id:'av-mvt',topic:'avgval',title:'Where does f equal its average?',gen(){const b=pick([2,3,4,5,6]),ans=b/Math.sqrt(3);
    return {q:`Let f(x) = x² on [0, ${b}]. The Mean Value Theorem for integrals says f(c) equals the average value for some c in (0, ${b}). Find c. Give a decimal.`,ans,unit:'',tol:.003,chk:Math.sqrt((b*b)/3),hint:'The average value is (1/b)∫x² dx = b²/3. Solve c² = b²/3.',sol:`Average value = b²/3 = ${fmt(b*b/3,3)}, so c² = ${fmt(b*b/3,3)} and c = <b>${fmt(ans,3)}</b>.`};}});
})();
