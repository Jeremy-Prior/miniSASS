import{r,j as e,b as m,h as y,u as v,F as b}from"./index-f256b669.js";import{T as g,B as f}from"./index-e5e1206a.js";import{a as h,F as P}from"./axios-e1f5db5b.js";const N=()=>{const[i,n]=r.useState(""),[t,l]=r.useState(!0),[d,o]=r.useState(""),[p,s]=r.useState("Please provide the email you registered with, and you will receive instructions shortly on how to reset your forgotten password."),x=()=>{t&&h.post(`${window.location.origin}/authentication/api/reset-password`,{email:i}).then(a=>{a.status===200&&(s("Email sent."),o("bg-green-100 text-green-600"))}).catch(a=>{console.error("Error sending reset link:",a),s(a.message),o("bg-red-100 text-red-600")})},c=/\S+@\S+\.\S+/,w=a=>{l(c.test(a))};return e("div",{className:"w-full",children:m("div",{children:[e("div",{className:`${d} p-2 rounded mb-4`,style:{marginLeft:"-1.5%"},children:e(g,{className:"leading-[136.40%] mt-8 text-s w-full",size:"txtRalewayRomanRegular20",children:p})}),e("br",{}),e("label",{htmlFor:"email",children:"Email: "}),e("br",{}),e("input",{type:"email",id:"email",value:i,onChange:a=>{s("Please provide the email you registered with, and you will receive instructions shortly on how to reset your forgotten password."),o(""),n(a.target.value),w(a.target.value)},style:{borderRadius:"4px",width:"16.5vw"}}),e("br",{}),e("br",{}),e(f,{className:"cursor-pointer rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] text-center text-lg tracking-[0.81px] w-[156px]",color:"blue_gray_500",size:"xs",variant:"fill",style:{marginRight:"-40%",opacity:t?1:.5},onClick:x,disabled:!t,children:"Send reset link"})]})})},R=({email:i="",token:n=""})=>{const[t,l]=r.useState(""),[d,o]=r.useState(""),[p,s]=r.useState([]),[x,c]=r.useState(""),w=async()=>{if(t!==d){s(["New Password and Repeat Password must match."]);return}try{(await h.post(`${window.location.origin}/authentication/api/update-password`,{newPassword:t,email:i,token:n})).status===200?(s([]),s(["Password update successful."]),c("bg-green-100 text-green-600")):(s(["Password update failed. Please try again later."]),c("bg-red-100 text-red-600"))}catch(u){console.error(u),s(["Password update failed. Please try again later."]),c("bg-red-100 text-red-600")}},a=t!==d;return m("div",{className:" ",children:[p.length>0&&e("div",{className:`${x} p-2 rounded mb-4`,children:p.join(", ")}),m("div",{style:{display:"flex",flexDirection:"row-reverse",gap:"40px"},children:[m("div",{style:{flex:1,flexDirection:"column"},children:[e("label",{children:"Confirm Password:"}),e("br",{}),e("input",{type:"password",name:"password",value:t,onChange:u=>{l(u.target.value),s([])},placeholder:"Password",style:{borderRadius:"4px",width:"16.5vw"}}),e("br",{}),t&&t!==d&&e("span",{style:{color:"red"},children:"Passwords do not match"})]}),m("div",{style:{flex:1,flexDirection:"column"},children:[e("label",{children:"Password:"}),e("br",{}),e("input",{type:"password",name:"confirmPassword",value:d,onChange:u=>{o(u.target.value),s([])},placeholder:"Confirm Password",style:{borderRadius:"4px",width:"16.5vw"}})]})]}),e("br",{}),e("div",{className:"flex items-center justify-between",children:e(f,{className:"cursor-pointer rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] text-center text-lg tracking-[0.81px] w-[156px]",color:"blue_gray_500",size:"xs",variant:"fill",style:{opacity:a?.5:1},onClick:w,disabled:a,children:"Reset"})})]})},k=async(i,n)=>{try{return(await h.post(`${window.location.origin}/authentication/api/validate-token`,{email:i,token:n})).data.isValid}catch(t){return console.error("Token validation error:",t),!1}},F=()=>{const i=y(),n=new URLSearchParams(i.search),t=n.get("email"),l=n.get("token"),d=v(),[o,p]=r.useState(!t&&!l),[s,x]=r.useState(!1);return r.useEffect(()=>{!o&&t&&l&&k(t,l).then(c=>{x(c)})},[o,t,l]),e(b,{children:m("div",{className:"bg-white-A700 flex flex-col font-raleway items-center justify-start mx-auto pb-[5px] w-full",children:[e("div",{className:"h-[282px] md:px-5 relative w-full",children:e("div",{className:"bg-gray-200 flex flex-col items-start justify-end mt-auto mx-auto p-12 md:px-10 sm:px-5 relative rounded-br-[65px] md:top-[-105px] sm:top-[-80px] top-[0px] md:w-[102%] sm:w-[144%] w-full",children:e("div",{className:"flex flex-col items-center justify-start md:ml-[0] ml-[79px] mt-[61px]",children:e(g,{className:"sm:text-[32px] md:text-[38px] text-[42px] text-blue-900",size:"txtRalewayRomanBold42",children:o?"Forgot Password":"Update Password"})})})}),e("div",{className:"flex flex-col gap-9 items-start justify-start w-auto sm:w-full",children:o?e(N,{}):s?e(R,{email:t,token:l}):e("div",{className:"bg-red-100 text-red-600 p-4 rounded",children:"Token is invalid. Please request a new reset link."})}),e("br",{}),e("p",{style:{textAlign:"center"},children:e("span",{className:"common-pointer",style:{color:"#539987"},onClick:()=>d("/"),children:"Go Back"})}),e(P,{className:"flex items-center justify-center mt-28 md:px-5 sm:w-[144%] w-full"})]})})};export{F as default};