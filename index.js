var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.launch(function (request, response) {
  response.say("You launched the app!");
});

//alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("PlanMyTrip", {
  "slots": [
    {
      "name": "fromCity",
      "type": "AMAZON.US_CITY",
      "value": "Seattle"
    },
    {
      "name": "toCity",
      "type": "AMAZON.US_CITY",
      "value": "Portland"
    },
    {
      "name": "travelDate",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "i want to travel from {fromCity} to {toCity} {travelDate}"
  ]
},
  function (request, response) {
    response.say("Success!");
  }
);

alexaApp.intent("VerizonNOCDashboard", {
  "slots": [
    {
      "name": "companyName",
      "type": "AMAZON.Corporation",
      "value": ["Verizon", "Brillio"]
    },
    {
      "name": "botName",
      "type": "AMAZON.DE_FIRST_NAME",
      "value": "Hella"
    },
    {
      "name": "newDate",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "open {companyName} NOC Dashboard",
    "Hi {botName}",
    "what are the number of pipeline orders we have",
    "what are the number of current orders due for {newDate}",
    "what are the future orders that are due",
    "which are the past orders that are due as of {newDate}",
    "what are the key metrics for the NOC in this month"
  ]
},
  function (request, response) {
    response.say("Success!");
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));

