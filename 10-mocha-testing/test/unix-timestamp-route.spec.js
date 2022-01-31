const assert = require("assert");
const app = require("../app");
const request = require("supertest");
describe("GET /unix-timestamp", function () {
  it("should respond with JSON object containing timestamp", function (done) {
    request(app)
      .get("/unix-timestamp")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.ok(res.body.timestamp);
        done();
      });
  });
});
