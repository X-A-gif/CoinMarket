

function price() {
 fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    .then(response => response.json())
    .then(data => {
      console.log(data)
        const ethEl = document.getElementById("Eth");
        if(ethEl) {
          ethEl.innerHTML = `1 ETH = ${data.USD} USD`;
        }
    })
    .catch(error => console.log(error));
}
setInterval(price, 5000);



document.getElementById("ethBtn").addEventListener("click", function() {
    window.location.href = "./assets/ethChart.html";
  });
