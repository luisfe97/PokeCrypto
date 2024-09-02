// pages/api/login.js
import connectToDatabase from "../../lib/mongo";
import UserModel from "../../models/UserModel";

export const loginUser = async (email, password) => {
  await connectToDatabase();

  // Busca al usuario por el correo electrónico
  const user = await UserModel.findOne({ Email: email });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Verifica si la contraseña proporcionada coincide con la almacenada
  if (user.Password !== password) {
    throw new Error("Contraseña incorrecta");
  }
  // Si la autenticación es exitosa, puedes devolver información relevante del usuario
  return user;
};

// Handler principal para manejar la solicitud HTTP
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Email, Password } = req.body;
    try {
      const user = await loginUser(Email, Password);
      res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
