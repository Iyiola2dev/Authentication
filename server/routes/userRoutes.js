import express from "express";

//The router is named userRouter i could have named it anything
const router = express.Router();

//The routes
router.get("/login", (req, res) => {
 const { email, password } = req.body;
});

//The route for registering a user
router.post("/register", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

export default router;
