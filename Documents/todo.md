# Rigshospitalet Cancer Patient Chatbot - TODO

## Database Schema & Compliance Infrastructure
- [x] Design database schema for conversations, audit logs, and consent tracking
- [x] Create conversation messages table with user/AI roles
- [x] Create audit log table for compliance tracking
- [x] Create consent records table for GDPR compliance
- [x] Create escalation requests table for human oversight
- [x] Push database schema changes

## Backend Implementation
- [x] Implement chatbot conversation procedure with LLM integration
- [x] Add medical disclaimer and AI disclosure to all responses
- [x] Implement conversation history retrieval
- [x] Create consent management procedures (grant, revoke, check)
- [x] Build audit logging system for all AI interactions
- [x] Implement human escalation request procedure
- [x] Add multilingual support (Danish and English)
- [x] Create safety controls and content filtering

## Frontend UI
- [x] Design and implement chat interface with accessibility features
- [x] Add language switcher (Danish/English)
- [x] Create consent dialog for first-time users
- [x] Implement medical disclaimer display
- [x] Build conversation history view
- [x] Add human escalation button
- [x] Implement responsive design for mobile devices
- [x] Add WCAG-compliant accessibility features
- [x] Create loading states and error handling

## Compliance Features
- [x] Implement automatic audit trail logging
- [x] Create transparency disclosure system
- [x] Build human oversight escalation workflow
- [x] Add data retention and deletion mechanisms
- [x] Implement session management and security
- [x] Create compliance documentation

## Testing & Validation
- [x] Write vitest tests for chatbot procedures
- [x] Test consent management flow
- [x] Test audit logging completeness
- [x] Test multilingual functionality
- [x] Test accessibility compliance
- [x] Validate EU AI Act compliance requirements
- [x] Test human escalation workflow

## Documentation
- [x] Create user guide for patients
- [x] Create admin guide for medical staff
- [x] Create EU AI Act compliance documentation
- [x] Document deployment procedures