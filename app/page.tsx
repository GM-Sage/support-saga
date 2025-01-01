import Hero from "./components/Hero";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src="/images/heroplaceholder.jpg" // Temporary placeholder image
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] drop-shadow-md">
            Welcome to Support Saga
          </h1>
          <p className="mt-2 text-lg md:text-xl text-[var(--color-text)]">
            Empowering your tech, gaming, and management journey
          </p>
        </div>
      </div>

{/* Introduction Section */}
<section className="py-12">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">
      What is Support Saga?
    </h2>
    <p className="text-lg leading-relaxed mb-8">
      Support Saga is your one-stop destination for high-quality technical and gaming support,
      management insights, and more. Explore our consulting services, learn new skills from our
      comprehensive classes, or grab some exclusive merch!
    </p>
    <div className="homepage-buttons flex justify-center gap-4 flex-wrap">
  <Link href="/consulting" className="homepage-button">
    Explore Consulting
  </Link>
  <Link href="/classes" className="homepage-button-outline">
    Learn New Skills
  </Link>
  <Link href="/products" className="homepage-button-icon">
    Shop Merch
  </Link>
</div>


  </div>
</section>



      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--color-primary)]">
            Our Key Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <Image
                src="/images/consultplaceholder.jpg"
                alt="Consulting"
                width={250}
                height={250}
                className="mx-auto rounded-full transform transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:border-[var(--color-primary)] group-hover:border-4"
              />
              <h3 className="text-xl font-semibold mt-4 text-[var(--color-primary)]">
                Consulting
              </h3>
              <p className="mt-2">Expert advice for gaming and technical support solutions.</p>
            </div>
            <div className="text-center group">
              <Image
                src="/images/classesplaceholder.jpg"
                alt="Classes"
                width={250}
                height={250}
                className="mx-auto rounded-full transform transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:border-[var(--color-primary)] group-hover:border-4"
              />
              <h3 className="text-xl font-semibold mt-4 text-[var(--color-primary)]">
                Classes
              </h3>
              <p className="mt-2">Learn valuable skills to level up your career.</p>
            </div>
            <div className="text-center group">
              <Image
                src="/images/productplaceholder.jpg"
                alt="Merchandise"
                width={250}
                height={250}
                className="mx-auto rounded-full transform transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:border-[var(--color-primary)] group-hover:border-4"
              />
              <h3 className="text-xl font-semibold mt-4 text-[var(--color-primary)]">
                Merch
              </h3>
              <p className="mt-2">Exclusive gear and products for our fans.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
