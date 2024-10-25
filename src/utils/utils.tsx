import {OPEN_WEATHER_APP_UNITS} from "../types/types";

export const fetchWeatherData =
    async (lat: number, lon: number, units: OPEN_WEATHER_APP_UNITS = "metric") => {
    //exclude "minutely", as we dont need such granularity; units = metric, so we get Celsius
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
}

export const formatUnixDate = (date: number): string => {
    if (!date) return '';
    return new Date(date * 1000).toLocaleDateString()
}

export const formatUnixTime = (date: number, withoutSeconds: boolean = true): string => {
    if (!date) return '';

    const options = withoutSeconds ? {hour: '2-digit' as const, minute:'2-digit' as const} : {}
    return new Date(date * 1000).toLocaleTimeString(navigator.language, options);
}