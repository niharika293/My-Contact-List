const mongoose = require('mongoose');
//WHat if we require mongoose at multiple places? It'll be required from the same instance.
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
//Name of the collection definition to be called. 
const Contact  = mongoose.model('Contact',contactSchema);
module.exports = Contact;