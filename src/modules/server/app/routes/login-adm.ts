import { Router } from "express";
import { sign } from "jsonwebtoken";
const adminLoginRouter = Router();
import dns from "dns";

adminLoginRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const ipAdress = req.socket.remoteAddress;
  console.log("express", ipAdress);
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const jwtSign = sign({ authorized: true }, process.env.SECRET, {
      expiresIn: "1d",
    });

    dns.lookup("haxtera.com", (err, addresses, family) => {
      // Print the address found of user
      console.log("addresses:", addresses);

      // Print the family found of user
      console.log("family:", family);
    });

    res.json({ token: jwtSign });
  } else {
    res.status(400).json({ error: "incorrect username/password!" });
  }
});

export { adminLoginRouter };
