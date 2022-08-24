const db = require('../model/dbConn')

//Login
exports.login = (req,res,next)=>{

    var username = req.body.username
    var password = req.body.password

    if(username == " " || username == undefined || password == " " || password == undefined){
        res.status(500).json({
            successful: false,
            message: "invalid credentials",
            error: "No username or password"
        })
    }else{

        let searchUserSQL = `SELECT * FROM USER_TABLE WHERE username = '${username}'`

        db.query(searchUserSQL,(err,rows, result)=>{
            if(err){
                console.log("error in selecting username = "+err)
                res.status(500).json({
                    successful: false,
                    message: err.message
                })
            }else{
                console.log("rows result ="+JSON.stringify(rows))
                if(rows.length == 0){
                    res.status(404).json({
                        successful: false,
                        message: "User does not exist"
                    })
                }else{

                    if(rows[0].password == password){
                        res.status(200).json({
                            succesful: true,
                            message: "Login successful"
                        })
                    }else{
                        res.status(500).json({
                            succesful: false,
                            message: "Incorrect password"
                        })
                    }
                }
            }
        })
        
    }
}

//Insert
exports.createUser = (req,res,next)=>{
    var username = isNullOrUndefined(req.body.username) ? "" : req.body.username;
    var password = isNullOrUndefined(req.body.password) ? "" : req.body.password;

    if(username == "" || password == ""){
        res.status(500).json({
            successful: false,
            message: "Username and password must be included"
        })
    }else{
        let insertUserSQL = `INSERT INTO USER_TABLE SET ?`
        console.log("insert sql ="+insertUserSQL);

        var insertValue = {
            username: username,
            password: password
        }

        db.query(insertUserSQL,insertValue,(err,result)=>{
            if(err){
                console.log("error in creating user" + err);
                throw err
            }else{
                res.status(200).json({
                    successful:true,
                    message:"Successful created account"
                })
            }
        })
    }
}

//GetAll
exports.getAllUsers = (req,res,next)=>{
    var searchAllSQL = `SELECT username FROM USER_TABLE`
    db.query(searchAllSQL,(err,rows,result)=>{
        if(err) throw err
        res.status(200).json({
            successful: true,
            message: `Found results (${rows.length})`,
            data: rows
        })
    })
}

//Update
exports.updateUser = (req,res,next)=>{
    var username = isNullOrUndefined(req.params.username) ? "" : req.params.username
    var password = isNullOrUndefined(req.body.password) ? "" : req.body.password
    
    if(username == "" || password == ""){
        res.status(500).json({
            successful: false,
            message: "Please include a username and password"
        })
    }else{
        var updateSQL = `UPDATE USER_TABLE SET password = '${password}' WHERE username = '${username}'`
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
                        message: "Username does not exist"
                    })
                }else{
                    res.status(200).json({
                        successful: true,
                        message: `Successfully updated ${username}`
                    })
                }
            }
        })
    }
}

//Delete
exports.deleteUser = (req,res,next)=>{
    var username = isNullOrUndefined(req.query.username) ? "" : req.query.username

    if(username == ""){
        res.status(500).json({
            successful: false,
            message: "Please include a username in the query string"
        })
    }else{
        let deleteSQL = `DELETE FROM USER_TABLE WHERE username = '${username}'`;
        db.query(deleteSQL, (err, rows, result)=>{
            if(err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }else{
                if(rows.affected == 0){
                    res.status(404).json({
                        successful: false,
                        message: "Username does not exist"
                    })
                }else{
                    res.status(200).json({
                        successful: true,
                        message: `Successfully deleted ${username}`
                    })
                }
            }
        })
    }
}

function isNullOrUndefined(data){
    return (data == null || data == "null" || data == "" || (typeof data === "undefined"));
}