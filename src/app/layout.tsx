import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bingo App",
  description: "Play a funny Bingo Game",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
