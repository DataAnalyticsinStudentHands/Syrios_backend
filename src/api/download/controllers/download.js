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
    const email =ctx.request.body.email    
    const fullName =ctx.request.body.fullName    
    
    strapi.service('api::download.download').send(
      email,       
      'shaotianhao1997@gmail.com',       
      'Strapi Download Data',       
      `${fullName} request download data, and the email is ${email}` 
    );
 
    // Send response to the server.    
    ctx.send({      
      ok: true,    
    });  
  },

}));
