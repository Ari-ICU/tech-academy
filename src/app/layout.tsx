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
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>DataSci AI — រៀន Data Science និង AI ពីគោលការណ៍ជាមូលដ្ឋាន</p>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
