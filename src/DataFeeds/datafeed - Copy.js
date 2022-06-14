import {
	makeApiRequest,
	generateSymbol,
	parseFullSymbol,
	makeApiRequestForSymbol,
	generateExchangeSymbol
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';
import { getRequest,getRequestKline } from "../Action";
import { APIURL } from "../config";

let ownData=null;

const lastBarsCache = new Map();

const configurationData = {
	supported_resolutions: ['1', '5', '15', '60', '240', '1D', '1W','1M'],
	exchanges: [{
			value: 'Bitfinex',
				name: 'Bitfinex',
			desc: 'Bitfinex',	
		},
		{
			value: 'Binance',
			name: 'Binance',
			desc: 'Binance',
		},
		{
			value: 'NYSE',
			name: 'NYSE',
			desc: 'NYSE',
		},
		{
			value: 'Ethermium',
			name: 'Ethermium',
			desc: 'Ethermium',
		},{
			name : 'Poloniex',
			value :'Poloniex'
		}
	],
	symbols_types: [{
		name: 'crypto',
		value: 'crypto'
	},
	{
		name: 'stock',
		value: 'stock'
	},
	{
		name: 'forex',
		value: 'forex'
	},
	{
		name: 'futures',
		value: 'futures'
	},
	{
		name: 'index',
		value: 'index'
	},
		// ...forex,futures,index
	],
};

async function getAllSymbols() {
	const data = await makeApiRequest('data/v3/all/exchanges');
	let allSymbols = [];

	for (const exchange of configurationData.exchanges) {
		if(data.Data[exchange.value] !=undefined){
			const pairs = data.Data[exchange.value].pairs;

			for (const leftPairPart of Object.keys(pairs)) {
				const symbols = pairs[leftPairPart].map(rightPairPart => {
					const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
					return {
						symbol: symbol.short,
						full_name: symbol.full,
						description: symbol.short,
						exchange: exchange.value
					};
				});
				allSymbols = [...allSymbols, ...symbols];
			}
		}
		
	}
	return allSymbols;
}

async function getAllExchangeSymbols(symbolName) {
	let symbol= symbolName.split('/')[0];
	const data = await makeApiRequestForSymbol('data/v2/pair/mapping/fsym?fsym='+symbol+'&api_key=0819abaa220513dd813a2561a56c534b013d25b75e3f15fc5f3282e10d75d1d0');
	let allSymbols = [];
	if(data.Data.current != undefined){
		for (const obj of data.Data.current) {
			const symbol = generateExchangeSymbol(obj.exchange, obj.fsym, obj.tsym);
			let	returnobj= {
					name:obj.fsym,
					symbol: symbol.short,
					full_name: symbol.full,
					description: symbol.short,
					exchange: obj.exchange
				};
			allSymbols.push(returnobj);
		}
	}
	
	return allSymbols;
}

export default {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		let symbol = localStorage.getItem('symbol');
		console.log('[resolveSymbol]: Method call', symbol);
		const symbols = await getAllExchangeSymbols(symbol);
		const symbolItem = symbols.find(({
			name,
		}) => name === symbol);
		if (!symbolItem) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbol);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		const symbolInfo = {
			ticker: symbolItem.symbol.split('/')[0],
			name: symbolItem.symbol.split('/')[0],
			description: symbolItem.description.split('/')[0],
			// type: symbolItem.type,
			session: '24x7',
			timezone: 'Asia/Kolkata',
			format: 10,
fractional: false,
			// exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 10000000,
			has_daily: true,
			has_intraday: true,
			has_no_volume: false,
			has_weekly_and_monthly: true,
			minmov2: 0,
			// intraday_multipliers:['1', '5', '15', '60', '240'],
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 10,
			data_status: 'streaming',
			full_name:symbolItem.full_name
		};

		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		const { from, to, firstDataRequest } = periodParams;
		console.log('[getBars]: Method call', symbolInfo, resolution, from, to, firstDataRequest);
		const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
		// if(ownData!=null){
		// 	return;
		// }
		const urlParameters = {
			fsym: parsedSymbol.fromSymbol,
			tsym: 'USDT',//parsedSymbol.toSymbol,
			toTs: to,
			limit: 2000,
		};
		const query = Object.keys(urlParameters)
			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
			.join('&');
		try {
			// const data = await makeApiRequest(`data/histoday?${query}`);
			// if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
			// 	// "noData" should be set if there is no data in the requested period.
			// 	onHistoryCallback([], {
			// 		noData: true,
			// 	});
			// 	return;
			// }
			let pairAddress= localStorage.getItem('poolPair');
			if(resolution == '1D'){
				resolution=1440;
			}
			else if(resolution == '1W'){
				resolution = 10080;
			}
			let params='address='+pairAddress + '&resolution='+resolution;
			let klinedata = await getRequestKline(APIURL + 'kline?', params);
			let bars = [];
			if(klinedata.length < 400){

				let obj={
					time: 0,
					low: 0,
					high: 0,
					open: 0,
					close: 0
				}
				let loopTime = 410-klinedata.length;

				for(let i=0; i< loopTime; i++){
					bars.push(obj);
				}
				// const data = await makeApiRequest(`data/histoday?${query}`);
				// if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
				// 	// "noData" should be set if there is no data in the requested period.
				// 	onHistoryCallback([], {
				// 		noData: true,
				// 	});
				// 	return;
				// }
				// klinedata=data.Data;
			}

			// console.log('======= crypto data', data.Data)
			// let bars = klinedata;
			
			klinedata.forEach(bar => {
				if (bar.time >= from && bar.time < to) {
					bars = [...bars, {
						time: bar.time * 1000,
						low: bar.low,
						high: bar.high,
						open: bar.open,
						close: bar.close,
					}];
				}

			});
			if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.name, {
					...bars[bars.length - 1],
				});
				console.log(`[getBars]: returned ${bars.length} bar(s)`);
				onHistoryCallback(bars, {
					noData: false,
				});
			}
			
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
		ownData=null;
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
