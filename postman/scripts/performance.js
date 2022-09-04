const path = require('path');
const async = require('async');
const newman = require('newman');

// Specify the collection to run.
const collection = path.join(__dirname, 'customer_onboarding_for_github_action.postman_collection.json');

// Contiunously run the postman test suite
const continueRun = (runs, limitResponseTime) => {
  let commands = [];
  for (let index = 0; index < runs; index++) commands.push(done => newman.run({ collection }, done));

  // Runs the Postman sample collection in parallel.
  async.parallel(commands, (err, results) => {
    err && console.error(err);
    let failuresArray = [];
    let averageResponseTime = 0;

    // Iterate over the results to get the failed requests.
    results.forEach(result => {
      let failures = result?.run?.failures;
      if (failures?.length === 0) failures.failures && failuresArray.push(JSON.stringify(failures.failures, null, 2));
      averageResponseTime = result.run.timings.responseAverage;
    });

    if (averageResponseTime > limitResponseTime) {
      // Print the failed requests.
      console.log('\u001b[' + 31 + `mTest Failed, the average response is over ${limitResponseTime} \u001b[0m`);
    } else if (failuresArray.length === 0) {
      // Print the success message.
      console.log('\u001b[' + 32 + `mPerformance Test run Successfully with ${runs} parallel tests runs \u001b[0m`);
    }
  });
};

continueRun(1, 200);
