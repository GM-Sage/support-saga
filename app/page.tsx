import Hero from './components/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Welcome to Support Saga"
        subtitle="Empowering your tech, gaming, and management journey"
        backgroundImage="/hero.jpg"
      />
      <section style={{ padding: "2rem" }}>
        <h2>What is Support Saga?</h2>
        <p>
          Support Saga is your one‐stop destination for high‐quality
          technical and gaming support, management insights, and more.
          Explore our consulting services, learn new skills from our
          comprehensive classes, or grab some exclusive merch!
        </p>
      </section>
    </main>
  );
}
