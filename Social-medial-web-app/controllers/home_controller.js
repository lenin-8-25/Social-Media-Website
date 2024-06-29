const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    //return res.end('<h1>Express is up for codeial</h1>')

    //console.log(req.cookies);
    //res.cookie('user_id', 25)
    try{
        const posts = await Post.find({})
        //populating the user of each post
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
     const users = await User.find({})
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
        })
    }catch (err) {
        console.log("error in asyn/await");
        return;
    }
}
