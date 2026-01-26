import "./style.css";


const cityInput = document.querySelector('#city-name');
const getWeatherBtn = document.querySelector('#get-weather-btn');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed');
const conditions = document.querySelector('#conditions');
const desc = document.querySelector('#desc');
const iconImg = document.querySelector("#weather-icon");

getWeatherBtn.addEventListener('click', async function (e) {

  e.preventDefault();
    if (cityInput.value == undefined || cityInput.value == "") {
        return;
    }
    showLoading();
    hideWeatherInfo();
    clearWeatherEffects();
    try {
        const data = await getWeatherData(cityInput.value);
        temp.textContent = `${data.getTemp()} °C`;
        humidity.textContent = "Humidity : " + `${data.getHumidity()} %`;
        windspeed.textContent = "Wind Speed : " + `${data.getWindSpeed()} km/h`;
        conditions.textContent = data.getConditions();

        let weatherIcon = "clear";
        if (data.getIcon().includes('cloudy')) {
            weatherIcon = "cloudy";
        }

        if (data.getIcon().includes('rain')) {
            weatherIcon = "rain";
        }

        if (data.getIcon().includes('snow')) {
            weatherIcon = "snow";
        }

        if (data.getIcon().includes('sunny')) {
            weatherIcon = "sunny";
        }
        setWeatherBackground(weatherIcon);


        if (weatherIcon === 'rain') {
            createRainDrops();
        }

        if (weatherIcon === 'snow') {
            createSnow();
        }
         const svgMarkup =  await loadWeatherIcon(data.getIcon());
         iconImg.innerHTML = svgMarkup;
        // iconImg.src = iconSrc;
        // loadWeatherIcon(data.getIcon()).then((svgMarkup) => {
        //     iconImg.innerHTML = svgMarkup;
        // });

        showWeatherInfo();
    } catch (error) {
        console.error(error);
        alert("Could not fetch weather data. Please try again.");
    } finally {
        hideLoading();
    }



  

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
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4BYVM8YVVQ3K5QRTX6ZENKAKG&contentType=json`);

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
            document.body.classList.add('clear');
    }
}


async function loadWeatherIcon(iconName) {
    const icon = await import(`./assets/icons/${iconName}.svg`);
    const response = await fetch(icon.default);
    return response.text();
}

function createSnow(count = 40) {
    const container = document.getElementById('weather-effects');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const snow = document.createElement('div');
        snow.className = 'snowflake';
        snow.style.left = Math.random() * window.innerWidth + 'px'; // full width
        snow.style.width = snow.style.height = (4 + Math.random() * 6) + 'px'; // random size
        snow.style.animationDuration = (3 + Math.random() * 5) + 's';
        snow.style.opacity = 0.6 + Math.random() * 0.4;

        // Optional: random horizontal drift using inline keyframe
        const drift = (Math.random() - 0.5) * 30; // -15px to +15px drift
        snow.style.animationName = `snowFall`;
        snow.style.setProperty('--drift', drift + 'px');

        container.appendChild(snow);
    }
}

function createRainDrops(count = 60) {
    const container = document.getElementById('weather-effects');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = (0.5 + Math.random()) + 's';
        drop.style.opacity = Math.random();
        container.appendChild(drop);
    }
}

function clearWeatherEffects() {
    document.querySelector('#weather-effects').innerHTML = '';
}


function showLoading() {
    document.querySelector('#loading').classList.remove('hidden');
}

function hideLoading() {
    document.querySelector('#loading').classList.add('hidden');
}

function showWeatherInfo() {
    document.querySelector('.output-div').classList.remove('hidden');
}

function hideWeatherInfo() {
    document.querySelector('.output-div').classList.add('hidden');
}