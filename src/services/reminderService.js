// Check if today's mood has been logged

export const shouldShowReminder = (moods) => {
  if (!moods.length) return true;

  const today = new Date().toDateString();

  return !moods.some((mood) => {
    if (!mood.createdAt) return false;

    return mood.createdAt.toDate().toDateString() === today;
  });
};