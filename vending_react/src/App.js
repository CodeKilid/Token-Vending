import "./App.css"
import { ethers } from "ethers"
import { useState } from "react"
import VendingMachine from "./artifacts/contracts/VendingMachine.sol/VendingMachine.json"

const VENDING_MACHINE_ADDRESS = "0x687bB6c57915aa2529EfC7D2a26668855e022fAE"

function App() {
    /* functions */
    // get request account
    const [buyerBalance, setBuyerBalance] = useState()
    const [vendingBalance, setVendingBalance] = useState()
    const [value, setValue] = useState()
    const [amount, setAmount] = useState()

    async function RequestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    // get buyer balance
    async function getBuyerBalance() {
        // getting the Buyer Balance from the contract

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const vendingContract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                provider
            )
            try {
                const newBuyerBalance = await vendingContract.getBuyerBalancer()
                setBuyerBalance(newBuyerBalance)
                console.log("BuyerBalance", buyerBalance.toString())
            } catch (error) {
                console.log(error)
            }
        }
    }

    // get vending balance
    async function getVendingBalance() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const vendingContract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                provider
            )
            try {
                // call contract.getVendingBalance() and display current balance of vending machine
                /*
                 function getVendingMachineBalance() public view returns (uint256) {
                    return donutBalances[address(this)];
                 }
                */
                const newVendingBalance = await vendingContract.getVendingMachineBalance()
                console.log("vending balance is: ", vendingBalance.toString())
                // set in the useState
                setVendingBalance(newVendingBalance)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    }

    // purchase
    async function purchase() {}

    // restock
    async function restock() {}

    // front side ---> jsx
    return (
        <div className="App">
            <div className="App-Header">
                <div className="description">
                    <h1> Vending Machine</h1>
                    <h3>Full stack dapp using ReactJS and Hardhat</h3>
                </div>
                <div className="custom-buttons">
                    <button onClick={getVendingBalance}>vending balance</button>
                    <button onClick="">restock</button>

                    <button onClick={getBuyerBalance}>Buyer Balance</button>
                    <button onClick="">Purchse</button>
                </div>
                <div className="display">
                    <h2 className="vending-balance"> Vending balance: {vendingBalance}</h2>
                </div>
            </div>
        </div>
    )
}

export default App
// this comment is for seyyad branch
