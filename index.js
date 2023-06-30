const express = require('express');
const port = 8000;
const path = require('path');
//const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));


//middleware 1
// app.use(function(req, res, next) {
//     req.myName = 'protyush';
//     console.log('middleware 1 is called!');
//     next();
// })

// //middleware 2
// app.use(function(req, res, next) {
//     console.log('my name from MW1 is', req.myName);
//     console.log('middleware 2 is called!');
//     next();
// });

 var contactList = [
     {
         name : 'Elon Musk',
         phone : "1234567890"
     },
     {
         name : 'Bill Gates',
         phone : "9876245367"
     },
     {
         name : 'Steve Jobs',
         phone : "9876542221"
     }
 ]



app.get('/', function(req, res) {
    //console.log('My name from app.get controller is', req.myName);

        return res.render('home',{
            title: "Contacts List",
            contact_list: contactList
        });
});


app.get('/practice', function(req,res) {
    return res.render('practice', {
        title : "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    return res.redirect('back');
});





app.get('/delete-contact/:id', function(req,res) {
   
    let phone = req.params.id;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});

app.listen(port, function(err){
    if(err) {console.log('Error is running',err)}

    console.log('Yup! ruuning on port',port)
});