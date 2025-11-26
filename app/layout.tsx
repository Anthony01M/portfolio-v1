import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
//import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react";

/*const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/
const helvetica = localFont({
  src: "./assets/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
  weight: "100 900",
});

// ${geistSans.variable} ${geistMono.variable}

export const metadata: Metadata = {
  title: "Anthony M.",
  description: "Anthony M.'s portfolio - If you're looking for someone to hire, contact me to get a quote. | Fullstack Developer | I love doing backend stuff the most. | I mostly do the stuff that I like or that I'm interested in.",
  robots: "index, follow",
  openGraph: {
    type: "profile",
    firstName: "Anthony",
    lastName: "M.",
    gender: "Male",
    title: "Anthony M.",
    description: "Anthony M.'s portfolio - If you're looking for someone to hire, contact me to get a quote. | Fullstack Developer | I love doing backend stuff the most. | I mostly do the stuff that I like or that I'm interested in.",
    siteName: "Anthony M.",
  },
  twitter: {
    title: "Anthony M.",
    description: "Anthony M.'s portfolio - If you're looking for someone to hire, contact me to get a quote. | Fullstack Developer | I love doing backend stuff the most. | I mostly do the stuff that I like or that I'm interested in.",
  },
  keywords: [
    "Anthony M.",
    "developer",
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Python",
    "Next.js",
    "Tailwind CSS",
    "Express.js",
    "REST APIs",
    "web development",
    "software engineer"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${helvetica.variable} antialiased bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="w-full rounded-md p-4 text-center">
            <p className="text-sm">
              This portfolio has reached End of Life — a new portfolio is coming soon. Ads are displayed below (according to new policy).
            </p>
            <div id="frame" className="mt-2 w-full" style={{ position: 'relative', zIndex: 99998 }}>
              <iframe
                data-aa="2418663"
                src="https://acceptable.a-ads.com/2418663/?size=Adaptive"
                style={{ border: 0, padding: 0, width: '70%', height: 'auto', overflow: 'hidden', display: 'block', margin: 'auto' }}
                title="advertisement"
              />
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            {/* <FloatingNav /> */}
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
