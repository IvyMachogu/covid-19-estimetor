const covidData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const severeCases = (data, num) => data.currentlyInfected * num;
const NumberOfBeds = (beds, data) => beds.totalHospitalBeds - data.severeCasesByRequestedTime;
const Calc = (Cases, num) => Cases.infectionsByRequestedTime * num;
const outPutImpact = {};
const normalizedPeriod = (periodType, timeToElapse) => {
  // let time = periodType;
  const time = periodType.toLowerCase();
  switch (time) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return 'invalid timespan';
  }
};


const covid19ImpactEstimator = (data) => {
  const output = {
    data,
    impact: {
      // currentlyInfected : currentImpactInfections,
      // infectionsByRequestedTime: currentImpactInfectionsByTime

    },
    severeImpact: {
      //  currentlyInfected: currentSevereImpactInfections,
      // infectionsByRequestedTime: currentSevereImpactInfectionsByTime
    }

  };
  const pop = data.region.avgDailyIncomePopulation;
  const time = normalizedPeriod(data.periodType, data.timeToElapse);
  const outPutSevereImpact = output.estimate.severeImpact;
  const income = data.region.avgDailyIncomeInUSD;

  // eslint-disable-next-line no-undef
  outPutImpact.currentlyInfected = impact(data, 10);
  // eslint-disable-next-line no-undef
  output.estimate.severeImpact.currentlyInfected = impact(data, 50);
  outPutImpact.infectionsByRequestedTime = severeCases(outPutImpact, 1024);
  output.estimate.severeImpact.infectionsByRequestedTime = severeCases(outPutSevereImpact, 1024);

  // 15% estimated number of severe position cases

  outPutImpact.severeCasesByRequestedTime = Calc(outPutImpact, 0.15);
  outPutSevereImpact.severeCasesByRequestedTime = Calc(outPutSevereImpact, 0.15);

  /* number of beds available */
  outPutImpact.hospitalBedsByRequestedTime = NumberOfBeds(data, outPutImpact);
  outPutSevereImpact.hospitalBedsByRequestedTime = NumberOfBeds(data, outPutSevereImpact);

  /* estimated of number of severInfection */

  outPutImpact.casesforICUByRequestedTime = Calc(outPutImpact, 0.05);
  outPutSevereImpact.casesforICUByRequestedTime = Calc(outPutSevereImpact, 0.05);

  // estimated number of severe infection that will require ventilation

  outPutImpact.casesForVentilatorsByRequestedTime = Math.round(Calc(outPutImpact, 0.02));
  outPutSevereImpact.casesForVentilatorsByRequestedTime = Calc(outPutSevereImpact, 0.02);

  // money the economy is likely to lose
  output.dollarsInFlight = Math.trunc((Calc(outPutImpact, pop) * income) / time);
  outPutSevereImpact.dollarsInFlight = Math.trunc((Calc(outPutSevereImpact, pop) * income) / time);
};
covid19ImpactEstimator(covidData);


export default covid19ImpactEstimator;
