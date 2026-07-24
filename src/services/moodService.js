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
      console.error("❌ No logged-in user found.");
      throw new Error("User is not logged in.");
    }

    console.log("👤 Saving mood for user:", user.uid);
    console.log("😊 Mood:", mood);

    await addDoc(collection(db, "moods"), {
      uid: user.uid,
      email: user.email,
      mood: mood.label,
      emoji: mood.emoji,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Mood saved successfully!");

    return true;
  } catch (error) {
    console.error("❌ Error saving mood:", error);
    return false;
  }
};

// Get Mood History
export const getMoodHistory = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("❌ No logged-in user found while fetching moods.");
      return [];
    }

    console.log("👤 Fetching moods for:", user.uid);

    const q = query(
      collection(db, "moods"),
      where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    console.log("📄 Documents Found:", snapshot.size);

    const moods = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📊 Mood Data:", moods);

    moods.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    return moods;
  } catch (error) {
    console.error("❌ Error fetching moods:", error);
    return [];
  }
};