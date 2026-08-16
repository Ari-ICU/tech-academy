"use client";

import { useState } from "react";
import Link from "next/link";
import { QuizQuestion } from "@/types";

interface QuizBlockProps {
  questions: QuizQuestion[];
  nextLesson?: {
    courseSlug: string;
    moduleSlug: string;
    slug: string;
    title: string;
  } | null;
}

type Status = "unanswered" | "correct" | "incorrect";

export function QuizBlock({ questions, nextLesson }: QuizBlockProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("unanswered");
  const [attempts, setAttempts] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const totalCorrect = scores.filter(Boolean).length;

  const handleSelect = (idx: number) => {
    if (status !== "unanswered") return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === q.correctAnswer;
    setStatus(correct ? "correct" : "incorrect");
    setAttempts((a) => a + 1);
  };

  const handleRetry = () => {
    setSelected(null);
    setStatus("unanswered");
  };

  const handleNext = () => {
    // record score for this question (true if got it right at any attempt)
    const newScores = [...scores, status === "correct"];

    if (isLast) {
      setScores(newScores);
      setDone(true);
    } else {
      setScores(newScores);
      setCurrent((c) => c + 1);
      setSelected(null);
      setStatus("unanswered");
      setAttempts(0);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setStatus("unanswered");
    setAttempts(0);
    setScores([]);
    setDone(false);
  };

  // ── Results screen ──────────────────────────────────────────────
  if (done) {
    const pct = Math.round((totalCorrect / questions.length) * 100);
    const passed = pct >= 70;

    return (
      <section id="quiz" className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Quiz
        </h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <div
            className={`px-8 py-10 text-center ${
              passed
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-orange-50 dark:bg-orange-900/20"
            }`}
          >
            {/* Score ring */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  strokeWidth="8"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                  className={
                    passed
                      ? "stroke-green-500 transition-all duration-700"
                      : "stroke-orange-400 transition-all duration-700"
                  }
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {pct}%
                </span>
              </div>
            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {passed ? "Well done!" : "Keep practising"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              You got{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalCorrect}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {questions.length}
              </span>{" "}
              correct
            </p>
          </div>

          <div className="px-8 py-6 flex flex-col sm:flex-row gap-3 justify-center border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Retake Quiz
            </button>
            {nextLesson && (
              <Link
                href={`/learn/${nextLesson.courseSlug}/module/${nextLesson.moduleSlug}/lesson/${nextLesson.slug}`}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium text-center"
              >
                Next: {nextLesson.title} →
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Question screen ─────────────────────────────────────────────
  const answered = status !== "unanswered";
  const maxAttempts = 3;
  const canRetry = status === "incorrect" && attempts < maxAttempts;

  return (
    <section id="quiz" className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        🧠 Quiz
      </h2>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        {/* Header — progress */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Question {current + 1} of {questions.length}
            </span>
            {attempts > 0 && status === "incorrect" && (
              <span className="text-xs text-orange-500 dark:text-orange-400">
                {maxAttempts - attempts} attempt{maxAttempts - attempts !== 1 ? "s" : ""} left
              </span>
            )}
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{
                width: `${((current + (answered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 py-6">
          <p className="text-base font-semibold text-gray-900 dark:text-white mb-5 leading-relaxed">
            {q.question}
          </p>

          {/* Options */}
          <ul className="space-y-3">
            {q.options.map((opt, idx) => {
              let style =
                "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer";

              if (selected === idx && !answered) {
                style =
                  "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white cursor-pointer";
              }

              if (answered) {
                if (idx === q.correctAnswer) {
                  style =
                    "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 cursor-default";
                } else if (selected === idx && idx !== q.correctAnswer) {
                  style =
                    "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 cursor-default";
                } else {
                  style =
                    "border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-default opacity-60";
                }
              }

              return (
                <li key={idx}>
                  <button
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all flex items-center gap-3 ${style}`}
                  >
                    {/* Letter badge */}
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        answered && idx === q.correctAnswer
                          ? "bg-green-500 text-white"
                          : answered && selected === idx && idx !== q.correctAnswer
                          ? "bg-red-400 text-white"
                          : selected === idx && !answered
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}

                    {/* Result icon */}
                    {answered && idx === q.correctAnswer && (
                      <svg className="ml-auto w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {answered && selected === idx && idx !== q.correctAnswer && (
                      <svg className="ml-auto w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Explanation */}
          {answered && status === "incorrect" && (
            <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
                {q.explanation}
              </p>
            </div>
          )}
          {answered && status === "correct" && (
            <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                {q.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer — action buttons */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {/* Step dots */}
            {questions.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < current
                    ? "bg-blue-400"
                    : i === current
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {!answered && (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
              >
                Check Answer
              </button>
            )}
            {answered && canRetry && (
              <button
                onClick={handleRetry}
                className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            )}
            {answered && (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                {isLast ? "See Results" : "Next"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
