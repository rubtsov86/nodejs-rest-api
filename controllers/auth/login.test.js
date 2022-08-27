const express = require("express");
const request = require("supertest");
const { ctrlWrapper } = require("../../helpers");

jest.setTimeout(15000);

const { auth: ctrl } = require("../../controllers");

const app = express();

app.post("/login", ctrlWrapper(ctrl.login));

app.use(express.json());

describe("test login controller", () => {
  beforeAll(() => app.listen(3000, () => console.log("start")));

  test("correct request", async () => {
    const data = { email: "qwerty2@qwe.qwe", password: "12345" };

    const response = await request(app).post("/login").send(data);
    console.log(response);
    expect(response.status).toBe(200);
  });
});
