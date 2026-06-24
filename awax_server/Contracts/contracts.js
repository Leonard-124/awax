const { ethers } = require("ethers");
require("dotenv").config();
const express = require("express");

const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(URL);

const ADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; // Example address

// Standard ERC-20 ABI (minimal)
const ERC_20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

async function ContraSet(req, res) {
  try {
    // Example: native ETH balance
    const ethBalance = await provider.getBalance(ADDRESS);

    // Example: token balance (Binance Coin contract on Ethereum)
    const contractAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; // BNB ERC-20 contract
    const contract = new ethers.Contract(contractAddress, ERC_20_ABI, provider);
    const tokenBalance = await contract.balanceOf(ADDRESS);

    res.json({
      ethBalance: ethers.formatEther(ethBalance), // convert wei → ETH string
      tokenBalance: tokenBalance.toString(),      // raw token balance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { ContraSet };
