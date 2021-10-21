import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule, ConfigModule.forRoot({isGlobal:true})],
})
export class AppModule {}
