import http from "http";
function get(path){return new Promise((resolve,reject)=>{
  const req=http.request({method:"GET",hostname:"localhost",port:3000,path},res=>{
      let buf="";res.on("data",c=>buf+=c);res.on("end",()=>resolve({status:res.statusCode,body:buf}));
  }); req.on("error",reject); req.end();
});}
(async()=>{
  try{
    const h=await get("/api/hydro/hvi/Demo");
    if(h.status!==200) throw new Error("/api/hydro/hvi/Demo failed");
    console.log("✅ KPIs API OK");
    process.exit(0);
  }catch(e){ console.error("❌ KPIs", e.message); process.exit(1); }
})();
