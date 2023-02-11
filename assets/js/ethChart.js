
// const ctx = document.getElementById('eth-chart').getContext('2d');
// const chart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Green',],
//         datasets: [{
//             label: 'Ethereum Price (USD)',
//             backgroundColor: 'rgb(255, 99, 132)',
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 99, 132, 0.2)',
//             ],
//             data: [] 
//         }],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//         ],
        
//     },
    
//     pan: {
//         enabled: true,
//         mode: 'x'
//     },
//     zoom: {
//         enabled: true,
//         mode: 'x'
//                 }
// });


function displayCoin() {
    var storedCoin = localStorage.getItem("coin");
    if (storedCoin) {
      var coinObj = JSON.parse(storedCoin);
      var coinName = coinObj.name;
      var coinPrice = coinObj.price;
      var coinMktCap = coinObj.marketCap;
      var coinSupply = coinObj.supply;
  
      document.getElementById("coin-name").innerHTML = coinName;
      document.getElementById("coin-price").innerHTML = coinPrice;
      document.getElementById("coin-mktCap").innerHTML = coinMktCap;
      document.getElementById("coin-supply").innerHTML = coinSupply;
    }
  }

  displayCoin();


// const updatePrice = async () => {
//     try {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//         const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + variable + "&tsym=USD&limit=7&toTs={Math.floor(oneWeekAgo / 1000)}`);
//         const data = await response.json();
//         console.log(data);
//         chart.data.labels = data.Data.Data.map(day => new Date(day.time * 1000).toLocaleDateString());
//         chart.data.datasets[0].data = data.Data.Data.map(day => day.close);
//         chart.update();
//     } catch (error) {
//         console.error(error);
//     }
// };

// updatePrice();

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(getData);


function getData(){
  var coin = JSON.parse(localStorage.getItem("coin"));
  var symbol = coin.symbol;
   // var symbol = "ETH"
    //var histDataUrl = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + symbol + "&tsym=USD&limit=30&aggregate=3&e=CCCAGG"
    
    //var histDataUrl = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=3&e=CCCAGG"
    var histDataUrl = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + symbol + "&tsym=USD&limit=4"

    fetch(histDataUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
    
      return response.json();
    })
    .then(function (hisData2) {
      if(hisData2.length === 0){
       return;
    }
    console.log("hisdata2 in draw chart")
    console.log(hisData2)
    for(let i = 0; i < hisData2.Data.Data.length; i++){
    var date = new Date(hisData2.Data.Data[i].time * 1000);
    var date2 = dayjs(date).format('MM/DD/YYYY') // '25/01/2019'
    hisData2.Data.Data[i].time = date2
    }
    var newArr = hisData2.Data.Data;
    
    var data = google.visualization.arrayToDataTable([
     
    [newArr[0].time, newArr[0].low, newArr[0].open, newArr[0].close, newArr[0].high],
    [newArr[1].time, newArr[1].low, newArr[1].open, newArr[1].close, newArr[1].high],
    [newArr[2].time, newArr[2].low, newArr[2].open, newArr[2].close, newArr[2].high],
    [newArr[3].time, newArr[3].low, newArr[3].open, newArr[3].close, newArr[3].high],
    [newArr[4].time, newArr[4].low, newArr[4].open, newArr[4].close, newArr[4].high]
    
    // Treat first row as data as well.
    ], true);
    
    var options = {
        legend: 'none',
        //bar: { groupWidth: '100%' }, // Remove space between bars.
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
          risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
        }
      };
    
    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    
    chart.draw(data, options);

    
    })
    .catch(function (error) {
      console.error(error);
    });
}
