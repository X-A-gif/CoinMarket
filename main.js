var tableBody = document.querySelector("tbody");

function setCoin(event) {
  console.log(event.currentTarget.getAttribute("data-fn"));
  console.log(event.currentTarget.getAttribute("data-price"));
  console.log(event.currentTarget.getAttribute("data-mktCap"));
  console.log(event.currentTarget.getAttribute("data-supply"));

  var targetName = event.currentTarget.getAttribute("data-fn");
  var targetPrice = event.currentTarget.getAttribute("data-price");
  var targetMktCap = event.currentTarget.getAttribute("data-mktCap");
  var targetSupply = event.currentTarget.getAttribute("data-supply");
  var targetSymbol = event.currentTarget.getAttribute("data-symbol");


  var coinObj = {
    "name": targetName,
    "price": targetPrice,
    "marketCap": targetMktCap,
    "supply": targetSupply,
    "symbol": targetSymbol
  }
  var coinObjString = JSON.stringify(coinObj);
  localStorage.setItem("coin", coinObjString)

}
var  myChart;
/**
 * adds the coin to watchlist
 * @param {coin} coinName the coin object saved to local storage
 */
function setWatch (coinName) {
  var favoritedCoins = JSON.parse(localStorage.getItem("allFavorites"));
  if(favoritedCoins === null) favoritedCoins=[];
  var watchList = {
    name: coinName
  };
  localStorage.setItem("watch", JSON.stringify(watchList))
  favoritedCoins.push(watchList)
  localStorage.setItem("allFavorites", JSON.stringify(favoritedCoins))
}

function price() {
 fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
    .then(response => response.json())
    .then(data => {

    console.log(data)
      const coinData = data.Data;

      for (let i = 0; i < 20; i++) {
        
        var tableRow = document.createElement("tr");

        var tableIconHolder = document.createElement("td");
        var addButton = document.createElement("button");
        var addIcon = document.createElement("i");

        var tableIndex = document.createElement("td");
        var tableCoinName = document.createElement("td");
        var tableNameAnchor = document.createElement("a");

        var tableCoinPrice = document.createElement("td");
        var tableHour = document.createElement("td");
        var tableMktCap = document.createElement("td");
        var tableSupply = document.createElement("td");
        var tableVol = document.createElement("td");

        var hrefAtt = document.createAttribute("href");
        
        var fullNameAtt = document.createAttribute("data-fn");
        var priceAtt = document.createAttribute("data-price");
        var marketAtt = document.createAttribute("data-mktCap");
        var coinSupply = document.createAttribute("data-supply");
        var coinSupply = document.createAttribute("data-vovl");

        var classAtt = document.createAttribute("class");

        var SevenDays = document.createElement("td");
        var canvasDiv = document.createElement("div")

        canvasDiv.style.height = "100px"
        canvasDiv.style.width = "300px"
           
        tableIconHolder.appendChild(addIcon);
        tableRow.appendChild(tableIconHolder);

        addButton.textContent= "star";
        addButton.setAttribute("class", "material-icons");
        tableRow.appendChild(addButton);
        

        tableIndex.textContent = i+1;
        tableRow.appendChild(tableIndex);

        var targetName=coinData[i].CoinInfo.FullName;
  var targetPrice = coinData[i].RAW.USD.PRICE;
  var targetMktCap = coinData[i].RAW.USD.MKTCAP;
  var targetSupply = coinData[i].RAW.USD.SUPPLY;
  var targetSymbol = coinData[i].RAW.USD.FROMSYMBOL;

        let coinObj = {
          "name": targetName,
          "price": targetPrice,
          "marketCap": targetMktCap,
          "supply": targetSupply,
          "symbol": targetSymbol
        }
        
        tableNameAnchor.innerHTML = coinData[i].CoinInfo.FullName
        tableNameAnchor.setAttributeNode(hrefAtt);
        tableNameAnchor.setAttribute("href", "./assets/ethChart.html");
        addButton.addEventListener("click", function () {
          
          setWatch(coinObj)});
        
        tableNameAnchor.setAttributeNode(fullNameAtt);
        tableNameAnchor.setAttributeNode(priceAtt);
        tableNameAnchor.setAttributeNode(marketAtt);
        tableNameAnchor.setAttributeNode(coinSupply);
        
        
        tableNameAnchor.setAttribute("data-fn", coinData[i].CoinInfo.FullName);
        tableNameAnchor.setAttribute("data-price", coinData[i].RAW.USD.PRICE);
        tableNameAnchor.setAttribute("data-mktCap", coinData[i].RAW.USD.MKTCAP);
        tableNameAnchor.setAttribute("data-supply", coinData[i].RAW.USD.SUPPLY);
        tableNameAnchor.setAttribute("data-symbol", coinData[i].RAW.USD.FROMSYMBOL);
        tableNameAnchor.setAttribute("data-vol", coinData[i].RAW.USD.TOTALVOLUME24H);

        tableNameAnchor.setAttributeNode(classAtt);
        tableNameAnchor.setAttribute("class", "coinLink");
        tableNameAnchor.addEventListener("click", setCoin);
        tableCoinName.appendChild(tableNameAnchor);
        tableRow.appendChild(tableCoinName);
       

        tableCoinPrice.innerHTML = coinData[i].RAW.USD.PRICE
        tableRow.appendChild(tableCoinPrice);

        var getChange24 =  coinData[i].DISPLAY.USD.CHANGEPCT24HOUR
        getChange24 = getChange24.charAt(0)
        if(getChange24 === "-"){
          tableHour.style.color = "red"
        }
        else{
          tableHour.style.color = "green"
        }

        tableHour.innerHTML = coinData[i].DISPLAY.USD.CHANGEPCT24HOUR + "%";
        tableRow.appendChild(tableHour);
        
        tableRow.appendChild(tableMktCap);
        tableMktCap.innerHTML = coinData[i].DISPLAY.USD.MKTCAP

        tableRow.appendChild(tableSupply);
        tableSupply.textContent = coinData[i].DISPLAY.USD.SUPPLY

        tableRow.appendChild(tableVol);
        tableVol.textContent = coinData[i].DISPLAY.USD.TOTALVOLUME24H


        var canvas=  document.createElement("canvas");

        tableRow.appendChild(SevenDays);
        canvas.style.height = '100px';
        canvas.style.width = '300px';
        canvas.style.margin = '0px';

        canvas.setAttribute("class", "myChart")

        SevenDays.appendChild(canvasDiv)
        canvasDiv.appendChild(canvas)
        
        tableBody.appendChild(tableRow);


        var canvasElements = document.querySelectorAll(".myChart");
        for (var j = 0; j < canvasElements.length; j++) {
            var canvasElement = canvasElements[j];
            var ctx = canvasElement.getContext('2d');

            if (canvasElement.chart) {
                canvasElement.chart.destroy();
            }

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [{
                        label: '# of Sales',
                        data: [12, 19, 3, 5, 2, 3, 7],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    
                }
            });
            canvasElement.chart = myChart;
        }
       
      }
  })
  .catch(error => console.log(error));
}

price();
