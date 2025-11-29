import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Shield, Globe, Heart, CheckCircle } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Rigshospitalet
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "da" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "en" ? "Dansk" : "English"}
            </Button>
            {user ? (
              <Button asChild>
                <Link href="/chat">{t.chatTitle}</Link>
              </Button>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <MessageSquare className="w-20 h-20 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            {language === "en"
              ? "Cancer Patient Support Chatbot"
              : "Chatbot til støtte for kræftpatienter"}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === "en"
              ? "Get answers to your questions about cancer care, treatment, and support services at Rigshospitalet."
              : "Få svar på dine spørgsmål om kræftbehandling, behandling og støttetjenester på Rigshospitalet."}
          </p>
          {user ? (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                {t.chatTitle}
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a href={getLoginUrl()}>
                {language === "en" ? "Get Started" : "Kom i gang"}
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">
              {language === "en" ? "EU AI Act Compliant" : "EU AI Act-kompatibel"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Built with full compliance to EU AI Act and GDPR requirements."
                : "Bygget med fuld overholdelse af EU AI Act og GDPR-krav."}
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Multilingual Support" : "Flersproget support"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Available in English and Danish for your convenience."
                : "Tilgængelig på engelsk og dansk for din bekvemmelighed."}
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Heart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Compassionate Care" : "Medfølende pleje"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Designed with empathy to support you through your cancer journey."
                : "Designet med empati til at støtte dig gennem din kræftrejse."}
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Human Oversight" : "Menneskelig tilsyn"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Request review by medical staff anytime for personalized support."
                : "Anmod om gennemgang af medicinsk personale når som helst."}
            </p>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border-y border-amber-200 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm text-amber-900">
            <strong>
              {language === "en" ? "Important Notice:" : "Vigtig meddelelse:"}
            </strong>{" "}
            {language === "en"
              ? "This chatbot provides general information and support. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical concerns."
              : "Denne chatbot giver generel information og støtte. Det er ikke en erstatning for professionel medicinsk rådgivning, diagnose eller behandling. Kontakt altid din sundhedsudbyder for medicinske bekymringer."}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2025 Rigshospitalet. {language === "en" ? "All rights reserved." : "Alle rettigheder forbeholdes."}
          </p>
        </div>
      </footer>
    </div>
  );
}
