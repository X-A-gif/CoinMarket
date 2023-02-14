function displayCoin() {
    var storedCoin = localStorage.getItem("allFavorites");
    if (storedCoin) {
      var coinObj = JSON.parse(storedCoin);
      console.log(coinObj);
      var coinName = coinObj.name;
    
    let list = document.createElement("ul");
    for(let i=0; i < coinObj.length; i++) {
        console.log(coinObj[i].name);
        let item = document.createElement("li");
        item.innerHTML = coinObj[i].name;

        list.appendChild(item);
    }
    document.body.appendChild(list);
}
  }

  displayCoin();