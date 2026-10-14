import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-provider";
import { Toaster } from "sonner";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scribo",
  description:
    "Long reads on code, design and the web, from the people who build it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:h-10 focus:items-center focus:rounded-full focus:bg-paper-elevated focus:px-4 focus:text-sm focus:shadow-[var(--shadow-md)] focus:outline-none"
        >
          Skip to content
        </a>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            <QueryProvider>{children}</QueryProvider>
            <Toaster
              richColors
              position="top-right"
              toastOptions={{
                className: "font-sans",
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
