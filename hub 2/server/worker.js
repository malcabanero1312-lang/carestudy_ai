// Cloudflare Worker — one URL for the app. Choose ONE backend:
//  A) Claude (best, supports web search): `npx wrangler secret put ANTHROPIC_API_KEY`
//  B) Cloudflare Workers AI (free tier, no key, no web search): just keep the [ai] binding in wrangler.toml
// Deploy: `cd server && npx wrangler deploy`  → paste the *.workers.dev URL in app Settings → AI → Cloudflare Worker.
// Optional: set ALLOWED_ORIGIN (e.g. https://yourapp.netlify.app) in wrangler.toml [vars] to lock it to your site.
export default{async fetch(req,env){
 const CORS={'Access-Control-Allow-Origin':env.ALLOWED_ORIGIN||'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,OPTIONS'};
 const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{...CORS,'content-type':'application/json'}});
 if(req.method=='OPTIONS')return new Response(null,{headers:CORS});
 if(req.method!='POST')return new Response('CareHub AI proxy is running',{headers:CORS});
 let b;try{b=await req.json()}catch{return J({error:'Invalid JSON'},400)}
 b.max_tokens=Math.min(b.max_tokens||1200,2000);
 if(env.ANTHROPIC_API_KEY){const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify(b)});return new Response(r.body,{status:r.status,headers:{...CORS,'content-type':'application/json'}})}
 if(env.AI){try{const out=await env.AI.run(env.CF_MODEL||'@cf/meta/llama-3.3-70b-instruct-fp8-fast',{max_tokens:b.max_tokens,messages:[{role:'system',content:b.system||''},...b.messages]});
  return J({content:[{type:'text',text:out.response||out.result?.response||''}]})}catch(e){return J({error:{message:'Workers AI: '+e.message}},500)}}
 return J({error:{message:'Worker has no backend: add ANTHROPIC_API_KEY secret or the [ai] binding.'}},500)}};
