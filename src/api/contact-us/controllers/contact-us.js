'use strict';

/**
 *  contact-us controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-us.contact-us', ({ strapi }) => ({
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
    const result = await strapi.entityService.findPage('api::contact-us.contact-us')
    const emailTo = result['results'][0]['emailTo']
    const emailSubject = result['results'][0]['emailSubject']

    const name =ctx.request.body.name    
    const email =ctx.request.body.email    
    const phone =ctx.request.body.phone    
    const message =ctx.request.body.writtenMessage

    strapi.db.query('api::contact-user-info.contact-user-info').create({
      data: {
        name: name,
        email:email,
        phone:phone,
        message:message,
      },
    });

    strapi.service('api::download.download').send(
      email,       
      emailTo,       
      emailSubject,
      `
      ${message}

      ${name}
      ${phone}
      ${email}
        ` 
    );
 
    // Send response to the server.    
    ctx.send({      
      ok: true,    
    });  
  },

}));