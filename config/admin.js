module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c44f05d69da15b572cd085786142ee0e'),
  },
});
