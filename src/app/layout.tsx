import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./components/providers";
import { Toaster } from "@/components/ui/toaster";
import { validateRequest } from "@/lib/auth";
import { SessionProvider } from "./components/session-provider";
import { Inter } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harmony CRM Apply World Group",
  description: "Customer Resource Managment of Apply world group ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await validateRequest();
  return (
    <html lang="en">
      <body
        className={` ${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SessionProvider value={sessionData}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}



