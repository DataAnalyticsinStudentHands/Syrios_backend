'use strict'

module.exports = {
  // GET /hello
  send: async ctx => {

    // Send an email to validate his subscriptions.
    strapi.services.download.send(
      'shaotianhao1997@gmail.com', 
      'shaotianhao1997@gmail.com', 
      'Welcome', 
      '...'
    );

    // Send response to the server.
    ctx.send({
      ok: true,
    });
  },
};

// module.exports = {
//   async send(ctx) {
//     const body = ctx.request.body
//     const sendTo = body.email
//     const fullName = body.fullName
//     strapi.log.debug(`Trying to send an email to ${sendTo} and his name is ${fullName}`)

//     try{
//       await strapi.plugins['email'].services.email.send({
//           to:sendTo,
//           from:"shaotianhao1997@gmail.com",
//           // replayTo:"shaotianhao1997@gmail.com",
//           subject:"Test nodemailer and Strapi", 
//           text:`${fullName} request download data, and the email is ${sendTo}`
//       });
//       ctx.send("Email sent!");
//     } 
//     catch (err) {
//       strapi.log.error(`Error sending email to ${sendTo}`, err)
//       ctx.send({ error: 'Error sending email' })
//     }
//   }
// }

// module.exports={
//   let transporter = nodemailer.createTransport({
//     sendmail: true,
//     newline: 'unix',
//     path: '/usr/sbin/sendmail'
// });
// }