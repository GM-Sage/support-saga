"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isConsultingDropdownOpen, setIsConsultingDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { cartItems } = useCart();
  const pathname = usePathname() || "";
  const { data: session } = useSession();

  const navItems = [
    { name: "Consulting", path: "/consulting" },
    { name: "Products", path: "/products" },
    { name: "Classes", path: "/classes" },
    { name: "About Us", path: "/about" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/account" });
  };

  return (
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
      <form onSubmit={handleSearch} className={styles.navbarSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className={styles.navbarSearchInput}
        />
        <button type="submit" className={styles.navbarSearchButton}>
          Search
        </button>
      </form>
      <div className={styles.navbarButtons}>
        <div className="relative" ref={dropdownRef}>
          {session ? (
            <>
              <button
                className={`${styles.navbarUserButton} button`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUserCircle size={24} />
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/account">
                    <button className={styles.dropdownItem}>My Account</button>
                  </Link>
                  <Link href="/orders">
                    <button className={styles.dropdownItem}>Order History</button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={styles.dropdownItem}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/account">
              <button className={`${styles.navbarButton} button`}>Sign In</button>
            </Link>
          )}
        </div>
        <Link href="/checkout">
          <button className={`${styles.cartButton} button`}>
            <FaShoppingCart size={18} />
            <span className={styles.cartCount}>{cartItems.length || 0}</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}
