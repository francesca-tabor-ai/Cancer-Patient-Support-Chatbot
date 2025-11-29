import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chatbot: router({
    // Start or continue a conversation
    sendMessage: protectedProcedure
      .input(
        z.object({
          conversationId: z.number().optional(),
          message: z.string().min(1),
          language: z.enum(["en", "da"]).default("en"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { sendMessage } = await import("./chatbot");
        return sendMessage(ctx, input);
      }),

    // Get conversation history
    getConversation: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ ctx, input }) => {
        const { getConversationMessages } = await import("./db");
        return getConversationMessages(input.conversationId);
      }),

    // Get user's conversations
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      const { getUserConversations } = await import("./db");
      return getUserConversations(ctx.user.id);
    }),

    // Grant consent
    grantConsent: protectedProcedure
      .input(
        z.object({
          consentType: z.string(),
          consentText: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { createConsent, createAuditLog } = await import("./db");
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] as string || "unknown";
        
        const consentId = await createConsent({
          userId: ctx.user.id,
          consentType: input.consentType,
          consentText: input.consentText,
          granted: 1,
          ipAddress,
        });

        await createAuditLog({
          userId: ctx.user.id,
          eventType: "consent_granted",
          eventData: JSON.stringify({ consentType: input.consentType, consentId }),
          ipAddress,
          userAgent: ctx.req.headers["user-agent"],
        });

        return { success: true, consentId };
      }),

    // Check consent status
    checkConsent: protectedProcedure
      .input(z.object({ consentType: z.string() }))
      .query(async ({ ctx, input }) => {
        const { getUserConsent } = await import("./db");
        const consent = await getUserConsent(ctx.user.id, input.consentType);
        return { hasConsent: !!consent };
      }),

    // Request human escalation
    requestEscalation: protectedProcedure
      .input(
        z.object({
          conversationId: z.number(),
          messageId: z.number().optional(),
          reason: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { createEscalation, createAuditLog } = await import("./db");
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] as string || "unknown";

        const escalationId = await createEscalation({
          userId: ctx.user.id,
          conversationId: input.conversationId,
          messageId: input.messageId,
          reason: input.reason,
          status: "pending",
        });

        await createAuditLog({
          userId: ctx.user.id,
          conversationId: input.conversationId,
          eventType: "escalation_requested",
          eventData: JSON.stringify({ escalationId, reason: input.reason }),
          ipAddress,
          userAgent: ctx.req.headers["user-agent"],
        });

        return { success: true, escalationId };
      }),
  }),
});

export type AppRouter = typeof appRouter;
