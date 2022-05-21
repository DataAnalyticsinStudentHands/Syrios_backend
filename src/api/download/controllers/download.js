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
    const from =ctx.request.body.from    
    const fullName =ctx.request.body.fullName    
    
    strapi.service('api::download.download').send(
      from,       
      'shaotianhao1997@gmail.com',       
      'Strapi Download Data',       
      `${fullName} request download data, and the email is ${from}` 
    );
 
    // Send response to the server.    
    ctx.send({      
      ok: true,    
    });  
  },

}));
