export const ParseDate = (date) => {
  const event = new Date(date);
  const currentDate = new Date();

  const timeDiffInMilliseconds = currentDate.getTime() - event.getTime();
  const timeDiffInSeconds = Math.floor(timeDiffInMilliseconds / 1000);

  if (timeDiffInSeconds < 60) {
    return `${timeDiffInSeconds} seconds ago`;
  } else {
    const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);

    if (timeDiffInMinutes < 60) {
      return `${timeDiffInMinutes} minutes ago`;
    } else {
      const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);

      if (timeDiffInHours < 24) {
        return `${timeDiffInHours} hours ago`;
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthIndex = event.getMonth();
        const month = months[monthIndex];

        const day = event.getDate();
        const year = event.getFullYear();

        return `${month} ${day}, ${year}`;
      }
    }
  }
};

export const getCurrentTimeInUTCFormat = () => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getUTCDate()).padStart(2, '0');
  const hours = String(currentDate.getUTCHours()).padStart(2, '0');
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};