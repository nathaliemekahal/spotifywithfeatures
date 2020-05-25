
var imagestobedisplayed=[]
var albumnames=[];
var albumid=[]
var artistname
var loadedsongs=[]


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
 
    if(!imagestobedisplayed.includes(albumObj.album.cover_medium)){
        imagestobedisplayed.push(albumObj.album.cover_medium)
        albumnames.push(albumObj.album.title)
        albumid.push(albumObj.album.id)
      
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
        <img src="${albumcoversArray[i]}" alt="Album Image"  onclick="window.location.href='album.html?albumId=${albumid[i]}&albumcover=${albumcoversArray[i]}&albumname=${albumnames[i]}'">
        <p class="image-name">${albumnames[i]}</br>
            <span>${artistname}</span>
        </p>
    </div>

</div>`

let newAlbumImg=document.createElement('div')
newAlbumImg.innerHTML=content
albumsrow_ref.appendChild(newAlbumImg)

    }

 
    
  
}

function onLoadAlbumpage(){
    
    let urlparam=new URLSearchParams(window.location.search)
    albumcover=urlparam.get('albumcover')
    albumId=urlparam.get('albumId')
    albumname=urlparam.get('albumname')
    let albumimg_ref=document.querySelector('.album-img')
    let existingimg=document.querySelector('.album-img>img')
    let newimg=document.createElement('img')
    newimg.src=albumcover
    albumimg_ref.appendChild(newimg)
   
    displaySong(albumId,albumname)
   

}



function displaySong(id,albumname){
    console.log(id)
    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/"+id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "0cea00348emshaee8f5a70a8e29ap17fcc8jsnf63d75c8e6c8"
        }
    })
    .then(response => response.json()).then(parsedJson=>{
        console.log(parsedJson.tracks.data)
        let songslistcontainer_ref=document.querySelector('#songs-class-container')
        parsedJson.tracks.data.forEach(track=>{

            createSongElement(track,albumname)

        })
    })
    .catch(err => {
        console.log(err);
    });

}

function createSongElement(track,albumname){
    console.log(track)
    let songslistcontainer_ref=document
    .querySelector('#songs-class-container')

    let newsongslistdiv=document.createElement('div')
    newsongslistdiv.className+=' songs-list mt-3'
    songslistcontainer_ref.appendChild(newsongslistdiv)

    let newsonginfo=document.createElement('div')
    newsonginfo.className+=' song-info'
    newsongslistdiv.appendChild(newsonginfo)
    newsongslistdiv.addEventListener('click', function changeSongpic(e){
        
      
       let ptitle=document.querySelector('.p-title')
       ptitle.innerText=track.title
       let shorttitle=document.querySelector('.shorttitle')
       shorttitle.innerText=albumname
      
  
    })

    let newmusicicon=document.createElement('div')
    newmusicicon.className+=' music-icon'
    newsonginfo.appendChild(newmusicicon)

    let newfamusic=document.createElement('i')
    newfamusic.className+='fas fa-music'
    newmusicicon.appendChild(newfamusic)

    let newsongsname=document.createElement('div')
    newsongsname.className+=' songs-name'
    newsongsname.innerHTML=track.title + `<span class="songslist-span">${albumname}</span>`
    newsonginfo.appendChild(newsongsname)

    let newsongduration=document.createElement('div')
    newsongduration.className+='song-duration'
    newsongslistdiv.appendChild(newsongduration)

    let newsongsliastspan=document.createElement('span')
    newsongsliastspan.className+='songslist-span'
    newsongsliastspan.innerText=track.duration.toString().charAt(0)+':'+track.duration.toString().substr(1,3)
    
    newsongduration.appendChild(newsongsliastspan)

}
function createsearchDiv(){
   
        let searchword=document.querySelector('#search')

        searchword.className+=' d-none'
       
        let userinput=document.querySelector('#userinput')
        userinput.classList.replace('d-none','d-block')

        let userinputsearch=document.querySelector('#userinputsearch')
        userinputsearch.value=' '
        userinputsearch.addEventListener('keyup',function(){
            filterSongs(userinputsearch.value.toLowerCase())
        })
        
}


    const filterSongs=(inputsearch)=>{
     
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+inputsearch, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "0cea00348emshaee8f5a70a8e29ap17fcc8jsnf63d75c8e6c8"
            }
        })
        .then(response => response.json()).then(parsedJson=>{
          
         
            loadedsongs=parsedJson.data
            // console.log(loadedsongs)

            let body_ref=document.querySelector('.homepage')
            let cardscontainer=document.querySelector(' .cardscontainer')
            cardscontainer.innerHTML=" "

            console.log('this is inner html',cardscontainer.innerHTML)
            body_ref.appendChild(cardscontainer)
           
            
            let filteredlist=loadedsongs.filter(song=>song.artist.name.toLowerCase().includes(inputsearch))
            filteredlist.forEach(CurrentObj=>{
                console.log(CurrentObj)
            cardscontainer.innerHTML+=` <div class="col" onclick="window.location.href='album.html?albumId=${CurrentObj.album.id}&albumcover=${CurrentObj.album.cover_medium}'">
            <div class="animationContainer">
                <img class="img-fluid imageAnimation imageMargin" src="${CurrentObj.album.cover_medium}">
                <p class="infoImg">${CurrentObj.album.title}</p>  
                    
                    <div class="middle">
                        <div class="text"><i class="fas fa-play-circle playIcon"></i></div>
                    </div>
                    </div>
                </div>`
        })

            
           
        //   console.log(loadedsongs)
    
            
         
          
        })
        .catch(err => {
            console.log(err);
        });
    }
    

    // `<img src=${CurrentObj.album.cover}>`
    
     //   
    