

function price() {
  fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const coinData = data.Data;
      const coinID = document.getElementsByClassName("coinID");
      const coinPrice = document.getElementsByClassName("coinPrice");
      for (let i = 0; i < coinID.length; i++) {
        coinID[i].innerHTML = `${coinData[i].CoinInfo.Name}`;
        // coinPrice[i].innerHTML =  `${coinData[i].RAW.USD.PRICE}`;
       
      }
  })
  .catch(error => console.log(error));
}
setInterval(price, 1000);



document.getElementsByClassName("coinBtn").addEventListener("click", function() {
    window.location.href = "./assets/ethChart.html";
  });
