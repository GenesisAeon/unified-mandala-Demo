import { describe, it, expect, beforeAll } from "vitest";
import supertest from "supertest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let request: supertest.SuperTest<supertest.Test>;
let root: string;

beforeAll(async () => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "mandala-qgw-"));
  const qgwDir = path.join(root, "data", "qgw");
  fs.mkdirSync(qgwDir, { recursive: true });
  fs.writeFileSync(path.join(qgwDir, "claims.json"), JSON.stringify([{ id:"x", title:"demo", axis:"BMV", evidence:"preprint", sigils:["🪶"] }], null, 2));
  const mod = await import(path.resolve("scripts/server-app.mjs"));
  const app = mod.createApp({ rootDir: root, dataDir: path.join(root, "data", "demo"), distDir: path.join(root, "no-ui"), beacon: false });
  request = supertest(app);
});

describe("QGW API", () => {
  it("GET /api/qgw/list liefert claims", async () => {
    const res = await request.get("/api/qgw/list");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.claims)).toBe(true);
    if (res.body.claims.length) {
      const c = res.body.claims[0];
      expect(c).toHaveProperty("id");
      expect(c).toHaveProperty("title");
      expect(c).toHaveProperty("axis");
      expect(c).toHaveProperty("evidence");
    }
  });
});
