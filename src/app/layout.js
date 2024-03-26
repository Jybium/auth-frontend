import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import Toast from "@/context/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jybium Authentication app",
  description: "Experience login, signup and pull your data in a new way",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast>
          <AuthProvider>{children}</AuthProvider>
        </Toast>
        
      </body>
    </html>
  );
}
