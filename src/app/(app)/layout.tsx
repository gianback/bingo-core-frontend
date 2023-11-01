import { Header } from "@/components/Header";
import "../globals.css";
import type { Metadata } from "next";
import { validateToken } from "@/utils/validate-token";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await validateToken();
  if (!isLogged) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
