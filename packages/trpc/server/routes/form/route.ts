import { z } from "../../schema";
import { publicProcedure, router } from "../../trpc";
import { db } from "@repo/database";
import { formsTable } from "@repo/database";
import { generatePath } from "../../utils/path-generator";
import { eq } from "drizzle-orm";

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

export const formRouter = router({
  create: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
      },
    })
    .input(
      z.object({
        creatorId: z.string().uuid(),
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {
      const slug =
        input.title.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        Date.now();

      const [form] = await db
        .insert(formsTable)
        .values({
          creatorId: input.creatorId,
          title: input.title,
          description: input.description,
          slug,
        })
        .returning();

      return form;
    }),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/:id"),
        tags: TAGS,
      },
    })
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .output(z.any())
    .query(async ({ input }) => {
      const [form] = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.id));

      return form;
    }),
});