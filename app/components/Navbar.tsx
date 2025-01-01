// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user: any;
}

export default function Navbar({ user }: NavbarProps) {
  const [isConsultingDropdownOpen, setIsConsultingDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { cartItems } = useCart();
  const pathname = usePathname() || "";

  const navItems = [
    { name: "Consulting", path: "/consulting" },
    { name: "Products", path: "/products" },
    { name: "Classes", path: "/classes" },
  ];

  const subNavItems = [
    { name: "Men's Clothing", link: "/products/men" },
    { name: "Women's Clothing", link: "/products/women" },
    { name: "Kids' & Youth Clothing", link: "/products/kids" },
    { name: "Accessories", link: "/products/accessories" },
    { name: "Home & Living", link: "/products/home" },
    { name: "All Products", link: "/products" },
  ];

  interface SearchEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: SearchEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <Link href="/">Support Saga</Link>
        </div>
        <ul className={styles.navbarLinks}>
          <li
            className={styles.navbarDropdown}
            onMouseEnter={() => setIsConsultingDropdownOpen(true)}
            onMouseLeave={() => setIsConsultingDropdownOpen(false)}
          >
            <span
              className={`${styles.navbarLink} ${
                pathname.startsWith("/consulting") ? styles.active : ""
              }`}
            >
              Consulting
            </span>
            {isConsultingDropdownOpen && (
              <ul className={styles.dropdownContent}>
                <li>
                  <Link href="/consulting/video-game-support">
                    <span className={styles.dropdownLink}>Video Game Support</span>
                  </Link>
                </li>
                <li>
                  <Link href="/consulting/technical-support">
                    <span className={styles.dropdownLink}>Technical Support</span>
                  </Link>
                </li>
                <li>
                  <Link href="/consulting/executive-management">
                    <span className={styles.dropdownLink}>Executive Management</span>
                  </Link>
                </li>
                <li>
                  <Link href="/consulting/operations-management">
                    <span className={styles.dropdownLink}>Operations Management</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {navItems.slice(1).map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <span
                  className={`${styles.navbarLink} ${
                    pathname === item.path ? styles.active : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="px-4 py-2 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)] rounded-full focus:outline-none"
          />
          <button
            type="submit"
            className="button px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-hover)] transition-all"
          >
            Search
          </button>
        </form>
        <div className={styles.navbarButtons}>
          <Link href="/checkout">
            <button className={`${styles.navbarButton} button`}>
              <FaShoppingCart size={18} style={{ marginRight: "0.5rem" }} />
              Cart ({cartItems.length})
            </button>
          </Link>
          {user ? (
            <div className="relative">
              <button
                className={`${styles.navbarUserButton} button`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUserCircle size={24} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-secondary)] text-[var(--color-text)] rounded shadow-lg">
                  <Link href="/account">
                    <span className="block px-4 py-2 hover:bg-[var(--color-accent)]">
                      My Account
                    </span>
                  </Link>
                  <Link href="/orders">
                    <span className="block px-4 py-2 hover:bg-[var(--color-accent)]">
                      Order History
                    </span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/account">
              <button className={`${styles.navbarButton} button`}>
                <FaUserCircle size={18} style={{ marginRight: "0.5rem" }} />
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
      {pathname.startsWith("/products") && (
        <div className="bg-[var(--color-secondary)] shadow-md">
          <div className="container mx-auto flex justify-center gap-4 px-6 py-4">
            {subNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-center px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-hover)] transition-all shadow-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}