const path = require('path');
const newman = require('newman');
const todayDate = new Date().toISOString().slice(0, 10);
require('dotenv').config();

// Specify the collection to run and all the options.
newman.run(
  {
    collection: 'https://www.getpostman.com/collections/a66ad17c211a4424e5d9',
    reporters: ['htmlextra', 'cli'],
    iterationCount: 1,
    envVar: [
      { key: 'malicious_origin', value: 'https://malicious.website.example.com' },
      { key: 'url', value: 'https://onboarding-ui-saltpay.vercel.app/' },
      { key: 'environment', value: 'dev' },
    ],
    reporter: {
      htmlextra: {
        export: `./postman/reports/postman-${todayDate}.html`,
        logs: true,
        title: 'Customer Onboarding App Postman Report',
        timezone: 'Europe/London',
      },
    },
  },
  err => {
    if (err) {
      console.log('\u001b[' + 31 + 'mPostman Test Failed \u001b[0m');
    } else {
      console.log('\u001b[' + 32 + 'mPostman Test run Successfully \u001b[0m');
    }
  }
);
