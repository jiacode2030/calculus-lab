/* ---------------- sim2d: one animation loop per canvas ----------------
   o.h(w) height, o.step(dt,t) physics, o.draw(ctx,w,h,t) drawing. Runs only while the canvas is on screen and its module is open;
   with reduced motion it draws once and again whenever the module calls .render() after a control changes. */
function sim2d(cv,o){let seen=true,last=0,t=0,raf=0,inF=false;
  const live=()=>seen&&!document.hidden&&cv.offsetParent!==null;
  function render(){const w=cv.clientWidth;if(!w)return;const h=o.h?o.h(w):clamp(w*.5,240,380);const c=prep(cv,h);if(!c)return;o.draw(c.ctx,w,h,t);}
  function frame(ts){raf=0;if(!live()){last=0;return;}inF=true;const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;t+=dt;try{if(o.step&&!(o.paused&&o.paused()))o.step(dt,t);render();}finally{inF=false;}raf=requestAnimationFrame(frame);}
  function kick(){if(REDUCE){render();return;}if(!raf&&!inF&&live())raf=requestAnimationFrame(frame);}
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{seen=es[es.length-1].isIntersecting;if(seen)kick();}).observe(cv);
  document.addEventListener('visibilitychange',kick);window.addEventListener('hashchange',()=>setTimeout(kick,50));
  if(o.drag){cv.classList.add('drag');cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);o.drag('down',e,cv);kick();});cv.addEventListener('pointermove',e=>{o.drag('move',e,cv);if(REDUCE)render();});
    const up=e=>o.drag('up',e,cv);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);}
  setTimeout(kick,30);
  return {render:()=>{render();kick();},get t(){return t;}};}
/* pointer position inside a canvas, in css pixels */
const ptr=(e,cv)=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
/* quadratic roots of a x² + b x + c = 0 (real roots, ascending) */
function quad(a,b,c){const d=b*b-4*a*c;if(d<0)return [];const s=Math.sqrt(d),q=-.5*(b+Math.sign(b||1)*s);const r=[q/a,c/q].filter(isFinite).sort((x,y)=>x-y);return r;}
/* bisection solve of f(x)=0 on [a,b] (f changes sign) */
function solve(f,a,b,n=200){let fa=f(a);for(let i=0;i<n;i++){const m=(a+b)/2,fm=f(m);if((fm<0)===(fa<0)){a=m;fa=fm;}else b=m;}return (a+b)/2;}

/* ---------------- Calculus helpers ---------------- */
/* pixel -> data coordinates for a panel() result */
const inv=(P,px,py)=>[P.xr[0]+(px-P.box.x)/P.box.w*(P.xr[1]-P.xr[0]),P.yr[0]+(P.box.y+P.box.h-py)/P.box.h*(P.yr[1]-P.yr[0])];
/* like curve(), but lifts the pen across jumps and asymptotes so they are not drawn as vertical lines */
function curveD(ctx,P,f,a,b,color,w=2.25,n=500,dash){ctx.save();clip(ctx,P);ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineJoin='round';if(dash)ctx.setLineDash(dash);ctx.beginPath();
  const H=P.box.h*1.5;let pen=false,py0=0;
  for(let i=0;i<=n;i++){const t=a+(b-a)*i/n,v=f(t);if(!isFinite(v)||v==null){pen=false;continue;}const px=P.X(t),py=P.Y(v);
    if(pen&&Math.abs(py-py0)>H)pen=false;pen?ctx.lineTo(px,py):ctx.moveTo(px,py);pen=true;py0=py;}
  ctx.stroke();ctx.restore();}
/* open or closed circle on a graph (limits and continuity): filled = the point is on the graph */
function hole(ctx,x,y,r,color,filled){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=filled?color:T.surface;ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();}
/* dashed vertical / horizontal guide */
function vline(ctx,P,x,color,dash=[4,4]){line(ctx,P,x,P.yr[0],x,P.yr[1],color,1.25,dash);}
function hline(ctx,P,y,color,dash=[4,4]){line(ctx,P,P.xr[0],y,P.xr[1],y,color,1.25,dash);}
/* panel() that also remembers its ranges, so inv() works */
const gpanel=(ctx,box,xr,yr,o)=>{const P=panel(ctx,box,xr,yr,o);P.xr=xr;P.yr=yr;return P;};

