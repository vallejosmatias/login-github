import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("signup", { title: "Crea tu cuenta", style:"/css/signup.css"});
});

export default router;