export const translations = {
  en: {
    // AI Disclosure
    aiDisclosure: "⚠️ **AI System Notice**: You are communicating with an AI chatbot. This system is designed to provide general cancer-related information and support, but it is **not a substitute for professional medical advice, diagnosis, or treatment**.",
    
    // Medical Disclaimer
    medicalDisclaimer: "**Medical Disclaimer**: The information provided by this chatbot is for educational purposes only. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read here.",
    
    // Consent
    consentTitle: "Data Processing Consent",
    consentText: "To provide you with personalized support, we need to process your health-related data. Your data will be:\n\n- Stored securely and encrypted\n- Used only to provide chatbot services\n- Retained according to hospital policies\n- Protected under GDPR and EU AI Act\n\nYou can withdraw consent at any time.",
    consentAgree: "I understand and consent",
    consentDecline: "I do not consent",
    consentRequired: "Consent is required to use this service",
    
    // Chat Interface
    chatTitle: "Rigshospitalet Cancer Support",
    chatPlaceholder: "Type your question here...",
    chatSend: "Send",
    chatNewConversation: "New Conversation",
    chatHistory: "Conversation History",
    chatLoading: "Thinking...",
    chatError: "An error occurred. Please try again.",
    chatWelcome: "Hello! I'm here to help answer your questions about cancer care. How can I assist you today?",
    
    // Human Escalation
    escalationButton: "Request Human Review",
    escalationTitle: "Request Human Medical Staff Review",
    escalationReason: "Please describe why you need human assistance:",
    escalationSubmit: "Submit Request",
    escalationSuccess: "Your request has been submitted. A medical staff member will review it soon.",
    escalationError: "Failed to submit request. Please try again.",
    
    // Language
    language: "Language",
    languageEnglish: "English",
    languageDanish: "Dansk",
    
    // Common
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
    loading: "Loading...",
    
    // System Messages
    systemPrompt: `You are a compassionate AI assistant for cancer patients at Rigshospitalet, Copenhagen's largest public teaching hospital.

Your role:
- Provide accurate, evidence-based information about cancer care
- Offer emotional support and understanding
- Help patients navigate hospital services
- Answer questions about treatments, side effects, and recovery
- Direct patients to appropriate resources

Guidelines:
- Always be empathetic and supportive
- Use clear, simple language
- Acknowledge uncertainty when appropriate
- Encourage patients to discuss concerns with their medical team
- Never provide specific medical diagnoses or treatment recommendations
- Respect patient privacy and dignity

When you don't know something, say so and suggest they speak with their healthcare provider.`,
  },
  
  da: {
    // AI Disclosure
    aiDisclosure: "⚠️ **AI-system meddelelse**: Du kommunikerer med en AI-chatbot. Dette system er designet til at give generel kræftrelateret information og støtte, men det er **ikke en erstatning for professionel medicinsk rådgivning, diagnose eller behandling**.",
    
    // Medical Disclaimer
    medicalDisclaimer: "**Medicinsk ansvarsfraskrivelse**: Informationen fra denne chatbot er kun til uddannelsesformål. Søg altid råd fra din læge eller anden kvalificeret sundhedsudbyder med spørgsmål om en medicinsk tilstand. Ignorer aldrig professionel medicinsk rådgivning eller forsinke søgning af den på grund af noget, du har læst her.",
    
    // Consent
    consentTitle: "Samtykke til databehandling",
    consentText: "For at give dig personlig støtte skal vi behandle dine sundhedsrelaterede data. Dine data vil blive:\n\n- Gemt sikkert og krypteret\n- Kun brugt til at levere chatbot-tjenester\n- Opbevaret i henhold til hospitalets politikker\n- Beskyttet under GDPR og EU AI Act\n\nDu kan til enhver tid trække dit samtykke tilbage.",
    consentAgree: "Jeg forstår og giver samtykke",
    consentDecline: "Jeg giver ikke samtykke",
    consentRequired: "Samtykke er påkrævet for at bruge denne tjeneste",
    
    // Chat Interface
    chatTitle: "Rigshospitalet Kræftstøtte",
    chatPlaceholder: "Skriv dit spørgsmål her...",
    chatSend: "Send",
    chatNewConversation: "Ny samtale",
    chatHistory: "Samtalehistorik",
    chatLoading: "Tænker...",
    chatError: "Der opstod en fejl. Prøv venligst igen.",
    chatWelcome: "Hej! Jeg er her for at hjælpe med at besvare dine spørgsmål om kræftbehandling. Hvordan kan jeg hjælpe dig i dag?",
    
    // Human Escalation
    escalationButton: "Anmod om menneskelig gennemgang",
    escalationTitle: "Anmod om gennemgang af medicinsk personale",
    escalationReason: "Beskriv venligst hvorfor du har brug for menneskelig assistance:",
    escalationSubmit: "Indsend anmodning",
    escalationSuccess: "Din anmodning er blevet indsendt. En medarbejder vil gennemgå den snart.",
    escalationError: "Kunne ikke indsende anmodning. Prøv venligst igen.",
    
    // Language
    language: "Sprog",
    languageEnglish: "English",
    languageDanish: "Dansk",
    
    // Common
    close: "Luk",
    cancel: "Annuller",
    confirm: "Bekræft",
    loading: "Indlæser...",
    
    // System Messages
    systemPrompt: `Du er en medfølende AI-assistent for kræftpatienter på Rigshospitalet, Københavns største offentlige undervisningshospital.

Din rolle:
- Giv nøjagtig, evidensbaseret information om kræftbehandling
- Tilbyd følelsesmæssig støtte og forståelse
- Hjælp patienter med at navigere i hospitalets tjenester
- Besvar spørgsmål om behandlinger, bivirkninger og bedring
- Henvis patienter til passende ressourcer

Retningslinjer:
- Vær altid empatisk og støttende
- Brug klart, simpelt sprog
- Anerkend usikkerhed når det er passende
- Opfordr patienter til at diskutere bekymringer med deres medicinske team
- Giv aldrig specifikke medicinske diagnoser eller behandlingsanbefalinger
- Respekter patientens privatliv og værdighed

Når du ikke ved noget, så sig det og foreslå at de taler med deres sundhedsudbyder.`,
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
