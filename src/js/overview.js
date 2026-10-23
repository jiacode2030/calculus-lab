
/* ---------------- Overview: a curve, its tangent line, and the slope you are dragging ---------------- */
(function hero(){
  const cv=$('#hero-canvas'),seg=$('#hero-fn'),cap=$('#hero-cap');if(!cv)return;
  const FNS=[['cubic','x³ − 3x',x=>x*x*x-3*x,'Drag the point. Where the tangent is flat the slope is 0: a peak or a valley.'],
    ['sine','sin x',Math.sin,'The slope of sin x is cos x: it is steepest where the curve crosses the axis.'],
    ['expo','eˣ',Math.exp,'The slope of eˣ equals its height. Nothing else grows like that.'],
    ['quad','x²',x=>x*x,'The slope of x² is 2x: the further from the vertex, the steeper.']];
  let cur=0,x0=-1.2;const f=()=>FNS[cur][2];
  seg.innerHTML=FNS.map(([k,l],i)=>`<button type="button" data-k="${i}" aria-pressed="${i===0}">${l}</button>`).join('');
  const say=()=>{cap.textContent=FNS[cur][3];};say();
  const sim=sim2d(cv,{h:w=>clamp(w*.78,250,350),draw(ctx,w,h){
    const xr=cur===2?[-2.5,2.5]:cur===3?[-3,3]:[-3,3],yr=cur===2?[-1,8]:cur===3?[-1,8]:[-3.2,3.2];
    const P=gpanel(ctx,{x:34,y:12,w:w-48,h:h-34},xr,yr,{xn:6,yn:4});const F=f(),m=D(F,x0);
    curveD(ctx,P,F,xr[0],xr[1],T.cx,2.6);
    const y0=F(x0);line(ctx,P,xr[0],y0+m*(xr[0]-x0),xr[1],y0+m*(xr[1]-x0),T.hot,2);
    dot(ctx,P.X(x0),P.Y(y0),7,T.accent||T.cx,T.surface);
    label(ctx,'slope = '+fmt(m,2),P.box.x+10,P.box.y+14,T.hot,'left','middle','600 14px "IBM Plex Mono",monospace');
    label(ctx,'x = '+fmt(x0,2),P.box.x+10,P.box.y+34,T.muted,'left','middle',MONO);},
    drag(kind,e){if(kind==='up')return;const c=cv,[px]=ptr(e,c),w=c.clientWidth,xr=cur===3||cur===0||cur===1?[-3,3]:[-2.5,2.5];x0=clamp(xr[0]+(px-34)/(w-48)*(xr[1]-xr[0]),xr[0]+.1,xr[1]-.1);sim.render();}});
  segBind('hero-fn','k',k=>{cur=+k;x0=cur===2?0:cur===1?0:cur===3?1:-1.2;say();sim.render();});
  drawers.overview=()=>sim.render();
})();

function renderMods(){const solved=store('calc-solved')||{};const cnt={};let k=0;PROBS.forEach(p=>{const c=cnt[p.topic]=cnt[p.topic]||[0,0];c[1]++;if(solved[p.id])c[0]++;});
  $('#modgrid').innerHTML=ROADMAP.map(g=>`<div class="modgroup${g.bc?' bc':''}"><div class="eyebrow">${g.w}${g.bc?' <span class="bcbadge">BC</span>':''}</div><h3 class="gtitle">${g.name}</h3><div class="modgrid-inner">${g.ids.map(id=>{const m=MODS[id],c=cnt[id]||[0,0];
    return `<a class="mod" href="#${id}" style="--i:${Math.min(k++,14)}">${GLYPH[id]?`<span class="glyph" aria-hidden="true"><svg viewBox="0 0 24 24">${GLYPH[id]}</svg></span>`:''}<h3>${m.t}</h3><p>${m.d}</p><div class="row"><span class="tag ${apTag(id)}">${m.ap}</span><span class="prog">${c[1]?`${c[0]}/${c[1]} solved`:''}</span></div></a>`;}).join('')}${g.soon.map(id=>{const m=MODS[id];
    return `<div class="mod soon" aria-disabled="true"><h3>${m.t}</h3><p>${m.d}</p><div class="row"><span class="tag na">Coming soon</span></div></div>`;}).join('')}</div></div>`).join('');}
(function ovStatic(){
  const first=GROUPS.length?GROUPS[0].ids[0]:null,st=$('#ov-start');if(first&&st){st.href='#'+first;st.textContent='Start with '+MODS[first].t;}
  $('#ov-map').innerHTML=ROADMAP.map(g=>`<tr${g.bc?' class="bc"':''}><td>${g.w==='Optional'?'—':g.w==='BC'?'BC':g.w.replace('Unit ','')}</td><td>${g.name}</td><td>${g.ids.map(id=>`<a href="#${id}">${MODS[id].t}</a>`).concat(g.soon.map(id=>`<span class="small">${MODS[id].t} (soon)</span>`)).join(', ')}</td></tr>`).join('');
})();

/* ---------------- Side menu: one link per module, grouped by unit, then the review pages ---------------- */
(function buildNav(){let nh='<a href="#overview" data-view="overview">Overview</a>',sh='<option value="overview">Overview</option>';
  let bcStart=false;
  GROUPS.forEach(g=>{const lab=g.w==='Optional'||g.w==='BC'?g.name:`${g.w} · ${g.name}`;
    if(g.bc&&!bcStart){bcStart=true;nh+='<div class="bcdiv bc">BC only</div>';sh+='<option disabled class="bc">── BC only ──</option>';}
    nh+=`<div class="grp${g.bc?' bc':''}">${lab}</div>`;sh+=`<optgroup label="${lab}"${g.bc?' class="bc"':''}>`;
    g.ids.forEach(id=>{nh+=`<a href="#${id}" data-view="${id}"${g.bc?' class="bc"':''}>${MODS[id].t}${g.bc?'<span class="bcbadge">BC</span>':''}</a>`;sh+=`<option value="${id}">${MODS[id].t}${g.bc?' (BC)':''}</option>`;});sh+='</optgroup>';});
  const REV=[['practice','Practice set'],['methods','Which tool?'],['exam','Exam review'],['review','Review my mistakes'],['frq','FRQ practice']];
  nh+='<div class="grp">Review</div>'+REV.map(([v,t])=>`<a href="#${v}" data-view="${v}">${t}</a>`).join('');
  sh+='<optgroup label="Review">'+REV.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')+'</optgroup>';
  $('#nav').innerHTML=nh;const sel=$('#navsel');sel.innerHTML=sh;sel.addEventListener('change',()=>{location.hash=sel.value;});})();