/* ----- numerics ----- */
/* derivative: Richardson-extrapolated central difference */
function D(f,x,h=1e-3){const d=h2=>(f(x+h2)-f(x-h2))/(2*h2);return (4*d(h/2)-d(h))/3;}
function D2(f,x,h=2e-3){return (f(x+h)-2*f(x)+f(x-h))/(h*h);}
/* Simpson's rule (n even) */
function integ(f,a,b,n=400){if(a===b)return 0;if(n%2)n++;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=f(a+i*h)*(i%2?4:2);return s*h/3;}
/* one-sided limit estimate: side = -1 (left), +1 (right) */
function limit(f,a,side){const hs=[1e-3,1e-4,1e-5];const v=hs.map(h=>f(a+side*h));return Math.abs(v[2]-v[1])<=Math.abs(v[1]-v[0])+1e-12?v[2]:v[1];}
/* Riemann sums: kind L, R, M, T on [a,b] with n pieces */
function riemann(f,a,b,n,kind){const h=(b-a)/n;let s=0;for(let i=0;i<n;i++){const x0=a+i*h,x1=x0+h;s+=kind==='L'?f(x0):kind==='R'?f(x1):kind==='M'?f(x0+h/2):(f(x0)+f(x1))/2;}return s*h;}
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);

/* ----- expressions: a small safe parser. "3x^2 + sin(2x)" -> function of x (and optionally t, y, n) -----
   Supports + - * / ^, implicit multiplication (2x, 3(x+1), x(x+1), 2 sin x), sin cos tan sec csc cot
   asin acos atan (arcsin...), sinh cosh tanh, ln, exp, sqrt, abs, pi, e, and the symbols × · − √ π. No eval. */
const FN1={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:x=>1/Math.cos(x),csc:x=>1/Math.sin(x),cot:x=>1/Math.tan(x),asin:Math.asin,acos:Math.acos,atan:Math.atan,
  arcsin:Math.asin,arccos:Math.acos,arctan:Math.atan,sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,ln:Math.log,exp:Math.exp,sqrt:Math.sqrt,abs:Math.abs};
function parseExpr(src){
  const s=String(src).replace(/[−–]/g,'-').replace(/[×·]/g,'*').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\s+/g,' ').trim();
  const tk=[];const re=/\s*(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+|[A-Za-z]+|[-+*\/^(),|])/y;let m,i=0;
  while(i<s.length){re.lastIndex=i;m=re.exec(s);if(!m){if(/^\s*$/.test(s.slice(i)))break;throw new Error('bad character');}tk.push(m[1]);i=re.lastIndex;}
  /* split letter runs like "xy" or "2xsinx": names that are functions/constants stay whole, other runs split into single variables */
  const T2=[];tk.forEach(t=>{if(/^[A-Za-z]+$/.test(t)&&!FN1[t]&&t!=='pi'&&t!=='e'){let r=t;while(r){const f=Object.keys(FN1).sort((a,b)=>b.length-a.length).find(k=>r.startsWith(k));if(f&&r.length>1&&r!==f){T2.push(f);r=r.slice(f.length);}else if(r.startsWith('pi')){T2.push('pi');r=r.slice(2);}else{T2.push(r[0]);r=r.slice(1);}}}else T2.push(t);});
  let p=0;const peek=()=>T2[p],next=()=>T2[p++];
  const isNum=t=>t!=null&&/^[\d.]/.test(t),isName=t=>t!=null&&/^[A-Za-z]/.test(t);
  /* grammar: sum -> term (+|- term)* ; term -> unary ((*|/|implicit) unary)* ; unary -> -unary | power ; power -> atom (^ unary)? */
  function sum(){let a=term();while(peek()==='+'||peek()==='-'){const o=next(),b=term();a=[o,a,b];}return a;}
  function term(){let a=unary();for(;;){const t=peek();if(t==='*'||t==='/'){next();a=[t,a,unary()];}else if(t==='('||isNum(t)||(isName(t)&&!(a&&a[0]==='num'&&false))){a=['*',a,power()];}else break;}return a;}
  function unary(){if(peek()==='-'){next();return ['neg',unary()];}if(peek()==='+'){next();return unary();}return power();}
  function power(){const a=atom();if(peek()==='^'){next();return ['^',a,unary()];}return a;}
  function atom(){const t=next();if(t==null)throw new Error('unexpected end');
    if(isNum(t))return ['num',parseFloat(t)];
    if(t==='('){const a=sum();if(next()!==')')throw new Error('missing )');return a;}
    if(t==='|'){const a=sum();if(next()!=='|')throw new Error('missing |');return ['f',Math.abs,a];}
    if(isName(t)){if(FN1[t]){let arg;if(peek()==='('){next();arg=sum();if(next()!==')')throw new Error('missing )');}else arg=power();
        /* sin^2 x style: sin^2(x) is not supported; write sin(x)^2 */return ['f',FN1[t],arg];}
      if(t==='pi')return ['num',Math.PI];if(t==='e')return ['num',Math.E];return ['var',t];}
    throw new Error('unexpected '+t);}
  const ast=sum();if(p<T2.length)throw new Error('unexpected '+T2[p]);
  const ev=(n,v)=>{switch(n[0]){case 'num':return n[1];case 'var':{const x=v[n[1]];if(x===undefined)throw new Error('unknown '+n[1]);return x;}case 'neg':return -ev(n[1],v);
    case '+':return ev(n[1],v)+ev(n[2],v);case '-':return ev(n[1],v)-ev(n[2],v);case '*':return ev(n[1],v)*ev(n[2],v);case '/':return ev(n[1],v)/ev(n[2],v);
    case '^':return Math.pow(ev(n[1],v),ev(n[2],v));case 'f':return n[1](ev(n[2],v));}};
  const f=(x,y)=>ev(ast,typeof x==='object'?x:{x,t:x,n:x,y});f.ast=ast;f.src=String(src);return f;}
