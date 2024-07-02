import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.db.post.findUnique({
          where: { id: input.id },
        });

        if (!data) {
          throw new Error("Post not found");
        }

        const result = z
          .object({
            id: z.bigint(),
            created_at: z.date(),
            name: z.string().nullable(),
          })
          .parse({
            id: data.id,
            created_at: data.created_at,
            name: data.name,
          });
        return result;
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Zod 유효성 검사 오류 처리
          return { error: "Invalid input", details: error.errors };
        } else {
          // 기타 오류 처리
          return { error };
        }
      }
    }),
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
});
