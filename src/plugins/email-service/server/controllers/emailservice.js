'use strict';

/**
 *   controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::email-service.emailservice', ({strapi})=>({
    async find(ctx) {
        try {
            // ctx.body = await strapi.service('plugin::email-service.emailservice').find();
            const response = await super.find(ctx);          
            return response;

        } catch (err) {
          ctx.body = err;
        }
      },
    async update(data) {
        // console.log(ctx.request.body)
        console.log(data)
        try {
            const response = await super.update(data);
            return response;
            
        } catch (err) {
          ctx.body = err;
        }
      },
    async send(ctx) {
      try{
        const result = await super.find(ctx)
        const emailFrom = result.data.attributes.emailFrom
        const emailTo = result.data.attributes.emailTo
        const emailCC = result.data.attributes.emailCC
        const emailSubject = result.data.attributes.emailSubject
        const emailTemp = result.data.attributes.emailTemp

        // console.log(ctx.request.body)
        // const fullName = ctx.request.body.fullName
        // const email = ctx.request.body.email

        strapi.service('plugin::email-service.emailservice').send(
          emailFrom,       
          emailTo,
          emailCC,   
          emailSubject,
          emailTemp
          // `${fullName} request download data and the email is ${email}`
        );
        ctx.send({
          ok:'email send'
        })
      } catch (err){
        ctx.body = err;
      }
    },
}));
