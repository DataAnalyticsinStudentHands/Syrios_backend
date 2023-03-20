module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', process.env.ADMIN_JWT_SECRET),
  },
  apiToken:{ 
      salt: env('API_TOKEN_SALT', process.env.API_TOKEN_SALT),
  }
});
