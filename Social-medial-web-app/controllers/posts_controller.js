const Post = require('../models/post')
const Comment = require('../models/comment');


module.exports.create = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post created!"
            })
        }
        req.flash('success', 'Posted!');
    } catch (err) {
        req.flash('error', 'Unable to post');
        console.log('err', err);
    }
    return res.redirect('back');
}

module.exports.destroy = async (req,res)=>{
    try{
        //.id means converting the object id into string
        const post = await Post.findById(req.params.id);

        if(post.user==req.user.id){
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({ post: req.params.id });
          
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted",
                    flash: {
                        success: 'Post deleted'
                    }
                });
            }
        }
       
        req.flash('success', 'Post Deleted!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'You cant delete this post');
        console.log('err', err);
    }
}
