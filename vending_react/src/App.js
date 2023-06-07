import "./App.css"
import { ethers } from "ethers"
import { useState } from "react"
import VendingMachine from "./artifacts/contracts/VendingMachine.sol/VendingMachine.json"

const VENDING_MACHINE_ADDRESS = "0x687bB6c57915aa2529EfC7D2a26668855e022fAE"

function App() {
    /* functions */
    // get request account
    const [buyerBalance, setBuyerBalance] = useState("")
    const [vendingBalance, setVendingBalance] = useState("")

    async function RequestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    // get buyer balance
    async function getBuyerBalance() {
        if (typeof window.ethereum !== "undefined") {
            // await RequestAccount()

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const vendingContract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                provider
            )
            const transaction = vendingContract.getBuyerBalancer()
        }
    }

    // get vending balance
    async function getVendingBalance() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                provider
            )
        }
        // call contract.getVendingBalance() and display current balance of vending machine
        /* function getVendingMachineBalance() public view returns (uint256) {
              return donutBalances[address(this)];
        }*/
        try {
            const vendingBalance = await contract.getVendingMachineBalance()
            console.log("vending balance is: ", vendingBalance)
            // set in the useState
            setVendingBalance(vendingBalance)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    // purchase
    async function purchase() {}

    // restock
    async function restock() {}

    // front side ---> jsx
    return (
        <div className="App">
            <button>buyer balance</button>
            <button>restock</button>

            <button onclick="">Buyer Balance</button>
            <button onclick="">Purchse</button>
        </div>
    )
}

export default App
// this comment is for seyyad branch
