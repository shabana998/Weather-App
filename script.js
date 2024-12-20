const apiKey = "875580e9620ab0f566a85466dd9c6daf";
let city = "Jabalpur";

const cityName = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const icon = document.querySelector('.icon'); // Placeholder for weather icon

const input = document.querySelector('input');
const button = document.querySelector('button');

// Function to fetch weather
async function fetchWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            alert("City not found. Please try again!");
            return;
        }

        const data = await response.json();
        console.log(data);
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong! Please try again.");
    }
}

// Function to update weather details in the DOM
function updateWeather(data) {
    cityName.textContent = data.name;
    humidity.textContent = `${data.main.humidity} %`; // Humidity with %
    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h
    temp.textContent = `${Math.round(data.main.temp)} °C`; // Rounded temperature
    description.textContent = data.weather[0].description;

    // Add weather icon (from OpenWeatherMap)
    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = data.weather[0].description;
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
