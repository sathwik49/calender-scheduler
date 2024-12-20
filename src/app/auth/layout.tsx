import type { Metadata } from "next";

export const metadata:Metadata = {
  title:"Sign Up",
  description:"Cal Organizer Sign up page"
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex justify-center items-center bg-gradient-to-tl from-sky-400 to-blue-600">
        {children}
      </body>
    </html>
  );
}
