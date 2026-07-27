import { z } from "../../schema";
import { publicProcedure, router } from "../../trpc";
import { db } from "@repo/database";
import { formFieldsTable } from "@repo/database";
import { generatePath } from "../../utils/path-generator";
import { eq } from "drizzle-orm";

const TAGS = ["Fields"];
const getPath = generatePath("/fields");

export const fieldRouter = router({

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
        label: z.string(),
        type: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        options: z.any().optional(),
        validation: z.any().optional(),
      })
    )
    .output(z.any())
    .mutation(async ({ input }) => {

      const [field] = await db
        .insert(formFieldsTable)
        .values({
          formId: input.formId,
          label: input.label,
          type: input.type,
          placeholder: input.placeholder,
          required: input.required ?? false,
          options: input.options,
          validation: input.validation,
        })
        .returning();

      return field;
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
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, input.formId));

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
        .delete(formFieldsTable)
        .where(eq(formFieldsTable.id, input.id));

      return {
        success: true,
      };
    }),

});