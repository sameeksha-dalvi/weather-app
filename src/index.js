import "./style.css";

function weatherData(desc, temp, humidity, windspeed, conditions) {

    const getDesc = () => desc;
    const getTemp = () => temp;
    const getHumidity = () => humidity;
    const getWindSpeed = () => windspeed;
    const getConditions = () => conditions;

    return { getDesc, getTemp, getHumidity, getWindSpeed, getConditions };

}



async function getWeatherData(location) {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=us&key=4BYVM8YVVQ3K5QRTX6ZENKAKG&contentType=json');
    const apiResp = await response.json();

    const weatherInfo = weatherData(
        apiResp.days[0].description,
        apiResp.days[0].temp,
        apiResp.days[0].humidity,
        apiResp.days[0].windspeed,
        apiResp.days[0].conditions
    );
    
    return weatherInfo;
}


getWeatherData().then((data) => {
    console.log("desc  :" + data.getDesc());
    console.log("temp  :" + data.getTemp());
    console.log("humidity  :" + data.getHumidity());
    console.log("windspeed  :" + data.getWindSpeed());
    console.log("conditions  :" + data.getConditions());
});

//console.log("getWeatherData  " + getWeatherData().getDesc());