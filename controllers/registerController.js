const db = require("../database/database");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) res.status(400).json({ error: err });

    if (req.body.password !== req.body.passwordConfirm) {
      res.status(400).json({ error: "passwords not same" });
    } else {
      db("users", { userEmail: req.body.email }, "findOne").then((response) => {
        if (response !== null) {
          res.status(400).json({
            error: "User Already Exists",
          });
        } else {
          const data = {
            userName: req.body.name,
            userSurname: req.body.surname,
            userPassword: hash,
            userEmail: req.body.email,
          };

          db("users", data, "insertOne")
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
      });
    }
  });
};
