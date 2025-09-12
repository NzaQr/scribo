import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Scribo",
  description: "A clean and modern blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            enableColorScheme={false}
          >
            <QueryProvider>{children}</QueryProvider>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
