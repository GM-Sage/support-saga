import { prisma } from "@/lib/prisma"; // Adjust the path if needed
import styles from "../components/Products.module.css";

export default async function ProductsPage() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
  });

  const newArrivals = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className={styles.productsContainer}>
      {/* Hero Section */}
      <div className={styles.productsHeader}>
        <h1>Explore Our Products</h1>
        <p>Find high-quality items tailored to your journey</p>
      </div>

      {/* Featured Products Section */}
      <section>
        <h2 className={styles.productTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.imageUrl || "/placeholder.jpg"} // Replace with actual URL or default
                alt={product.name}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>{product.name}</h3>
              <p className={styles.productPrice}>
                ${product.price.toFixed(2)}
              </p>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className={styles.productTitle}>New Arrivals</h2>
        <div className={styles.productsGrid}>
          {newArrivals.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.imageUrl || "/placeholder.jpg"}
                alt={product.name}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>{product.name}</h3>
              <p className={styles.productPrice}>
                ${product.price.toFixed(2)}
              </p>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
