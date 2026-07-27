import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export const themesTable = pgTable("themes", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  formId: uuid("form_id")
    .references(() => formsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  config: jsonb("config")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

export type SelectTheme = typeof themesTable.$inferSelect;
export type InsertTheme = typeof themesTable.$inferInsert;