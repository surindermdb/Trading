import { useState } from 'react';
import { APIURL, BSCURL, HOST } from '../config';
import { faThumbsUp,faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import { getRequest } from "../Action";
import success from '../assets/icons/success.png';
import warning from '../assets/icons/warning.png'
import 'react-toastify/dist/ReactToastify.css';

const CheckComponent = () => {


    const [checkData, setCheckData] = useState({});
    const [voteData, setVoteData] = useState({});
    const [selectedNetword, setSelectedNetwork] = useState('BSC');
    const [show, setShow] = useState(false);
    const getTokenData = async (e) => {
        e.preventDefault();
        let address = document.querySelector("#chk_txtToken");
        let network = 'bsc';
        if (selectedNetword == 'Ethereum') {
            network = 'eth';
        }
        let data = await getRequest(APIURL + 'check?address=' + address.value + '&network=' + network);
        if (data.fail == true) {
            toast.error(data.msg, {
                theme: "colored"
            });
        }

        else {
            // let description=JSON.parse(data.description);
            let record=data.contract_data;
            if( record.hasOwnProperty('note')){
                record.note = 0; //0 for LP
            }
            else{
                record.note = 1; //1 for has no LP 
            }
            setCheckData(record);
            setVoteData({ vote_support: data.vote_support, vote_against: data.vote_against });
        }
    }

    const setNetwork = (e, value) => {
        e.preventDefault();
        setSelectedNetwork(value);
        setShow(false);
    }

    const showDropdown = (e) => {
        e.preventDefault();
        if (show == true) {
            setShow(false);
        }
        else {
            setShow(true);
        }

    }

    document.addEventListener('click', function (e) {
        if (e.target.classList != 'el-input-group__prepend' && e.target.classList != 'el-input__inner' && e.target.classList != 'el-input__suffix' && e.target.classList != 'el-select__icon' && e.target.classList != 'icon') {
            setShow(false);
        }
    })

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
                        <div className="el-row" data-v-5a60c796="" style={{ marginLeft: '-15px', marginRight: '-10px' }}>
                            <div className="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-10 el-col-xl-10 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                
                                <form className="el-form el-form--large check-input" data-v-5a60c796="">
                                    <div className="el-form-item is-success is-required el-form-item--large" data-v-5a60c796="">
                                        <div className="el-form-item__content">
                                            <div className="el-input el-input--large el-input-group el-input-group--prepend el-input--suffix" data-v-5a60c796="">
                                                <div className="el-input-group__prepend" onClick={(e) => showDropdown(e)}>
                                                    <div className="el-select el-select--large" data-v-5a60c796="" style={{ width: '110px' }}>
                                                        <div className="select-trigger el-tooltip__trigger el-tooltip__trigger" >
                                                            <div className="el-input el-input--large el-input--prefix el-input--suffix">
                                                                <input className="el-input__inner" type="text" readonly="" autoComplete="off" value={selectedNetword} placeholder="Select" style={{ paddingLeft: '30px' }} />
                                                                <span className="el-input__prefix">
                                                                    <span className="el-input__prefix-inner">
                                                                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <img className="icon-svg icon-net-connect" src="https://avesp.xyz/oss/chain/bsc.png" alt="" srcSet="" data-v-5a60c796="" />
                                                                        </div>
                                                                    </span>
                                                                </span>
                                                                <span className="el-input__suffix">
                                                                    <span className="el-input__suffix-inner">
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
                                    <div id="el-popper-container-3629">
                                        <div className="el-popper is-pure is-light el-select__popper networkdropdown" role="tooltip" aria-hidden="false" data-popper-placement="bottom-start" style={{ zIndex: '3014', position: 'absolute', margin: '0px', visibility: show == true ? 'visible' : 'hidden' }}>
                                            <div className="el-select-dropdown" style={{ minWidth: '135px' }}>
                                                <div className="el-scrollbar" >
                                                    <div className="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                                                        <ul className="el-scrollbar__view el-select-dropdown__list" >
                                                            <li className={`el-select-dropdown__item ${selectedNetword == 'BSC' ? 'selected' : ''}`} data-v-37b4ad28="" onClick={(e) => setNetwork(e, 'BSC')}><span>BSC</span></li>
                                                            <li className={`el-select-dropdown__item ${selectedNetword == 'Ethereum' ? 'selected' : ''}`} data-v-37b4ad28="" onClick={(e) => setNetwork(e, 'Ethereum')}><span>Ethereum</span></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                            <span className="el-popper__arrow" data-popper-arrow="" style={{ position: 'absolute', left: '62px' }}></span>

                                        </div>
                                    </div>
                                    <div className="el-form-item el-form-item--large submit-button-container" data-v-5a60c796="">
                                        <div className="el-form-item__content">
                                            <button className="checkBtn el-button el-button--primary el-button--large submit-button" onClick={(e) => getTokenData(e)} data-v-5a60c796="">
                                                <span className="">Submit</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="arc-progress" data-v-4343a068="" data-v-5a60c796="" style={{ display: 'none' }}>
                                    <div className="progress-container" data-v-4343a068="" style={{ height: '140px !important' }}>
                                        <div id="progress-container-1650432963104" data-v-4343a068="" style={{ width: '260px', height: '260px' }}>
                                            <canvas width="520" height="520" style={{ width: '260px', height: '260px' }}></canvas>
                                        </div>
                                    </div>
                                    <div className="checking-tips" data-v-4343a068="" style={{ color: 'rgb(231, 78, 84)' }}><span data-v-4343a068="">High Risk</span>
                                    </div>
                                </div>
                                <div className="check-note" data-v-5a60c796=""><div className="check-note_h" data-v-5a60c796="">
                                    <i className="iconfont icon-alert" data-v-5a60c796=""></i>
                                    <span data-v-5a60c796="">Please note</span>
                                </div>
                                    <div className="check-note_c" data-v-5a60c796="">Note: We can help you determine if a smart contract may be a scam, but there is no 100% guarantee and we are trying to do our best to detect all scams. The ave contract check is technically supported by gopluslabs.io. The contract check is only used as a reference for users, not as a basis for contract judgment. For inquiring about contract details and specifications, risk safety, etc., it is recommended to visit an authoritative auditing company.</div>
                                </div>
                                {/* <div data-v-5a60c796="" style={{ textAlign: 'center', fontSize: '12px', color: 'rgb(85, 139, 237)', display: 'none' }}>The 42th query</div> */}
                                {/* {Object.keys(voteData).length > 0 &&
                                    <div className="card b-0_5" data-v-73ad47f8="" style={{ marginTop: '30px' }}>
                                        <h3 className="card-h" data-v-73ad47f8="">Community Trust</h3>
                                        <div className="community-container" data-v-73ad47f8="">
                                            <div className="thumbs-container" data-v-73ad47f8="">
                                               
                                                <span className="thumbs-label" data-v-73ad47f8="">Support({voteData.vote_support})</span>
                                            </div>
                                            <div className="range-container" data-v-73ad47f8="">
                                                <div className="range" data-v-73ad47f8="">
                                                    <span className="left" data-v-73ad47f8="" style={{ width: ((voteData.vote_support / (voteData.vote_support + voteData.vote_against)) * 100).toFixed(2) + '%' }}>{((voteData.vote_support / (voteData.vote_support + voteData.vote_against)) * 100).toFixed(2) + '%'}</span>
                                                    <span className="right" data-v-73ad47f8="" style={{ width: ((voteData.vote_against / (voteData.vote_support + voteData.vote_against)) * 100).toFixed(2) + '%' }}>{((voteData.vote_against / (voteData.vote_support + voteData.vote_against)) * 100).toFixed(2) + '%'}</span>
                                                </div>
                                                <div className="range-label" data-v-73ad47f8="">({voteData.vote_support + voteData.vote_against} votes)</div>
                                            </div>
                                            <div className="thumbs-container" data-v-73ad47f8="">
                                               
                                                <span className="thumbs-label" data-v-73ad47f8="">Against({voteData.vote_against})</span>
                                            </div>
                                        </div>
                                        <div className="remark" data-v-73ad47f8="" style={{ paddingTop: '0.2rem' }}>Remark: The contract detection is only unilateral, and some new Pixiu may not be detected.
                                            Need to combine more dimensions to analyze, such as K-line trend, position changes, capital flow, etc.</div>
                                    </div>
                                } */}

                                {/* <div className="feedback-tips" data-v-5a60c796="">If you have any doubts about the check results, please <a href="javascript:;" data-v-5a60c796="">Click feedback</a>
                                </div> */}
                                <div className="technical-support" data-v-5a60c796="">
                                    <span className="label" data-v-5a60c796="">Technical Support</span>
                                    <img src={require('../assets/images/goPlus-logo.png')} alt="" data-v-5a60c796="" />
                                    <div className="url" data-v-5a60c796="">bloki.cc</div>
                                </div>
                                {/* <div className="el-overlay" style={{ zIndex: '3039', display: 'none' }}>
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
                                </div> */}
                            </div>

                            <div className="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-14 el-col-lg-14 el-col-xl-14 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <div className="el-row" data-v-5a60c796="" style={{ marginLeft: '-15px', marginRight: '-5px' }}>



                                {Object.keys(checkData).length === 0 &&
                                    <div style={{ width: '100%', height: 'auto', margin: 'auto', padding: '15% 35%' }}>
                                        <img src={require('../assets/images/waitingCheck.svg').default}></img>
                                        <div style={{ textAlign: 'center', color: '#fff' }}>searching record</div>
                                    </div>
                                }
                                {Object.keys(checkData).length > 0 &&
                                    <div className="el-col el-col-12 is-guttered" data-v-5a60c796="" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                        <h2 className="check-title" data-v-5a60c796="">
                                            <span data-v-5a60c796="">Check Report</span>
                                        </h2>
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796=""><span data-v-5a60c796="">Basic Info</span></h3>
                                            <ul data-v-5a60c796="" className='basicInfo'>
                                                {/* <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Token Name</span>
                                                    <span data-v-5a60c796="">{checkData.symbol + " (" + checkData.name + ")"}</span>
                                                </li> */}
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Token Contract Address</span>
                                                    <a href={BSCURL + "/token/" + checkData.token} target="_blank" data-v-5a60c796="">{checkData.token.substr(0, 5) + "..." + checkData.token.substr(35, 40)}</a>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Contract Creator</span>
                                                    <a href={BSCURL + "/address/" + checkData.creator_address} target="_blank" data-v-5a60c796="">{checkData.creator_address.substr(0, 5) + "..." + checkData.creator_address.substr(35, 40)}</a>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Contract Owner</span>
                                                    {checkData.owner!=undefined && 
                                                        <a href={BSCURL + "/address/" + checkData.owner} target="_blank" data-v-5a60c796="">{checkData.owner.substr(0, 5) + "..." + checkData.owner.substr(35, 40)}</a>
                                                    }
                                                    
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
                                                {checkData.is_honeypot == 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="danger" data-v-5a60c796="">Honeypot Check Failure</span>
                                                    </li>
                                                }
                                                {checkData.has_black_method > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Has blocklist , restricted mode</span>
                                                    </li>
                                                }
                                                {checkData.is_honeypot > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Doesn't look like honeypot</span>
                                                    </li>
                                                }
                                                {checkData.has_mint_method > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Can mint, issuance maliciously</span>
                                                    </li>
                                                }
                                                {checkData.has_white_method > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Whitelist</span>
                                                    </li>
                                                }
                                                {checkData.owner_change_balance > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Owner cannot tamper with balance</span>
                                                    </li>
                                                }
                                                {checkData.trading_cooldown > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">No trading-cool-down mechanism</span>
                                                    </li>
                                                }
                                                {checkData.transfer_pausable > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="danger" data-v-5a60c796="">Transfer can pause</span>
                                                    </li>
                                                }
                                                {checkData.can_take_back_ownership > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Can not take back ownership</span>
                                                    </li>
                                                }
                                                {checkData.slippage_modifiable > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Slippage can be modified</span>
                                                    </li>
                                                }
                                                {checkData.is_proxy > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="danger" data-v-5a60c796="">It is a proxy contract, may be potential upgrade and replacement risks</span>
                                                    </li>
                                                }
                                                {checkData.note <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Has no lp lock</span>
                                                    </li>
                                                }
                                                {checkData.has_black_method <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        {/* <svg className="icon-svg" aria-hidden="true" data-v-73ad47f8="" style={{cursor: 'default'}}></svg> */}
                                                        <span className="success" data-v-5a60c796="">No blacklist</span>
                                                    </li>
                                                }
                                                {checkData.is_honeypot < 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Doesn't look like honeypot</span>
                                                    </li>
                                                }
                                                {checkData.has_mint_method <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Can not mint</span>
                                                    </li>
                                                }
                                                {checkData.has_white_method <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">No whitelist</span>
                                                    </li>
                                                }
                                                {checkData.owner_change_balance <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Owner cannot tamper with balance</span>
                                                    </li>
                                                }
                                                {checkData.trading_cooldown <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">No trading-cool-down mechanism</span>
                                                    </li>
                                                }
                                                {checkData.transfer_pausable <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Transfer can not pause</span>
                                                    </li>
                                                }
                                                {checkData.can_take_back_ownership <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Can not take back ownership</span>
                                                    </li>
                                                }
                                                {checkData.slippage_modifiable <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Slippage cannot be modified</span>
                                                    </li>
                                                }
                                                {checkData.is_proxy <= 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">Doesn't look like a proxy contract</span>
                                                    </li>
                                                }
                                                {checkData.note > 0 &&
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={success} />
                                                        <span className="sucess" data-v-5a60c796="">LP is locked</span>
                                                    </li>
                                                }
                                            </ul>
                                        </div>

                                        {/* {checkData.buy_tax > 0 && */}
                                        <div className="card" data-v-5a60c796="">
                                            <h3 className="card-h" data-v-5a60c796="">Trade & Liquidity</h3>
                                            <ul data-v-5a60c796="" className='tradeliquuid'>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Buy Tax</span>
                                                    <span className="danger" data-v-5a60c796="">{Math.round(checkData.buy_tax)}%</span>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Sell Tax</span>
                                                    <span className="danger" data-v-5a60c796="">{Math.round(checkData.sell_tax)}%</span>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">Active (transaction) address</span>
                                                    <span className="sucess" data-v-5a60c796="">{checkData.wallet_count_24h_buy + checkData.wallet_count_24h_sell}</span>
                                                </li>
                                                <li className="card-list-item" data-v-5a60c796="">
                                                    <span data-v-5a60c796="">24h tx count</span>
                                                    <span className="sucess" data-v-5a60c796="">{checkData.count_24h_buy + checkData.count_24h_sell}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* // } */}
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
                                            <ul data-v-5a60c796="" className='tokenHolder'>
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
                                            <ul data-v-5a60c796="" className='poolInfo'>
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
                                        {checkData.is_anti_whale > 0 &&
                                            <div className="card" data-v-5a60c796="">
                                                <h3 className="card-h" data-v-5a60c796="">Attention</h3>
                                                <ul data-v-5a60c796="">
                                                    <li className="card-list-item" data-v-5a60c796="">
                                                        <img className="icon-svg" src={warning} />
                                                        <span className="warning" data-v-5a60c796="">Is anti whale</span>
                                                        {/* <span data-v-5a60c796="">Is anti whale</span> */}
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                            </div>
                        </div>
                        {/* <div className="el-row" data-v-5a60c796="" style={{ marginLeft: '-10px', marginRight: '-10px', color: '#fff', display:'none' }}>
                            {Object.keys(checkData).length > 0 &&
                                <div className="Home_section__16Giz" style={{ minHeight: '11em' }}>
                                    <h2 className='ExtraInfoBlock__DescriptionHeader' style={{ padding: '1rem' }}>
                                        ABOUT
                                    </h2>

                                    <table style={{ marginBottom: '1em' }}>
                                        <tbody>
                                            <tr>
                                                <td className="Home_subtitle__3I2yI" colSpan="2">Summary</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="Home_note__1UGB7">The risk score {checkData.risk_score}/100 is a measure of how well the token contract and characteristics meet the criteria for safety.  Results may not be applicable if the token is in presale.  Automated scanners like this one are limited and not always completely accurate.  <b>A token with a high score may still have hidden malicious code.</b> The score is not advice and should be considered along with other factors. Always do your own research and consult multiple sources of information.</td></tr>
                                        </tbody>
                                    </table>
                                    <table className="Home_compact__2top4" style={{ marginBottom: '1em' }}>
                                        <tbody>
                                            <tr>
                                                <td className="Home_subtitle__3I2yI" colSpan="2">Swap Analysis <small style={{ color: 'gray', paddingLeft: '0.5em', fontSize: 'smaller' }}>(courtesy of <a className="Home_link__mABeA" href="https://honeypot.is/" target="_blank">honeypot.is)</a></small>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Token is sellable (not a honeypot) at this time</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Buy fee is less than 10% ({checkData.buy_tax}%)</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Sell fee is less than 10% ({checkData.sell_tax.toFixed(0)}%)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="Home_compact__2top4">
                                        <tbody>
                                            <tr>
                                                <td className="Home_subtitle__3I2yI" colSpan="2">Contract Analysis</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Verified contract source</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Ownership renounced or source does not contain an owner contract</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Creator not authorized for special permission</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="Home_compact__2top4">
                                        <tbody>
                                            <tr>
                                                <td className="Home_subtitle__3I2yI" colSpan="2">
                                                    <br />Holder Analysis<small style={{ marginLeft: '1.5em', fontWeight: 'normal' }}>
                                                    </small>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>—</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Tokens burned: 14.43%, total supply: {parseFloat(checkData.total).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Creator wallet contains less than 5% of circulating token supply (0.57%)</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>All other holders possess less than 5% of circulating token supply</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="Home_compact__2top4" style={{ display: 'none' }}>
                                        <tbody>
                                            <tr>
                                                <td className="Home_subtitle__3I2yI" colSpan="2"><br />Liquidity Analysis</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Adequate current liquidity </td>
                                            </tr>

                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}><span style={{ color: 'red' }}>✘</span></td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Adequate initial liquidity</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <div className="Home_note__1UGB7">
                                                        <div style={{ paddingBottom: '0.6em' }}>600 ETH in Uniswap v2</div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <table className="Home_compact__2top4">
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="Home_note__1UGB7">Not enough liquidity is locked/burned which could allow for significant amounts to be removed (rug pull).
                                                    <div>NOTE: this test only checks well-known lockers and will not accurately represent locked liquidity from custom locking/vesting contracts.</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '1.4em', fontSize: '1.5em' }}>✔</td>
                                                <td className="Home_mono2__1lWiC" style={{ verticalAlign: 'middle' }}>Creator wallet contains less than 5% of liquidity (0%)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div> */}
                    </div>
                </section>
            </main>
        </>
    )
}

export default CheckComponent;