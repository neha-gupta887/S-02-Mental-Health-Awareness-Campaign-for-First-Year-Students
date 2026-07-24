export const emergencyContacts = [
  {
    id: 1,
    name: "Family Member",
    phone: "+91 9876543210",
    relation: "Mother",
  },
  {
    id: 2,
    name: "Best Friend",
    phone: "+91 9123456780",
    relation: "Friend",
  },
];

export function getEmergencyTips() {
  return [
    "Take slow deep breaths.",
    "Move to a safe place if possible.",
    "Call a trusted person.",
    "Drink some water.",
    "Remember: You are not alone.",
  ];
}