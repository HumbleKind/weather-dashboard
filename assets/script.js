
var citySearch = $("#search-city-form");

citySearch.on("submit", function(event) {
    event.preventDefault();

    // gets entered search city name
    var cityName = $("#city-name").val();

    // passes city name to results function
    getWeather(cityName);
    
    // adds searched city name to the top of the history list
    $("#search-history").prepend($("<li>").addClass("list-group-item").text(cityName));

    $("#city-name").val("");
});

function getWeather(cityName) {

    // API key: 87f01c7c0ae95c2907ec5b879ab8afaa

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa",
        method: "GET"
    }).then(function(response) {

        var cityLat = response.coord.lat        
        var cityLon = response.coord.lon

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude={part}&appid=87f01c7c0ae95c2907ec5b879ab8afaa",
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // current date in mm/dd/yyyy format
            var currentDate = (new Date()).toLocaleDateString('en-US');

            // current weather icon
            var weatherIcon = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png";

            // search results - city name, date, weather icon
            $("#card-title-city").text(cityName + " " + "(" + currentDate + ")").append("<img src=" + weatherIcon + " />");

            // current weather results - temperature, humidity, wind speed, UV index
            $("#current-temperature").text("Temperature: " + (((response.current.temp - 273.15) * 1.8) + 32).toFixed(1) + " ℉");
            $("#current-humidity").text("Humidity: " + response.current.humidity + "%");
            $("#current-wind-speed").text("Wind Speed: " + response.current.wind_speed + " MPH");
            $("#current-uv-index").text("UV Index: " + response.current.uvi);
        
            // 5-day forecast results - date, weather icon, temperature, humidity
            for (var i = 1; i < 6; i++) {

                var forecastDate = $("<h5>").attr("id", "card-title-date-" + [i]).addClass("card-title").text("Date");
                var forecastTemp = $("<p>").attr("id", "temp-" + [i]).text("Temp:");
                var forecastHumidity = $("<p>").attr("id", "humidity").text("Humidity:");

                var forecastCardBody = $("<div>").addClass("card-body");
                forecastCardBody.append(forecastDate, forecastTemp, forecastHumidity);

                var forecastCard = $("<div>").attr("id", "forecast-card").addClass("card text-white bg-primary mb-3").attr("style", "max-width: 10rem;");
                forecastCard.append(forecastCardBody);

                var forecastCol = $("<div>").attr("id", "forecast-col").addClass("col-auto mb-3");
                forecastCol.append(forecastCard);

                $("#forecast-row").append(forecastCol);

                var forecastDateValue = (new Date((response.daily[i].dt)*1000)).toLocaleDateString('en-US');
                var forecastWeatherIcon = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";
                $("#card-title-date-" + [i]).text(forecastDateValue).append("<img src=" + forecastWeatherIcon + " />");
                
                $("#temp-" + [i]).text("Temp: " + (((response.daily[i].temp.max - 273.15) * 1.8) + 32).toFixed(1) + " ℉");

                // $("#humidity").text("Humidity: " + response.current.humidity + "%");
            }

        });

    });

};
