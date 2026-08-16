import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { isToday } from "date-fns";

const COLLECTION = "garden";

// XP required for each level
const LEVELS = [
  { level: 1, xp: 0, tree: "🌱", title: "Seed" },
  { level: 2, xp: 50, tree: "🌿", title: "Growing Plant" },
  { level: 3, xp: 150, tree: "🌳", title: "Healthy Tree" },
  { level: 4, xp: 300, tree: "🌸", title: "Blooming Tree" },
  { level: 5, xp: 500, tree: "🌺", title: "Wellness Forest" },
];

// Calculate current level from XP
const calculateLevel = (xp) => {
  let current = LEVELS[0];

  for (const level of LEVELS) {
    if (xp >= level.xp) {
      current = level;
    }
  }

  return current;
};

// Get Garden Data
export const getGardenData = async () => {
  const user = auth.currentUser;

  if (!user) return null;

  const ref = doc(db, COLLECTION, user.uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const initial = {
      uid: user.uid,
      xp: 0,
      level: 1,
      tree: "🌱",
      treeTitle: "Seed",
      streak: 0,
      completedDailyRewards: [], // New field
      lastRewardResetDate: serverTimestamp(), // New field
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, initial);

    return initial;
  }

  const gardenData = snap.data();

  // Check if daily rewards need to be reset
  const lastResetDate = gardenData.lastRewardResetDate?.toDate();
  if (!lastResetDate || !isToday(lastResetDate)) {
    // It's a new day or no reset date exists, reset rewards
    await updateDoc(ref, {
      completedDailyRewards: [],
      lastRewardResetDate: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    gardenData.completedDailyRewards = [];
    gardenData.lastRewardResetDate = new Date(); // Update locally for immediate use
  }

  return gardenData;
};

// Add XP
export const addXP = async (amount) => {
  const user = auth.currentUser;

  if (!user) return;

  const ref = doc(db, COLLECTION, user.uid);

  const snap = await getDoc(ref);
  let latestSnap = snap;
  if (!snap.exists()) {
    await getGardenData();
    const recheck = await getDoc(ref);
    if (!recheck.exists()) {
      console.error("Garden document still missing after initialization attempt.");
      return;
    }
    latestSnap = recheck;
  }
  
  const currentXP = latestSnap.data().xp || 0;

  const newXP = currentXP + amount;

  const currentLevel = calculateLevel(newXP);

  await updateDoc(ref, {
    xp: increment(amount),
    level: currentLevel.level,
    tree: currentLevel.tree,
    treeTitle: currentLevel.title,
    updatedAt: serverTimestamp(),
  });

  return {
    xp: newXP,
    level: currentLevel.level,
    tree: currentLevel.tree,
    treeTitle: currentLevel.title,
  };
};

// New function to claim a daily reward
export const claimDailyReward = async (rewardId, xpAmount) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No authenticated user to claim reward.");
    return { success: false, message: "User not authenticated." };
  }

  const ref = doc(db, COLLECTION, user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.error("Garden document not found for user:", user.uid);
    return { success: false, message: "Garden data not found." };
  }

  const gardenData = snap.data();
  let completedDailyRewards = gardenData.completedDailyRewards || [];
  const lastRewardResetDate = gardenData.lastRewardResetDate?.toDate();

  // Re-check for daily reset in case getGardenData wasn't called recently
  if (!lastRewardResetDate || !isToday(lastRewardResetDate)) {
    completedDailyRewards = []; // Reset for new day
    await updateDoc(ref, {
      completedDailyRewards: [],
      lastRewardResetDate: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  if (completedDailyRewards.includes(rewardId)) {
    return { success: false, message: "Reward already claimed today." };
  }

  try {
    const updatedXPInfo = await addXP(xpAmount); // Use existing addXP logic
    completedDailyRewards.push(rewardId);

    await updateDoc(ref, {
      completedDailyRewards: completedDailyRewards,
      updatedAt: serverTimestamp(),
    });

    return { success: true, message: "Reward claimed successfully!", ...updatedXPInfo, completedDailyRewards: completedDailyRewards };
  } catch (error) {
    console.error("Error claiming daily reward:", error);
    return { success: false, message: "Failed to claim reward." };
  }
};
