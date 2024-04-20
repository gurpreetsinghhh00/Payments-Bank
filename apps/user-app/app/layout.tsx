import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "../provider";
import { AppBarClient } from "../components/AppBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atlas payments bank",
  description: "One stop solution to all your banking needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppBarClient/>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
