// app/components/Carousel.tsx
"use client";

import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import styles from "./Carousel.module.css";

export default function Carousel() {
  return (
    <ResponsiveCarousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      className={styles.carousel}
    >
      <div>
        <img src="/images/spotlight1.jpg" alt="Spotlight 1" />
        <p className="legend">Spotlight Item 1</p>
      </div>
      <div>
        <img src="/images/spotlight2.jpg" alt="Spotlight 2" />
        <p className="legend">Spotlight Item 2</p>
      </div>
      <div>
        <img src="/images/spotlight3.jpg" alt="Spotlight 3" />
        <p className="legend">Spotlight Item 3</p>
      </div>
    </ResponsiveCarousel>
  );
}
