class Model {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    let arrayCity = [];
    await $.get(`/cities`, function (city) {
      city.forEach((c) =>
        arrayCity.push({
          name: c.name,
          temperature: c.temperature,
          condition: c.condition,
          conditionPic: c.conditionPic,
          IsExist: true,
        })
      );
    });
    this.cityData = arrayCity;
  }

  async getCityData(cityName) {
    let c = {};
    await $.get(`/city/${cityName}`, function (response) {
      c = {
        name: response.name,
        temperature: response.main.temp,
        condition: response.weather[0].main,
        conditionPic: response.weather[0].icon,
        IsExist: false,
      };
    });

    this.cityData.push(c);
    // console.log(this.cityData);
  }

  saveCity(cityName) {
    const city = this.cityData.find((city) => city.name === cityName);
    const c = {
      name: city.name,
      temperature: city.temperature,
      condition: city.condition,
      conditionPic: city.conditionPic,
    };
    $.post("/city", c, function (response) {});
    city.IsExist = true;
  }

  removeCity(cityName) {
    const city = this.cityData.find((city) => city.name === cityName);
    $.ajax({
      url: `city/${cityName}`,
      method: "DELETE",
      success: function () {},
    });
    city.IsExist = false;
  }
}
