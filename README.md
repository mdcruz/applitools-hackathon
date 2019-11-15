# Applitools Visual AI Rockstar Hackathon

This is my submission for the Applitools Visual AI Rockstar Hackathon using Cypress and Applitools Eyes.

## Pre-requisites

You must have the following installed to run these tests:

- Node
- NPM
- Chrome v73+

## Setup

To install the project dependencies, run `npm i`

## Running the tests

To run the tests using Cypress Visual Test Runner, follow the steps below:

1. Run `npm run cypress:dev`
2. Select a test file that you wish to run (`TraditionalTestsV1.js` or `TraditionalTestsV2.js`)

You should then be able to see the test results for version V1 and V2 of the app.

To run the Visual AI tests using Cypress with Applitools, follow the steps below:

1. export APPLITOOLS_API_KEY=<API key here>
2. Run `npm run cypress:dev`
3. Select a test file that you wish to run (`VisualAITestsV1.js` or `VisualAITestsV2.js`)

To run the tests headlessly on the command line, run `npm run cypress:run` instead.
