import {DataSource} from 'typeorm'
import {PlayerDataEntity} from './entities/playerData.entity'
import * as dotenv from 'dotenv'

dotenv.config()

console.log()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'playerData',
    synchronize: true,
    logging: true,
    entities: [PlayerDataEntity],
    subscribers: [],
    migrations: []
})
