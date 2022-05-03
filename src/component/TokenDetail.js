import { ToastContainer, toast } from 'react-toastify';
import { BSCURL } from '../config';
import 'react-toastify/dist/ReactToastify.css';
import {toPlainString} from '../Action/index';
let supply;
let normalPrice;

const TokenDetail = (props) => {

    let tokenInfo = props.token;
    if(tokenInfo.icon!=undefined && tokenInfo.icon.default!=undefined){
        tokenInfo.icon = 'https://avesp.xyz/oss/chain/bsc.png';
    }

    // create price when more 000 after decimal
    if(tokenInfo.icon!=undefined){
        let n = parseFloat(props.supply) / 10 ** props.tokendecimal;
        supply=n.toLocaleString()
        let price =toPlainString(tokenInfo.price.split!=undefined?tokenInfo.price.split('$')[1]:tokenInfo.price);
        // console.log(price);
        var m = -Math.floor( Math.log10(price) + 1);
        if(m>3){
            let newPrice = price*10**m.toFixed(3);
            newPrice=""+Number.parseFloat(newPrice).toFixed(3);
            newPrice="0.0{"+m+"}"+newPrice.split('.')[1];
            price=newPrice;
        }
        else{
            price=price!="NaN"?parseFloat(price).toFixed(4):tokenInfo.price.split('$')[1];
        }
        // console.log(m);
        normalPrice=price;
        // tokenInfo.price=price;
        // props.supply
    }
    
    
    let extraDetail=props.tokenDetail;

    // save favorite token in list
    const saveFavorite=()=>{
        var favoriteToken = localStorage.getItem("favoriteToken");
        let array=[];
        if(favoriteToken==null){
            array.push(props.token);
            localStorage.setItem('favoriteToken',JSON.stringify(array));
        }
        else{
            favoriteToken=JSON.parse(favoriteToken);
            favoriteToken.push(props.token);
            localStorage.setItem('favoriteToken',JSON.stringify(favoriteToken));
        }
        props.refreshFavoriteToken(true);
    }

    // copy token address to clipboard
    const copyAddress=(e,address)=>{
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
                                {/* <i className="iconfont icon-collect" data-v-3ff813d6=""></i> */}
                                <a onClick={(e)=>saveFavorite(e)} className="el-button el-button--default swap-button" type="button" data-v-3ff813d6="" style={{textDecoration:'none',backgroundColor:'#191e2d', color:'#558bed', marginLeft:'10px'}}>
                                    <span className="">Save Favorite</span>
                                </a>
                            </div>
                            <div className="token-symbol_bottom" data-v-3ff813d6="">
                                <span data-v-3ff813d6="">Address： <a href={tokenInfo.address === undefined ? '00' : BSCURL + "/token/" + tokenInfo.address} target="_blank" data-v-3ff813d6="">{tokenInfo.address === undefined ? '00' : tokenInfo.address.substr(0, 7)}</a></span>
                                <i className="iconfont" data-v-3ff813d6="" style={{marginLeft:'5px', cursor:'pointer'}} onClick={(e)=>copyAddress(e,tokenInfo.address === undefined ? '00' : tokenInfo.address)}>
                                    <img src={require('../assets/images/copy.png').default} width='15px'></img>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="price-container" data-v-3ff813d6="">
                        <div className="price" data-v-3ff813d6="">${tokenInfo.price === undefined ? '0.0' : normalPrice}</div>
                        <div className="price-bottom" data-v-3ff813d6="" style={{ color: tokenInfo.change !== undefined?(tokenInfo.change.split('%')[0] < 0?'red':'rgb(70, 215, 171)'):'red'}}>{tokenInfo.change !== undefined?(tokenInfo.change.split('%')[0]):'0.0'}%</div>
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
                        <div data-v-3ff813d6="">{extraDetail!=undefined && extraDetail.amount_24!==undefined?extraDetail.amount_24.toLocaleString():'0'}</div> 
                        {/* {tokenInfo.volume} */}
                    </div><div className="flex" data-v-3ff813d6="">
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">24h Amount</div>
                            <div data-v-3ff813d6="">${extraDetail!=undefined && Math.round(extraDetail.volume_24).toLocaleString()}</div>
                        </div>
                        <div id="main1" data-v-3ff813d6="" _echarts_instance_="ec_1650102164978" style={{ height: '50px', width: '100px', userSelect: 'none', position: 'relative' }}>
                            <div style={{ position: 'relative', width: '100px', height: '50px', padding: '0px', margin: '0px', borderWidth: '0px', cursor: 'default' }}>
                                <canvas data-zr-dom-id="zr_0" width="100" height="50" style={{ position: 'absolute', left: '0px', top: '0px', width: '100px', height: '50px', userSelect: 'none', padding: '0px', margin: '0px', borderWidth: '0px' }}></canvas>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: '0px auto auto 0px !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: '0px 0px auto auto !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: 'auto auto 0px 0px !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: 'auto 0px 0px auto !important' }}></div>

                            </div>
                        </div>
                    </div>
                    <div className="flex" data-v-3ff813d6="">
                        <div className="table-item" data-v-3ff813d6="">
                            <div data-v-3ff813d6="">Liquidity</div>
                            <div data-v-3ff813d6="">${ Math.round(props.liquidity).toLocaleString()}</div>
                        </div>
                        <div id="main2" data-v-3ff813d6="" _echarts_instance_="ec_1650102164978" style={{ height: '50px', width: '100px', userSelect: 'none', position: 'relative' }}>
                            <div style={{ position: 'relative', width: '100px', height: '50px', padding: '0px', margin: '0px', borderWidth: '0px', cursor: 'default' }}>
                                <canvas data-zr-dom-id="zr_0" width="100" height="50" style={{ position: 'absolute', left: '0px', top: '0px', width: '100px', height: '50px', userSelect: 'none', padding: '0px', margin: '0px', borderWidth: '0px' }}></canvas>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: '0px auto auto 0px !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: '0px 0px auto auto !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: 'auto auto 0px 0px !important' }}></div>
                                <div style={{ position: 'absolute !important', visibility: 'hidden !important', padding: '0px !important', margin: '0px !important', borderWidth: '0px !important', userSelect: 'none !important', width: '0px !important', height: '0px !important', inset: 'auto 0px 0px auto !important' }}></div>

                            </div>
                        </div>
                    </div>
                    <div className="swap-container" data-v-3ff813d6="">
                        <a href={tokenInfo.address !== undefined ? "https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=" + tokenInfo.address : ''} target="_blank" className="el-button el-button--primary el-button--default swap-button" type="button" data-v-3ff813d6="" >
                            <span className="">Swap</span>
                        </a>
                        <a href="/check" className="el-button el-button--primary el-button--default swap-button" type="button" data-v-3ff813d6="" >
                            <span className="">Check</span>
                        </a>
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
        </>
    )
}

export default TokenDetail;