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
	document.getElementById("time-box").innerHTML = convertTimeFormat(
		weatherData.location.localtime,
	);
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

function convertTimeFormat(timeStr) {
	// Parse the date-time string
	const parts = timeStr.split(" ");
	const dateParts = parts[0].split("-");
	const timeParts = parts[1].split(":");

	const year = parseInt(dateParts[0], 10);
	const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-based
	const day = parseInt(dateParts[2], 10);
	const hour = parseInt(timeParts[0], 10);
	const minute = parseInt(timeParts[1], 10);

	// Create a Date object from the parsed parts
	const date = new Date(year, month, day, hour, minute);

	// Format the time
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours; // Convert to 12-hour format
	const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

	return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

getWeatherData("San Diego");
