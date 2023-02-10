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

function price() {
 fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
    .then(response => response.json())
    .then(data => {
    //    <tr>
    //   <td class="">  <i class="material-icons">add</i></td>
    //   <td class="">1</td>
    //   <td class=""><a class="coinID" price="" name="" ></a></td>
    //   <td class="CoinPrice">$</td> 
    //   <td class="hourChange">%</td> 
    //   <td class="mktCap">$</td> 
    // </tr>
    console.log(data)
      const coinData = data.Data;
      const coinID = document.getElementsByClassName("coinID");
      const coinPrice = document.getElementsByClassName("coinPrice");
      for (let i = 0; i < 20; i++) {
        
        var tableRow = document.createElement("tr");
        var tableIconHolder = document.createElement("td");
        var addIcon = document.createElement("i");
        var tableIndex = document.createElement("td");
        var tableCoinName = document.createElement("td");
        var tableNameAnchor = document.createElement("a");
        var tableCoinPrice = document.createElement("td");
        var tableHour = document.createElement("td");
        var tableMktCap = document.createElement("td");
        var hrefAtt = document.createAttribute("href");
        var fullNameAtt = document.createAttribute("data-fn");
        var priceAtt = document.createAttribute("data-price");
        var marketAtt = document.createAttribute("data-mktCap");
        var coinSupply = document.createAttribute("data-supply");
        var SevenDays = document.createElement("td");
        var canvasDiv = document.createElement("div")
        canvasDiv.style.height = "100px"
        canvasDiv.style.width = "300px"
        //var canvas=  document.createElement("canvas");
        var classAtt = document.createAttribute("class");
        

        tableIconHolder.appendChild(addIcon);
        tableRow.appendChild(tableIconHolder);

        tableIndex.textContent = i+1;
        tableRow.appendChild(tableIndex);
        
        
        tableNameAnchor.innerHTML = coinData[i].CoinInfo.FullName
        tableNameAnchor.setAttributeNode(hrefAtt);
        tableNameAnchor.setAttribute("href", "./assets/ethChart.html");
        tableNameAnchor.setAttributeNode(fullNameAtt);
        tableNameAnchor.setAttributeNode(priceAtt);
        tableNameAnchor.setAttributeNode(marketAtt);
        tableNameAnchor.setAttributeNode(coinSupply);
        tableNameAnchor.setAttribute("data-fn", coinData[i].CoinInfo.FullName);
        tableNameAnchor.setAttribute("data-price", coinData[i].RAW.USD.PRICE);
        tableNameAnchor.setAttribute("data-mktCap", coinData[i].RAW.USD.MKTCAP);
        tableNameAnchor.setAttribute("data-supply", coinData[i].RAW.USD.SUPPLY);
        tableNameAnchor.setAttribute("data-symbol", coinData[i].RAW.USD.FROMSYMBOL);

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

        tableMktCap.innerHTML = coinData[i].DISPLAY.USD.MKTCAP
        tableRow.appendChild(tableMktCap);
       
        tableRow.appendChild(SevenDays);
        //canvas.style.height = '100px';
        //canvas.style.width = '100px';
        //canvas.setAttribute("id", "myChart")
        
        SevenDays.appendChild(canvasDiv)
        canvasDiv.innerHTML = "<canvas class='myChart'></canvas>"
        //var ch;
        //getChart(ch);
        if(myChart != undefined){
          //myChart.destroy()
         
        }

        myChart = getChart();

       // myChart.destroy()
        
        
        
        
        

        
        tableBody.appendChild(tableRow);
        // coinID[i].innerHTML = `${coinData[i].CoinInfo.FullName}`;
        // var att = document.createAttribute("price")
        // coinID[i].setAttributeNode(att)
        // coinPrice[i].innerHTML =  `${coinData[i].RAW.USD.PRICE}`;
       
      }
  })
  .catch(error => console.log(error));
}
//setInterval(price, 1000);
price();

export function updateApiUrl() {
  const cryptoLinks = document.querySelectorAll('.coinId');
  for (let i = 0; i < cryptoLinks.length; i++) {
    const link = cryptoLinks[i];
    link.addEventListener('click', function() {
      const symbol = this.getAttribute('data-symbol');
      const apiUrl = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + symbol + "&tsym=USD&limit=7&toTs=$";

    });
  }
}

var  myChart;

function getChart(){
 
var ctx = document.getElementsByClassName("myChart")

 var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "Total Volume Locked",
      data: [0, 10, 5, 2, 20, 30, 45],
      backgroundColor: '#9BD0F5',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },

});
  return myLineChart
}





//  const coinIdEls = document.querySelectorAll(".coinLink");
//  coinIdEls.addEventListener("click", function(event){
//   console.log(event)
//  })
// console.log(coinIdEls)
// for (let i = 0; i < coinIdEls.length; i++) {
//   coinIdEls[i].addEventListener("click", function() {
//     window.location.href = "./assets/ethChart.html";
//   });
// }