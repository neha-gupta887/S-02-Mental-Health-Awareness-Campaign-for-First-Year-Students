function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Your Mental Wellness,
          <span className="text-green-600"> Our Priority</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          MindBridge is a safe space for students to track their mood,
          connect with mentors, access wellness resources, and build healthier
          habits.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Get Started
          </button>

          <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;