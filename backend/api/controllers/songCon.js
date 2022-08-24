const db = require('../model/dbConn')

exports.addSong = (req,res,next)=>{
    var title = isNullOrUndefined(req.body.title) ? "" : req.body.title;
    var album = isNullOrUndefined(req.body.album) ? "" : req.body.album;
    var artist = isNullOrUndefined(req.body.artist) ? "" : req.body.artist;

    if(title == ""){
        res.status(500).json({
            successful: false,
            message: "Enter song title"
        })
    }else{
        let insertUserSQL = `INSERT INTO SONG_LIST SET ?`
        console.log("insert sql ="+insertUserSQL);

        var insertValue = {
            title: title,
            album: album,
            artist: artist,
        }

        db.query(insertUserSQL,insertValue,(err,result)=>{
            if(err){
                console.log("error in adding song" + err);
                throw err
            }else{
                res.status(200).json({
                    successful:true,
                    message:"Song successfully added"
                })
            }
        })
    }
}

exports.songSelect = (req,res,next)=>{
    var id = isNullOrUndefined(req.body.id) ? "" : req.body.id;

    if(id == " "){
        res.status(500).json({
            successful: false,
        })
    }else{
        var searchAllSQL = `SELECT title,album FROM SONG_LIST WHERE id = '${id}'`
        db.query(searchAllSQL,(err,rows,result)=>{
            if(err) throw err
            res.status(200).json({
                successful: true,
                message: `Found results (${rows.length})`,
                data: rows
            })
        })
    }
}

exports.getAllSongs = (req,res,next)=>{
    var searchAllSQL = `SELECT * FROM SONG_LIST`
    db.query(searchAllSQL,(err,rows,result)=>{
        if(err) throw err
        res.status(200).json({
            successful: true,
            message: `Found results (${rows.length})`,
            data: rows
        })
    })
}

exports.getSongByTitle = (req,res,next)=>{
    var title = isNullOrUndefined(req.body.title) ? "" : req.body.title;

    if(title == " "){
        res.status(500).json({
            successful: false,
            message: "Enter a song title"
        })
    }else{
        var searchAllSQL = `SELECT * FROM SONG_LIST WHERE title = '${title}'`
        db.query(searchAllSQL,(err,rows,result)=>{
            if(err) throw err
            res.status(200).json({
                successful: true,
                message: `Found results (${rows.length})`,
                data: rows
            })
        })
    }
}

exports.getSongByAlbum = (req,res,next)=>{
    var album = isNullOrUndefined(req.body.album) ? "" : req.body.album;

    if(album == " "){
        res.status(500).json({
            successful: false,
            message: "Enter a song album"
        })
    }else{
        var searchAllSQL = `SELECT * FROM SONG_LIST WHERE album = '${album}'`
        db.query(searchAllSQL,(err,rows,result)=>{
            if(err) throw err
            res.status(200).json({
                successful: true,
                message: `Found results (${rows.length})`,
                data: rows
            })
        })
    }
}

exports.getSongByArtist = (req,res,next)=>{
    var artist = isNullOrUndefined(req.body.artist) ? "" : req.body.artist;

    if(artist == " "){
        res.status(500).json({
            successful: false,
            message: "Enter a song artist"
        })
    }else{
        var searchAllSQL = `SELECT * FROM SONG_LIST WHERE artist = '${artist}'`
        db.query(searchAllSQL,(err,rows,result)=>{
            if(err) throw err
            res.status(200).json({
                successful: true,
                message: `Found results (${rows.length})`,
                data: rows
            })
        })
    }
}

exports.updateSong = (req,res,next)=>{
    var id = isNullOrUndefined(req.params.id) ? "" : req.params.id
    var title = isNullOrUndefined(req.body.title) ? "" : req.body.title
    var artist = isNullOrUndefined(req.body.artist) ? "" : req.body.artist
    var album = isNullOrUndefined(req.body.album) ? "" : req.body.album
    
    if(id == " " || title == " " || album == " " || artist == " " ){
        res.status(500).json({
            successful: false,
            message: "Please enter song id"
        })
    }else{
        var updateSQL = `UPDATE SONG_LIST SET title = '${title}', album = '${album}', artist = '${artist}' WHERE id = '${id}'`
        db.query(updateSQL,(err, rows, result)=>{
            if(err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }else{
                if(rows.affectedRows == 0){
                    res.status(404).json({
                        successful: false,
                        message: "Song id does not exist"
                    })
                }else{
                    res.status(200).json({
                        successful: true,
                        message: `Successfully updated ${title}`
                    })
                }
            }
        })
    }
}

exports.deleteSong = (req,res,next)=>{
    var id = isNullOrUndefined(req.body.id) ? "" : req.body.id;

    if(id == null || id == undefined){
        res.status(500).json({
            successful: false,
            message: "No input no song was deleted"
        })
    }else{
        let deleteSQL = `DELETE FROM SONG_LIST WHERE id = '${id}'`;
        db.query(deleteSQL, (err, rows, result)=>{
            if(err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }else{
                if(rows.affectedRows == 0){
                    res.status(404).json({
                        successful: false,
                        message: "Song does not exist"
                    })
                }else{
                    res.status(200).json({
                        successful: true,
                        message: `Successfully deleted`
                    })
                }
            }
        })
    }
}

function isNullOrUndefined(data){
    return (data == null || data == "null" || data == "" || (typeof data === "undefined"));
}