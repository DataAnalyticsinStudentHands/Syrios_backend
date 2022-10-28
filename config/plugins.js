module.exports =({env}) =>( {
    'wysiwyg': {
      enabled: true,
      resolve: './src/plugins/wysiwyg'
    },
    'import-export-entries': {
      enabled: true,
    },
    email: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'shaotianhao1997@gmail.com',
        defaultReplyTo: 'shaotianhao1997@gmail.com',
      },
    },
  }
)
