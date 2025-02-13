import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Copyright from "@/components/copyright";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import TopHeader from "@/components/layout/top-header";

import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gari Chai",
  description: "Gari Chai Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} overflow-hidden`}>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <main className="flex max-h-screen overflow-hidden">
                <Sidebar />

                <section className="flex-1 overflow-y-auto pl-[var(--sidebarWidthCollapsed)] md:pl-0">
                  <section className="min-h-screen flex flex-col">
                    <TopHeader />
                    <main>{children}</main>
                    <Copyright />
                  </section>
                </section>
              </main>
            </AuthProvider>

            <Toaster richColors />
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
