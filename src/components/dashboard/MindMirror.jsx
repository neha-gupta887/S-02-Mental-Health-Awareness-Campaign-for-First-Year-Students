import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Book, Clock, Cloudy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const useMindMirror = ({ moods, journals, ritual }) => {
  const [observations, setObservations] = useState([]);
  const [gentleReflection, setGentleReflection] = useState('');
  const [hasSufficientData, setHasSufficientData] = useState(false);

  const RECENT_DAYS = 14;
  const MIN_RECORDS = 3;

  const recentMoods = useMemo(() => {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - RECENT_DAYS);
    return moods.filter(m => m.createdAt?.toDate() > dateLimit);
  }, [moods]);

  const recentJournals = useMemo(() => {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - RECENT_DAYS);
    return journals.filter(j => j.createdAt?.toDate() > dateLimit);
  }, [journals]);

  useEffect(() => {
    const generateObservations = () => {
      const allObservations = [
        getMoodPattern(recentMoods),
        getJournalPattern(recentJournals),
        getRhythmPattern(recentMoods),
        getWellnessActivityPattern(ritual),
      ].filter(Boolean); // Filter out nulls

      if (recentMoods.length + recentJournals.length < MIN_RECORDS) {
        setHasSufficientData(false);
        setObservations([]);
      } else {
        setHasSufficientData(true);
        setObservations(allObservations.slice(0, 3)); // Max 3 observations
        setGentleReflection(getGentleReflection(allObservations));
      }
    };

    generateObservations();
  }, [recentMoods, recentJournals, ritual]);

  return { observations, gentleReflection, hasSufficientData };
};

const getMoodPattern = (moods) => {
  if (moods.length < 2) return null;
  const moodCounts = moods.reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
    moodCounts[a] > moodCounts[b] ? a : b
  );

  if (!mostFrequentMood) return null;

  return {
    icon: <BarChart className="h-5 w-5 text-emerald-300" />,
    title: 'Mood',
    text: `Your recent check-ins have often been ${mostFrequentMood.toLowerCase()}.`,
  };
};

const getJournalPattern = (journals) => {
  if (journals.length < 2) return null;
  return {
    icon: <Book className="h-5 w-5 text-emerald-300" />,
    title: 'Reflection',
    text: `You've made time for journaling ${journals.length} times recently.`,
  };
};

const getRhythmPattern = (moods) => {
  if (moods.length < 3) return null;
  const timeOfDayCounts = moods.reduce(
    (acc, { createdAt }) => {
      const hour = createdAt?.toDate().getHours();
      if (hour >= 5 && hour < 12) acc.morning++;
      else if (hour >= 12 && hour < 18) acc.afternoon++;
      else acc.evening++;
      return acc;
    },
    { morning: 0, afternoon: 0, evening: 0 }
  );

  const mostFrequentTime = Object.keys(timeOfDayCounts).reduce((a, b) =>
    timeOfDayCounts[a] > timeOfDayCounts[b] ? a : b
  );

  if (timeOfDayCounts[mostFrequentTime] < 2) return null;

  return {
    icon: <Clock className="h-5 w-5 text-emerald-300" />,
    title: 'Rhythm',
    text: `Your check-ins often happen in the ${mostFrequentTime}.`,
  };
};

const getWellnessActivityPattern = (ritual) => {
  if (!ritual || !ritual.items) return null;
  const completedCount = ritual.items.filter(item => item.completed).length;
  if (completedCount > 1) {
    return {
      icon: <Zap className="h-5 w-5 text-emerald-300" />,
      title: 'Activity',
      text: `You've completed ${completedCount} wellness activities today.`,
    };
  }
  return null;
};

const getGentleReflection = (observations) => {
  if (observations.some(obs => obs.title === 'Reflection')) {
    return 'Small moments of reflection can be worth noticing.';
  }
  if (observations.some(obs => obs.title === 'Mood')) {
    return 'You\'re building a habit of checking in with yourself.';
  }
  return 'Keep noticing the small things that help you feel balanced.';
};

const MindMirrorSkeleton = () => (
    <div className="h-full w-full rounded-3xl bg-white/10 p-6 backdrop-blur-xl animate-pulse">
        <div className="h-6 w-3/4 rounded-md bg-slate-500/30 mb-4"></div>
        <div className="h-4 w-1/2 rounded-md bg-slate-500/30 mb-8"></div>
        <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-slate-500/30"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/4 rounded-md bg-slate-500/30"></div>
                        <div className="h-4 w-full rounded-md bg-slate-500/30"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const MindMirrorError = () => (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center text-white">
        <Cloudy className="mx-auto h-8 w-8 text-red-300" />
        <h3 className="mt-2 font-semibold">Couldn't load Mind Mirror</h3>
        <p className="text-sm text-white/70">There was an issue fetching your data.</p>
    </div>
);


const MindMirror = ({ moods, journals, ritual, isLoading, error }) => {
  const navigate = useNavigate();
  const { observations, gentleReflection, hasSufficientData } = -use-mind-mirror({ moods, journals, ritual });

  if (isLoading) {
    return <MindMirrorSkeleton />;
  }

  if (error) {
    return <MindMirrorError />;
  }

  if (!hasSufficientData) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/30 p-6 text-center text-white backdrop-blur-2xl ring-1 ring-white/10"
        >
            <h3 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-emerald-300 to-sky-300">
                🪞 Your Mind Mirror is getting to know you.
            </h3>
            <p className="mt-3 text-emerald-100/80">
                Keep checking in and reflecting. We'll surface gentle patterns as your activity grows.
            </p>
            <button
                onClick={() => navigate('/mood-checkin')}
                className="mt-6 rounded-full bg-emerald-400/80 px-6 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-900"
            >
                Check In
            </button>
        </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/30 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-emerald-300 to-sky-300">
          🪞 Your Mind Mirror
        </h2>
        <p className="mt-1 text-sm text-gray-300/70">What your recent activity may show</p>

        <div className="mt-6 space-y-5">
          {observations.map((obs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="flex items-start space-x-4"
            >
              <div className="rounded-full bg-emerald-900/50 p-2">
                {obs.icon}
              </div>
              <div>
                <h3 className="font-semibold text-emerald-200">{obs.title}</h3>
                <p className="text-sm text-gray-200/90">{obs.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-black/20 px-6 py-4">
        <div className="border-t border-white/10 pt-4">
          <p className="text-sm italic text-gray-300/80">
            "{gentleReflection}"
          </p>
          <p className="mt-3 text-xs text-gray-400/60">
            Based on your activity in the last {RECENT_DAYS} days.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MindMirror;
