# Rigshospitalet Cancer Patient Chatbot - Admin Guide

## Overview

This guide is for medical staff and administrators responsible for managing and monitoring the Rigshospitalet Cancer Patient Chatbot system.

## System Architecture

The chatbot system consists of:

- **Frontend**: React-based web interface
- **Backend**: Express.js server with tRPC API
- **Database**: MySQL/TiDB for data storage
- **LLM Integration**: AI language model for generating responses
- **Compliance Layer**: Audit logging and consent management

## Database Schema

### Core Tables

#### `users`
Stores user authentication and profile information.

#### `conversations`
Tracks individual chat sessions between patients and the AI.

#### `messages`
Stores all messages (user and AI) within conversations.

#### `auditLogs`
Records all system events for compliance and security monitoring.

#### `consents`
Tracks patient consent for data processing (GDPR compliance).

#### `escalations`
Manages requests for human review of AI interactions.

## Accessing the System

### Database Access

The database can be accessed through the Management UI:

1. Navigate to the project dashboard
2. Click "Database" in the sidebar
3. Use the CRUD interface to view and manage data

For direct SQL access, use the connection information provided in the Database settings panel.

### Audit Logs

To view audit logs:

```sql
SELECT * FROM auditLogs 
WHERE eventType = 'ai_response' 
ORDER BY createdAt DESC 
LIMIT 100;
```

Common event types:
- `conversation_started`
- `user_message`
- `ai_response`
- `ai_error`
- `consent_granted`
- `escalation_requested`

## Managing Escalations

### Viewing Pending Escalations

```sql
SELECT 
  e.id,
  e.userId,
  u.name,
  u.email,
  e.conversationId,
  e.reason,
  e.createdAt
FROM escalations e
JOIN users u ON e.userId = u.id
WHERE e.status = 'pending'
ORDER BY e.createdAt ASC;
```

### Assigning an Escalation

```sql
UPDATE escalations 
SET status = 'assigned', 
    assignedTo = <staff_user_id>
WHERE id = <escalation_id>;
```

### Resolving an Escalation

```sql
UPDATE escalations 
SET status = 'resolved',
    resolution = 'Description of resolution',
    resolvedAt = NOW()
WHERE id = <escalation_id>;
```

## Monitoring System Performance

### Conversation Statistics

```sql
SELECT 
  DATE(createdAt) as date,
  COUNT(*) as total_conversations,
  COUNT(DISTINCT userId) as unique_users
FROM conversations
GROUP BY DATE(createdAt)
ORDER BY date DESC;
```

### Message Volume

```sql
SELECT 
  DATE(createdAt) as date,
  role,
  COUNT(*) as message_count
FROM messages
GROUP BY DATE(createdAt), role
ORDER BY date DESC, role;
```

### Error Tracking

```sql
SELECT 
  DATE(createdAt) as date,
  COUNT(*) as error_count,
  eventData
FROM auditLogs
WHERE eventType = 'ai_error'
GROUP BY DATE(createdAt)
ORDER BY date DESC;
```

## Compliance Management

### GDPR Compliance

#### Data Subject Access Requests (DSAR)

To export all data for a specific user:

```sql
-- User profile
SELECT * FROM users WHERE id = <user_id>;

-- Conversations
SELECT * FROM conversations WHERE userId = <user_id>;

-- Messages
SELECT m.* FROM messages m
JOIN conversations c ON m.conversationId = c.id
WHERE c.userId = <user_id>;

-- Audit logs
SELECT * FROM auditLogs WHERE userId = <user_id>;

-- Consents
SELECT * FROM consents WHERE userId = <user_id>;

-- Escalations
SELECT * FROM escalations WHERE userId = <user_id>;
```

#### Data Deletion Requests

To delete all data for a specific user:

```sql
-- Delete in order to respect foreign key constraints
DELETE FROM messages WHERE conversationId IN (
  SELECT id FROM conversations WHERE userId = <user_id>
);
DELETE FROM escalations WHERE userId = <user_id>;
DELETE FROM auditLogs WHERE userId = <user_id>;
DELETE FROM consents WHERE userId = <user_id>;
DELETE FROM conversations WHERE userId = <user_id>;
DELETE FROM users WHERE id = <user_id>;
```

