import jsPDF from "jspdf";

export const downloadWellnessReport = (analytics) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("ManaSetu Wellness Report", 20, 20);

  doc.setFontSize(14);

  doc.text(`Mood Entries: ${analytics.totalEntries}`, 20, 40);
  doc.text(`Current Mood: ${analytics.currentMood}`, 20, 50);
  doc.text(`Most Frequent Mood: ${analytics.mostFrequentMood}`, 20, 60);
  doc.text(`Mood Streak: ${analytics.streak} Days`, 20, 70);
  doc.text(`Wellness Score: ${analytics.wellnessScore}%`, 20, 80);

  doc.text("AI Wellness Insight", 20, 100);

  let insight = "Keep tracking your mood regularly.";

  if (analytics.currentMood === "Happy") {
    insight =
      "You have been feeling positive recently. Keep it up!";
  } else if (analytics.currentMood === "Stressed") {
    insight =
      "Recent moods indicate stress. Try breathing exercises and rest.";
  } else if (analytics.currentMood === "Sad") {
    insight =
      "Remember to take care of yourself and reach out if needed.";
  }

  doc.setFontSize(12);
  doc.text(insight, 20, 110, {
    maxWidth: 170,
  });

  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    20,
    140
  );

  doc.save("ManaSetu-Wellness-Report.pdf");
};