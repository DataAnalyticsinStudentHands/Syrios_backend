 module.exports = ({ env }) => ({
    // ...
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('EMAIL_SMTP_HOST', process.env.EMAIL_SMTP_HOST),
        port: env.int('EMAIL_PORT', 2525),
        auth: {
          user: env('EMAIL_SMTP_USER', process.env.EMAIL_SMTP_USER),
          pass: env('EMAIL_SMPT_PASS', process.env.EMAIL_SMPT_PASS),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS_FROM'),
        defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
      },
    },
    // ...
  })