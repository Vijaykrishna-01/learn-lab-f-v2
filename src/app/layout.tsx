import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/contexts/Providers";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Your learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
