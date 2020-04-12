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
const normalCases = (data) => (data.reportedCases * 10) * (2 ** factor(data));
const severeCases = (data) => (data.reportedCases * 50) * (2 ** factor(data));
const beds = (data) => (0.35 * data.totalHospitalBeds);
const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (normalCases(data)),
    severeCasesByRequestedTime: 0.15 * (normalCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (normalCases(data))))

  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: severeCases(data),
    severeCasesByRequestedTime: 0.15 * (severeCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (severeCases(data))))
  }
});

export default covid19ImpactEstimator;
