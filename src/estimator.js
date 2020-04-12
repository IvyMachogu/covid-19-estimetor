/* eslint-disable no-trailing-spaces */
const factor = (data) => {
  let getFactor;
  if (data.periodType === 'days') {
    getFactor = Math.trunc((data.timeToElapse * 1) / 3);
  } else if (data.periodType === 'weeks') {
    getFactor = Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.months === 'months') {
    getFactor = Math.trunc((data.timeToElapse * 30) / 3);
  } else {
    getFactor = 0;
  }
  console.log('getFactor');
  console.log(getFactor);
  console.log(data.timeToElapse);
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
