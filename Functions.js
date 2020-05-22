window.onload=function(){
    let artists_array=['queen', 'eminem','rihanna', 'sia','Lauv','Kesha'
    ,'adele','abba'
    ,'shakira','avicii']
    
for(let i in artists_array){
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+artists_array[i], {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "0cea00348emshaee8f5a70a8e29ap17fcc8jsnf63d75c8e6c8"
    }
})
.then(response => response.json()).then(parsedJson=>{
        console.log(parsedJson.data)

    
        let artistimage = parsedJson.data[0]
        let imagesrow_ref=document.querySelector('.rowimages')
        let content=`   <div class="col" onclick="window.location.href='Artistpage.html'">
        <div class="animationContainer">
            <img class="img-fluid imageAnimation imageMargin" src="${artistimage.artist.picture_medium}" alt="">
                <p class="infoImg">${artistimage.artist.name}</p>      
                <div class="middle">
                    <div class="text"><i class="fas fa-play-circle playIcon"></i></div>
                </div>
                </div>
            </div>`
        let newimagediv=this.document.createElement('div')
        newimagediv.innerHTML=content
        imagesrow_ref.appendChild(newimagediv)

    //})
})
.catch(err => {
    console.log(err);
});
}
}
