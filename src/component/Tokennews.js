import { useEffect, useState } from "react";

import { getRequest } from "../Action";
import { APIURL } from "../config";

const TokenNews = (props) => {
    const [Visitcharttrade, SetVisitcharttrade] = useState(false);
    const [previousToken, setPreviousToken] = useState();
    const [tokenUrl, setTokenUrl] = useState({
        txUrl: '',
        holderUrl: '',
        contractUrl: ''

    })
    const [totalSupply, setTotalSupply] = useState(0);
    const Visitchart = () => {
        SetVisitcharttrade(!Visitcharttrade)
    }

    const [tokentab, Settokentabs] = useState("tokentabs")
    const TokenData = [
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
        {
            coinApeswap: "Apeswap",
            coinHoldings: "|SHIB/BNB LP Holdings:",
            coinbnb: "1,236.01 BNB",
            coinPrice: "($516,610)",
            coinchart: "Chart",
            coinHolders: "Holders",
        },
    ]

    useEffect(() => {
        getTotalSupply();
        setBinanceUrl();
    }, []);

    const getTotalSupply = async () => {
        let data = await getRequest(APIURL + 'supply/address=', props.token);
        var n = parseFloat(data.result) / 10 ** 18;
        if (data.result.length < 18) {
            n = parseFloat(data.result) / 10 ** 6;
        }
        setTotalSupply(n.toLocaleString());
        setBinanceUrl();
    }

   const setBinanceUrl=()=>{
        setTokenUrl({
            txUrl: "https://bscscan.com/token/" + props.token,
            holderUrl: "https://bscscan.com/token/" + props.token + "#balances",
            contractUrl: "https://bscscan.com/address/" + props.token + "#code"
        })
   }
    

    if (props.newToken != '') {
        if (previousToken != props.newToken) {
            getTotalSupply();
            setPreviousToken(props.newToken);
        }

    }



    return (
        <div className="total_supply">
            <button className="info_btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/* Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) */}<path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" /></svg>
                Info
            </button>
            <div className="token_tabs">
                <div className="token_btn">
                    <button className={`btn ${tokentab === "tokentabs" ? "active" : ""}`} onClick={() => { Settokentabs("tokentabs"); }}>
                        tokentabs
                    </button>
                    <button className={`btn ${tokentab === "News" ? "active" : ""}`} onClick={() => { Settokentabs("News"); }}>
                        News
                    </button>
                </div>
                {tokentab === "tokentabs" && (
                    <>
                        <div className="token_content">
                            <h4 className='heading'>Total Supply:</h4>
                            <h5 className='info'>{totalSupply}</h5>
                            <div className="market_cap">
                                Market Cap: <span>(Includes locked, excludes burned)</span>
                                <span className='price'>$150,478,007</span>
                            </div>
                            <ul className='holding_coin'>
                                {
                                    TokenData.map((val) => {
                                        return (
                                            <li className='coin_data'>
                                                <a className='apeswap' href="/">{val.coinApeswap}</a>{val.coinHoldings} <br /> <span>{val.coinbnb}</span> <span className='price'>  {val.coinPrice}</span>
                                                |<a className='chart' href="/">{val.coinchart}</a>
                                                |<a className='holders' href="/"> {val.coinHolders}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <ul className="coin_item">
                                <li className="item">
                                    <a className="coin_link" href={tokenUrl.txUrl} target="_blank">
                                        <img src={require("../assets/icons/bscscan.png")} alt="" />
                                        {props.symbol + ' Transactions'}
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link" href={tokenUrl.contractUrl} target="_blank">
                                        <img src={require("../assets/icons/bscscan.png")} alt="" />
                                        {props.symbol + ' Contract'}
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link" href={tokenUrl.holderUrl} target="_blank">
                                        <img src={require("../assets/icons/bscscan.png")} alt="" />
                                        {props.symbol + ' Holders'}
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link" href="/">
                                        Dev Wallet Checker
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link Bitquery" href="/">
                                        <img src={require("../assets/icons/bitquery-logo.png")} alt="" />
                                        Bitquery Explorer
                                    </a>
                                </li>
                                <li className="item">
                                    <button className="coin_link Bitquery" onClick={Visitchart}>
                                        PooCoin Visits chart

                                        {!Visitcharttrade && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" /></svg>
                                            </>
                                        )}
                                        {Visitcharttrade && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{/* Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) */}<path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" /></svg>
                                            </>
                                        )}


                                    </button>
                                    {Visitcharttrade && (
                                        <>
                                            <h5 className="hours">4,040 in 24 hours</h5>
                                            <img src={require("../assets/images/trade-char-img.png")} alt="" />
                                        </>
                                    )}
                                </li>
                                <li className="item">
                                    <a className="coin_link " href="/">
                                        <img className="gif" src={require("../assets/images/earn-mony.gif")} alt="" />
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link " href="/">
                                        <img className="gif" src={require("../assets/images/kyc.gif")} alt="" />
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </>
                )}
                {tokentab === "News" && (
                    <>
                        <div className="token_content">
                            <h4 className='heading no_news_available'>No news available.</h4>

                            <ul className="coin_item">
                                <li className="item">
                                    <a className="coin_link " href="/">
                                        <img className="gif" src={require("../assets/images/earn-mony.gif")} alt="" />
                                    </a>
                                </li>
                                <li className="item">
                                    <a className="coin_link " href="/">
                                        <img className="gif" src={require("../assets/images/kyc.gif")} alt="" />
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default TokenNews;