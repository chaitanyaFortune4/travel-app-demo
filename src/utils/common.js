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
