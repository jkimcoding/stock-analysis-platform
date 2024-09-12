import {useState} from 'react'
import './App.css'
import {getData} from "./utils/api.js";

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getData('/api/scrape');
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={fetchData}>Click to fetch data from backend</button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && (
                <div>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </>
    )
}

export default App
