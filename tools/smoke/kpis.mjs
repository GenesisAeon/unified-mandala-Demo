import http from "http";
function post(path, body){return new Promise((resolve,reject)=>{
  const data=Buffer.from(JSON.stringify(body));
  const req=http.request({method:"POST",hostname:"localhost",port:3000,path,headers:{
    "Content-Type":"application/json","Content-Length":data.length}},res=>{
      let buf="";res.on("data",c=>buf+=c);res.on("end",()=>resolve({status:res.statusCode,body:buf}));
  }); req.on("error",reject); req.write(data); req.end();
});}
(async()=>{
  try{
    const h=await post("/api/hydro/hvi",{region:"Demo",values:[1,2,3,4]});
    if(h.status!==200) throw new Error("/api/hydro/hvi failed");
    console.log("✅ KPIs API OK");
    process.exit(0);
  }catch(e){ console.error("❌ KPIs", e.message); process.exit(1); }
})();
