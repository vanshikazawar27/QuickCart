import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700", "800"] })

export const metadata = {
  title: "QuickCart | Premium E-Commerce Experience",
  description: "Experience the next level of online shopping with QuickCart. Fast, secure, and premium.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-foreground bg-background selection:bg-orange-100 selection:text-orange-900`} >
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
