const weatherForm = document.querySelector("form");
const input = document.querySelector("#address");
const errorMessage = document.querySelector("#error");
const table = document.querySelector("table");
const loader = document.querySelector("#loader");
loader.style.visibility = "hidden";
errorMessage.style.visibility = "hidden";
table.style.visibility = "hidden";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  input.value = "";
  errorMessage.style.visibility = "hidden";
  loader.style.visibility = "visible";

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        loader.style.visibility = "hidden";
        table.style.visibility = "hidden";
        errorMessage.style.visibility = "visible";
        console.log(data.error);
        document.querySelector("#error").innerHTML =
          "Location not found. Please try another location.";
      } else {
        loader.style.visibility = "hidden";
        errorMessage.style.visibility = "hidden";
        document.querySelector("#data").innerHTML = constructTable(
          data.forecast
        );
        table.style.visibility = "visible";
      }
    });
  });
});

function constructTable(data) {
  let tableString = "<tr><th>Attribute</th><th>Data</th></tr>";
  for (const [key, value] of Object.entries(data)) {
    tableString += "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
  }
  return tableString;
}
