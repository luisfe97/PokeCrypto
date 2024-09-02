import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Email: String,
  Password: String,
  Wallet: String,
  Name: String,
  Pokemons: Array,
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
