import passport from "passport";
import GitHubStrategy from "passport-github2";
import userService from "../models/user.model.js";
import dotenv from "dotenv";
import LocalStrategy from "passport-local";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

// Configuración de la estrategia local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userService.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configuración de la estrategia con github
const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Verificar si el usuario ya existe en la base de datos
          const existingUser = await UserModel.findOne({ githubId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
  
          // Crea un nuevo usuario si no existe
          const newUser = new UserModel({
            username: profile.username,
            githubId: profile.id,
            role: "usuario", 
          });
  
          const savedUser = await newUser.save();
          return done(null, savedUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default initializePassport;
