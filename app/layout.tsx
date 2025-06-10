import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/models/Modal";
import RegisterModel from "./components/models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvide";
import LoginModel from "./components/models/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import RentModel from "./components/models/RentModel";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        <ClientOnly>
          <ToasterProvider />
          <RentModel />
          <RegisterModel />
          <LoginModel />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
