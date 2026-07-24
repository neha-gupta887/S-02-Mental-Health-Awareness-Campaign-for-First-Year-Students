import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", mood: 4 },
  { day: "Tue", mood: 3 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 2 },
  { day: "Fri", mood: 4 },
  { day: "Sat", mood: 5 },
  { day: "Sun", mood: 4 },
];

const moodData = [
  { name: "Happy", value: 8 },
  { name: "Neutral", value: 4 },
  { name: "Sad", value: 2 },
  { name: "Anxious", value: 3 },
];

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
];

function StatsCard({ title, value, emoji }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <div className="text-4xl">{emoji}</div>

      <h3 className="mt-3 text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold text-emerald-600 mt-2">
        {value}
      </p>
    </div>
  );
}

function MoodAnalytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-emerald-700">
          📊 Mood Analytics
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Understand your emotions through meaningful insights.
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <StatsCard
            title="Current Mood"
            value="Happy 😊"
            emoji="😊"
          />

          <StatsCard
            title="Mood Streak"
            value="6 Days"
            emoji="🔥"
          />

          <StatsCard
            title="Journal Entries"
            value="18"
            emoji="📝"
          />

          <StatsCard
            title="Most Frequent"
            value="Happy"
            emoji="⭐"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              📈 Weekly Mood Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#10B981"
                  strokeWidth={4}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              🥧 Mood Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={moodData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MoodAnalytics;