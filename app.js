var express = require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/kaveri");
var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    
});
var folder = mongoose.model("folder", nameSchema);
app.use(express.static('public'));
app.use(express.static('public/css'));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/about.html',function(req,res){
	res.sendFile(path.join(__dirname+'/about.html'));
});
app.get('/menu.html',function(req,res){
	res.sendFile(path.join(__dirname+'/menu.html'));
});
app.get('/what_we_do.html',function(req,res){
	res.sendFile(path.join(__dirname+'/what_we_do.html'));
});
app.get('/contacts.html',function(req,res){
	res.sendFile(path.join(__dirname+'/contacts.html'));
});
app.post("/contact", (req, res) => {
    var myData = new folder(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.listen(8080);
