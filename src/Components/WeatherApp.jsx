import React, { useEffect, useState } from 'react'
import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import loadingGif from '../assets/images/loading.gif'

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location,setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const api_key = '124a514639cf3f8535add2aa5b9b357f'

    useEffect(()=>{
        const fetchDefaultWeather = async () => {
            setLoading(true);
            const defaultLocation = "Chennai"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`
            const res = await fetch(url)
            const defaultData = await res.json()
            setData(defaultData)
            setLoading(false);
        }
        fetchDefaultWeather()
    },[])

    const handleInputChange = (e) =>{
        setLocation(e.target.value)
    }

    const search = async () => {
        if(location.trim() !== ""){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            if(searchData.cod!==200){
                setData({notFound: true})
            }else{
                console.log(searchData);
                setData(searchData)
                setLocation("")
            }
            setLoading(false);
        }   
    }

    const handleKeyDown = (e) => {
       if(e.key === "Enter"){
        search()
       }
    }

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
        Thunderstorm: rainy,
    }

    const weatherImage =data.weather ? weatherImages[data.weather[0].main] : null

    const backgroundImages = {   
        Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
        Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)' ,
        Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff)',
        Haze: 'linear-gradient(to right, #57d6d4, #71eeec)' ,
        Mist: 'linear-gradient(to right, #57d6d4, #71eeec)' ,
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)'

    const currentDate = new Date();

    const daysOfWeek = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];

    const months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const dayOfWeek = daysOfWeek[currentDate.getDay()] ;

    const  month = months[currentDate.getMonth()];

    const dayOfMonth = currentDate.getDate();

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`
        

  return (
    <div className='container' style={{backgroundImage}}>
        <div className="weather-app" style={{backgroundImage:backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top"):null}}>
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">
                        {data.name}
                    </div>
                </div>
                <div className="search-bar">
                    <input type="text" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Enter your Location' />
                    <i className="fa-solid fa-magnifying-glass"onClick={search} ></i>
                </div>
            </div>
            {loading ?(<img src={loadingGif} className='loader' alt='loading'/>):data.notFound?(<div className='not-found'>Not Found😒</div>):(<>
                <div className="weather">
                 <img src={weatherImage} alt="sunny" />
                 <div className="weather-type">{data.weather?data.weather[0].main:null}</div>
                 <div className="temp">{data.main?`${Math.floor(data.main.temp)}°`:null}</div>
            </div>
            <div className="weather-date">
                <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity : null}%</div>
                </div>
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.wind ? data.wind.speed : null} km/h</div>
                </div>
            </div>
            </>)}
            
        </div>
    </div>
  )
}

export default WeatherApp
