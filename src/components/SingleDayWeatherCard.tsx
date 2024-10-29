import {IDailyForecast} from "../types/types";
import '../App.scss';
import {formatUnixDate, formatUnixTime} from "../utils/utils";

interface Props {
    dailyData: IDailyForecast
}

const SingleDayWeatherCard = ({dailyData}: Props) => {
    const { dt, temp, humidity, wind_speed, sunrise, sunset, weather, wind_deg } = dailyData;

    const getIconUrl = () => {
        const iconName = weather[0].icon;
        //https://openweathermap.org/weather-conditions#How-to-get-icon-URL
        return `https://openweathermap.org/img/wn/${iconName}@2x.png`
    }

    const getWindDirection = (angle: number) => {
        const directions = ['S', 'SV', 'V', 'JV', 'J', 'JZ', 'Z', 'SZ'];
        const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index];
    }

    return (<div className="weatherDay">
        <div className="column mainInfo">
            <span>{formatUnixDate(dt)}</span>
            <img
                className="weatherIcon"
                src={getIconUrl()}
                alt="weatherIcon"
            />
            <span className="tempVal">{Math.round(temp.day)}°C</span>
            <span className="minMaxTemp">{Math.round(temp.min)}°C - {Math.round(temp.max)}°C</span>
        </div>
        <div className="column additionalInfo">
            <span>Humidity: {humidity}</span>
            <span>Wind: {wind_speed}, {getWindDirection(wind_deg)}</span>
            <span>Sunrise: {formatUnixTime(sunrise, true)}</span>
            <span>Sunset: {formatUnixTime(sunset, true)}</span>
        </div>
    </div>)
}

export default SingleDayWeatherCard;