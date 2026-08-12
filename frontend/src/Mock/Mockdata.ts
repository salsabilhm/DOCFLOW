import type { DocumentItem, MessageItem, SourceRef } from "../types";

/* -------------------------------------------------------------------------- */
/*  État initial (avant toute interaction utilisateur)                       */
/* -------------------------------------------------------------------------- */

export const initialDocuments: DocumentItem[] = [
    {
        id: "seed-project-proposal",
        name: "Project_Proposal.pdf",
    },
];

export const initialMessages: MessageItem[] = [
    {
        id: "seed-welcome",
        role: "assistant",
        content:
            "👋 Welcome! I've loaded \"Project_Proposal.pdf\" into your knowledge base. Ask me anything about it.",
    },
];

/* -------------------------------------------------------------------------- */
/*  Message de confirmation d'upload                                        */
/* -------------------------------------------------------------------------- */

export function buildUploadConfirmationMessage(fileName: string): MessageItem {
    return {
        id: `upload-${Date.now()}`,
        role: "assistant",
        content: `📄 Document "${fileName}" uploaded successfully!`,
    };
}

/* -------------------------------------------------------------------------- */
/*  Réponse mock (sans setTimeout — affichée immédiatement)                  */
/* -------------------------------------------------------------------------- */

/**
 * Exemple statique du "shape" attendu d'une réponse IA, avec contenu +
 * sources citées. Remplacez cette logique par un vrai appel API plus tard.
 */
export function buildMockAnswer(
    question: string,
    lastDocumentName: string
): MessageItem {
    const sources: SourceRef[] = [
        {
            documentName: lastDocumentName,
            snippet:
                "\"...the proposed timeline spans 12 weeks, split into three phases: discovery, build, and rollout...\"",
            page: 3,
        },
        {
            documentName: lastDocumentName,
            snippet:
                "\"...total estimated budget is $45,000, covering design, development, and QA...\"",
            page: 7,
        },
    ];

    return {
        id: `answer-${Date.now()}`,
        role: "assistant",
        content: `Based on "${lastDocumentName}", here is what I found regarding "${question}": the document outlines a 12-week phased timeline and a total budget of $45,000. Let me know if you'd like more detail on any specific section.`,
        sources,
    };
}