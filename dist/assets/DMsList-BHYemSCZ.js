import{u as s,i as l,b as n,f as S,o as D,j as t,U as x}from"./index-CrNaRwaL.js";import{u as k}from"./index-DksADCas.js";import{u,S as I}from"./SearchInputStyled-BHKnJWt_.js";import{d as L}from"./timeUtil-gl2IA0Na.js";import{L as N,a as _,T as M}from"./RoomsListStyled-uKwDyFFg.js";import"./isSymbol-CYvIzdD2.js";import"./iconBase-WapkZLuH.js";const O=s.li.withConfig({displayName:"DMsListStyled__Item",componentId:"sc-60myjk-0"})(["display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 5%;background:var(--white-color);cursor:pointer;&:hover{background:var(--color-blue-1);}@media ","{padding:0 16px;}"],l.tablet),E=s.div.withConfig({displayName:"DMsListStyled__ChatNameStyled",componentId:"sc-60myjk-1"})(["display:flex;align-items:center;"]),B=s.div.withConfig({displayName:"DMsListStyled__Avatar",componentId:"sc-60myjk-2"})(["position:relative;display:flex;justify-content:center;align-items:center;width:48px;height:48px;border-radius:4px;font-weight:600;font-size:18px;background:var(--color-grey-6);color:var(--white-color);margin-right:12px;"]),T=s.div.withConfig({displayName:"DMsListStyled__BadgeStyled",componentId:"sc-60myjk-3"})(["position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:var(--white-color);&:after{position:absolute;content:'';width:10px;height:10px;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--color-badge);}"]),U=s.div.withConfig({displayName:"DMsListStyled__ChatName",componentId:"sc-60myjk-4"})(["display:flex;flex-direction:column;justify-content:space-between;width:116px;height:50px;& > p{color:var(--color-grey-9);}@media ","{width:156px;}"],l.laptop),A=s.div.withConfig({displayName:"DMsListStyled__MessageDay",componentId:"sc-60myjk-5"})(["display:flex;align-items:flex-start;justify-content:flex-end;width:40px;height:50px;& > p{color:var(--color-grey-9);}"]),G=()=>{const g=k({query:l.tablet}),[d,c]=n.useState(null),y=S(),{privateChatId:o,companionObject:f}=y.state||{},{setChatData:p,setIsSubscribed:h,setSelectedCompanion:m,setIsChatVisible:j,listOfOnlineUsers:b}=D(),{responseData:a}=u(x.getPrivateChats),{responseData:r}=u(d?x.getChat(d):null);n.useEffect(()=>{o&&(c(o),m(f))},[o]),n.useEffect(()=>{r&&(p(r),h(!0))},[p,r,h]);const C=(i,e)=>{c(i),m(e),g||j(!0)};return t.jsx(N,{children:a!=null&&a.length?t.jsx(_,{children:t.jsx(I,{children:a.map(({chat:i,companion:e,lastReadMessageId:v})=>{const w=b.get(e.id.toString())===!0;return t.jsxs(O,{onClick:()=>C(i.id,e),children:[t.jsxs(E,{children:[t.jsxs(B,{children:[e.userName[0].toUpperCase(),w&&t.jsx(T,{})]}),t.jsxs(U,{children:[t.jsx("h6",{children:e.userName}),t.jsx("p",{children:v})]})]}),t.jsx(A,{children:t.jsx("p",{children:L(i.creationDate)})})]},i.id)})})}):t.jsxs(M,{children:["There are no chats in the list.",t.jsx("br",{})," Start a conversation and it will be shown here"]})})};export{G as default};
