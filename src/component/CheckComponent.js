import { useState } from 'react';
import { APIURL, BSCURL, HOST } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import { getRequest } from "../Action";
import 'react-toastify/dist/ReactToastify.css';

const CheckComponent = () => {


    const [checkData, setCheckData] = useState({});
    const getTokenData = async (e) => {
        e.preventDefault();
        let address = document.querySelector("#chk_txtToken");
        let data = await getRequest(APIURL + 'check?address=', address.value);
        if (data.fail == true) {
            toast.error(data.msg, {
                theme: "colored"
            });
        }

        else {
            setCheckData(data);
        }
    }

    return (
        <>
            <ToastContainer position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover style={{ width: "350px" }} />
            <main className="main-container" data-v-2026486a="" style={{ upColor: '#12473F', 'downColor': '#572533' }}>
                <section className="check-container" data-v-5a60c796="" data-v-2026486a="">
                    <div className="check-content" data-v-5a60c796="">
                        <div className="el-row" data-v-5a60c796="" style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                            <div className="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-10 el-col-xl-10 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <div className="check-note" data-v-5a60c796=""><div className="check-note_h" data-v-5a60c796="">
                                    <i className="iconfont icon-alert" data-v-5a60c796=""></i>
                                    <span data-v-5a60c796="">Please note</span>
                                </div>
                                    <div className="check-note_c" data-v-5a60c796="">Note: We can help you determine if a smart contract may be a scam, but there is no 100% guarantee and we are trying to do our best to detect all scams. The ave contract check is technically supported by gopluslabs.io. The contract check is only used as a reference for users, not as a basis for contract judgment. For inquiring about contract details and specifications, risk safety, etc., it is recommended to visit an authoritative auditing company.</div>
                                </div><form className="el-form el-form--large check-input" data-v-5a60c796="">
                                    <div className="el-form-item is-success is-required el-form-item--large" data-v-5a60c796="">
                                        <div className="el-form-item__content">
                                            <div className="el-input el-input--large el-input-group el-input-group--prepend el-input--suffix" data-v-5a60c796="">
                                                <div className="el-input-group__prepend">
                                                    <div className="el-select el-select--large" data-v-5a60c796="" style={{ width: '110px' }}>
                                                        <div className="select-trigger el-tooltip__trigger el-tooltip__trigger">
                                                            <div className="el-input el-input--large el-input--prefix el-input--suffix">
                                                                <input className="el-input__inner" type="text" readonly="" autoComplete="off" placeholder="Select" style={{ paddingLeft: '30px' }} />
                                                                <span className="el-input__prefix"><span className="el-input__prefix-inner">
                                                                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <img className="icon-svg icon-net-connect" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-5a60c796="" />
                                                                    </div></span>
                                                                </span>
                                                                <span className="el-input__suffix"><span className="el-input__suffix-inner">
                                                                    <i className="el-icon el-select__caret el-select__icon">
                                                                        <svg className="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill="currentColor" d="M488.832 344.32l-339.84 356.672a32 32 0 000 44.16l.384.384a29.44 29.44 0 0042.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0042.688 0l.384-.384a32 32 0 000-44.16L535.168 344.32a32 32 0 00-46.336 0z"></path></svg>
                                                                    </i>
                                                                </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input id="chk_txtToken" className="el-input__inner" modelmodifiers="[object Object]" type="text" autoComplete="off" placeholder="Please enter contract address" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="el-form-item el-form-item--large submit-button-container" data-v-5a60c796="">
                                        <div className="el-form-item__content">
                                            <button className="checkBtn el-button el-button--primary el-button--large submit-button" onClick={(e) => getTokenData(e)} data-v-5a60c796="">
                                                <span className="">Check</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="arc-progress" data-v-4343a068="" data-v-5a60c796="">
                                    <div className="progress-container" data-v-4343a068="" style={{ height: '140px !important' }}>
                                        <div id="progress-container-1650432963104" data-v-4343a068="" style={{ width: '260px', height: '260px' }}>
                                            <canvas width="520" height="520" style={{ width: '260px', height: '260px' }}></canvas>
                                        </div>
                                    </div>
                                    <div className="checking-tips" data-v-4343a068="" style={{ color: 'rgb(231, 78, 84)' }}><span data-v-4343a068="">High Risk</span>
                                    </div>
                                </div>
                                <div data-v-5a60c796="" style={{ textAlign: 'center', fontSize: '12px', color: 'rgb(85, 139, 237)' }}>The 42th query</div>
                            </div>
                            <div className="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-14 el-col-lg-14 el-col-xl-14 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}><div className="el-row" data-v-5a60c796="" style={{ marginLeft: '-10px', marginRight: '-10px' }}>



                                {Object.keys(checkData).length === 0 &&
                                    <div style={{ width: '100%', height: 'auto', margin: 'auto',padding:'15% 35%' }}>
                                        <img src={require('../assets/images/waitingCheck.svg').default}></img>
                                        <div style={{textAlign: 'center', color:'#fff'}}>searching record</div>
                                    </div>
                                }
                                {Object.keys(checkData).length > 0 &&
                                    <div className="el-col el-col-12 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                        <h2 className="check-title" data-v-5a60c796="">
                                            <span data-v-5a60c796="">Check Report</span>
                                        </h2>
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796=""><span data-v-5a60c796="">Basic Info</span></h3>
                                            <ul data-v-5a60c796="">
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Token Name</span>
                                                    <span data-v-5a60c796="">{checkData.symbol + " (" + checkData.name + ")"}</span>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Token Contract Address</span>
                                                    <a href={BSCURL + "/token/" + checkData.token} target="_blank" data-v-5a60c796="">{checkData.token.substr(0, 5) + "..." + checkData.token.substr(35, 40)}</a>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Contract Creator</span>
                                                    <a href={BSCURL + "/address/" + checkData.creator} target="_blank" data-v-5a60c796="">{checkData.creator.substr(0, 5) + "..." + checkData.creator.substr(35, 40)}</a>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Contract Owner</span>
                                                    <a href={BSCURL + "/address/" + checkData.owner} target="_blank" data-v-5a60c796="">{checkData.owner.substr(0, 5) + "..." + checkData.owner.substr(35, 40)}</a>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796=""><span data-v-5a60c796="">Total Supply</span>
                                                    <span data-v-5a60c796="">{parseFloat(checkData.total).toLocaleString()}</span>
                                                </li>
                                                {/* <li className="card-list-item" data-v-5a60c796=""><span data-v-5a60c796="">Circulation</span><span data-v-5a60c796="">-</span>
                                            </li> */}
                                                <li className="card-list-item" data-v-5a60c796=""><span data-v-5a60c796="">Decimal</span>
                                                    <span data-v-5a60c796="">{checkData.decimal}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796="">Risk Check</h3>
                                            <ul data-v-5a60c796="">
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span className="danger" data-v-5a60c796="">Honeypot Check Failure</span>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span className="danger" data-v-5a60c796="">Not open-source, may has vulnerability</span></li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span className="warning" data-v-5a60c796="">Has no lp lock</span>
                                                </li>
                                            </ul>
                                        </div>
                                        {checkData.is_anti_whale > 0 &&
                                            <div class="card" data-v-5a60c796="">
                                                <h3 class="card-h" data-v-5a60c796="">Attention</h3>
                                                <ul data-v-5a60c796="">
                                                    <li class="card-list-item" data-v-5a60c796="">
                                                        <span data-v-5a60c796="">Is anti whale</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                        {checkData.buy_tax > 0 &&
                                            <div class="card" data-v-5a60c796="">
                                                <h3 class="card-h" data-v-5a60c796="">Tax Check</h3>
                                                <ul data-v-5a60c796="">
                                                    <li class="card-list-item" data-v-5a60c796="">
                                                        <span data-v-5a60c796="">Buy Tax</span>
                                                        <span class="danger" data-v-5a60c796="">{Math.round(checkData.buy_tax)}%</span>
                                                    </li>
                                                    <li class="card-list-item" data-v-5a60c796="">
                                                        <span data-v-5a60c796="">Sell Tax</span>
                                                        <span class="danger" data-v-5a60c796="">{(checkData.sell_tax.toFixed(2))}%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        }

                                        <div className="feedback-tips" data-v-5a60c796="">If you have any doubts about the check results, please <a href="javascript:;" data-v-5a60c796="">Click feedback</a>
                                        </div>
                                        <div className="technical-support" data-v-5a60c796="">
                                            <span className="label" data-v-5a60c796="">Technical Support</span>
                                            <img src={require('../assets/images/goPlus-logo.png')} alt="" data-v-5a60c796="" />
                                            <div className="url" data-v-5a60c796="">gopluslabs.io</div>
                                        </div>
                                        <div className="el-overlay" style={{ zIndex: '3039', display: 'none' }}>
                                            <div className="el-overlay-dialog">
                                                <div className="el-dialog" aria-modal="true" role="dialog" aria-label="dialog" >
                                                    <div className="el-dialog__header">
                                                        <span data-v-b1af2c96="" style={{ fontSize: '16px' }}>Feedback</span>
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
                                }
                                {Object.keys(checkData).length > 0 &&
                                    <div className="el-col el-col-12 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                        <div className="share-container" data-v-5a60c796="">
                                            <button className="share-button" data-v-5a60c796="">
                                                <i className="iconfont icon-fenxiang" data-v-5a60c796=""></i>
                                                <span data-v-5a60c796="">Share Report</span>
                                            </button>
                                        </div>
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796="">Token Holders Info</h3>
                                            <h4 className="card-h h-2" data-v-5a60c796="">Token Holders: {checkData.holders}</h4>
                                            <ul data-v-5a60c796="">
                                                {checkData.token_holders_rank !== undefined && checkData.token_holders_rank.length > 0 &&
                                                    checkData.token_holders_rank.map((item) => {
                                                        return <li className="card-list-item" data-v-5a60c796="">
                                                            <a href={BSCURL + "/address/" + item.address} target="_blank" data-v-5a60c796="">{item.address.substr(0, 5) + "..." + item.address.substr(35, 40)}</a>
                                                            <span data-v-5a60c796="">{item.quantity}</span>
                                                        </li>
                                                    })
                                                }


                                            </ul>
                                        </div>
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796="">Pool Info</h3>
                                            <h4 className="card-h h-2" data-v-5a60c796=""> LP Holders: {checkData.pair_holders}</h4>
                                            <ul data-v-5a60c796="">
                                                {checkData.pair_holders_rank !== undefined && checkData.pair_holders_rank.length > 0 &&
                                                    checkData.pair_holders_rank.map((item) => {
                                                        return <li className="card-list-item" data-v-5a60c796="">
                                                            <a href={BSCURL + "/address/" + item.address} target="_blank" data-v-5a60c796="">{item.address.substr(0, 5) + "..." + item.address.substr(35, 40)}</a>
                                                            <span data-v-5a60c796="">{item.quantity}</span>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }

                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default CheckComponent;