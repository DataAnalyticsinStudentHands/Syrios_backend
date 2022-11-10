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
            const emailconfig = await strapi.service('plugin::email-service.emailservice').find();
            strapi.service('plugin::email-service.emailservice').send(
                emailconfig.emailFrom,       
                ctx.request.body.data.email,
                emailconfig.emailCC,   
                emailconfig.emailBCC,   
                emailconfig.emailFooterSubscriptionSubject,
                emailconfig.emailFooterSubscriptionText
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

            async function handleNewUser(){
                await strapi.db.query('api::contact-user-info.contact-user-info').create({data: ctx.request.body.data})
                var userID = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                    select: ['id'],
                    where: { email: ctx.request.body.data.email },
                });
                await strapi.db.query('api::syrios-user-download.syrios-user-download').create({data: {
                    syrios_user_info:userID.id
                }})
            }
            async function handleOldUser(){
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
            ? handleNewUser()
            : handleOldUser()

        // Email Send
            const emailconfig = await strapi.service('plugin::email-service.emailservice').find();
            var message = 
`
Dear ${ctx.request.body.data.name}

${emailconfig.emailDownlaodText}
`
            strapi.service('plugin::email-service.emailservice').send(
                emailconfig.emailFrom,       
                ctx.request.body.data.email,
                emailconfig.emailCC,   
                emailconfig.emailBCC,   
                emailconfig.emailDownlaodSubject,
                message
              );

            ctx.body = 'Thanks for download the data';
        } catch (err) {
        ctx.body = err;
        }
    },
    async contactus(ctx) {
        try {
            //Data Check
                const checkEmail = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                    where: { email: ctx.request.body.data.email },
                  });
    
                async function handleNewUser(){
                    //Creating New User
                    await strapi.db.query('api::contact-user-info.contact-user-info').create({data: ctx.request.body.data})
                    //Getting New User ID
                    var userID = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                        select: ['id'],
                        where: { email: ctx.request.body.data.email },
                    });
                    //connect User with message
                    await strapi.db.query('api::syrios-user-message.syrios-user-message').create({data: {
                        syrios_user_info:userID.id,
                        message:ctx.request.body.data.message
                    }})
                }
                async function handleOldUser(){
                    //Getting New User ID
                    var userID = await strapi.db.query('api::contact-user-info.contact-user-info').findOne({
                        select: ['id'],
                        where: { email: ctx.request.body.data.email },
                      });
                    //Update info
                    await await strapi.entityService.update('api::contact-user-info.contact-user-info',userID.id,{data:{
                        name:ctx.request.body.data.name,
                        phone:ctx.request.body.data.phone
                    }} )
                    //connect User with message
                    await strapi.db.query('api::syrios-user-message.syrios-user-message').create({data: {
                        syrios_user_info:userID.id,
                        message:ctx.request.body.data.message
                    }})
                }
    
                checkEmail == null 
                ? handleNewUser()
                : handleOldUser()
    
            // Send Email
                const emailconfig = await strapi.service('plugin::email-service.emailservice').find();
                var message = 
`
Dear ${ctx.request.body.data.name}

${emailconfig.emailContactUsText}
`
                strapi.service('plugin::email-service.emailservice').send(
                    emailconfig.emailFrom,       
                    ctx.request.body.data.email,
                    emailconfig.emailCC,   
                    emailconfig.emailBCC,   
                    emailconfig.emailContactUsSubject,
                    message
                  );
    
                ctx.body = 'Thanks for contact us';
            } catch (err) {
            ctx.body = err;
            }
    },
}));
