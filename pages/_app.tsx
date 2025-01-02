// pages/_app.tsx
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { CartProvider } from "../app/context/CartContext"; // Import CartProvider
import store from "../app/store/store";
import Navbar from "../app/components/Navbar/Navbar";
import Footer from "../app/components/Footer/Footer";

import "../app/globals.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {/* Wrap the CartProvider here */}
        <CartProvider>
          <div id="root" className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-6">
              <Component {...pageProps} />
            </main>
            {/* Footer */}
            <Footer />
          </div>
        </CartProvider>
      </Provider>
    </SessionProvider>
  );
}
