import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const managedSecretsTable = pgTable("managed_secrets", {
  id: text("id").primaryKey(),
  service: text("service").notNull(),
  label: text("label").notNull(),
  maskedValue: text("masked_value").notNull(),
  encryptedValue: text("encrypted_value").notNull(),
  status: text("status").notNull().default("active"),
  rotatedAt: timestamp("rotated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertManagedSecretSchema = createInsertSchema(managedSecretsTable).omit({ createdAt: true });
export type InsertManagedSecret = z.infer<typeof insertManagedSecretSchema>;
export type ManagedSecret = typeof managedSecretsTable.$inferSelect;
