import { Upload, MessageSquare, Quote, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FeaturePillProps } from "../types";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-24">
            <div className="max-w-2xl w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Icon badge with pulsing glow */}
                <div className="relative mb-10 flex h-28 w-28 items-center justify-center rounded-[20px] bg-[#000] border-2 border-[#bef264]/20 shadow-[0_0_100px_40px_rgba(190,242,100,0.25)] transition-all duration-500 hover:scale-105 hover:border-[#bef264]/40 hover:shadow-[0_0_120px_50px_rgba(190,242,100,0.35)] group cursor-pointer">
                    <div className="absolute inset-2 rounded-full bg-[#bef264]/10 blur-xl animate-pulse"></div>
                    <img
                        src="/docflow-logo.png"
                        alt="DocFlow Logo"
                        className="relative h-20 w-20 object-contain transition-transform duration-500 group-hover:rotate-3"
                    />
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-yellow-300 tracking-tight">
                    Turn Documents Into
                    <br />
                    Knowledge
                </h1>

                {/* Subhead */}
                <p className="mt-6 text-base sm:text-lg text-neutral-100 font-medium">
                    Upload your documents, ask questions, and get intelligent answers
                    based on your own content.
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-500 max-w-lg leading-relaxed">
                    DOCFLOW combines document processing, AI, RAG, and automation to help
                    you understand your documents faster.
                </p>

                {/* CTA Button */}
                <button
                    type="button"
                    onClick={() => navigate("/chat")}
                    className="mt-10 cursor-pointer inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_20px_rgba(190,242,100,0.4)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black group"
                >
                    Go to Start
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Feature pills */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <FeaturePill
                        icon={<Upload className="h-4 w-4" />}
                        label="Upload Documents"
                    />
                    <FeaturePill
                        icon={<MessageSquare className="h-4 w-4" />}
                        label="Ask Questions"
                    />
                    <FeaturePill
                        icon={<Quote className="h-4 w-4" />}
                        label="Get Source-Based Answers"
                    />
                </div>
            </div>
        </div>
    );
}

function FeaturePill({ icon, label }: FeaturePillProps) {
    return (
        <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/50 px-4 py-2 text-sm transition-all duration-300 hover:border-lime-400/40 hover:bg-neutral-900 hover:scale-105 cursor-default">
            <span className="text-lime-400 transition-transform duration-300 group-hover:scale-110">{icon}</span>
            <span className="text-neutral-200 font-medium">{label}</span>
        </div>
    );
}