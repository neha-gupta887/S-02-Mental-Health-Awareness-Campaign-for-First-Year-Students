import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Save Mood
export const saveMood = async (mood) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not logged in.");
    }

    await addDoc(collection(db, "moods"), {
      uid: user.uid,
      email: user.email,
      mood: mood.label,
      emoji: mood.emoji,
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error saving mood:", error);
    return false;
  }
};

// Get Mood History
export const getMoodHistory = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return [];

    const q = query(
      collection(db, "moods"),
      where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    const moods = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort newest first
    moods.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    return moods;
  } catch (error) {
    console.error("Error fetching moods:", error);
    return [];
  }
};