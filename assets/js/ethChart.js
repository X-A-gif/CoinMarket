
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



google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(getData);


function getData(){
  var coin = JSON.parse(localStorage.getItem("coin"));
  var symbol = coin.symbol;
   
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
