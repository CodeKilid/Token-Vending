import React, { useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import vendingMachineAbi from "../constant/TokenVending.json"
import networkMapping from "../constant/networkMapping.json"
import { Input, Button } from "web3uikit"
import { ethers } from "ethers"

const Restock = () => {
    const { chainId, account } = useMoralis()
    const [amount, setAmount] = useState(null)
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const contractAddress = networkMapping[chainString].VendingMachine[0]
    let handleRestock
    // const { runContractFunction: restock } = useWeb3Contract({
    //     abi: vendingMachineAbi,
    //     contractAddress: contractAddress,
    //     functionName: "restock",
    //     params: {
    //         amount: amount,
    //     },
    // })
    if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const vendingContract = new ethers.Contract(contractAddress, vendingMachineAbi, signer)

        handleRestock = async () => {
            if (account) {
                const restockTx = await vendingContract.restock(amount)
                await restockTx.wait()
                console.log(`restock ${amount} amount`)
            } else {
                console.error("Please connect your wallet")
            }
        }
    }
    return (
        <div>
            <div>
                <Button text="Restock" onClick={handleRestock} />
            </div>
            <div>
                <Input
                    label="amount"
                    name="amout"
                    type="number"
                    onChange={(event) => {
                        setAmount(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default Restock
