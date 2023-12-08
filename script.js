const API_KEY = "f6216153bbb243d58e0d8bf53d39d8f7";
const url = "https://newsapi.org/v2/everything?q=";

const CardsContainer=document.querySelector('#cardsContainer')

const newsTemplate=document.getElementById('news-template')

window.addEventListener("load", () => fetchNews("Pakistan"));
let seearchItem=document.getElementById('searchtab')
let button=document.getElementById('searchbutton')
let secondryNav=document.querySelector('.secondary-navbar')

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
   
    extractData(data.articles)
}
function extractData(articles){
    CardsContainer.innerHTML=''
    articles.forEach((element) => {

        if(!element.urlToImage) return;
        const clondTemplate=newsTemplate.content.cloneNode(true);
        fillData(clondTemplate,element);
        CardsContainer.appendChild(clondTemplate);
    });

   
}
function fillData(clondTemplate,article){
    const newsImage=clondTemplate.getElementById('news-image')
    const newsTitle=clondTemplate.getElementById('news-title')
    const newsSource=clondTemplate.getElementById('news-source')
    const newsDesc=clondTemplate.getElementById('news-desc')
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`
    clondTemplate.firstElementChild.addEventListener('click',function(){
        window.open(article.url, "_blank");
    })
}
let preNavItem=null
function OnnavItemclick(id){
    fetchNews(id)
    const navItem=document.getElementById(id)
    preNavItem?.classList.remove("active-color");
    preNavItem = navItem;
    preNavItem.classList.add("active-color");
}
button.addEventListener('click',function(){
  
    
    fetchNews(seearchItem.value)
})
document.getElementById('searchicon').addEventListener('click',function(){
    fetchNews(seearchItem.value)
})
document.getElementById('menu-icon').addEventListener('click',function(){
    secondryNav.classList.toggle('Visiable-nav')
    this.classList.toggle('rotated')

 
})
window.addEventListener('scroll',function(){
    if(secondryNav.classList.contains('Visiable-nav')){

        secondryNav.classList.remove('Visiable-nav')
    }
}
)