import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CryptoJS from "crypto-js";
import Navbar from "@/Components/Navbar";

const inter = Inter({ subsets: ["latin"] });
// Definir una clave secreta para la encriptación
const secretKey = process.env.NEXT_PUBLIC_KEY;

// Función para encriptar y guardar en localStorage
function setEncryptedItem(key, value) {
  const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
  localStorage.setItem(key, encryptedValue);
}

export default function login() {
  const loginForm = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
      Email: email,
      Password: password,
    };
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      // Clear any existing user data in local storage

      localStorage.removeItem("user");
      // Store the new user data
      setEncryptedItem("user", JSON.stringify(result.user));
      window.location.href = "/";
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Navbar/>

          <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={loginForm} className="d-flex flex-column justify-content-center align-items-center">
              <div className="form-group mb-5">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary mb-5">
                Login
              </button>
            </form>
          </div>
          <footer className="text-center py-4">
            <p>© 2024 PokeCrypto. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
