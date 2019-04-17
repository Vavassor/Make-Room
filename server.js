const authentication = require("./middleware/authentication");
const express = require("express");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
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
  secret: process.env.SESSION_SECRET,
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
passport.deserializeUser(authentication.deserializeUser);
passport.serializeUser(authentication.serializeUser);

app.use(routes);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
