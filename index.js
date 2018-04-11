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
    "Hello..how does the Pitch dashboard look {newDate}?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Hello... The Pitch dashboard looks healthy but for 2 Incidents at Kansa City & Des Monies locations.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("First_incident", {
  "slots": [
    {
      "name": "firstCity",
      "type": "AMAZON.AT_CITY"
    }
  ],
  "utterances": [
    "Can you please provide me more details around {firstCity} Incident?"
  ]
},
  function (request, response) {
    console.log(response);
    request.getSession().set();
    response.say("There is an ongoing incident since 4/19/2017 2:22:15 PM impacting All Warehouse knowledge workers within Kansas City due to MPLS, Internet & 4G outage.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Incident_manager", {
  "slots": [
    {
      "name": "firstCity",
      "type": "AMAZON.AT_CITY"
    }
  ],
  "utterances": [
    "Who is the Incident Manager for this {firstCity} Incident?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Chethan Krishna is the Incident Manger");
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
    response.say("MPLS & Internet outage is going on at the site. Both Service Provider devices are down due to an area wide outage. 4G is not operational & a high priority case has been raised with DSR");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Previous_instance", {
  "utterances": [
    "Is there a previous instance of such incident?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("No there are no such instances in the past reported");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Conference_bridge", {
  "utterances": [
    "Is the conference Bridge Still Open?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Yes the bridge is still running at +1 213-296-6290");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Escalate", {
  "utterances": [
    "Does this need to be escalated?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("No the team is working towards resolving this and is Expected resolution time is 4:22:15 PM");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Change_implement", {
  "utterances": [
    "Was there any recent change implemented at this location?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("There are no details available around changes implemented at this location for last 6 months.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Second_incident", {
  "slots": [
    {
      "name": "secondCity",
      "type": "AMAZON.AT_CITY"
    }
  ],
  "utterances": [
    "Ok thank you. Can you please provide me more inputs around {secondCity} Incident?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Sure. MPLS, Internet & 4G outage at Des Moines affecting WMS");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Incident_number", {
  "utterances": [
    "Can you provide me the Incident Number and impacted users?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("The Incident # L000010 and is impacting the Complete Warehouse Operations");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Previous_instance", {
  "utterances": [
    "Is there a previous instance of such incident?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("No there are no such instances in the past reported");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Change_implement", {
  "utterances": [
    "Was there any recent change implemented at this location?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Yes there was a change implemented 2 weeks back on one of the router configurations, which was reported to be a successful change.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Next_steps", {
  "utterances": [
    "What are the next steps?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Network Team to raise high priority tickets with DSR to get 4G functional at the earliest");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Escalate", {
  "utterances": [
    "Does this incident need escalation?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("No, the team is already following up with relevant stakeholders and are receiving the required updates to proceed further");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Other_details", {
  "utterances": [
    "Are there any other important details you have for me?"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Not at this juncture. Thanks.");
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

