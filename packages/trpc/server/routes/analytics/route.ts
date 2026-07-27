import { z } from "../../schema";
import { publicProcedure, router } from "../../trpc";
import { db } from "@repo/database";
import { analyticsTable } from "@repo/database";
import { generatePath } from "../../utils/path-generator";
import { eq } from "drizzle-orm";

const TAGS = ["Analytics"];
const getPath = generatePath("/analytics");

export const analyticsRouter = router({

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

      const [analytics] = await db
        .select()
        .from(analyticsTable)
        .where(eq(analyticsTable.formId, input.formId));

      return analytics;
    }),


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
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {

      const [analytics] = await db
        .insert(analyticsTable)
        .values({
          formId: input.formId,
        })
        .returning();

      return analytics;
    }),


  updateViews: publicProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: getPath("/views/:formId"),
        tags: TAGS,
      },
    })
    .input(
      z.object({
        formId: z.string().uuid(),
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {

      const [existing] = await db
        .select()
        .from(analyticsTable)
        .where(eq(analyticsTable.formId, input.formId));


      if (!existing) {
        return null;
      }


      const [updated] = await db
        .update(analyticsTable)
        .set({
          totalViews: existing.totalViews + 1,
        })
        .where(eq(analyticsTable.formId, input.formId))
        .returning();


      return updated;
    }),

});