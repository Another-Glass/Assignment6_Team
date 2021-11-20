function getTimeBetween(startTime, endTime) {
  const endTimeMs = new Date(endTime).getTime();
  const startTimeMs = new Date(startTime).getTime();

  return endTimeMs - startTimeMs;
}

module.exports.getTimeBetween = getTimeBetween;