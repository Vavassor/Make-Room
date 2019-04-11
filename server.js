const authentication = require("./middleware/authentication");
const BasicStrategy = require("passport-http").BasicStrategy;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const session = require("express-session");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({
  secret: "Keyboard Cat",
  saveUninitialized: true,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy(authentication.authenticateBasic));
passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser);

app.use(routes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
