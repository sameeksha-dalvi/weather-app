import "./style.css";


const cityInput = document.querySelector('#city-name');
const getWeatherBtn = document.querySelector('#get-weather-btn');

getWeatherBtn.addEventListener('click', function (e) {
    
    console.log("Button clicked");

    if (cityInput.value == undefined || cityInput.value == "") {
        return;
    }

    getWeatherData(cityInput.value).then((data) => {
        console.log("desc  :" + data.getDesc());
        console.log("temp  :" + data.getTemp());
        console.log("humidity  :" + data.getHumidity());
        console.log("windspeed  :" + data.getWindSpeed());
        console.log("conditions  :" + data.getConditions());
    });

    e.preventDefault();

});


function weatherData(desc, temp, humidity, windspeed, conditions) {

    const getDesc = () => desc;
    const getTemp = () => temp;
    const getHumidity = () => humidity;
    const getWindSpeed = () => windspeed;
    const getConditions = () => conditions;

    return { getDesc, getTemp, getHumidity, getWindSpeed, getConditions };

}



async function getWeatherData(location) {


    console.log("location " + location);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=4BYVM8YVVQ3K5QRTX6ZENKAKG&contentType=json`);

    //const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=us&key=4BYVM8YVVQ3K5QRTX6ZENKAKG&contentType=json');

    console.log("status:", response.status);

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



//getWeatherData("dubai");
