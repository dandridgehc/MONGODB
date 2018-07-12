var mongoose = require("mongoose")

// SETS UP MODEL FOR MONGOOSE DATABASE
// CONNECT USING MONGOLAB
var articleSchema = mongoose.Schema({

    title:String,
    link:String,
    summary:String,
    saved: Boolean

})

module.exports = mongoose.model("Article", articleSchema)

