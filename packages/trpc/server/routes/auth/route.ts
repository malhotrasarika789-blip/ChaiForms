import { z, zodUndefinedModel } from "../../schema";
import { userService } from "../../services";
import { getAuthenticationMethodOutputSchema } from "@repo/services/user/model";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { db } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";


const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");


export const authRouter = router({

  getSupportedAuthenticationProviders: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/supported-providers"),
        tags: TAGS,
      },
    })
    .input(zodUndefinedModel)
    .output(z.readonly(z.array(getAuthenticationMethodOutputSchema)))
    .query(async () => {
      const supportedMethods =
        await userService.getAuthenticationMethods();

      return supportedMethods;
    }),

  signup: publicProcedure

    .input(
      z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )

    .mutation(async ({ input }) => {

      const existingUser = await db
        .select()
        .from(usersTable)
        .where(
          eq(usersTable.email, input.email)
        );


      if (existingUser.length > 0) {

        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });

      }



      const hashedPassword =
        await bcrypt.hash(
          input.password,
          10
        );



      const [user] = await db
        .insert(usersTable)
        .values({
          fullName: input.fullName,
          email: input.email,
          password: hashedPassword,
        })
        .returning();



      return {
        message: "Account created successfully",
        user,
      };

    }),

});