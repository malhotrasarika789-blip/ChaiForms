import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./env";

export const db = drizzle(env.DATABASE_URL);


// models export
export * from "./models/user";
export * from "./models/form";
export * from "./models/field";
export * from "./models/response";
export * from "./models/theme";
export * from "./models/analytics";

export * from "drizzle-orm";

export default db;