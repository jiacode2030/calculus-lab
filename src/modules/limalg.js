/* ---------------- Algebraic limits ---------------- */
(function limalg(){
  const cv=$('#la-canvas');if(!cv)return;
  const C={
    fac:{f:x=>x===3?NaN:(x*x-9)/(x-3),g:x=>x+3,a:3,L:6,plug:'0/0',simp:'x + 3',txt:'f(x) = (x² − 9)/(x − 3),  a = 3',alg:'(x² − 9)/(x − 3) = (x − 3)(x + 3)/(x − 3) = x + 3 for x ≠ 3, so the limit is 3 + 3 = 6.',xr:[0,6],yr:[0,10]},
    rat:{f:x=>x===0?NaN:(Math.sqrt(x+4)-2)/x,g:x=>1/(Math.sqrt(x+4)+2),a:0,L:.25,plug:'0/0',simp:'1/(√(x+4) + 2)',txt:'f(x) = (√(x + 4) − 2)/x,  a = 0',alg:'Multiply top and bottom by √(x+4) + 2: (x + 4 − 4)/(x(√(x+4) + 2)) = 1/(√(x+4) + 2). The limit is 1/(2 + 2) = 1/4.',xr:[-3,5],yr:[0,.6]},
    frc:{f:x=>x===3?NaN:(1/x-1/3)/(x-3),g:x=>-1/(3*x),a:3,L:-1/9,plug:'0/0',simp:'−1/(3x)',txt:'f(x) = (1/x − 1/3)/(x − 3),  a = 3',alg:'Combine: 1/x − 1/3 = (3 − x)/(3x). Then f = (3 − x)/(3x(x − 3)) = −1/(3x), so the limit is −1/9.',xr:[1,6],yr:[-.4,.06]},
    sq:{f:x=>x===0?NaN:x*x*Math.sin(1/x),g:null,a:0,L:0,plug:'sin(1/0) is meaningless',simp:'−x² ≤ f(x) ≤ x²',txt:'f(x) = x² sin(1/x),  a = 0',alg:'−1 ≤ sin(1/x) ≤ 1, so −x² ≤ x² sin(1/x) ≤ x². Both bounds go to 0, so the squeeze theorem gives 0.',xr:[-.6,.6],yr:[-.4,.4]}};
  let k='fac';
  const sim=glab('la-canvas',{view:()=>({xr:C[k].xr,yr:C[k].yr}),draw(ctx,P){const F=C[k];const e=(F.xr[1]-F.xr[0])*1e-7;
    if(k==='sq'){curveD(ctx,P,x=>x*x,F.xr[0],F.xr[1],T.hot,1.8,200,[6,4]);curveD(ctx,P,x=>-x*x,F.xr[0],F.xr[1],T.hot,1.8,200,[6,4]);curveD(ctx,P,F.f,F.xr[0],-e,T.cx,2,2500);curveD(ctx,P,F.f,e,F.xr[1],T.cx,2,2500);dot(ctx,P.X(0),P.Y(0),5,T.cv,T.surface);}
    else{curveD(ctx,P,F.f,F.xr[0],F.a-e,T.cx,2.8,300);curveD(ctx,P,F.f,F.a+e,F.xr[1],T.cx,2.8,300);curveD(ctx,P,F.g,F.xr[0],F.xr[1],T.hot,1.6,200,[6,5]);hole(ctx,P.X(F.a),P.Y(F.L),5.5,T.cx,false);}
    label(ctx,'a = '+fmt(F.a,0),P.X(F.a)+8,P.box.y+10,T.muted,'left','middle',MONO);}});
  function update(){const F=C[k];setText('la-formula',F.txt);setText('la-plug',F.plug);setText('la-simp',F.simp);setText('la-lim',k==='sq'?'0':frac(F.L));setHTML('la-alg',F.alg);sim.render();}
  segBind('la-fn','k',v=>{k=v;update();coachSay('#la-canvas',{fac:'Same graph except one missing point: after cancelling, just plug in.',rat:'Rationalizing removes the square root that was causing 0/0.',frc:'Combining the fractions exposes the common factor.',sq:'The dashed parabolas pinch the wiggling curve to 0.'}[v]);});
  update();drawers.limalg=()=>sim.render();
  KEYS['la-canvas']=['Pick a case. Blue is the original; orange is the simplified form (or the squeezing bounds).',[['cx','original f(x)'],['hot','simplified / bounds'],['cv','the squeezed value']]];
  GLOSS['conjugate']='The same two terms with the sign between them flipped: √a − b and √a + b.';
  GLOSS['squeeze theorem']='If g ≤ f ≤ h near a and g and h have the same limit L, then f has limit L.';
  TT.limalg='Ask students which of the three moves each 0/0 limit calls for before any algebra. Have them check every answer against the graph.';
})();
(function(){
  PROBS.push({id:'la-factor',topic:'limalg',title:'Factor and cancel',gen(){const r=ri(-5,5);let s;do{s=ri(-5,5);}while(s===r);const b=-(r+s),c=r*s,ans=r-s;
    return {q:`Find lim x→${nz(r)} (${polyTxt([1,b,c])})/(${lin(r)}).`,ans,unit:'',abs:.01,chk:limit(x=>(x*x+b*x+c)/(x-r),r,1),hint:`Factor the top: ${s===0?'x':'('+lin(s)+')'}(${lin(r)}). Cancel, then substitute.`,
      sol:`The top factors as ${s===0?'x':'('+lin(s)+')'}(${lin(r)}). Cancel ${lin(r)}, leaving ${lin(s)}. At x = ${nz(r)} that is <b>${nz(ans)}</b>.`};}});
  PROBS.push({id:'la-conj',topic:'limalg',title:'Multiply by the conjugate',gen(){const m=ri(1,6),ans=1/(2*m);
    return {q:`Find lim x→0 (√(x + ${m*m}) − ${m})/x. Give a fraction or decimal.`,ans,unit:'',tol:.01,chk:limit(x=>(Math.sqrt(x+m*m)-m)/x,0,1),show:'1/'+(2*m),hint:`Multiply top and bottom by √(x + ${m*m}) + ${m}.`,
      sol:`The top becomes (x + ${m*m}) − ${m*m} = x. So the expression is x/(x(√(x + ${m*m}) + ${m})) = 1/(√(x + ${m*m}) + ${m}). At x = 0 that is 1/(${m} + ${m}) = <b>1/${2*m}</b>.`};}});
  PROBS.push({id:'la-sin',topic:'limalg',title:'A trig limit',gen(){const a=ri(2,9),b=ri(2,9),g=gcd(a,b)||1,ans=a/b;
    return {q:`Find lim x→0 sin(${a}x)/(${b}x). Give a fraction or decimal.`,ans,unit:'',tol:.01,chk:limit(x=>Math.sin(a*x)/(b*x),0,1),show:a/g+(b/g===1?'':'/'+b/g),hint:'Use lim sin(u)/u = 1: write sin(ax)/(bx) as (a/b)·sin(ax)/(ax).',
      sol:`sin(${a}x)/(${b}x) = (${a}/${b})·[sin(${a}x)/(${a}x)] → (${a}/${b})(1) = <b>${a/g}${b/g===1?'':'/'+b/g}</b>.`};}});
  PROBS.push({id:'la-frac',topic:'limalg',title:'A fraction inside a fraction',gen(){const k=pick([2,3,4,5,6,-2,-3,-4]),ans=-1/(k*k);
    return {q:`Find lim x→${nz(k)} (1/x − 1/${parn(k)})/(x ${k<0?'+ '+(-k):'− '+k}). Give a fraction or decimal.`,ans,unit:'',tol:.01,chk:limit(x=>(1/x-1/k)/(x-k),k,1),show:'−1/'+(k*k),hint:'Combine 1/x − 1/k over a common denominator, then cancel the factor that makes 0/0.',
      sol:`1/x − 1/${parn(k)} = (${nz(k)} − x)/(${cof(k,'x')}) = −(${lin(k)})/(${cof(k,'x')}). Dividing by ${lin(k)} leaves −1/(${cof(k,'x')}). At x = ${nz(k)}: −1/${k*k} = <b>${nz(+ans.toFixed(4))}</b>.`};}});
})();
