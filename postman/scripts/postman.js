const path = require('path');
const newman = require('newman');
const todayDate = new Date().toISOString().slice(0, 10);
require('dotenv').config();

newman.run(
  {
    collection: path.join(__dirname, 'customer_onboarding.postman_collection.json'),
    reporters: ['htmlextra', 'cli'],
    iterationCount: 1,
    envVar: [{ key: 'token', value: `${process.env.NEWMAN_COLLECTION_TOKEN}` }],
    reporter: {
      htmlextra: {
        export: `./postman/reports/postman-${todayDate}.html`,
        logs: true,
        browserTitle: 'Customer Onboarding App Postman Report',
        title: 'Customer Onboarding App Postman Report',
        titleSize: 5,
        showMarkdownLinks: true,
        timezone: 'Europe/London',
      },
    },
  },
  function (err) {
    if (err) {
      console.log('\u001b[' + 31 + 'mPostman Test Failed \u001b[0m');
      process.exitCode = 1;
    } else {
      console.log('\u001b[' + 32 + 'mPostman Test run Successfully \u001b[0m');
    }
  }
);
