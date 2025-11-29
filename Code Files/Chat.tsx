import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import { useState, useEffect, useRef } from "react";
import { AlertCircle, Send, MessageSquare, Globe, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function Chat() {
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showEscalationDialog, setShowEscalationDialog] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [escalationReason, setEscalationReason] = useState("");
  const [conversationId, setConversationId] = useState<number | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: consentData } = trpc.chatbot.checkConsent.useQuery(
    { consentType: "data_processing" },
    { enabled: !!user }
  );

  const { data: conversations } = trpc.chatbot.getConversations.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: messages, refetch: refetchMessages } = trpc.chatbot.getConversation.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId }
  );

  const grantConsentMutation = trpc.chatbot.grantConsent.useMutation({
    onSuccess: () => {
      setShowConsentDialog(false);
      toast.success("Consent granted");
    },
  });

  const sendMessageMutation = trpc.chatbot.sendMessage.useMutation({
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      setCurrentMessage("");
      refetchMessages();
    },
    onError: (error) => {
      toast.error(t.chatError);
      console.error(error);
    },
  });

  const requestEscalationMutation = trpc.chatbot.requestEscalation.useMutation({
    onSuccess: () => {
      setShowEscalationDialog(false);
      setEscalationReason("");
      toast.success(t.escalationSuccess);
    },
    onError: () => {
      toast.error(t.escalationError);
    },
  });

  useEffect(() => {
    if (user && consentData && !consentData.hasConsent) {
      setShowConsentDialog(true);
    }
  }, [user, consentData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{t.loading}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="p-8 max-w-md text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold mb-4">{t.chatTitle}</h1>
          <p className="mb-6 text-muted-foreground">
            Please sign in to access the cancer support chatbot.
          </p>
          <Button asChild size="lg">
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    sendMessageMutation.mutate({
      conversationId,
      message: currentMessage,
      language,
    });
  };

  const handleGrantConsent = () => {
    grantConsentMutation.mutate({
      consentType: "data_processing",
      consentText: t.consentText,
    });
  };

  const handleRequestEscalation = () => {
    if (!conversationId) {
      toast.error("Please start a conversation first");
      return;
    }
    if (!escalationReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    requestEscalationMutation.mutate({
      conversationId,
      reason: escalationReason,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">{t.chatTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "da" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "en" ? t.languageDanish : t.languageEnglish}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEscalationDialog(true)}
              disabled={!conversationId}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {t.escalationButton}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <Card className="flex-1 flex flex-col overflow-hidden shadow-lg">
          {/* AI Disclosure Banner */}
          <div className="bg-amber-50 border-b border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <Streamdown>{t.aiDisclosure}</Streamdown>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            {!messages || messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">{t.chatWelcome}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <Streamdown>{msg.content}</Streamdown>
                    </div>
                  </div>
                ))}
                {sendMessageMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-white border shadow-sm">
                      <p className="text-muted-foreground">{t.chatLoading}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-4 bg-gray-50">
            <div className="flex gap-2">
              <Input
                placeholder={t.chatPlaceholder}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={sendMessageMutation.isPending}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || sendMessageMutation.isPending}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Consent Dialog */}
      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.consentTitle}</DialogTitle>
            <DialogDescription>
              <Streamdown>{t.consentText}</Streamdown>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsentDialog(false)}>
              {t.consentDecline}
            </Button>
            <Button onClick={handleGrantConsent} disabled={grantConsentMutation.isPending}>
              {t.consentAgree}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalation Dialog */}
      <Dialog open={showEscalationDialog} onOpenChange={setShowEscalationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.escalationTitle}</DialogTitle>
            <DialogDescription>{t.escalationReason}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={escalationReason}
            onChange={(e) => setEscalationReason(e.target.value)}
            placeholder={t.escalationReason}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEscalationDialog(false)}>
              {t.cancel}
            </Button>
            <Button
              onClick={handleRequestEscalation}
              disabled={requestEscalationMutation.isPending}
            >
              {t.escalationSubmit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
