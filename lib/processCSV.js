const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

//configuration CSV
const parseCSV = csv.parse({
  headers: ["id", "json"],
  strictColumnHandling: true,
  renameHeaders: true,
});
const formatCSV = csv.format({
  headers: true,
  quoteColumns: { json: true },
  quoteHeaders: false,
});

//Transform NEW CSV ouput
const transformCallback = (data) => {
  //   console.log({ data });
  const ret = {};
  ["id", "json", "is_valid"].forEach((prop) => {
    ret[prop] = data[prop] || true;
  });

  return ret;
};

const processCSV = (baseUrl, fileName) => {
  fs.createReadStream(path.resolve(baseUrl, fileName))
    .on("error", (_err) => {
      console.error("File not found");
    })
    .pipe(parseCSV)
    .validate((data, cb) => {
      const { id, json } = data;

      try {
        const obj = JSON.parse(json);
      } catch (error) {
        return cb(null, false, 'The column "json" should have array value');
      }

      const isNumber = !isNaN(id);

      if (!isNumber)
        return cb(null, false, 'The column "id" should have number value');
      return cb(null, true);
    })
    .on("error", (error) => console.error(error))

    .on("data", (data) => {
      //   console.log({ data });
    })
    .on("data-invalid", (row, rowNumber, reason) => {
      //   console.log({ row, rowNumber, reason });
      reason && console.error(reason);

      if (rowNumber === 1 && row.length === 3)
        console.error('The columns expected to be: "id" , "json"');
    })

    // pipe the parsed input into a csv formatter
    .pipe(formatCSV)

    .transform(transformCallback)
    .pipe(process.stdout)
    .on("end", () => process.exit());
};

module.exports = processCSV;
