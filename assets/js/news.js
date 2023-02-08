function searchApi(query) {

    //var  newsQueryUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2023-01-04&sortBy=publishedAt&apiKey=cf348279c6ad404891c07883d9dd177f'

    var  newsQueryUrl = 'https://newsapi.org/v2/everything?q=' + query + '&language=en&pageSize=5&sortBy=publishedAt&apiKey=cf348279c6ad404891c07883d9dd177f'

     // var newsQueryUrl = "https://newsapi.org/v2/everything?q=tesla&from=2023-01-04&sortBy=publishedAt&apiKey=cf348279c6ad404891c07883d9dd177f"
  
    
    fetch(newsQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (newsData) {
        // write query to page so user knows what they are viewing
        //console.log(newsData)
        displayNews(newsData)

      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function displayNews(data){
    var cardEl = document.getElementsByClassName("card");
    if(data.articles.length != 0){
      for(i = 0; i < data.articles.length; i++){
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
            if(data.articles[i].urlToImage != null){
            imageEl.src = data.articles[i].urlToImage;
            }
            headlineEl.textContent = data.articles[i].title;
            descriptionEl.textContent = data.articles[i].description;
            linkEl.href = data.articles[i].url;
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
  var currency = "bitcoin"
searchApi(currency)