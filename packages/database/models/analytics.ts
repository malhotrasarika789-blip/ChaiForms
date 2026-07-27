import {
  pgTable,
  uuid,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export const analyticsTable = pgTable("analytics", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  formId: uuid("form_id")
    .references(() => formsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  totalViews: integer("total_views")
    .default(0)
    .notNull(),

  totalResponses: integer("total_responses")
    .default(0)
    .notNull(),

  completionRate: integer("completion_rate")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date()),
});

export type SelectAnalytics = typeof analyticsTable.$inferSelect;

export type InsertAnalytics = typeof analyticsTable.$inferInsert;