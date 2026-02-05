import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import { Lexend } from "next/font/google";
import Navigation from "./separate-components/navigation";

export const metadata: Metadata = {
  title: "Dayframe",
  description: "Student Productivity and Life Goals Manager",
};

// const ubuntu = Ubuntu({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"], // ALL available weights
//   style: ["normal", "italic"],
//   variable: "--font-ubuntu",
//   display: "swap",
// });

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // ALL available weights
  style: ["normal"],
  variable: "--font-lexend",
  display: "swap",
})

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//       <body
//         className={`${lexend.variable} bg-black text-white`}
//       >
//         <Navigation/>
//         <div> 
//           {children}
//         </div>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }


// Add to layout.tsx temporarily
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${lexend.variable} bg-black text-white`} suppressHydrationWarning>
          <Navigation/>
          <main className="pt-16 min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}