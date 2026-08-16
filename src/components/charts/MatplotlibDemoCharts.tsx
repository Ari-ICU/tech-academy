"use client";

import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ZAxis
} from "recharts";

/* ─────────────────────────────────────────────────────
   1. Line and Bar Chart Demo
───────────────────────────────────────────────────── */
export function LineAndBarDemoChart() {
  const data = [
    { month: "Jan", sales: 1500, users: 400 },
    { month: "Feb", sales: 1800, users: 450 },
    { month: "Mar", sales: 2200, users: 500 },
    { month: "Apr", sales: 2600, users: 600 },
    { month: "May", sales: 2900, users: 700 },
    { month: "Jun", sales: 3200, users: 800 },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Line Chart: កំណើនអ្នកប្រើប្រាស់ (Users Trend)
      </h4>
      <ResponsiveContainer width="100%" height={220} className="mb-6">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="users" name="New Users" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Bar Chart: ចំណូលប្រចាំខែ (Monthly Sales)
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="sales" name="Sales ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   2. Scatter & Histogram (Distribution) Demo
───────────────────────────────────────────────────── */
export function ScatterHistDemoChart() {
  const scatterData = Array.from({ length: 50 }).map(() => {
    const hours = Math.random() * 10;
    const baseScore = 40 + (hours * 5); // positive correlation
    const noise = (Math.random() - 0.5) * 15;
    return {
      hours: Number(hours.toFixed(1)),
      score: Math.min(100, Math.max(0, Number((baseScore + noise).toFixed(1))))
    };
  });

  const histData = [
    { bin: "0-20", count: 2 },
    { bin: "21-40", count: 5 },
    { bin: "41-60", count: 15 },
    { bin: "61-80", count: 25 },
    { bin: "81-100", count: 8 },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Scatter Plot: ទំនាក់ទំនងរវាងម៉ោងរៀន និងពិន្ទុ
      </h4>
      <ResponsiveContainer width="100%" height={220} className="mb-6">
        <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" dataKey="hours" name="Hours Studied" tick={{ fontSize: 11 }} />
          <YAxis type="number" dataKey="score" name="Exam Score" tick={{ fontSize: 11 }} />
          <ZAxis range={[60, 60]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Students" data={scatterData} fill="#f59e0b" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>

      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Histogram (Bar Chart): ការបែងចែកពិន្ទុសិស្ស
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={histData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="bin" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="count" name="Number of Students" fill="#3b82f6" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   3. Customized Plot Demo
───────────────────────────────────────────────────── */
export function CustomizedPlotDemoChart() {
  const data = [
    { year: "2019", productA: 4000, productB: 2400 },
    { year: "2020", productA: 3000, productB: 1398 },
    { year: "2021", productA: 2000, productB: 9800 },
    { year: "2022", productA: 2780, productB: 3908 },
    { year: "2023", productA: 1890, productB: 4800 },
    { year: "2024", productA: 2390, productB: 3800 },
  ];

  return (
    <div className="my-6 p-4 bg-white dark:bg-gray-900 rounded-xl border-2 border-indigo-200 dark:border-indigo-900 shadow-md">
      <h4 className="text-center font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-2">
        ការប្រៀបធៀបការលក់ផលិតផល A និង B ប្រចាំឆ្នាំ
      </h4>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fontWeight: 'bold' }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="productA" 
            name="Product A (Units)" 
            stroke="#ef4444" 
            strokeWidth={4} 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="productB" 
            name="Product B (Units)" 
            stroke="#3b82f6" 
            strokeWidth={4} 
            strokeDasharray="5 5" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
