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
    async download(ctx) {
        try {
        //Data Check
            const checkEmail = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                where: { email: ctx.request.body.data.email },
              });

            async function hadnleNewUser(){
                await strapi.db.query('api::contact-user-info.contact-user-info').create({data: ctx.request.body.data})
                var userID = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                    select: ['id'],
                    where: { email: ctx.request.body.data.email },
                });
                await strapi.db.query('api::syrios-user-download.syrios-user-download').create({data: {
                    syrios_user_info:userID.id
                }})
            }
            async function hadnleOldUser(){
                var userID = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                    select: ['id'],
                    where: { email: ctx.request.body.data.email },
                  });
                await await strapi.entityService.update('api::contact-user-info.contact-user-info',userID.id,{data:{
                    name:ctx.request.body.data.name
                }} )
                await strapi.db.query('api::syrios-user-download.syrios-user-download').create({data: {
                    syrios_user_info:userID.id
                }})
            }

            checkEmail == null 
            ? hadnleNewUser()
            : hadnleOldUser()

        // Email Send
            const emailresult = await strapi.service('plugin::email-service.emailservice').find();
            // console.log(emailresult)
            strapi.service('plugin::email-service.emailservice').send(
                emailresult.emailFrom,       
                ctx.request.body.data.email,
                '', 
                emailresult.emailBCC,   
                emailresult.emailDownlaodSubject,
                emailresult.emailDownlaodText
              );

            ctx.body = 'Thanks for follow us!';
        } catch (err) {
        ctx.body = err;
        }
    },
    // async contactus(ctx) {
    //     try {
    //     //Data Check
    //         console.log(ctx.request.body.data)
    //         // const checkEmail = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
    //         //     select: ['email' ],
    //         //     where: { email: ctx.request.body.data.email },
    //         //   });

    //         // checkEmail == null 
    //         // ?await strapi.db.query('api::contact-user-info.contact-user-info').create({data: ctx.request.body.data})
    //         // :await strapi.db.query('api::contact-user-info.contact-user-info').update({
    //         //     where:{email: ctx.request.body.data.email},
    //         //     data: ctx.request.body.data
    //         // })

    //     // Email Send
    //         // const emailresult = await strapi.service('plugin::email-service.emailservice').find();
    //         // strapi.service('plugin::email-service.emailservice').send(
    //         //     emailresult.emailFrom,       
    //         //     ctx.request.body.data.email,
    //         //     '', 
    //         //     emailresult.emailBCC,   
    //         //     emailresult.emailDownlaodSubject,
    //         //     emailresult.emailDownlaodText
    //         //   );

    //         ctx.body = 'Thanks for follow us!';
    //     } catch (err) {
    //     ctx.body = err;
    //     }
    // },
}));
