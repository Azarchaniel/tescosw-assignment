import {ReactElement, useEffect, useState} from "react";
import {fetchWeatherData, findClosestCityOptimized, getCurrentPosition} from "../utils/utils";
import Autocomplete from "../components/Autocomplete";
import {ICity, IDailyForecast, IWeatherData} from "../types/types";
import cityListJson from "../data/city.list.json"
import SingleDayWeatherCard from "../components/SingleDayWeatherCard";
import '../App.scss';
import Spinner from "../components/Spinner";

export const MainWeatherPage = (): ReactElement => {
    const defaultTitle = "Předpověď počasí";

    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState<IWeatherData | undefined>(undefined);
    const [city, setCity] = useState<ICity | null>(null);
    const [title, setTitle] = useState(defaultTitle);

    const cityData: ICity[] = cityListJson as ICity[];

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        setTitle(defaultTitle)
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
        if (!weatherData || !weatherData.daily || loading) return;

        return (
            weatherData.daily
                .slice(0,5) //display only five days
                .map((day: IDailyForecast) => <SingleDayWeatherCard dailyData={day} key={day.dt}/>)
        );
    }

    const getCityFromPosition = async () => {
        setLoading(true);
        setTitle(defaultTitle);
        const position: GeolocationPosition = await getCurrentPosition();
        const nearestCity = findClosestCityOptimized(position, cityData)
        setCity(nearestCity);
        setLoading(false);
    }

    return (
        <>
            <h1>{title}</h1>
            <Autocomplete<ICity>
                data={cityData}
                initialValue={loading ? "" : city?.name}
                onSelect={setCity}
                getDisplayValue={(city) => city.name}
                placeholder="Vyhledejte město"
                useLocalization={getCityFromPosition}
            />
            <Spinner loading={loading}/>
            <div className="forecast">{displayDailyWeatherData()}</div>
        </>
    )
}