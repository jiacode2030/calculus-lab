/* ---------------- Limits from graphs & tables ---------------- */
/* a random piecewise graph with a, the one-sided limits and f(a): shared by the graph-reading lab and the problems */
function limGraph(){const a=ri(-2,2),Lm=ri(-2,2),kind=pick(['cont','hole','off','jumpL','jumpR','jumpU']);let Lp=Lm,fa=Lm;
  if(kind==='hole')fa=null;
  if(kind==='off'){do{fa=ri(-3,3);}while(fa===Lm);}
  if(kind.startsWith('jump')){do{Lp=ri(-3,3);}while(Lp===Lm);fa=kind==='jumpL'?Lm:kind==='jumpR'?Lp:null;}
  const sl=pick([-1,0,1]),sr=pick([-1,0,1]),pts=[];
  if(fa!==null)pts.push({x:a,y:fa});
  [...new Set([Lm,Lp])].forEach(v=>{if(v!==fa)pts.push({x:a,y:v,open:true});});
  const svg=svgG({xr:[-5,5],yr:[-4,4],pieces:[{f:x=>Lm+sl*(x-a),x0:-5,x1:a},{f:x=>Lp+sr*(x-a),x0:a,x1:5}],pts,alt:'Piecewise graph with open and filled circles at x = '+a+'. Read the limits from the picture.'});
  return {a,Lm,Lp,fa,svg,kind,L:Lm===Lp?Lm:null};}
