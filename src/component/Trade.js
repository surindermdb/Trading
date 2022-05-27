import { useEffect } from 'react';
import { toPlainString } from '../Action/index';
const Trade = (props) => {

    let trades = props.tradeHistory;
    let previousTransaction = '';
    const sendToTransaction = (e, hash) => {
        e.preventDefault();
        window.open(
            "https://bscscan.com/tx/" + hash,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    
    // useEffect(()=>{
    //     let history= document.window;
    //             // console.log(history.innerWidth)
    //             history.addEventListener("resize",()=>{
    //                 console.log(history)
    //             });
    // })
    return (
        <>
            <div className="buyOrsell common" data-v-50a903b6="" data-v-a46acd44="">
                <div className="title" data-v-50a903b6="">
                    <a href="" className="active" data-v-50a903b6="">Trade History</a>
                    {/* <a href="" className="" data-v-50a903b6="">My Trade</a> */}
                </div>
                <div className="content" data-v-50a903b6="">
                    <div className="histrory" data-v-a0a9e358="" data-v-50a903b6="">
                        <div className="top" data-v-a0a9e358="">
                            <span data-v-a0a9e358="">Time</span>
                            <span data-v-a0a9e358="">Type</span>
                            <span data-v-a0a9e358="">Price($)</span>
                            <span data-v-a0a9e358="">Amount({props.symbol})</span>
                            <span data-v-a0a9e358="">Amount($)</span>
                            <span data-v-a0a9e358="">User</span>
                        </div>
                        {trades!=undefined && trades.length === 0 &&
                            <div style={{
                                padding: '10% 0%',
                                margin: 'auto',
                                textAlign: 'center'
                            }}>
                                <img src={require('../assets/images/empty-black.svg').default}></img>
                                <div style={{ color: 'white' }}>Not Found</div>
                            </div>
                        }
                        <div className="el-scrollbar" data-v-a0a9e358="">
                            <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default" style={{ height: '350px' }}>
                                <div className="el-scrollbar__view" style={{}}>
                                    <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-a0a9e358="" style={{ display: 'none' }}>
                                        <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}></div>
                                        <div className="vld-icon"><svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                            <circle cx="15" cy="15" r="15">
                                                <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
                                                <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                            </circle>
                                            <circle cx="105" cy="15" r="15">
                                                <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                            </circle></svg>
                                        </div>
                                    </div>
                                    <ul className="content" data-v-a0a9e358="">
                                        {trades!=undefined && trades.length > 0 &&
                                            trades.map((item) => {

                                                if (previousTransaction == item.transaction.hash) {
                                                    return null;
                                                }
                                                let buySell = 'Sell';
                                                let amountSymbol = 0.0;
                                                if (item.sellCurrency.symbol === props.symbol) {
                                                    buySell = 'Buy';
                                                    amountSymbol = item.sellAmount;
                                                }
                                                if (item.buyCurrency.symbol === props.symbol) {
                                                    amountSymbol = item.buyAmount;
                                                }
                                                previousTransaction = item.transaction.hash;

                                                var d = new Date(item.block.timestamp.time);
                                                d.setHours(d.getHours() + 5);
                                                d.setMinutes(d.getMinutes() + 30);

                                                var hour = d.getHours();
                                                hour = hour < 10 ? '0' + hour : hour;
                                                var minute = d.getMinutes();
                                                minute = minute < 10 ? '0' + minute : minute;
                                                var second = d.getSeconds();
                                                second = second < 10 ? '0' + second : second;

                                                var month = d.getMonth() + 1;
                                                month = month < 10 ? '0' + month : month;

                                                // create date formate
                                                let createdAt = d.getFullYear() +
                                                    "-" + month +
                                                    "-" + d.getDate() +
                                                    " " + hour +
                                                    ":" + minute +
                                                    ":" + second;

                                                // price($) converter
                                                let pricelist = Number(item.tradeAmount / amountSymbol);
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
                                                // console.log(m);
                                                let normalPrice = price;

                                                return <li className="flex" data-v-a0a9e358="" onClick={(e) => sendToTransaction(e, item.transaction.hash)}>
                                                    <span data-v-a0a9e358="">{createdAt}</span>
                                                    <div className="red" data-v-a0a9e358="">
                                                        <span data-v-a0a9e358="" style={{ color: buySell == 'Buy' ? 'green' : 'red' }}>{buySell}</span>
                                                    </div>
                                                    <div className="red" data-v-a0a9e358="" style={{ color: buySell == 'Buy' ? 'green' : 'red' }}>{normalPrice}</div>
                                                    <div className="red" data-v-a0a9e358="" style={{ color: buySell == 'Buy' ? 'green' : 'red' }}>{amountSymbol}</div>
                                                    <span data-v-a0a9e358="">{parseFloat(item.tradeAmount).toFixed(4) }</span>
                                                    <span data-v-a0a9e358="">{item.transaction.hash.substr(0, 7)}</span>
                                                </li>
                                            })
                                        }

                                    </ul>
                                </div>
                            </div>
                            <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                            </div>
                            <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                <div className="el-scrollbar__thumb" style={{ transform: 'translateY(126.691%)', height: '20px' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="histrory" data-v-7c520660="" data-v-50a903b6="" style={{ display: 'none' }}>
                        <div className="top" data-v-7c520660="">
                            <span data-v-7c520660="">Time</span>
                            <span data-v-7c520660="">Type</span>
                            <span data-v-7c520660="">Price</span>
                            <span data-v-7c520660="">Amount(PEX)</span>
                            <span data-v-7c520660="">Amount($)</span>
                            <span data-v-7c520660="">User</span>
                        </div>
                        <div className="el-scrollbar" data-v-7c520660="">
                            <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default" style={{ height: '350px' }}>
                                <div className="el-scrollbar__view" style={{}}>
                                    <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-7c520660="" style={{ display: 'none' }}>
                                        <div className="vld-background" style={{ background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)' }}></div>
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
                                    <div className="el-empty" data-v-7c520660="">
                                        <div className="el-empty__image" style={{ width: '100px' }}>
                                            <img src="/static/img/empty-black-1.0406a8c5.svg" onDragStart="return false" />
                                        </div>
                                        <div className="el-empty__description"><p>No Data</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="el-scrollbar__bar is-horizontal" style={{ display: 'none' }}>
                                <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }}></div>
                            </div>
                            <div className="el-scrollbar__bar is-vertical" style={{ display: 'none' }}>
                                <div className="el-scrollbar__thumb" style={{ transform: 'translateY(0%)' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trade;