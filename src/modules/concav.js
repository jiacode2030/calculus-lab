/* ---------------- Concavity & the second derivative test ---------------- */
(function concav(){
  const cv=$('#cc-canvas');if(!cv)return;
  const C={a:{f:x=>x**3-3*x,d:x=>3*x*x-3,dd:x=>6*x,yr:[-3.6,3.6],ddr:[-13,13],xr:[-2.2,2.2],inf:[0]},b:{f:x=>x**4,d:x=>4*x**3,dd:x=>12*x*x,yr:[-1,10],ddr:[-3,50],xr:[-2.1,2.1],inf:[]},
    c:{f:Math.sin,d:Math.cos,dd:x=>-Math.sin(x),yr:[-1.5,1.5],ddr:[-1.5,1.5],xr:[-3.4,3.4],inf:[-Math.PI,0,Math.PI]},d:{f:x=>x**4-2*x*x,d:x=>4*x**3-4*x,dd:x=>12*x*x-4,yr:[-1.5,5],ddr:[-5,45],xr:[-2.1,2.1],inf:[-1/Math.sqrt(3),1/Math.sqrt(3)]}};
  let k='a',x0=.6;
  const shade=(ctx,P,A)=>signBands(ctx,P,A.xr,A.dd,alpha(T.cx,.12),alpha(T.ca,.12));
  const sim=glab('cc-canvas',{h:w=>clamp(w*.4,240,320),view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const A=C[k];shade(ctx,P,A);curveD(ctx,P,A.f,A.xr[0],A.xr[1],T.cx,2.8,400);A.inf.forEach(c=>dot(ctx,P.X(c),P.Y(A.f(c)),5.5,T.ce,T.ink));
      const m=A.d(x0),y=A.f(x0);line(ctx,P,x0-.9,y-.9*m,x0+.9,y+.9*m,T.hot,2.2);dot(ctx,P.X(x0),P.Y(y),6,T.hot,T.surface);label(ctx,'blue zone: concave up · pink zone: concave down',P.box.x+8,P.box.y+10,T.muted,'left','middle',MONO);}});
  const sim2=glab('cc-canvas2',{h:w=>clamp(w*.28,160,220),view:()=>({xr:C[k].xr,yr:C[k].ddr}),draw(ctx,P){const A=C[k];shade(ctx,P,A);curveD(ctx,P,A.dd,A.xr[0],A.xr[1],T.ca,2.8,300);A.inf.forEach(c=>dot(ctx,P.X(c),P.Y(0),5.5,T.ce,T.ink));dot(ctx,P.X(x0),P.Y(A.dd(x0)),6,T.ca,T.surface);label(ctx,'f″(x)',P.box.x+8,P.box.y+10,T.ca,'left','middle',LABEL);}});
  function upd(){const A=C[k],s=A.dd(x0);setText('cc-fp',fmt(A.d(x0),3));setText('cc-fpp',fmt(s,3));setText('cc-bend',Math.abs(s)<1e-6?'f″ = 0: possible inflection':s>0?'concave up (f″ > 0): holds water':'concave down (f″ < 0): spills water');sim.render();sim2.render();}
  bindRange('cc-x',v=>nz(v),v=>{x0=v;upd();});segBind('cc-fn','k',v=>{k=v;upd();});upd();drawers.concav=()=>{sim.render();sim2.render();};
  KEYS['cc-canvas']=['Blue zone: f″ > 0 (concave up). Pink zone: f″ < 0 (concave down). Gold dots are inflection points.',[['cx','f(x) and concave-up zone'],['ca','concave-down zone, f″'],['hot','tangent line'],['ce','inflection points']]];
  TIPS['cc-x']=el=>{const s=C[k].dd(+el.value);return `x = ${nz(+el.value)}: f″ = ${fmt(s,2)}, so the curve ${s>0?'bends up (the tangent lies below the curve)':s<0?'bends down (the tangent lies above the curve)':'is switching its bend'}.`;};
  GLOSS['concave up']='The graph bends upward like a cup: f″ > 0, and f′ is increasing.';GLOSS['inflection point']='A point where the concavity changes (f″ changes sign).';
  TT.concav='Have students predict whether the tangent line is above or below the curve before sliding.';
})();
(function(){
  PROBS.push({id:'cc-inflect',topic:'concav',title:'Find an inflection point',gen(){const b=3*ri(-3,3),c=ri(-6,6),f=x=>x**3+b*x*x+c*x,ans=-b/3;
    return {q:`Find the x-coordinate of the point of inflection of f(x) = ${polyTxt([1,b,c,0])}.`,ans,unit:'',abs:.01,chk:roots(x=>D2(f,x,1e-2),-10,10)[0]??ans,hint:'Solve f″(x) = 0 and check that f″ changes sign.',sol:`f′(x) = 3x²${pmt(2*b,'x')}${pmt(c)}, f″(x) = 6x${pmt(2*b)}. Setting 6x${pmt(2*b)} = 0 gives x = <b>${nz(ans)}</b>, and f″ changes sign there.`};}});
  PROBS.push({id:'cc-second',topic:'concav',title:'Second derivative test',gen(){const c=ri(-3,3),fpp=pick([-6,-3,-1,2,4,7]),m=mcq(fpp>0?'local minimum':'local maximum',['local minimum','local maximum','inflection point','the test is inconclusive']);
    return {q:`f′(${nz(c)}) = 0 and f″(${nz(c)}) = ${nz(fpp)}. What does the second derivative test say about x = ${nz(c)}?`,choices:m.choices,ans:m.ans,hint:'f″ > 0: concave up (a valley). f″ < 0: concave down (a peak).',sol:`f″ is ${fpp>0?'positive':'negative'}, so the graph is concave ${fpp>0?'up':'down'} at a flat point: a <b>${fpp>0?'local minimum':'local maximum'}</b>.`};}});
  PROBS.push({id:'cc-concave',topic:'concav',title:'Where is it concave up?',gen(){const k=ri(1,4),f=x=>x**4-2*k*k*x*x,c=pick(['concave up','concave down']),thr=k/Math.sqrt(3),thrTxt=`${k}/√3`,out=`(−∞, −${thrTxt}) and (${thrTxt}, ∞)`,mid=`(−${thrTxt}, ${thrTxt})`,ans=c==='concave up'?out:mid;
    const m=mcq(ans,[out,mid,`(0, ∞)`,`(−∞, 0)`]);return {q:`On which interval(s) is f(x) = x⁴ − ${2*k*k}x² ${c}?`,choices:m.choices,ans:m.ans,hint:'f″(x) = 12x² − 4k². Find where it is positive or negative.',sol:`f″(x) = 12x² − ${4*k*k}, which is zero at x = ±${thrTxt} (≈ ±${fmt(thr,3)}). It is positive outside and negative inside, so f is ${c} on <b>${ans}</b>.`};}});
  PROBS.push({id:'cc-tangent',topic:'concav',title:'Tangent line vs the curve',gen(){const R=[['f(x) = x², tangent at x = 1','below'],['f(x) = −x² + 4, tangent at x = 1','above'],['f(x) = e<sup>x</sup>, tangent at x = 0','below'],['f(x) = ln x, tangent at x = 1','above'],['f(x) = x³, tangent at x = 2','below'],['f(x) = −x³, tangent at x = 2','above']],[tx,ans]=pick(R),m=mcq(ans,['above','below']);
    return {q:`The tangent line to ${tx} lies ___ the graph near the point of tangency.`,choices:m.choices,ans:m.ans,hint:'Concave up: the tangent lies below. Concave down: the tangent lies above.',sol:`The graph is concave ${ans==='below'?'up':'down'} there, so the tangent line lies <b>${ans}</b> the curve.`};}});
})();
