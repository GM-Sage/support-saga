// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../app/store/store";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import "../app/globals.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div id="root" className="flex flex-col min-h-screen">
          <Navbar user={session?.user} />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </Provider>
    </SessionProvider>
  );
}