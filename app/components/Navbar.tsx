"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa"; // Icons
import { useCart } from "../context/CartContext"; // Import useCart hook
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isConsultingDropdownOpen, setIsConsultingDropdownOpen] = useState(false);
  const { cartItems } = useCart(); // Get cart items from CartContext

  return (
    <nav className={styles.navbar}>
      {/* Brand */}
      <div className={styles.navbarBrand}>
        <Link href="/">Support Saga</Link>
      </div>

      {/* Links */}
      <ul className={styles.navbarLinks}>
        <li
          className={styles.navbarDropdown}
          onMouseEnter={() => setIsConsultingDropdownOpen(true)}
          onMouseLeave={() => setIsConsultingDropdownOpen(false)}
        >
          <span className={styles.navbarLink}>Consulting</span>
          {isConsultingDropdownOpen && (
            <ul className={styles.dropdownContent}>
              <li>
                <Link href="/consulting/video-game-support" className={styles.dropdownLink}>
                  Video Game Support
                </Link>
              </li>
              <li>
                <Link href="/consulting/technical-support" className={styles.dropdownLink}>
                  Technical Support
                </Link>
              </li>
              <li>
                <Link href="/consulting/executive-management" className={styles.dropdownLink}>
                  Executive Management
                </Link>
              </li>
              <li>
                <Link href="/consulting/operations-management" className={styles.dropdownLink}>
                  Operations Management
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/products" className={styles.navbarLink}>
            Products
          </Link>
        </li>
        <li>
          <Link href="/classes" className={styles.navbarLink}>
            Classes
          </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className={styles.navbarButtons}>
        <button className={styles.navbarButton}>
          <FaShoppingCart size={18} style={{ marginRight: "0.5rem" }} />
          Cart ({cartItems.length}) {/* Show the cart count */}
        </button>
        <button className={styles.navbarButton}>
          <FaSignInAlt size={18} style={{ marginRight: "0.5rem" }} />
          Sign In
        </button>
      </div>
    </nav>
  );
}
