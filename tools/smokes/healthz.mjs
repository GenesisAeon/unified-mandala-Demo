import http from "http";
const url = process.env.HEALTH_URL || "http://localhost:3000/healthz";
http.get(url, res => {
  if (res.statusCode === 200) { console.log("✅ /healthz OK"); process.exit(0); }
  console.error("❌ /healthz", res.statusCode); process.exit(1);
}).on("error", e => { console.error("❌ /healthz", e.message); process.exit(1); });
