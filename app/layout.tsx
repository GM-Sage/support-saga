import "./globals.css";
import { Metadata } from "next";
import Providers from "./providers";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // Adjusted path


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
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}