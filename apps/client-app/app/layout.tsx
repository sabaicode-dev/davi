import type { Metadata } from "next";
import "./globals.css";
import { Inter} from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`h-screen flex flex-col justify-between bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
