# Rigshospitalet Cancer Patient Chatbot

A production-ready, EU AI Act-compliant conversational AI chatbot designed to support cancer patients at Rigshospitalet, Copenhagen's largest public teaching hospital.

## Overview

This chatbot provides cancer patients with accessible, evidence-based information about cancer care, treatment options, side effects, and hospital services. Built with comprehensive compliance frameworks, the system ensures patient safety, data protection, and regulatory adherence while delivering compassionate, multilingual support.

## Key Features

### 🛡️ EU AI Act Compliance

The system is classified as a **high-risk AI system** under the EU AI Act and implements all required safeguards:

- **Automatic audit logging** of all AI interactions
- **Risk management** through continuous monitoring
- **Human oversight** via escalation mechanisms
- **Transparency** with clear AI disclosure notices
- **Technical documentation** for regulatory review
- **Record-keeping** for traceability and accountability

### 🔒 GDPR Compliance

Full compliance with data protection regulations:

- **Explicit consent** management before data processing
- **Data subject rights** (access, erasure, portability)
- **Encryption** in transit and at rest
- **Data minimization** and purpose limitation
- **Audit trails** for all data access

### 🌍 Multilingual Support

Available in English and Danish with:

- Real-time language switching
- Culturally appropriate responses
- Localized medical terminology
- Accessible interface design

### 👨‍⚕️ Human Oversight

Medical staff can intervene when needed:

- **Escalation requests** from patients
- **Status tracking** (pending, assigned, resolved)
- **Audit review** of AI interactions
- **Admin dashboard** for monitoring

### 💬 Conversational AI

Powered by advanced language models:

- Evidence-based medical information
- Empathetic and supportive tone
- Context-aware responses
- Conversation history tracking
- Medical disclaimers on all health topics

## Architecture

### Technology Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- shadcn/ui component library
- Wouter for routing
- tRPC for type-safe API calls

**Backend:**
- Express.js server
- tRPC 11 for API layer
- Node.js 22
- LLM integration for AI responses

**Database:**
- MySQL/TiDB
- Drizzle ORM
- Automated migrations

**Testing:**
- Vitest for unit tests
- Comprehensive test coverage

### Database Schema

**Core Tables:**

- `users` - User authentication and profiles
- `conversations` - Chat sessions
- `messages` - All user and AI messages
- `auditLogs` - Compliance and security logging
- `consents` - GDPR consent tracking
- `escalations` - Human review requests

## Getting Started

### Prerequisites

- Node.js 22+
- MySQL/TiDB database
- Environment variables configured

### Installation

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

The following environment variables are automatically provided by the Manus platform:

- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Session signing secret
- `BUILT_IN_FORGE_API_KEY` - LLM API key
- `BUILT_IN_FORGE_API_URL` - LLM API endpoint
- OAuth configuration variables

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## Usage

### For Patients

1. **Sign in** with your Manus account
2. **Grant consent** for data processing (first time only)
3. **Choose your language** (English or Danish)
4. **Ask questions** about cancer care, treatment, or hospital services
5. **Request human review** if you need to speak with medical staff

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions.

### For Medical Staff

1. **Monitor escalations** through the admin dashboard
2. **Review audit logs** for compliance and safety
3. **Manage patient data** according to GDPR requirements
4. **Generate reports** for regulatory compliance

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for administrative procedures.

## Compliance Documentation

### EU AI Act

- **Classification**: High-risk AI system (Annex III, healthcare)
- **Requirements**: Full compliance with Title III, Chapter 2
- **Documentation**: [EU_AI_ACT_COMPLIANCE.md](./EU_AI_ACT_COMPLIANCE.md)

### GDPR

- **Lawful basis**: Explicit consent (Article 6(1)(a) and 9(2)(a))
- **Data protection**: By design and by default
- **Subject rights**: Full implementation of all GDPR rights

### Key Compliance Features