### EU AI Act Compliance

The system implements the following EU AI Act requirements:

1. **Risk Management**: Continuous monitoring through audit logs
2. **Data Governance**: Structured data collection and storage
3. **Technical Documentation**: Available in `compliance_framework.md`
4. **Record-Keeping**: Automatic audit logging of all interactions
5. **Transparency**: AI disclosure on all interactions
6. **Human Oversight**: Escalation mechanism for human review
7. **Accuracy & Robustness**: Regular testing and monitoring

### Consent Management

#### View Active Consents

```sql
SELECT 
  u.name,
  u.email,
  c.consentType,
  c.createdAt
FROM consents c
JOIN users u ON c.userId = u.id
WHERE c.granted = 1 AND c.revokedAt IS NULL
ORDER BY c.createdAt DESC;
```

#### Revoke Consent

```sql
UPDATE consents 
SET granted = 0, 
    revokedAt = NOW()
WHERE userId = <user_id> 
  AND consentType = 'data_processing';
```

## Security Best Practices

### Access Control

- Only authorized medical staff should have database access
- Use role-based access control (RBAC) for different permission levels
- Regularly review user access permissions
- Implement strong password policies

### Data Protection

- All data is encrypted in transit (HTTPS) and at rest
- Regular database backups are performed automatically
- Access logs are maintained for all database operations
- Personal data should only be accessed when necessary

### Incident Response

If a security incident occurs:

1. Immediately notify the hospital's IT Security team
2. Document the incident in the audit logs
3. Preserve all relevant logs and data
4. Follow the hospital's incident response procedures
5. Notify affected patients if required by GDPR

## System Maintenance

### Regular Tasks

**Daily**:
- Monitor escalation queue
- Review error logs for system issues

**Weekly**:
- Review conversation statistics
- Check system performance metrics
- Review audit logs for unusual activity

**Monthly**:
- Generate compliance reports
- Review and update medical content if needed
- Analyze user feedback and escalation patterns

### Updating Medical Content

The chatbot's medical knowledge is embedded in the LLM system prompt. To update:

1. Edit `shared/translations.ts`
2. Modify the `systemPrompt` for each language
3. Test thoroughly before deploying
4. Document all changes in version control

## Troubleshooting

### Common Issues

**Chatbot not responding**:
- Check LLM API status
- Review error logs in `auditLogs` table
- Verify database connectivity

**Slow response times**:
- Check LLM API latency
- Review database query performance
- Monitor server resource usage

**Incorrect responses**:
- Review the specific conversation in the database
- Check if the system prompt needs updating
- Consider escalating to human review

### Support Contacts

- **Technical Issues**: Rigshospitalet IT Support
- **Medical Content**: Clinical Safety Officer
- **Compliance Questions**: AI Compliance Officer
- **Data Protection**: Data Protection Officer

## Reporting and Analytics

### Monthly Compliance Report

Generate a monthly report including:

- Total conversations and unique users
- Escalation statistics (total, resolved, pending)
- Error rates and types
- Consent grant/revoke statistics
- Data access requests processed

### User Satisfaction Metrics

Monitor:
- Escalation rate (% of conversations escalated)
- Average conversation length
- Repeat user rate
- Response time metrics

## Training and Onboarding

### New Staff Training

Medical staff should be trained on:

1. How the chatbot works and its limitations
2. How to handle escalated cases
3. Privacy and data protection requirements
4. Incident reporting procedures
5. Compliance obligations under EU AI Act and GDPR

### Resources

- User Guide: `USER_GUIDE.md`
- Compliance Framework: `compliance_framework.md`
- Technical Documentation: Project README
- EU AI Act Summary: `compliance_research.md`

## Version Control and Updates

- All code changes are tracked in version control
- Database schema changes are managed through migrations
- System updates should be tested in a staging environment
- Users should be notified of significant changes

---

**Last Updated**: November 2025

**Maintained By**: Rigshospitalet IT Department

**For Support**: Contact the hospital's IT helpdesk or the AI Compliance Officer.
