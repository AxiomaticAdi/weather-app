let weatherDataJSON;

function convertToUrlFriendlyString(location) {
	return encodeURIComponent(location.toLowerCase().trim());
}

async function getWeatherData(location) {
	try {
		const urlLocation = convertToUrlFriendlyString(location);

		const response = await fetch(
			"https://api.weatherapi.com/v1/current.json?key=8d257108252447478ad13236230110&q=" +
				urlLocation,
			{ mode: "cors" },
		);

		weatherData = await response.json();
		console.log(weatherData);
		updateInfoDisplayed(weatherData);
		return weatherData;
	} catch (error) {
		console.log(error);
	}
}

function updateInfoDisplayed(weatherData) {
	document.getElementById("location-box").innerHTML = weatherData.location.name;
	document.getElementById("temperature-box").innerHTML =
		weatherData.current.temp_f + "°F";
	document.getElementById("weather-box").innerHTML =
		weatherData.current.condition.text;
	document.getElementById(
		"weather-icon",
	).src = `https:${weatherData.current.condition.icon}`;
}

document.addEventListener("DOMContentLoaded", function () {
	const locationInput = document.getElementById("location-input");
	const button = document.getElementById("submit-button");

	button.addEventListener("click", function () {
		const userInput = locationInput.value;
		getWeatherData(userInput);
	});
});

getWeatherData("San Diego");
