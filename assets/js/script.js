var searchBarEl = document.querySelector("#search-bar");
var cityNameEl = document.querySelector("#cityname");
var cityListBtn = document.querySelector("#citylist-btn");
var currentCityInfoEl = document.querySelector("#current-city-info")

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
        currentCityInfoEl.textContent = "No Weather Info Found";
        return;
    }

    //clear old content
    currentCityInfoEl.textContent = "";
    currentCityInfoEl.textContent = searchTerm;

    var
}


//fetch data from sever
var getSearchCity = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=dc958acf9753f5bb2aae083119c7a2da";
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
