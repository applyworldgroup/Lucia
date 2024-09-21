const today = new Date();
const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
);
const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

export { today, thisWeekStart, thisMonthStart }