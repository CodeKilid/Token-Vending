import "./App.css"
import { ethers } from "ethers"
import VendingMachine from "./artifacts/contracts/VendingMachine.sol/VendingMachine.json"

const VENDING_MACHINE_ADDRESS = "0x687bB6c57915aa2529EfC7D2a26668855e022fAE"

function App() {
    /* functions */
    // get request account
    async function getRequestAccount() {}

    // get buyer balance
    async function getBuyerBalance() {}

    // get vending balance
    async function getVendingBalance() {}

    // purchase
    async function purchase() {}

    // restock
    async function restock() {}

    // front side ---> jsx
    return (
        <div className="App">
            <button>buyer balance</button>
            <button>restock</button>
        </div>
    )
}

export default App
// this comment is for seyyad branch
