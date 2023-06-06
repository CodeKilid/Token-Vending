const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("VendingMachine", function () {
    let owner, user, vendingMachine, INITIAL_BALANCE, DONUT_PRICE, PURCHASED_DONUTS

    beforeEach(async function () {
        // deploy a new instance of VendingMachine
        ;[owner, user] = await ethers.getSigners()

        // deploy contract

        const VendingMachineContract = await ethers.getContractFactory("VendingMachine")
        vendingMachine = await VendingMachineContract.deploy()
        await vendingMachine.deployed()

        INITIAL_BALANCE = await vendingMachine.initialBalance()
        DONUT_PRICE = await vendingMachine.price()
    })

    it("1, should have an initial balance of 100 donuts", async function () {
        const balance = await vendingMachine.getVendingMachineBalance()
        expect(balance).to.equal(INITIAL_BALANCE)
    })

    it("2, should allow the owner to restock the vending machine", async function () {
        const RESTOCK_AMOUNT = 5
        PURCHASED_DONUTS = 10

        // get the value
        const value = (PURCHASED_DONUTS * DONUT_PRICE).toString()
        console.log(`the value is : ${value}`)
        // purchase 5 donuts
        // we expect owner can restock 5 donut
        await vendingMachine.purchase(PURCHASED_DONUTS, { value })
        const remaindDonutsAfterPurchase = Number(await vendingMachine.getVendingMachineBalance())
        console.log(
            `the machine has after purchase 10 donuts: ${remaindDonutsAfterPurchase} donuts. `
        )
        //
        await vendingMachine.restock(RESTOCK_AMOUNT)
        const remaindDonutsAfterRestock = Number(await vendingMachine.getVendingMachineBalance())
        console.log(
            `the machine has after restock 5 donuts: ${remaindDonutsAfterRestock} donuts. `
        )
        expect(remaindDonutsAfterRestock).to.equal(remaindDonutsAfterPurchase + RESTOCK_AMOUNT)
    })

    it("3, should allow a user to purchase donuts", async function () {
        PURCHASED_DONUTS = 2
        const value = (PURCHASED_DONUTS * DONUT_PRICE).toString()
        await vendingMachine.purchase(PURCHASED_DONUTS, { value })
        const expectedBalance = await vendingMachine.getVendingMachineBalance()
        const userBalance = await vendingMachine.donutBalances(owner.address)
        const currentBalance = (INITIAL_BALANCE - PURCHASED_DONUTS).toString()

        assert.equal(expectedBalance, currentBalance)
        assert.equal(userBalance, PURCHASED_DONUTS)
    })

    it("4, should not allow a purchase if the user sends insufficient funds", async function () {
        PURCHASED_DONUTS = 3
        const value = (PURCHASED_DONUTS * DONUT_PRICE - 1).toString()
        await expect(vendingMachine.purchase(PURCHASED_DONUTS, { value }))
            .to.be.revertedWithCustomError(vendingMachine, "VendingMachine__payMoreEth")
            .withArgs(PURCHASED_DONUTS * DONUT_PRICE)
    })

    it("5, should not allow a purchase if there are not enough donuts in stock", async function () {
        PURCHASED_DONUTS = 200
        const value = (PURCHASED_DONUTS * DONUT_PRICE).toString()
        await expect(vendingMachine.purchase(PURCHASED_DONUTS, { value }))
            .to.be.revertedWithCustomError(vendingMachine, "VendingMachine__NotEnoughDonut")
            .withArgs(await vendingMachine.getVendingMachineBalance())
    })

    it("6, should not allow a user instead owner to restock the balance", async () => {
        await expect(vendingMachine.connect(user).restock(10))
            .to.be.revertedWithCustomError(vendingMachine, "VendingMachine__ownerProperties")
            .withArgs(owner.address)
    })
    it("should not trust to anyOne for anything, i know i can do it and just rely the god", async () => {})

    it("another test is for us, for this thing that we can do it with better things", async () => {})
})
