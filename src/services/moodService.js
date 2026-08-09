import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "./firebase";

// =====================================================
// DEFAULT DASHBOARD STATS
// =====================================================

const DEFAULT_STATS = {
  wellnessScore: 0,
  streak: 0,
  journalEntries: 0,
  totalMoodEntries: 0,
  currentMood: "Calm",
};

// =====================================================
// MOOD SCORE MAP
// =====================================================

const MOOD_SCORES = {
  Happy: 100,
  Calm: 90,
  Excited: 95,
  Good: 85,
  Neutral: 70,
  Okay: 70,
  Sad: 45,
  Anxious: 40,
  Angry: 35,
  Stressed: 35,
  Low: 30,
};

// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in.");
  }

  return user;
};

// =====================================================
// CONVERT FIREBASE TIMESTAMP TO DATE
// =====================================================

const getMoodDate = (createdAt) => {
  if (!createdAt) return null;

  if (typeof createdAt.toDate === "function") {
    return createdAt.toDate();
  }

  if (createdAt.seconds) {
    return new Date(createdAt.seconds * 1000);
  }

  return null;
};

// =====================================================
// GET LOCAL DATE KEY
// =====================================================

const getDateKey = (date) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// =====================================================
// SAVE MOOD
// =====================================================

export const saveMood = async (mood, note) => {
  try {
    const user = getCurrentUser();

    if (!mood || !mood.label) {
      throw new Error("Invalid mood data.");
    }

    await addDoc(collection(db, "moods"), {
      uid: user.uid,
      email: user.email || "",
      mood: mood.label,
      emoji: mood.emoji || "",
      note: note || "",
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("❌ Error saving mood:", error);
    return false;
  }
};

// =====================================================
// GET MOOD HISTORY
// =====================================================

export const getMoodHistory = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return [];
    }

    const moodsQuery = query(
      collection(db, "moods"),
      where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(moodsQuery);

    const moods = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Newest first
    moods.sort((a, b) => {
      const aTime = getMoodDate(a.createdAt)?.getTime() || 0;
      const bTime = getMoodDate(b.createdAt)?.getTime() || 0;

      return bTime - aTime;
    });

    return moods;
  } catch (error) {
    console.error("❌ Error fetching mood history:", error);
    return [];
  }
};

// =====================================================
// CALCULATE WELLNESS SCORE
// =====================================================

const calculateWellnessScore = (moods) => {
  if (!moods.length) {
    return 0;
  }

  /*
   * Use recent mood entries first.
   * This keeps the dashboard more representative
   * of the user's current wellbeing.
   */
  const recentMoods = moods.slice(0, 14);

  const scores = recentMoods
    .map((item) => MOOD_SCORES[item.mood] ?? 60)
    .filter((score) => typeof score === "number");

  if (!scores.length) {
    return 0;
  }

  const average =
    scores.reduce((total, score) => total + score, 0) / scores.length;

  return Math.round(Math.min(Math.max(average, 0), 100));
};

// =====================================================
// CALCULATE STREAK
// =====================================================

const calculateStreak = (moods) => {
  if (!moods.length) {
    return 0;
  }

  const uniqueDates = new Set();

  moods.forEach((item) => {
    const date = getMoodDate(item.createdAt);

    if (!date) return;

    uniqueDates.add(getDateKey(date));
  });

  const dates = Array.from(uniqueDates)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a));

  if (!dates.length) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestDate = new Date(`${dates[0]}T00:00:00`);
  latestDate.setHours(0, 0, 0, 0);

  const daysSinceLatest = Math.floor(
    (today.getTime() - latestDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Streak is active only if the latest check-in
  // happened today or yesterday.
  if (daysSinceLatest > 1) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(`${dates[i - 1]}T00:00:00`);
    const previousDate = new Date(`${dates[i]}T00:00:00`);

    currentDate.setHours(0, 0, 0, 0);
    previousDate.setHours(0, 0, 0, 0);

    const difference = Math.floor(
      (currentDate.getTime() - previousDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (difference === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// =====================================================
// GET JOURNAL COUNT
// =====================================================

const getJournalCount = async (uid) => {
  try {
    const journalQuery = query(
      collection(db, "journals"),
      where("uid", "==", uid)
    );

    const journalSnapshot = await getDocs(journalQuery);

    return journalSnapshot.size;
  } catch (error) {
    console.warn("⚠️ Could not load journal entries:", error);

    return 0;
  }
};

// =====================================================
// GET DASHBOARD STATS
// =====================================================

export const getDashboardStats = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return DEFAULT_STATS;
    }

    const moodsQuery = query(
      collection(db, "moods"),
      where("uid", "==", user.uid)
    );

    const moodSnapshot = await getDocs(moodsQuery);

    const moods = moodSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        const aTime = getMoodDate(a.createdAt)?.getTime() || 0;
        const bTime = getMoodDate(b.createdAt)?.getTime() || 0;

        return bTime - aTime;
      });

    const totalMoodEntries = moods.length;

    const latestMood = moods[0];

    const currentMood = latestMood?.mood || "Calm";

    const wellnessScore = calculateWellnessScore(moods);

    const streak = calculateStreak(moods);

    const journalEntries = await getJournalCount(user.uid);

    const stats = {
      wellnessScore,
      streak,
      journalEntries,
      totalMoodEntries,
      currentMood,
    };

    return stats;
  } catch (error) {
    console.error("❌ Error getting dashboard stats:", error);

    return DEFAULT_STATS;
  }
};