function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up and create your personal MindBridge profile in just a few clicks.",
    },
    {
      number: "02",
      title: "Daily Mood Check-In",
      description:
        "Record how you're feeling each day and build healthy self-awareness.",
    },
    {
      number: "03",
      title: "Get AI Wellness Support",
      description:
        "Chat with our AI companion for guidance, mindfulness, and motivation.",
    },
    {
      number: "04",
      title: "Track Your Progress",
      description:
        "View your mood trends and celebrate your mental wellness journey.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            🚀 How It Works
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Start Your Wellness Journey
            <span className="text-green-600"> in 4 Simple Steps</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8">
            MindBridge makes it easy to build healthy habits and improve your
            mental well-being with a simple, guided experience.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;