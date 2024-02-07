import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/privado"); 
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "ok" });
});

router.post("/signup", async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "Error al autenticar usuario" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: "Usuario creado con éxito" });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

export default router;

