import { pgTable, text, boolean, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const logisticsProvidersTable = pgTable("logistics_providers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  coverage: text("coverage").array().notNull().default([]),
  enabled: boolean("enabled").notNull().default(false),
  priority: integer("priority").notNull().default(0),
  apiKeyHash: text("api_key_hash"),
  hasCredentials: boolean("has_credentials").notNull().default(false),
  deliveryRate: real("delivery_rate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLogisticsProviderSchema = createInsertSchema(logisticsProvidersTable).omit({ createdAt: true, updatedAt: true });
export type InsertLogisticsProvider = z.infer<typeof insertLogisticsProviderSchema>;
export type LogisticsProvider = typeof logisticsProvidersTable.$inferSelect;
