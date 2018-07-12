var mongoose = require("mongoose")

var articleSchema = mongoose.Schema({

    title:String,
    link:String,
    summary:String,
    saved: Boolean

})

module.exports = mongoose.model("Article", articleSchema)

