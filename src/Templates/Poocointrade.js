import TopToken from '../component/TopToken';
import TokenDetail from '../component/TokenDetail';
import Pool from '../component/PoolRightComponent';
import Trade from '../component/Trade';
import TradingViewWidget, { Themes, IntervalTypes } from 'react-tradingview-widget';
import HeaderSection from '../Header-Footer/Header_new';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from "../Action";
import { APIURL, BSCURL, HOST } from "../config";
// import LightWeightChart from '../component/lightweightChart';
let intervalID;

const TrendingChart = () => {

    const [symbol, setsymbol] = useState('BLT');
    const [item, setItem] = useState({});
    const [desktopView, setDesktopView] = useState(true);
    const [totalSupply, setTotalSupply] = useState(0);
    const [trades, setTrades] = useState([]);
    const [poolPair, setPoolPair] = useState([]);
    const [tokenDetail, setTokenDetail] = useState({});
    const [refreshToken, setRefreshToken] = useState([]);
    const [tokendecimal, setDecimal] = useState(18);
    const [liquidity, setLiquidity] = useState('-');

    useEffect(() => {

        if (window.location.pathname.includes('token')) {
            var info = localStorage.getItem("tokenInfo");
            info = JSON.parse(info);
            setsymbol(info.symbol);
            getTotalSupply(info.address, info);
            getTradeHistory(info.address);
            getPoolPair(info.address);
            getTokenExtraDetail(info.address);
        }

        if (window.screen.width < 224) {
            setDesktopView(false);
        }

        window.onclick = function (event) {
            // mbtnsrch
            if (event.target.id !== 'txtToken' && event.target.id !== 'searcht'
                && event.target.id !== 'mtxtToken' && event.target.id !== 'van-search-15-input'
                && event.target.id !== 'btnsrch' && event.target.id !== 'btnsrch'
                && event.target.id !== 'mbtnsrch' && event.target.id !== 'mbtnsrch') {
                let popup = document.getElementById('dialogcontainer');
                if (popup !== null) {
                    popup.style.display = "none";
                }

            }
            else {
                let popup = document.getElementById('dialogcontainer');
                popup.style.display = "block";
            }
        }

    }, []);

    // this function call when user search any token in header search bar and select any token
    const changeMapWithSymbol = (item, symbol) => {

        setsymbol(symbol);
        getTotalSupply(item.address, item);
        getTradeHistory(item.address);
        getPoolPair(item.address);
        getTokenExtraDetail(item.address);
    }


    const getTotalSupply = async (address, token) => {
        let data = await getRequest(APIURL + 'supply?address=', address);
        var n = parseFloat(data.result);
        // if (data.result.length < 18) {
        //     n = parseFloat(data.result) / 10 ** 6;
        // }
        setTotalSupply(n);
        token.supply = n;
        setItem(token);
        clearInterval(intervalID);
        setTrades([]);
        intervalID = setInterval(() => {
            // refresh data after 30 seconds
            refreshData(token.address);
        }, 30000);

    }

    // get trade history list of pair token
    const getTradeHistory = async (address) => {
        let data = await postRequest(APIURL + 'trade/address=', address);
        if (data !== null) {
            setTrades(data);
        }
        else {
            setTrades([]);
        }

    }

    // call function when select from any top,gainer and recent list 
    const changeHotAddress = (item) => {
        setsymbol(item.symbol);
        getTotalSupply(item.address, item);
        getTradeHistory(item.address);
        getPoolPair(item.address);
        getTokenExtraDetail(item.address);
    }

    // get pool pair list that show in right component in pool tab 
    const getPoolPair = async (address) => {
        let data = await getRequest(APIURL + 'poolpair?address=', address);
        let decimal = data != undefined ? data.token.decimal : '18';
        setDecimal(decimal);
        setPoolPair(data != undefined ? data.pairs : []);
        if (data != undefined && data.pairs.length > 0) {
            let liquidity = 0.0;
            let symbl=data.token.symbol;
            if (data.pairs[0].token0_symbol === symbl) {
                liquidity = data.pairs[0].reserve1 * data.pairs[0].token1_price_usd * 2;
            }
            else {
                liquidity = data.pairs[0].reserve0 * data.pairs[0].token0_price_usd * 2;
            }
            setLiquidity(liquidity);
        }
    };

    // get token extra detail that show in second header bar
    const getTokenExtraDetail = async (address) => {
        let data = await getRequest(APIURL + 'tokeninfo?address=', address);
        setTokenDetail(data);
    }

    const refreshFavoriteToken = (value) => {
        if (value == true) {
            var token = localStorage.getItem("favoriteToken");
            token = JSON.parse(token);
            if (token === null) {
                token = [];
            }
            setRefreshToken(token);
        }
    }

    const refreshData = (address) => {
        getTradeHistory(address);
        getPoolPair(address);
        getTokenExtraDetail(address);
    };

    const changeChartByPair=(index,liquidity)=>{
        console.log(index);
        setLiquidity(liquidity);
    }

    return (

        <>
            <HeaderSection changeMapWithSymbol={changeMapWithSymbol} />
            {desktopView ?
                <section className='sec_trede_chart'>
                    {/* < !--Section Token Detail-- > */}
                    <TokenDetail symbol={symbol} liquidity={liquidity} token={item} tokendecimal={tokendecimal} supply={totalSupply} tokenDetail={tokenDetail} refreshFavoriteToken={refreshFavoriteToken} />
                    <div className='sec_content_trede_chart'>
                        <div className='sec_content_trede_chart_inner'>
                            <TopToken changeHotAddress={changeHotAddress} refreshToken={refreshToken} />
                            {/* < !--Section Graph-- > */}
                            <div className='treding_chart'>
                                <TradingViewWidget
                                    height="610"
                                    width="100%"
                                    symbol={symbol != undefined ? symbol : 'BNB'}
                                    timezone="Etc/UTC"
                                    theme="dark"
                                    interval={IntervalTypes.D}
                                    locale="in"
                                    toolbar_bg="#f1f3f6"
                                    range="YTD"
                                    allow_symbol_change="true"
                                    hide_side_toolbar="true"
                                    show_popup_button="true"
                                    popup_width="1000"
                                    popup_height="550"
                                    container_id="tradingview_d0018"
                                />
                            </div>
                            {/* <Wallet /> */}
                            <Pool symbol={symbol} poolPairs={poolPair} changeChartByPair={changeChartByPair}/>
                        </div>
                    </div>
                    {/* <div>
                        <LightWeightChart />
                    </div> */}
                    {/* < !--Token Trade-- > */}
                    <Trade tradeHistory={trades} symbol={symbol} />
                    {/* <div className="TradingViewChart_tradingViewChart__39mEQ" id="tv-chart-container-2022-04-28T10:48:01.604+05:30">
                        <iframe id="tradingview_4dc36" name="tradingview_4dc36" src="https://poocoin.app/charts1/charting_library/en-tv-chart.ca0cc69b.html#symbol=0x449aed32c1685dbeca28d1ae45462b6156a6096d-0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c-BLT-BNB&amp;interval=15&amp;widgetbar=%7B%22details%22%3Afalse%2C%22watchlist%22%3Afalse%2C%22watchlist_settings%22%3A%7B%22default_symbols%22%3A%5B%5D%7D%7D&amp;timeFrames=%5B%7B%22text%22%3A%221m%22%2C%22resolution%22%3A%2260%22%2C%22description%22%3A%221%20Month%22%7D%2C%7B%22text%22%3A%221w%22%2C%22resolution%22%3A%2215%22%2C%22description%22%3A%225%20Days%22%7D%2C%7B%22text%22%3A%221d%22%2C%22resolution%22%3A%221%22%2C%22description%22%3A%221%20Day%22%7D%5D&amp;locale=en&amp;uid=tradingview_4dc36&amp;clientId=0&amp;userId=0&amp;chartsStorageVer=1.0&amp;debug=false&amp;timezone=Asia%2FCalcutta&amp;theme=Dark" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style={{display: 'block', width: '100%', height: '100%'}}></iframe>
                        </div> */}
                    {/* < !--Footer-- > */}
                    {/* <Footer /> */}
                </section> : null
            }

        </>
    )
}

export default TrendingChart;
