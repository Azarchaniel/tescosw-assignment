import {ICity, OPEN_WEATHER_APP_UNITS} from "../types/types";

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

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
    });

}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function findClosestCity(position: GeolocationPosition, cities: ICity[]): ICity | null {
    if (cities.length === 0) return null;

    // Haversine formula to calculate distance between two points on a sphere
    function calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distance in kilometers
    }

    let closestCity = cities[0];
    let shortestDistance = 9999;


    // find the city with shortest distance
    cities.forEach(city => {
        const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            city.coord.lat,
            city.coord.lon
        );

        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestCity = city;
        }
    });

    return closestCity;
}

export function findClosestCityOptimized(position: GeolocationPosition, cities: ICity[]): ICity | null {
    if (cities.length === 0) return null;

    // Pre-filter cities within a rough bounding box
    const searchRadius = 50; // kilometers
    const kmPerDegree = 111.32; // approximate km per degree at equator

    const latDelta = searchRadius / kmPerDegree;
    const lonDelta = searchRadius / (kmPerDegree * Math.cos(toRadians(position.coords.latitude)));

    const filteredCities = cities.filter(city =>
        Math.abs(city.coord.lat - position.coords.latitude) <= latDelta &&
                Math.abs(city.coord.lon - position.coords.longitude) <= lonDelta
    );

    // Use the original function on the filtered set
    return findClosestCity(position, filteredCities.length > 0 ? filteredCities : cities);
}