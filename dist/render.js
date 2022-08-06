class Renderer {
  constructor() {}
  renderData(cities) {
    $("#display-data").empty();
    const source = $("#weather-template").html();
    const template = Handlebars.compile(source);
    let newHTML = template({ cities });
    $("#display-data").append(newHTML);
  }
}
