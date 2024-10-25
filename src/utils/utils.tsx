import {OPEN_WEATHER_APP_UNITS} from "../types/types";

export const fetchWeatherData =
    async (lat: number, lon: number, units: OPEN_WEATHER_APP_UNITS = "metric") => {
    //exclude "minutely", as we dont need such granularity; units = metric, so we get Celsius
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
}