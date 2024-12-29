export default function HomePage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex flex-col items-center justify-center">
        {/* Hero Section */}
        <h1 className="text-5xl font-bold">Welcome to Support Saga</h1>
        <p className="text-xl mt-4 text-center max-w-3xl">
          Empowering customer service excellence with consulting, classes, and merchandise for video game professionals.
        </p>
        <a
          href="/about"
          className="mt-6 px-6 py-3 bg-white text-blue-900 font-semibold rounded-md hover:bg-gray-200"
        >
          Learn More
        </a>
      </div>
    );
  }  