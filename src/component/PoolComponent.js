import { useState, useEffect } from 'react';
import { APIURL, BSCURL, HOST } from '../config';
import { getRequest } from "../Action";
import { Hypnosis } from "react-cssfx-loading";

const PoolComponent = () => {

    const [tokenPool, setTokenPool] = useState([]);

    useEffect(() => {
        const getTokenPool = async () => {
            let response = await getRequest(APIURL + 'pooltoken', '');
            setTokenPool(response.data);
        }
        getTokenPool();
    }, [])


    // on select token from searching list
    const onChangeAddress = async (e, address) => {
        e.preventDefault();
        let data = await getRequest(APIURL + 'pooltokeninfo?address=', address);
        let token = {
            address: address,
            icon:  require('../assets/images/icon-default.png').default,
            price: data.current_price_usd,
            holder: data.holders,
            marketCap: "0.0",
            volume: "0.0",
            change: data.price_change.toString(),
            symbol: data.symbol
        }
        // props.changeMapWithSymbol(token, data.symbol);
        localStorage.setItem("tokenInfo", JSON.stringify(token));
        const nextURL = HOST + '/token/' + token.address;
        window.location.href=nextURL;

    }


    return (
        <>
            <main className="main-container" data-v-2026486a="" style={{ upColor: '#12473F', downColor: '#572533', paddingTop: '20px', overflowX:'auto' }}>
                <section className="home-content" data-v-2e7b72c4="" data-v-2026486a="">
                    <div className="container" data-v-2e7b72c4="">

                        <div className="el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--default el-table el-table--layout-fixed table-container is-scrolling-none" data-prefix="el" data-v-2e7b72c4="" style={{ width: '100%' }}>
                            <div className="el-table__inner-wrapper">
                                <div className="hidden-columns">
                                    <div data-v-2e7b72c4="">
                                    </div><div data-v-2e7b72c4="">
                                    </div>
                                    <div data-v-2e7b72c4="">
                                    </div>
                                    <div data-v-2e7b72c4="">
                                    </div>
                                    <div data-v-2e7b72c4="">0/0</div>
                                    <div data-v-2e7b72c4="">
                                    </div><div data-v-2e7b72c4="">
                                    </div><div data-v-2e7b72c4="">
                                    </div>
                                </div>
                                <div className="el-table__header-wrapper">
                                    <table className="el-table__header" border="0" cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
                                        <colgroup>
                                            <col name="el-table_1_column_1"  />
                                            <col name="el-table_1_column_2"  />
                                            <col name="el-table_1_column_3"  />
                                            <col name="el-table_1_column_4"  />
                                            <col name="el-table_1_column_5"  />
                                            {/* <col name="el-table_1_column_6" width="157" /> */}
                                            <col name="el-table_1_column_8"  />
                                            <col name="el-table_1_column_7"  />
                                        </colgroup>
                                        <thead className="">
                                            <tr className="">
                                                <th className="el-table_1_column_1 is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Pair</div>
                                                </th>
                                                <th className="el-table_1_column_2     is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">AMM</div>
                                                </th>
                                                <th className="el-table_1_column_3     is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Chain</div>
                                                </th>
                                                <th className="el-table_1_column_4 descending    is-leaf is-sortable el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Created time<span className="caret-wrapper">
                                                        <i className="sort-caret ascending">
                                                        </i>
                                                        <i className="sort-caret descending"></i></span>
                                                    </div></th><th className="el-table_1_column_5     is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Amount</div>
                                                </th>
                                                {/* <th className="el-table_1_column_6     is-leaf is-sortable el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Circulating Supply<span className="caret-wrapper">
                                                        <i className="sort-caret ascending"></i>
                                                        <i className="sort-caret descending"></i>
                                                    </span></div>
                                                </th> */}
                                                <th className="el-table_1_column_8     is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Change</div>
                                                </th>
                                                <th className="el-table_1_column_7     is-leaf el-table__cell" colSpan="1" rowSpan="1">
                                                    <div className="cell">Operation</div>
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="el-table__body-wrapper">
                                    <div className="el-scrollbar">
                                        <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                                            <div className="el-scrollbar__view" style={{}}>
                                                {tokenPool.length == 0 &&
                                                    <div style={{ height: '400px', width: '100%', textAlign: 'center' }}>
                                                        <Hypnosis />
                                                    </div>
                                                }

                                                <table className="el-table__body" cellSpacing="0" cellPadding="0" border="0" style={{ tableLayout: 'fixed', width: '100%' }}>
                                                    <colgroup>
                                                        <col name="el-table_1_column_1"  />
                                                        <col name="el-table_1_column_2"  />
                                                        <col name="el-table_1_column_3"  />
                                                        <col name="el-table_1_column_4"  />
                                                        <col name="el-table_1_column_5"  />
                                                        {/* <col name="el-table_1_column_6" width="157" /> */}
                                                        <col name="el-table_1_column_8"  />
                                                        <col name="el-table_1_column_7"  />
                                                    </colgroup>
                                                    <tbody>
                                                        {tokenPool.length > 0 &&
                                                            tokenPool.map((item) => {

                                                                let swapUrl = HOST + '/pool';
                                                                if (item.amm === 'cakev2') {
                                                                    swapUrl = "https://pancakeswap.finance/swap?inputCurrency=BNB&amp;outputCurrency=" + item.target_token + "";
                                                                }
                                                                else if (item.amm === 'uniswapv2') {
                                                                    swapUrl = "https://app.uniswap.org/#/swap?use=V2&inputCurrency=ETH&outputCurrency=" + item.target_token + "";
                                                                }
                                                                else if (item.amm === 'tradejoe') {
                                                                    swapUrl = "https://traderjoexyz.com/home#/trade?inputCurrency=AVAX&outputCurrency=" + item.target_token + "";
                                                                }
                                                                else if (item.amm === 'bschoswap') {
                                                                    swapUrl = "https://bschoswap.halo.land/swap?inputCurrency=BNB&outputCurrency=" + item.target_token + "";
                                                                }
                                                                else if(item.amm === 'sunswap' || item.amm == 'sunswapv2' ){
                                                                    swapUrl ="https://sunswap.com/#/sun?outputCurrency="+item.target_token;
                                                                }
                                                                else if(item.amm == 'spookyswap'){
                                                                    swapUrl ="https://spooky.fi/#/";
                                                                }
                                                                else if(item.amm == 'metaswap'){
                                                                    swapUrl ="https://swap.meta-world.game/dex/#/swap?inputCurrency=MTW&outputCurrency="+item.target_token;
                                                                }
                                                                

                                                                let chainUrl = "https://bscscan.com/token/" + item.pair + "";
                                                                if (item.chain == "eth") {
                                                                    chainUrl = "https://etherscan.io/token/" + item.pair + "";
                                                                }
                                                                else if (item.chain == "avalanche") {
                                                                    chainUrl = "https://snowtrace.io/token/" + item.pair + "";
                                                                }
                                                                else if(item.chain === "vision"){
                                                                    chainUrl = "https://www.visionscan.org/token/" + item.pair + "";
                                                                }

                                                                var timestamp = item.created_at;
                                                                var date = new Date(timestamp*1000);
                                                                var hour=date.getHours();
                                                                hour=hour<10?'0'+hour:hour;
                                                                var minute=date.getMinutes();
                                                                minute=minute<10?'0'+minute:minute;
                                                                var second=date.getSeconds();
                                                                second=second<10?'0'+second:second;

                                                                var month=date.getMonth()+1;
                                                                month=month<10?'0'+month:month;

                                                                let createdAt=date.getFullYear()+
                                                                "/"+(month)+
                                                                "/"+date.getDate()+
                                                                " "+hour+
                                                                ":"+minute+
                                                                ":"+second;

                                                                let swapIcon='icon-default.png';
                                                                if(item.amm!='unknown'){
                                                                    swapIcon=item.amm+'.jpeg';
                                                                }

                                                                return <tr className="el-table__row">
                                                                    <td className="el-table_1_column_1   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell">
                                                                            <a href={chainUrl} target="_blank" data-v-2e7b72c4="">{item.token0_symbol + "/" + item.token1_symbol}</a>
                                                                        </div>
                                                                    </td>
                                                                    <td className="el-table_1_column_2   el-table__cell" rowSpan="1" colSpan="1"><div className="cell">{item.amm}</div>
                                                                    </td>
                                                                    <td className="el-table_1_column_3   el-table__cell" rowSpan="1" colSpan="1"><div className="cell">
                                                                        <img className="icon-svg icon-symbol" src={"https://avesp.xyz/oss/chain/" + item.chain + ".png"} alt="" srcSet="" data-v-2e7b72c4="" style={{ cursor: 'default', fontSize: '20px' }} />
                                                                    </div>
                                                                    </td>
                                                                    <td className="el-table_1_column_4   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell">{createdAt}</div>
                                                                    </td>
                                                                    <td className="el-table_1_column_5   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell">
                                                                            {item.reserve0.toFixed(2) + "/" + item.reserve1.toFixed(2)}</div>
                                                                    </td>
                                                                    {/* <td className="el-table_1_column_6   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell">$706,930</div>
                                                                    </td> */}
                                                                    <td className="el-table_1_column_8   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell"><span className={item.reserve_change >= 0 ? 'green' : 'red'} data-v-2e7b72c4="">{item.reserve_change}%</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="el-table_1_column_7   el-table__cell" rowSpan="1" colSpan="1">
                                                                        <div className="cell">
                                                                            <a href={chainUrl} target="_blank" className="icon-a el-tooltip__trigger el-tooltip__trigger" rel="noopener noreferrer" data-v-2e7b72c4="">
                                                                                <img src='https://avesp.xyz/oss/chain/bsc.png' style={{ width: '20px' }}></img>
                                                                            </a>
                                                                            <a href={swapUrl} target="_blank" className="icon-a el-tooltip__trigger el-tooltip__trigger" rel="noopener noreferrer" data-v-2e7b72c4="">
                                                                                <img src={require('../assets/images/'+swapIcon).default} style={{ width: '20px' }}></img>
                                                                            </a>
                                                                            <a onClick={(e)=>onChangeAddress(e,item.target_token)} className="icon-a el-tooltip__trigger el-tooltip__trigger" rel="noopener noreferrer" data-v-2e7b72c4="">
                                                                                <img src={require('../assets/images/market.jpg').default} style={{ width: '20px' }}></img>
                                                                            </a></div>
                                                                    </td>
                                                                </tr>
                                                            })

                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div role="pagination" aria-label="pagination" className="el-pagination is-background pagination-box" style={{display:'none'}} data-v-2e7b72c4="">
                            <span className="el-pagination__sizes is-first"><div className="el-select el-select--default">
                                <div className="select-trigger el-tooltip__trigger el-tooltip__trigger">
                                    <div className="el-input el-input--default el-input--suffix">
                                        <input className="el-input__inner" type="text" readonly="" autocomplete="off" placeholder="Select" />
                                        <span className="el-input__suffix">
                                            <span className="el-input__suffix-inner">
                                                <i className="el-icon el-select__caret el-select__icon">
                                                    <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill="currentColor" d="M488.832 344.32l-339.84 356.672a32 32 0 000 44.16l.384.384a29.44 29.44 0 0042.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0042.688 0l.384-.384a32 32 0 000-44.16L535.168 344.32a32 32 0 00-46.336 0z">
                                                        </path></svg></i>
                                            </span></span>
                                    </div>
                                </div>
                            </div>
                            </span>
                            <button type="button" className="btn-prev" disabled="" aria-disabled="true">
                                <i className="el-icon">
                                    <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M609.408 149.376L277.76 489.6a32 32 0 000 44.672l331.648 340.352a29.12 29.12 0 0041.728 0 30.592 30.592 0 000-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 000-42.688 29.12 29.12 0 00-41.728 0z"></path>
                                    </svg>
                                </i>
                            </button>
                            <ul className="el-pager">
                                <li className="active number" aria-current="true" tabindex="0"> 1 </li>
                                <li className="number" aria-current="false" tabindex="0">2</li>
                                <li className="number" aria-current="false" tabindex="0">3</li>
                                <li className="number" aria-current="false" tabindex="0">4</li>
                                <li className="number" aria-current="false" tabindex="0">5</li>
                                <li className="number" aria-current="false" tabindex="0">6</li>
                                <li className="more btn-quicknext el-icon">
                                    <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M176 416a112 112 0 110 224 112 112 0 010-224zm336 0a112 112 0 110 224 112 112 0 010-224zm336 0a112 112 0 110 224 112 112 0 010-224z"></path></svg>
                                </li>
                                <li className="number" aria-current="false" tabindex="0">689</li>
                            </ul>
                            <button type="button" className="btn-next" aria-disabled="false">
                                <i className="el-icon">
                                    <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 0 00-41.728 0z"></path>
                                    </svg>
                                </i>
                            </button>
                            <span className="el-pagination__jump is-last" disabled="false">Go to <div className="el-input el-input--small el-pagination__editor is-in-pagination">
                                <input className="el-input__inner" min="1" max="689" type="number" autocomplete="off" />
                            </div>
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PoolComponent;