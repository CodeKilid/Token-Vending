const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    // const user = (await getNamedAccounts()).user
    // console.log(user)
    const vendingContract = await ethers.getContract("VendingMachine")

    console.log("purchasing...")
    const fee = await vendingContract.price()
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
