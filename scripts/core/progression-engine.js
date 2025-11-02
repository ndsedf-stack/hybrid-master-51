// =============================
// PROGRESSION ENGINE
// =============================

export function calculateProgression(week, baseWeight, increment = 2.5) {
  if (!week || week < 1) return baseWeight;
  return baseWeight + (week - 1) * increment;
}

export function getDeloadFactor(week) {
  if ([7, 14, 21].includes(week)) return 0.8; // semaines de deload
  return 1.0;
}
