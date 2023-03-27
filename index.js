// api key 1ed8ca52fcabda530685294550cfbdd9
// var setup
var container = document.getElementById("weather")
var h2 = document.createElement("h2")
var form = document.querySelector("form")
var userInput
var queryString 
var fullURL = URL + queryString
var URL = "https://api.openweathermap.org/data/2.5/weather"

form.onsubmit = function(e) {
    e.preventDefault()
    container.innerHTML = ''
   userInput = this.search.value.trim() 
   if (!userInput) return
    form.search.value = ''
    queryString = "?units=imperial&appid=1ed8ca52fcabda530685294550cfbdd9&q=" + userInput
    fullURL = URL + queryString
    fetch(fullURL)
    .then(function(res) {
        // should display "location not found" if no location is found
        if (res.status !== 200){
            throw new Error('Location not Found')
        }
        return res.json()
    })
    .then(function(data) {
        // location
        h2.textContent = data.name + ', ' + data.sys.country
        container.appendChild(h2)
        var br = document.createElement('br')
        // show map
        var map = document.createElement('a')
        long = data.coord.lon
        lat = data.coord.lat
        map.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long)
        map.textContent = 'Click to view map'
        container.appendChild(map)
        // weather
        var description = document.createElement('p')
        description.style.textTransform = 'capitalize'
        description.textContent = data.weather[0].description
        container.appendChild(description)
        // icon
        var img = document.createElement('img')
        img.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
        container.appendChild(img)
        // current temp
        var currentTemp = document.createElement('p')
        currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
        container.appendChild(currentTemp)
        // feels like temp
        var feelsLike = document.createElement('p')
        feelsLike.textContent = 'Feels like: ' + data.main.feels_like + ' °F'
        container.appendChild(feelsLike)
        // last calc
        var date = new Date(data.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        // last updated
        var lastUpdated = document.createElement('p')
        lastUpdated.textContent = 'Last Updated: ' + timeString
        container.appendChild(lastUpdated)
    })
    .catch(function(err) {
    var errMessage = document.createElement('h2')
    errMessage.textContent = 'Location not Found'
        container.appendChild(errMessage)
    })
}