import { Router } from "express";
 
const router = Router();

router.get("/", (req, res) => {
  res.render("login", {title:"inicia sesión", style:"/css/login.css"});
});

export default router;