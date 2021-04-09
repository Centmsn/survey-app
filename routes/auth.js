const passport = require("passport");

const { Router } = require("express");
const router = Router();

router.use(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.use("/auth/google/callback", passport.authenticate("google"));

module.exports = router;
