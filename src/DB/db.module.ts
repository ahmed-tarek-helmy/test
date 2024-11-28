import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/db.providers';
@Module({
    providers: [...databaseProviders],
    exports:[...databaseProviders]
})
export class DbModule {}
