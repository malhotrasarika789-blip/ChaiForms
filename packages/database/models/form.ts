import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";

export const formsTable = pgTable("forms", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  creatorId: uuid("creator_id")
    .references(() => usersTable.id)
    .notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description"),

  slug: varchar("slug", {
    length: 100,
  })
    .unique()
    .notNull(),

  status: varchar("status", {
    length: 20,
  })
    .default("DRAFT")
    .notNull(),

  visibility: varchar("visibility", {
    length: 20,
  })
    .default("UNLISTED")
    .notNull(),

  theme: jsonb("theme"),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date()),
});

export type SelectForm = typeof formsTable.$inferSelect;
export type InsertForm = typeof formsTable.$inferInsert;