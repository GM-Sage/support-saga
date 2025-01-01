import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
// Import SessionProvider from next-auth/react
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../app/store/store";

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
        {/* Wrap everything in SessionProvider so useSession works */}
        <SessionProvider>
          {/* Redux store provider (if you still want to use Redux in the app router) */}
          <Provider store={store}>
            <NotificationProvider>
              <CartProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </CartProvider>
            </NotificationProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}