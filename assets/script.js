
var citySearch = $("#city-search");

citySearch.on("submit", function(event) {
    event.preventDefault();
    var city = $("#city-name").val();
    console.log(city);

    getWeather(city);
});

function getWeather(cityName) {
    // API key: 87f01c7c0ae95c2907ec5b879ab8afaa
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa";
    console.log(queryURL);

    $.ajax({ // WHY AM I GETTING AN ERROR HERE ...
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.main.temp);
        
    });
}

// ... WHEN THE FOLLOWING WORKS?!?!
var cityName = "Atlanta";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=87f01c7c0ae95c2907ec5b879ab8afaa";
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response.main.temp);
    
});
