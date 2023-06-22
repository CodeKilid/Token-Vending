import Image from "next/image"
import styles from "../styles/Home.module.css"
import GetBuerBalance from "../components/GetBuyerBalance"
import GetVendingBalance from "../components/GetVendingBalance"
import Purchase from "../components/Purchase"
export default function Home() {
    return (
        <div className="container">
            <GetBuerBalance />

            <div>
                <GetVendingBalance />
            </div>

            <div>
                <Purchase />
            </div>
        </div>
    )
}
