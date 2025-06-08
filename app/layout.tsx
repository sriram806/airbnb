import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/models/Modal";
import RegisterModel from "./components/models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvide";
import LoginModel from "./components/models/LoginModel";

const nunito = Nunito({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "An Airbnb clone built with Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        <ClientOnly>
          <ToasterProvider />
          <RegisterModel />
          <LoginModel />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
