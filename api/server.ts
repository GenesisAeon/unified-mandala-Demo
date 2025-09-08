import express from "express";
import { mountHydroRoutes } from "./hydro.routes";

const app = express();
mountHydroRoutes(app);
app.get("/healthz", (_,r)=>r.send("ok"));
app.get("/readyz", (_,r)=>r.send("ok"));
app.listen(4000, ()=>console.log("API on :4000"));
