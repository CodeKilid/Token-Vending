import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Token Vending</title>
                <meta name="description" content="demo project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <Header />
                <Component {...pageProps} />
            </MoralisProvider>
        </>
    )
}

export default MyApp

// moralis-v1 -> 1.11.0 or above
// react-moralis -> 1.4.1 or
