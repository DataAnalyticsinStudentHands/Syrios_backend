'use strict';

/**
 *  contact-user-info controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-user-info.contact-user-info',({strapi})=>({
    async subscription(ctx) {
        try {
        //Data Check
            const checkEmail = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                select: ['email' ],
                where: { email: ctx.request.body.data.email },
              });

            checkEmail == null 
            ?await strapi.db.query('api::contact-user-info.contact-user-info').create({data: ctx.request.body.data})
            :await strapi.db.query('api::contact-user-info.contact-user-info').update({
                where:{email: ctx.request.body.data.email},
                data:{ subscription:true}
            })

        //Email Send
            const emailresult = await strapi.service('plugin::email-service.emailservice').find();
            strapi.service('plugin::email-service.emailservice').send(
                emailresult.emailFrom,       
                ctx.request.body.data.email,
                '', 
                emailresult.emailBCC,   
                emailresult.emailFooterSubscriptionSubject,
                emailresult.emailFooterSubscriptionText
              );

            ctx.body = 'Thanks for follow us!';
        } catch (err) {
        ctx.body = err;
        }
    },
}));
