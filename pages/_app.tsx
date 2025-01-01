import { SessionProvider } from "next-auth/react"; // Import SessionProvider from next-auth/react
import { Provider } from "react-redux"; // Import Redux Provider
import store from "../app/store/store"; // Adjust the path to your Redux store
import Navbar from "@components/Navbar"; // Import Navbar component
import Footer from "@components/Footer"; // Import Footer component
import "../app/globals.css"; // Import global styles

import type { AppProps } from "next/app"; // Import AppProps from next/app

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Wrap the application with SessionProvider to handle authentication sessions
    <SessionProvider session={session}>
      {/* Wrap the application with Redux Provider to handle global state */}
      <Provider store={store}>
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
      </Provider>
    </SessionProvider>
  );
}