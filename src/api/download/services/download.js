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

module.exports = createCoreService("api::download.download", ({ strapi }) => ({
  async send(from, to, subject, text) {
    if (process.env.EMAIL_DELIVERY_ENABLED !== "true") {
      console.log(`[Email disabled] To: ${to}, Subject: ${subject}`);
      return { messageId: "development-email-disabled" };
    }

    return transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
  },
}));
