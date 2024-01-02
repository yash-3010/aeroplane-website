import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Provider from "./context/user";
import CartProvider from "./context/cart";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata = {
  title: "Vimaneuver",
  description: "Legasy airplane company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <CartProvider>
            <Toaster position="bottom-left" reverseOrder={true} />
            <Navbar />
            {children}
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
