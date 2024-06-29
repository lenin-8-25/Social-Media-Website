const User = require('../models/user')

module.exports.profile = async(req,res)=>
{
        //req.user.id is us
    //req.params.id is friend
    let me = await User.findById(req.user.id);
    User.findById(req.params.id)
    .then((user) => {
        res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,
        });
    });
    // return res.render('user_profile', {
    //     title: 'User Profile'
}

    // if(req.cookies.user_id)
    // {        
    //         User.findById(req.cookies.user_id)
    //         .then((user)=>{
    //             return res.render('user_profile',{
    //                 title:"User Profile",
    //                 user:user
    //             });
                    
    //             })
    //             .catch((err)=>{
    //                 console.log('error in creating user');
    //                 return;
    //                 })
    // }else{
    //     return res.redirect('/users/sign-in');
    // }

//now this controller is ready to be accesed by a router
//now that route need to be accesed by this browser
//action returns data


//render the signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })


}

//render the signin page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the sigup data

module.exports.create = function(req,res){
//checking 
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body)
        .then((user)=>{
        return res.redirect('/users/sign-in');
            
        })
        .catch((err)=>{
            console.log('error in creating user');
            return;
            })
        }else
            return res.redirect('back');
        
    })
    .catch((err)=>{
        console.log('error in finding user');
    })
}
    

    // User.find({email:req.body.email})
    // .then(data=> {
    //     console.log(data)
    // })
    // .catch(error=>{
    //     console.log(error)
    // });






//sign in and create the session for the user
module.exports.createSession = function(req,res){

    return res.redirect('/');



    //TODO LATER
    //steps to authenticate
    //find the user
    // User.findOne({email: req.body.email})
    // //handling error with promise
    // .then((user)=>{
    //     //handle is user found
    //     if(user){
    //         //handle password which dont match
    //         if(user.password!=req.body.password){
    //             console.log('password mismatch');
    //             return res.redirect('back');
    //         }
    //           //handle session creation
    //           res.cookie('user_id', user_id);
    //           return res.redirect('/users/profile');

    //     }
    //      //handle user not found
    //     else{
    //     console.log('no user found');
    //     return res.redirect('back');
    //     }
    // })
    // .catch((err)=>{
    //     console.log('error in finding user');
    //     return res.redirect('back');
    // })


    // User.findOne({email:req.body.email})
    // //handling error with promise
    // .then((user)=>{
    //     //handling if user is found
    //       if(user){
    //         //handling password check after finding user
    //          if(user.password!=req.body.password){
    //             console.log('password mismatch');
    //             return res.redirect('back');
    //          }
    //          //creating session after finding email and password
    //          res.cookie('user_id',user.id);
    //          return res.redirect('/users/profile');
    //       }
    //       //if user itself is not found
    //       else{
    //         console.log('no user found');
    //         return res.redirect('back');
    //       }
    // })
    // //if error occurs
    // .catch((err)=>{
    //     console.log('error in finding user');
    //     return res.redirect('back');
    // })


}

module.exports.destroySession=(req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);
        return res.redirect('/users/sign-in');
    })
    
}