'use strict';

/**
 * download service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({    
    sendmail: true,    
    newline: "unix",    
    path: "/usr/sbin/sendmail",  
});

module.exports = createCoreService('api::download.download',({strapi})=>({
    send(from, to, subject, text) {
        // Setup e-mail data.
        const options = {from,to,subject,text};
        // Return a promise of the function that sends the email.
        return transporter.sendMail(options);
    },
}));
