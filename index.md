<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="Description" content="web site created using html and js">
    <meta charset="UTF-8">
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#000000">
    <link href="src/style.css" rel="stylesheet" type="text/css">
    <title>COVID-19-ESTIMATE</title>


    <script>
      function covid19Estimator (){
        let data;
        let varpopulation = document.getElementById('data-population').value;
        let vartotalHospital = document.getElementById('data-total-hospital-beds').value;
        let varreportedCases = document.getElementById('data-reported-cases').value;
        let vartimeToElapse = document.getElementById('data-time-to-elapse').value;
        let varperiod = document.getElementById('data-period-type').value;

        data = {
          region:{
            name: 'africa',
            avgAge: 19.7,
            avgDailyIncomeInUSD: 5,
            avgDailyIncomePopulation: 0.72
          },
          periodType: varperiod,
          population: varpopulation,
          reportedCases: varreportedCases,
          totalHospitalBeds: vartotalHospital,
          timeToElapse: vartimeToElapse
        };
        let getoutput =covid19ImpactEstimator(data);
        alert(covid19ImpactEstimator(data).impact.currentlyInfected);
      }
    </script>
    <script>
      const getDays = (data) => {
        let getFactor;
        if (data.periodType.trim()
          .toLowerCase() === 'days') {
          getFactor = data.timeToElapse * 1;
        } else if (data.periodType.trim()
          .toLowerCase() === 'weeks') {
          getFactor = (data.timeToElapse * 7);
        } else if (data.periodType.trim()
          .toLowerCase() === 'months') {
          getFactor = (data.timeToElapse * 30);
        } else {
          getFactor = 0;
        }
        return getFactor;
      };
      const normalCases = (data) => (data.reportedCases * 10) * (2 ** Math.trunc(getDays(data) / 3));
      const severeCases = (data) => (data.reportedCases * 50) * (2 ** Math.trunc(getDays(data) / 3));
      const beds = (data) => (0.35 * data.totalHospitalBeds);
      const income = (data) => data.region.avgDailyIncomeInUSD;
      const avgPopDailyIncome = (data) => data.region.avgDailyIncomePopulation * income(data);

      const covid19ImpactEstimator = (data) => ({
        data,
        impact: {
          currentlyInfected: data.reportedCases * 10,
          infectionsByRequestedTime: (normalCases(data)),
          severeCasesByRequestedTime: 0.15 * (normalCases(data)),
          hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (normalCases(data)))),
          casesForICUByRequestedTime: Math.trunc(0.05 * Math.trunc(normalCases(data))),
          casesForVentilatorsByRequestedTime: Math.floor(0.02 * (normalCases(data))),
          dollarsInFlight: Math.trunc((normalCases(data) * avgPopDailyIncome(data)) / getDays(data))
        },
        severeImpact: {
          currentlyInfected: data.reportedCases * 50,
          infectionsByRequestedTime: severeCases(data),
          severeCasesByRequestedTime: 0.15 * (severeCases(data)),
          hospitalBedsByRequestedTime: Math.trunc((beds(data)) - (0.15 * (severeCases(data)))),
          casesForICUByRequestedTime: Math.trunc(0.05 * Math.trunc(severeCases(data))),
          casesForVentilatorsByRequestedTime: Math.floor(0.02 * (severeCases(data))),
          dollarsInFlight: Math.trunc((severeCases(data) * avgPopDailyIncome(data)) / getDays(data))
        }
      });
    </script>
</head>
<body>
<div class="wrapper">
    <article>
        <section>
            <main>
                <h1> covid-19-Estimate</h1>
                <form id="class">
                    <p>
                    <label> Population: <input type="text"  id="data-population" placeholder="Population"></label>
                    </p>
                    <br>
                    <p>
                    <label>total hospital beds:<input type="text"  id="data-total-hospital-beds" placeholder="Population"></label>
                </p>
                    <br>
                    <p>
                    <label>ReportedCases :<input type="text" id="data-reported-cases" placeholder="ReportedCases"></label>
                    </p>
                    <br>
                <p>
                    <label>timeToElapse:<input type="text" id="data-time-to-elapse" placeholder="timeToElaspe" ></label>
                </p>
                    <br><p>
                      <label>periodType:<select id="data-period-type" name="days">
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                        </select>
                    </label>
                </p>
                    <br>
                    <p>
                    <input type="button" onclick="covid19Estimator()" value="submit"/>
                    </p>
                </form>
              </main>
              </section>
              </article>
              </div>

</body>
</html>
