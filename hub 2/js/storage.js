const K='careHub.v2';
const base={t:{},qa:{},quiz:[],notes:{},marks:[],days:[],log:[],chat:[],sess:0,
 settings:{theme:'aurora',fs:16,rate:1,voice:'',motion:true,autoSpeak:false,name:'Marc Asher',address:'',school:'',goal:'Pass my caregiving oral assessment',daily:10,aiUrl:'',aiKey:'',aiModel:'claude-sonnet-4-6',web:true}};
let s;try{s=JSON.parse(localStorage.getItem(K)||'{}')}catch{s={}}
export const db=Object.assign(base,s);db.settings=Object.assign(base.settings,s.settings||{});
export const save=()=>{try{localStorage.setItem(K,JSON.stringify(db))}catch(e){console.warn('save failed',e)}};
export const today=()=>new Date().toISOString().slice(0,10);
export const touch=()=>{if(!db.days.includes(today())){db.days.push(today());save()}};
export const bump=(n=1)=>{const d=today();let r=db.log.find(x=>x.d==d);if(!r)db.log.push(r={d,n:0});r.n+=n;db.log=db.log.slice(-60);save()};
export const exportData=()=>JSON.stringify(db,null,1);
export const importData=t=>{const j=JSON.parse(t);Object.assign(db,j);save()};
export const reset=()=>{localStorage.removeItem(K);location.reload()};
