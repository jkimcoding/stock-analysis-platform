import React, { useState } from 'react';
import Diagram from "../images/ApplicationFunctionalityVisualization.png"
import Search from "../images/Search.gif"
import RenderChart from "../images/RenderChart.gif"
import SelectDates from "../images/SelectDates.gif"
import Analysis from "../images/Analysis.gif"
import PromptCode from "../images/PromptCode.png"

const PlatformDescription = () => {
    const [techStack] = useState({
        frontend: ['Vue', 'React'],
        frontendLibraries: ['Chart.js', 'D3.js'],
        backend: ['Java', 'Spring Boot'],
        apis: [
            { name: 'Stock Chart API', link: 'https://www.alphavantage.co/documentation/' },
            { name: 'The Times_Daily', link: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo' },
            { name: 'Financial News API', link: 'https://iexcloud.io/docs/api/' },
            { name: 'Top Gainers API', link: 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesla&apikey=YOUR_API_TOKEN' }
        ]
    });


    return (
        <div className="description-container">
            <section className="section">
                <h1 className="description-header">Introduction</h1>
                <p>
                    This application analyzes stock prices and gives information about stock prices at certain points.
                    Using AI technology, we can accurately analyze the factors that influence stock prices.
                    Through the application, people can learn more about what factors influence stock prices and uncover
                    the mysteries about the stock market.


                </p>
            </section>


            <section className="section">
                <h1 className="description-header">Purpose</h1>
                <p>
                    This application is intended for people learning about stocks and people needing information about
                    stocks, especially high school students through presenting the elements that influence stock prices.
                    By introducing stocks in a more approachable way, people, especially of the younger generations, can
                    be more financially literate.
                </p>
            </section>


            <section className="section">
                <h1 className="description-header">Architecture and Functionality Overview</h1>
                <h3 className="description-subheader">1. Data Collection</h3>
                <ul>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Stock Market Data API:</strong> The Alpha Vantage Finance API will be utilized to fetch daily stock data for a given ticker including open price, highest price, lowest price, close price, and volume.
                    </li>
                </ul>


                <h3 className="description-subheader">2. Data Analysis</h3>
                <ul>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Retrieve News Articles:</strong> News articles between the time period are obtained through the Polygon.io API.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Give Prompt:</strong> Ask Gemini AI
                        to analyze the stock prices using a prompt.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Receive Analysis:</strong> When the
                        analysis is formed, the application will receive it and include the retrieved news articles for reporting.
                    </li>
                </ul>


                <h3 className="description-subheader">3. Comprehensive Report Generation</h3>
                <ul>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Charts and Graphs:</strong> The
                        application generates informative and visually appealing charts and graphs to illustrate stock
                        prices, financial metrics, and other relevant data.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Summary and
                        Explanation:</strong> The provided analysis will be clear and concise, displaying the factors
                        that influence the stock performance. The analysis will clarify the information, making it
                        easily understood.
                    </li>
                </ul>
            </section>


            <section className="section">
                <h1 className="description-header">Key Features</h1>
                <ul>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Real-Time Data
                        Collection:</strong> Ensures students have access to the most up-to-date and relevant
                        information about the stocks.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>AI-Powered
                        Analysis:</strong> Utilizes advanced AI to process and analyze large volumes of data efficiently
                        and accurately.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Educational
                        Content:</strong> Provides explanations and summaries that are easy to understand, making
                        complex financial concepts accessible to students.
                    </li>
                    <li style={{listStyleType: 'disc', marginLeft: '20px'}}><strong>Interactive
                        Visualization:</strong> Engaging charts and graphs that help visualize data and trends.
                    </li>
                </ul>
            </section>


            <section className="section">
                <h1 className="description-header">Programs</h1>
                <ul>
                    <li><strong className="green-color">Frontend:</strong> React, Javascript, NPM, and Vite.
                    </li>
                    <li><strong className="green-color">Backend:</strong> Java, Spring Boot, and Maven.
                    </li>
                    <li><strong className="green-color">APIs:</strong> Alphavantage, Polygon.io, and Gemini.
                    </li>
                </ul>
            </section>


            <section className="section">
                <h1 className="description-header">Application Steps</h1>
                <ul>
                    <li><strong className="green-color">1. Type Company:</strong> Type a company's name or ticker.
                    </li>
                    <li><strong className="green-color">2. Search:</strong> Click on the suggestions below and search.
                        <div>
                            <img src={Search} width={1000} style={{width: '60%', height: 'auto'}}/>
                        </div>
                    </li>
                    <li><strong className="green-color">3. Request Data:</strong> Request stock data from Alphavantage
                        API at <a
                            href="https://www.alphavantage.co/documentation/#dailyadj">https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=[ticker]&outputsize=compact&apikey=[apiKey]</a>.
                    </li>
                    <li><strong className="green-color">4. Receive Data:</strong> Alphavantage API sends stock data to the backend.
                    </li>
                    <li><strong className="green-color">5. Send Data:</strong> Send the stock data to the frontend.
                    </li>
                    <li><strong className="green-color">6. Render Chart:</strong> Render stock chart using stock data.
                        <div>
                            <img src={RenderChart} width={1000} style={{width: '60%', height: 'auto'}}/>
                        </div>
                    </li>
                    <li><strong className="green-color">7. Choose Dates:</strong> Click on the start and end date for
                        the analysis.
                        <div>
                            <img src={SelectDates} width={1000} style={{width: '60%', height: 'auto'}}/>
                        </div>
                    </li>
                    <li><strong className="green-color">8. Click Analyze:</strong> Ask the application to analyze the
                        stocks.
                    </li>
                    <li><strong className="green-color">9. Request News Articles:</strong> Request news articles from
                        Polygon.io between time period at <a
                            href="https://polygon.io/docs/stocks/get_v2_reference_news">https://api.polygon.io/v2/reference/news?ticker=[ticker]&apiKey=[apiKey]&published_utc.gte=[fromDate]&published_utc.lte=[toDate]</a>.
                    </li>
                    <li><strong className="green-color">10. Receive News Articles:</strong> Polygon.io API sends the news articles to the backend.
                    </li>
                    <li><strong className="green-color">11. Build Prompt:</strong> Create a prompt using the given stock
                        chart data, news article.
                        <br/>
                        <br/>
                        <p>
                            The prompt will be created with the following structure:
                        </p>
                        <div>
                            <img src={PromptCode} width={1000} style={{width: '60%', height: 'auto'}}/>
                        </div>
                    </li>
                    <br/>
                    <li><strong className="green-color">12. Ask Gemini for Analysis:</strong> Give Gemini a prompt for
                        the analysis at <a
                            href="https://ai.google.dev/gemini-api/docs">https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=[apiKey]</a>.
                    </li>
                    <li><strong className="green-color">13. Receive Analysis:</strong> Get the analysis from Gemini.
                    </li>
                    <li><strong className="green-color">14. Send Analysis:</strong> Send the analysis to the frontend.
                    </li>
                    <li><strong className="green-color">15. Present Information:</strong> Put the analysis and news articles on the screen
                        to show.
                        <div>
                            <img src={Analysis} width={1000} style={{width: '60%', height: 'auto'}}/>
                        </div>
                    </li>
                </ul>
            </section>


            <section className="section">
                <h1 className="description-header">Application Functionality Visualization with Frontend, Backend, and APIs</h1>
                <br/>
                <div>
                    <img src={Diagram} width={1000} style={{width: '80%', height: 'auto'}}/>
                </div>
            </section>


        </div>
    );
};


export default PlatformDescription;

