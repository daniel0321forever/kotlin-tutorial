import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kotlin Tutorial — Beginner to Advanced",
  description:
    "A hands-on Kotlin tutorial with runnable code examples and detailed comments. Learn Kotlin from scratch through advanced topics like coroutines, DSLs, and delegation.",
  keywords: [
    "Kotlin tutorial",
    "learn Kotlin",
    "Kotlin for beginners",
    "Kotlin coroutines",
    "Kotlin DSL",
    "Kotlin programming",
    "Android development",
    "JVM language",
    "Kotlin examples",
    "Kotlin advanced",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Kotlin Tutorial — Beginner to Advanced",
    description:
      "A hands-on Kotlin tutorial with runnable code examples and detailed comments. Learn Kotlin from scratch through advanced topics like coroutines, DSLs, and delegation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kotlin Tutorial — Beginner to Advanced",
    description:
      "A hands-on Kotlin tutorial with runnable code examples and detailed comments. Learn Kotlin from scratch through advanced topics like coroutines, DSLs, and delegation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
