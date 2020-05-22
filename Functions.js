
var imagestobedisplayed=[]
var albumnames=[];
var albumtracklist=[]
var artistname



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
  
 
    
        let artistobject = parsedJson.data[0]
    
        let imagesrow_ref=document.querySelector('.rowimages')
        let content=`   <div class="col" onclick="window.location.href='Artistpage.html?artistname=${artistobject.artist.name}'">
        <div class="animationContainer">
            <img class="img-fluid imageAnimation imageMargin" src="${artistobject.artist.picture_medium}">
                <p class="infoImg">${artistobject.artist.name}</p>      
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
            console.log(albumObj)
 
    if(!imagestobedisplayed.includes(albumObj.album.cover)){
        imagestobedisplayed.push(albumObj.album.cover)
        albumnames.push(albumObj.album.title)
        console.log(albumObj.album.tracklist)
        albumtracklist.push(albumObj.album.tracklist)
      
    }
  

 
 } )
displayAlbums(imagestobedisplayed,albumnames)
        
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
        <img src="${albumcoversArray[i]}" alt="Album Image"  onclick="window.location.href='album.html?tracklist=${albumtracklist[i]}'">
        <p class="image-name">${albumnames[i]}</br>
            <span>${artistname}</span>
        </p>
    </div>

</div>`

let newAlbumImg=document.createElement('div')
newAlbumImg.innerHTML=content
albumsrow_ref.appendChild(newAlbumImg)

    }
    console.log('this is track list',albumtracklist)
 
    
  
}

function onLoadAlbumpage(){
    
    let urlparam=new URLSearchParams(window.location.search)
    albumtracklist=urlparam.get('tracklist')
    console.log(albumtracklist)
   

}



