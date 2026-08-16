"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { CodeBlock } from "./CodeBlock";
import { useLanguage } from "@/context/LanguageContext";
import {
  WorkflowTimeChart,
  VectorisationSpeedChart,
  MissingDataChart,
  SkewnessChart,
  CorrelationChart,
  ChartTypeComparisonChart,
  FeatureScalingChart,
  CLTChart,
  GroupByChart,
  NormalDistributionChart,
  CorrelationScatterChart,
  ParabolaChart,
  FunctionTransformationChart,
  SineWaveChart,
  LineAndBarDemoChart,
  ScatterHistDemoChart,
  CustomizedPlotDemoChart,
} from "./charts";

// Map chart shortcode names to components
const CHART_COMPONENTS: Record<string, React.ComponentType> = {
  WorkflowTimeChart,
  VectorisationSpeedChart,
  MissingDataChart,
  SkewnessChart,
  CorrelationChart,
  ChartTypeComparisonChart,
  FeatureScalingChart,
  CLTChart,
  GroupByChart,
  NormalDistributionChart,
  CorrelationScatterChart,
  ParabolaChart,
  FunctionTransformationChart,
  SineWaveChart,
  LineAndBarDemoChart,
  ScatterHistDemoChart,
  CustomizedPlotDemoChart,
};

// Pre-process markdown to replace <ChartName /> shortcodes
function preprocessContent(content: string): string {
  // Replace <ChartName /> with a special marker that rehype-raw can render
  return content.replace(
    /<([A-Z][A-Za-z]+)\s*\/>/g,
    (_, name) => `<chart-component name="${name}"></chart-component>`
  );
}
interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  const { language } = useLanguage();
  const processed = preprocessContent(content);
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          // Render our chart shortcodes
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...({"chart-component": ({ node, ...props }: any) => {
            const name = props.name as string;
            const Chart = CHART_COMPONENTS[name];
            if (!Chart) return null;
            return <Chart />;
          }} as any),
          // Strip prose wrapper around our custom CodeBlock
          pre({ children }) {
            return <>{children}</>;
          },
          // Render headings with anchor IDs
          h2({ children, ...props }) {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return (
              <h2
                id={id}
                className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white scroll-mt-20"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3
                className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white"
                {...props}
              >
                {children}
              </h3>
            );
          },
          // Syntax-highlighted code blocks with copy button
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1] ?? "text";
            const isInline = !match && !String(children).includes("\n");

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-pink-600 dark:text-pink-400"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            // Plain text / no language — no syntax highlighting
            if (!match || lang === "text" || lang === "plaintext") {
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language="text"
                />
              );
            }
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={lang}
              />
            );
          },
          // Paragraphs — render as div when they contain block-level children (charts, etc.)
          p({ children, node, ...props }) {
            // Check if any child is a block-level element (chart-component renders as div)
            const hasBlock = node?.children?.some(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (child: any) =>
                child.type === "element" &&
                (child.tagName === "chart-component" ||
                  child.tagName === "div" ||
                  child.tagName === "table" ||
                  child.tagName === "pre")
            );

            if (hasBlock) {
              return <div className="mb-4">{children}</div>;
            }

            // Hide English paragraphs in Khmer mode
            if (language === "kh") {
              return null;
            }

            return (
              <p
                className="mb-4 text-gray-700 dark:text-gray-300 leading-7"
                {...props}
              >
                {children}
              </p>
            );
          },
          // Lists — hide in Khmer mode (English only)
          ul({ children, ...props }) {
            if (language === "kh") return null;
            return (
              <ul
                className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300"
                {...props}
              >
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            if (language === "kh") return null;
            return (
              <ol
                className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300"
                {...props}
              >
                {children}
              </ol>
            );
          },
          // Blockquote — standard styling
          blockquote({ children, ...props }) {
            if (language === "kh") return null;
            return (
              <blockquote
                className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 rounded-r italic text-gray-700 dark:text-gray-300"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // Table — hide in Khmer mode (English only)
          table({ children, ...props }) {
            if (language === "kh") return null;
            return (
              <div className="overflow-x-auto mb-4">
                <table
                  className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg"
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                {...props}
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700"
                {...props}
              >
                {children}
              </td>
            );
          },
          // Images
          img({ alt, src, ...props }) {
            const isDecorative = !alt || alt.trim() === "";
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={isDecorative ? "" : alt}
                src={src}
                className="max-w-full h-auto rounded-lg my-4"
                loading="lazy"
                {...props}
              />
            );
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
