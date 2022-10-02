require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {
  loadSentenceFillData,
  loadComprehensionData,
} = require("./model/questions.model");

const routes = require("./routes");
const { mongoConnect } = require("./mongo");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./passport");

const passportLocalMongoose = require("passport-local-mongoose");

const findOrCreate = require("mongoose-findorcreate");

const authRoute = require("./routes/auth");

loadSentenceFillData();
loadComprehensionData();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const url = "mongodb://localhost:27017/kids-educational-app";

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect(url, { useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.on("open",function(){
//     console.log("db connected")
// })

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,Content-Type,Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("Backend Connected");
});

app.use("/", routes);
app.use("/auth", authRoute);

app.listen(PORT, async () => {
  await mongoConnect();
  console.log(`listening on port ${PORT}`);
});
