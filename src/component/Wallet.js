import { useState } from "react";
const Wallet = () => {
    const [wallet, Setwallet] = useState("Wallet")
    return (
        <>
            <div className="wallet_box">
                <form >
                    <input className="wallet_input" type="text" placeholder="Filter..." />
                </form>
                <div className="wallet_tabs">
                    <div className="tabs_btn">
                        <button className={`btn ${wallet === "Wallet" ? "active" : ""}`} onClick={() => { Setwallet("Wallet"); }}>
                            Wallet
                        </button>
                        <button className={`btn ${wallet === "Starred" ? "active" : ""}`} onClick={() => { Setwallet("Starred"); }}>
                            Starred
                        </button>
                        <button className={`btn ${wallet === "History" ? "active" : ""}`} onClick={() => { Setwallet("History"); }}>
                            History
                        </button>
                    </div>
                </div>
                <div className="wallet_data">
                    {wallet === "Wallet" && (
                        <>
                            <div className="tabs_content">
                                <button className={`btn ${wallet === "Restore Hidden" ? "active" : ""}`} onClick={() => { Setwallet("Restore Hidden"); }}>
                                    Restore Hidden
                                </button>
                                <h4 className="inner_data">
                                    Connect your wallet to see your tokens.
                                </h4>
                            </div>

                        </>
                    )
                    }
                    {wallet === "Starred" && (
                        <>
                            <div className="tabs_content">
                                <div className="inner_tab_heading">
                                    <button>
                                        Tokens
                                    </button>
                                    <button>
                                        Balance
                                    </button>
                                </div>
                            </div>

                        </>
                    )
                    }

                    {wallet === "History" && (
                        <>
                            <div className="tabs_content">
                                <div className="inner_tab_heading">
                                    <button>
                                        Tokens
                                    </button>
                                </div>
                                <ul>
                                    <li className="coin">
                                        <a className="coin_link" href="/">
                                            SHIB
                                            <span>SHIBA INU</span>
                                        </a>
                                    </li>
                                    <li className="coin">
                                        <a className="coin_link" href="/">
                                            SHIB
                                            <span>SHIBA INU</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </>
                    )
                    }
                    {wallet === "Restore Hidden" && (
                        <>
                            <div className="tabs_content token">
                                <h3>Token</h3>
                            </div>

                        </>
                    )}
                </div>

            </div>
        </>
    )
}
export default Wallet;