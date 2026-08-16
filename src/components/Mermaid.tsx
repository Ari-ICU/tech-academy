"use client";

import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";

// Initialize mermaid on the client side
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
  });
}

interface MermaidProps {
  code: string;
}

export function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;
    const renderDiagram = async () => {
      try {
        const uniqueId = `mermaid-${Math.floor(Math.random() * 1000000)}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, code);
        if (active) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(String(err));
        }
      }
    };

    renderDiagram();
    return () => {
      active = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs overflow-x-auto">
        <p className="font-bold mb-2">Mermaid Rendering Error:</p>
        <pre>{error}</pre>
        <pre className="mt-2 text-gray-500">{code}</pre>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="my-6 p-6 rounded-xl border border-[#1e2d40] bg-slate-900 shadow-xl overflow-x-auto flex justify-center">
      {svg ? (
        <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="text-[#637e9a] font-mono text-xs animate-pulse">Rendering diagram...</div>
      )}
    </div>
  );
}
