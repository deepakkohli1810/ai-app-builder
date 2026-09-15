import type { Metadata } from "next";
import { DM_Sans ,Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const lora = Lora({
  subsets: ["latin"], 
  weight: ["400" ,  "500"], 
  style:["normal" , "italic"],
  variable: "--font-lora",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300","400", "500","600", "700"],
  variable: "--font-sans "
})
export const metadata: Metadata = {
  title: "Kohli AI App Builder",
  description: "App builder for AI applications",
  icons : {
   icon:'/rename.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${lora.variable} ${dmSans.variable} font-sans `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
