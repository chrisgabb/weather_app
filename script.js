var jumboArea = $("#jumbo-view")
var resultsArea = $("#card-view")
var lastSearch = localStorage.getItem('city_key')
console.log(lastSearch)
//var cityName = lastSearch
//window.onload = selectWeather()


$("#addCity").on("click", function (event) {
    event.preventDefault();
    console.log(cityName)
    jumboArea.empty()
    resultsArea.empty()
    var cityName = $("#userInput").val().trim()
    localStorage.setItem('city_key', cityName);
    selectWeather()

});

// Function for displaying weather data
function selectWeather() {
    var apiKey = "7d7923df6842bd1066fc6aab55ecf56b"
    var cityName = $("#userInput").val().trim()
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    console.log(queryURL)



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
// Function for jumbotron (current day weather)




    // Loop for first day (Index 0)
        for (var i = 0; i < 1; i++) {
            // City Name
            var properCity = response.city.name
            // Weather Icon
            var weatherIcon = response.list[i].weather[0].icon
            // Weather Description
            var weatherDesc = response.list[i].weather[0].description
            // Temperature
            var kelTemp = response.list[i].main.temp
            console.log(kelTemp)
            var farTemp = Math.floor(((kelTemp-273.15)*1.8)+32)
            // Humidity
            var humidity = response.list[i].main.humidity
            // Wind speed
            var windSpeed = response.list[i].wind.speed

            // Variables for Lat and Lon
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
            console.log(uvUrl)

            console.log(cityName)
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                // UV Index
                var uvIndex = response.value
                console.log(response)

        var iconPic = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
// Creating dynamic bootstrap jumbotron for current day
                var currentDayJumbo = $(`<div class="jumbotron">
                <h1 class="display-4">${properCity}</h1>
                <img src="${iconPic}">
                <hr class="my-4">
                <p class="card-text">${weatherDesc}</p>
                <p class="card-text">Temperature: ${farTemp}</p>
                <p class="card-text">Humidity: ${humidity}</p>
                <p class="card-text">UV Index: ${uvIndex}</p>
                <p class="card-text">Wind Speed: ${windSpeed}</p>
                </div>`)
                jumboArea.append(currentDayJumbo)

            })

        }
        // Looping through each subsequent day
        for (var i =+ 5; i < 30; i += 7) {
            // Date
            var dateEl = new Date(response.list[i].dt_txt)
            console.log(response.list[i].weather)
            // Weather Icon
            var weatherIcon = response.list[i].weather[0].icon
            console.log(weatherIcon)
            // Weather Description
            var weatherDesc = response.list[i].weather[0].description
            // Temperature
            var kelTemp = response.list[i].main.temp
            var farTemp = Math.floor(((kelTemp-273.15)*1.8)+32)
            // Humidity
            var humidity = response.list[i].main.humidity
            //Wind Speed
            var windSpeed = response.list[i].wind.speed
            // Latitude for *UV Index*
            console.log(response.city.coord.lat)
            var iconPic = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`


            // Creating dynamic bootstrap cards for days 1-4
            var weatherCard = $(`<div id="card-${i}" class= "col-md-3">
                                <div class="card" style="width: 15rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${dateEl.toDateString()}</h5>
                                        <img src="${iconPic}">
                                        <p class="card-text">${weatherDesc}</p>
                                        <p class="card-text">Temperature: ${farTemp}</p>
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