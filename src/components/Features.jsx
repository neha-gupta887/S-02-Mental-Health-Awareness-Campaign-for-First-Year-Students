function Features() {
  const features = [
    {
      title: "Mood Tracker",
      icon: "😊",
      description: "Track your daily emotions and visualize your mood journey.",
    },
    {
      title: "AI Companion",
      icon: "🤖",
      description: "Get instant emotional support and wellness guidance.",
    },
    {
      title: "Breathing Exercises",
      icon: "🌿",
      description: "Reduce stress with guided breathing and mindfulness sessions.",
    },
    {
      title: "Daily Journal",
      icon: "📖",
      description: "Write your thoughts and reflect on your day.",
    },
    {
      title: "Mentor Connect",
      icon: "🤝",
      description: "Reach out to mentors whenever you need support.",
    },
    {
      title: "Resource Library",
      icon: "📚",
      description: "Access curated articles, videos, and wellness resources.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need for Better Mental Wellness
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            MindBridge brings together powerful tools to help students stay
            emotionally healthy, connected, and supported.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl p-8 hover:bg-green-100 hover:-translate-y-2 transition-all duration-300 shadow-md"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-5 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;