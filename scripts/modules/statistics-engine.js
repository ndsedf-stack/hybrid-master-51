// ==================================
// STATISTICS ENGINE – version globale
// ==================================

const statsKey = "hm51_stats";

window.saveSessionStat = function (day, week, completedExercises) {
  const stats = JSON.parse(localStorage.getItem(statsKey)) || [];
  stats.push({ day, week, completedExercises, date: new Date().toISOString() });
  localStorage.setItem(statsKey, JSON.stringify(stats));
};

window.getStats = function () {
  return JSON.parse(localStorage.getItem(statsKey)) || [];
};

window.getWeeklyProgression = function () {
  const stats = getStats();
  const byWeek = {};

  stats.forEach(s => {
    if (!byWeek[s.week]) byWeek[s.week] = 0;
    byWeek[s.week]++;
  });

  return Object.entries(byWeek).map(([week, sessions]) => ({
    week: parseInt(week),
    sessions
  }));
};
