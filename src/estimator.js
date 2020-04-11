
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  /* getting  time to days */
  if (data.periodType === 'weeks') {
    data.timeToElapse = 7;
  } else if (data.periodType === 'months') data.timeToElapse = 58;

  const days = data.timeToElapse;
  const factor = Math.trunc(days / 3);
  const reportedCases = 674;
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);

  return {
    impact,
    severeImpact,
    data

  };
};

export default covid19ImpactEstimator;
