import{a as D,u as L,b as F,_ as R}from"./useForkRef-CF61RznM.js";import{b as r,j as S,m as I}from"./index-D0WfsdIb.js";function V(e,s=166){let l;function d(...h){const c=()=>{e.apply(this,h)};clearTimeout(l),l=setTimeout(c,s)}return d.clear=()=>{clearTimeout(l)},d}function P(e){return e&&e.ownerDocument||document}function M(e){return P(e).defaultView||window}const U=["onChange","maxRows","minRows","style","value"];function b(e){return parseInt(e,10)||0}const Z={shadow:{visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"}};function O(e){return e==null||Object.keys(e).length===0||e.outerHeightStyle===0&&!e.overflow}const J=r.forwardRef(function(s,l){const{onChange:d,maxRows:h,minRows:c=1,style:H,value:p}=s,k=D(s,U),{current:A}=r.useRef(p!=null),v=r.useRef(null),N=L(l,v),z=r.useRef(null),f=r.useRef(0),[E,T]=r.useState({outerHeightStyle:0}),g=r.useCallback(()=>{const t=v.current,o=M(t).getComputedStyle(t);if(o.width==="0px")return{outerHeightStyle:0};const n=z.current;n.style.width=o.width,n.value=t.value||s.placeholder||"x",n.value.slice(-1)===`
`&&(n.value+=" ");const y=o.boxSizing,x=b(o.paddingBottom)+b(o.paddingTop),u=b(o.borderBottomWidth)+b(o.borderTopWidth),m=n.scrollHeight;n.value="x";const w=n.scrollHeight;let i=m;c&&(i=Math.max(Number(c)*w,i)),h&&(i=Math.min(Number(h)*w,i)),i=Math.max(i,w);const j=i+(y==="border-box"?x+u:0),B=Math.abs(i-m)<=1;return{outerHeightStyle:j,overflow:B}},[h,c,s.placeholder]),C=(t,a)=>{const{outerHeightStyle:o,overflow:n}=a;return f.current<20&&(o>0&&Math.abs((t.outerHeightStyle||0)-o)>1||t.overflow!==n)?(f.current+=1,{overflow:n,outerHeightStyle:o}):t},W=r.useCallback(()=>{const t=g();O(t)||T(a=>C(a,t))},[g]);F(()=>{const t=()=>{const m=g();O(m)||I.flushSync(()=>{T(w=>C(w,m))})},a=()=>{f.current=0,t()};let o;const n=V(a),y=v.current,x=M(y);x.addEventListener("resize",n);let u;return typeof ResizeObserver<"u"&&(u=new ResizeObserver(a),u.observe(y)),()=>{n.clear(),cancelAnimationFrame(o),x.removeEventListener("resize",n),u&&u.disconnect()}},[g]),F(()=>{W()}),r.useEffect(()=>{f.current=0},[p]);const _=t=>{f.current=0,A||W(),d&&d(t)};return S.jsxs(r.Fragment,{children:[S.jsx("textarea",R({value:p,onChange:_,ref:N,rows:c,style:R({height:E.outerHeightStyle,overflow:E.overflow?"hidden":void 0},H)},k)),S.jsx("textarea",{"aria-hidden":!0,className:s.className,readOnly:!0,ref:z,tabIndex:-1,style:R({},Z.shadow,H,{paddingTop:0,paddingBottom:0})})]})});export{J as T,M as a,P as o};
