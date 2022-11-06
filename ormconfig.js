const DIR_PATH = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'postgres',
  host: process.env.DEFAULT_DATABASE_HOST,
  port: process.env.DEFAULT_DATABASE_PORT,
  username: process.env.DEFAULT_DATABASE_USER,
  password: process.env.DEFAULT_DATABASE_PASSWORD,
  database: process.env.DEFAULT_DATABASE,
  entities: [`./${DIR_PATH}/modules/**/infra/typeorm/entities/*{.ts,.js}`],
  migrations: [`./${DIR_PATH}/shared/infra/typeorm/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `./${DIR_PATH}/shared/infra/typeorm/migrations/`,
  },
  logging: process.env.NODE_ENV === 'development',
};
