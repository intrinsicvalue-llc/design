import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Intrinsic Design",
    template: "%s · Intrinsic Design",
  },
  description:
    "Versioned reference for Intrinsic Value tokens, themes, patterns, voice, and decisions.",
  metadataBase: new URL("https://design.intrinsicvalue.llc"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
