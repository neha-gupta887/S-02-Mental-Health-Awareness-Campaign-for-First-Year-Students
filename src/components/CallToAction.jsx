function CallToAction() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[40px] p-12 lg:p-20 text-center shadow-2xl">

          {/* Badge */}
          <span className="inline-block bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold">
            🌿 Join the MindBridge Community
          </span>

          {/* Heading */}
          <h2 className="mt-8 text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Transform Your
            <br />
            Mental Wellness Journey?
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-lg text-green-50 leading-8">
            Take the first step toward a healthier, happier, and more balanced
            life. Join thousands of students using MindBridge to build better
            habits and improve their mental well-being every day.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition duration-300">
              Get Started
            </button>

            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <h3 className="text-4xl font-bold">10K+</h3>
              <p className="mt-2 text-green-100">
                Students Supported
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="mt-2 text-green-100">
                AI Wellness Companion
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="mt-2 text-green-100">
                Positive User Feedback
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CallToAction;