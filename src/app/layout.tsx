"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import Popover from "@/components/PopOver/PopOver";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/alan-admin");

  return (
    <html lang="pt">
      <head>
        <GoogleAnalytics gaId="G-55TG5DG4FH" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8458097942323049"
          crossOrigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content="ca-pub-8458097942323049" />
        <title>Tech Fatos | Techfatos</title>
        <meta
          name="description"
          content="Portal de notícias sobre tecnologias"
        />
      </head>
      <body
        className={inter.className}
        style={{ backgroundColor: "var(--light-background)" }}
      >
        {!isAdminPage && (
          <Navbar
            home="/"
            cpu="/computadores"
            smartphones="/celulares"
            games="/jogos"
          />
        )}
        {children}
        <Popover />
        <Footer />
      </body>
    </html>
  );
}
