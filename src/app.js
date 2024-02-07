import express from "express";
import passport from "passport";
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { __dirname } from "./utils.js";
import dotenv from "dotenv";
import initializePassport from "./config/passport.config.js";
import loginRoute from "./routes/login.route.js";
import signupRoute from "./routes/signup.route.js";
import sessionRoute from "./routes/session.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CODERSERCRET = process.env.CODERSERCRET;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const connection = () =>
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("base de datos conectada");
    })
    .catch((error) => {
      console.log(`Error al conectar la base de datos ${error}`);
    });

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initializePassport();

app.use(
  session({
    secret: CODERSERCRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// rutas
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", loginRoute);
app.use("/", sessionRoute);

server.on("error", (error) => console.log("error en el server"));
