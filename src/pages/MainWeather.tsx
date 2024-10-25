import {useEffect, useState} from "react";
import {fetchWeatherData} from "../utils/utils";
import Autocomplete from "../components/Autocomplete";
import {ICity, IWeatherData} from "../types/types";
import cityListJson from "../data/city.list.json"

import '../App.css';

export const MainWeatherPage = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<IWeatherData | undefined>(undefined);
    const [city, setCity] = useState<ICity | null>(null);

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
            })
            .finally(() => setLoading(false));
    }, [city]);


    return (
    <>
        <h1>Predpoveď počasí</h1>
        <Autocomplete<ICity>
            data={cityData}
            onSelect={setCity}
            getDisplayValue={(city) => city.name}
            placeholder="Vyhledejte město"
        />
        {loading ? <span>Loading....</span> : <></>}
    </>
    )
}