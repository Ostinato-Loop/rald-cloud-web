import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentActivitiesTable = pgTable("agent_activities", {
  id: text("id").primaryKey(),
  agentName: text("agent_name").notNull(),
  action: text("action").notNull(),
  detail: text("detail").notNull().default(""),
  status: text("status").notNull().default("success"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertAgentActivitySchema = createInsertSchema(agentActivitiesTable);
export type InsertAgentActivity = z.infer<typeof insertAgentActivitySchema>;
export type AgentActivity = typeof agentActivitiesTable.$inferSelect;
