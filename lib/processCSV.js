const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const { rotateMatrixService } = require("./matrixService");

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
  const { json, isValid } = rotateMatrixService(JSON.parse(data.json));

  return {
    id: data.id,
    json: JSON.stringify(json),
    is_valid: isValid,
  };
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
        JSON.parse(json);
      } catch (error) {
        return cb(null, false, 'The column "json" should have array value');
      }

      const isNumber = !Number.isNaN(Number(id));

      if (!isNumber)
        return cb(null, false, 'The column "id" should have number value');
      return cb(null, true);
    })
    .on("error", (error) => console.error(error))
    .on("data", (data) => {
      //   console.log({ data }); //debug
    })
    .on("data-invalid", (row, rowNumber, reason) => {
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
