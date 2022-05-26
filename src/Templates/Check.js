import HeaderSection from '../Header-Footer/Header_new';
import { useEffect, useState } from 'react';
import { getRequest } from "../Action";
import { APIURL, BSCURL,HOST } from "../config";
import CheckComponent from '../component/CheckComponent';
import MobileTabComponent from '../component/mobileTabComponent';

const Check = () => {

    const [mobileView, setMobileView] = useState(false);
    useEffect(() => {
        if (window.screen.width < 768) {
            setMobileView(true);
        }
        window.addEventListener('resize', function (event) {
            if (window.screen.width < 768) {
                setMobileView(true);
            }
            else {
                setMobileView(false);
            }
        }, true);
        window.onclick = function (event) {
            if (event.target.id !== 'txtToken' && event.target.id !== 'searcht' 
            && event.target.id !== 'mtxtToken' && event.target.id !== 'van-search-15-input'
            && event.target.id !== 'btnsrch' && event.target.id !== 'btnsrch'
            && event.target.id !== 'mbtnsrch' && event.target.id !== 'mbtnsrch') {
                let popup = document.getElementById('dialogcontainer');
                popup.style.display = "none";

            }
            else {
                let popup = document.getElementById('dialogcontainer');
                popup.style.display = "block";

            }
        }

    }, []);

    const changeMapWithSymbol = (item, symbol) => {
        const nextURL = HOST+'/token/' + item.address;
        const nextTitle = 'poocoin';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.pushState(nextState, nextTitle, nextURL);
        window.location.href=nextURL;
    }

    return (

        <>
            <HeaderSection changeMapWithSymbol={changeMapWithSymbol} />
            <CheckComponent />
            {mobileView && 
            <MobileTabComponent />
            }
        </>
    )
}

export default Check;
