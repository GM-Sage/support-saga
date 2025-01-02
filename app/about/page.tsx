"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {
  // Example: Add a scroll position hook for parallax illusions
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      {/* 
        1. Parallax Hero Section:
           - The background image moves slightly slower than the foreground text
           - Leading to a subtle 3D effect 
      */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10 transition-transform duration-200"
          style={{
            backgroundImage: "url('/images/about-hero-placeholder.jpg')",
            transform: `translateY(${scrollY * 0.2}px)` // Parallax offset
          }}
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-primary)] drop-shadow-lg">
            Our Story
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto">
            Where passion, innovation, and a love for helping people converge.
          </p>
        </div>
      </section>

      {/* 
        2. Brand Story - Animated On Scroll
           - With fade-in effect as user scrolls
           - Uses a bit of custom Tailwind classes for transition/transform
      */}
      <section className="py-16 px-4 md:px-8 fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            Our Beginnings
          </h2>
          <p className="leading-relaxed mb-6 text-base md:text-lg">
            Support Saga was founded by a group of gamers and tech enthusiasts,
            united by a mission to deliver reliable, top-tier support solutions. 
            From humble beginnings in a cramped living room to a growing global 
            community, we’ve always kept people at the heart of what we do. 
            Whether it’s assisting you with your first gaming rig or coaching 
            teams on effective project management, we stand ready to help.
          </p>
        </div>
      </section>

      {/* 
        3. Who We Serve - Eye-Catching Split Panel
      */}
      <section className="relative flex flex-col md:flex-row items-stretch min-h-[60vh] text-white">
        {/* Left Panel / Image */}
        <div
          className="md:w-1/2 h-[40vh] md:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-who-placeholder.jpg')" }}
        />
        {/* Right Panel / Text */}
        <div className="md:w-1/2 h-auto bg-[var(--color-secondary)] flex flex-col justify-center p-8 fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
          <p className="leading-relaxed mb-4 text-sm md:text-base">
            Our doors are open to everyone—from weekend gamers aiming to 
            level up their skills, to corporate teams seeking robust tech 
            management strategies. We tailor experiences and services to 
            meet your individual or organizational needs, ensuring you 
            have the ultimate support on your journey.
          </p>
        </div>
      </section>

      {/* 
        4. How We Operate - Parallax + Grid
      */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              How We Operate
            </h2>
            <p className="leading-relaxed text-base md:text-lg">
              Everything we do revolves around creating meaningful solutions 
              for our community. By collaborating with industry professionals, 
              we craft dynamic classes, consultations, and experiences that 
              keep you on top of your game—literally and figuratively. 
              Innovation, integrity, and inclusivity power our day-to-day 
              operations.
            </p>
          </div>
          <div className="relative w-full h-[300px] fadeInUp">
            <Image
              src="/images/about-operate-placeholder.jpg"
              alt="How We Operate"
              fill
              className="object-cover rounded-md shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 
        5. Meet the Team - Animated Cards
      */}
      <section className="py-16 px-4 md:px-8 bg-[var(--color-secondary)] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Team Member */}
            <div className="group overflow-hidden rounded-lg hover:bg-white/5 transition-colors ease-in-out duration-300">
              <div className="relative w-full h-[250px]">
                <Image
                  src="/images/team-placeholder-1.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Alex - Founder & CEO</h3>
                <p className="text-sm leading-relaxed">
                  Tech visionary and gaming guru, Alex ensures we’re always 
                  reaching new heights in innovation and customer engagement.
                </p>
              </div>
            </div>

            {/* Example Team Member */}
            <div className="group overflow-hidden rounded-lg hover:bg-white/5 transition-colors ease-in-out duration-300">
              <div className="relative w-full h-[250px]">
                <Image
                  src="/images/team-placeholder-2.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Jordan - Lead Consultant</h3>
                <p className="text-sm leading-relaxed">
                  Armed with a background in IT and pro-level gaming, Jordan 
                  delivers top-tier solutions to every challenge.
                </p>
              </div>
            </div>

            {/* Example Team Member */}
            <div className="group overflow-hidden rounded-lg hover:bg-white/5 transition-colors ease-in-out duration-300">
              <div className="relative w-full h-[250px]">
                <Image
                  src="/images/team-placeholder-3.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Taylor - Course Coordinator</h3>
                <p className="text-sm leading-relaxed">
                  Taylor orchestrates our classes and ensures every participant 
                  learns, grows, and excels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        6. Persuasive CTA with Subtle Animation
      */}
      <section className="relative py-16 px-4 md:px-8 fadeInUp">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4">
            Ready to Join Our Saga?
          </h2>
          <p className="text-sm md:text-base mb-6">
            Follow us on social media, explore our classes, or book a personalized 
            consultation. We’re here to empower and inspire every step of your journey.
          </p>
          <a
            href="/consulting"
            className="inline-block px-8 py-3 bg-[var(--color-primary)] text-white font-semibold 
                       rounded-md hover:bg-[var(--color-accent)] hover:scale-105 transition-all 
                       duration-300 origin-center"
          >
            Discover Our Services
          </a>
        </div>
      </section>
    </main>
  );
}