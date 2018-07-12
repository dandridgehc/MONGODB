var express = require("express")
var app = express()
var mongoose = require("mongoose")
var request = require("request")
var cheerio = require("cheerio")
//imports articlemodel.js file
var Article = require("./ArticleModel")

var exhbs = require("express-handlebars")

//use handlebars
app.engine("handlebars",exhbs({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars")
var port = process.env.PORT || 3000

//route root level testing
// app.get("/",function(req,res){
//     res.send("App is Working")
// })

//route that will scrape NY Times
app.get("/scrape",function(req,res){
    request("https://www.nytimes.com/", function(error, response, html){   
        //res.send(html)
        var $ = cheerio.load(html)
        var array = []
        $(".story-heading").each(function(){
            var title = $(this).children("a").text()
            var link = $(this).children("a").attr("href")
            var summary = $(this).siblings("p").text()
            
            if(title && link && summary) {
                array.push({title: title, link: link, summary: summary})
                var article = new Article({
                    title: title, 
                    link: link,
                    summary: summary,
                    saved:false
                })
                article.save()
            }

        })
        res.send(array)
    }) 
})


app.get("/",function(req,res){
    Article.find()
    .exec()
    .then(function(data){
        res.render("index",{
            items:data
        })
    }) 
})

app.get("/clear",function(req,res){
    Article.remove()
    .exec()
    .then(function(data){
        res.send(data)
    })
})

app.get("/all",function(req,res){
    Article.find()
    .exec()
    .then(function(data){
        res.send(data)
    }) 
})




// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongodbHOMEWORK";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


//listen port 3000
app.listen(port, function(){
    console.log("App is Running on " + port)
})
