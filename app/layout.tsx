import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";

export const metadata = {
  title: "Support Saga",
  description: "Empowering your tech, gaming, and management journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
        <CartProvider> {/* Wrap the app in CartProvider */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
