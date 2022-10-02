const express = require("express");
const router = express.Router();

const authRoute = require("./routes/auth");
const education1 = require("./education1");
const comprehension1 = require("./comprehension1");

let limitrecords = 5;

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

router.get("/education", async (req, res) => {
  const data = await education1.aggregate([
    { $sample: { size: limitrecords } },
  ]);
  res.send(data);
});

router.get("/comprehension", async (req, res) => {
  const data = await comprehension1.aggregate([
    { $sample: { size: limitrecords } },
  ]);
  res.send(data);
});

module.exports = router;
