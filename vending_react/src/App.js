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
    const [count, setCount] = useState() // purchase
    const [amount, setAmount] = useState() // restock

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
                /*
                function getBuyerBalancer() public view returns (uint256) {
                    return donutBalances[msg.sender];
                }
                */
                const newBuyerBalance = await vendingContract.getBuyerBalancer()
                setBuyerBalance(newBuyerBalance.toString())
                console.log("BuyerBalance", newBuyerBalance.toString())
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
                console.log("vending balance is: ", newVendingBalance.toString())
                // set in the useState
                setVendingBalance(newVendingBalance.toString())
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    }

    // purchase
    async function purchase() {
        if (!count) return
        if (typeof window.ethereum !== "undefined") {
            await RequestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const vendingContract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                signer
            )
            const purchaseTx = await vendingContract.purchase()

            setCount()
            await purchaseTx.wait()
        }
    }

    // restock
    async function restock() {
        if (!amount) {
            return
        }

        if (typeof window.ethereum !== "undefined") {
            await RequestAccount()

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            // creating the contract with signer

            const vendingContract = new ethers.Contract(
                VENDING_MACHINE_ADDRESS,
                VendingMachine.abi,
                signer
            )
            const restockTX = await vendingContract.restock(amount)

            setAmount()
            await restockTX.wait() // complete the transaction
        }
    }

    // front side ---> jsx
    return (
        <div className="App">
            <div className="App-Header">
                <div className="description">
                    <h1> Vending Machine</h1>
                    <h3>Full stack dapp using ReactJS and Hardhat</h3>
                </div>

                {/* buttons section */}

                <div className="custom-buttons">
                    <button onClick={getVendingBalance}>vending balance</button>
                    <button onClick={restock}>restock</button>

                    <button onClick={getBuyerBalance}>Buyer Balance</button>
                    <button onClick={purchase}>Purchse</button>
                </div>

                {/* Current count stored on Blockchain */}

                <div className="display">
                    <h2 className="vending-balance"> Vending balance: {vendingBalance}</h2>
                    <h2 className="user-balance"> User balance: {buyerBalance}</h2>
                </div>

                {/* input section for change states of BlockChain */}

                <input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    placeholder="Set Restock amount"
                />
                <input
                    onChange={(v) => {
                        setCount(v.target.value)
                    }}
                    value={count}
                    placeholder="count of product"
                />
            </div>
        </div>
    )
}

export default App
// this comment is for seyyad branch
