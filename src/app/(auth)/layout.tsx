import type { Metadata } from "next";
import "../globals.css";
import { validateToken } from "@/utils/validate-token";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Bingo App",
  description: "Play a funny Bingo Game",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await validateToken();
  if (isLogged) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
