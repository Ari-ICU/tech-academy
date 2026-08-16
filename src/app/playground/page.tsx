"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Trash2, Code2, ChevronDown } from "lucide-react";

const TIMEOUT_MS = 10000;

const STARTERS: Record<"python" | "javascript", string> = {
  python: `# Python Playground — runs in your browser
import math

numbers = [1, 4, 9, 16, 25]
roots = [math.sqrt(n) for n in numbers]
print("Square roots:", roots)

# Try some basic data science
data = [12, 45, 7, 89, 23, 56, 34]
mean = sum(data) / len(data)
print(f"Mean: {mean:.2f}")
print(f"Max:  {max(data)}")
print(f"Min:  {min(data)}")
`,
  javascript: `// JavaScript Playground
const numbers = [1, 4, 9, 16, 25];
const roots = numbers.map(n => Math.sqrt(n));
console.log("Square roots:", roots);

// Basic stats
const data = [12, 45, 7, 89, 23, 56, 34];
const mean = data.reduce((a, b) => a + b, 0) / data.length;
console.log("Mean:", mean.toFixed(2));
console.log("Max:", Math.max(...data));
console.log("Min:", Math.min(...data));
`,
};

declare global {
  interface Window {
    loadPyodide: (opts?: { indexURL?: string }) => Promise<{
      runPythonAsync: (code: string, options?: { globals?: unknown }) => Promise<unknown>;
      globals: { get: (key: string) => unknown };
    }>;
    pyodideInstance: Awaited<ReturnType<Window["loadPyodide"]>> | null;
    pyodideLoading: Promise<Awaited<ReturnType<Window["loadPyodide"]>>> | null;
  }
}

async function getPyodide() {
  // Return existing instance
  if (window.pyodideInstance) return window.pyodideInstance;

  // Return in-flight promise
  if (window.pyodideLoading) return window.pyodideLoading;

  // Start loading
  window.pyodideLoading = window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
  }).then((py) => {
    window.pyodideInstance = py;
    window.pyodideLoading = null;
    return py;
  });

  return window.pyodideLoading;
}

export default function PlaygroundPage() {
  const [lang, setLang] = useState<"python" | "javascript">("python");
  const [code, setCode] = useState(STARTERS.python);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Inject Pyodide CDN script once
  useEffect(() => {
    if (document.getElementById("pyodide-script")) return;
    const script = document.createElement("script");
    script.id = "pyodide-script";
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const clearOutput = () => setOutput("");

  const handleLangChange = (newLang: "python" | "javascript") => {
    setLang(newLang);
    setCode(STARTERS[newLang]);
    clearOutput();
  };

  const runCode = async () => {
    setRunning(true);
    setOutput("");

    try {
      if (lang === "javascript") {
        const logs: string[] = [];
        const orig = console.log;
        console.log = (...args: unknown[]) =>
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));

        try {
          // eslint-disable-next-line no-new-func
          const fn = new Function(code);
          const result = fn();
          if (result !== undefined) logs.push(String(result));
          setOutput(logs.join("\n") || "(no output)");
        } catch (e) {
          setOutput(`❌ ${String(e)}`);
        } finally {
          console.log = orig;
        }
        return;
      }

      // Python via Pyodide
      if (pyodideStatus === "idle") setPyodideStatus("loading");

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Execution timed out after ${TIMEOUT_MS / 1000}s`)), TIMEOUT_MS)
      );

      const runPromise = (async () => {
        const py = await getPyodide();
        setPyodideStatus("ready");

        // Capture stdout by redirecting sys.stdout
        const captureCode = `
import sys
import io
_stdout_capture = io.StringIO()
sys.stdout = _stdout_capture
`;
        await py.runPythonAsync(captureCode);

        try {
          await py.runPythonAsync(code);
        } catch (e) {
          // Restore stdout before reporting error
          await py.runPythonAsync("sys.stdout = sys.__stdout__");
          throw e;
        }

        // Get captured output
        const getOutput = `
_captured = _stdout_capture.getvalue()
sys.stdout = sys.__stdout__
_captured
`;
        const captured = await py.runPythonAsync(getOutput);
        return String(captured ?? "").trim() || "(no output)";
      })();

      const result = await Promise.race([runPromise, timeoutPromise]);
      setOutput(result);
    } catch (e) {
      const msg = String(e);
      if (msg.includes("timed out")) {
        setOutput(`⏱ ${msg}`);
      } else if (msg.includes("loadPyodide") || msg.includes("not a function")) {
        setPyodideStatus("error");
        setOutput("⚠️ Pyodide is still loading — please wait a moment and try again.");
      } else {
        setOutput(`❌ ${msg}`);
      }
    } finally {
      setRunning(false);
    }
  };

  const isError = output.startsWith("❌") || output.startsWith("⏱") || output.startsWith("⚠️");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Playground
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 ml-13">
            សាកល្បង Python ឬ JavaScript ដោយផ្ទាល់នៅក្នុង browser — មិនចាំបាច់ install អ្វីទេ។
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {/* Language tabs */}
        <div className="flex gap-2">
          {(["python", "javascript"] as const).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                lang === l
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {l === "python" ? "Python" : "JavaScript"}
            </button>
          ))}

          {lang === "python" && (
            <div className="ml-auto flex items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                  pyodideStatus === "ready"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : pyodideStatus === "loading"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : pyodideStatus === "error"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    pyodideStatus === "ready" ? "bg-green-500 animate-pulse" :
                    pyodideStatus === "loading" ? "bg-yellow-500 animate-pulse" :
                    pyodideStatus === "error" ? "bg-red-500" : "bg-gray-400"
                  }`}
                />
                {pyodideStatus === "ready" ? "Pyodide ready" :
                 pyodideStatus === "loading" ? "Loading Pyodide…" :
                 pyodideStatus === "error" ? "Load failed" : "Pyodide (CDN)"}
              </span>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-mono text-gray-400">
              {lang === "python" ? "main.py" : "main.js"}
            </span>
            <span className="text-xs text-gray-400">
              {code.split("\n").length} lines
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={16}
            spellCheck={false}
            aria-label="Code editor"
            className="w-full font-mono text-sm p-5 bg-gray-900 text-gray-100 focus:outline-none resize-y leading-6 dark:bg-gray-950"
          />
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={runCode}
            disabled={running}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            {running ? "កំពុងដំណើរការ…" : "Run"}
          </button>
          <button
            onClick={clearOutput}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            លុប Output
          </button>
        </div>

        {/* Output panel */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Output
          </h2>
          <div
            className={`rounded-xl border p-5 min-h-28 font-mono text-sm ${
              isError
                ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                : "bg-gray-900 dark:bg-gray-950 border-gray-700"
            }`}
          >
            {output ? (
              <pre
                className={`whitespace-pre-wrap leading-6 ${
                  isError ? "text-red-600 dark:text-red-400" : "text-gray-100"
                }`}
              >
                {output}
              </pre>
            ) : (
              <span className="text-gray-500">
                {running ? "⏳ Running…" : "Output នឹងបង្ហាញនៅទីនេះ…"}
              </span>
            )}
          </div>
        </div>

        {/* Info note */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Python runs via{" "}
          <a
            href="https://pyodide.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            Pyodide
          </a>{" "}
          (WebAssembly) — standard library available, no pip packages.
          JavaScript runs natively in the browser.
        </p>
      </div>
    </div>
  );
}
