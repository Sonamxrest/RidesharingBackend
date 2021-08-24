const express = require("express");
const User = require("../UserModel/registrationModule");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const authentication = require("../middleware/authentication");

const router = express.Router();

router.post("/userLogin", function (req, res) {
  console.log("here we are inside login");
  const PhoneNumber = req.body.PhoneNumber;
  const Password = req.body.Password;

  const hash = bcryptjs.hash(Password, 10).then(function (password) {
    console.log(password);
  });

  // console.log(PhoneNumber, Password);

  User.findOne({ PhoneNumber: PhoneNumber }).then(function (detail) {
    console.log(detail);
    if (detail === null) {
      console.log("incorrect credential");
      return res.status(201).json({ success: false });
    } else {
      bcryptjs.compare(Password, detail.Password, function (err, result) {
        console.log("result", result);
        console.log(err);
        if (result === false) {
          console.log("incorrect password");
          return res.status(201).json({ success: false });
        }

        const token = jwt.sign({ data: detail }, "secretkey");
        console.log("login success");
        console.log(detail);

        res.status(200).json({ token: token, success: true, data: detail });
      });
    }
  });
});

router.post(
  "/userRegister",
  [
    check("FullName", "Team Name required!").not().isEmpty(),
    check("PhoneNumber", "Phone Number Required").not().isEmpty(),
    check("DateOfBirth", "Required Date of Birth").not().isEmpty(),
    check("Password", "Password Required !").not().isEmpty(),
    check("UserType", "UserType Required!").not().isEmpty(),
  ],

  function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
      console.log("Inside Registration");
      const FullName = req.body.FullName;
      const PhoneNumber = req.body.PhoneNumber;
      const DateOfBirth = req.body.DateOfBirth;
      const Password = req.body.Password;
      const UserType = req.body.UserType;
      console.log(Password);
      console.log(FullName);

      bcryptjs.hash(Password, 10, function (err, hash) {
        const user_data = User({
          FullName: FullName,
          PhoneNumber: PhoneNumber,
          DateOfBirth: DateOfBirth,
          Password: hash,
          UserType: UserType,
        });
        user_data
          .save()
          .then(function (result) {
            return res.status(201).json({ success: true });
          })
          .catch(function (err) {
            res.status(500).json({ success: err });
          });
      });
    }
  }
);

router.get("/get/:id", async (req, res) => {
  const data = await User.findById({ _id: req.params.id });
  console.log(data);
  return res.status(200).json({ success: true, data: data });
});
module.exports = router;
