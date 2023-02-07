function price() {
  fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const coinData = data.Data;
      const coinID = document.getElementsByClassName("coinID");
      const coinPrice = document.getElementsByClassName("CoinPrice");
      const hrChange = document.getElementsByClassName("hourChange");
      const mktCap = document.getElementsByClassName("mktCap")
      for (let i = 0; i < coinID.length; i++) {
        coinID[i].innerHTML = `${coinData[i].CoinInfo.FullName}`;
        coinPrice[i].innerHTML =  `${coinData[i].DISPLAY.USD.PRICE}`;
        var getChange24 = `${coinData[i].DISPLAY.USD.CHANGEPCT24HOUR}`
        getChange24 = getChange24.charAt(0)
        if(getChange24 === "-"){
          hrChange[i].style.color = "red"
        }
        else{
          hrChange[i].style.color = "green"
        }
        hrChange[i].innerHTML = `${coinData[i].DISPLAY.USD.CHANGEPCT24HOUR}`
        mktCap[i].innerHTML = `${coinData[i].DISPLAY.USD.MKTCAP}`
       
      }
  })
  .catch(error => console.log(error));
}
setInterval(price, 1000);

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



const coinIdEls = document.getElementsByClassName("coinID");
for (let i = 0; i < coinIdEls.length; i++) {
  coinIdEls[i].addEventListener("click", function() {
    //window.location.href = "./assets/ethChart.html";
    window.location.href = "./assets/ethChart.html?q=" + coinIdEls[i].textContent;
  });
}