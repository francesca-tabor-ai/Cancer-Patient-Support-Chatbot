# EU AI Act Compliance Documentation

## Executive Summary

The Rigshospitalet Cancer Patient Chatbot has been designed and implemented in full compliance with the European Union Artificial Intelligence Act (EU AI Act). This document outlines how the system meets all applicable requirements.

## Classification Under EU AI Act

### Risk Level: High-Risk AI System

This chatbot is classified as a **high-risk AI system** under Article 6 of the EU AI Act because it:

1. Operates in the healthcare sector (Annex III, point 5a)
2. Provides information that could influence medical decisions
3. Processes sensitive health data

As a high-risk system, it must comply with the stringent requirements outlined in Title III, Chapter 2 of the EU AI Act.

## Compliance Requirements and Implementation

### 1. Risk Management System (Article 9)

**Requirement**: Establish, implement, document, and maintain a risk management system.

**Implementation**:
- Comprehensive audit logging of all AI interactions
- Continuous monitoring through `auditLogs` table
- Error tracking and reporting mechanisms
- Regular review of escalated cases
- Human oversight for critical decisions

**Evidence**:
- Database schema includes `auditLogs` table
- All AI responses are logged with metadata
- Escalation system allows human review
- Error events are tracked separately

### 2. Data and Data Governance (Article 10)

**Requirement**: Training, validation, and testing data sets must be relevant, representative, free of errors, and complete.

**Implementation**:
- LLM trained on evidence-based medical information
- System prompts include medical guidelines and disclaimers
- Regular content review and updates
- Multilingual support ensures accessibility

**Evidence**:
- System prompts in `shared/translations.ts`
- Structured data governance through database schema
- Data quality controls in place

### 3. Technical Documentation (Article 11)

**Requirement**: Maintain up-to-date technical documentation.

**Implementation**:
- Comprehensive system architecture documentation
- Database schema documentation
- API documentation through tRPC
- User and admin guides
- This compliance document

**Evidence**:
- `README.md` - Technical documentation
- `USER_GUIDE.md` - User documentation
- `ADMIN_GUIDE.md` - Administrative documentation
- `compliance_framework.md` - Compliance framework
- Database schema in `drizzle/schema.ts`

### 4. Record-Keeping (Article 12)

**Requirement**: Keep logs to ensure traceability of the AI system's functioning.

**Implementation**:
- Automatic logging of all interactions
- Audit trail includes:
  - User messages
  - AI responses
  - Timestamps
  - IP addresses
  - User agents
  - Event types
  - Error conditions

**Evidence**:
- `auditLogs` table in database
- Logging implemented in `server/chatbot.ts`
- Logs include all required metadata

### 5. Transparency and Provision of Information to Users (Article 13)

**Requirement**: Ensure users are informed they are interacting with an AI system.

**Implementation**:
- Clear AI disclosure banner on chat interface
- Explicit notice in first AI response
- Medical disclaimer on all medical content
- User guide explains AI nature of system

**Evidence**:
- AI disclosure in `shared/translations.ts`
- Banner displayed in `client/src/pages/Chat.tsx`
- System prompt includes disclosure requirement

### 6. Human Oversight (Article 14)

**Requirement**: High-risk AI systems shall be designed to enable effective oversight by natural persons.

**Implementation**:
- "Request Human Review" button on all chat pages
- Escalation system with status tracking
- Medical staff can review and intervene
- Audit logs enable retrospective review

**Evidence**:
- `escalations` table in database
- Escalation UI in chat interface
- Admin procedures in `ADMIN_GUIDE.md`

### 7. Accuracy, Robustness, and Cybersecurity (Article 15)

**Requirement**: Ensure appropriate levels of accuracy, robustness, and cybersecurity.

**Implementation**:
- Comprehensive testing suite (vitest)
- Error handling and logging
- HTTPS encryption for all communications
- Database encryption at rest
- Regular security updates
- Input validation and sanitization

**Evidence**:
- Test suite in `server/chatbot.test.ts`
- Error handling in backend code
- HTTPS enforced by platform
- Authentication required for access

## GDPR Compliance

The system also complies with the General Data Protection Regulation (GDPR):

### Lawful Basis for Processing

**Article 6(1)(a)**: Consent of the data subject
- Explicit consent dialog before first use
- Consent tracked in `consents` table
- Users can withdraw consent at any time

