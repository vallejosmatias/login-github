import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

import bcrypt, { compareSync, genSaltSync, hashSync } from "bcrypt";

// Resgistro
export const createHash = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Login
export const isValidPass = (savedpassword, password) => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  return bcrypt.compareSync(password, savedpassword);
};
