import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Navbar from "@/Components/Navbar";

const inter = Inter({ subsets: ["latin"] });
// Función para recuperar y desencriptar desde localStorage
const secretKey = process.env.NEXT_PUBLIC_KEY;
function getDecryptedItem(key) {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}

export default function Home({ data }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    console.log(storedUserData);
    const valorDesencriptado = getDecryptedItem("user");
    if (valorDesencriptado) {
      setUserData(JSON.parse(valorDesencriptado));
    }
  }, []);

  return (
    <>
      <Navbar userData={userData} />
      <div>
        <header className="jumbotron text-center d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: "url('/Imagenes/pokebosque.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", height: "100vh" }}>
          <h1 className="display-4">Welcome to PokeCrypto {userData?.Name}</h1>
          <p className="lead">Pokémon Crypto Game in Augmented Reality</p>
          {userData ? (
            <>
              <a className="btn btn-primary btn-lg" href="buy-nfts" role="button">
                Explore NFTs
              </a>
              <a className="btn btn-success btn-lg mt-3" href="/PokeCrypto.apk" download>
                Download APK
              </a>
            </>
          ) : (
            <>
              <a className="btn btn-primary btn-lg" href="login" role="button">
                Explore NFTs
              </a>
              <a className="btn btn-success btn-lg mt-3" href="/PokeCrypto.apk" download>
                Download APK
              </a>
            </>
          )}
        </header>
        <section id="features" className="section">
          <div className="container">
            <h2 className="text-center mb-5">Features</h2>
            <div className="row">
              <div className="col-md-6 feature-content">
                <img src="/Imagenes/d81fcd17-725f-4425-825c-5108abf474d8.png" className="feature-img w-100" alt="Feature Image" />
              </div>
              <div className="col-md-6 feature-content">
                <div className="feature-text" style={{ color: "black" }}>
                  <h3>Pokecrypto</h3>
                  <p>Explora, Muévete y Gana en el Mundo Real
                  ¡Bienvenido a una nueva era de juegos que transforman tu mundo! Pokecrypto fusiona la magia de la realidad aumentada con la riqueza cultural de Colombia y el poder de la tecnología blockchain.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section bg-light" style={{ color: "black" }}>
          <div className="container">
            <h2 className="text-center">Cómo Funciona</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/Imagenes/0ceb6437-4021-414f-9ec1-a9d2577398b8.png" alt="Step 1" className="img-fluid" />
                  <h3>Step 1</h3>
                  <p>Explora tu Entorno</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/Imagenes/1df696c1-6f35-4ad9-8188-bc1e578d0c66.png" alt="Step 2" className="img-fluid" />
                  <h3>Step 2</h3>
                  <p>Captura y Colecciona</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/Imagenes/94b8d69b-6c56-4d83-aba4-777853fc2986.png" alt="Step 3" className="img-fluid" />
                  <h3>Step 3</h3>
                  <p>Compite y Colabora</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="section" style={{ color: "black" }}>
          <div className="container">
            <h2 className="text-center">What Our Users Say</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="testimonial text-center">
                  <blockquote className="blockquote">
                    <p className="mb-5">"Amazing platform! The best place to buy and sell NFTs."</p>
                    <footer className="blockquote-footer">User 1</footer>
                  </blockquote>
                  <img src="https://via.placeholder.com/100" alt="User 1" className="rounded-circle" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial text-center">
                  <blockquote className="blockquote">
                    <p className="mb-5">"Amazing platform! The best place to buy and sell NFTs."</p>
                    <footer className="blockquote-footer">User 2</footer>
                  </blockquote>
                  <img src="https://via.placeholder.com/100" alt="User 2" className="rounded-circle" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial text-center">
                  <blockquote className="blockquote">
                    <p className="mb-5">"Great selection of NFTs and a user-friendly interface."</p>
                    <footer className="blockquote-footer">User 3</footer>
                  </blockquote>
                  <img src="https://via.placeholder.com/100" alt="User 3" className="rounded-circle" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="Sponsors" className="section" style={{ color: "black" }}>
          <div className="container">
            <h2 className="text-center">Sponsors</h2>
            <div className="row d-flex flex-row justify-content-center align-items-center">
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/avalanche.png" alt="User 1" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/base.png" alt="User 2" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/polygon.png" alt="User 3" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/teleporter.png" alt="User 1" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/axelar.png" alt="User 2" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/unity.png" alt="User 3" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/next.png" alt="User 1" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/maya.png" alt="User 2" style={{ with: "100px", height: "100px" }} />
              </div>
              <div className="col-md-4 d-flex flex-row justify-content-center align-items-center">
                <img src="/Imagenes/mongo.png" alt="User 3" style={{ with: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </section>

        <footer className="footer text-center" style={{ color: "black" }}>
          <p>© 2024 PokeCrypto. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

import nookies from "nookies";
