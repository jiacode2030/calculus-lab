/* ---------------- Infinite limits & end behavior ---------------- */
(function asym(){
  const cv=$('#ay-canvas');if(!cv)return;
  const C={
    lt:{f:x=>(3*x+1)/(x*x-4),v:[-2,2],h:0,yr:[-6,6],txt:'f(x) = (3x + 1)/(x² − 4)',inf:'0 (top has lower degree)'},
    eq:{f:x=>(2*x*x+1)/(x*x-1),v:[-1,1],h:2,yr:[-5,9],txt:'f(x) = (2x² + 1)/(x² − 1)',inf:'2 (ratio of leading coefficients)'},
    gt:{f:x=>(x*x+1)/(x-1),v:[1],h:null,yr:[-10,10],txt:'f(x) = (x² + 1)/(x − 1)',inf:'+∞ as x → ∞ and −∞ as x → −∞: no horizontal asymptote'},
    sin:{f:x=>x===0?NaN:Math.sin(x)/x,v:[],h:0,yr:[-.6,1.2],txt:'f(x) = sin x / x',inf:'0, even though it crosses y = 0 forever'}};
  let k='lt',W=10;
  const sim=glab('ay-canvas',{view:()=>({xr:[-W,W],yr:C[k].yr}),draw(ctx,P){const F=C[k],e=W*1e-6,vs=[-W,...F.v,W];
    for(let i=0;i<vs.length-1;i++){curveD(ctx,P,F.f,vs[i]+(i?e:0),vs[i+1]-(i<vs.length-2?e:0),T.cx,2.6,1500);}
    F.v.forEach(x=>vline(ctx,P,x,T.hot));if(F.h!==null)hline(ctx,P,F.h,T.hot);}});
  function upd(){const F=C[k],x=W;setText('ay-fx',fmt(F.f(x),3));setText('ay-inf',F.inf);setText('ay-vert',F.v.length?F.v.map(a=>'x = '+nz(a)).join(', '):'none');setText('ay-formula',F.txt);sim.render();}
  bindRange('ay-w',v=>'±'+fmt(Math.pow(10,v),v<1.3?1:0),v=>{W=Math.pow(10,v);upd();});
  segBind('ay-fn','k',v=>{k=v;upd();});
  upd();drawers.asym=()=>sim.render();
  KEYS['ay-canvas']=['Zoom out with the slider. Dashed orange lines are the asymptotes.',[['cx','f(x)'],['hot','asymptotes']]];
  TIPS['ay-w']=el=>`The window shows x from −${fmt(10**el.value,0)} to ${fmt(10**el.value,0)}: the far ends of the graph.`;
  GLOSS['asymptote']='A line the graph gets closer and closer to: vertical (x = a) or horizontal (y = L).';
  GLOSS['infinite limit']='lim f(x) = ∞ means f grows without bound. The limit technically does not exist; ∞ says how it fails.';
  TT.asym='Have students predict the horizontal asymptote from the degrees before zooming out. Use the sin x / x case to show a graph can cross its asymptote.';
})();
(function(){
  PROBS.push({id:'ay-horiz',topic:'asym',title:'Limit at infinity of a ratio',gen(){const a=ri(1,9),d=ri(1,6),b=ri(-5,5),c=ri(-5,5),e=ri(1,9),ans=a/d,g=gcd(a,d);
    return {q:`Find lim x→∞ (${polyTxt([a,b,c])})/(${polyTxt([d,0,e])}). Give a fraction or decimal.`,ans,unit:'',tol:.01,chk:(x=>(a*x*x+b*x+c)/(d*x*x+e))(1e7),show:a/g+(d/g===1?'':'/'+d/g),hint:'Both top and bottom have degree 2. Divide every term by x², or compare the leading terms.',
      sol:`The degrees are equal, so the limit is the ratio of the leading coefficients: ${g===1?'':a+'/'+d+' = '}<b>${a/g}${d/g===1?'':'/'+d/g}</b>.`};}});
  PROBS.push({id:'ay-hdeg',topic:'asym',title:'Compare degrees',gen(){const m=ri(1,4),n=ri(1,4),a=ri(1,6),d=ri(1,6),sgnA=Math.random()<.5?1:-1,A=sgnA*a;const g=gcd(a,d);
    const term=(c,p)=>polyTxt(Array.from({length:p+1},(_,i)=>i===0?c:i===p?ri(1,5):0));const top=polyTxt([A,...Array(m).fill(0)].map((v,i)=>i===0?A:i===m?ri(1,5):0)),bot=polyTxt([d,...Array(n).fill(0)].map((v,i)=>i===0?d:i===n?ri(1,5):0));
    let correct,chk;const ratio=(sgnA<0?'−':'')+a/g+(d/g===1?'':'/'+d/g);
    if(m<n){correct='0';chk=0;}else if(m===n){correct=ratio;chk=A/d;}else{correct=sgnA>0?'∞':'−∞';chk=sgnA*1e9;}
    const mc=mcq(correct,['0',ratio,'∞','−∞',sgnA>0?'−'+ratio:ratio.replace('−','')]);
    return {q:`Find lim x→∞ (${top})/(${bot}).`,choices:mc.choices,ans:mc.ans,hint:'Compare the degree of the top with the degree of the bottom.',sol:`Top degree ${m}, bottom degree ${n}. ${m<n?'The bottom wins: the limit is <b>0</b>.':m===n?`Equal degrees: the ratio of leading coefficients, <b>${ratio}</b>.`:`The top wins and its leading coefficient over the bottom’s is ${sgnA>0?'positive':'negative'}: the limit is <b>${correct}</b>.`}`};}});
  PROBS.push({id:'ay-vert',topic:'asym',title:'Find the vertical asymptote',gen(){let a,c;do{a=ri(-4,4);c=ri(-4,4);}while(a===c);
    const m=mcq(`x = ${nz(c)}`,[`x = ${nz(a)}`,`x = ${nz(a)} and x = ${nz(c)}`,'none']);
    return {q:`Which describes the vertical asymptotes of f(x) = ((${lin(a)})(x + 7))/((${lin(a)})(${lin(c)}))? (Note the factor ${lin(a)} appears on top and bottom.)`.replace('(x + 7)','(x + 7)'),choices:m.choices,ans:m.ans,hint:'A zero of the bottom is a vertical asymptote only if it is not also a zero of the top. Check the factor that cancels.',
      sol:`The factor (${lin(a)}) cancels, leaving a hole at x = ${nz(a)}. The remaining factor in the bottom, (${lin(c)}), is zero at x = ${nz(c)} where the top is ${nz(c+7)}${c+7===0?' (this also cancels)':''}. So <b>x = ${nz(c)}</b> is the only vertical asymptote${c+7===0?' unless the top vanishes there as well':''}.`};}});
  PROBS.push({id:'ay-sign',topic:'asym',title:'Sign of an infinite limit',gen(){const kk=pick([-5,-3,-2,-1,1,2,3,5]),c=ri(-4,4),n=pick([1,2]),side=pick([1,-1]);
    let val;if(n===2)val=kk>0?1:-1;else val=kk*side>0?1:-1;const correct=val>0?'∞':'−∞';const m=mcq(correct,['∞','−∞','0',String(kk).replace('-','−')]);
    return {q:`Find lim x→${nz(c)}${side>0?'⁺':'⁻'} ${nz(kk)}/(${lin(c)})${n===2?'²':''}.`,choices:m.choices,ans:m.ans,hint:`Is the bottom positive or negative just ${side>0?'right':'left'} of ${nz(c)}? ${n===2?'It is squared.':''}`,
      sol:`Near ${nz(c)}, the bottom is tiny and ${n===2?'always positive (a square)':side>0?'positive from the right':'negative from the left'}. The top is ${nz(kk)}, so the quotient is ${val>0?'large and positive':'large and negative'}: <b>${correct}</b>.`};}});
})();
