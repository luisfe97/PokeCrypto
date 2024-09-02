import Head from "next/head";
import Image from "next/image";
import Web3 from "web3";
import { useEffect, useState } from "react";
import $ from "jquery";
import Navbar from "@/Components/Navbar";

let web3 = new Web3(new Web3.providers.HttpProvider("https://subnets.avacloud.io/da8392ca-f21a-4ab2-b881-694f250a3c02"));

export default function BlockExplorer() {
  async function loadBlocks() {
    try {
      const latestBlockNumber = await web3.eth.getBlockNumber();

      for (let i = 0; i < 10; i++) {
        const block = await web3.eth.getBlock(latestBlockNumber - BigInt(i), true);
        const number = block.number.toString(); // Convertir a cadena para evitar problemas con BigInt
        const hash = block.hash;
        const time = new Date(Number(block.timestamp) * 1000).toLocaleString(); // Convertir BigInt a Number

        let contractAddresses = "";
        let txStatuses = "";

        for (const tx of block.transactions) {
          const receipt = await web3.eth.getTransactionReceipt(tx.hash);

          if (receipt) {
            console.log(receipt.status)
            const status = Number(receipt.status) === 1 ? "Confirmed" : "Failed";


            txStatuses += `<li>${status}</li>`;

            if (receipt.contractAddress) {
              contractAddresses += `<li>${receipt.contractAddress}</li>`;
            }
          } else {
            txStatuses += `<li>Pending</li>`;
          }
        }

        contractAddresses = contractAddresses ? `<ul>${contractAddresses}</ul>` : "N/A";
        txStatuses = txStatuses ? `<ul>${txStatuses}</ul>` : "N/A";

        $(".myClass").append(
          `<tr>
            <td>${number}</td>
            <td>${hash}</td>
            <td>${time}</td>
            <td>${contractAddresses}</td>
            <td>${txStatuses}</td>
          </tr>`
        );
      }
    } catch (error) {
      console.error("Error loading blocks:", error);
    }
  }

  useEffect(() => {
    loadBlocks();
  }, []);

  return (
    <>
    <Navbar/>
      <div  style={{marginTop:"100px"}}>      
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src="/Imagenes/logo 1.png" alt="logo" />
              <h1>Poke Explorer</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Block #</th>
                    <th scope="col">Hash</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Contract Addresses</th>
                    <th scope="col">Transaction Status</th>
                  </tr>
                </thead>
                <tbody className="myClass"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
