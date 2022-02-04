import express from "express";
const router = express.Router();

import passport from "passport";

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/", (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
  // else {
  //   res.status(401).send({ msg: "Unauthorized" });
  // }
});

router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect("http://localhost:3000/");

  // res.redirect("http://localhost:3000/");
  res.status(200).send({ msg: "Success" });
});

export default router;
