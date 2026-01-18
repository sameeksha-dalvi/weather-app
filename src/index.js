import "./style.css";


async function getWeatherData(location) {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=us&key=4BYVM8YVVQ3K5QRTX6ZENKAKG&contentType=json');
    const weatherData = await response.json();
    console.log("API response description :"+weatherData.days[0].description);
    console.log("API response temp :"+weatherData.days[0].temp);
    console.log("API response humidity:"+weatherData.days[0].humidity);
    console.log("API response windspeed:"+weatherData.days[0].windspeed);
    console.log("API response conditions:"+weatherData.days[0].conditions);
}

getWeatherData();