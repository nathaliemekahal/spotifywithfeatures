
var imagestobedisplayed=[]

function onLoadHomePage(){


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
    
        let artistobject = parsedJson.data[0]
    
        let imagesrow_ref=document.querySelector('.rowimages')
        let content=`   <div class="col" onclick="window.location.href='Artistpage.html?artistname=${artistobject.artist.name}'">
        <div class="animationContainer">
            <img class="img-fluid imageAnimation" src="${artistobject.artist.picture}">
                <p class="infoImg">I Love Queen</p>      
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

//Artist Page


function onLoadArtistpage(){
    let urlparam=new URLSearchParams(window.location.search)
    artistname=urlparam.get('artistname')

    let pagetitle=document.querySelector('.Artistname')
    pagetitle.innerHTML=artistname
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+artistname, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "0cea00348emshaee8f5a70a8e29ap17fcc8jsnf63d75c8e6c8"
    }
})
.then(response => response.json()).then(parsedJson=>{
  
       

        parsedJson.data.forEach(albumObj=>{
            let albumsrow_ref=document.querySelector('.album-row')
 
    if(!imagestobedisplayed.includes(albumObj.album.cover)){
        imagestobedisplayed.push(albumObj.album.cover)
      
    }
    else{
        console.log('included')
    }

 
 } )
displayAlbums(imagestobedisplayed)
        
})
.catch(err => {
    console.log(err);
});
}
function displayAlbums(albumcoversArray){
 
    
   let albumsrow_ref=document.querySelector('.album-row')
    for(let i in albumcoversArray){
    let content=` <div class="col">
    <div class="zoom">
        <img src="${albumcoversArray[i]}" alt="Album Image">
        <p class="image-name">This Is Song's Name</br>
            <span>Queen</span>
        </p>
    </div>

</div>`
let newAlbumImg=document.createElement('div')
newAlbumImg.innerHTML=content
albumsrow_ref.appendChild(newAlbumImg)

    }
  
}



