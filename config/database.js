module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', process.env.DATABASE_HOST),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', process.env.DATABASE_NAME),
      user: env('DATABASE_USERNAME', process.env.DATABASE_USERNAME),
      password: env('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD),
    },
  },
});
