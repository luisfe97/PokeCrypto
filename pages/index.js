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
            </>
          ) : (
            <>
              <a className="btn btn-primary btn-lg" href="login" role="button">
                Explore NFTs
              </a>
            </>
          )}
        </header>
        <section id="features" className="section">
          <div className="container">
            <h2 className="text-center mb-5">Features</h2>
            <div className="row">
              <div className="col-md-6 feature-content">
                <img src="/Imagenes/pokemonosodeanteojos.png" className="feature-img w-100" alt="Feature Image" />
              </div>
              <div className="col-md-6 feature-content">
                <div className="feature-text" style={{ color: "black" }}>
                  <h3>Feature Title</h3>
                  <p>Description of the feature. This section provides a detailed explanation of what makes this feature special and how it benefits the user. You can include any important details or advantages here to highlight the value of this feature.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section bg-light" style={{ color: "black" }}>
          <div className="container">
            <h2 className="text-center">How It Works</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/Imagenes/pokemonosodeanteojos.png" alt="Step 1" className="img-fluid" />
                  <h3>Step 1</h3>
                  <p>Description of step 1. Explanation of the initial phase of the process, including any necessary actions from the user.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/Imagenes/pokemonosodeanteojos.png" alt="Step 2" className="img-fluid" />
                  <h3>Step 2</h3>
                  <p>Description of step 2. Details on the subsequent steps and what the user should expect during this phase.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <img src="https://via.placeholder.com/400x300" alt="Step 3" className="img-fluid" />
                  <h3>Step 3</h3>
                  <p>Description of step 3. Final steps to complete the process and what the user should do to finish.</p>
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
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 1" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 2" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 3" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 1" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 2" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 3" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 1" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 2" className="rounded-circle" style={{with:"100px", height:"100px" }} />
              </div>
              <div className="col-md-4">
                <img src="/Imagenes/unity.png" alt="User 3" className="rounded-circle" style={{with:"100px", height:"100px" }} />
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
