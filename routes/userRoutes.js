const express = require('express');
const router = express.Router();

const {
    registerUsers,
    loginUsers,
    getCurrentUser
 } = require('../controller/userController');

router.get('/currentuser', getCurrentUser);

router.post('/login', loginUsers);

router.post('/register', registerUsers );

 // router.route('/register/route').get( (req,res) => {res.send('registered router')})


 module.exports = router;