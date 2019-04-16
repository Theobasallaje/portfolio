var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

// Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let smtpTransport  = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function sendMail(name, email, subject, message){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass // generated ethereal password
    //   }
    // });

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
  });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      name: name, // sender name
      email: email, // sender address
      to: "contacttheobasallaje@gmail.com", // list of receivers
      subject: subject, // Subject line
      message: message, // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // res.sendfile('./index.html'); //deprecated
    res.sendFile('index.html' , { root : __dirname});
});

app.post('/send', function (req, res) {
    //send our email
    //re.body.name -- from name attr from index.html form
    console.log("contents of req.body: " + req.body);
    console.log("contents of req.query: " + JSON.stringify(req.query));
    sendMail(req.body.name, req.body.email, req.body.subject, req.body.message).catch(console.error);
    // sendMail("name", "req.body.email", "req.body.subject", "req.body.message").catch(console.error);

});

app.listen(process.env.PORT || 8080, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port on 8080");
    }
});
