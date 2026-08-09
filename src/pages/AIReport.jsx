import {
  FaBrain,
  FaMoon,
  FaBookOpen,
  FaHeartbeat,
  FaTasks,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const ICONS = {
  "MOOD ANALYSIS": <FaBrain />,
  "SLEEP ANALYSIS": <FaMoon />,
  "STUDY ANALYSIS": <FaBookOpen />,
  "CRISIS ANALYSIS": <FaExclamationTriangle />,
  "TODAY'S WELLNESS PLAN": <FaTasks />,
  "BURNOUT PREDICTION": <FaHeartbeat />,
  "AI EXPLANATION": <FaInfoCircle />,
};

function parseReport(text) {
  if (!text || !text.includes("ManaSetu AI Wellness Report")) {
    return null;
  }

  const sections = text.split("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━").map((s) => s.trim());
  const reportData = {};

  sections.forEach((section) => {
    const lines = section.split("\n").filter(Boolean);
    if (lines.length === 0) return;

    const title = lines[0].trim();
    const content = lines.slice(1).join("\n");

    if (ICONS[title]) {
      const details = {};
      let currentSubheading = null;
      let currentText = "";

      content.split("\n").forEach((line) => {
        line = line.trim();
        if (!line) return;

        if (line.endsWith(":")) {
          const [key, value] = line.split(/:(.*)/s);
          details[key.trim()] = value.trim();
        } else if (
          line.toUpperCase() === "SUMMARY" ||
          line.toUpperCase() === "RECOMMENDATION" ||
          line.toUpperCase() === "REASONS" ||
          line.toUpperCase() === "RECOMMENDED TASKS"
        ) {
          if (currentSubheading) {
            details[currentSubheading] = currentText.trim();
          }
          currentSubheading = line.toLowerCase();
          currentText = "";
        } else if (line.startsWith("✔") || line.startsWith("•")) {
          if (!details[currentSubheading]) {
            details[currentSubheading] = [];
          }
          details[currentSubheading].push(line.substring(2).trim());
        } else {
          currentText += line + "\n";
        }
      });

      if (currentSubheading) {
        details[currentSubheading] = currentText.trim();
      }

      reportData[title] = details;
    }
  });

  return reportData;
}

function AIReport({ text }) {
  const report = parseReport(text);

  if (!report) {
    return <p className="whitespace-pre-wrap">{text}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        🩺 ManaSetu AI Wellness Report
      </h2>
      {Object.entries(report).map(([title, details]) => (
        <ReportCard key={title} title={title} details={details} />
      ))}
      <p className="pt-4 text-sm text-gray-500 dark:text-gray-400">
        🌿 Thank you for using ManaSetu. Remember: Small positive habits every
        day create better mental wellbeing. 💚
      </p>
    </div>
  );
}

function ReportCard({ title, details }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3 bg-gray-50 p-4 dark:bg-gray-700/50">
        <span className="text-emerald-600 dark:text-emerald-400">
          {ICONS[title]}
        </span>
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-3 p-4 text-sm">
        {Object.entries(details).map(([key, value]) => (
          <div key={key}>
            <h4 className="font-semibold capitalize text-gray-700 dark:text-gray-300">
              {key}
            </h4>
            {Array.isArray(value) ? (
              <ul className="mt-1 list-inside list-disc space-y-1 pl-2 text-gray-600 dark:text-gray-400">
                {value.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-gray-600 dark:text-gray-400">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIReport;