const chai = require("chai");
const expect = require("chai").expect;
const chaiExec = require("@jsdevtools/chai-exec");
const { exec } = require("child_process");

chai.use(chaiExec);

describe("Node CLI script", () => {
  it("should return a new output is the file exist", () => {
    const myCLI = chaiExec("node cli.js input.csv");

    expect(myCLI).stdout.not.be.empty;
    expect(myCLI).stdout.be.a("string");
    expect(myCLI).stderr.to.be.empty;
  });
  it("should show error message if there is no argument as filename", function () {
    const myCLI = chaiExec("node cli.js");
    expect(myCLI).stderr.to.be.contain("missing CSV file");
  });
  it("should show error message in case the file does not exist", function () {
    const myCLI = chaiExec("node cli.js xxx.csv");
    expect(myCLI).stderr.to.be.contain("File not found");
  });
  it("should show error message in case of wrong file type", function () {
    const myCLI = chaiExec("node cli.js xxx.txt");
    expect(myCLI).stderr.to.be.contain("missing CSV file");
  });
  it("should show erros message in case the CSV file has multiple columns", function () {
    const myCLI = chaiExec("node cli.js bad_input_v1.csv");

    expect(myCLI).stderr.to.be.contain(
      'The columns expected to be: "id" , "json"'
    );
  });
  it("should show an error message in case first column is not number", function () {
    const myCLI = chaiExec("node cli.js bad_input_v2.csv");

    expect(myCLI).stderr.to.be.contain(
      'The column "id" should have number value'
    );
  });
  it("should show an error message in case second column is not array", function () {
    const myCLI = chaiExec("node cli.js bad_input_v3.csv");

    expect(myCLI).stderr.to.be.contain(
      'The column "json" should have array value'
    );
  });

  it("should return a rotate the matrix is the file exist", () => {
    const myCLI = chaiExec("node cli.js input.csv");

    expect(myCLI).stdout.not.be.empty;
    expect(myCLI).stdout.be.a("string");
    expect(myCLI).stderr.to.be.empty;

    expect(myCLI).to.have.stdout(
      `id,json,is_valid\n` +
        `1,"[4,1,2,7,5,3,8,9,6]",true\n` +
        `2,"[90,40,10,20]",true\n` +
        `3,"[-5]",true\n` +
        `9,"[]",false\n` +
        `5,"[]",false\n` +
        `8,"[]",false`
    );
  });
});
