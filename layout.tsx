import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "keci — Discover Batumi",
  description: "Restaurants, clubs, bars and cafés in Batumi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}