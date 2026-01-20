"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors group"
    >
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}