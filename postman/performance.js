const path = require('path');
const async = require('async');
const newman = require('newman');

// Contiunously run the postman test suite
const continueRun = (numberOfParallelRuns, limitResponseTime) => {
  let commands = [];
  for (let index = 0; index < numberOfParallelRuns; index++) {
    commands.push(function (done) {
      newman.run({ collection: path.join(__dirname, 'customer_onboarding.postman_collection.json') }, done);
    });
  }

  // Runs the Postman sample collection in parallel.
  async.parallel(commands, (err, results) => {
    err && console.error(err);
    let failuresArray = [];
    let averageResponseTime = 0;
    // Iterate over the results to get the failed requests.
    results.forEach(function (result) {
      let failures = result?.run?.failures;
      if (failures?.length === 0) failures.failures && failuresArray.push(JSON.stringify(failures.failures, null, 2));
      averageResponseTime = result.run.timings.responseAverage;
    });
    // Print the failed requests.
    if (averageResponseTime > limitResponseTime) {
      console.log('\u001b[' + 31 + `mTest Failed, the average response is over ${limitResponseTime} \u001b[0m`);
    } else if (failuresArray.length === 0) {
      // Print the success message.
      console.log(
        '\u001b[' + 32 + `mPerformance Test run Successfully with ${numberOfParallelRuns} parallel tests runs \u001b[0m`
      );
    }
  });
};

continueRun(100, 100);