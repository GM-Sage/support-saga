// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-[var(--color-secondary)] text-[var(--color-text)] py-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">Reference</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">Follow Us</h3>
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">Products</h3>
          <ul className="space-y-2">
            <li>
              <a href="/products" className="hover:underline">
                Merch
              </a>
            </li>
            <li>
              <a href="/classes" className="hover:underline">
                Classes
              </a>
            </li>
            <li>
              <a href="/consulting" className="hover:underline">
                Consulting
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-[var(--color-text)]">
        © 2024 Support Saga. All rights reserved.
      </div>
    </footer>
  );
}