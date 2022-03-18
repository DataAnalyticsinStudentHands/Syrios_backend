'use strict'

module.exports = {
  // GET /hello
  send: async ctx => {
    const from =ctx.request.body.from
    const fullName =ctx.request.body.fullName

    strapi.services.download.send(
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
