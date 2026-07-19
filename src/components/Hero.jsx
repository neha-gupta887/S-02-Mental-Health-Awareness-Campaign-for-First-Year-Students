function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-[85vh] flex items-center py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* Left Section */}
        <div>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            🌿 Student Mental Wellness Platform
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Support Your Mind,
            <br />
            <span className="text-green-600">
              One Step at a Time.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
            MindBridge empowers students to track their mood, connect with
            mentors, practice mindfulness, and receive AI-powered wellness
            support—all in one safe and supportive platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Get Started
            </button>

            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition">
              Explore Features
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <h2 className="text-3xl font-bold text-green-600">10K+</h2>
              <p className="text-gray-500">Students Supported</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-600">500+</h2>
              <p className="text-gray-500">Expert Mentors</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-600">24/7</h2>
              <p className="text-gray-500">AI Assistance</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold">😊 Mood Tracker</h3>
            <p className="mt-2 text-gray-600">
              Log your emotions and understand your daily mood patterns.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold">🤖 AI Wellness Companion</h3>
            <p className="mt-2 text-gray-600">
              Chat with an AI companion for guidance and emotional support.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold">💚 Daily Wellness Tip</h3>
            <p className="mt-2 text-gray-600 italic">
              "Small steps every day lead to a healthier and happier mind."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;