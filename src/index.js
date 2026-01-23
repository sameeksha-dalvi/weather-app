import "./style.css";


const cityInput = document.querySelector('#city-name');
const getWeatherBtn = document.querySelector('#get-weather-btn');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed');
const conditions = document.querySelector('#conditions');
const desc = document.querySelector('#desc');

getWeatherBtn.addEventListener('click', function (e) {

    console.log("Button clicked");

    if (cityInput.value == undefined || cityInput.value == "") {
        return;
    }

    getWeatherData(cityInput.value).then((data) => {
        temp.textContent = "Temp : " + `${data.getTemp()} °C`;
        humidity.textContent = "Humidity : " + `${data.getHumidity()} %`;
        windspeed.textContent = "Wind Speed : " + `${data.getWindSpeed()} km/h`;
        conditions.textContent = data.getConditions();
        desc.textContent = data.getDesc();

        let weatherBg = "";
        if (data.getIcon().includes('cloudy')) {
            weatherBg = "cloudy";
        }

        if (data.getIcon().includes('rain')) {
            weatherBg = "rain";
        }

        if (data.getIcon().includes('snow')) {
            weatherBg = "snow";
        }

        if (data.getIcon().includes('sunny')) {
            weatherBg = "sunny";
        }
        setWeatherBackground(weatherBg);
        
    });

    e.preventDefault();

});


function weatherData(desc, temp, humidity, windspeed, conditions, icon) {

    const getDesc = () => desc;
    const getTemp = () => temp;
    const getHumidity = () => humidity;
    const getWindSpeed = () => windspeed;
    const getConditions = () => conditions;
    const getIcon = () => icon;

    return { getDesc, getTemp, getHumidity, getWindSpeed, getConditions, getIcon };

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
        apiResp.days[0].conditions,
        apiResp.days[0].icon
    );

    return weatherInfo;
}



function setWeatherBackground(weather) {
    document.body.className = '';
    switch (weather.toLowerCase()) {
        case 'sunny':
            document.body.classList.add('sunny');
            break;
        case 'rain':
            document.body.classList.add('rainy');
            break;
        case 'snow':
            document.body.classList.add('snowy');
            break;
        case 'cloudy':
            document.body.classList.add('cloudy');
            break;
        default:
            document.body.classList.add('sunny');
    }
}
