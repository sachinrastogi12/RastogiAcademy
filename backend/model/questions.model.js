const education1 = require("../education1");
const comprehension1 = require("../comprehension1");
const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

function loadSentenceFillData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "sentence_fill.csv")) //pipe function is meant to connect readable stream soyrce and writable stream destination
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        let obj;
        obj = {
          ...data,
          distractor: JSON.parse(data.distractor),
          id: Number(data.id),
        };
        saveSentenceFill(obj);
      })
      .on("eror", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        resolve();
      });
  });
}

function loadComprehensionData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "data", "comprehension_mcq.csv")
    ) //pipe function is meant to connect readable stream soyrce and writable stream destination
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        let obj;
        obj = {
          ...data,
          distractor: JSON.parse(data.distractor),
          id: Number(data.id),
        };
        saveComprehensionData(obj);
      })
      .on("eror", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        resolve();
      });
  });
}

async function saveSentenceFill(question) {
  try {
    await education1.updateOne(
      {
        id: question.id,
      },
      {
        ...question,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save questions ${err}`);
  }
}
async function saveComprehensionData(question) {
  try {
    await comprehension1.updateOne(
      {
        id: question.id,
      },
      {
        ...question,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save questions ${err}`);
  }
}

module.exports = {
  loadSentenceFillData,
  loadComprehensionData,
};
