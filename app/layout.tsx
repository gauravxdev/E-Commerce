import type { Metadata } from "next";
import "./globals.css";
import { SiteSettingsProvider } from "@/components/site-settings-provider";

export const metadata: Metadata = {
  title: "Snopex - Aesthetic Unbound",
  description: "We believe in transforming ideas into digital experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <SiteSettingsProvider>
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
