const model = new Model();
const render = new Renderer();

const loadPage = function () {
  model.getDataFromDB().then(function () {
    render.renderData(model.cityData);
  });
};

window.onload = function () {
  loadPage();
};

const handleSearch = function (cityName) {
  model.getCityData(cityName).then(function () {
    render.renderData(model.cityData);
  });
};

$("#search").on("click", function () {
  const cityName = $("#city-input").val();
  if (cityName) {
    handleSearch(cityName);
    $("#city-input").val("");
  }
});

$("#display-data").on("click", "#save", async function () {
  const cityName = $(this).closest("#weather-item").find("#name").text();
  await model.saveCity(cityName);
  render.renderData(model.cityData);
});

$("#display-data").on("click", "#remove", async function () {
  const cityName = $(this).closest("#weather-item").find("#name").text();
  await model.removeCity(cityName);
  render.renderData(model.cityData);
});
