import {
  FaSmile,
  FaRobot,
  FaLeaf,
  FaBookOpen,
  FaHandsHelping,
  FaBook,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      title: "Mood Tracker",
      icon: <FaSmile />,
      description: "Track your daily emotions and visualize your mood journey.",
    },
    {
      title: "AI Companion",
      icon: <FaRobot />,
      description: "Get instant emotional support and wellness guidance.",
    },
    {
      title: "Breathing Exercises",
      icon: <FaLeaf />,
      description: "Reduce stress with guided breathing and mindfulness sessions.",
    },
    {
      title: "Daily Journal",
      icon: <FaBookOpen />,
      description: "Write your thoughts and reflect on your day.",
    },
    {
      title: "Mentor Connect",
      icon: <FaHandsHelping />,
      description: "Reach out to mentors whenever you need support.",
    },
    {
      title: "Resource Library",
      icon: <FaBook />,
      description: "Access curated articles, videos, and wellness resources.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            ✨ Our Features
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Everything You Need for
            <span className="text-green-600"> Better Mental Wellness</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8">
            ManaSetu brings together powerful tools to help students stay
            emotionally healthy, connected, and supported throughout their
            academic journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
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