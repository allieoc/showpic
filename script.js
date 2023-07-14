const showTitle = document.getElementById("title");
const img = document.querySelector("#img-summary img");
const summary = document.getElementById("summary");
const genre = document.getElementById("genre");
const rating = document.getElementById("rating");
const premiered = document.getElementById("premiered");
const ended = document.getElementById("ended");
const getShowBtn = document.getElementById("up-next");

//utility functions

function setImgSrcAndAlt(imgNode, imgSrc, imgAlt){
    imgNode.src = imgSrc;
    imgNode.alt = imgAlt;
}

function setNodeText(domNode, text){
    domNode.innerText = text;
}

function setNodeHTML(domNode, html){
    domNode.innerHTML = html;
}

//project-specific functions

function setShowInfo(show) {
    setNodeText(showTitle, show.name);
    setNodeHTML(summary, show.summary ? show.summary : "Summary N/A");
    setNodeText(rating, show.rating && show.rating.average ? `Rating: ${show.rating.average}` : "Rating: N/A");
    
    const premieredDate = new Date(show.premiered);
    const endedDate = new Date(show.ended);
    
    setNodeText(premiered, `Premiered: ${premieredDate.toLocaleDateString()}`);
    setNodeText(ended, show.ended ? `Ended: ${endedDate.toLocaleDateString()}` : "Ended: N/A");
}

function setGenres(show){
    let htmlString = "";
    if(show.genres.length === 0) {
        htmlString = "Genre: N/A";
    } else {
        htmlString = "Genre: ";
        show.genres.forEach((genre, index) => {
        htmlString += genre;
        if(index !== show.genres.length - 1){
            htmlString += ", ";
        } 
    });
}
    
    genre.innerHTML = htmlString;
}

function createShowProfile(show){
    const imgSrc = show.image.original;
    setImgSrcAndAlt(img, imgSrc, show.name);
    setShowInfo(show);
    setGenres(show);
}

function getRandomShow(){
    const randomShowId = Math.floor(Math.random() * 60000 + 1);
    console.log(randomShowId);

    fetch(`https://api.tvmaze.com/shows/${randomShowId}`)
    .then((res) => res.json())
    .then((json) => {
        const show = json;
        createShowProfile(show);
    })
    .catch((err) => console.log(err));
}

getShowBtn.addEventListener("click", function() {
    getRandomShow();
});

getRandomShow();