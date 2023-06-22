import { useMoralis, useWeb3Contract } from "react-moralis"
import vendingMachineAbi from "../constant/TokenVending.json"
import { useState } from "react"
import networkMapping from "../constant/networkMapping.json"
import React from "react"

const GetVendingBalance = () => {
    const { chainId, account } = useMoralis()
    const [vendingBalance, setVendignBalnce] = useState(null)
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const contractAddress = networkMapping[chainString].VendingMachine[0]

    const { runContractFunction: getVendingMachineBalance } = useWeb3Contract({
        abi: vendingMachineAbi,
        contractAddress: contractAddress,
        functionName: "getVendingMachineBalance",
        params: {},
    })

    const fetchVendingMachineBalance = async () => {
        if (account) {
            const vendingBalance = await getVendingMachineBalance()
            setVendignBalnce(vendingBalance.toString())
            console.log(vendingBalance.toString())
        } else {
            console.error("Please connect your wallet")
        }
    }
    return (
        <div>
            <button onClick={fetchVendingMachineBalance}> Inventory </button>
            <h2>{vendingBalance}</h2>
        </div>
    )
}

export default GetVendingBalance
