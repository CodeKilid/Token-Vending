const { ethers } = require("hardhat")
const { abi } = require("../artifacts/contracts/VendingMachine.sol/VendingMachine.json")

require("dotenv").config()

async function main() {
    const contractAddress = "0x66e5CE39C90341f54b6D5B43710B2e034CDe6A7D"
    const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL)
    const singer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const vendingContract = new ethers.Contract(contractAddress, abi, singer)

    console.log("purchasing...")

    const fee = await vendingContract.price()
    console.log(`price is: ${fee}`)

    const purchaseCount = 2
    const purchase = await vendingContract.purchase(purchaseCount, { value: purchaseCount * fee })
    await purchase.wait(1)

    console.log("purchase is done.")

    const buyerBalance = await vendingContract.getBuyerBalancer()
    console.log(`buyer balance is: ${buyerBalance}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
