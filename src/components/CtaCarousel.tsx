"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Brain, Sparkles, PieChart, Cpu } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "ត្រៀមខ្លួនក្លាយជា Data Scientist?",
    subtitle: "ចាប់ផ្តើមឥតគិតថ្លៃ។ មិនចាំបាច់ Login ទេ។",
    Icon: Zap,
    href: "/learn",
    cta: "ចាប់ផ្តើមឥឡូវ",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "ចង់ស្ទាត់ជំនាញ Machine Learning?",
    subtitle: "រៀនពីមូលដ្ឋានគ្រឹះរហូតដល់កម្រិតខ្ពស់។",
    Icon: Brain,
    href: "/learn/machine-learning",
    cta: "រៀនពី Machine Learning",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "បង្កើតកម្មវិធី AI ជាមួយ Generative AI?",
    subtitle: "ស្វែងយល់ពីរបៀបប្រើប្រាស់ LLMs ។",
    Icon: Sparkles,
    href: "/learn/generative-ai",
    cta: "រៀនពី Generative AI",
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "វិភាគទិន្នន័យជាមួយ Data Analysis?",
    subtitle: "រៀនពីរបៀបទាញយកអត្ថន័យពីទិន្នន័យ។",
    Icon: PieChart,
    href: "/learn/data-analyst-with-python",
    cta: "រៀនពី Data Analysis",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "ស្វែងយល់ស៊ីជម្រៅពី Deep Learning?",
    subtitle: "បង្កើត Neural Networks ដ៏មានឥទ្ធិពល។",
    Icon: Cpu,
    href: "/learn/deep-learning",
    cta: "រៀនពី Deep Learning",
    bgImage: "https://images.unsplash.com/photo-1675271591211-126ad94e4958?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function CtaCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Background Images Layer */}
      {slides.map((slide, idx) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-20" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <div className="relative h-[280px] sm:h-[240px] flex items-center justify-center">
          {slides.map((slide, idx) => {
            const { Icon } = slide;
            const isActive = idx === current;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-8 scale-95 pointer-events-none"
                }`}
              >
                <Icon className="w-12 h-12 mx-auto mb-6 opacity-80" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl mb-10 text-white/80">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === current ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
