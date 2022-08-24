let song = new Audio();
window.onload = playSong;

function playSong(){
    var url = "http://localhost:8000/api/songs"
    var content = {
        method: 'GET'
    }
    api_client(url,content,(response, status)=>{
        JSON.stringify(response)

        if(response.successful == true){
            JSON.stringify(response.data)
            for (var i in response.data){
                var title = response.data[currentSong].title
                var album = response.data[currentSong].album
                song.src = dir1+title+ext1;
                SongTitle.textContent = title;
                $("#cover img").attr("src",dir2+album+ext2);
            }
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function songSelect(id){
    var input = id
    
    var url = "http://localhost:8000/api/song/select"
    var payload = {
        id:input
    }
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response, status)=>{
        if(response.successful == true){
            console.log("Response from api"+JSON.stringify(response))
            for(var i in response.data){
                var title = response.data[i].title
                var album = response.data[i].album
                song.src = dir1+title+ext1;
                SongTitle.textContent = title;
                $("#cover img").attr("src",dir2+album+ext2);
                song.play();
                play_img.src = "img/pause.png";
            }
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function btnToggle(){
    if(song.paused){
        song.play();
        isPlaying = true;
        total_time = song.duration;
        range.max = total_time;
        play_img.src = "img/pause.png";
    }else{
        song.pause();
        isPlaying = false;
        play_img.src = "img/play.png";
    }
}

song.addEventListener('timeupdate',function(){
    range.value = song.currentTime;

    if (song.ended) {
        playSong();
        nextAudio();
  }
})

range.addEventListener('change',function(){
    song.currentTime = range.value;
})

function nextAudio(){
    var url = "http://localhost:8000/api/songs"
    var content = {
        method: 'GET'
    }
    api_client(url,content,(response, status)=>{
        JSON.stringify(response)

        if(response.successful == true){
            JSON.stringify(response.data)
            
            currentSong++;
            if (currentSong > response.data.length) {
                currentSong = 0;
            }
            playSong()
            btnToggle()
            $("#play img").attr("src","img/play.png");           
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function prevAudio(){
    var url = "http://localhost:8000/api/songs"
    var content = {
        method: 'GET'
    }
    api_client(url,content,(response, status)=>{
        JSON.stringify(response)

        if(response.successful == true){
            JSON.stringify(response.data)
            
            currentSong--;
            if (currentSong < 0) {
                currentSong = response.data.length;
            }
            playSong()
            btnToggle()
            $("#play img").attr("src","img/play.png");
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

