import { FaRobot, FaBookOpen, FaLeaf, FaChartBar } from "react-icons/fa";

const actions = [
  {
    title: "AI Companion",
    description: "Chat with your wellness assistant.",
    icon: <FaRobot className="text-3xl text-green-600" />,
  },
  {
    title: "Journal",
    description: "Write your daily thoughts and feelings.",
    icon: <FaBookOpen className="text-3xl text-blue-600" />,
  },
  {
    title: "Meditation",
    description: "Practice guided breathing and relaxation.",
    icon: <FaLeaf className="text-3xl text-emerald-600" />,
  },
  {
    title: "Mood History",
    description: "View your mood trends over time.",
    icon: <FaChartBar className="text-3xl text-purple-600" />,
  },
];

function QuickActions() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action) => (
          <div
            key={action.title}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
          >
            {action.icon}

            <h3 className="mt-4 text-xl font-semibold">
              {action.title}
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              {action.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;