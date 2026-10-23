/* ---------------- Logistic models ---------------- */
(function logistic(){
  const cv=$('#lg-canvas');if(!cv)return;
  let kk=.5,L=8,P0=1,t0=6;
  const P=t=>L/(1+((L-P0)/P0)*Math.exp(-kk*t)),dP=p=>kk*p*(1-p/L);
  const sim=glab('lg-canvas',{h:w=>clamp(w*.36,230,300),view:()=>({xr:[0,20],yr:[0,Math.max(L,P0)*1.15],xlabel:'t'}),draw(ctx,P_){hline(ctx,P_,L,T.hot,[6,4]);curveD(ctx,P_,P,0,20,T.cx,2.8,300);label(ctx,'carrying capacity L',P_.box.x+P_.box.w-6,P_.Y(L)-9,T.hot,'right','middle',MONO);
      if(P0<L/2){const ts=Math.log((L-P0)/P0)/kk;if(ts<20){dot(ctx,P_.X(ts),P_.Y(L/2),6,T.ce,T.ink);label(ctx,'inflection',P_.X(ts)+9,P_.Y(L/2)+14,T.ce,'left','middle',MONO);}}vline(ctx,P_,t0,T.muted,[3,4]);dot(ctx,P_.X(t0),P_.Y(P(t0)),6.5,T.cx,T.surface);label(ctx,'P(t)',P_.box.x+8,P_.box.y+10,T.cx,'left','middle',LABEL);}});
  const sim2=glab('lg-canvas2',{h:w=>clamp(w*.3,190,250),view:()=>({xr:[0,Math.max(L,P0)*1.15],yr:[-.1,Math.max(kk*L/4*1.3,.2)],xlabel:'P'}),draw(ctx,P_){curveD(ctx,P_,dP,0,Math.max(L,P0)*1.15,T.cv,2.8,200);dot(ctx,P_.X(L/2),P_.Y(kk*L/4),6,T.ce,T.ink);label(ctx,'fastest growth at P = L/2',P_.X(L/2),P_.Y(kk*L/4)-12,T.ce,'center','middle',MONO);const p=P(t0);dot(ctx,P_.X(p),P_.Y(dP(p)),6.5,T.cv,T.surface);label(ctx,'dP/dt as a function of P',P_.box.x+8,P_.box.y+10,T.cv,'left','middle',LABEL);}});
  function upd(){const p=P(t0);setText('lg-P',fmt(p,4));setText('lg-dP',fmt(dP(p),4));setText('lg-max',`${fmt(kk*L/4,3)} at P = ${fmt(L/2,2)}`);sim.render();sim2.render();}
  bindRange('lg-k',v=>nz(v),v=>{kk=v;upd();});bindRange('lg-L',v=>nz(v),v=>{L=v;upd();});bindRange('lg-p0',v=>nz(v),v=>{P0=v;upd();});bindRange('lg-t',v=>nz(v),v=>{t0=v;upd();});upd();drawers.logistic=()=>{sim.render();sim2.render();};
  KEYS['lg-canvas']=['Top: the S-curve. Bottom: the growth rate as a function of P, a parabola with its peak at P = L/2.',[['cx','P(t)'],['cv','dP/dt vs P'],['hot','carrying capacity'],['ce','fastest growth / inflection']]];
  TIPS['lg-t']=()=>'Watch the green dot on the parabola: growth is fastest at the top, slow near 0 and near L.';
  GLOSS['carrying capacity']='The population L that the environment can sustain: the limit of P in the logistic model.';GLOSS['logistic']='dP/dt = kP(1 − P/L): growth that levels off at L.';
  TT.logistic='Ask students to read the limit, the equilibria and the fastest-growth population straight from the differential equation.';
})();
(function(){
  PROBS.push({id:'lg-limit',topic:'logistic',title:'Limit of a logistic population',gen(){const k=pick([.01,.02,.05,.1,.2]),L=pick([100,250,500,800,1000,5000]),P0=Math.round(L*pick([.05,.1,.2])),nm=`${k}P(1 − P/${L})`;
    return {q:`dP/dt = ${nm} with P(0) = ${P0}. What is lim<sub>t→∞</sub> P(t)?`,ans:L,unit:'',abs:.01,chk:L,hint:'The carrying capacity: dP/dt = kP(1 − P/L) has L as the limit when 0 < P(0) < L.',sol:`Comparing with kP(1 − P/L): L = <b>${L}</b>.`};}});
  PROBS.push({id:'lg-max',topic:'logistic',title:'When is growth fastest?',gen(){const k=pick([.02,.05,.1,.4]),L=pick([100,200,400,1000]),askP=Math.random()<.5,ans=askP?L/2:k*L/4;
    return {q:`dP/dt = ${k}P(1 − P/${L}). ${askP?'At what population P is the growth rate largest?':'What is the largest possible growth rate dP/dt?'}`,ans,unit:'',tol:.004,chk:askP?argmax(p=>k*p*(1-p/L),0,L):k*L/4,hint:'dP/dt is a parabola in P with zeros at 0 and L; its peak is halfway.',sol:askP?`The peak of the parabola is at P = L/2 = <b>${L/2}</b>.`:`At P = L/2: dP/dt = k(L/2)(1/2) = kL/4 = <b>${fmt(k*L/4,3)}</b>.`};}});
  PROBS.push({id:'lg-rate',topic:'logistic',title:'Growth rate at a given size',gen(){const k=pick([.02,.05,.1,.2]),L=pick([100,200,500,1000]),P=Math.round(L*pick([.1,.3,.6,.9])),ans=k*P*(1-P/L);
    return {q:`dP/dt = ${k}P(1 − P/${L}). Find dP/dt when P = ${P}. Give a decimal.`,ans,unit:'',tol:.004,chk:k*P-k*P*P/L,hint:'Substitute P into the right-hand side.',sol:`dP/dt = ${k}(${P})(1 − ${P}/${L}) = <b>${fmt(ans,3)}</b>.`};}});
  PROBS.push({id:'lg-model',topic:'logistic',title:'Which behavior?',gen(){const R=[['dP/dt = 0.1P(1 − P/300) and P(0) = 40','P increases and approaches 300'],['dP/dt = 0.1P(1 − P/300) and P(0) = 400','P decreases and approaches 300'],['dP/dt = 0.1P and P(0) = 40','P grows without bound'],['dP/dt = 0.1P(1 − P/300) and P(0) = 0','P stays at 0'],['dP/dt = 0.1P(1 − P/300) and P(0) = 300','P stays at 300']],[tx,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`For ${tx}, which describes P(t) as t increases?`,choices:m.choices,ans:m.ans,hint:'Look at the sign of dP/dt, and at the equilibria P = 0 and P = L.',sol:`<b>${ans}</b>.`};}});
})();
