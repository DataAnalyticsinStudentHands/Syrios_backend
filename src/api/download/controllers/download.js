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
        'coinData',
        'references',
      ],
      ...ctx.query
    };
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  async send(ctx) {
    const result = await strapi.entityService.findPage('api::download.download')
    const email =ctx.request.body.email    
    const emailTo = result['results'][0]['emailTo']
    const emailSubject = result['results'][0]['emailSubject']  
    const fullName =ctx.request.body.fullName    
    
    //console.log('email:'+email, 'emailTo:'+emailTo, 'emailSubject:'+emailSubject, "fullName:"+fullName)
    strapi.service('api::download.download').send(
      'syrioswebadmin@syrios.cs.uh.edu',       
      emailTo,       
      emailSubject,       
      `${fullName} request download data, and the email is ${email}`,
    );

    // Send response to the server.    
    ctx.send({      
      ok: true,

    });  
  },

}));
