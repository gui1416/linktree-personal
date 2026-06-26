export const SCHEDULING_CONFIG = {
  availableDays: [1, 2, 3, 4, 5],
  timeSlots: [
    "09:00", "10:00", "11:00",
    "14:00", "15:00", "16:00", "17:00",
  ],
  sessionDurationMinutes: 30,
  minDaysAhead: 1,
  maxDaysAhead: 30,
  ownerEmail: "guirmdev@gmail.com",
  ownerName: "Guilherme Machado",
} as const;
