const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const cors = require("cors");

//IMPORT ROUTER
const router = require("./routes/router");

//IMPORT DB
const DB = require("./database/database");

//JWT
const Auth = require("./auth/auth");

//ENV FILE
require("dotenv").config();

//PREVENT CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//BODY-PARSER
app.use(express.json());

//DATABASE CONNECTION
// DB();

//JWT MIDDLEWARE
app.use(Auth);

//ROUTES
app.get("/", (req, res) => {
  res.send("Welcome User Login-Register Rest - API");
});
app.use("/api/v1", router);

app.listen(3030, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
