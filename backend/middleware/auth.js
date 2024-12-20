const jwt = require("jsonwebtoken");

const secrets = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized login again" });
  }
  try {
    const token_decode = jwt.verify(token, secrets);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = authMiddleware;