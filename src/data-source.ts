import { DataSource } from 'typeorm';
import { Users } from './users/entity/users';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: [Users],
    synchronize: false,
    migrations: ['dist/migration/*.js'],
});