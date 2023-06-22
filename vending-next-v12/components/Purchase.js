import React, { useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import vendingMahineAbi from "../constant/TokenVending.json"
import networkMapping from "../constant/networkMapping.json"
import { Input, Button } from "web3uikit"
import { ethers } from "ethers"

const Purchase = () => {
    const [count, setCount] = useState(null)
    const { chainId, account } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const contractAddress = networkMapping[chainString].VendingMachine[0]
    let purchaseTx
    // const { runContractFunction: purchase } = useWeb3Contract({
    //     abi: vendingMahineAbi,
    //     contractAddress: contractAddress,
    //     functionName: "purchase",
    //     msgValue: price,
    //     params: {
    //         amount: count,
    //     },
    // })
    if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const vendingContract = new ethers.Contract(contractAddress, vendingMahineAbi, signer)

        purchaseTx = async () => {
            if (account) {
                try {
                    const price = (await vendingContract.price()).toString()
                    console.log(price)
                    const purchaseTransaction = await vendingContract.purchase(count, {
                        gasLimit: 300000,
                        value: count * price,
                    })

                    await purchaseTransaction.wait()
                    console.log(`you purchased ${count}`)
                } catch (error) {
                    console.error("Error purchasing:", error)
                }
            }
        }
    }

    return (
        <div>
            <div>
                <Button text="purchase" onClick={purchaseTx} />
            </div>

            <div>
                <Input
                    label="count of product"
                    name="count"
                    type="number"
                    onChange={(event) => {
                        setCount(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default Purchase
