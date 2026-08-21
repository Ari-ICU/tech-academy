import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "DataSci AI — Learn Data Science & AI from First Principles",
  description:
    "A professional learning platform for Python, Data Science, Machine Learning, Deep Learning, and Generative AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 1. Apply saved dark mode theme before paint
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}

                // 2. Strip 'bis_skin_checked' injected by the "Built In Search"
                //    browser extension before React hydrates, preventing mismatches.
                try {
                  var BIS_ATTR = 'bis_skin_checked';
                  // Strip any already-present attributes (e.g. if the extension ran early)
                  document.querySelectorAll('[' + BIS_ATTR + ']').forEach(function(el) {
                    el.removeAttribute(BIS_ATTR);
                  });
                  // Watch for attributes added after this script runs
                  var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                      if (m.type === 'attributes' && m.attributeName === BIS_ATTR) {
                        m.target.removeAttribute(BIS_ATTR);
                      }
                    });
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: [BIS_ATTR],
                    subtree: true,
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body 
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
            <div suppressHydrationWarning className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>DataSci AI — រៀន Data Science និង AI ពីគោលការណ៍ជាមូលដ្ឋាន</p>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
