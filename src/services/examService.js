import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";

const examsCollection = collection(db, "exams");

/**
 * Creates or updates the exam for a specific user.
 * Only one active exam is allowed per user.
 * @param {string} userId - The user's ID.
 * @param {object} examData - The exam data ({ name, date, feeling }).
 */
export const setExam = async (userId, examData) => {
  if (!userId) {
    throw new Error("User ID is required to set an exam.");
  }

  const q = query(
    examsCollection,
    where("uid", "==", userId),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Update the existing exam
    const examDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, "exams", examDoc.id), {
      ...examData,
      updatedAt: new Date(),
    });
    return examDoc.id;
  } else {
    // Create a new exam
    const docRef = await addDoc(examsCollection, {
      uid: userId,
      ...examData,
      createdAt: new Date(),
    });
    return docRef.id;
  }
};

/**
 * Retrieves the current active exam for a user.
 * @param {string} userId - The user's ID.
 * @returns {object|null} The exam data or null if not found.
 */
export const getActiveExam = async (userId) => {
  if (!userId) {
    // Return null or throw error if no user is logged in
    return null;
  }

  const q = query(
    examsCollection,
    where("uid", "==", userId),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const examDoc = querySnapshot.docs[0];
  const examData = examDoc.data();
  
  // Convert Firestore Timestamp to JS Date
  if (examData.date && examData.date.toDate) {
    examData.date = examData.date.toDate();
  }
  
  return { id: examDoc.id, ...examData };
};

/**
 * Deletes an exam.
 * @param {string} examId - The ID of the exam document to delete.
 */
export const deleteExam = async (examId) => {
    if (!examId) {
        throw new Error("Exam ID is required to delete an exam.");
    }
    await deleteDoc(doc(db, "exams", examId));
};
