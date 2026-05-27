import { pgTable, text, boolean, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const paymentProvidersTable = pgTable("payment_providers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  features: text("features").array().notNull().default([]),
  enabled: boolean("enabled").notNull().default(false),
  priority: integer("priority").notNull().default(0),
  apiKeyHash: text("api_key_hash"),
  hasCredentials: boolean("has_credentials").notNull().default(false),
  successRate: real("success_rate"),
  lastChecked: timestamp("last_checked"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPaymentProviderSchema = createInsertSchema(paymentProvidersTable).omit({ createdAt: true, updatedAt: true });
export type InsertPaymentProvider = z.infer<typeof insertPaymentProviderSchema>;
export type PaymentProvider = typeof paymentProvidersTable.$inferSelect;
