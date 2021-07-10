const express = require("express");
const bodyParser = require("body-parser");
const dateModule = require(__dirname + "/dateModule.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", function(req, res){
    res.render("list", {listTitle: dateModule.getDate(), newListItems: items});
})

app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
})

app.get("/about", function(req, res){
    res.render("about", {todaysDate: dateModule.getDateWithYear()});
})

app.post("/", function(req, res){
    if(req.body.currentList === "Work List"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
})

const port = 3000;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})