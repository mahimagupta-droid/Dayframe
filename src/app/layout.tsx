import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import { Lexend } from "next/font/google";
import Navigation from "./separate-components/navigation";
import {Toaster} from "react-hot-toast";
export const metadata: Metadata = {
  title: "Dayframe",
  description: "Student Productivity and Life Goals Manager",
  icons: {
    icon: "/icon.png",
  }
};

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // ALL available weights
  style: ["normal"],
  variable: "--font-lexend",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${lexend.variable} bg-black text-white`} suppressHydrationWarning>
          <Navigation/>
          <main className="min-h-[calc(100vh-64px)]">
            {children}
            <Toaster position="top-center"/>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}