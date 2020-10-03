
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("./Auth/passport");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({ 
      secret: "keyboard cat", 
      resave: true, 
      saveUninitialized: true,
   })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/howdyNeighbourDB", { 
  useNewUrlParser: true,
});

require("./routes/api-routes.js")(app);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});