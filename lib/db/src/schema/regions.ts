import { pgTable, text, real, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const regionsTable = pgTable("regions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull().default("Nigeria"),
  state: text("state").notNull(),
  revenue: real("revenue").notNull().default(0),
  transactions: integer("transactions").notNull().default(0),
  growth: real("growth").notNull().default(0),
  activeMerchants: integer("active_merchants").notNull().default(0),
  profitScore: real("profit_score").notNull().default(0),
  expandable: boolean("expandable").notNull().default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertRegionSchema = createInsertSchema(regionsTable).omit({ updatedAt: true });
export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type Region = typeof regionsTable.$inferSelect;
