export const convertTime = (date) => {
  // Format with hours and minutes
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  console.log(formattedTime); // Output: 12:00 PM
  return date;
};
