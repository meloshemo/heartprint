import { homedir } from 'os';
import { readFileSync } from 'fs';
const secret = JSON.parse(readFileSync(homedir() + '/.expo/state.json')).auth.sessionSecret;
const builds = { APK: '93939dd6-6ff3-4f87-a30e-47de342a46a5', AAB: '38d23b53-0421-4fd6-a34a-e512d2ca8107' };
async function st(id){ const r=await fetch('https://api.expo.dev/graphql',{method:'POST',headers:{'Content-Type':'application/json','expo-session':secret},body:JSON.stringify({query:`query($id:ID!){builds{byId(buildId:$id){status artifacts{applicationArchiveUrl}}}}`,variables:{id}})}); return (await r.json()).data.builds.byId; }
const done = {};
for(let i=0;i<260;i++){
  for(const [k,id] of Object.entries(builds)){ if(done[k])continue; const b=await st(id); if(['FINISHED','ERRORED','CANCELED'].includes(b.status)){ done[k]=b.status; console.log(new Date().toLocaleTimeString('tr-TR'),k,b.status,b.artifacts?.applicationArchiveUrl||''); } }
  if(Object.keys(done).length===2) break;
  await new Promise(r=>setTimeout(r,40000));
}
console.log('BİTTİ');
