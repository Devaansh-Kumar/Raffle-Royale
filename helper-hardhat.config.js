const { ethers } = require("hardhat");

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        raffleEntranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "10498",     // chainlink VRF subscription id   https://vrf.chain.link/goerli/10498
        callbackGasLimit: "500000",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        raffleEntranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        callbackGasLimit: "500000",
        keepersUpdateInterval: "30",
        subscriptionId: "588",
    },
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
module.exports = { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS };
