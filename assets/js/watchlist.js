function price() { 
  var tableBody = document.querySelector("tbody");

  var storedCoin = localStorage.getItem("allFavorites");
  if (storedCoin) {
    var coinObj = JSON.parse(storedCoin);
    console.log(coinObj);
 
      for(let i=0; i < coinObj.length; i++) {
         
         var tableRow = document.createElement("tr");
 
         var tableIndex = document.createElement("td");
         var tableCoinName = document.createElement("td");
         var tableNameAnchor = document.createElement("td");
 
         var tableCoinPrice = document.createElement("td");
         var tableHour = document.createElement("td");
         var tableMktCap = document.createElement("td");

          
         var fullNameAtt = document.createAttribute("data-fn");
         var priceAtt = document.createAttribute("data-price");
         var marketAtt = document.createAttribute("data-mktCap");
         var coinSupply = document.createAttribute("data-supply");
         var coinSupply = document.createAttribute("data-vovl");
 
         var classAtt = document.createAttribute("class");
 
         tableIndex.textContent = i+1;
         tableRow.appendChild(tableIndex);
          
         tableNameAnchor.innerHTML = coinObj[i].name
   
           
         
         tableNameAnchor.setAttributeNode(fullNameAtt);
         tableNameAnchor.setAttributeNode(priceAtt);
         tableNameAnchor.setAttributeNode(marketAtt);
         tableNameAnchor.setAttributeNode(coinSupply);

         tableNameAnchor.setAttributeNode(classAtt);
         tableNameAnchor.setAttribute("class", "coinLink");
         tableCoinName.appendChild(tableNameAnchor);
         tableRow.appendChild(tableCoinName);
        
 
         tableCoinPrice.innerHTML = coinObj[i].price
         tableRow.appendChild(tableCoinPrice);
 
         
         tableHour.innerHTML = coinObj[i].supply
         tableRow.appendChild(tableHour);
         
         tableRow.appendChild(tableMktCap);
         tableMktCap.innerHTML = coinObj[i].marketCap
 
   
 

         tableBody.appendChild(tableRow);

        
       }
      }
    }
 
 
 price();