module.exports = ({ env }) => ({
  'wysiwyg': {
    enabled: false,
    resolve: './src/plugins/wysiwyg'
  },
  "email-service": {
    enabled: false,
    resolve: "./src/plugins/email-service",
  }
});
