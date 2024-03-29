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
        const emailBCC = result.data.attributes.emailBCC

        strapi.service('plugin::email-service.emailservice').send(
          emailFrom,       
          emailTo,
          emailCC, 
          emailBCC,  
          'Syrios Strapi Email Test',
          'The email service is working!'
        );
        ctx.send({
          ok:'email send'
        })
      } catch (err){
        ctx.body = err;
      }
    },
}));
