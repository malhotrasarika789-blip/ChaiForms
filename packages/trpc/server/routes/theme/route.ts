import { z } from "../../schema";
import { publicProcedure, router } from "../../trpc";
import { db } from "@repo/database";
import { themesTable } from "@repo/database";
import { generatePath } from "../../utils/path-generator";
import { eq } from "drizzle-orm";

const TAGS = ["Themes"];
const getPath = generatePath("/themes");

export const themeRouter = router({

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
        formId: z.string().uuid(),
        name: z.string(),
        config: z.any(),
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {

      const [theme] = await db
        .insert(themesTable)
        .values({
          formId: input.formId,
          name: input.name,
          config: input.config,
        })
        .returning();

      return theme;
    }),


  getByForm: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/form/:formId"),
        tags: TAGS,
      },
    })
    .input(
      z.object({
        formId: z.string().uuid(),
      })
    )
    .output(z.any())
    .query(async ({ input }) => {

      return await db
        .select()
        .from(themesTable)
        .where(eq(themesTable.formId, input.formId));

    }),


  delete: publicProcedure
    .meta({
      openapi: {
        method: "DELETE",
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
    .mutation(async ({ input }) => {

      await db
        .delete(themesTable)
        .where(eq(themesTable.id, input.id));

      return {
        success: true,
      };
    }),

});