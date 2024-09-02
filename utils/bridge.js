// utils/bridge.js
import { ethers } from 'ethers';
import abiHome from "../AbiBridge/abiHome.json"
import abiRemote from "../AbiBridge/abiRemote.json"
import abi from "../constants/abi/abiPokeCoin"

// Direcciones de los contratos
const HOME_CONTRACT_ADDRESS = '0x3865973D6C74e628cA29FDdFeCD86CAAc85C9221';
const REMOTE_CONTRACT_ADDRESS = '0x3CE4C20663c2F8aed3390B28561842BE8B5d403a';
const ERC20_TOKEN_ADDRESS = '0x3CE4C20663c2F8aed3390B28561842BE8B5d403a';

// ABI de los contratos (debes reemplazar esto con los ABI reales de tus contratos)
const HOME_CONTRACT_ABI = abiHome;
const REMOTE_CONTRACT_ABI = abiRemote;
const ERC20_ABI = abi;

const providerCChain = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_C_CHAIN_RPC);
const providerSubnet = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SUBNET_RPC);

const homeContract = new ethers.Contract(HOME_CONTRACT_ADDRESS, HOME_CONTRACT_ABI, providerCChain);
const remoteContract = new ethers.Contract(REMOTE_CONTRACT_ADDRESS, REMOTE_CONTRACT_ABI, providerSubnet);
const erc20Token = new ethers.Contract(ERC20_TOKEN_ADDRESS, ERC20_ABI, providerCChain);

export const checkBalances = async (account) => {
  const cChainBalance = await erc20Token.balanceOf(account);
  // Aquí puedes agregar la lógica para verificar el saldo en la subred si es necesario
  return {
    cChainBalance: ethers.utils.formatUnits(cChainBalance, 18),
    // subnetBalance: await remoteContract.balanceOf(account) // ejemplo para saldo en Subnet
  };
};

export const transferTokens = async (amount, account) => {
  // Configura tu wallet aquí
  const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', providerCChain);

  const tx = await erc20Token.connect(wallet).transfer(remoteContract.address, ethers.utils.parseUnits(amount, 18));
  await tx.wait();

  console.log('Transferencia exitosa:', tx.hash);
  // Puedes agregar lógica para la transferencia desde C-Chain a Subnet aquí
};