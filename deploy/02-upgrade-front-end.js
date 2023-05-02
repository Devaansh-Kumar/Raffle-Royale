const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESS_FILE = "../Raffle-Royale-frontend/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../Raffle-Royale-frontend/constants/abi.json";

module.exports = async () => {
     if(process.env.UPDATE_FRONT_END){
        console.log("Updating Frontend...");
        updateContractAddresses();
        updateAbi();
     }
}

const updateAbi = async () => {
    const raffle = await ethers.getContract("Raffle");
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json)); // to get the abi
}

const updateContractAddresses = async () => {
    const raffle = await ethers.getContract("Raffle");
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE, "utf8"));
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(raffle.address)) {
            contractAddresses[network.config.chainId.toString()].push(raffle.address);
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [raffle.address];
    }
    fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(contractAddresses));
}

module.exports.tags = ["all", "frontend"];