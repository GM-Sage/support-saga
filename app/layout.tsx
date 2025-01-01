import "./globals.css";
import { Metadata } from "next";
import Providers from "./providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
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
        {/* The Providers component is a client component, 
            so we wrap everything in it here. */}
        <Providers>
          <Navbar user={{ name: "John Doe", loggedIn: true }} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}