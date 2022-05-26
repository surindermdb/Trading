import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BSCURL } from '../config';
import 'react-toastify/dist/ReactToastify.css';
import { toPlainString } from '../Action/index';
import { faStar, faCopy, faChevronCircleDown, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let supply;
let normalPrice;
let highPrice;
let lowPrice;

const TokenDetail = (props) => {

    const [showDetailSec, setShowDetailSec] = useState(false);
    let tokenInfo = props.token;
    if (tokenInfo.icon != undefined && tokenInfo.icon.default != undefined) {
        tokenInfo.icon = 'https://avesp.xyz/oss/chain/bsc.png';
    }

    // create price when more 000 after decimal
    if (tokenInfo.icon != undefined) {
        let n = parseFloat(props.supply) / 10 ** props.tokendecimal;
        if (n.toString().split('.')[0].length > 12) {
            n = n / 10 ** 12;
            n = n.toString().split('.')[0]
            supply = n + 'T';
        }
        else {
            supply = n.toLocaleString()
        }


        let price = toPlainString(tokenInfo.price.split != undefined ? tokenInfo.price.split('$')[1] : tokenInfo.price);
        // console.log(price);
        var m = -Math.floor(Math.log10(price) + 1);
        if (m > 3) {
            let newPrice = price * 10 ** m.toFixed(3);
            newPrice = "" + Number.parseFloat(newPrice).toFixed(3);
            newPrice = "0.0{" + m + "}" + newPrice.split('.')[1];
            price = newPrice;
        }
        else {
            price = price != "NaN" ? parseFloat(price).toFixed(4) : tokenInfo.price.split('$')[1];
        }
        // console.log(m);
        normalPrice = price;
        // tokenInfo.price=price;
        // props.supply
    }


    let extraDetail = props.tokenDetail;
    if (extraDetail.highestPrice_24 != undefined) {
        let highestPrice = toPlainString(extraDetail.highestPrice_24);
        // console.log(price);
        var m = -Math.floor(Math.log10(highestPrice) + 1);
        if (m > 3) {
            let newPrice = highestPrice * 10 ** m.toFixed(3);
            newPrice = "" + Number.parseFloat(newPrice).toFixed(3);
            newPrice = "0.0{" + m + "}" + newPrice.split('.')[1];
            highestPrice = newPrice;
        }
        else {
            highestPrice = highestPrice != "NaN" ? parseFloat(highestPrice).toFixed(4) : extraDetail.highestPrice_24;
        }
        highPrice = highestPrice;
    }

    if (extraDetail.lowestPrice_24 != undefined) {
        let lowestPrice = toPlainString(extraDetail.lowestPrice_24);
        // console.log(price);
        var m = -Math.floor(Math.log10(lowestPrice) + 1);
        if (m > 3) {
            let newPrice = lowestPrice * 10 ** m.toFixed(3);
            newPrice = "" + Number.parseFloat(newPrice).toFixed(3);
            newPrice = "0.0{" + m + "}" + newPrice.split('.')[1];
            lowestPrice = newPrice;
        }
        else {
            lowestPrice = lowestPrice != "NaN" ? parseFloat(lowestPrice).toFixed(4) : extraDetail.lowestPrice_24;
        }
        lowPrice = lowestPrice;
    }

    // save favorite token in list
    const saveFavorite = () => {
        var favoriteToken = localStorage.getItem("favoriteToken");
        let array = [];
        if (favoriteToken == null) {
            array.push(props.token);
            localStorage.setItem('favoriteToken', JSON.stringify(array));
        }
        else {
            favoriteToken = JSON.parse(favoriteToken);
            favoriteToken.push(props.token);
            localStorage.setItem('favoriteToken', JSON.stringify(favoriteToken));
        }
        props.refreshFavoriteToken(true);
    }

    // copy token address to clipboard
    const copyAddress = (e, address) => {
        e.preventDefault();
        if (navigator.clipboard == undefined) {
            console.log('navigator.clipboard');
            var textArea = document.createElement("textarea");
            textArea.value = address;
            textArea.textContent = address;
            textArea.style.position = "fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                toast.success('Copy to clipboard', {
                    theme: "colored"
                });
            } catch (err) {
                toast.success('Was not possible to copy te text: ', {
                    theme: "colored"
                });
            }
            document.body.removeChild(textArea)
            return;
        }
        navigator.clipboard.writeText(address);
        toast.success('Copy to clipboard', {
            theme: "colored"
        });
    }

    const detailScondSec = () => {
        // e.preventDefault();
        if (showDetailSec == true) {
            setShowDetailSec(false);
        }
        else {
            setShowDetailSec(true);
        }

    }

    return (
        <>
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover style={{ width: "350px" }} />
            {props.mobileView == false &&
                <div className="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-24 el-col-lg-24 el-col-xl-24 is-guttered" data-v-a46acd44="" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                    <div className="tokenInfo-container" data-v-3ff813d6="">
                        <div className="token-container" data-v-3ff813d6="">
                            <div className="icon-token-container" data-v-3ff813d6="">
                                <img className="token-icon" src={tokenInfo.icon === undefined ? 'https://avesp.xyz/oss/chain/bsc.png' : tokenInfo.icon.includes('https') == true ? tokenInfo.icon : tokenInfo.icon} alt="" height="25" onerror="this.src='/icon-default.png'" data-v-3ff813d6="" />
                                <img className="icon-svg icon-symbol" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-3ff813d6="" />
                            </div>
                            <div className="token-symbol" data-v-3ff813d6="">
                                <div className="token-symbol_top" data-v-3ff813d6="">
                                    <span data-v-3ff813d6="">{tokenInfo.symbol}</span>
                                    <a onClick={(e) => saveFavorite(e)} className="el-button el-button--default swap-button" type="button" data-v-3ff813d6="" style={{ textDecoration: 'none', backgroundColor: '#191e2d', color: '#558bed', marginLeft: '10px' }}>
                                        <span className="">Save Favorite</span>
                                    </a>
                                </div>
                                <div className="token-symbol_bottom" data-v-3ff813d6="">
                                    <span data-v-3ff813d6="">Address： <a href={tokenInfo.address === undefined ? '00' : BSCURL + "/token/" + tokenInfo.address} target="_blank" data-v-3ff813d6="">{tokenInfo.address === undefined ? '00' : tokenInfo.address.substr(0, 7)}</a></span>
                                    <i className="iconfont" data-v-3ff813d6="" style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={(e) => copyAddress(e, tokenInfo.address === undefined ? '00' : tokenInfo.address)}>
                                        <img src={require('../assets/images/copy.png').default} width='15px'></img>
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="price-container" data-v-3ff813d6="">
                            <div className="price" data-v-3ff813d6="">${tokenInfo.price === undefined ? '0.0' : normalPrice}</div>
                            <div className="price-bottom" data-v-3ff813d6="" style={{ color: tokenInfo.change !== undefined ? (tokenInfo.change.split('%')[0] < 0 ? 'red' : 'rgb(70, 215, 171)') : 'red' }}>{tokenInfo.change !== undefined ? (tokenInfo.change.split('%')[0]) : '0.0'}%</div>
                        </div><div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">Holders</div>
                            <div data-v-3ff813d6="">{tokenInfo.holder}</div>
                        </div>
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">Total Supply</div>
                            <div data-v-3ff813d6="">{supply}</div>
                        </div>
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">24h Volume</div>
                            <div data-v-3ff813d6="">{extraDetail != undefined && extraDetail.amount_24 !== undefined ? extraDetail.amount_24.toLocaleString() : '0'}</div>
                        </div>
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">24h Amount</div>
                            <div data-v-3ff813d6="">${extraDetail != undefined && Math.round(extraDetail.volume_24).toLocaleString()}</div>
                        </div>
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">Liquidity</div>
                            <div data-v-3ff813d6="">${Math.round(props.liquidity).toLocaleString()}</div>
                        </div>
                        <div className="table-item" data-v-3ff813d6="">
                            <div className="swap-container" data-v-3ff813d6="">
                                <a href={tokenInfo.address !== undefined ? "https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=" + tokenInfo.address : ''} target="_blank" className="el-button el-button--primary el-button--default swap-button" type="button" data-v-3ff813d6="" >
                                    <span className="">Swap</span>
                                </a>
                                <a href="/check" className="el-button el-button--primary el-button--default swap-button" type="button" data-v-3ff813d6="" >
                                    <span className="">Check</span>
                                </a>
                            </div>
                        </div>

                        <div className="el-overlay" style={{ zIndex: '3005', display: 'none' }}>
                            <div className="el-overlay-dialog">
                                <div className="el-dialog" aria-modal="true" role="dialog" aria-label="Favorite to" >
                                    <div className="el-dialog__header">
                                        <span className="el-dialog__title">Favorite to</span>
                                        <button aria-label="close" className="el-dialog__headerbtn" type="button">
                                            <i className="el-icon el-dialog__close">
                                                <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z">
                                                    </path>
                                                </svg>
                                            </i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }



            {props.mobileView == true &&
                <>
                    <div className="info" data-v-4511810d="">
                        <div className="info-left" data-v-4511810d="">
                            <div className="info_top" data-v-4511810d="">
                                <i className="iconfont" data-v-4511810d="" onClick={(e) => saveFavorite(e)}>
                                    <FontAwesomeIcon icon={faStar} />
                                </i>

                                <span className="white font-20 mr-5" data-v-4511810d="">${tokenInfo.price === undefined ? '0.0' : normalPrice}</span>
                                <span data-v-4511810d="" style={{ color: tokenInfo.change !== undefined ? (tokenInfo.change.split('%')[0] < 0 ? 'red' : 'rgb(70, 215, 171)') : 'red' }}>{tokenInfo.change !== undefined ? (tokenInfo.change.split('%')[0]) : '0.0'}%</span>
                            </div>
                            <div data-v-4511810d="" style={{ flex: '1 1 0%' }}></div>
                            <div className="info-address" data-v-4511810d="">
                                <span className="span_gray" data-v-4511810d="">
                                    <a href={tokenInfo.address === undefined ? '00' : BSCURL + "/token/" + tokenInfo.address} target="_blank" data-v-4511810d="">{tokenInfo.address === undefined ? '00' : tokenInfo.address.substr(0, 7)}</a>
                                </span>
                                <i className="iconfont iconcopy" data-v-4511810d="" onClick={(e) => copyAddress(e, tokenInfo.address === undefined ? '00' : tokenInfo.address)}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </i>
                            </div>
                        </div>
                        <div className="info-table" data-v-4511810d="">
                            <div className="table-container" data-v-4511810d="">
                                <table className="table-box" data-v-4511810d="">
                                    <tr data-v-4511810d="">
                                        <td className="table-label" data-v-4511810d="">24h Volume</td>
                                        <td className="white" data-v-4511810d="">${extraDetail != undefined && Math.round(extraDetail.volume_24).toLocaleString()}</td>
                                    </tr>
                                    <tr data-v-4511810d="">
                                        <td className="table-label" data-v-4511810d="">Liquidity</td>
                                        <td className="white" data-v-4511810d="">${Math.round(props.liquidity).toLocaleString()}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="divider-line" data-v-4511810d=""></div>
                            <div className="table-container" data-v-4511810d="">
                                <table className="table-box" data-v-4511810d="">
                                    <tr data-v-4511810d="">
                                        <td className="table-label" data-v-4511810d="">Holders</td>
                                        <td className="white" data-v-4511810d="">{tokenInfo.holder}</td>
                                    </tr>
                                    <tr data-v-4511810d="">
                                        <td className="table-label" data-v-4511810d="">24h Amount</td>
                                        <td className="white" data-v-4511810d="">${extraDetail != undefined && extraDetail.amount_24 !== undefined ? extraDetail.amount_24.toLocaleString() : '0'}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="collapse-box" data-v-4511810d="" style={{ visibility: showDetailSec == true ? 'hidden' : 'visible' }}>
                            <i className="iconfont up" data-v-4511810d="" onClick={(e) => detailScondSec(e)}>
                                <FontAwesomeIcon icon={faChevronCircleDown} />
                            </i>
                        </div>
                    </div>

                    <div id="tokenInfoPop">
                        <div className="van-dropdown-item van-dropdown-item--down" style={{ top: '162.594px', display: showDetailSec == true ? 'block' : 'none' }}>
                            <div className="van-overlay" style={{ zIndex: '2001', position: 'absolute', animationDuration: '0.2s' }}></div>
                            <div className="van-popup van-popup--top van-dropdown-item__content" role="menu" aria-labelledby="van-dropdown-menu-1-0" style={{ zIndex: '2001', transitionDuration: '0.2s' }}>
                                <div className="info dropdown" data-v-4511810d="">
                                    <div className="info-table" data-v-4511810d="">
                                        <div className="table-container" data-v-4511810d="">
                                            <table className="table-box" data-v-4511810d="">
                                                <tr data-v-4511810d="">
                                                    <td className="table-label" data-v-4511810d="">24h High</td>
                                                    <td className="white" data-v-4511810d="">${highPrice != undefined ? highPrice : '00'}</td>
                                                </tr>
                                                <tr data-v-4511810d="">
                                                    <td className="table-label" data-v-4511810d="">24h Low</td>
                                                    <td className="white" data-v-4511810d="">${lowPrice != undefined ? lowPrice : '00'}</td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className="divider-line" data-v-4511810d=""></div>
                                        <div className="table-container" data-v-4511810d="">
                                            <table className="table-box" data-v-4511810d="">
                                                <tr data-v-4511810d="">
                                                    <td className="table-label" data-v-4511810d="">24h Txs</td>
                                                    <td className="white" data-v-4511810d="">{extraDetail.exchangeTime_24}</td>
                                                </tr>

                                                <tr data-v-4511810d="">
                                                    <td className="table-label" data-v-4511810d="">Total Supply</td>
                                                    <td className="white" data-v-4511810d="">{supply}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="collapse-box" data-v-4511810d="">
                                        <i className="iconfont up" data-v-4511810d="" onClick={(e) => detailScondSec(e)}>
                                            <FontAwesomeIcon icon={faChevronCircleUp} />
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default TokenDetail;