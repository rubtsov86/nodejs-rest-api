const express = require("express");
const request = require("supertest");
const { ctrlWrapper } = require("../../helpers");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const { auth: ctrl } = require("../../controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", ctrlWrapper(ctrl.login));

const data = { email: "qwerty2@qwe.qwe", password: "12345" };

describe("test login controller", () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      })
  );

  test("test request status 200", async () => {
    await request(app).post("/login").send(data).expect(200);
  });

  test("test return 'token' and type of token is string", async () => {
    const response = await request(app).post("/login").send(data);

    expect(typeof response._body.token).toBe("string");
  });

  test("test return object 'user' with 2 properties: 'email', 'subscription'", async () => {
    const response = await request(app).post("/login").send(data);

    expect(typeof response._body.user).toBe("object");
    expect(Object.keys(response._body.user)).toEqual(["email", "subscription"]);
  });

  test("test type of email and subscription is string", async () => {
    const response = await request(app).post("/login").send(data);

    expect(typeof response._body.user.email).toBe("string");
    expect(typeof response._body.user.subscription).toBe("string");
  });
});
