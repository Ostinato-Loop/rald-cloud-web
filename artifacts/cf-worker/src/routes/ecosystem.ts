import { Hono } from "hono";
import type { Env } from "../index";

const app = new Hono<{ Bindings: Env }>();

const PRODUCTS = [
  { id: "loop-audio",  name: "Loop",           description: "Social audio platform",    status: "operational", accent: "#3EDE72", url: "https://loop.rald.cloud" },
  { id: "messenger",   name: "Loop Messenger",  description: "Realtime messaging",       status: "operational", accent: "#FF7A00", url: "https://messenger.rald.cloud" },
  { id: "business",    name: "Loop Business",   description: "Commerce for Africa",      status: "operational", accent: "#00C97C" },
  { id: "payrald",     name: "PayRald",         description: "Payments infrastructure",  status: "operational", accent: "#38bdf8" },
  { id: "raldtics",    name: "Raldtics",        description: "Analytics & intelligence", status: "operational", accent: "#a78bfa" },
  { id: "dispatch",    name: "Loop Dispatch",   description: "Logistics & delivery",     status: "operational", accent: "#fb923c" },
  { id: "voice",       name: "Loop Voice",      description: "Voice communications",     status: "operational", accent: "#f472b6" },
  { id: "dunarald",    name: "DunaRald",        description: "Entertainment platform",   status: "operational", accent: "#f97316" },
  { id: "identity",    name: "RALD Identity",   description: "Auth & identity",          status: "operational", accent: "#22d3ee" },
  { id: "gitrald",     name: "GitRald",         description: "Deployment orchestration", status: "operational", accent: "#818cf8" },
  { id: "sdk",         name: "RALD SDK",        description: "Developer platform",       status: "operational", accent: "#fbbf24" },
  { id: "console",     name: "Control Center",  description: "Ops command center",       status: "operational", accent: "#e2e8f0", url: "https://control.rald.cloud" },
];

app.get("/", (c) =>
  c.json({
    ecosystem: "RALD.cloud",
    products: PRODUCTS,
    total: PRODUCTS.length,
    operatedBy: "LILCKY STUDIO LIMITED",
    timestamp: new Date().toISOString(),
  })
);

app.get("/summary", (c) =>
  c.json({
    services: PRODUCTS.length,
    allOperational: PRODUCTS.every((p) => p.status === "operational"),
    products: PRODUCTS,
  })
);

export default app;
