import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  // host: this.configService.get<string>('DB_HOST'),
  // port: this.configService.get<number>('DB_PORT'),
  // username: this.configService.get<string>('DB_USER'),
  // password: this.configService.get<string>('DB_PASS'),
  // database: this.configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(datasourceOptions);

export default dataSource;
