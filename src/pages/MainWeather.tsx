import {useEffect, useState} from "react";
import {fetchWeatherData, findClosestCityOptimized, getCurrentPosition} from "../utils/utils";
import Autocomplete from "../components/Autocomplete";
import {ICity, IDailyForecast, IWeatherData} from "../types/types";
import cityListJson from "../data/city.list.json"
import SingleDayWeatherCard from "../components/SingleDayWeatherCard";
import '../App.scss';

export const MainWeatherPage = () => {
    const [loading, setLoading] = useState(true); //TODO: spinner
    const [weatherData, setWeatherData] = useState<IWeatherData | undefined>(undefined);
    const [city, setCity] = useState<ICity | null>(null);
    const [title, setTitle] = useState("Předpověď počasí");

    const cityData: ICity[] = cityListJson as ICity[];

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        //coordinations comes from city.list.json
        fetchWeatherData(city.coord.lat, city.coord.lon)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setWeatherData(data);

                const currentDate = new Date().toLocaleDateString();
                const fiveDaysLater = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(); //days to miliseconds
                setTitle(`Predpoveď počasí pro ${city.name} (${city.country}), ${currentDate} - ${fiveDaysLater}`);
            })
            .finally(() => setLoading(false));
    }, [city]);

    const displayDailyWeatherData = () => {
        if (!weatherData || !weatherData.daily) return;

        return (
            weatherData.daily
                .slice(0,5) //display only five days
                .map((day: IDailyForecast) => <SingleDayWeatherCard dailyData={day} />)
        );
    }

    const getCityFromPosition = async () => {
        //TODO: add loading spinner
        const position: GeolocationPosition = await getCurrentPosition();
        const nearestCity = findClosestCityOptimized(position, cityData)
        setCity(nearestCity);
    }

    return (
        <>
            <h1>{title}</h1>
            <Autocomplete<ICity>
                data={cityData}
                onSelect={setCity}
                getDisplayValue={(city) => city.name}
                placeholder="Vyhledejte město"
                useLocalization={getCityFromPosition}
            />
            {loading && city ? <span>Načítám data...</span> : <></>}
            <div className="forecast">{displayDailyWeatherData()}</div>
        </>
    )
}