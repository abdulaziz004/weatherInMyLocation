//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//key : 10cd25f3fdc6187fce8f63163279268d

const key = "10cd25f3fdc6187fce8f63163279268d";
const k=273;

var xtemp = document.querySelector('.temperature-value');//<p>- °<span>C</span></p>
var xloc = document.querySelector('.location');//<p>-</p>
var xtempdes = document.querySelector('.temperature-description');//<p> - </p>
var ximg = document.querySelector('.weather-icon');


console.log('Hello universe!');

function getCords(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation);
    }else{
        alert(':(');
    }

}

function showLocation(pos){
    let lon = pos.coords.longitude;
    let lat = pos.coords.latitude;
    
    console.log(`Long : ${lon},  Lati : ${lat}`);

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            let T=Math.floor(data.main.temp)-273;
            let loc = data.name;
            let des = data.weather[0].description;
            let icn = data.weather[0].icon;
            console.log(`Temp : ${T}, Location : ${loc}, Des : ${des}, Icon : ${icn}`);
            renderData(T, loc, des, icn);
        })
}


function renderData(temp, location, description, icon){
    xtemp.innerHTML = `<p>${temp} °<span>C</span></p>`;
    xloc.innerHTML = `<p>${location}</p>`;
    xtempdes.innerHTML = `<p>${description}</p>`;
    ximg.innerHTML = `<img src="icons/${icon}.png" alt="">`
}

try {
    getCords()
} catch (error) {
    document.querySelector('.container').innerHTML = `<h3>Sorry!</h3>`;
    console.log(error);
}
