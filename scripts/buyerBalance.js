const { ethers } = require("hardhat")
const { abi } = require("../artifacts/contracts/VendingMachine.sol/VendingMachine.json")
require("dotenv").config()

async function main() {
    const contractAddress = "0x66e5CE39C90341f54b6D5B43710B2e034CDe6A7D"
    const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL)
    const vendingContract = new ethers.Contract(contractAddress, abi, provider)

    const buyerBalance = await vendingContract.getBuyerBalancer()

    console.log(`buyer balance is: ${buyerBalance}`)

    const vendingBalance = await vendingContract.getVendingMachineBalance()
    console.log(`vending balance is ${vendingBalance}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

//cap's vending : 0xb05bc226439de47aabc676129e163e33cedec434
