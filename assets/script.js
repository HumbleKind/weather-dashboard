
var citySearch = $("#search-city-form");

citySearch.on("submit", function(event) {
    event.preventDefault();
    var cityName = $("#city-name").val();
    getWeather(cityName);
    
    $("#search-list").prepend($("<li>").addClass("list-group-item").text(cityName));
});

function getWeather(cityName) {
    // API key: 87f01c7c0ae95c2907ec5b879ab8afaa
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $(".card-title").text(response.name + " " + "(" + (new Date()).toLocaleDateString('en-US') + ")");
        $("#temperature").text("Temperature: " + (((response.main.temp - 273.15) * 1.8) + 32).toFixed(1) + " ℉");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    });
}
