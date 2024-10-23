import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';

const StockChart = ({ stockChartData, fromDate, setFromDate, toDate, setToDate, handleAnalyzeClick }) => {
    const [view, setView] = useState('daily');
    const [hoveredData, setHoveredData] = useState(null);

    useEffect(() => {
        initializeChartView(view);
    }, [view, stockChartData, fromDate, toDate]);

    const prepareData = () => {
        let parsedData = stockChartData;

        if (view === 'weekly') {
            parsedData = aggregateData(stockChartData, 'week');
        } else if (view === 'monthly') {
            parsedData = aggregateData(stockChartData, 'month');
        }

        return parsedData;
    };

    const aggregateData = (data, period) => {
        const aggregatedData = d3.group(data, d => {
            if (period === 'week') return d3.timeWeek(d.date);
            if (period === 'month') return d3.timeMonth(d.date);
        });

        return Array.from(aggregatedData, ([key, values]) => {
            return {
                date: key,
                open: values[0].open,
                high: d3.max(values, d => d.high),
                low: d3.min(values, d => d.low),
                close: values[values.length - 1].close,
                volume: d3.sum(values, d => d.volume)
            };
        });
    };

    const initializeChartView = (view) => {
        const chartData = prepareData();

        // Clear any existing SVG
        d3.select("#chart").selectAll("*").remove();

        // Setup the chart
        const margin = {top: 20, right: 60, bottom: 30, left: 50};
        const width = 750 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Setup scales
        const x = d3.scaleTime()
            .domain(d3.extent(chartData, d => d.date))
            .range([0, width]);

        const yPrice = d3.scaleLinear()
            .domain([d3.min(chartData, d => d.low), d3.max(chartData, d => d.high)])
            .range([height, 0]);

        const yVolume = d3.scaleLinear()
            .domain([0, d3.max(chartData, d => d.volume)])
            .range([height, height * 0.5]);

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("path, line, text")
            .attr("stroke", "#111827");

        // Add Y axis for price
        svg.append("g")
            .call(d3.axisLeft(yPrice))
            .selectAll("path, line, text")
            .attr("stroke", "#111827");

        // Draw line for stock prices (close values)
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => yPrice(d.close));

        svg.append("path")
            .datum(chartData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        // Draw bars for volume
        svg.selectAll(".bar")
            .data(chartData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.date) - (width / chartData.length) * 0.2)
            .attr("y", d => yVolume(d.volume))
            .attr("width", width / chartData.length * 0.5)
            .attr("height", d => height - yVolume(d.volume))
            .attr("fill", "rgba(17,24,39,0.13)")
            .attr("opacity", 0.5);

        // Add hover circles and tooltips
        const tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute");

        svg.selectAll(".dot")
            .data(chartData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.date))
            .attr("cy", d => yPrice(d.close))
            .attr("r", 5)
            .attr("fill", "#636e72")
            .on("mouseover", (event, d) => {
                setHoveredData(d);
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`
          <strong>Date:</strong> ${d.date.toDateString()}<br>
          <strong>Open:</strong> ${d.open}<br>
          <strong>High:</strong> ${d.high}<br>
          <strong>Low:</strong> ${d.low}<br>
          <strong>Close:</strong> ${d.close}<br>
          <strong>Volume:</strong> ${d.volume}
        `)
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(500).style("opacity", 0);
                setHoveredData(null);
            })
            .on("click", (event, d) => {
                if (!fromDate) {
                    setFromDate(d.date);
                } else if (!toDate) {
                    if (d.date.toISOString().split('T')[0] < fromDate.toISOString().split('T')[0]) {
                        setFromDate(d.date);
                        setToDate(fromDate);
                    } else {
                        setToDate(d.date);
                    }
                } else {
                    setFromDate(d.date);
                    setToDate(null);
                }
            });
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center chart-container">
                <div className="space-x-4 m-4">
                    <button
                        className="bg-gray text-white px-4 py-2 rounded"
                        onClick={() => setView('daily')}
                    >
                        Daily
                    </button>
                    <button
                        className="bg-gray text-white px-4 py-2 rounded"
                        onClick={() => setView('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className="bg-gray text-white px-4 py-2 rounded"
                        onClick={() => setView('monthly')}
                    >
                        Monthly
                    </button>
                </div>
                <div id="chart"></div>

                <div style={{display: 'flex', gap: '20px', marginTop: '20px', minWidth: '400px'}}>
                    {fromDate && (
                        <div style={{flex: 1}}>
                            <div className="text-base leading-7 text-gray-600">From Date</div>
                            <div
                                className="order-first text-1xl font-semibold tracking-tight text-gray-900 sm:text-1xl">
                                {fromDate.toISOString().split('T')[0]}
                            </div>
                        </div>
                    )}
                    {toDate && (
                        <div style={{flex: 1}}>
                            <div className="text-base leading-7 text-gray-600">To Date</div>
                            <div
                                className="order-first text-1xl font-semibold tracking-tight text-gray-900 sm:text-1xl">
                                {toDate.toISOString().split('T')[0]}
                            </div>
                        </div>
                    )}

                    {fromDate && toDate && (
                        <button
                            className="bg-gray text-white px-4 py-2 rounded"
                            onClick={handleAnalyzeClick}
                        >
                            Analyze
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockChart;