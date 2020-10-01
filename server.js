const nid = require("nanoid");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cookieParser = require("cookie-parser");

const port = 5000;

const sequelize = new Sequelize("next-dash", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Users = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/signin", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    const user = await Users.findOne({
      where: { email: email, password: password },
    });
    if (user == null) {
      return res
        .status(401)
        .clearCookie("user")
        .json({ message: "User with these credentials does not exist" });
    }
    let userData = user.dataValues;
    return res
      .status(200)
      .cookie(
        "user",
        JSON.stringify({ token: userData.token, email: userData.email })
      )
      .json({ token: userData.token, email: userData.email });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .clearCookie("user")
      .json({ message: "Internal server error. Please try again." });
  }
});

app.post("/signup", async (req, res) => {
  let id = nid.nanoid(20);
  let token = nid.nanoid(40);
  let email = req.body.email;
  let password = req.body.password;
  try {
    const user = await Users.findOne({
      where: { email: email },
    });
    // if a user already exists with same email, throw err
    if (user != null) {
      return res
        .status(409)
        .clearCookie("user")
        .json({ message: "User with this email already exists." });
    }

    // create new user
    let newUser = await Users.create({ id, token, email, password });
    let newUserData = newUser.dataValues;
    // console.log(newUserData);
    return res
      .status(200)
      .cookie(
        "user",
        JSON.stringify({ token: newUserData.token, email: newUserData.email })
      )
      .json({ token: newUserData.token, email: newUserData.email });
  } catch (err) {
    // if error during creation, delete the created user
    await Users.destroy({ where: { email: email } });
    console.log(err.stack);
    return res
      .status(500)
      .clearCookie("user")
      .json({ message: "Internal server error. Please try again." });
  }
});

app.post("/signout", (req, res) => {
  res.status(200).clearCookie("user").end();
});

app.post("/authcheck", async (req, res) => {
  try {
    let user =
      req.cookies.user === undefined ? null : JSON.parse(req.cookies.user);
    if (user == null) {
      return res
        .status(401)
        .clearCookie("user")
        .json({ message: "Unauthorized access" });
    }

    let userData = await Users.findOne({
      where: { email: user.email, token: user.token },
    });
    if (userData == null) {
      return res
        .status(401)
        .clearCookie("user")
        .json({ message: "Unauthorized access" });
    }
    userData = userData.dataValues;
    return res.status(200).end();
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .clearCookie("user")
      .json({ message: "Internal server error" });
  }
});

app.listen(port);
console.log("API server started on: " + port);
