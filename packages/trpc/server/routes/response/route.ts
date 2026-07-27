import { z } from "../../schema";
import { publicProcedure, router } from "../../trpc";
import { db } from "@repo/database";
import { responsesTable } from "@repo/database";
import { generatePath } from "../../utils/path-generator";
import { eq } from "drizzle-orm";

const TAGS = ["Responses"];
const getPath = generatePath("/responses");

export const responseRouter = router({

  submit: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submit"),
        tags: TAGS,
      },
    })
    .input(
      z.object({
        formId: z.string().uuid(),
        data: z.any(),
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {

      const [response] = await db
        .insert(responsesTable)
        .values({
          formId: input.formId,
          data: input.data,
        })
        .returning();

      return response;
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
        .from(responsesTable)
        .where(eq(responsesTable.formId, input.formId));

    }),

});