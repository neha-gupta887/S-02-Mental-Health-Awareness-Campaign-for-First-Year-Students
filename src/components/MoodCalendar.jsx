import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getMoodHistory } from "../services/moodService";

function MoodCalendar() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const loadMoods = async () => {
      const data = await getMoodHistory();
      setMoods(data);
    };

    loadMoods();
  }, []);

  const getMoodEmoji = (date) => {
    const mood = moods.find((item) => {
      if (!item.createdAt) return false;

      const moodDate = item.createdAt.toDate();

      return (
        moodDate.getDate() === date.getDate() &&
        moodDate.getMonth() === date.getMonth() &&
        moodDate.getFullYear() === date.getFullYear()
      );
    });

    return mood ? mood.emoji : "";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        📅 Mood Calendar
      </h2>

      <Calendar
        tileContent={({ date }) => (
          <div className="text-center text-lg">
            {getMoodEmoji(date)}
          </div>
        )}
      />
    </div>
  );
}

export default MoodCalendar;