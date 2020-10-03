import React, { useEffect, useState, useContext } from 'react';
import UserContext from "../../utils/UserContext";
import WeatherContext from "../../utils/WeatherContext";
import Draggable from 'react-draggable';
import axios from "axios";

import "./style.scss";

// Todo: 
// • Drag still isn't quite right, it I have added a handle on drag to mitigate issue of pageX being mouse based
// • Could use the edit mode, so that when click, the top of bar turns blue with a green move box on the left and a red delete box on the right
// • When the widget is deleted you have to refresh the page to get it to remove.  
// • Need to add functionality to change the location, i'm thinking, location text on click, turns editable, mouse out, sends data to database, updates weather with new location

export default function Weather() {

    const { id } = useContext(UserContext);
    const [forecast, setForecast] = useState({
        dayTwoTime: "",
        dayTwo: "",
        dayTwoIcon: "",

        dayThreeTime: "",
        dayThree: "",
        dayThreeIcon: "",

        dayFourTime: "",
        dayFour: "",
        dayFourIcon: "",

        dayFiveTime: "",
        dayFive: "",
        dayFiveIcon: "",
    });

    const [currentWeather, setCurrentWeather] = useState({
        date: "",
        temp: "",
        humidity: "",
        wind: "",
        pressure: "",
        icon: ""
    })

    const dayOneIcon = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
    const dayTwoIcon = `http://openweathermap.org/img/wn/${forecast.dayTwoIcon}@2x.png`;
    const dayThreeIcon = `http://openweathermap.org/img/wn/${forecast.dayThreeIcon}@2x.png`;
    const dayFourIcon = `http://openweathermap.org/img/wn/${forecast.dayFourIcon}@2x.png`;
    const dayFiveIcon = `http://openweathermap.org/img/wn/${forecast.dayFiveIcon}@2x.png`;
    const [weatherLoc, setWeatherLoc] = useContext(WeatherContext);

    const userInput = "Melbourne, AU"

    useEffect(() => {
        axios({
            "method":"GET",
            "url":"https://community-open-weather-map.p.rapidapi.com/forecast",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key":"fdb9978b68mshd6275eb4a4e31a6p16d146jsn8702ceda1ca0",
            "useQueryString":true
            },"params":{
            "units":"metric",
            "q":`${userInput}`
            }
            })
            .then((response)=>{

                const result = response.data.list;

                setCurrentWeather({
                    temp: Math.round(result[6].main.temp),
                    humidity: result[6].main.humidity,
                    wind: result[6].wind.speed,
                    pressure: result[6].main.pressure,
                    icon: result[6].weather[0].icon,
                })

                setForecast({
                    dayTwoTime: result[14].dt_txt.split("-")[2].split(" ")[0],
                    dayTwo: Math.round(result[14].main.temp),
                    dayTwoIcon: result[14].weather[0].icon,

                    dayThreeTime: result[22].dt_txt.split("-")[2].split(" ")[0],
                    dayThree: Math.round(result[22].main.temp),
                    dayThreeIcon: result[22].weather[0].icon,

                    dayFourTime: result[30].dt_txt.split("-")[2].split(" ")[0],
                    dayFour: Math.round(result[30].main.temp),
                    dayFourIcon: result[30].weather[0].icon,

                    dayFiveTime: result[38].dt_txt.split("-")[2].split(" ")[0],
                    dayFive: Math.round(result[38].main.temp),
                    dayFiveIcon: result[38].weather[0].icon,
                })
            })
            .catch((error)=>{
              console.log(error)
            })
    }, []);

    const handleDraggingStop = (e) => {
        setWeatherLoc({
            ...weatherLoc,
            xCoord: e.pageX,
            yCoord: e.pageY
        })
        axios.put("/api/weather/" + id, weatherLoc)
    }

    const handleWidgetDelete = () => {
        axios.delete("/api/weather/" + id);
    }

    return (
        <Draggable
            handle=".locationH2"
            grid={[100, 100]}
            onDrag={handleDraggingStop}
            defaultPosition={{x: weatherLoc.xCoord, y: weatherLoc.yCoord}}
        >
            <div className="weather-container">
                <h2 className="locationH2">{ weatherLoc.location }</h2>
                <button 
                    className="weatherDeleteButton"
                    onClick={handleWidgetDelete}
                >
                    x
                </button>
                <p className="temp"> { currentWeather.temp } °C 
                    <img className="weather-icon icon-one" src={dayOneIcon} alt="forecastOne"/>
                </p>

                <table className="forecast">
                    <tbody>
                        <tr>
                            <td>
                                <img className="weather-icon" src={dayTwoIcon} alt="forecastTwo"/>
                            </td>
                            <td>
                                <img className="weather-icon" src={dayThreeIcon} alt="forecastThree"/>
                            </td>
                            <td>
                                <img className="weather-icon" src={dayFourIcon} alt="forecastFour"/>
                            </td>
                            <td>
                                <img className="weather-icon" src={dayFiveIcon} alt="forecastFive"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                { forecast.dayTwoTime }
                            </td>
                            <td>
                                { forecast.dayThreeTime }
                            </td>
                            <td>
                                { forecast.dayFourTime }
                            </td>
                            <td>
                                { forecast.dayFiveTime }
                            </td>
                        </tr>
                        <tr>
                            <th>
                                { forecast.dayTwo } °C
                            </th>
                            <th>
                                { forecast.dayThree } °C
                            </th>
                            <th>
                                { forecast.dayFour } °C
                            </th>
                            <th>
                                { forecast.dayFive } °C
                            </th>
                        </tr>
                    </tbody>
                </table>

                <table className="weatherData">
                    <tbody>
                        <tr>
                            <td>
                                Humidity
                            </td>
                            <td>
                                Wind
                            </td>
                            <td>
                                Pressure
                            </td>
                        </tr>
                        <tr>
                            <th>
                                { currentWeather.humidity } %
                            </th>
                            <th>
                                { currentWeather.wind } km/h
                            </th>
                            <th>
                                { currentWeather.pressure } hPa
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Draggable>
    );
}