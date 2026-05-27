import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const referralCodesTable = pgTable("referral_codes", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  referrerName: text("referrer_name").notNull().default(""),
  referrerEmail: text("referrer_email").notNull().default(""),
  productSlug: text("product_slug").notNull().default("all"),
  uses: integer("uses").notNull().default(0),
  maxUses: integer("max_uses").notNull().default(100),
  reward: text("reward").notNull().default("3_months_free"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const referralsTable = pgTable("referrals", {
  id: text("id").primaryKey(),
  code: text("code").notNull(),
  referrerEmail: text("referrer_email").notNull().default(""),
  referredEmail: text("referred_email").notNull(),
  referredName: text("referred_name").notNull().default(""),
  productSlug: text("product_slug").notNull().default("all"),
  status: text("status").notNull().default("pending"),
  rewardType: text("reward_type").notNull().default("3_months_free"),
  convertedAt: timestamp("converted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlistTable = pgTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  productSlug: text("product_slug").notNull().default("all"),
  referralCode: text("referral_code"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReferralCodeSchema = createInsertSchema(referralCodesTable).omit({ createdAt: true, updatedAt: true });
export const insertReferralSchema = createInsertSchema(referralsTable).omit({ createdAt: true });
export const insertWaitlistSchema = createInsertSchema(waitlistTable).omit({ createdAt: true });

export type InsertReferralCode = z.infer<typeof insertReferralCodeSchema>;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type ReferralCode = typeof referralCodesTable.$inferSelect;
export type Referral = typeof referralsTable.$inferSelect;
export type Waitlist = typeof waitlistTable.$inferSelect;