/* a constant expression (no variables): "3/4", "2pi", "ln(2)", "e^2", "sqrt(3)/2" -> number or NaN */
function exprConst(raw){try{const v=parseExpr(raw)({});return typeof v==='number'?v:NaN;}catch(e){return NaN;}}
/* is typed expression b the same function as a? compares at sample points; c:true ignores an added constant (antiderivatives) */
function sameFn(a,b,o={}){let fa,fb;try{fa=parseExpr(a);fb=parseExpr(b);}catch(e){return false;}
  const xs=o.xs||[.37,.83,1.21,1.74,2.3,2.77,.51,1.09,-0.4,-1.3];let off=null,good=0;
  for(const x of xs){let va,vb;try{va=fa(x);vb=fb(x);}catch(e){return false;}if(!isFinite(va)||!isFinite(vb)){if(isFinite(va)!==isFinite(vb))return false;continue;}
    good++;if(o.c){const d=vb-va;if(off===null)off=d;else if(Math.abs(d-off)>1e-6*(1+Math.abs(va)))return false;}else if(Math.abs(va-vb)>1e-6*(1+Math.abs(va)))return false;}
  return good>=3;}
/* "x^2" -> "x²", "sqrt(" -> "√(", "pi" -> "π", "*" dropped between a number and a letter: for showing expressions in text */
function pretty(s){const S='⁰¹²³⁴⁵⁶⁷⁸⁹',sp=d=>d.split('').map(c=>c==='-'?'⁻':S[+c]).join('');
  return String(s).replace(/\^\((-?\d+)\)/g,(m,d)=>sp(d)).replace(/\^(-?\d+)/g,(m,d)=>sp(d)).replace(/sqrt\(/g,'√(').replace(/\bpi\b/g,'π').replace(/(\d)\s*\*\s*(?=[a-zA-Zπ(])/g,'$1').replace(/\*/g,'·').replace(/-/g,'−');}
/* polynomial text from coefficients, highest power first: polyTxt([3,0,-2,5]) -> "3x³ − 2x + 5" */
function polyTxt(c,v='x'){const n=c.length-1,S='⁰¹²³⁴⁵⁶⁷⁸⁹';let out='';c.forEach((a,i)=>{const p=n-i;if(!a)return;const m=Math.abs(a);
  const t=p===0?String(m):(m===1?'':m)+v+(p===1?'':p<10?S[p]:'^'+p);out+=out?(a<0?' − ':' + ')+t:(a<0?'−':'')+t;});return out||'0';}
/* a number as an exact-looking fraction when it is one: 0.75 -> "3/4" */
function frac(x,maxd=64){if(Number.isInteger(x))return String(x).replace('-','−');for(let d=2;d<=maxd;d++){const n=Math.round(x*d);if(Math.abs(n/d-x)<1e-9){const g=gcd(n,d);return (n<0?'−':'')+Math.abs(n/g)+'/'+(d/g);}}return fmt(x,3);}

/* ----- the course: AB or BC. BC-only parts carry class "bc"; BC extras inside shared modules are .bcx boxes ----- */
const COURSE=()=>{const c=store('calc-course');return c==='AB'?'AB':'BC';};
function setCourse(c){store('calc-course',c);applyCourse();document.dispatchEvent(new CustomEvent('coursechange'));}
function applyCourse(){const ab=COURSE()==='AB';document.body.classList.toggle('is-ab',ab);$$('#course-seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===COURSE()));}