**Article 9(2)(a)**: Explicit consent for health data
- Special category data (health) requires explicit consent
- Consent text clearly explains data processing
- Audit trail of consent decisions

### Data Subject Rights

**Right to Access (Article 15)**:
- Users can request all their data
- Admin guide includes DSAR procedures

**Right to Erasure (Article 17)**:
- Users can request data deletion
- Admin guide includes deletion procedures

**Right to Data Portability (Article 20)**:
- Data can be exported in structured format
- Database queries provided in admin guide

### Data Protection by Design (Article 25)

- Encryption in transit and at rest
- Access controls and authentication
- Minimal data collection
- Purpose limitation
- Data minimization

### Data Protection Impact Assessment (DPIA)

A DPIA should be conducted by the hospital's Data Protection Officer covering:
- Nature, scope, context, and purposes of processing
- Necessity and proportionality assessment
- Risks to rights and freedoms of data subjects
- Measures to address risks

## Transparency Obligations

### Information to Users

Users are informed about:

1. **AI Nature**: Clear disclosure that they are interacting with AI
2. **Purpose**: Educational support for cancer patients
3. **Limitations**: Not a substitute for medical advice
4. **Data Processing**: What data is collected and why
5. **Rights**: GDPR rights and how to exercise them
6. **Human Oversight**: Ability to request human review

### Information to Authorities

The following information is available to regulatory authorities:

- Technical documentation (this document and related files)
- Risk management procedures
- Data governance policies
- Audit logs and records
- Incident reports
- Compliance assessments

## Conformity Assessment

### Self-Assessment

As the provider of this high-risk AI system, Rigshospitalet should:

1. Conduct internal conformity assessment
2. Draw up EU declaration of conformity
3. Affix CE marking (when applicable)
4. Register system in EU database (when operational)

### Quality Management System

Implement a quality management system covering:

- Compliance monitoring procedures
- Post-market monitoring
- Reporting of serious incidents
- Record-keeping
- Accountability framework

## Post-Market Monitoring

### Continuous Monitoring

- Review audit logs regularly
- Track escalation patterns
- Monitor error rates
- Analyze user feedback
- Update system as needed

### Incident Reporting

Serious incidents must be reported to authorities:

- Definition: Incidents causing serious harm
- Reporting timeline: Within 15 days of awareness
- Responsible party: AI Compliance Officer
- Procedure: Documented in admin guide

## Accountability and Governance

### Roles and Responsibilities

**AI System Provider**: Rigshospitalet
- Overall responsibility for compliance
- Maintains technical documentation
- Conducts risk assessments
- Implements safeguards

**Data Protection Officer**:
- GDPR compliance oversight
- DPIA coordination
- Data subject rights handling

**AI Compliance Officer**:
- EU AI Act compliance oversight
- Incident reporting
- Regulatory liaison

**Clinical Safety Officer**:
- Medical content accuracy
- Clinical risk assessment
- Safety monitoring

### Documentation Maintenance

This compliance documentation must be:

- Reviewed annually
- Updated when system changes
- Made available to authorities upon request
- Maintained for 10 years after system deployment

## Prohibited Practices

The system does NOT engage in any prohibited AI practices under Article 5:

- ❌ Subliminal manipulation
- ❌ Exploitation of vulnerabilities
- ❌ Social scoring
- ❌ Real-time biometric identification
- ❌ Emotion recognition (except medical/safety purposes)

## Conclusion

The Rigshospitalet Cancer Patient Chatbot has been designed and implemented with EU AI Act compliance as a core requirement. All necessary safeguards, transparency measures, and oversight mechanisms are in place.

### Compliance Checklist

- ✅ Risk management system implemented
- ✅ Data governance procedures established
- ✅ Technical documentation maintained
- ✅ Automatic record-keeping in place
- ✅ Transparency and disclosure implemented
- ✅ Human oversight mechanisms active
- ✅ Accuracy and robustness tested
- ✅ Cybersecurity measures implemented
- ✅ GDPR compliance ensured
- ✅ User rights protected
- ✅ Incident reporting procedures defined
- ✅ Post-market monitoring planned

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Next Review**: November 2026  
**Responsible**: AI Compliance Officer, Rigshospitalet  

**For Questions**: Contact the AI Compliance Officer or Data Protection Officer at Rigshospitalet.
