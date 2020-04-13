/* eslint-disable no-trailing-spaces */
const getDays = (data) => {
  let getFactor;
  if (data.periodType.trim().toLowerCase() === 'days') {
    getFactor = data.timeToElapse * 1;
  } else if (data.periodType.trim().toLowerCase() === 'weeks') {
    getFactor = (data.timeToElapse * 7);
  } else if (data.periodType.trim().toLowerCase() === 'months') {
    getFactor = (data.timeToElapse * 30);
  } else {
    getFactor = 0;
  }
  return getFactor;
};
const normalCases = (data) => (data.reportedCases * 10) * (2 ** (Math.trunc(getDays(data)) / 3));
const severeCases = (data) => (data.reportedCases * 50) * (2 ** (Math.trunc(getDays(data)) / 3));
const beds = (data) => (0.35 * data.totalHospitalBeds);
const income = (data) => data.region.avgDailyIncomeInUSD;
const population = (data) => data.region.avgDailyIncomePopulation;

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (normalCases(data)),
    severeCasesByRequestedTime: 0.15 * (normalCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (normalCases(data)))),
    casesForICUByRequestedTime: Math.trunc(0.05 * (normalCases(data))),
    casesForVentilationByRequestedTime: Math.trunc(0.02 * (normalCases(data))),
    dollarsInflight: (normalCases(data)) * income * population * (2 ** getDays(data))
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: severeCases(data),
    severeCasesByRequestedTime: 0.15 * (severeCases(data)),
    hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (severeCases(data)))),
    casesForICUByRequestedTime: Math.trunc(0.05 * severeCases(data)),
    casesForVentilationByRequestedTime: Math.trunc(0.02 * severeCases(data)),
    dollarsInflight: severeCases(data) * income * population * (getDays(data))
  }
});

export default covid19ImpactEstimator;
