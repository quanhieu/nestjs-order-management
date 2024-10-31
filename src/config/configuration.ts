export default () => ({
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'orderDb',
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
  },
});
