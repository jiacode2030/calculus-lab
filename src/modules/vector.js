/* ---------------- Vector-valued functions & motion ---------------- */
(function vector(){
  const cv=$('#vc-canvas');if(!cv)return;
  const C={ci:{r:t=>[2*Math.cos(t),2*Math.sin(t)],v:t=>[-2*Math.sin(t),2*Math.cos(t)],a:t=>[-2*Math.cos(t),-2*Math.sin(t)],tr:[0,6.3],xr:[-3.6,3.6],yc:0,sv:22,sa:22},
    pr:{r:t=>[2*t,4*t-t*t],v:t=>[2,4-2*t],a:()=>[0,-2],tr:[0,4],xr:[-.8,9.2],yc:2.4,sv:14,sa:22},
    sp:{r:t=>[t*Math.cos(t),t*Math.sin(t)],v:t=>[Math.cos(t)-t*Math.sin(t),Math.sin(t)+t*Math.cos(t)],a:t=>[-2*Math.sin(t)-t*Math.cos(t),2*Math.cos(t)-t*Math.sin(t)],tr:[0,6.3],xr:[-7.5,7.5],yc:0,sv:9,sa:7}};
  let k='ci',t0=1,playing=false;
  const sim=glab('vc-canvas',{h:w=>clamp(w*.55,280,380),view:(w,h)=>{const A=C[k],sp=(A.xr[1]-A.xr[0])*(h-36)/(w-60);return {xr:A.xr,yr:[A.yc-sp/2,A.yc+sp/2]};},paused:()=>!playing,step(dt){const A=C[k];t0+=dt*.8;if(t0>A.tr[1])t0=A.tr[0];const el=$('#vc-t');el.value=t0;setText('vc-t-out',nz(t0));upd(true);},
    draw(ctx,P){const A=C[k],n=300;ctx.save();clip(ctx,P);ctx.strokeStyle=alpha(T.cx,.3);ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=n;i++){const t=A.tr[0]+(A.tr[1]-A.tr[0])*i/n,[x,y]=A.r(t);i?ctx.lineTo(P.X(x),P.Y(y)):ctx.moveTo(P.X(x),P.Y(y));}ctx.stroke();ctx.restore();
      const [x,y]=A.r(t0),[vx,vy]=A.v(t0),[ax,ay]=A.a(t0),px=P.X(x),py=P.Y(y);arrow(ctx,px,py,px+vx*A.sv,py-vy*A.sv,T.cv,3.2);arrow(ctx,px,py,px+ax*A.sa,py-ay*A.sa,T.ca,3.2);dot(ctx,px,py,7,T.cx,T.surface);}});
  function upd(skip){const A=C[k],[x,y]=A.r(t0),[vx,vy]=A.v(t0),[ax,ay]=A.a(t0),sp=Math.hypot(vx,vy),dot2=vx*ax+vy*ay;setText('vc-r',`⟨${fmt(x,3)}, ${fmt(y,3)}⟩`);setText('vc-vel',`⟨${fmt(vx,3)}, ${fmt(vy,3)}⟩, speed ${fmt(sp,3)}`);setText('vc-acc',`⟨${fmt(ax,3)}, ${fmt(ay,3)}⟩, |a| = ${fmt(Math.hypot(ax,ay),3)}`);
    setText('vc-state',Math.abs(dot2)<1e-3?'momentarily constant (v · a = 0)':dot2>0?'increasing (v · a > 0)':'decreasing (v · a < 0)');if(!skip)sim.render();}
  function setT(){const A=C[k],el=$('#vc-t');el.min=A.tr[0];el.max=A.tr[1];el.value=Math.min(1,A.tr[1]);t0=+el.value;}
  bindRange('vc-t',v=>nz(v),v=>{t0=v;upd();});segBind('vc-fn','k',v=>{k=v;setT();upd();});$('#vc-play').addEventListener('click',()=>{playing=!playing;$('#vc-play').textContent=playing?'Pause':'Play';sim.render();});
  setT();upd();drawers.vector=()=>sim.render();
  KEYS['vc-canvas']=['Play or slide t. Green arrow: velocity (tangent to the path). Pink arrow: acceleration.',[['cx','position on the path'],['cv','velocity v = r′'],['ca','acceleration a = v′']]];
  TIPS['vc-t']=el=>{const A=C[k],v=A.v(+el.value),a=A.a(+el.value),d=v[0]*a[0]+v[1]*a[1];return `v · a = ${fmt(d,2)}: the speed is ${Math.abs(d)<1e-3?'momentarily constant':d>0?'increasing':'decreasing'}.`;};
  GLOSS['vector-valued function']='A function whose output is a vector, such as r(t) = ⟨x(t), y(t)⟩.';
  TT.vector='Ask students to predict the direction of the acceleration for circular motion before pressing play.';
})();
(function(){
  PROBS.push({id:'vc-speed',topic:'vector',title:'Speed of a particle',gen(){const a=ri(1,3),b=ri(1,3),c=ri(1,5),t0=ri(1,3),vx=2*a*t0,vy=3*b*t0*t0-c,ans=Math.hypot(vx,vy);
    return {q:`A particle's position is r(t) = ⟨${a===1?'':a}t², ${b===1?'':b}t³ − ${cof(c,'t')}⟩. Find its speed at t = ${t0}. Give a decimal.`,ans,unit:'',tol:.004,chk:Math.hypot(D(t=>a*t*t,t0),D(t=>b*t**3-c*t,t0)),hint:'v(t) = r′(t); speed = |v|.',sol:`v(t) = ⟨${2*a}t, ${3*b}t² − ${c}⟩, so v(${t0}) = ⟨${vx}, ${nz(vy)}⟩ and the speed is √(${vx*vx} + ${vy*vy}) = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'vc-acc',topic:'vector',title:'Magnitude of acceleration',gen(){const a=ri(1,3),b=ri(1,3),t0=ri(1,3),ax=6*a*t0,ay=2*b,ans=Math.hypot(ax,ay);
    return {q:`For r(t) = ⟨${a===1?'':a}t³, ${b===1?'':b}t²⟩, find the magnitude of the acceleration at t = ${t0}. Give a decimal.`,ans,unit:'',tol:.004,chk:Math.hypot(D2(t=>a*t**3,t0,1e-2),D2(t=>b*t*t,t0,1e-2)),hint:'a(t) = r″(t) = ⟨x″, y″⟩; then take its magnitude.',sol:`a(t) = ⟨${6*a}t, ${2*b}⟩, so a(${t0}) = ⟨${ax}, ${ay}⟩ and |a| = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'vc-pos',topic:'vector',title:'Position from velocity',gen(){const a=ri(1,4),b=ri(1,3),x0=ri(-4,4),y0=ri(-4,4),T0=ri(1,4),askX=Math.random()<.5,ans=askX?x0+a*T0*T0:y0+b*T0**3;
    return {q:`A particle has velocity v(t) = ⟨${2*a}t, ${3*b}t²⟩ and position r(0) = ⟨${nz(x0)}, ${nz(y0)}⟩. Find its ${askX?'x':'y'}-coordinate at t = ${T0}.`,ans,unit:'',abs:.01,chk:askX?x0+integ(t=>2*a*t,0,T0,1000):y0+integ(t=>3*b*t*t,0,T0,1000),hint:'Position = initial position + ∫ velocity, one component at a time.',sol:`${askX?`x(t) = ${x0?nz(x0)+' + ':''}${cof(a,'t²')}`:`y(t) = ${y0?nz(y0)+' + ':''}${cof(b,'t³')}`} (the initial value plus ∫<sub>0</sub><sup>t</sup> of the velocity component), so at t = ${T0}: ${askX?(x0?nz(x0)+' + ':'')+mulv(a,T0)+'²':(y0?nz(y0)+' + ':'')+mulv(b,T0)+'³'} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'vc-dist',topic:'vector',title:'Distance traveled',gen(){const T0=ri(1,5),ans=T0*T0+2*T0;
    return {q:`A particle's position is r(t) = ⟨t², (2/3)(2t + 1)<sup>3/2</sup>⟩. Find the distance it travels from t = 0 to t = ${T0}.`,ans,unit:'',abs:.01,chk:integ(t=>Math.hypot(2*t,2*Math.sqrt(2*t+1)),0,T0,3000),hint:'Speed = √(x′² + y′²). Here the sum under the root is a perfect square.',sol:`v = ⟨2t, 2√(2t + 1)⟩, speed² = 4t² + 4(2t + 1) = 4(t + 1)², so speed = 2(t + 1). Distance = ∫<sub>0</sub><sup>${T0}</sup> 2(t + 1) dt = t² + 2t = <b>${ans}</b>.`};}});
  PROBS.push({id:'vc-dot',topic:'vector',title:'Speeding up or slowing down?',gen(){const vx=ri(-5,5),vy=ri(-5,5)||2,ax=ri(-4,4),ay=ri(-4,4)||1,d=vx*ax+vy*ay;if(d===0)return PROBS.find(p=>p.id==='vc-dot').gen();const ans=d>0?'speeding up':'slowing down',m=mcq(ans,['speeding up','slowing down','moving at constant speed','turning around']);
    return {q:`At t = 2 a particle has v = ⟨${nz(vx)}, ${nz(vy)}⟩ and a = ⟨${nz(ax)}, ${nz(ay)}⟩. Is its speed increasing or decreasing?`,choices:m.choices,ans:m.ans,hint:'Compute v · a = vₓaₓ + v_y a_y. Positive: speeding up.',sol:`v · a = (${nz(vx)})(${nz(ax)}) + (${nz(vy)})(${nz(ay)}) = ${nz(d)}, so the particle is <b>${ans}</b>.`};}});
})();
