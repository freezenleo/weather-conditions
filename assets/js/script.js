var searchBarEl = document.querySelector("#search-bar");
var cityNameEl = document.querySelector("#cityname");
var cityListBtn = document.querySelector("#citylist-btn");
var currentSearchCityEl = document.querySelector("#current-search-city");
var currentCityInfoEl = document.querySelector("#current-city-info");

var cityNameSubmit = function (event) {
    event.preventDefault();
    console.log(event);

    //get value from input
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getSearchCity(cityName);
        cityNameEl.value = "";
    }
    else {
        alert("Please Enter a City Name");
    }
}

//submit button event listener
searchBarEl.addEventListener("submit", cityNameSubmit);

var displayWeather = function (data, searchTerm) {
    console.log("data", data);
    console.log("searchTerm", searchTerm);

    //check if api returned any data
    if (data.length === 0) {
        currentSearchCityEl.textContent = "No Weather Info Found";
        return;
    }

    var lati = data.coord.lat;
    var longi = data.coord.lon;
    var apiUrlLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&units=imperial&appid=dc958acf9753f5bb2aae083119c7a2da";

    fetch(apiUrlLatLon)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayLonLat(data);
                    console.log("lon&lat", data);
                })
            }
            else {
                alert("Error: city not found");
            }
        })


    //clear old content
    currentSearchCityEl.textContent = "";
    currentSearchCityEl.textContent = searchTerm;

    var timestamp = new Date(data.dt * 1000);
    var day = timestamp.getDate();
    var month = timestamp.getMonth();
    var year = timestamp.getFullYear();
    var date = month + "/" + day + "/" + year;
    console.log("dateString", date);


    var dateInput = document.createElement("span");
    dateInput.addClass = "date";
    dateInput.textContent = "   " + date + "   ";
    currentSearchCityEl.appendChild(dateInput);

    var imgEl = document.createElement("img");
    imgEl.addClass = "wicon";
    imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    currentSearchCityEl.appendChild(imgEl);
}

var displayLonLat = function (data) {
    var tempEl = document.createElement("li");
    tempEl.classList = "list-group-item";
    tempEl.textContent = "Temp: " + data.current.temp + " \u00B0F";
    currentCityInfoEl.appendChild(tempEl);

    var windEl = document.createElement("li");
    windEl.classList = "list-group-item";
    windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
    currentCityInfoEl.appendChild(windEl);

    var humidityEl = document.createElement("li");
    humidityEl.classList = "list-group-item";
    humidityEl.textContent = "Humidity: " + data.current.humidity + " % ";
    currentCityInfoEl.appendChild(humidityEl);

    var uvIndexEl = document.createElement("li");
    uvIndexEl.classList = "list-group-item";
    uvIndexEl.textContent = "UV Index: " + data.current.uvi;
    currentCityInfoEl.appendChild(uvIndexEl);
}

var displayForecast = function (data) {
    for (var i = 0; i < daily.length; i++) {

    }

}

//fetch data from sever
var getSearchCity = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=dc958acf9753f5bb2aae083119c7a2da";

    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, cityName);
                });
            }
            else {
                alert("Error: City not found");
            }
        });
}

getSearchCity("Houston");
