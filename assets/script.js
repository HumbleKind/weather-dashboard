
var citySearch = $("#search-city-form");

citySearch.on("submit", function(event) {
    event.preventDefault();
    var cityName = $("#city-name").val();
    getWeather(cityName);
});

function getWeather(cityName) {
    // API key: 87f01c7c0ae95c2907ec5b879ab8afaa
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#temperature").append(" " + (((response.main.temp - 273.15) * 1.8) + 32) + " ℉");
        $("#humidity").append(" " + response.main.humidity + "%");
        $("#wind-speed").append(" " + response.wind.speed + " MPH");
    });
}
