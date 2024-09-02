// pages/transfer.js
import { useState } from 'react';
import { checkBalances, transferTokens } from '../utils/bridge';
import Navbar from "@/Components/Navbar";

export default function Transfer() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState({});
  const [amount, setAmount] = useState('');

  const handleCheckBalance = async () => {
    const result = await checkBalances(account);
    setBalance(result);
  };

  const handleTransfer = async () => {
    await transferTokens(amount, account);
  };

  return (
    <>
    <Navbar />
    <div style={{marginTop:"50px"}}>
        
      <h1>Transferencia de Tokens</h1>
      <input
        type="text"
        placeholder="Dirección de cuenta"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <button onClick={handleCheckBalance}>Verificar Saldo</button>
      <div>
        <p>Saldo C-Chain: {balance.cChainBalance}</p>
        {/* Puedes agregar aquí el saldo en Subnet si es necesario */}
      </div>
      <input
        type="text"
        placeholder="Cantidad a transferir"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transferir Tokens</button>
    </div>
    </>
  );
}