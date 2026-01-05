import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ratheesh Portfilio",
  description: "Ratheesh's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
