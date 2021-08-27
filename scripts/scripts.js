// Mobile-menu

const mobileBtn = document.querySelector(".mobile-menu");
const menu = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav-item");

let showMenu = false;

mobileBtn.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    mobileBtn.classList.add("close");
    menu.classList.add("show");
    navItems.forEach((item) => item.classList.add("show"));
    showMenu = true;
  } else {
    mobileBtn.classList.remove("close");
    menu.classList.remove("show");
    navItems.forEach((item) => item.classList.remove("show"));
    showMenu = false;
  }
}

//Todo list

const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button");
const todoList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

showTasks();

addBtn.onclick = () => {
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  const pendingTasksNumb = document.querySelector(".pending-tasks");
  pendingTasksNumb.textContent = listArray.length;
  if (listArray.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = () => {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
};

// Weather App
//Only works when geoLocation in the browser is allowed, well it use to be like that
//but if you click the sun it will get you´r position

let temperatureDegree = document.querySelector(".temperature-degree");
let locationName = document.querySelector(".location-name");
let tempDesc = document.querySelector(".overall-description");
let iconBtn = document.querySelector(".weather-icon");
let lon;
let lat;

window.addEventListener("load", () => {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=36.435784&lon=28.2041933&appid=00154f1b454735ef4a14bdff2291f164`;
  getWeather(api);
});

iconBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=00154f1b454735ef4a14bdff2291f164`;
      getWeather(api);
    });
  }
});

function getWeather(api) {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      temperatureDegree.textContent =
        Math.round(parseFloat(data.main.temp) - 273.15) + "°C";
      locationName.textContent = data.name;
      tempDesc.textContent = data.weather[0].description;
      iconBtn.innerHTML = `<img src="images/weather-icons/${data.weather[0].icon}.png">`;
    });
}
