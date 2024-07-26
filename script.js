const APIkey = 'c18820b25932448b83b9156340a7e200';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');





//fetching news from api
async function fetchRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${APIkey}`

       const response = await fetch(apiURL);
       const data = await response.json();
       return data.articles;
    }
    catch(error){
        console.error("Error fetching random news",error)
        return[]
    }
}

searchButton.addEventListener("click", async() => {
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            DisplayBlogs(articles)
        }
        catch(error){
            console.log("Error fetching news by query",error)
        }
    }
});
//
async function fetchNewsQuery(query){
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${APIkey}`

       const response = await fetch(apiURL);
       const data = await response.json();
       return data.articles;
    }
    catch(error){
        console.error("Error fetching news from query",error)
        return[]
    }
}

//to render blog card element 
function DisplayBlogs(articles){
    blogContainer.innerHTML= ""
    articles.forEach((article) => {

        //for div tag
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        // for img tag
        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title

        //for heading tag
        const title = document.createElement('h2');
        const truncatedTitle = article.title.length>30 ? article.title.slice(0,30) + "..." : article.title;
        title.textContent = truncatedTitle;

        //for paragraph tag
        const description = document.createElement('p');
        const truncatedDes = description.length> 120 ? description.slice(0,120) + "...." : article.description;
        description.textContent = truncatedDes;
        
        //for appending all elements in blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        //for appending blogCard in in main tag (blogContainer)(from html file)
        blogContainer.appendChild(blogCard);

    }); 
}

(async () => {
    try{
        const articles = await fetchRandomNews();
       DisplayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching random news",error);
    }
})();
