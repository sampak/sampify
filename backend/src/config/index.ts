export default {
  development: {
    frontendUrl: 'http://localhost:3000',
    JWT_SECRET: 'U2FtcGFrdGhlYmVzdA==',
    JWT_EXPIRE_TIME: 600 * 600,
    database: {
      type: String('mysql'),
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sampify',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    },
  },

  production: {
    frontendUrl: 'c',
    JWT_SECRET: 'c=cccccadcc=',
    JWT_EXPIRE_TIME: 1 * 1,
    database: {
      type: String('mysql'),
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'x',
      database: 'x',
      autoLoadEntities: false,
      synchronize: false,
      logging: false,
    },
  },
};
