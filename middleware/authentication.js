const jwt = require("jsonwebtoken");
const Teams = require("../model/teams");
const Team = require("../model/teams");

module.exports.verifyUser = function (req, res, next) {
  try {
    console.log("This is a guard !");
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, "secretkey"); //decode the encoded token
    console.log(userData.data);

    Teams.findOne({ _id: teamData.TeamID._id })
      .then(function (alldata) {
        //   console.log(alldata);
        console.log("Yetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        req.user = alldata;
        console.log(req.user);
        next();
        //console.log("Data aayo");
      })
      .catch(function (e) {
        console.log("catch ma aayo");
        res.status(500).json({ error: e });
      });
  } catch (err) {
    console.log("Ya pani aayena xa");
    return res.status(401).json({ message: "Auth failed" });
  }

  //next();
};

// module.exports.verifyAdmin = function (req, res, next) {
//   if (!req.user) {
//     return res.status(401).json({ Alert: "Unauthorized User!" });
//   }
//   // else if (req.user.UserType! = 'Admin'){
//   //   return res.status(401).json({Alert: 'Unauthorized User!!'})
//   // }
// };
