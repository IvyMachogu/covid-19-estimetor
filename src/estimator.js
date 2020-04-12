/* eslint-disable no-trailing-spaces */
const factor = (data) => {
  let getFactor;
  if (data.periodType.trim().toLowerCase() === 'days') {
    getFactor = Math.trunc((data.timeToElapse * 1) / 3);
  } else if (data.periodType.trim().toLowerCase() === 'weeks') {
    getFactor = Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType.trim().toLowerCase() === 'months') {
    getFactor = Math.trunc((data.timeToElapse * 30) / 3);
  } else {
    getFactor = 0;
  }
  return getFactor;
};
const severeCases = (data) => (data.reportedCases * 50) * (2 ** factor(data));

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** factor(data))
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: severeCases(data),
    severeCasesByRequestedTime: 0.15 * (severeCases(data)),
    hospitalBedsByRequestedTime: 0.35 * data.totalHospitalBeds
  }
});

export default covid19ImpactEstimator;
