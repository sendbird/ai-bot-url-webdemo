import{g as l}from"./index-e4538b7d.js";function g(r,e){for(var n=0;n<e.length;n++){const t=e[n];if(typeof t!="string"&&!Array.isArray(t)){for(const s in t)if(s!=="default"&&!(s in r)){const a=Object.getOwnPropertyDescriptor(t,s);a&&Object.defineProperty(r,s,a.get?a:{enumerable:!0,get:()=>t[s]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var o,i;function p(){if(i)return o;i=1,o=r,r.displayName="processing",r.aliases=[];function r(e){e.languages.processing=e.languages.extend("clike",{keyword:/\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,operator:/<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/}),e.languages.insertBefore("processing","number",{constant:/\b(?!XML\b)[A-Z][A-Z\d_]+\b/,type:{pattern:/\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/,alias:"variable"}}),e.languages.processing.function.pattern=/\w+(?=\s*\()/,e.languages.processing["class-name"].alias="variable"}return o}var c=p();const u=l(c),b=g({__proto__:null,default:u},[c]);export{b as p};
