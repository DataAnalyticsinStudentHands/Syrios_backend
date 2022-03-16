'use strict'

module.exports = {
  async send(ctx) {
    const body = ctx.request.body
    const sendTo = body.email
    const fullName = body.fullName
    strapi.log.debug(`Trying to send an email to ${sendTo} and his name is ${fullName}`)

    try{
      await strapi.plugins['email'].services.email.send({
          to:sendTo,
          from:"shaotianhao1997@gmail.com",
          // replayTo:"shaotianhao1997@gmail.com",
          subject:"Test nodemailer and Strapi", 
          text:`${fullName} request download data, and the email is ${sendTo}`
      });
      ctx.send("Email sent!");
    } 
    catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err)
      ctx.send({ error: 'Error sending email' })
    }
  }
}
