"use client";
import "./globals.css";
import Footer from "./components/FooterComponent";
import { inter } from "./fonts";
import NavbarComponent from "./components/NavbarComponent";
import { usePathname } from "next/navigation";
import { disableNavWithFooter } from "./utils/disableNavWithFooter";
import { Suspense } from "react";
import Loading from "./loading";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const path = usePathname();
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`h-screen flex flex-col justify-between bg-white ${inter.variable}`}
      >
        {/* Navbar here*/}
        <header className="w-full z-50 fixed top-0 start-0">
          {!disableNavWithFooter.includes(path) && <NavbarComponent />}
        </header>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <footer>{!disableNavWithFooter.includes(path) && <Footer />}</footer>
      </body>
    </html>
  );
}
