import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Providers from './components/Providers';

export const metadata = {
  title: 'Support Saga',
  description: 'Empowering your tech, gaming, and management journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartProvider>
            <Navbar />
            <div style={{ minHeight: 'calc(100vh - 100px)' }}>{children}</div>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
