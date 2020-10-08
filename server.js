
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("./Auth/passport");
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === 'production') {
  // Exprses will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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