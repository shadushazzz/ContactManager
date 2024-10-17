const express = require('express');
const router = express.Router();

const 
{    
    getContacts,
    postContacts,
    putContacts,
    getContact,
    deleteContacts 
} = require('../controller/contactController')

router.route("/").get(getContacts).post(postContacts);

router.route('/:id').get(getContact).put(putContacts).delete(deleteContacts);

module.exports = router;