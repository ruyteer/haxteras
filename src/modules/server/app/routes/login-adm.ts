import { Router } from "express";
import { sign } from "jsonwebtoken";
const adminLoginRouter = Router();

adminLoginRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const jwtSign = sign({ authorized: true }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.json({ token: jwtSign });
  } else {
    res.status(400).json({ error: "incorrect username/password!" });
  }
});

export { adminLoginRouter };
