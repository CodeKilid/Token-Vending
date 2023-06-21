import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Header />
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp

// moralis-v1 -> 1.11.0 or above
// react-moralis -> 1.4.1 or
