Once you have cloned or forked please follow the below instructions for setup and running.

### SETUP

- install dependencies - npm Install
- Change path of the trackData variable / xlxs file on App.js (line 2-4) to your local path of the file
- go to TablePlus or your tool of choice and set up a new connection to mongodb://0.0.0.0/curveroyaltytest
- CD into the root directory of the project and in your CLI run the below

### RUN

- mongosh
- use curveroyaltytest
- db.contracts.insertMany([{name: "Contract 1"}, {name: "Contract 2"}]);
- ctrl+c \* 2 to exit
- node
- const app = require("./App.js")
- app()
- refresh track table to see imported data

### SCREEN RECORD

### TESTS

- To run the tests, please run mocha test --recursive
