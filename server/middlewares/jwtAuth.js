import jwt from "jsonwebtoken";

//create jwt middleware to check secure authentification
export const verifyJWToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorised 😥",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorised 😥",
      });
    }
    req.user = decoded;
    req.userId = decoded._id;
    console.log("User ID set in request:", req.userId); // Add logging
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occured while trying to verify token",
    });
  }
};
