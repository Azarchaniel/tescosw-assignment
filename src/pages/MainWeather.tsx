import {useEffect, useState} from "react";
import {fetchWeatherData} from "../utils/utils";
import Autocomplete from "../components/Autocomplete";
import {ICity, IDailyForecast, IWeatherData} from "../types/types";
import cityListJson from "../data/city.list.json"
import SingleDayWeatherCard from "../components/SingleDayWeatherCard";
import '../App.scss';

export const MainWeatherPage = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<IWeatherData | undefined>(undefined);
    const [city, setCity] = useState<ICity | null>(null);
    const [title, setTitle] = useState("Predpoveď počasí");

    const cityData: ICity[] = cityListJson as ICity[];

    useEffect(() => {
        console.log(city);
        if (!city) return;

        setLoading(true);
        fetchWeatherData(city.coord.lat, city.coord.lon)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setWeatherData(data);
                console.log(data);
                const currentDate = new Date().toLocaleDateString();
                const fiveDaysLater = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
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

    return (
        <>
            <h1>{title}</h1>
            <Autocomplete<ICity>
                data={cityData}
                onSelect={setCity}
                getDisplayValue={(city) => city.name}
                placeholder="Vyhledejte město"
            />
            {loading ? <span>Loading....</span> : <></>}
            <div className="forecast">{displayDailyWeatherData()}</div>
        </>
    )
}