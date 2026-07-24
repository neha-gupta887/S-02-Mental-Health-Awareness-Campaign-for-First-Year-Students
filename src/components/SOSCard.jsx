import { emergencyContacts, getEmergencyTips } from "../services/emergencyService";

function SOSCard() {
  const tips = getEmergencyTips();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-red-600">
        🚨 Emergency Support
      </h2>

      <p className="text-gray-600 mt-2">
        If you're feeling overwhelmed, take a moment to breathe and reach out
        to someone you trust.
      </p>

      {/* SOS Button */}

      <div className="mt-8 flex justify-center">

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg transition"
          onClick={() =>
            alert(
              "🚨 Stay calm.\n\nContact a trusted person immediately.\nIf this is a medical emergency, contact your local emergency services."
            )
          }
        >
          🚨 SOS
        </button>

      </div>

      {/* Trusted Contacts */}

      <div className="mt-10">

        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Trusted Contacts
        </h3>

        <div className="space-y-4">

          {emergencyContacts.map((contact) => (

            <div
              key={contact.id}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-4"
            >

              <div>

                <h4 className="font-semibold">
                  {contact.name}
                </h4>

                <p className="text-gray-500">
                  {contact.relation}
                </p>

              </div>

              <a
                href={`tel:${contact.phone}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                📞 Call
              </a>

            </div>

          ))}

        </div>

      </div>

      {/* Emergency Tips */}

      <div className="mt-10">

        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Stay Calm
        </h3>

        <ul className="space-y-3">

          {tips.map((tip, index) => (

            <li
              key={index}
              className="bg-emerald-50 border border-emerald-100 rounded-lg p-3"
            >
              ✅ {tip}
            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default SOSCard;