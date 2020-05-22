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
    console.log(parsedJson.data[0].artist.picture)
    // let songslistcontainer_ref=document.querySelector('#songs-class-container')
    // parsedJson.data.forEach(Object=>{

    //     createSongElement(Object)

    // })
})
.catch(err => {
    console.log(err);
});
}
}
