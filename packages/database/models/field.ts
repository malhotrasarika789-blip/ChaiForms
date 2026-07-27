import {
  pgTable,
  uuid,
  varchar,
  boolean,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  formId: uuid("form_id")
    .references(() => formsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  label: varchar("label", {
    length: 255,
  }).notNull(),

  type: varchar("type", {
    length: 50,
  }).notNull(),

  placeholder: varchar("placeholder", {
    length: 255,
  }),

  required: boolean("required")
    .default(false)
    .notNull(),

  order: integer("order")
    .default(0)
    .notNull(),

  options: jsonb("options"),

  validation: jsonb("validation"),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

export type SelectFormField = typeof formFieldsTable.$inferSelect;

export type InsertFormField = typeof formFieldsTable.$inferInsert;