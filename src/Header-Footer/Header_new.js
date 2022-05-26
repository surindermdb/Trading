import { useState, useEffect } from "react";
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { APIURL, BSCURL, HOST } from '../config';
import { postRequest, getRequest } from "../Action";
import { faWallet} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let iframe;
const HeaderNew = (props) => {

    const [searchPopup, setSearchPopup] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [searchBtnView, setSearchBtnView] = useState(false);
    const [currentPath, setCurrentPath] = useState('market');
    const [searchByTxt, setSearchByTxt] = useState(true);
    const [walletAddress,setWalletAddress]=useState('');

    const handleSearchPopup = () => {
        setSearchPopup(true);
    }
    useEffect(() => {
        if (window.screen.width < 768) {
            setSearchBtnView(true);
        }
        window.addEventListener('resize', function (event) {
            if (window.screen.width < 768) {
                setSearchBtnView(true);
            }
            else {
                setSearchBtnView(false);
            }
        }, true);

        let path = window.location.pathname.split('/')[1];

        setCurrentPath(path);
        connectToWallet();
        // iframe = document.getElementsByTagName('iframe');
    })

    const connectToWallet = async () => {

        if (window.web3) {
          let newWeb3 = new Web3(window.web3.currentProvider);
          window.ethereum.enable();
          const accounts = await newWeb3.eth.getAccounts();
          if(accounts.length>0){
            setWalletAddress(accounts[0]);
          }
          return true;
        }
    }

    // get searching record
    const getRecord = async () => {
        let searchTxt = document.querySelector("#txtToken");
        if (searchTxt.value.length > 1) {
            let data;
            if (searchTxt.value.includes('0x') == true) {
                setSearchByTxt(false);
                data = await getRequest(APIURL + 'searchtoken?address=', searchTxt.value);
                let token = {
                    address: data.token,
                    price: data.current_price_usd.toFixed(4),
                    symbol: data.symbol
                }
                let array = [];
                array.push(token);
                setAddressList(array);
            }
            else {
                setSearchByTxt(true);
                data = await postRequest(APIURL + 'search/term=', searchTxt.value);
                if (data.data == 'record not found') {
                    setAddressList([]);
                }
                else {
                    setAddressList(data);
                }
            }
        }
    }

    // on select token from searching list
    const onChangeAddress = async (e, item, symbol) => {
        e.preventDefault();
        let data = await getRequest(APIURL + 'searchtoken?address=', item.address);
        let token = {
            address: item.address,
            icon: item.icon !== undefined ? BSCURL + "/token/images/" + item.icon : require('../assets/images/icon-default.png').default,
            price: data.current_price_usd,
            holder: data.holders,
            marketCap: "0.0",
            volume: "0.0",
            change: data.price_change.toString(),
            symbol: symbol
        }
        props.changeMapWithSymbol(token, symbol);
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);

    }

    const walletConnect = () => {
        connectToWallet();
    }


    return (
        <>

            <div className="head" data-v-04096ca8="" data-v-2026486a="">
                <div className="content" data-v-04096ca8="">
                    <div className="header-left" data-v-04096ca8="">
                        <a aria-current="page" href="/token/0x2963dcc52549573bbfbe355674724528532c0867-bsc" className="router-link-active router-link-exact-active logo" data-v-04096ca8="">
                            <img className="media_pc" src="/static/img/ave-logo.b550af60.svg" height="40" width="40px" alt="" data-v-04096ca8="" />
                            <img className="media_mobile" src={require("../assets/images/poocoin-logo.png").default} alt="" data-v-04096ca8="" />
                        </a>
                        {searchBtnView == false &&
                            <div className="nav-list" data-v-04096ca8="">
                                <a aria-current="page" href="/token/0x2963dcc52549573bbfbe355674724528532c0867-bsc" className={currentPath == 'market' || currentPath == 'token' ? "router-link-active router-link-exact-active nav-item active" : "router-link-active router-link-exact-active nav-item"} data-v-04096ca8="">Markets</a>
                                <a href="/pool" className={currentPath == 'pool' ? "nav-item active" : "nav-item"} data-v-04096ca8="">New Pool</a>
                                <a href="/check" className={currentPath == 'check' ? "nav-item active" : "nav-item"} data-v-04096ca8="">Check</a>
                            </div>
                        }
                    </div>
                    {/* {searchBtnView == true && */}
                        <div className="search-btn-container" data-v-04096ca8="" >
                            <div className="d_search_btn_tmb search-btn-container_content" id="searcht" data-v-04096ca8="" onClick={handleSearchPopup} >Enter address/token</div>
                            <i className="el-icon" data-v-04096ca8="">
                                <svg id="btnsrch" className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-04096ca8="">
                                    <path fill="currentColor" d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704z"></path>
                                </svg>
                            </i>
                        </div>
                    {/* } */}

                    <div id="dialogcontainer" className="dialog-container" data-v-04096ca8="" style={{ display: searchPopup === true ? 'block' : 'none' }}>
                        <div className="search-dialog-container" data-v-04096ca8="">
                            <div className="el-input el-input--large el-input--prefix el-input--suffix input-search" data-v-04096ca8="">
                                <input className="el-input__inner" id="txtToken" modelmodifiers="[object Object]" type="text" autoComplete="off" placeholder="Search Market, use ticker or token address" onKeyUp={getRecord} />
                                <span className="el-input__prefix">
                                    <span className="el-input__prefix-inner">
                                        <i className="el-icon" data-v-04096ca8="">
                                            <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-04096ca8="">
                                                <path fill="currentColor" d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704z"></path>
                                            </svg>
                                        </i>
                                    </span>
                                </span>
                            </div>
                            <div className="header-title" data-v-04096ca8="">Popular Searches</div>
                            <div className="search-content" data-v-04096ca8="">
                                <div className="histrory tokensearch" data-v-0acb6bd5="" data-v-04096ca8="">
                                    <div className="top" data-v-0acb6bd5="">
                                        <span data-v-0acb6bd5="">Name</span>
                                        <span data-v-0acb6bd5="">Price</span>
                                    </div>
                                    {addressList.length > 0 &&
                                        < div className="el-scrollbar" data-v-0acb6bd5="">
                                            <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default searchscroll">
                                                <div className="el-scrollbar__view" style={{}}>
                                                    <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-0acb6bd5="" style={{ display: 'none' }}>
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
                                                    <ul className="content" data-v-0acb6bd5="">
                                                        {addressList.length > 0 &&
                                                            addressList.map((item, index) => {
                                                                let imageUrl = '';
                                                                let symbol = '';
                                                                if (searchByTxt == true) {
                                                                    imageUrl = BSCURL + "/token/images/" + item.icon;
                                                                    if (item.icon != undefined && item.icon.includes('https') === true) {
                                                                        imageUrl = item.icon;
                                                                    }
                                                                    symbol = item.name.split('(')[1] == undefined ? '' : item.name.split('(')[1].split(')')[0];
                                                                    if (symbol == '') {
                                                                        symbol = item.name.split(':')[1] == undefined ? '' : item.name.split(':')[0];
                                                                    }
                                                                    if (symbol == '') {
                                                                        symbol = item.name;
                                                                    }
                                                                }
                                                                else {
                                                                    symbol = item.symbol;
                                                                    imageUrl = require('../assets/images/icon-default.png').default; //'https://avesp.xyz/oss/chain/bsc.png';
                                                                }

                                                                return <li data-v-0acb6bd5="" onClick={(e) => onChangeAddress(e, item, symbol)}>
                                                                    <a href="" className="flex" data-v-0acb6bd5="">
                                                                        <div className="token-info" data-v-0acb6bd5="">
                                                                            <div className="icon-token-container" data-v-0acb6bd5="">
                                                                                <img className="token-icon" src={imageUrl} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-0acb6bd5="" />
                                                                                <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-0acb6bd5="" />
                                                                            </div>
                                                                            <span className="token-symbol" data-v-0acb6bd5="">{symbol} ({item.address})</span>
                                                                        </div>
                                                                        <div data-v-0acb6bd5=""> {item.price}
                                                                            {/* <span data-v-0acb6bd5="" style={{ color: 'rgb(70, 215, 171)' }}>+100.73%</span> */}
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            })

                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                                <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}>
                                                </div>
                                            </div>
                                            <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                                <div className="el-scrollbar__thumb" style={{ transform: 'translateY(0%)' }}></div>
                                            </div>
                                        </div>
                                    }

                                    {addressList.length == 0 &&
                                        <div className="empty" data-v-0acb6bd5="">
                                            <div data-v-0acb6bd5="" style={{ display: 'grid' }}>
                                                <img src={require("../assets/images/empty-black.svg").default} data-v-0acb6bd5="" />
                                                <span data-v-0acb6bd5="">No search results</span>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <ul data-v-04096ca8="">
                        
                        {/* {searchBtnView == true &&

                            <li>
                                <div id="mtxtToken" className="m_search_btn_container_tmb search-btn-container" onClick={handleSearchPopup} data-v-04096ca8="">
                                    <i id="micomToken" className="el-icon" data-v-04096ca8="" onClick={handleSearchPopup}>
                                        <svg id="mbtnsrch" className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-04096ca8="">
                                            <path fill="currentColor" d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704z"></path>
                                        </svg>
                                    </i>
                                </div>
                            </li>
                        } */}

                        <div className="el-dropdown" data-v-0c57b22e="" data-v-04096ca8="">
                            <div className="el-dropdown--default el-tooltip__trigger el-tooltip__trigger">
                                <span className="d_el-dropdown-link el-dropdown-link" data-v-0c57b22e="">English <i className="el-icon el-icon--right" data-v-0c57b22e="">
                                    <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-0c57b22e="">
                                        <path fill="currentColor" d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 00-42.752 0 29.12 29.12 0 000 41.6L489.664 714.24a32 32 0 0044.672 0l340.288-331.712a29.12 29.12 0 000-41.728 30.592 30.592 0 00-42.752 0z"></path>
                                    </svg>
                                </i>
                                </span>
                                <span className="m_el-dropdown-link el-dropdown-link" data-v-0c57b22e="">
                                    <i className="el-icon el-icon--right" data-v-0c57b22e="">
                                        <img src={require("../assets/icons/language-icon.svg").default} />
                                    </i>
                                </span>
                            </div>
                        </div>

                        {walletAddress!=='' && <li className="li-item" data-v-04096ca8="">
                            <button className="d_connect_tmb el-button el-button--default aex-button-primary-null" type="button" data-v-04096ca8="">
                                <span className="">{walletAddress}</span>
                            </button>
                        </li>}
                        {walletAddress ==='' && <li className="li-item" data-v-04096ca8="" onClick={walletConnect}>
                            <i className="wallet_mobile iconfont" data-v-04096ca8="">
                            <FontAwesomeIcon icon={faWallet} />
                            </i>
                            <button className="d_connect_tmb el-button el-button--default aex-button-primary-null" type="button" data-v-04096ca8="">
                                <span className="">Connect</span>
                            </button>
                        </li>}
                        {/* <li className="li-item" data-v-04096ca8="" onClick={walletConnect}>
                            <i className="wallet_mobile iconfont icon-wallet" data-v-04096ca8=""></i>
                            <button className="d_connect_tmb el-button el-button--default aex-button-primary-null" type="button" data-v-04096ca8="">
                                <span className="">Connect</span>
                            </button>
                        </li> */}

                    </ul>
                    <div className="el-overlay" style={{ zIndex: '3003', display: 'none' }}>
                        <div className="el-overlay-dialog">
                            <div className="el-dialog dialog-box dialog-max" aria-modal="true" role="dialog" aria-label="Connect" >
                                <div className="el-dialog__header">
                                    <h3 className="connect-popup-title tab-container" data-v-b8664464="">
                                        <div className="tab-button" data-v-b8664464="">
                                            <input type="radio" id="tab-item-connect" className="tab-radio-input" value="1" data-v-b8664464="" />
                                            <label for="tab-item-connect" className="tab-item" data-v-b8664464="">Connect</label>
                                            <input type="radio" id="tab-item-import" className="tab-radio-input" value="2" data-v-b8664464="" />
                                            <label for="tab-item-import" className="tab-item" data-v-b8664464="">Import address</label>
                                        </div>
                                    </h3><button aria-label="close" className="el-dialog__headerbtn" type="button" >
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
                    <div className="el-overlay" style={{ zIndex: '3004', display: 'none' }}>
                        <div className="el-overlay-dialog">
                            <div className="el-dialog dialog-box dialog-max" aria-modal="true" role="dialog" aria-label="Wrong Network" >
                                <div className="el-dialog__header">
                                    <span className="el-dialog__title">Wrong Network</span>
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

export default HeaderNew;