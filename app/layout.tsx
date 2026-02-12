import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-retro",
  subsets: ["latin"],
  // Tambahkan '700' jika belum ada, tapi Space Grotesk biasanya support variable weight
  weight: ["400", "700"], 
});

export const metadata: Metadata = {
  title: "Neon Survey",
  description: "A retro pop style survey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}