var jumboArea = $("#jumbo-view")
var resultsArea = $("#card-view")
var lastSearch = localStorage.getItem('city_key')
console.log(lastSearch)
//var cityName = lastSearch
window.onload = lastSearchFunction()


$("#addCity").on("click", function (event) {
    event.preventDefault();
    console.log(cityName)
    jumboArea.empty()
    resultsArea.empty()
    var cityName = $("#userInput").val().trim()
    localStorage.setItem('city_key', cityName);
    selectWeather()

});

function lastSearchFunction() {
    var apiKey = "7d7923df6842bd1066fc6aab55ecf56b"
    var cityName = lastSearch
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    console.log(queryURL)



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
// Function for jumbotron (current day weather)
// City Name
var properCity = response.city.name
// Weather Icon
var weatherIcon = response.list[0].weather[0].icon
// Weather Description
var weatherDesc = response.list[0].weather[0].description
// Temperature
var farTempCurr = Math.round(response.list[0].main.temp)
// Humidity
var humidity = response.list[0].main.humidity
// Wind speed
var windSpeed = response.list[0].wind.speed

// Variables for Lat and Lon
var lat = response.city.coord.lat;
var lon = response.city.coord.lon;

var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}&units=imperial`
console.log(uvUrl)

console.log(cityName)
$.ajax({
    url: uvUrl,
    method: "GET"
}).then(function (response) {
    // UV Index
    var uvIndex = response.value
    console.log(response)

var iconPic = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
// Creating dynamic bootstrap jumbotron for current day
    var currentDayJumbo = $(`<div class="jumbotron">
    <h1 class="display-4">${properCity}</h1>
    <img src="${iconPic}">
    <hr class="my-4">
    <p class="card-text">${weatherDesc}</p>
    <p class="card-text">Temperature: ${farTempCurr}</p>
    <p class="card-text">Humidity: ${humidity}</p>
    <p class="card-text" id="uvElem">UV Index: ${uvIndex}</p>
    <p class="card-text">Wind Speed: ${windSpeed}</p>
    </div>`)
    jumboArea.append(currentDayJumbo)
    uvColor()
        // Function for UV Index CSS
        function uvColor () {
            if (uvIndex < 3) {
            document.getElementById("uvElem").classList.add('greenIndex')
            }
            if (uvIndex < 6 && uvIndex >= 3) {
            document.getElementById("uvElem").classList.add('yellowIndex')
            }
            if (uvIndex < 8 && uvIndex >= 6) {
            document.getElementById("uvElem").classList.add('orangeIndex')
            }
            if (uvIndex < 11 && uvIndex >= 6) {
            document.getElementById("uvElem").classList.add('redIndex')
            }
        }
})


        // Looping through each subsequent day
        for (var i = 5; i < 30; i += 8) {
            // Date
            var dateEl = new Date(response.list[i].dt_txt)
            console.log(response.list[i].weather)
            // Weather Icon
            var weatherIcon = response.list[i].weather[0].icon
            console.log(weatherIcon)
            // Weather Description
            var weatherDesc = response.list[i].weather[0].description
            // Temperature
            var farTempFuture = Math.round(response.list[i].main.temp)
            // Humidity
            var humidity = response.list[i].main.humidity
            //Wind Speed
            var windSpeed = response.list[i].wind.speed
            // Latitude for *UV Index*
            console.log(response.city.coord.lat)
            var iconPic = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`


            // Creating dynamic bootstrap cards for days 1-4
            var weatherCard = $(`<div id="card-${i}" class= "col-md-3">
                                <div class="card" style="max-width: 15rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${dateEl.toDateString()}</h5>
                                        <img src="${iconPic}">
                                        <p class="card-text">${weatherDesc}</p>
                                        <p class="card-text">Temperature: ${farTempFuture}</p>
                                        <p class="card-text">Humidity: ${humidity}</p>
                                        <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                                </div>`)

            // Creating paragraph tag with weather data
            resultsArea.append(weatherCard)



        }
    })
}

// Function for displaying weather data
function selectWeather() {
    var apiKey = "7d7923df6842bd1066fc6aab55ecf56b"
    var cityName = $("#userInput").val().trim()
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    console.log(queryURL)



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
// Function for jumbotron (current day weather)
// City Name
var properCity = response.city.name
// Weather Icon
var weatherIcon = response.list[0].weather[0].icon
// Weather Description
var weatherDesc = response.list[0].weather[0].description
// Temperature
var farTempCurr = Math.round(response.list[0].main.temp)
// Humidity
var humidity = response.list[0].main.humidity
// Wind speed
var windSpeed = response.list[0].wind.speed

// Variables for Lat and Lon
var lat = response.city.coord.lat;
var lon = response.city.coord.lon;

var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}&units=imperial`
console.log(uvUrl)

console.log(cityName)
$.ajax({
    url: uvUrl,
    method: "GET"
}).then(function (response) {
    // UV Index
    var uvIndex = response.value
    console.log(response)

var iconPic = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
// Creating dynamic bootstrap jumbotron for current day
    var currentDayJumbo = $(`<div class="jumbotron">
    <h1 class="display-4">${properCity}</h1>
    <img src="${iconPic}">
    <hr class="my-4">
    <p class="card-text">${weatherDesc}</p>
    <p class="card-text">Temperature: ${farTempCurr}</p>
    <p class="card-text">Humidity: ${humidity}</p>
    <p class="card-text" id="uvElem">UV Index: ${uvIndex}</p>
    <p class="card-text">Wind Speed: ${windSpeed}</p>
    </div>`)
    jumboArea.append(currentDayJumbo)
    uvColor()
            // Function for UV Index CSS
            function uvColor () {
                if (uvIndex < 3) {
                document.getElementById("uvElem").classList.add('greenIndex')
                }
                if (uvIndex < 6 && uvIndex >= 3) {
                document.getElementById("uvElem").classList.add('yellowIndex')
                }
                if (uvIndex < 8 && uvIndex >= 6) {
                document.getElementById("uvElem").classList.add('orangeIndex')
                }
                if (uvIndex < 11 && uvIndex >= 8) {
                document.getElementById("uvElem").classList.add('redIndex')
                }
            }

})

        // Looping through each subsequent day
        for (var i = 5; i < 30; i += 8) {
            // Date
            var dateEl = new Date(response.list[i].dt_txt)
            console.log(response.list[i].weather)
            // Weather Icon
            var weatherIcon = response.list[i].weather[0].icon
            console.log(weatherIcon)
            // Weather Description
            var weatherDesc = response.list[i].weather[0].description
            // Temperature
            var farTempFuture = Math.round(response.list[i].main.temp)
            // Humidity
            var humidity = response.list[i].main.humidity
            //Wind SpeedS
            var windSpeed = response.list[i].wind.speed
            // Latitude for *UV Index*
            console.log(response.city.coord.lat)
            var iconPic = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`


            // Creating dynamic bootstrap cards for days 1-4
            var weatherCard = $(`<div id="card-${i}" class= "col-md-3"">
                                <div class="card" style="max-width: 15rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${dateEl.toDateString()}</h5>
                                        <img src="${iconPic}">
                                        <p class="card-text">${weatherDesc}</p>
                                        <p class="card-text">Temperature: ${farTempFuture}</p>
                                        <p class="card-text">Humidity: ${humidity}</p>
                                        <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                                </div>`)

            // Creating paragraph tag with weather data
            resultsArea.append(weatherCard)

        }
    })


    }
