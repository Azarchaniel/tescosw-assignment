export type OPEN_WEATHER_APP_UNITS = 'standard' | 'metric' | 'imperial';

export interface ICity {
    id: number | string,
    name: string,
    state: string,
    country: string,
    coord: {
        lon: number,
        lat: number
    }
}

export interface IWeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: ICurrentWeather;
    minutely: IMinuteForecast[];
    hourly: IHourlyForecast[];
    daily: IDailyForecast[];
    alerts?: IWeatherAlert[];
}

export interface ICurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: IWeatherCondition[];
}

export interface IMinuteForecast {
    dt: number;
    precipitation: number;
}

export interface IHourlyForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: IWeatherCondition[];
    pop: number;
}

export interface IDailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary?: string;
    temp: IDailyTemperature;
    feels_like: IDailyFeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: IWeatherCondition[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
}

export interface IDailyTemperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IDailyFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IWeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IWeatherAlert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
}
