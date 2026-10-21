import { NextThemeProvider } from "@/providers/NextThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coming Soon",
  description: "Something new is on the way.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-theme="dark"
      data-default-theme="dark"
      data-dark-theme="dark"
      className={`${fontSans.variable} ${fontMono.variable} antialiased`}
    >
      <body>
        <NextThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
