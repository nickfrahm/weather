//initialize the page with Chicago weather.
document.addEventListener('DOMContentLoaded', init);

//on search btn click, update the UI with temp for city
document.querySelector('.searchBtn').addEventListener('click', getWeather);

async function init() {
  //fetch data from Open Weather for Chicago
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=90b1c6e0ce37239d791614f89fc4405a'
  );
  const chicagoWeather = await res.json();
  console.log(chicagoWeather);

  document.querySelector('.location').textContent = chicagoWeather.name;

  const temp = document.querySelector('.temp');
  temp.innerHTML = Math.round(chicagoWeather.main.temp) + '&#176;F';

  const type = document.querySelector('.type');
  type.textContent = chicagoWeather.weather[0].main;
}

async function getWeather() {
  //take input value and use it in api query with the active units
}
