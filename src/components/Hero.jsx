function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-[85vh] flex items-center py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

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
            MindBridge empowers students to track their mood, connect with mentors,
            practice mindfulness, and receive AI-powered wellness support—all in one
            safe and supportive platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
              Get Started
            </button>

            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition duration-300">
              Explore Features
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-12 flex gap-12 flex-wrap">

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

          {/* Mood Tracker */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              😊
            </div>

            <div>
              <h3 className="text-xl font-bold">Mood Tracker</h3>
              <p className="text-gray-600 mt-2">
                Log your emotions and understand your daily mood patterns.
              </p>
            </div>

          </div>

          {/* AI Companion */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              🤖
            </div>

            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                AI Wellness Companion

                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  AI
                </span>

              </h3>

              <p className="text-gray-600 mt-2">
                Chat with an AI companion for guidance and emotional support.
              </p>
            </div>

          </div>

          {/* Wellness Tip */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              💚
            </div>

            <div>
              <h3 className="text-xl font-bold">Daily Wellness Tip</h3>

              <p className="text-gray-600 mt-2 italic">
                "Small steps every day lead to a healthier and happier mind."
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;