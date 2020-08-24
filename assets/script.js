
var citySearch = $("#search-city-form");

citySearch.on("submit", function(event) {
    event.preventDefault();

    // gets entered search city name
    var cityName = $("#city-name").val();

    // passes city name to results function
    getWeather(cityName);
    
    // adds searched city name to the top of the history list
    $("#search-history").prepend($("<li>").addClass("list-group-item").text(cityName));
});

function getWeather(cityName) {
    // API key: 87f01c7c0ae95c2907ec5b879ab8afaa
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // current date in mm/dd/yyyy format
        var currentDate = (new Date()).toLocaleDateString('en-US');

        // current weather icon
        var weatherIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";

        // search results - city name, date, weather icon
        $(".card-title").text(response.name + " " + "(" + currentDate + ")").append("<img src=" + weatherIcon + " />");

        // search results - temperature, humidity, wind speed, UV index
        $("#temperature").text("Temperature: " + (((response.main.temp - 273.15) * 1.8) + 32).toFixed(1) + " ℉");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    });
}
