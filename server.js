const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// express app
const app = express();

// middleware
// app.use(express.json);
// bodyParser.json();

// express.json();
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// --------------------------------------------------------------------------------------------

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the app" });
// });

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
// ---------------------------------------------------------

// Connect to Db

// This function is asynchronus in nature
// So it takes little bit time and returns a promise
// So we use .then()
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb Connected");
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
