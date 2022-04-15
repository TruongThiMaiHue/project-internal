import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'excel',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
}