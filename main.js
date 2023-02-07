var tableBody = document.querySelector("tbody");

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
      const coinData = data.Data;
      const coinID = document.getElementsByClassName("coinID");
      const coinPrice = document.getElementsByClassName("coinPrice");
      for (let i = 0; i < 20; i++) {
        console.log(coinData[i]);
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
        var classAtt = document.createAttribute("class");
        

        tableIconHolder.appendChild(addIcon);
        tableRow.appendChild(tableIconHolder);

        tableIndex.textContent = i+1;
        tableRow.appendChild(tableIndex);
        
        
        tableNameAnchor.innerHTML = coinData[i].CoinInfo.FullName
        tableNameAnchor.setAttributeNode(hrefAtt);
        tableNameAnchor.setAttribute("href", "./assets/ethChart.html");
        tableNameAnchor.setAttributeNode(fullNameAtt);
        tableNameAnchor.setAttribute("data-fn", coinData[i].CoinInfo.FullName);
        tableNameAnchor.setAttributeNode(classAtt);
        tableNameAnchor.setAttribute("class", "coinLink");
        tableCoinName.appendChild(tableNameAnchor);
        tableRow.appendChild(tableCoinName);

        tableCoinPrice.innerHTML = coinData[i].RAW.USD.PRICE
        tableRow.appendChild(tableCoinPrice);

        tableHour.innerHTML = "%"
        tableRow.appendChild(tableHour);

        tableMktCap.innerHTML = "$"
        tableRow.appendChild(tableMktCap);

        
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



 const coinIdEls = document.querySelectorAll(".coinLink");
 coinIdEls.addEventListener("click", function(event){
  console.log(event)
 })
// console.log(coinIdEls)
// for (let i = 0; i < coinIdEls.length; i++) {
//   coinIdEls[i].addEventListener("click", function() {
//     window.location.href = "./assets/ethChart.html";
//   });
// }