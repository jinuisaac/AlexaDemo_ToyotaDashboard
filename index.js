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
  response.say("Welcome to Sample Dashboard. I am Hella, a Brillio AI Bot on Alexa Echo.");
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

alexaApp.intent("Greeting", {
  "utterances": [
    "Hi Hella"
  ]
},
  function (request, response) {
    response.say("Hi Stephen, How can I help you?");
  }
);

alexaApp.intent("PipelineOrder", {
  "utterances": [
    "what are the number of pipeline orders we have?"
  ]
},
  function (request, response) {
    response.say("Stephen, the number of pipeline orders are 200");
  }
);

alexaApp.intent("CurrentOrder", {
  "slots": [
    {
      "name": "newDate",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "what are the number of current orders due for {newDate}?"
  ]
},
  function (request, response) {
    response.say("The number of current orders due for today are 50");
  }
);

alexaApp.intent("FutureOrder", {
  "utterances": [
    "what are the future orders that are due?"
  ]
},
  function (request, response) {
    response.say("The future orders that are due within the next 3 days are 12");
  }
);

alexaApp.intent("PastOrder", {
  "slots": [
    {
      "name": "newDate",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "which are the past orders that are due as of {newDate}?"
  ]
},
  function (request, response) {
    response.say("The orders that were due before today are 18");
  }
);

alexaApp.intent("KeyMetrics", {
  "utterances": [
    "what are the key metrics for the sample in this month?"
  ]
},
  function (request, response) {
    response.say("The average time spent on an order is around 42 min and productivity of the plant is at 60 orders per day which is better than the previous month by 12%.");
  }
);

alexaApp.intent("Exit", {
  "utterances": [
    "Good bye"
  ]
},
  function (request, response) {
    response.say("Bye, Have a great day");
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));

