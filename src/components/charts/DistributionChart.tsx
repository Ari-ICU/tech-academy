"use client";

import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
  ScatterChart, Scatter, ZAxis,
} from "recharts";

/* ── Normal distribution curve ─────────────────────── */
function normalPdf(x: number, mu = 0, sigma = 1) {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2)
  );
}

export function NormalDistributionChart() {
  const data = Array.from({ length: 120 }, (_, i) => {
    const x = -4 + i * (8 / 119);
    return { x: +x.toFixed(2), y: +normalPdf(x).toFixed(4) };
  });

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Normal Distribution N(0, 1) — 68-95-99.7 Rule
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="x"
            tickFormatter={(v) => `${v}σ`}
            tick={{ fontSize: 11 }}
            interval={14}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => v.toFixed(2)}
          />
          <Tooltip
            formatter={(value) => [
              typeof value === "number" ? value.toFixed(4) : value,
              "P(x)",
            ]}
            labelFormatter={(l) => `x = ${l}`}
          />
          <ReferenceLine x={-1} stroke="#10b981" strokeDasharray="4 4"
            label={{ value: "−1σ", position: "top", fontSize: 10 }} />
          <ReferenceLine x={1}  stroke="#10b981" strokeDasharray="4 4"
            label={{ value: "+1σ", position: "top", fontSize: 10 }} />
          <ReferenceLine x={-2} stroke="#f59e0b" strokeDasharray="4 4"
            label={{ value: "−2σ", position: "top", fontSize: 10 }} />
          <ReferenceLine x={2}  stroke="#f59e0b" strokeDasharray="4 4"
            label={{ value: "+2σ", position: "top", fontSize: 10 }} />
          <Area
            type="monotone"
            dataKey="y"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#normalGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        Green lines = ±1σ (68% of data) · Yellow lines = ±2σ (95%)
      </p>
    </div>
  );
}

/* ── Bar chart for categorical data ───────────────────── */
export function CategoryBarChart({
  title,
  data,
  color = "#3b82f6",
}: {
  title: string;
  data: { label: string; value: number }[];
  color?: string;
}) {
  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {title}
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Scatter plot ─────────────────────────────────────── */
export function CorrelationScatterChart() {
  // Fixed seed-like data so it's consistent on every render
  const data = Array.from({ length: 50 }, (_, i) => {
    const x = (i / 5) % 10;
    const noise = ((i * 7 + 3) % 8) - 4;
    const y = 1.5 * x + 3 + noise * 0.5;
    return { x: +x.toFixed(2), y: +y.toFixed(2) };
  });

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Scatter Plot — Positive Correlation (r ≈ 0.92)
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="x"
            name="Feature X"
            tick={{ fontSize: 11 }}
            label={{ value: "Feature X", position: "insideBottom", offset: -5, fontSize: 11 }}
          />
          <YAxis
            dataKey="y"
            name="Target Y"
            tick={{ fontSize: 11 }}
            label={{ value: "Target Y", angle: -90, position: "insideLeft", fontSize: 11 }}
          />
          <ZAxis range={[30, 30]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#3b82f6" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
