import CounselorCard from "../components/CounselorCard";
import SOSCard from "../components/SOSCard";
import {
  counselors,
  selfCareTips,
  faqs,
} from "../data/supportData";

function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <h1 className="text-5xl font-bold text-center text-emerald-700">
          🆘 Support Center
        </h1>

        <p className="text-center text-gray-600 mt-4">
          You're never alone. Explore support options, self-care resources,
          and connect with professional support whenever needed.
        </p>

        {/* Counselor Section */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold text-emerald-700 mb-8">
            👨‍⚕️ Connect with a Counselor
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {counselors.map((counselor) => (
              <CounselorCard
                key={counselor.id}
                counselor={counselor}
              />
            ))}

          </div>

        </div>

        {/* Emergency Helplines */}

        <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-8 mt-14 shadow-lg">

          <h2 className="text-3xl font-bold text-red-600">
            📞 Emergency Helplines
          </h2>

          <div className="mt-6 space-y-4 text-gray-700">

            <p>
              <strong>National Emergency:</strong> 112
            </p>

            <p>
              <strong>Ambulance:</strong> 108
            </p>

            <p>
              <strong>Women Helpline:</strong> 181
            </p>

            <p>
              <strong>Police:</strong> 100
            </p>

            <p className="text-sm text-gray-500 mt-4">
              If you or someone else is in immediate danger, contact your local
              emergency services right away.
            </p>

          </div>

        </div>

        {/* SOS Emergency Card */}

        <SOSCard />

        {/* Self Care Tips */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-14">

          <h2 className="text-3xl font-bold text-emerald-700 mb-8">
            🧘 Self-Care Tips
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {selfCareTips.map((tip, index) => (

              <div
                key={index}
                className="bg-emerald-50 rounded-xl p-5 border border-emerald-200"
              >
                <p className="text-gray-700">
                  🌿 {tip}
                </p>
              </div>

            ))}

          </div>

        </div>

        {/* FAQs */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-14">

          <h2 className="text-3xl font-bold text-emerald-700 mb-8">
            ❓ Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="border-b border-gray-200 pb-5"
              >

                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>

                <p className="text-gray-600 mt-2">
                  {faq.answer}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Footer */}

        <div className="text-center mt-14 text-gray-500">

          <p>
            💚 Remember: Asking for help is a sign of strength, not weakness.
          </p>

          <p className="mt-2 text-sm">
            ManaSetu supports your wellness journey, but it is not a substitute
            for professional medical or psychological care.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Support;