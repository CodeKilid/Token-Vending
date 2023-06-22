import React from "react"
import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-start" }}>
                <h1>Token Vending</h1>
            </div>
            <div style={{ alignSelf: "flex-start" }}>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}

export default Header
