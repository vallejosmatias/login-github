import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
});

// Método para hashear la contraseña antes de guardarla
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

const User = mongoose.model(userCollection, UserSchema);

export default User;