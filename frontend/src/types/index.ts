import type { ReactNode } from "react";

export interface DocumentItem {
    id: string;
    name: string;
}

export interface SourceRef {
    documentName: string;
    snippet: string;
    page?: number;
}

export interface MessageItem {
    id: string;
    role: "user" | "assistant";
    content: string;
    /** Uniquement pour les messages de l'assistant : les sources citées */
    sources?: SourceRef[];
}

// Types  (Components)
export interface FeaturePillProps {
    icon: ReactNode;
    label: string;
}