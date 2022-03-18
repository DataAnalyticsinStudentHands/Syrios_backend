  module.exports = ({ env }) => ({
    email: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'shaotianhao1997@gmail.com',
        defaultReplyTo: 'shaotianhao1997@gmail.com',
      },
    },
  });

  // module.exports = ({ env }) => ({
  //   email: {
  //       provider: 'nodemailer',
  //       providerOptions: {
  //         host: 'localhost',
  //         port: 1025,
  //         auth: {
  //           user: 'project.1',
  //           pass: 'secret.1',
  //         },
  //       },
  //       settings: {
  //         defaultFrom: 'shaotianhao1997@gmail.com',
  //         defaultReplyTo: 'shaotianhao1997@gmail.com',
  //       },
  //   },
  // });