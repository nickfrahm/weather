let unitState = 'imperial';

//initialize the page with Chicago weather.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.search').value = '';
  init();
});

//on search btn click, update the UI with temp for city
document.querySelector('.searchBtn').addEventListener('click', () => {
  getWeather(document.querySelector('.search').value, unitState);
});

//on click, change the "unit state"
document
  .querySelector('.unit-btns')
  .querySelectorAll('.btn')
  .forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const searchCity = document.querySelector('.search').value;
      const location = document.querySelector('.location').textContent;
      if (
        setUnitState(e) ||
        (!setUnitState(e) &&
          location !== searchCity.trim() &&
          searchCity.trim() !== '')
      ) {
        getWeather(searchCity.trim() === '' ? location : searchCity, unitState);
      }
    });
  });

async function init() {
  //fetch data from Open Weather for Chicago
  getWeather('Chicago', unitState);
}

async function getWeather(city, units) {
  //take input value and use it in api query with the active units
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=90b1c6e0ce37239d791614f89fc4405a`
    );
    if (res.status >= 400 && res.status < 600) {
      throw new Error('Bad response from server');
    }
    const weather = await res.json();
    console.log(weather);

    document.querySelector('.location').textContent = weather.name;

    const temp = document.querySelector('.temp');
    temp.innerHTML =
      Math.round(weather.main.temp) +
      '&#176;' +
      (unitState === 'metric' ? 'C' : 'F');

    const type = document.querySelector('.type');
    type.textContent = weather.weather[0].main;

    getGIF(city);
  } catch (error) {
    console.log('not a valid city');
  }
}

function setUnitState(e) {
  if (unitState === 'metric' && !e.target.classList.contains('active')) {
    unitState = 'imperial';
  } else if (
    unitState === 'imperial' &&
    !e.target.classList.contains('active')
  ) {
    unitState = 'metric';
  } else {
    return false;
  }

  document.querySelector('.active').classList.toggle('active');
  e.target.classList.toggle('active');

  return true;
}

async function getGIF(city) {
  try {
    const key = 'y1xUZYJE7UgU9RtMOLQKL1LIamvtWCc9';
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${city}`;
    const res = await fetch(url);
    if (res.status >= 400 && res.status < 600) {
      throw new Error('Bad response from server');
    }
    const gifData = await res.json();
    console.log(gifData);

    const img = document.querySelector('.weather-gif');
    img.src = gifData.data.images.original.url;
  } catch (error) {
    console.log('No GIF found.');
  }
}
