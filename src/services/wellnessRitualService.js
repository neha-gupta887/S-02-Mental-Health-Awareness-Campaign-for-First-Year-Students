import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const getTodaysDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const wellnessRitualCollectionRef = (userId) => `users/${userId}/wellnessRituals`;

const initialRitualItems = [
  { id: 1, emoji: '🧘', title: 'Start your day mindfully', description: 'Take 2 minutes to pause, breathe, and set an intention.', completed: false },
  { id: 2, emoji: '🫁', title: 'Take 5 mindful breaths', description: 'Pause for a few slow breaths when your mind feels busy.', completed: false },
  { id: 3, emoji: '💧', title: 'Drink enough water', description: 'Take regular hydration breaks throughout the day.', completed: false },
  { id: 4, emoji: '🏃', title: 'Move for 10 minutes', description: 'Walk, stretch, or step outside for a short movement break.', completed: false },
  { id: 5, emoji: '✍️', title: 'Write one thing down', description: 'Write a thought, feeling, or something you appreciate.', completed: false },
  { id: 6, emoji: '💻', title: 'Take a screen break', description: 'Step away from your phone or laptop for a few minutes.', completed: false },
  { id: 7, emoji: '🌙', title: 'Prepare for restful sleep', description: 'Create a calm wind-down routine before bedtime.', completed: false },
];

export const getTodaysWellnessRitual = async (userId) => {
  if (!userId) return null;
  const dateStr = getTodaysDateString();
  const docRef = doc(db, wellnessRitualCollectionRef(userId), dateStr);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    const newRitual = {
      date: dateStr,
      items: initialRitualItems,
      allCompleted: false,
    };
    await setDoc(docRef, newRitual);
    return newRitual;
  }
};

export const updateWellnessRitualItem = async (userId, itemId, completed) => {
  if (!userId) return;
  const dateStr = getTodaysDateString();
  const docRef = doc(db, wellnessRitualCollectionRef(userId), dateStr);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ritual = docSnap.data();
    const newItems = ritual.items.map(item =>
      item.id === itemId ? { ...item, completed } : item
    );
    
    const allCompleted = newItems.every(item => item.completed);

    await updateDoc(docRef, { items: newItems, allCompleted });
  }
};
