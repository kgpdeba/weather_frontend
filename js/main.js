const loc_name = document.querySelector(".input-location");
const temp = document.querySelector(".temp");
const expected = document.querySelector(".expected");
const icon = document.querySelector(".imgContainer img");
const suggestion = document.querySelector(".suggestion-box");
const cities=["kolkata","Delhi","Agra","Rajasthan","London","chennai","pune","mumbai","kashmir","patna"];
// const liItems=document.querySelector('li');

// get weather data using api
async function getWeatherData() {
  response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${loc_name.value}&aqi=no`
  )
    .then((data) => {
      console.log(data);
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(response);

  addWeatherData();
}

function addWeatherData() {
  loc_name.value = response.location.name;

  temp.innerHTML = `${response.current.temp_c}<sup>o</sup>`;
  expected.innerHTML = `Feels like ${response.current.feelslike_c}<sup>o</sup>`;

  if (response.current.temp_c < 5) {
    // console.log("hello  ");
    icon.src = "./images/icons/static/snowy-6.svg";
  } else if (response.current.temp_c >= 5 && response.current.temp_c < 10) {
    icon.src = "./images/icons/static/snowy-3.svg";
  } else if (response.current.temp_c >= 10 && response.current.temp_c < 20) {
    icon.src = "./images/icons/static/rainy-4.svg";
  } else if (response.current.temp_c >= 20 && response.current.temp_c < 30) {
    icon.src = "./images/icons/static/cloudy-day-3.svg";
  } else if (response.current.temp_c >= 30 && response.current.temp_c < 40) {
    icon.src = "./images/icons/static/cloudy-day-1.svg";
  }
}

loc_name.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getWeatherData();
  }
});

// loc_name.addEventListener('click',()=>
// {
//   suggestion.classList.remove('hide');
// })

document.querySelector('ul').addEventListener('click',(e)=>
{
  loc_name.value=e.target.textContent;
  getWeatherData();
})

window.addEventListener("click", (e) => {
  if (e.target == loc_name) {
    suggestion.classList.remove("hide");
  } else {
    suggestion.classList.add("hide");
  }
});

//iife
(function addCities(){
  cities.forEach((city)=>{
    let li=document.createElement('li');
    li.textContent=city;
    document.querySelector('ul').appendChild(li);
  })
})()