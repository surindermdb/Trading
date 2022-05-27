import {useState} from 'react';
const Pool = (props) => {

    let data=props.poolPairs;

    const[currentIndex,setCurrentIndex]=useState(0);
    const changePair=(e,index,liquidity)=>{
        setCurrentIndex(index);
        props.changeChartByPair(index,liquidity);
        
    }

    return (
        <>
            <div className="el-col el-col-24 el-col-xs-6 el-col-sm-6 el-col-md-5 el-col-lg-6 el-col-xl-4 is-guttered top_token_tmb" data-v-a46acd44="" 
            style={{paddingLeft: '4px', paddingRight: '4px'}}>
                <section className="token-right-container" data-v-0b1dff47="" data-v-a46acd44="">
                    <div className="van-tabs van-tabs--line fav-tabs" data-v-0b1dff47="">
                        <div className="van-tabs__wrap">
                            <div role="tablist" className="van-tabs__nav van-tabs__nav--line van-tabs__nav--shrink van-tabs__nav--complete" aria-orientation="horizontal" style={{borderColor: 'rgb(85, 139, 237)', background: 'transparent'}}>
                                <div id="van-tabs-3-0" role="tab" className="van-tab van-tab--line van-tab--shrink van-tab--active" tabindex="0" aria-selected="true" style={{color: 'rgb(85, 139, 237)'}}>
                                    <span className="van-tab__text">Pool</span>
                                </div>
                                {/* <div id="van-tabs-3-1" role="tab" className="van-tab van-tab--line van-tab--shrink" tabindex="-1" aria-selected="false">
                                    <span className="van-tab__text">Info</span>
                                </div> */}
                                <div className="van-tabs__line" style={{backgroundColor: 'rgb(85, 139, 237)', transform: 'translateX(31px) translateX(-50%)', height: '0px', borderRadius: '0px'}}>

                                </div>
                            </div></div><div className="van-tabs__content"></div></div><div className="el-scrollbar" data-v-0b1dff47="">
                        <div className="el-scrollbar__wrap el-scrollbar__wrap--hidden-default" style={{height: '556px'}}>
                            <div className="el-scrollbar__view" style={{}}>
                                <div className="pairs" data-v-0b1dff47="">
                                    <table className="pairs-table" data-v-0b1dff47="">
                                        <tr data-v-0b1dff47="">
                                            <th data-v-0b1dff47=""></th>
                                            <th data-v-0b1dff47="">Pair</th>
                                            <th data-v-0b1dff47="">AMM</th>
                                            <th data-v-0b1dff47="">Amount</th>
                                            <th data-v-0b1dff47="">Circulating Supply</th>
                                        </tr>
                                        {data!==undefined && data.length > 0 && 
                                            data.map((item,index)=>{
                                                let liquidity=0.0;
                                                if(item.token0_symbol===props.symbol){
                                                    liquidity=item.reserve1*item.token1_price_usd*2;
                                                    liquidity=liquidity.toFixed(1);
                                                }
                                                else{
                                                    liquidity=item.reserve0*item.token0_price_usd*2;
                                                    liquidity= liquidity.toFixed(1);
                                                }
                                                return <tr className={index==currentIndex?"active":''} data-v-0b1dff47="" onClick={(e)=>changePair(e,index,liquidity)}>
                                                <td  data-v-0b1dff47=""></td>
                                                <td  data-v-0b1dff47="">
                                                    <span className="main" data-v-0b1dff47="">{item.token0_symbol}</span>
                                                    <span className="minor" data-v-0b1dff47="">/{item.token1_symbol}</span>
                                                </td>
                                                <td data-v-0b1dff47="" style={{color:'#fff'}}>{item.amm}</td>
                                                <td  data-v-0b1dff47="">
                                                    <span className="main" data-v-0b1dff47="">{item.reserve0.toFixed(2)}</span>
                                                    <span className="minor" data-v-0b1dff47="">/{item.reserve1.toFixed(3)}</span>
                                                </td>
                                                <td data-v-0b1dff47="" style={{color:'#fff'}}>${parseFloat(liquidity).toLocaleString()}</td>
                                                </tr>
                                            })
                                            
                                        }
                                        
                                    </table>
                                    {/* <div className="collapse-button" data-v-0b1dff47="">
                                        <button className="el-button el-button--small is-round" type="button" data-v-0b1dff47="" >
                                            <span className="">More <i className="van-badge__wrapper van-icon van-icon-arrow expand" data-v-0b1dff47=""></i></span>
                                        </button>
                                    </div> */}
                                    {/* <div className="table" data-v-2eaa94c4="" data-v-0b1dff47="">
                                        <div tabindex="0" className="vld-overlay is-active" aria-busy="false" aria-label="Loading" data-v-2eaa94c4="" style={{display: 'none'}}>
                                            <div className="vld-background" style={{background: 'rgb(0, 0, 0)', opacity: '0.2', backdropFilter: 'blur(2px)'}}>
                                            </div>
                                            <div className="vld-icon">
                                                <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#558BED" width="60" height="240">
                                                    <circle cx="15" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite">
                                                        </animate>
                                                    </circle>
                                                    <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                                                        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite">
                                                        </animate>
                                                        <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                    <circle cx="105" cy="15" r="15">
                                                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
                                                    </circle>
                                                </svg>
                                            </div>
                                        </div>
                                        <ul className="table-list" data-v-2eaa94c4="">
                                            <li className="table-item table-header" data-v-2eaa94c4=""><span className="table-item-d" data-v-2eaa94c4="">Time</span><span className="table-item-d" data-v-2eaa94c4="">Amount</span><span className="table-item-d" data-v-2eaa94c4="">Value(USDT)</span></li>
                                            <li className="table-item" data-v-2eaa94c4="">
                                                <span className="table-item-d" data-v-2eaa94c4="">00:41:55</span>
                                                <div className="table-item-d" data-v-2eaa94c4="">
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="add" data-v-2eaa94c4="">223.46</span>
                                                        <span className="unit" data-v-2eaa94c4="">PEX</span>
                                                    </div>
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="add" data-v-2eaa94c4="">0.0016</span>
                                                        <span className="unit" data-v-2eaa94c4="">WBNB</span>
                                                    </div>
                                                </div>
                                                <span className="table-item-d" data-v-2eaa94c4="">0.666</span>
                                            </li>
                                            <li className="table-item" data-v-2eaa94c4="">
                                                <span className="table-item-d" data-v-2eaa94c4="">08:21:24</span>
                                                <div className="table-item-d" data-v-2eaa94c4="">
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="remove" data-v-2eaa94c4="">1,969.515</span>
                                                        <span className="unit" data-v-2eaa94c4="">PEX</span>
                                                    </div>
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="remove" data-v-2eaa94c4="">0.015</span>
                                                        <span className="unit" data-v-2eaa94c4="">WBNB</span>
                                                    </div>
                                                </div>
                                                <span className="table-item-d" data-v-2eaa94c4="">5.927</span>
                                            </li>
                                            <li className="table-item" data-v-2eaa94c4="">
                                                <span className="table-item-d" data-v-2eaa94c4="">04:16:22</span>
                                                <div className="table-item-d" data-v-2eaa94c4="">
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="add" data-v-2eaa94c4="">2,000</span>
                                                        <span className="unit" data-v-2eaa94c4="">PEX</span>
                                                    </div>
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="add" data-v-2eaa94c4="">0.0151</span>
                                                        <span className="unit" data-v-2eaa94c4="">WBNB</span>
                                                    </div>
                                                </div>
                                                <span className="table-item-d" data-v-2eaa94c4="">6.002</span>
                                            </li>
                                            <li className="table-item" data-v-2eaa94c4="">
                                                <span className="table-item-d" data-v-2eaa94c4="">04:10:49</span>
                                                <div className="table-item-d" data-v-2eaa94c4="">
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="remove" data-v-2eaa94c4="">1,368.721</span>
                                                        <span className="unit" data-v-2eaa94c4="">PEX</span>
                                                    </div>
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="remove" data-v-2eaa94c4="">0.0104</span>
                                                        <span className="unit" data-v-2eaa94c4="">WBNB</span>
                                                    </div>
                                                </div>
                                                <span className="table-item-d" data-v-2eaa94c4="">4.127</span>
                                            </li>
                                            <li className="table-item" data-v-2eaa94c4="">
                                                <span className="table-item-d" data-v-2eaa94c4="">02:19:25</span>
                                                <div className="table-item-d" data-v-2eaa94c4="">
                                                    <div className="table-item-d_row" data-v-2eaa94c4="">
                                                        <span className="remove" data-v-2eaa94c4="">6,047.366</span>
                                                        <span className="unit" data-v-2eaa94c4="">PEX</span>
                                                    </div>
                                                    <div className="table-item-d_row" data-v-2eaa94c4=""><span className="remove" data-v-2eaa94c4="">0.0457</span>
                                                        <span className="unit" data-v-2eaa94c4="">WBNB</span>
                                                    </div>
                                                </div>
                                                <span className="table-item-d" data-v-2eaa94c4="">18.141</span>
                                            </li>

                                            <div className="el-empty" data-v-2eaa94c4="" style={{display: 'none'}}>
                                                <div className="el-empty__image" style={{width: '100px'}}>
                                                    <img src="/static/img/empty-black-1.0406a8c5.svg" onDragStart="return false" />
                                                </div>
                                                <div className="el-empty__description"><p>No Data</p></div>
                                            </div>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="el-scrollbar__bar is-horizontal" style={{display: 'none'}}>
                            <div className="el-scrollbar__thumb" style={{transform: 'translateX(0%)'}}></div>
                        </div>
                        <div className="el-scrollbar__bar is-vertical" style={{display: 'none'}}>
                            <div className="el-scrollbar__thumb" style={{transform: 'translateY(0%)', height: '361.452px'}}>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Pool;