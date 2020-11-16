let cardEl = document.querySelector("#card")
function searchUserInput(){
    let searchInput = document.querySelector('#userSearch').value
    fetchRequest(searchInput);
}
//create list items in search card
function createListItem(data){
    //create a button when function is called
    var buttonEl = document.createElement('button');
    //give created button an id of idCounter
    buttonEl.setAttribute('id',data.name);
    //give button a bootstrap class of list-group-item
    buttonEl.setAttribute('class', 'list-group-item');
    buttonEl.setAttribute('onclick', `fetchRequestOnSymanticButtons("${data.name}")`);
    //set ulEl to the ul with id of #location from index.html
    var divEl = document.querySelector('#location');
    //append buttonEl to ulEl
    divEl.appendChild(buttonEl);
    //set text content of buttonEl to be the name of the location
    buttonEl.textContent = data.name;
}

function displayName(data){
    let cityEl = document.createElement("h1")
    cardEl.innerHTML=" "
    cityEl.textContent = data.name
    cardEl.append(cityEl)
}

//on click grab input info
document.querySelector('#search-button').addEventListener('click', searchUserInput);

function fetchRequestOnSymanticButtons(buttonEl) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + buttonEl +
        '&units=imperial&appid=c93b860884868c3adec3667f61e5a6cb')
      .then(function (response) {
        if (!response.ok) { // Request failed, go to catch
          throw Error(response.statusText); // throw will stop execution of the promise chain and jump to catch
        }
        return response.json()
      })
      .then(function (data) {
          displayName(data)
        let coordinates = {
            longitude:data.coord.lon,
            latitude:data.coord.lat
        };
        return coordinates;
      })
      // pass coordinate object along
      .then(function(response){
          console.log(response)
          return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
                + response.latitude + '&lon=' 
                + response.longitude + 
                '&daily&exclude=hourly,minutely&units=imperial&appid=951ac77f9019903879e8df930449019e')
      })
      // return response in JSON
      .then (function(response){  
        return response.json()
      })
      //consoloe log JSON response
      .then (function(data){
        displayRequest(data)
        displayRequestBlue(data)
        //createListItem(data)
      })
      .catch(function (error) {
        alert(error);
      });
    }

// fetch from open weather API and  
function fetchRequest(searchInput) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + searchInput +
        '&units=imperial&appid=c93b860884868c3adec3667f61e5a6cb')
      .then(function (response) {
        if (!response.ok) { // Request failed, go to catch
          throw Error(response.statusText); // throw will stop execution of the promise chain and jump to catch
        }
        return response.json()
      })
      .then(function (data) {
        createListItem(data)
          displayName(data)
        let coordinates = {
            longitude:data.coord.lon,
            latitude:data.coord.lat
        };
        return coordinates;
      })
      // pass coordinate object along
      .then(function(response){
          console.log(response)
          return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
                + response.latitude + '&lon=' + response.longitude + '&daily&exclude=hourly,minutely&units=imperial&appid=c93b860884868c3adec3667f61e5a6cb')
      })
      // return response in JSON
      .then (function(response){  
        return response.json()
      })
      //consoloe log JSON response
      .then (function(data){
        displayRequest(data)
        displayRequestBlue(data)
        //createListItem(data)
      })
      .catch(function (error) {
        alert(error);
      });
    }

//get all the weather api info
function displayRequest(data){
    console.log(data);
    // create card content 
    // city and date
    let dateEl = document.createElement('p')
    dateEl.textContent = data.current.dt
    // weather icon
    let imgEl = document.createElement("img");
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png')
    //temperature 
    let tempEl = document.createElement('p');
    tempEl.textContent = 'Temp: '+ data.current.temp + " °F"
    // humidity
    let humidityEl = document.createElement('p')
    humidityEl.textContent = 'Humidity: '+ data.current.humidity + "%"
    // wind speed
    let windEl = document.createElement('p')
    windEl.textContent = 'Wind Speed: '+data.current.wind_speed + " mph"
    // uv index
    let uvEl = document.createElement('p')
    uvEl.setAttribute('class', 'bg-danger');
    uvEl.setAttribute('style', 'width: fit-content; padding: 0 10px 0 10px; border-radius: 10px;');
    

    uvEl.textContent = 'UV: '+data.current.uvi
    // append content to card
    cardEl.append(dateEl);
    cardEl.append(imgEl);
    cardEl.append(tempEl);
    cardEl.append(humidityEl)
    cardEl.append(windEl);
    cardEl.append(uvEl)
}

function displayRequestBlue(data){
    console.log(data);
    // create card content 
    // city and date
    let date1 = document.getElementById('date1')
    date1.textContent = data.daily[0].dt
    let date2 = document.getElementById('date2')
    date2.textContent = data.daily[1].dt
    let date3 = document.getElementById('date3')
    date3.textContent = data.daily[2].dt
    let date4 = document.getElementById('date4')
    date4.textContent = data.daily[3].dt
    let date5 = document.getElementById('date5')
    date5.textContent = data.daily[4].dt
    //temperature 
    let temp1 = document.getElementById('temp1')
    temp1.textContent = data.daily[0].temp.day+'°F'
    let temp2 = document.getElementById('temp2')
    temp2.textContent = data.daily[1].temp.day+'°F'
    let temp3 = document.getElementById('temp3')
    temp3.textContent = data.daily[2].temp.day+'°F'
    let temp4 = document.getElementById('temp4')
    temp4.textContent = data.daily[3].temp.day+'°F'
    let temp5 = document.getElementById('temp5')
    temp5.textContent = data.daily[4].temp.day='°F'
    // humidity
    let humidity1 = document.getElementById('humidity1')
    humidity1.textContent = data.daily[0].humidity+'%'
    let humidity2 = document.getElementById('humidity2')
    humidity2.textContent = data.daily[1].humidity+'%'
    let humidity3 = document.getElementById('humidity3')
    humidity3.textContent = data.daily[2].humidity+'%'
    let humidity4 = document.getElementById('humidity4')
    humidity4.textContent = data.daily[3].humidity+'%'
    let humidity5 = document.getElementById('humidity5')
    humidity5.textContent = data.daily[4].humidity
}+'%'