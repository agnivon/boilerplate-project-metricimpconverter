const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "16.423km" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 16.423,
          initUnit: "km",
          returnNum: 10.2048,
          returnUnit: "mi",
          string: "16.423 kilometers converts to 10.20480 miles",
        });
      });

    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "16.423564km" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 16.423564,
          initUnit: "km",
          returnNum: 10.20515,
          returnUnit: "mi",
          string: "16.423564 kilometers converts to 10.20515 miles",
        });
      });

    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
      });

    done();
  });

  test("Convert an invalid input such as 32g: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
      });

    done();
  });

  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
      });

    done();
  });

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
      });

    done();
  });

  test("Convert with no number such as kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "km" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "km",
          returnNum: 0.62137,
          returnUnit: "mi",
          string: "1 kilometers converts to 0.62137 miles",
        });
      });

    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "lbs" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "lbs",
          returnNum: 0.45359,
          returnUnit: "kg",
          string: "1 pounds converts to 0.45359 kilograms",
        });
      });

    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "L",
          returnNum: 0.26417,
          returnUnit: "gal",
          string: "1 liters converts to 0.26417 gallons",
        });
      });

    done();
  });
});
