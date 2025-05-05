import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story Maker",
  description: "Create magical bedtime stories with your kids using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fantasy">
      <body className={inter.className}>
        <div className="min-h-screen bg-base-100">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
