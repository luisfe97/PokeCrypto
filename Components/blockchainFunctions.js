import Web3 from "web3";
import abiUsdt from "../constants/abi/abiUsdt";
import abiNft from "../constants/abi/abi";
import abiCoin from "../constants/abi/abiPokeCoin";
import { valHooks } from "jquery";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://subnets.avacloud.io/da8392ca-f21a-4ab2-b881-694f250a3c02"
    )
  );
}
const contractAddressNFT = "0x260503936Bd6E3501B05E09a266B703c2a34EF07";
const contractUSDT = "0x0fa89D93EAcb0681aB39621695B9ea145a488160";
const contractPokeCoinAddress = "0xD18EB3a24901df7804533B50a88b1E77Bbdfd2be";
const contractNft = new web3.eth.Contract(abiNft, contractAddressNFT);
const contractUsdt = new web3.eth.Contract(abiUsdt, contractUSDT);
const contractCoin = new web3.eth.Contract(abiCoin, contractPokeCoinAddress);
export async function _mintNFT1() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const gasLimit = 5000000;
  const result = await contractNft.methods
    .mintPokemon1()
    .send({ from: accounts[0], gas: gasLimit });
  return result;
}
export async function _mintNFT2() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const gasLimit = 5000000;
  const result = await contractNft.methods
    .mintPokemon2()
    .send({ from: accounts[0], gas: gasLimit });
  return result;
}
export async function _mintNFT3() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const gasLimit = 5000000;
  const result = await contractNft.methods
    .mintPokemon3()
    .send({ from: accounts[0], gas: gasLimit });
  return result;
}

export async function buytoken(value) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const gasLimit = 5000000;
  const result = await contractCoin.methods
    .buyTokens(value)
    .send({ from: accounts[0] });
  return result;
}
export async function approveUsdt(value) {
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.getAccounts();

  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);

  const gasLimit = 5000000;
  const result = await contractUsdt.methods
    .approve(contractPokeCoinAddress, value)
    .send({
      from: accounts[0],
      gasPrice: gasPrice,
    });

  // Retornar el resultado de la transacción
  return result;
}

export async function approvePokecoin(amount) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 5000000;

  const contractPokeCoin = new web3.eth.Contract(
    abiCoin,
    contractPokeCoinAddress
  );

  const result = await contractPokeCoin.methods
    .approve(contractAddressNFT, amount)
    .send({ from: accounts[0], gas: gasLimit });

  return result;
}
export async function getPokemonData(ownerAddress) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  const result = await contractNft.methods
    .getPokemonDetails(ownerAddress)
    .call({ from: accounts[0] });

  return result;
}
export async function getwallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  return accounts[0] ;
}
