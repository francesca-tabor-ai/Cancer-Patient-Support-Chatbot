import { invokeLLM } from "./_core/llm";
import type { TrpcContext } from "./_core/context";
import {
  createConversation,
  createMessage,
  getConversationMessages,
  createAuditLog,
  getConversation,
} from "./db";
import { translations } from "../shared/translations";

type SendMessageInput = {
  conversationId?: number;
  message: string;
  language: "en" | "da";
};

export async function sendMessage(
  ctx: TrpcContext,
  input: SendMessageInput
) {
  const { conversationId: existingConversationId, message, language } = input;
  const userId = ctx.user!.id;
  const ipAddress = ctx.req.ip || (ctx.req.headers["x-forwarded-for"] as string) || "unknown";
  const userAgent = ctx.req.headers["user-agent"];

  // Get or create conversation
  let conversationId = existingConversationId;
  if (!conversationId) {
    conversationId = await createConversation({
      userId,
      language,
      consentGiven: 1, // Consent should be checked before calling this
    });

    await createAuditLog({
      userId,
      conversationId,
      eventType: "conversation_started",
      eventData: JSON.stringify({ language }),
      ipAddress,
      userAgent,
    });
  } else {
    // Verify conversation belongs to user
    const conversation = await getConversation(conversationId);
    if (!conversation || conversation.userId !== userId) {
      throw new Error("Unauthorized access to conversation");
    }
  }

  // Save user message
  const userMessageId = await createMessage({
    conversationId,
    role: "user",
    content: message,
    language,
  });

  await createAuditLog({
    userId,
    conversationId,
    messageId: userMessageId,
    eventType: "user_message",
    eventData: JSON.stringify({ messageLength: message.length }),
    ipAddress,
    userAgent,
  });

  // Get conversation history
  const history = await getConversationMessages(conversationId);

  // Build messages for LLM
  const systemPrompt = translations[language].systemPrompt;
  const aiDisclosure = translations[language].aiDisclosure;
  const medicalDisclaimer = translations[language].medicalDisclaimer;

  const messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [
    {
      role: "system",
      content: `${systemPrompt}

IMPORTANT COMPLIANCE REQUIREMENTS:
1. You MUST include the AI disclosure at the start of your first response
2. You MUST include the medical disclaimer when discussing any medical topics
3. Always encourage users to consult with their healthcare team for specific medical advice
4. Be empathetic, supportive, and respectful
5. Use ${language === "da" ? "Danish" : "English"} language

AI Disclosure to include in first response:
${aiDisclosure}

Medical Disclaimer to include when relevant:
${medicalDisclaimer}`,
    },
  ];

  // Add conversation history (excluding current message which is already in history)
  for (const msg of history.slice(0, -1)) {
    if (msg.role === "user" || msg.role === "assistant") {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }
  }

  // Add current user message
  messages.push({
    role: "user",
    content: message,
  });

  try {
    // Call LLM
    const response = await invokeLLM({
      messages,
    });

    const assistantMessage = 
      (typeof response.choices[0]?.message?.content === "string"
        ? response.choices[0].message.content
        : "I apologize, but I couldn't generate a response. Please try again.");

    // Save assistant response
    const assistantMessageId = await createMessage({
      conversationId,
      role: "assistant",
      content: assistantMessage,
      language,
    });

    await createAuditLog({
      userId,
      conversationId,
      messageId: assistantMessageId,
      eventType: "ai_response",
      eventData: JSON.stringify({
        responseLength: assistantMessage.length,
        model: response.model,
      }),
      ipAddress,
      userAgent,
    });

    return {
      conversationId,
      messageId: assistantMessageId,
      message: assistantMessage,
      role: "assistant" as const,
    };
  } catch (error) {
    await createAuditLog({
      userId,
      conversationId,
      eventType: "ai_error",
      eventData: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      ipAddress,
      userAgent,
    });

    throw error;
  }
}
