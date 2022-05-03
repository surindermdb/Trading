import { createChart } from 'lightweight-charts';

const LightWeightChart = () => {
    const chart = createChart(document.body, { width: 400, height: 300 });
    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData([
        // ... other data items
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ]);
}

export default LightWeightChart