// $(document).ready(function () {
//     var to, name, email, subject, message;
//     $("#send_email").click(function () {
//         // enter your email account that you want to recieve emails at.
//         to = "contacttheobasallaje@gmail.com";
//         name = $("#contactForm #name").val();
//         email = $("#contactForm #email").val();
//         subject = $("#contactForm #subject").val();
//         message = $("#contactForm #message").val();
//         // $("#message").text("Sending E-mail...Please wait");
//         $.get("http://localhost:8080/send", {
//             to: to,
//             name: name,
//             email: email,
//             subject: subject,
//             message: message
//         }, function (data) {
//             if (data == "sent") {
//                 console.log("Email sent");
//             }
//         });
//     });
// });