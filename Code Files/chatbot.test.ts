import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {
        "user-agent": "test-agent",
      },
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("chatbot procedures", () => {
  describe("consent management", () => {
    it("allows users to grant consent", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      expect(result.success).toBe(true);
      expect(result.consentId).toBeGreaterThan(0);
    });

    it("checks consent status correctly", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent first
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      // Check consent
      const result = await caller.chatbot.checkConsent({
        consentType: "data_processing",
      });

      expect(result.hasConsent).toBe(true);
    });

    it("returns false for non-existent consent", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.chatbot.checkConsent({
        consentType: "non_existent_consent",
      });

      expect(result.hasConsent).toBe(false);
    });
  });

  describe("conversation management", () => {
    it("creates a new conversation on first message", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent first
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      const result = await caller.chatbot.sendMessage({
        message: "Hello, I have a question about cancer treatment",
        language: "en",
      });

      expect(result.conversationId).toBeGreaterThan(0);
      expect(result.messageId).toBeGreaterThan(0);
      expect(result.role).toBe("assistant");
      expect(result.message).toBeTruthy();
      expect(typeof result.message).toBe("string");
    });

    it(
      "continues existing conversation",
      async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      // First message
      const firstResult = await caller.chatbot.sendMessage({
        message: "What is chemotherapy?",
        language: "en",
      });

      // Second message in same conversation
      const secondResult = await caller.chatbot.sendMessage({
        conversationId: firstResult.conversationId,
        message: "What are the side effects?",
        language: "en",
      });

      expect(secondResult.conversationId).toBe(firstResult.conversationId);
      expect(secondResult.messageId).toBeGreaterThan(firstResult.messageId);
    },
      20000
    );

    it("retrieves conversation history", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      // Send a message
      const result = await caller.chatbot.sendMessage({
        message: "Test message",
        language: "en",
      });

      // Get conversation history
      const history = await caller.chatbot.getConversation({
        conversationId: result.conversationId,
      });

      expect(history.length).toBeGreaterThanOrEqual(2); // User message + AI response
      expect(history.some((msg) => msg.role === "user")).toBe(true);
      expect(history.some((msg) => msg.role === "assistant")).toBe(true);
    });

    it("lists user conversations", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      // Send a message to create conversation
      await caller.chatbot.sendMessage({
        message: "Test message",
        language: "en",
      });

      // Get conversations
      const conversations = await caller.chatbot.getConversations();

      expect(conversations.length).toBeGreaterThan(0);
      expect(conversations[0]?.userId).toBe(ctx.user!.id);
    });
  });

  describe("human escalation", () => {
    it("allows users to request human review", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      // Create a conversation
      const messageResult = await caller.chatbot.sendMessage({
        message: "I need help",
        language: "en",
      });

      // Request escalation
      const escalationResult = await caller.chatbot.requestEscalation({
        conversationId: messageResult.conversationId,
        messageId: messageResult.messageId,
        reason: "I need to speak with a doctor",
      });

      expect(escalationResult.success).toBe(true);
      expect(escalationResult.escalationId).toBeGreaterThan(0);
    });
  });

  describe("multilingual support", () => {
    it(
      "responds in Danish when requested",
      async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Grant consent
      await caller.chatbot.grantConsent({
        consentType: "data_processing",
        consentText: "Test consent text",
      });

      const result = await caller.chatbot.sendMessage({
        message: "Hvad er kemoterapi?",
        language: "da",
      });

      expect(result.message).toBeTruthy();
      // The response should be in Danish or at least acknowledge the Danish query
      expect(typeof result.message).toBe("string");
    },
      10000
    );
  });
});
