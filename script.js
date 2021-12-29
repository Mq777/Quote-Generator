//Get Quotes from API

//async fetch request (try catch statement)
//async can run at any time independently,and it won't stop the browser for completeing the loading of the page

const quoteContianer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = [];

//show loading

function loading(){
    loader.hidden = false;
    quoteContianer.hidden = true;
}

//hide loading
function complete(){
    quoteContianer.hidden = false;
    loader.hidden = true;
}

//show new quotes
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    //check if author field is blank and replace it with"unknown"

    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }

    //check quote length to determine styling

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
  
}

//get Quotes from API 

 async function getQuotes(){
     loading();
    const apiUrl = 'https://type.fit/api/quotes';
     try {

        const response = await fetch(apiUrl);
         apiQuotes = await response.json();
        newQuote();

     }catch(error){
      
//Catch Error here
    }
 }

//try catch statement allows us to attemp to compelete fetch request,if it doesn't work,we can catch the error information and do something with it.


//on load

getQuotes();

//local quotes file version


//function newQuote(){
    //Pick a random quote from apiQuotes array

//    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//    console.log(quote);
  
//}


//newQuote();



//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listner
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote)