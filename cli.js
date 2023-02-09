const processCSV = require("./lib/processCSV");

//validation argument, file CSV
const fileName = process.argv[2];

if (!fileName || !fileName.includes(".csv"))
  return console.error("missing CSV file");

//main Script
const main = async () => {
  processCSV(__dirname, fileName);
};

main();
