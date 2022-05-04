import { createChart } from 'lightweight-charts';
import TopToken from '../component/TopToken';
import TokenDetail from '../component/TokenDetail';
import Pool from '../component/PoolRightComponent';
import Trade from '../component/Trade';
import TradingViewWidget, { Themes, IntervalTypes } from 'react-tradingview-widget';
import HeaderSection from '../Header-Footer/Header_new';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from "../Action";
import { APIURL, BSCURL, HOST } from "../config";
let intervalID;
let candlestickSeries;

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
    const [klineData,setKlineData]=useState([]);

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

        var darkTheme = {
            chart: {
                layout: {
                    backgroundColor: '#131722',
                    lineColor: '#131722',
                    textColor: '#D9D9D9',
                },
                watermark: {
                    color: 'rgba(0, 0, 0, 0)',
                },
                crosshair: {
                    color: '#758696',
                },
                grid: {
                    vertLines: {
                        color: '#363C4E',
                    },
                    horzLines: {
                        color: '#363C4E',
                    },
                },
            },
            series: {
                    topColor: 'rgba(32, 226, 47, 0.56)',
                    bottomColor: 'rgba(32, 226, 47, 0.04)',
                    lineColor: 'rgba(32, 226, 47, 1)',
            },
        };

        let divid=document.querySelector("#Lightchart");
        const chart = createChart(divid, { height: 610 });
        candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData([]);
        chart.timeScale().fitContent();
        chart.applyOptions(darkTheme.chart);
        chart.applyOptions({
            localization: {
                locale: 'en-US',
                // dateFormat: 'yyyy/MM/dd',
            },
            priceScale: {
                position: 'right',
                mode: 1,
                autoScale: true,
                invertScale: false,
                alignLabels: true,
                borderVisible: true,
                borderColor: '#555ffd',
                scaleMargins: {
                    top: 0.30,
                    bottom: 0.25,
                },
            },
        });

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
        let decimal = data != undefined && data.token!=undefined ? data.token.decimal : '18';
        setDecimal(decimal);
        setPoolPair(data != undefined ? data.pairs : []);
        if (data != undefined && data.pairs!=undefined && data.pairs.length > 0) {
            let liquidity = 0.0;
            let symbl=data.token.symbol;
            if (data.pairs[0].token0_symbol === symbl) {
                liquidity = data.pairs[0].reserve1 * data.pairs[0].token1_price_usd * 2;
            }
            else {
                liquidity = data.pairs[0].reserve0 * data.pairs[0].token0_price_usd * 2;
            }
            let klinedata = await getRequest(APIURL + 'kline?address=', data.pairs[0].pair);
            candlestickSeries.setData(klinedata);
            setKlineData(klinedata);
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

    const changeChartByPair=async(index,liquidity)=>{
        console.log(index);
        let klinedata = await getRequest(APIURL + 'kline?address=', poolPair[index].pair);
        candlestickSeries.setData(klinedata);
        setKlineData(klinedata);
        
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
                            {/* <div className='treding_chart'>
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
                            </div> */}
                            <div id="Lightchart" style={{paddingLeft:'4px'}}>
                        
                            </div>
                            {/* <Wallet /> */}
                            <Pool symbol={symbol} poolPairs={poolPair} changeChartByPair={changeChartByPair}/>
                        </div>
                    </div>
                    
                    {/* < !--Token Trade-- > */}
                    <Trade tradeHistory={trades} symbol={symbol} />
                   
                    {/* < !--Footer-- > */}
                    {/* <Footer /> */}
                </section> : null
            }

        </>
    )
}

export default TrendingChart;
