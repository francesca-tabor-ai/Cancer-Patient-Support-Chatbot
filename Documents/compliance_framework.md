> **Note:** This document outlines the comprehensive compliance framework for the Rigshospitalet Cancer Patient Chatbot, ensuring adherence to the EU AI Act and GDPR. It details the policies, procedures, and technical measures designed to protect patient data, ensure transparency, and maintain high standards of safety and accountability.

## 1. Introduction

The Rigshospitalet Cancer Patient Chatbot is designed to provide crucial support and information to cancer patients. Given the sensitive nature of its function and the data it will handle, the system is classified as a **high-risk AI system** under the EU AI Act [1]. This framework establishes the comprehensive measures that will be implemented to ensure full compliance with all relevant legal and ethical obligations, including the General Data Protection Regulation (GDPR) [2].

## 2. Governance and Accountability

A robust governance structure is essential for ongoing compliance. This includes clearly defined roles, responsibilities, and oversight mechanisms to ensure the chatbot operates safely, ethically, and in accordance with all legal requirements.

| Role | Responsibility | Key Tasks |
| :--- | :--- | :--- |
| **Data Protection Officer (DPO)** | Oversee GDPR compliance and data protection strategy. | Conduct DPIAs, manage data subject requests, liaise with supervisory authorities. |
| **AI Compliance Officer** | Ensure adherence to the EU AI Act and other AI regulations. | Manage risk assessments, oversee technical documentation, monitor system performance. |
| **Clinical Safety Officer** | Ensure the chatbot's clinical safety and effectiveness. | Review medical content, manage escalation protocols, oversee incident response. |
| **AI Ethics Committee** | Provide oversight on ethical considerations and patient impact. | Review system design, assess fairness and bias, advise on patient communication. |

## 3. Risk Management

A continuous risk management process will be implemented throughout the chatbot's lifecycle, from design and development to deployment and post-market monitoring. This process is designed to identify, analyze, evaluate, and mitigate potential risks to patient health, safety, and fundamental rights.

- **Risk Identification**: Systematically identify potential hazards, such as incorrect medical information, privacy breaches, or biased recommendations.
- **Risk Analysis & Evaluation**: Assess the probability and severity of identified risks, prioritizing them based on their potential impact.
- **Risk Mitigation**: Implement measures to reduce or eliminate risks, including technical safeguards, procedural controls, and user warnings.
- **Risk Monitoring & Review**: Continuously monitor the effectiveness of mitigation measures and conduct regular reviews to address new or emerging risks.

## 4. Data Governance and Privacy

Protecting patient data is a core priority. All data management practices will strictly adhere to GDPR requirements, particularly those concerning "special categories of personal data" such as health information [3].

- **Data Minimization**: The chatbot will only collect and process personal data that is strictly necessary for its intended purpose.
- **Purpose Limitation**: Data will be used exclusively for providing patient support and will not be used for any other purpose without explicit consent.
- **Consent Management**: Patients will be provided with clear, granular options to provide explicit consent for the processing of their health data. A dedicated consent management system will track and manage patient preferences.
- **Data Security**: State-of-the-art encryption, access controls, and other security measures will be implemented to protect data at rest and in transit.

## 5. Transparency and Explainability

To build trust and ensure patient safety, the chatbot will be designed with transparency and explainability as core principles. Patients will have a clear understanding of how the system works and the basis for its recommendations.

- **AI Disclosure**: Patients will be clearly informed at the start of every interaction that they are communicating with an AI system.
- **Information Provision**: The chatbot will provide clear, accessible information about its capabilities, limitations, and the sources of its medical information.
- **Explainability**: Where feasible, the system will provide simplified explanations for its recommendations, helping patients understand the reasoning behind the information provided.
- **Human Oversight**: Patients will have the ability to request human review of any information or recommendation provided by the chatbot, with a clear and accessible escalation pathway to qualified medical staff [4].

## 6. Technical Documentation and Audit Trails

Comprehensive technical documentation will be maintained to demonstrate compliance with the EU AI Act. This documentation will be made available to competent authorities upon request.

- **System Architecture**: Detailed diagrams and descriptions of the system's components and data flows.
- **Data and Data Governance**: Documentation of the datasets used for training and testing the AI model, including their origin, scope, and characteristics.
- **Record-Keeping**: The system will automatically log all interactions, decisions, and data processing activities to create a complete audit trail.
- **Instructions for Use**: Clear instructions for both patients and medical staff on how to use the chatbot safely and effectively.

## 7. Accuracy, Robustness, and Cybersecurity

The chatbot will be engineered to meet high standards of performance, reliability, and security to ensure it is a trustworthy resource for patients.

- **Accuracy**: The AI model will be rigorously tested to ensure the accuracy of the medical information it provides.
- **Robustness**: The system will be designed to be resilient to errors and unexpected inputs, with graceful failure modes to prevent harm.
- **Cybersecurity**: Proactive cybersecurity measures will be implemented to protect the system from unauthorized access, data breaches, and other malicious attacks.

## References

[1] European Commission. "Proposal for a Regulation of the European Parliament and of the Council Laying Down Harmonised Rules on Artificial Intelligence (Artificial Intelligence Act)." 21 April 2021.

[2] European Parliament and Council of the European Union. "Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation)." Official Journal of the European Union, L 119/1, 4 May 2016.

[3] GDPR-info.eu. "Art. 9 GDPR – Processing of special categories of personal data." https://gdpr-info.eu/art-9-gdpr/

[4] Artificialintelligenceact.eu. "Article 14: Human Oversight." https://artificialintelligenceact.eu/article/14/
