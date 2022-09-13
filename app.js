const express = require("express");
 const request = require("request")
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const https = require("https");
 const mongodb = require("mongodb");
const bodyParser = require("body-parser");

const app = express()
 mongoose.connect('mongodb+srv://admin-ketan:test123@cluster0.iuazd.mongodb.net/mydb')

 var db = mongoose.connection;

 app.use(bodyParser.json())

// bcoz our css an img folder r in our local static folder not online so to use them
app.use(express.static("public"));

// responsible for parsing the incoming request bodies in a middleware before you handle it.
// when parsing form use usrlenco
app.use(bodyparser.urlencoded({extended:true}));
// GET method is used when relatively non-confidential information is passed.
app.get("/",(req,res)=> {
    //1.  to indicates whether the response can be shared with requesting code from the given origin.
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.sendFile(__dirname + "/signup.html")
})


// posting data with help of name defined in html pg
app.post("/" , (req,res)=>{
    var name = req.body.Fname
    var lname = req.body.Lname
    var E_mail = req.body.Email
    var address = req.body.address
//  2. data will be saved in db in this format
    var data = {
        "name": name,
        "lname": lname,
        "E_mail": E_mail,
        "address": address
    }
    // will create a collection details
    db.collection('details').insertOne(data,(err)=>{
        if (err){
             throw err;
        }
        console.log("Record inserted Successfully");
    })
    return res.sendFile(__dirname + '/success.html')


})
// setting our port if heroku havent will use ours
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port ,()=>{
    console.log("server is running on port 3000")
})
