//Setting up mongo DB Using Mongoose
// Step-1: Require mongoose library.
const mongoose = require('mongoose');
// Step-2 : Connect with the db.
mongoose.connect('mongodb://localhost/contacts_list_db');
const db = mongoose.connection; //step-3: to check the connection b/w the mongoose and the  db.
// Step-4: Handling errors.
db.on('error',console.error.bind(console,'Error connecting to DB!'));
// Step-5: up and running
db.once('open',function(){
    console.log('Successfully connected to DB!!');
});