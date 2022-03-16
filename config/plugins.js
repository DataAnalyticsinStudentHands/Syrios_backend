  module.exports = ({ env }) => ({
    email: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'shaotianhao1997@gmail.com',
        defaultReplyTo: 'shaotianhao1997@gmail.com',
      },
    },
  });