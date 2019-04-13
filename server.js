const authentication = require("./middleware/authentication");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const session = require("express-session");
const app = express();

require("dotenv").config();

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  ignoreExpiration: true,
};

passport.use(new JwtStrategy(jwtOptions, authentication.authenticateJwt));
passport.use(new LocalStrategy(authentication.authenticateLocal));
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
