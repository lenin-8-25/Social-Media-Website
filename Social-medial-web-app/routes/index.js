const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');

router.get('/',home_controller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
// router.use('/comments',require('./comments'));
 router.use('/api',require('./api'));
// router.use('/likes',require('./likes'));
module.exports=router;

//for any further routes acces from here
//router.use('/routerName' , require('./routerfile) );

//module.exports = router; //app.get app.post  handled by this module