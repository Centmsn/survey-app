const passport = require("passport");
const { Router } = require("express");

const router = Router();

router.use(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.use(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys");
  },
  (error, req, res, next) => {
    //! redirects if error occured
    res.redirect("/surveys");
  }
);

router.get("/api/current_user", (req, res, next) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
