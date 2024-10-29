import {Line} from "react-chartjs-2";
import {IDailyForecast} from "../types/types";
import {formatUnixDate} from "../utils/utils";
import "../App.scss";

interface WeatherChartProps {
    weatherData: IDailyForecast[]
}

const WeatherChart = ({weatherData}: WeatherChartProps) => {
	const labels = weatherData.map((day: IDailyForecast) => formatUnixDate(day.dt));

	const tempData = {
		labels: labels,
		datasets: [
			{
				label: "Teplota (°C)",
				data: weatherData.map((day: IDailyForecast) => Math.round(day.temp.day)),
				fill: false,
				borderColor: "red",
				tension: 0.2
			}
		]
	};

	const humidityData = {
		labels: labels,
		datasets: [
			{
				label: "Vlhkost (%)",
				data: weatherData.map((day: IDailyForecast) => Math.round(day.humidity)),
				fill: false,
				borderColor: "blue",
				tension: 0.2
			}
		]
	}

	return (weatherData ?
		<>
			<Line data={tempData} />
			<Line data={humidityData} />
		</> :
		<></>)
}

export default WeatherChart