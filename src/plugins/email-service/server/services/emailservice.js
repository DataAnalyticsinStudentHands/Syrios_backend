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

module.exports = createCoreService(
  "plugin::email-service.emailservice",
  ({ strapi }) => ({
    async find(params) {
      const entity = await super.find(params);
      return entity;
    },
    async update(params) {
      const entity = await super.update(params);
      return entity;
    },

    async send(from, to, cc, bcc, subject, text) {
      if (process.env.EMAIL_DELIVERY_ENABLED !== "true") {
        console.log(`[Email disabled] To: ${to}, Subject: ${subject}`);
        return { messageId: "development-email-disabled" };
      }

      return transporter.sendMail({
        from,
        to,
        cc,
        bcc,
        subject,
        text,
      });
    },
  }),
);
