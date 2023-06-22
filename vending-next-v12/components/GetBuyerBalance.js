import { useMoralis, useWeb3Contract } from "react-moralis"
import vendingMachineAbi from "../constant/TokenVending.json"
import { useState } from "react"
import networkMapping from "../constant/networkMapping.json"
import { Button } from "web3uikit"

function GetBuyerBalance() {
    const { chainId, account } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const contractAddress = networkMapping[chainString].VendingMachine[0]

    const { runContractFunction: getBuyerBalancer } = useWeb3Contract({
        abi: vendingMachineAbi,
        contractAddress: contractAddress,
        functionName: "getBuyerBalancer",
        params: {},
    })

    // other way to get the contract
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    // const vendingContract = new ethers.Contract(contractAddress, vendingMachineAbi, signer)

    const [newBuyerBalance, setBuyerBalance] = useState(null)

    const fetchBUyerBalance = async () => {
        if (account) {
            const balance = await getBuyerBalancer()
            setBuyerBalance(balance.toString())
            console.log(contractAddress)
            console.log(vendingMachineAbi)
            console.log(account)
            console.log(balance.toString())
        } else {
            console.error("Please connect your wallet")
        }
    }

    return (
        <>
            <Button text="Your Balance" onClick={fetchBUyerBalance} />
            <h2>{newBuyerBalance}</h2>
        </>
    )
}

export default GetBuyerBalance
