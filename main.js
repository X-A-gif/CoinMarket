

function price() {
 fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    .then(response => response.json())
    .then(data => {
<<<<<<< HEAD
        const ethEl = document.getElementById("Eth");
        if(ethEl) {
          ethEl.innerHTML = `1 ETH = ${data.USD} USD`;
        }
    })
    .catch(error => console.log(error));
=======
      console.log(data);
      const coinData = data.Data;
      const coinID = document.getElementsByClassName("coinID");
      const coinPrice = document.getElementsByClassName("coinPrice");
      for (let i = 0; i < coinID.length; i++) {
        coinID[i].innerHTML = `${coinData[i].CoinInfo.FullName}`;
        // coinPrice[i].innerHTML =  `${coinData[i].RAW.USD.PRICE}`;
       
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
>>>>>>> 89efd245fc356c3ee3d48ed96570756c03537bed
}



const coinIdEls = document.getElementsByClassName("coinID");
for (let i = 0; i < coinIdEls.length; i++) {
  coinIdEls[i].addEventListener("click", function() {
    window.location.href = "./assets/ethChart.html";
  });
}