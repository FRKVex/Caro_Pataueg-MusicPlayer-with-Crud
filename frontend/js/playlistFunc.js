function addSong(){
    var title = getElementById("import-txt1").value
    var album = getElementById("import-txt2").value
    var artist = getElementById("import-txt3").value
    
    var url = "http://localhost:8000/api/songs/import"
    var payload = {
        title:title,
        album:album,
        artist:artist,
    }
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response)=>{
        console.log("Response from api"+JSON.stringify(response))

        if(response.successful == true){
            getElementById("outputJSON").innerHTML = JSON.stringify(response.message)
            viewAllSongs()         
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function updateSong(){
    var id = getElementById("update-txt1").value
    var title = getElementById("update-txt2").value
    var album = getElementById("update-txt3").value
    var artist = getElementById("update-txt4").value
    
    var url = `http://localhost:8000/api/songs/${id}`
    var payload = {
        title:title,
        album:album,
        artist:artist
    }
    var content = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response)=>{
        console.log("Response from api"+JSON.stringify(response))

        if(response.successful == true){
            getElementById("outputJSON").innerHTML = JSON.stringify(response.message)
            viewAllSongs()
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function getSongByTitle(){
    var input = getElementById("searchTxt").value
    
    var url = "http://localhost:8000/api/song/title"
    var payload = {
        title:input
    }
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response, status)=>{
        console.log("Response from api"+JSON.stringify(response))
        //check muna kung true or false yung successful
        if(response.successful == true){
            //validate kung may nakitang result
            if (response.data.length == 0){
                songHtmlString = "<p>no results found</p>"
            }else{
                songHtmlString = "" //reset yung value ni songHtmlString bago lagyan ulit
                //saka magfor loop
                for (var i in response.data){
                    var id = response.data[i].id
                    var title = response.data[i].title
                    var album = response.data[i].album
                    var artist = response.data[i].artist
                  //oks na...
                        getElementById("outputJSON").innerHTML = JSON.stringify(response.data)
                        songHtmlString += `
                        <div class="music-info" onclick="songSelect(${id})">
                            <div class="music-img">
                                <img class="img1" src="img/${album}.jpg" id="cover">
                            </div>
                            <div class="music-name">
                                <h3>${title}</h3>
                                <p>${album}</p>
                                <p>${artist}</p>
                            </div>
                                <i class="fa fa-times" aria-hidden="true" onclick="deleteSong(${id})"></i>
                        </div>`
                }
            } 
        }
        else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
            songHtmlString = "<p>Something went wrong</p>"
        }
        getElementById("emptyPlayist").innerHTML = songHtmlString
    })
}

function getSongByAlbum(){
    var album = getElementById("searchTxt").value
    
    var url = "http://localhost:8000/api/song/album"
    var payload = {
        album:album
    }
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response, status)=>{
        console.log("Response from api"+JSON.stringify(response))
        //check muna kung true or false yung successful
        if(response.successful == true){
            //validate kung may nakitang result
            if (response.data.length == 0){
                songHtmlString = "<p>no results found</p>"
            }
            else{
                songHtmlString = "" //reset yung value ni songHtmlString bago lagyan ulit
                //saka magfor loop
                for (var i in response.data){
                    var id = response.data[i].id
                    var title = response.data[i].title
                    var album = response.data[i].album
                    var artist = response.data[i].artist
                  //oks na...
                        getElementById("outputJSON").innerHTML = JSON.stringify(response.data)
                        songHtmlString += `
                        <div class="music-info" onclick="songSelect(${id})">
                            <div class="music-img">
                                <img class="img1" src="img/${album}.jpg" id="cover">
                            </div>
                            <div class="music-name">
                                <h3>${title}</h3>
                                <p>${album}</p>
                                <p>${artist}</p>
                            </div>
                                <i class="fa fa-times" aria-hidden="true" onclick="deleteSong(${id})"></i>
                        </div>`
                }
            } 
        }
        else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
            songHtmlString = "<p>Something went wrong</p>"
        }
        getElementById("emptyPlayist").innerHTML = songHtmlString
    })
}

