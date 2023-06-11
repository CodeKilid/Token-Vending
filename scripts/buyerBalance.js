const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const user = (await getNamedAccounts()).user
    const vendingContract = await ethers.getContract("VendingMachine", user)

    const buyerBalance = await vendingContract.getBuyerBalancer()
    console.log(`buyer balance is: ${buyerBalance}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
