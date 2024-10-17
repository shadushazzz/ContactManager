const asyncHandler = require('express-async-handler');
const Contacts = require('../data/contactsDataModel');


const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contacts.find()
    res.status(200).json(contacts) 
});

const postContacts = asyncHandler(async(req, res) => {
    const {name, email , phone} = req.body;

    if(!name || !email || !phone) { 
        res.status(400);
         throw new Error('All fields are required')
    }
    const contact = await Contacts.create({
        name,email,phone
    })
    res.status(201).json(contact); 
})

const putContacts = asyncHandler(async(req, res) => {
    const contact  = await Contacts.findById(req.params.id);
   
    if(!contact) {
       res.status(404);
       throw new Error('Contact not found');
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
     );

    res.status(200).json(updatedContact);
})

const getContact = asyncHandler(async(req, res) => {
    const contact  = await Contacts.findById(req.params.id);
   
     if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
     }

     
    res.status(200).json(contact);
})

const deleteContacts = asyncHandler(async(req, res) => {
    const contact  = await Contacts.findById(req.params.id);
   
    if(!contact) {
       res.status(404);
       throw new Error('Contact not found');
    }
    await Contacts.findByIdAndDelete(req.params.id);

    res.status(200).json(contact) 
})

module.exports = {
    getContacts,
    postContacts,
    putContacts,
    getContact,
    deleteContacts
}