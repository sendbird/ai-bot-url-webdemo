import{g as f}from"./index-e4538b7d.js";function p(e,s){for(var a=0;a<s.length;a++){const r=s[a];if(typeof r!="string"&&!Array.isArray(r)){for(const t in r)if(t!=="default"&&!(t in e)){const n=Object.getOwnPropertyDescriptor(r,t);n&&Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>r[t]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var o,i;function u(){if(i)return o;i=1,o=e,e.displayName="csp",e.aliases=[];function e(s){s.languages.csp={directive:{pattern:/\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,alias:"keyword"},safe:{pattern:/'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,alias:"selector"},unsafe:{pattern:/(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,alias:"function"}}}return o}var c=u();const l=f(c),g=p({__proto__:null,default:l},[c]);export{g as c};