const lmN=v=>v===null?'does not exist':String(v).replace('-','−');
(function limits(){
  const cv=$('#lm-canvas');if(!cv)return;
  const FN={
    hole:{a:1,f:x=>x===1?NaN:(x*x-1)/(x-1),Lm:2,Lp:2,fa:null,txt:'f(x) = (x² − 1)/(x − 1),  a = 1'},
    jump:{a:2,f:x=>x<2?x+1:x>2?x-3:1,Lm:3,Lp:-1,fa:1,txt:'f(x) = x + 1 for x < 2;  f(2) = 1;  f(x) = x − 3 for x > 2,  a = 2'},
    sinc:{a:0,f:x=>x===0?NaN:Math.sin(x)/x,Lm:1,Lp:1,fa:null,txt:'f(x) = sin x / x,  a = 0'},
    osc:{a:0,f:x=>x===0?NaN:Math.sin(1/x),Lm:null,Lp:null,fa:null,txt:'f(x) = sin(1/x),  a = 0',osc:true},
    cont:{a:1,f:x=>x*x,Lm:1,Lp:1,fa:1,txt:'f(x) = x²,  a = 1'}};
  let k='hole',z=0;
  const win=()=>2*Math.pow(10,-z);
  const sim=sim2d(cv,{h:w=>clamp(w*.55,260,360),draw(ctx,w,h){const F=FN[k],a=F.a,W=win();const xr=[a-W,a+W];let lo=Infinity,hi=-Infinity;
      if(F.osc){lo=-1.3;hi=1.3;}else{for(let i=0;i<=200;i++){const v=F.f(xr[0]+2*W*i/200);if(isFinite(v)){lo=Math.min(lo,v);hi=Math.max(hi,v);}}
        [F.Lm,F.Lp,F.fa].forEach(v=>{if(v!=null&&isFinite(v)){lo=Math.min(lo,v);hi=Math.max(hi,v);}});const pad=Math.max((hi-lo)*.3,1e-9*Math.max(1,Math.abs(hi)));lo-=pad;hi+=pad;}
      const P=gpanel(ctx,{x:48,y:12,w:w-62,h:h-38},xr,[lo,hi],{xn:4,yn:4});
      const L=a-W/2,R=a+W/2,n=F.osc?3000:600;
      const e=W*1e-6;curveD(ctx,P,F.f,xr[0],a-e,T.cx,2.6,n/2);curveD(ctx,P,F.f,a+e,xr[1],T.cx,2.6,n/2);
      vline(ctx,P,a,T.muted);
      if(F.Lm!=null&&F.Lm===F.Lp)hline(ctx,P,F.Lm,T.hot);else if(F.Lm!=null){hline(ctx,P,F.Lm,T.hot,[2,4]);hline(ctx,P,F.Lp,T.hot,[2,4]);}
      if(!F.osc){if(F.Lm===F.Lp&&F.fa!==F.Lm)hole(ctx,P.X(a),P.Y(F.Lm),5,T.cx,false);if(F.Lm!==F.Lp){hole(ctx,P.X(a),P.Y(F.Lm),5,T.cx,false);hole(ctx,P.X(a),P.Y(F.Lp),5,T.cx,false);}if(F.fa!=null)hole(ctx,P.X(a),P.Y(F.fa),5,T.ink,true);}
      [[L,T.cx],[R,T.ca]].forEach(([x,c])=>{const y=F.f(x);if(isFinite(y)){line(ctx,P,x,P.yr[0],x,y,c,1,[3,3]);dot(ctx,P.X(x),P.Y(y),6,c,T.surface);}});
      label(ctx,'a = '+fmt(a,0),P.X(a)+6,P.box.y+10,T.muted,'left','middle',MONO);},
    });
  function fv(x){const v=FN[k].f(x);return isFinite(v)?fmt(v,Math.abs(v)<10?4:2):'—';}
  function update(){const F=FN[k],a=F.a,W=win();setText('lm-l',fv(a-W/2));setText('lm-r',fv(a+W/2));setText('lm-fa',F.fa==null?'not defined':fmt(F.fa,0));
    setText('lm-lim',F.osc?'does not exist: it oscillates':F.Lm===F.Lp?`${fmt(F.Lm,0)} (left and right agree)`:`does not exist: left → ${fmt(F.Lm,0)}, right → ${fmt(F.Lp,0)}`);
    setText('lm-formula',F.txt);const w0=W;setText('lm-zoom-out','probes at a ± '+(w0>=.01?fmt(w0/2,3):sci(w0/2,1)));sim.render();}
  function table(){const F=FN[k],a=F.a,ds=[1,.1,.01,.001];const row=(sg)=>ds.map(d=>`<td>${fv(a+sg*d)}</td>`).join('');
    $('#lm-tbl').innerHTML=`<thead><tr><th>x − a</th>${ds.map(d=>`<th>−${d}</th>`).join('')}<th></th>${ds.slice().reverse().map(d=>`<th>+${d}</th>`).join('')}</tr></thead>`.replace(/<th>−/g,'<th>−')+
      `<tbody><tr><th>f(x)</th>${row(-1)}<td class="mid">a</td>${ds.slice().reverse().map(d=>`<td>${fv(a+d)}</td>`).join('')}</tr></tbody>`;}
  bindRange('lm-zoom',v=>'',v=>{z=v;update();});
  segBind('lm-fn','k',v=>{k=v;z=0;const r=$('#lm-zoom');r.value=0;table();update();coachSay('#lm-canvas',({hole:'A hole: the graph skips one point, but both sides head to the same height.',jump:'A jump: the two sides head to different heights, so there is no single limit.',sinc:'sin x / x has no value at 0, yet both sides head to 1. This limit is worth remembering.',osc:'The probes never settle: this function swings forever near 0.',cont:'A smooth graph: the limit and the value agree.'})[v]);});
  table();update();
  drawers.limits=()=>sim.render();
  TIPS['lm-zoom']=el=>{const W=2*Math.pow(10,-(+el.value));return `The probes sit ${W>=.02?fmt(W/2,2):sci(W/2,1)} on either side of a. Zooming in squeezes them toward a: watch the two values.`;};
  KEYS['lm-canvas']=[ 'Slide the zoom. The two coloured dots are the probes; compare their heights.',[['cx','left probe and graph'],['ca','right probe'],['hot','the height each side approaches'],['ink','f(a), the filled dot']]];
  GLOSS['limit']='The height a function approaches as x gets close to a, whether or not it reaches it.';
  GLOSS['one-sided limit']='A limit taken from only one side: x → a⁻ is from the left, x → a⁺ from the right.';
  GLOSS['DNE']='Does not exist: the two sides disagree, the function oscillates, or it is unbounded.';
  TT.limits='Have students predict each limit before zooming. The most useful discussion is the jump function: ask which number would be a fair answer, and why none is.';
  /* graph reading lab */
  let G=null,shown=null;
  function newG(){G=limGraph();$('#lm-g').innerHTML=G.svg;$$('#lm-q button').forEach(b=>b.setAttribute('aria-pressed','false'));setText('lm-gfb','');}
  function ans(q){return q==='lm'?G.Lm:q==='lp'?G.Lp:q==='l'?G.L:G.fa;}
  $$('#lm-q button').forEach(b=>b.addEventListener('click',()=>{$$('#lm-q button').forEach(x=>x.setAttribute('aria-pressed',x===b));const q=b.dataset.q,v=ans(q);
    const nm={lm:`lim x→${G.a<0?'−'+(-G.a):G.a}⁻`,lp:`lim x→${G.a<0?'−'+(-G.a):G.a}⁺`,l:`lim x→${G.a<0?'−'+(-G.a):G.a}`,fa:`f(${G.a<0?'−'+(-G.a):G.a})`}[q];
    setText('lm-gfb',q==='fa'?`${nm} = ${v===null?'not defined (no filled dot at that x)':lmN(v)}`:`${nm} f(x) ${v===null?'does not exist: the sides head to different heights':'= '+lmN(v)}`);}));
  $('#lm-gnew').addEventListener('click',newG);
  $('#lm-lab2').addEventListener('labreset',newG);newG();
})();
(function(){
  PROBS.push({id:'lim-graph',topic:'limits',title:'Read a limit from a graph',gen(){const G=limGraph(),A=G.a<0?'−'+(-G.a):String(G.a),qs=[
      ['lim x→'+A+'⁻ f(x)',G.Lm,'The left-hand limit: the height the graph approaches from the left of x = '+A+', ignoring the dot at x = '+A+'.'],
      ['lim x→'+A+'⁺ f(x)',G.Lp,'The right-hand limit: the height the graph approaches from the right.'],
      ['lim x→'+A+' f(x)',G.L,G.L!==null?'Left and right agree, so the limit is that common height, whatever f('+A+') is.':'The left and right limits differ, so the two-sided limit does not exist.']];
    const [txt,val,why]=pick(qs),S=v=>String(v).replace('-','−'),DNE='does not exist',correct=val===null?DNE:S(val);
    const m=mcq(correct,[S(G.Lm),S(G.Lp),G.fa===null?null:S(G.fa),DNE,S(ri(-3,3)),S(ri(-3,3)+0.5)]);
    return {q:`The graph of f is shown. What is ${txt}?`,fig:G.svg,choices:m.choices,ans:m.ans,hint:'Cover the dot at x = '+A+' and ask where the graph is heading from each side. Open circles are not part of the graph.',sol:why+` Here the answer is <b>${correct}</b>.`};}});
  PROBS.push({id:'lim-table',topic:'limits',title:'Estimate a limit from a table',gen(){const fam=pick(['quad','sin','exp']);let f,a,L,txt;
    if(fam==='quad'){const kk=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);a=kk;f=x=>(x*x-kk*kk)/(x-kk);L=2*kk;txt=`(x² − ${kk*kk})/(x − ${kk<0?'('+String(kk).replace('-','−')+')':kk})`;}
    else if(fam==='sin'){const b=ri(2,7);a=0;f=x=>Math.sin(b*x)/x;L=b;txt=`sin(${b}x)/x`;}
    else{const b=pick([2,3,4,5,-2,-3]);a=0;f=x=>(Math.exp(b*x)-1)/x;L=b;txt=`(e^(${b<0?'−'+(-b):b}x) − 1)/x`;}
    const row=sg=>[.1,.01,.001].map(d=>{const x=a+sg*d;return `<td>${fmt(x,3)}</td><td>${fmt(f(x),4)}</td>`;});
    const tbl=`<table class="lmtbl"><thead><tr><th colspan="2">x → ${fmt(a,0)}⁻</th><th colspan="2">x → ${fmt(a,0)}⁺</th></tr><tr><th>x</th><th>f(x)</th><th>x</th><th>f(x)</th></tr></thead><tbody>${[0,1,2].map(i=>`<tr>${row(-1)[i]}${row(1)[i]}</tr>`).join('')}</tbody></table>`;
    return {q:`Use the table of values of f(x) = ${txt} to estimate lim x→${fmt(a,0)} f(x). Give a whole number.${tbl}`,ans:L,unit:'',abs:.2,hint:'Look at both columns: what number are the f(x) values getting close to as x gets close to '+fmt(a,0)+'?',
      sol:`The values on the left (${fmt(f(a-.001),4)} at x = ${fmt(a-.001,3)}) and on the right (${fmt(f(a+.001),4)} at x = ${fmt(a+.001,3)}) are both close to ${nz(L)}, so the limit is <b>${nz(L)}</b>.`};}});
  PROBS.push({id:'lim-onesided',topic:'limits',title:'One-sided limits of a piecewise function',gen(){const c=ri(-3,3),m1=ri(-3,3)||1,b1=ri(-4,4),m2=ri(-3,3)||-1,b2=ri(-4,4),right=Math.random()<.5;
    const P=(m,b)=>polyTxt([m,b]),Lm=m1*c+b1,Lp=m2*c+b2,ans=right?Lp:Lm,cs=c<0?'−'+(-c):String(c);
    return {q:`Let f(x) = ${P(m1,b1)} for x &lt; ${cs} and f(x) = ${P(m2,b2)} for x ≥ ${cs}. Find lim x→${cs}${right?'⁺':'⁻'} f(x).`,ans,unit:'',abs:.01,hint:`For the ${right?'right-hand':'left-hand'} limit use the piece that applies to x ${right?'slightly greater than':'slightly less than'} ${cs}, and substitute ${cs}.`,
      sol:`Approaching from the ${right?'right':'left'} uses ${P(right?m2:m1,right?b2:b1)}. At x = ${cs} that is <b>${fmt(ans,0)}</b>.`};}});
  PROBS.push({id:'lim-k',topic:'limits',title:'Make a limit exist',gen(){const c=pick([-3,-2,-1,1,2,3]),p=ri(-3,3),kk=ri(-4,4)||2,q=c*c+p-kk*c,cs=c<0?'−'+(-c):String(c);
    return {q:`Let f(x) = x²${pmt(p)} for x &lt; ${cs}, and f(x) = kx${pmt(q)} for x ≥ ${cs}. For what value of k does lim x→${cs} f(x) exist?`,ans:kk,unit:'',abs:.01,hint:'The limit exists when the left-hand and right-hand limits are equal. Set the two pieces equal at x = '+cs+'.',
      sol:`Left: ${parn(c)}²${pmt(p)} = ${nz(c*c+p)}. Right: ${cof(c,'k')}${pmt(q)}. Setting ${cof(c,'k')}${pmt(q)} = ${nz(c*c+p)} gives ${c===1?'':cof(c,'k')+' = '+nz(kk*c)+', so '}k = <b>${nz(kk)}</b>.`};}});
})();
