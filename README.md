# Postman Lightning Talk

## Install Postman CLI tool Newman

### Install Globally
In case of you want to use only cli.
Newman is a command-line collection runner for Postman. [newman](https://www.npmjs.com/package/newman)

Newman CLI tool can be installed with brew
```sh
brew install newman 
```

or with npm
```sh
npm i -g newman 
```

### Install Locally

```sh
npm install
```

For more advanced/user-friendly reports. We will install html reporter.
It will help us to generate customized reports in HTML format. [newman-reporter-htmlextra](https://www.npmjs.com/package/newman-reporter-htmlextra)


## Run

### Run Postman CLI tool with Newman

It this script we execute newman by specifying the collection to run, reporters to use and the environment to set. 

For dev, staging and prod
```sh
npm run newmanDev
npm run newmanStaging
npm run newmanProd
```

### Run Newman from JS file

```sh
npm run postman
```

### Run Newman for stress/performance testing

```sh
npm run performance
```
