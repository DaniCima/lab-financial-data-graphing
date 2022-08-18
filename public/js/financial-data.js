let fromDate = "2022-01-01";
let toDate = "2022-07-01";
let dates;
let prices;

function getData() {
  //   //clears the old chart to draw a new one
  //   let chartStatus = Chart.getChart("myChart");
  //   if (chartStatus != undefined) {
  //     chartStatus.destroy();
  //   }

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    )
    .then((response) => {
      dates = Object.keys(response.data.bpi);
      prices = Object.values(response.data.bpi);

      //  console.log(`Dates: ${dates} & Prices: ${prices}`);
      printTheChart();
    })
    .catch((err) => console.log("Error while getting the data: ", err));

  function printTheChart() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Price History",
            data: prices,
            backgroundColor: "red",
            borderColor: "blue",
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

getData();

let dateFromElement = document.getElementById("start-date");
dateFromElement.addEventListener("change", () => {
  fromDate = dateFromElement.value;
  console.log(dateFromElement.value);
  getData();
});

let dateToElement = document.getElementById("end-date");
dateToElement.addEventListener("change", () => {
  toDate = dateToElement.value;
  console.log(dateToElement.value);
  getData();
});
