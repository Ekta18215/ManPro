import React, {useState,useEffect} from 'react';
import Weathercard from "./weatherCard";
import './style.css';

const Temp = () => {
    const [searchValue , setsearchValue] = useState("Bokaro Steel City");
    const [tempInfo, setTempInfo] = useState({});

    const getweatherInfo = async() => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=94e8fd1788c410599bacc0427fee01b4`;
            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

      setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getweatherInfo();
      }, []);

    return<>
        <div className="wrap">
            <div className="search">
                <input
                type="search"
                placeholder="EnterCity"
                autoFocus
                id="search"
                className="searchTerm"
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)}
                />
                <button className="searchButton"
                type="button" onClick={getweatherInfo}>
                    Search
                </button> 
            </div>
        </div>
        <Weathercard{...tempInfo}/>
    </>
}

export default Temp;
