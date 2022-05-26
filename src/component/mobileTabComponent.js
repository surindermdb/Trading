import { faHome, faCircleInfo, faExchange } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState,useEffect} from 'react';

const MobileTabComponent =()=>{

  const [currentPath,setCurrentPath]=useState('/market');
  
  useEffect(() => {
    let path = window.location.pathname.split('/')[1];
    setCurrentPath(path);
  });

  // currentPath == 'pool' ? "nav-item active" : "nav-item"

  return(
    <div role="tablist" className="van-tabbar van-tabbar--fixed van-safe-area-bottom tabs" data-v-ecf7ecd4="" style={{zIndex: '4', paddingBottom: '0px'}}>
                <div role="tab" className={`van-tabbar-item ${currentPath == '' || currentPath == 'token'?"van-tabbar-item--active" : ""}`}  tabindex="0" aria-selected="true" data-v-ecf7ecd4="" style={{color: 'rgb(85, 139, 237)'}}>
                    <div className="van-badge__wrapper van-tabbar-item__icon">
                        <i className="van-badge__wrapper iconfont icon iconfont icon-hangqing">
                          <FontAwesomeIcon icon={faHome} />
                        </i>
                    </div>
                    <div className="van-tabbar-item__text"><a href="/" data-v-04096ca8="">Home</a></div>
                </div>
                <div role="tab" className={`van-tabbar-item ${currentPath == 'pool' ? "van-tabbar-item--active" : ""}`} tabindex="0" aria-selected="false" data-v-ecf7ecd4="" style={{color: 'rgb(135, 143, 188)'}}>
                    <div className="van-badge__wrapper van-tabbar-item__icon">
                        <i className="van-badge__wrapper iconfont icon iconfont icon-zixuan">
                          <FontAwesomeIcon icon={faExchange} />
                        </i>
                    </div>
                    <div className="van-tabbar-item__text"><a href="/pool" data-v-04096ca8="">New Pool</a></div>
                </div>
                <div role="tab" className={`van-tabbar-item ${currentPath == 'check' ? "van-tabbar-item--active" : ""}`} tabindex="0" aria-selected="false" data-v-ecf7ecd4="" style={{color: 'rgb(135, 143, 188)'}}>
                    <div className="van-badge__wrapper van-tabbar-item__icon">
                        <i className="van-badge__wrapper iconfont icon iconfont icon-jiance">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </i>
                    </div>
                    <div className="van-tabbar-item__text"><a href="/check" data-v-04096ca8="">Check</a></div>
                </div>
                
            </div>
  )
   
}

export default MobileTabComponent;