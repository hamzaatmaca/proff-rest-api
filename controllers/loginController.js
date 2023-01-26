const db = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  await db("users", { userEmail: req.body.email }, "findOne")
    .then((response) => {
      bcrypt
        .compare(req.body.password, response.userPassword)
        .then(function (result) {
          if (result === true) {
            if (response === null) {
              res.status(400).json({
                error: "User Not Found",
              });
            } else {
              var token = jwt.sign(
                { email: req.body.email, name: req.body.name },
                process.env.SECRET
              );

              const data = {
                userName: req.body.name,
                userEmail: req.body.email,
                token: token,
              };

              db("login", data, "insertOne")
                .then(() => {
                  res.status(201).json({
                    data,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(400).json({
                    error: error,
                  });
                });
            }
          } else {
            res.status(403).json({
              error: "Password not valid",
            });
          }
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
