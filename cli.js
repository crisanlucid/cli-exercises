const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

const fileName = process.argv[2] || "Default";

if (!fileName) return console.log("no argument");

// (async function(){
//    const readStream

// })()

fs.createReadStream(path.resolve(__dirname, "input.csv"))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(
    csv.format({
      headers: true,
      quoteColumns: { json: true },
      quoteHeaders: false,
    })
  )
  .on("error", (error) => console.error(error))
  .transform((data) => {
    const ret = {};
    ["id", "json", "is_valid"].forEach((prop) => {
      ret[prop] = data[prop] || true;
    });

    return ret;
  })
  .pipe(process.stdout)
  .on("end", () => process.exit());
