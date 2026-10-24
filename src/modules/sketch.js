/* ---------------- Connecting f, f′ and f″ ---------------- */
(function sketch(){
  const cv=$('#sk-canvas');if(!cv)return;
  const XS=[-3,-2,-1,0,1,2,3],INIT=[2.5,1.5,.5,-1,-1.5,.5,2];
  let ys=INIT.slice(),drag=-1,f0=0;
  const fp=x=>{if(x<=XS[0])return ys[0];for(let i=0;i<6;i++)if(x<=XS[i+1]){const t=(x-XS[i])/(XS[i+1]-XS[i]);return ys[i]+(ys[i+1]-ys[i])*t;}return ys[6];};
  const F=x=>{let s=f0;for(let i=0;i<6;i++){const a=XS[i],b=Math.min(XS[i+1],x);if(b<=a)break;s+=(ys[i]+fp(b))/2*(b-a);}return s;};
  const zeros=()=>{const z=[];for(let i=0;i<6;i++){const a=ys[i],b=ys[i+1];if(a===0&&i===0)continue;if(a*b<0)z.push({x:XS[i]-a/(b-a),up:b>a});}return z;};
  const infl=()=>{const r=[];for(let i=1;i<6;i++){const s1=ys[i]-ys[i-1],s2=ys[i+1]-ys[i];if(s1*s2<0)r.push(XS[i]);}return r;};
  const simTop=glab('sk-canvas',{h:w=>clamp(w*.34,200,260),view:()=>({xr:[-3,3],yr:[-4.5,4.5]}),draw(ctx,P){signBands(ctx,P,[-3,3],fp,alpha(T.cv,.13),alpha(T.ca,.13));
      curveD(ctx,P,fp,-3,3,T.cv,2.8,200);XS.forEach((x,i)=>dot(ctx,P.X(x),P.Y(ys[i]),i===drag?9:7,T.cv,T.surface));label(ctx,'f′(x): drag the points',P.box.x+8,P.box.y+10,T.cv,'left','middle',LABEL);},
    drag(kind,x,y){if(kind==='down'){let b=-1,bd=.45;XS.forEach((xi,i)=>{const d=Math.abs(x-xi);if(d<bd){bd=d;b=i;}});drag=b;}else if(kind==='up'){drag=-1;}if(drag>=0&&kind!=='up'){ys[drag]=clamp(Math.round(y*8)/8,-4,4);upd();}}});
  const simBot=glab('sk-canvas2',{h:w=>clamp(w*.34,200,260),view:()=>{let lo=Infinity,hi=-Infinity;for(let i=0;i<=120;i++){const v=F(-3+6*i/120);lo=Math.min(lo,v);hi=Math.max(hi,v);}const p=Math.max((hi-lo)*.2,.5);return {xr:[-3,3],yr:[lo-p,hi+p]};},draw(ctx,P){curveD(ctx,P,F,-3,3,T.cx,2.8,240);
      zeros().forEach(z=>dot(ctx,P.X(z.x),P.Y(F(z.x)),6.5,z.up?T.ca:T.ce,T.ink));infl().forEach(x=>{hole(ctx,P.X(x),P.Y(F(x)),5.5,T.ink,false);});label(ctx,'f(x): built from f′ (gold = max, pink = min, open = inflection)',P.box.x+8,P.box.y+10,T.cx,'left','middle',MONO);}});
  function upd(){const z=zeros(),br=[-3,...z.map(q=>q.x),3],iv=[];for(let i=0;i<br.length-1;i++){const m=(br[i]+br[i+1])/2;if(fp(m)>0)iv.push(`(${fmt(br[i],2)}, ${fmt(br[i+1],2)})`);}
    setText('sk-inc',iv.length?iv.join(' and '):'nowhere');setText('sk-ext',z.length?z.map(q=>`${q.up?'min':'max'} at x ≈ ${fmt(q.x,2)}`).join('; '):'none');const inf=infl();setText('sk-inf',inf.length?inf.map(x=>'x = '+fmt(x,0)).join(', '):'none');simTop.render();simBot.render();}
  bindRange('sk-c',v=>nz(v),v=>{f0=v;upd();});$('#sk-reset').addEventListener('click',()=>{ys=INIT.slice();$$('#sk-pre button').forEach(x=>x.setAttribute('aria-pressed','false'));upd();});
  const PRE={w:[2,.5,-1.5,-.5,1.5,.5,-2],r:[.5,1,1.5,2,1.5,1,.5],t:[2,1,.5,0,.5,1,2]};
  $('#sk-pre').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;ys=PRE[b.dataset.k].slice();$$('#sk-pre button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));upd();});$('#sk-lab').addEventListener('labreset',()=>{ys=INIT.slice();f0=0;upd();});
  upd();drawers.sketch=()=>{simTop.render();simBot.render();};
  KEYS['sk-canvas']=['Drag the green points. Green zone: f′ > 0 so f rises. Pink zone: f′ < 0 so f falls.',[['cv','f′ (the points you drag)'],['cx','f, rebuilt from f′'],['ce','local maximum of f'],['ca','local minimum of f']]];
  TIPS['sk-c']=()=>'Changing f(−3) only slides the whole blue curve up or down: f is determined by f′ up to a vertical shift.';
  GLOSS['relative extremum']='A local maximum or minimum. For f it occurs where f′ changes sign.';
  TT.sketch='Have students sketch f from a given f′ on paper first, then check against the lab. Emphasize inflections happen where f′ has a local extremum.';
})();
(function(){
  PROBS.push({id:'sk-max',topic:'sketch',title:'Read f′ to find a maximum of f',gen(){let p,q;do{p=ri(-3,1);q=ri(p+2,4);}while(false);const k=Math.random()<.5?1:-1,fpf=x=>k*(x-p)*(x-q)/ (Math.abs(q-p)),g=x=>fpf(x),askMax=Math.random()<.5;
      const maxX=k>0?p:q,minX=k>0?q:p,ans=askMax?maxX:minX;
      const svg=svgG({xr:[-5,5],yr:[-4,4],pieces:[{f:g,x0:-5,x1:5,color:'var(--cv)'}],pts:[{x:p,y:0,color:'var(--ink)'},{x:q,y:0,color:'var(--ink)'}],labels:[{x:3.2,y:3.4,t:'f′',color:'var(--cv)'}],alt:'Graph of f prime, a parabola crossing the x-axis at two points.'});
      const m=mcq(String(ans).replace('-','−'),[p,q,Math.round((p+q)/2),0].map(v=>String(v).replace('-','−')));
      return {q:`The graph of f′ (the derivative of f) is shown. At which x does f have a local ${askMax?'maximum':'minimum'}?`,fig:svg,choices:m.choices,ans:m.ans,hint:'Local max: f′ changes from positive to negative. Local min: negative to positive.',sol:`f′ is ${k>0?'positive, then negative, then positive':'negative, then positive, then negative'} around x = ${p} and x = ${q}. The sign changes ${askMax?'+ → −':'− → +'} at <b>x = ${ans}</b>, so f has a local ${askMax?'maximum':'minimum'} there.`};}});
  PROBS.push({id:'sk-inflect',topic:'sketch',title:'Read f′ to find an inflection point of f',gen(){const mm=ri(-3,3),h=ri(1,3),k=pick([1,-1]),gg=x=>-k*(x-mm)**2/3+k*h,vert=mm,roots2=[mm-Math.sqrt(3*h),mm+Math.sqrt(3*h)];
      const svg=svgG({xr:[-5,5],yr:[-4,4],pieces:[{f:gg,x0:-5,x1:5,color:'var(--cv)'}],labels:[{x:3.2,y:3.4,t:'f′',color:'var(--cv)'}],alt:'Graph of f prime, a parabola with a vertex.'});
      const m=mcq(String(vert).replace('-','−'),[mm+1,mm-1,Math.round(roots2[0]),Math.round(roots2[1]),0].map(v=>String(v).replace('-','−')));
      return {q:`The graph of f′ is a parabola with its vertex at x = ${nz(vert)}. At which x does f have a point of inflection?`,fig:svg,choices:m.choices,ans:m.ans,hint:'Inflection points of f are where f′ has a local maximum or minimum (f″ changes sign).',sol:`f′ has its extremum (the vertex) at x = ${nz(vert)}, so f″ changes sign there: <b>x = ${nz(vert)}</b> is an inflection point of f.`};}});
  PROBS.push({id:'sk-describe',topic:'sketch',title:'Match f′ and f″ to the shape of f',gen(){const R=[['f′ > 0 and f″ > 0','increasing and concave up'],['f′ > 0 and f″ < 0','increasing and concave down'],['f′ < 0 and f″ > 0','decreasing and concave up'],['f′ < 0 and f″ < 0','decreasing and concave down']],[c,ans]=pick(R),m=mcq(ans,R.map(r=>r[1]));
    return {q:`On an interval, ${c}. What does the graph of f do?`,choices:m.choices,ans:m.ans,hint:'f′ gives rising or falling. f″ gives the bend.',sol:`f′ ${c.includes('f′ > 0')?'> 0 means increasing':'< 0 means decreasing'}; f″ ${c.includes('f″ > 0')?'> 0 means concave up':'< 0 means concave down'}: <b>${ans}</b>.`};}});
})();
