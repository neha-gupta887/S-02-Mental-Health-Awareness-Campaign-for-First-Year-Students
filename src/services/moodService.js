import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

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