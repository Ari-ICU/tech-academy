"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Mermaid } from "./Mermaid";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
}

const LANGUAGE_LABELS: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  bash: "Bash",
  sh: "Shell",
  json: "JSON",
  css: "CSS",
  html: "HTML",
  sql: "SQL",
  text: "Text",
};

// Language color accents for the badge
const LANGUAGE_COLORS: Record<string, string> = {
  python: "text-yellow-400 bg-yellow-400/10",
  javascript: "text-yellow-300 bg-yellow-300/10",
  typescript: "text-blue-400 bg-blue-400/10",
  tsx: "text-cyan-400 bg-cyan-400/10",
  jsx: "text-cyan-400 bg-cyan-400/10",
  bash: "text-green-400 bg-green-400/10",
  sh: "text-green-400 bg-green-400/10",
  json: "text-orange-400 bg-orange-400/10",
  css: "text-pink-400 bg-pink-400/10",
  html: "text-red-400 bg-red-400/10",
  sql: "text-purple-400 bg-purple-400/10",
  text: "text-gray-400 bg-gray-400/10",
};

export function CodeBlock({
  code,
  language = "text",
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const lang = language.toLowerCase();

  // If language is mermaid, render diagram component
  if (lang === "mermaid") {
    return <Mermaid code={code.trim()} />;
  }

  const label = LANGUAGE_LABELS[lang] ?? language;
  const badgeColor = LANGUAGE_COLORS[lang] ?? "text-gray-400 bg-gray-400/10";
  const isPlainText = lang === "text" || lang === "plaintext";

  return (
    <div className="group my-6 rounded-xl overflow-hidden border border-[#1e2d40] shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#011627] border-b border-[#1e2d40]">
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Language badge */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md font-mono ${badgeColor}`}>
          {label}
        </span>

        {/* Copy button */}
        {showCopy && (
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-150 ${
              copyError
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : copied
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-[#637e9a] border border-transparent hover:bg-white/10 hover:text-white hover:border-white/10"
            }`}
          >
            {copyError ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Failed
              </>
            ) : copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code area */}
      {isPlainText ? (
        <pre
          className="overflow-x-auto text-[0.85rem] leading-6 font-mono"
          style={{ margin: 0, padding: "1rem 0", background: "#011627" }}
        >
          {code.trim().split("\n").map((line, i) => (
            <div
              key={i}
              className="px-5 hover:bg-white/[0.03] transition-colors"
            >
              <span
                className="inline-block w-8 mr-4 text-right text-[#2d4a66] select-none text-xs leading-6"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-[#a8b2c1]">{line}</span>
            </div>
          ))}
        </pre>
      ) : (
        <Highlight theme={themes.nightOwl} code={code.trim()} language={lang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto text-[0.85rem] leading-6`}
              style={{ ...style, margin: 0, padding: "1rem 0", background: "#011627" }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="px-5 hover:bg-white/[0.03] transition-colors"
                >
                  {/* Line number */}
                  <span
                    className="inline-block w-8 mr-4 text-right text-[#2d4a66] select-none text-xs leading-6"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
}
