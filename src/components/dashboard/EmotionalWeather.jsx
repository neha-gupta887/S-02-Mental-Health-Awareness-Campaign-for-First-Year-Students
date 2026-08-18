import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaSeedling } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import { getMoodHistory } from "../../../services/moodService";
import LoadingState from "../../../LoadingState";

const weatherMapping = {
    Happy: { icon: "☀️", summary: "Feeling Bright", message: "Your recent check-ins have been mostly positive.", bg: "from-sky-400 to-blue-500" },
    Calm: { icon: "🌤️", summary: "Mostly Calm", message: "Your recent check-ins have been mostly calm.", bg: "from-teal-400 to-emerald-500" },
    Excited: { icon: "🤩", summary: "Feeling Excited", message: "Your recent check-ins show a lot of excitement.", bg: "from-amber-400 to-orange-500" },
    Good: { icon: "😊", summary: "Feeling Good", message: "Your recent check-ins have been positive.", bg: "from-green-400 to-lime-500" },
    Neutral: { icon: "⛅", summary: "A Little Mixed", message: "Your recent check-ins look fairly balanced.", bg: "from-slate-400 to-gray-500" },
    Okay: { icon: "🙂", summary: "Feeling Okay", message: "Your recent check-ins are stable.", bg: "from-cyan-400 to-sky-500" },
    Sad: { icon: "🌧️", summary: "A Little Heavy", message: "Your recent check-ins suggest you may be having a quieter day.", bg: "from-indigo-400 to-purple-500" },
    Anxious: { icon: "😟", summary: "Feeling Anxious", message: "Your recent check-ins suggest some anxiety.", bg: "from-rose-400 to-pink-500" },
    Angry: { icon: "🌪️", summary: "Intense Weather", message: "Your recent check-ins show some intense moments.", bg: "from-red-500 to-rose-600" },
    Stressed: { icon: "🌩️", summary: "Feeling Stressed", message: "Your recent check-ins suggest you've been feeling under some pressure.", bg: "from-gray-600 to-slate-700" },
    Low: { icon: "😔", summary: "Feeling Low", message: "Your recent check-ins suggest you're feeling a bit down.", bg: "from-blue-600 to-indigo-700" },
};

const EmotionalWeather = () => {
    const [moodHistory, setMoodHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            const fetchMoods = async () => {
                setIsLoading(true);
                try {
                    const moods = await getMoodHistory();
                    setMoodHistory(moods);
                } catch (err) {
                    console.error("Failed to fetch mood history for weather:", err);
                    setError("Could not load your emotional weather.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchMoods();
        }
    }, [user]);

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-3xl text-white shadow-lg">
                <FaSeedling />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Your weather is waiting</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Check in with yourself to see your emotional weather.</p>
            <button
                onClick={() => navigate('/mood-check-in')} 
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5"
            >
                <FaPlus /> Check In
            </button>
        </div>
    );

    if (isLoading) {
        return <LoadingState message="Loading emotional weather..." />;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    if (moodHistory.length === 0) {
        return renderEmptyState();
    }

    const latestMood = moodHistory[0]?.mood;
    const weather = weatherMapping[latestMood] || weatherMapping.Neutral;

    const recentMoodsForTimeline = moodHistory.slice(0, 5).reverse(); // Oldest first for timeline

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${weather.bg} p-6 text-white shadow-lg`}
        >
            <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">🌦️ Your Emotional Weather</h2>
            <div className="mt-4 flex flex-col items-center text-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-7xl"
                >
                    {weather.icon}
                </motion.div>
                <h3 className="mt-2 text-3xl font-bold">{weather.summary}</h3>
                <p className="mt-1 max-w-xs opacity-90">{weather.message}</p>
            </div>

            {recentMoodsForTimeline.length > 0 && (
                <div className="mt-6 border-t border-white/20 pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-center opacity-80">Recent Weather</h4>
                    <div className="mt-3 flex justify-around">
                        {recentMoodsForTimeline.map(mood => {
                            const moodWeather = weatherMapping[mood.mood] || weatherMapping.Neutral;
                            const date = mood.createdAt?.toDate ? mood.createdAt.toDate() : new Date();
                            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                            return (
                                <div key={mood.id} className="flex flex-col items-center text-center">
                                    <span className="text-2xl">{moodWeather.icon}</span>
                                    <span className="mt-1 text-xs font-semibold opacity-90">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
             <div className="mt-6 text-center">
                 <button
                    onClick={() => navigate('/mood-check-in')}
                    className="rounded-full bg-white/20 px-6 py-2 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
                >
                    Check In
                </button>
            </div>
        </motion.div>
    );
};

export default EmotionalWeather;
