"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

function getCasedUnit(unit) {
  return unit === "l" || unit === "L" ? "L" : unit.toLowerCase();
}

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let invalidNumber = false;
    let invalidUnit = false;

    let initNum, initUnit;

    try {
      initNum = convertHandler.getNum(input);
    } catch {
      invalidNumber = true;
    }

    try {
      initUnit = getCasedUnit(convertHandler.getUnit(input));
    } catch {
      invalidUnit = true;
    }

    if (invalidNumber && invalidUnit) {
      return res.send("invalid number and unit");
    } else if (invalidNumber) {
      return res.send("invalid number");
    } else if (invalidUnit) {
      return res.send("invalid unit");
    }

    const [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    );

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
