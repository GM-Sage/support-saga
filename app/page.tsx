// app/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect } from "react";
import Button from "@components/Button";

export default function HomePage() {
  useEffect(() => {
    // Load Google Analytics
    const loadGA = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push({ event: args[0], ...args[1] });
      }
      gtag("js", new Date());
      gtag("config", "YOUR_GA_TRACKING_ID");
    };

    // Add the Google Analytics script dynamically
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID`;
    script.async = true;
    script.onload = loadGA;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      {/* Head Section for Meta and Analytics */}
      <Head>
        <title>Support Saga - Empower Your Tech, Gaming, and Management Journey</title>
        <meta
          name="description"
          content="Support Saga offers top-tier technical and gaming support, management consultations, and engaging educational classes."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Support Saga",
              "url": "https://yoursite.com",
              "logo": "https://yoursite.com/images/logo.png",
              "description":
                "Providing unparalleled technical and gaming support, management consultations, and engaging educational classes.",
            }),
          }}
        />
      </Head>

      {/* 
        Main container uses var(--color-background) and var(--color-text) 
        to match globals.css.
      */}
      <main className="bg-[var(--color-background)] text-[var(--color-text)]">
        {/* Hero Section */}
        <div className="relative w-full h-screen overflow-hidden">
          <Image
            src="/images/heroplaceholder.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 hover:bg-black/40 transition-opacity">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-primary)]">
              Empower Your Journey with Support Saga
            </h1>
            <p className="mt-4 text-xl md:text-2xl max-w-2xl">
              Unleashing top-tier tech, gaming, and management solutions tailored for you.
            </p>
            <div className="homepage-buttons mt-8">
              <Button href="#features" variant="primary">
                Discover More
              </Button>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="py-16 px-4 bg-[var(--color-background)] text-[var(--color-text)]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to Support Saga
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              At Support Saga, we blend expertise and passion to provide unparalleled technical and gaming support,
              insightful management consultations, and engaging educational classes. Whether you're a gamer,
              a tech enthusiast, or a professional seeking growth, we're here to elevate your experience.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-4 bg-[var(--color-secondary)] text-[var(--color-text)]">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Key Offerings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <FeatureCard
                href="/consulting"
                image="/images/consultplaceholder.jpg"
                title="Consulting"
                description="Receive expert advice and tailored solutions for your tech and gaming needs."
              />
              <FeatureCard
                href="/classes"
                image="/images/classesplaceholder.jpg"
                title="Classes"
                description="Enhance your skills with our comprehensive and engaging courses."
              />
              <FeatureCard
                href="/products"
                image="/images/productplaceholder.jpg"
                title="Merch"
                description="Discover exclusive gear and products designed for our community."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-[var(--color-background)] text-[var(--color-text)]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Trusted by Professionals and Gamers Alike
            </h2>
            <p className="text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
              Our commitment to excellence has earned us the trust of numerous clients and enthusiasts.
              Hear what they have to say about their experience with Support Saga.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Testimonial
                quote="Support Saga transformed our IT infrastructure with their expert consulting. Highly recommended!"
                name="Alex Johnson"
                role="IT Manager at TechCorp"
              />
              <Testimonial
                quote="The classes offered are top-notch. I've significantly improved my gaming strategies and technical skills."
                name="Jamie Lee"
                role="Professional Gamer"
              />
              <Testimonial
                quote="Their merchandise is not only stylish but also of excellent quality. Proud to represent Support Saga!"
                name="Morgan Davis"
                role="Entrepreneur"
              />
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 px-4 bg-[var(--color-primary)] text-[var(--color-text)]">
          <div className="container mx-auto text-center">
            {/* Overriding the global h2 color by specifying the text color explicitly */}
            <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
              Ready to Elevate Your Experience?
            </h2>
            <p className="max-w-xl mx-auto mb-8">
              Join Support Saga today and take the next step towards mastering your tech, gaming, and management endeavors.
            </p>
            {/* 
              Updated the Button component usage with variants 
              ensuring proper styling via CSS variables.
            */}
            <Button href="/consulting" variant="primary">
              Get Started
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper Components (FeatureCard, Testimonial)
function FeatureCard({ href, image, title, description }: any) {
  return (
    <Link href={href} className="text-center group focus:outline-none">
      <div className="relative w-60 h-60 mx-auto">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-full transform transition-transform group-hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-semibold mt-6 text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-3 text-base opacity-90">
        {description}
      </p>
    </Link>
  );
}

function Testimonial({ quote, name, role }: any) {
  return (
    <div className="p-6 bg-[var(--color-secondary)] rounded-lg shadow-lg">
      <p className="opacity-90">{quote}</p>
      <h4 className="mt-4 text-xl font-semibold">{name}</h4>
      <span className="opacity-70">{role}</span>
    </div>
  );
}