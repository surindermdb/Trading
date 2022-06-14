import { useState, useEffect } from 'react';
import Datafeed from '../DataFeeds/datafeed';
import exhangeJson from '../DataFeeds/exchange.json';
import {
	makeApiRequest
} from '../DataFeeds/helpers.js';
import { BarWave,FadingBalls } from "react-cssfx-loading";
// import api from '../api'


const TVChartContainer = (props) => {

	const [symbol, setSymbol] = useState('');
	const [load, setLoad] = useState(false);

	useEffect(() => {
		renderWidget();
		setLoad(false);
	},[props.symbol, props.klinePair]);

	// [props.symbol, props.klinePair]

	const getLanguageFromURL = () => {
		const regex = new RegExp('[\\?&]lang=([^&#]*)');
		const results = regex.exec(window.location.search);
		return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	const createExchangeArray = () => {

		let exchanges = [];
		for (let exchnage of Object.keys(exhangeJson.Data)) {
			let obj = { name: exchnage, value: exchnage };
			exchanges.push(obj);
		}
		console.log('===Exchange array========', exchanges);
		return exchanges;
	}

	async function getAllSymbols() {
		const data = await makeApiRequest('data/v2/pair/mapping/fsym?fsym=' + props.symbol);
		console.log(data);
		return;
		let allSymbols = [];

		return allSymbols;
	}

	const option = {
		interval: '1D',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com,',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	const renderWidget = async () => {
		let container = document.querySelector('.TVChartContainer');
		// let symbol = await getAllSymbols();
		// console.log(symbol)
		// return;
		localStorage.setItem('symbol',props.symbol);
		const widgetOptions = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			// datafeed: new window.Datafeeds.UDFCompatibleDatafeed(option.datafeedUrl),
			datafeed: Datafeed,
			interval: option.interval,
			container: container,
			library_path: option.libraryPath,
			disabled_features: ["use_localstorage_for_settings", "header_symbol_search", "symbol_search_hot_key"],
			locale: getLanguageFromURL() || 'en',
			fullscreen: option.fullscreen,
			autosize: option.autosize,
			studies_overrides: option.studiesOverrides,
			theme: 'Dark',
			clientId: option.clientId,
			
		};

		const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
		// widget.applyOptions({

		// 	handleScroll: {
		// 		vertTouchDrag: false,
		// 		mouseWheel: false,
		// 		pressedMouseMove: false
		// 	},

		// });

		widget.onChartReady(() => {
			setLoad(true);
			setSymbol(props.symbol);
			console.log('Chart has loaded!')
		});
		// const tvWidget = new widget(widgetOptions);
		

	}

	return (
		<>
			<div className='TVChartContainer' style={{display: load==true?'block':'none'}} />
			<div className='TV_Chart_Container' style={{display: load==false?'block':'none'}} >
				<FadingBalls  />
			</div>
		</>
	);

}

export default TVChartContainer;