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
const beds = (data) => Math.trunc(0.35 * data.totalHospitalBeds);
const income = (data) => data.region.avgDailyIncomeInUSD;
const population = (data) => data.region.avgDailyIncomePopulation;

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (normalCases(data)),
    severeCasesByRequestedTime: 0.15 * (normalCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - Math.trunc(0.15 * (normalCases(data)))),
    casesForICUByRequestedTime: 0.05 * (normalCases(data)),
    casesForVentilationByRequestedTime: 0.02 * (normalCases(data)),
    dollarsInflight: (normalCases(data)) * income * population * (2 ** factor(data))
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: severeCases(data),
    severeCasesByRequestedTime: 0.15 * (severeCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - Math.trunc(0.15 * (severeCases(data)))),
    casesForICUByRequestedTime: 0.05 * severeCases(data),
    casesForVentilationByRequestedTime: 0.02 * severeCases(data),
    dollarsInflight: severeCases(data) * income * population * (2 ** factor(data))
  }
});

export default covid19ImpactEstimator;
