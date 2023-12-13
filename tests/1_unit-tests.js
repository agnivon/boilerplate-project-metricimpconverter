const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler", function () {
    test("convertHandler should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("4km"), 4);
      assert.equal(convertHandler.getNum("52LBS"), 52);
      assert.equal(convertHandler.getNum("654gAL"), 654);
    });

    test("convertHandler should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("4.2526km"), 4.2526);
      assert.equal(convertHandler.getNum("52.6777kG"), 52.6777);
      assert.equal(convertHandler.getNum("65.54gal"), 65.54);
      assert.equal(convertHandler.getNum("72.458L"), 72.458);
    });

    test("convertHandler should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("1/2km"), 0.5);
      assert.equal(convertHandler.getNum("52/7lbs"), 7.428571428571429);
      assert.equal(convertHandler.getNum("654/3MI"), 218);
    });

    test("convertHandler should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("5.4/3Mi"), 1.8);
      assert.equal(convertHandler.getNum("6.789/3.35lbs"), 2.0265671641791045);
      assert.equal(convertHandler.getNum("2.25/3.725L"), 0.6040268456375839);
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      assert.throws(() => convertHandler.getNum("3/2/3km"), "invalid number");
      assert.throws(() => convertHandler.getNum("52/7/3lbs"), "invalid number");
      assert.throws(
        () => convertHandler.getNum("654/3/2gal"),
        "invalid number",
      );
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(convertHandler.getNum("km"), 1);
      assert.equal(convertHandler.getNum("lBs"), 1);
      assert.equal(convertHandler.getNum("l"), 1);
    });

    test("convertHandler should correctly read each valid input unit", function () {
      assert.equal(convertHandler.getUnit("45.5677mI"), "mI");
      assert.equal(convertHandler.getUnit("782/67.33Kg"), "Kg");
      assert.equal(convertHandler.getUnit("65204.6673/563.442L"), "L");
    });

    test("convertHandler should correctly return an error for an invalid input unit", function () {
      assert.throws(() => convertHandler.getUnit("45.5677kmt"), "invalid unit");
      assert.throws(
        () => convertHandler.getUnit("782/67.33lbghlbs"),
        "invalid unit",
      );
    });
    assert.throws(
      () => convertHandler.getUnit("65204.6673/563.442gallon"),
      "invalid unit",
    );

    test("convertHandler should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
    });

    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
    });

    test("convertHandler should correctly convert gal to L", function () {
      assert.deepEqual(convertHandler.convert(35.245, "gal"), [133.41678, "L"]);
      assert.deepEqual(convertHandler.convert(0.6216049382716049, "gal"), [
        2.35303,
        "L",
      ]);
    });

    test("convertHandler should correctly convert L to gal", function () {
      assert.deepEqual(convertHandler.convert(0.00772111368055598, "L"), [
        0.00204,
        "gal",
      ]);
      assert.deepEqual(convertHandler.convert(56735.345, "L"), [
        14987.89959,
        "gal",
      ]);
    });

    test("convertHandler should correctly convert mi to km", function () {
      assert.deepEqual(convertHandler.convert(5635.35, "mi"), [
        9069.19417,
        "km",
      ]);
      assert.deepEqual(convertHandler.convert(9.929082387765172, "mi"), [
        15.97927,
        "km",
      ]);
    });

    test("convertHandler should correctly convert km to mi", function () {
      assert.deepEqual(convertHandler.convert(15.97927, "km"), [9.92908, "mi"]);
      assert.deepEqual(convertHandler.convert(0.02815533980582524, "km"), [
        0.01749,
        "mi",
      ]);
    });

    test("convertHandler should correctly convert lbs to kg", function () {
      assert.deepEqual(convertHandler.convert(15.22, "lbs"), [6.90367, "kg"]);
      assert.deepEqual(convertHandler.convert(0.02815533980582524, "lbs"), [
        0.01277,
        "kg",
      ]);
    });

    test("convertHandler should correctly convert kg to lbs", function () {
      assert.deepEqual(convertHandler.convert(15.22, "kg"), [33.55438, "lbs"]);
      assert.deepEqual(convertHandler.convert(5.073333333333333, "kg"), [
        11.18479,
        "lbs",
      ]);
    });
  });
});
