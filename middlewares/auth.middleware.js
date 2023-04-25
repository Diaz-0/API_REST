const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
require("dotenv").config();

function authMiddleware(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .send({ msg: "No se proporcionó token de autenticación" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ msg: "Token inválido" });
  }
}

module.exports = authMiddleware;
