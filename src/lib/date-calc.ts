export const filterCustomersByRange = (customers, range: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight

  let startDate;
  const endDate = new Date(today); // End date will always be today

  if (range === "today") {
    startDate = today; // For today, the start and end date are today
    endDate.setHours(23, 59, 59, 999); // Set end of today
  } else if (range === "week") {
    const dayOfWeek = today.getDay();
    startDate = new Date(today);
    startDate.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Start of the week (Monday)
    startDate.setHours(0, 0, 0, 0); // Reset to midnight
  } else if (range === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
    startDate.setHours(0, 0, 0, 0); // Reset to midnight
  }

  return customers.filter((a) => {
    const createdAtDate = new Date(a.createdAt);
    createdAtDate.setHours(0, 0, 0, 0); // Reset to midnight for comparison
    return createdAtDate >= startDate && createdAtDate <= endDate;
  }).length;
};
