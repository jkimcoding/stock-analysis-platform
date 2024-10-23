import NavBar from "./components/NavBar.jsx";
import App from "./App.jsx";
import PlatformDescription from "./components/PlatformDescription.jsx";
import {useState} from "react";

const MainApp = () => {
    const [currentTab, setCurrentTab] = useState('main');

    return (
        <>
            <NavBar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />
            {currentTab === 'main' && <App />}
            {currentTab === 'platformDescription' && <PlatformDescription />}
        </>
    );
};

export default MainApp;