function getSongByArtist(){
    var artist = getElementById("searchTxt").value
    
    var url = "http://localhost:8000/api/song/artist"
    var payload = {
        artist:artist
    }
    var content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response, status)=>{
        console.log("Response from api"+JSON.stringify(response))
        //check muna kung true or false yung successful
        if(response.successful == true){
            //validate kung may nakitang result
            if (response.data.length == 0){
                songHtmlString = "<p>no results found</p>"
            }
            else{
                songHtmlString = "" //reset yung value ni songHtmlString bago lagyan ulit
                //saka magfor loop
                for (var i in response.data){
                    var id = response.data[i].id
                    var title = response.data[i].title
                    var album = response.data[i].album
                    var artist = response.data[i].artist
                  //oks na...
                        getElementById("outputJSON").innerHTML = JSON.stringify(response.data)
                        songHtmlString += `
                        <div class="music-info" onclick="songSelect(${id})">
                            <div class="music-img">
                                <img class="img1" src="img/${album}.jpg" id="cover">
                            </div>
                            <div class="music-name">
                                <h3>${title}</h3>
                                <p>${album}</p>
                                <p>${artist}</p>
                            </div>
                                <i class="fa fa-times" aria-hidden="true" onclick="deleteSong(${id})"></i>
                        </div>`
                }
            } 
        }
        else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
            songHtmlString = "<p>Something went wrong</p>"
        }
        getElementById("emptyPlayist").innerHTML = songHtmlString
    })
}

function deleteSong(id){
    var id = id
    
    var url = "http://localhost:8000/api/songs"
    var payload = {
        id:id
    }
    var content = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    api_client(url,content,(response)=>{
        console.log("Response from api"+JSON.stringify(response))

        if(response.successful == true){
            getElementById("outputJSON").innerHTML = JSON.stringify(response.message)
            getAllSongs()
        }else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
        }
    })
}

function getAllSongs(){
    var url = "http://localhost:8000/api/songs"
    var content = {
        method: 'GET'
    }
    api_client(url,content,(response, status)=>{
        console.log("Response from api"+JSON.stringify(response))
        //check muna kung true or false yung successful
        if(response.successful == true){
            //validate kung may nakitang result
            if (response.data.length == 0){
                songHtmlString = "<p>no results found</p>"
            }
            else{
                songHtmlString = "" //reset yung value ni songHtmlString bago lagyan ulit
                //saka magfor loop
                for (var i in response.data){
                    var id = response.data[i].id
                    var title = response.data[i].title
                    var album = response.data[i].album
                    var artist = response.data[i].artist
                  //oks na...
                        getElementById("outputJSON").innerHTML = JSON.stringify(response.data)
                        songHtmlString += `
                        <div class="music-info" onclick="songSelect(${id})">
                            <div class="music-img">
                                <img class="img1" src="img/${album}.jpg" id="cover">
                            </div>
                            <div class="music-name">
                                <h3>${title}</h3>
                                <p>${album}</p>
                                <p>${artist}</p>
                            </div>
                                <i class="fa fa-times" aria-hidden="true" onclick="deleteSong(${id})"></i>
                        </div>`
                }
            } 
        }
        else{
            var errorMesage = isNullOrUndefined(response.message)? "" : response.message
            getElementById("outputJSON").innerHTML = `Error ${status} ${errorMessage}`
            songHtmlString = "<p>Something went wrong</p>"
        }
        getElementById("emptyPlayist").innerHTML = songHtmlString
    })
}

function viewAllSongs(){
    var url = "http://localhost:8000/api/songs"
    var content = {
        method: 'GET'
    }
    api_client(url,content,(response, status)=>{
        
        console.log("Response from api"+JSON.stringify(response))
        
        if(response.successful == true){
            var tableString = ""

            tableString +=
            `
                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>ARTIST</th>
                </tr>
            `
            for(var index in response.data){
                tableString +=
                `
                    <tr class= "head">
                        <td>${response.data[index].id}</td>
                        <td>${response.data[index].title}</td>
                        <td>${response.data[index].album}</td>
                        <td>${response.data[index].artist}</td>
                    </tr>
                `
            }
            document.getElementById("TableId").innerHTML = tableString
        }
    })
}

function isNullOrUndefined(data){
    return (data == null || data == "null" || data == "" || (typeof data === "undefined"));
}

