import {
  FaLock,
  FaRobot,
  FaLeaf,
  FaUserGraduate,
  FaHandsHelping,
  FaChartLine,
} from "react-icons/fa";

function WhyChoose() {
  const benefits = [
    {
      icon: <FaLock />,
      title: "Privacy First",
      description:
        "Your personal wellness data is securely stored and protected with complete privacy.",
    },
    {
      icon: <FaRobot />,
      title: "AI-Powered Guidance",
      description:
        "Receive personalized wellness suggestions and supportive conversations from our AI companion.",
    },
    {
      icon: <FaLeaf />,
      title: "Personalized Wellness",
      description:
        "Daily mood tracking, breathing exercises, and mindful activities tailored just for you.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Built for Students",
      description:
        "Designed specifically to help university students manage stress, academics, and personal growth.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Mentor & Buddy Support",
      description:
        "Connect with mentors and senior buddies whenever you need guidance or encouragement.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Your Progress",
      description:
        "Visualize your mood trends and celebrate every milestone in your mental wellness journey.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-block px-5 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            💚 Why Choose MindBridge
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            More Than Just
            <span className="text-green-600"> a Mental Wellness App</span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg leading-8">
            MindBridge combines technology, AI, and human support to create a
            safe, personalized, and empowering experience for every student.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg">
                {benefit.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {benefit.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {benefit.description}
              </p>

              <div className="mt-8 w-16 h-1 bg-green-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;