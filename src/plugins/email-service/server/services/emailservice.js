'use strict';

/**
 *  service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: "unix",
  path: "/usr/sbin/sendmail",
});

module.exports = createCoreService('plugin::email-service.emailservice',({strapi})=>({
    async find(params){
        const entity = await super.find(params);
        return entity;
    },
    async update(params){
      const entity = await super.update(params);
      return entity;
    },

    send(from,to,cc,bcc,subject,text){
      const options = {
        from,
        to,
        cc,
        bcc,
        subject,
        text
      };
      return transporter.sendMail(options)
    },
}));
