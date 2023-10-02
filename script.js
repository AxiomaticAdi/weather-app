let weatherDataJSON;
async function getWeatherJSON() {
	try {
		const response = await fetch(
			"https://api.weatherapi.com/v1/current.json?key=8d257108252447478ad13236230110&q=san%20diego",
			{ mode: "cors" },
		);
		weatherData = await response.json();
		console.log(weatherData);
		return weatherData;
	} catch (error) {
		console.log(error);
	}
}

getWeatherJSON().then((value) => {
	console.log("We are here");
	console.log(value);
	document.getElementById("location-box").innerHTML = value.location.name;
	document.getElementById("temperature-box").innerHTML =
		value.current.temp_f + "°F";
	document.getElementById("weather-box").innerHTML =
		value.current.condition.text;
	document.getElementById(
		"weather-icon",
	).src = `https:${value.current.condition.icon}`;
});

console.log("The End");
