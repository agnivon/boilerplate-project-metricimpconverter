const regexNumber = /^(\d*\.?\d*\/?\d*\.?\d*)?([^\/])*$/;
const regexUnit = /^[\d\/\.]*(km|mi|lbs|kg|gal|L)$/i;

const units = {
  km: "mi",
  mi: "km",
  lbs: "kg",
  kg: "lbs",
  l: "gal",
  gal: "L",
  L: "gal",
};

const unitStrings = {
  km: "kilometers",
  mi: "miles",
  lbs: "pounds",
  kg: "kilograms",
  gal: "gallons",
  l: "liters",
  L: "liters",
};

function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const match = regexNumber.exec(input);
    if (match?.[1]) {
      //console.log(match[1]);
      result = eval(match[1]) || 1;
    } else if (match) {
      result = 1;
    } else {
      throw new Error("invalid number");
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const match = regexUnit.exec(input);
    if (match?.[1]) {
      result = match[1];
    } else {
      throw new Error("invalid unit");
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    result = units[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    result = unitStrings[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let returnUnit = this.getReturnUnit(initUnit);
    let returnNum;
    switch (initUnit) {
      case "km":
        returnNum = initNum / miToKm;
        break;
      case "mi":
        returnNum = initNum * miToKm;
        break;
      case "l":
      case "L":
        returnNum = initNum / galToL;
        break;
      case "gal":
        returnNum = initNum * galToL;
        break;
      case "kg":
        returnNum = initNum / lbsToKg;
        break;
      case "lbs":
        returnNum = initNum * lbsToKg;
        break;
    }
    result = [Number.parseFloat(returnNum.toFixed(5)), returnUnit];
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
