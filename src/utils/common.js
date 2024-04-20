export const transformData = (data) => {
  return data.map((item) => ({
    id: item?.destinationId,
    destinationId: item?.destinationId,
    destinationName: item?.destinationName,
    updatedAt: new Date(),
  }));
};

export const isDataStaleChecker = (timestamp) => {
  const givenDate = new Date(timestamp);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - givenDate;
  // Convert milliseconds to hours
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  if (differenceInHours < 1) {
    return false;
  }
  return true;
};

export const eventTrigger = async (data) => {
  let mobile = localStorage.getItem("mobile");
  localStorage.setItem("productId", data.productCode);
  let payload = {
    id: data.productCode,
    name: data.title,
    mobile: mobile,
  };
  return payload;
};

export function convertToSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and") // Replace '&' with 'and'
    .replace(/[^\w\s-]/g, "") // Remove special characters except whitespace and '-'
    .replace(/\s+/g, "-") // Replace whitespace with '-'
    .replace(/--+/g, "-") // Replace multiple '-' with single '-'
    .trim(); // Remove leading and trailing whitespaces
}

export const convertMinutesToHours = (minutes) => {
  var hours = Math.floor(minutes / 60); // Calculate hours
  var remainingMinutes = minutes % 60; // Calculate remaining minutes
  return hours + " hours ";
};

export const timer = (duration) => {
  // console.log("DU", duration);
  const len = Object.keys(duration).length;
  if (len > 1) {
    return `${convertMinutesToHours(
      duration.variableDurationFromMinutes
    )} to ${convertMinutesToHours(duration.variableDurationToMinutes)}`;
  } else {
    return `${convertMinutesToHours(duration.fixedDurationInMinutes)}`;
  }
};

export const convertFlag = (flag) => {
  return flag
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
