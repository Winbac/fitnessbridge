import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Fitness Bridge",
  description: "Premium fitness training and gym plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={12}
    toastOptions={{
      duration: 3000,

      style: {
        background: "#111827",
        color: "#fff",
        border: "1px solid #1F2937",
      },

      success: {
        iconTheme: {
          primary: "#22C55E",
          secondary: "#fff",
        },
      },

      error: {
        iconTheme: {
          primary: "#EF4444",
          secondary: "#fff",
        },
      },
    }}
  />
  
      </body>
    </html>
  );
}