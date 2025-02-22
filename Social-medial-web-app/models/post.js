const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //needs to refer to user schema(referring to an objectid
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //user is schema we are referring to
    },
    //include the array of ids of comments on this post to search in Comments model
    //this method is faster
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    // likes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Like'
    // }]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;