const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token || token === undefined) {
      res.status(500).send({ message: "Access denied" });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(500).send({
            err: err.message,
            message:
              "You are not authorized to access this.You have to be login first.",
          });
        } else {
          req.body = { ...decoded, ...req.body };
          next();
        }
      });
    }
  } catch (error) {
    console.error(error.message);
    res.send({ message: "Error in authentication" });
  }
};

module.exports = {
  authentication,
};
