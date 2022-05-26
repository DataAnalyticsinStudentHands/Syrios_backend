'use strict';

/**
 *  download controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::download.download', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: [
        'image',
      ],
      ...ctx.query
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  async send(ctx) {
    const emailTo = ctx.request.body.emailTo
    const emailSubject = ctx.request.body.emailSubject    
    const email =ctx.request.body.email    
    const fullName =ctx.request.body.fullName    
    
    strapi.service('api::download.download').send(
      email,       
      emailTo,       
      emailSubject,       
      `${fullName} request download data, and the email is ${email}` 
    );
 
    // Send response to the server.    
    ctx.send({      
      ok: true,    
    });  
  },

}));
