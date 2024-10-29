import React from 'react';
import './App.scss';
import { MainWeatherPage } from "./pages/MainWeather";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

function App() {
  return (
    <div className="App">
      <MainWeatherPage />
    </div>
  );
}

export default App;
