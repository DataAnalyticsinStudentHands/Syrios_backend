module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', process.env.DATABASE_HOST),
        srv: env.bool('DATABASE_SRV', process.env.DATABASE_SRV),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', process.env.DATABASE_NAME),
        username: env('DATABASE_USERNAME', process.env.DATABASE_USERNAME),
        password: env('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', process.env.AUTHENTICATION_DATABASE),
        ssl: env.bool('DATABASE_SSL', process.env.DATABASE_SSL),
      },
    },
  },
});
