/*
* Author: Rohit Kumar
* Date: 24-06-2015
* Website: iamrohit.in
* App Name: Node Emailer
* Description: NodeJs script to send emails
*/
var http=require('http');
var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var app=express();
var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Home page
app.get('/',function(req,res){
    res.sendfile('index.html');
});

// sending mail function
app.post('/send', function(req, res){
        //configuring SMTP settings
    var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Hotmail",
            auth: {
                 user: "rohit0kumar@hotmail.com",
                 pass: "[YourHotmailPassword]"
            }
        });
        var mailOptions = {
            from: "Iamchat ✔ <hi@iamrohit.in>", // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject+" ✔", // Subject line
            //text: "Hello world ✔", // plaintext body
            html: "<b>"+req.body.description+"</b>" // html body
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email hase been sent successfully");
        } 
    }); 
});

// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on " + port);
});
