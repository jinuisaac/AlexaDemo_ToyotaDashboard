var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();
var alexaApp = new alexa.app("toyota");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),
  checkCert: false,
  debug: true
});

app.set("view engine", "ejs");

//Open Toyota Dashboard for Boston Region

alexaApp.launch(function (request, response) {
  request.getSession().set(); 
  response.say("Opening Toyota Market Share Dashboard for Boston Region. This Dashboard shows month over month comparison between December 2017 and November 2017.");
  response.shouldEndSession(false);
});

alexaApp.intent("Sales", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "What are the Sales for PMA Atlantic Toyota in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("PMA Atlantic Toyota 24.8K vehicle sales in 2017. Toyota captured 16.1 percent of the market share.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Top_three_cars", {
  "utterances": [
    "Show top three Car segments by Industry Sales"
  ]
},
  function (request, response) {
    console.log(response);
    request.getSession().set();
    response.say("Top three Car Segments by Industry Sales are Small SUV 10801, Large Pickup 7622, Mid SUV 7142");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Declined_segment", {
  "utterances": [
    "Show the segment that declined the most for PMA Atlantic Toyota"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Segment Entry Subcompact declined the most with 17.7 percent compared to last month for PMA Atlantic Toyota.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Top_three_competitors", {
  "utterances": [
    "Who are the top three competitors for Toyota in Small SUV Segment"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Honda, Jeep and Subaru are the top three competitors for Toyota in Small SUV Segment with 1787, 1626 and 1061 vehicle sales respectively in December 2017. Toyota sold 2088 vehicles in the same time period in SUV Segment.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Income_group", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "Which income group contributed the most in Small SUV Segment in PMA Atlantic Toyota in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("People with income between 50k dollars and 75k dollars bought the Small SUV most in PMA Atlantic Toyota in 2017. Toyota captured 25.7 percent market share in this category.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Gender", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "What is the gender split for Small SUV Segment in PMA Atlantic Toyota in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Female bought 30.23 percent of Small SUV in PMA Atlantic Toyota in 2017, 6 percent more than the Males. Toyota captured 26.5 percent and 23 percent market share in Female and Male categories.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Ethnic_group", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "Which ethnic group performed best Small SUV Segment in PMA Atlantic Toyota in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Western European ethnic group performed best with 30 percent sales in Small SUV segment in PMA Atlantic Toyota in 2017. Toyota Captured 17.7 percent market share.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Segment_perform", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "Which segment performed well in New Hampshire state in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Small SUV performed best with 21152 vehicles in 2017 in New Hampshire State, followed by Large Pickup and Mid SUV with 15854 and 12100 sales respectively.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Zipcode", {
  "slots": [
    {
      "name": "year",
      "type": "AMAZON.DATE"
    }
  ],
  "utterances": [
    "Which zipcode performed worst in PMA Atlantic Toyota in {year}"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Zipcode 02128 performed worst with 15779 sales and 11.9 percent Toyota share.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("Greetings_bye", {
  "utterances": [
    "Good bye", "Quit", "Thanks", "bye bye", "bye"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("Bye, Have a great day");
    response.shouldEndSession(true);
  }
);

alexaApp.intent("Help", {
  "utterances": [
    "help me", "help", "Please Help me", "How can you help me"
  ]
},
  function (request, response) {
    request.getSession().set();
    response.say("I am always happy to help you. As of now, I deal with Toyota dashboard assistance. I will become more intelligent in future.");
    response.shouldEndSession(true);
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));

