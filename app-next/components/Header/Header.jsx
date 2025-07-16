import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Logo from "../../assets/mealsharing.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <img
            src={Logo.src}
            alt="Meal Sharing Logo"
            className={styles.logoImage}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/meals" className={styles.navLink}>
            All Meals
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
