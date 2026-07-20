import { FaStar, FaUserCircle } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "B.Tech Student",
      review:
        "ManaSetu helped me manage academic stress and stay consistent with my daily wellness routine. The AI companion feels genuinely supportive.",
    },
    {
      name: "Priya Verma",
      role: "Computer Science Student",
      review:
        "The mood tracker and breathing exercises have become part of my daily routine. It's simple, calming, and easy to use.",
    },
    {
      name: "Rohan Mehta",
      role: "Engineering Student",
      review:
        "Having access to mentors and wellness resources in one place made a huge difference during exam season. Highly recommended!",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-block px-5 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            💬 Testimonials
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Loved by
            <span className="text-green-600"> Students</span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg leading-8">
            See what students are saying about their experience with
            ManaSetu and how it has helped improve their mental well-being.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="mt-6 text-gray-600 leading-7 italic">
                "{testimonial.review}"
              </p>

              {/* User */}
              <div className="flex items-center mt-8">
                <FaUserCircle className="text-5xl text-green-500" />

                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;