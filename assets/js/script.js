var searchBarEl = document.querySelector("#search-bar");
var cityNameEl = document.querySelector("#cityname");
var cityListBtn = document.querySelector("#citylist-btn");
var currentSearchCityEl = document.querySelector("#current-search-city");
var currentCityInfoEl = document.querySelector("#current-city-info");
var fiveDayContEl = document.querySelector("#five-day-container");

//init btnArr var
var btnArr = JSON.parse(localStorage.getItem("buttons")) || [];
console.log("btnArr", btnArr);

//load local storage
var loadBtns = function () {
    for (var i = 0; i < btnArr.length; i++) {
        var btnEl = document.createElement("button");
        btnEl.classList = btnArr[i].bClass = "btn btn-block btn-city text-white mt-2 mb-2 bg-primary";

        var cityName = btnEl.textContent = btnArr[i].city;
        cityListBtn.appendChild(btnEl);
        btnEl.addEventListener("click", () => {
            getSearchCity(cityName)
        });
    }
}

loadBtns();


//search input submit
var cityNameSubmit = function (event) {
    event.preventDefault();
    console.log("event", event);

    //get value from input
    var cityName = cityNameEl.value.trim();

    console.log("cityname:", cityName);

    if (cityName) {
        getSearchCity(cityName);
        cityNameEl.value = "";
    }
    else {
        alert("Please Enter a City Name");
        return;
    }

    // cityBtn(cityName);
}

//input submit button event listener
searchBarEl.addEventListener("submit", cityNameSubmit);


// display current weather condition
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
    currentCityInfoEl.textContent = "";
    fiveDayContEl.textContent = "";
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

//convert city name to lat&lon
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

    displayForecast(data);
}

//create 5 day forecast
var displayForecast = function (data) {
    for (var i = 0; i < 5; i++) {
        var singleDay = document.createElement("div");
        singleDay.classList = "text-left text-white bg-dark p-3 m-auto";

        var timestamp = new Date(data.daily[i].dt * 1000);
        var day = timestamp.getDate();
        var month = timestamp.getMonth();
        var year = timestamp.getFullYear();
        var date = month + "/" + day + "/" + year;
        console.log("dateString", date);

        var dateInputSingle = document.createElement("ul");
        dateInputSingle.classList = "list-group";
        dateInputSingle.textContent = "   " + date + "   ";
        singleDay.appendChild(dateInputSingle);

        var imgElSingle = document.createElement("img");
        imgElSingle.classList = "wicon";
        imgElSingle.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        singleDay.appendChild(imgElSingle);

        var tempEl = document.createElement("ul");
        tempEl.classList = "list-group pt-3";
        tempEl.textContent = "Temp: " + data.daily[i].temp.eve + " \u00B0F";
        singleDay.appendChild(tempEl);

        var windEl = document.createElement("ul");
        windEl.classList = "list-group pt-3";
        windEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        singleDay.appendChild(windEl);

        var humidityEl = document.createElement("ul");
        humidityEl.classList = "list-group pt-3";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " % ";
        singleDay.appendChild(humidityEl);

        fiveDayContEl.appendChild(singleDay);
    }
}

//create city list buttons
var cityBtn = function (cityName) {
    var btnEl = document.createElement("button");
    btnClass = btnEl.classList = "btn btn-block btn-city text-white mt-2 mb-2 bg-primary";
    btnEl.addEventListener("click", () => {
        getSearchCity(cityName)
    });
    btnText = btnEl.textContent = cityName;
    cityListBtn.appendChild(btnEl);

    btnNew = ({
        city: btnText,
        bClass: btnClass
    });
    btnArr.push(btnNew);
    saveBtns();
}

//save city list buttons
var saveBtns = function () {

    localStorage.setItem("buttons", JSON.stringify(btnArr));
}

//fetch data from sever
var getSearchCity = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=dc958acf9753f5bb2aae083119c7a2da";

    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log("firstdata", data);
                    if (cityName.toLowerCase() === data.name.toLowerCase()) {
                        displayWeather(data, cityName);
                        var shouldAddButton = true;
                        for (var i = 0; i < btnArr.length; i++) {
                            if (btnArr[i].city.toLowerCase() === cityName.toLowerCase()) {
                                shouldAddButton = false;
                            }
                        }
                        if (shouldAddButton) {
                            cityBtn(cityName);
                        }
                    }
                    else {
                        alert("enter name");
                        return;
                    }
                });
            }

            else {
                currentSearchCityEl.textContent = "";
                currentCityInfoEl.textContent = "";
                fiveDayContEl.textContent = "";
                currentSearchCityEl.textContent = "Please enter a city name"
                return;
            }
        });
}

getSearchCity();