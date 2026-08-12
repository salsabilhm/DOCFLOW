import { useState, type ChangeEvent } from "react";
import { Upload, Send } from "lucide-react";
import type { DocumentItem, MessageItem } from "../types";
import {
    initialDocuments,
    initialMessages,
    buildUploadConfirmationMessage,
    buildMockAnswer,
} from "../Mock/Mockdata.ts";

type Status = "ready" | "processing";

export default function Chat() {
    const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
    const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
    const [input, setInput] = useState<string>("");
    const [status, ] = useState<Status>("ready");

    function handleUploadClick() {
        const fileInput = document.getElementById(
            "docflow-file-input"
        ) as HTMLInputElement | null;
        fileInput?.click();
    }

    function handleFilesSelected(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const added: DocumentItem[] = Array.from(files).map((f: File) => ({
            id: `${f.name}-${f.size}-${f.lastModified}`,
            name: f.name,
        }));

        setDocuments((prev) => [...prev, ...added]);

        // Message de confirmation pour chaque fichier ajouté (mock, pas de délai)
        const confirmations = added.map((doc) =>
            buildUploadConfirmationMessage(doc.name)
        );
        setMessages((prev) => [...prev, ...confirmations]);

        e.target.value = "";
    }

    function handleAsk() {
        const question = input.trim();
        if (!question || status === "processing") return;

        // 1. Ajouter la question de l'utilisateur
        const userMessage: MessageItem = {
            id: `${Date.now()}`,
            role: "user",
            content: question,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // 2. Réponse mock affichée immédiatement (pas de setTimeout),
        //    pour visualiser tout de suite le format contenu + sources.
        const lastDocumentName =
            documents[documents.length - 1]?.name ?? "your document";
        const answer = buildMockAnswer(question, lastDocumentName);
        setMessages((prev) => [...prev, answer]);
    }

    return (
        <div className="flex h-screen w-full bg-black text-neutral-200">
            {/* Sidebar */}
            <aside className="w-72 shrink-0 border-r border-neutral-900 p-5 flex flex-col gap-6">

                <div className="flex items-center gap-2 group cursor-pointer">
                    <img
                        src="/docflow-logo.png"
                        alt="DocFlow Logo"
                        className="h-15 w-15 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="tracking-[0.25em] text-sm font-bold text-lime-400">
                        DOCFLOW
                    </span>
                </div>

                <div>
                    <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500">
                        KNOWLEDGE BASE
                    </p>
                    <div className="rounded-xl border border-dashed border-neutral-700 p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:border-lime-400/50 hover:bg-neutral-950">
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer transition-transform duration-200 active:scale-95"
                        >
                            <Upload className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            Upload Document
                        </button>
                        <p className="text-center text-xs text-neutral-500">
                            or drag &amp; drop here — PDF, DOC, DOCX, TXT
                        </p>
                        <input
                            id="docflow-file-input"
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.txt"
                            className="hidden"
                            onChange={handleFilesSelected}
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500">
                        DOCUMENTS ({documents.length})
                    </p>
                    <div className="rounded-xl border border-neutral-800 p-4 text-sm text-neutral-500">
                        {documents.length === 0 ? (
                            "No documents yet. Upload a file to build your knowledge base."
                        ) : (
                            <ul className="space-y-1 text-neutral-300">
                                {documents.map((doc) => (
                                    <li key={doc.id} className="truncate transition-all duration-200 hover:text-lime-400 hover:translate-x-1 cursor-pointer">
                                        {doc.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main panel */}
            <main className="flex flex-1 flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-900 px-8 py-5">
                    <div>
                        <h1 className="text-lg font-bold text-yellow-300">
                            Document Assistant
                        </h1>
                        <p className="text-sm text-neutral-500">
                            Ask questions about your uploaded documents.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-lime-500/40 px-4 py-1.5 text-sm text-lime-400 transition-colors duration-300">
                        <span
                            className={`h-2 w-2 rounded-full ${
                                status === "ready" ? "bg-lime-400 animate-pulse" : "bg-yellow-300 animate-pulse"
                            }`}
                        />
                        {status === "ready" ? "Ready" : "Processing…"}
                    </div>
                </div>

                {/* Conversation area */}
                <div className="flex-1 overflow-y-auto px-8 py-10">
                    <div className="mx-auto flex max-w-2xl flex-col gap-3">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                                    m.role === "user"
                                        ? "ml-auto bg-lime-400 text-black"
                                        : "bg-neutral-900 text-neutral-200 border border-neutral-800/60"
                                }`}
                            >
                                <p>{m.content}</p>

                                {/* Sources citées (uniquement pour les messages assistant) */}
                                {m.sources && m.sources.length > 0 && (
                                    <div className="mt-2 space-y-1 border-t border-neutral-700 pt-2">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-lime-400">
                                            Sources
                                        </p>
                                        {m.sources.map((s, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-lg bg-black/40 px-2 py-1 text-xs text-neutral-400 transition-all duration-200 hover:bg-black/70 hover:text-neutral-200"
                                            >
                                                <span className="text-neutral-300 font-medium">
                                                    {s.documentName}
                                                    {s.page ? ` — p.${s.page}` : ""}
                                                </span>
                                                <p className="mt-0.5 italic">{s.snippet}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input bar */}
                <div className="border-t border-neutral-900 px-8 py-5">
                    <div className="mx-auto flex max-w-3xl items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                            placeholder="Ask a question about your documents…"
                            disabled={status === "processing"}
                            className="flex-1 rounded-full border border-neutral-800 bg-transparent px-5 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 transition-all duration-300 focus:border-transparent disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAsk}
                            disabled={status === "processing"}
                            className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-black hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer transition-all duration-200 active:scale-95 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4 transition-transform duration-200 hover:translate-x-0.5" />
                            Ask
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}