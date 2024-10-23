import {useState} from 'react';
import {getData, postData} from "./utils/api.js";
import {dummyStockChartData} from "./data/dummyStockChartPayload.js";
import {companies} from "./data/listOfCompanies.js";
import StockChart from "./components/StockChart.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NavBar from "./components/NavBar.jsx";

const gResponse = {
    "overallSentiment": "Neutral",
    "keyDrivers": [
        "Production ramp-up at Gigafactory Texas",
        "Cybertruck launch and production plans",
        "Tesla's pricing strategy and demand",
        "Competition from other EV manufacturers",
        "Elon Musk's influence and social media activity",
        "Regulatory and policy changes impacting the EV industry",
        "Overall economic conditions and market sentiment"
    ],
    "positiveSentiment": [
        "News of production ramp-up at Gigafactory Texas, suggesting strong demand for Tesla vehicles and potential for increased revenue",
        "Positive investor reactions to Cybertruck launch and production plans, hinting at excitement for the new model and its potential impact",
        "Tesla's strong sales figures and market share in the EV market"
    ],
    "negativeSentiment": [
        "Concerns regarding Tesla's pricing strategy and its impact on demand",
        "Growing competition from other EV manufacturers such as Rivian and Lucid Motors",
        "Elon Musk's volatile tweets and pronouncements, potentially creating market uncertainty"
    ],
    "newsHighlights": [
        "Tesla announces production ramp-up at Gigafactory Texas, boosting EV output and signaling increased demand",
        "Cybertruck production plans take shape, generating excitement and anticipation among investors and consumers",
        "Tesla faces rising competition from other EV manufacturers, intensifying the battle for market share",
        "Elon Musk's social media activity continues to influence Tesla's stock performance"
    ],
    "overallSummary": "TSLA stock has been experiencing mixed signals. While positive developments such as production ramp-up at Gigafactory Texas and Cybertruck production plans are generating optimism, concerns about pricing strategy and competition from other EV manufacturers are creating some market uncertainty. Elon Musk's social media activity continues to be a significant factor, potentially both driving and dampening investor sentiment. Overall, the stock's performance remains dependent on a balance between positive news and potential challenges within the rapidly evolving EV landscape."
}

