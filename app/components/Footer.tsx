import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-section']}>
          <h4 className={styles['footer-title']}>Reference</h4>
          <ul className={styles['footer-links']}>
            <li><a href="/privacy-policy" className={styles['footer-link']}>Privacy Policy</a></li>
            <li><a href="/terms-of-service" className={styles['footer-link']}>Terms of Service</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h4 className={styles['footer-title']}>Follow Us</h4>
          <ul className={styles['footer-links']}>
            <li><a href="https://facebook.com" className={styles['footer-link']}>Facebook</a></li>
            <li><a href="https://instagram.com" className={styles['footer-link']}>Instagram</a></li>
            <li><a href="https://twitter.com" className={styles['footer-link']}>Twitter</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h4 className={styles['footer-title']}>Products</h4>
          <ul className={styles['footer-links']}>
            <li><a href="/merch" className={styles['footer-link']}>Merch</a></li>
            <li><a href="/classes" className={styles['footer-link']}>Classes</a></li>
            <li><a href="/consulting" className={styles['footer-link']}>Consulting</a></li>
          </ul>
        </div>
      </div>
      <div className={styles['footer-copyright']}>
        © 2024 Support Saga. All rights reserved.
      </div>
    </footer>
  );
}
