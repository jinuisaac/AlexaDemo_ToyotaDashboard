var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("lineage");

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
  request.getSession().set(); 
  response.say("Welcome to Pitch dashboard. I am Hella, a Brillio AI Bot on Alexa Echo. How may I help you?");
  response.shouldEndSession(false);
});

alexaApp.intent("Intro_question", {
  "slots": [
    {
      "name": "newDate",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "Hi - How is the pitch dashboard looking {newDate}?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("The Dashboard looks mostly clear but for 2 Incidents, One at Kansas City and Second one at Des Moines.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Details_ongoing_incident", {
  "slots": [
    {
      "name": "city",
      "type": "AMAZON.US_CITY"
    }
  ],
  "utterances": [
    "Hi Can you please provide me some more details around the ongoing incident at {city} location."
  ]
},
  function (request, response) {
    console.log(response);
    request.getSession().set();
    response.say("Sure. There is a network outage at Kansas City location Impacting : WMS applications. The Critical P1 L000010 has been raised and Incident Manager Swarn is currently co-ordinating with all the support teams.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Latest_update", {
  "utterances": [
    "What is the latest update?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Network Team to raise high priority tickets with DSR to get 4G functional at the earliest.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Escalate", {
  "utterances": [
    "Do you need me to escalate this incident or call the incident manager?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("NO, i think the incident is under control.");
    //If Yes => call Swarn.....
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Say_thanks", {
  "utterances": [
    "Thanks"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("You are welcome.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Second_incident", {
  "utterances": [
    "Hi Can you please read me the second incident?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Sure. L000040 - MPLS, Internet & 4G outage at Des Moines affecting WMS.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Hella_greetings_bye", {
  "utterances": [
    "Good bye"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Bye, Have a great day");
    response.shouldEndSession(true);
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));

