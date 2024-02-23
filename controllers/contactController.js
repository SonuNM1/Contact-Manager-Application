const asyncHandler = require("express-async-handler") ; 

const Contact = require("../Models/contactModel") ; 

// @desc Get all contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id}) ; 
    res.status(200).json(contacts);
  }); 
  
  // @desc Create new contacts
  // @route POST /api/contacts
  // @access private
  
  const createContact = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body) ; 
    const {name, email, phone} = req.body ; // destructuring assignment
    if(!name || !email || !phone){
      res.status(400) ; // 400 -> Bad Request
      throw new Error("All fields are mandatory"); 
    }
    const contact = await Contact.insertMany({
      name, 
      email, 
      phone,
      user_id: req.user.id
    }) ;

    res.status(201).json(contact); // 201 -> success response (Created)
  
  });
  
  // @desc Get individual contact
  // @route GET /api/contacts:id
  // @access private
  
  const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact) {
      res.status(404) ; 
      throw new Error("Contact not found") ; 
    }
    // res.status(200).json({message: `Get contact for ${req.params.id}`}) ;
    res.status(200).json(contact);
  });
  
  // @desc Update contacts
  // @route PUT /api/contacts/:id
  // @access private
  
  const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact){
      res.status(404) ;
      throw new error ("Contact not Found") ; 
    }

    if(contact.user_id.toString() != req.user.id){
      res.status(403) ; 
      throw new Error("User don't have permission to update other user contact") ; 
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    ) ; 
    res.status(200).json(updatedContact);
  });
  
  // @desc Delete new contacts
  // @route DELETE /api/contacts/:id
  // @access private
  
  const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact){
      res.status(404);
      throw new Error("Contact not Found") ; 
    }

    if(contact.user_id.toString() != req.user.id){
      res.status(403) ; 
      throw new Error("User don't have permission to delete other user's contacts") ; 
    }

    await Contact.deleteOne({_id: req.params.id}) ; 
    res.status(200).json(contact);
  });
  
  module.exports = {
    getContact,
    createContact,
    getContacts,
    updateContact,
    deleteContact,
  };
  