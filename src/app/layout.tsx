import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import { Ubuntu } from "next/font/google";
import Navigation from "./separate-components/navigation";

export const metadata: Metadata = {
  title: "Dayframe",
  description: "Student Productivity and Life Goals Manager",
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // ALL available weights
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${ubuntu.variable} bg-black text-white`}
      >
        <Navigation/>
        <div className="top-18"> 
          {children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
