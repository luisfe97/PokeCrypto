// pages/api/users.js
import connectToDatabase from "../../lib/mongo";
import UserModel from "../../models/UserModel";

export const getUsers = async () => {
  await connectToDatabase();
  const data = await UserModel.find();
  return JSON.parse(JSON.stringify(data));
};

export const getUser = async (Email) => {
  await connectToDatabase();
  const data = await UserModel.findOne({ Email: Email });
  return JSON.parse(JSON.stringify(data));
};

export const addUser = async (user) => {
  await connectToDatabase();
  const existingUser = await UserModel.findOne({ Email: user.Email });

  if (existingUser) {
    throw new Error("El usuario ya está registrado");
  }

  const response = await UserModel.create(user);
  return response._id;
};

export const editUser = async (update) => {
  await connectToDatabase();
  const result = await UserModel.updateOne({ Email: update.Email }, { $set: update });
  return result;
};

// Handler principal para manejar las rutas HTTP
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getUsers();
      res.status(200).json({ users: data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const insertedID = await addUser(req.body);
      res.status(200).json({ insertedID });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const result = await editUser(req.body);
      res.status(200).json({ message: "Usuario actualizado con éxito", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
