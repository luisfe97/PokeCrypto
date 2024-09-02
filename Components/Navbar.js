import WalletConnect from "./ConnectionWallet";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
// Función para recuperar y desencriptar desde localStorage
const secretKey = process.env.NEXT_PUBLIC_KEY;
function getDecryptedItem(key) {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}


export default function Navbar() {
  async function logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
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

      <nav className="navbar navbar-expand-lg " style={{backgroundColor:"rgba(81,158,223,0.5)", width:"100%",position:"fixed", color:"white", top:"0", zIndex:"999"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/Imagenes/logo 1.png" style={{width:"50px"}}></img>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list-nested" style={{color:"white"}}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works">
                  How It Works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">
                  Testimonials
                </a>
              </li>

              {userData ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="Team">
                      Team
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="BlockExplorer">
                    Block Explorer
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="buy-nfts">
                      Store
                    </a>
                  </li>
                  <li className="nav-item" style={{ cursor: "pointer" }}>
                  <WalletConnect/>
                  </li>
                  <li className="nav-item" style={{ cursor: "pointer" }}>
                    <a className="nav-link" onClick={logout}>
                      LogOut
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <a className="nav-link" href="login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="register">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

  );
}

