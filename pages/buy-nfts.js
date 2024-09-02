import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Navbar from "@/Components/Navbar";
import {
  _mintNFT1,
  _mintNFT2,
  _mintNFT3,
  approvePokecoin,
  buytoken,
  approveUsdt,
  getwallet
} from "../Components/blockchainFunctions.js";

const inter = Inter({ subsets: ["latin"] });
const secretKey = process.env.NEXT_PUBLIC_KEY;
function getDecryptedItem(key) {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}
// Función para encriptar y guardar en localStorage
function setEncryptedItem(key, value) {
  const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
  localStorage.setItem(key, encryptedValue);
}

export default function buy() {
  const [userData, setUserData] = useState(null);
  const [userWallet, setuserWallet] = useState(null);

  useEffect(() => {
    const walletuser=getwallet().then(result => {
      console.log(result);
      setuserWallet(result) // Esto imprimirá el valor de la promesa cuando se resuelva
    }).catch(error => {
      console.error(error); // Esto manejará cualquier error si la promesa se rechaza
    });
    
    
    const storedUserData = localStorage.getItem("user");
    console.log(storedUserData);
    const valorDesencriptado = getDecryptedItem("user");
    if (valorDesencriptado) {
      setUserData(JSON.parse(valorDesencriptado));
    }
  }, []);
  const mintNFT1 = async (Pokemon) => {
    try {
      // Ejecutar mintToken primero
      await mintToken();

      // Acuñar el NFT
      const transaction = await _mintNFT1();
      console.log("Pokemon Comprado");

      let Pokemons = [];
      if (userData) {
        if (!userData.Pokemons) {
          userData.Pokemons = [];
        }
        Pokemons.push(userData.Pokemons.push(Pokemon));
      }

      const data = {
        Email: userData.Email,
        Wallet: userWallet,
        Name: userData.Name,
        Pokemons: userData.Pokemons,
      };

      const response = await fetch(`/api/Register`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;
        throw new Error(errorMessage);
      }

      alert("You have satisfactorily minted");
      localStorage.removeItem("user"); // Store the new user data
      setEncryptedItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error durante la acuñación:", error);
    }
  };
  const mintNFT2 = async (Pokemon) => {
    try {
      // Ejecutar mintToken primero
      await mintToken();

      // Acuñar el NFT
      const transaction = await _mintNFT2();
      console.log("Pokemon Comprado");

      let Pokemons = [];
      if (userData) {
        if (!userData.Pokemons) {
          userData.Pokemons = [];
        }
        Pokemons.push(userData.Pokemons.push(Pokemon));
      }

      const data = {
        Email: userData.Email,
        Wallet: userWallet,
        Name: userData.Name,
        Pokemons: userData.Pokemons,
      };

      const response = await fetch(`/api/Register`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;
        throw new Error(errorMessage);
      }

      alert("You have satisfactorily minted");
      localStorage.removeItem("user"); // Store the new user data
      setEncryptedItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error durante la acuñación:", error);
    }
  };
  const mintNFT3 = async (Pokemon) => {
    try {
      // Ejecutar mintToken primero
      await mintToken();

      // Acuñar el NFT
      const transaction = await _mintNFT3();
      console.log("Pokemon Comprado");

      let Pokemons = [];
      if (userData) {
        if (!userData.Pokemons) {
          userData.Pokemons = [];
        }
        Pokemons.push(userData.Pokemons.push(Pokemon));
      }

      const data = {
        Email: userData.Email,
        Wallet: userWallet,
        Name: userData.Name,
        Pokemons: userData.Pokemons,
      };

      const response = await fetch(`/api/Register`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;
        throw new Error(errorMessage);
      }

      alert("You have satisfactorily minted");
      localStorage.removeItem("user"); // Store the new user data
      setEncryptedItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error durante la acuñación:", error);
    }
  };

  const mintToken = async () => {
    try {
      // Aprobar USDT
      await approveUsdt(20000000000000000000);
      console.log("Aprobado USDT");

      // Comprar PokeToken
      await buytoken(20000000000000000000);
      console.log("Comprado Poke Token");

      // Aprobar PokeToken
      const approvalAmount = (20000000000000000000).toString();
      await approvePokecoin(approvalAmount);
      console.log("Aprobado PokeCoin");
    } catch (error) {
      console.error("Error en el proceso de compra de tokens:", error);
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
          <Navbar userData={userData} />
          <div className="container mt-5">
            <h2>Team</h2>
            <div className="row">
              {/* Example NFT Card */}
              <div className="col-md-4">
                <div className="card mb-4">
                  <img
                    src="/Imagenes/trikibritienda.png"
                    className="card-img-top"
                    alt="NFT"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Charmander</h5>
                    <p className="card-text">Description of the NFT.</p>
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => {
                        mintNFT1({
                          id: 4,
                          name: "Charmander",
                          type: ["Fire"],
                          baseStats: {
                            HP: 39,
                            Attack: 52,
                            Defense: 43,
                            SpAttack: 60,
                            SpDefense: 50,
                            Speed: 65,
                          },
                        });
                      }}
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <img
                    src="/Imagenes/ComingSon.png"
                    className="card-img-top"
                    alt="NFT"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bulbasaur</h5>
                    <p className="card-text">Description of the NFT.</p>
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => {
                        mintNFT2({
                          id: 1,
                          name: "Bulbasaur",
                          type: ["Grass", "Poison"],
                          baseStats: {
                            HP: 45,
                            Attack: 49,
                            Defense: 49,
                            SpAttack: 65,
                            SpDefense: 65,
                            Speed: 45,
                          },
                        });
                      }}
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <img
                    src="/Imagenes/ComingSon.png"
                    className="card-img-top"
                    alt="NFT"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Squirtle</h5>
                    <p className="card-text">Description of the NFT.</p>
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => {
                        mintNFT3({
                          id: 7,
                          name: "Squirtle",
                          type: ["Water"],
                          baseStats: {
                            HP: 44,
                            Attack: 48,
                            Defense: 65,
                            SpAttack: 50,
                            SpDefense: 64,
                            Speed: 43,
                          },
                        });
                      }}
                    ></a>
                  </div>
                </div>
              </div>
              {/* Repeat NFT Card as needed */}
            </div>
          </div>
          <footer className="text-center py-4" style={{ color: "black" }}>
            <p>© 2024 PokeCrypto. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
