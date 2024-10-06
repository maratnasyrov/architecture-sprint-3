// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'app_user',
  password: process.env.DATABASE_PASSWORD || 'app_password',
  database: process.env.DATABASE_NAME || 'device_db',
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/migrations/*.ts'],
  synchronize: false, // рекомендуется отключать в продакшн-среде
  logging: true,
});

module.exports = AppDataSource;
