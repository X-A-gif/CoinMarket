function searchApi(query){
  //var newsQueryUrl =" https://min-api.cryptocompare.com/data/v2/news/?categories=SOL"
  var newsQueryUrl =" https://min-api.cryptocompare.com/data/v2/news/?categories=" + query
  fetch(newsQueryUrl)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
  
    return response.json();
  })
  .then(function (newsData) {
    // write query to page so user knows what they are viewing
    console.log(newsData)
    displayNews(newsData)
  
  })
  .catch(function (error) {
    console.error(error);
  });
  }
  function displayNews(data){
      var cardEl = document.getElementsByClassName("card");
      if(data.Data.length != 0){
        for(i = 0; i < data.Data.length && i < 5; i++){
              var divCardImageEl = document.createElement("div");
              var divCardContentEl = document.createElement("div");
              var divCardActionEl = document.createElement("div");
              divCardImageEl.setAttribute("class","card-image small");
              divCardContentEl.setAttribute("class", "card-content");
              divCardActionEl.setAttribute("class", "card-action")
              var imageEl = document.createElement("img");
              var headlineEl = document.createElement("h5");
              var descriptionEl = document.createElement("p");
              var linkEl = document.createElement("a");
              linkEl.setAttribute("target", "_blank")
             // if(data.Data[i].urlToImage != null){
              imageEl.src = data.Data[i].imageurl;
            //  }
              headlineEl.textContent = data.Data[i].title;
              descriptionEl.textContent = data.Data[i].body;
              linkEl.href = data.Data[i].url;
              linkEl.textContent = "Read More"
              cardEl[0].appendChild(divCardImageEl);
              divCardImageEl.appendChild(imageEl);
              cardEl[0].appendChild(divCardContentEl);
              divCardContentEl.appendChild(headlineEl);
              divCardContentEl.appendChild(descriptionEl);
              cardEl[0].appendChild(divCardActionEl);
              divCardActionEl.appendChild(linkEl)
        }
      }
      else{
        var noNewsFoundEl = document.createElement("h5");
        noNewsFoundEl.textContent = "No news found";
        cardEl[0].appendChild(noNewsFoundEl);
      }
  
    }
  
    var symbol = "ETH";
    searchApi(symbol);