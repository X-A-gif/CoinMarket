function searchApi(query) {

    //var  newsQueryUrl = 'https://newsapi.org/v2/everything?q=bitcoin&from=2023-01-03&sortBy=publishedAt&apiKey=cf348279c6ad404891c07883d9dd177f'

    var  newsQueryUrl = 'https://newsapi.org/v2/everything?q=' + query + '&from=2023-01-03&language=en&pageSize=5&sortBy=publishedAt&apiKey=cf348279c6ad404891c07883d9dd177f'

  
    
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

      })
      .catch(function (error) {
        console.error(error);
      });
  }
  var currency = "tesla"
searchApi(currency)