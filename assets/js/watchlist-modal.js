var watchlist = [];
var watchlistListEl = document.querySelector("#watchlist-list");
var addButtonEl = document.querySelector("#addCoin");
var coinName = document.querySelector("#coinName").textContent;


// Initialize the modal when watchlist button is clicked
$(document).ready(function(){
    $('.modal').modal();
    });


// TODO when user clicks the + button, add the coin to the watchlist object, and commit it to
// localStorage. I don't need to render it to the modal, because the modal will be closed if 
// the user clicks the + button.
addButtonEl.addEventListener("click", function() {
    console.log("add button clicked");
    console.log(coinName);
    watchlist.push({coinName: coinName});
    console.log(watchlist);
    
    // var coinName = document.
});
// TODO when the user opens the modal, fetch the watchlist from localStorage
// and render it to the modal as a table
// TODO if watchlist object is empty (ie no coins added by user), render a message 
// to the modal that says "Your watchlist is empty. Click the + button to add coins."






// TODO when user clicks the - button, remove the coin from the watchlist object, and commit it to
// localStorage. I don't need to render it to the modal, because the modal will be closed if
// the user clicks the - button.