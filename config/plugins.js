module.exports =({env}) =>( {
    'wysiwyg': {
      enabled: true,
      resolve: './src/plugins/wysiwyg'
    },
    'import-export-entries': {
      enabled: true,
    },
    'email-service': {
      enabled: true,
      resolve: './src/plugins/email-service'
    },
  }
)
