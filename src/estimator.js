/* eslint-disable no-trailing-spaces */
const factor = (data) => {
  let getFactor;
  switch (data.periodType) {
    case 'days':
      getFactor = Math.trunc((data.timeToElapse * 1) / 3);
      break;
    case 'weeks':
      getFactor = Math.trunc((data.timeToElapse * 7) / 3);
      break;
    case 'months':
      getFactor = Math.trunc((data.timeToElapse * 30) / 3);
      break;
    default:
      getFactor = 0;
  }
  return getFactor;
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** factor)
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** factor)
  }
});

export default covid19ImpactEstimator;
