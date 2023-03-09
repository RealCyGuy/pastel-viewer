export default function (date: Date): string {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // time difference in seconds
  const days = Math.floor(diff / 86400); // number of days

  if (days === 0) {
    // today
    return `Today at ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (days === 1) {
    // yesterday
    return `Yesterday at ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else {
    // other dates
    return (
      date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }
}
