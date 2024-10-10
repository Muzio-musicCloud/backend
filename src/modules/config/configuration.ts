export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    userName: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  // kakao: {
  //   clientID: process.env.KAKAO_CLIENT_ID,
  //   clientSecret: process.env.KAKAO_CLIENT_SECRET,
  //   callbackURL: process.env.KAKAO_CALLBACK_URL,
  // },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
  },
});
