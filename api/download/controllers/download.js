'use strict'

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail'
});
module.exports={
  async send(ctx){
    transporter.sendmail({
      from: "Syrios Site Watcher <dashadmin@uh.edu>",
      to: 'shaotianhao1997@gmail.com',
      subject: 'Message',
      text: 'I hope this message gets delivered!'
  }, (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
  })
  }
}

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