/* ---------------- Derivatives in context & motion ---------------- */
(function motion(){
  const cv=$('#mo-canvas');if(!cv)return;
  const C={a:{s:t=>t**3-6*t**2+9*t,v:t=>3*t*t-12*t+9,a:t=>6*t-12,lo:-4,hi:10,u:'m'},b:{s:t=>20*t-5*t*t,v:t=>20-10*t,a:()=>-10,lo:-30,hi:30,u:'m'},c:{s:t=>3*Math.sin(t),v:t=>3*Math.cos(t),a:t=>-3*Math.sin(t),lo:-3.6,hi:3.6,u:'m'}};
  let k='a',t0=.5,playing=false;
  const sim=sim2d(cv,{h:w=>clamp(w*.62,320,430),paused:()=>!playing,step(dt){t0+=dt*.7;if(t0>5)t0=0;const el=$('#mo-t');el.value=t0;setText('mo-t-out',nz(t0));upd(true);},
    draw(ctx,w,h){const A=C[k],s=A.s(t0),v=A.v(t0),a=A.a(t0),top=70;
      /* number line */
      const x0=40,x1=w-40,lo=A.lo,hi=A.hi,X=q=>x0+(q-lo)/(hi-lo)*(x1-x0);ctx.strokeStyle=T.muted;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x0,40);ctx.lineTo(x1,40);ctx.stroke();
      const st=niceStep(hi-lo,8);ctx.fillStyle=T.muted;ctx.font=MONO;ctx.textAlign='center';for(let q=Math.ceil(lo/st)*st;q<=hi;q+=st){ctx.beginPath();ctx.moveTo(X(q),36);ctx.lineTo(X(q),44);ctx.stroke();ctx.fillText(tick(q,st),X(q),58);}
      const px=X(clamp(s,lo,hi));dot(ctx,px,40,9,T.cx,T.surface);if(Math.abs(v)>1e-6)arrow(ctx,px,24,px+clamp(v*6,-70,70),24,T.cv,3);if(Math.abs(a)>1e-6)arrow(ctx,px,12,px+clamp(a*6,-70,70),12,T.ca,3);
      label(ctx,'v',px-8,24,T.cv,'right','middle',LABEL);label(ctx,'a',px-8,12,T.ca,'right','middle',LABEL);
      /* graphs */
      let m=0;for(let i=0;i<=100;i++){const t=5*i/100;m=Math.max(m,Math.abs(A.s(t)),Math.abs(A.v(t)),Math.abs(A.a(t)));}m*=1.1;
      const P=gpanel(ctx,{x:46,y:top+20,w:w-60,h:h-top-46},[0,5],[-m,m],{xn:5,yn:4,xlabel:'t'});
      curveD(ctx,P,A.s,0,5,T.cx,2.6,300);curveD(ctx,P,A.v,0,5,T.cv,2.6,300);curveD(ctx,P,A.a,0,5,T.ca,2.6,300);vline(ctx,P,t0,T.hot,[4,4]);[[A.s,T.cx],[A.v,T.cv],[A.a,T.ca]].forEach(([f,c])=>dot(ctx,P.X(t0),P.Y(f(t0)),5,c,T.surface));}});
  function upd(skip){const A=C[k],s=A.s(t0),v=A.v(t0),a=A.a(t0);setText('mo-s',fmt(s,3));setText('mo-v',fmt(v,3));setText('mo-a',fmt(a,3));
    setText('mo-state',Math.abs(v)<.02?'at rest for an instant':(v>0?'moving right':'moving left')+(Math.abs(a)<.02?', speed steady':v*a>0?', speeding up':', slowing down'));if(!skip)sim.render();}
  bindRange('mo-t',v=>nz(v),v=>{t0=v;upd();});segBind('mo-fn','k',v=>{k=v;upd();});
  $('#mo-play').addEventListener('click',()=>{playing=!playing;$('#mo-play').textContent=playing?'Pause':'Play';sim.render();});
  upd();drawers.motion=()=>sim.render();
  KEYS['mo-canvas']=['Press Play or slide t. Green arrow = velocity, pink arrow = acceleration; the graphs show s, v and a together.',[['cx','position s'],['cv','velocity v = s′'],['ca','acceleration a = v′']]];
  TIPS['mo-t']=el=>{const A=C[k],t=+el.value,v=A.v(t),a=A.a(t);return `t = ${nz(t)}: v = ${fmt(v,2)}, a = ${fmt(a,2)}. ${v*a>0?'Same sign: speeding up.':v*a<0?'Opposite signs: slowing down.':'One of them is zero.'}`;};
  GLOSS['velocity']='The derivative of position: speed with a direction (sign).';
  GLOSS['speed']='|v|: how fast, ignoring direction.';
  TT.motion='Have students predict speeding up or slowing down from the signs of v and a before pressing play. Link turning points to where v crosses zero on the graph.';
})();
(function(){
  PROBS.push({id:'mo-vel',topic:'motion',title:'Velocity and acceleration at a time',gen(){const a=ri(1,3),b=ri(-6,6),c=ri(-8,8),t0=ri(1,4),ask=pick(['v','a']),s=t=>a*t**3+b*t*t+c*t,v=t=>3*a*t*t+2*b*t+c,ac=t=>6*a*t+2*b,ans=ask==='v'?v(t0):ac(t0);
    return {q:`A particle moves along a line with position s(t) = ${polyTxt([a,b,c,0],'t')} meters, t in seconds. Find its ${ask==='v'?'velocity':'acceleration'} at t = ${t0}. Units: ${ask==='v'?'m/s':'m/s²'}.`,ans,unit:ask==='v'?'m/s':'m/s²',abs:.01,chk:ask==='v'?D(s,t0):D2(s,t0,1e-2),hint:ask==='v'?'v(t) = s′(t).':'a(t) = s″(t).',sol:`v(t) = ${polyTxt([3*a,2*b,c],'t')}, a(t) = ${polyTxt([6*a,2*b],'t')}. At t = ${t0}: ${ask==='v'?mulv(3*a,t0)+'²'+(b?(b<0?' − ':' + ')+mulv(Math.abs(2*b),t0):'')+pmt(c):mulv(6*a,t0)+pmt(2*b)} = <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'mo-rest',topic:'motion',title:'When is the particle at rest?',gen(){let p,q;do{p=ri(0,3);q=ri(p+1,6);}while((p+q)%2);const B=-3*(p+q)/2,C0=3*p*q,s=t=>t**3+B*t*t+C0*t,pickBig=Math.random()<.5,ans=pickBig?q:p;
    return {q:`A particle's position is s(t) = ${polyTxt([1,B,C0,0],'t')}, t ≥ 0. It is at rest at two times. Find the ${pickBig?'later':'earlier'} one.`,ans,unit:'',abs:.01,chk:Math.abs(D(s,ans))<1e-5?ans:NaN,hint:'At rest means v(t) = s′(t) = 0. Factor the quadratic.',sol:`v(t) = ${polyTxt([3,2*B,C0],'t')} = 3(${lin(p,'t')})(${lin(q,'t')}). At rest at t = ${p} and t = ${q}; the ${pickBig?'later':'earlier'} is <b>${ans}</b>.`};}});
  PROBS.push({id:'mo-speed',topic:'motion',title:'Speeding up or slowing down?',gen(){const v=pick([-6,-4,-3,-2,2,3,4,6]),a=pick([-5,-3,-2,-1,1,2,3,5]),ans=v*a>0?'speeding up':'slowing down',m=mcq(ans,['speeding up','slowing down','at rest','turning around']);
    return {q:`At t = 3 a particle on a line has velocity v(3) = ${nz(v)} and acceleration a(3) = ${nz(a)}. Is its speed increasing or decreasing?`,choices:m.choices,ans:m.ans,hint:'Compare the signs of v and a.',sol:`v and a have ${v*a>0?'the same':'opposite'} sign${v*a>0?'':'s'}, so the particle is <b>${ans}</b>.`};}});
  PROBS.push({id:'mo-ctx',topic:'motion',title:'Interpret a derivative',gen(){const R=[['V(t) is liters of water in a tank after t minutes, and V′(5) = −3','The tank is losing water at 3 liters per minute at t = 5'],['C(q) is cost in dollars to make q items, and C′(100) = 4.5','Making the 101st item costs about $4.50 more'],['P(t) is a population in thousands after t years, and P′(10) = 2','The population is growing at about 2 thousand per year at t = 10'],['T(h) is temperature in °C at height h km, and T′(3) = −6.5','Temperature drops about 6.5 °C per km at 3 km height']],[tx,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`${tx}. Which is the best interpretation?`,choices:m.choices,ans:m.ans,hint:'Say it as: the quantity is changing by (value) (units) per (unit of input), at that moment.',sol:`<b>${ans}</b>. A derivative's units are output units per input unit.`};}});
})();
