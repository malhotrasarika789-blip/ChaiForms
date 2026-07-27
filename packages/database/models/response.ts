import {
  pgTable,
  uuid,
  jsonb,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export const responsesTable = pgTable("responses", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  formId: uuid("form_id")
    .references(() => formsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  data: jsonb("data")
    .notNull(),

  status: varchar("status", {
    length: 20,
  })
    .default("SUBMITTED")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

export type SelectResponse = typeof responsesTable.$inferSelect;

export type InsertResponse = typeof responsesTable.$inferInsert;