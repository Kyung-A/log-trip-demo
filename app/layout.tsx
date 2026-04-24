import { ToastContainer } from "react-toastify";

import { DiaryProvider } from "@/features/diary/model/DiaryContext";
import { TabBarWrapper } from "@/shared/ui/TabBarWrapper";

import type { Metadata, Viewport } from "next";

import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "로그트립",
  description: "나의 여행을 기록하는 공간, 로그트립",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="w-screen bg-zinc-50 overflow-x-hidden">
        <DiaryProvider>
          <main className="max-w-3xl bg-white mx-auto min-h-screen">
            {children}
          </main>
          <TabBarWrapper />
        </DiaryProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          theme="colored"
        />
      </body>
    </html>
  );
}
