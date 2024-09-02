import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Navbar from "@/Components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const secretKey = process.env.NEXT_PUBLIC_KEY;
function getDecryptedItem(key) {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}

export default function buy() {
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
    <div>
      <Navbar userData={userData} />
      <div className="container mt-5">
        <h2>Team</h2>
        <div className="row justify-content-start">
          {userData?.Pokemons.length >= 1 ? (
            <>
              {userData.Pokemons?.map((item, index) => (
                <div className="col-lg-4 col-md-4 col-sm-12 mb-3" key={index}>
                  <div className="card mb-4 w-100">
                    <img src="https://via.placeholder.com/150" className="card-img-top" alt="NFT" />
                    <div className="card-body">
                      <h5 className="card-title">{item?.name}</h5>
                      <p className="card-text">
                        Stats:
                        <br />
                        HP: {item?.baseStats?.HP}
                        <br />
                        Attack: {item?.baseStats?.Attack}
                        <br />
                        Defense: {item?.baseStats?.Defense}
                        <br />
                        SpAttack: {item?.baseStats?.SpAttack}
                        <br />
                        SpDefense: {item?.baseStats?.SpDefense}
                        <br />
                        Speed: {item?.baseStats?.Speed}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <footer className="text-center py-4">
        <p>© 2024 PokeCrypto. All rights reserved.</p>
      </footer>
    </div>
  );
}
