export default {
  development: {
    frontendUrl: 'http://localhost:3000',
    JWT_SECRET: 'U2FtcGFrdGhlYmVzdA==',
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
