import GetBuyerBalance from "../components/GetBuyerBalance"
import GetVendingBalance from "../components/GetVendingBalance"
import Purchase from "../components/Purchase"
import Restock from "../components/Restock"

const Home = () => {
    return (
        <div className="container mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl font-bold mb-4">Buyer Balance</h2>
                    <GetBuyerBalance />
                </div>
                <div className="bg-white rounded-md p-6">
                    <h2 className="text-xl font-bold mb-4">Vending Balance</h2>
                    <GetVendingBalance />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Purchase</h2>
                <Purchase />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Restock</h2>
                <Restock />
            </div>
        </div>
    )
}

export default Home
