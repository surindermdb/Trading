import { useEffect, useState } from "react";
import { APIURL, BSCURL, HOST } from '../config';
import { getRequest,toPlainString } from "../Action";
const TopToken = (props) => {

    // let favToken=props.refreshToken;

    const [currentTab, setCurrentTab] = useState('favorate');
    const [hotToken, setHotToken] = useState([]);
    const [gainerToken, setGainerToken] = useState([]);
    const [recentToken, setRecentToken] = useState([]);
    const [favoriteToken, setFavoriteToken] = useState([]);

    useEffect(() => {
        const getHotToken = async () => {
            let data = await getRequest(APIURL + 'gainer/', '');
            // console.log(data);
            let gainerData = data.filter((item) => {
                return parseFloat(item.Change.trim()) > 0
            });
            const sorter1 = (a, b) => { return parseFloat(a.Change.trim()) > parseFloat(b.Change.trim() ? 1 : -1) };
            gainerData.sort(sorter1);
            setGainerToken(gainerData);
            setHotToken(data);
            var info = localStorage.getItem("tokenInfo");
            info = JSON.parse(info);
            if(info.symbol == 'ETH' || info.symbol == undefined || info.symbol == ''){
                setDefaultToken(data[0]);
            }
            
        }
        const getRecentToken = async () => {
            let data = await getRequest(APIURL + 'recent/', '');
            // console.log(data);
            setRecentToken(data);
        }

        getHotToken();
        getRecentToken();
        getFavoriteToken();

    }, []);

    // on change tab 
    const showTokenListByTab = (e, tab) => {
        e.preventDefault();
        getFavoriteToken();
        setCurrentTab(tab);
    }

    // get favorite token from local storage
    const getFavoriteToken = () => {
        var token = localStorage.getItem("favoriteToken");
        token = JSON.parse(token);
        if (token === null) {
            token = [];
        }
        // favToken=token
        setFavoriteToken(token);
    }

    if (favoriteToken !== props.refreshToken) {
        if (props.refreshToken.length > 0) {
            setFavoriteToken(props.refreshToken);
        }

    }

    // store any selected token in local storage
    const stroeTokenData = (e, item) => {
        e.preventDefault();
        let price = item.Price.split('BTC')[0].split('.');
        price = price[0] + '.' + price[1];
        let token = {
            address: item.address,
            icon: BSCURL + item.tokenDetails.src,
            price: price,
            holder: item.Holders,
            marketCap: item.MarketCap,
            volume: item.Volume,
            change: item.Change.toString(),
            symbol: item.tokenDetails.tokenSymbol,
            // supply:supply
        }
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);
        props.changeHotAddress(token);
    }

    const setDefaultToken=(item)=>{
        let price = item.Price.split('BTC')[0].split('.');
        price = price[0] + '.' + price[1];
        let token = {
            address: item.address,
            icon: BSCURL + item.tokenDetails.src,
            price: price,
            holder: item.Holders,
            marketCap: item.MarketCap,
            volume: item.Volume,
            change: item.Change.toString(),
            symbol: item.tokenDetails.tokenSymbol,
            // supply:supply
        }
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);
        props.changeHotAddress(token);
    }

    // store recent selected token in local storage
    const stroeNewToken = (e, item) => {
        e.preventDefault();
        let token = {
            address: item.token,
            icon: require('../assets/images/icon-default.png'),
            price: item.current_price_usd,
            holder: item.holders,
            marketCap: '0.0',
            volume: '0.0',
            change: item.price_change !== undefined ? item.price_change.toString() : '0.0',
            symbol: item.symbol,
            // supply:supply
        }
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);
        props.changeHotAddress(token);
    }

    const stroeFavoriteTokenData = (e, token) => {
        e.preventDefault();
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);
        props.changeHotAddress(token);
    }

    return (
        <>
            <div className="total_supply">
                <div className="el-col el-col-24 el-col-xs-6 el-col-sm-6 el-col-md-5 el-col-lg-6 el-col-xl-4 is-guttered top_token_tmb" data-v-a46acd44="" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                    <div className="trading" data-v-590ed78a="">
                        <div className="header" data-v-590ed78a="">
                            <a href="" className={currentTab == 'favorate' ? 'active' : ''} data-v-590ed78a="" onClick={(e) => showTokenListByTab(e, 'favorate')}>Favorites</a>
                            <a href="" className={currentTab == 'hot' ? 'active' : ''} data-v-590ed78a="" onClick={(e) => showTokenListByTab(e, 'hot')}>Hots</a>
                            <a href="" className={currentTab == 'gainer' ? 'active' : ''} data-v-590ed78a="" onClick={(e) => showTokenListByTab(e, 'gainer')}>Gainers</a>
                            <a href="" className={currentTab == 'new' ? 'active' : ''} data-v-590ed78a="" onClick={(e) => showTokenListByTab(e, 'new')}>New</a>
                        </div>
                        <div className="tabs" data-v-590ed78a="">
                            <div className="van-tabs van-tabs--line fav-tabs" data-v-590ed78a="">
                                <div className="van-tabs__wrap">
                                    <div role="tablist" className="van-tabs__nav van-tabs__nav--line van-tabs__nav--shrink van-tabs__nav--complete" aria-orientation="horizontal" style={{ borderColor: 'rgb(85, 139, 237)', background: 'transparent' }}>
                                        <div id="van-tabs-1-0" role="tab" className="van-tab van-tab--line van-tab--shrink van-tab--active" tabindex="0" aria-selected="true" style={{ color: 'rgb(255, 255, 255)' }}>
                                            <span className="van-tab__text">Default</span>
                                        </div>
                                        <div className="van-tabs__line" style={{ backgroundColor: 'rgb(85, 139, 237)', transform: 'translateX(37.5px), translateX(-50%)', height: '0px', borderRadius: '0px' }}></div>
                                    </div></div>
                                <div className="van-tabs__content"></div>
                            </div>
                            {/* <i className="icon-edit" data-v-590ed78a=""></i> */}
                        </div>
                        <div className="history" data-v-590ed78a="">
                            <div className="top" data-v-590ed78a="">
                                <span data-v-590ed78a="">Token</span>
                                <div className="table-item_d" data-v-590ed78a="">
                                    <span data-v-590ed78a="">Last Price($)</span>
                                </div>
                                <div className="table-item_d" data-v-590ed78a="">
                                    <span data-v-590ed78a="">Change</span>
                                </div>
                            </div>
                            <div style={{ display: currentTab == 'favorate' ? 'block' : 'none' }} className="el-scrollbar" data-v-590ed78a="">
                                {favoriteToken.length > 0 &&
                                    <>
                                        <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default tokenData">
                                            <div className="el-scrollbar__view" style={{}}>
                                                <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-590ed78a="" style={{ display: 'none' }}>
                                                    <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}>
                                                    </div>
                                                    <div className="vld-icon">
                                                        <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                                            <circle cx="15" cy="15" r="15">
                                                                <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                            </circle>
                                                            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                                <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
                                                                <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                                            </circle>
                                                            <circle cx="105" cy="15" r="15">
                                                                <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                            </circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <ul className="content" data-v-590ed78a="">
                                                    {favoriteToken.length > 0 &&
                                                        favoriteToken.map((item) => {
                                                            // price($) converter
                                                            let pricelist = item.price;
                                                            let price = toPlainString(pricelist.split != undefined ? pricelist.split('$')[1] : pricelist);
                                                            // console.log(price);
                                                            var m = -Math.floor(Math.log10(price) + 1);
                                                            if (m > 3) {
                                                                let newPrice = price * 10 ** m.toFixed(3);
                                                                newPrice = "" + Number.parseFloat(newPrice).toFixed(3);
                                                                newPrice = "0.0{" + m + "}" + newPrice.split('.')[1];
                                                                price = newPrice;
                                                            }
                                                            else{
                                                                price=parseFloat(price).toFixed(4);
                                                            }
                                                            let normalPrice = price;
                                                            return <a href={"/token/" + item.address} className="flex animation-bg up" data-v-590ed78a="" onClick={(e) => stroeFavoriteTokenData(e, item)}>
                                                                <div className="token-info" data-v-590ed78a=""><div className="icon-token-container" data-v-590ed78a="">
                                                                    <img className="token-icon" src={item.icon} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-590ed78a="" />
                                                                    <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-590ed78a="" />
                                                                </div>
                                                                    <div className="token-symbol" data-v-590ed78a=""><span data-v-590ed78a="">{item.symbol}</span>
                                                                    </div>
                                                                </div>
                                                                <span data-v-590ed78a="">${normalPrice}</span>
                                                                <div data-v-590ed78a="">
                                                                    <span data-v-590ed78a="" style={{ color: parseFloat(item.change.trim()) > 0 ? 'rgb(70, 215, 171)' : 'red' }}>{item.change}</span>
                                                                </div>
                                                            </a>
                                                        })
                                                    }


                                                </ul>
                                            </div>
                                        </div>
                                        <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                            <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                                        </div>
                                        <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                            <div className="el-scrollbar__thumb" style={{ height: '177.629px', transform: 'translateY(0%)' }}></div>
                                        </div>
                                    </>
                                }
                                {favoriteToken.length > 0 && favoriteToken === null &&
                                    <div className="empty tokenData" data-v-590ed78a="">
                                        <div data-v-590ed78a="" style={{ display: 'grid' }}>
                                            <img src={require("../assets/images/empty-black.svg").default} data-v-590ed78a="" />
                                            <span data-v-590ed78a="">No Data</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div style={{ display: currentTab == 'hot' ? 'block' : 'none' }} className="el-scrollbar" data-v-590ed78a="">
                                <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default tokenData" >
                                    <div className="el-scrollbar__view" style={{}}>
                                        <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-590ed78a="" style={{ display: 'none' }}>
                                            <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}>
                                            </div>
                                            <div className="vld-icon">
                                                <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                                    <circle cx="15" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="105" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className="content" data-v-590ed78a="">
                                            {hotToken.length > 0 &&
                                                hotToken.map((item) => {
                                                    let price = item.Price.split('BTC')[0].split('.');
                                                    price = price[0] + '.' + price[1];
                                                    return <a href={"/token/" + item.address} className="flex animation-bg up" data-v-590ed78a="" onClick={(e) => stroeTokenData(e, item)}>
                                                        <div className="token-info" data-v-590ed78a=""><div className="icon-token-container" data-v-590ed78a="">
                                                            <img className="token-icon" src={BSCURL + item.tokenDetails.src} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-590ed78a="" />
                                                            <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-590ed78a="" />
                                                        </div>
                                                            <div className="token-symbol" data-v-590ed78a=""><span data-v-590ed78a="">{item.tokenDetails.tokenSymbol}</span>
                                                            </div>
                                                        </div>
                                                        <span data-v-590ed78a="">{price}</span>
                                                        <div data-v-590ed78a="">
                                                            <span data-v-590ed78a="" style={{ color: parseFloat(item.Change.trim()) > 0 ? 'rgb(70, 215, 171)' : 'red' }}>{item.Change}</span>
                                                        </div>
                                                    </a>
                                                })
                                            }


                                        </ul>
                                    </div>
                                </div>
                                <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                                </div>
                                <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ height: '177.629px', transform: 'translateY(0%)' }}></div>
                                </div>
                            </div>
                            <div style={{ display: currentTab == 'gainer' ? 'block' : 'none' }} className="el-scrollbar" data-v-590ed78a="">
                                <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default tokenData" >
                                    <div className="el-scrollbar__view" style={{}}>
                                        <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-590ed78a="" style={{ display: 'none' }}>
                                            <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}>
                                            </div>
                                            <div className="vld-icon">
                                                <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                                    <circle cx="15" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="105" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className="content" data-v-590ed78a="">
                                            {gainerToken.length > 0 &&
                                                gainerToken.map((item) => {
                                                    let price = item.Price.split('BTC')[0].split('.');
                                                    price = price[0] + '.' + price[1];
                                                    return <a href={"/token/" + item.address} className="flex animation-bg up" data-v-590ed78a="" onClick={(e) => stroeTokenData(e, item)}>
                                                        <div className="token-info" data-v-590ed78a=""><div className="icon-token-container" data-v-590ed78a="">
                                                            <img className="token-icon" src={BSCURL + item.tokenDetails.src} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-590ed78a="" />
                                                            <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-590ed78a="" />
                                                        </div>
                                                            <div className="token-symbol" data-v-590ed78a=""><span data-v-590ed78a="">{item.tokenDetails.tokenSymbol}</span>
                                                            </div>
                                                        </div>
                                                        <span data-v-590ed78a="">{price}</span>
                                                        <div data-v-590ed78a="">
                                                            <span data-v-590ed78a="" style={{ color: 'rgb(70, 215, 171)' }}>{item.Change}</span>
                                                        </div>
                                                    </a>
                                                })
                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                                </div>
                                <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ height: '177.629px', transform: 'translateY(0%)' }}></div>
                                </div>
                            </div>
                            <div style={{ display: currentTab == 'new' ? 'block' : 'none' }} className="el-scrollbar" data-v-590ed78a="">
                                <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default tokenData" >
                                    <div className="el-scrollbar__view" style={{}}>
                                        <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-590ed78a="" style={{ display: 'none' }}>
                                            <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}>
                                            </div>
                                            <div className="vld-icon">
                                                <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                                    <circle cx="15" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="105" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className="content" data-v-590ed78a="">
                                            {recentToken.length > 0 &&
                                                recentToken.map((item) => {
                                                    // let symbol=item.Name.split(item.serNO)[1];
                                                    // let name=item.Name.split(item.serNO)[0];
                                                    if(item.current_price_usd!=undefined){
                                                        return <a href={"/token/" + item.token} className="flex animation-bg up" data-v-590ed78a="" onClick={(e) => stroeNewToken(e, item)}>
                                                        <div className="token-info" data-v-590ed78a=""><div className="icon-token-container" data-v-590ed78a="">
                                                            <img className="token-icon" src={require('../assets/images/icon-default.png').default} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-590ed78a="" />
                                                            <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-590ed78a="" />
                                                        </div>
                                                            <div className="token-symbol" data-v-590ed78a=""><span data-v-590ed78a="">{item.symbol}</span>
                                                            </div>
                                                        </div>
                                                        <span data-v-590ed78a="">{item.current_price_usd.toFixed(2)}</span>
                                                        <div data-v-590ed78a="">
                                                            <span data-v-590ed78a="" style={{ color: 'rgb(70, 215, 171)' }}>{item.price_change}</span>
                                                        </div>
                                                    </a>
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                                </div>
                                <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                    <div className="el-scrollbar__thumb" style={{ height: '177.629px', transform: 'translateY(0%)' }}></div>
                                </div>
                            </div>
                            {/* <div className="empty" data-v-590ed78a="" style={{ height: '468px' }}>
                                <div data-v-590ed78a="" style={{ display: 'grid' }}>
                                    <img src={require("../assets/images/empty-black.svg").default} data-v-590ed78a="" />
                                    <span data-v-590ed78a="">No Data</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="el-overlay" style={{ zIndex: '3006', display: 'none' }}>
                        <div className="el-overlay-dialog">
                            <div className="el-dialog" aria-modal="true" role="dialog" aria-label="Favorite Manage" >
                                <div className="el-dialog__header">
                                    <div data-v-645d49b6="" style={{ padding: '0px 15px', fontSize: '20px', color: 'rgb(48, 49, 51)' }}>Favorite Manage</div>
                                    <button aria-label="close" className="el-dialog__headerbtn" type="button">
                                        <i className="el-icon el-dialog__close">
                                            <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"></path>
                                            </svg>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default TopToken;