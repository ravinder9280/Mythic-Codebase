import "~/styles/globals.css";


import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";
import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Mythic-codebase",
  description: "A pro app",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>

    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
    </ClerkProvider>
  );
}
