import{d as t,r as a,_ as n,c as s,b as c,t as e,a as l}from"./main-abe1bebe.js";const o=t({name:"About",props:{title:{type:String,default:"About"}},setup(){const t=a(0);return{count:t,click:()=>{t.value++}}}}),u={class:"about"};const r=n(o,[["render",function(t,a,n,o,r,i){return l(),s("div",u,[c("h1",null,e(t.title),1),c("h2",null,e(t.count),1),c("button",{class:"btn",onClick:a[0]||(a[0]=(...a)=>t.click&&t.click(...a))},"CLICK")])}]]);export{r as default};