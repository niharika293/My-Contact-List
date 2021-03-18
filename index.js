//Step-1 : Acquire the resources 
const express = require('express');//acquire express
const port = 8000;//server will run on this port.
const db = require('./config/mongoose'); // to connect with mongoose.
const Contact = require('./models/contact');
const app = express(); //Generally Naming convention use app,Creates an Express application. The express() function is a top-level function exported by the express module.
const path = require('path');//to get the path dynamically.

//Step-2: Launch the server
app.listen(port,function(err){
    if(err){
        console.log("Error in launching the server! ");
    }
    console.log("Yup!! My Express server is running on port "+port);
});

//Defining global array of objects for contact_list.
var contactList = [
    {
        name : "Niharika Gurnani",
        phone : "7859631234"
    },
    {
        name : "Tony Stark",
        phone: "1234567890"
    },
    {
        name : "Sheldon Cooper",
        phone: "5694567890"
    }
];

//Step-4: telling express that EJS will be our template engine
app.set('view engine','ejs');//setting value for property.
app.set('views',path.join(__dirname,'Views'));

//Step-5: After setting the template engine, Set a parser
app.use(express.urlencoded()); //This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
//Including Static files.
app.use(express.static('Assets'));



// //Playing with Middlewares.
// //Middleware-1.
// app.use(function(req,res,next){
//     console.log("Middleware -1 Called");
//     next();
// });

// //Middleware-2
// app.use(function(req,res,next){
//     console.log("Middleware -2 Called");
//     next();
// });

//Step-3:  Getting Response from the server
app.get('/',function(req,res){
    //fetchhing from DB.
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts!");
            return;
        }
        return res.render('home',{
            contact_list: contacts,
            locals: {
                title:'Contacts List'
            }
        });
    });
    
    
    
    // res.send('<h1> Cool!! It is runnning! </h1>');
    //for rendering EJS file
    // return res.render('home',{
    //     contact_list: contactList,
    //     locals: {
    //         title:'Contacts List'
    //     }
    // });
});

//Setting up controller for practice.ejs
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play with it!!"
    });
});

//Setting up the controller for form submission
app.post('/create_contact',function(req,res){
    // return res.redirect('/practice');//Redirect to the given url after the request is processed.
   // console.log(req.body.phone);
//    contactList.push({
//         name : req.body.name,
//         phone : req.body.phone
//    });
//Optimised code.
    // contactList.push(req.body);
    // return res.redirect('back');
    //Pushing the contacts in DB.
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating a contact!');
            return;
        }
        console.log('******',newContact);
        res.redirect('back');
    })
});

//Setting up route for delete-contact Using String params.
// app.get('/deletecontact/:phone',function(req,res){ 
//     console.log(req.params);
//     let phone = req.params.phone;  
// });
// Setting up route for delete-contact Using Query params.
app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    // let phone = req.query.phone;
    // //Iterate over the list, find the matching phone number and remove it from array.
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
    //delete from DB using unique ID.
    let id = req.query.id; //get id from  URL.
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting an object from DB!!");
            return;
        }
        return res.redirect('back');
    })
});
