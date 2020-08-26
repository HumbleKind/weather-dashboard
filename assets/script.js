
var citySearch = $("#search-city-form");

// ** 
var searchHistory = JSON.parse(window.localStorage.getItem("history")) || [];

// for loop create list item with buttons showing localStorage

citySearch.on("submit", function(event) {
    event.preventDefault();

    // gets entered search city name
    var cityName = $("#city-name").val();

    // ** 
    while (searchHistory.indexOf(cityName) === -1) {
        searchHistory.push(cityName);
        window.localStorage.setItem("history", JSON.stringify(searchHistory));
    }

    // passes city name to results function
    getWeather(cityName);
    
    // **
    var cityBtn = $("<button>").addClass("btn city-btn").val(cityName).text(cityName);

    // adds searched city name to the top of the history list
    // $("#search-history").prepend($("<li>").addClass("list-group-item").text(cityName)); // create each list item as a button with value of cityName
    $("#search-history").prepend($("<li>").addClass("list-group-item").append(cityBtn));

    // clears city search input and 5-day forecast cards
    $("#city-name").val("");
    $("#uvi").empty();
    $("#forecast-row").empty();
});

// **
$(".city-btn").on("click", function() {
    console.log("I was clicked!");
    var value = $(this).val();
    console.log(value);
    getWeather(value);
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

            // current date in mm/dd/yyyy format
            var currentDate = (new Date()).toLocaleDateString('en-US');

            // current weather icon
            var weatherIcon = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png";

            // search results - city name, date, weather icon
            $("#card-title-city").text(cityName + " " + "(" + currentDate + ")").append("<img src=" + weatherIcon + " />");

            // current weather results - temperature, humidity, wind speed
            $("#current-temperature").text("Temperature: " + (((response.current.temp - 273.15) * 1.8) + 32).toFixed(1) + " ℉"); // could refactor this within the API call
            $("#current-humidity").text("Humidity: " + response.current.humidity + "%");
            $("#current-wind-speed").text("Wind Speed: " + response.current.wind_speed + " MPH");

            // appends current UV index value, with in-line styling
            $("#uvi").append(response.current.uvi).attr("style", "padding: 10px;");
        
            // 5-day forecast results - date, weather icon, temperature, humidity
            for (var i = 1; i < 6; i++) {

                // creates date, temp, humidity variables for each forecast card
                var forecastDate = $("<h5>").attr("id", "card-title-date-" + [i]).addClass("card-title").text("Date");
                var forecastTemp = $("<p>").attr("id", "temp-" + [i]).text("Temp:");
                var forecastHumidity = $("<p>").attr("id", "humidity-" + [i]).text("Humidity:");

                // creates forecast card body, and appends date, temp, humidity (variables)
                var forecastCardBody = $("<div>").addClass("card-body");
                forecastCardBody.append(forecastDate, forecastTemp, forecastHumidity);

                // creates forecast card, and appends card body values
                var forecastCard = $("<div>").attr("id", "forecast-card").addClass("card text-white bg-primary mb-3").attr("style", "max-width: 10rem;"); // just add class ... put style in CSS
                forecastCard.append(forecastCardBody);

                // creates forecast column, and appends forecast card
                var forecastCol = $("<div>").attr("id", "forecast-col").addClass("col-auto mb-3");
                forecastCol.append(forecastCard);

                // appends forecast column to forecast row
                $("#forecast-row").append(forecastCol);

                // queries date, weather icon, temp, humidity and replaces forecast card body values
                var forecastDateValue = (new Date((response.daily[i].dt)*1000)).toLocaleDateString('en-US');
                var forecastWeatherIcon = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";

                $("#card-title-date-" + [i]).text(forecastDateValue).append("<img src=" + forecastWeatherIcon + " />");
                $("#temp-" + [i]).text("Temp: " + (((response.daily[i].temp.max - 273.15) * 1.8) + 32).toFixed(1) + " ℉");
                $("#humidity-" + [i]).text("Humidity: " + response.daily[i].humidity + "%");
            }

        });

    });

};
