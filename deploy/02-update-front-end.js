const fs = require("fs")
const { frontEndAbiLocation, frontEndContractFile } = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")

module.exports = async () => {
    console.log("writing to front end...")
    await updateAbi()
    await updateContractAddress()
    console.log("front end written!")
}

async function updateAbi() {
    const vending = await ethers.getContract("VendingMachine")
    fs.writeFileSync(
        `${frontEndAbiLocation}TokenVending.json`,
        vending.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddress() {
    const chainId = network.config.chainId.toString()
    const vending = await ethers.getContract("VendingMachine")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractFile, "utf8"))
    console.log(contractAddresses)
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["VendingMachine"].includes(vending.address)) {
            contractAddresses[chainId]["VendingMachine"].push(vending.address)
        }
    } else {
        contractAddresses[chainId] = { VendingMachine: [vending.address] }
    }

    fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
