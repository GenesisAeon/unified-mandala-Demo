import { Router } from "express";
import fs from "node:fs";
export const qgw = Router();

qgw.get("/", (_req, res) => {
  try {
    const json = fs.readFileSync("seeds/qgw.json","utf8");
    res.json({ success:true, data: JSON.parse(json) });
  } catch (e:any) { res.status(500).json({ success:false, error:e.message }); }
});