const App = () => {
    const [stockChartData, setStockChartData] = useState(null);
    const [stockChartLoading, setStockChartLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [fromDate, setFromDate] = useState(() => {
        const savedFromDate = localStorage.getItem('fromDate');
        return savedFromDate ? new Date(savedFromDate) : null;
    });
    const [toDate, setToDate] = useState(() => {
        const savedToDate = localStorage.getItem('toDate');
        return savedToDate ? new Date(savedToDate) : null;
    });
    const [geminiResponse, setGeminiResponse] = useState(null);
    const [geminiLoading, setGeminiLoading] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (selectedCompany) {
            fetchStockChartByTicker(selectedCompany.ticker)
                .then(r => console.log(''));
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filteredSuggestions = companies.filter(company =>
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.ticker.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const fetchStockChartByTicker = async (ticker) => {
        setStockChartLoading(true);
        setError(null);
        try {
            //const response = await getData(`/api/v1/stock-chart?symbol=${ticker}`);
            const response = dummyStockChartData;
            const parsedData = parseStockChartData(response.data);
            setStockChartData(parsedData);
        } catch (error) {
            setError(error.message);
        } finally {
            setStockChartLoading(false);
        }
    };

    const filterByDateRange = (data) => {
        return data.filter(item => {
            const date = new Date(item.date);
            return date >= new Date(fromDate) && date <= new Date(toDate);
        });
    }

    const parseStockChartData = (data) => {
        return Object.keys(data['timeSeries'])
            .map((date) => ({
                date: new Date(date),
                open: parseFloat(data['timeSeries'][date]['1. open']),
                high: parseFloat(data['timeSeries'][date]['2. high']),
                low: parseFloat(data['timeSeries'][date]['3. low']),
                close: parseFloat(data['timeSeries'][date]['4. close']),
                volume: parseInt(data['timeSeries'][date]['5. volume']),
            }));
    }

    const handleAnalyzeClick = async () => {
        setGeminiLoading(true)
        if (selectedCompany && fromDate && toDate) {
            try {
                /*const response = await postData('/api/v1/ask-gemini', {
                    symbol: selectedCompany.ticker,
                    fromDate: formatDate(fromDate),
                    toDate: formatDate(toDate),
                    stockChartData: filterByDateRange(stockChartData)
                });*/
                const response = gResponse;
                //console.log("GEMINI RESPONSE:", response.data)
                setGeminiResponse(response);
            } catch (error) {
                console.error('Error during analysis:', error);
            } finally {
                setGeminiLoading(false);
            }
        }
    };

    const formatDate = (date) => date.toISOString().split('T')[0];

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setSuggestions([]);
        setSelectedCompany(suggestion);
    };

    return (
        <>
            <SearchBar
                query={query}
                suggestions={suggestions}
                handleInputChange={handleInputChange}
                handleSuggestionClick={handleSuggestionClick}
                handleSearchSubmit={handleSearchSubmit}
            />

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Column for Stock Chart */}
                <div style={{ flex: 1 }}>
                    {stockChartLoading && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Loading...</p>
                        </div>
                    )}
                    {!stockChartLoading && stockChartData && (
                        <>
                            <h1>
                                The responses are demo only.
                            </h1>
                            <StockChart
                                stockChartData={stockChartData}
                                fromDate={fromDate}
                                setFromDate={setFromDate}
                                toDate={toDate}
                                setToDate={setToDate}
                                handleAnalyzeClick={handleAnalyzeClick}
                            />
                        </>

                    )}
                </div>

                {/* Column for Gemini Response (Increased flex to take up more space) */}
                <div style={{ flex: 2 }}>
                    {geminiLoading && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Analyzing...</p>
                        </div>
                    )}
                    {!geminiLoading && geminiResponse && (
                        <div
                            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none  lg:items-start lg:gap-y-10">
                            <div
                                className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl  lg:gap-x-8 lg:px-8">
                                <div className="lg:pr-4">
                                    <div className="lg:max-w-lg">
                                        <p className="text-base font-semibold leading-7" style={{ color: "#1e3799"}}>Stock Market
                                            Analysis</p>
                                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                            {selectedCompany.name}
                                        </h1>

                                        <div>
                                            <p><strong>Analysis Date
                                                Range:</strong> {formatDate(fromDate)} - {formatDate(toDate)}</p>

                                            <p><strong>Overall Sentiment:</strong> {geminiResponse.overallSentiment}</p>
                                            <div className="p-top ">
                                                <h4><strong>Key Drivers:</strong></h4>
                                                <ul style={{ listStyleType: 'disc', marginLeft: '10px' }}>
                                                    {geminiResponse.keyDrivers.map((driver, index) => (
                                                        <li key={index}>{driver}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-top ">
                                                <h4><strong>Positive Sentiment:</strong></h4>
                                                <ul style={{ listStyleType: 'disc', marginLeft: '10px' }}>
                                                    {geminiResponse.positiveSentiment.map((positive, index) => (
                                                        <li key={index}>{positive}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-top ">
                                                <h4><strong>Negative Sentiment:</strong></h4>
                                                <ul style={{ listStyleType: 'disc', marginLeft: '10px' }}>
                                                    {geminiResponse.negativeSentiment.map((negative, index) => (
                                                        <li key={index}>{negative}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-top ">
                                                <h4><strong>News Highlights:</strong></h4>
                                                <ul style={{ listStyleType: 'disc', marginLeft: '10px' }}>
                                                    {geminiResponse.newsHighlights.map((highlight, index) => (
                                                        <li key={index}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-top ">
                                                <h4><strong>Overall Summary:</strong></h4>
                                                <p>{geminiResponse.overallSummary}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default App;