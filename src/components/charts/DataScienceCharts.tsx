"use client";

import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
  ScatterChart, Scatter, ZAxis, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

/* ─────────────────────────────────────────────────────
   1. Data Science Workflow — stage timing bar chart
───────────────────────────────────────────────────── */
export function WorkflowTimeChart() {
  const data = [
    { stage: "Define Problem", pct: 5, fill: "#6366f1" },
    { stage: "Collect Data",   pct: 10, fill: "#3b82f6" },
    { stage: "Clean & EDA",    pct: 35, fill: "#10b981" },
    { stage: "Feature Eng.",   pct: 20, fill: "#f59e0b" },
    { stage: "Model",          pct: 15, fill: "#ef4444" },
    { stage: "Communicate",    pct: 10, fill: "#8b5cf6" },
    { stage: "Deploy",         pct: 5,  fill: "#06b6d4" },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Typical Time Allocation in a Data Science Project (%)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Data wrangling and EDA consume the most time — not modelling.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical"
          margin={{ top: 5, right: 30, left: 90, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.2} />
          <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="stage" tick={{ fontSize: 11 }} width={88} />
          <Tooltip formatter={(v) => [`${v}%`, "Time"]} />
          <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   2. NumPy — vectorisation speedup
───────────────────────────────────────────────────── */
export function VectorisationSpeedChart() {
  const data = [
    { size: "1K",   loop: 0.8,   numpy: 0.02 },
    { size: "10K",  loop: 8,     numpy: 0.05 },
    { size: "100K", loop: 80,    numpy: 0.3  },
    { size: "1M",   loop: 820,   numpy: 2.5  },
    { size: "10M",  loop: 8500,  numpy: 22   },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Python Loop vs NumPy Vectorisation — Execution Time (ms)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        NumPy is 100–400× faster for large arrays.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="size" tick={{ fontSize: 11 }}
            label={{ value: "Array size", position: "insideBottom", offset: -3, fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }}
            label={{ value: "ms", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip formatter={(v) => [`${v} ms`]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="loop"  name="Python loop" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="numpy" name="NumPy"        stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   3. Pandas — missing data heatmap (simulated)
───────────────────────────────────────────────────── */
export function MissingDataChart() {
  const cols = ["age", "income", "education", "city", "score", "tenure"];
  const data = cols.map((col, i) => ({
    col,
    missing: [12, 0, 3, 8, 25, 0][i],
    present: [88, 100, 97, 92, 75, 100][i],
  }));

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Missing Value Analysis — % per Column
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Columns with &gt;5% missing need attention before modelling.
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="col" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]}
            tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [`${v}%`]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="present" name="Present"   stackId="a" fill="#10b981" />
          <Bar dataKey="missing" name="Missing"   stackId="a" fill="#ef4444"
            radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   4. EDA — distribution before/after log transform
───────────────────────────────────────────────────── */
export function SkewnessChart() {
  function expBucket(min: number, max: number, n: number) {
    // Simulate right-skewed (exponential) distribution counts
    const lambda = 1 / 20;
    const range = max - min;
    return Math.round(n * lambda * Math.exp(-lambda * (min + range / 2)) * range);
  }

  const bins = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  const rawData = bins.map((b) => ({
    bin: b,
    raw:  Math.max(1, expBucket(b - 5, b + 5, 2000)),
    log:  0,
  }));

  // Simulate log-transformed distribution (more normal)
  const logCounts = [8, 18, 32, 48, 62, 58, 42, 28, 15, 7];
  rawData.forEach((d, i) => { d.log = logCounts[i]; });

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Feature Distribution: Raw Income vs log(Income)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Log transformation reduces right skew and makes the distribution more symmetric.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={rawData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="bin" tick={{ fontSize: 10 }}
            label={{ value: "Value bucket", position: "insideBottom", offset: -3, fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="raw" name="Raw (skewed)"         fill="#ef4444" opacity={0.8} />
          <Bar dataKey="log" name="log() (symmetric)"    fill="#3b82f6" opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   5. Statistics — correlation heatmap (simplified)
───────────────────────────────────────────────────── */
export function CorrelationChart() {
  const data = [
    { feature: "age",     age: 1.00, income: 0.62, score: 0.41, tenure: 0.55 },
    { feature: "income",  age: 0.62, income: 1.00, score: 0.38, tenure: 0.49 },
    { feature: "score",   age: 0.41, income: 0.38, score: 1.00, tenure: 0.27 },
    { feature: "tenure",  age: 0.55, income: 0.49, score: 0.27, tenure: 1.00 },
  ];

  const features = ["age", "income", "score", "tenure"];
  const COLORS = { high: "#2563eb", mid: "#93c5fd", low: "#dbeafe", neg: "#fca5a5" };

  function getColor(v: number) {
    if (v >= 0.7) return COLORS.high;
    if (v >= 0.4) return COLORS.mid;
    if (v >= 0)   return COLORS.low;
    return COLORS.neg;
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Pearson Correlation Matrix
      </h4>
      <div className="overflow-x-auto">
        <table className="text-xs mx-auto border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              {features.map((f) => (
                <th key={f} className="p-2 text-gray-600 dark:text-gray-400 font-medium">{f}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.feature}>
                <td className="p-2 text-gray-600 dark:text-gray-400 font-medium pr-3">{row.feature}</td>
                {features.map((f) => {
                  const v = row[f as keyof typeof row] as number;
                  return (
                    <td key={f}
                      className="p-2 text-center rounded font-mono"
                      style={{ background: getColor(v), color: v >= 0.7 ? "white" : "#1f2937" }}
                    >
                      {v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
        Dark blue = strong positive correlation · Light = weak
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   6. Visualisation — comparison of chart types
───────────────────────────────────────────────────── */
export function ChartTypeComparisonChart() {
  const salesData = [
    { month: "Jan", sales: 4200, target: 4000 },
    { month: "Feb", sales: 3800, target: 4200 },
    { month: "Mar", sales: 5100, target: 4500 },
    { month: "Apr", sales: 4700, target: 4800 },
    { month: "May", sales: 5300, target: 5000 },
    { month: "Jun", sales: 5800, target: 5500 },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Line Chart — Actual Sales vs Target (Jan–Jun)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Line charts are ideal for showing trends over time.
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
          <Tooltip formatter={(v) => [typeof v === "number" ? `$${v.toLocaleString()}` : String(v)]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={5000} stroke="#f59e0b" strokeDasharray="4 4"
            label={{ value: "$5k goal", position: "right", fontSize: 10 }} />
          <Line type="monotone" dataKey="sales"  name="Actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   7. Feature Engineering — before/after scaling
───────────────────────────────────────────────────── */
export function FeatureScalingChart() {
  const raw = [
    { feature: "age",     min: 18,     max: 85,      mean: 38 },
    { feature: "income",  min: 20000,  max: 250000,  mean: 65000 },
    { feature: "score",   min: 300,    max: 850,     mean: 680 },
    { feature: "tenure",  min: 0,      max: 40,      mean: 7 },
  ];

  const scaled = raw.map((r) => {
    const std = (r.max - r.min) / 4;
    return {
      feature: r.feature,
      min:  +((r.min - r.mean) / std).toFixed(2),
      max:  +((r.max - r.mean) / std).toFixed(2),
      mean: 0,
    };
  });

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Feature Ranges: Before vs After StandardScaler
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        After scaling: all features have mean 0 and comparable range — essential for distance-based models.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-red-500 mb-2 text-center">Before (raw ranges)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={raw} layout="vertical"
              margin={{ top: 0, right: 10, left: 45, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 9 }} />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={44} />
              <Tooltip />
              <Bar dataKey="max" fill="#ef4444" opacity={0.8} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs font-medium text-green-500 mb-2 text-center">After (StandardScaler)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={scaled} layout="vertical"
              margin={{ top: 0, right: 10, left: 45, bottom: 0 }}>
              <XAxis type="number" domain={[-4, 4]} tick={{ fontSize: 9 }} />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={44} />
              <Tooltip />
              <Bar dataKey="max" fill="#10b981" opacity={0.8} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   8. Statistics — Central Limit Theorem demo
───────────────────────────────────────────────────── */
export function CLTChart() {
  function generateCLT(n: number, trials = 1000) {
    const bins = Array(20).fill(0);
    for (let i = 0; i < trials; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) sum += Math.random(); // uniform [0,1]
      const mean = sum / n;
      const bin = Math.min(19, Math.floor(mean * 20));
      bins[bin]++;
    }
    return bins.map((count, i) => ({
      x: +((i / 20 + 1 / 40)).toFixed(3),
      count,
    }));
  }

  const n5   = generateCLT(5);
  const n30  = generateCLT(30);
  const n100 = generateCLT(100);

  const combined = n5.map((d, i) => ({
    x: d.x,
    n5:   d.count,
    n30:  n30[i].count,
    n100: n100[i].count,
  }));

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Central Limit Theorem — Distribution of Sample Means
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Population: Uniform[0,1]. As sample size n increases, sample means become normally distributed.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={combined} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="x" tick={{ fontSize: 10 }}
            label={{ value: "Sample mean", position: "insideBottom", offset: -3, fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="n5"   name="n = 5"   stroke="#ef4444" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="n30"  name="n = 30"  stroke="#f59e0b" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="n100" name="n = 100" stroke="#10b981" strokeWidth={2}   dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   9. GroupBy — stacked bar
───────────────────────────────────────────────────── */
export function GroupByChart() {
  const data = [
    { dept: "Engineering", junior: 45000, mid: 85000, senior: 130000 },
    { dept: "Marketing",   junior: 38000, mid: 65000, senior: 95000 },
    { dept: "Sales",       junior: 35000, mid: 58000, senior: 88000 },
    { dept: "HR",          junior: 33000, mid: 52000, senior: 78000 },
    { dept: "Data",        junior: 55000, mid: 95000, senior: 145000 },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Average Salary by Department and Seniority (GroupBy result)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        This is the kind of insight groupby().agg() produces in one line of pandas.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
            tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [typeof v === "number" ? `$${v.toLocaleString()}` : String(v)]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="junior" name="Junior" fill="#93c5fd" />
          <Bar dataKey="mid"    name="Mid"    fill="#3b82f6" />
          <Bar dataKey="senior" name="Senior" fill="#1d4ed8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
