'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 const nodemailer = require('nodemailer');

 // Create reusable transporter object using SMTP transport.
 const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail",
  });
 
 module.exports = {
   send: (from, to, subject, text) => {
     // Setup e-mail data.
     const options = {
       from,
       to,
       subject,
       text,
     };
 
     // Return a promise of the function that sends the email.
     return transporter.sendMail(options);
   },
 };

