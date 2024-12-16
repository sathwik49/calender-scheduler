import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CalOrganizer",
  description: "A Simple Calender schedulling app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