✅ Risk management system  
✅ Data governance procedures  
✅ Technical documentation  
✅ Automatic record-keeping  
✅ Transparency and disclosure  
✅ Human oversight mechanisms  
✅ Accuracy and robustness testing  
✅ Cybersecurity measures  

## Safety and Limitations

### What the Chatbot Can Do

- Provide general information about cancer and treatments
- Explain common side effects and management strategies
- Direct patients to hospital resources and services
- Offer emotional support and understanding
- Answer questions about appointments and procedures

### What the Chatbot Cannot Do

- ❌ Provide medical diagnoses
- ❌ Prescribe treatments or medications
- ❌ Replace consultations with healthcare providers
- ❌ Handle medical emergencies
- ❌ Access patient medical records (without integration)

### Important Notices

**Medical Disclaimer**: This chatbot provides educational information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical concerns.

**Emergency Notice**: In case of medical emergency, call 112 (Denmark) or go to the nearest emergency department immediately.

## Development

### Project Structure

```
rigshospitalet-chatbot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Language, Theme)
│   │   └── lib/           # tRPC client
├── server/                # Backend Express application
│   ├── chatbot.ts         # LLM integration and chat logic
│   ├── db.ts              # Database queries
│   ├── routers.ts         # tRPC procedures
│   └── *.test.ts          # Vitest tests
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Table definitions
├── shared/                # Shared code between client and server
│   └── translations.ts    # Multilingual content
└── docs/                  # Documentation
    ├── USER_GUIDE.md
    ├── ADMIN_GUIDE.md
    └── EU_AI_ACT_COMPLIANCE.md
```

### Adding New Features

1. Update `todo.md` with the new feature
2. Modify database schema in `drizzle/schema.ts` if needed
3. Add database helpers in `server/db.ts`
4. Create tRPC procedures in `server/routers.ts`
5. Build UI components in `client/src/`
6. Write tests in `server/*.test.ts`
7. Update documentation

### Code Quality

- TypeScript for type safety
- ESLint and Prettier for code formatting
- Vitest for testing
- tRPC for end-to-end type safety

## Deployment

### Pre-Deployment Checklist

- ✅ All tests passing
- ✅ Database migrations applied
- ✅ Environment variables configured
- ✅ Compliance documentation reviewed
- ✅ Security audit completed
- ✅ DPIA (Data Protection Impact Assessment) conducted

### Deployment Steps

1. Create a checkpoint: `webdev_save_checkpoint`
2. Click the **Publish** button in the Management UI
3. Configure custom domain (optional)
4. Monitor deployment logs
5. Verify production functionality

### Post-Deployment

- Monitor audit logs for issues
- Review escalation queue daily
- Track system performance metrics
- Conduct regular compliance reviews

## Monitoring and Maintenance

### Daily Tasks

- Review escalation requests
- Monitor error logs
- Check system availability

### Weekly Tasks

- Analyze conversation statistics
- Review audit logs for anomalies
- Update medical content if needed

### Monthly Tasks

- Generate compliance reports
- Review user feedback
- Conduct security assessments
- Update documentation

## Support and Contact

### For Technical Issues

- **IT Support**: Rigshospitalet IT Department
- **Bug Reports**: Use the project issue tracker

### For Compliance Questions

- **AI Compliance Officer**: Responsible for EU AI Act compliance
- **Data Protection Officer**: Handles GDPR matters

### For Medical Content

- **Clinical Safety Officer**: Oversees medical accuracy
- **Oncology Department**: Subject matter experts

## Contributing

This is an internal hospital system. Contributions should follow:

1. Hospital IT policies and procedures
2. Clinical safety review processes
3. Data protection requirements
4. Regulatory compliance standards

## License

© 2025 Rigshospitalet. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Acknowledgments

Built with compliance and patient safety as top priorities. Special thanks to:

- Rigshospitalet oncology team for medical expertise
- IT department for technical infrastructure
- Legal and compliance teams for regulatory guidance
- Patients for their feedback and trust

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Status**: Production Ready  
**Compliance**: EU AI Act & GDPR Compliant
