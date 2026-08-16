"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from "recharts";

/* ─────────────────────────────────────────────────────
   1. Parabola Chart (y = x^2)
───────────────────────────────────────────────────── */
export function ParabolaChart() {
  const data = [];
  for (let x = -5; x <= 5; x += 0.5) {
    data.push({ x: Number(x.toFixed(1)), y: Number((x ** 2).toFixed(2)) });
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        ក្រាហ្វិកប៉ារ៉ាបូល $y = x^2$
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        រូបរាងអក្សរ U បង្កើតឡើងដោយការភ្ជាប់ចំណុចជាច្រើនដែល $y$ ស្មើនឹងការ៉េនៃ $x$។
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="x" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
          <ReferenceLine x={0} stroke="#666" strokeWidth={1} />
          <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={3} dot={false} name="y = x^2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   2. Function Transformation Chart (y=x^2 vs y=(x-2)^2)
───────────────────────────────────────────────────── */
export function FunctionTransformationChart() {
  const data = [];
  for (let x = -4; x <= 6; x += 0.5) {
    data.push({ 
      x: Number(x.toFixed(1)), 
      y1: Number((x ** 2).toFixed(2)),
      y2: Number(((x - 2) ** 2).toFixed(2))
    });
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        ការរំកិលក្រាហ្វិក (Translation)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        ការដក ២ ចេញពី $x$ មុននឹងលើកជាការ៉េ ធ្វើអោយក្រាហ្វិករំកិលទៅស្តាំ ២ ឯកតា។
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="x" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
          <ReferenceLine x={0} stroke="#666" strokeWidth={1} />
          <Line type="monotone" dataKey="y1" stroke="#ef4444" strokeWidth={2} dot={false} name="f(x) = x^2" />
          <Line type="monotone" dataKey="y2" stroke="#10b981" strokeWidth={3} dot={false} name="g(x) = (x-2)^2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   3. Sine Wave Chart
───────────────────────────────────────────────────── */
export function SineWaveChart() {
  const data = [];
  // Using radians from -2pi to 2pi
  for (let i = -12; i <= 12; i += 0.5) {
    const x = (i * Math.PI) / 6;
    data.push({ 
      x_rad: Number(x.toFixed(2)), 
      x_label: `${i/2}π`,
      y: Number(Math.sin(x).toFixed(3)) 
    });
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        អនុគមន៍ស៊ីនុស (Sine Wave)
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        ក្រាហ្វិកមានទម្រង់ជារលក ឡើងចុះៗជុំវិញអ័ក្សកណ្តាល ពី -1 ទៅ 1។
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="x_rad" tick={{ fontSize: 11 }} />
          <YAxis domain={[-1.5, 1.5]} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(val: any) => [val, "sin(x)"]} />
          <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
          <ReferenceLine x={0} stroke="#666" strokeWidth={1} />
          <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={false} name="y = sin(x)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
