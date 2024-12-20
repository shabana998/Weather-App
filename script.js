const apiKey = "875580e9620ab0f566a85466dd9c6daf";
let city = "Jabalpur";

const cityName = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const weatherImage = document.querySelector('.weather-icon'); // Image tag for weather images

const input = document.querySelector('input');
const button = document.querySelector('button');

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            alert("City not found. Please try again!");
            return;
        }

        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong! Please try again.");
    }
}

// Function to update weather details and dynamic image
function updateWeather(data) {
    cityName.textContent = data.name;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h
    temp.textContent = `${Math.round(data.main.temp)} °C`;
    description.textContent = data.weather[0].description;
    console.log(data);

    // Dynamically update weather image
    const weatherDesc = data.weather[0].description.toLowerCase(); // Ensure lowercase to match file names
    if (data.weather[0].main=="Clouds") {
        weatherImage.src = "clouds.png"
    }
   else if (data.weather[0].main=="Clear") {
    weatherImage.src = "clear.png"
}
   else if (data.weather[0].main=="Rain") {
    weatherImage.src = "rain.png"
}
   else if (data.weather[0].main=="Drizzle") {
    weatherImage.src = "drizzel.png"
}
   else if (data.weather[0].main=="Mist") {
    weatherImage.src = "mist.png"
}
}

// Event Listener for search button
button.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) {
        fetchWeather(city);
        input.value = ''; // Clear input field
    } else {
        alert("Please enter a city name!");
    }
});

// Initial weather fetch for default city
fetchWeather(city);
