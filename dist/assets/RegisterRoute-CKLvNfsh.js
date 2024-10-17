import{a as p,c as d,r as n,j as e}from"./index-BUd9R3jz.js";import{c as u,a as t,b as h,u as g,I as w}from"./InputField-DMTAJNFZ.js";import{R as f,a as x,S as j,b,c as y,L as S,d as k,e as B,B as F}from"./RegisterForm.styled-CsZr9LlP.js";import{B as C,a as R}from"./GoogleButton-D5ErEcnP.js";import{u as E}from"./useDispatch-CsM70qcH.js";import"./isSymbol-CYvIzdD2.js";import"./TextareaAutosize-e71Mvbvg.js";import"./useForkRef-MIZX08DQ.js";import"./index-CI-aHmK0.js";import"./iconBase-xL8F6wLE.js";const I=u().shape({userName:t().transform(a=>a?a.trim():"").min(2,"name must be more then 1 symbol").max(30,"to long").matches(/^[a-zA-Z0-9 ]{2,30}$/,"invalid name").required("the field is empty"),userEmail:t().transform(a=>a?a.trim():"").email().matches(/^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,"invalid email address").required("the field is empty"),password:t().min(8,"password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special").max(30,"to long").matches(/(?=.*[a-z])/,"password must contain at least 1 lower case letter").matches(/(?=.*[A-Z])/,"password must contain at least 1 upper case letter").matches(/(?=.*[0-9])/,"password must contain at least 1 number").matches(/(?=.*[!@#$%^&*])/,"password must contain at least 1 special character").required("the field is empty"),repeatPassword:t().oneOf([h("password")],"passwords must match").required("confirm password is required")}),m={userEmail:{general:"userEmail",type:"email",placeholder:"E-mail"},userName:{general:"userName",type:"text",placeholder:"User name"},password:{general:"password",type:"password",placeholder:"Password"},repeatPassword:{general:"repeatPassword",type:"password",placeholder:"Password again"}},c={};Object.keys(m).forEach(a=>{c[a]=""});const P=()=>{const a=E(),o=p(),l=()=>{o(n.LOGIN)},i=g({initialValues:c,validationSchema:I,validateOnChange:!1,onSubmit:(r,{resetForm:s})=>{a(d(r)),o(n.CHAT),s()}});return e.jsx(f,{children:e.jsx(x,{children:e.jsxs(j,{onSubmit:i.handleSubmit,autoComplete:"off",children:[e.jsx(b,{children:"Create account"}),e.jsxs(y,{children:["Already have an account?"," ",e.jsx(S,{onClick:l,children:"Log in"})]}),Object.entries(m).map(([r,s])=>e.jsx(w,{props:s,formik:i,name:s.general},r)),e.jsx(k,{type:"submit",children:"Create"}),e.jsx(B,{}),e.jsxs(F,{children:[e.jsx(C,{type:"button"}),e.jsx(R,{type:"button"})]})]})})})},U=()=>e.jsx(P,{});export{U as default};